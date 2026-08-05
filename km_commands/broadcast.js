// km_commands/broadcast.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'broadcast',
  category: 'owner',
  description: 'إرسال إعلان عام',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Broadcast Command - Send message to all chats
 */

module.exports = {
    name: 'broadcast',
    aliases: ['bc'],
    category: 'owner',
    description: 'Broadcast message to all chats',
    usage: '.broadcast <message>',
    ownerOnly: true,
    
    async execute(sock, msg, args, extra) {
      try {
        if (args.length === 0) {
          return extra.reply('❌ Usage: .broadcast <message>\n\nExample: .broadcast Hello everyone!');
        }
        
        const message = args.join(' ');
        
        const chats = await sock.groupFetchAllParticipating();
        const groups = Object.values(chats);
        
        let success = 0;
        let failed = 0;
        
        for (const group of groups) {
          try {
            await sock.sendMessage(group.id, {
              text: `📢 *BROADCAST MESSAGE*\n\n${message}\n\n_This is a broadcast message from bot owner_`
            });
            success++;
          } catch (e) {
            failed++;
          }
        }
        
        await extra.reply(`✅ Broadcast complete!\n\n✅ تم بنجاح ✅: ${success}\n❌ Failed: ${failed}`);
        
      } catch (error) {
        await extra.reply(`❌ Error: ${error.message}`);
      }
    }
  };
    }
};
