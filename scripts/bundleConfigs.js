// The purpose of this script is to bundle together all .yml config files under /config
// into a single .json file. The advantage of this is only a single json file has to be
// read into the client, and json generally has smaller size than yml

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function formatBytes(bytes, decimals = 1) {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function fileSize(path) {
    return formatBytes(fs.statSync(path).size);
}

module.exports = (options = {}) => {
    const {
        targets = [],
        outputFile,
        hook = 'buildStart',
    } = options;
    return {
        name: 'bundleConfigs',
        [hook]: async() => {
            let json = []
            for (let target of targets) {
                console.log(`Loading config ${target} (${fileSize(target)})`);
                const content = fs.readFileSync(target);
                json.push(yaml.load(content));
            }
            fs.writeFileSync(outputFile, JSON.stringify(json, (key, value) => {
                if (value == null) {
                    return undefined;
                }
                // yaml parser parses empty field as array with single null element. Remove entirely
                if (Array.isArray(value) && value.length === 1 && value[0] == null) {
                    return undefined;
                }
                return value;
            },));
            console.log(`\nBundled configs\nOutput to ${outputFile} (${fileSize(outputFile)})\n`);
        }
    }
}