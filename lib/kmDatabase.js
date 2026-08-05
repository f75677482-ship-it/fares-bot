// lib/kmDatabase.js — قاعدة بيانات معزولة لكل رقم مربوط
'use strict';
const fs = require('fs');
const path = require('path');

const SESS_ROOT = path.join(process.cwd(), 'sessions');

function norm(p) { return String(p || '').replace(/\D/g, '').trim() || '__default__'; }

function bind(phone) {
  const dir = phone
    ? path.join(SESS_ROOT, norm(phone), 'database')
    : path.join(process.cwd(), 'data');
  fs.mkdirSync(dir, { recursive: true });

  const GRP  = path.join(dir, 'groups.json');
  const USR  = path.join(dir, 'users.json');
  const WRN  = path.join(dir, 'warnings.json');
  const MODS = path.join(dir, 'mods.json');
  const SUDO = path.join(dir, 'sudo.json');

  for (const f of [GRP, USR, WRN]) {
    if (!fs.existsSync(f)) fs.writeFileSync(f, '{}');
  }
  if (!fs.existsSync(MODS)) fs.writeFileSync(MODS, '{"moderators":[]}');
  if (!fs.existsSync(SUDO)) fs.writeFileSync(SUDO, '{"sudoUsers":[]}');

  const DEFAULTS = {
    antilink: false, antilinkAction: 'delete',
    antitag:  false, antitagAction:  'delete',
    antiall:  false,
    antiviewonce: false,
    antibot: false, antibotAction: 'warn',
    anticall: false,
    antibadword: false, antibadwordAction: 'delete',
    antigroupmention: false, antigroupmentionAction: 'delete',
    antigroupstatus:  false, antigroupstatusAction:  'delete',
    antisticker: false, antistickerAction: 'delete',
    welcome: false,
    welcomeMessage: '╭╼━≪• عضو جديد •≫━╾╮\n┃ أهلاً بك @user 👋\n┃ عدد الأعضاء: #count\n╰━━━━━━━━━━━━━━━╯',
    goodbye: false,
    goodbyeMessage: 'وداعاً لك @user 👋',
    antiSpam: false,
    antidelete: false,
    nsfw: false, detect: false, chatbot: false, autosticker: false
  };

  const read = (f, fb) => { try { if (fs.existsSync(f)) return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (_) {} return fb; };
  const write = (f, d) => { fs.writeFileSync(f, JSON.stringify(d, null, 2)); };

  return {
    phone, dir,
    getGroupSettings(gid){
      const g = read(GRP, {});
      if (!g[gid]) { g[gid] = { ...DEFAULTS }; write(GRP, g); }
      return g[gid];
    },
    setGroupSettings(gid, partial){
      const g = read(GRP, {});
      g[gid] = { ...(g[gid] || DEFAULTS), ...partial };
      write(GRP, g); return g[gid];
    },
    toggleGroupSetting(gid, key, actionKey){
      const g = read(GRP, {});
      const cur = g[gid] || DEFAULTS;
      cur[key] = !cur[key];
      if (actionKey) cur[actionKey] = cur[key] ? 'delete' : 'off';
      g[gid] = cur; write(GRP, g);
      return { value: cur[key], action: cur[actionKey] };
    },
    getUser(uid){
      const u = read(USR, {});
      if (!u[uid]) { u[uid] = { registered: Date.now(), premium: false, banned: false, level: 1, xp: 0 };
        write(USR, u); }
      return u[uid];
    },
    setUser(uid, partial){
      const u = read(USR, {});
      u[uid] = { ...(u[uid] || {}), ...partial };
      write(USR, u); return u[uid];
    },
    addWarning(gid, uid, reason){
      const w = read(WRN, {});
      const k = `${gid}::${uid}`;
      w[k] = w[k] || { count: 0, reasons: [] };
      w[k].count += 1; w[k].reasons.push({ reason, at: Date.now() });
      write(WRN, w); return w[k];
    },
    resetWarnings(gid, uid){
      const w = read(WRN, {});
      delete w[`${gid}::${uid}`];
      write(WRN, w);
    },
    getWarnings(gid, uid){
      return read(WRN, {})[`${gid}::${uid}`] || { count: 0, reasons: [] };
    },
    addMod(num){ const m=read(MODS,{moderators:[]}); if (!m.moderators.includes(num)) m.moderators.push(num); write(MODS,m); },
    removeMod(num){ const m=read(MODS,{moderators:[]}); m.moderators=m.moderators.filter(x=>x!==num); write(MODS,m); },
    isMod(num){ return read(MODS,{moderators:[]}).moderators.includes(num); },
    addSudo(num){ const s=read(SUDO,{sudoUsers:[]}); if (!s.sudoUsers.includes(num)) s.sudoUsers.push(num); write(SUDO,s); },
    removeSudo(num){ const s=read(SUDO,{sudoUsers:[]}); s.sudoUsers=s.sudoUsers.filter(x=>x!==num); write(SUDO,s); },
    isSudo(num){ return read(SUDO,{sudoUsers:[]}).sudoUsers.includes(num); }
  };
}

module.exports = { bind, norm };
