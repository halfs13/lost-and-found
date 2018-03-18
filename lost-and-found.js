#!/usr/bin/env node

'use strict';

const options = require('./options.js');
const path = require('path');
const md5 = require('md5-file/promise');
const fs = require('fs');

const logger = require('bunyan').createLogger({
    name: 'lost-and-found',
    level: (options.quiet ? 60 : (options.debug ? 10 : (process.env.LOG_LEVEL || 30)))
});

process.on('unhandledRejection', error => {
    lost.log.error(`Unhandled Rejection: ${error}`, error.stack);
});

global._ = require('lodash');
global.lost = {
    cwd: process.cwd(),
    path: path.dirname(require.main.filename),
    log: logger
};

lost.log.trace(`Working path set to be ${lost.cwd}`);
lost.log.trace(`Root path set to be ${lost.path}`);

let hashes = [];
if(options.verify) {
    verifyHashes();
} else {
    generateHashes();
}

function generateHashes() {
    processFileList(options.files)
    .then(() => {
        if(options.writefile) {
            writeFile();
        } else {
            logHashes();
        }
    });
}

function processFileList(files) {
    return Promise.all(files.map(processFile));
}

function processFile(file) {
    lost.log.debug(`Processing file ${file}`);

    const filePath = path.resolve(file);

    if(fs.statSync(filePath).isDirectory()) {
        return processDirectory(file);
    } else {
        return md5(file)
        .then((hashString) => {
            let hash = {
                path: file,
                absolute: path.resolve(file),
                hash: hashString
            };

            lost.log.trace(hash);
            lost.log.info(`Computed hash of ${hash.path} as ${hash.hash}`);

            hashes.push(hash);
        });
    }
}

function processDirectory(dir) {
    return new Promise((resolve) => {
        fs.readdir(dir, (err, files) => {
            resolve(files.map((file) => {
                return `${dir}${path.sep}${file}`;
            }));
        });
    })
    .then(processFileList);
}

function writeFile() {
    const output = lost.cwd + path.sep + (options.outputfile ? options.outputfile : 'output_md5.csv');
    if(fs.existsSync(output)) {
        if(!options.force) {
            lost.log.fatal('output.md5 already exists; use --force to overwrite');
            process.exit(1);
        } else {
            lost.log.info('wiping output file');
            fs.truncateSync(output, 0);
        }
    }

    _.each(hashes, (hash) => {
        lost.log.trace(`writing hash for ${hash.path}`);
        fs.appendFileSync(output, hash.path + ',' + hash.absolute + ',' + hash.hash + '\n');
    });
}

function logHashes() {
    console.dir(hashes);
}

function verifyHashes() {

}

