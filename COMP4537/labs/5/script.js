//User facing strings
const title = "Lab 5 DB Intro"
const baseSchema = "Generate Schema"
const sqlPrompt = "Enter your SQL Query below"
const sqlSubmit = "Submit"
const responseLabel = "Query repsonse:"

const titleElement = document.getElementById("title")
const baseSchemaElement = document.getElementById("baseSchema")
const sqlPromptElement = document.getElementById("sqlPrompt")
const sqlSubmitElement = document.getElementById("sqlSubmit")
const sqlTextElement = document.getElementById("sqlText")
const responseLabelElement = document.getElementById("responseLabel")
const responseElement = document.getElementById("response")

titleElement.innerHTML = title
baseSchemaElement.innerHTML = baseSchema
sqlPromptElement.innerHTML = sqlPrompt
sqlSubmitElement.innerHTML = sqlSubmit
responseLabelElement.innerHTML = responseLabel

const xhr = new XMLHttpRequest()

function LoadBaseSchema(){
    const baseInsertQuery = `INSERT INTO patients (name, dateOfBirth) 
        Values ('Sara Brown', '1901-01-01'),
               ('John Smith', '1941-01-01'),
               ('Jack Ma', '1961-01-30'),
               ('Elon Musk', '1999-01-01');`
    xhr.open("POST", "**************************", true)
    xhr.setRequestHeader("Content-type", "text/plain")
    xhr.send(baseInsertQuery)
}

function SubmitQuery(){
    const userQuery = sqlTextElement.value
    const queryType = userQuery.split(" ")[0]

    if(queryType=="INSERT"){
        xhr.open("POST", "**************************", true)
        xhr.setRequestHeader("Content-type", "text/plain")
        xhr.send(userQuery)
    } else if(queryType=="SELECT"){
        xhr.open(`GET", "**************************?query=${userQuery}`, true)
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200){
                responseElement.innerText = xhr.responseText
            }
        }
    }
}