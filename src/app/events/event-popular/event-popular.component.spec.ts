import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPopularComponent } from './event-popular.component';

describe('EventPopularComponent', () => {
  let component: EventPopularComponent;
  let fixture: ComponentFixture<EventPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventPopularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
