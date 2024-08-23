const config = require('../config')
const { cmd, commands } = require('../command')

cmd({
    pattern: "alive",
    alias: ["Nethindu", "elixa", "nethindu"]
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        return await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: `${config.ALIVE_MSG}\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`
        }, { quoted: mek })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
