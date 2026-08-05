// km_commands/autosticker.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'autosticker',
  category: 'general',
  description: 'تحويل تلقائي للصور إلى ملصقات',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * AutoSticker Command - Enable or disable auto-sticker conversion
 */

const database = require('../lib/kmDatabase').bind((sock && sock._faresPhone) || '');

module.exports = {
  name: 'autosticker',
  aliases: ['autos', 'asticker'],
  category: 'admin',
  description: 'Enable or disable auto-sticker conversion (images/videos automatically become stickers)',
  usage: '.autosticker <on/off>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: false,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.autosticker ? 'ON' : 'OFF';
        return extra.reply(
          `📌 *AutoSticker الحالة:*\n\n` +
          `الحالة:: *${status}*\n\n` +
          `When enabled, all images and videos sent in this group will automatically be converted to stickers.\n\n` +
          `Usage:\n` +
          `  .autosticker on\n` +
          `  .autosticker off`
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'on') {
        if (database.getGroupSettings(extra.from).autosticker) {
          return extra.reply('*AutoSticker is already ON*');
        }
        database.updateGroupSettings(extra.from, { autosticker: true });
        return extra.reply('✅ *AutoSticker has been تم تفعيله ✅*\n\nAll images and videos will now automatically be converted to stickers!');
      }
      
      if (opt === 'off') {
        if (!database.getGroupSettings(extra.from).autosticker) {
          return extra.reply('*AutoSticker is already OFF*');
        }
        database.updateGroupSettings(extra.from, { autosticker: false });
        return extra.reply('❌ *AutoSticker has been تم تعطيله ❌*');
      }
      
      return extra.reply('❌ Invalid option!\nUsage: .autosticker <on/off>');
    } catch (error) {
      console.error('[AutoSticker Command Error]:', error);
      return extra.reply('❌ Error updating autosticker setting.');
    }
  }
};

  }
};
