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
  })),
  on(dashboardActions.exitEditMode, (state) => ({
    ...state,
    isEditing: false,
    currentDashboard: {} as Data,
  })),
  on(dashboardActions.addTab, (state, { newTab }) => ({
    ...state,
    currentDashboard: {
      ...state.currentDashboard,
      tabs: [...state.currentDashboard.tabs, newTab],
    },
  })),
  on(dashboardActions.deleteTab, (state, { tabId }) => ({
    ...state,
    currentDashboard: {
      ...state.currentDashboard,
      tabs: state.currentDashboard.tabs.filter((tab) => tab.id !== tabId),
    },
  })),
  on(dashboardActions.updateTabTitle, (state, { tabId, newTitle }) => ({
    ...state,
    currentDashboard: {
      ...state.currentDashboard,
      tabs: state.currentDashboard.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, title: newTitle } : tab,
      ),
    },
  })),
  on(dashboardActions.reorderTabs, (state, { tabId, direction }) => {
    const tabs = [...state.currentDashboard.tabs];
    const currentIndex = tabs.findIndex((tab) => tab.id === tabId);
    if (currentIndex >= 0) {
      if (direction === 'left' && currentIndex > 0) {
        const [movedTab] = tabs.splice(currentIndex, 1);
        tabs.splice(currentIndex - 1, 0, movedTab);
      } else if (direction === 'right' && currentIndex < tabs.length - 1) {
        const [movedTab] = tabs.splice(currentIndex, 1);
        tabs.splice(currentIndex + 1, 0, movedTab);
      }
    }
    return {
      ...state,
      currentDashboard: {
        ...state.currentDashboard,
        tabs,
      },
    };
  }),
);
