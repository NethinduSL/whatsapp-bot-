const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const { runtime } = require('../lib/functions');
const moment = require('moment-timezone');
const axios = require('axios');
const fetch = require('node-fetch');

// -----------------------------------------------------------------------------
cmd({
    pattern: "movie",
    category: "search",
    desc: "Sends image of asked Movie/Series.",
    use: '<text>',
    react: "🎞️",
    filename: __filename,
}, async (Void, citel, text) => {
    if (!text) return citel.reply(`*Please give me a movie name* ❗`);

    let fids = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`);
    let imdbt = "━━━━━━━━━━━━━━━━━\n``` Movie info```\n━━━━━━━━━━━━━━━━━\n";

    // Movie data formatting
    imdbt += `🎬 Title      : ${fids.data.Title}\n\n`;
    imdbt += `📅 Year       : ${fids.data.Year}\n\n`;
    imdbt += `⭐ Rated      : ${fids.data.Rated}\n\n`;
    imdbt += `📆 Released   : ${fids.data.Released}\n\n`;
    imdbt += `⏳ Runtime    : ${fids.data.Runtime}\n\n`;
    imdbt += `🌀 Genre      : ${fids.data.Genre}\n\n`;
    imdbt += `👨🏻‍💻 Director   : ${fids.data.Director}\n\n`;
    imdbt += `✍ Writer     : ${fids.data.Writer}\n\n`;
    imdbt += `👨 Actors     : ${fids.data.Actors}\n\n`;
    imdbt += `📃 Plot       : ${fids.data.Plot}\n\n`;
    imdbt += `🌐 Language   : ${fids.data.Language}\n\n`;
    imdbt += `🌍 Country    : ${fids.data.Country}\n\n`;
    imdbt += `🎖️ Awards     : ${fids.data.Awards}\n\n`;
    imdbt += `📦 BoxOffice  : ${fids.data.BoxOffice}\n\n`;
    imdbt += `🏙️ Production : ${fids.data.Production}\n\n`;
    imdbt += `🌟 imdbRating : ${fids.data.imdbRating}\n\n`;
    imdbt += `❎ imdbVotes  : ${fids.data.imdbVotes}`;

    // Sending movie info message
    Void.sendMessage(citel.chat, {
        image: {
            url: fids.data.Poster,
        },
        caption: imdbt,
    }, {
        quoted: citel,
    });
});

// -----------------------------------------------------------------------------
cmd({
    pattern: "weather",
    category: "search",
    desc: "Sends weather info about asked place.",
    use: '<location>',
    react: "🌧️",
    filename: __filename,
}, async (Void, citel, text) => {
    if (!text) return citel.reply("Give me location.Baka!!");

    let wdata = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
    );

    let textw = `🌦️ ━━━ *කාලගුණ නිවේදනය* ━━━ 🌦️ ${text}\n\n\n`;
    textw += `⛈️ *දැන් තත්වය:-* ${wdata.data.weather[0].main}\n\n`;
    textw += `📃 *විස්තරය:-* ${wdata.data.weather[0].description}\n\n`;
    textw += `☀️ *සාමාන්‍ය උෂ්ණත්වය:-* ${wdata.data.main.temp}\n\n`;
    textw += `🔥 *දැනෙන්නේ:-* ${wdata.data.main.feels_like}\n\n`;
    textw += `🌫️ *පීඩනය:-* ${wdata.data.main.pressure}\n\n`;
    textw += `🪐 *ආර්ද්‍රතාවය:-* ${wdata.data.main.humidity}\n\n`;
    textw += `🌪️ *සුළගේ වේගය:-* ${wdata.data.wind.speed}\n\n`;
    textw += `🌐 *අක්ෂාංශ:-* ${wdata.data.coord.lat}\n\n`;
    textw += `🌏 *දේශාංශ:-* ${wdata.data.coord.lon}\n\n`;
    textw += `🌍 *රට:-* ${wdata.data.sys.country}\n\n`;

    // Sending weather info message
    Void.sendMessage(citel.chat, {
        text: textw,
    }, {
        quoted: citel,
    });
});

// -----------------------------------------------------------------------------
cmd({
    pattern: "horo",
    category: "search",
    desc: "Gives horoscope info of user.",
    use: '<sign>\n:Example: horo libra',
    react: "😌",
    filename: __filename,
}, async (Void, citel, text) => {
    if (!text) return citel.reply("Provide me a sign!");

    try {
        const URL = `https://aztro.sameerkumar.website/?sign=${text}&day=today`;
        const response = await fetch(URL, { method: 'POST' });
        const json = await response.json();

        let textw = `*🌟 Horoscope of ${text}*\n\n`;
        textw += `*Current Date:* ${json.current_date}.\n`;
        textw += `*Sign:* ${text}.\n`;
        textw += `*Lucky Time:* ${json.lucky_time}.\n`;
        textw += `*Compatibility:* ${json.compatibility}.\n`;
        textw += `*Lucky Number:* ${json.lucky_number}.\n`;
        textw += `*Lucky Color:* ${json.color}.\n`;
        textw += `*Today Mood:* ${json.mood}.\n`;
        textw += `*Overall:* ${json.description}.\n`;

        // Sending horoscope info message
        citel.reply(textw);
    } catch (e) {
        console.log(e);
        citel.reply("Error fetching horoscope data.");
    }
});

// -----------------------------------------------------------------------------
cmd({
    pattern: "google",
    category: "search",
    desc: "Sends info of given query from Google Search.",
    react: "🔎",
    use: '<text>',
    filename: __filename,
}, async (Void, citel, text) => {
    if (!text) return citel.reply(`Example: ${prefix}google Secktor Md`);

    let google = require('google-it');
    google({ query: text }).then(res => {
        let responseText = `Google Search Result for: ${text}\n\n`;
        for (let g of res) {
            responseText += `➣ *Title* : ${g.title}\n`;
            responseText += `➣ *Description* : ${g.snippet}\n`;
            responseText += `➣ *Link* : ${g.link}\n\n────────────────────────\n\n`;
        }
        citel.reply(responseText);
    }).catch(err => {
        console.error(err);
        citel.reply("Error fetching Google results.");
    });
});

// -----------------------------------------------------------------------------
cmd({
    pattern: "couplepp",
    category: "admin",
    desc: "Sends two couples pics.",
    filename: __filename,
}, async (Void, citel) => {
    let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json');
    let random = anu[Math.floor(Math.random() * anu.length)];
    // Sending couple images
    Void.sendMessage(citel.chat, { image: { url: random.male }, caption: `Couple Male` }, { quoted: citel });
    Void.sendMessage(citel.chat, { image: { url: random.female }, caption: `Couple Female` }, { quoted: citel });
});

// -----------------------------------------------------------------------------
cmd({
    pattern: "snumber",
    alias: ["sn"],
    category: "search",
    react: "🏆",
    desc: "Searches in given range about given number.",
    use: '9112345678xx',
    filename: __filename,
}, async (Void, citel, text) => {
    var inputnumber = text.split(" ")[0];
    if (!inputnumber.includes('x')) return citel.reply('You did not add x\nExample: iswa 9196285162xx');
    
    citel.reply(`Searching for WhatsApp account in given range...`);
    
    // Count occurrences of 'x'
    function countInstances(string, word) {
        return string.split(word).length - 1;
    }

    var number0 = inputnumber.split('x')[0];
    var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : '';
    var random_length = countInstances(inputnumber, 'x');
    var randomxx;

    // Determine range for random number generation
    if (random_length == 1) {
        randomxx = 10;
    } else if (random_length ==
