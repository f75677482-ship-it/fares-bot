// km_commands/ssweb.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'ssweb',
  category: 'general',
  description: 'لقطة لموقع',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * SSWeb - Screenshot Website Command
 */

const APIs = require('../../utils/api');

module.exports = {
  name: 'ssweb',
  aliases: ['screenshot', 'ss', 'webss'],
  category: 'general',
  description: 'Take a screenshot of a website',
  usage: '.ssweb <url>',
  
  async execute(sock, msg, args, extra) {
    try {
      if (args.length === 0) {
        return extra.reply('❌ الرجاء إدخال a website URL!\n\nExample: .ssweb https://github.com');
      }
      
      const url = args.join(' ');
      
      // Validate URL
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return extra.reply('❌ الرجاء إدخال a valid URL starting with http:// or https://');
      }
      
      await sock.sendMessage(extra.from, {
        react: { text: '📥', key: msg.key }
      });
      
      const screenshotBuffer = await APIs.screenshotWebsite(url);
      
      await sock.sendMessage(extra.from, {
        image: screenshotBuffer,
      }, { quoted: msg });
      
    } catch (error) {
      console.error('SSWeb command error:', error);
      await extra.reply(`❌ Failed to screenshot website: ${error.message}`);
    }
  }
};

  }
};
