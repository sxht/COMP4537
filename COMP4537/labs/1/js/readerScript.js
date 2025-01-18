notesArray.forEach((item) =>{
    const myNote = new NoteBox(item)
    myNote.displayNote()
})

setInterval(()=>{
    readNotesDiv.innerHTML = ""
    const notesStorage = localStorage.getItem("notesArray")
    if(notesStorage){
        notesArray = JSON.parse(notesStorage)
    } else {
        console.log("Nothing stored")
    }

    notesArray.forEach((item) =>{
        const myNote = new NoteBox(item)
        myNote.displayNote()
    })
    time = new Date()
    document.getElementById("storeTime").innerHTML = time.toString()
}, 2000)