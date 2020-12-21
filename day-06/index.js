const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// readFile('input.txt', 'utf8').then(file => {
 
// })
// .then(console.log);


const testInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;
const expectedOutput = 11;

//str => array van strings (abc, a\b\b, ab\ac, )

function makeGroups (input)
{
    // hier is 'input' bekend
    //input = string
    return input.split("\n\n");
} 

// 3 + 3 + 3 + 1 + 1
//every group is separated by a blank line
const groups = makeGroups(testInput);
console.log(groups);

// take string and count unique a-z chars, return as number
function uniqueCount (input)
{
    const cleanedUpInput = input.replace(/(\r\n|\n|\r)/gm, '');

    const allCharsFound = {};
    // let i = 0;
    // while(i < cleanedUpInput.length) {
    //     console.log(cleanedUpInput[i]);
    //     i++;
    // }

    //for(tijdelijke-variable; evaluatie-for-loop; tijdelijke-variable-mutatie)
    // for (let i = 0; i < cleanedUpInput.length; i++) {
    //     console.log(cleanedUpInput[i]);
    //   }

    for (let teken of cleanedUpInput) {
        allCharsFound[teken] = true;
    }

    const uniqueCount = Object.keys(allCharsFound).length;

    //console.log(`uniqueCount input: "${input}", cleanedUpInput: ${cleanedUpInput}, uniqueCount: "${uniqueCount}"`);

    return uniqueCount;
}

//let countYes = groups.map()


// const mijnArray = ['a','b','c'];
// mijnArray[0] // a
// mijnArray[1] // b
// mijnArray.length // 3

// let countYes = 0;
// let i = 0;
// while(i < groups.length) {
//     const currentElement = groups[i];
//     countYes = countYes + uniqueCount(currentElement);
//     i++;
// }

function mapUniqueCount(inputGroups) {
    let result = [];
    let i = 0;
    while(i < inputGroups.length) {
        const currentElement = inputGroups[i];
        result[i] = uniqueCount(currentElement);
        i++;
    }
    return result; 
}

// poor-mans Array.map home-brew (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
function map(inputArray, mapFunction) {
    let result = [];
    let i = 0;
    while(i < inputArray.length) {
        const currentElement = inputArray[i];
        result[i] = mapFunction(currentElement);
        i++;
    }
    return result; 
}

console.log('hoi merel mapUniqueCount', mapUniqueCount(groups));
console.log('hoi merel mapUniqueCountMapFunctie', map(groups, uniqueCount));
console.log('now with built-in array.map', groups.map(uniqueCount));

// take all numbers in an array and sum them together
function sum(input) {
    let sum = 0;
    let i = 0;
    while(i < input.length) {
        const currentElement = input[i];
        sum = sum + currentElement;
        i++;
    }
    return sum;
}

// Array.sum()
// Array.reduce((accumaltor, currentValue) => {}, seed);


const uniqueCountedGroups = groups.map(uniqueCount);
console.log('custom sum: ', sum(uniqueCountedGroups));


const sum2 = uniqueCountedGroups.reduce(
    (acc, currentValue) => {
        return acc + currentValue; // modify accumulator for next element (or return on last element)
    }, 
    0 // seed value of 'accumulator' of first element
);
// start with 0, iterate every element and apply accumulator function on the 'seed' value. 
// return accumluated seed value;
console.log('sum using reduce pattern', sum2);

