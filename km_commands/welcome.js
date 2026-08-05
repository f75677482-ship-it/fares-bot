// km_commands/welcome.js — KnightBot-Mini (مُعرب + متعدد الجلسات + حقوق Faresw_bot)
'use strict';
const { withFooter } = require('../lib/commonPromo');

const phone = (sock && sock._faresPhone) || (extra && extra.phone) || '';
const db    = (extra && extra.db) || require('../lib/kmDatabase').bind(phone);

async function run(sock, msg, args, extra) {
  const from = msg.key?.remoteJid || '';
  const on  = !!(args.find(a=>/^on|تشغيل|فعل$/i.test(a)));
  const off = !!(args.find(a=>/^off|ايقاف|عطل$|إيقاف/i.test(a)));
  const gid = from;
  const cur = db.getGroupSettings(gid);
  if (!on && !off) {
    return sock.sendMessage(from, { text: withFooter(`* رسالة الترحيب ${cur.welcome?'مفعّلة ✅':'معطّلة ❌'}*
الاستخدام: .welcome on / .welcome off`) });
  }
  db.setGroupSettings(gid, { welcome: on });
  return sock.sendMessage(from, { text: withFooter(`✅ تم ${on?'تفعيل':'تعطيل'} رسالة الترحيب`) });
}

module.exports = {
  name: 'welcome',
  category: 'general',
  description: 'تفعيل رسالة الترحيب',
  ownerOnly: false,
  aliases: ['setwelcome','welcomeon','welcomeoff'],
  async execute(sock, msg, args, extra) {
    try { await run(sock, msg, args, extra); }
    catch (e) {
      console.error(`[km:welcome]`, e.message||e);
      try { await sock.sendMessage((msg.key&&msg.key.remoteJid)||'',
        { text: withFooter('❌ حدث خطأ أثناء تنفيذ الأمر') }); } catch(_){}
    }
    return true;
  }
};
