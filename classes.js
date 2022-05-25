// book class
class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
// =============================================================
// Creating the list
class creatBook {
  // display books
  static displayBooks() {
    const books = store.getBooks();
    // localStorage.clear();
    if(books !== null){
      books.forEach((book) => creatBook.createBookElements(book));
    }
    // no books found
  }

  // creat books and add them in the UI

  static createBookElements(book) {
    const bookContainer = document.querySelector(".books");
    const bookDiv = document.createElement("div");
    const bookName = document.createElement("h2");
    const authorName = document.createElement("h2");
    const btn = document.createElement("button");
    btn.classList.add("delete");

    bookDiv.classList.add("container");

    // Fill the elements
    bookName.innerText = book.title;
    authorName.innerText = book.author;
    btn.innerHTML = "Delete";

    // For showing the above staff in browser we have to append them
    bookDiv.append(bookName, authorName, btn);

    // This div must also append to some where in HTML so
    bookContainer.appendChild(bookDiv);
  }

  // remove logic
  static delete(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.remove();
    }
  }

  // clear fields
  static clearfields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
  }
}
// =============================================================

// Local storage
class store {
  static bookLocalStorage() {
    return JSON.parse(localStorage.getItem("books"));
  }
  static getBooks() {
    
    return store.bookLocalStorage();
  }

  static addBook(book) {
    let books = store.bookLocalStorage() ? store.bookLocalStorage() : [];
    if(Array.isArray( books ) ) {
      books.push(book);
    }
    localStorage.setItem("books", JSON.stringify(books));
  }

 static removeBook(index) {
    const books = store.getBooks()
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
    };
  }

// =============================================================
// display books
document.addEventListener("DOMContentLoaded", creatBook.displayBooks);

// =============================================================
// Add book

document.getElementById("book-form").addEventListener("submit", (event) => {
  // preventDefault
  event.preventDefault();
  // get values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  // create New book
  const book = new Books(title, author);

  // Add book to the page
  creatBook.createBookElements(book);

  // Add book to local storage
  store.addBook(book);
  // clear the fields
  creatBook.clearfields();
});

// =============================================================
// Remove book

document.querySelector(".books").addEventListener("click", (e) => {
  creatBook.delete(e.target);
  store.removeBook();
});
