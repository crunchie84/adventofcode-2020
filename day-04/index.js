const fs = require('fs');
const { stringify } = require('querystring');
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

readFile('input.txt', 'utf8').then(file => {
    return file
    .split('\n\n').map((rawPassport) => {
        return replaceAll(rawPassport,'\n', ' ')
            .split(' ')
            .map(keyVal => keyVal.split(':' ))
            .reduce((acc, curr) => {
                return { ... acc, [curr[0]]:curr[1]};
            }, {});
    });
})
.then(passports => {
    console.log(passports.filter(passport => hasAllRequiredFields(passport)).length);
    console.log(passports
        .filter(passport => hasAllRequiredFields(passport))
        .filter(fieldsAreValid)
        .length);
});

// console.log('tests:');
// console.log('date between 1920 2002', isValidYearBetween('1920',1920, 2002), isValidYearBetween('2002',1920, 2002),);
// console.log('cm:', isValidHeight('149cm'), isValidHeight('150cm'), isValidHeight('193cm'), isValidHeight('194cm'))
// console.log('in:', isValidHeight('58in'), isValidHeight('59in'), isValidHeight('76in'), isValidHeight('77in'))
// console.log('isValidPassportId', isValidPassportId('000000001'), isValidPassportId('0123456789'), isValidPassportId('021572410'), isValidPassportId('896056539'))

const requiredFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
function hasAllRequiredFields(passport) {
    return requiredFields.map((fieldName) => {
        return passport[fieldName] !== undefined;
    })
    .filter((requiredFieldFound) => requiredFieldFound === false)
    .length === 0;
}

function fieldsAreValid(passport) {
    return isValidYearBetween(passport.byr, 1920, 2002)
      && isValidYearBetween(passport.iyr, 2010, 2020)
      && isValidYearBetween(passport.eyr, 2020, 2030)
      && isValidHeight(passport.hgt)
      && isValidHairColor(passport.hcl)
      && isValidEyeColor(passport.ecl)
      && isValidPassportId(passport.pid);
}

function isValidPassportId(input) {
    return /^[0-9]{9}$/.test(input);
}

function isValidEyeColor(input){
    return ['amb','blu','brn','gry','grn','hzl','oth'].indexOf(input) !== -1;
}

function isValidHairColor(input) {
    return /#[0-9a-z]{6}/.test(input);
}

function isValidHeight(input) {
    if(input.indexOf('cm') !== -1) {
        return isValidYearBetween(input.replace('cm' ,''), 150, 193);
    }
    return isValidYearBetween(input.replace('in' ,''), 59, 76);
}

function isValidYearBetween(input, min, max) {
    const parsed = parseInt(input, 10);
    return parsed >= min && parsed <= max
}

function replaceAll(str, search, replace) {
    return str.split(search).join(replace);
}