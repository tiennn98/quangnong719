export type NotificationTabId = 'all' | 'event' | 'debt' | 'invoice';

export type NotificationStatusTone = 'new' | 'important' | 'read';

export type NotificationLabelTone = 'green' | 'orange' | 'none';

export type NotificationItem = {
  id: string;
  tab: NotificationTabId;
  label?: string;
  labelTone?: NotificationLabelTone;
  title: string;
  description: string;
  time: string;
  date: string;
  status: string;
  statusTone: NotificationStatusTone;
  highlighted?: boolean;
  thumbnailBadge?: 'clock';
};
