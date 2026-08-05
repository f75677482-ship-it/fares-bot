// km_commands/dare.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'dare',
  category: 'fun',
  description: 'تحدي جريء',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * Dare - Get a random dare challenge
 */

module.exports = {
    name: 'dare',
    aliases: [],
    category: 'fun',
    desc: 'Get a random dare challenge',
    usage: 'dare',
    execute: async (sock, msg, args) => {
      try {
        const dares = [
          "Send a screenshot of your gallery!",
          "Let someone else write a status on your WhatsApp!",
          "Call a random contact and sing them a song!",
          "Post an embarrassing selfie!",
          "Text your crush and confess your feelings!",
          "Do 20 pushups and send a video!",
          "Change your profile picture to something embarrassing for 24 hours!",
          "Send a voice note singing the alphabet!",
          "Let the group choose your status for a day!",
          "Tell the group your most embarrassing moment!",
          "Share your last 5 Google searches!",
          "Dance in front of everyone for 1 minute!",
          "Do your best impression of someone in the group!",
          "Speak in an accent for the next 10 minutes!",
          "Post a story saying 'I lost a bet' for 24 hours!",
          "Let someone go through your phone for 2 minutes!",
          "Send a flirty message to a random contact!",
          "Do 50 jumping jacks!",
          "Tell a joke, if no one laughs do the dare again!",
          "Record yourself doing a TikTok dance!"
        ];
        
        const randomDare = dares[Math.floor(Math.random() * dares.length)];
        
        await sock.sendMessage(msg.key.remoteJid, {
          text: `${randomDare}`
        }, { quoted: msg });
        
      } catch (error) {
        console.error('Dare Error:', error);
        await sock.sendMessage(msg.key.remoteJid, {
          text: `❌ Error: ${error.message}`
        }, { quoted: msg });
      }
    }
  };
    }
};
