// lib/kmDispatcher.js — يوجّه أوامر KM بحسب sock الخاص بكل رقم مربوط
'use strict';
const path = require('path');
const loader = require('./kmLoader');
const db     = require('./kmDatabase');
const promo  = require('./commonPromo');

let OWNER_NUMBERS = new Set();
try {
  const s = require('../settings');
  const list = []
    .concat(s.ownerNumber || [])
    .concat(s.owners || [])
    .concat(s.owner || []);
  list.forEach(n => OWNER_NUMBERS.add(String(n || '').replace(/\D/g, '')));
} catch (_) {}

function getMsgText(msg) {
  const m = msg.message || {};
  return (
    m.conversation ||
    m.extendedTextMessage?.text ||
    m.imageMessage?.caption ||
    m.videoMessage?.caption ||
    m.buttonsResponseMessage?.selectedButtonId ||
    m.listResponseMessage?.title || ''
  );
}

function buildExtra(sock, msg, phone) {
  const bound = db.bind(phone);
  const from = msg.key?.remoteJid || '';
  const sender = msg.key?.fromMe
    ? (sock?.user?.id || '').split(':')[0] + '@s.whatsapp.net'
    : (msg.key?.participant || from);
  const senderNumber = String(sender).split('@')[0].split(':')[0];
  const isGroup = from.endsWith('@g.us');
  const isOwner = OWNER_NUMBERS.has(senderNumber);

  const replyRaw = async (textOrObj) => {
    try {
      if (typeof textOrObj === 'string') {
        await sock.sendMessage(from, { text: promo.withFooter(textOrObj) });
      } else {
        await sock.sendMessage(from, textOrObj);
      }
    } catch (_) {}
  };

  return {
    from, sender, senderNumber, isGroup, isOwner,
    isAdmin: false, phone, db: bound, sock, msg,
    reply: replyRaw,
    replyWithFooter: replyRaw,
    sendRaw: async (payload) => {
      try { await sock.sendMessage(from, payload); } catch (_) {}
    },
    react: async (emoji) => {
      try { await sock.sendMessage(from, { react: { text: emoji, key: msg.key } }); }
      catch (_) {}
    },
  };
}

async function route(sock, msg, phone) {
  const text = getMsgText(msg);
  if (!text) return false;
  const cmd = loader.find(text);
  if (!cmd) return false;
  const extra = buildExtra(sock, msg, phone);
  const args  = text.trim().split(/\s+/).slice(1);
  try {
    await cmd.mod.execute(sock, msg, args, extra);
    return true;
  } catch (e) {
    console.error(`[kmDispatcher ${phone||'no-phone'}] ${cmd.displayName}:`, e?.message || e);
    try { await sock.sendMessage(extra.from, { text: promo.withFooter('❌ حدث خطأ أثناء تنفيذ الأمر') }); }
    catch (_) {}
    return false;
  }
}

function isHandled(text) { return !!loader.find(text); }

module.exports = { route, isHandled, load: loader.loadAll,
                   OWNER_NUMBERS: OWNER_NUMBERS };
