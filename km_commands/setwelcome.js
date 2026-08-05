// km_commands/setwelcome.js — KnightBot-Mini (مُعرب + متعدد الجلسات + حقوق Faresw_bot)
'use strict';
const { withFooter } = require('../lib/commonPromo');

const phone = (sock && sock._faresPhone) || (extra && extra.phone) || '';
const db    = (extra && extra.db) || require('../lib/kmDatabase').bind(phone);

async function run(sock, msg, args, extra) {
  const from = msg.key?.remoteJid || '';
  if (!args.length)
    return sock.sendMessage(from, { text: withFooter('ℹ️ الاستخدام: .setwelcome <النص> — استخدم @user للعضو و#count للعدد') });
  const text = args.join(' ');
  db.setGroupSettings(from, { welcomeMessage: text });
  return sock.sendMessage(from, { text: withFooter('✅ تم ضبط رسالة الترحيب') });
}

module.exports = {
  name: 'setwelcome',
  category: 'general',
  description: 'ضبط رسالة الترحيب',
  ownerOnly: false,
  aliases: ['welcome','setwelcome','welcometext'],
  async execute(sock, msg, args, extra) {
    try { await run(sock, msg, args, extra); }
    catch (e) {
      console.error(`[km:setwelcome]`, e.message||e);
      try { await sock.sendMessage((msg.key&&msg.key.remoteJid)||'',
        { text: withFooter('❌ حدث خطأ أثناء تنفيذ الأمر') }); } catch(_){}
    }
    return true;
  }
};
