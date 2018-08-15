var readline = require('readline');
var fs = require('fs');
var promisify = require('util').promisify;

var writeFile = promisify(fs.writeFile);
var readFile = promisify(fs.readFile);

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var drawMenu = function() {
    console.log(
        `Electronic Phone Book
    =====================
    1. Look up an entry
    2. Set an entry
    3. Delete an entry
    4. List all entries
    5. Quit`
    );
};

var phonebook = [{ adam: '111-1111-1111' }, { david: '222-2222-2222' }];

var main = function() {
    drawMenu();
    rl.question('What do you want to do (1-5)? ', function(menuOption) {
        if (Object.keys(menuOptions).includes(menuOption)) {
            menuOptions[menuOption](main);
        } else {
            rl.close();
        }
    });
};

var appendToPhonebook = function() {
    readFile('phonebook.json').then(function(text) {
        var phonebookText = JSON.parse(text.toString());
        phonebook.push(phonebookText);
    });
};

appendToPhonebook();

var appendtoFile = function() {
    phonebook.forEach(function(phoneNum) {
        var phoneNumJSON = JSON.stringify(phoneNum);
        writeFile('phonebook.json', phoneNumJSON).then(function() {});
    });
};

appendtoFile();

var lookUpEntry = function(callback) {
    rl.question('What is the name?', function(name) {
        console.log(name);
        for (var objects of phonebook) {
            console.log(objects);
            if (Object.keys(objects).includes(name)) {
                console.log(objects[name]);
            }
        }
        callback();
    });
};

var setEntry = function(callback) {
    rl.question('What is the name? ', function(name) {
        rl.question('What is the phone number? ', function(phoneNum) {
            rl.close();
            var content = {};
            content[name] = phoneNum;
            phonebook.push(content);
            console.log(`entry stored for ${name}`);
            callback();
        });
    });
};

var deleteEntry = function(callback) {
    rl.question('What name do you want to delete? ', function(name) {
        if (Object.keys(phonebook).includes(name)) {
            delete phonebook[name];
            console.log(phonebook);
        }
        callback();
    });
};

var listAllEntries = function(callback) {
    console.log(phonebook);
    callback();
};

var quit = function() {
    rl.close();
};

var menuOptions = {
    1: lookUpEntry,
    2: setEntry,
    3: deleteEntry,
    4: listAllEntries,
    5: quit
};

main();
