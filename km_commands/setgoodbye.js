// km_commands/setgoodbye.js — KnightBot-Mini (مُعرب + متعدد الجلسات + حقوق Faresw_bot)
'use strict';
const { withFooter } = require('../lib/commonPromo');

const phone = (sock && sock._faresPhone) || (extra && extra.phone) || '';
const db    = (extra && extra.db) || require('../lib/kmDatabase').bind(phone);

async function run(sock, msg, args, extra) {
  const from = msg.key?.remoteJid || '';
  if (!args.length)
    return sock.sendMessage(from, { text: withFooter('ℹ️ الاستخدام: .setgoodbye <النص> — استخدم @user للعضو') });
  const text = args.join(' ');
  db.setGroupSettings(from, { goodbyeMessage: text });
  return sock.sendMessage(from, { text: withFooter('✅ تم ضبط رسالة الوداع') });
}

module.exports = {
  name: 'setgoodbye',
  category: 'general',
  description: 'ضبط رسالة الوداع',
  ownerOnly: false,
  aliases: ['goodbye','setgoodbye','goodbyetext'],
  async execute(sock, msg, args, extra) {
    try { await run(sock, msg, args, extra); }
    catch (e) {
      console.error(`[km:setgoodbye]`, e.message||e);
      try { await sock.sendMessage((msg.key&&msg.key.remoteJid)||'',
        { text: withFooter('❌ حدث خطأ أثناء تنفيذ الأمر') }); } catch(_){}
    }
    return true;
  }
};
