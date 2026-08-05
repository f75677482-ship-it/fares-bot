// km_commands/ai.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'ai',
  category: 'ai',
  description: 'دردشة ذكاء اصطناعي',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * AI Chat Command - ChatGPT-style responses
 */

const APIs = require('../../utils/api');

module.exports = {
  name: 'ai',
  aliases: ['gpt', 'chatgpt', 'ask'],
  category: 'ai',
  description: 'Chat with AI (ChatGPT-style)',
  usage: '.ai <question>',
  
  async execute(sock, msg, args, extra) {
    try {
      if (args.length === 0) {
        return extra.reply('❌ Usage: .ai <question>\n\nExample: .ai What is the capital of France?');
      }
      
      const question = args.join(' ');
      
      const response = await APIs.chatAI(question);
      
      // Send only the answer without labels
      const answer = response.response || response.msg || response.data?.msg || response;
      await extra.reply(answer);
      
    } catch (error) {
      await extra.reply(`❌ AI Error: ${error.message}`);
    }
  }
};
  }
};
