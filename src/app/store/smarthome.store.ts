import { Data } from '../data/types';

export interface DashboardState {
  isEditing: boolean;
  currentDashboard: Data;
}

export const InitialDashboardstate: DashboardState = {
  isEditing: false,
  currentDashboard: {} as Data,
};
