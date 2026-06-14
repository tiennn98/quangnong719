export type RedemptionMethodId = 'store' | 'delivery';

export type GiftFeature = {
  id: string;
  title: string;
  description: string;
  icon: 'shield' | 'droplet' | 'leaf';
};

export type RedemptionMethod = {
  id: RedemptionMethodId;
  title: string;
  description: string;
  icon: 'store' | 'truck';
};

export type GiftDetailData = {
  id: string;
  title: string;
  points: number;
  description: string;
  inStock: boolean;
  features: GiftFeature[];
  methods: RedemptionMethod[];
  stockRemaining: number;
  stockTotal: number;
  stockUpdatedAt: string;
  currentPoints: number;
};
