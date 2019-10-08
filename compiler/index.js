const fs = require('fs');

const dictionary = require('./modules/dictionary.js').DICTIONARY;
const lexer = require('./modules/lexer.js').LEXER;

fs.readFile('../test/test.ys', 'utf8', function (error, content) {
    if (error === null) {
        let lexems = lexer(content, dictionary);

        console.log(JSON.stringify(lexems, null, 4));
    }
    else {
        console.error(error);
    }
});