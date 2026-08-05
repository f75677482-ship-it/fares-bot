# تغييرات الدمج — faresw_bot (Multi-Session + KnightBot-Mini)

## أوامر KM المدمجة في fares-bot (120 أمر)
كل أمر يتلقى `sock` بحسب الرقم المربوط من pairingBridge. لا توجد
متغيرات عامة على مستوى الوحدة، ولا تخزين مختلط بين الأرقام.

- الحقوق الموحدة: `lib/commonPromo.js` — نفس التوقيع في كل أمر
- قاعدة البيانات المعزولة لكل رقم: `lib/kmDatabase.js`
- حمّال الأوامر: `lib/kmLoader.js`
- مُوجّه per-session: `lib/kmDispatcher.js`
- تخزين الجلسات: `sessions/<phone>/database/` لكل رقم مساره الخاص

## الحقوق
- حُذفت كل الحقوق الأصلية (github/knight/t.me/mruniquehacker)
- استُبدلت بـ:
```
━━━━━━━━━━━━━━━━━━━━
اصنع بوت واتساب خاص فيك مجاناً
👉 Undress https://t.me/Faresw_bot
━━━━━━━━━━━━━━━━━━━━
```
