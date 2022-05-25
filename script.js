// DOM Element from HTML
const bookForm = document.getElementById('book-form');
const bookContainer = document.querySelector('.books');

// Get an input from HTML by it's parent
const inName = bookForm.book;
const inAuthor = bookForm.author;

// Create an array to push books on that
const books = JSON.parse(localStorage.getItem('books')) || [];

const addBooks = (book, author) => {
  books.push({
    book,
    author,
  });

  localStorage.setItem('books', JSON.stringify(books));

  return { book, author };
};

// Create HTML Elements and Books Characterstics In DOM
const createBookElements = ({ book, author }, index) => {
  const bookDiv = document.createElement('div');
  const bookName = document.createElement('h2');
  const authorName = document.createElement('h2');
  const btn = document.createElement('button');

  bookDiv.classList.add('container');

  // Fill the elements
  bookName.innerText = book;
  authorName.innerText = author;
  btn.innerHTML = 'Delete';

  btn.addEventListener('click', (event2) => {
    event.target.parentElement.remove();
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
  });

  // For showing the above staff in browser we have to append them
  bookDiv.append(bookName, authorName, btn);

  // This div must also append to some where in HTML so
  bookContainer.appendChild(bookDiv);
};

books.forEach(createBookElements);

bookForm.onsubmit = (event) => {
  event.preventDefault();

  const newBook = addBooks(inName.value, inAuthor.value);

  createBookElements(newBook);

  inName.value = '';
  inAuthor.value = '';
};

// removeButton.onClick = (event2) => {
// 	const remove = books.filter((book) => {
// 		book.event2.toString() !== event2
// 	});

// }