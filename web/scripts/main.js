function createNewNote(event) {
    let counter = event.target.counterData.getCounter();
    function newNote() {
        const newNote = document.createElement("div");
        newNote.className = "form-data";
        newNote.setAttribute("draggable", "true");
        newNote.setAttribute("id", `form_${counter}`);
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



    //REMOVE
    let notesToRemove = document.querySelectorAll(".form-data button");
    for (let note of notesToRemove) {
        note.addEventListener("click", removeNote);

    }
    function removeNote() {
        document.querySelector(`#form_${counter}`).remove();
    }

    //DRAG
    handleDragNote();
}




function handleDragNote() {
    function handleDragListeners() {
        const forms = document.querySelectorAll(".form-data");
        for (let form of forms) {
            form.addEventListener("dragstart", dragStart);
            form.addEventListener("dragend", dragEnd);

        }

        function dragStart(event) {
            setTimeout(() => this.className = "invisible", 0);

        }

        function dragEnd() {
            this.className = "form-data";
        }


    }


    handleDragListeners();
}

function countValue() {
    return {
        counter: 0,
        increment: function () {
            this.counter++;
        },
        getCounter: function () {
            return this.counter;
        }
    };
}

function main() {
    let notepadIcon = document.querySelector(".notepad-icon");
    const counterValue = countValue();
    notepadIcon.counterData = counterValue;
    notepadIcon.addEventListener("dblclick", () => counterValue.increment(), false);
    notepadIcon.addEventListener("dblclick", createNewNote);



    //DRAG CONTAINER
    let container = document.querySelector(".container");
    container.addEventListener("dragstart", dragStart1);
    container.addEventListener("dragover", dragOver);
    container.addEventListener("drop", dragDrop);

    let xClickPositionAtNote;
    let yClickPositionAtNote;
    let currentPosition;
    function dragStart1(event) {
        console.log(event.target.id.replace("form_", ""));
        currentPosition = +event.target.id.replace("form_", "");
        const forms = document.querySelectorAll(".form-data");
        xClickPositionAtNote = event.clientX;
        yClickPositionAtNote = event.clientY;
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dragDrop(event) {
        const forms = document.querySelectorAll(".form-data");

        // console.log(forms);
        let bounds = event.target.getBoundingClientRect();
        let xDragTarget = event.clientX - bounds.left;
        let yDragTarget = event.clientY - bounds.top;

        let formData = this.querySelector(`#form_${currentPosition}`);
        let actualMarginAtLeft = +formData.style.left.replace("px", "");
        let actualMarginAtTop = +formData.style.top.replace("px", "");

        let widthOfStrapNote = 15;
        formData.style.position = "absolute";
        formData.style.left = `${xDragTarget - xClickPositionAtNote + actualMarginAtLeft}px`;
        formData.style.top = `${yDragTarget - yClickPositionAtNote + actualMarginAtTop + widthOfStrapNote}px`;
    }


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

