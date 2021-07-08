

// https://stackoverflow.com/a/64354200
function randomTruncSkewNormal({
  rng = Math.random,
  range = [-Infinity, Infinity],
  mean,
  stdDev,
  skew = 0
}) {
  // Box-Muller transform
  function randomNormals(rng) {
    let u1 = 0,
      u2 = 0;
    //Convert [0,1) to (0,1)
    while (u1 === 0) u1 = rng();
    while (u2 === 0) u2 = rng();
    const R = Math.sqrt(-2.0 * Math.log(u1));
    const Θ = 2.0 * Math.PI * u2;
    return [R * Math.cos(Θ), R * Math.sin(Θ)];
  }

  // Skew-normal transform
  // If a variate is either below or above the desired range,
  // we recursively call the randomSkewNormal function until
  // a value within the desired range is drawn
  function randomSkewNormal(rng, mean, stdDev, skew = 0) {
    const [u0, v] = randomNormals(rng);
    if (skew === 0) {
      const value = mean + stdDev * u0;
      if (value < range[0] || value > range[1])
        return randomSkewNormal(rng, mean, stdDev, skew);
      return value;
    }
    const sig = skew / Math.sqrt(1 + skew * skew);
    const u1 = sig * u0 + Math.sqrt(1 - sig * sig) * v;
    const z = u0 >= 0 ? u1 : -u1;
    const value = mean + stdDev * z;
    if (value < range[1] || value > range[0])
      return randomSkewNormal(rng, mean, stdDev, skew);
    return value;
  }

  return randomSkewNormal(rng, mean, stdDev, skew);
};

function randomValue(uniform = false) {
  if (uniform) {
    return Math.random()
  }
  return randomTruncSkewNormal({ range: [0.0, 1.0], mean: 0.5, stdDev: 0.5 / 2 })
}

// https://stackoverflow.com/a/15106541
//  get a random value
function randomProperty(obj) {
  var keys = Object.keys(obj);
  return keys[keys.length * randomValue(uniform=true) << 0];
};



// https://code-maven.com/javascript-on-github-pages
// get random verse and output a string
$().ready(function () {
  console.log("Inside function");
  $.getJSON("nkjv.json", function (bible) {
    var i = '30044'
    length = 0;
    while (length < 5) {
      i = randomProperty(bible['text'])
      length = bible['text'][i].split(" ").length
    }
    j = parseInt(i) + 1;
    j = j.toString();
    console.log(`i=${i}`)
    consec = parseInt(bible['verse'][i]) == parseInt(bible['verse'][j]) - 1;
    endch = parseInt(bible['verse'][j]) == 1;
    text = bible['text'][i].replace(/  +/g, '\n');
    if (consec || (!consec && endch)) {
      console.log(`${bible['book'][i]}  ${bible['chapter'][i]}:${bible['verse'][i]}\n ${text}`)
      $("#text").html(`<h2>${bible['book'][i]}  ${bible['chapter'][i]}:${bible['verse'][i]} (NKJV)</h2>\n ${bible['text'][i]}`);
      $('#link').html(`<a target="_blank" href="https://www.biblegateway.com/passage/?search=${bible['book'][i]}+${bible['chapter'][i]}:${bible['verse'][i]}&version=MSG;NKJV">BibleGateway</a>`);
    } else {
      nextv = (parseInt(bible['verse'][j]) - 1).toString()
      console.log(`${bible['book'][i]}  ${bible['chapter'][i]}:${bible['verse'][i]}\n ${text}`)
      $("#text").html(`<h2>${bible['book'][i]}  ${bible['chapter'][i]}:${bible['verse'][i]}-${nextv} (NKJV)</h2>\n ${bible['text'][i]}`);
      $('#link').html(`<a target="_blank" href="https://www.biblegateway.com/passage/?search=${bible['book'][i]}+${bible['chapter'][i]}:${bible['verse'][i]}-${nextv}&version=MSG;NKJV">BibleGateway</a>`);
    };

  });
});
