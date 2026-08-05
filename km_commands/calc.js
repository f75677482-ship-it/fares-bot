// km_commands/calc.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'calc',
  category: 'utility',
  description: 'حاسبة رياضية',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Calculator Command - Perform math calculations
 */

module.exports = {
    name: 'calc',
    aliases: ['calculate', 'math'],
    category: 'utility',
    description: 'Calculate math expressions',
    usage: '.calc <expression>',
    
    async execute(sock, msg, args, extra) {
      try {
        if (args.length === 0) {
          return extra.reply('❌ Usage: .calc <expression>\n\nExample: .calc 5 + 3 * 2');
        }
        
        const expression = args.join(' ');
        
        // Basic safety check
        if (!/^[0-9+\-*/(). ]+$/.test(expression)) {
          return extra.reply('❌ Invalid expression! Only numbers and operators (+, -, *, /, parentheses) allowed.');
        }
        
        try {
          const result = eval(expression);
          
          let text = `🧮 *Calculator*\n\n`;
          text += `📝 Expression: ${expression}\n`;
          text += `✅ Result: ${result}`;
          
          await extra.reply(text);
        } catch (evalError) {
          await extra.reply('❌ Invalid mathematical expression!');
        }
        
      } catch (error) {
        await extra.reply(`❌ Error: ${error.message}`);
      }
    }
  };
    }
};
