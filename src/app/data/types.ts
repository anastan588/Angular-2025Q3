interface Value {
  amount: number;
  unit: string;
}

export interface Item {
  type: 'sensor' | 'device';
  icon: string;
  label: string;
  value?: Value;
  state?: boolean;
}

export interface Card {
  id: string;
  title: string;
  layout: 'horizontalLayout' | 'verticalLayout' | 'singleDevice';
  items: Item[];
}

interface Tab {
  id: string;
  title: string;
  cards: Card[];
}

export interface Data {
  tabs: Tab[];
}

export interface AuthResponse {
  token: string;
}

export interface User {
  fullName: string;
  initials: string;
}

export interface ProfileResponse {
  fullName: string;
  initials: string;
}
