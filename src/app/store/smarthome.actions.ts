import { createAction, props } from '@ngrx/store';
import { Data, Tab } from '../data/types';

export const enterEditMode = createAction(
  '[Dashboard] Load Dashboard',
  props<{ originalDashboard: Data }>(),
);

export const exitEditMode = createAction('[Dashboard] Exit Dashboard');

export const addTab = createAction(
  '[Dashboard] Add Tab',
  props<{ newTab: Tab}>(),
);

export const deleteTab = createAction(
  '[Dashboard] Delete Tab',
  props<{ tabId: string}>(),
);