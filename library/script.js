const addBtn = document.querySelector(".addBook")

const gridBox = document.querySelector(".grid");
const dialog = document.querySelector("dialog");
const dialogCancel = document.querySelector("#cancel");
const dialogSave = document.querySelector("#save");

const title = dialog.querySelector("#title");
const author = dialog.querySelector("#author");
const pages = dialog.querySelector("#pages");
const read = dialog.querySelector("#read");

const myLibrary = [];



function Book(title, author, pages, read){
    if (!new.target){
        throw Error("You must use the 'new' operator to call the constructor.");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = !!read;

    this.id = crypto.randomUUID();

    this.toggleRead = function(){
        this.read = !this.read;
    }
}



function addBook(title, author, pages, read){
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}



function updateShelf() {
    gridBox.replaceChildren();

    for(let x in myLibrary){
        const div = document.createElement("div");
        div.dataset.idNo = myLibrary[x].id;
        div.classList.add("book");

        const titleDisplay = document.createElement("h3");
        titleDisplay.textContent = myLibrary[x].title;
        titleDisplay.classList.add("title");
        div.appendChild(titleDisplay);

        const authorDisplay = document.createElement("p");
        authorDisplay.textContent = `by ${myLibrary[x].author}`;
        authorDisplay.classList.add("author");
        div.appendChild(authorDisplay);

        const lineBreak = document.createElement("br");
        div.appendChild(lineBreak);

        const pagesDisplay = document.createElement("p");
        pagesDisplay.textContent = `${myLibrary[x].pages} pages`;
        pagesDisplay.classList.add("pages");
        div.appendChild(pagesDisplay);

        const lineBreak2 = document.createElement("br");
        div.appendChild(lineBreak2);

        const readDisplay = document.createElement("h4");
        if(myLibrary[x].read == true){
            readDisplay.textContent = "Read";
            readDisplay.classList.add("readLabel");
        }
        else{
            readDisplay.textContent = "Not Read";
            readDisplay.classList.add("notReadLabel");
        }
        div.appendChild(readDisplay);

        readDisplay.addEventListener("click", () => {
            flipRead(div.dataset.idNo);
        });

        // div.appendChild(readDisplay);

        const btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.classList.add("removeBtn");
        btn.addEventListener("click", () => {
            deleteBook(div.dataset.idNo);
            btn.parentElement.remove();
        });

        div.appendChild(btn);
        gridBox.appendChild(div);
    }
}



function flipRead(id){
    for (let x in myLibrary){
        if (id == myLibrary[x].id){
            myLibrary[x].toggleRead();
        }
    }
    updateShelf();
}

function deleteBook(id){
    for (let x in myLibrary){
        if (id == myLibrary[x].id){
            myLibrary.splice(x, 1);
        }
    }
}



addBtn.addEventListener("click", () => {
    dialog.showModal();
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
})

dialogCancel.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
    console.log("Cancelled");
})

dialogSave.addEventListener("click", (event) => {
    event.preventDefault();
    addBook(title.value, author.value, pages.value, read.checked);
    updateShelf();
    dialog.close();
    console.log("Saved");
})



addBook("Example Book", "Daisy", "21", true);
addBook("Another Book", "PJM", "41", false);
updateShelf();