import { ImageSourcePropType } from 'react-native';

export type PromotionCategoryId =
  | 'all'
  | 'voucher'
  | 'combo'
  | 'reward'
  | 'crop';

export type PromotionBadgeTone = 'green' | 'darkGreen' | 'blue';

export type PromotionCategory = {
  id: PromotionCategoryId;
  label: string;
};

export type PromotionListItemData = {
  id: string;
  category: Exclude<PromotionCategoryId, 'all' | 'crop'>;
  badge: string;
  badgeTone: PromotionBadgeTone;
  title: string;
  description: string;
  highlight: string;
  highlightTone?: 'green' | 'blue';
  image: ImageSourcePropType;
  discountBadge?: string;
};
