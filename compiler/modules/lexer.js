const LEXER = function (content) {
    const strings = content.split('\n').map(o => o.replace(/\s\s+/gm, ' ').trim())

    let lexems = [];

    for (let i = 0; i < strings.length; i++) {
        if (strings[i] !== '') {
            let words = strings[i].split(' ');
            let copyString = strings[i];
            let stringObject = {};

            let command = words[0];

            Object.assign(stringObject, { 'function': command });

            let value = copyString.replace(new RegExp(command + ' ', 'g'), '');

            //============================
            //         VALUE TYPE
            //============================

            if (/\"(.*)\"/gim.test(value)) {
                if (value.length <= 1) {
                    Object.assign(stringObject, {
                        'value': {
                            'type': 'char',
                            'value': value
                        }
                    });
                }
                else {
                    Object.assign(stringObject, {
                        'value': {
                            'type': 'stirng',
                            'value': value
                        }
                    });
                }
            }
            else if (Number(value)) {
                // int value
                if (Number(value) % 1 === 0) {
                    // just int
                    if (Number(value) > -2147483648 && Number(value) < 2147483647) {
                        Object.assign(stringObject, {
                            'value': {
                                'type': 'integer',
                                'value': Number(value)
                            }
                        });
                    }
                    // long int
                    else if (Number(value) > -9223372036854775808 && Number(value) < 9223372036854775807) {
                        Object.assign(stringObject, {
                            'value': {
                                'type': 'integer',
                                'subtype': 'long long',
                                'value': Number(value)
                            }
                        });
                    }
                    else {
                        // WTF are you doing?
                        Object.assign(stringObject, {
                            'value': {
                                'type': 'integer',
                                'subtype': 'infinity',
                                'value': Number(value)
                            }
                        });

                    }
                }
                else {
                    // float value
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

            lexems.push(stringObject);
        }
    }

    return lexems;
};

module.exports.LEXER = LEXER;