const numButtons = document.getElementById("numButtons")
const goButton = document.getElementById("goButton")
const buttonsContainer = document.getElementById("buttons")
const messageDiv = document.getElementById("message")

const promptDiv = document.getElementById("prompt")
promptDiv.innerHTML= prompt

const goDiv = document.getElementById("goButton")
goDiv.innerHTML = buttonLabel
goDiv.onclick = startGame

class Button{
    constructor(xcor, ycor, index){
        this.xcor = xcor
        this.ycor = ycor
        this.index = index

        this.element = document.createElement("button")
        this.element.className = "myButton"
        this.element.style.backgroundColor = `rgb(
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)})`
        this.element.textContent = (this.index+1).toString()
    }

    changePosition(){
        this.element.style.position = "absolute"
        this.xcor = Math.floor(Math.random()*(buttonsContainer.offsetWidth-this.element.offsetWidth))
        this.ycor = Math.floor(Math.random()*(buttonsContainer.offsetHeight-this.element.offsetHeight))
        this.element.style.left = this.xcor+'px'
        this.element.style.top = this.ycor+'px'
    }

    hideNum(){
        this.element.textContent = ""
    }

    showNum(){
        this.element.textContent = ""+(this.index+1)
    }

    clickable(clickFunction){
        this.element.onclick = clickFunction
    }

    unclickable(){
        this.element.onclick = null
    }
}

class Game{
    constructor(numButtons){
        this.numButtons = numButtons
        this.arrayButtons = []
        this.clickCounter = 0
        this.winMessage = new Message(win)
        this.loseMessage = new Message(lose)
    }

    async runGame(){
        this.generateButtons()
        await this.shuffleButtons()
        this.userInteraction()
        
    }
    generateButtons(){
        buttonsContainer.innerHTML = ""
        for(let i=0; i < this.numButtons; i++){
            this.arrayButtons[i] = new Button(0,0,i)
            buttonsContainer.appendChild(this.arrayButtons[i].element)
        }
    }
    
    async shuffleButtons(){
        const pause = waitTime => new Promise((func) => setTimeout(func, waitTime))
        await pause(this.numButtons*1000)
        for(let i = 0; i < this.numButtons; i++){
            this.arrayButtons.forEach(button =>{
                button.changePosition()
            })
            await pause(2000)
        }
    }
    userInteraction(){
        this.arrayButtons.forEach(button =>{
            button.hideNum()
            button.clickable(() => this.click(button))
        })
    }

    click(button){
        this.clickCounter++
        if(this.clickCounter === button.index+1){
            button.showNum()
            button.unclickable()
            if(this.clickCounter == this.numButtons){
                this.winMessage.displayMessage()
                this.endGame()
            }
        } else{
            this.loseMessage.displayMessage()
            this.endGame()
        }
    }

    endGame(){
        this.arrayButtons.forEach(button =>{
            button.showNum()
            button.unclickable()
        })
    }

}

class Message{
    constructor(message){
        this.message = message
    }
    displayMessage(){
        messageDiv.innerHTML = `<h3>${this.message}</h3>`
    }
}

function startGame(){
    messageDiv.innerHTML = ""
    const num = parseInt(numButtons.value)
    if (!isNaN(num) && num > 2 && num < 8) {
        const game = new Game(num)
        game.runGame()
    } else{
        const invalidNumber = new Message(warning)
        invalidNumber.displayMessage()
    }
    return
}

//AI was used for questions, but no copy pasted code
//You mentioned in the slides not to use alerts, so I put messages in a div