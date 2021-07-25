import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordCreateComponent } from './keyword-create.component';

describe('KeywordCreateComponent', () => {
  let component: KeywordCreateComponent;
  let fixture: ComponentFixture<KeywordCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
