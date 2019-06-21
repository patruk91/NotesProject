function createNewNote() {
    function newNote() {
        const newNote = document.createElement("div");
        newNote.className = "form-data";
        newNote.setAttribute("draggable", "true");
        return newNote;
    }

    function newPanelHeading() {
        function newTitle() {
            const newTitle = document.createElement("h3");
            newTitle.className = "panel-title";
            newTitle.id = "title";
            newTitle.setAttribute("contenteditable", "true");
            newTitle.innerText = "Edit me!";
            return newTitle;
        }

        function newButton() {
            const newButton = document.createElement("button");
            newButton.className = "button-close";
            newButton.innerText = "x";
            return newButton;
        }

        const newPanelHeading = document.createElement("div");
        newPanelHeading.className = "panel-heading";
        let title = newTitle();
        newPanelHeading.appendChild(title);
        let button = newButton();
        newPanelHeading.appendChild(button);
        return newPanelHeading;
    }

    function newTextArea() {
        const newTextArea = document.createElement("textarea");
        newTextArea.className = "message";
        newTextArea.id = "msg";
        newTextArea.setAttribute("name", "message");
        newTextArea.setAttribute("placeholder", "Edit me!");
        return newTextArea;
    }

    let note = newNote();
    let panelHeading = newPanelHeading();
    let textArea = newTextArea();
    note.appendChild(panelHeading);
    note.appendChild(textArea);
    let container = document.querySelector(".container");
    container.appendChild(note);
}

function addNewNote() {
    let notepadIcon = document.querySelector("#notepad-icon");
    notepadIcon.addEventListener("dblclick", createNewNote);
}

function handleDragNote() {
    function handleDragListeners() {
        let container = document.querySelector(".container");
        const forms = document.querySelector(".form-data");
        forms.addEventListener("dragstart", dragStart);
        forms.addEventListener("dragend", dragEnd);
        container.addEventListener("dragover", dragOver);
        container.addEventListener("drop", dragDrop);


    }
    
    handleDragListeners();



}

function main() {
    addNewNote();
    handleDragNote();


}

main();





















// document.querySelector("#msg").value = localStorage.getItem("msg");
// document.querySelector("#title").innerHTML = localStorage.getItem("title");
//
//
//
//
// let textAreaElement = document.querySelector("textarea");
// let title = document.querySelector("h3");
// console.log(title);
//
// textAreaElement.addEventListener("input", saveTextArea);
// title.addEventListener("input", saveTitle);
//
// function saveTextArea() {
//     let message = document.querySelector("#msg").value;
//     console.log(message);
//     localStorage.setItem("msg", message);
// }
//
// function saveTitle() {
//     let title = document.querySelector("#title").innerHTML;
//     console.log(title);
//     localStorage.setItem("title", title);
// }

