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

const cardCollectionDiv = document.querySelector(".card-collection")

function displayBook() {
    // for (let i = 0; i < myLibrary.length; i++) {
    //     console.log(myLibrary[i])
    // }

}


function createHTMLElements(arrOfFormData) {
    const cardContainerDiv = document.createElement("div");
    cardContainerDiv.classList.add("card-container");
    cardCollectionDiv.appendChild(cardContainerDiv);

    const img = document.createElement("img");
    img.classList.add("image");
    cardContainerDiv.appendChild(img);
    img.src = "images/image-3.avif";


    const cardContentDiv = document.createElement("div");
    cardContentDiv.classList.add("card-content")
    cardContainerDiv.appendChild(cardContentDiv);

    const bookHeading = document.createElement("h2");
    bookHeading.classList.add("book-heading");
    cardContentDiv.appendChild(bookHeading);
    bookHeading.textContent = arrOfFormData[0];

    const authorName = document.createElement("p")
    authorName.classList.add("author-name");
    authorName.textContent = `${arrOfFormData[1]}`;
    cardContentDiv.appendChild(authorName);

    const pagesAndStatusDiv = document.createElement("div");
    pagesAndStatusDiv.classList.add("pages-and-status");
    cardContentDiv.appendChild(pagesAndStatusDiv);

    const pages = document.createElement("p")
    pages.classList.add("pages");
    pages.textContent = `${arrOfFormData[2]} pages`
    pagesAndStatusDiv.appendChild(pages);

    const status = document.createElement("p")
    status.classList.add("status");
    status.textContent = `${arrOfFormData[3]}`
    pagesAndStatusDiv.appendChild(status);

    const statusAndRemoveBtn = document.createElement("div");
    statusAndRemoveBtn.classList.add("status-button-and-remove-button");
    cardContentDiv.append(statusAndRemoveBtn);

    const changeStatusBtn = document.createElement("button");
    changeStatusBtn.classList.add("change-status-btn")
    changeStatusBtn.textContent = "Change Status";
    statusAndRemoveBtn.append(changeStatusBtn);

    const removeBtn = document.createElement("img");
    removeBtn.classList.add("remove-btn");
    removeBtn.src = "images/remove-btn.svg"
    statusAndRemoveBtn.append(removeBtn);
}

addBookToLibrary("Red Rising", "Pierce Brown", 382, "To Be Read");
// addBookToLibrary("Blue Rising", "Blue Yellow", 82, "Dropped");
// addBookToLibrary("Mistborn", "Bander Sanderson", 800, "Completed");
// addBookToLibrary("The Way of The Kings", "Brandon Sanderson", 1100, "To Be Read")

// displayBooks()


const dialog = document.getElementById("my-dialog");
const closeBtn = document.getElementById("close-dialog-btn");
const openBtn = document.getElementById("open-dialog-btn");
const submitBtn = document.getElementById("submit-form-btn")
const formToGetNewData = document.querySelector(".form-to-get-new-data");

openBtn.addEventListener("click", () => {
    dialog.showModal();
})

closeBtn.addEventListener("click", function () {
    dialog.close();
})

submitBtn.addEventListener("click", () => {
    event.preventDefault();
    const arrOfFormData = getFormData();
    createHTMLElements(arrOfFormData);
    addContentToHTMLElements(arrOfFormData);
    dialog.close();
})

function getFormData() {
    const formData = new FormData(formToGetNewData);

    let arrOfValues = []
    for (const [key, value] of formData) {
        arrOfValues.push(value)
    }

    const title = arrOfValues[0];
    const author = arrOfValues[1];
    const noOfPages = arrOfValues[2];
    const readingStatus = arrOfValues[3]

    addBookToLibrary(title, author, noOfPages, readingStatus);
    return [title, author, noOfPages, readingStatus]

}