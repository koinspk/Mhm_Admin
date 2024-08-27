import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageningComponent } from './pagening.component';

describe('PageningComponent', () => {
  let component: PageningComponent;
  let fixture: ComponentFixture<PageningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
