export const formatYmd = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const parseYmd = (ymd?: string) => {
  if (!ymd) {return null;}
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) {return null;}
  return new Date(y, m - 1, d);
};

export const displayBirthday = (ymd?: string) => {
  const dt = parseYmd(ymd);
  if (!dt) {return '';}
  const dd = String(dt.getDate()).padStart(2, '0');
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const yyyy = dt.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};
