// km_commands/newsletter.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'newsletter',
  category: 'owner',
  description: 'إدارة القناة الإخبارية',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Newsletter Command - Get القناة الإخبارية information from WhatsApp القناة link
 */

/**
 * Extract invite code from WhatsApp القناة link
 * @param {string} link - Channel link (e.g., https://whatsapp.com/القناة/0029VaAbCdEfGhIJkL)
 * @returns {string|null} - Invite code or null if invalid
 */
function getChannelInviteCode(link) {
  try {
    // Clean the link
    let cleanLink = link.trim();
    
    // Remove any query parameters or fragments
    cleanLink = cleanLink.split('?')[0].split('#')[0];
    
    // Try to parse as URL first
    try {
      const url = new URL(cleanLink);
      const parts = url.pathname.split('/').filter(Boolean);
      const code = parts[parts.length - 1];
      if (code && code.length > 0) {
        return code;
      }
    } catch (urlError) {
      // If URL parsing fails, try regex extraction
    }
    
    // Regex patterns to extract invite code
    const patterns = [
      /(?:whatsapp\.com|wa\.me)\/القناة\/([A-Za-z0-9]+)/i,
      /\/القناة\/([A-Za-z0-9]+)/i,
      /القناة\/([A-Za-z0-9]+)/i
    ];
    
    for (const pattern of patterns) {
      const match = cleanLink.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    // If no pattern matches, check if the link itself is just the code
    if (/^[A-Za-z0-9]+$/.test(cleanLink)) {
      return cleanLink;
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting invite code:', error);
    return null;
  }
}


module.exports = {
  name: 'القناة الإخبارية',
  aliases: ['القناة', 'channelinfo', 'nl'],
  category: 'owner',
  description: 'Get القناة الإخبارية information from WhatsApp القناة link',
  usage: '.القناة الإخبارية <القناة link>',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    try {
      const chatId = extra.from;
      
      // Get link from args or message text
      const text = msg.message?.conversation || 
                   msg.message?.extendedTextMessage?.text ||
                   args.join(' ');
      
      if (!text || text.trim().length === 0) {
        return extra.reply('❌ الرجاء إدخال a WhatsApp القناة link!\n\nExample: .القناة الإخبارية https://whatsapp.com/القناة/0029VaAbCdEfGhIJkL');
      }
      
      // Extract link from text (remove command prefix if present)
      let link = text.replace(/^\.(القناة الإخبارية|nl|القناة|channelinfo)\s+/i, '').trim() || args.join(' ').trim();
      
      // If no link provided, show error
      if (!link || link.length === 0) {
        return extra.reply('❌ الرجاء إدخال a WhatsApp القناة link!\n\nExample: .القناة الإخبارية https://whatsapp.com/القناة/0029VaAbCdEfGhIJkL');
      }
      
      // Try to extract invite code first (works with or without full URL)
      const inviteCode = getChannelInviteCode(link);
      
      if (!inviteCode) {
        return extra.reply('❌ Could not extract invite code from the link!\n\nPlease provide a valid WhatsApp القناة link.\nExample: https://whatsapp.com/القناة/0029VaAbCdEfGhIJkL\n\nOr just the invite code: .القناة الإخبارية 0029VaAbCdEfGhIJkL');
      }
      
      // Use the extracted invite code directly
      link = inviteCode;
      
     
      
      try {
        // Get القناة الإخبارية metadata using the invite code directly
        const meta = await sock.newsletterMetadata('invite', link);
        
        if (!meta) {
          throw new Error('Newsletter غير موجود');
        }
        
        // Format the response
        let infoText =`${meta.id || 'N/A'}`;
        
        if (meta.description) {
          infoText += `📝 *Description:* ${meta.description}\n`;
        }
        
        if (meta.invite) {
          infoText += `🔗 *Invite Code:* \`${meta.invite}\`\n`;
        }
        
        if (meta.subscriberCount !== undefined) {
          infoText += `👥 *Subscribers:* ${meta.subscriberCount.toLocaleString()}\n`;
        }
        
        if (meta.creationTime) {
          const date = new Date(meta.creationTime * 1000);
          infoText += `📅 *Created:* ${date.toLocaleDateString()}\n`;
        }
        
        if (meta.image) {
          // Send with image if available
          await sock.sendMessage(chatId, {
            image: { url: meta.image },
            caption: infoText
          }, { quoted: msg });
        } else {
          // Send text only
          await sock.sendMessage(chatId, {
            text: infoText
          }, { quoted: msg });
        }
        
      } catch (error) {
        console.error('Newsletter command error:', error);
        
        if (error.message.includes('Invalid القناة link')) {
          await extra.reply('❌ Invalid القناة link format!\n\nPlease provide a valid WhatsApp القناة link.\nExample: https://whatsapp.com/القناة/0029VaAbCdEfGhIJkL');
        } else if (error.message.includes('Newsletter غير موجود')) {
          await extra.reply('❌ Newsletter غير موجود!\n\nThe القناة link might be invalid or the القناة الإخبارية might not exist.');
        } else if (error.message.includes('newsletterMetadata')) {
          await extra.reply('❌ Newsletter feature not available!\n\nMake sure you are using Baileys v7.0.0-rc or higher.');
        } else {
          await extra.reply(`❌ Failed to get القناة الإخبارية information: ${error.message}`);
        }
      }
      
    } catch (error) {
      console.error('Newsletter command error:', error);
      await extra.reply(`❌ حدث خطأ: ${error.message}`);
    }
  }
};

  }
};
