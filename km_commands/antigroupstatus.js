// km_commands/antigroupstatus.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'antigroupstatus',
  category: 'general',
  description: 'حظر منشورات الحالة الجماعية',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Antigroupstatus - Block group status posts in the group
 */

const database = require('../lib/kmDatabase').bind((sock && sock._faresPhone) || '');

module.exports = {
  name: 'antigroupstatus',
  aliases: ['antigstatus', 'ags'],
  category: 'admin',
  description: 'Block group status posts (delete/kick)',
  usage: '.antigroupstatus <on/off/set/get>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antigroupstatus ? 'ON' : 'OFF';
        const action = settings.antigroupstatusAction || 'delete';
        return extra.reply(
          `📵 *Anti Group الحالة:*\n\n` +
          `الحالة:: *${status}*\n` +
          `الإجراء:: *${action}*\n\n` +
          `Blocks members from posting WhatsApp group statuses.\n\n` +
          `Usage:\n` +
          `  .antigroupstatus on\n` +
          `  .antigroupstatus off\n` +
          `  .antigroupstatus set delete | kick\n` +
          `  .antigroupstatus get`
        );
      }

      const opt = args[0].toLowerCase();

      if (opt === 'on') {
        if (database.getGroupSettings(extra.from).antigroupstatus) {
          return extra.reply('*Anti group status مفعّل بالفعل*');
        }
        database.updateGroupSettings(extra.from, { antigroupstatus: true });
        return extra.reply('*Anti group status has been تم تفعيله ✅*');
      }

      if (opt === 'off') {
        database.updateGroupSettings(extra.from, { antigroupstatus: false });
        return extra.reply('*Anti group status has been تم تعطيله ❌*');
      }

      if (opt === 'set') {
        if (args.length < 2) {
          return extra.reply('*Usage: .antigroupstatus set delete | kick*');
        }
        const setAction = args[1].toLowerCase();
        if (!['delete', 'kick'].includes(setAction)) {
          return extra.reply('*Invalid action. Choose delete or kick.*');
        }
        database.updateGroupSettings(extra.from, {
          antigroupstatusAction: setAction,
          antigroupstatus: true
        });
        return extra.reply(`*Anti group status action set to ${setAction}*`);
      }

      if (opt === 'get') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antigroupstatus ? 'ON' : 'OFF';
        const action = settings.antigroupstatusAction || 'delete';
        return extra.reply(`*Anti Group الحالة: Config:*\nStatus: ${status}\nAction: ${action}`);
      }

      return extra.reply('*Use .antigroupstatus for usage.*');
    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};
  }
};
