const fs = require('fs')
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

readFile('input.txt', 'utf8').then(file => {
    return file.split('\n').map(val => parseInt(val, 10));
}).then(lines => {
    // find any value that together with an other value becomes 2020
    // should end up with two values
    const value = lines.filter((val, index) => {
        //find if we can find a value which together adds up to 2020;
        return lines.some((val2, index2) => val + val2 === 2020 && index !== index2);
    });
    console.log(value[0] * value[1]);
});
