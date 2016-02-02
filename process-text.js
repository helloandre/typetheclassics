#!/usr/bin/env node

var fs = require('fs');
var liner = require('line-by-line');
var textName = process.argv[2].replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
var blockRegex = new RegExp(process.argv[3]);
var jsonFile = './texts/texts.json';

var BOOK_START = '*** START OF THIS PROJECT GUTENBERG EBOOK';
var BOOK_END = '*** END OF THIS PROJECT GUTENBERG EBOOK';

if (!textName || !blockRegex) {
    console.log('Usage: node process-text.js [text-path] [block-regex]');
    return;
}

var textPath = './texts/' + textName + '/full.txt';
var lr = new liner(textPath);

lr.on('error', function() {
    console.log(textPath + ' not found.');
});

// do we want to save the text in the line
var inBook = false;
var saveText = false;
// where we'll save this
var currentBlockIdx = 1;
// what we'll be saving
var currentBlockContent = [];
// is this block only empty lines?
var onlyEmpty = true;

lr.on('line', function(line) {
    // we're inside the book (Project Gutenburg adds prefix and postfix to all books)
    if (!inBook) {
        if (line.indexOf(BOOK_START) === 0) {
            inBook = true;
        }
    } else if (!saveText) {
        // at the beginning of the first block, now we can actually start saving the text
        if (blockRegex.test(line)) {
            saveText = true;
        }
    } else {
        if (blockRegex.test(line)) {
            writeBlock();
        } else if (line.indexOf(BOOK_END) === 0) {
            // write the final block
            writeBlock();
            saveText = false;
        } else {
            if (line.length > 0) {
                onlyEmpty = false;
            }
            currentBlockContent.push(line);
        }
    }
});

lr.on('end', function() {
    // update json
    fs.readFile(jsonFile, function(err, data) {
        if (err) {
            var json = {};
        } else {
            var json = JSON.parse(data);
        }

        json[textName] = {
            name: process.argv[2],
            blocks: currentBlockIdx - 1
        };

        fs.writeFile(jsonFile, JSON.stringify(json));
    });

    console.log('wrote ' + (currentBlockIdx - 1) + ' blocks');
});

var writeBlock = function() {
    if (!onlyEmpty && currentBlockContent.length > 0) {
        lr.pause();
        fs.writeFile(blockName(), blockContent(), function(err) {
            if (err) {
                console.log('Something went wrong writing ' + blockName());
            }
        
            currentBlockContent = [];
            lr.resume();
        });

        currentBlockIdx++;
    }

    onlyEmpty = true;
}

var blockName = function() {
    return './texts/' + textName + '/block-' + currentBlockIdx + '.txt';
}

var blockContent = function(block) {
    return currentBlockContent.join('\n').trim();
}

