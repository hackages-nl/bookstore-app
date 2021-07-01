import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Book } from '../types/book';
import { books as mockBooks } from '../mocks/books';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  headerTitle = 'Bookstore by Hackages';

  constructor() {}

  @ViewChild('searchInput')
  searchInput: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }

  // Use mock data
  books: Book[] = mockBooks;
  selected: string;

  get categories() {
    // const cats = {};

    // mockBooks.forEach((book) => {
    //   if (!cats[book.category]) {
    //     cats[book.category] = '';
    //   }
    // });
    // return Object.keys(cats);
    return Array.from(new Set(mockBooks.map((book) => book.category)));
  }

  search() {
    const term = this.searchInput.nativeElement.value;
    // Search books by category and by title
    this.books = mockBooks.filter((book) =>
      book.title.toLowerCase().includes(term.toLowerCase())
    );

    this.books = this.books.filter(book =>
      !this.selected || this.selected === book.category
    )
  }

  reset() {
    // Implement the reset button
    this.searchInput.nativeElement.value = '';
    this.selected = '';
    this.search();
  }

  selectCategory(category: string) {
    this.selected = category;
    this.search();
  }
}
