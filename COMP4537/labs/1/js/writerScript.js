const addButton = document.getElementById("addButton")
addButton.innerHTML = addButtonLabel

notesArray.forEach((item) =>{
    const myNote = new NoteBox(item)
    myNote.createNote()
})

addButton.onclick = function addNotes(){
    const myNote = new NoteBox("")
    myNote.createNote()
}

setInterval(()=>{
    updateLocal();
}, 2000)