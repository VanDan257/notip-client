import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInforClientComponent } from './detail-infor-client.component';

describe('DetailInforClientComponent', () => {
  let component: DetailInforClientComponent;
  let fixture: ComponentFixture<DetailInforClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailInforClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailInforClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
