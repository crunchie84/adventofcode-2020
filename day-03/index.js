const fs = require('fs');
const { stringify } = require('querystring');
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

readFile('input.txt', 'utf8').then(file => {
    return file.split('\n');
})
.then(lines => {
    console.log('trees found right3, down 1', getAllTreesFound(lines, 3, 1))
    console.log('multiplied all: ', 
        getAllTreesFound(lines, 1, 1) 
        * getAllTreesFound(lines, 3, 1) 
        * getAllTreesFound(lines, 5, 1) 
        * getAllTreesFound(lines, 7, 1) 
        * getAllTreesFound(lines, 1, 2)
    );
    
    console.log('test ---');
    console.log(getAllTreesFound(testInput, 1, 1))
    console.log(getAllTreesFound(testInput, 3, 1))
    console.log(getAllTreesFound(testInput, 5, 1))
    console.log(getAllTreesFound(testInput, 7, 1))
    console.log(getAllTreesFound(testInput, 1, 2))
});


function getAllTreesFound(lines, right, down) {
    const lineCount = lines.length;
    const lineWidth = lines[0].length;
    
    function getNextPosition({x, y}) {
        // Starting at the top-left corner of your map and following a slope of 
        //right 3 and down 1, how many trees would you encounter?
        const nextY = y + right;
        const nextX = x + down;
        if(nextX >= lineCount) 
            return undefined;

        return { 
            x: nextX, 
            y: nextY >= lineWidth ? nextY - lineWidth : nextY,
        }
    }

    function isTree({x, y}){
        return lines[x][y] === '#';
    }

    let treesFound = 0;
    let coordinates = { x: 0, y: 0};
    while(true){
        coordinates = getNextPosition(coordinates);
        if(coordinates === undefined) 
            break;

        if(isTree(coordinates)) {
            treesFound++;
        }
    }
    return treesFound;
}

const testInput = `
..##.........##.........##.........##.........##.........##.......
#..O#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....X..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#O#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..X...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.X#.......#.##.......#.##.......#.##.......#.##.....
.#.#.#....#.#.#.#.O..#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........X.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.X#...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...#X....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...X.#.#..#...#.#.#..#...#.#.#..#...#.#`.split('\n');