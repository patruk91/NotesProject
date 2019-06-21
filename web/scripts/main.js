function createNewNote() {
    function newNote() {
        const newNote = document.createElement("div");
        newNote.className = "form-data";
        newNote.setAttribute("draggable", "true");
        newNote.setAttribute("id", "form");
        newNote.setAttribute("style", "left: 20px; top: 160px");
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

        function dragStart(event) {
            setTimeout(() => this.className = "invisible", 0);
            xClickPositionAtNote = event.clientX;
            yClickPositionAtNote = event.clientY;
        }

        function dragEnd() {
            this.className = "form-data";
        }

        function dragOver(event) {
            event.preventDefault();
        }

        function dragDrop(event) {
            let bounds = event.target.getBoundingClientRect();
            let xDragTarget = event.clientX - bounds.left;
            let yDragTarget = event.clientY - bounds.top;

            let formData = this.querySelector("#form");
            let actualMarginAtLeft = +formData.style.left.replace("px", "");
            let actualMarginAtTop = +formData.style.top.replace("px", "");

            let widthOfStrapNote = 15;
            formData.style.position = "absolute";
            formData.style.left = `${xDragTarget - xClickPositionAtNote + actualMarginAtLeft}px`;
            formData.style.top = `${yDragTarget - yClickPositionAtNote + actualMarginAtTop + widthOfStrapNote}px`;
        }
    }

    let xClickPositionAtNote;
    let yClickPositionAtNote;
    handleDragListeners();
}

function main() {
    addNewNote();
    handleDragNote();

    let noteToRemove = document.querySelector("#form");

    function removeNote() {
        noteToRemove.remove();
    }

    noteToRemove.addEventListener("click", removeNote);
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

