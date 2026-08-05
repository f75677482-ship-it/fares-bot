// lib/commonPromo.js — الحقوق الموحّدة لكل أمر
'use strict';
const PROMO_TITLE = 'اصنع بوت واتساب خاص فيك مجاناً';
const PROMO_LINK  = '👉 Undress https://t.me/Faresw_bot';
const HEADER_LINE = '━━━━━━━━━━━━━━━━━━━━';

function promoBlock() {
  return `${HEADER_LINE}\n${PROMO_TITLE}\n${PROMO_LINK}\n${HEADER_LINE}`;
}
function withFooter(text) {
  const head = (typeof text === 'string' && text.trim()) ? text : '';
  return head ? `${head}\n\n${promoBlock()}` : promoBlock();
}
function hasFooter(text) {
  return typeof text === 'string' && text.includes(PROMO_LINK);
}
module.exports = { PROMO_TITLE, PROMO_LINK, HEADER_LINE,
  promoBlock, withFooter, hasFooter };
