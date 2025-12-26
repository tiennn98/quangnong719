export type VoucherItem = {
  voucher_instance_id: number;
  code: string;
  voucher_id: number;
  expired_date: string;
  status: number;
  user_id: number;
  is_used: boolean;
  name: string;
};

export function groupVouchers(items: VoucherItem[]) {
  const now = Date.now();

  const active: VoucherItem[] = [];
  const used: VoucherItem[] = [];
  const expired: VoucherItem[] = [];

  for (const v of items || []) {
    const exp = v?.expired_date ? new Date(v.expired_date).getTime() : 0;
    const isExpired = !!exp && exp < now;

    const status = Number(v?.status);
    const isUsed = v?.is_used === true || status === 2;

    if (isExpired || status === 3) {
      expired.push(v);
    } else if (isUsed) {
      used.push(v);
    } else {
      active.push(v);
    }
  }

  return {active, used, expired};
}
