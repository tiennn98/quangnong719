export const isProfileCompleted = (p?: any) => {
  if (!p) {return false;}

  const fullName = String(p.full_name || '').trim();
  const phone = String(p.phone_number || '').trim();

  const fullNameOk = !!fullName && fullName !== phone;
  const locationOk = !!String(p.location_name || '').trim();
  const wardOk = !!String(p.ward_name || '').trim();
  const addressOk = !!String(p.address || '').trim();
  const plantsOk =
    Array.isArray(p.type_of_plants_ids) && p.type_of_plants_ids.length > 0;

  return fullNameOk && locationOk && wardOk && addressOk && plantsOk;
};
