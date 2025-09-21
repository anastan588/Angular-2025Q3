import { Data } from '@angular/router';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './smarthome.store';

export const currentDashboardSelector =
  createFeatureSelector<DashboardState>('dashboard');

export const loadCurrentDashboard = createSelector(
  currentDashboardSelector,
  (state: DashboardState) => state.currentDashboard,
);

export const loadEditingMode = createSelector(
  currentDashboardSelector,
  (state: DashboardState) => state.isEditing,
);

export const loadCardsFromTbById = (tabId: string) =>
  createSelector(currentDashboardSelector, (state: DashboardState) => {
    if (state.currentDashboard.tabs) {
      const tab = state.currentDashboard.tabs.find((tab) => tab.id === tabId);
      return tab ? tab.cards : [];
    }
    return [];
  });
