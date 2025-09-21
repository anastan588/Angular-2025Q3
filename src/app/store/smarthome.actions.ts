import { createAction, props } from '@ngrx/store';
import { Card, Data, Tab } from '../data/types';

export const enterEditMode = createAction(
  '[Dashboard] Load Dashboard',
  props<{ originalDashboard: Data }>(),
);

export const exitEditMode = createAction('[Dashboard] Exit Dashboard');

export const addTab = createAction(
  '[Dashboard] Add Tab',
  props<{ newTab: Tab }>(),
);

export const deleteTab = createAction(
  '[Dashboard] Delete Tab',
  props<{ tabId: string }>(),
);

export const updateTabTitle = createAction(
  '[Dashboard] Update Tab',
  props<{ tabId: string; newTitle: string }>(),
);

export const reorderTabs = createAction(
  '[Dashboard] Reorder Tab',
  props<{ tabId: string; direction: 'left' | 'right' }>(),
);

export const addCard = createAction(
  '[Dashboard] Add Card',
  props<{ tabId: string, newCard: Card }>(),
);

export const deleteCard = createAction(
  '[Dashboard] delete Card',
  props<{ tabId: string, cardId: string }>(),
);
