import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Card } from '../data/types';
import { addCard, deleteCard } from '../store/smarthome.actions';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private store: Store) {}

  addNewCardToStore(newCard: Card, tabId: string) {
    if (newCard) {
      this.store.dispatch(addCard({ tabId: tabId, newCard: newCard }));
    }
    return;
  }
  deleteCardByIdFromStore(cardId: string, tabId: string) {
    if (cardId) {
      this.store.dispatch(deleteCard({ tabId: tabId, cardId: cardId }));
    }
    return;
  }
}
