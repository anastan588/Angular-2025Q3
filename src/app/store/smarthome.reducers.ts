import { createReducer, on } from "@ngrx/store";
import { InitialDashboardstate } from "./smarthome.store";
import * as dashboardActions from './smarthome.actions';

export const dashboardReducer = createReducer(
  InitialDashboardstate,
  on(dashboardActions.loadDashboard, (state) => ({
    ...state,
  })),
)