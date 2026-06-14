export type GardenStageTone = 'green' | 'yellow' | 'blue' | 'orange';

export type GardenHealthTone = 'good' | 'warning';

export type GardenItem = {
  id: string;
  name: string;
  variety: string;
  area: string;
  location: string;
  stage: string;
  stageTone: GardenStageTone;
  health: string;
  healthTone: GardenHealthTone;
  upcomingTaskDate: string;
  upcomingTaskName: string;
};
