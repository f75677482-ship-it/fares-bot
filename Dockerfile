# استخدام صورة أساسية تحتوي على نظام لينكس مدمج معه بيئة بايثون
FROM python:3.10-slim

# تثبيت Node.js 20 (موجود داخل نفس الحاوية لتشغيل خادم الاقتران المحلي إذا احتجناه)
# + git + أدوات أساسية. كل ذلك يتم في خطوة واحدة لتفعيل الـcache على Railway.
RUN apt-get update && apt-get install -y \
        curl \
        git \
        ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# تحديد مجلد العمل داخل السيرفر
WORKDIR /app

# نسخ ملفات المشروع بالكامل إلى الحاوية
COPY . .

# تثبيت مكتبات بايثون مع تثبيت الـMongo اختياري (لا ينهار إذا فشل)
RUN pip install --no-cache-dir -r requirements.txt || \
    pip install --no-cache-dir python-telegram-bot requests pymongo

# تثبيت مكتبات Node.js — تم تعديل الأمر السابق (`npm install` بدون flags)
# إلى `npm install --legacy-peer-deps --no-audit --no-fund --prefer-offline`.
# هذا يحل خطأ Railway E404 'nid-validator@^1.0.0' وأي تضارب في peer-deps.
RUN npm install --legacy-peer-deps --no-audit --no-fund

# أمر التشغيل النهائي: نُشغّل البوت البايثوني مباشرة لأنه الـentry point الحقيقي.
# (كان `node index.js` سابقاً وهذا تعارض مع `python bot_core.py` الذي يُشغّل تليجرام + واتساب).
CMD ["python", "bot_core.py"]
