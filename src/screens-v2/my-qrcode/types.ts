export type UsageInfoItemData = {
  id: string;
  title: string;
  subtitle: string;
  icon: 'shopping' | 'calendar' | 'voucher';
};

export type QrProfileData = {
  fullName: string;
  phone: string;
  customerCode: string;
  memberLabel: string;
  points: number;
  qrValue: string;
  userCode: string;
};
