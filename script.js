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
    this.readingStatusCounter = 0;
}

const readingStatusArr = [
    "Currently Reading",
    "Finished",
    "Want to Read",
    "On Hold",
    "Dropped"
]



Book.prototype.changeReadingStatus = function (readingStatus) {
    let counter = readingStatusArr.indexOf(readingStatus);
    if (counter < 5) {
        if (counter == 4) {
            counter = 0;
        }
        else {
            counter = counter + 1;
        }
    }
    return readingStatusArr[counter];

}

function addBookToLibrary(title, author, noOfPages, readingStatus, bookId) {

    const book = new Book(title, author, noOfPages, readingStatus, bookId);
    myLibrary.push(book);
}

const cardCollectionDiv = document.querySelector(".card-collection")


function createHTMLElements(arrOfFormData) {
    const cardContainerDiv = document.createElement("div");
    cardContainerDiv.classList.add("card-container");
    cardContainerDiv.setAttribute("data-bookid", `${arrOfFormData[4]}`)
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
    status.textContent = `${arrOfFormData[3]}`;
    status.setAttribute("data-bookid", `${arrOfFormData[4]}`);
    pagesAndStatusDiv.appendChild(status);

    const statusAndRemoveBtn = document.createElement("div");
    statusAndRemoveBtn.classList.add("status-button-and-remove-button");
    cardContentDiv.append(statusAndRemoveBtn);

    const changeStatusBtn = document.createElement("button");
    changeStatusBtn.classList.add("change-status-btn")
    changeStatusBtn.textContent = "Change Status";
    changeStatusBtn.setAttribute("data-bookid", `${arrOfFormData[4]}`);
    statusAndRemoveBtn.append(changeStatusBtn);

    const removeBtn = document.createElement("img");
    removeBtn.classList.add("remove-btn");
    removeBtn.src = "images/remove-btn.svg"
    removeBtn.setAttribute("data-bookid", `${arrOfFormData[4]}`)
    statusAndRemoveBtn.append(removeBtn);

    removeBtn.addEventListener("click", function () {
        const id = event.target.getAttribute("data-bookid");

        const allCardContainers = document.querySelectorAll(".card-container")

        allCardContainers.forEach((cardContainer) => {

            if (cardContainer.dataset.bookid === id) {
                cardContainer.remove();
            }

        })



    })
    // changeStatusBtn.addEventListener("click", changeStatus);
    // function changeStatus() {
    //     const id = event.target.getAttribute("data-bookid");

    //     for (const obj of myLibrary) {
    //         if (obj.bookId === id) {
    //             obj.changeReadingStatus(obj.readingStatus);
    //             console.log(id)
    //         }
    //     }

    // }
}




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
    dialog.close();
})

function getFormData() {
    const formData = new FormData(formToGetNewData);
    const bookId = crypto.randomUUID();

    let arrOfValues = []
    for (const [key, value] of formData) {
        arrOfValues.push(value)
    }

    const title = arrOfValues[0];
    const author = arrOfValues[1];
    const noOfPages = arrOfValues[2];
    const readingStatus = arrOfValues[3]

    addBookToLibrary(title, author, noOfPages, readingStatus, bookId);
    return [title, author, noOfPages, readingStatus, bookId]

}



document.addEventListener("click", function () {

    let newStatus;
    let id = event.target.getAttribute("data-bookid");
    for (const obj of myLibrary) {
        if (obj.bookId == id) {
            obj.readingStatus = obj.changeReadingStatus(obj.readingStatus);
            newStatus = obj.readingStatus;
            console.log(obj.readingStatus);
        }
    }

    const allReadingStatusPara = document.querySelectorAll(".status");
    allReadingStatusPara.forEach(function (readingStatusPara) {
        if (id == readingStatusPara.getAttribute("data-bookid")) {
            readingStatusPara.textContent = newStatus;
        }
    })
})