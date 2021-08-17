import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SipliPortfolioComponent } from './sipli-portfolio.component';

describe('SipliPortfolioComponent', () => {
  let component: SipliPortfolioComponent;
  let fixture: ComponentFixture<SipliPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SipliPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SipliPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
