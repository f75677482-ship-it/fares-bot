// km_commands/setnewsletter.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'setnewsletter',
  category: 'owner',
  description: 'ضبط القناة الإخبارية',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * SetNewsletter Command - المالك only
 * Set or change the القناة الإخبارية JID for menu forwarding
 */

const fs = require('fs');
const path = require('path');
const config = require('../../config');

module.exports = {
  name: 'setnewsletter',
  aliases: ['setnl', 'setchannel'],
  category: 'owner',
  description: 'Set or change the القناة الإخبارية JID for menu forwarding (owner only)',
  usage: '.setnewsletter <القناة الإخبارية JID>',
  ownerOnly: true,
  adminOnly: false,
  groupOnly: false,
  botAdminOnly: false,
  
  async execute(sock, msg, args, extra) {
    try {
      const chatId = extra.from;
      let newsletterJid = '';
      
      // Check if we're currently in a القناة الإخبارية chat
      if (msg.key.remoteJid && msg.key.remoteJid.endsWith('@القناة الإخبارية')) {
        newsletterJid = msg.key.remoteJid;
      }
      // Check if replying to a message
      else if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        const contextInfo = msg.message.extendedTextMessage.contextInfo;
        
        // Recursive function to search for القناة الإخبارية JID in any field
        const findNewsletterJid = (obj, depth = 0) => {
          if (depth > 5 || !obj || typeof obj !== 'object') return null;
          
          for (const key in obj) {
            const value = obj[key];
            if (typeof value === 'string' && value.endsWith('@القناة الإخبارية')) {
              return value;
            }
            if (typeof value === 'object' && value !== null) {
              const found = findNewsletterJid(value, depth + 1);
              if (found) return found;
            }
          }
          return null;
        };
        
        // Search entire contextInfo object for any @القناة الإخبارية JID
        newsletterJid = findNewsletterJid(contextInfo);
        
        // If we still don't have a القناة الإخبارية JID, show error
        if (!newsletterJid) {
          return extra.reply('❌ The replied message is not from a القناة الإخبارية!\n\nPlease reply to a القناة الإخبارية message or provide a القناة الإخبارية JID directly.');
        }
      } else if (args[0]) {
        // Get JID from command arguments
        newsletterJid = args[0].trim();
      } else {
        // Show current status
        const currentJid = config.newsletterJid || 'Not set';
        return extra.reply(
          `📰 *Newsletter Configuration*\n\n` +
          `Current Newsletter JID: \`${currentJid}\`\n` +
          `Newsletter Name: ${config.botName}\n\n` +
          `Usage:\n` +
          `  .setnewsletter <القناة الإخبارية JID>\n` +
          `  Or reply to a القناة الإخبارية message with .setnewsletter\n\n` +
          `Example: .setnewsletter 120363161513685998@القناة الإخبارية`
        );
      }
      
      // Validate JID format (should end with @القناة الإخبارية)
      if (!newsletterJid.endsWith('@القناة الإخبارية')) {
        return extra.reply('❌ Invalid القناة الإخبارية JID format!\n\nNewsletter JID must end with `@القناة الإخبارية`\nExample: `120363161513685998@القناة الإخبارية`');
      }
      
      // Update config.js
      const configPath = path.join(__dirname, '../../config.js');
      let configContent = fs.readFileSync(configPath, 'utf8');
      
      // Check if newsletterJid موجود بالفعل in config
      if (configContent.includes('newsletterJid:')) {
        // Update existing newsletterJid
        configContent = configContent.replace(
          /newsletterJid:\s*['"]([^'"]+)['"]/,
          `newsletterJid: '${newsletterJid}'`
        );
      } else {
        // Add newsletterJid after sessionName
        configContent = configContent.replace(
          /(sessionName:\s*['"][^'"]+['"],)/,
          `$1\n    newsletterJid: '${newsletterJid}', // Newsletter JID for menu forwarding`
        );
      }
      
      // Write updated config
      fs.writeFileSync(configPath, configContent, 'utf8');
      
      // Update in-memory config
      config.newsletterJid = newsletterJid;
      
      await extra.reply(
        `✅ Newsletter JID updated successfully!\n\n` +
        `📰 Newsletter JID: \`${newsletterJid}\`\n` +
        `📛 Newsletter Name: ${config.botName}\n\n` +
        `The menu will now forward from this القناة الإخبارية.`
      );
      
    } catch (error) {
      console.error('SetNewsletter command error:', error);
      await extra.reply(`❌ Failed to set القناة الإخبارية JID: ${error.message}`);
    }
  }
};

  }
};
