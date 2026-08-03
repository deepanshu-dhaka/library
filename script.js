const myLibrary = [];

function Book(title, author, noOfPages, readingStatus, bookId) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.readingStatus = readingStatus;
    this.bookId = bookId;
}

function addBookToLibrary(title, author, noOfPages, readingStatus) {
    const bookId = crypto.randomUUID();
    const book = new Book(title, author, noOfPages, readingStatus, bookId);
    myLibrary.push(book);
}

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i])
    }
}

addBookToLibrary("Red Rising", "Pierce Brown", 382, "To Be Read");
addBookToLibrary("Blue Rising", "Blue Yellow", 82, "Dropped");
addBookToLibrary("Mistborn", "Bander Sanderson", 800, "Completed");
addBookToLibrary("The Way of The Kings", "Brandon Sanderson", 1100, "To Be Read")

displayBooks()


const dialog = document.getElementById("my-dialog");
const closeBtn = document.getElementById("close-dialog-btn");
const openBtn = document.getElementById("open-dialog-btn");
const submitBtn = document.getElementById("submit-form-btn")

openBtn.addEventListener("click", () => {
    dialog.showModal();
})

closeBtn.addEventListener("click", function () {
    dialog.close();
})

submitBtn.addEventListener("click", () => {
    event.preventDefault();
    dialog.close();
})
