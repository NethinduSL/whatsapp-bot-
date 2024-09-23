const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os'); 

cmd({
    pattern: "alive",
    desc: "Check if the bot is online.",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, {
    from, quoted, isCmd, args, sender, reply
}) => {
    try {
        const Alive = `
${config.ALIVE_MSG}
╭─────────────
│𝗥𝘂𝗻𝘁𝗶𝗺𝗲: ${runtime(process.uptime())}
│𝗥𝗮𝗺: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem() / 1024 / 1024)} MB
│𝗛𝗼𝘀𝘁: ${os.hostname()}
│𝗖𝗿𝗲𝗮𝘁𝗼𝗿: Nethindu Thaminda
│𝗢𝘄𝗻𝗲𝗿: ${config.OWNER}
╰───────────────

> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘅𝗮 𝗠𝗗`;

        // Sending the message with a button reply
        return await conn.sendMessage(from, {
            text: Alive,
            buttons: [
                {buttonId: 'id1', buttonText: {displayText: 'Status'}, type: 1},
                {buttonId: 'id2', buttonText: {displayText: 'Help'}, type: 1}
            ],
            headerType: 1
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        return reply(`Error: ${e.message}`);
    }
});
