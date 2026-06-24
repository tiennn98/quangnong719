#!/bin/bash
set -euo pipefail

# Only re-sign when creating an archive / distribution build.
if [[ "${CONFIGURATION}" != "Release" ]]; then
  exit 0
fi

if [[ "${ACTION:-}" != "install" && "${DEPLOYMENT_POSTPROCESSING:-}" != "YES" ]]; then
  exit 0
fi

APP_PATH="${TARGET_BUILD_DIR}/${WRAPPER_NAME}"
FRAMEWORKS_DIR="${APP_PATH}/Frameworks"

if [[ ! -d "${FRAMEWORKS_DIR}" ]]; then
  echo "warning: No Frameworks directory at ${FRAMEWORKS_DIR}"
  exit 0
fi

# security find-identity output format:
#   2) 05B653F8...2967 "Apple Distribution: Team Name (TEAMID)"
extract_cert_hash() {
  echo "$1" | sed -nE 's/^[[:space:]]*[0-9]+\)[[:space:]]+([A-Fa-f0-9]{40})[[:space:]]+.*/\1/p'
}

resolve_sign_identity() {
  local identity="${EXPANDED_CODE_SIGN_IDENTITY:-}"
  local identity_name="${EXPANDED_CODE_SIGN_IDENTITY_NAME:-}"

  if [[ -n "${identity}" && "${identity}" != "-" && "${identity_name}" == *"Distribution"* ]]; then
    echo "${identity}"
    return 0
  fi

  local line hash
  line="$(
    security find-identity -v -p codesigning \
      | grep -E '"(Apple|iPhone) Distribution' \
      | head -1
  )"

  if [[ -z "${line}" ]]; then
    return 1
  fi

  hash="$(extract_cert_hash "${line}")"
  if [[ -n "${hash}" ]]; then
    echo "${hash}"
    return 0
  fi

  return 1
}

SIGN_IDENTITY="$(resolve_sign_identity || true)"

if [[ -z "${SIGN_IDENTITY}" ]]; then
  echo "error: Could not find an Apple Distribution signing identity in Keychain."
  echo "Install an Apple Distribution certificate before archiving for TestFlight."
  exit 1
fi

echo "Re-signing embedded frameworks in ${FRAMEWORKS_DIR}"
echo "Using identity: ${SIGN_IDENTITY}"

sign_path() {
  local path="$1"
  echo "Signing ${path}"
  /usr/bin/codesign --force --sign "${SIGN_IDENTITY}" \
    --preserve-metadata=identifier,entitlements,flags \
    --timestamp=none \
    "${path}"
}

while IFS= read -r -d '' framework; do
  framework_name="$(basename "${framework}" .framework)"
  binary="${framework}/${framework_name}"

  if [[ -f "${binary}" ]]; then
    sign_path "${binary}"
  fi

  sign_path "${framework}"
done < <(/usr/bin/find "${FRAMEWORKS_DIR}" -mindepth 1 -maxdepth 1 -type d -name '*.framework' -print0)

if [[ -f "${FRAMEWORKS_DIR}/hermes.framework/hermes" ]]; then
  echo "Hermes signature:"
  /usr/bin/codesign -dv "${FRAMEWORKS_DIR}/hermes.framework/hermes" 2>&1 || true
fi
