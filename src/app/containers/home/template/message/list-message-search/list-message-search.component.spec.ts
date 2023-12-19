import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMessageSearchComponent } from './list-message-search.component';

describe('ListMessageSearchComponent', () => {
  let component: ListMessageSearchComponent;
  let fixture: ComponentFixture<ListMessageSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMessageSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMessageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
