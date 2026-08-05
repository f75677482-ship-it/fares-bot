// km_commands/ping.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'ping',
  category: 'general',
  description: 'سرعة البوت',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Ping Command - Check bot response time
 */

module.exports = {
    name: 'ping',
    aliases: ['p'],
    category: 'general',
    description: 'Check bot response time',
    usage: '.ping',
    
    async execute(sock, msg, args, extra) {
      try {
        const start = Date.now();
        const sent = await extra.reply('🏓 Pinging...');
        const end = Date.now();
        
        const responseTime = end - start;
        
        await sock.sendMessage(extra.from, {
          text: `🏓 *Pong!*\n⚡ Response Time: ${responseTime}ms`,
          edit: sent.key
        });
        
      } catch (error) {
        await extra.reply(`❌ Error: ${error.message}`);
      }
    }
  };
    }
};
