// lib/kmLoader.js — تحميل كل أوامر KM المحوَّلة
'use strict';
const fs = require('fs');
const path = require('path');

const REG  = new Map();   // alias lower -> wrapper
const ITEMS = [];          // list of {name, category, ownerOnly}

function lower(s) { return String(s||'').toLowerCase(); }

function register(mod) {
  if (!mod || typeof mod.execute !== 'function' || !mod.name) return;
  const entry = {
    name: lower(mod.name),
    displayName: mod.name,
    category: mod.category || 'general',
    ownerOnly: !!mod.ownerOnly,
    aliases: Array.isArray(mod.aliases) ? mod.aliases.map(lower) : [],
    mod
  };
  REG.set(entry.name, entry);
  for (const a of entry.aliases) REG.set(a, entry);
  ITEMS.push(entry);
}

function find(trigger) {
  if (!trigger) return null;
  const cleaned = lower(trigger).replace(/^[.!\/#]+/, '').split(/\s+/)[0];
  return REG.get(cleaned) || null;
}

const DIR = path.join(__dirname, '..', 'km_commands');

function loadAll() {
  if (!fs.existsSync(DIR)) {
    console.warn('[kmLoader] km_commands/ غير موجود');
    return 0;
  }
  for (const f of fs.readdirSync(DIR).filter(n => n.endsWith('.js'))) {
    try {
      const m = require(path.join(DIR, f));
      register(m);
    } catch (e) {
      console.error('[kmLoader] فشل تحميل', f, '→', e.message);
    }
  }
  return ITEMS.length;
}

function list()        { return ITEMS.slice(); }
function size()        { return ITEMS.length; }

module.exports = { loadAll, find, list, size, register, _registry: REG };
