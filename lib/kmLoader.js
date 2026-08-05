// lib/kmLoader.js — تحميل كل أوامر KM/commands المحوَّلة والمتوافقة مع متعدد الجلسات
'use strict';
const fs = require('fs');
const path = require('path');

const REG = new Map();   // alias lower -> wrapper
const ITEMS = [];        // list of {name, category, ownerOnly}
const SEEN_MODULE_KEYS = new Set();

function lower(s) { return String(s || '').toLowerCase().trim(); }

function isCommandLike(candidate) {
  return !!(candidate && typeof candidate === 'object' && typeof candidate.execute === 'function' && candidate.name);
}

function collectCommandCandidates(exported, out = [], visited = new Set()) {
  if (!exported || visited.has(exported)) return out;
  if (typeof exported === 'object' || typeof exported === 'function') {
    visited.add(exported);
  }

  if (isCommandLike(exported)) {
    out.push(exported);
    return out;
  }

  if (exported && typeof exported === 'object') {
    for (const value of Object.values(exported)) {
      if (isCommandLike(value)) out.push(value);
    }
  }

  return out;
}

function register(mod, sourceKey = '') {
  if (!isCommandLike(mod)) return false;
  const entry = {
    name: lower(mod.name),
    displayName: mod.name,
    category: mod.category || 'general',
    ownerOnly: !!mod.ownerOnly,
    aliases: Array.isArray(mod.aliases) ? mod.aliases.map(lower).filter(Boolean) : [],
    mod,
    sourceKey
  };
  if (!entry.name) return false;

  const dedupeKey = `${entry.name}:${sourceKey || 'direct'}`;
  if (SEEN_MODULE_KEYS.has(dedupeKey)) return false;
  SEEN_MODULE_KEYS.add(dedupeKey);

  REG.set(entry.name, entry);
  for (const a of entry.aliases) REG.set(a, entry);
  ITEMS.push(entry);
  return true;
}

function find(trigger) {
  if (!trigger) return null;
  const cleaned = lower(trigger).replace(/^[.!\/#]+/, '').split(/\s+/)[0];
  return REG.get(cleaned) || null;
}

const DIRS = [
  path.join(__dirname, '..', 'km_commands'),
  path.join(__dirname, '..', 'commands')
];

function loadAll() {
  for (const DIR of DIRS) {
    if (!fs.existsSync(DIR)) continue;
    for (const f of fs.readdirSync(DIR).filter((n) => n.endsWith('.js')).sort()) {
      const modulePath = path.join(DIR, f);
      try {
        const exported = require(modulePath);
        const candidates = collectCommandCandidates(exported);
        let registeredAny = false;
        for (const candidate of candidates) {
          registeredAny = register(candidate, modulePath) || registeredAny;
        }
        if (!registeredAny && isCommandLike(exported)) {
          register(exported, modulePath);
        }
      } catch (e) {
        console.error('[kmLoader] فشل تحميل', modulePath, '→', e.message);
      }
    }
  }
  return ITEMS.length;
}

function list() { return ITEMS.slice(); }
function size() { return ITEMS.length; }

module.exports = { loadAll, find, list, size, register, _registry: REG };
