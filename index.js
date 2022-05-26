/* eslint max-classes-per-file: ["error", 3] */
// book class
class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Local storage
class Store {
  static bookLocalStorage() {
    return JSON.parse(localStorage.getItem('books'));
  }

  static getBooks() {
    return Store.bookLocalStorage();
  }

  static addBook(book) {
    const books = Store.bookLocalStorage() ? Store.bookLocalStorage() : [];
    if (Array.isArray(books)) {
      books.push(book);
    }
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(index) {
    const books = Store.getBooks();
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Creating the list
class CreatBook {
  // display books
  static displayBooks() {
    const books = Store.getBooks();
    // localStorage.clear();
    if (books !== null) {
      books.forEach((book) => CreatBook.createBookElements(book));
    }
    // no books found
  }

  // creat books and add them in the UI

  static createBookElements(book) {
    const bookContainer = document.querySelector('.books');
    const bookDiv = document.createElement('div');
    const bookName = document.createElement('h2');
    const authorName = document.createElement('h2');
    const btn = document.createElement('button');
    btn.classList.add('delete');

    bookDiv.classList.add('container');

    // Fill the elements
    bookName.innerText = book.title;
    authorName.innerText = book.author;
    btn.innerHTML = 'Delete';

    // For showing the above staff in browser we have to append them
    bookDiv.append(bookName, authorName, btn);

    // This div must also append to some where in HTML so
    bookContainer.appendChild(bookDiv);
  }

  static openListPage() {
    const bookList = document.getElementById('list');
    const listSection = document.querySelector('.list-section');
    const addSection = document.querySelector('.add-section');
    const contactSection = document.querySelector('.contact-section');
    bookList.addEventListener('click', () => {
      addSection.classList.add('hidden');
      listSection.classList.remove('hidden');
      contactSection.classList.add('hidden');
    });
  }

  static openAddPage() {
    const bookList = document.getElementById('add');
    const listSection = document.querySelector('.list-section');
    const addSection = document.querySelector('.add-section');
    const contactSection = document.querySelector('.contact-section');
    bookList.addEventListener('click', () => {
      addSection.classList.remove('hidden');
      listSection.classList.add('hidden');
      contactSection.classList.add('hidden');
    });
  }

  static openContactPage() {
    const bookList = document.getElementById('contact');
    const listSection = document.querySelector('.list-section');
    const addSection = document.querySelector('.add-section');
    const contactSection = document.querySelector('.contact-section');
    bookList.addEventListener('click', () => {
      addSection.classList.add('hidden');
      listSection.classList.add('hidden');
      contactSection.classList.remove('hidden');
    });
  }

  // remove logic
  static delete(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }

  // clear fields
  static clearfields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
}

// display books
document.addEventListener('DOMContentLoaded', CreatBook.displayBooks);

// =============================================================
// Add book

document.getElementById('book-form').addEventListener('submit', (event) => {
  // preventDefault
  event.preventDefault();
  // get values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  // create New book
  const book = new Books(title, author);

  // Add book to the page
  CreatBook.createBookElements(book);

  // Add book to local storage
  Store.addBook(book);
  // clear the fields
  CreatBook.clearfields();
});

// =============================================================
// Remove book

document.querySelector('.books').addEventListener('click', (e) => {
  CreatBook.delete(e.target);
  Store.removeBook();
});

CreatBook.openListPage();
CreatBook.openAddPage();
CreatBook.openContactPage();
