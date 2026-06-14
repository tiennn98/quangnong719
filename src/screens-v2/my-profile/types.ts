export type QuickNavId = 'qr' | 'garden' | 'debt' | 'points';

export type OverviewStat = {
  id: string;
  label: string;
  value: string;
  subtext: string;
  tone: 'green' | 'red' | 'blue';
  icon: 'bag' | 'wallet' | 'tree' | 'calendar';
};

export type FeaturedInfoItem = {
  id: string;
  label: string;
  value: string;
  icon: 'user' | 'map' | 'leaf' | 'cake';
};

export type QuickTaskId = 'edit' | 'history' | 'notification' | 'support';

export type ProfileGardenItem = {
  id: string;
  name: string;
  area: string;
  location: string;
  crop: string;
  nextTask: string;
  nextTaskDate: string;
};

export type ProfileData = {
  fullName: string;
  phone: string;
  customerCode: string;
  memberLabel: string;
  points: number;
  currentDebt: string;
  overview: OverviewStat[];
  featuredInfo: FeaturedInfoItem[];
  gardens: ProfileGardenItem[];
};
