function PARSER (lexems, dictionary) {
    if (lexems.length !== 0) {
        for (let i = 0; i < lexems.length; i++) {
            let functionName = lexems[i]['function'];
            let valueObj = lexems[i]['value'];

            if (dictionary['function'][functionName.toLowerCase()]) {
                let curFunction = dictionary['function'][functionName.toLowerCase()]
                curFunction(valueObj.value);
            }
            else {
                console.error(`Function "${functionName}" isn't registred`);
            }
        }
    }
    else {
        console.error('The file is empty');
    }
};

module.exports.PARSER = PARSER;