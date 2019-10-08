const LEXER = function (content, dictionary) {
    const strings = content.split('\n').map(o => o.replace(/\s\s+/gm, ' ').trim())

    let lexems = [];

    for (let i = 0; i < strings.length; i++) {
        if(strings[i] !== ''){
            let words = strings[i].split(' ');
            let copyString = strings[i];
            let stringObject = {};

            let command = words[0];

            if (dictionary['function'].indexOf(command.toLowerCase()) !== -1) {
                Object.assign(stringObject, { 'function': command });
            }
            else{
                Object.assign(stringObject, { 'wtf_function': command });
            }

            let value = copyString.replace(new RegExp(command + ' ', 'g'), '');

            if (/\"(.*)\"/gim.test(value)) {
                Object.assign(stringObject, { 
                    'value': {
                        'type': 'string',
                        'value': value
                    } 
                });
            }
            else {
                if (Number(value)) {

                    if (Number(value) % 1 === 0) {
                        Object.assign(stringObject, { 
                            'value': {
                                'type': 'integer',
                                'value': Number(value)
                            } 
                        });
                    }
                    else {
                        Object.assign(stringObject, { 
                            'value': {
                                'type': 'float',
                                'value': Number(value)
                            } 
                        });
                    }
                }
                else {
                    Object.assign(stringObject, { 
                        'value': {
                            'type': 'wtf',
                            'value': value
                        } 
                    });
                }
            }

            lexems.push(stringObject);
        }
    }

    return lexems;
};

module.exports.LEXER = LEXER;