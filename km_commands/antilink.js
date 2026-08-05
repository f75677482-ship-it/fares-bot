// km_commands/antilink.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'antilink',
  category: 'general',
  description: 'منع الروابط',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Antilink Command - Toggle antilink protection with delete/kick options
 */

const database = require('../lib/kmDatabase').bind((sock && sock._faresPhone) || '');

module.exports = {
  name: 'antilink',
  aliases: [],
  category: 'admin',
  description: 'Configure antilink protection (delete/kick)',
  usage: '.antilink <on/off/set/get>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antilink ? 'ON' : 'OFF';
        const action = settings.antilinkAction || 'delete';
        return extra.reply(
          `🔗 *Antilink الحالة:*\n\n` +
          `الحالة:: *${status}*\n` +
          `الإجراء:: *${action}*\n\n` +
          `Usage:\n` +
          `  .antilink on\n` +
          `  .antilink off\n` +
          `  .antilink set delete | kick\n` +
          `  .antilink get`
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'on') {
        if (database.getGroupSettings(extra.from).antilink) {
          return extra.reply('*Antilink مفعّل بالفعل*');
        }
        database.updateGroupSettings(extra.from, { antilink: true });
        return extra.reply('*Antilink has been تم تفعيله ✅*');
      }
      
      if (opt === 'off') {
        database.updateGroupSettings(extra.from, { antilink: false });
        return extra.reply('*Antilink has been تم تعطيله ❌*');
      }
      
      if (opt === 'set') {
        if (args.length < 2) {
          return extra.reply('*Please specify an action: .antilink set delete | kick*');
        }
        
        const setAction = args[1].toLowerCase();
        if (!['delete', 'kick'].includes(setAction)) {
          return extra.reply('*Invalid action. Choose delete or kick.*');
        }
        
        database.updateGroupSettings(extra.from, { 
          antilinkAction: setAction,
          antilink: true // Auto-enable when setting action
        });
        return extra.reply(`*Antilink action set to ${setAction}*`);
      }
      
      if (opt === 'get') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antilink ? 'ON' : 'OFF';
        const action = settings.antilinkAction || 'delete';
        return extra.reply(`*Antilink Configuration:*\nStatus: ${status}\nAction: ${action}`);
      }
      
      return extra.reply('*Use .antilink for usage.*');
      
    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};
  }
};
