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

## 🔧 إصلاح خطأ Railway (2026-08-05)

### المشكلة
- Build tab → `RUN npm install` فشل بـ `E404 'nid-validator@^1.0.0' is not in this registry`.
- `Procfile` و`railpack.json` يشغّلان `node index.js` بينما الـapp الفعلي بايثون.

### الحل المطبّق على المستودع `fares-bot`
- **`Dockerfile`**: إضافة `--legacy-peer-deps --no-audit --no-fund` لـ`npm install`، وتحسين خطوة الـapt-get لتفعيل الـcache، وتغيير `CMD` النهائي إلى `python bot_core.py` بدل `node index.js`.
- **`Procfile`**: `web: python bot_core.py` بدل `node index.js`.
- **`railpack.json`**: `startCommand = python bot_core.py`.
- **`.npmrc`** (ملف جديد): `legacy-peer-deps=true` و`audit=false` و`fund=false` كحماية إضافية يُطبَّق ضمنياً مع كل `npm install`.

### قاعدة "رقم واحد لكل مستخدم تليجرام" (موجودة بالفعل في HEAD)
- في `bot_core.py`: طبقتان للحماية داخل `register_pending_pairing` (دفاعية) وداخل معالج استلام رقم الربط (عرض رسالة عربية قبل أي طلب كود).
- البوت المطور الأساسي معفي لغرض الدعم والاختبار.

### ملفات الاستضافة البديلة (تعمل بدون تعديل)
- `railway.json` → `startCommand: python bot_core.py`
- `nixpacks.toml` → `cmd = "python bot_core.py"` بعد `pip install` ثم `npm install --legacy-peer-deps`
- `render.yaml` → `startCommand: python bot_core.py` (يدعم Free Plan مباشرة)
- `start.sh` → يُشغّل Node (لخادم الاقتران) ثم Python (للبوت)
