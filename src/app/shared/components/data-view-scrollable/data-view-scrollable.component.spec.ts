import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewScrollableComponent } from './data-view-scrollable.component';

describe('DataViewScrollableComponent', () => {
  let component: DataViewScrollableComponent;
  let fixture: ComponentFixture<DataViewScrollableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataViewScrollableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataViewScrollableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
