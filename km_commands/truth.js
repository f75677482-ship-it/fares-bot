// km_commands/truth.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'truth',
  category: 'fun',
  description: 'سؤال صراحة',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Truth - Get a random truth question from @bochilteam/scraper (translated to English)
 */

const { truth } = require('@bochilteam/scraper');
const { translate } = require('@vitalets/google-translate-api');

module.exports = {
    name: 'truth',
    aliases: [],
    category: 'fun',
    desc: 'Get a random truth question',
    usage: 'truth',
    execute: async (sock, msg, args, extra) => {
      try {
        const question = await truth();
        
        // Translate to English
        const res = await translate(question, { to: 'en' });
        
        await extra.reply(res.text);
        
      } catch (error) {
        console.error('Truth Error:', error);
        await extra.reply(`❌ Error: ${error.message}`);
      }
    }
  };
    }
};
