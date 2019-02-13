const request = require('request-promise-native');
const fs = require('fs');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

const file = 'mailing.etobilet.ru-access.log.15';

var uaCheck = [];

async function doRequest(ua) {
    let res =  await request({
        method: 'GET',
        uri: 'http://127.0.0.1:3100/ua?ua='+ua,
        json: true // Automatically stringifies the body to JSON
    });
    return res;
}

async function insertRequest(ua) {
    let res =  await request({
        method: 'POST',
        uri: 'http://127.0.0.1:3100/ua?ua='+ua,
        json: true // Automatically stringifies the body to JSON
    });
    return res;
}

async function main() {
    var contents = fs.readFileSync(file, 'utf8');
    let lines = contents.split('\n');

    for (const line of lines) {
        if (line == '') return true;
        let ua = line.split('" "')[1].replace('"', '');

        // console.log(ua);

        if (uaCheck.indexOf(ua) != -1) continue;

        let res = await doRequest(ua);
        
        console.log(res);

        if (res.status == 'not') {
            let res = await insertRequest(ua);
        }

        uaCheck.push(ua);
    }

    // console.log(1);
    // let res = await doRequest();
    // console.log(res);
    // console.log(2);

    
}

main();