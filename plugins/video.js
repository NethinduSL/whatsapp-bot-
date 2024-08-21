
const config = require('../config')
const {cmd , commands} = require('../command')
const fg = requir('api-dylux')
const yts = requir('yt-search')
cmd({
    pattern: "song",
    desc: "Download Songs By Elixa.",
    category: "Download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply("Please give me a valid URL 🙃")
const search = await yts(q)
const data= search.videos[0];

let desc =`
let desc =`
*Elixa Song Downloader*🎵

title: ${data.title}
description: ${data.description}
time: ${data.timestamp}
ago : ${data.ago}
views: ${dat.views}

> ®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗

`
await conn.sendMessage(from,{image:{url:data.thumbnail},caption:desc},{quoted:mek});


// download audio
letdown = await fg.yta()



  
}catch(e){
comnsole.log(e)
reply(`${e}`)
  
}

})
