// km_commands/joke.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'joke',
  category: 'fun',
  description: 'نكتة عشوائية',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Joke Command - Send random jokes
 */

const APIs = require('../../utils/api');

module.exports = {
  name: 'joke',
  aliases: ['jokes'],
  category: 'fun',
  description: 'Get random joke',
  usage: '.joke',
  
  async execute(sock, msg, args, extra) {
    try {
      const joke = await APIs.getJoke();
      
      let text = `${joke.setup}\n\n${joke.punchline}`;
      
      await extra.reply(text);
      
    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};
  }
};
