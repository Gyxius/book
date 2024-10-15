/////////////////////////// BOOK CONSTRUCTOR ///////////////////////////////
function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.info = function() {
      if (this.read) {
        return this.title + " by " + this.author + ", " + this.pages + " pages" + ", " + "read";
      }
      else {
        return this.title + " by " + this.author + ", " + this.pages + " pages" + ", " + "not read yet";
      }
    }
    this.displayBook = function() {
        //  loops through the array and displays each book on the page
        const articlesDiv = document.getElementById("articles");
        let newDiv = document.createElement("div");
        newDiv.classList.add('article');
        newDiv.setAttribute('data-index', this.id);
        newDiv.innerHTML += `
                            <p>${this.title}</p>
                            <p>by ${this.author}, ${this.pages} pages
                                <div class="article-icons">
                                    <img src="images/delete.svg" class="remove" data-index=${this.id}>
                                    <img src="images/read.svg" class="toggle" data-index=${this.id}>
                                    <img src="images/share-variant-outline.svg">
                                </div>
                            <p>Read: ${this.read}</p>
                            </p>
                            `
        articlesDiv.appendChild(newDiv);
    }
  }
/////////////////////////// LIBRARY CONSTRUCTOR ///////////////////////////////
function Library() {
    this.myLibrary = [];
    this.id = 0;
    this.addBookToLibrary = function(bookTitle, bookAuthor, bookPages, bookRead) {
            this.myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookRead, this.id));
            this.id += 1;
    }
    this.displayLibrary = function() {
        for (let book of this.myLibrary) {
            let element = document.querySelector(`div.article[data-index="${book.id}"]`);
            if (element === null || element === undefined ) {
                book.displayBook();
            }  
        }
    }
    this.resetPage = function() {
        let articleDivs = document.querySelectorAll('.article');
        articleDivs.forEach(article => {
            article.remove();
        });
    }
    this.removeBookFromLibrary = function(bookId) {
        for (let i = 0; i<this.myLibrary.length; i++) {
            if (this.myLibrary[i].id === Number(bookId)) {
                console.log("Found book with ID:", bookId);
                this.myLibrary.splice(i, 1);
                break;
            }
        }
        // RESET PAGE
        this.resetPage();
        this.displayLibrary();
    }

    this.updateReadStatus = function(bookId) {
        for (let i = 0; i<this.myLibrary.length; i++) {
            if (this.myLibrary[i].id === Number(bookId)) {
                this.myLibrary[i].read = !this.myLibrary[i].read;
                break;
            }
        }
        // RESET PAGE
        this.resetPage();
        this.displayLibrary();
    }
}

const library = new Library()

library.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
library.addBookToLibrary("The Compound Effect", "Daren", 200, true);
library.displayLibrary()

/////////////////////////// FORM ////////////////////////////////////
const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener("click", buttonClick, false);

function buttonClick(event) {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.querySelector('input[name="read"]:checked').value;
    let hasRead = (read === "Yes"); 
    library.addBookToLibrary(title, author, pages, hasRead);

    // Reinitialize (clear) form values
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';

    // Reset radio buttons (uncheck them)
    let readRadios = document.getElementsByName('read');
    for (let i = 0; i < readRadios.length; i++) {
        readRadios[i].checked = false;
    }

    library.displayLibrary()
    event.preventDefault();
}


document.getElementById("articles").addEventListener("click", function(event) {
/////////////////////////// REMOVE BOOK ////////////////////////////////////
    if (event.target.classList.contains("remove")) {
        const dataIndex = event.target.getAttribute("data-index");
        library.removeBookFromLibrary(Number(dataIndex));
    }
/////////////////////////// UPDATE STATUS BOOK (READ) ////////////////////////////////////
    if (event.target.classList.contains("toggle")) {
        const dataIndex = event.target.getAttribute("data-index");
        library.updateReadStatus(Number(dataIndex));
    }

});
