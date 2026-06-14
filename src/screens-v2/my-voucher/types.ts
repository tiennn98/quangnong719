export type VoucherTabId = 'active' | 'expiring' | 'used';

export type VoucherDescriptionIcon = 'bag' | 'leaf' | 'user';

export type VoucherItem = {
  id: string;
  type: 'voucher' | 'service';
  badge: string;
  badgeTone: 'green' | 'blue';
  title: string;
  expiryLabel?: string;
  description: string;
  descriptionIcon: VoucherDescriptionIcon;
  actionLabel: string;
  specialLabel?: string;
  tab: VoucherTabId;
};
