const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');  

cmd({
    pattern: "ping",
    desc: "To check ping",
    category: "main",
    filename: __filename,
}, 
async (Void, citel) => {
    var inital = new Date().getTime();
    const { key } = await Void.sendMessage(citel.chat, { text: '```𝗧𝗲𝘀𝘁𝗶𝗻𝗴 𝗽𝗶𝗻𝗴 𝗼𝗳 𝗘𝗹𝗶𝘅𝗮...```' });
    var final = new Date().getTime();
    await Pmd.sleep(1000);
    const pg = await Void.sendMessage(citel.chat, { text: '📍 *ᴘɪɴɢ:' + (final - inital) + ' ms* ', edit: key });
    return await Void.sendMessage(citel.chat, { react: { text: '✔️', key: pg.key } });
});
