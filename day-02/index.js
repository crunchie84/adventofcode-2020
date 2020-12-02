const fs = require('fs')
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

readFile('input.txt', 'utf8').then(file => {
    return file.split('\n').map(val => {
        const args = val.split(':');
        // 7-13 l: bwlzlxzllctjcf
        const char = args[0].substr(args[0].length-1);
        const min = parseInt(args[0].split('-')[0], 10);
        const max = parseInt(args[0].substr(0, args[0].length-2).split('-')[1], 10);

        return {
            min, max, char, password: args[1].trim()
        }
    });
})
.then(passwordsWithPolicy => {
    const validPasswords = passwordsWithPolicy.filter(policy => {
        const theChar = policy.password.split('').filter(c => c === policy.char);
        return theChar.length >= policy.min && theChar.length <= policy.max;
    });
   console.log('valid for part 1: ', validPasswords.length);
   return passwordsWithPolicy;
})
.then(passwordsWithPolicy => {
    /*
    Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.
    */
  const validPasswords = passwordsWithPolicy.filter(policy => {
    const firstPos = policy.password[policy.min-1];
    const secondPos = policy.password[policy.max-1];

    if(policy.password === 'wwww'){
        console.log(policy, { firstPos, secondPos} );
    }

    return (firstPos === policy.char || secondPos === policy.char) && (firstPos !== secondPos);
  });
  console.log('valid for part 2: ', validPasswords.length);
  return passwordsWithPolicy;
});
