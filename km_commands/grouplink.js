// km_commands/grouplink.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'grouplink',
  category: 'general',
  description: 'رابط الدعوة للمجموعة',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Group Link Command - Get group invite link
 */

module.exports = {
    name: 'grouplink',
    aliases: ['link', 'invite'],
    category: 'admin',
    description: 'Get group invite link',
    usage: '.grouplink',
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true,
    
    async execute(sock, msg, args, extra) {
      try {
        const code = await sock.groupInviteCode(extra.from);
        const link = `https://chat.whatsapp.com/${code}`;
        
        let text = `🔗 *GROUP INVITE LINK*\n\n`;
        text += `📱 Group: ${extra.groupMetadata.subject}\n`;
        text += `🔗 Link: ${link}\n\n`;
        text += `⚠️ Don't share this link publicly!`;
        
        await extra.reply(text);
        
      } catch (error) {
        await extra.reply(`❌ Error: ${error.message}`);
      }
    }
  };
    }
};
