import { Data } from "@angular/router";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "./smarthome.store";

export const currentDashboardSelector = createFeatureSelector<DashboardState>('dashboard');


export const loadCurrentDashboard = createSelector(
  currentDashboardSelector,
  (state: DashboardState) => state.currentDashboard 
);

export const loadEditingMode = createSelector(
  currentDashboardSelector,
  (state: DashboardState) => state.isEditing 
);