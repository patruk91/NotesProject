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



function main() {
    let notepadIcon = document.querySelector("#notepad-icon");
    notepadIcon.addEventListener("click", createNewNote);
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

