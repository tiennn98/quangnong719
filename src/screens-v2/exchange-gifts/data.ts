import { GiftCategoryId, GiftItem, RedemptionHistoryItem } from './types';

export const DEFAULT_POINTS = 784;

export const GIFT_CATEGORIES: { id: GiftCategoryId; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'small', label: 'Quà nhỏ' },
  { id: 'supplies', label: 'Vật tư' },
  { id: 'household', label: 'Quà gia dụng' },
  { id: 'raincoat', label: 'Áo mưa/Nón' },
];

export const GIFT_ITEMS: GiftItem[] = [
  {
    id: '1',
    title: 'Voucher 30.000đ',
    points: 200,
    category: 'small',
  },
  {
    id: '2',
    title: 'Áo mưa Quang Nông',
    points: 350,
    category: 'raincoat',
  },
  {
    id: '3',
    title: 'Nón che nắng',
    points: 250,
    category: 'raincoat',
  },
  {
    id: '4',
    title: 'Combo chăm sóc vườn',
    points: 500,
    category: 'supplies',
  },
  {
    id: '5',
    title: 'Bình xịt 5L',
    points: 400,
    category: 'supplies',
  },
  {
    id: '6',
    title: 'Bộ dụng cụ gia đình',
    points: 300,
    category: 'household',
  },
];

export const REDEMPTION_HISTORY: RedemptionHistoryItem[] = [
  {
    id: '1',
    title: 'Áo mưa Quang Nông',
    redeemedAt: 'Đổi lúc 20/05/2025 • 10:23',
    pointsUsed: 350,
    status: 'success',
  },
  {
    id: '2',
    title: 'Combo chăm sóc vườn',
    redeemedAt: 'Đổi lúc 15/05/2025 • 14:10',
    pointsUsed: 500,
    status: 'success',
  },
];
