function Book(name, authorName, pages, read){
    this.id = crypto.randomUUID();
    this.name = name;
    this.authorName = authorName;
    this.pages = pages;

    if(read == true){
        read = "Read";
    } else {
        read = "Not Read";
    }

    this.read = read;
}

const library = [];

function addBookToLibrary(name, authorName, pages, read){
    const book = new Book(name, authorName, pages, read);
    library.push(book);
}

function displayBook(name, authorName, pages, read){
    const book_card = document.createElement("div");
    book_card.classList.add("book-card");
    book_card.dataset.id = book.id;

    const nameElement = document.createElement("h3");
    nameElement.textContent = name

    const authorNameElement = document.createElement("p");
    authorNameElement.textContent = authorName;

    const pagesElement = document.createElement("p");
    pagesElement.textContent = pages;

    const readElement = document.createElement("p");
    readElement.textContent = read;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    
    book_card.appendChild(removeButton);
    book_card.appendChild(nameElement);
    book_card.appendChild(authorNameElement);
    book_card.appendChild(pagesElement);
    book_card.appendChild(readElement);

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

    addBookToLibrary(titleId, authorId, pageId, readStatus);
    displayBook(titleId, authorId, pageId, readStatus)
    dialog.close();
})
