// lib/kmConfig.js — إعدادات KnightBot-Mini (مُعربة + حقوق موحدة)
'use strict';
const PROMO_TITLE = 'اصنع بوت واتساب خاص فيك مجاناً';
const PROMO_LINK  = '👉 Undress https://t.me/Faresw_bot';
const HEADER_LINE = '━━━━━━━━━━━━━━━━━━━━';

function buildMenu(category, lines) {
  const body = lines.map(l => l.replace(/^[*.\-]\s*/, '┊ ')).join('\n');
  return `╭━━━〔 *${PROMO_TITLE}* 〕━━━╮\n${body}\n╰━━━━━━━━━━━━━━━━━━━━╯\n\n${PROMO_LINK}`;
}

const config = {
  prefix: ['.', '!', '#', '/'],
  mods: [],
  sudoUsers: [],
  PROMO_TITLE, PROMO_LINK, HEADER_LINE,
  style: {
    header: HEADER_LINE,
    footer: PROMO_LINK,
    titleSeparator: '━━━━━━━━━━━━━━━━━━━━',
    menu: buildMenu
  }
};

module.exports = config;
