const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os'); // Corrected require statement
const { generateWAMessageFromContent, prepareWAMessageMedia } = require('@adiwajshing/baileys');
const proto = require('@adiwajshing/baileys').proto;

cmd({
    pattern: "alive",
    desc: "Check if the bot is online.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
    participants, groupAdmins, isBotAdmins, isAdmins, reply, prefix
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

> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘇𝗮 𝗠𝗗`;

        const buttons = [
            {
                "buttonId": `${prefix}menu`,
                "buttonText": { "displayText": "MENU" },
                "type": 1
            },
            {
                "buttonId": `${prefix}ping`,
                "buttonText": { "displayText": "PING" },
                "type": 1
            }
        ];

        const buffer = null; // Replace with actual image buffer if needed
        const msg = generateWAMessageFromContent(m.from, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: Alive
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: "© ᴘᴏᴡᴇʀᴅ ʙʏ ᴇᴛʜɪx-ᴍᴅ"
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            ...(await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })),
                            title: ``,
                            gifPlayback: false,
                            subtitle: "",
                            hasMediaAttachment: false
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons
                        }),
                        contextInfo: {
                            quotedMessage: m.message,
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363249960769123@newsletter',
                                newsletterName: "Ethix-MD",
                                serverMessageId: 143
                            }
                        }
                    }),
                },
            },
        }, {});

        await conn.relayMessage(m.from, msg.message, {
            messageId: msg.key.id
        });
    } catch (error) {
        console.error(error);
        reply("An error occurred while processing your request.");
    }
});

export default cmd; // Correct export
