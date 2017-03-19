'use strict';

const options = require('./options.js');
const path = require('path');
const md5 = require('md5-file/promise');
const fs = require('fs');

const logger = require('bunyan').createLogger({
    name: 'lost-and-found',
    level: (options.quiet ? 60 : (options.verbose ? 10 : (process.env.LOG_LEVEL || 30)))
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
Promise.all(options.files.map((file) => {
    lost.log.trace(`Generating hash of file ${file}`);
    let hash = {
        path: file,
        absolute: path.resolve(file)
    };

    return md5(file)
    .then((hashString) => {
        hash.hash = hashString;
        lost.log.debug({
            hash: hash
        });
        lost.log.trace(`Computed hash of ${hash.path} as ${hash.hash}`);
        hashes.push(hash);
    });
}))
.then(() => {
    if(options.writefile) {
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
});

