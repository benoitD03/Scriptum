import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchedComponent } from './book-searched.component';

describe('BookSearchedComponent', () => {
  let component: BookSearchedComponent;
  let fixture: ComponentFixture<BookSearchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSearchedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
