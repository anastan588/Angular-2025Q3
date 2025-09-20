import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTabDialog } from './add-tab.dialog';

describe('AddTabDialog', () => {
  let component: AddTabDialog;
  let fixture: ComponentFixture<AddTabDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTabDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTabDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
