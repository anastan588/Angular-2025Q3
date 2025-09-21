import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardDialog } from './add-card.dialog';

describe('AddCardDialog', () => {
  let component: AddCardDialog;
  let fixture: ComponentFixture<AddCardDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCardDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCardDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
