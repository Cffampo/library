function Book(name, authorName, pages, read){
    this.id = crypto.randomUUID();
    this.name = name;
    this.authorName = authorName;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function(){
    console.log("Toggling read status for", this.name, "Current status:", this.read);
    if(this.read == "Read"){
        this.read = "Not Read";
    } else {
        this.read = "Read";
    }
}

const library = [];

function addBookToLibrary(name, authorName, pages, read){
    const book = new Book(name, authorName, pages, read);
    library.push(book);
    return book;
}

function displayBook(name, authorName, pages, read, id){
    const book_card = document.createElement("div");
    book_card.classList.add("book-card");
    book_card.dataset.id = id;

    const nameElement = document.createElement("h3");
    nameElement.textContent = name

    const authorNameElement = document.createElement("p");
    authorNameElement.textContent = authorName;

    const pagesElement = document.createElement("p");
    pagesElement.textContent = pages;

    const readElement = document.createElement("p");
    readElement.textContent = read;
    readElement.classList.add("read-status");

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = "Update";
    
    book_card.appendChild(nameElement);
    book_card.appendChild(authorNameElement);
    book_card.appendChild(pagesElement);
    book_card.appendChild(readElement);
    book_card.appendChild(removeButton);
    book_card.appendChild(toggleReadButton);

    document.querySelector(".book-container").appendChild(book_card);

    removeButton.addEventListener("click", function(){

         for(let i = 0; i < library.length; i++){
            if(library[i].id == book_card.dataset.id){
                library.splice(i, 1);
                break;
            }
        }

        removeButton.parentElement.remove();
    })

    toggleReadButton.addEventListener("click", function(){
        for(let i = 0; i < library.length; i++){
            if(library[i].id === book_card.dataset.id){
                library[i].toggleReadStatus();
                const readStatusElement = book_card.querySelector(".read-status");
                readStatusElement.textContent = library[i].read;
                break;
            }
        }

    })
}

const dialog = document.getElementById("book-dialog");
const newBookButton = document.getElementById("open-dialog");
newBookButton.addEventListener("click", function(){
    dialog.showModal();
});

const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", function(){
    dialog.close();
})


const addBookToLibraryButton = document.getElementById("book-form");
addBookToLibraryButton.addEventListener('submit', function(e){
    e.preventDefault();

    const titleId = document.getElementById("title").value;
    const authorId = document.getElementById("author").value;
    const pageId = document.getElementById("pages").value;
    const readStatus = document.getElementById("read-status").value;

    const book = addBookToLibrary(titleId, authorId, pageId, readStatus);
    displayBook(book.name, book.authorName, book.pages, book.read, book.id);
    dialog.close();
})
