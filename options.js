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
        name: 'debug',
        alias: 'd',
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
        name: 'outputfile',
        alias: 'o',
        type: String
    },{
        name: 'force',
        alias: 'f',
        type: Boolean
    },{
        name: 'verify',
        alias: 'v',
        type: Boolean
    }];

    const options = commandLineArgs(optionsConfig);

    if(!options.files || options.help) {
        const sections = [{
            header: 'Lost and Found',
            content: 'Generates MD5 hashes for one or more files with the option to output results to a file. \
Can be used to validate a previously outputted hash file using the --verify or -v option.'
        },{
            header: 'Usage',
            content: 'lost-and-found [options] <files>'
        },{
            header: 'Options',
            optionList: [{
                name: 'files',
                defaultOption: true,
                typeLabel: '[underline]{files}',
                description: 'The input files for which to generate hashes or to validate hash contents'
            },{
                name: 'debug',
                alias: 'd',
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
            },{
                name: 'verify',
                alias: 'v',
                description: 'Verify the hash csv files provided to the files flag against the file system files'
            }]
        }];

        const usageText = usage(sections);
        console.log(usageText);
        process.exit(1);
    }

    return options;
}());
