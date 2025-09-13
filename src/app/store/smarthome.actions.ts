import { createAction, props } from '@ngrx/store';
import { Data } from '../data/types';

export const enterEditMode = createAction(
  '[Dashboard] Load Dashboard',
  props<{ originalDashboard: Data }>(),
);

export const exitEditMode = createAction('[Dashboard] Exit Dashboard');