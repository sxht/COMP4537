const writeNotesDiv = document.getElementById("writeNotes")
const readNotesDiv = document.getElementById("readNotes")
const storeTimeDiv = document.getElementById("storeTime")
const notesStorage = localStorage.getItem("notesArray")

let notesArray = []
let time = new Date()

document.getElementById("backButton").innerHTML = backButtonLabel
document.getElementById("storeTime").innerHTML = time.toString()

if(notesStorage){
    notesArray = JSON.parse(notesStorage)
} else {
    console.log("Nothing stored")
}

function updateLocal(){
    const noteTextElements = document.querySelectorAll(".noteText")
    notesArray = []
    noteTextElements.forEach((noteContent) => {
        notesArray.push(noteContent.value)
    })
    localStorage.setItem("notesArray", JSON.stringify(notesArray))
    time = new Date()
    document.getElementById("storeTime").innerHTML = time.toString()
}

class NoteBox{
    constructor(note){
        this.note = note
        this.container = document.createElement("div")
        this.container.className = "noteBox"
        this.textbox = document.createElement("input")
        this.removeButton = document.createElement("button")
    }
    
    createNote(){
        this.textbox.type="text"
        this.textbox.className = "noteText"
        this.textbox.value = this.note

        this.removeButton.innerHTML = removeButtonLabel
        this.removeButton.className = "removeButton"
        this.removeButton.onclick = ()=>{
            this.container.remove()
            updateLocal()
        }

        this.container.appendChild(this.textbox)
        this.container.appendChild(this.removeButton)
        writeNotesDiv.appendChild(this.container)
    }

    displayNote(){
        this.textbox.type="text"
        this.textbox.className = "noteText"
        this.textbox.readOnly = true
        this.textbox.value = this.note

        this.container.appendChild(this.textbox)
        readNotesDiv.appendChild(this.container)
    }
}