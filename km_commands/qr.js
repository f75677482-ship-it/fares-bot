// km_commands/qr.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'qr',
  category: 'general',
  description: 'إنشاء رمز QR',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * QR Code Generator Command
 */

const qrcode = require('qrcode');

module.exports = {
  name: 'qr',
  aliases: ['qrcode'],
  category: 'general',
  description: 'Generate QR code from text',
  usage: '.qr <text>',
  
  async execute(sock, msg, args, extra) {
    try {
      if (args.length === 0) {
        return extra.reply('❌ Usage: .qr <text>\n\nExample: .qr https://google.com');
      }
      
      const text = args.join(' ');
      
      const qrBuffer = await qrcode.toBuffer(text, {
        type: 'png',
        width: 500,
        margin: 2
      });
      
      await sock.sendMessage(extra.from, {
        image: qrBuffer,
        caption: `✅ QR Code Generated!\n\n📝 Text: ${text}`
      }, { quoted: msg });
      
    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};
  }
};
