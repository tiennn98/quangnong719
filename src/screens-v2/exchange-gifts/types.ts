export type GiftCategoryId =
  | 'all'
  | 'small'
  | 'supplies'
  | 'household'
  | 'raincoat';

export type GiftItem = {
  id: string;
  title: string;
  points: number;
  category: GiftCategoryId;
};

export type RedemptionHistoryItem = {
  id: string;
  title: string;
  redeemedAt: string;
  pointsUsed: number;
  status: 'success' | 'pending' | 'failed';
};
