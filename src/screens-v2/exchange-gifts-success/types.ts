export type NextStep = {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: 'store' | 'box' | 'truck';
};

export type RedemptionSuccessData = {
  giftTitle: string;
  giftPoints: number;
  giftDescription: string;
  remainingPoints: number;
  nextSteps: NextStep[];
};
