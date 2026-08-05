// km_commands/tts.js — مدمج من KnightBot-Mini، مُعَرَب + حقوق موحدة
// متعدد الجلسات: sock يأتي بحسب الرقم المربوط من pairingBridge
'use strict';

const { appendPromo, withFooter } = require('../lib/commonPromo');
const { bind: bindDb } = require('../lib/kmDatabase');

module.exports = {
  name: 'tts',
  category: 'general',
  description: 'تحويل نص إلى صوت',
  ownerOnly: false,
  async execute(sock, msg, args, extra) {
    const db = extra && extra.db ? extra.db : bindDb((sock && sock._faresPhone) || '');
/**
 * TTS - Text to Speech Command
 */

const { generateSpeech, parseTtsInput, MAX_CHARS } = require('../../utils/tts');
const { toPTT } = require('../../utils/converter');

module.exports = {
  name: 'tts',
  aliases: ['speak', 'say'],
  category: 'general',
  description: 'Convert text to speech',
  usage: '.tts [lang] <text>',
  
  async execute(sock, msg, args, extra) {
    try {
      const chatId = extra.from;
      const { text, lang } = parseTtsInput(args);

      if (!text) {
        return extra.reply(
          'الرجاء إدخال text to convert to speech.\n\n' +
          'Example: `.tts hi how are you`\n' +
          'Example: `.tts hi namaste kaise ho`\n' +
          'Lang codes: en, hi, id, es, fr, de, pt, ar, ja, ko'
        );
      }

      if (text.length > MAX_CHARS) {
        await extra.reply(`Text too long — max ${MAX_CHARS} characters. Trimming...`);
      }

      await extra.react('🎙️');

      const mp3Buffer = await generateSpeech(text, lang);

      let audioBuffer = mp3Buffer;
      let mimetype = 'audio/ogg; codecs=opus';

      try {
        audioBuffer = await toPTT(mp3Buffer, 'mp3');
      } catch (convErr) {
        console.error('TTS opus conversion failed:', convErr.message || convErr);
        audioBuffer = mp3Buffer;
        mimetype = 'audio/mpeg';
      }

      await sock.sendMessage(chatId, {
        audio: audioBuffer,
        mimetype,
        ptt: true
      }, { quoted: msg });

      await extra.react('✅');

    } catch (error) {
      console.error('TTS command error:', error);
      try { await extra.react('❌'); } catch { /* ignore */ }
      await extra.reply(`Failed to generate speech: ${error.message}`);
    }
  }
};
  }
};
