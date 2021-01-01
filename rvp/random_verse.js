// https://stackoverflow.com/a/15106541
//  get a random value
var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
};


// https://code-maven.com/javascript-on-github-pages
// get random verse and output a string
$().ready(function () {
    $.getJSON("msg.json", function (data) {
        var i = '30044'
        length = 0;
        while (length < 10) {
            i = randomProperty(data['text'])
            length = data['text'][i].split(" ").length
        }
        j = parseInt(i) + 1;
        j = j.toString();
        consec = parseInt(data['verse'][i]) == parseInt(data['verse'][j]) - 1;
        endch = parseInt(data['verse'][j]) == 1;
        text = data['text'][i].replace(/  +/g, '\n');
        if (consec || (!consec && endch)) {
            // console.log(`${data['book'][i]}  ${data['chapter'][i]}:${data['verse'][i]}\n ${text}`)
            $("#text").html(`<h2>${data['book'][i]}  ${data['chapter'][i]}:${data['verse'][i]} (Message version)</h2>\n ${data['text'][i]}`);
            $('#link').html(`<a href="https://www.biblegateway.com/passage/?search=${data['book'][i]}+${data['chapter'][i]}:${data['verse'][i]}&version=MSG">BibleGateway</a>`);
        } else {
            nextv = (parseInt(data['verse'][j]) - 1).toString()
            // console.log(`${data['book'][i]}  ${data['chapter'][i]}:${data['verse'][i]}\n ${text}`)
            $("#text").html(`<h2>${data['book'][i]}  ${data['chapter'][i]}:${data['verse'][i]}-${nextv} (Message version)</h2>\n ${data['text'][i]}`);
            $('#link').html(`<a href="https://www.biblegateway.com/passage/?search=${data['book'][i]}+${data['chapter'][i]}:${data['verse'][i]}-${nextv}&version=MSG">BibleGateway</a>`);
        };

    });
});