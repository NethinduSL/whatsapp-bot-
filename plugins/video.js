const config = require('../config');
const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

cmd({
    pattern: "song",
    desc: "Download Songs By Elixa.",
    category: "Download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid URL 🙃");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url

        let desc = `
*Elixa Song Downloader*🎵

🔗Title: ${data.title}
💿Description: ${data.description}
🕦Duration: ${data.timestamp}
📤Uploaded: ${data.ago}
👁️Views: ${data.views}

> ®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // download audio
        let down = await fg.yta(url); // Use the video's URL for downloading
        let downloadUrl = down.dl_url;

        // send audio
        await conn.sendMessage(from,  {audio:{url: downloadUrl}, mimetype: "audio/mpeg" }, { quoted: mek });
       await conn.sendMessage(from,  {document:{url: downloadUrl}, mimetype: "audio/mp3",fileName:data.title + ".mp3", caption:"®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"}, { quoted: mek });
       
 


        
    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});




//---------------------------video--------------------------


cmd({
    pattern: "video",
    desc: "Download videos By Elixa.",
    category: "Download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid URL 🙃");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url

        let desc = `        
*Elixa video Downloader*🎬

🔗Title: ${data.title}
💿Description: ${data.description}
🕦Duration: ${data.timestamp}
📤Uploaded: ${data.ago}
👁️Views: ${data.views}



> ®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // download audio
        let down = await fg.yta(url); // Use the video's URL for downloading
        let downloadUrl = down.dl_url;

        // send video
       await conn.sendMessage(from,  {video:{url: downloadUrl}, mimetype: "video/mp4" }, { quoted: mek });
       await conn.sendMessage(from,  {document:{url: downloadUrl}, mimetype: "video/mp4",fileName:data.title + ".mp4",caption:"®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗 }, { quoted: mek });
       
 

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});



