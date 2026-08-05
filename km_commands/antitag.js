// km_commands/antitag.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'antitag',
  category: 'general',
  description: 'تفعيل/تعطيل منشن الجماعة',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * AntiTag Command
 * Enable/disable anti-tag and set action (delete/kick)
 */

const database = require('../lib/kmDatabase').bind((sock && sock._faresPhone) || '');

module.exports = {
  name: 'antitag',
  aliases: ['antimention', 'at'],
  description: 'Configure anti-tag protection (tagall/hidetag)',
  usage: '.antitag <on/off/set/get>',
  category: 'admin',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antitag ? 'ON' : 'OFF';
        const action = settings.antitagAction || 'delete';
        return extra.reply(
          `📛 Anti-tag is *${status}* (action: *${action}*).\n` +
          'Usage:\n' +
          '  .antitag on\n' +
          '  .antitag off\n' +
          '  .antitag set delete | kick\n' +
          '  .antitag get'
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'on') {
        if (database.getGroupSettings(extra.from).antitag) {
          return extra.reply('*Antitag مفعّل بالفعل*');
        }
        database.updateGroupSettings(extra.from, { antitag: true });
        return extra.reply('*Antitag has been تم تفعيله ✅*');
      }
      
      if (opt === 'off') {
        database.updateGroupSettings(extra.from, { antitag: false });
        return extra.reply('*Antitag has been تم تعطيله ❌*');
      }
      
      if (opt === 'set') {
        if (args.length < 2) {
          return extra.reply('*Please specify an action: .antitag set delete | kick*');
        }
        
        const setAction = args[1].toLowerCase();
        if (!['delete', 'kick'].includes(setAction)) {
          return extra.reply('*Invalid action. Choose delete or kick.*');
        }
        
        database.updateGroupSettings(extra.from, { 
          antitagAction: setAction,
          antitag: true // Auto-enable when setting action
        });
        return extra.reply(`*Antitag action set to ${setAction}*`);
      }
      
      if (opt === 'get') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antitag ? 'ON' : 'OFF';
        const action = settings.antitagAction || 'delete';
        return extra.reply(`*Antitag Configuration:*\nStatus: ${status}\nAction: ${action}`);
      }
      
      return extra.reply('*Use .antitag for usage.*');
      
    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};
  }
};
