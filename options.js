'use strict';

const commandLineArgs = require('command-line-args');
const usage = require('command-line-usage');

module.exports = (function() {
    const optionsConfig = [{
        name: 'files',
        type: String,
        multiple: true,
        defaultOption: true
    },{
        name: 'verbose',
        alias: 'v',
        type: Boolean
    },{
        name: 'quiet',
        alias: 'q',
        type: Boolean
    },{
        name: 'writefile',
        alias: 'w',
        type: Boolean
    },{
        name: 'outputdir',
        alias: 'd',
        type: String
    },{
        name: 'outputfile',
        alias: 'o',
        type: String
    },{
        name: 'input',
        alias: 'i',
        type: String
    },{
        name: 'force',
        alias: 'f',
        type: Boolean
    }];

    const options = commandLineArgs(optionsConfig);

    if(!options.files || options.help) {
        const sections = [{
            header: 'An app',
            content: 'Generates something [italic]{very} important.'
        },{
            header: 'Usage',
            content: 'lost-and-found [options] <files>'
        },{
            header: 'Options',
            optionList: [{
                name: 'files',
                defaultOption: true,
                typeLabel: '[underline]{files}',
                description: 'The input files process hashes'
            },{
                name: 'verbose',
                alias: 'v',
                description: 'Use trace logging'
            },{
                name: 'quiet',
                alias: 'q',
                description: 'Limit logging to fatal errors'
            },{
                name: 'writefile',
                alias: 'w',
                description: 'save a csv of filenames and hashes'
            },{
                name: 'outputfile',
                alias: 'o',
                description: 'Optional filename to use for output'
            },{
                name: 'help',
                description: 'Print this usage guide.'
            }]
        }];

        const usageText = usage(sections);
        console.log(usageText);
        process.exit(1);
    }

    return options;
}());
