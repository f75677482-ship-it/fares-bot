// km_commands/unblock.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'unblock',
  category: 'owner',
  description: 'رفع الحظر',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Unblock Command - Unblock a user
 */

module.exports = {
  name: 'unblock',
  aliases: [],
  category: 'owner',
  description: 'Unblock a user',
  usage: '.unblock @user or reply',
  ownerOnly: true,
  
  async execute(sock, msg, args, extra) {
    try {
      let target;
      
      const ctx = msg.message?.extendedTextMessage?.contextInfo;
      const mentioned = ctx?.mentionedJid || [];
      
      if (mentioned && mentioned.length > 0) {
        target = mentioned[0];
      } else if (ctx?.participant && ctx.stanzaId && ctx.quotedMessage) {
        target = ctx.participant;
      } else {
        return extra.reply('❌ Please mention or reply to a user to unblock!');
      }
      
      await sock.updateBlockStatus(target, 'unblock');
      
      await sock.sendMessage(extra.from, {
        text: `✅ @${target.split('@')[0]} has been unblocked!`,
        mentions: [target]
      }, { quoted: msg });
      
    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};
  }
};
