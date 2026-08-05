// km_commands/antibadword.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'antibadword',
  category: 'general',
  description: 'فلتر الكلمات السيئة',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Antibadword Command - Detect and delete bad words (delete/kick/warn)
 */

const database = require('../lib/kmDatabase').bind((sock && sock._faresPhone) || '');

module.exports = {
  name: 'antibadword',
  aliases: ['antibad', 'nobadword'],
  category: 'admin',
  description: 'Configure antibadword protection (delete/kick/warn)',
  usage: '.antibadword <on/off/set/get>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antibadword ? 'ON' : 'OFF';
        const action = settings.antibadwordAction || 'delete';
        return extra.reply(
          `🚫 *Antibadword الحالة:*\n\n` +
          `الحالة:: *${status}*\n` +
          `الإجراء:: *${action}*\n\n` +
          `Usage:\n` +
          `  .antibadword on\n` +
          `  .antibadword off\n` +
          `  .antibadword set delete | kick | warn\n` +
          `  .antibadword get`
        );
      }

      const opt = args[0].toLowerCase();

      if (opt === 'on') {
        if (database.getGroupSettings(extra.from).antibadword) {
          return extra.reply('*Antibadword مفعّل بالفعل*');
        }
        database.updateGroupSettings(extra.from, { antibadword: true });
        return extra.reply('*Antibadword has been تم تفعيله ✅*');
      }

      if (opt === 'off') {
        database.updateGroupSettings(extra.from, { antibadword: false });
        return extra.reply('*Antibadword has been تم تعطيله ❌*');
      }

      if (opt === 'set') {
        if (args.length < 2) {
          return extra.reply('*Please specify an action: .antibadword set delete | kick | warn*');
        }

        const setAction = args[1].toLowerCase();
        if (!['delete', 'kick', 'warn'].includes(setAction)) {
          return extra.reply('*Invalid action. Choose delete, kick, or warn.*');
        }

        database.updateGroupSettings(extra.from, {
          antibadwordAction: setAction,
          antibadword: true,
        });
        return extra.reply(`*Antibadword action set to ${setAction}*`);
      }

      if (opt === 'get') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antibadword ? 'ON' : 'OFF';
        const action = settings.antibadwordAction || 'delete';
        return extra.reply(`*Antibadword Configuration:*\nStatus: ${status}\nAction: ${action}`);
      }

      return extra.reply('*Use .antibadword for usage.*');
    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  },
};
  }
};
