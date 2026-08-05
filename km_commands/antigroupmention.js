// km_commands/antigroupmention.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'antigroupmention',
  category: 'general',
  description: 'منع منشن المجموعات',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Anti-Group Mention Command - Toggle antigroupmention protection with delete/kick options
 */

const database = require('../lib/kmDatabase').bind((sock && sock._faresPhone) || '');

module.exports = {
  name: 'antigroupmention',
  aliases: ['agm'],
  category: 'admin',
  description: 'Configure antigroupmention protection (delete/kick)',
  usage: '.antigroupmention <on/off/set/get>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antigroupmention ? 'ON' : 'OFF';
        const action = settings.antigroupmentionAction || 'delete';
        return extra.reply(
          `📌 *Antigroupmention الحالة:*\n\n` +
          `الحالة:: *${status}*\n` +
          `الإجراء:: *${action}*\n\n` +
          `Usage:\n` +
          `  .antigroupmention on\n` +
          `  .antigroupmention off\n` +
          `  .antigroupmention set delete | kick\n` +
          `  .antigroupmention get`
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'on') {
        if (database.getGroupSettings(extra.from).antigroupmention) {
          return extra.reply('*Antigroupmention مفعّل بالفعل*');
        }
        database.updateGroupSettings(extra.from, { antigroupmention: true });
        return extra.reply('*Antigroupmention has been تم تفعيله ✅*');
      }
      
      if (opt === 'off') {
        database.updateGroupSettings(extra.from, { antigroupmention: false });
        return extra.reply('*Antigroupmention has been تم تعطيله ❌*');
      }
      
      if (opt === 'set') {
        if (args.length < 2) {
          return extra.reply('*Please specify an action: .antigroupmention set delete | kick*');
        }
        
        const setAction = args[1].toLowerCase();
        if (!['delete', 'kick'].includes(setAction)) {
          return extra.reply('*Invalid action. Choose delete or kick.*');
        }
        
        database.updateGroupSettings(extra.from, { 
          antigroupmentionAction: setAction,
          antigroupmention: true // Auto-enable when setting action
        });
        return extra.reply(`*Antigroupmention action set to ${setAction}*`);
      }
      
      if (opt === 'get') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antigroupmention ? 'ON' : 'OFF';
        const action = settings.antigroupmentionAction || 'delete';
        return extra.reply(`*Antigroupmention Configuration:*\nStatus: ${status}\nAction: ${action}`);
      }
      
      return extra.reply('*Use .antigroupmention for usage.*');
      
    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};  }
};
