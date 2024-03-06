const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');

if (process.argv.length !== 3) {
    console.error('Usage: node urls.js FILENAME');
    process.exit(1);
}

const fileName = process.argv[2];

function readUrlsFromFile(fileName) {
    try {
        const content = fs.readFileSync(fileName, 'utf8');
        return content.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
        console.error(`Error reading file ${fileName}: ${error.message}`);
        process.exit(1);
    }
}

function downloadUrlToFile(urlString) {
    const parsedUrl = url.parse(urlString);
    const hostname = parsedUrl.hostname;

    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    protocol.get(urlString, response => {
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            fs.writeFile(hostname, data, 'utf8', err => {
                if (err) {
                    console.error(`Error writing to file ${hostname}: ${err.message}`);
                } else {
                    console.log(`Written data to ${hostname}`);
                }
            });
        });

    }).on('error', error => {
        console.error(`Error downloading ${urlString}: ${error.message}`);
    });
}

const urls = readUrlsFromFile(fileName);
urls.forEach(downloadUrlToFile);
