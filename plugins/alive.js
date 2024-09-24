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
    from, quoted, isCmd, command, sender, groupName, reply
}) => {
    try {
        const Alive = `
${config.ALIVE_MSG}
╭
│𝗥𝘂𝗻𝘁𝗶𝗺𝗲: ${runtime(process.uptime())}
│𝗥𝗮𝗺: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem() / 1024 / 1024)} MB
│𝗛𝗼𝘀𝘁: ${os.hostname()}
│𝗖𝗿𝗲𝗮𝘁𝗼𝗿: Nethindu Thaminda
│𝗢𝘄𝗻𝗲𝗿: ${config.OWNER}
╰───────────────────

> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘅𝗮 𝗠𝗗`;

        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: Alive
        }, { quoted: mek });

        const reactionMessage = {
            react: {
                text: "🖥️", // Reaction emoji
                key: mek.key // Corrected variable for message key
            }
        };

        await conn.sendMessage(from, reactionMessage); // Send the reaction

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
