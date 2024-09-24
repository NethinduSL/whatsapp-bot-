const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os');

cmd({
    pattern: "alive",
    desc: "Check if the bot is online.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        const aliveMessage = `
${config.ALIVE_MSG}
╭
│𝗥𝘂𝗻𝘁𝗶𝗺𝗲: ${runtime(process.uptime())}
│𝗥𝗮𝗺: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem() / 1024 / 1024)} MB
│𝗛𝗼𝘀𝘁: ${os.hostname()}
│𝗖𝗿𝗲𝗮𝘁𝗼𝗿: Nethindu Thaminda
│𝗢𝘄𝗻𝗲𝗿: ${config.OWNER}
╰───────────────────

> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘇𝗮 𝗠𝗗`;

        
        // Button message with a Ping button
        const buttonMessage = {
            text: aliveMessage,
            footer: 'UPDATER',
            templateButtons: [
                { index: 1, quickReplyButton: { displayText: '𝗽𝗶𝗻𝗴', id: '.ping' } }
            ],
            headerType: 1 // Required for text messages with buttons
        };

        // Send the button message
        await conn.sendMessage(from,{text : buttonMessage}, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
