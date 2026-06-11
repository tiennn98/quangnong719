import { Images } from '@/assets/images';
import {
  Gift,
  LayoutGrid,
  Leaf,
  Sprout,
  Ticket,
} from 'lucide-react-native';
import React from 'react';
import { PromotionCategory, PromotionListItemData } from './types';

export const PROMOTION_CATEGORIES: PromotionCategory[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'voucher', label: 'Voucher' },
  { id: 'combo', label: 'Combo mùa vụ' },
  { id: 'reward', label: 'Quà đổi điểm' },
  { id: 'crop', label: 'Theo cây trồng' },
];

export const CATEGORY_ICONS: Record<
  PromotionCategory['id'],
  React.ComponentType<{ color: string; size: number }> | null
> = {
  all: LayoutGrid,
  voucher: Ticket,
  combo: Sprout,
  reward: Gift,
  crop: Leaf,
};

export const PROMOTION_ITEMS: PromotionListItemData[] = [
  {
    id: 'voucher-1',
    category: 'voucher',
    badge: 'VOUCHER',
    badgeTone: 'green',
    title: 'Voucher tiết kiệm – Mua là lợi',
    description:
      'Giảm giá trực tiếp cho đơn hàng, áp dụng đa dạng sản phẩm.',
    highlight: 'Tiết kiệm đến 200.000đ',
    highlightTone: 'green',
    image: Images.voucherIcon,
  },
  {
    id: 'combo-1',
    category: 'combo',
    badge: 'COMBO MÙA VỤ',
    badgeTone: 'darkGreen',
    title: 'Combo mùa vụ – Trọn bộ hiệu quả',
    description:
      'Bộ giải pháp tiết kiệm, tối ưu hiệu quả theo từng giai đoạn vụ mùa.',
    highlight: 'Tiết kiệm đến 15%',
    highlightTone: 'green',
    image: Images.thung,
    discountBadge: '-15%',
  },
  {
    id: 'reward-1',
    category: 'reward',
    badge: 'QUÀ ĐỔI ĐIỂM',
    badgeTone: 'blue',
    title: 'Đổi điểm lấy quà – Nhiều quà hấp dẫn',
    description: 'Dùng điểm tích lũy để đổi quà thiết thực cho nhà nông.',
    highlight: 'Quà từ 100 điểm',
    highlightTone: 'blue',
    image: Images.gift,
  },
];

export const ONBOARDING_QUICK_ACTIONS = [
  { id: 'voucher', label: 'Xem voucher' },
  { id: 'reward', label: 'Đổi quà từ điểm' },
  { id: 'combo', label: 'Xem combo vụ mùa' },
];
