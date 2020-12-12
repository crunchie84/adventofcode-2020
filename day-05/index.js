const fs = require('fs');
const { stringify } = require('querystring');
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

readFile('input.txt', 'utf8').then(file => {
    return file.split('\n').map(line => {

        const row = findRow(line);
        const seat = findSeat(line);
        const seatId = generateSeatId(row, seat);
        return seatId;
    })
    .sort()
    .reduce((acc, curr) => curr > acc? curr : acc, 0) // part one
    ;
})
.then(console.log);

// console.log(findRow('FBFBBFFRLR'));
// console.log(findSeat('FBFBBFFRLR'));
// console.log(generateSeatId(findRow('FBFBBFFRLR'), findSeat('FBFBBFFRLR')));

// Start by considering the whole range, rows 0 through 127.
// F means to take the lower half, keeping rows 0 through 63.
// B means to take the upper half, keeping rows 32 through 63.
// F means to take the lower half, keeping rows 32 through 47.
// B means to take the upper half, keeping rows 40 through 47.
// B keeps rows 44 through 47.
// F keeps rows 44 through 45.
// The final F keeps the lower of the two, row 44.
function generateSeatId(row, seat) {
    return row * 8 + seat;
}
function findSeat(ticket) {
    let range = { min: 0, max: 7 };
    for(let i = 7; i <= 9; i++) {
        range = findRange(range, ticket[i])
    } 

    // console.log('resulting seat: ', range.max);
    return range.max;
}

function findRow(ticket) {
    // console.log('input: ', ticket);

    let range = { min: 0, max: 127 };
    for(let i = 0; i <= 6; i++) {
        range = findRange(range, ticket[i])
    } 

    // console.log('resulting row: ', range);
    return range.max;
}

function findRange({ min, max }, partIdentifier){
    // Start by considering the whole range, rows 0 through 127.
    // F means to take the lower half, keeping rows 0 through 63.
    const takeLower = ['F', 'L'].includes(partIdentifier)

    const half = Math.floor((max - min) / 2);
    const isRounded = half != ((max - min) / 2);
    const result = takeLower ? { min, max:min+half } : { min: isRounded ? min + 1 + half : min + half, max};

    // console.log(`ticket divisor selector ${partIdentifier} result in range ${JSON.stringify(result)}`);
    return result;
}