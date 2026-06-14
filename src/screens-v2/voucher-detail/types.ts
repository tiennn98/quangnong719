export type VoucherCondition = {
  id: string;
  text: string;
  type: 'check' | 'info';
};

export type VoucherProductChip = {
  id: string;
  label: string;
  icon: 'leaf' | 'bottle';
};

export type VoucherUsageStep = {
  id: string;
  step: number;
  title: string;
  description: string;
};

export type VoucherDetailData = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  expiryLabel: string;
  conditions: VoucherCondition[];
  products: VoucherProductChip[];
  startDate: string;
  endDate: string;
  usageSteps: VoucherUsageStep[];
};
