// km_commands/setprefix.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'setprefix',
  category: 'owner',
  description: 'تغيير البادئة',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Set Prefix Command - Change bot command prefix
 */

const config = require('../../config');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'setprefix',
  aliases: ['prefix'],
  category: 'owner',
  description: 'Change bot command prefix',
  usage: '.setprefix <new prefix>',
  ownerOnly: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (args.length === 0) {
        return extra.reply(`📌 Current prefix: ${config.prefix}\n\nUsage: .setprefix <new prefix>`);
      }
      
      const newPrefix = args[0];
      
      if (newPrefix.length > 3) {
        return extra.reply('❌ Prefix must be 1-3 characters long!');
      }
      
      // Update config
      config.prefix = newPrefix;
      
      // Update config file
      const configPath = path.join(__dirname, '../../config.js');
      let configContent = fs.readFileSync(configPath, 'utf-8');
      configContent = configContent.replace(/prefix: '.*'/, `prefix: '${newPrefix}'`);
      fs.writeFileSync(configPath, configContent);
      
      await extra.reply(`✅ Prefix changed to: ${newPrefix}\n\nNew command format: ${newPrefix}command`);
      
    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};
  }
};
