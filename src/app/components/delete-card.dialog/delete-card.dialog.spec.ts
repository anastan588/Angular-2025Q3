import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCardDialog } from './delete-card.dialog';

describe('DeleteCardDialog', () => {
  let component: DeleteCardDialog;
  let fixture: ComponentFixture<DeleteCardDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCardDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCardDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
