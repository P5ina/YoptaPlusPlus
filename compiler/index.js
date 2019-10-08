const fs = require('fs');

const dictionary = require('./modules/dictionary.js').DICTIONARY;
const lexer = require('./modules/lexer.js').LEXER;
const parser = require('./modules/parser.js').PARSER;

fs.readFile('../test/test.ys', 'utf8', function (error, content) {
    if (error === null) {
        let lexems = lexer(content);
        //console.log(JSON.stringify(lexems, null, 4));
        parser(lexems, dictionary);
    }
    else {
        console.error(error);
    }
});