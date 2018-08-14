var readline = require('readline');
var fs = require('fs');
var http = require('http');
var dns = require('dns');
var promisify = require('util').promisify;

var writeFile = promisify(fs.writeFile);
var readFile = promisify(fs.readFile);

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var phonebook = [{ John: "444-4444-4444" }, { David: "111-1111-1111" }];


var appendToPhonebook = function() {
    readFile('phonebook.txt').then(function(text) {
        var phonebookText = JSON.stringify(text.toString())
        phonebook.push(phonebookText)
        console.log(phonebook)
    });
}

appendToPhonebook()
// console.log(phonebook)



rl.question('What do you want to do (1-5)? ', function(num) {
    if (Object.keys(menuOptions).includes(num)) {
        menuOptions[num]();
    } else {
        console.log('invalid number');
    }
});

var lookUpEntry = function() {
    rl.question('What is the name?', function(name) {
        for (var objects of phonebook) {
            if(Object.keys(objects).includes(name)) {
                console.log(objects[name])
            }
        }
    });
};



var setEntry = function() {
    rl.question('What is the name? ', function(name) {
        rl.question('What is the phone number? ', function(phoneNum) {
            var content = JSON.stringify({name: phoneNum})
            rl.close();
            writeFile('phonebook.txt', content).then(function() {
                console.log('Entry stored for' + name)
            })
        });
    });
};

var deleteEntry = function() {
    rl.question('What name do you want to delete? ', function(name) {
        if (Object.keys(phonebook).includes(name)) {
            delete phonebook[name]
            console.log(phonebook)
        }
    })
}

var listAllEntries = function() {
    console.log(phonebook)
}

var menuOptions = {
    1: lookUpEntry,
    2: setEntry,
    3: deleteEntry,
    4: listAllEntries,
    5: 'Quit'
};
