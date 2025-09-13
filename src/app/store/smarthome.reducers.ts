import { createReducer, on } from '@ngrx/store';
import { InitialDashboardstate } from './smarthome.store';
import * as dashboardActions from './smarthome.actions';
import { Data } from '../data/types';

export const dashboardReducer = createReducer(
  InitialDashboardstate,
  on(dashboardActions.enterEditMode, (state, { originalDashboard }) => ({
    ...state,
    isEditing: true,
    currentDashboard: originalDashboard,
    originalDashboard: originalDashboard,
  })),
  on(dashboardActions.exitEditMode, (state) => ({
    ...state,
    isEditing: false,
    currentDashboard: {} as Data, 
    originalDashboard: {} as Data, 
  })),
);
