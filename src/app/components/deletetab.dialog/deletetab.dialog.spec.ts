import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetabDialog } from './deletetab.dialog';

describe('DeletetabDialog', () => {
  let component: DeletetabDialog;
  let fixture: ComponentFixture<DeletetabDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletetabDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletetabDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
