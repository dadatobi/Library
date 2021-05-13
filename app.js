let myLibrary;
myLibrary = [{ title: "5a.m club", author: "Robin Sharma", pages: "1000", readState: "Finished" },
{ title: "Phoenix", author: "Russ Doe", pages: "1000", readState: "Unfinished" }];

const bookForm = document.querySelector('#btn');
const form = document.querySelector('.form-wrapper');
const closeForm = document.querySelector('.close');
const addBook = document.querySelector('.form-button');
const bookshel = document.querySelector('.book-shelf');
const books = document.querySelector('.books');
const caDiv = document.querySelector('#catalogue');


class Book {
  constructor(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
  }
};

function addBookToLibrary(title, author, pages, readState) {
  title = document.querySelector('#title').value;
  author = document.querySelector('#author').value;
  pages = document.querySelector('#pages').value;
  readState = document.querySelector('#checkread').value;

  const newBook = new Book(title, author, pages, readState);
  if (myLibrary.some((book) => book.title === newBook.title) && myLibrary.some((book) => book.author === newBook.author)) {
    alert('You already have the book');
    return;
  }else if( title === '' && author === '' ){
    alert('you book details are empty');
    return;
  } else {
    myLibrary.push(newBook);
    saveToLs();
  }
};

function myLibraryCount() {
  const cataCard = document.createElement('div');
  const caTitle = document.createElement('h3');
  const caBooks = document.createElement('div'); 
  const caRead = document.createElement('div');
  const authoDetails = document.createElement('div');

  cataCard.setAttribute('id', 'card');

  caTitle.setAttribute('id', 'cata-title');
  caTitle.textContent = 'My Catalogue';
  cataCard.appendChild(caTitle);

  caBooks.setAttribute('id', 'book-no');
  caBooks.textContent = 'Number of Book(s): '+ myLibrary.length;
  cataCard.appendChild(caBooks);

  caRead.setAttribute('id', 'no-of-read');
  const readCount = myLibrary.filter((book)=>book.readState === 'Finished');
  caRead.textContent ='Number of Book(s) finished: '+ readCount.length
  cataCard.appendChild(caRead);

  authoDetails.setAttribute('id', 'a-details');
  authoDetails.textContent = 'Library App created by DadaTobi';
  
  caDiv.appendChild(cataCard);
  caDiv.appendChild(authoDetails);
}
function newBookInput(e) {
  e.preventDefault();
  addBookToLibrary();
  displayBooks();
  closePopUp();
  document.querySelector('form').reset();
};

function displayBooks() {
  bookshel.innerHTML="";
  for (let items of myLibrary) {
    acceptBooks(items);
  }
  caDiv.innerHTML = "";
  myLibraryCount();
};

function acceptBooks(items) {
  const bookDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const pagesDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const bookStatus = document.createElement('div');
  const readBtn = document.createElement('button');
  const delBtn = document.createElement('button');

  bookDiv.setAttribute("id", 'book');

  titleDiv.textContent = items.title;
  titleDiv.classList.add('title');
  bookDiv.appendChild(titleDiv);

  pagesDiv.textContent = items.pages + ' pages';
  pagesDiv.classList.add('pages');
  bookDiv.appendChild(pagesDiv);

  authorDiv.textContent = items.author;
  authorDiv.classList.add('author');
  bookDiv.appendChild(authorDiv);

  bookStatus.textContent = items.readState;
  bookStatus.classList.add('bks');
  bookDiv.appendChild(bookStatus);

  readBtn.classList.add('read');
  readBtn.textContent = 'Read';
  bookDiv.appendChild(readBtn);

  delBtn.classList.add('delb')
  delBtn.textContent = 'Delete';
  bookDiv.appendChild(delBtn);

  bookshel.appendChild(bookDiv);

   
  delBtn.addEventListener('click', ()=> { 
    myLibrary.splice(myLibrary.indexOf(items),1);
    saveToLs();
    displayBooks();
  });

  readBtn.addEventListener('click', ()=>{
    switch(items.readState){
      case 'Finished':
        items.readState = 'Unfinished';
        bookStatus.textContent = items.readState;
        break;
      case 'Unfinished':
        items.readState = 'Finished';
        bookStatus.textContent = items.readState;
        break;
    }
    saveToLs();
    displayBooks();
  });
};
function closePopUp() {
  form.style.display = 'none';
};

function saveToLs() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

//get books from local storage
function restoreFromLs() {
  if(!localStorage.myLibrary) {
      displayBooks();
  }else {
      objects = localStorage.getItem('myLibrary')
      objects = JSON.parse(objects);
      myLibrary = objects;
      displayBooks();
  }
}

function eventListener(){
  bookForm.addEventListener('click', () => {
    form.style.display = 'flex';
  });

  addBook.addEventListener('click', newBookInput);

  closeForm.addEventListener('click', closePopUp);

};

eventListener();
restoreFromLs();
