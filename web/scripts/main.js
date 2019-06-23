function editNotes(counterValue) {
    let notepadIcon = document.querySelector(".notepad-icon");
    notepadIcon.counterData = counterValue;
    notepadIcon.addEventListener("dblclick", () => counterValue.increment(), false);
    notepadIcon.addEventListener("dblclick", createNewNote);
    notepadIcon.addEventListener("dblclick", addListenerToRemove);
    notepadIcon.addEventListener("dblclick", addListenerToDragElements);
    notepadIcon.addEventListener("dblclick", addListenerToSaveDataInLocalStorage);


    function createNewNote(event) {
        let counter = event.target.counterData.getCounter();
        function newFormSheet() {
            const noteSheet = document.createElement("div");
            noteSheet.className = "form-data";
            noteSheet.setAttribute("draggable", "true");
            noteSheet.setAttribute("id", `form_${counter}`);
            noteSheet.setAttribute("style", "left: 20px; top: 160px");
            return noteSheet;
        }

        function newTabBar() {
            function newTitle() {
                const newTitle = document.createElement("h3");
                newTitle.className = "panel-title";
                newTitle.id = `title_${counter}`;
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

            let title = newTitle();
            let button = newButton();

            const tabBar = document.createElement("div");
            tabBar.className = "panel-heading";
            tabBar.appendChild(title);
            tabBar.appendChild(button);
            return tabBar;
        }

        function newTextArea() {
            const newTextArea = document.createElement("textarea");
            newTextArea.className = "message";
            newTextArea.id = `msg_${counter}`;
            newTextArea.setAttribute("name", "message");
            newTextArea.setAttribute("placeholder", "Edit me!");
            return newTextArea;
        }

        let note = newFormSheet();
        let tabBar = newTabBar();
        let textArea = newTextArea();
        note.appendChild(tabBar);
        note.appendChild(textArea);

        let container = document.querySelector(".container");
        container.appendChild(note);

    }
}

function addListenerToRemove(event) {
    let counter = event.target.counterData.getCounter();
    let noteToRemove = document.querySelector(`#form_${counter} button`);
    noteToRemove.addEventListener("click", removeNote);

    function removeNote() {
        document.querySelector(`#form_${counter}`).remove();
    }
}

function addListenerToDragElements() {
    const forms = document.querySelectorAll(".form-data");
    for (let form of forms) {
        form.addEventListener("dragstart", dragStart);
        form.addEventListener("dragend", dragEnd);


    }

    function dragStart(event) {
        setTimeout(() => this.className = "form-data", 0);
    }

    function dragEnd() {
        this.className = "form-data";

    }
}

function addListenerToSaveDataInLocalStorage(event) {
    let formToSave = document.querySelector(`#form_${event.target.counterData.getCounter()}`);
    formToSave.addEventListener("input", saveToLocal);
    formToSave.addEventListener("dragend", saveToLocal);
    formToSave.event = event;

}

function saveToLocal() {
    let forms = document.querySelectorAll(".form-data");
    for (let i = 0; i < forms.length; i++) {
        let text = forms[i].querySelector("textarea").value;
        localStorage.setItem(`form_${i + 1}`, forms[i].outerHTML);
    }
    localStorage.setItem("localCounter", `${forms.length}`);
}

function handleDragAndDropAtContainer(counterValue) {
    let container = document.querySelector(".container");
    container.addEventListener("dragstart", dragStart);
    container.addEventListener("dragover", dragOver);
    container.addEventListener("drop", dragDrop);

    let xClickPositionAtNote;
    let yClickPositionAtNote;
    let currentPosition;

    function dragStart(event) {
        currentPosition = +event.target.id.replace("form_", "");
        xClickPositionAtNote = event.clientX;
        yClickPositionAtNote = event.clientY;

    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dragDrop(event) {
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
        formData.style.zIndex = counterValue.getIncrement();
        counterValue.incrementIndex();
    }
}

function countValue() {
    return {
        counter: localStorage.getItem("localCounter") ? localStorage.getItem("localCounter") : 0,
        zIndex:0,
        increment: function () {
            this.counter++;
        },
        incrementIndex: function () {
            this.zIndex++;
        },
        getCounter: function () {
            return this.counter;
        },
        getIncrement: function () {
            return this.zIndex;
        }
    };
}


function handleLocalStorageData() {
    let placeToSave = document.querySelector(".container");
    let localCounter = localStorage.getItem("localCounter");
    if (localCounter !== null) {
        for (let i = 1; i <= localCounter; i++) {
            let saved = localStorage.getItem(`form_${i}`);
            if (saved) {
                placeToSave.insertAdjacentHTML("beforeend", saved);
            }
        }
        saveToLocal();
        let forms = document.querySelectorAll(".form-data");
        for (let form of forms) {
            form.addEventListener("input", saveToLocal);
            form.addEventListener("dragend", saveToLocal);
            let noteToRemove = form.querySelector(`button`);
            noteToRemove.addEventListener("click", removeThatNote);
        }

        localStorage.setItem("localCounter", `${localCounter}`);

    }

    function removeThatNote() {
        console.log(this.parentElement.parentElement);
        localStorage.removeItem(this.parentElement.parentElement.id);
        this.parentElement.parentElement.remove();
        localStorage.clear();
        saveToLocal();
    }
}

function main() {
    handleLocalStorageData();
    const counterValue = countValue();
    editNotes(counterValue);
    handleDragAndDropAtContainer(counterValue);
}

main();























