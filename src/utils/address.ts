const norm = (s?: string | null) => (s || '').trim();
const normLower = (s?: string | null) => norm(s).toLowerCase();

export const uniqParts = (parts: string[]) => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of parts) {
    const key = normLower(p);
    if (!key) {continue;}
    if (seen.has(key)) {continue;}
    seen.add(key);
    out.push(norm(p));
  }
  return out;
};

export const extractAddressLineFromProfile = (
  fullAddress?: string | null,
  wardName?: string | null,
  provinceName?: string | null,
) => {
  const raw = norm(fullAddress);
  if (!raw) {return '';}

  const parts = raw.split(',').map(s => norm(s)).filter(Boolean);
  const unique = uniqParts(parts);

  const wardKey = normLower(wardName);
  const provKey = normLower(provinceName);

  const cleaned = unique.filter(p => {
    const k = normLower(p);
    if (!k) {return false;}
    if (wardKey && k === wardKey) {return false;}
    if (provKey && k === provKey) {return false;}
    return true;
  });

  return cleaned.join(', ') || (unique[0] || '');
};

export const buildFullAddress = (addressLine: string, wardName?: string, provinceName?: string) => {
  return uniqParts([addressLine, wardName || '', provinceName || '']).join(', ');
};
