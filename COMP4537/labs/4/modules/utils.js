const dictionary = []
const en = require('../lang/en/en')

module.exports.getDefinition = function(word){
    for(entry in dictionary){
        if(entry.word===word){
            return {"word": word, "definition": entry.definition};
        }
    }
    return null;
}

module.exports.addDefinition = function(word, definition, reqCounter){
    for(entry in dictionary){
        if(entry.word===word){
            return en.alreadyExists.replace("%1", word);
        }
    }
    dictionary.append({word : definition})
    return en.addSuccess.replace("%1", reqCounter).replace("%2", new Date().toString()).replace("%3", dictionary.length); 
}