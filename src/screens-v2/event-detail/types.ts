export type EventFeatureIcon = 'sprout' | 'shield' | 'chart' | 'message';

export type EventFeature = {
  id: string;
  label: string;
  icon: EventFeatureIcon;
};

export type EventSpeaker = {
  id: string;
  name: string;
  title: string;
};

export type EventDetailData = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  date: string;
  time: string;
  location: string;
  intro: string;
  features: EventFeature[];
  startTime: string;
  fullLocation: string;
  seatsRemaining: number;
  seatsTotal: number;
  giftsSummary: string;
  mainContent: string[];
  speakers: EventSpeaker[];
  participationGifts: string;
  conditions: string;
};
