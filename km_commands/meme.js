// km_commands/meme.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'meme',
  category: 'fun',
  description: 'ميم عشوائي',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Meme Command - Send random memes
 */

const APIs = require('../../utils/api');
const axios = require('axios');

module.exports = {
  name: 'meme',
  aliases: ['memes'],
  category: 'fun',
  description: 'Get random memes',
  usage: '.meme',
  
  async execute(sock, msg, args, extra) {
    try {
      const meme = await APIs.getMeme();
      
      const imageBuffer = await axios.get(meme.url, { responseType: 'arraybuffer' });
      
      await sock.sendMessage(extra.from, {
        image: Buffer.from(imageBuffer.data),
        caption: `😂 *${meme.title}*\n\n📱 From: r/${meme.subreddit}\n👤 By: ${meme.author}\n⬆️ Upvotes: ${meme.ups}`
      }, { quoted: msg });
      
    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};
  }
};
