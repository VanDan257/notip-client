import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDetailChatRoomComponent } from './info-detail-chat-room.component';

describe('InfoDetailChatRoomComponent', () => {
  let component: InfoDetailChatRoomComponent;
  let fixture: ComponentFixture<InfoDetailChatRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDetailChatRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDetailChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
