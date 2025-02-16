const dictionary = []
const en = require('../lang/en/en')

module.exports.getDefinition = function(word){
    for(let entry of dictionary){
        if(entry.word===word){
            return {"word": word, "definition": entry.definition};
        }
    }
    return null;
}

module.exports.addDefinition = function(word, definition){
    for(let entry of dictionary){
        if(entry.word===word){
            return en.alreadyExists.replace("%1", word);
        }
    }
    dictionary.push({word, definition})
    console.log(dictionary)
    return en.addSuccess.replace("%1", new Date().toString()).replace("%2", dictionary.length.toString()); 
}