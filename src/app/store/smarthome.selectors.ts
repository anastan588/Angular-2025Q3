import { Data } from "@angular/router";
import { createFeatureSelector } from "@ngrx/store";

export const currentDashboardSelector = createFeatureSelector<Data>('CurrentDashboard');