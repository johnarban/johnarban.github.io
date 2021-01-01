// const fs = require('fs')

// let out = fs.readFile('./nkjv.json', 'utf8', (err, data) => {
//     if (err) {
//         console.log("File read failed:", err)
//         return
//     }

//     var randomProperty = function (obj) {
//         var keys = Object.keys(obj);
//         return keys[keys.length * Math.random() << 0];
//     };

//     let bible = JSON.parse(data)
//     let i = randomProperty(bible.text)
//     // console.log(`${bible.book[i]}  ${bible.chapter[i]}:${bible.verse[i]} (NKJV)\n ${bible.text[i]}`)
//     return `${bible.book[i]}  ${bible.chapter[i]}:${bible.verse[i]} (NKJV)\n ${bible.text[i]}`;
// });

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
};

$().ready(function () {
    $.getJSON("nkjv.json", function (data) {
        console.log(data);
        // let bible = JSON.parse(data)
        let i = randomProperty(data['text'])
        $("#text").html(`<h2>${data['book'][i]}  ${data['chapter'][i]}:${data['verse'][i]} (NKJV)</h2>\n ${data['text'][i]}`);
    });
});

// var randomProperty = function (obj) {
//     var keys = Object.keys(obj);
//     return obj[keys[ keys.length * Math.random() << 0]];
// };