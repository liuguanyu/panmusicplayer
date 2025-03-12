import di from "electron";
import pt from "path";
import Wt from "util";
import zr from "fs";
import fi from "crypto";
import rd from "assert";
import ad from "events";
import sd from "os";
import qr from "stream";
import mi from "http";
import hi from "https";
import ss from "url";
import od from "tty";
import Rh from "zlib";
import Oh from "querystring";
var gr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, zj = {}, Ao = { exports: {} }, kh = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const un = kh, Th = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), jh = (e) => !e.some((t) => Th.has(t));
function na(e) {
  const t = e.split("."), n = [];
  for (let r = 0; r < t.length; r++) {
    let a = t[r];
    for (; a[a.length - 1] === "\\" && t[r + 1] !== void 0; )
      a = a.slice(0, -1) + ".", a += t[++r];
    n.push(a);
  }
  return jh(n) ? n : [];
}
var Nh = {
  get(e, t, n) {
    if (!un(e) || typeof t != "string")
      return n === void 0 ? e : n;
    const r = na(t);
    if (r.length !== 0) {
      for (let a = 0; a < r.length; a++)
        if (e = e[r[a]], e == null) {
          if (a !== r.length - 1)
            return n;
          break;
        }
      return e === void 0 ? n : e;
    }
  },
  set(e, t, n) {
    if (!un(e) || typeof t != "string")
      return e;
    const r = e, a = na(t);
    for (let s = 0; s < a.length; s++) {
      const o = a[s];
      un(e[o]) || (e[o] = {}), s === a.length - 1 && (e[o] = n), e = e[o];
    }
    return r;
  },
  delete(e, t) {
    if (!un(e) || typeof t != "string")
      return !1;
    const n = na(t);
    for (let r = 0; r < n.length; r++) {
      const a = n[r];
      if (r === n.length - 1)
        return delete e[a], !0;
      if (e = e[a], !un(e))
        return !1;
    }
  },
  has(e, t) {
    if (!un(e) || typeof t != "string")
      return !1;
    const n = na(t);
    if (n.length === 0)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (un(e)) {
        if (!(n[r] in e))
          return !1;
        e = e[n[r]];
      } else
        return !1;
    return !0;
  }
}, vi = { exports: {} }, yi = { exports: {} }, gi = { exports: {} }, bi = { exports: {} };
const id = zr;
bi.exports = (e) => new Promise((t) => {
  id.access(e, (n) => {
    t(!n);
  });
});
bi.exports.sync = (e) => {
  try {
    return id.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var Ah = bi.exports, $i = { exports: {} }, xi = { exports: {} };
const cd = (e, ...t) => new Promise((n) => {
  n(e(...t));
});
xi.exports = cd;
xi.exports.default = cd;
var Ch = xi.exports;
const Ih = Ch, ld = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let n = 0;
  const r = () => {
    n--, t.length > 0 && t.shift()();
  }, a = (c, l, ...u) => {
    n++;
    const i = Ih(c, ...u);
    l(i), i.then(r, r);
  }, s = (c, l, ...u) => {
    n < e ? a(c, l, ...u) : t.push(a.bind(null, c, l, ...u));
  }, o = (c, ...l) => new Promise((u) => s(c, u, ...l));
  return Object.defineProperties(o, {
    activeCount: {
      get: () => n
    },
    pendingCount: {
      get: () => t.length
    },
    clearQueue: {
      value: () => {
        t.length = 0;
      }
    }
  }), o;
};
$i.exports = ld;
$i.exports.default = ld;
var Dh = $i.exports;
const Ul = Dh;
class ud extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const Lh = (e, t) => Promise.resolve(e).then(t), Fh = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new ud(t[0])));
var Mh = (e, t, n) => {
  n = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, n);
  const r = Ul(n.concurrency), a = [...e].map((o) => [o, r(Lh, o, t)]), s = Ul(n.preserveOrder ? 1 : 1 / 0);
  return Promise.all(a.map((o) => s(Fh, o))).then(() => {
  }).catch((o) => o instanceof ud ? o.value : Promise.reject(o));
};
const pd = pt, dd = Ah, Uh = Mh;
gi.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), Uh(e, (n) => dd(pd.resolve(t.cwd, n)), t));
gi.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const n of e)
    if (dd.sync(pd.resolve(t.cwd, n)))
      return n;
};
var zh = gi.exports;
const Mt = pt, fd = zh;
yi.exports = (e, t = {}) => {
  const n = Mt.resolve(t.cwd || ""), { root: r } = Mt.parse(n), a = [].concat(e);
  return new Promise((s) => {
    (function o(c) {
      fd(a, { cwd: c }).then((l) => {
        l ? s(Mt.join(c, l)) : c === r ? s(null) : o(Mt.dirname(c));
      });
    })(n);
  });
};
yi.exports.sync = (e, t = {}) => {
  let n = Mt.resolve(t.cwd || "");
  const { root: r } = Mt.parse(n), a = [].concat(e);
  for (; ; ) {
    const s = fd.sync(a, { cwd: n });
    if (s)
      return Mt.join(n, s);
    if (n === r)
      return null;
    n = Mt.dirname(n);
  }
};
var qh = yi.exports;
const md = qh;
vi.exports = async ({ cwd: e } = {}) => md("package.json", { cwd: e });
vi.exports.sync = ({ cwd: e } = {}) => md.sync("package.json", { cwd: e });
var Vh = vi.exports, _i = { exports: {} };
const $e = pt, hd = sd, Ft = hd.homedir(), wi = hd.tmpdir(), { env: Mn } = process, Bh = (e) => {
  const t = $e.join(Ft, "Library");
  return {
    data: $e.join(t, "Application Support", e),
    config: $e.join(t, "Preferences", e),
    cache: $e.join(t, "Caches", e),
    log: $e.join(t, "Logs", e),
    temp: $e.join(wi, e)
  };
}, Gh = (e) => {
  const t = Mn.APPDATA || $e.join(Ft, "AppData", "Roaming"), n = Mn.LOCALAPPDATA || $e.join(Ft, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: $e.join(n, e, "Data"),
    config: $e.join(t, e, "Config"),
    cache: $e.join(n, e, "Cache"),
    log: $e.join(n, e, "Log"),
    temp: $e.join(wi, e)
  };
}, Kh = (e) => {
  const t = $e.basename(Ft);
  return {
    data: $e.join(Mn.XDG_DATA_HOME || $e.join(Ft, ".local", "share"), e),
    config: $e.join(Mn.XDG_CONFIG_HOME || $e.join(Ft, ".config"), e),
    cache: $e.join(Mn.XDG_CACHE_HOME || $e.join(Ft, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: $e.join(Mn.XDG_STATE_HOME || $e.join(Ft, ".local", "state"), e),
    temp: $e.join(wi, t, e)
  };
}, vd = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? Bh(e) : process.platform === "win32" ? Gh(e) : Kh(e);
};
_i.exports = vd;
_i.exports.default = vd;
var Hh = _i.exports, $t = {}, ue = {};
Object.defineProperty(ue, "__esModule", { value: !0 });
ue.NOOP = ue.LIMIT_FILES_DESCRIPTORS = ue.LIMIT_BASENAME_LENGTH = ue.IS_USER_ROOT = ue.IS_POSIX = ue.DEFAULT_TIMEOUT_SYNC = ue.DEFAULT_TIMEOUT_ASYNC = ue.DEFAULT_WRITE_OPTIONS = ue.DEFAULT_READ_OPTIONS = ue.DEFAULT_FOLDER_MODE = ue.DEFAULT_FILE_MODE = ue.DEFAULT_ENCODING = void 0;
const Wh = "utf8";
ue.DEFAULT_ENCODING = Wh;
const Jh = 438;
ue.DEFAULT_FILE_MODE = Jh;
const Xh = 511;
ue.DEFAULT_FOLDER_MODE = Xh;
const Yh = {};
ue.DEFAULT_READ_OPTIONS = Yh;
const Qh = {};
ue.DEFAULT_WRITE_OPTIONS = Qh;
const Zh = 5e3;
ue.DEFAULT_TIMEOUT_ASYNC = Zh;
const ev = 100;
ue.DEFAULT_TIMEOUT_SYNC = ev;
const tv = !!process.getuid;
ue.IS_POSIX = tv;
const nv = process.getuid ? !process.getuid() : !1;
ue.IS_USER_ROOT = nv;
const rv = 128;
ue.LIMIT_BASENAME_LENGTH = rv;
const av = 1e4;
ue.LIMIT_FILES_DESCRIPTORS = av;
const sv = () => {
};
ue.NOOP = sv;
var os = {}, Hn = {};
Object.defineProperty(Hn, "__esModule", { value: !0 });
Hn.attemptifySync = Hn.attemptifyAsync = void 0;
const yd = ue, ov = (e, t = yd.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
Hn.attemptifyAsync = ov;
const iv = (e, t = yd.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (n) {
    return t(n);
  }
};
Hn.attemptifySync = iv;
var Ei = {};
Object.defineProperty(Ei, "__esModule", { value: !0 });
const cv = ue, gd = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !cv.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!gd.isChangeErrorOk(e))
      throw e;
  }
};
Ei.default = gd;
var Wn = {}, Si = {};
Object.defineProperty(Si, "__esModule", { value: !0 });
const lv = ue, ye = {
  interval: 25,
  intervalId: void 0,
  limit: lv.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    ye.intervalId || (ye.intervalId = setInterval(ye.tick, ye.interval));
  },
  reset: () => {
    ye.intervalId && (clearInterval(ye.intervalId), delete ye.intervalId);
  },
  add: (e) => {
    ye.queueWaiting.add(e), ye.queueActive.size < ye.limit / 2 ? ye.tick() : ye.init();
  },
  remove: (e) => {
    ye.queueWaiting.delete(e), ye.queueActive.delete(e);
  },
  schedule: () => new Promise((e) => {
    const t = () => ye.remove(n), n = () => e(t);
    ye.add(n);
  }),
  tick: () => {
    if (!(ye.queueActive.size >= ye.limit)) {
      if (!ye.queueWaiting.size)
        return ye.reset();
      for (const e of ye.queueWaiting) {
        if (ye.queueActive.size >= ye.limit)
          break;
        ye.queueWaiting.delete(e), ye.queueActive.add(e), e();
      }
    }
  }
};
Si.default = ye;
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.retryifySync = Wn.retryifyAsync = void 0;
const uv = Si, pv = (e, t) => function(n) {
  return function r() {
    return uv.default.schedule().then((a) => e.apply(void 0, arguments).then((s) => (a(), s), (s) => {
      if (a(), Date.now() >= n)
        throw s;
      if (t(s)) {
        const o = Math.round(100 + 400 * Math.random());
        return new Promise((l) => setTimeout(l, o)).then(() => r.apply(void 0, arguments));
      }
      throw s;
    }));
  };
};
Wn.retryifyAsync = pv;
const dv = (e, t) => function(n) {
  return function r() {
    try {
      return e.apply(void 0, arguments);
    } catch (a) {
      if (Date.now() > n)
        throw a;
      if (t(a))
        return r.apply(void 0, arguments);
      throw a;
    }
  };
};
Wn.retryifySync = dv;
Object.defineProperty(os, "__esModule", { value: !0 });
const pe = zr, Fe = Wt, Me = Hn, ke = Ei, Ve = Wn, fv = {
  chmodAttempt: Me.attemptifyAsync(Fe.promisify(pe.chmod), ke.default.onChangeError),
  chownAttempt: Me.attemptifyAsync(Fe.promisify(pe.chown), ke.default.onChangeError),
  closeAttempt: Me.attemptifyAsync(Fe.promisify(pe.close)),
  fsyncAttempt: Me.attemptifyAsync(Fe.promisify(pe.fsync)),
  mkdirAttempt: Me.attemptifyAsync(Fe.promisify(pe.mkdir)),
  realpathAttempt: Me.attemptifyAsync(Fe.promisify(pe.realpath)),
  statAttempt: Me.attemptifyAsync(Fe.promisify(pe.stat)),
  unlinkAttempt: Me.attemptifyAsync(Fe.promisify(pe.unlink)),
  closeRetry: Ve.retryifyAsync(Fe.promisify(pe.close), ke.default.isRetriableError),
  fsyncRetry: Ve.retryifyAsync(Fe.promisify(pe.fsync), ke.default.isRetriableError),
  openRetry: Ve.retryifyAsync(Fe.promisify(pe.open), ke.default.isRetriableError),
  readFileRetry: Ve.retryifyAsync(Fe.promisify(pe.readFile), ke.default.isRetriableError),
  renameRetry: Ve.retryifyAsync(Fe.promisify(pe.rename), ke.default.isRetriableError),
  statRetry: Ve.retryifyAsync(Fe.promisify(pe.stat), ke.default.isRetriableError),
  writeRetry: Ve.retryifyAsync(Fe.promisify(pe.write), ke.default.isRetriableError),
  chmodSyncAttempt: Me.attemptifySync(pe.chmodSync, ke.default.onChangeError),
  chownSyncAttempt: Me.attemptifySync(pe.chownSync, ke.default.onChangeError),
  closeSyncAttempt: Me.attemptifySync(pe.closeSync),
  mkdirSyncAttempt: Me.attemptifySync(pe.mkdirSync),
  realpathSyncAttempt: Me.attemptifySync(pe.realpathSync),
  statSyncAttempt: Me.attemptifySync(pe.statSync),
  unlinkSyncAttempt: Me.attemptifySync(pe.unlinkSync),
  closeSyncRetry: Ve.retryifySync(pe.closeSync, ke.default.isRetriableError),
  fsyncSyncRetry: Ve.retryifySync(pe.fsyncSync, ke.default.isRetriableError),
  openSyncRetry: Ve.retryifySync(pe.openSync, ke.default.isRetriableError),
  readFileSyncRetry: Ve.retryifySync(pe.readFileSync, ke.default.isRetriableError),
  renameSyncRetry: Ve.retryifySync(pe.renameSync, ke.default.isRetriableError),
  statSyncRetry: Ve.retryifySync(pe.statSync, ke.default.isRetriableError),
  writeSyncRetry: Ve.retryifySync(pe.writeSync, ke.default.isRetriableError)
};
os.default = fv;
var Pi = {};
Object.defineProperty(Pi, "__esModule", { value: !0 });
const mv = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
Pi.default = mv;
var Ri = {};
Object.defineProperty(Ri, "__esModule", { value: !0 });
const ra = {}, Co = {
  next: (e) => {
    const t = ra[e];
    if (!t)
      return;
    t.shift();
    const n = t[0];
    n ? n(() => Co.next(e)) : delete ra[e];
  },
  schedule: (e) => new Promise((t) => {
    let n = ra[e];
    n || (n = ra[e] = []), n.push(t), !(n.length > 1) && t(() => Co.next(e));
  })
};
Ri.default = Co;
var Oi = {};
Object.defineProperty(Oi, "__esModule", { value: !0 });
const hv = pt, zl = ue, ql = os, Ye = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), n = Date.now().toString().slice(-10), r = "tmp-", a = `.${r}${n}${t}`;
    return `${e}${a}`;
  },
  get: (e, t, n = !0) => {
    const r = Ye.truncate(t(e));
    return r in Ye.store ? Ye.get(e, t, n) : (Ye.store[r] = n, [r, () => delete Ye.store[r]]);
  },
  purge: (e) => {
    Ye.store[e] && (delete Ye.store[e], ql.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    Ye.store[e] && (delete Ye.store[e], ql.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in Ye.store)
      Ye.purgeSync(e);
  },
  truncate: (e) => {
    const t = hv.basename(e);
    if (t.length <= zl.LIMIT_BASENAME_LENGTH)
      return e;
    const n = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!n)
      return e;
    const r = t.length - zl.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${n[1]}${n[2].slice(0, -r)}${n[3]}`;
  }
};
process.on("exit", Ye.purgeSyncAll);
Oi.default = Ye;
Object.defineProperty($t, "__esModule", { value: !0 });
$t.writeFileSync = $t.writeFile = $t.readFileSync = $t.readFile = void 0;
const bd = pt, Ae = ue, le = os, Qe = Pi, vv = Ri, Ut = Oi;
function $d(e, t = Ae.DEFAULT_READ_OPTIONS) {
  var n;
  if (Qe.default.isString(t))
    return $d(e, { encoding: t });
  const r = Date.now() + ((n = t.timeout) !== null && n !== void 0 ? n : Ae.DEFAULT_TIMEOUT_ASYNC);
  return le.default.readFileRetry(r)(e, t);
}
$t.readFile = $d;
function xd(e, t = Ae.DEFAULT_READ_OPTIONS) {
  var n;
  if (Qe.default.isString(t))
    return xd(e, { encoding: t });
  const r = Date.now() + ((n = t.timeout) !== null && n !== void 0 ? n : Ae.DEFAULT_TIMEOUT_SYNC);
  return le.default.readFileSyncRetry(r)(e, t);
}
$t.readFileSync = xd;
const _d = (e, t, n, r) => {
  if (Qe.default.isFunction(n))
    return _d(e, t, Ae.DEFAULT_WRITE_OPTIONS, n);
  const a = wd(e, t, n);
  return r && a.then(r, r), a;
};
$t.writeFile = _d;
const wd = async (e, t, n = Ae.DEFAULT_WRITE_OPTIONS) => {
  var r;
  if (Qe.default.isString(n))
    return wd(e, t, { encoding: n });
  const a = Date.now() + ((r = n.timeout) !== null && r !== void 0 ? r : Ae.DEFAULT_TIMEOUT_ASYNC);
  let s = null, o = null, c = null, l = null, u = null;
  try {
    n.schedule && (s = await n.schedule(e)), o = await vv.default.schedule(e), e = await le.default.realpathAttempt(e) || e, [l, c] = Ut.default.get(e, n.tmpCreate || Ut.default.create, n.tmpPurge !== !1);
    const i = Ae.IS_POSIX && Qe.default.isUndefined(n.chown), d = Qe.default.isUndefined(n.mode);
    if (i || d) {
      const $ = await le.default.statAttempt(e);
      $ && (n = { ...n }, i && (n.chown = { uid: $.uid, gid: $.gid }), d && (n.mode = $.mode));
    }
    const v = bd.dirname(e);
    await le.default.mkdirAttempt(v, {
      mode: Ae.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), u = await le.default.openRetry(a)(l, "w", n.mode || Ae.DEFAULT_FILE_MODE), n.tmpCreated && n.tmpCreated(l), Qe.default.isString(t) ? await le.default.writeRetry(a)(u, t, 0, n.encoding || Ae.DEFAULT_ENCODING) : Qe.default.isUndefined(t) || await le.default.writeRetry(a)(u, t, 0, t.length, 0), n.fsync !== !1 && (n.fsyncWait !== !1 ? await le.default.fsyncRetry(a)(u) : le.default.fsyncAttempt(u)), await le.default.closeRetry(a)(u), u = null, n.chown && await le.default.chownAttempt(l, n.chown.uid, n.chown.gid), n.mode && await le.default.chmodAttempt(l, n.mode);
    try {
      await le.default.renameRetry(a)(l, e);
    } catch ($) {
      if ($.code !== "ENAMETOOLONG")
        throw $;
      await le.default.renameRetry(a)(l, Ut.default.truncate(e));
    }
    c(), l = null;
  } finally {
    u && await le.default.closeAttempt(u), l && Ut.default.purge(l), s && s(), o && o();
  }
}, Ed = (e, t, n = Ae.DEFAULT_WRITE_OPTIONS) => {
  var r;
  if (Qe.default.isString(n))
    return Ed(e, t, { encoding: n });
  const a = Date.now() + ((r = n.timeout) !== null && r !== void 0 ? r : Ae.DEFAULT_TIMEOUT_SYNC);
  let s = null, o = null, c = null;
  try {
    e = le.default.realpathSyncAttempt(e) || e, [o, s] = Ut.default.get(e, n.tmpCreate || Ut.default.create, n.tmpPurge !== !1);
    const l = Ae.IS_POSIX && Qe.default.isUndefined(n.chown), u = Qe.default.isUndefined(n.mode);
    if (l || u) {
      const d = le.default.statSyncAttempt(e);
      d && (n = { ...n }, l && (n.chown = { uid: d.uid, gid: d.gid }), u && (n.mode = d.mode));
    }
    const i = bd.dirname(e);
    le.default.mkdirSyncAttempt(i, {
      mode: Ae.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), c = le.default.openSyncRetry(a)(o, "w", n.mode || Ae.DEFAULT_FILE_MODE), n.tmpCreated && n.tmpCreated(o), Qe.default.isString(t) ? le.default.writeSyncRetry(a)(c, t, 0, n.encoding || Ae.DEFAULT_ENCODING) : Qe.default.isUndefined(t) || le.default.writeSyncRetry(a)(c, t, 0, t.length, 0), n.fsync !== !1 && (n.fsyncWait !== !1 ? le.default.fsyncSyncRetry(a)(c) : le.default.fsyncAttempt(c)), le.default.closeSyncRetry(a)(c), c = null, n.chown && le.default.chownSyncAttempt(o, n.chown.uid, n.chown.gid), n.mode && le.default.chmodSyncAttempt(o, n.mode);
    try {
      le.default.renameSyncRetry(a)(o, e);
    } catch (d) {
      if (d.code !== "ENAMETOOLONG")
        throw d;
      le.default.renameSyncRetry(a)(o, Ut.default.truncate(e));
    }
    s(), o = null;
  } finally {
    c && le.default.closeSyncAttempt(c), o && Ut.default.purge(o);
  }
};
$t.writeFileSync = Ed;
var Io = { exports: {} }, Sd = {}, lt = {}, Jn = {}, Vr = {}, re = {}, Nr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class n extends t {
    constructor(_) {
      if (super(), !e.IDENTIFIER.test(_))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = _;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = n;
  class r extends t {
    constructor(_) {
      super(), this._items = typeof _ == "string" ? [_] : _;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const _ = this._items[0];
      return _ === "" || _ === '""';
    }
    get str() {
      var _;
      return (_ = this._str) !== null && _ !== void 0 ? _ : this._str = this._items.reduce((P, O) => `${P}${O}`, "");
    }
    get names() {
      var _;
      return (_ = this._names) !== null && _ !== void 0 ? _ : this._names = this._items.reduce((P, O) => (O instanceof n && (P[O.str] = (P[O.str] || 0) + 1), P), {});
    }
  }
  e._Code = r, e.nil = new r("");
  function a(m, ..._) {
    const P = [m[0]];
    let O = 0;
    for (; O < _.length; )
      c(P, _[O]), P.push(m[++O]);
    return new r(P);
  }
  e._ = a;
  const s = new r("+");
  function o(m, ..._) {
    const P = [$(m[0])];
    let O = 0;
    for (; O < _.length; )
      P.push(s), c(P, _[O]), P.push(s, $(m[++O]));
    return l(P), new r(P);
  }
  e.str = o;
  function c(m, _) {
    _ instanceof r ? m.push(..._._items) : _ instanceof n ? m.push(_) : m.push(d(_));
  }
  e.addCodeArg = c;
  function l(m) {
    let _ = 1;
    for (; _ < m.length - 1; ) {
      if (m[_] === s) {
        const P = u(m[_ - 1], m[_ + 1]);
        if (P !== void 0) {
          m.splice(_ - 1, 3, P);
          continue;
        }
        m[_++] = "+";
      }
      _++;
    }
  }
  function u(m, _) {
    if (_ === '""')
      return m;
    if (m === '""')
      return _;
    if (typeof m == "string")
      return _ instanceof n || m[m.length - 1] !== '"' ? void 0 : typeof _ != "string" ? `${m.slice(0, -1)}${_}"` : _[0] === '"' ? m.slice(0, -1) + _.slice(1) : void 0;
    if (typeof _ == "string" && _[0] === '"' && !(m instanceof n))
      return `"${m}${_.slice(1)}`;
  }
  function i(m, _) {
    return _.emptyStr() ? m : m.emptyStr() ? _ : o`${m}${_}`;
  }
  e.strConcat = i;
  function d(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : $(Array.isArray(m) ? m.join(",") : m);
  }
  function v(m) {
    return new r($(m));
  }
  e.stringify = v;
  function $(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = $;
  function y(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new r(`.${m}`) : a`[${m}]`;
  }
  e.getProperty = y;
  function g(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new r(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function h(m) {
    return new r(m.toString());
  }
  e.regexpCode = h;
})(Nr);
var Do = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Nr;
  class n extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
    }
  }
  var r;
  (function(l) {
    l[l.Started = 0] = "Started", l[l.Completed = 1] = "Completed";
  })(r || (e.UsedValueState = r = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class a {
    constructor({ prefixes: u, parent: i } = {}) {
      this._names = {}, this._prefixes = u, this._parent = i;
    }
    toName(u) {
      return u instanceof t.Name ? u : this.name(u);
    }
    name(u) {
      return new t.Name(this._newName(u));
    }
    _newName(u) {
      const i = this._names[u] || this._nameGroup(u);
      return `${u}${i.index++}`;
    }
    _nameGroup(u) {
      var i, d;
      if (!((d = (i = this._parent) === null || i === void 0 ? void 0 : i._prefixes) === null || d === void 0) && d.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  e.Scope = a;
  class s extends t.Name {
    constructor(u, i) {
      super(i), this.prefix = u;
    }
    setValue(u, { property: i, itemIndex: d }) {
      this.value = u, this.scopePath = (0, t._)`.${new t.Name(i)}[${d}]`;
    }
  }
  e.ValueScopeName = s;
  const o = (0, t._)`\n`;
  class c extends a {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new s(u, this._newName(u));
    }
    value(u, i) {
      var d;
      if (i.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const v = this.toName(u), { prefix: $ } = v, y = (d = i.key) !== null && d !== void 0 ? d : i.ref;
      let g = this._values[$];
      if (g) {
        const _ = g.get(y);
        if (_)
          return _;
      } else
        g = this._values[$] = /* @__PURE__ */ new Map();
      g.set(y, v);
      const h = this._scope[$] || (this._scope[$] = []), m = h.length;
      return h[m] = i.ref, v.setValue(i, { property: $, itemIndex: m }), v;
    }
    getValue(u, i) {
      const d = this._values[u];
      if (d)
        return d.get(i);
    }
    scopeRefs(u, i = this._values) {
      return this._reduceValues(i, (d) => {
        if (d.scopePath === void 0)
          throw new Error(`CodeGen: name "${d}" has no value`);
        return (0, t._)`${u}${d.scopePath}`;
      });
    }
    scopeCode(u = this._values, i, d) {
      return this._reduceValues(u, (v) => {
        if (v.value === void 0)
          throw new Error(`CodeGen: name "${v}" has no value`);
        return v.value.code;
      }, i, d);
    }
    _reduceValues(u, i, d = {}, v) {
      let $ = t.nil;
      for (const y in u) {
        const g = u[y];
        if (!g)
          continue;
        const h = d[y] = d[y] || /* @__PURE__ */ new Map();
        g.forEach((m) => {
          if (h.has(m))
            return;
          h.set(m, r.Started);
          let _ = i(m);
          if (_) {
            const P = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            $ = (0, t._)`${$}${P} ${m} = ${_};${this.opts._n}`;
          } else if (_ = v == null ? void 0 : v(m))
            $ = (0, t._)`${$}${_}${this.opts._n}`;
          else
            throw new n(m);
          h.set(m, r.Completed);
        });
      }
      return $;
    }
  }
  e.ValueScope = c;
})(Do);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Nr, n = Do;
  var r = Nr;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return r.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return r.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return r.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } });
  var a = Do;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return a.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return a.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return a.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return a.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class s {
    optimizeNodes() {
      return this;
    }
    optimizeNames(p, f) {
      return this;
    }
  }
  class o extends s {
    constructor(p, f, S) {
      super(), this.varKind = p, this.name = f, this.rhs = S;
    }
    render({ es5: p, _n: f }) {
      const S = p ? n.varKinds.var : this.varKind, A = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${S} ${this.name}${A};` + f;
    }
    optimizeNames(p, f) {
      if (p[this.name.str])
        return this.rhs && (this.rhs = I(this.rhs, p, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class c extends s {
    constructor(p, f, S) {
      super(), this.lhs = p, this.rhs = f, this.sideEffects = S;
    }
    render({ _n: p }) {
      return `${this.lhs} = ${this.rhs};` + p;
    }
    optimizeNames(p, f) {
      if (!(this.lhs instanceof t.Name && !p[this.lhs.str] && !this.sideEffects))
        return this.rhs = I(this.rhs, p, f), this;
    }
    get names() {
      const p = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return de(p, this.rhs);
    }
  }
  class l extends c {
    constructor(p, f, S, A) {
      super(p, S, A), this.op = f;
    }
    render({ _n: p }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + p;
    }
  }
  class u extends s {
    constructor(p) {
      super(), this.label = p, this.names = {};
    }
    render({ _n: p }) {
      return `${this.label}:` + p;
    }
  }
  class i extends s {
    constructor(p) {
      super(), this.label = p, this.names = {};
    }
    render({ _n: p }) {
      return `break${this.label ? ` ${this.label}` : ""};` + p;
    }
  }
  class d extends s {
    constructor(p) {
      super(), this.error = p;
    }
    render({ _n: p }) {
      return `throw ${this.error};` + p;
    }
    get names() {
      return this.error.names;
    }
  }
  class v extends s {
    constructor(p) {
      super(), this.code = p;
    }
    render({ _n: p }) {
      return `${this.code};` + p;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(p, f) {
      return this.code = I(this.code, p, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class $ extends s {
    constructor(p = []) {
      super(), this.nodes = p;
    }
    render(p) {
      return this.nodes.reduce((f, S) => f + S.render(p), "");
    }
    optimizeNodes() {
      const { nodes: p } = this;
      let f = p.length;
      for (; f--; ) {
        const S = p[f].optimizeNodes();
        Array.isArray(S) ? p.splice(f, 1, ...S) : S ? p[f] = S : p.splice(f, 1);
      }
      return p.length > 0 ? this : void 0;
    }
    optimizeNames(p, f) {
      const { nodes: S } = this;
      let A = S.length;
      for (; A--; ) {
        const N = S[A];
        N.optimizeNames(p, f) || (D(p, N.names), S.splice(A, 1));
      }
      return S.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((p, f) => J(p, f.names), {});
    }
  }
  class y extends $ {
    render(p) {
      return "{" + p._n + super.render(p) + "}" + p._n;
    }
  }
  class g extends $ {
  }
  class h extends y {
  }
  h.kind = "else";
  class m extends y {
    constructor(p, f) {
      super(f), this.condition = p;
    }
    render(p) {
      let f = `if(${this.condition})` + super.render(p);
      return this.else && (f += "else " + this.else.render(p)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const p = this.condition;
      if (p === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const S = f.optimizeNodes();
        f = this.else = Array.isArray(S) ? new h(S) : S;
      }
      if (f)
        return p === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(V(p), f instanceof m ? [f] : f.nodes);
      if (!(p === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(p, f) {
      var S;
      if (this.else = (S = this.else) === null || S === void 0 ? void 0 : S.optimizeNames(p, f), !!(super.optimizeNames(p, f) || this.else))
        return this.condition = I(this.condition, p, f), this;
    }
    get names() {
      const p = super.names;
      return de(p, this.condition), this.else && J(p, this.else.names), p;
    }
  }
  m.kind = "if";
  class _ extends y {
  }
  _.kind = "for";
  class P extends _ {
    constructor(p) {
      super(), this.iteration = p;
    }
    render(p) {
      return `for(${this.iteration})` + super.render(p);
    }
    optimizeNames(p, f) {
      if (super.optimizeNames(p, f))
        return this.iteration = I(this.iteration, p, f), this;
    }
    get names() {
      return J(super.names, this.iteration.names);
    }
  }
  class O extends _ {
    constructor(p, f, S, A) {
      super(), this.varKind = p, this.name = f, this.from = S, this.to = A;
    }
    render(p) {
      const f = p.es5 ? n.varKinds.var : this.varKind, { name: S, from: A, to: N } = this;
      return `for(${f} ${S}=${A}; ${S}<${N}; ${S}++)` + super.render(p);
    }
    get names() {
      const p = de(super.names, this.from);
      return de(p, this.to);
    }
  }
  class T extends _ {
    constructor(p, f, S, A) {
      super(), this.loop = p, this.varKind = f, this.name = S, this.iterable = A;
    }
    render(p) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(p);
    }
    optimizeNames(p, f) {
      if (super.optimizeNames(p, f))
        return this.iterable = I(this.iterable, p, f), this;
    }
    get names() {
      return J(super.names, this.iterable.names);
    }
  }
  class L extends y {
    constructor(p, f, S) {
      super(), this.name = p, this.args = f, this.async = S;
    }
    render(p) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(p);
    }
  }
  L.kind = "func";
  class q extends $ {
    render(p) {
      return "return " + super.render(p);
    }
  }
  q.kind = "return";
  class ae extends y {
    render(p) {
      let f = "try" + super.render(p);
      return this.catch && (f += this.catch.render(p)), this.finally && (f += this.finally.render(p)), f;
    }
    optimizeNodes() {
      var p, f;
      return super.optimizeNodes(), (p = this.catch) === null || p === void 0 || p.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(p, f) {
      var S, A;
      return super.optimizeNames(p, f), (S = this.catch) === null || S === void 0 || S.optimizeNames(p, f), (A = this.finally) === null || A === void 0 || A.optimizeNames(p, f), this;
    }
    get names() {
      const p = super.names;
      return this.catch && J(p, this.catch.names), this.finally && J(p, this.finally.names), p;
    }
  }
  class F extends y {
    constructor(p) {
      super(), this.error = p;
    }
    render(p) {
      return `catch(${this.error})` + super.render(p);
    }
  }
  F.kind = "catch";
  class K extends y {
    render(p) {
      return "finally" + super.render(p);
    }
  }
  K.kind = "finally";
  class ce {
    constructor(p, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = p, this._scope = new n.Scope({ parent: p }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(p) {
      return this._scope.name(p);
    }
    // reserves unique name in the external scope
    scopeName(p) {
      return this._extScope.name(p);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(p, f) {
      const S = this._extScope.value(p, f);
      return (this._values[S.prefix] || (this._values[S.prefix] = /* @__PURE__ */ new Set())).add(S), S;
    }
    getScopeValue(p, f) {
      return this._extScope.getValue(p, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(p) {
      return this._extScope.scopeRefs(p, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(p, f, S, A) {
      const N = this._scope.toName(f);
      return S !== void 0 && A && (this._constants[N.str] = S), this._leafNode(new o(p, N, S)), N;
    }
    // `const` declaration (`var` in es5 mode)
    const(p, f, S) {
      return this._def(n.varKinds.const, p, f, S);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(p, f, S) {
      return this._def(n.varKinds.let, p, f, S);
    }
    // `var` declaration with optional assignment
    var(p, f, S) {
      return this._def(n.varKinds.var, p, f, S);
    }
    // assignment code
    assign(p, f, S) {
      return this._leafNode(new c(p, f, S));
    }
    // `+=` code
    add(p, f) {
      return this._leafNode(new l(p, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(p) {
      return typeof p == "function" ? p() : p !== t.nil && this._leafNode(new v(p)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...p) {
      const f = ["{"];
      for (const [S, A] of p)
        f.length > 1 && f.push(","), f.push(S), (S !== A || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, A));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(p, f, S) {
      if (this._blockNode(new m(p)), f && S)
        this.code(f).else().code(S).endIf();
      else if (f)
        this.code(f).endIf();
      else if (S)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(p) {
      return this._elseNode(new m(p));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new h());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, h);
    }
    _for(p, f) {
      return this._blockNode(p), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(p, f) {
      return this._for(new P(p), f);
    }
    // `for` statement for a range of values
    forRange(p, f, S, A, N = this.opts.es5 ? n.varKinds.var : n.varKinds.let) {
      const G = this._scope.toName(p);
      return this._for(new O(N, G, f, S), () => A(G));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(p, f, S, A = n.varKinds.const) {
      const N = this._scope.toName(p);
      if (this.opts.es5) {
        const G = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${G}.length`, (B) => {
          this.var(N, (0, t._)`${G}[${B}]`), S(N);
        });
      }
      return this._for(new T("of", A, N, f), () => S(N));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(p, f, S, A = this.opts.es5 ? n.varKinds.var : n.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(p, (0, t._)`Object.keys(${f})`, S);
      const N = this._scope.toName(p);
      return this._for(new T("in", A, N, f), () => S(N));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(_);
    }
    // `label` statement
    label(p) {
      return this._leafNode(new u(p));
    }
    // `break` statement
    break(p) {
      return this._leafNode(new i(p));
    }
    // `return` statement
    return(p) {
      const f = new q();
      if (this._blockNode(f), this.code(p), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(q);
    }
    // `try` statement
    try(p, f, S) {
      if (!f && !S)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const A = new ae();
      if (this._blockNode(A), this.code(p), f) {
        const N = this.name("e");
        this._currNode = A.catch = new F(N), f(N);
      }
      return S && (this._currNode = A.finally = new K(), this.code(S)), this._endBlockNode(F, K);
    }
    // `throw` statement
    throw(p) {
      return this._leafNode(new d(p));
    }
    // start self-balancing block
    block(p, f) {
      return this._blockStarts.push(this._nodes.length), p && this.code(p).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(p) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const S = this._nodes.length - f;
      if (S < 0 || p !== void 0 && S !== p)
        throw new Error(`CodeGen: wrong number of nodes: ${S} vs ${p} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(p, f = t.nil, S, A) {
      return this._blockNode(new L(p, f, S)), A && this.code(A).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(L);
    }
    optimize(p = 1) {
      for (; p-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(p) {
      return this._currNode.nodes.push(p), this;
    }
    _blockNode(p) {
      this._currNode.nodes.push(p), this._nodes.push(p);
    }
    _endBlockNode(p, f) {
      const S = this._currNode;
      if (S instanceof p || f && S instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${p.kind}/${f.kind}` : p.kind}"`);
    }
    _elseNode(p) {
      const f = this._currNode;
      if (!(f instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = p, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const p = this._nodes;
      return p[p.length - 1];
    }
    set _currNode(p) {
      const f = this._nodes;
      f[f.length - 1] = p;
    }
  }
  e.CodeGen = ce;
  function J(x, p) {
    for (const f in p)
      x[f] = (x[f] || 0) + (p[f] || 0);
    return x;
  }
  function de(x, p) {
    return p instanceof t._CodeOrName ? J(x, p.names) : x;
  }
  function I(x, p, f) {
    if (x instanceof t.Name)
      return S(x);
    if (!A(x))
      return x;
    return new t._Code(x._items.reduce((N, G) => (G instanceof t.Name && (G = S(G)), G instanceof t._Code ? N.push(...G._items) : N.push(G), N), []));
    function S(N) {
      const G = f[N.str];
      return G === void 0 || p[N.str] !== 1 ? N : (delete p[N.str], G);
    }
    function A(N) {
      return N instanceof t._Code && N._items.some((G) => G instanceof t.Name && p[G.str] === 1 && f[G.str] !== void 0);
    }
  }
  function D(x, p) {
    for (const f in p)
      x[f] = (x[f] || 0) - (p[f] || 0);
  }
  function V(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, t._)`!${E(x)}`;
  }
  e.not = V;
  const C = b(e.operators.AND);
  function R(...x) {
    return x.reduce(C);
  }
  e.and = R;
  const j = b(e.operators.OR);
  function w(...x) {
    return x.reduce(j);
  }
  e.or = w;
  function b(x) {
    return (p, f) => p === t.nil ? f : f === t.nil ? p : (0, t._)`${E(p)} ${x} ${E(f)}`;
  }
  function E(x) {
    return x instanceof t.Name ? x : (0, t._)`(${x})`;
  }
})(re);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const fe = re, yv = Nr;
function gv(e) {
  const t = {};
  for (const n of e)
    t[n] = !0;
  return t;
}
M.toHash = gv;
function bv(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Pd(e, t), !Rd(t, e.self.RULES.all));
}
M.alwaysValidSchema = bv;
function Pd(e, t = e.schema) {
  const { opts: n, self: r } = e;
  if (!n.strictSchema || typeof t == "boolean")
    return;
  const a = r.RULES.keywords;
  for (const s in t)
    a[s] || Td(e, `unknown keyword: "${s}"`);
}
M.checkUnknownRules = Pd;
function Rd(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const n in e)
    if (t[n])
      return !0;
  return !1;
}
M.schemaHasRules = Rd;
function $v(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const n in e)
    if (n !== "$ref" && t.all[n])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = $v;
function xv({ topSchemaRef: e, schemaPath: t }, n, r, a) {
  if (!a) {
    if (typeof n == "number" || typeof n == "boolean")
      return n;
    if (typeof n == "string")
      return (0, fe._)`${n}`;
  }
  return (0, fe._)`${e}${t}${(0, fe.getProperty)(r)}`;
}
M.schemaRefOrVal = xv;
function _v(e) {
  return Od(decodeURIComponent(e));
}
M.unescapeFragment = _v;
function wv(e) {
  return encodeURIComponent(ki(e));
}
M.escapeFragment = wv;
function ki(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = ki;
function Od(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = Od;
function Ev(e, t) {
  if (Array.isArray(e))
    for (const n of e)
      t(n);
  else
    t(e);
}
M.eachItem = Ev;
function Vl({ mergeNames: e, mergeToName: t, mergeValues: n, resultToName: r }) {
  return (a, s, o, c) => {
    const l = o === void 0 ? s : o instanceof fe.Name ? (s instanceof fe.Name ? e(a, s, o) : t(a, s, o), o) : s instanceof fe.Name ? (t(a, o, s), s) : n(s, o);
    return c === fe.Name && !(l instanceof fe.Name) ? r(a, l) : l;
  };
}
M.mergeEvaluated = {
  props: Vl({
    mergeNames: (e, t, n) => e.if((0, fe._)`${n} !== true && ${t} !== undefined`, () => {
      e.if((0, fe._)`${t} === true`, () => e.assign(n, !0), () => e.assign(n, (0, fe._)`${n} || {}`).code((0, fe._)`Object.assign(${n}, ${t})`));
    }),
    mergeToName: (e, t, n) => e.if((0, fe._)`${n} !== true`, () => {
      t === !0 ? e.assign(n, !0) : (e.assign(n, (0, fe._)`${n} || {}`), Ti(e, n, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: kd
  }),
  items: Vl({
    mergeNames: (e, t, n) => e.if((0, fe._)`${n} !== true && ${t} !== undefined`, () => e.assign(n, (0, fe._)`${t} === true ? true : ${n} > ${t} ? ${n} : ${t}`)),
    mergeToName: (e, t, n) => e.if((0, fe._)`${n} !== true`, () => e.assign(n, t === !0 ? !0 : (0, fe._)`${n} > ${t} ? ${n} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function kd(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const n = e.var("props", (0, fe._)`{}`);
  return t !== void 0 && Ti(e, n, t), n;
}
M.evaluatedPropsToName = kd;
function Ti(e, t, n) {
  Object.keys(n).forEach((r) => e.assign((0, fe._)`${t}${(0, fe.getProperty)(r)}`, !0));
}
M.setEvaluated = Ti;
const Bl = {};
function Sv(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Bl[t.code] || (Bl[t.code] = new yv._Code(t.code))
  });
}
M.useFunc = Sv;
var Lo;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Lo || (M.Type = Lo = {}));
function Pv(e, t, n) {
  if (e instanceof fe.Name) {
    const r = t === Lo.Num;
    return n ? r ? (0, fe._)`"[" + ${e} + "]"` : (0, fe._)`"['" + ${e} + "']"` : r ? (0, fe._)`"/" + ${e}` : (0, fe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return n ? (0, fe.getProperty)(e).toString() : "/" + ki(e);
}
M.getErrorPath = Pv;
function Td(e, t, n = e.opts.strictSchema) {
  if (n) {
    if (t = `strict mode: ${t}`, n === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = Td;
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
const De = re, Rv = {
  // validation function arguments
  data: new De.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new De.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new De.Name("instancePath"),
  parentData: new De.Name("parentData"),
  parentDataProperty: new De.Name("parentDataProperty"),
  rootData: new De.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new De.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new De.Name("vErrors"),
  // null or array of validation errors
  errors: new De.Name("errors"),
  // counter of validation errors
  this: new De.Name("this"),
  // "globals"
  self: new De.Name("self"),
  scope: new De.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new De.Name("json"),
  jsonPos: new De.Name("jsonPos"),
  jsonLen: new De.Name("jsonLen"),
  jsonPart: new De.Name("jsonPart")
};
Et.default = Rv;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = re, n = M, r = Et;
  e.keywordError = {
    message: ({ keyword: h }) => (0, t.str)`must pass "${h}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: h, schemaType: m }) => m ? (0, t.str)`"${h}" keyword must be ${m} ($data)` : (0, t.str)`"${h}" keyword is invalid ($data)`
  };
  function a(h, m = e.keywordError, _, P) {
    const { it: O } = h, { gen: T, compositeRule: L, allErrors: q } = O, ae = d(h, m, _);
    P ?? (L || q) ? l(T, ae) : u(O, (0, t._)`[${ae}]`);
  }
  e.reportError = a;
  function s(h, m = e.keywordError, _) {
    const { it: P } = h, { gen: O, compositeRule: T, allErrors: L } = P, q = d(h, m, _);
    l(O, q), T || L || u(P, r.default.vErrors);
  }
  e.reportExtraError = s;
  function o(h, m) {
    h.assign(r.default.errors, m), h.if((0, t._)`${r.default.vErrors} !== null`, () => h.if(m, () => h.assign((0, t._)`${r.default.vErrors}.length`, m), () => h.assign(r.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function c({ gen: h, keyword: m, schemaValue: _, data: P, errsCount: O, it: T }) {
    if (O === void 0)
      throw new Error("ajv implementation error");
    const L = h.name("err");
    h.forRange("i", O, r.default.errors, (q) => {
      h.const(L, (0, t._)`${r.default.vErrors}[${q}]`), h.if((0, t._)`${L}.instancePath === undefined`, () => h.assign((0, t._)`${L}.instancePath`, (0, t.strConcat)(r.default.instancePath, T.errorPath))), h.assign((0, t._)`${L}.schemaPath`, (0, t.str)`${T.errSchemaPath}/${m}`), T.opts.verbose && (h.assign((0, t._)`${L}.schema`, _), h.assign((0, t._)`${L}.data`, P));
    });
  }
  e.extendErrors = c;
  function l(h, m) {
    const _ = h.const("err", m);
    h.if((0, t._)`${r.default.vErrors} === null`, () => h.assign(r.default.vErrors, (0, t._)`[${_}]`), (0, t._)`${r.default.vErrors}.push(${_})`), h.code((0, t._)`${r.default.errors}++`);
  }
  function u(h, m) {
    const { gen: _, validateName: P, schemaEnv: O } = h;
    O.$async ? _.throw((0, t._)`new ${h.ValidationError}(${m})`) : (_.assign((0, t._)`${P}.errors`, m), _.return(!1));
  }
  const i = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function d(h, m, _) {
    const { createErrors: P } = h.it;
    return P === !1 ? (0, t._)`{}` : v(h, m, _);
  }
  function v(h, m, _ = {}) {
    const { gen: P, it: O } = h, T = [
      $(O, _),
      y(h, _)
    ];
    return g(h, m, T), P.object(...T);
  }
  function $({ errorPath: h }, { instancePath: m }) {
    const _ = m ? (0, t.str)`${h}${(0, n.getErrorPath)(m, n.Type.Str)}` : h;
    return [r.default.instancePath, (0, t.strConcat)(r.default.instancePath, _)];
  }
  function y({ keyword: h, it: { errSchemaPath: m } }, { schemaPath: _, parentSchema: P }) {
    let O = P ? m : (0, t.str)`${m}/${h}`;
    return _ && (O = (0, t.str)`${O}${(0, n.getErrorPath)(_, n.Type.Str)}`), [i.schemaPath, O];
  }
  function g(h, { params: m, message: _ }, P) {
    const { keyword: O, data: T, schemaValue: L, it: q } = h, { opts: ae, propertyName: F, topSchemaRef: K, schemaPath: ce } = q;
    P.push([i.keyword, O], [i.params, typeof m == "function" ? m(h) : m || (0, t._)`{}`]), ae.messages && P.push([i.message, typeof _ == "function" ? _(h) : _]), ae.verbose && P.push([i.schema, L], [i.parentSchema, (0, t._)`${K}${ce}`], [r.default.data, T]), F && P.push([i.propertyName, F]);
  }
})(Vr);
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.boolOrEmptySchema = Jn.topBoolOrEmptySchema = void 0;
const Ov = Vr, kv = re, Tv = Et, jv = {
  message: "boolean schema is false"
};
function Nv(e) {
  const { gen: t, schema: n, validateName: r } = e;
  n === !1 ? jd(e, !1) : typeof n == "object" && n.$async === !0 ? t.return(Tv.default.data) : (t.assign((0, kv._)`${r}.errors`, null), t.return(!0));
}
Jn.topBoolOrEmptySchema = Nv;
function Av(e, t) {
  const { gen: n, schema: r } = e;
  r === !1 ? (n.var(t, !1), jd(e)) : n.var(t, !0);
}
Jn.boolOrEmptySchema = Av;
function jd(e, t) {
  const { gen: n, data: r } = e, a = {
    gen: n,
    keyword: "false schema",
    data: r,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, Ov.reportError)(a, jv, void 0, t);
}
var Re = {}, wn = {};
Object.defineProperty(wn, "__esModule", { value: !0 });
wn.getRules = wn.isJSONType = void 0;
const Cv = ["string", "number", "integer", "boolean", "null", "object", "array"], Iv = new Set(Cv);
function Dv(e) {
  return typeof e == "string" && Iv.has(e);
}
wn.isJSONType = Dv;
function Lv() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
wn.getRules = Lv;
var Rt = {};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.shouldUseRule = Rt.shouldUseGroup = Rt.schemaHasRulesForType = void 0;
function Fv({ schema: e, self: t }, n) {
  const r = t.RULES.types[n];
  return r && r !== !0 && Nd(e, r);
}
Rt.schemaHasRulesForType = Fv;
function Nd(e, t) {
  return t.rules.some((n) => Ad(e, n));
}
Rt.shouldUseGroup = Nd;
function Ad(e, t) {
  var n;
  return e[t.keyword] !== void 0 || ((n = t.definition.implements) === null || n === void 0 ? void 0 : n.some((r) => e[r] !== void 0));
}
Rt.shouldUseRule = Ad;
Object.defineProperty(Re, "__esModule", { value: !0 });
Re.reportTypeError = Re.checkDataTypes = Re.checkDataType = Re.coerceAndCheckDataType = Re.getJSONTypes = Re.getSchemaTypes = Re.DataType = void 0;
const Mv = wn, Uv = Rt, zv = Vr, Q = re, Cd = M;
var qn;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(qn || (Re.DataType = qn = {}));
function qv(e) {
  const t = Id(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Re.getSchemaTypes = qv;
function Id(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Mv.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Re.getJSONTypes = Id;
function Vv(e, t) {
  const { gen: n, data: r, opts: a } = e, s = Bv(t, a.coerceTypes), o = t.length > 0 && !(s.length === 0 && t.length === 1 && (0, Uv.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const c = ji(t, r, a.strictNumbers, qn.Wrong);
    n.if(c, () => {
      s.length ? Gv(e, t, s) : Ni(e);
    });
  }
  return o;
}
Re.coerceAndCheckDataType = Vv;
const Dd = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Bv(e, t) {
  return t ? e.filter((n) => Dd.has(n) || t === "array" && n === "array") : [];
}
function Gv(e, t, n) {
  const { gen: r, data: a, opts: s } = e, o = r.let("dataType", (0, Q._)`typeof ${a}`), c = r.let("coerced", (0, Q._)`undefined`);
  s.coerceTypes === "array" && r.if((0, Q._)`${o} == 'object' && Array.isArray(${a}) && ${a}.length == 1`, () => r.assign(a, (0, Q._)`${a}[0]`).assign(o, (0, Q._)`typeof ${a}`).if(ji(t, a, s.strictNumbers), () => r.assign(c, a))), r.if((0, Q._)`${c} !== undefined`);
  for (const u of n)
    (Dd.has(u) || u === "array" && s.coerceTypes === "array") && l(u);
  r.else(), Ni(e), r.endIf(), r.if((0, Q._)`${c} !== undefined`, () => {
    r.assign(a, c), Kv(e, c);
  });
  function l(u) {
    switch (u) {
      case "string":
        r.elseIf((0, Q._)`${o} == "number" || ${o} == "boolean"`).assign(c, (0, Q._)`"" + ${a}`).elseIf((0, Q._)`${a} === null`).assign(c, (0, Q._)`""`);
        return;
      case "number":
        r.elseIf((0, Q._)`${o} == "boolean" || ${a} === null
              || (${o} == "string" && ${a} && ${a} == +${a})`).assign(c, (0, Q._)`+${a}`);
        return;
      case "integer":
        r.elseIf((0, Q._)`${o} === "boolean" || ${a} === null
              || (${o} === "string" && ${a} && ${a} == +${a} && !(${a} % 1))`).assign(c, (0, Q._)`+${a}`);
        return;
      case "boolean":
        r.elseIf((0, Q._)`${a} === "false" || ${a} === 0 || ${a} === null`).assign(c, !1).elseIf((0, Q._)`${a} === "true" || ${a} === 1`).assign(c, !0);
        return;
      case "null":
        r.elseIf((0, Q._)`${a} === "" || ${a} === 0 || ${a} === false`), r.assign(c, null);
        return;
      case "array":
        r.elseIf((0, Q._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${a} === null`).assign(c, (0, Q._)`[${a}]`);
    }
  }
}
function Kv({ gen: e, parentData: t, parentDataProperty: n }, r) {
  e.if((0, Q._)`${t} !== undefined`, () => e.assign((0, Q._)`${t}[${n}]`, r));
}
function Fo(e, t, n, r = qn.Correct) {
  const a = r === qn.Correct ? Q.operators.EQ : Q.operators.NEQ;
  let s;
  switch (e) {
    case "null":
      return (0, Q._)`${t} ${a} null`;
    case "array":
      s = (0, Q._)`Array.isArray(${t})`;
      break;
    case "object":
      s = (0, Q._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      s = o((0, Q._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      s = o();
      break;
    default:
      return (0, Q._)`typeof ${t} ${a} ${e}`;
  }
  return r === qn.Correct ? s : (0, Q.not)(s);
  function o(c = Q.nil) {
    return (0, Q.and)((0, Q._)`typeof ${t} == "number"`, c, n ? (0, Q._)`isFinite(${t})` : Q.nil);
  }
}
Re.checkDataType = Fo;
function ji(e, t, n, r) {
  if (e.length === 1)
    return Fo(e[0], t, n, r);
  let a;
  const s = (0, Cd.toHash)(e);
  if (s.array && s.object) {
    const o = (0, Q._)`typeof ${t} != "object"`;
    a = s.null ? o : (0, Q._)`!${t} || ${o}`, delete s.null, delete s.array, delete s.object;
  } else
    a = Q.nil;
  s.number && delete s.integer;
  for (const o in s)
    a = (0, Q.and)(a, Fo(o, t, n, r));
  return a;
}
Re.checkDataTypes = ji;
const Hv = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Q._)`{type: ${e}}` : (0, Q._)`{type: ${t}}`
};
function Ni(e) {
  const t = Wv(e);
  (0, zv.reportError)(t, Hv);
}
Re.reportTypeError = Ni;
function Wv(e) {
  const { gen: t, data: n, schema: r } = e, a = (0, Cd.schemaRefOrVal)(e, r, "type");
  return {
    gen: t,
    keyword: "type",
    data: n,
    schema: r.type,
    schemaCode: a,
    schemaValue: a,
    parentSchema: r,
    params: {},
    it: e
  };
}
var is = {};
Object.defineProperty(is, "__esModule", { value: !0 });
is.assignDefaults = void 0;
const Tn = re, Jv = M;
function Xv(e, t) {
  const { properties: n, items: r } = e.schema;
  if (t === "object" && n)
    for (const a in n)
      Gl(e, a, n[a].default);
  else t === "array" && Array.isArray(r) && r.forEach((a, s) => Gl(e, s, a.default));
}
is.assignDefaults = Xv;
function Gl(e, t, n) {
  const { gen: r, compositeRule: a, data: s, opts: o } = e;
  if (n === void 0)
    return;
  const c = (0, Tn._)`${s}${(0, Tn.getProperty)(t)}`;
  if (a) {
    (0, Jv.checkStrictMode)(e, `default is ignored for: ${c}`);
    return;
  }
  let l = (0, Tn._)`${c} === undefined`;
  o.useDefaults === "empty" && (l = (0, Tn._)`${l} || ${c} === null || ${c} === ""`), r.if(l, (0, Tn._)`${c} = ${(0, Tn.stringify)(n)}`);
}
var xt = {}, te = {};
Object.defineProperty(te, "__esModule", { value: !0 });
te.validateUnion = te.validateArray = te.usePattern = te.callValidateCode = te.schemaProperties = te.allSchemaProperties = te.noPropertyInData = te.propertyInData = te.isOwnProperty = te.hasPropFunc = te.reportMissingProp = te.checkMissingProp = te.checkReportMissingProp = void 0;
const ge = re, Ai = M, At = Et, Yv = M;
function Qv(e, t) {
  const { gen: n, data: r, it: a } = e;
  n.if(Ii(n, r, t, a.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, ge._)`${t}` }, !0), e.error();
  });
}
te.checkReportMissingProp = Qv;
function Zv({ gen: e, data: t, it: { opts: n } }, r, a) {
  return (0, ge.or)(...r.map((s) => (0, ge.and)(Ii(e, t, s, n.ownProperties), (0, ge._)`${a} = ${s}`)));
}
te.checkMissingProp = Zv;
function ey(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
te.reportMissingProp = ey;
function Ld(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, ge._)`Object.prototype.hasOwnProperty`
  });
}
te.hasPropFunc = Ld;
function Ci(e, t, n) {
  return (0, ge._)`${Ld(e)}.call(${t}, ${n})`;
}
te.isOwnProperty = Ci;
function ty(e, t, n, r) {
  const a = (0, ge._)`${t}${(0, ge.getProperty)(n)} !== undefined`;
  return r ? (0, ge._)`${a} && ${Ci(e, t, n)}` : a;
}
te.propertyInData = ty;
function Ii(e, t, n, r) {
  const a = (0, ge._)`${t}${(0, ge.getProperty)(n)} === undefined`;
  return r ? (0, ge.or)(a, (0, ge.not)(Ci(e, t, n))) : a;
}
te.noPropertyInData = Ii;
function Fd(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
te.allSchemaProperties = Fd;
function ny(e, t) {
  return Fd(t).filter((n) => !(0, Ai.alwaysValidSchema)(e, t[n]));
}
te.schemaProperties = ny;
function ry({ schemaCode: e, data: t, it: { gen: n, topSchemaRef: r, schemaPath: a, errorPath: s }, it: o }, c, l, u) {
  const i = u ? (0, ge._)`${e}, ${t}, ${r}${a}` : t, d = [
    [At.default.instancePath, (0, ge.strConcat)(At.default.instancePath, s)],
    [At.default.parentData, o.parentData],
    [At.default.parentDataProperty, o.parentDataProperty],
    [At.default.rootData, At.default.rootData]
  ];
  o.opts.dynamicRef && d.push([At.default.dynamicAnchors, At.default.dynamicAnchors]);
  const v = (0, ge._)`${i}, ${n.object(...d)}`;
  return l !== ge.nil ? (0, ge._)`${c}.call(${l}, ${v})` : (0, ge._)`${c}(${v})`;
}
te.callValidateCode = ry;
const ay = (0, ge._)`new RegExp`;
function sy({ gen: e, it: { opts: t } }, n) {
  const r = t.unicodeRegExp ? "u" : "", { regExp: a } = t.code, s = a(n, r);
  return e.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, ge._)`${a.code === "new RegExp" ? ay : (0, Yv.useFunc)(e, a)}(${n}, ${r})`
  });
}
te.usePattern = sy;
function oy(e) {
  const { gen: t, data: n, keyword: r, it: a } = e, s = t.name("valid");
  if (a.allErrors) {
    const c = t.let("valid", !0);
    return o(() => t.assign(c, !1)), c;
  }
  return t.var(s, !0), o(() => t.break()), s;
  function o(c) {
    const l = t.const("len", (0, ge._)`${n}.length`);
    t.forRange("i", 0, l, (u) => {
      e.subschema({
        keyword: r,
        dataProp: u,
        dataPropType: Ai.Type.Num
      }, s), t.if((0, ge.not)(s), c);
    });
  }
}
te.validateArray = oy;
function iy(e) {
  const { gen: t, schema: n, keyword: r, it: a } = e;
  if (!Array.isArray(n))
    throw new Error("ajv implementation error");
  if (n.some((l) => (0, Ai.alwaysValidSchema)(a, l)) && !a.opts.unevaluated)
    return;
  const o = t.let("valid", !1), c = t.name("_valid");
  t.block(() => n.forEach((l, u) => {
    const i = e.subschema({
      keyword: r,
      schemaProp: u,
      compositeRule: !0
    }, c);
    t.assign(o, (0, ge._)`${o} || ${c}`), e.mergeValidEvaluated(i, c) || t.if((0, ge.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
te.validateUnion = iy;
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.validateKeywordUsage = xt.validSchemaType = xt.funcKeywordCode = xt.macroKeywordCode = void 0;
const Ue = re, mn = Et, cy = te, ly = Vr;
function uy(e, t) {
  const { gen: n, keyword: r, schema: a, parentSchema: s, it: o } = e, c = t.macro.call(o.self, a, s, o), l = Md(n, r, c);
  o.opts.validateSchema !== !1 && o.self.validateSchema(c, !0);
  const u = n.name("valid");
  e.subschema({
    schema: c,
    schemaPath: Ue.nil,
    errSchemaPath: `${o.errSchemaPath}/${r}`,
    topSchemaRef: l,
    compositeRule: !0
  }, u), e.pass(u, () => e.error(!0));
}
xt.macroKeywordCode = uy;
function py(e, t) {
  var n;
  const { gen: r, keyword: a, schema: s, parentSchema: o, $data: c, it: l } = e;
  fy(l, t);
  const u = !c && t.compile ? t.compile.call(l.self, s, o, l) : t.validate, i = Md(r, a, u), d = r.let("valid");
  e.block$data(d, v), e.ok((n = t.valid) !== null && n !== void 0 ? n : d);
  function v() {
    if (t.errors === !1)
      g(), t.modifying && Kl(e), h(() => e.error());
    else {
      const m = t.async ? $() : y();
      t.modifying && Kl(e), h(() => dy(e, m));
    }
  }
  function $() {
    const m = r.let("ruleErrs", null);
    return r.try(() => g((0, Ue._)`await `), (_) => r.assign(d, !1).if((0, Ue._)`${_} instanceof ${l.ValidationError}`, () => r.assign(m, (0, Ue._)`${_}.errors`), () => r.throw(_))), m;
  }
  function y() {
    const m = (0, Ue._)`${i}.errors`;
    return r.assign(m, null), g(Ue.nil), m;
  }
  function g(m = t.async ? (0, Ue._)`await ` : Ue.nil) {
    const _ = l.opts.passContext ? mn.default.this : mn.default.self, P = !("compile" in t && !c || t.schema === !1);
    r.assign(d, (0, Ue._)`${m}${(0, cy.callValidateCode)(e, i, _, P)}`, t.modifying);
  }
  function h(m) {
    var _;
    r.if((0, Ue.not)((_ = t.valid) !== null && _ !== void 0 ? _ : d), m);
  }
}
xt.funcKeywordCode = py;
function Kl(e) {
  const { gen: t, data: n, it: r } = e;
  t.if(r.parentData, () => t.assign(n, (0, Ue._)`${r.parentData}[${r.parentDataProperty}]`));
}
function dy(e, t) {
  const { gen: n } = e;
  n.if((0, Ue._)`Array.isArray(${t})`, () => {
    n.assign(mn.default.vErrors, (0, Ue._)`${mn.default.vErrors} === null ? ${t} : ${mn.default.vErrors}.concat(${t})`).assign(mn.default.errors, (0, Ue._)`${mn.default.vErrors}.length`), (0, ly.extendErrors)(e);
  }, () => e.error());
}
function fy({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Md(e, t, n) {
  if (n === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof n == "function" ? { ref: n } : { ref: n, code: (0, Ue.stringify)(n) });
}
function my(e, t, n = !1) {
  return !t.length || t.some((r) => r === "array" ? Array.isArray(e) : r === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == r || n && typeof e > "u");
}
xt.validSchemaType = my;
function hy({ schema: e, opts: t, self: n, errSchemaPath: r }, a, s) {
  if (Array.isArray(a.keyword) ? !a.keyword.includes(s) : a.keyword !== s)
    throw new Error("ajv implementation error");
  const o = a.dependencies;
  if (o != null && o.some((c) => !Object.prototype.hasOwnProperty.call(e, c)))
    throw new Error(`parent schema must have dependencies of ${s}: ${o.join(",")}`);
  if (a.validateSchema && !a.validateSchema(e[s])) {
    const l = `keyword "${s}" value is invalid at path "${r}": ` + n.errorsText(a.validateSchema.errors);
    if (t.validateSchema === "log")
      n.logger.error(l);
    else
      throw new Error(l);
  }
}
xt.validateKeywordUsage = hy;
var Bt = {};
Object.defineProperty(Bt, "__esModule", { value: !0 });
Bt.extendSubschemaMode = Bt.extendSubschemaData = Bt.getSubschema = void 0;
const gt = re, Ud = M;
function vy(e, { keyword: t, schemaProp: n, schema: r, schemaPath: a, errSchemaPath: s, topSchemaRef: o }) {
  if (t !== void 0 && r !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const c = e.schema[t];
    return n === void 0 ? {
      schema: c,
      schemaPath: (0, gt._)`${e.schemaPath}${(0, gt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: c[n],
      schemaPath: (0, gt._)`${e.schemaPath}${(0, gt.getProperty)(t)}${(0, gt.getProperty)(n)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Ud.escapeFragment)(n)}`
    };
  }
  if (r !== void 0) {
    if (a === void 0 || s === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: r,
      schemaPath: a,
      topSchemaRef: o,
      errSchemaPath: s
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Bt.getSubschema = vy;
function yy(e, t, { dataProp: n, dataPropType: r, data: a, dataTypes: s, propertyName: o }) {
  if (a !== void 0 && n !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: c } = t;
  if (n !== void 0) {
    const { errorPath: u, dataPathArr: i, opts: d } = t, v = c.let("data", (0, gt._)`${t.data}${(0, gt.getProperty)(n)}`, !0);
    l(v), e.errorPath = (0, gt.str)`${u}${(0, Ud.getErrorPath)(n, r, d.jsPropertySyntax)}`, e.parentDataProperty = (0, gt._)`${n}`, e.dataPathArr = [...i, e.parentDataProperty];
  }
  if (a !== void 0) {
    const u = a instanceof gt.Name ? a : c.let("data", a, !0);
    l(u), o !== void 0 && (e.propertyName = o);
  }
  s && (e.dataTypes = s);
  function l(u) {
    e.data = u, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, u];
  }
}
Bt.extendSubschemaData = yy;
function gy(e, { jtdDiscriminator: t, jtdMetadata: n, compositeRule: r, createErrors: a, allErrors: s }) {
  r !== void 0 && (e.compositeRule = r), a !== void 0 && (e.createErrors = a), s !== void 0 && (e.allErrors = s), e.jtdDiscriminator = t, e.jtdMetadata = n;
}
Bt.extendSubschemaMode = gy;
var Ce = {}, cs = function e(t, n) {
  if (t === n) return !0;
  if (t && n && typeof t == "object" && typeof n == "object") {
    if (t.constructor !== n.constructor) return !1;
    var r, a, s;
    if (Array.isArray(t)) {
      if (r = t.length, r != n.length) return !1;
      for (a = r; a-- !== 0; )
        if (!e(t[a], n[a])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === n.source && t.flags === n.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === n.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === n.toString();
    if (s = Object.keys(t), r = s.length, r !== Object.keys(n).length) return !1;
    for (a = r; a-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, s[a])) return !1;
    for (a = r; a-- !== 0; ) {
      var o = s[a];
      if (!e(t[o], n[o])) return !1;
    }
    return !0;
  }
  return t !== t && n !== n;
}, zd = { exports: {} }, zt = zd.exports = function(e, t, n) {
  typeof t == "function" && (n = t, t = {}), n = t.cb || n;
  var r = typeof n == "function" ? n : n.pre || function() {
  }, a = n.post || function() {
  };
  Ea(t, r, a, e, "", e);
};
zt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
zt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
zt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
zt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function Ea(e, t, n, r, a, s, o, c, l, u) {
  if (r && typeof r == "object" && !Array.isArray(r)) {
    t(r, a, s, o, c, l, u);
    for (var i in r) {
      var d = r[i];
      if (Array.isArray(d)) {
        if (i in zt.arrayKeywords)
          for (var v = 0; v < d.length; v++)
            Ea(e, t, n, d[v], a + "/" + i + "/" + v, s, a, i, r, v);
      } else if (i in zt.propsKeywords) {
        if (d && typeof d == "object")
          for (var $ in d)
            Ea(e, t, n, d[$], a + "/" + i + "/" + by($), s, a, i, r, $);
      } else (i in zt.keywords || e.allKeys && !(i in zt.skipKeywords)) && Ea(e, t, n, d, a + "/" + i, s, a, i, r);
    }
    n(r, a, s, o, c, l, u);
  }
}
function by(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var $y = zd.exports;
Object.defineProperty(Ce, "__esModule", { value: !0 });
Ce.getSchemaRefs = Ce.resolveUrl = Ce.normalizeId = Ce._getFullPath = Ce.getFullPath = Ce.inlineRef = void 0;
const xy = M, _y = cs, wy = $y, Ey = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function Sy(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Mo(e) : t ? qd(e) <= t : !1;
}
Ce.inlineRef = Sy;
const Py = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Mo(e) {
  for (const t in e) {
    if (Py.has(t))
      return !0;
    const n = e[t];
    if (Array.isArray(n) && n.some(Mo) || typeof n == "object" && Mo(n))
      return !0;
  }
  return !1;
}
function qd(e) {
  let t = 0;
  for (const n in e) {
    if (n === "$ref")
      return 1 / 0;
    if (t++, !Ey.has(n) && (typeof e[n] == "object" && (0, xy.eachItem)(e[n], (r) => t += qd(r)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Vd(e, t = "", n) {
  n !== !1 && (t = Vn(t));
  const r = e.parse(t);
  return Bd(e, r);
}
Ce.getFullPath = Vd;
function Bd(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ce._getFullPath = Bd;
const Ry = /#\/?$/;
function Vn(e) {
  return e ? e.replace(Ry, "") : "";
}
Ce.normalizeId = Vn;
function Oy(e, t, n) {
  return n = Vn(n), e.resolve(t, n);
}
Ce.resolveUrl = Oy;
const ky = /^[a-z_][-a-z0-9._]*$/i;
function Ty(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: n, uriResolver: r } = this.opts, a = Vn(e[n] || t), s = { "": a }, o = Vd(r, a, !1), c = {}, l = /* @__PURE__ */ new Set();
  return wy(e, { allKeys: !0 }, (d, v, $, y) => {
    if (y === void 0)
      return;
    const g = o + v;
    let h = s[y];
    typeof d[n] == "string" && (h = m.call(this, d[n])), _.call(this, d.$anchor), _.call(this, d.$dynamicAnchor), s[v] = h;
    function m(P) {
      const O = this.opts.uriResolver.resolve;
      if (P = Vn(h ? O(h, P) : P), l.has(P))
        throw i(P);
      l.add(P);
      let T = this.refs[P];
      return typeof T == "string" && (T = this.refs[T]), typeof T == "object" ? u(d, T.schema, P) : P !== Vn(g) && (P[0] === "#" ? (u(d, c[P], P), c[P] = d) : this.refs[P] = g), P;
    }
    function _(P) {
      if (typeof P == "string") {
        if (!ky.test(P))
          throw new Error(`invalid anchor "${P}"`);
        m.call(this, `#${P}`);
      }
    }
  }), c;
  function u(d, v, $) {
    if (v !== void 0 && !_y(d, v))
      throw i($);
  }
  function i(d) {
    return new Error(`reference "${d}" resolves to more than one schema`);
  }
}
Ce.getSchemaRefs = Ty;
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.getData = lt.KeywordCxt = lt.validateFunctionCode = void 0;
const Gd = Jn, Hl = Re, Di = Rt, Ua = Re, jy = is, _r = xt, Us = Bt, H = re, X = Et, Ny = Ce, Ot = M, pr = Vr;
function Ay(e) {
  if (Wd(e) && (Jd(e), Hd(e))) {
    Dy(e);
    return;
  }
  Kd(e, () => (0, Gd.topBoolOrEmptySchema)(e));
}
lt.validateFunctionCode = Ay;
function Kd({ gen: e, validateName: t, schema: n, schemaEnv: r, opts: a }, s) {
  a.code.es5 ? e.func(t, (0, H._)`${X.default.data}, ${X.default.valCxt}`, r.$async, () => {
    e.code((0, H._)`"use strict"; ${Wl(n, a)}`), Iy(e, a), e.code(s);
  }) : e.func(t, (0, H._)`${X.default.data}, ${Cy(a)}`, r.$async, () => e.code(Wl(n, a)).code(s));
}
function Cy(e) {
  return (0, H._)`{${X.default.instancePath}="", ${X.default.parentData}, ${X.default.parentDataProperty}, ${X.default.rootData}=${X.default.data}${e.dynamicRef ? (0, H._)`, ${X.default.dynamicAnchors}={}` : H.nil}}={}`;
}
function Iy(e, t) {
  e.if(X.default.valCxt, () => {
    e.var(X.default.instancePath, (0, H._)`${X.default.valCxt}.${X.default.instancePath}`), e.var(X.default.parentData, (0, H._)`${X.default.valCxt}.${X.default.parentData}`), e.var(X.default.parentDataProperty, (0, H._)`${X.default.valCxt}.${X.default.parentDataProperty}`), e.var(X.default.rootData, (0, H._)`${X.default.valCxt}.${X.default.rootData}`), t.dynamicRef && e.var(X.default.dynamicAnchors, (0, H._)`${X.default.valCxt}.${X.default.dynamicAnchors}`);
  }, () => {
    e.var(X.default.instancePath, (0, H._)`""`), e.var(X.default.parentData, (0, H._)`undefined`), e.var(X.default.parentDataProperty, (0, H._)`undefined`), e.var(X.default.rootData, X.default.data), t.dynamicRef && e.var(X.default.dynamicAnchors, (0, H._)`{}`);
  });
}
function Dy(e) {
  const { schema: t, opts: n, gen: r } = e;
  Kd(e, () => {
    n.$comment && t.$comment && Yd(e), zy(e), r.let(X.default.vErrors, null), r.let(X.default.errors, 0), n.unevaluated && Ly(e), Xd(e), By(e);
  });
}
function Ly(e) {
  const { gen: t, validateName: n } = e;
  e.evaluated = t.const("evaluated", (0, H._)`${n}.evaluated`), t.if((0, H._)`${e.evaluated}.dynamicProps`, () => t.assign((0, H._)`${e.evaluated}.props`, (0, H._)`undefined`)), t.if((0, H._)`${e.evaluated}.dynamicItems`, () => t.assign((0, H._)`${e.evaluated}.items`, (0, H._)`undefined`));
}
function Wl(e, t) {
  const n = typeof e == "object" && e[t.schemaId];
  return n && (t.code.source || t.code.process) ? (0, H._)`/*# sourceURL=${n} */` : H.nil;
}
function Fy(e, t) {
  if (Wd(e) && (Jd(e), Hd(e))) {
    My(e, t);
    return;
  }
  (0, Gd.boolOrEmptySchema)(e, t);
}
function Hd({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const n in e)
    if (t.RULES.all[n])
      return !0;
  return !1;
}
function Wd(e) {
  return typeof e.schema != "boolean";
}
function My(e, t) {
  const { schema: n, gen: r, opts: a } = e;
  a.$comment && n.$comment && Yd(e), qy(e), Vy(e);
  const s = r.const("_errs", X.default.errors);
  Xd(e, s), r.var(t, (0, H._)`${s} === ${X.default.errors}`);
}
function Jd(e) {
  (0, Ot.checkUnknownRules)(e), Uy(e);
}
function Xd(e, t) {
  if (e.opts.jtd)
    return Jl(e, [], !1, t);
  const n = (0, Hl.getSchemaTypes)(e.schema), r = (0, Hl.coerceAndCheckDataType)(e, n);
  Jl(e, n, !r, t);
}
function Uy(e) {
  const { schema: t, errSchemaPath: n, opts: r, self: a } = e;
  t.$ref && r.ignoreKeywordsWithRef && (0, Ot.schemaHasRulesButRef)(t, a.RULES) && a.logger.warn(`$ref: keywords ignored in schema at path "${n}"`);
}
function zy(e) {
  const { schema: t, opts: n } = e;
  t.default !== void 0 && n.useDefaults && n.strictSchema && (0, Ot.checkStrictMode)(e, "default is ignored in the schema root");
}
function qy(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Ny.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function Vy(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Yd({ gen: e, schemaEnv: t, schema: n, errSchemaPath: r, opts: a }) {
  const s = n.$comment;
  if (a.$comment === !0)
    e.code((0, H._)`${X.default.self}.logger.log(${s})`);
  else if (typeof a.$comment == "function") {
    const o = (0, H.str)`${r}/$comment`, c = e.scopeValue("root", { ref: t.root });
    e.code((0, H._)`${X.default.self}.opts.$comment(${s}, ${o}, ${c}.schema)`);
  }
}
function By(e) {
  const { gen: t, schemaEnv: n, validateName: r, ValidationError: a, opts: s } = e;
  n.$async ? t.if((0, H._)`${X.default.errors} === 0`, () => t.return(X.default.data), () => t.throw((0, H._)`new ${a}(${X.default.vErrors})`)) : (t.assign((0, H._)`${r}.errors`, X.default.vErrors), s.unevaluated && Gy(e), t.return((0, H._)`${X.default.errors} === 0`));
}
function Gy({ gen: e, evaluated: t, props: n, items: r }) {
  n instanceof H.Name && e.assign((0, H._)`${t}.props`, n), r instanceof H.Name && e.assign((0, H._)`${t}.items`, r);
}
function Jl(e, t, n, r) {
  const { gen: a, schema: s, data: o, allErrors: c, opts: l, self: u } = e, { RULES: i } = u;
  if (s.$ref && (l.ignoreKeywordsWithRef || !(0, Ot.schemaHasRulesButRef)(s, i))) {
    a.block(() => ef(e, "$ref", i.all.$ref.definition));
    return;
  }
  l.jtd || Ky(e, t), a.block(() => {
    for (const v of i.rules)
      d(v);
    d(i.post);
  });
  function d(v) {
    (0, Di.shouldUseGroup)(s, v) && (v.type ? (a.if((0, Ua.checkDataType)(v.type, o, l.strictNumbers)), Xl(e, v), t.length === 1 && t[0] === v.type && n && (a.else(), (0, Ua.reportTypeError)(e)), a.endIf()) : Xl(e, v), c || a.if((0, H._)`${X.default.errors} === ${r || 0}`));
  }
}
function Xl(e, t) {
  const { gen: n, schema: r, opts: { useDefaults: a } } = e;
  a && (0, jy.assignDefaults)(e, t.type), n.block(() => {
    for (const s of t.rules)
      (0, Di.shouldUseRule)(r, s) && ef(e, s.keyword, s.definition, t.type);
  });
}
function Ky(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (Hy(e, t), e.opts.allowUnionTypes || Wy(e, t), Jy(e, e.dataTypes));
}
function Hy(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((n) => {
      Qd(e.dataTypes, n) || Li(e, `type "${n}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Yy(e, t);
  }
}
function Wy(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Li(e, "use allowUnionTypes to allow union type keyword");
}
function Jy(e, t) {
  const n = e.self.RULES.all;
  for (const r in n) {
    const a = n[r];
    if (typeof a == "object" && (0, Di.shouldUseRule)(e.schema, a)) {
      const { type: s } = a.definition;
      s.length && !s.some((o) => Xy(t, o)) && Li(e, `missing type "${s.join(",")}" for keyword "${r}"`);
    }
  }
}
function Xy(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Qd(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Yy(e, t) {
  const n = [];
  for (const r of e.dataTypes)
    Qd(t, r) ? n.push(r) : t.includes("integer") && r === "number" && n.push("integer");
  e.dataTypes = n;
}
function Li(e, t) {
  const n = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${n}" (strictTypes)`, (0, Ot.checkStrictMode)(e, t, e.opts.strictTypes);
}
let Zd = class {
  constructor(t, n, r) {
    if ((0, _r.validateKeywordUsage)(t, n, r), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = r, this.data = t.data, this.schema = t.schema[r], this.$data = n.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Ot.schemaRefOrVal)(t, this.schema, r, this.$data), this.schemaType = n.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = n, this.$data)
      this.schemaCode = t.gen.const("vSchema", tf(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, _r.validSchemaType)(this.schema, n.schemaType, n.allowUndefined))
      throw new Error(`${r} value must be ${JSON.stringify(n.schemaType)}`);
    ("code" in n ? n.trackErrors : n.errors !== !1) && (this.errsCount = t.gen.const("_errs", X.default.errors));
  }
  result(t, n, r) {
    this.failResult((0, H.not)(t), n, r);
  }
  failResult(t, n, r) {
    this.gen.if(t), r ? r() : this.error(), n ? (this.gen.else(), n(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, n) {
    this.failResult((0, H.not)(t), void 0, n);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: n } = this;
    this.fail((0, H._)`${n} !== undefined && (${(0, H.or)(this.invalid$data(), t)})`);
  }
  error(t, n, r) {
    if (n) {
      this.setParams(n), this._error(t, r), this.setParams({});
      return;
    }
    this._error(t, r);
  }
  _error(t, n) {
    (t ? pr.reportExtraError : pr.reportError)(this, this.def.error, n);
  }
  $dataError() {
    (0, pr.reportError)(this, this.def.$dataError || pr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, pr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, n) {
    n ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, n, r = H.nil) {
    this.gen.block(() => {
      this.check$data(t, r), n();
    });
  }
  check$data(t = H.nil, n = H.nil) {
    if (!this.$data)
      return;
    const { gen: r, schemaCode: a, schemaType: s, def: o } = this;
    r.if((0, H.or)((0, H._)`${a} === undefined`, n)), t !== H.nil && r.assign(t, !0), (s.length || o.validateSchema) && (r.elseIf(this.invalid$data()), this.$dataError(), t !== H.nil && r.assign(t, !1)), r.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: n, schemaType: r, def: a, it: s } = this;
    return (0, H.or)(o(), c());
    function o() {
      if (r.length) {
        if (!(n instanceof H.Name))
          throw new Error("ajv implementation error");
        const l = Array.isArray(r) ? r : [r];
        return (0, H._)`${(0, Ua.checkDataTypes)(l, n, s.opts.strictNumbers, Ua.DataType.Wrong)}`;
      }
      return H.nil;
    }
    function c() {
      if (a.validateSchema) {
        const l = t.scopeValue("validate$data", { ref: a.validateSchema });
        return (0, H._)`!${l}(${n})`;
      }
      return H.nil;
    }
  }
  subschema(t, n) {
    const r = (0, Us.getSubschema)(this.it, t);
    (0, Us.extendSubschemaData)(r, this.it, t), (0, Us.extendSubschemaMode)(r, t);
    const a = { ...this.it, ...r, items: void 0, props: void 0 };
    return Fy(a, n), a;
  }
  mergeEvaluated(t, n) {
    const { it: r, gen: a } = this;
    r.opts.unevaluated && (r.props !== !0 && t.props !== void 0 && (r.props = Ot.mergeEvaluated.props(a, t.props, r.props, n)), r.items !== !0 && t.items !== void 0 && (r.items = Ot.mergeEvaluated.items(a, t.items, r.items, n)));
  }
  mergeValidEvaluated(t, n) {
    const { it: r, gen: a } = this;
    if (r.opts.unevaluated && (r.props !== !0 || r.items !== !0))
      return a.if(n, () => this.mergeEvaluated(t, H.Name)), !0;
  }
};
lt.KeywordCxt = Zd;
function ef(e, t, n, r) {
  const a = new Zd(e, n, t);
  "code" in n ? n.code(a, r) : a.$data && n.validate ? (0, _r.funcKeywordCode)(a, n) : "macro" in n ? (0, _r.macroKeywordCode)(a, n) : (n.compile || n.validate) && (0, _r.funcKeywordCode)(a, n);
}
const Qy = /^\/(?:[^~]|~0|~1)*$/, Zy = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function tf(e, { dataLevel: t, dataNames: n, dataPathArr: r }) {
  let a, s;
  if (e === "")
    return X.default.rootData;
  if (e[0] === "/") {
    if (!Qy.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    a = e, s = X.default.rootData;
  } else {
    const u = Zy.exec(e);
    if (!u)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const i = +u[1];
    if (a = u[2], a === "#") {
      if (i >= t)
        throw new Error(l("property/index", i));
      return r[t - i];
    }
    if (i > t)
      throw new Error(l("data", i));
    if (s = n[t - i], !a)
      return s;
  }
  let o = s;
  const c = a.split("/");
  for (const u of c)
    u && (s = (0, H._)`${s}${(0, H.getProperty)((0, Ot.unescapeJsonPointer)(u))}`, o = (0, H._)`${o} && ${s}`);
  return o;
  function l(u, i) {
    return `Cannot access ${u} ${i} levels up, current level is ${t}`;
  }
}
lt.getData = tf;
var Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
let eg = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
Br.default = eg;
var tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
const zs = Ce;
let tg = class extends Error {
  constructor(t, n, r, a) {
    super(a || `can't resolve reference ${r} from id ${n}`), this.missingRef = (0, zs.resolveUrl)(t, n, r), this.missingSchema = (0, zs.normalizeId)((0, zs.getFullPath)(t, this.missingRef));
  }
};
tr.default = tg;
var Ke = {};
Object.defineProperty(Ke, "__esModule", { value: !0 });
Ke.resolveSchema = Ke.getCompilingSchema = Ke.resolveRef = Ke.compileSchema = Ke.SchemaEnv = void 0;
const rt = re, ng = Br, pn = Et, it = Ce, Yl = M, rg = lt;
let ls = class {
  constructor(t) {
    var n;
    this.refs = {}, this.dynamicAnchors = {};
    let r;
    typeof t.schema == "object" && (r = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (n = t.baseId) !== null && n !== void 0 ? n : (0, it.normalizeId)(r == null ? void 0 : r[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = r == null ? void 0 : r.$async, this.refs = {};
  }
};
Ke.SchemaEnv = ls;
function Fi(e) {
  const t = nf.call(this, e);
  if (t)
    return t;
  const n = (0, it.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: r, lines: a } = this.opts.code, { ownProperties: s } = this.opts, o = new rt.CodeGen(this.scope, { es5: r, lines: a, ownProperties: s });
  let c;
  e.$async && (c = o.scopeValue("Error", {
    ref: ng.default,
    code: (0, rt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = o.scopeName("validate");
  e.validateName = l;
  const u = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: pn.default.data,
    parentData: pn.default.parentData,
    parentDataProperty: pn.default.parentDataProperty,
    dataNames: [pn.default.data],
    dataPathArr: [rt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, rt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: c,
    schema: e.schema,
    schemaEnv: e,
    rootId: n,
    baseId: e.baseId || n,
    schemaPath: rt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, rt._)`""`,
    opts: this.opts,
    self: this
  };
  let i;
  try {
    this._compilations.add(e), (0, rg.validateFunctionCode)(u), o.optimize(this.opts.code.optimize);
    const d = o.toString();
    i = `${o.scopeRefs(pn.default.scope)}return ${d}`, this.opts.code.process && (i = this.opts.code.process(i, e));
    const $ = new Function(`${pn.default.self}`, `${pn.default.scope}`, i)(this, this.scope.get());
    if (this.scope.value(l, { ref: $ }), $.errors = null, $.schema = e.schema, $.schemaEnv = e, e.$async && ($.$async = !0), this.opts.code.source === !0 && ($.source = { validateName: l, validateCode: d, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: y, items: g } = u;
      $.evaluated = {
        props: y instanceof rt.Name ? void 0 : y,
        items: g instanceof rt.Name ? void 0 : g,
        dynamicProps: y instanceof rt.Name,
        dynamicItems: g instanceof rt.Name
      }, $.source && ($.source.evaluated = (0, rt.stringify)($.evaluated));
    }
    return e.validate = $, e;
  } catch (d) {
    throw delete e.validate, delete e.validateName, i && this.logger.error("Error compiling schema, function code:", i), d;
  } finally {
    this._compilations.delete(e);
  }
}
Ke.compileSchema = Fi;
function ag(e, t, n) {
  var r;
  n = (0, it.resolveUrl)(this.opts.uriResolver, t, n);
  const a = e.refs[n];
  if (a)
    return a;
  let s = ig.call(this, e, n);
  if (s === void 0) {
    const o = (r = e.localRefs) === null || r === void 0 ? void 0 : r[n], { schemaId: c } = this.opts;
    o && (s = new ls({ schema: o, schemaId: c, root: e, baseId: t }));
  }
  if (s !== void 0)
    return e.refs[n] = sg.call(this, s);
}
Ke.resolveRef = ag;
function sg(e) {
  return (0, it.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Fi.call(this, e);
}
function nf(e) {
  for (const t of this._compilations)
    if (og(t, e))
      return t;
}
Ke.getCompilingSchema = nf;
function og(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function ig(e, t) {
  let n;
  for (; typeof (n = this.refs[t]) == "string"; )
    t = n;
  return n || this.schemas[t] || us.call(this, e, t);
}
function us(e, t) {
  const n = this.opts.uriResolver.parse(t), r = (0, it._getFullPath)(this.opts.uriResolver, n);
  let a = (0, it.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && r === a)
    return qs.call(this, n, e);
  const s = (0, it.normalizeId)(r), o = this.refs[s] || this.schemas[s];
  if (typeof o == "string") {
    const c = us.call(this, e, o);
    return typeof (c == null ? void 0 : c.schema) != "object" ? void 0 : qs.call(this, n, c);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || Fi.call(this, o), s === (0, it.normalizeId)(t)) {
      const { schema: c } = o, { schemaId: l } = this.opts, u = c[l];
      return u && (a = (0, it.resolveUrl)(this.opts.uriResolver, a, u)), new ls({ schema: c, schemaId: l, root: e, baseId: a });
    }
    return qs.call(this, n, o);
  }
}
Ke.resolveSchema = us;
const cg = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function qs(e, { baseId: t, schema: n, root: r }) {
  var a;
  if (((a = e.fragment) === null || a === void 0 ? void 0 : a[0]) !== "/")
    return;
  for (const c of e.fragment.slice(1).split("/")) {
    if (typeof n == "boolean")
      return;
    const l = n[(0, Yl.unescapeFragment)(c)];
    if (l === void 0)
      return;
    n = l;
    const u = typeof n == "object" && n[this.opts.schemaId];
    !cg.has(c) && u && (t = (0, it.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let s;
  if (typeof n != "boolean" && n.$ref && !(0, Yl.schemaHasRulesButRef)(n, this.RULES)) {
    const c = (0, it.resolveUrl)(this.opts.uriResolver, t, n.$ref);
    s = us.call(this, r, c);
  }
  const { schemaId: o } = this.opts;
  if (s = s || new ls({ schema: n, schemaId: o, root: r, baseId: t }), s.schema !== s.root.schema)
    return s;
}
const lg = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", ug = "Meta-schema for $data reference (JSON AnySchema extension proposal)", pg = "object", dg = [
  "$data"
], fg = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, mg = !1, hg = {
  $id: lg,
  description: ug,
  type: pg,
  required: dg,
  properties: fg,
  additionalProperties: mg
};
var Mi = {}, ps = { exports: {} };
const vg = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
var yg = {
  HEX: vg
};
const { HEX: gg } = yg, bg = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
function rf(e) {
  if (sf(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const t = e.match(bg) || [], [n] = t;
  return n ? { host: xg(n, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function Ql(e, t = !1) {
  let n = "", r = !0;
  for (const a of e) {
    if (gg[a] === void 0) return;
    a !== "0" && r === !0 && (r = !1), r || (n += a);
  }
  return t && n.length === 0 && (n = "0"), n;
}
function $g(e) {
  let t = 0;
  const n = { error: !1, address: "", zone: "" }, r = [], a = [];
  let s = !1, o = !1, c = !1;
  function l() {
    if (a.length) {
      if (s === !1) {
        const u = Ql(a);
        if (u !== void 0)
          r.push(u);
        else
          return n.error = !0, !1;
      }
      a.length = 0;
    }
    return !0;
  }
  for (let u = 0; u < e.length; u++) {
    const i = e[u];
    if (!(i === "[" || i === "]"))
      if (i === ":") {
        if (o === !0 && (c = !0), !l())
          break;
        if (t++, r.push(":"), t > 7) {
          n.error = !0;
          break;
        }
        u - 1 >= 0 && e[u - 1] === ":" && (o = !0);
        continue;
      } else if (i === "%") {
        if (!l())
          break;
        s = !0;
      } else {
        a.push(i);
        continue;
      }
  }
  return a.length && (s ? n.zone = a.join("") : c ? r.push(a.join("")) : r.push(Ql(a))), n.address = r.join(""), n;
}
function af(e) {
  if (sf(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = $g(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let n = t.address, r = t.address;
    return t.zone && (n += "%" + t.zone, r += "%25" + t.zone), { host: n, escapedHost: r, isIPV6: !0 };
  }
}
function xg(e, t) {
  let n = "", r = !0;
  const a = e.length;
  for (let s = 0; s < a; s++) {
    const o = e[s];
    o === "0" && r ? (s + 1 <= a && e[s + 1] === t || s + 1 === a) && (n += o, r = !1) : (o === t ? r = !0 : r = !1, n += o);
  }
  return n;
}
function sf(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++)
    e[r] === t && n++;
  return n;
}
const Zl = /^\.\.?\//u, eu = /^\/\.(?:\/|$)/u, tu = /^\/\.\.(?:\/|$)/u, _g = /^\/?(?:.|\n)*?(?=\/|$)/u;
function wg(e) {
  const t = [];
  for (; e.length; )
    if (e.match(Zl))
      e = e.replace(Zl, "");
    else if (e.match(eu))
      e = e.replace(eu, "/");
    else if (e.match(tu))
      e = e.replace(tu, "/"), t.pop();
    else if (e === "." || e === "..")
      e = "";
    else {
      const n = e.match(_g);
      if (n) {
        const r = n[0];
        e = e.slice(r.length), t.push(r);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return t.join("");
}
function Eg(e, t) {
  const n = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = n(e.scheme)), e.userinfo !== void 0 && (e.userinfo = n(e.userinfo)), e.host !== void 0 && (e.host = n(e.host)), e.path !== void 0 && (e.path = n(e.path)), e.query !== void 0 && (e.query = n(e.query)), e.fragment !== void 0 && (e.fragment = n(e.fragment)), e;
}
function Sg(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let n = unescape(e.host);
    const r = rf(n);
    if (r.isIPV4)
      n = r.host;
    else {
      const a = af(r.host);
      a.isIPV6 === !0 ? n = `[${a.escapedHost}]` : n = e.host;
    }
    t.push(n);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Pg = {
  recomposeAuthority: Sg,
  normalizeComponentEncoding: Eg,
  removeDotSegments: wg,
  normalizeIPv4: rf,
  normalizeIPv6: af
};
const Rg = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, Og = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function of(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function cf(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function lf(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function kg(e) {
  return e.secure = of(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function Tg(e) {
  if ((e.port === (of(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, n] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = n, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function jg(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const n = e.path.match(Og);
  if (n) {
    const r = t.scheme || e.scheme || "urn";
    e.nid = n[1].toLowerCase(), e.nss = n[2];
    const a = `${r}:${t.nid || e.nid}`, s = Ui[a];
    e.path = void 0, s && (e = s.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function Ng(e, t) {
  const n = t.scheme || e.scheme || "urn", r = e.nid.toLowerCase(), a = `${n}:${t.nid || r}`, s = Ui[a];
  s && (e = s.serialize(e, t));
  const o = e, c = e.nss;
  return o.path = `${r || t.nid}:${c}`, t.skipEscape = !0, o;
}
function Ag(e, t) {
  const n = e;
  return n.uuid = n.nss, n.nss = void 0, !t.tolerant && (!n.uuid || !Rg.test(n.uuid)) && (n.error = n.error || "UUID is not valid."), n;
}
function Cg(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const uf = {
  scheme: "http",
  domainHost: !0,
  parse: cf,
  serialize: lf
}, Ig = {
  scheme: "https",
  domainHost: uf.domainHost,
  parse: cf,
  serialize: lf
}, Sa = {
  scheme: "ws",
  domainHost: !0,
  parse: kg,
  serialize: Tg
}, Dg = {
  scheme: "wss",
  domainHost: Sa.domainHost,
  parse: Sa.parse,
  serialize: Sa.serialize
}, Lg = {
  scheme: "urn",
  parse: jg,
  serialize: Ng,
  skipNormalize: !0
}, Fg = {
  scheme: "urn:uuid",
  parse: Ag,
  serialize: Cg,
  skipNormalize: !0
}, Ui = {
  http: uf,
  https: Ig,
  ws: Sa,
  wss: Dg,
  urn: Lg,
  "urn:uuid": Fg
};
var Mg = Ui;
const { normalizeIPv6: Ug, normalizeIPv4: zg, removeDotSegments: br, recomposeAuthority: qg, normalizeComponentEncoding: aa } = Pg, zi = Mg;
function Vg(e, t) {
  return typeof e == "string" ? e = _t(jt(e, t), t) : typeof e == "object" && (e = jt(_t(e, t), t)), e;
}
function Bg(e, t, n) {
  const r = Object.assign({ scheme: "null" }, n), a = pf(jt(e, r), jt(t, r), r, !0);
  return _t(a, { ...r, skipEscape: !0 });
}
function pf(e, t, n, r) {
  const a = {};
  return r || (e = jt(_t(e, n), n), t = jt(_t(t, n), n)), n = n || {}, !n.tolerant && t.scheme ? (a.scheme = t.scheme, a.userinfo = t.userinfo, a.host = t.host, a.port = t.port, a.path = br(t.path || ""), a.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (a.userinfo = t.userinfo, a.host = t.host, a.port = t.port, a.path = br(t.path || ""), a.query = t.query) : (t.path ? (t.path.charAt(0) === "/" ? a.path = br(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? a.path = "/" + t.path : e.path ? a.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : a.path = t.path, a.path = br(a.path)), a.query = t.query) : (a.path = e.path, t.query !== void 0 ? a.query = t.query : a.query = e.query), a.userinfo = e.userinfo, a.host = e.host, a.port = e.port), a.scheme = e.scheme), a.fragment = t.fragment, a;
}
function Gg(e, t, n) {
  return typeof e == "string" ? (e = unescape(e), e = _t(aa(jt(e, n), !0), { ...n, skipEscape: !0 })) : typeof e == "object" && (e = _t(aa(e, !0), { ...n, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = _t(aa(jt(t, n), !0), { ...n, skipEscape: !0 })) : typeof t == "object" && (t = _t(aa(t, !0), { ...n, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function _t(e, t) {
  const n = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, r = Object.assign({}, t), a = [], s = zi[(r.scheme || n.scheme || "").toLowerCase()];
  s && s.serialize && s.serialize(n, r), n.path !== void 0 && (r.skipEscape ? n.path = unescape(n.path) : (n.path = escape(n.path), n.scheme !== void 0 && (n.path = n.path.split("%3A").join(":")))), r.reference !== "suffix" && n.scheme && a.push(n.scheme, ":");
  const o = qg(n);
  if (o !== void 0 && (r.reference !== "suffix" && a.push("//"), a.push(o), n.path && n.path.charAt(0) !== "/" && a.push("/")), n.path !== void 0) {
    let c = n.path;
    !r.absolutePath && (!s || !s.absolutePath) && (c = br(c)), o === void 0 && (c = c.replace(/^\/\//u, "/%2F")), a.push(c);
  }
  return n.query !== void 0 && a.push("?", n.query), n.fragment !== void 0 && a.push("#", n.fragment), a.join("");
}
const Kg = Array.from({ length: 127 }, (e, t) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(t)));
function Hg(e) {
  let t = 0;
  for (let n = 0, r = e.length; n < r; ++n)
    if (t = e.charCodeAt(n), t > 126 || Kg[t])
      return !0;
  return !1;
}
const Wg = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function jt(e, t) {
  const n = Object.assign({}, t), r = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  }, a = e.indexOf("%") !== -1;
  let s = !1;
  n.reference === "suffix" && (e = (n.scheme ? n.scheme + ":" : "") + "//" + e);
  const o = e.match(Wg);
  if (o) {
    if (r.scheme = o[1], r.userinfo = o[3], r.host = o[4], r.port = parseInt(o[5], 10), r.path = o[6] || "", r.query = o[7], r.fragment = o[8], isNaN(r.port) && (r.port = o[5]), r.host) {
      const l = zg(r.host);
      if (l.isIPV4 === !1) {
        const u = Ug(l.host);
        r.host = u.host.toLowerCase(), s = u.isIPV6;
      } else
        r.host = l.host, s = !0;
    }
    r.scheme === void 0 && r.userinfo === void 0 && r.host === void 0 && r.port === void 0 && r.query === void 0 && !r.path ? r.reference = "same-document" : r.scheme === void 0 ? r.reference = "relative" : r.fragment === void 0 ? r.reference = "absolute" : r.reference = "uri", n.reference && n.reference !== "suffix" && n.reference !== r.reference && (r.error = r.error || "URI is not a " + n.reference + " reference.");
    const c = zi[(n.scheme || r.scheme || "").toLowerCase()];
    if (!n.unicodeSupport && (!c || !c.unicodeSupport) && r.host && (n.domainHost || c && c.domainHost) && s === !1 && Hg(r.host))
      try {
        r.host = URL.domainToASCII(r.host.toLowerCase());
      } catch (l) {
        r.error = r.error || "Host's domain name can not be converted to ASCII: " + l;
      }
    (!c || c && !c.skipNormalize) && (a && r.scheme !== void 0 && (r.scheme = unescape(r.scheme)), a && r.host !== void 0 && (r.host = unescape(r.host)), r.path && (r.path = escape(unescape(r.path))), r.fragment && (r.fragment = encodeURI(decodeURIComponent(r.fragment)))), c && c.parse && c.parse(r, n);
  } else
    r.error = r.error || "URI can not be parsed.";
  return r;
}
const qi = {
  SCHEMES: zi,
  normalize: Vg,
  resolve: Bg,
  resolveComponents: pf,
  equal: Gg,
  serialize: _t,
  parse: jt
};
ps.exports = qi;
ps.exports.default = qi;
ps.exports.fastUri = qi;
var df = ps.exports;
Object.defineProperty(Mi, "__esModule", { value: !0 });
const ff = df;
ff.code = 'require("ajv/dist/runtime/uri").default';
Mi.default = ff;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = lt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var n = re;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return n.CodeGen;
  } });
  const r = Br, a = tr, s = wn, o = Ke, c = re, l = Ce, u = Re, i = M, d = hg, v = Mi, $ = (w, b) => new RegExp(w, b);
  $.code = "new RegExp";
  const y = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), h = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, _ = 200;
  function P(w) {
    var b, E, x, p, f, S, A, N, G, B, se, Xe, Jt, Xt, Yt, Qt, Zt, en, tn, nn, rn, an, sn, on, cn;
    const nt = w.strict, ln = (b = w.code) === null || b === void 0 ? void 0 : b.optimize, lr = ln === !0 || ln === void 0 ? 1 : ln || 0, ur = (x = (E = w.code) === null || E === void 0 ? void 0 : E.regExp) !== null && x !== void 0 ? x : $, Ms = (p = w.uriResolver) !== null && p !== void 0 ? p : v.default;
    return {
      strictSchema: (S = (f = w.strictSchema) !== null && f !== void 0 ? f : nt) !== null && S !== void 0 ? S : !0,
      strictNumbers: (N = (A = w.strictNumbers) !== null && A !== void 0 ? A : nt) !== null && N !== void 0 ? N : !0,
      strictTypes: (B = (G = w.strictTypes) !== null && G !== void 0 ? G : nt) !== null && B !== void 0 ? B : "log",
      strictTuples: (Xe = (se = w.strictTuples) !== null && se !== void 0 ? se : nt) !== null && Xe !== void 0 ? Xe : "log",
      strictRequired: (Xt = (Jt = w.strictRequired) !== null && Jt !== void 0 ? Jt : nt) !== null && Xt !== void 0 ? Xt : !1,
      code: w.code ? { ...w.code, optimize: lr, regExp: ur } : { optimize: lr, regExp: ur },
      loopRequired: (Yt = w.loopRequired) !== null && Yt !== void 0 ? Yt : _,
      loopEnum: (Qt = w.loopEnum) !== null && Qt !== void 0 ? Qt : _,
      meta: (Zt = w.meta) !== null && Zt !== void 0 ? Zt : !0,
      messages: (en = w.messages) !== null && en !== void 0 ? en : !0,
      inlineRefs: (tn = w.inlineRefs) !== null && tn !== void 0 ? tn : !0,
      schemaId: (nn = w.schemaId) !== null && nn !== void 0 ? nn : "$id",
      addUsedSchema: (rn = w.addUsedSchema) !== null && rn !== void 0 ? rn : !0,
      validateSchema: (an = w.validateSchema) !== null && an !== void 0 ? an : !0,
      validateFormats: (sn = w.validateFormats) !== null && sn !== void 0 ? sn : !0,
      unicodeRegExp: (on = w.unicodeRegExp) !== null && on !== void 0 ? on : !0,
      int32range: (cn = w.int32range) !== null && cn !== void 0 ? cn : !0,
      uriResolver: Ms
    };
  }
  class O {
    constructor(b = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), b = this.opts = { ...b, ...P(b) };
      const { es5: E, lines: x } = this.opts.code;
      this.scope = new c.ValueScope({ scope: {}, prefixes: g, es5: E, lines: x }), this.logger = J(b.logger);
      const p = b.validateFormats;
      b.validateFormats = !1, this.RULES = (0, s.getRules)(), T.call(this, h, b, "NOT SUPPORTED"), T.call(this, m, b, "DEPRECATED", "warn"), this._metaOpts = K.call(this), b.formats && ae.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), b.keywords && F.call(this, b.keywords), typeof b.meta == "object" && this.addMetaSchema(b.meta), q.call(this), b.validateFormats = p;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: b, meta: E, schemaId: x } = this.opts;
      let p = d;
      x === "id" && (p = { ...d }, p.id = p.$id, delete p.$id), E && b && this.addMetaSchema(p, p[x], !1);
    }
    defaultMeta() {
      const { meta: b, schemaId: E } = this.opts;
      return this.opts.defaultMeta = typeof b == "object" ? b[E] || b : void 0;
    }
    validate(b, E) {
      let x;
      if (typeof b == "string") {
        if (x = this.getSchema(b), !x)
          throw new Error(`no schema with key or ref "${b}"`);
      } else
        x = this.compile(b);
      const p = x(E);
      return "$async" in x || (this.errors = x.errors), p;
    }
    compile(b, E) {
      const x = this._addSchema(b, E);
      return x.validate || this._compileSchemaEnv(x);
    }
    compileAsync(b, E) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: x } = this.opts;
      return p.call(this, b, E);
      async function p(B, se) {
        await f.call(this, B.$schema);
        const Xe = this._addSchema(B, se);
        return Xe.validate || S.call(this, Xe);
      }
      async function f(B) {
        B && !this.getSchema(B) && await p.call(this, { $ref: B }, !0);
      }
      async function S(B) {
        try {
          return this._compileSchemaEnv(B);
        } catch (se) {
          if (!(se instanceof a.default))
            throw se;
          return A.call(this, se), await N.call(this, se.missingSchema), S.call(this, B);
        }
      }
      function A({ missingSchema: B, missingRef: se }) {
        if (this.refs[B])
          throw new Error(`AnySchema ${B} is loaded but ${se} cannot be resolved`);
      }
      async function N(B) {
        const se = await G.call(this, B);
        this.refs[B] || await f.call(this, se.$schema), this.refs[B] || this.addSchema(se, B, E);
      }
      async function G(B) {
        const se = this._loading[B];
        if (se)
          return se;
        try {
          return await (this._loading[B] = x(B));
        } finally {
          delete this._loading[B];
        }
      }
    }
    // Adds schema to the instance
    addSchema(b, E, x, p = this.opts.validateSchema) {
      if (Array.isArray(b)) {
        for (const S of b)
          this.addSchema(S, void 0, x, p);
        return this;
      }
      let f;
      if (typeof b == "object") {
        const { schemaId: S } = this.opts;
        if (f = b[S], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${S} must be string`);
      }
      return E = (0, l.normalizeId)(E || f), this._checkUnique(E), this.schemas[E] = this._addSchema(b, x, E, p, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(b, E, x = this.opts.validateSchema) {
      return this.addSchema(b, E, !0, x), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(b, E) {
      if (typeof b == "boolean")
        return !0;
      let x;
      if (x = b.$schema, x !== void 0 && typeof x != "string")
        throw new Error("$schema must be a string");
      if (x = x || this.opts.defaultMeta || this.defaultMeta(), !x)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const p = this.validate(x, b);
      if (!p && E) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return p;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(b) {
      let E;
      for (; typeof (E = L.call(this, b)) == "string"; )
        b = E;
      if (E === void 0) {
        const { schemaId: x } = this.opts, p = new o.SchemaEnv({ schema: {}, schemaId: x });
        if (E = o.resolveSchema.call(this, p, b), !E)
          return;
        this.refs[b] = E;
      }
      return E.validate || this._compileSchemaEnv(E);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(b) {
      if (b instanceof RegExp)
        return this._removeAllSchemas(this.schemas, b), this._removeAllSchemas(this.refs, b), this;
      switch (typeof b) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const E = L.call(this, b);
          return typeof E == "object" && this._cache.delete(E.schema), delete this.schemas[b], delete this.refs[b], this;
        }
        case "object": {
          const E = b;
          this._cache.delete(E);
          let x = b[this.opts.schemaId];
          return x && (x = (0, l.normalizeId)(x), delete this.schemas[x], delete this.refs[x]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(b) {
      for (const E of b)
        this.addKeyword(E);
      return this;
    }
    addKeyword(b, E) {
      let x;
      if (typeof b == "string")
        x = b, typeof E == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), E.keyword = x);
      else if (typeof b == "object" && E === void 0) {
        if (E = b, x = E.keyword, Array.isArray(x) && !x.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (I.call(this, x, E), !E)
        return (0, i.eachItem)(x, (f) => D.call(this, f)), this;
      C.call(this, E);
      const p = {
        ...E,
        type: (0, u.getJSONTypes)(E.type),
        schemaType: (0, u.getJSONTypes)(E.schemaType)
      };
      return (0, i.eachItem)(x, p.type.length === 0 ? (f) => D.call(this, f, p) : (f) => p.type.forEach((S) => D.call(this, f, p, S))), this;
    }
    getKeyword(b) {
      const E = this.RULES.all[b];
      return typeof E == "object" ? E.definition : !!E;
    }
    // Remove keyword
    removeKeyword(b) {
      const { RULES: E } = this;
      delete E.keywords[b], delete E.all[b];
      for (const x of E.rules) {
        const p = x.rules.findIndex((f) => f.keyword === b);
        p >= 0 && x.rules.splice(p, 1);
      }
      return this;
    }
    // Add format
    addFormat(b, E) {
      return typeof E == "string" && (E = new RegExp(E)), this.formats[b] = E, this;
    }
    errorsText(b = this.errors, { separator: E = ", ", dataVar: x = "data" } = {}) {
      return !b || b.length === 0 ? "No errors" : b.map((p) => `${x}${p.instancePath} ${p.message}`).reduce((p, f) => p + E + f);
    }
    $dataMetaSchema(b, E) {
      const x = this.RULES.all;
      b = JSON.parse(JSON.stringify(b));
      for (const p of E) {
        const f = p.split("/").slice(1);
        let S = b;
        for (const A of f)
          S = S[A];
        for (const A in x) {
          const N = x[A];
          if (typeof N != "object")
            continue;
          const { $data: G } = N.definition, B = S[A];
          G && B && (S[A] = j(B));
        }
      }
      return b;
    }
    _removeAllSchemas(b, E) {
      for (const x in b) {
        const p = b[x];
        (!E || E.test(x)) && (typeof p == "string" ? delete b[x] : p && !p.meta && (this._cache.delete(p.schema), delete b[x]));
      }
    }
    _addSchema(b, E, x, p = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let S;
      const { schemaId: A } = this.opts;
      if (typeof b == "object")
        S = b[A];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof b != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let N = this._cache.get(b);
      if (N !== void 0)
        return N;
      x = (0, l.normalizeId)(S || x);
      const G = l.getSchemaRefs.call(this, b, x);
      return N = new o.SchemaEnv({ schema: b, schemaId: A, meta: E, baseId: x, localRefs: G }), this._cache.set(N.schema, N), f && !x.startsWith("#") && (x && this._checkUnique(x), this.refs[x] = N), p && this.validateSchema(b, !0), N;
    }
    _checkUnique(b) {
      if (this.schemas[b] || this.refs[b])
        throw new Error(`schema with key or id "${b}" already exists`);
    }
    _compileSchemaEnv(b) {
      if (b.meta ? this._compileMetaSchema(b) : o.compileSchema.call(this, b), !b.validate)
        throw new Error("ajv implementation error");
      return b.validate;
    }
    _compileMetaSchema(b) {
      const E = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, b);
      } finally {
        this.opts = E;
      }
    }
  }
  O.ValidationError = r.default, O.MissingRefError = a.default, e.default = O;
  function T(w, b, E, x = "error") {
    for (const p in w) {
      const f = p;
      f in b && this.logger[x](`${E}: option ${p}. ${w[f]}`);
    }
  }
  function L(w) {
    return w = (0, l.normalizeId)(w), this.schemas[w] || this.refs[w];
  }
  function q() {
    const w = this.opts.schemas;
    if (w)
      if (Array.isArray(w))
        this.addSchema(w);
      else
        for (const b in w)
          this.addSchema(w[b], b);
  }
  function ae() {
    for (const w in this.opts.formats) {
      const b = this.opts.formats[w];
      b && this.addFormat(w, b);
    }
  }
  function F(w) {
    if (Array.isArray(w)) {
      this.addVocabulary(w);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const b in w) {
      const E = w[b];
      E.keyword || (E.keyword = b), this.addKeyword(E);
    }
  }
  function K() {
    const w = { ...this.opts };
    for (const b of y)
      delete w[b];
    return w;
  }
  const ce = { log() {
  }, warn() {
  }, error() {
  } };
  function J(w) {
    if (w === !1)
      return ce;
    if (w === void 0)
      return console;
    if (w.log && w.warn && w.error)
      return w;
    throw new Error("logger must implement log, warn and error methods");
  }
  const de = /^[a-z_$][a-z0-9_$:-]*$/i;
  function I(w, b) {
    const { RULES: E } = this;
    if ((0, i.eachItem)(w, (x) => {
      if (E.keywords[x])
        throw new Error(`Keyword ${x} is already defined`);
      if (!de.test(x))
        throw new Error(`Keyword ${x} has invalid name`);
    }), !!b && b.$data && !("code" in b || "validate" in b))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function D(w, b, E) {
    var x;
    const p = b == null ? void 0 : b.post;
    if (E && p)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let S = p ? f.post : f.rules.find(({ type: N }) => N === E);
    if (S || (S = { type: E, rules: [] }, f.rules.push(S)), f.keywords[w] = !0, !b)
      return;
    const A = {
      keyword: w,
      definition: {
        ...b,
        type: (0, u.getJSONTypes)(b.type),
        schemaType: (0, u.getJSONTypes)(b.schemaType)
      }
    };
    b.before ? V.call(this, S, A, b.before) : S.rules.push(A), f.all[w] = A, (x = b.implements) === null || x === void 0 || x.forEach((N) => this.addKeyword(N));
  }
  function V(w, b, E) {
    const x = w.rules.findIndex((p) => p.keyword === E);
    x >= 0 ? w.rules.splice(x, 0, b) : (w.rules.push(b), this.logger.warn(`rule ${E} is not defined`));
  }
  function C(w) {
    let { metaSchema: b } = w;
    b !== void 0 && (w.$data && this.opts.$data && (b = j(b)), w.validateSchema = this.compile(b, !0));
  }
  const R = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function j(w) {
    return { anyOf: [w, R] };
  }
})(Sd);
var Vi = {}, Bi = {}, Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
const Jg = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Gi.default = Jg;
var En = {};
Object.defineProperty(En, "__esModule", { value: !0 });
En.callRef = En.getValidate = void 0;
const Xg = tr, nu = te, Be = re, jn = Et, ru = Ke, sa = M, Yg = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: n, it: r } = e, { baseId: a, schemaEnv: s, validateName: o, opts: c, self: l } = r, { root: u } = s;
    if ((n === "#" || n === "#/") && a === u.baseId)
      return d();
    const i = ru.resolveRef.call(l, u, a, n);
    if (i === void 0)
      throw new Xg.default(r.opts.uriResolver, a, n);
    if (i instanceof ru.SchemaEnv)
      return v(i);
    return $(i);
    function d() {
      if (s === u)
        return Pa(e, o, s, s.$async);
      const y = t.scopeValue("root", { ref: u });
      return Pa(e, (0, Be._)`${y}.validate`, u, u.$async);
    }
    function v(y) {
      const g = mf(e, y);
      Pa(e, g, y, y.$async);
    }
    function $(y) {
      const g = t.scopeValue("schema", c.code.source === !0 ? { ref: y, code: (0, Be.stringify)(y) } : { ref: y }), h = t.name("valid"), m = e.subschema({
        schema: y,
        dataTypes: [],
        schemaPath: Be.nil,
        topSchemaRef: g,
        errSchemaPath: n
      }, h);
      e.mergeEvaluated(m), e.ok(h);
    }
  }
};
function mf(e, t) {
  const { gen: n } = e;
  return t.validate ? n.scopeValue("validate", { ref: t.validate }) : (0, Be._)`${n.scopeValue("wrapper", { ref: t })}.validate`;
}
En.getValidate = mf;
function Pa(e, t, n, r) {
  const { gen: a, it: s } = e, { allErrors: o, schemaEnv: c, opts: l } = s, u = l.passContext ? jn.default.this : Be.nil;
  r ? i() : d();
  function i() {
    if (!c.$async)
      throw new Error("async schema referenced by sync schema");
    const y = a.let("valid");
    a.try(() => {
      a.code((0, Be._)`await ${(0, nu.callValidateCode)(e, t, u)}`), $(t), o || a.assign(y, !0);
    }, (g) => {
      a.if((0, Be._)`!(${g} instanceof ${s.ValidationError})`, () => a.throw(g)), v(g), o || a.assign(y, !1);
    }), e.ok(y);
  }
  function d() {
    e.result((0, nu.callValidateCode)(e, t, u), () => $(t), () => v(t));
  }
  function v(y) {
    const g = (0, Be._)`${y}.errors`;
    a.assign(jn.default.vErrors, (0, Be._)`${jn.default.vErrors} === null ? ${g} : ${jn.default.vErrors}.concat(${g})`), a.assign(jn.default.errors, (0, Be._)`${jn.default.vErrors}.length`);
  }
  function $(y) {
    var g;
    if (!s.opts.unevaluated)
      return;
    const h = (g = n == null ? void 0 : n.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (s.props !== !0)
      if (h && !h.dynamicProps)
        h.props !== void 0 && (s.props = sa.mergeEvaluated.props(a, h.props, s.props));
      else {
        const m = a.var("props", (0, Be._)`${y}.evaluated.props`);
        s.props = sa.mergeEvaluated.props(a, m, s.props, Be.Name);
      }
    if (s.items !== !0)
      if (h && !h.dynamicItems)
        h.items !== void 0 && (s.items = sa.mergeEvaluated.items(a, h.items, s.items));
      else {
        const m = a.var("items", (0, Be._)`${y}.evaluated.items`);
        s.items = sa.mergeEvaluated.items(a, m, s.items, Be.Name);
      }
  }
}
En.callRef = Pa;
En.default = Yg;
Object.defineProperty(Bi, "__esModule", { value: !0 });
const Qg = Gi, Zg = En, eb = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Qg.default,
  Zg.default
];
Bi.default = eb;
var Ki = {}, Hi = {};
Object.defineProperty(Hi, "__esModule", { value: !0 });
const za = re, Ct = za.operators, qa = {
  maximum: { okStr: "<=", ok: Ct.LTE, fail: Ct.GT },
  minimum: { okStr: ">=", ok: Ct.GTE, fail: Ct.LT },
  exclusiveMaximum: { okStr: "<", ok: Ct.LT, fail: Ct.GTE },
  exclusiveMinimum: { okStr: ">", ok: Ct.GT, fail: Ct.LTE }
}, tb = {
  message: ({ keyword: e, schemaCode: t }) => (0, za.str)`must be ${qa[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, za._)`{comparison: ${qa[e].okStr}, limit: ${t}}`
}, nb = {
  keyword: Object.keys(qa),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: tb,
  code(e) {
    const { keyword: t, data: n, schemaCode: r } = e;
    e.fail$data((0, za._)`${n} ${qa[t].fail} ${r} || isNaN(${n})`);
  }
};
Hi.default = nb;
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
const wr = re, rb = {
  message: ({ schemaCode: e }) => (0, wr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, wr._)`{multipleOf: ${e}}`
}, ab = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: rb,
  code(e) {
    const { gen: t, data: n, schemaCode: r, it: a } = e, s = a.opts.multipleOfPrecision, o = t.let("res"), c = s ? (0, wr._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${s}` : (0, wr._)`${o} !== parseInt(${o})`;
    e.fail$data((0, wr._)`(${r} === 0 || (${o} = ${n}/${r}, ${c}))`);
  }
};
Wi.default = ab;
var Ji = {}, Xi = {};
Object.defineProperty(Xi, "__esModule", { value: !0 });
function hf(e) {
  const t = e.length;
  let n = 0, r = 0, a;
  for (; r < t; )
    n++, a = e.charCodeAt(r++), a >= 55296 && a <= 56319 && r < t && (a = e.charCodeAt(r), (a & 64512) === 56320 && r++);
  return n;
}
Xi.default = hf;
hf.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ji, "__esModule", { value: !0 });
const hn = re, sb = M, ob = Xi, ib = {
  message({ keyword: e, schemaCode: t }) {
    const n = e === "maxLength" ? "more" : "fewer";
    return (0, hn.str)`must NOT have ${n} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, hn._)`{limit: ${e}}`
}, cb = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: ib,
  code(e) {
    const { keyword: t, data: n, schemaCode: r, it: a } = e, s = t === "maxLength" ? hn.operators.GT : hn.operators.LT, o = a.opts.unicode === !1 ? (0, hn._)`${n}.length` : (0, hn._)`${(0, sb.useFunc)(e.gen, ob.default)}(${n})`;
    e.fail$data((0, hn._)`${o} ${s} ${r}`);
  }
};
Ji.default = cb;
var Yi = {};
Object.defineProperty(Yi, "__esModule", { value: !0 });
const lb = te, Va = re, ub = {
  message: ({ schemaCode: e }) => (0, Va.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Va._)`{pattern: ${e}}`
}, pb = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: ub,
  code(e) {
    const { data: t, $data: n, schema: r, schemaCode: a, it: s } = e, o = s.opts.unicodeRegExp ? "u" : "", c = n ? (0, Va._)`(new RegExp(${a}, ${o}))` : (0, lb.usePattern)(e, r);
    e.fail$data((0, Va._)`!${c}.test(${t})`);
  }
};
Yi.default = pb;
var Qi = {};
Object.defineProperty(Qi, "__esModule", { value: !0 });
const Er = re, db = {
  message({ keyword: e, schemaCode: t }) {
    const n = e === "maxProperties" ? "more" : "fewer";
    return (0, Er.str)`must NOT have ${n} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Er._)`{limit: ${e}}`
}, fb = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: db,
  code(e) {
    const { keyword: t, data: n, schemaCode: r } = e, a = t === "maxProperties" ? Er.operators.GT : Er.operators.LT;
    e.fail$data((0, Er._)`Object.keys(${n}).length ${a} ${r}`);
  }
};
Qi.default = fb;
var Zi = {};
Object.defineProperty(Zi, "__esModule", { value: !0 });
const dr = te, Sr = re, mb = M, hb = {
  message: ({ params: { missingProperty: e } }) => (0, Sr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Sr._)`{missingProperty: ${e}}`
}, vb = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: hb,
  code(e) {
    const { gen: t, schema: n, schemaCode: r, data: a, $data: s, it: o } = e, { opts: c } = o;
    if (!s && n.length === 0)
      return;
    const l = n.length >= c.loopRequired;
    if (o.allErrors ? u() : i(), c.strictRequired) {
      const $ = e.parentSchema.properties, { definedProperties: y } = e.it;
      for (const g of n)
        if (($ == null ? void 0 : $[g]) === void 0 && !y.has(g)) {
          const h = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${g}" is not defined at "${h}" (strictRequired)`;
          (0, mb.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function u() {
      if (l || s)
        e.block$data(Sr.nil, d);
      else
        for (const $ of n)
          (0, dr.checkReportMissingProp)(e, $);
    }
    function i() {
      const $ = t.let("missing");
      if (l || s) {
        const y = t.let("valid", !0);
        e.block$data(y, () => v($, y)), e.ok(y);
      } else
        t.if((0, dr.checkMissingProp)(e, n, $)), (0, dr.reportMissingProp)(e, $), t.else();
    }
    function d() {
      t.forOf("prop", r, ($) => {
        e.setParams({ missingProperty: $ }), t.if((0, dr.noPropertyInData)(t, a, $, c.ownProperties), () => e.error());
      });
    }
    function v($, y) {
      e.setParams({ missingProperty: $ }), t.forOf($, r, () => {
        t.assign(y, (0, dr.propertyInData)(t, a, $, c.ownProperties)), t.if((0, Sr.not)(y), () => {
          e.error(), t.break();
        });
      }, Sr.nil);
    }
  }
};
Zi.default = vb;
var ec = {};
Object.defineProperty(ec, "__esModule", { value: !0 });
const Pr = re, yb = {
  message({ keyword: e, schemaCode: t }) {
    const n = e === "maxItems" ? "more" : "fewer";
    return (0, Pr.str)`must NOT have ${n} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Pr._)`{limit: ${e}}`
}, gb = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: yb,
  code(e) {
    const { keyword: t, data: n, schemaCode: r } = e, a = t === "maxItems" ? Pr.operators.GT : Pr.operators.LT;
    e.fail$data((0, Pr._)`${n}.length ${a} ${r}`);
  }
};
ec.default = gb;
var tc = {}, Gr = {};
Object.defineProperty(Gr, "__esModule", { value: !0 });
const vf = cs;
vf.code = 'require("ajv/dist/runtime/equal").default';
Gr.default = vf;
Object.defineProperty(tc, "__esModule", { value: !0 });
const Vs = Re, je = re, bb = M, $b = Gr, xb = {
  message: ({ params: { i: e, j: t } }) => (0, je.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, je._)`{i: ${e}, j: ${t}}`
}, _b = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: xb,
  code(e) {
    const { gen: t, data: n, $data: r, schema: a, parentSchema: s, schemaCode: o, it: c } = e;
    if (!r && !a)
      return;
    const l = t.let("valid"), u = s.items ? (0, Vs.getSchemaTypes)(s.items) : [];
    e.block$data(l, i, (0, je._)`${o} === false`), e.ok(l);
    function i() {
      const y = t.let("i", (0, je._)`${n}.length`), g = t.let("j");
      e.setParams({ i: y, j: g }), t.assign(l, !0), t.if((0, je._)`${y} > 1`, () => (d() ? v : $)(y, g));
    }
    function d() {
      return u.length > 0 && !u.some((y) => y === "object" || y === "array");
    }
    function v(y, g) {
      const h = t.name("item"), m = (0, Vs.checkDataTypes)(u, h, c.opts.strictNumbers, Vs.DataType.Wrong), _ = t.const("indices", (0, je._)`{}`);
      t.for((0, je._)`;${y}--;`, () => {
        t.let(h, (0, je._)`${n}[${y}]`), t.if(m, (0, je._)`continue`), u.length > 1 && t.if((0, je._)`typeof ${h} == "string"`, (0, je._)`${h} += "_"`), t.if((0, je._)`typeof ${_}[${h}] == "number"`, () => {
          t.assign(g, (0, je._)`${_}[${h}]`), e.error(), t.assign(l, !1).break();
        }).code((0, je._)`${_}[${h}] = ${y}`);
      });
    }
    function $(y, g) {
      const h = (0, bb.useFunc)(t, $b.default), m = t.name("outer");
      t.label(m).for((0, je._)`;${y}--;`, () => t.for((0, je._)`${g} = ${y}; ${g}--;`, () => t.if((0, je._)`${h}(${n}[${y}], ${n}[${g}])`, () => {
        e.error(), t.assign(l, !1).break(m);
      })));
    }
  }
};
tc.default = _b;
var nc = {};
Object.defineProperty(nc, "__esModule", { value: !0 });
const Uo = re, wb = M, Eb = Gr, Sb = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Uo._)`{allowedValue: ${e}}`
}, Pb = {
  keyword: "const",
  $data: !0,
  error: Sb,
  code(e) {
    const { gen: t, data: n, $data: r, schemaCode: a, schema: s } = e;
    r || s && typeof s == "object" ? e.fail$data((0, Uo._)`!${(0, wb.useFunc)(t, Eb.default)}(${n}, ${a})`) : e.fail((0, Uo._)`${s} !== ${n}`);
  }
};
nc.default = Pb;
var rc = {};
Object.defineProperty(rc, "__esModule", { value: !0 });
const $r = re, Rb = M, Ob = Gr, kb = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, $r._)`{allowedValues: ${e}}`
}, Tb = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: kb,
  code(e) {
    const { gen: t, data: n, $data: r, schema: a, schemaCode: s, it: o } = e;
    if (!r && a.length === 0)
      throw new Error("enum must have non-empty array");
    const c = a.length >= o.opts.loopEnum;
    let l;
    const u = () => l ?? (l = (0, Rb.useFunc)(t, Ob.default));
    let i;
    if (c || r)
      i = t.let("valid"), e.block$data(i, d);
    else {
      if (!Array.isArray(a))
        throw new Error("ajv implementation error");
      const $ = t.const("vSchema", s);
      i = (0, $r.or)(...a.map((y, g) => v($, g)));
    }
    e.pass(i);
    function d() {
      t.assign(i, !1), t.forOf("v", s, ($) => t.if((0, $r._)`${u()}(${n}, ${$})`, () => t.assign(i, !0).break()));
    }
    function v($, y) {
      const g = a[y];
      return typeof g == "object" && g !== null ? (0, $r._)`${u()}(${n}, ${$}[${y}])` : (0, $r._)`${n} === ${g}`;
    }
  }
};
rc.default = Tb;
Object.defineProperty(Ki, "__esModule", { value: !0 });
const jb = Hi, Nb = Wi, Ab = Ji, Cb = Yi, Ib = Qi, Db = Zi, Lb = ec, Fb = tc, Mb = nc, Ub = rc, zb = [
  // number
  jb.default,
  Nb.default,
  // string
  Ab.default,
  Cb.default,
  // object
  Ib.default,
  Db.default,
  // array
  Lb.default,
  Fb.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Mb.default,
  Ub.default
];
Ki.default = zb;
var ac = {}, nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.validateAdditionalItems = void 0;
const vn = re, zo = M, qb = {
  message: ({ params: { len: e } }) => (0, vn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, vn._)`{limit: ${e}}`
}, Vb = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: qb,
  code(e) {
    const { parentSchema: t, it: n } = e, { items: r } = t;
    if (!Array.isArray(r)) {
      (0, zo.checkStrictMode)(n, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    yf(e, r);
  }
};
function yf(e, t) {
  const { gen: n, schema: r, data: a, keyword: s, it: o } = e;
  o.items = !0;
  const c = n.const("len", (0, vn._)`${a}.length`);
  if (r === !1)
    e.setParams({ len: t.length }), e.pass((0, vn._)`${c} <= ${t.length}`);
  else if (typeof r == "object" && !(0, zo.alwaysValidSchema)(o, r)) {
    const u = n.var("valid", (0, vn._)`${c} <= ${t.length}`);
    n.if((0, vn.not)(u), () => l(u)), e.ok(u);
  }
  function l(u) {
    n.forRange("i", t.length, c, (i) => {
      e.subschema({ keyword: s, dataProp: i, dataPropType: zo.Type.Num }, u), o.allErrors || n.if((0, vn.not)(u), () => n.break());
    });
  }
}
nr.validateAdditionalItems = yf;
nr.default = Vb;
var sc = {}, rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.validateTuple = void 0;
const au = re, Ra = M, Bb = te, Gb = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: n } = e;
    if (Array.isArray(t))
      return gf(e, "additionalItems", t);
    n.items = !0, !(0, Ra.alwaysValidSchema)(n, t) && e.ok((0, Bb.validateArray)(e));
  }
};
function gf(e, t, n = e.schema) {
  const { gen: r, parentSchema: a, data: s, keyword: o, it: c } = e;
  i(a), c.opts.unevaluated && n.length && c.items !== !0 && (c.items = Ra.mergeEvaluated.items(r, n.length, c.items));
  const l = r.name("valid"), u = r.const("len", (0, au._)`${s}.length`);
  n.forEach((d, v) => {
    (0, Ra.alwaysValidSchema)(c, d) || (r.if((0, au._)`${u} > ${v}`, () => e.subschema({
      keyword: o,
      schemaProp: v,
      dataProp: v
    }, l)), e.ok(l));
  });
  function i(d) {
    const { opts: v, errSchemaPath: $ } = c, y = n.length, g = y === d.minItems && (y === d.maxItems || d[t] === !1);
    if (v.strictTuples && !g) {
      const h = `"${o}" is ${y}-tuple, but minItems or maxItems/${t} are not specified or different at path "${$}"`;
      (0, Ra.checkStrictMode)(c, h, v.strictTuples);
    }
  }
}
rr.validateTuple = gf;
rr.default = Gb;
Object.defineProperty(sc, "__esModule", { value: !0 });
const Kb = rr, Hb = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Kb.validateTuple)(e, "items")
};
sc.default = Hb;
var oc = {};
Object.defineProperty(oc, "__esModule", { value: !0 });
const su = re, Wb = M, Jb = te, Xb = nr, Yb = {
  message: ({ params: { len: e } }) => (0, su.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, su._)`{limit: ${e}}`
}, Qb = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Yb,
  code(e) {
    const { schema: t, parentSchema: n, it: r } = e, { prefixItems: a } = n;
    r.items = !0, !(0, Wb.alwaysValidSchema)(r, t) && (a ? (0, Xb.validateAdditionalItems)(e, a) : e.ok((0, Jb.validateArray)(e)));
  }
};
oc.default = Qb;
var ic = {};
Object.defineProperty(ic, "__esModule", { value: !0 });
const et = re, oa = M, Zb = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, et.str)`must contain at least ${e} valid item(s)` : (0, et.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, et._)`{minContains: ${e}}` : (0, et._)`{minContains: ${e}, maxContains: ${t}}`
}, e$ = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Zb,
  code(e) {
    const { gen: t, schema: n, parentSchema: r, data: a, it: s } = e;
    let o, c;
    const { minContains: l, maxContains: u } = r;
    s.opts.next ? (o = l === void 0 ? 1 : l, c = u) : o = 1;
    const i = t.const("len", (0, et._)`${a}.length`);
    if (e.setParams({ min: o, max: c }), c === void 0 && o === 0) {
      (0, oa.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (c !== void 0 && o > c) {
      (0, oa.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, oa.alwaysValidSchema)(s, n)) {
      let g = (0, et._)`${i} >= ${o}`;
      c !== void 0 && (g = (0, et._)`${g} && ${i} <= ${c}`), e.pass(g);
      return;
    }
    s.items = !0;
    const d = t.name("valid");
    c === void 0 && o === 1 ? $(d, () => t.if(d, () => t.break())) : o === 0 ? (t.let(d, !0), c !== void 0 && t.if((0, et._)`${a}.length > 0`, v)) : (t.let(d, !1), v()), e.result(d, () => e.reset());
    function v() {
      const g = t.name("_valid"), h = t.let("count", 0);
      $(g, () => t.if(g, () => y(h)));
    }
    function $(g, h) {
      t.forRange("i", 0, i, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: oa.Type.Num,
          compositeRule: !0
        }, g), h();
      });
    }
    function y(g) {
      t.code((0, et._)`${g}++`), c === void 0 ? t.if((0, et._)`${g} >= ${o}`, () => t.assign(d, !0).break()) : (t.if((0, et._)`${g} > ${c}`, () => t.assign(d, !1).break()), o === 1 ? t.assign(d, !0) : t.if((0, et._)`${g} >= ${o}`, () => t.assign(d, !0)));
    }
  }
};
ic.default = e$;
var bf = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = re, n = M, r = te;
  e.error = {
    message: ({ params: { property: l, depsCount: u, deps: i } }) => {
      const d = u === 1 ? "property" : "properties";
      return (0, t.str)`must have ${d} ${i} when property ${l} is present`;
    },
    params: ({ params: { property: l, depsCount: u, deps: i, missingProperty: d } }) => (0, t._)`{property: ${l},
    missingProperty: ${d},
    depsCount: ${u},
    deps: ${i}}`
    // TODO change to reference
  };
  const a = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(l) {
      const [u, i] = s(l);
      o(l, u), c(l, i);
    }
  };
  function s({ schema: l }) {
    const u = {}, i = {};
    for (const d in l) {
      if (d === "__proto__")
        continue;
      const v = Array.isArray(l[d]) ? u : i;
      v[d] = l[d];
    }
    return [u, i];
  }
  function o(l, u = l.schema) {
    const { gen: i, data: d, it: v } = l;
    if (Object.keys(u).length === 0)
      return;
    const $ = i.let("missing");
    for (const y in u) {
      const g = u[y];
      if (g.length === 0)
        continue;
      const h = (0, r.propertyInData)(i, d, y, v.opts.ownProperties);
      l.setParams({
        property: y,
        depsCount: g.length,
        deps: g.join(", ")
      }), v.allErrors ? i.if(h, () => {
        for (const m of g)
          (0, r.checkReportMissingProp)(l, m);
      }) : (i.if((0, t._)`${h} && (${(0, r.checkMissingProp)(l, g, $)})`), (0, r.reportMissingProp)(l, $), i.else());
    }
  }
  e.validatePropertyDeps = o;
  function c(l, u = l.schema) {
    const { gen: i, data: d, keyword: v, it: $ } = l, y = i.name("valid");
    for (const g in u)
      (0, n.alwaysValidSchema)($, u[g]) || (i.if(
        (0, r.propertyInData)(i, d, g, $.opts.ownProperties),
        () => {
          const h = l.subschema({ keyword: v, schemaProp: g }, y);
          l.mergeValidEvaluated(h, y);
        },
        () => i.var(y, !0)
        // TODO var
      ), l.ok(y));
  }
  e.validateSchemaDeps = c, e.default = a;
})(bf);
var cc = {};
Object.defineProperty(cc, "__esModule", { value: !0 });
const $f = re, t$ = M, n$ = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, $f._)`{propertyName: ${e.propertyName}}`
}, r$ = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: n$,
  code(e) {
    const { gen: t, schema: n, data: r, it: a } = e;
    if ((0, t$.alwaysValidSchema)(a, n))
      return;
    const s = t.name("valid");
    t.forIn("key", r, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, s), t.if((0, $f.not)(s), () => {
        e.error(!0), a.allErrors || t.break();
      });
    }), e.ok(s);
  }
};
cc.default = r$;
var ds = {};
Object.defineProperty(ds, "__esModule", { value: !0 });
const ia = te, st = re, a$ = Et, ca = M, s$ = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, st._)`{additionalProperty: ${e.additionalProperty}}`
}, o$ = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: s$,
  code(e) {
    const { gen: t, schema: n, parentSchema: r, data: a, errsCount: s, it: o } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: c, opts: l } = o;
    if (o.props = !0, l.removeAdditional !== "all" && (0, ca.alwaysValidSchema)(o, n))
      return;
    const u = (0, ia.allSchemaProperties)(r.properties), i = (0, ia.allSchemaProperties)(r.patternProperties);
    d(), e.ok((0, st._)`${s} === ${a$.default.errors}`);
    function d() {
      t.forIn("key", a, (h) => {
        !u.length && !i.length ? y(h) : t.if(v(h), () => y(h));
      });
    }
    function v(h) {
      let m;
      if (u.length > 8) {
        const _ = (0, ca.schemaRefOrVal)(o, r.properties, "properties");
        m = (0, ia.isOwnProperty)(t, _, h);
      } else u.length ? m = (0, st.or)(...u.map((_) => (0, st._)`${h} === ${_}`)) : m = st.nil;
      return i.length && (m = (0, st.or)(m, ...i.map((_) => (0, st._)`${(0, ia.usePattern)(e, _)}.test(${h})`))), (0, st.not)(m);
    }
    function $(h) {
      t.code((0, st._)`delete ${a}[${h}]`);
    }
    function y(h) {
      if (l.removeAdditional === "all" || l.removeAdditional && n === !1) {
        $(h);
        return;
      }
      if (n === !1) {
        e.setParams({ additionalProperty: h }), e.error(), c || t.break();
        return;
      }
      if (typeof n == "object" && !(0, ca.alwaysValidSchema)(o, n)) {
        const m = t.name("valid");
        l.removeAdditional === "failing" ? (g(h, m, !1), t.if((0, st.not)(m), () => {
          e.reset(), $(h);
        })) : (g(h, m), c || t.if((0, st.not)(m), () => t.break()));
      }
    }
    function g(h, m, _) {
      const P = {
        keyword: "additionalProperties",
        dataProp: h,
        dataPropType: ca.Type.Str
      };
      _ === !1 && Object.assign(P, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(P, m);
    }
  }
};
ds.default = o$;
var lc = {};
Object.defineProperty(lc, "__esModule", { value: !0 });
const i$ = lt, ou = te, Bs = M, iu = ds, c$ = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: n, parentSchema: r, data: a, it: s } = e;
    s.opts.removeAdditional === "all" && r.additionalProperties === void 0 && iu.default.code(new i$.KeywordCxt(s, iu.default, "additionalProperties"));
    const o = (0, ou.allSchemaProperties)(n);
    for (const d of o)
      s.definedProperties.add(d);
    s.opts.unevaluated && o.length && s.props !== !0 && (s.props = Bs.mergeEvaluated.props(t, (0, Bs.toHash)(o), s.props));
    const c = o.filter((d) => !(0, Bs.alwaysValidSchema)(s, n[d]));
    if (c.length === 0)
      return;
    const l = t.name("valid");
    for (const d of c)
      u(d) ? i(d) : (t.if((0, ou.propertyInData)(t, a, d, s.opts.ownProperties)), i(d), s.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(d), e.ok(l);
    function u(d) {
      return s.opts.useDefaults && !s.compositeRule && n[d].default !== void 0;
    }
    function i(d) {
      e.subschema({
        keyword: "properties",
        schemaProp: d,
        dataProp: d
      }, l);
    }
  }
};
lc.default = c$;
var uc = {};
Object.defineProperty(uc, "__esModule", { value: !0 });
const cu = te, la = re, lu = M, uu = M, l$ = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: n, data: r, parentSchema: a, it: s } = e, { opts: o } = s, c = (0, cu.allSchemaProperties)(n), l = c.filter((g) => (0, lu.alwaysValidSchema)(s, n[g]));
    if (c.length === 0 || l.length === c.length && (!s.opts.unevaluated || s.props === !0))
      return;
    const u = o.strictSchema && !o.allowMatchingProperties && a.properties, i = t.name("valid");
    s.props !== !0 && !(s.props instanceof la.Name) && (s.props = (0, uu.evaluatedPropsToName)(t, s.props));
    const { props: d } = s;
    v();
    function v() {
      for (const g of c)
        u && $(g), s.allErrors ? y(g) : (t.var(i, !0), y(g), t.if(i));
    }
    function $(g) {
      for (const h in u)
        new RegExp(g).test(h) && (0, lu.checkStrictMode)(s, `property ${h} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function y(g) {
      t.forIn("key", r, (h) => {
        t.if((0, la._)`${(0, cu.usePattern)(e, g)}.test(${h})`, () => {
          const m = l.includes(g);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: h,
            dataPropType: uu.Type.Str
          }, i), s.opts.unevaluated && d !== !0 ? t.assign((0, la._)`${d}[${h}]`, !0) : !m && !s.allErrors && t.if((0, la.not)(i), () => t.break());
        });
      });
    }
  }
};
uc.default = l$;
var pc = {};
Object.defineProperty(pc, "__esModule", { value: !0 });
const u$ = M, p$ = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: n, it: r } = e;
    if ((0, u$.alwaysValidSchema)(r, n)) {
      e.fail();
      return;
    }
    const a = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, a), e.failResult(a, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
pc.default = p$;
var dc = {};
Object.defineProperty(dc, "__esModule", { value: !0 });
const d$ = te, f$ = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: d$.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
dc.default = f$;
var fc = {};
Object.defineProperty(fc, "__esModule", { value: !0 });
const Oa = re, m$ = M, h$ = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Oa._)`{passingSchemas: ${e.passing}}`
}, v$ = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: h$,
  code(e) {
    const { gen: t, schema: n, parentSchema: r, it: a } = e;
    if (!Array.isArray(n))
      throw new Error("ajv implementation error");
    if (a.opts.discriminator && r.discriminator)
      return;
    const s = n, o = t.let("valid", !1), c = t.let("passing", null), l = t.name("_valid");
    e.setParams({ passing: c }), t.block(u), e.result(o, () => e.reset(), () => e.error(!0));
    function u() {
      s.forEach((i, d) => {
        let v;
        (0, m$.alwaysValidSchema)(a, i) ? t.var(l, !0) : v = e.subschema({
          keyword: "oneOf",
          schemaProp: d,
          compositeRule: !0
        }, l), d > 0 && t.if((0, Oa._)`${l} && ${o}`).assign(o, !1).assign(c, (0, Oa._)`[${c}, ${d}]`).else(), t.if(l, () => {
          t.assign(o, !0), t.assign(c, d), v && e.mergeEvaluated(v, Oa.Name);
        });
      });
    }
  }
};
fc.default = v$;
var mc = {};
Object.defineProperty(mc, "__esModule", { value: !0 });
const y$ = M, g$ = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: n, it: r } = e;
    if (!Array.isArray(n))
      throw new Error("ajv implementation error");
    const a = t.name("valid");
    n.forEach((s, o) => {
      if ((0, y$.alwaysValidSchema)(r, s))
        return;
      const c = e.subschema({ keyword: "allOf", schemaProp: o }, a);
      e.ok(a), e.mergeEvaluated(c);
    });
  }
};
mc.default = g$;
var hc = {};
Object.defineProperty(hc, "__esModule", { value: !0 });
const Ba = re, xf = M, b$ = {
  message: ({ params: e }) => (0, Ba.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Ba._)`{failingKeyword: ${e.ifClause}}`
}, $$ = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: b$,
  code(e) {
    const { gen: t, parentSchema: n, it: r } = e;
    n.then === void 0 && n.else === void 0 && (0, xf.checkStrictMode)(r, '"if" without "then" and "else" is ignored');
    const a = pu(r, "then"), s = pu(r, "else");
    if (!a && !s)
      return;
    const o = t.let("valid", !0), c = t.name("_valid");
    if (l(), e.reset(), a && s) {
      const i = t.let("ifClause");
      e.setParams({ ifClause: i }), t.if(c, u("then", i), u("else", i));
    } else a ? t.if(c, u("then")) : t.if((0, Ba.not)(c), u("else"));
    e.pass(o, () => e.error(!0));
    function l() {
      const i = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, c);
      e.mergeEvaluated(i);
    }
    function u(i, d) {
      return () => {
        const v = e.subschema({ keyword: i }, c);
        t.assign(o, c), e.mergeValidEvaluated(v, o), d ? t.assign(d, (0, Ba._)`${i}`) : e.setParams({ ifClause: i });
      };
    }
  }
};
function pu(e, t) {
  const n = e.schema[t];
  return n !== void 0 && !(0, xf.alwaysValidSchema)(e, n);
}
hc.default = $$;
var vc = {};
Object.defineProperty(vc, "__esModule", { value: !0 });
const x$ = M, _$ = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: n }) {
    t.if === void 0 && (0, x$.checkStrictMode)(n, `"${e}" without "if" is ignored`);
  }
};
vc.default = _$;
Object.defineProperty(ac, "__esModule", { value: !0 });
const w$ = nr, E$ = sc, S$ = rr, P$ = oc, R$ = ic, O$ = bf, k$ = cc, T$ = ds, j$ = lc, N$ = uc, A$ = pc, C$ = dc, I$ = fc, D$ = mc, L$ = hc, F$ = vc;
function M$(e = !1) {
  const t = [
    // any
    A$.default,
    C$.default,
    I$.default,
    D$.default,
    L$.default,
    F$.default,
    // object
    k$.default,
    T$.default,
    O$.default,
    j$.default,
    N$.default
  ];
  return e ? t.push(E$.default, P$.default) : t.push(w$.default, S$.default), t.push(R$.default), t;
}
ac.default = M$;
var yc = {}, gc = {};
Object.defineProperty(gc, "__esModule", { value: !0 });
const we = re, U$ = {
  message: ({ schemaCode: e }) => (0, we.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, we._)`{format: ${e}}`
}, z$ = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: U$,
  code(e, t) {
    const { gen: n, data: r, $data: a, schema: s, schemaCode: o, it: c } = e, { opts: l, errSchemaPath: u, schemaEnv: i, self: d } = c;
    if (!l.validateFormats)
      return;
    a ? v() : $();
    function v() {
      const y = n.scopeValue("formats", {
        ref: d.formats,
        code: l.code.formats
      }), g = n.const("fDef", (0, we._)`${y}[${o}]`), h = n.let("fType"), m = n.let("format");
      n.if((0, we._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => n.assign(h, (0, we._)`${g}.type || "string"`).assign(m, (0, we._)`${g}.validate`), () => n.assign(h, (0, we._)`"string"`).assign(m, g)), e.fail$data((0, we.or)(_(), P()));
      function _() {
        return l.strictSchema === !1 ? we.nil : (0, we._)`${o} && !${m}`;
      }
      function P() {
        const O = i.$async ? (0, we._)`(${g}.async ? await ${m}(${r}) : ${m}(${r}))` : (0, we._)`${m}(${r})`, T = (0, we._)`(typeof ${m} == "function" ? ${O} : ${m}.test(${r}))`;
        return (0, we._)`${m} && ${m} !== true && ${h} === ${t} && !${T}`;
      }
    }
    function $() {
      const y = d.formats[s];
      if (!y) {
        _();
        return;
      }
      if (y === !0)
        return;
      const [g, h, m] = P(y);
      g === t && e.pass(O());
      function _() {
        if (l.strictSchema === !1) {
          d.logger.warn(T());
          return;
        }
        throw new Error(T());
        function T() {
          return `unknown format "${s}" ignored in schema at path "${u}"`;
        }
      }
      function P(T) {
        const L = T instanceof RegExp ? (0, we.regexpCode)(T) : l.code.formats ? (0, we._)`${l.code.formats}${(0, we.getProperty)(s)}` : void 0, q = n.scopeValue("formats", { key: s, ref: T, code: L });
        return typeof T == "object" && !(T instanceof RegExp) ? [T.type || "string", T.validate, (0, we._)`${q}.validate`] : ["string", T, q];
      }
      function O() {
        if (typeof y == "object" && !(y instanceof RegExp) && y.async) {
          if (!i.$async)
            throw new Error("async format in sync schema");
          return (0, we._)`await ${m}(${r})`;
        }
        return typeof h == "function" ? (0, we._)`${m}(${r})` : (0, we._)`${m}.test(${r})`;
      }
    }
  }
};
gc.default = z$;
Object.defineProperty(yc, "__esModule", { value: !0 });
const q$ = gc, V$ = [q$.default];
yc.default = V$;
var Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.contentVocabulary = Xn.metadataVocabulary = void 0;
Xn.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Xn.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Vi, "__esModule", { value: !0 });
const B$ = Bi, G$ = Ki, K$ = ac, H$ = yc, du = Xn, W$ = [
  B$.default,
  G$.default,
  (0, K$.default)(),
  H$.default,
  du.metadataVocabulary,
  du.contentVocabulary
];
Vi.default = W$;
var bc = {}, fs = {};
Object.defineProperty(fs, "__esModule", { value: !0 });
fs.DiscrError = void 0;
var fu;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(fu || (fs.DiscrError = fu = {}));
Object.defineProperty(bc, "__esModule", { value: !0 });
const Dn = re, qo = fs, mu = Ke, J$ = tr, X$ = M, Y$ = {
  message: ({ params: { discrError: e, tagName: t } }) => e === qo.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: n } }) => (0, Dn._)`{error: ${e}, tag: ${n}, tagValue: ${t}}`
}, Q$ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: Y$,
  code(e) {
    const { gen: t, data: n, schema: r, parentSchema: a, it: s } = e, { oneOf: o } = a;
    if (!s.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const c = r.propertyName;
    if (typeof c != "string")
      throw new Error("discriminator: requires propertyName");
    if (r.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const l = t.let("valid", !1), u = t.const("tag", (0, Dn._)`${n}${(0, Dn.getProperty)(c)}`);
    t.if((0, Dn._)`typeof ${u} == "string"`, () => i(), () => e.error(!1, { discrError: qo.DiscrError.Tag, tag: u, tagName: c })), e.ok(l);
    function i() {
      const $ = v();
      t.if(!1);
      for (const y in $)
        t.elseIf((0, Dn._)`${u} === ${y}`), t.assign(l, d($[y]));
      t.else(), e.error(!1, { discrError: qo.DiscrError.Mapping, tag: u, tagName: c }), t.endIf();
    }
    function d($) {
      const y = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: $ }, y);
      return e.mergeEvaluated(g, Dn.Name), y;
    }
    function v() {
      var $;
      const y = {}, g = m(a);
      let h = !0;
      for (let O = 0; O < o.length; O++) {
        let T = o[O];
        if (T != null && T.$ref && !(0, X$.schemaHasRulesButRef)(T, s.self.RULES)) {
          const q = T.$ref;
          if (T = mu.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, q), T instanceof mu.SchemaEnv && (T = T.schema), T === void 0)
            throw new J$.default(s.opts.uriResolver, s.baseId, q);
        }
        const L = ($ = T == null ? void 0 : T.properties) === null || $ === void 0 ? void 0 : $[c];
        if (typeof L != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${c}"`);
        h = h && (g || m(T)), _(L, O);
      }
      if (!h)
        throw new Error(`discriminator: "${c}" must be required`);
      return y;
      function m({ required: O }) {
        return Array.isArray(O) && O.includes(c);
      }
      function _(O, T) {
        if (O.const)
          P(O.const, T);
        else if (O.enum)
          for (const L of O.enum)
            P(L, T);
        else
          throw new Error(`discriminator: "properties/${c}" must have "const" or "enum"`);
      }
      function P(O, T) {
        if (typeof O != "string" || O in y)
          throw new Error(`discriminator: "${c}" values must be unique strings`);
        y[O] = T;
      }
    }
  }
};
bc.default = Q$;
const Z$ = "http://json-schema.org/draft-07/schema#", ex = "http://json-schema.org/draft-07/schema#", tx = "Core schema meta-schema", nx = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, rx = [
  "object",
  "boolean"
], ax = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, sx = {
  $schema: Z$,
  $id: ex,
  title: tx,
  definitions: nx,
  type: rx,
  properties: ax,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const n = Sd, r = Vi, a = bc, s = sx, o = ["/properties"], c = "http://json-schema.org/draft-07/schema";
  class l extends n.default {
    _addVocabularies() {
      super._addVocabularies(), r.default.forEach((y) => this.addVocabulary(y)), this.opts.discriminator && this.addKeyword(a.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const y = this.opts.$data ? this.$dataMetaSchema(s, o) : s;
      this.addMetaSchema(y, c, !1), this.refs["http://json-schema.org/schema"] = c;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(c) ? c : void 0);
    }
  }
  t.Ajv = l, e.exports = t = l, e.exports.Ajv = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  var u = lt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return u.KeywordCxt;
  } });
  var i = re;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return i._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return i.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return i.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return i.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return i.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return i.CodeGen;
  } });
  var d = Br;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return d.default;
  } });
  var v = tr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return v.default;
  } });
})(Io, Io.exports);
var ox = Io.exports, Vo = { exports: {} }, _f = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(F, K) {
    return { validate: F, compare: K };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(s, o),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(l, u),
    "date-time": t(d, v),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: g,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: ae,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: m,
    // signed 32 bit integer
    int32: { type: "number", validate: O },
    // signed 64 bit integer
    int64: { type: "number", validate: T },
    // C-type float
    float: { type: "number", validate: L },
    // C-type double
    double: { type: "number", validate: L },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, o),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, u),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, v),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function n(F) {
    return F % 4 === 0 && (F % 100 !== 0 || F % 400 === 0);
  }
  const r = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, a = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function s(F) {
    const K = r.exec(F);
    if (!K)
      return !1;
    const ce = +K[1], J = +K[2], de = +K[3];
    return J >= 1 && J <= 12 && de >= 1 && de <= (J === 2 && n(ce) ? 29 : a[J]);
  }
  function o(F, K) {
    if (F && K)
      return F > K ? 1 : F < K ? -1 : 0;
  }
  const c = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function l(F, K) {
    const ce = c.exec(F);
    if (!ce)
      return !1;
    const J = +ce[1], de = +ce[2], I = +ce[3], D = ce[5];
    return (J <= 23 && de <= 59 && I <= 59 || J === 23 && de === 59 && I === 60) && (!K || D !== "");
  }
  function u(F, K) {
    if (!(F && K))
      return;
    const ce = c.exec(F), J = c.exec(K);
    if (ce && J)
      return F = ce[1] + ce[2] + ce[3] + (ce[4] || ""), K = J[1] + J[2] + J[3] + (J[4] || ""), F > K ? 1 : F < K ? -1 : 0;
  }
  const i = /t|\s/i;
  function d(F) {
    const K = F.split(i);
    return K.length === 2 && s(K[0]) && l(K[1], !0);
  }
  function v(F, K) {
    if (!(F && K))
      return;
    const [ce, J] = F.split(i), [de, I] = K.split(i), D = o(ce, de);
    if (D !== void 0)
      return D || u(J, I);
  }
  const $ = /\/|:/, y = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(F) {
    return $.test(F) && y.test(F);
  }
  const h = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function m(F) {
    return h.lastIndex = 0, h.test(F);
  }
  const _ = -2147483648, P = 2 ** 31 - 1;
  function O(F) {
    return Number.isInteger(F) && F <= P && F >= _;
  }
  function T(F) {
    return Number.isInteger(F);
  }
  function L() {
    return !0;
  }
  const q = /[^\\]\\Z/;
  function ae(F) {
    if (q.test(F))
      return !1;
    try {
      return new RegExp(F), !0;
    } catch {
      return !1;
    }
  }
})(_f);
var wf = {}, Bo = { exports: {} }, Ef = {}, ut = {}, Yn = {}, Kr = {}, ee = {}, Ar = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class n extends t {
    constructor(_) {
      if (super(), !e.IDENTIFIER.test(_))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = _;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = n;
  class r extends t {
    constructor(_) {
      super(), this._items = typeof _ == "string" ? [_] : _;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const _ = this._items[0];
      return _ === "" || _ === '""';
    }
    get str() {
      var _;
      return (_ = this._str) !== null && _ !== void 0 ? _ : this._str = this._items.reduce((P, O) => `${P}${O}`, "");
    }
    get names() {
      var _;
      return (_ = this._names) !== null && _ !== void 0 ? _ : this._names = this._items.reduce((P, O) => (O instanceof n && (P[O.str] = (P[O.str] || 0) + 1), P), {});
    }
  }
  e._Code = r, e.nil = new r("");
  function a(m, ..._) {
    const P = [m[0]];
    let O = 0;
    for (; O < _.length; )
      c(P, _[O]), P.push(m[++O]);
    return new r(P);
  }
  e._ = a;
  const s = new r("+");
  function o(m, ..._) {
    const P = [$(m[0])];
    let O = 0;
    for (; O < _.length; )
      P.push(s), c(P, _[O]), P.push(s, $(m[++O]));
    return l(P), new r(P);
  }
  e.str = o;
  function c(m, _) {
    _ instanceof r ? m.push(..._._items) : _ instanceof n ? m.push(_) : m.push(d(_));
  }
  e.addCodeArg = c;
  function l(m) {
    let _ = 1;
    for (; _ < m.length - 1; ) {
      if (m[_] === s) {
        const P = u(m[_ - 1], m[_ + 1]);
        if (P !== void 0) {
          m.splice(_ - 1, 3, P);
          continue;
        }
        m[_++] = "+";
      }
      _++;
    }
  }
  function u(m, _) {
    if (_ === '""')
      return m;
    if (m === '""')
      return _;
    if (typeof m == "string")
      return _ instanceof n || m[m.length - 1] !== '"' ? void 0 : typeof _ != "string" ? `${m.slice(0, -1)}${_}"` : _[0] === '"' ? m.slice(0, -1) + _.slice(1) : void 0;
    if (typeof _ == "string" && _[0] === '"' && !(m instanceof n))
      return `"${m}${_.slice(1)}`;
  }
  function i(m, _) {
    return _.emptyStr() ? m : m.emptyStr() ? _ : o`${m}${_}`;
  }
  e.strConcat = i;
  function d(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : $(Array.isArray(m) ? m.join(",") : m);
  }
  function v(m) {
    return new r($(m));
  }
  e.stringify = v;
  function $(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = $;
  function y(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new r(`.${m}`) : a`[${m}]`;
  }
  e.getProperty = y;
  function g(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new r(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function h(m) {
    return new r(m.toString());
  }
  e.regexpCode = h;
})(Ar);
var Go = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Ar;
  class n extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
    }
  }
  var r;
  (function(l) {
    l[l.Started = 0] = "Started", l[l.Completed = 1] = "Completed";
  })(r || (e.UsedValueState = r = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class a {
    constructor({ prefixes: u, parent: i } = {}) {
      this._names = {}, this._prefixes = u, this._parent = i;
    }
    toName(u) {
      return u instanceof t.Name ? u : this.name(u);
    }
    name(u) {
      return new t.Name(this._newName(u));
    }
    _newName(u) {
      const i = this._names[u] || this._nameGroup(u);
      return `${u}${i.index++}`;
    }
    _nameGroup(u) {
      var i, d;
      if (!((d = (i = this._parent) === null || i === void 0 ? void 0 : i._prefixes) === null || d === void 0) && d.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  e.Scope = a;
  class s extends t.Name {
    constructor(u, i) {
      super(i), this.prefix = u;
    }
    setValue(u, { property: i, itemIndex: d }) {
      this.value = u, this.scopePath = (0, t._)`.${new t.Name(i)}[${d}]`;
    }
  }
  e.ValueScopeName = s;
  const o = (0, t._)`\n`;
  class c extends a {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new s(u, this._newName(u));
    }
    value(u, i) {
      var d;
      if (i.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const v = this.toName(u), { prefix: $ } = v, y = (d = i.key) !== null && d !== void 0 ? d : i.ref;
      let g = this._values[$];
      if (g) {
        const _ = g.get(y);
        if (_)
          return _;
      } else
        g = this._values[$] = /* @__PURE__ */ new Map();
      g.set(y, v);
      const h = this._scope[$] || (this._scope[$] = []), m = h.length;
      return h[m] = i.ref, v.setValue(i, { property: $, itemIndex: m }), v;
    }
    getValue(u, i) {
      const d = this._values[u];
      if (d)
        return d.get(i);
    }
    scopeRefs(u, i = this._values) {
      return this._reduceValues(i, (d) => {
        if (d.scopePath === void 0)
          throw new Error(`CodeGen: name "${d}" has no value`);
        return (0, t._)`${u}${d.scopePath}`;
      });
    }
    scopeCode(u = this._values, i, d) {
      return this._reduceValues(u, (v) => {
        if (v.value === void 0)
          throw new Error(`CodeGen: name "${v}" has no value`);
        return v.value.code;
      }, i, d);
    }
    _reduceValues(u, i, d = {}, v) {
      let $ = t.nil;
      for (const y in u) {
        const g = u[y];
        if (!g)
          continue;
        const h = d[y] = d[y] || /* @__PURE__ */ new Map();
        g.forEach((m) => {
          if (h.has(m))
            return;
          h.set(m, r.Started);
          let _ = i(m);
          if (_) {
            const P = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            $ = (0, t._)`${$}${P} ${m} = ${_};${this.opts._n}`;
          } else if (_ = v == null ? void 0 : v(m))
            $ = (0, t._)`${$}${_}${this.opts._n}`;
          else
            throw new n(m);
          h.set(m, r.Completed);
        });
      }
      return $;
    }
  }
  e.ValueScope = c;
})(Go);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Ar, n = Go;
  var r = Ar;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return r.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return r.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return r.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } });
  var a = Go;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return a.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return a.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return a.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return a.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class s {
    optimizeNodes() {
      return this;
    }
    optimizeNames(p, f) {
      return this;
    }
  }
  class o extends s {
    constructor(p, f, S) {
      super(), this.varKind = p, this.name = f, this.rhs = S;
    }
    render({ es5: p, _n: f }) {
      const S = p ? n.varKinds.var : this.varKind, A = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${S} ${this.name}${A};` + f;
    }
    optimizeNames(p, f) {
      if (p[this.name.str])
        return this.rhs && (this.rhs = I(this.rhs, p, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class c extends s {
    constructor(p, f, S) {
      super(), this.lhs = p, this.rhs = f, this.sideEffects = S;
    }
    render({ _n: p }) {
      return `${this.lhs} = ${this.rhs};` + p;
    }
    optimizeNames(p, f) {
      if (!(this.lhs instanceof t.Name && !p[this.lhs.str] && !this.sideEffects))
        return this.rhs = I(this.rhs, p, f), this;
    }
    get names() {
      const p = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return de(p, this.rhs);
    }
  }
  class l extends c {
    constructor(p, f, S, A) {
      super(p, S, A), this.op = f;
    }
    render({ _n: p }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + p;
    }
  }
  class u extends s {
    constructor(p) {
      super(), this.label = p, this.names = {};
    }
    render({ _n: p }) {
      return `${this.label}:` + p;
    }
  }
  class i extends s {
    constructor(p) {
      super(), this.label = p, this.names = {};
    }
    render({ _n: p }) {
      return `break${this.label ? ` ${this.label}` : ""};` + p;
    }
  }
  class d extends s {
    constructor(p) {
      super(), this.error = p;
    }
    render({ _n: p }) {
      return `throw ${this.error};` + p;
    }
    get names() {
      return this.error.names;
    }
  }
  class v extends s {
    constructor(p) {
      super(), this.code = p;
    }
    render({ _n: p }) {
      return `${this.code};` + p;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(p, f) {
      return this.code = I(this.code, p, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class $ extends s {
    constructor(p = []) {
      super(), this.nodes = p;
    }
    render(p) {
      return this.nodes.reduce((f, S) => f + S.render(p), "");
    }
    optimizeNodes() {
      const { nodes: p } = this;
      let f = p.length;
      for (; f--; ) {
        const S = p[f].optimizeNodes();
        Array.isArray(S) ? p.splice(f, 1, ...S) : S ? p[f] = S : p.splice(f, 1);
      }
      return p.length > 0 ? this : void 0;
    }
    optimizeNames(p, f) {
      const { nodes: S } = this;
      let A = S.length;
      for (; A--; ) {
        const N = S[A];
        N.optimizeNames(p, f) || (D(p, N.names), S.splice(A, 1));
      }
      return S.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((p, f) => J(p, f.names), {});
    }
  }
  class y extends $ {
    render(p) {
      return "{" + p._n + super.render(p) + "}" + p._n;
    }
  }
  class g extends $ {
  }
  class h extends y {
  }
  h.kind = "else";
  class m extends y {
    constructor(p, f) {
      super(f), this.condition = p;
    }
    render(p) {
      let f = `if(${this.condition})` + super.render(p);
      return this.else && (f += "else " + this.else.render(p)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const p = this.condition;
      if (p === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const S = f.optimizeNodes();
        f = this.else = Array.isArray(S) ? new h(S) : S;
      }
      if (f)
        return p === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(V(p), f instanceof m ? [f] : f.nodes);
      if (!(p === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(p, f) {
      var S;
      if (this.else = (S = this.else) === null || S === void 0 ? void 0 : S.optimizeNames(p, f), !!(super.optimizeNames(p, f) || this.else))
        return this.condition = I(this.condition, p, f), this;
    }
    get names() {
      const p = super.names;
      return de(p, this.condition), this.else && J(p, this.else.names), p;
    }
  }
  m.kind = "if";
  class _ extends y {
  }
  _.kind = "for";
  class P extends _ {
    constructor(p) {
      super(), this.iteration = p;
    }
    render(p) {
      return `for(${this.iteration})` + super.render(p);
    }
    optimizeNames(p, f) {
      if (super.optimizeNames(p, f))
        return this.iteration = I(this.iteration, p, f), this;
    }
    get names() {
      return J(super.names, this.iteration.names);
    }
  }
  class O extends _ {
    constructor(p, f, S, A) {
      super(), this.varKind = p, this.name = f, this.from = S, this.to = A;
    }
    render(p) {
      const f = p.es5 ? n.varKinds.var : this.varKind, { name: S, from: A, to: N } = this;
      return `for(${f} ${S}=${A}; ${S}<${N}; ${S}++)` + super.render(p);
    }
    get names() {
      const p = de(super.names, this.from);
      return de(p, this.to);
    }
  }
  class T extends _ {
    constructor(p, f, S, A) {
      super(), this.loop = p, this.varKind = f, this.name = S, this.iterable = A;
    }
    render(p) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(p);
    }
    optimizeNames(p, f) {
      if (super.optimizeNames(p, f))
        return this.iterable = I(this.iterable, p, f), this;
    }
    get names() {
      return J(super.names, this.iterable.names);
    }
  }
  class L extends y {
    constructor(p, f, S) {
      super(), this.name = p, this.args = f, this.async = S;
    }
    render(p) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(p);
    }
  }
  L.kind = "func";
  class q extends $ {
    render(p) {
      return "return " + super.render(p);
    }
  }
  q.kind = "return";
  class ae extends y {
    render(p) {
      let f = "try" + super.render(p);
      return this.catch && (f += this.catch.render(p)), this.finally && (f += this.finally.render(p)), f;
    }
    optimizeNodes() {
      var p, f;
      return super.optimizeNodes(), (p = this.catch) === null || p === void 0 || p.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(p, f) {
      var S, A;
      return super.optimizeNames(p, f), (S = this.catch) === null || S === void 0 || S.optimizeNames(p, f), (A = this.finally) === null || A === void 0 || A.optimizeNames(p, f), this;
    }
    get names() {
      const p = super.names;
      return this.catch && J(p, this.catch.names), this.finally && J(p, this.finally.names), p;
    }
  }
  class F extends y {
    constructor(p) {
      super(), this.error = p;
    }
    render(p) {
      return `catch(${this.error})` + super.render(p);
    }
  }
  F.kind = "catch";
  class K extends y {
    render(p) {
      return "finally" + super.render(p);
    }
  }
  K.kind = "finally";
  class ce {
    constructor(p, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = p, this._scope = new n.Scope({ parent: p }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(p) {
      return this._scope.name(p);
    }
    // reserves unique name in the external scope
    scopeName(p) {
      return this._extScope.name(p);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(p, f) {
      const S = this._extScope.value(p, f);
      return (this._values[S.prefix] || (this._values[S.prefix] = /* @__PURE__ */ new Set())).add(S), S;
    }
    getScopeValue(p, f) {
      return this._extScope.getValue(p, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(p) {
      return this._extScope.scopeRefs(p, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(p, f, S, A) {
      const N = this._scope.toName(f);
      return S !== void 0 && A && (this._constants[N.str] = S), this._leafNode(new o(p, N, S)), N;
    }
    // `const` declaration (`var` in es5 mode)
    const(p, f, S) {
      return this._def(n.varKinds.const, p, f, S);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(p, f, S) {
      return this._def(n.varKinds.let, p, f, S);
    }
    // `var` declaration with optional assignment
    var(p, f, S) {
      return this._def(n.varKinds.var, p, f, S);
    }
    // assignment code
    assign(p, f, S) {
      return this._leafNode(new c(p, f, S));
    }
    // `+=` code
    add(p, f) {
      return this._leafNode(new l(p, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(p) {
      return typeof p == "function" ? p() : p !== t.nil && this._leafNode(new v(p)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...p) {
      const f = ["{"];
      for (const [S, A] of p)
        f.length > 1 && f.push(","), f.push(S), (S !== A || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, A));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(p, f, S) {
      if (this._blockNode(new m(p)), f && S)
        this.code(f).else().code(S).endIf();
      else if (f)
        this.code(f).endIf();
      else if (S)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(p) {
      return this._elseNode(new m(p));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new h());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, h);
    }
    _for(p, f) {
      return this._blockNode(p), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(p, f) {
      return this._for(new P(p), f);
    }
    // `for` statement for a range of values
    forRange(p, f, S, A, N = this.opts.es5 ? n.varKinds.var : n.varKinds.let) {
      const G = this._scope.toName(p);
      return this._for(new O(N, G, f, S), () => A(G));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(p, f, S, A = n.varKinds.const) {
      const N = this._scope.toName(p);
      if (this.opts.es5) {
        const G = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${G}.length`, (B) => {
          this.var(N, (0, t._)`${G}[${B}]`), S(N);
        });
      }
      return this._for(new T("of", A, N, f), () => S(N));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(p, f, S, A = this.opts.es5 ? n.varKinds.var : n.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(p, (0, t._)`Object.keys(${f})`, S);
      const N = this._scope.toName(p);
      return this._for(new T("in", A, N, f), () => S(N));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(_);
    }
    // `label` statement
    label(p) {
      return this._leafNode(new u(p));
    }
    // `break` statement
    break(p) {
      return this._leafNode(new i(p));
    }
    // `return` statement
    return(p) {
      const f = new q();
      if (this._blockNode(f), this.code(p), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(q);
    }
    // `try` statement
    try(p, f, S) {
      if (!f && !S)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const A = new ae();
      if (this._blockNode(A), this.code(p), f) {
        const N = this.name("e");
        this._currNode = A.catch = new F(N), f(N);
      }
      return S && (this._currNode = A.finally = new K(), this.code(S)), this._endBlockNode(F, K);
    }
    // `throw` statement
    throw(p) {
      return this._leafNode(new d(p));
    }
    // start self-balancing block
    block(p, f) {
      return this._blockStarts.push(this._nodes.length), p && this.code(p).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(p) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const S = this._nodes.length - f;
      if (S < 0 || p !== void 0 && S !== p)
        throw new Error(`CodeGen: wrong number of nodes: ${S} vs ${p} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(p, f = t.nil, S, A) {
      return this._blockNode(new L(p, f, S)), A && this.code(A).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(L);
    }
    optimize(p = 1) {
      for (; p-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(p) {
      return this._currNode.nodes.push(p), this;
    }
    _blockNode(p) {
      this._currNode.nodes.push(p), this._nodes.push(p);
    }
    _endBlockNode(p, f) {
      const S = this._currNode;
      if (S instanceof p || f && S instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${p.kind}/${f.kind}` : p.kind}"`);
    }
    _elseNode(p) {
      const f = this._currNode;
      if (!(f instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = p, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const p = this._nodes;
      return p[p.length - 1];
    }
    set _currNode(p) {
      const f = this._nodes;
      f[f.length - 1] = p;
    }
  }
  e.CodeGen = ce;
  function J(x, p) {
    for (const f in p)
      x[f] = (x[f] || 0) + (p[f] || 0);
    return x;
  }
  function de(x, p) {
    return p instanceof t._CodeOrName ? J(x, p.names) : x;
  }
  function I(x, p, f) {
    if (x instanceof t.Name)
      return S(x);
    if (!A(x))
      return x;
    return new t._Code(x._items.reduce((N, G) => (G instanceof t.Name && (G = S(G)), G instanceof t._Code ? N.push(...G._items) : N.push(G), N), []));
    function S(N) {
      const G = f[N.str];
      return G === void 0 || p[N.str] !== 1 ? N : (delete p[N.str], G);
    }
    function A(N) {
      return N instanceof t._Code && N._items.some((G) => G instanceof t.Name && p[G.str] === 1 && f[G.str] !== void 0);
    }
  }
  function D(x, p) {
    for (const f in p)
      x[f] = (x[f] || 0) - (p[f] || 0);
  }
  function V(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, t._)`!${E(x)}`;
  }
  e.not = V;
  const C = b(e.operators.AND);
  function R(...x) {
    return x.reduce(C);
  }
  e.and = R;
  const j = b(e.operators.OR);
  function w(...x) {
    return x.reduce(j);
  }
  e.or = w;
  function b(x) {
    return (p, f) => p === t.nil ? f : f === t.nil ? p : (0, t._)`${E(p)} ${x} ${E(f)}`;
  }
  function E(x) {
    return x instanceof t.Name ? x : (0, t._)`(${x})`;
  }
})(ee);
var U = {};
Object.defineProperty(U, "__esModule", { value: !0 });
U.checkStrictMode = U.getErrorPath = U.Type = U.useFunc = U.setEvaluated = U.evaluatedPropsToName = U.mergeEvaluated = U.eachItem = U.unescapeJsonPointer = U.escapeJsonPointer = U.escapeFragment = U.unescapeFragment = U.schemaRefOrVal = U.schemaHasRulesButRef = U.schemaHasRules = U.checkUnknownRules = U.alwaysValidSchema = U.toHash = void 0;
const me = ee, ix = Ar;
function cx(e) {
  const t = {};
  for (const n of e)
    t[n] = !0;
  return t;
}
U.toHash = cx;
function lx(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Sf(e, t), !Pf(t, e.self.RULES.all));
}
U.alwaysValidSchema = lx;
function Sf(e, t = e.schema) {
  const { opts: n, self: r } = e;
  if (!n.strictSchema || typeof t == "boolean")
    return;
  const a = r.RULES.keywords;
  for (const s in t)
    a[s] || kf(e, `unknown keyword: "${s}"`);
}
U.checkUnknownRules = Sf;
function Pf(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const n in e)
    if (t[n])
      return !0;
  return !1;
}
U.schemaHasRules = Pf;
function ux(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const n in e)
    if (n !== "$ref" && t.all[n])
      return !0;
  return !1;
}
U.schemaHasRulesButRef = ux;
function px({ topSchemaRef: e, schemaPath: t }, n, r, a) {
  if (!a) {
    if (typeof n == "number" || typeof n == "boolean")
      return n;
    if (typeof n == "string")
      return (0, me._)`${n}`;
  }
  return (0, me._)`${e}${t}${(0, me.getProperty)(r)}`;
}
U.schemaRefOrVal = px;
function dx(e) {
  return Rf(decodeURIComponent(e));
}
U.unescapeFragment = dx;
function fx(e) {
  return encodeURIComponent($c(e));
}
U.escapeFragment = fx;
function $c(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
U.escapeJsonPointer = $c;
function Rf(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
U.unescapeJsonPointer = Rf;
function mx(e, t) {
  if (Array.isArray(e))
    for (const n of e)
      t(n);
  else
    t(e);
}
U.eachItem = mx;
function hu({ mergeNames: e, mergeToName: t, mergeValues: n, resultToName: r }) {
  return (a, s, o, c) => {
    const l = o === void 0 ? s : o instanceof me.Name ? (s instanceof me.Name ? e(a, s, o) : t(a, s, o), o) : s instanceof me.Name ? (t(a, o, s), s) : n(s, o);
    return c === me.Name && !(l instanceof me.Name) ? r(a, l) : l;
  };
}
U.mergeEvaluated = {
  props: hu({
    mergeNames: (e, t, n) => e.if((0, me._)`${n} !== true && ${t} !== undefined`, () => {
      e.if((0, me._)`${t} === true`, () => e.assign(n, !0), () => e.assign(n, (0, me._)`${n} || {}`).code((0, me._)`Object.assign(${n}, ${t})`));
    }),
    mergeToName: (e, t, n) => e.if((0, me._)`${n} !== true`, () => {
      t === !0 ? e.assign(n, !0) : (e.assign(n, (0, me._)`${n} || {}`), xc(e, n, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Of
  }),
  items: hu({
    mergeNames: (e, t, n) => e.if((0, me._)`${n} !== true && ${t} !== undefined`, () => e.assign(n, (0, me._)`${t} === true ? true : ${n} > ${t} ? ${n} : ${t}`)),
    mergeToName: (e, t, n) => e.if((0, me._)`${n} !== true`, () => e.assign(n, t === !0 ? !0 : (0, me._)`${n} > ${t} ? ${n} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Of(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const n = e.var("props", (0, me._)`{}`);
  return t !== void 0 && xc(e, n, t), n;
}
U.evaluatedPropsToName = Of;
function xc(e, t, n) {
  Object.keys(n).forEach((r) => e.assign((0, me._)`${t}${(0, me.getProperty)(r)}`, !0));
}
U.setEvaluated = xc;
const vu = {};
function hx(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: vu[t.code] || (vu[t.code] = new ix._Code(t.code))
  });
}
U.useFunc = hx;
var Ko;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Ko || (U.Type = Ko = {}));
function vx(e, t, n) {
  if (e instanceof me.Name) {
    const r = t === Ko.Num;
    return n ? r ? (0, me._)`"[" + ${e} + "]"` : (0, me._)`"['" + ${e} + "']"` : r ? (0, me._)`"/" + ${e}` : (0, me._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return n ? (0, me.getProperty)(e).toString() : "/" + $c(e);
}
U.getErrorPath = vx;
function kf(e, t, n = e.opts.strictSchema) {
  if (n) {
    if (t = `strict mode: ${t}`, n === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
U.checkStrictMode = kf;
var St = {};
Object.defineProperty(St, "__esModule", { value: !0 });
const Le = ee, yx = {
  // validation function arguments
  data: new Le.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Le.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Le.Name("instancePath"),
  parentData: new Le.Name("parentData"),
  parentDataProperty: new Le.Name("parentDataProperty"),
  rootData: new Le.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Le.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Le.Name("vErrors"),
  // null or array of validation errors
  errors: new Le.Name("errors"),
  // counter of validation errors
  this: new Le.Name("this"),
  // "globals"
  self: new Le.Name("self"),
  scope: new Le.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Le.Name("json"),
  jsonPos: new Le.Name("jsonPos"),
  jsonLen: new Le.Name("jsonLen"),
  jsonPart: new Le.Name("jsonPart")
};
St.default = yx;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ee, n = U, r = St;
  e.keywordError = {
    message: ({ keyword: h }) => (0, t.str)`must pass "${h}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: h, schemaType: m }) => m ? (0, t.str)`"${h}" keyword must be ${m} ($data)` : (0, t.str)`"${h}" keyword is invalid ($data)`
  };
  function a(h, m = e.keywordError, _, P) {
    const { it: O } = h, { gen: T, compositeRule: L, allErrors: q } = O, ae = d(h, m, _);
    P ?? (L || q) ? l(T, ae) : u(O, (0, t._)`[${ae}]`);
  }
  e.reportError = a;
  function s(h, m = e.keywordError, _) {
    const { it: P } = h, { gen: O, compositeRule: T, allErrors: L } = P, q = d(h, m, _);
    l(O, q), T || L || u(P, r.default.vErrors);
  }
  e.reportExtraError = s;
  function o(h, m) {
    h.assign(r.default.errors, m), h.if((0, t._)`${r.default.vErrors} !== null`, () => h.if(m, () => h.assign((0, t._)`${r.default.vErrors}.length`, m), () => h.assign(r.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function c({ gen: h, keyword: m, schemaValue: _, data: P, errsCount: O, it: T }) {
    if (O === void 0)
      throw new Error("ajv implementation error");
    const L = h.name("err");
    h.forRange("i", O, r.default.errors, (q) => {
      h.const(L, (0, t._)`${r.default.vErrors}[${q}]`), h.if((0, t._)`${L}.instancePath === undefined`, () => h.assign((0, t._)`${L}.instancePath`, (0, t.strConcat)(r.default.instancePath, T.errorPath))), h.assign((0, t._)`${L}.schemaPath`, (0, t.str)`${T.errSchemaPath}/${m}`), T.opts.verbose && (h.assign((0, t._)`${L}.schema`, _), h.assign((0, t._)`${L}.data`, P));
    });
  }
  e.extendErrors = c;
  function l(h, m) {
    const _ = h.const("err", m);
    h.if((0, t._)`${r.default.vErrors} === null`, () => h.assign(r.default.vErrors, (0, t._)`[${_}]`), (0, t._)`${r.default.vErrors}.push(${_})`), h.code((0, t._)`${r.default.errors}++`);
  }
  function u(h, m) {
    const { gen: _, validateName: P, schemaEnv: O } = h;
    O.$async ? _.throw((0, t._)`new ${h.ValidationError}(${m})`) : (_.assign((0, t._)`${P}.errors`, m), _.return(!1));
  }
  const i = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function d(h, m, _) {
    const { createErrors: P } = h.it;
    return P === !1 ? (0, t._)`{}` : v(h, m, _);
  }
  function v(h, m, _ = {}) {
    const { gen: P, it: O } = h, T = [
      $(O, _),
      y(h, _)
    ];
    return g(h, m, T), P.object(...T);
  }
  function $({ errorPath: h }, { instancePath: m }) {
    const _ = m ? (0, t.str)`${h}${(0, n.getErrorPath)(m, n.Type.Str)}` : h;
    return [r.default.instancePath, (0, t.strConcat)(r.default.instancePath, _)];
  }
  function y({ keyword: h, it: { errSchemaPath: m } }, { schemaPath: _, parentSchema: P }) {
    let O = P ? m : (0, t.str)`${m}/${h}`;
    return _ && (O = (0, t.str)`${O}${(0, n.getErrorPath)(_, n.Type.Str)}`), [i.schemaPath, O];
  }
  function g(h, { params: m, message: _ }, P) {
    const { keyword: O, data: T, schemaValue: L, it: q } = h, { opts: ae, propertyName: F, topSchemaRef: K, schemaPath: ce } = q;
    P.push([i.keyword, O], [i.params, typeof m == "function" ? m(h) : m || (0, t._)`{}`]), ae.messages && P.push([i.message, typeof _ == "function" ? _(h) : _]), ae.verbose && P.push([i.schema, L], [i.parentSchema, (0, t._)`${K}${ce}`], [r.default.data, T]), F && P.push([i.propertyName, F]);
  }
})(Kr);
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.boolOrEmptySchema = Yn.topBoolOrEmptySchema = void 0;
const gx = Kr, bx = ee, $x = St, xx = {
  message: "boolean schema is false"
};
function _x(e) {
  const { gen: t, schema: n, validateName: r } = e;
  n === !1 ? Tf(e, !1) : typeof n == "object" && n.$async === !0 ? t.return($x.default.data) : (t.assign((0, bx._)`${r}.errors`, null), t.return(!0));
}
Yn.topBoolOrEmptySchema = _x;
function wx(e, t) {
  const { gen: n, schema: r } = e;
  r === !1 ? (n.var(t, !1), Tf(e)) : n.var(t, !0);
}
Yn.boolOrEmptySchema = wx;
function Tf(e, t) {
  const { gen: n, data: r } = e, a = {
    gen: n,
    keyword: "false schema",
    data: r,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, gx.reportError)(a, xx, void 0, t);
}
var Oe = {}, Sn = {};
Object.defineProperty(Sn, "__esModule", { value: !0 });
Sn.getRules = Sn.isJSONType = void 0;
const Ex = ["string", "number", "integer", "boolean", "null", "object", "array"], Sx = new Set(Ex);
function Px(e) {
  return typeof e == "string" && Sx.has(e);
}
Sn.isJSONType = Px;
function Rx() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Sn.getRules = Rx;
var kt = {};
Object.defineProperty(kt, "__esModule", { value: !0 });
kt.shouldUseRule = kt.shouldUseGroup = kt.schemaHasRulesForType = void 0;
function Ox({ schema: e, self: t }, n) {
  const r = t.RULES.types[n];
  return r && r !== !0 && jf(e, r);
}
kt.schemaHasRulesForType = Ox;
function jf(e, t) {
  return t.rules.some((n) => Nf(e, n));
}
kt.shouldUseGroup = jf;
function Nf(e, t) {
  var n;
  return e[t.keyword] !== void 0 || ((n = t.definition.implements) === null || n === void 0 ? void 0 : n.some((r) => e[r] !== void 0));
}
kt.shouldUseRule = Nf;
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.reportTypeError = Oe.checkDataTypes = Oe.checkDataType = Oe.coerceAndCheckDataType = Oe.getJSONTypes = Oe.getSchemaTypes = Oe.DataType = void 0;
const kx = Sn, Tx = kt, jx = Kr, Z = ee, Af = U;
var Bn;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Bn || (Oe.DataType = Bn = {}));
function Nx(e) {
  const t = Cf(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Oe.getSchemaTypes = Nx;
function Cf(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(kx.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Oe.getJSONTypes = Cf;
function Ax(e, t) {
  const { gen: n, data: r, opts: a } = e, s = Cx(t, a.coerceTypes), o = t.length > 0 && !(s.length === 0 && t.length === 1 && (0, Tx.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const c = _c(t, r, a.strictNumbers, Bn.Wrong);
    n.if(c, () => {
      s.length ? Ix(e, t, s) : wc(e);
    });
  }
  return o;
}
Oe.coerceAndCheckDataType = Ax;
const If = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Cx(e, t) {
  return t ? e.filter((n) => If.has(n) || t === "array" && n === "array") : [];
}
function Ix(e, t, n) {
  const { gen: r, data: a, opts: s } = e, o = r.let("dataType", (0, Z._)`typeof ${a}`), c = r.let("coerced", (0, Z._)`undefined`);
  s.coerceTypes === "array" && r.if((0, Z._)`${o} == 'object' && Array.isArray(${a}) && ${a}.length == 1`, () => r.assign(a, (0, Z._)`${a}[0]`).assign(o, (0, Z._)`typeof ${a}`).if(_c(t, a, s.strictNumbers), () => r.assign(c, a))), r.if((0, Z._)`${c} !== undefined`);
  for (const u of n)
    (If.has(u) || u === "array" && s.coerceTypes === "array") && l(u);
  r.else(), wc(e), r.endIf(), r.if((0, Z._)`${c} !== undefined`, () => {
    r.assign(a, c), Dx(e, c);
  });
  function l(u) {
    switch (u) {
      case "string":
        r.elseIf((0, Z._)`${o} == "number" || ${o} == "boolean"`).assign(c, (0, Z._)`"" + ${a}`).elseIf((0, Z._)`${a} === null`).assign(c, (0, Z._)`""`);
        return;
      case "number":
        r.elseIf((0, Z._)`${o} == "boolean" || ${a} === null
              || (${o} == "string" && ${a} && ${a} == +${a})`).assign(c, (0, Z._)`+${a}`);
        return;
      case "integer":
        r.elseIf((0, Z._)`${o} === "boolean" || ${a} === null
              || (${o} === "string" && ${a} && ${a} == +${a} && !(${a} % 1))`).assign(c, (0, Z._)`+${a}`);
        return;
      case "boolean":
        r.elseIf((0, Z._)`${a} === "false" || ${a} === 0 || ${a} === null`).assign(c, !1).elseIf((0, Z._)`${a} === "true" || ${a} === 1`).assign(c, !0);
        return;
      case "null":
        r.elseIf((0, Z._)`${a} === "" || ${a} === 0 || ${a} === false`), r.assign(c, null);
        return;
      case "array":
        r.elseIf((0, Z._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${a} === null`).assign(c, (0, Z._)`[${a}]`);
    }
  }
}
function Dx({ gen: e, parentData: t, parentDataProperty: n }, r) {
  e.if((0, Z._)`${t} !== undefined`, () => e.assign((0, Z._)`${t}[${n}]`, r));
}
function Ho(e, t, n, r = Bn.Correct) {
  const a = r === Bn.Correct ? Z.operators.EQ : Z.operators.NEQ;
  let s;
  switch (e) {
    case "null":
      return (0, Z._)`${t} ${a} null`;
    case "array":
      s = (0, Z._)`Array.isArray(${t})`;
      break;
    case "object":
      s = (0, Z._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      s = o((0, Z._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      s = o();
      break;
    default:
      return (0, Z._)`typeof ${t} ${a} ${e}`;
  }
  return r === Bn.Correct ? s : (0, Z.not)(s);
  function o(c = Z.nil) {
    return (0, Z.and)((0, Z._)`typeof ${t} == "number"`, c, n ? (0, Z._)`isFinite(${t})` : Z.nil);
  }
}
Oe.checkDataType = Ho;
function _c(e, t, n, r) {
  if (e.length === 1)
    return Ho(e[0], t, n, r);
  let a;
  const s = (0, Af.toHash)(e);
  if (s.array && s.object) {
    const o = (0, Z._)`typeof ${t} != "object"`;
    a = s.null ? o : (0, Z._)`!${t} || ${o}`, delete s.null, delete s.array, delete s.object;
  } else
    a = Z.nil;
  s.number && delete s.integer;
  for (const o in s)
    a = (0, Z.and)(a, Ho(o, t, n, r));
  return a;
}
Oe.checkDataTypes = _c;
const Lx = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Z._)`{type: ${e}}` : (0, Z._)`{type: ${t}}`
};
function wc(e) {
  const t = Fx(e);
  (0, jx.reportError)(t, Lx);
}
Oe.reportTypeError = wc;
function Fx(e) {
  const { gen: t, data: n, schema: r } = e, a = (0, Af.schemaRefOrVal)(e, r, "type");
  return {
    gen: t,
    keyword: "type",
    data: n,
    schema: r.type,
    schemaCode: a,
    schemaValue: a,
    parentSchema: r,
    params: {},
    it: e
  };
}
var ms = {};
Object.defineProperty(ms, "__esModule", { value: !0 });
ms.assignDefaults = void 0;
const Nn = ee, Mx = U;
function Ux(e, t) {
  const { properties: n, items: r } = e.schema;
  if (t === "object" && n)
    for (const a in n)
      yu(e, a, n[a].default);
  else t === "array" && Array.isArray(r) && r.forEach((a, s) => yu(e, s, a.default));
}
ms.assignDefaults = Ux;
function yu(e, t, n) {
  const { gen: r, compositeRule: a, data: s, opts: o } = e;
  if (n === void 0)
    return;
  const c = (0, Nn._)`${s}${(0, Nn.getProperty)(t)}`;
  if (a) {
    (0, Mx.checkStrictMode)(e, `default is ignored for: ${c}`);
    return;
  }
  let l = (0, Nn._)`${c} === undefined`;
  o.useDefaults === "empty" && (l = (0, Nn._)`${l} || ${c} === null || ${c} === ""`), r.if(l, (0, Nn._)`${c} = ${(0, Nn.stringify)(n)}`);
}
var wt = {}, ne = {};
Object.defineProperty(ne, "__esModule", { value: !0 });
ne.validateUnion = ne.validateArray = ne.usePattern = ne.callValidateCode = ne.schemaProperties = ne.allSchemaProperties = ne.noPropertyInData = ne.propertyInData = ne.isOwnProperty = ne.hasPropFunc = ne.reportMissingProp = ne.checkMissingProp = ne.checkReportMissingProp = void 0;
const be = ee, Ec = U, It = St, zx = U;
function qx(e, t) {
  const { gen: n, data: r, it: a } = e;
  n.if(Pc(n, r, t, a.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, be._)`${t}` }, !0), e.error();
  });
}
ne.checkReportMissingProp = qx;
function Vx({ gen: e, data: t, it: { opts: n } }, r, a) {
  return (0, be.or)(...r.map((s) => (0, be.and)(Pc(e, t, s, n.ownProperties), (0, be._)`${a} = ${s}`)));
}
ne.checkMissingProp = Vx;
function Bx(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ne.reportMissingProp = Bx;
function Df(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, be._)`Object.prototype.hasOwnProperty`
  });
}
ne.hasPropFunc = Df;
function Sc(e, t, n) {
  return (0, be._)`${Df(e)}.call(${t}, ${n})`;
}
ne.isOwnProperty = Sc;
function Gx(e, t, n, r) {
  const a = (0, be._)`${t}${(0, be.getProperty)(n)} !== undefined`;
  return r ? (0, be._)`${a} && ${Sc(e, t, n)}` : a;
}
ne.propertyInData = Gx;
function Pc(e, t, n, r) {
  const a = (0, be._)`${t}${(0, be.getProperty)(n)} === undefined`;
  return r ? (0, be.or)(a, (0, be.not)(Sc(e, t, n))) : a;
}
ne.noPropertyInData = Pc;
function Lf(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ne.allSchemaProperties = Lf;
function Kx(e, t) {
  return Lf(t).filter((n) => !(0, Ec.alwaysValidSchema)(e, t[n]));
}
ne.schemaProperties = Kx;
function Hx({ schemaCode: e, data: t, it: { gen: n, topSchemaRef: r, schemaPath: a, errorPath: s }, it: o }, c, l, u) {
  const i = u ? (0, be._)`${e}, ${t}, ${r}${a}` : t, d = [
    [It.default.instancePath, (0, be.strConcat)(It.default.instancePath, s)],
    [It.default.parentData, o.parentData],
    [It.default.parentDataProperty, o.parentDataProperty],
    [It.default.rootData, It.default.rootData]
  ];
  o.opts.dynamicRef && d.push([It.default.dynamicAnchors, It.default.dynamicAnchors]);
  const v = (0, be._)`${i}, ${n.object(...d)}`;
  return l !== be.nil ? (0, be._)`${c}.call(${l}, ${v})` : (0, be._)`${c}(${v})`;
}
ne.callValidateCode = Hx;
const Wx = (0, be._)`new RegExp`;
function Jx({ gen: e, it: { opts: t } }, n) {
  const r = t.unicodeRegExp ? "u" : "", { regExp: a } = t.code, s = a(n, r);
  return e.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, be._)`${a.code === "new RegExp" ? Wx : (0, zx.useFunc)(e, a)}(${n}, ${r})`
  });
}
ne.usePattern = Jx;
function Xx(e) {
  const { gen: t, data: n, keyword: r, it: a } = e, s = t.name("valid");
  if (a.allErrors) {
    const c = t.let("valid", !0);
    return o(() => t.assign(c, !1)), c;
  }
  return t.var(s, !0), o(() => t.break()), s;
  function o(c) {
    const l = t.const("len", (0, be._)`${n}.length`);
    t.forRange("i", 0, l, (u) => {
      e.subschema({
        keyword: r,
        dataProp: u,
        dataPropType: Ec.Type.Num
      }, s), t.if((0, be.not)(s), c);
    });
  }
}
ne.validateArray = Xx;
function Yx(e) {
  const { gen: t, schema: n, keyword: r, it: a } = e;
  if (!Array.isArray(n))
    throw new Error("ajv implementation error");
  if (n.some((l) => (0, Ec.alwaysValidSchema)(a, l)) && !a.opts.unevaluated)
    return;
  const o = t.let("valid", !1), c = t.name("_valid");
  t.block(() => n.forEach((l, u) => {
    const i = e.subschema({
      keyword: r,
      schemaProp: u,
      compositeRule: !0
    }, c);
    t.assign(o, (0, be._)`${o} || ${c}`), e.mergeValidEvaluated(i, c) || t.if((0, be.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
ne.validateUnion = Yx;
Object.defineProperty(wt, "__esModule", { value: !0 });
wt.validateKeywordUsage = wt.validSchemaType = wt.funcKeywordCode = wt.macroKeywordCode = void 0;
const ze = ee, yn = St, Qx = ne, Zx = Kr;
function e_(e, t) {
  const { gen: n, keyword: r, schema: a, parentSchema: s, it: o } = e, c = t.macro.call(o.self, a, s, o), l = Ff(n, r, c);
  o.opts.validateSchema !== !1 && o.self.validateSchema(c, !0);
  const u = n.name("valid");
  e.subschema({
    schema: c,
    schemaPath: ze.nil,
    errSchemaPath: `${o.errSchemaPath}/${r}`,
    topSchemaRef: l,
    compositeRule: !0
  }, u), e.pass(u, () => e.error(!0));
}
wt.macroKeywordCode = e_;
function t_(e, t) {
  var n;
  const { gen: r, keyword: a, schema: s, parentSchema: o, $data: c, it: l } = e;
  r_(l, t);
  const u = !c && t.compile ? t.compile.call(l.self, s, o, l) : t.validate, i = Ff(r, a, u), d = r.let("valid");
  e.block$data(d, v), e.ok((n = t.valid) !== null && n !== void 0 ? n : d);
  function v() {
    if (t.errors === !1)
      g(), t.modifying && gu(e), h(() => e.error());
    else {
      const m = t.async ? $() : y();
      t.modifying && gu(e), h(() => n_(e, m));
    }
  }
  function $() {
    const m = r.let("ruleErrs", null);
    return r.try(() => g((0, ze._)`await `), (_) => r.assign(d, !1).if((0, ze._)`${_} instanceof ${l.ValidationError}`, () => r.assign(m, (0, ze._)`${_}.errors`), () => r.throw(_))), m;
  }
  function y() {
    const m = (0, ze._)`${i}.errors`;
    return r.assign(m, null), g(ze.nil), m;
  }
  function g(m = t.async ? (0, ze._)`await ` : ze.nil) {
    const _ = l.opts.passContext ? yn.default.this : yn.default.self, P = !("compile" in t && !c || t.schema === !1);
    r.assign(d, (0, ze._)`${m}${(0, Qx.callValidateCode)(e, i, _, P)}`, t.modifying);
  }
  function h(m) {
    var _;
    r.if((0, ze.not)((_ = t.valid) !== null && _ !== void 0 ? _ : d), m);
  }
}
wt.funcKeywordCode = t_;
function gu(e) {
  const { gen: t, data: n, it: r } = e;
  t.if(r.parentData, () => t.assign(n, (0, ze._)`${r.parentData}[${r.parentDataProperty}]`));
}
function n_(e, t) {
  const { gen: n } = e;
  n.if((0, ze._)`Array.isArray(${t})`, () => {
    n.assign(yn.default.vErrors, (0, ze._)`${yn.default.vErrors} === null ? ${t} : ${yn.default.vErrors}.concat(${t})`).assign(yn.default.errors, (0, ze._)`${yn.default.vErrors}.length`), (0, Zx.extendErrors)(e);
  }, () => e.error());
}
function r_({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Ff(e, t, n) {
  if (n === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof n == "function" ? { ref: n } : { ref: n, code: (0, ze.stringify)(n) });
}
function a_(e, t, n = !1) {
  return !t.length || t.some((r) => r === "array" ? Array.isArray(e) : r === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == r || n && typeof e > "u");
}
wt.validSchemaType = a_;
function s_({ schema: e, opts: t, self: n, errSchemaPath: r }, a, s) {
  if (Array.isArray(a.keyword) ? !a.keyword.includes(s) : a.keyword !== s)
    throw new Error("ajv implementation error");
  const o = a.dependencies;
  if (o != null && o.some((c) => !Object.prototype.hasOwnProperty.call(e, c)))
    throw new Error(`parent schema must have dependencies of ${s}: ${o.join(",")}`);
  if (a.validateSchema && !a.validateSchema(e[s])) {
    const l = `keyword "${s}" value is invalid at path "${r}": ` + n.errorsText(a.validateSchema.errors);
    if (t.validateSchema === "log")
      n.logger.error(l);
    else
      throw new Error(l);
  }
}
wt.validateKeywordUsage = s_;
var Gt = {};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.extendSubschemaMode = Gt.extendSubschemaData = Gt.getSubschema = void 0;
const bt = ee, Mf = U;
function o_(e, { keyword: t, schemaProp: n, schema: r, schemaPath: a, errSchemaPath: s, topSchemaRef: o }) {
  if (t !== void 0 && r !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const c = e.schema[t];
    return n === void 0 ? {
      schema: c,
      schemaPath: (0, bt._)`${e.schemaPath}${(0, bt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: c[n],
      schemaPath: (0, bt._)`${e.schemaPath}${(0, bt.getProperty)(t)}${(0, bt.getProperty)(n)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Mf.escapeFragment)(n)}`
    };
  }
  if (r !== void 0) {
    if (a === void 0 || s === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: r,
      schemaPath: a,
      topSchemaRef: o,
      errSchemaPath: s
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Gt.getSubschema = o_;
function i_(e, t, { dataProp: n, dataPropType: r, data: a, dataTypes: s, propertyName: o }) {
  if (a !== void 0 && n !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: c } = t;
  if (n !== void 0) {
    const { errorPath: u, dataPathArr: i, opts: d } = t, v = c.let("data", (0, bt._)`${t.data}${(0, bt.getProperty)(n)}`, !0);
    l(v), e.errorPath = (0, bt.str)`${u}${(0, Mf.getErrorPath)(n, r, d.jsPropertySyntax)}`, e.parentDataProperty = (0, bt._)`${n}`, e.dataPathArr = [...i, e.parentDataProperty];
  }
  if (a !== void 0) {
    const u = a instanceof bt.Name ? a : c.let("data", a, !0);
    l(u), o !== void 0 && (e.propertyName = o);
  }
  s && (e.dataTypes = s);
  function l(u) {
    e.data = u, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, u];
  }
}
Gt.extendSubschemaData = i_;
function c_(e, { jtdDiscriminator: t, jtdMetadata: n, compositeRule: r, createErrors: a, allErrors: s }) {
  r !== void 0 && (e.compositeRule = r), a !== void 0 && (e.createErrors = a), s !== void 0 && (e.allErrors = s), e.jtdDiscriminator = t, e.jtdMetadata = n;
}
Gt.extendSubschemaMode = c_;
var Ie = {}, Uf = { exports: {} }, qt = Uf.exports = function(e, t, n) {
  typeof t == "function" && (n = t, t = {}), n = t.cb || n;
  var r = typeof n == "function" ? n : n.pre || function() {
  }, a = n.post || function() {
  };
  ka(t, r, a, e, "", e);
};
qt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
qt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
qt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
qt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function ka(e, t, n, r, a, s, o, c, l, u) {
  if (r && typeof r == "object" && !Array.isArray(r)) {
    t(r, a, s, o, c, l, u);
    for (var i in r) {
      var d = r[i];
      if (Array.isArray(d)) {
        if (i in qt.arrayKeywords)
          for (var v = 0; v < d.length; v++)
            ka(e, t, n, d[v], a + "/" + i + "/" + v, s, a, i, r, v);
      } else if (i in qt.propsKeywords) {
        if (d && typeof d == "object")
          for (var $ in d)
            ka(e, t, n, d[$], a + "/" + i + "/" + l_($), s, a, i, r, $);
      } else (i in qt.keywords || e.allKeys && !(i in qt.skipKeywords)) && ka(e, t, n, d, a + "/" + i, s, a, i, r);
    }
    n(r, a, s, o, c, l, u);
  }
}
function l_(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var u_ = Uf.exports;
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.getSchemaRefs = Ie.resolveUrl = Ie.normalizeId = Ie._getFullPath = Ie.getFullPath = Ie.inlineRef = void 0;
const p_ = U, d_ = cs, f_ = u_, m_ = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function h_(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Wo(e) : t ? zf(e) <= t : !1;
}
Ie.inlineRef = h_;
const v_ = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Wo(e) {
  for (const t in e) {
    if (v_.has(t))
      return !0;
    const n = e[t];
    if (Array.isArray(n) && n.some(Wo) || typeof n == "object" && Wo(n))
      return !0;
  }
  return !1;
}
function zf(e) {
  let t = 0;
  for (const n in e) {
    if (n === "$ref")
      return 1 / 0;
    if (t++, !m_.has(n) && (typeof e[n] == "object" && (0, p_.eachItem)(e[n], (r) => t += zf(r)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function qf(e, t = "", n) {
  n !== !1 && (t = Gn(t));
  const r = e.parse(t);
  return Vf(e, r);
}
Ie.getFullPath = qf;
function Vf(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ie._getFullPath = Vf;
const y_ = /#\/?$/;
function Gn(e) {
  return e ? e.replace(y_, "") : "";
}
Ie.normalizeId = Gn;
function g_(e, t, n) {
  return n = Gn(n), e.resolve(t, n);
}
Ie.resolveUrl = g_;
const b_ = /^[a-z_][-a-z0-9._]*$/i;
function $_(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: n, uriResolver: r } = this.opts, a = Gn(e[n] || t), s = { "": a }, o = qf(r, a, !1), c = {}, l = /* @__PURE__ */ new Set();
  return f_(e, { allKeys: !0 }, (d, v, $, y) => {
    if (y === void 0)
      return;
    const g = o + v;
    let h = s[y];
    typeof d[n] == "string" && (h = m.call(this, d[n])), _.call(this, d.$anchor), _.call(this, d.$dynamicAnchor), s[v] = h;
    function m(P) {
      const O = this.opts.uriResolver.resolve;
      if (P = Gn(h ? O(h, P) : P), l.has(P))
        throw i(P);
      l.add(P);
      let T = this.refs[P];
      return typeof T == "string" && (T = this.refs[T]), typeof T == "object" ? u(d, T.schema, P) : P !== Gn(g) && (P[0] === "#" ? (u(d, c[P], P), c[P] = d) : this.refs[P] = g), P;
    }
    function _(P) {
      if (typeof P == "string") {
        if (!b_.test(P))
          throw new Error(`invalid anchor "${P}"`);
        m.call(this, `#${P}`);
      }
    }
  }), c;
  function u(d, v, $) {
    if (v !== void 0 && !d_(d, v))
      throw i($);
  }
  function i(d) {
    return new Error(`reference "${d}" resolves to more than one schema`);
  }
}
Ie.getSchemaRefs = $_;
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.getData = ut.KeywordCxt = ut.validateFunctionCode = void 0;
const Bf = Yn, bu = Oe, Rc = kt, Ga = Oe, x_ = ms, Rr = wt, Gs = Gt, W = ee, Y = St, __ = Ie, Tt = U, fr = Kr;
function w_(e) {
  if (Hf(e) && (Wf(e), Kf(e))) {
    P_(e);
    return;
  }
  Gf(e, () => (0, Bf.topBoolOrEmptySchema)(e));
}
ut.validateFunctionCode = w_;
function Gf({ gen: e, validateName: t, schema: n, schemaEnv: r, opts: a }, s) {
  a.code.es5 ? e.func(t, (0, W._)`${Y.default.data}, ${Y.default.valCxt}`, r.$async, () => {
    e.code((0, W._)`"use strict"; ${$u(n, a)}`), S_(e, a), e.code(s);
  }) : e.func(t, (0, W._)`${Y.default.data}, ${E_(a)}`, r.$async, () => e.code($u(n, a)).code(s));
}
function E_(e) {
  return (0, W._)`{${Y.default.instancePath}="", ${Y.default.parentData}, ${Y.default.parentDataProperty}, ${Y.default.rootData}=${Y.default.data}${e.dynamicRef ? (0, W._)`, ${Y.default.dynamicAnchors}={}` : W.nil}}={}`;
}
function S_(e, t) {
  e.if(Y.default.valCxt, () => {
    e.var(Y.default.instancePath, (0, W._)`${Y.default.valCxt}.${Y.default.instancePath}`), e.var(Y.default.parentData, (0, W._)`${Y.default.valCxt}.${Y.default.parentData}`), e.var(Y.default.parentDataProperty, (0, W._)`${Y.default.valCxt}.${Y.default.parentDataProperty}`), e.var(Y.default.rootData, (0, W._)`${Y.default.valCxt}.${Y.default.rootData}`), t.dynamicRef && e.var(Y.default.dynamicAnchors, (0, W._)`${Y.default.valCxt}.${Y.default.dynamicAnchors}`);
  }, () => {
    e.var(Y.default.instancePath, (0, W._)`""`), e.var(Y.default.parentData, (0, W._)`undefined`), e.var(Y.default.parentDataProperty, (0, W._)`undefined`), e.var(Y.default.rootData, Y.default.data), t.dynamicRef && e.var(Y.default.dynamicAnchors, (0, W._)`{}`);
  });
}
function P_(e) {
  const { schema: t, opts: n, gen: r } = e;
  Gf(e, () => {
    n.$comment && t.$comment && Xf(e), j_(e), r.let(Y.default.vErrors, null), r.let(Y.default.errors, 0), n.unevaluated && R_(e), Jf(e), C_(e);
  });
}
function R_(e) {
  const { gen: t, validateName: n } = e;
  e.evaluated = t.const("evaluated", (0, W._)`${n}.evaluated`), t.if((0, W._)`${e.evaluated}.dynamicProps`, () => t.assign((0, W._)`${e.evaluated}.props`, (0, W._)`undefined`)), t.if((0, W._)`${e.evaluated}.dynamicItems`, () => t.assign((0, W._)`${e.evaluated}.items`, (0, W._)`undefined`));
}
function $u(e, t) {
  const n = typeof e == "object" && e[t.schemaId];
  return n && (t.code.source || t.code.process) ? (0, W._)`/*# sourceURL=${n} */` : W.nil;
}
function O_(e, t) {
  if (Hf(e) && (Wf(e), Kf(e))) {
    k_(e, t);
    return;
  }
  (0, Bf.boolOrEmptySchema)(e, t);
}
function Kf({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const n in e)
    if (t.RULES.all[n])
      return !0;
  return !1;
}
function Hf(e) {
  return typeof e.schema != "boolean";
}
function k_(e, t) {
  const { schema: n, gen: r, opts: a } = e;
  a.$comment && n.$comment && Xf(e), N_(e), A_(e);
  const s = r.const("_errs", Y.default.errors);
  Jf(e, s), r.var(t, (0, W._)`${s} === ${Y.default.errors}`);
}
function Wf(e) {
  (0, Tt.checkUnknownRules)(e), T_(e);
}
function Jf(e, t) {
  if (e.opts.jtd)
    return xu(e, [], !1, t);
  const n = (0, bu.getSchemaTypes)(e.schema), r = (0, bu.coerceAndCheckDataType)(e, n);
  xu(e, n, !r, t);
}
function T_(e) {
  const { schema: t, errSchemaPath: n, opts: r, self: a } = e;
  t.$ref && r.ignoreKeywordsWithRef && (0, Tt.schemaHasRulesButRef)(t, a.RULES) && a.logger.warn(`$ref: keywords ignored in schema at path "${n}"`);
}
function j_(e) {
  const { schema: t, opts: n } = e;
  t.default !== void 0 && n.useDefaults && n.strictSchema && (0, Tt.checkStrictMode)(e, "default is ignored in the schema root");
}
function N_(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, __.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function A_(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Xf({ gen: e, schemaEnv: t, schema: n, errSchemaPath: r, opts: a }) {
  const s = n.$comment;
  if (a.$comment === !0)
    e.code((0, W._)`${Y.default.self}.logger.log(${s})`);
  else if (typeof a.$comment == "function") {
    const o = (0, W.str)`${r}/$comment`, c = e.scopeValue("root", { ref: t.root });
    e.code((0, W._)`${Y.default.self}.opts.$comment(${s}, ${o}, ${c}.schema)`);
  }
}
function C_(e) {
  const { gen: t, schemaEnv: n, validateName: r, ValidationError: a, opts: s } = e;
  n.$async ? t.if((0, W._)`${Y.default.errors} === 0`, () => t.return(Y.default.data), () => t.throw((0, W._)`new ${a}(${Y.default.vErrors})`)) : (t.assign((0, W._)`${r}.errors`, Y.default.vErrors), s.unevaluated && I_(e), t.return((0, W._)`${Y.default.errors} === 0`));
}
function I_({ gen: e, evaluated: t, props: n, items: r }) {
  n instanceof W.Name && e.assign((0, W._)`${t}.props`, n), r instanceof W.Name && e.assign((0, W._)`${t}.items`, r);
}
function xu(e, t, n, r) {
  const { gen: a, schema: s, data: o, allErrors: c, opts: l, self: u } = e, { RULES: i } = u;
  if (s.$ref && (l.ignoreKeywordsWithRef || !(0, Tt.schemaHasRulesButRef)(s, i))) {
    a.block(() => Zf(e, "$ref", i.all.$ref.definition));
    return;
  }
  l.jtd || D_(e, t), a.block(() => {
    for (const v of i.rules)
      d(v);
    d(i.post);
  });
  function d(v) {
    (0, Rc.shouldUseGroup)(s, v) && (v.type ? (a.if((0, Ga.checkDataType)(v.type, o, l.strictNumbers)), _u(e, v), t.length === 1 && t[0] === v.type && n && (a.else(), (0, Ga.reportTypeError)(e)), a.endIf()) : _u(e, v), c || a.if((0, W._)`${Y.default.errors} === ${r || 0}`));
  }
}
function _u(e, t) {
  const { gen: n, schema: r, opts: { useDefaults: a } } = e;
  a && (0, x_.assignDefaults)(e, t.type), n.block(() => {
    for (const s of t.rules)
      (0, Rc.shouldUseRule)(r, s) && Zf(e, s.keyword, s.definition, t.type);
  });
}
function D_(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (L_(e, t), e.opts.allowUnionTypes || F_(e, t), M_(e, e.dataTypes));
}
function L_(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((n) => {
      Yf(e.dataTypes, n) || Oc(e, `type "${n}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), z_(e, t);
  }
}
function F_(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Oc(e, "use allowUnionTypes to allow union type keyword");
}
function M_(e, t) {
  const n = e.self.RULES.all;
  for (const r in n) {
    const a = n[r];
    if (typeof a == "object" && (0, Rc.shouldUseRule)(e.schema, a)) {
      const { type: s } = a.definition;
      s.length && !s.some((o) => U_(t, o)) && Oc(e, `missing type "${s.join(",")}" for keyword "${r}"`);
    }
  }
}
function U_(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Yf(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function z_(e, t) {
  const n = [];
  for (const r of e.dataTypes)
    Yf(t, r) ? n.push(r) : t.includes("integer") && r === "number" && n.push("integer");
  e.dataTypes = n;
}
function Oc(e, t) {
  const n = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${n}" (strictTypes)`, (0, Tt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class Qf {
  constructor(t, n, r) {
    if ((0, Rr.validateKeywordUsage)(t, n, r), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = r, this.data = t.data, this.schema = t.schema[r], this.$data = n.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Tt.schemaRefOrVal)(t, this.schema, r, this.$data), this.schemaType = n.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = n, this.$data)
      this.schemaCode = t.gen.const("vSchema", em(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Rr.validSchemaType)(this.schema, n.schemaType, n.allowUndefined))
      throw new Error(`${r} value must be ${JSON.stringify(n.schemaType)}`);
    ("code" in n ? n.trackErrors : n.errors !== !1) && (this.errsCount = t.gen.const("_errs", Y.default.errors));
  }
  result(t, n, r) {
    this.failResult((0, W.not)(t), n, r);
  }
  failResult(t, n, r) {
    this.gen.if(t), r ? r() : this.error(), n ? (this.gen.else(), n(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, n) {
    this.failResult((0, W.not)(t), void 0, n);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: n } = this;
    this.fail((0, W._)`${n} !== undefined && (${(0, W.or)(this.invalid$data(), t)})`);
  }
  error(t, n, r) {
    if (n) {
      this.setParams(n), this._error(t, r), this.setParams({});
      return;
    }
    this._error(t, r);
  }
  _error(t, n) {
    (t ? fr.reportExtraError : fr.reportError)(this, this.def.error, n);
  }
  $dataError() {
    (0, fr.reportError)(this, this.def.$dataError || fr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, fr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, n) {
    n ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, n, r = W.nil) {
    this.gen.block(() => {
      this.check$data(t, r), n();
    });
  }
  check$data(t = W.nil, n = W.nil) {
    if (!this.$data)
      return;
    const { gen: r, schemaCode: a, schemaType: s, def: o } = this;
    r.if((0, W.or)((0, W._)`${a} === undefined`, n)), t !== W.nil && r.assign(t, !0), (s.length || o.validateSchema) && (r.elseIf(this.invalid$data()), this.$dataError(), t !== W.nil && r.assign(t, !1)), r.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: n, schemaType: r, def: a, it: s } = this;
    return (0, W.or)(o(), c());
    function o() {
      if (r.length) {
        if (!(n instanceof W.Name))
          throw new Error("ajv implementation error");
        const l = Array.isArray(r) ? r : [r];
        return (0, W._)`${(0, Ga.checkDataTypes)(l, n, s.opts.strictNumbers, Ga.DataType.Wrong)}`;
      }
      return W.nil;
    }
    function c() {
      if (a.validateSchema) {
        const l = t.scopeValue("validate$data", { ref: a.validateSchema });
        return (0, W._)`!${l}(${n})`;
      }
      return W.nil;
    }
  }
  subschema(t, n) {
    const r = (0, Gs.getSubschema)(this.it, t);
    (0, Gs.extendSubschemaData)(r, this.it, t), (0, Gs.extendSubschemaMode)(r, t);
    const a = { ...this.it, ...r, items: void 0, props: void 0 };
    return O_(a, n), a;
  }
  mergeEvaluated(t, n) {
    const { it: r, gen: a } = this;
    r.opts.unevaluated && (r.props !== !0 && t.props !== void 0 && (r.props = Tt.mergeEvaluated.props(a, t.props, r.props, n)), r.items !== !0 && t.items !== void 0 && (r.items = Tt.mergeEvaluated.items(a, t.items, r.items, n)));
  }
  mergeValidEvaluated(t, n) {
    const { it: r, gen: a } = this;
    if (r.opts.unevaluated && (r.props !== !0 || r.items !== !0))
      return a.if(n, () => this.mergeEvaluated(t, W.Name)), !0;
  }
}
ut.KeywordCxt = Qf;
function Zf(e, t, n, r) {
  const a = new Qf(e, n, t);
  "code" in n ? n.code(a, r) : a.$data && n.validate ? (0, Rr.funcKeywordCode)(a, n) : "macro" in n ? (0, Rr.macroKeywordCode)(a, n) : (n.compile || n.validate) && (0, Rr.funcKeywordCode)(a, n);
}
const q_ = /^\/(?:[^~]|~0|~1)*$/, V_ = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function em(e, { dataLevel: t, dataNames: n, dataPathArr: r }) {
  let a, s;
  if (e === "")
    return Y.default.rootData;
  if (e[0] === "/") {
    if (!q_.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    a = e, s = Y.default.rootData;
  } else {
    const u = V_.exec(e);
    if (!u)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const i = +u[1];
    if (a = u[2], a === "#") {
      if (i >= t)
        throw new Error(l("property/index", i));
      return r[t - i];
    }
    if (i > t)
      throw new Error(l("data", i));
    if (s = n[t - i], !a)
      return s;
  }
  let o = s;
  const c = a.split("/");
  for (const u of c)
    u && (s = (0, W._)`${s}${(0, W.getProperty)((0, Tt.unescapeJsonPointer)(u))}`, o = (0, W._)`${o} && ${s}`);
  return o;
  function l(u, i) {
    return `Cannot access ${u} ${i} levels up, current level is ${t}`;
  }
}
ut.getData = em;
var Hr = {};
Object.defineProperty(Hr, "__esModule", { value: !0 });
class B_ extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Hr.default = B_;
var ar = {};
Object.defineProperty(ar, "__esModule", { value: !0 });
const Ks = Ie;
class G_ extends Error {
  constructor(t, n, r, a) {
    super(a || `can't resolve reference ${r} from id ${n}`), this.missingRef = (0, Ks.resolveUrl)(t, n, r), this.missingSchema = (0, Ks.normalizeId)((0, Ks.getFullPath)(t, this.missingRef));
  }
}
ar.default = G_;
var He = {};
Object.defineProperty(He, "__esModule", { value: !0 });
He.resolveSchema = He.getCompilingSchema = He.resolveRef = He.compileSchema = He.SchemaEnv = void 0;
const at = ee, K_ = Hr, dn = St, ct = Ie, wu = U, H_ = ut;
class hs {
  constructor(t) {
    var n;
    this.refs = {}, this.dynamicAnchors = {};
    let r;
    typeof t.schema == "object" && (r = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (n = t.baseId) !== null && n !== void 0 ? n : (0, ct.normalizeId)(r == null ? void 0 : r[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = r == null ? void 0 : r.$async, this.refs = {};
  }
}
He.SchemaEnv = hs;
function kc(e) {
  const t = tm.call(this, e);
  if (t)
    return t;
  const n = (0, ct.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: r, lines: a } = this.opts.code, { ownProperties: s } = this.opts, o = new at.CodeGen(this.scope, { es5: r, lines: a, ownProperties: s });
  let c;
  e.$async && (c = o.scopeValue("Error", {
    ref: K_.default,
    code: (0, at._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = o.scopeName("validate");
  e.validateName = l;
  const u = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: dn.default.data,
    parentData: dn.default.parentData,
    parentDataProperty: dn.default.parentDataProperty,
    dataNames: [dn.default.data],
    dataPathArr: [at.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, at.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: c,
    schema: e.schema,
    schemaEnv: e,
    rootId: n,
    baseId: e.baseId || n,
    schemaPath: at.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, at._)`""`,
    opts: this.opts,
    self: this
  };
  let i;
  try {
    this._compilations.add(e), (0, H_.validateFunctionCode)(u), o.optimize(this.opts.code.optimize);
    const d = o.toString();
    i = `${o.scopeRefs(dn.default.scope)}return ${d}`, this.opts.code.process && (i = this.opts.code.process(i, e));
    const $ = new Function(`${dn.default.self}`, `${dn.default.scope}`, i)(this, this.scope.get());
    if (this.scope.value(l, { ref: $ }), $.errors = null, $.schema = e.schema, $.schemaEnv = e, e.$async && ($.$async = !0), this.opts.code.source === !0 && ($.source = { validateName: l, validateCode: d, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: y, items: g } = u;
      $.evaluated = {
        props: y instanceof at.Name ? void 0 : y,
        items: g instanceof at.Name ? void 0 : g,
        dynamicProps: y instanceof at.Name,
        dynamicItems: g instanceof at.Name
      }, $.source && ($.source.evaluated = (0, at.stringify)($.evaluated));
    }
    return e.validate = $, e;
  } catch (d) {
    throw delete e.validate, delete e.validateName, i && this.logger.error("Error compiling schema, function code:", i), d;
  } finally {
    this._compilations.delete(e);
  }
}
He.compileSchema = kc;
function W_(e, t, n) {
  var r;
  n = (0, ct.resolveUrl)(this.opts.uriResolver, t, n);
  const a = e.refs[n];
  if (a)
    return a;
  let s = Y_.call(this, e, n);
  if (s === void 0) {
    const o = (r = e.localRefs) === null || r === void 0 ? void 0 : r[n], { schemaId: c } = this.opts;
    o && (s = new hs({ schema: o, schemaId: c, root: e, baseId: t }));
  }
  if (s !== void 0)
    return e.refs[n] = J_.call(this, s);
}
He.resolveRef = W_;
function J_(e) {
  return (0, ct.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : kc.call(this, e);
}
function tm(e) {
  for (const t of this._compilations)
    if (X_(t, e))
      return t;
}
He.getCompilingSchema = tm;
function X_(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Y_(e, t) {
  let n;
  for (; typeof (n = this.refs[t]) == "string"; )
    t = n;
  return n || this.schemas[t] || vs.call(this, e, t);
}
function vs(e, t) {
  const n = this.opts.uriResolver.parse(t), r = (0, ct._getFullPath)(this.opts.uriResolver, n);
  let a = (0, ct.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && r === a)
    return Hs.call(this, n, e);
  const s = (0, ct.normalizeId)(r), o = this.refs[s] || this.schemas[s];
  if (typeof o == "string") {
    const c = vs.call(this, e, o);
    return typeof (c == null ? void 0 : c.schema) != "object" ? void 0 : Hs.call(this, n, c);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || kc.call(this, o), s === (0, ct.normalizeId)(t)) {
      const { schema: c } = o, { schemaId: l } = this.opts, u = c[l];
      return u && (a = (0, ct.resolveUrl)(this.opts.uriResolver, a, u)), new hs({ schema: c, schemaId: l, root: e, baseId: a });
    }
    return Hs.call(this, n, o);
  }
}
He.resolveSchema = vs;
const Q_ = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Hs(e, { baseId: t, schema: n, root: r }) {
  var a;
  if (((a = e.fragment) === null || a === void 0 ? void 0 : a[0]) !== "/")
    return;
  for (const c of e.fragment.slice(1).split("/")) {
    if (typeof n == "boolean")
      return;
    const l = n[(0, wu.unescapeFragment)(c)];
    if (l === void 0)
      return;
    n = l;
    const u = typeof n == "object" && n[this.opts.schemaId];
    !Q_.has(c) && u && (t = (0, ct.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let s;
  if (typeof n != "boolean" && n.$ref && !(0, wu.schemaHasRulesButRef)(n, this.RULES)) {
    const c = (0, ct.resolveUrl)(this.opts.uriResolver, t, n.$ref);
    s = vs.call(this, r, c);
  }
  const { schemaId: o } = this.opts;
  if (s = s || new hs({ schema: n, schemaId: o, root: r, baseId: t }), s.schema !== s.root.schema)
    return s;
}
const Z_ = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", e0 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", t0 = "object", n0 = [
  "$data"
], r0 = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, a0 = !1, s0 = {
  $id: Z_,
  description: e0,
  type: t0,
  required: n0,
  properties: r0,
  additionalProperties: a0
};
var Tc = {};
Object.defineProperty(Tc, "__esModule", { value: !0 });
const nm = df;
nm.code = 'require("ajv/dist/runtime/uri").default';
Tc.default = nm;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = ut;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var n = ee;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return n.CodeGen;
  } });
  const r = Hr, a = ar, s = Sn, o = He, c = ee, l = Ie, u = Oe, i = U, d = s0, v = Tc, $ = (w, b) => new RegExp(w, b);
  $.code = "new RegExp";
  const y = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), h = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, _ = 200;
  function P(w) {
    var b, E, x, p, f, S, A, N, G, B, se, Xe, Jt, Xt, Yt, Qt, Zt, en, tn, nn, rn, an, sn, on, cn;
    const nt = w.strict, ln = (b = w.code) === null || b === void 0 ? void 0 : b.optimize, lr = ln === !0 || ln === void 0 ? 1 : ln || 0, ur = (x = (E = w.code) === null || E === void 0 ? void 0 : E.regExp) !== null && x !== void 0 ? x : $, Ms = (p = w.uriResolver) !== null && p !== void 0 ? p : v.default;
    return {
      strictSchema: (S = (f = w.strictSchema) !== null && f !== void 0 ? f : nt) !== null && S !== void 0 ? S : !0,
      strictNumbers: (N = (A = w.strictNumbers) !== null && A !== void 0 ? A : nt) !== null && N !== void 0 ? N : !0,
      strictTypes: (B = (G = w.strictTypes) !== null && G !== void 0 ? G : nt) !== null && B !== void 0 ? B : "log",
      strictTuples: (Xe = (se = w.strictTuples) !== null && se !== void 0 ? se : nt) !== null && Xe !== void 0 ? Xe : "log",
      strictRequired: (Xt = (Jt = w.strictRequired) !== null && Jt !== void 0 ? Jt : nt) !== null && Xt !== void 0 ? Xt : !1,
      code: w.code ? { ...w.code, optimize: lr, regExp: ur } : { optimize: lr, regExp: ur },
      loopRequired: (Yt = w.loopRequired) !== null && Yt !== void 0 ? Yt : _,
      loopEnum: (Qt = w.loopEnum) !== null && Qt !== void 0 ? Qt : _,
      meta: (Zt = w.meta) !== null && Zt !== void 0 ? Zt : !0,
      messages: (en = w.messages) !== null && en !== void 0 ? en : !0,
      inlineRefs: (tn = w.inlineRefs) !== null && tn !== void 0 ? tn : !0,
      schemaId: (nn = w.schemaId) !== null && nn !== void 0 ? nn : "$id",
      addUsedSchema: (rn = w.addUsedSchema) !== null && rn !== void 0 ? rn : !0,
      validateSchema: (an = w.validateSchema) !== null && an !== void 0 ? an : !0,
      validateFormats: (sn = w.validateFormats) !== null && sn !== void 0 ? sn : !0,
      unicodeRegExp: (on = w.unicodeRegExp) !== null && on !== void 0 ? on : !0,
      int32range: (cn = w.int32range) !== null && cn !== void 0 ? cn : !0,
      uriResolver: Ms
    };
  }
  class O {
    constructor(b = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), b = this.opts = { ...b, ...P(b) };
      const { es5: E, lines: x } = this.opts.code;
      this.scope = new c.ValueScope({ scope: {}, prefixes: g, es5: E, lines: x }), this.logger = J(b.logger);
      const p = b.validateFormats;
      b.validateFormats = !1, this.RULES = (0, s.getRules)(), T.call(this, h, b, "NOT SUPPORTED"), T.call(this, m, b, "DEPRECATED", "warn"), this._metaOpts = K.call(this), b.formats && ae.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), b.keywords && F.call(this, b.keywords), typeof b.meta == "object" && this.addMetaSchema(b.meta), q.call(this), b.validateFormats = p;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: b, meta: E, schemaId: x } = this.opts;
      let p = d;
      x === "id" && (p = { ...d }, p.id = p.$id, delete p.$id), E && b && this.addMetaSchema(p, p[x], !1);
    }
    defaultMeta() {
      const { meta: b, schemaId: E } = this.opts;
      return this.opts.defaultMeta = typeof b == "object" ? b[E] || b : void 0;
    }
    validate(b, E) {
      let x;
      if (typeof b == "string") {
        if (x = this.getSchema(b), !x)
          throw new Error(`no schema with key or ref "${b}"`);
      } else
        x = this.compile(b);
      const p = x(E);
      return "$async" in x || (this.errors = x.errors), p;
    }
    compile(b, E) {
      const x = this._addSchema(b, E);
      return x.validate || this._compileSchemaEnv(x);
    }
    compileAsync(b, E) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: x } = this.opts;
      return p.call(this, b, E);
      async function p(B, se) {
        await f.call(this, B.$schema);
        const Xe = this._addSchema(B, se);
        return Xe.validate || S.call(this, Xe);
      }
      async function f(B) {
        B && !this.getSchema(B) && await p.call(this, { $ref: B }, !0);
      }
      async function S(B) {
        try {
          return this._compileSchemaEnv(B);
        } catch (se) {
          if (!(se instanceof a.default))
            throw se;
          return A.call(this, se), await N.call(this, se.missingSchema), S.call(this, B);
        }
      }
      function A({ missingSchema: B, missingRef: se }) {
        if (this.refs[B])
          throw new Error(`AnySchema ${B} is loaded but ${se} cannot be resolved`);
      }
      async function N(B) {
        const se = await G.call(this, B);
        this.refs[B] || await f.call(this, se.$schema), this.refs[B] || this.addSchema(se, B, E);
      }
      async function G(B) {
        const se = this._loading[B];
        if (se)
          return se;
        try {
          return await (this._loading[B] = x(B));
        } finally {
          delete this._loading[B];
        }
      }
    }
    // Adds schema to the instance
    addSchema(b, E, x, p = this.opts.validateSchema) {
      if (Array.isArray(b)) {
        for (const S of b)
          this.addSchema(S, void 0, x, p);
        return this;
      }
      let f;
      if (typeof b == "object") {
        const { schemaId: S } = this.opts;
        if (f = b[S], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${S} must be string`);
      }
      return E = (0, l.normalizeId)(E || f), this._checkUnique(E), this.schemas[E] = this._addSchema(b, x, E, p, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(b, E, x = this.opts.validateSchema) {
      return this.addSchema(b, E, !0, x), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(b, E) {
      if (typeof b == "boolean")
        return !0;
      let x;
      if (x = b.$schema, x !== void 0 && typeof x != "string")
        throw new Error("$schema must be a string");
      if (x = x || this.opts.defaultMeta || this.defaultMeta(), !x)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const p = this.validate(x, b);
      if (!p && E) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return p;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(b) {
      let E;
      for (; typeof (E = L.call(this, b)) == "string"; )
        b = E;
      if (E === void 0) {
        const { schemaId: x } = this.opts, p = new o.SchemaEnv({ schema: {}, schemaId: x });
        if (E = o.resolveSchema.call(this, p, b), !E)
          return;
        this.refs[b] = E;
      }
      return E.validate || this._compileSchemaEnv(E);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(b) {
      if (b instanceof RegExp)
        return this._removeAllSchemas(this.schemas, b), this._removeAllSchemas(this.refs, b), this;
      switch (typeof b) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const E = L.call(this, b);
          return typeof E == "object" && this._cache.delete(E.schema), delete this.schemas[b], delete this.refs[b], this;
        }
        case "object": {
          const E = b;
          this._cache.delete(E);
          let x = b[this.opts.schemaId];
          return x && (x = (0, l.normalizeId)(x), delete this.schemas[x], delete this.refs[x]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(b) {
      for (const E of b)
        this.addKeyword(E);
      return this;
    }
    addKeyword(b, E) {
      let x;
      if (typeof b == "string")
        x = b, typeof E == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), E.keyword = x);
      else if (typeof b == "object" && E === void 0) {
        if (E = b, x = E.keyword, Array.isArray(x) && !x.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (I.call(this, x, E), !E)
        return (0, i.eachItem)(x, (f) => D.call(this, f)), this;
      C.call(this, E);
      const p = {
        ...E,
        type: (0, u.getJSONTypes)(E.type),
        schemaType: (0, u.getJSONTypes)(E.schemaType)
      };
      return (0, i.eachItem)(x, p.type.length === 0 ? (f) => D.call(this, f, p) : (f) => p.type.forEach((S) => D.call(this, f, p, S))), this;
    }
    getKeyword(b) {
      const E = this.RULES.all[b];
      return typeof E == "object" ? E.definition : !!E;
    }
    // Remove keyword
    removeKeyword(b) {
      const { RULES: E } = this;
      delete E.keywords[b], delete E.all[b];
      for (const x of E.rules) {
        const p = x.rules.findIndex((f) => f.keyword === b);
        p >= 0 && x.rules.splice(p, 1);
      }
      return this;
    }
    // Add format
    addFormat(b, E) {
      return typeof E == "string" && (E = new RegExp(E)), this.formats[b] = E, this;
    }
    errorsText(b = this.errors, { separator: E = ", ", dataVar: x = "data" } = {}) {
      return !b || b.length === 0 ? "No errors" : b.map((p) => `${x}${p.instancePath} ${p.message}`).reduce((p, f) => p + E + f);
    }
    $dataMetaSchema(b, E) {
      const x = this.RULES.all;
      b = JSON.parse(JSON.stringify(b));
      for (const p of E) {
        const f = p.split("/").slice(1);
        let S = b;
        for (const A of f)
          S = S[A];
        for (const A in x) {
          const N = x[A];
          if (typeof N != "object")
            continue;
          const { $data: G } = N.definition, B = S[A];
          G && B && (S[A] = j(B));
        }
      }
      return b;
    }
    _removeAllSchemas(b, E) {
      for (const x in b) {
        const p = b[x];
        (!E || E.test(x)) && (typeof p == "string" ? delete b[x] : p && !p.meta && (this._cache.delete(p.schema), delete b[x]));
      }
    }
    _addSchema(b, E, x, p = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let S;
      const { schemaId: A } = this.opts;
      if (typeof b == "object")
        S = b[A];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof b != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let N = this._cache.get(b);
      if (N !== void 0)
        return N;
      x = (0, l.normalizeId)(S || x);
      const G = l.getSchemaRefs.call(this, b, x);
      return N = new o.SchemaEnv({ schema: b, schemaId: A, meta: E, baseId: x, localRefs: G }), this._cache.set(N.schema, N), f && !x.startsWith("#") && (x && this._checkUnique(x), this.refs[x] = N), p && this.validateSchema(b, !0), N;
    }
    _checkUnique(b) {
      if (this.schemas[b] || this.refs[b])
        throw new Error(`schema with key or id "${b}" already exists`);
    }
    _compileSchemaEnv(b) {
      if (b.meta ? this._compileMetaSchema(b) : o.compileSchema.call(this, b), !b.validate)
        throw new Error("ajv implementation error");
      return b.validate;
    }
    _compileMetaSchema(b) {
      const E = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, b);
      } finally {
        this.opts = E;
      }
    }
  }
  O.ValidationError = r.default, O.MissingRefError = a.default, e.default = O;
  function T(w, b, E, x = "error") {
    for (const p in w) {
      const f = p;
      f in b && this.logger[x](`${E}: option ${p}. ${w[f]}`);
    }
  }
  function L(w) {
    return w = (0, l.normalizeId)(w), this.schemas[w] || this.refs[w];
  }
  function q() {
    const w = this.opts.schemas;
    if (w)
      if (Array.isArray(w))
        this.addSchema(w);
      else
        for (const b in w)
          this.addSchema(w[b], b);
  }
  function ae() {
    for (const w in this.opts.formats) {
      const b = this.opts.formats[w];
      b && this.addFormat(w, b);
    }
  }
  function F(w) {
    if (Array.isArray(w)) {
      this.addVocabulary(w);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const b in w) {
      const E = w[b];
      E.keyword || (E.keyword = b), this.addKeyword(E);
    }
  }
  function K() {
    const w = { ...this.opts };
    for (const b of y)
      delete w[b];
    return w;
  }
  const ce = { log() {
  }, warn() {
  }, error() {
  } };
  function J(w) {
    if (w === !1)
      return ce;
    if (w === void 0)
      return console;
    if (w.log && w.warn && w.error)
      return w;
    throw new Error("logger must implement log, warn and error methods");
  }
  const de = /^[a-z_$][a-z0-9_$:-]*$/i;
  function I(w, b) {
    const { RULES: E } = this;
    if ((0, i.eachItem)(w, (x) => {
      if (E.keywords[x])
        throw new Error(`Keyword ${x} is already defined`);
      if (!de.test(x))
        throw new Error(`Keyword ${x} has invalid name`);
    }), !!b && b.$data && !("code" in b || "validate" in b))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function D(w, b, E) {
    var x;
    const p = b == null ? void 0 : b.post;
    if (E && p)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let S = p ? f.post : f.rules.find(({ type: N }) => N === E);
    if (S || (S = { type: E, rules: [] }, f.rules.push(S)), f.keywords[w] = !0, !b)
      return;
    const A = {
      keyword: w,
      definition: {
        ...b,
        type: (0, u.getJSONTypes)(b.type),
        schemaType: (0, u.getJSONTypes)(b.schemaType)
      }
    };
    b.before ? V.call(this, S, A, b.before) : S.rules.push(A), f.all[w] = A, (x = b.implements) === null || x === void 0 || x.forEach((N) => this.addKeyword(N));
  }
  function V(w, b, E) {
    const x = w.rules.findIndex((p) => p.keyword === E);
    x >= 0 ? w.rules.splice(x, 0, b) : (w.rules.push(b), this.logger.warn(`rule ${E} is not defined`));
  }
  function C(w) {
    let { metaSchema: b } = w;
    b !== void 0 && (w.$data && this.opts.$data && (b = j(b)), w.validateSchema = this.compile(b, !0));
  }
  const R = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function j(w) {
    return { anyOf: [w, R] };
  }
})(Ef);
var jc = {}, Nc = {}, Ac = {};
Object.defineProperty(Ac, "__esModule", { value: !0 });
const o0 = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Ac.default = o0;
var Pn = {};
Object.defineProperty(Pn, "__esModule", { value: !0 });
Pn.callRef = Pn.getValidate = void 0;
const i0 = ar, Eu = ne, Ge = ee, An = St, Su = He, ua = U, c0 = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: n, it: r } = e, { baseId: a, schemaEnv: s, validateName: o, opts: c, self: l } = r, { root: u } = s;
    if ((n === "#" || n === "#/") && a === u.baseId)
      return d();
    const i = Su.resolveRef.call(l, u, a, n);
    if (i === void 0)
      throw new i0.default(r.opts.uriResolver, a, n);
    if (i instanceof Su.SchemaEnv)
      return v(i);
    return $(i);
    function d() {
      if (s === u)
        return Ta(e, o, s, s.$async);
      const y = t.scopeValue("root", { ref: u });
      return Ta(e, (0, Ge._)`${y}.validate`, u, u.$async);
    }
    function v(y) {
      const g = rm(e, y);
      Ta(e, g, y, y.$async);
    }
    function $(y) {
      const g = t.scopeValue("schema", c.code.source === !0 ? { ref: y, code: (0, Ge.stringify)(y) } : { ref: y }), h = t.name("valid"), m = e.subschema({
        schema: y,
        dataTypes: [],
        schemaPath: Ge.nil,
        topSchemaRef: g,
        errSchemaPath: n
      }, h);
      e.mergeEvaluated(m), e.ok(h);
    }
  }
};
function rm(e, t) {
  const { gen: n } = e;
  return t.validate ? n.scopeValue("validate", { ref: t.validate }) : (0, Ge._)`${n.scopeValue("wrapper", { ref: t })}.validate`;
}
Pn.getValidate = rm;
function Ta(e, t, n, r) {
  const { gen: a, it: s } = e, { allErrors: o, schemaEnv: c, opts: l } = s, u = l.passContext ? An.default.this : Ge.nil;
  r ? i() : d();
  function i() {
    if (!c.$async)
      throw new Error("async schema referenced by sync schema");
    const y = a.let("valid");
    a.try(() => {
      a.code((0, Ge._)`await ${(0, Eu.callValidateCode)(e, t, u)}`), $(t), o || a.assign(y, !0);
    }, (g) => {
      a.if((0, Ge._)`!(${g} instanceof ${s.ValidationError})`, () => a.throw(g)), v(g), o || a.assign(y, !1);
    }), e.ok(y);
  }
  function d() {
    e.result((0, Eu.callValidateCode)(e, t, u), () => $(t), () => v(t));
  }
  function v(y) {
    const g = (0, Ge._)`${y}.errors`;
    a.assign(An.default.vErrors, (0, Ge._)`${An.default.vErrors} === null ? ${g} : ${An.default.vErrors}.concat(${g})`), a.assign(An.default.errors, (0, Ge._)`${An.default.vErrors}.length`);
  }
  function $(y) {
    var g;
    if (!s.opts.unevaluated)
      return;
    const h = (g = n == null ? void 0 : n.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (s.props !== !0)
      if (h && !h.dynamicProps)
        h.props !== void 0 && (s.props = ua.mergeEvaluated.props(a, h.props, s.props));
      else {
        const m = a.var("props", (0, Ge._)`${y}.evaluated.props`);
        s.props = ua.mergeEvaluated.props(a, m, s.props, Ge.Name);
      }
    if (s.items !== !0)
      if (h && !h.dynamicItems)
        h.items !== void 0 && (s.items = ua.mergeEvaluated.items(a, h.items, s.items));
      else {
        const m = a.var("items", (0, Ge._)`${y}.evaluated.items`);
        s.items = ua.mergeEvaluated.items(a, m, s.items, Ge.Name);
      }
  }
}
Pn.callRef = Ta;
Pn.default = c0;
Object.defineProperty(Nc, "__esModule", { value: !0 });
const l0 = Ac, u0 = Pn, p0 = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  l0.default,
  u0.default
];
Nc.default = p0;
var Cc = {}, Ic = {};
Object.defineProperty(Ic, "__esModule", { value: !0 });
const Ka = ee, Dt = Ka.operators, Ha = {
  maximum: { okStr: "<=", ok: Dt.LTE, fail: Dt.GT },
  minimum: { okStr: ">=", ok: Dt.GTE, fail: Dt.LT },
  exclusiveMaximum: { okStr: "<", ok: Dt.LT, fail: Dt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Dt.GT, fail: Dt.LTE }
}, d0 = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ka.str)`must be ${Ha[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ka._)`{comparison: ${Ha[e].okStr}, limit: ${t}}`
}, f0 = {
  keyword: Object.keys(Ha),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: d0,
  code(e) {
    const { keyword: t, data: n, schemaCode: r } = e;
    e.fail$data((0, Ka._)`${n} ${Ha[t].fail} ${r} || isNaN(${n})`);
  }
};
Ic.default = f0;
var Dc = {};
Object.defineProperty(Dc, "__esModule", { value: !0 });
const Or = ee, m0 = {
  message: ({ schemaCode: e }) => (0, Or.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Or._)`{multipleOf: ${e}}`
}, h0 = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: m0,
  code(e) {
    const { gen: t, data: n, schemaCode: r, it: a } = e, s = a.opts.multipleOfPrecision, o = t.let("res"), c = s ? (0, Or._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${s}` : (0, Or._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Or._)`(${r} === 0 || (${o} = ${n}/${r}, ${c}))`);
  }
};
Dc.default = h0;
var Lc = {}, Fc = {};
Object.defineProperty(Fc, "__esModule", { value: !0 });
function am(e) {
  const t = e.length;
  let n = 0, r = 0, a;
  for (; r < t; )
    n++, a = e.charCodeAt(r++), a >= 55296 && a <= 56319 && r < t && (a = e.charCodeAt(r), (a & 64512) === 56320 && r++);
  return n;
}
Fc.default = am;
am.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Lc, "__esModule", { value: !0 });
const gn = ee, v0 = U, y0 = Fc, g0 = {
  message({ keyword: e, schemaCode: t }) {
    const n = e === "maxLength" ? "more" : "fewer";
    return (0, gn.str)`must NOT have ${n} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, gn._)`{limit: ${e}}`
}, b0 = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: g0,
  code(e) {
    const { keyword: t, data: n, schemaCode: r, it: a } = e, s = t === "maxLength" ? gn.operators.GT : gn.operators.LT, o = a.opts.unicode === !1 ? (0, gn._)`${n}.length` : (0, gn._)`${(0, v0.useFunc)(e.gen, y0.default)}(${n})`;
    e.fail$data((0, gn._)`${o} ${s} ${r}`);
  }
};
Lc.default = b0;
var Mc = {};
Object.defineProperty(Mc, "__esModule", { value: !0 });
const $0 = ne, Wa = ee, x0 = {
  message: ({ schemaCode: e }) => (0, Wa.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Wa._)`{pattern: ${e}}`
}, _0 = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: x0,
  code(e) {
    const { data: t, $data: n, schema: r, schemaCode: a, it: s } = e, o = s.opts.unicodeRegExp ? "u" : "", c = n ? (0, Wa._)`(new RegExp(${a}, ${o}))` : (0, $0.usePattern)(e, r);
    e.fail$data((0, Wa._)`!${c}.test(${t})`);
  }
};
Mc.default = _0;
var Uc = {};
Object.defineProperty(Uc, "__esModule", { value: !0 });
const kr = ee, w0 = {
  message({ keyword: e, schemaCode: t }) {
    const n = e === "maxProperties" ? "more" : "fewer";
    return (0, kr.str)`must NOT have ${n} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, kr._)`{limit: ${e}}`
}, E0 = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: w0,
  code(e) {
    const { keyword: t, data: n, schemaCode: r } = e, a = t === "maxProperties" ? kr.operators.GT : kr.operators.LT;
    e.fail$data((0, kr._)`Object.keys(${n}).length ${a} ${r}`);
  }
};
Uc.default = E0;
var zc = {};
Object.defineProperty(zc, "__esModule", { value: !0 });
const mr = ne, Tr = ee, S0 = U, P0 = {
  message: ({ params: { missingProperty: e } }) => (0, Tr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Tr._)`{missingProperty: ${e}}`
}, R0 = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: P0,
  code(e) {
    const { gen: t, schema: n, schemaCode: r, data: a, $data: s, it: o } = e, { opts: c } = o;
    if (!s && n.length === 0)
      return;
    const l = n.length >= c.loopRequired;
    if (o.allErrors ? u() : i(), c.strictRequired) {
      const $ = e.parentSchema.properties, { definedProperties: y } = e.it;
      for (const g of n)
        if (($ == null ? void 0 : $[g]) === void 0 && !y.has(g)) {
          const h = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${g}" is not defined at "${h}" (strictRequired)`;
          (0, S0.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function u() {
      if (l || s)
        e.block$data(Tr.nil, d);
      else
        for (const $ of n)
          (0, mr.checkReportMissingProp)(e, $);
    }
    function i() {
      const $ = t.let("missing");
      if (l || s) {
        const y = t.let("valid", !0);
        e.block$data(y, () => v($, y)), e.ok(y);
      } else
        t.if((0, mr.checkMissingProp)(e, n, $)), (0, mr.reportMissingProp)(e, $), t.else();
    }
    function d() {
      t.forOf("prop", r, ($) => {
        e.setParams({ missingProperty: $ }), t.if((0, mr.noPropertyInData)(t, a, $, c.ownProperties), () => e.error());
      });
    }
    function v($, y) {
      e.setParams({ missingProperty: $ }), t.forOf($, r, () => {
        t.assign(y, (0, mr.propertyInData)(t, a, $, c.ownProperties)), t.if((0, Tr.not)(y), () => {
          e.error(), t.break();
        });
      }, Tr.nil);
    }
  }
};
zc.default = R0;
var qc = {};
Object.defineProperty(qc, "__esModule", { value: !0 });
const jr = ee, O0 = {
  message({ keyword: e, schemaCode: t }) {
    const n = e === "maxItems" ? "more" : "fewer";
    return (0, jr.str)`must NOT have ${n} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, jr._)`{limit: ${e}}`
}, k0 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: O0,
  code(e) {
    const { keyword: t, data: n, schemaCode: r } = e, a = t === "maxItems" ? jr.operators.GT : jr.operators.LT;
    e.fail$data((0, jr._)`${n}.length ${a} ${r}`);
  }
};
qc.default = k0;
var Vc = {}, Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
const sm = cs;
sm.code = 'require("ajv/dist/runtime/equal").default';
Wr.default = sm;
Object.defineProperty(Vc, "__esModule", { value: !0 });
const Ws = Oe, Ne = ee, T0 = U, j0 = Wr, N0 = {
  message: ({ params: { i: e, j: t } }) => (0, Ne.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ne._)`{i: ${e}, j: ${t}}`
}, A0 = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: N0,
  code(e) {
    const { gen: t, data: n, $data: r, schema: a, parentSchema: s, schemaCode: o, it: c } = e;
    if (!r && !a)
      return;
    const l = t.let("valid"), u = s.items ? (0, Ws.getSchemaTypes)(s.items) : [];
    e.block$data(l, i, (0, Ne._)`${o} === false`), e.ok(l);
    function i() {
      const y = t.let("i", (0, Ne._)`${n}.length`), g = t.let("j");
      e.setParams({ i: y, j: g }), t.assign(l, !0), t.if((0, Ne._)`${y} > 1`, () => (d() ? v : $)(y, g));
    }
    function d() {
      return u.length > 0 && !u.some((y) => y === "object" || y === "array");
    }
    function v(y, g) {
      const h = t.name("item"), m = (0, Ws.checkDataTypes)(u, h, c.opts.strictNumbers, Ws.DataType.Wrong), _ = t.const("indices", (0, Ne._)`{}`);
      t.for((0, Ne._)`;${y}--;`, () => {
        t.let(h, (0, Ne._)`${n}[${y}]`), t.if(m, (0, Ne._)`continue`), u.length > 1 && t.if((0, Ne._)`typeof ${h} == "string"`, (0, Ne._)`${h} += "_"`), t.if((0, Ne._)`typeof ${_}[${h}] == "number"`, () => {
          t.assign(g, (0, Ne._)`${_}[${h}]`), e.error(), t.assign(l, !1).break();
        }).code((0, Ne._)`${_}[${h}] = ${y}`);
      });
    }
    function $(y, g) {
      const h = (0, T0.useFunc)(t, j0.default), m = t.name("outer");
      t.label(m).for((0, Ne._)`;${y}--;`, () => t.for((0, Ne._)`${g} = ${y}; ${g}--;`, () => t.if((0, Ne._)`${h}(${n}[${y}], ${n}[${g}])`, () => {
        e.error(), t.assign(l, !1).break(m);
      })));
    }
  }
};
Vc.default = A0;
var Bc = {};
Object.defineProperty(Bc, "__esModule", { value: !0 });
const Jo = ee, C0 = U, I0 = Wr, D0 = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Jo._)`{allowedValue: ${e}}`
}, L0 = {
  keyword: "const",
  $data: !0,
  error: D0,
  code(e) {
    const { gen: t, data: n, $data: r, schemaCode: a, schema: s } = e;
    r || s && typeof s == "object" ? e.fail$data((0, Jo._)`!${(0, C0.useFunc)(t, I0.default)}(${n}, ${a})`) : e.fail((0, Jo._)`${s} !== ${n}`);
  }
};
Bc.default = L0;
var Gc = {};
Object.defineProperty(Gc, "__esModule", { value: !0 });
const xr = ee, F0 = U, M0 = Wr, U0 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, xr._)`{allowedValues: ${e}}`
}, z0 = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: U0,
  code(e) {
    const { gen: t, data: n, $data: r, schema: a, schemaCode: s, it: o } = e;
    if (!r && a.length === 0)
      throw new Error("enum must have non-empty array");
    const c = a.length >= o.opts.loopEnum;
    let l;
    const u = () => l ?? (l = (0, F0.useFunc)(t, M0.default));
    let i;
    if (c || r)
      i = t.let("valid"), e.block$data(i, d);
    else {
      if (!Array.isArray(a))
        throw new Error("ajv implementation error");
      const $ = t.const("vSchema", s);
      i = (0, xr.or)(...a.map((y, g) => v($, g)));
    }
    e.pass(i);
    function d() {
      t.assign(i, !1), t.forOf("v", s, ($) => t.if((0, xr._)`${u()}(${n}, ${$})`, () => t.assign(i, !0).break()));
    }
    function v($, y) {
      const g = a[y];
      return typeof g == "object" && g !== null ? (0, xr._)`${u()}(${n}, ${$}[${y}])` : (0, xr._)`${n} === ${g}`;
    }
  }
};
Gc.default = z0;
Object.defineProperty(Cc, "__esModule", { value: !0 });
const q0 = Ic, V0 = Dc, B0 = Lc, G0 = Mc, K0 = Uc, H0 = zc, W0 = qc, J0 = Vc, X0 = Bc, Y0 = Gc, Q0 = [
  // number
  q0.default,
  V0.default,
  // string
  B0.default,
  G0.default,
  // object
  K0.default,
  H0.default,
  // array
  W0.default,
  J0.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  X0.default,
  Y0.default
];
Cc.default = Q0;
var Kc = {}, sr = {};
Object.defineProperty(sr, "__esModule", { value: !0 });
sr.validateAdditionalItems = void 0;
const bn = ee, Xo = U, Z0 = {
  message: ({ params: { len: e } }) => (0, bn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, bn._)`{limit: ${e}}`
}, ew = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Z0,
  code(e) {
    const { parentSchema: t, it: n } = e, { items: r } = t;
    if (!Array.isArray(r)) {
      (0, Xo.checkStrictMode)(n, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    om(e, r);
  }
};
function om(e, t) {
  const { gen: n, schema: r, data: a, keyword: s, it: o } = e;
  o.items = !0;
  const c = n.const("len", (0, bn._)`${a}.length`);
  if (r === !1)
    e.setParams({ len: t.length }), e.pass((0, bn._)`${c} <= ${t.length}`);
  else if (typeof r == "object" && !(0, Xo.alwaysValidSchema)(o, r)) {
    const u = n.var("valid", (0, bn._)`${c} <= ${t.length}`);
    n.if((0, bn.not)(u), () => l(u)), e.ok(u);
  }
  function l(u) {
    n.forRange("i", t.length, c, (i) => {
      e.subschema({ keyword: s, dataProp: i, dataPropType: Xo.Type.Num }, u), o.allErrors || n.if((0, bn.not)(u), () => n.break());
    });
  }
}
sr.validateAdditionalItems = om;
sr.default = ew;
var Hc = {}, or = {};
Object.defineProperty(or, "__esModule", { value: !0 });
or.validateTuple = void 0;
const Pu = ee, ja = U, tw = ne, nw = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: n } = e;
    if (Array.isArray(t))
      return im(e, "additionalItems", t);
    n.items = !0, !(0, ja.alwaysValidSchema)(n, t) && e.ok((0, tw.validateArray)(e));
  }
};
function im(e, t, n = e.schema) {
  const { gen: r, parentSchema: a, data: s, keyword: o, it: c } = e;
  i(a), c.opts.unevaluated && n.length && c.items !== !0 && (c.items = ja.mergeEvaluated.items(r, n.length, c.items));
  const l = r.name("valid"), u = r.const("len", (0, Pu._)`${s}.length`);
  n.forEach((d, v) => {
    (0, ja.alwaysValidSchema)(c, d) || (r.if((0, Pu._)`${u} > ${v}`, () => e.subschema({
      keyword: o,
      schemaProp: v,
      dataProp: v
    }, l)), e.ok(l));
  });
  function i(d) {
    const { opts: v, errSchemaPath: $ } = c, y = n.length, g = y === d.minItems && (y === d.maxItems || d[t] === !1);
    if (v.strictTuples && !g) {
      const h = `"${o}" is ${y}-tuple, but minItems or maxItems/${t} are not specified or different at path "${$}"`;
      (0, ja.checkStrictMode)(c, h, v.strictTuples);
    }
  }
}
or.validateTuple = im;
or.default = nw;
Object.defineProperty(Hc, "__esModule", { value: !0 });
const rw = or, aw = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, rw.validateTuple)(e, "items")
};
Hc.default = aw;
var Wc = {};
Object.defineProperty(Wc, "__esModule", { value: !0 });
const Ru = ee, sw = U, ow = ne, iw = sr, cw = {
  message: ({ params: { len: e } }) => (0, Ru.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ru._)`{limit: ${e}}`
}, lw = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: cw,
  code(e) {
    const { schema: t, parentSchema: n, it: r } = e, { prefixItems: a } = n;
    r.items = !0, !(0, sw.alwaysValidSchema)(r, t) && (a ? (0, iw.validateAdditionalItems)(e, a) : e.ok((0, ow.validateArray)(e)));
  }
};
Wc.default = lw;
var Jc = {};
Object.defineProperty(Jc, "__esModule", { value: !0 });
const tt = ee, pa = U, uw = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, tt.str)`must contain at least ${e} valid item(s)` : (0, tt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, tt._)`{minContains: ${e}}` : (0, tt._)`{minContains: ${e}, maxContains: ${t}}`
}, pw = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: uw,
  code(e) {
    const { gen: t, schema: n, parentSchema: r, data: a, it: s } = e;
    let o, c;
    const { minContains: l, maxContains: u } = r;
    s.opts.next ? (o = l === void 0 ? 1 : l, c = u) : o = 1;
    const i = t.const("len", (0, tt._)`${a}.length`);
    if (e.setParams({ min: o, max: c }), c === void 0 && o === 0) {
      (0, pa.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (c !== void 0 && o > c) {
      (0, pa.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, pa.alwaysValidSchema)(s, n)) {
      let g = (0, tt._)`${i} >= ${o}`;
      c !== void 0 && (g = (0, tt._)`${g} && ${i} <= ${c}`), e.pass(g);
      return;
    }
    s.items = !0;
    const d = t.name("valid");
    c === void 0 && o === 1 ? $(d, () => t.if(d, () => t.break())) : o === 0 ? (t.let(d, !0), c !== void 0 && t.if((0, tt._)`${a}.length > 0`, v)) : (t.let(d, !1), v()), e.result(d, () => e.reset());
    function v() {
      const g = t.name("_valid"), h = t.let("count", 0);
      $(g, () => t.if(g, () => y(h)));
    }
    function $(g, h) {
      t.forRange("i", 0, i, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: pa.Type.Num,
          compositeRule: !0
        }, g), h();
      });
    }
    function y(g) {
      t.code((0, tt._)`${g}++`), c === void 0 ? t.if((0, tt._)`${g} >= ${o}`, () => t.assign(d, !0).break()) : (t.if((0, tt._)`${g} > ${c}`, () => t.assign(d, !1).break()), o === 1 ? t.assign(d, !0) : t.if((0, tt._)`${g} >= ${o}`, () => t.assign(d, !0)));
    }
  }
};
Jc.default = pw;
var cm = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ee, n = U, r = ne;
  e.error = {
    message: ({ params: { property: l, depsCount: u, deps: i } }) => {
      const d = u === 1 ? "property" : "properties";
      return (0, t.str)`must have ${d} ${i} when property ${l} is present`;
    },
    params: ({ params: { property: l, depsCount: u, deps: i, missingProperty: d } }) => (0, t._)`{property: ${l},
    missingProperty: ${d},
    depsCount: ${u},
    deps: ${i}}`
    // TODO change to reference
  };
  const a = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(l) {
      const [u, i] = s(l);
      o(l, u), c(l, i);
    }
  };
  function s({ schema: l }) {
    const u = {}, i = {};
    for (const d in l) {
      if (d === "__proto__")
        continue;
      const v = Array.isArray(l[d]) ? u : i;
      v[d] = l[d];
    }
    return [u, i];
  }
  function o(l, u = l.schema) {
    const { gen: i, data: d, it: v } = l;
    if (Object.keys(u).length === 0)
      return;
    const $ = i.let("missing");
    for (const y in u) {
      const g = u[y];
      if (g.length === 0)
        continue;
      const h = (0, r.propertyInData)(i, d, y, v.opts.ownProperties);
      l.setParams({
        property: y,
        depsCount: g.length,
        deps: g.join(", ")
      }), v.allErrors ? i.if(h, () => {
        for (const m of g)
          (0, r.checkReportMissingProp)(l, m);
      }) : (i.if((0, t._)`${h} && (${(0, r.checkMissingProp)(l, g, $)})`), (0, r.reportMissingProp)(l, $), i.else());
    }
  }
  e.validatePropertyDeps = o;
  function c(l, u = l.schema) {
    const { gen: i, data: d, keyword: v, it: $ } = l, y = i.name("valid");
    for (const g in u)
      (0, n.alwaysValidSchema)($, u[g]) || (i.if(
        (0, r.propertyInData)(i, d, g, $.opts.ownProperties),
        () => {
          const h = l.subschema({ keyword: v, schemaProp: g }, y);
          l.mergeValidEvaluated(h, y);
        },
        () => i.var(y, !0)
        // TODO var
      ), l.ok(y));
  }
  e.validateSchemaDeps = c, e.default = a;
})(cm);
var Xc = {};
Object.defineProperty(Xc, "__esModule", { value: !0 });
const lm = ee, dw = U, fw = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, lm._)`{propertyName: ${e.propertyName}}`
}, mw = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: fw,
  code(e) {
    const { gen: t, schema: n, data: r, it: a } = e;
    if ((0, dw.alwaysValidSchema)(a, n))
      return;
    const s = t.name("valid");
    t.forIn("key", r, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, s), t.if((0, lm.not)(s), () => {
        e.error(!0), a.allErrors || t.break();
      });
    }), e.ok(s);
  }
};
Xc.default = mw;
var ys = {};
Object.defineProperty(ys, "__esModule", { value: !0 });
const da = ne, ot = ee, hw = St, fa = U, vw = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, ot._)`{additionalProperty: ${e.additionalProperty}}`
}, yw = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: vw,
  code(e) {
    const { gen: t, schema: n, parentSchema: r, data: a, errsCount: s, it: o } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: c, opts: l } = o;
    if (o.props = !0, l.removeAdditional !== "all" && (0, fa.alwaysValidSchema)(o, n))
      return;
    const u = (0, da.allSchemaProperties)(r.properties), i = (0, da.allSchemaProperties)(r.patternProperties);
    d(), e.ok((0, ot._)`${s} === ${hw.default.errors}`);
    function d() {
      t.forIn("key", a, (h) => {
        !u.length && !i.length ? y(h) : t.if(v(h), () => y(h));
      });
    }
    function v(h) {
      let m;
      if (u.length > 8) {
        const _ = (0, fa.schemaRefOrVal)(o, r.properties, "properties");
        m = (0, da.isOwnProperty)(t, _, h);
      } else u.length ? m = (0, ot.or)(...u.map((_) => (0, ot._)`${h} === ${_}`)) : m = ot.nil;
      return i.length && (m = (0, ot.or)(m, ...i.map((_) => (0, ot._)`${(0, da.usePattern)(e, _)}.test(${h})`))), (0, ot.not)(m);
    }
    function $(h) {
      t.code((0, ot._)`delete ${a}[${h}]`);
    }
    function y(h) {
      if (l.removeAdditional === "all" || l.removeAdditional && n === !1) {
        $(h);
        return;
      }
      if (n === !1) {
        e.setParams({ additionalProperty: h }), e.error(), c || t.break();
        return;
      }
      if (typeof n == "object" && !(0, fa.alwaysValidSchema)(o, n)) {
        const m = t.name("valid");
        l.removeAdditional === "failing" ? (g(h, m, !1), t.if((0, ot.not)(m), () => {
          e.reset(), $(h);
        })) : (g(h, m), c || t.if((0, ot.not)(m), () => t.break()));
      }
    }
    function g(h, m, _) {
      const P = {
        keyword: "additionalProperties",
        dataProp: h,
        dataPropType: fa.Type.Str
      };
      _ === !1 && Object.assign(P, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(P, m);
    }
  }
};
ys.default = yw;
var Yc = {};
Object.defineProperty(Yc, "__esModule", { value: !0 });
const gw = ut, Ou = ne, Js = U, ku = ys, bw = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: n, parentSchema: r, data: a, it: s } = e;
    s.opts.removeAdditional === "all" && r.additionalProperties === void 0 && ku.default.code(new gw.KeywordCxt(s, ku.default, "additionalProperties"));
    const o = (0, Ou.allSchemaProperties)(n);
    for (const d of o)
      s.definedProperties.add(d);
    s.opts.unevaluated && o.length && s.props !== !0 && (s.props = Js.mergeEvaluated.props(t, (0, Js.toHash)(o), s.props));
    const c = o.filter((d) => !(0, Js.alwaysValidSchema)(s, n[d]));
    if (c.length === 0)
      return;
    const l = t.name("valid");
    for (const d of c)
      u(d) ? i(d) : (t.if((0, Ou.propertyInData)(t, a, d, s.opts.ownProperties)), i(d), s.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(d), e.ok(l);
    function u(d) {
      return s.opts.useDefaults && !s.compositeRule && n[d].default !== void 0;
    }
    function i(d) {
      e.subschema({
        keyword: "properties",
        schemaProp: d,
        dataProp: d
      }, l);
    }
  }
};
Yc.default = bw;
var Qc = {};
Object.defineProperty(Qc, "__esModule", { value: !0 });
const Tu = ne, ma = ee, ju = U, Nu = U, $w = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: n, data: r, parentSchema: a, it: s } = e, { opts: o } = s, c = (0, Tu.allSchemaProperties)(n), l = c.filter((g) => (0, ju.alwaysValidSchema)(s, n[g]));
    if (c.length === 0 || l.length === c.length && (!s.opts.unevaluated || s.props === !0))
      return;
    const u = o.strictSchema && !o.allowMatchingProperties && a.properties, i = t.name("valid");
    s.props !== !0 && !(s.props instanceof ma.Name) && (s.props = (0, Nu.evaluatedPropsToName)(t, s.props));
    const { props: d } = s;
    v();
    function v() {
      for (const g of c)
        u && $(g), s.allErrors ? y(g) : (t.var(i, !0), y(g), t.if(i));
    }
    function $(g) {
      for (const h in u)
        new RegExp(g).test(h) && (0, ju.checkStrictMode)(s, `property ${h} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function y(g) {
      t.forIn("key", r, (h) => {
        t.if((0, ma._)`${(0, Tu.usePattern)(e, g)}.test(${h})`, () => {
          const m = l.includes(g);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: h,
            dataPropType: Nu.Type.Str
          }, i), s.opts.unevaluated && d !== !0 ? t.assign((0, ma._)`${d}[${h}]`, !0) : !m && !s.allErrors && t.if((0, ma.not)(i), () => t.break());
        });
      });
    }
  }
};
Qc.default = $w;
var Zc = {};
Object.defineProperty(Zc, "__esModule", { value: !0 });
const xw = U, _w = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: n, it: r } = e;
    if ((0, xw.alwaysValidSchema)(r, n)) {
      e.fail();
      return;
    }
    const a = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, a), e.failResult(a, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Zc.default = _w;
var el = {};
Object.defineProperty(el, "__esModule", { value: !0 });
const ww = ne, Ew = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: ww.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
el.default = Ew;
var tl = {};
Object.defineProperty(tl, "__esModule", { value: !0 });
const Na = ee, Sw = U, Pw = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Na._)`{passingSchemas: ${e.passing}}`
}, Rw = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Pw,
  code(e) {
    const { gen: t, schema: n, parentSchema: r, it: a } = e;
    if (!Array.isArray(n))
      throw new Error("ajv implementation error");
    if (a.opts.discriminator && r.discriminator)
      return;
    const s = n, o = t.let("valid", !1), c = t.let("passing", null), l = t.name("_valid");
    e.setParams({ passing: c }), t.block(u), e.result(o, () => e.reset(), () => e.error(!0));
    function u() {
      s.forEach((i, d) => {
        let v;
        (0, Sw.alwaysValidSchema)(a, i) ? t.var(l, !0) : v = e.subschema({
          keyword: "oneOf",
          schemaProp: d,
          compositeRule: !0
        }, l), d > 0 && t.if((0, Na._)`${l} && ${o}`).assign(o, !1).assign(c, (0, Na._)`[${c}, ${d}]`).else(), t.if(l, () => {
          t.assign(o, !0), t.assign(c, d), v && e.mergeEvaluated(v, Na.Name);
        });
      });
    }
  }
};
tl.default = Rw;
var nl = {};
Object.defineProperty(nl, "__esModule", { value: !0 });
const Ow = U, kw = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: n, it: r } = e;
    if (!Array.isArray(n))
      throw new Error("ajv implementation error");
    const a = t.name("valid");
    n.forEach((s, o) => {
      if ((0, Ow.alwaysValidSchema)(r, s))
        return;
      const c = e.subschema({ keyword: "allOf", schemaProp: o }, a);
      e.ok(a), e.mergeEvaluated(c);
    });
  }
};
nl.default = kw;
var rl = {};
Object.defineProperty(rl, "__esModule", { value: !0 });
const Ja = ee, um = U, Tw = {
  message: ({ params: e }) => (0, Ja.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Ja._)`{failingKeyword: ${e.ifClause}}`
}, jw = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Tw,
  code(e) {
    const { gen: t, parentSchema: n, it: r } = e;
    n.then === void 0 && n.else === void 0 && (0, um.checkStrictMode)(r, '"if" without "then" and "else" is ignored');
    const a = Au(r, "then"), s = Au(r, "else");
    if (!a && !s)
      return;
    const o = t.let("valid", !0), c = t.name("_valid");
    if (l(), e.reset(), a && s) {
      const i = t.let("ifClause");
      e.setParams({ ifClause: i }), t.if(c, u("then", i), u("else", i));
    } else a ? t.if(c, u("then")) : t.if((0, Ja.not)(c), u("else"));
    e.pass(o, () => e.error(!0));
    function l() {
      const i = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, c);
      e.mergeEvaluated(i);
    }
    function u(i, d) {
      return () => {
        const v = e.subschema({ keyword: i }, c);
        t.assign(o, c), e.mergeValidEvaluated(v, o), d ? t.assign(d, (0, Ja._)`${i}`) : e.setParams({ ifClause: i });
      };
    }
  }
};
function Au(e, t) {
  const n = e.schema[t];
  return n !== void 0 && !(0, um.alwaysValidSchema)(e, n);
}
rl.default = jw;
var al = {};
Object.defineProperty(al, "__esModule", { value: !0 });
const Nw = U, Aw = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: n }) {
    t.if === void 0 && (0, Nw.checkStrictMode)(n, `"${e}" without "if" is ignored`);
  }
};
al.default = Aw;
Object.defineProperty(Kc, "__esModule", { value: !0 });
const Cw = sr, Iw = Hc, Dw = or, Lw = Wc, Fw = Jc, Mw = cm, Uw = Xc, zw = ys, qw = Yc, Vw = Qc, Bw = Zc, Gw = el, Kw = tl, Hw = nl, Ww = rl, Jw = al;
function Xw(e = !1) {
  const t = [
    // any
    Bw.default,
    Gw.default,
    Kw.default,
    Hw.default,
    Ww.default,
    Jw.default,
    // object
    Uw.default,
    zw.default,
    Mw.default,
    qw.default,
    Vw.default
  ];
  return e ? t.push(Iw.default, Lw.default) : t.push(Cw.default, Dw.default), t.push(Fw.default), t;
}
Kc.default = Xw;
var sl = {}, ol = {};
Object.defineProperty(ol, "__esModule", { value: !0 });
const Ee = ee, Yw = {
  message: ({ schemaCode: e }) => (0, Ee.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Ee._)`{format: ${e}}`
}, Qw = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Yw,
  code(e, t) {
    const { gen: n, data: r, $data: a, schema: s, schemaCode: o, it: c } = e, { opts: l, errSchemaPath: u, schemaEnv: i, self: d } = c;
    if (!l.validateFormats)
      return;
    a ? v() : $();
    function v() {
      const y = n.scopeValue("formats", {
        ref: d.formats,
        code: l.code.formats
      }), g = n.const("fDef", (0, Ee._)`${y}[${o}]`), h = n.let("fType"), m = n.let("format");
      n.if((0, Ee._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => n.assign(h, (0, Ee._)`${g}.type || "string"`).assign(m, (0, Ee._)`${g}.validate`), () => n.assign(h, (0, Ee._)`"string"`).assign(m, g)), e.fail$data((0, Ee.or)(_(), P()));
      function _() {
        return l.strictSchema === !1 ? Ee.nil : (0, Ee._)`${o} && !${m}`;
      }
      function P() {
        const O = i.$async ? (0, Ee._)`(${g}.async ? await ${m}(${r}) : ${m}(${r}))` : (0, Ee._)`${m}(${r})`, T = (0, Ee._)`(typeof ${m} == "function" ? ${O} : ${m}.test(${r}))`;
        return (0, Ee._)`${m} && ${m} !== true && ${h} === ${t} && !${T}`;
      }
    }
    function $() {
      const y = d.formats[s];
      if (!y) {
        _();
        return;
      }
      if (y === !0)
        return;
      const [g, h, m] = P(y);
      g === t && e.pass(O());
      function _() {
        if (l.strictSchema === !1) {
          d.logger.warn(T());
          return;
        }
        throw new Error(T());
        function T() {
          return `unknown format "${s}" ignored in schema at path "${u}"`;
        }
      }
      function P(T) {
        const L = T instanceof RegExp ? (0, Ee.regexpCode)(T) : l.code.formats ? (0, Ee._)`${l.code.formats}${(0, Ee.getProperty)(s)}` : void 0, q = n.scopeValue("formats", { key: s, ref: T, code: L });
        return typeof T == "object" && !(T instanceof RegExp) ? [T.type || "string", T.validate, (0, Ee._)`${q}.validate`] : ["string", T, q];
      }
      function O() {
        if (typeof y == "object" && !(y instanceof RegExp) && y.async) {
          if (!i.$async)
            throw new Error("async format in sync schema");
          return (0, Ee._)`await ${m}(${r})`;
        }
        return typeof h == "function" ? (0, Ee._)`${m}(${r})` : (0, Ee._)`${m}.test(${r})`;
      }
    }
  }
};
ol.default = Qw;
Object.defineProperty(sl, "__esModule", { value: !0 });
const Zw = ol, eE = [Zw.default];
sl.default = eE;
var Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.contentVocabulary = Qn.metadataVocabulary = void 0;
Qn.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Qn.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(jc, "__esModule", { value: !0 });
const tE = Nc, nE = Cc, rE = Kc, aE = sl, Cu = Qn, sE = [
  tE.default,
  nE.default,
  (0, rE.default)(),
  aE.default,
  Cu.metadataVocabulary,
  Cu.contentVocabulary
];
jc.default = sE;
var il = {}, gs = {};
Object.defineProperty(gs, "__esModule", { value: !0 });
gs.DiscrError = void 0;
var Iu;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Iu || (gs.DiscrError = Iu = {}));
Object.defineProperty(il, "__esModule", { value: !0 });
const Ln = ee, Yo = gs, Du = He, oE = ar, iE = U, cE = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Yo.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: n } }) => (0, Ln._)`{error: ${e}, tag: ${n}, tagValue: ${t}}`
}, lE = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: cE,
  code(e) {
    const { gen: t, data: n, schema: r, parentSchema: a, it: s } = e, { oneOf: o } = a;
    if (!s.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const c = r.propertyName;
    if (typeof c != "string")
      throw new Error("discriminator: requires propertyName");
    if (r.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const l = t.let("valid", !1), u = t.const("tag", (0, Ln._)`${n}${(0, Ln.getProperty)(c)}`);
    t.if((0, Ln._)`typeof ${u} == "string"`, () => i(), () => e.error(!1, { discrError: Yo.DiscrError.Tag, tag: u, tagName: c })), e.ok(l);
    function i() {
      const $ = v();
      t.if(!1);
      for (const y in $)
        t.elseIf((0, Ln._)`${u} === ${y}`), t.assign(l, d($[y]));
      t.else(), e.error(!1, { discrError: Yo.DiscrError.Mapping, tag: u, tagName: c }), t.endIf();
    }
    function d($) {
      const y = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: $ }, y);
      return e.mergeEvaluated(g, Ln.Name), y;
    }
    function v() {
      var $;
      const y = {}, g = m(a);
      let h = !0;
      for (let O = 0; O < o.length; O++) {
        let T = o[O];
        if (T != null && T.$ref && !(0, iE.schemaHasRulesButRef)(T, s.self.RULES)) {
          const q = T.$ref;
          if (T = Du.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, q), T instanceof Du.SchemaEnv && (T = T.schema), T === void 0)
            throw new oE.default(s.opts.uriResolver, s.baseId, q);
        }
        const L = ($ = T == null ? void 0 : T.properties) === null || $ === void 0 ? void 0 : $[c];
        if (typeof L != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${c}"`);
        h = h && (g || m(T)), _(L, O);
      }
      if (!h)
        throw new Error(`discriminator: "${c}" must be required`);
      return y;
      function m({ required: O }) {
        return Array.isArray(O) && O.includes(c);
      }
      function _(O, T) {
        if (O.const)
          P(O.const, T);
        else if (O.enum)
          for (const L of O.enum)
            P(L, T);
        else
          throw new Error(`discriminator: "properties/${c}" must have "const" or "enum"`);
      }
      function P(O, T) {
        if (typeof O != "string" || O in y)
          throw new Error(`discriminator: "${c}" values must be unique strings`);
        y[O] = T;
      }
    }
  }
};
il.default = lE;
const uE = "http://json-schema.org/draft-07/schema#", pE = "http://json-schema.org/draft-07/schema#", dE = "Core schema meta-schema", fE = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, mE = [
  "object",
  "boolean"
], hE = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, vE = {
  $schema: uE,
  $id: pE,
  title: dE,
  definitions: fE,
  type: mE,
  properties: hE,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const n = Ef, r = jc, a = il, s = vE, o = ["/properties"], c = "http://json-schema.org/draft-07/schema";
  class l extends n.default {
    _addVocabularies() {
      super._addVocabularies(), r.default.forEach((y) => this.addVocabulary(y)), this.opts.discriminator && this.addKeyword(a.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const y = this.opts.$data ? this.$dataMetaSchema(s, o) : s;
      this.addMetaSchema(y, c, !1), this.refs["http://json-schema.org/schema"] = c;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(c) ? c : void 0);
    }
  }
  t.Ajv = l, e.exports = t = l, e.exports.Ajv = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  var u = ut;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return u.KeywordCxt;
  } });
  var i = ee;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return i._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return i.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return i.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return i.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return i.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return i.CodeGen;
  } });
  var d = Hr;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return d.default;
  } });
  var v = ar;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return v.default;
  } });
})(Bo, Bo.exports);
var yE = Bo.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = yE, n = ee, r = n.operators, a = {
    formatMaximum: { okStr: "<=", ok: r.LTE, fail: r.GT },
    formatMinimum: { okStr: ">=", ok: r.GTE, fail: r.LT },
    formatExclusiveMaximum: { okStr: "<", ok: r.LT, fail: r.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: r.GT, fail: r.LTE }
  }, s = {
    message: ({ keyword: c, schemaCode: l }) => n.str`should be ${a[c].okStr} ${l}`,
    params: ({ keyword: c, schemaCode: l }) => n._`{comparison: ${a[c].okStr}, limit: ${l}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(a),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: s,
    code(c) {
      const { gen: l, data: u, schemaCode: i, keyword: d, it: v } = c, { opts: $, self: y } = v;
      if (!$.validateFormats)
        return;
      const g = new t.KeywordCxt(v, y.RULES.all.format.definition, "format");
      g.$data ? h() : m();
      function h() {
        const P = l.scopeValue("formats", {
          ref: y.formats,
          code: $.code.formats
        }), O = l.const("fmt", n._`${P}[${g.schemaCode}]`);
        c.fail$data(n.or(n._`typeof ${O} != "object"`, n._`${O} instanceof RegExp`, n._`typeof ${O}.compare != "function"`, _(O)));
      }
      function m() {
        const P = g.schema, O = y.formats[P];
        if (!O || O === !0)
          return;
        if (typeof O != "object" || O instanceof RegExp || typeof O.compare != "function")
          throw new Error(`"${d}": format "${P}" does not define "compare" function`);
        const T = l.scopeValue("formats", {
          key: P,
          ref: O,
          code: $.code.formats ? n._`${$.code.formats}${n.getProperty(P)}` : void 0
        });
        c.fail$data(_(T));
      }
      function _(P) {
        return n._`${P}.compare(${u}, ${i}) ${a[d].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const o = (c) => (c.addKeyword(e.formatLimitDefinition), c);
  e.default = o;
})(wf);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const n = _f, r = wf, a = ee, s = new a.Name("fullFormats"), o = new a.Name("fastFormats"), c = (u, i = { keywords: !0 }) => {
    if (Array.isArray(i))
      return l(u, i, n.fullFormats, s), u;
    const [d, v] = i.mode === "fast" ? [n.fastFormats, o] : [n.fullFormats, s], $ = i.formats || n.formatNames;
    return l(u, $, d, v), i.keywords && r.default(u), u;
  };
  c.get = (u, i = "full") => {
    const v = (i === "fast" ? n.fastFormats : n.fullFormats)[u];
    if (!v)
      throw new Error(`Unknown format "${u}"`);
    return v;
  };
  function l(u, i, d, v) {
    var $, y;
    ($ = (y = u.opts.code).formats) !== null && $ !== void 0 || (y.formats = a._`require("ajv-formats/dist/formats").${v}`);
    for (const g of i)
      u.addFormat(g, d[g]);
  }
  e.exports = t = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
})(Vo, Vo.exports);
var gE = Vo.exports;
const bE = (e, t, n, r) => {
  if (n === "length" || n === "prototype" || n === "arguments" || n === "caller")
    return;
  const a = Object.getOwnPropertyDescriptor(e, n), s = Object.getOwnPropertyDescriptor(t, n);
  !$E(a, s) && r || Object.defineProperty(e, n, s);
}, $E = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, xE = (e, t) => {
  const n = Object.getPrototypeOf(t);
  n !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, n);
}, _E = (e, t) => `/* Wrapped ${e}*/
${t}`, wE = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), EE = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), SE = (e, t, n) => {
  const r = n === "" ? "" : `with ${n.trim()}() `, a = _E.bind(null, r, t.toString());
  Object.defineProperty(a, "name", EE), Object.defineProperty(e, "toString", { ...wE, value: a });
}, PE = (e, t, { ignoreNonConfigurable: n = !1 } = {}) => {
  const { name: r } = e;
  for (const a of Reflect.ownKeys(t))
    bE(e, t, a, n);
  return xE(e, t), SE(e, t, r), e;
};
var RE = PE;
const OE = RE;
var kE = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: n = 0,
    before: r = !1,
    after: a = !0
  } = t;
  if (!r && !a)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let s, o;
  const c = function(...l) {
    const u = this, i = () => {
      s = void 0, a && (o = e.apply(u, l));
    }, d = r && !s;
    return clearTimeout(s), s = setTimeout(i, n), d && (o = e.apply(u, l)), o;
  };
  return OE(c, e), c.cancel = () => {
    s && (clearTimeout(s), s = void 0);
  }, c;
}, Qo = { exports: {} };
const TE = "2.0.0", pm = 256, jE = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, NE = 16, AE = pm - 6, CE = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var bs = {
  MAX_LENGTH: pm,
  MAX_SAFE_COMPONENT_LENGTH: NE,
  MAX_SAFE_BUILD_LENGTH: AE,
  MAX_SAFE_INTEGER: jE,
  RELEASE_TYPES: CE,
  SEMVER_SPEC_VERSION: TE,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const IE = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var $s = IE;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: a
  } = bs, s = $s;
  t = e.exports = {};
  const o = t.re = [], c = t.safeRe = [], l = t.src = [], u = t.safeSrc = [], i = t.t = {};
  let d = 0;
  const v = "[a-zA-Z0-9-]", $ = [
    ["\\s", 1],
    ["\\d", a],
    [v, r]
  ], y = (h) => {
    for (const [m, _] of $)
      h = h.split(`${m}*`).join(`${m}{0,${_}}`).split(`${m}+`).join(`${m}{1,${_}}`);
    return h;
  }, g = (h, m, _) => {
    const P = y(m), O = d++;
    s(h, O, m), i[h] = O, l[O] = m, u[O] = P, o[O] = new RegExp(m, _ ? "g" : void 0), c[O] = new RegExp(P, _ ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${v}*`), g("MAINVERSION", `(${l[i.NUMERICIDENTIFIER]})\\.(${l[i.NUMERICIDENTIFIER]})\\.(${l[i.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${l[i.NUMERICIDENTIFIERLOOSE]})\\.(${l[i.NUMERICIDENTIFIERLOOSE]})\\.(${l[i.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${l[i.NUMERICIDENTIFIER]}|${l[i.NONNUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${l[i.NUMERICIDENTIFIERLOOSE]}|${l[i.NONNUMERICIDENTIFIER]})`), g("PRERELEASE", `(?:-(${l[i.PRERELEASEIDENTIFIER]}(?:\\.${l[i.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${l[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[i.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${v}+`), g("BUILD", `(?:\\+(${l[i.BUILDIDENTIFIER]}(?:\\.${l[i.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${l[i.MAINVERSION]}${l[i.PRERELEASE]}?${l[i.BUILD]}?`), g("FULL", `^${l[i.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${l[i.MAINVERSIONLOOSE]}${l[i.PRERELEASELOOSE]}?${l[i.BUILD]}?`), g("LOOSE", `^${l[i.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${l[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${l[i.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${l[i.XRANGEIDENTIFIER]})(?:\\.(${l[i.XRANGEIDENTIFIER]})(?:\\.(${l[i.XRANGEIDENTIFIER]})(?:${l[i.PRERELEASE]})?${l[i.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${l[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[i.XRANGEIDENTIFIERLOOSE]})(?:${l[i.PRERELEASELOOSE]})?${l[i.BUILD]}?)?)?`), g("XRANGE", `^${l[i.GTLT]}\\s*${l[i.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${l[i.GTLT]}\\s*${l[i.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), g("COERCE", `${l[i.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", l[i.COERCEPLAIN] + `(?:${l[i.PRERELEASE]})?(?:${l[i.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", l[i.COERCE], !0), g("COERCERTLFULL", l[i.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${l[i.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${l[i.LONETILDE]}${l[i.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${l[i.LONETILDE]}${l[i.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${l[i.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${l[i.LONECARET]}${l[i.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${l[i.LONECARET]}${l[i.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${l[i.GTLT]}\\s*(${l[i.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${l[i.GTLT]}\\s*(${l[i.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${l[i.GTLT]}\\s*(${l[i.LOOSEPLAIN]}|${l[i.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${l[i.XRANGEPLAIN]})\\s+-\\s+(${l[i.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${l[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[i.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Qo, Qo.exports);
var Jr = Qo.exports;
const DE = Object.freeze({ loose: !0 }), LE = Object.freeze({}), FE = (e) => e ? typeof e != "object" ? DE : e : LE;
var cl = FE;
const Lu = /^[0-9]+$/, dm = (e, t) => {
  const n = Lu.test(e), r = Lu.test(t);
  return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1;
}, ME = (e, t) => dm(t, e);
var fm = {
  compareIdentifiers: dm,
  rcompareIdentifiers: ME
};
const ha = $s, { MAX_LENGTH: Fu, MAX_SAFE_INTEGER: va } = bs, { safeRe: Mu, safeSrc: Uu, t: ya } = Jr, UE = cl, { compareIdentifiers: Cn } = fm;
let zE = class yt {
  constructor(t, n) {
    if (n = UE(n), t instanceof yt) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Fu)
      throw new TypeError(
        `version is longer than ${Fu} characters`
      );
    ha("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const r = t.trim().match(n.loose ? Mu[ya.LOOSE] : Mu[ya.FULL]);
    if (!r)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > va || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > va || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > va || this.patch < 0)
      throw new TypeError("Invalid patch version");
    r[4] ? this.prerelease = r[4].split(".").map((a) => {
      if (/^[0-9]+$/.test(a)) {
        const s = +a;
        if (s >= 0 && s < va)
          return s;
      }
      return a;
    }) : this.prerelease = [], this.build = r[5] ? r[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (ha("SemVer.compare", this.version, this.options, t), !(t instanceof yt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new yt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof yt || (t = new yt(t, this.options)), Cn(this.major, t.major) || Cn(this.minor, t.minor) || Cn(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof yt || (t = new yt(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let n = 0;
    do {
      const r = this.prerelease[n], a = t.prerelease[n];
      if (ha("prerelease compare", n, r, a), r === void 0 && a === void 0)
        return 0;
      if (a === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === a)
        continue;
      return Cn(r, a);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof yt || (t = new yt(t, this.options));
    let n = 0;
    do {
      const r = this.build[n], a = t.build[n];
      if (ha("build compare", n, r, a), r === void 0 && a === void 0)
        return 0;
      if (a === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === a)
        continue;
      return Cn(r, a);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n, r) {
    if (t.startsWith("pre")) {
      if (!n && r === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (n) {
        const a = new RegExp(`^${this.options.loose ? Uu[ya.PRERELEASELOOSE] : Uu[ya.PRERELEASE]}$`), s = `-${n}`.match(a);
        if (!s || s[1] !== n)
          throw new Error(`invalid identifier: ${n}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", n, r);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", n, r);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const a = Number(r) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [a];
        else {
          let s = this.prerelease.length;
          for (; --s >= 0; )
            typeof this.prerelease[s] == "number" && (this.prerelease[s]++, s = -2);
          if (s === -1) {
            if (n === this.prerelease.join(".") && r === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(a);
          }
        }
        if (n) {
          let s = [n, a];
          r === !1 && (s = [n]), Cn(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = s) : this.prerelease = s;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var qe = zE;
const zu = qe, qE = (e, t, n = !1) => {
  if (e instanceof zu)
    return e;
  try {
    return new zu(e, t);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var ir = qE;
const VE = ir, BE = (e, t) => {
  const n = VE(e, t);
  return n ? n.version : null;
};
var GE = BE;
const KE = ir, HE = (e, t) => {
  const n = KE(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var WE = HE;
const qu = qe, JE = (e, t, n, r, a) => {
  typeof n == "string" && (a = r, r = n, n = void 0);
  try {
    return new qu(
      e instanceof qu ? e.version : e,
      n
    ).inc(t, r, a).version;
  } catch {
    return null;
  }
};
var XE = JE;
const Vu = ir, YE = (e, t) => {
  const n = Vu(e, null, !0), r = Vu(t, null, !0), a = n.compare(r);
  if (a === 0)
    return null;
  const s = a > 0, o = s ? n : r, c = s ? r : n, l = !!o.prerelease.length;
  if (!!c.prerelease.length && !l) {
    if (!c.patch && !c.minor)
      return "major";
    if (c.compareMain(o) === 0)
      return c.minor && !c.patch ? "minor" : "patch";
  }
  const i = l ? "pre" : "";
  return n.major !== r.major ? i + "major" : n.minor !== r.minor ? i + "minor" : n.patch !== r.patch ? i + "patch" : "prerelease";
};
var QE = YE;
const ZE = qe, eS = (e, t) => new ZE(e, t).major;
var tS = eS;
const nS = qe, rS = (e, t) => new nS(e, t).minor;
var aS = rS;
const sS = qe, oS = (e, t) => new sS(e, t).patch;
var iS = oS;
const cS = ir, lS = (e, t) => {
  const n = cS(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var uS = lS;
const Bu = qe, pS = (e, t, n) => new Bu(e, n).compare(new Bu(t, n));
var dt = pS;
const dS = dt, fS = (e, t, n) => dS(t, e, n);
var mS = fS;
const hS = dt, vS = (e, t) => hS(e, t, !0);
var yS = vS;
const Gu = qe, gS = (e, t, n) => {
  const r = new Gu(e, n), a = new Gu(t, n);
  return r.compare(a) || r.compareBuild(a);
};
var ll = gS;
const bS = ll, $S = (e, t) => e.sort((n, r) => bS(n, r, t));
var xS = $S;
const _S = ll, wS = (e, t) => e.sort((n, r) => _S(r, n, t));
var ES = wS;
const SS = dt, PS = (e, t, n) => SS(e, t, n) > 0;
var xs = PS;
const RS = dt, OS = (e, t, n) => RS(e, t, n) < 0;
var ul = OS;
const kS = dt, TS = (e, t, n) => kS(e, t, n) === 0;
var mm = TS;
const jS = dt, NS = (e, t, n) => jS(e, t, n) !== 0;
var hm = NS;
const AS = dt, CS = (e, t, n) => AS(e, t, n) >= 0;
var pl = CS;
const IS = dt, DS = (e, t, n) => IS(e, t, n) <= 0;
var dl = DS;
const LS = mm, FS = hm, MS = xs, US = pl, zS = ul, qS = dl, VS = (e, t, n, r) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return LS(e, n, r);
    case "!=":
      return FS(e, n, r);
    case ">":
      return MS(e, n, r);
    case ">=":
      return US(e, n, r);
    case "<":
      return zS(e, n, r);
    case "<=":
      return qS(e, n, r);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var vm = VS;
const BS = qe, GS = ir, { safeRe: ga, t: ba } = Jr, KS = (e, t) => {
  if (e instanceof BS)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? ga[ba.COERCEFULL] : ga[ba.COERCE]);
  else {
    const l = t.includePrerelease ? ga[ba.COERCERTLFULL] : ga[ba.COERCERTL];
    let u;
    for (; (u = l.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || u.index + u[0].length !== n.index + n[0].length) && (n = u), l.lastIndex = u.index + u[1].length + u[2].length;
    l.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], a = n[3] || "0", s = n[4] || "0", o = t.includePrerelease && n[5] ? `-${n[5]}` : "", c = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return GS(`${r}.${a}.${s}${o}${c}`, t);
};
var HS = KS;
class WS {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const n = this.map.get(t);
    if (n !== void 0)
      return this.map.delete(t), this.map.set(t, n), n;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, n) {
    if (!this.delete(t) && n !== void 0) {
      if (this.map.size >= this.max) {
        const a = this.map.keys().next().value;
        this.delete(a);
      }
      this.map.set(t, n);
    }
    return this;
  }
}
var JS = WS, Xs, Ku;
function ft() {
  if (Ku) return Xs;
  Ku = 1;
  const e = /\s+/g;
  class t {
    constructor(D, V) {
      if (V = a(V), D instanceof t)
        return D.loose === !!V.loose && D.includePrerelease === !!V.includePrerelease ? D : new t(D.raw, V);
      if (D instanceof s)
        return this.raw = D.value, this.set = [[D]], this.formatted = void 0, this;
      if (this.options = V, this.loose = !!V.loose, this.includePrerelease = !!V.includePrerelease, this.raw = D.trim().replace(e, " "), this.set = this.raw.split("||").map((C) => this.parseRange(C.trim())).filter((C) => C.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const C = this.set[0];
        if (this.set = this.set.filter((R) => !g(R[0])), this.set.length === 0)
          this.set = [C];
        else if (this.set.length > 1) {
          for (const R of this.set)
            if (R.length === 1 && h(R[0])) {
              this.set = [R];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let D = 0; D < this.set.length; D++) {
          D > 0 && (this.formatted += "||");
          const V = this.set[D];
          for (let C = 0; C < V.length; C++)
            C > 0 && (this.formatted += " "), this.formatted += V[C].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(D) {
      const C = ((this.options.includePrerelease && $) | (this.options.loose && y)) + ":" + D, R = r.get(C);
      if (R)
        return R;
      const j = this.options.loose, w = j ? l[u.HYPHENRANGELOOSE] : l[u.HYPHENRANGE];
      D = D.replace(w, J(this.options.includePrerelease)), o("hyphen replace", D), D = D.replace(l[u.COMPARATORTRIM], i), o("comparator trim", D), D = D.replace(l[u.TILDETRIM], d), o("tilde trim", D), D = D.replace(l[u.CARETTRIM], v), o("caret trim", D);
      let b = D.split(" ").map((f) => _(f, this.options)).join(" ").split(/\s+/).map((f) => ce(f, this.options));
      j && (b = b.filter((f) => (o("loose invalid filter", f, this.options), !!f.match(l[u.COMPARATORLOOSE])))), o("range list", b);
      const E = /* @__PURE__ */ new Map(), x = b.map((f) => new s(f, this.options));
      for (const f of x) {
        if (g(f))
          return [f];
        E.set(f.value, f);
      }
      E.size > 1 && E.has("") && E.delete("");
      const p = [...E.values()];
      return r.set(C, p), p;
    }
    intersects(D, V) {
      if (!(D instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((C) => m(C, V) && D.set.some((R) => m(R, V) && C.every((j) => R.every((w) => j.intersects(w, V)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(D) {
      if (!D)
        return !1;
      if (typeof D == "string")
        try {
          D = new c(D, this.options);
        } catch {
          return !1;
        }
      for (let V = 0; V < this.set.length; V++)
        if (de(this.set[V], D, this.options))
          return !0;
      return !1;
    }
  }
  Xs = t;
  const n = JS, r = new n(), a = cl, s = _s(), o = $s, c = qe, {
    safeRe: l,
    t: u,
    comparatorTrimReplace: i,
    tildeTrimReplace: d,
    caretTrimReplace: v
  } = Jr, { FLAG_INCLUDE_PRERELEASE: $, FLAG_LOOSE: y } = bs, g = (I) => I.value === "<0.0.0-0", h = (I) => I.value === "", m = (I, D) => {
    let V = !0;
    const C = I.slice();
    let R = C.pop();
    for (; V && C.length; )
      V = C.every((j) => R.intersects(j, D)), R = C.pop();
    return V;
  }, _ = (I, D) => (o("comp", I, D), I = L(I, D), o("caret", I), I = O(I, D), o("tildes", I), I = ae(I, D), o("xrange", I), I = K(I, D), o("stars", I), I), P = (I) => !I || I.toLowerCase() === "x" || I === "*", O = (I, D) => I.trim().split(/\s+/).map((V) => T(V, D)).join(" "), T = (I, D) => {
    const V = D.loose ? l[u.TILDELOOSE] : l[u.TILDE];
    return I.replace(V, (C, R, j, w, b) => {
      o("tilde", I, C, R, j, w, b);
      let E;
      return P(R) ? E = "" : P(j) ? E = `>=${R}.0.0 <${+R + 1}.0.0-0` : P(w) ? E = `>=${R}.${j}.0 <${R}.${+j + 1}.0-0` : b ? (o("replaceTilde pr", b), E = `>=${R}.${j}.${w}-${b} <${R}.${+j + 1}.0-0`) : E = `>=${R}.${j}.${w} <${R}.${+j + 1}.0-0`, o("tilde return", E), E;
    });
  }, L = (I, D) => I.trim().split(/\s+/).map((V) => q(V, D)).join(" "), q = (I, D) => {
    o("caret", I, D);
    const V = D.loose ? l[u.CARETLOOSE] : l[u.CARET], C = D.includePrerelease ? "-0" : "";
    return I.replace(V, (R, j, w, b, E) => {
      o("caret", I, R, j, w, b, E);
      let x;
      return P(j) ? x = "" : P(w) ? x = `>=${j}.0.0${C} <${+j + 1}.0.0-0` : P(b) ? j === "0" ? x = `>=${j}.${w}.0${C} <${j}.${+w + 1}.0-0` : x = `>=${j}.${w}.0${C} <${+j + 1}.0.0-0` : E ? (o("replaceCaret pr", E), j === "0" ? w === "0" ? x = `>=${j}.${w}.${b}-${E} <${j}.${w}.${+b + 1}-0` : x = `>=${j}.${w}.${b}-${E} <${j}.${+w + 1}.0-0` : x = `>=${j}.${w}.${b}-${E} <${+j + 1}.0.0-0`) : (o("no pr"), j === "0" ? w === "0" ? x = `>=${j}.${w}.${b}${C} <${j}.${w}.${+b + 1}-0` : x = `>=${j}.${w}.${b}${C} <${j}.${+w + 1}.0-0` : x = `>=${j}.${w}.${b} <${+j + 1}.0.0-0`), o("caret return", x), x;
    });
  }, ae = (I, D) => (o("replaceXRanges", I, D), I.split(/\s+/).map((V) => F(V, D)).join(" ")), F = (I, D) => {
    I = I.trim();
    const V = D.loose ? l[u.XRANGELOOSE] : l[u.XRANGE];
    return I.replace(V, (C, R, j, w, b, E) => {
      o("xRange", I, C, R, j, w, b, E);
      const x = P(j), p = x || P(w), f = p || P(b), S = f;
      return R === "=" && S && (R = ""), E = D.includePrerelease ? "-0" : "", x ? R === ">" || R === "<" ? C = "<0.0.0-0" : C = "*" : R && S ? (p && (w = 0), b = 0, R === ">" ? (R = ">=", p ? (j = +j + 1, w = 0, b = 0) : (w = +w + 1, b = 0)) : R === "<=" && (R = "<", p ? j = +j + 1 : w = +w + 1), R === "<" && (E = "-0"), C = `${R + j}.${w}.${b}${E}`) : p ? C = `>=${j}.0.0${E} <${+j + 1}.0.0-0` : f && (C = `>=${j}.${w}.0${E} <${j}.${+w + 1}.0-0`), o("xRange return", C), C;
    });
  }, K = (I, D) => (o("replaceStars", I, D), I.trim().replace(l[u.STAR], "")), ce = (I, D) => (o("replaceGTE0", I, D), I.trim().replace(l[D.includePrerelease ? u.GTE0PRE : u.GTE0], "")), J = (I) => (D, V, C, R, j, w, b, E, x, p, f, S) => (P(C) ? V = "" : P(R) ? V = `>=${C}.0.0${I ? "-0" : ""}` : P(j) ? V = `>=${C}.${R}.0${I ? "-0" : ""}` : w ? V = `>=${V}` : V = `>=${V}${I ? "-0" : ""}`, P(x) ? E = "" : P(p) ? E = `<${+x + 1}.0.0-0` : P(f) ? E = `<${x}.${+p + 1}.0-0` : S ? E = `<=${x}.${p}.${f}-${S}` : I ? E = `<${x}.${p}.${+f + 1}-0` : E = `<=${E}`, `${V} ${E}`.trim()), de = (I, D, V) => {
    for (let C = 0; C < I.length; C++)
      if (!I[C].test(D))
        return !1;
    if (D.prerelease.length && !V.includePrerelease) {
      for (let C = 0; C < I.length; C++)
        if (o(I[C].semver), I[C].semver !== s.ANY && I[C].semver.prerelease.length > 0) {
          const R = I[C].semver;
          if (R.major === D.major && R.minor === D.minor && R.patch === D.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Xs;
}
var Ys, Hu;
function _s() {
  if (Hu) return Ys;
  Hu = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(i, d) {
      if (d = n(d), i instanceof t) {
        if (i.loose === !!d.loose)
          return i;
        i = i.value;
      }
      i = i.trim().split(/\s+/).join(" "), o("comparator", i, d), this.options = d, this.loose = !!d.loose, this.parse(i), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(i) {
      const d = this.options.loose ? r[a.COMPARATORLOOSE] : r[a.COMPARATOR], v = i.match(d);
      if (!v)
        throw new TypeError(`Invalid comparator: ${i}`);
      this.operator = v[1] !== void 0 ? v[1] : "", this.operator === "=" && (this.operator = ""), v[2] ? this.semver = new c(v[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(i) {
      if (o("Comparator.test", i, this.options.loose), this.semver === e || i === e)
        return !0;
      if (typeof i == "string")
        try {
          i = new c(i, this.options);
        } catch {
          return !1;
        }
      return s(i, this.operator, this.semver, this.options);
    }
    intersects(i, d) {
      if (!(i instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(i.value, d).test(this.value) : i.operator === "" ? i.value === "" ? !0 : new l(this.value, d).test(i.semver) : (d = n(d), d.includePrerelease && (this.value === "<0.0.0-0" || i.value === "<0.0.0-0") || !d.includePrerelease && (this.value.startsWith("<0.0.0") || i.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && i.operator.startsWith(">") || this.operator.startsWith("<") && i.operator.startsWith("<") || this.semver.version === i.semver.version && this.operator.includes("=") && i.operator.includes("=") || s(this.semver, "<", i.semver, d) && this.operator.startsWith(">") && i.operator.startsWith("<") || s(this.semver, ">", i.semver, d) && this.operator.startsWith("<") && i.operator.startsWith(">")));
    }
  }
  Ys = t;
  const n = cl, { safeRe: r, t: a } = Jr, s = vm, o = $s, c = qe, l = ft();
  return Ys;
}
const XS = ft(), YS = (e, t, n) => {
  try {
    t = new XS(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ws = YS;
const QS = ft(), ZS = (e, t) => new QS(e, t).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var e1 = ZS;
const t1 = qe, n1 = ft(), r1 = (e, t, n) => {
  let r = null, a = null, s = null;
  try {
    s = new n1(t, n);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    s.test(o) && (!r || a.compare(o) === -1) && (r = o, a = new t1(r, n));
  }), r;
};
var a1 = r1;
const s1 = qe, o1 = ft(), i1 = (e, t, n) => {
  let r = null, a = null, s = null;
  try {
    s = new o1(t, n);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    s.test(o) && (!r || a.compare(o) === 1) && (r = o, a = new s1(r, n));
  }), r;
};
var c1 = i1;
const Qs = qe, l1 = ft(), Wu = xs, u1 = (e, t) => {
  e = new l1(e, t);
  let n = new Qs("0.0.0");
  if (e.test(n) || (n = new Qs("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let r = 0; r < e.set.length; ++r) {
    const a = e.set[r];
    let s = null;
    a.forEach((o) => {
      const c = new Qs(o.semver.version);
      switch (o.operator) {
        case ">":
          c.prerelease.length === 0 ? c.patch++ : c.prerelease.push(0), c.raw = c.format();
        case "":
        case ">=":
          (!s || Wu(c, s)) && (s = c);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), s && (!n || Wu(n, s)) && (n = s);
  }
  return n && e.test(n) ? n : null;
};
var p1 = u1;
const d1 = ft(), f1 = (e, t) => {
  try {
    return new d1(e, t).range || "*";
  } catch {
    return null;
  }
};
var m1 = f1;
const h1 = qe, ym = _s(), { ANY: v1 } = ym, y1 = ft(), g1 = ws, Ju = xs, Xu = ul, b1 = dl, $1 = pl, x1 = (e, t, n, r) => {
  e = new h1(e, r), t = new y1(t, r);
  let a, s, o, c, l;
  switch (n) {
    case ">":
      a = Ju, s = b1, o = Xu, c = ">", l = ">=";
      break;
    case "<":
      a = Xu, s = $1, o = Ju, c = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (g1(e, t, r))
    return !1;
  for (let u = 0; u < t.set.length; ++u) {
    const i = t.set[u];
    let d = null, v = null;
    if (i.forEach(($) => {
      $.semver === v1 && ($ = new ym(">=0.0.0")), d = d || $, v = v || $, a($.semver, d.semver, r) ? d = $ : o($.semver, v.semver, r) && (v = $);
    }), d.operator === c || d.operator === l || (!v.operator || v.operator === c) && s(e, v.semver))
      return !1;
    if (v.operator === l && o(e, v.semver))
      return !1;
  }
  return !0;
};
var fl = x1;
const _1 = fl, w1 = (e, t, n) => _1(e, t, ">", n);
var E1 = w1;
const S1 = fl, P1 = (e, t, n) => S1(e, t, "<", n);
var R1 = P1;
const Yu = ft(), O1 = (e, t, n) => (e = new Yu(e, n), t = new Yu(t, n), e.intersects(t, n));
var k1 = O1;
const T1 = ws, j1 = dt;
var N1 = (e, t, n) => {
  const r = [];
  let a = null, s = null;
  const o = e.sort((i, d) => j1(i, d, n));
  for (const i of o)
    T1(i, t, n) ? (s = i, a || (a = i)) : (s && r.push([a, s]), s = null, a = null);
  a && r.push([a, null]);
  const c = [];
  for (const [i, d] of r)
    i === d ? c.push(i) : !d && i === o[0] ? c.push("*") : d ? i === o[0] ? c.push(`<=${d}`) : c.push(`${i} - ${d}`) : c.push(`>=${i}`);
  const l = c.join(" || "), u = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < u.length ? l : t;
};
const Qu = ft(), ml = _s(), { ANY: Zs } = ml, hr = ws, hl = dt, A1 = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new Qu(e, n), t = new Qu(t, n);
  let r = !1;
  e: for (const a of e.set) {
    for (const s of t.set) {
      const o = I1(a, s, n);
      if (r = r || o !== null, o)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, C1 = [new ml(">=0.0.0-0")], Zu = [new ml(">=0.0.0")], I1 = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Zs) {
    if (t.length === 1 && t[0].semver === Zs)
      return !0;
    n.includePrerelease ? e = C1 : e = Zu;
  }
  if (t.length === 1 && t[0].semver === Zs) {
    if (n.includePrerelease)
      return !0;
    t = Zu;
  }
  const r = /* @__PURE__ */ new Set();
  let a, s;
  for (const $ of e)
    $.operator === ">" || $.operator === ">=" ? a = ep(a, $, n) : $.operator === "<" || $.operator === "<=" ? s = tp(s, $, n) : r.add($.semver);
  if (r.size > 1)
    return null;
  let o;
  if (a && s) {
    if (o = hl(a.semver, s.semver, n), o > 0)
      return null;
    if (o === 0 && (a.operator !== ">=" || s.operator !== "<="))
      return null;
  }
  for (const $ of r) {
    if (a && !hr($, String(a), n) || s && !hr($, String(s), n))
      return null;
    for (const y of t)
      if (!hr($, String(y), n))
        return !1;
    return !0;
  }
  let c, l, u, i, d = s && !n.includePrerelease && s.semver.prerelease.length ? s.semver : !1, v = a && !n.includePrerelease && a.semver.prerelease.length ? a.semver : !1;
  d && d.prerelease.length === 1 && s.operator === "<" && d.prerelease[0] === 0 && (d = !1);
  for (const $ of t) {
    if (i = i || $.operator === ">" || $.operator === ">=", u = u || $.operator === "<" || $.operator === "<=", a) {
      if (v && $.semver.prerelease && $.semver.prerelease.length && $.semver.major === v.major && $.semver.minor === v.minor && $.semver.patch === v.patch && (v = !1), $.operator === ">" || $.operator === ">=") {
        if (c = ep(a, $, n), c === $ && c !== a)
          return !1;
      } else if (a.operator === ">=" && !hr(a.semver, String($), n))
        return !1;
    }
    if (s) {
      if (d && $.semver.prerelease && $.semver.prerelease.length && $.semver.major === d.major && $.semver.minor === d.minor && $.semver.patch === d.patch && (d = !1), $.operator === "<" || $.operator === "<=") {
        if (l = tp(s, $, n), l === $ && l !== s)
          return !1;
      } else if (s.operator === "<=" && !hr(s.semver, String($), n))
        return !1;
    }
    if (!$.operator && (s || a) && o !== 0)
      return !1;
  }
  return !(a && u && !s && o !== 0 || s && i && !a && o !== 0 || v || d);
}, ep = (e, t, n) => {
  if (!e)
    return t;
  const r = hl(e.semver, t.semver, n);
  return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, tp = (e, t, n) => {
  if (!e)
    return t;
  const r = hl(e.semver, t.semver, n);
  return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var D1 = A1;
const eo = Jr, np = bs, L1 = qe, rp = fm, F1 = ir, M1 = GE, U1 = WE, z1 = XE, q1 = QE, V1 = tS, B1 = aS, G1 = iS, K1 = uS, H1 = dt, W1 = mS, J1 = yS, X1 = ll, Y1 = xS, Q1 = ES, Z1 = xs, eP = ul, tP = mm, nP = hm, rP = pl, aP = dl, sP = vm, oP = HS, iP = _s(), cP = ft(), lP = ws, uP = e1, pP = a1, dP = c1, fP = p1, mP = m1, hP = fl, vP = E1, yP = R1, gP = k1, bP = N1, $P = D1;
var xP = {
  parse: F1,
  valid: M1,
  clean: U1,
  inc: z1,
  diff: q1,
  major: V1,
  minor: B1,
  patch: G1,
  prerelease: K1,
  compare: H1,
  rcompare: W1,
  compareLoose: J1,
  compareBuild: X1,
  sort: Y1,
  rsort: Q1,
  gt: Z1,
  lt: eP,
  eq: tP,
  neq: nP,
  gte: rP,
  lte: aP,
  cmp: sP,
  coerce: oP,
  Comparator: iP,
  Range: cP,
  satisfies: lP,
  toComparators: uP,
  maxSatisfying: pP,
  minSatisfying: dP,
  minVersion: fP,
  validRange: mP,
  outside: hP,
  gtr: vP,
  ltr: yP,
  intersects: gP,
  simplifyRange: bP,
  subset: $P,
  SemVer: L1,
  re: eo.re,
  src: eo.src,
  tokens: eo.t,
  SEMVER_SPEC_VERSION: np.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: np.RELEASE_TYPES,
  compareIdentifiers: rp.compareIdentifiers,
  rcompareIdentifiers: rp.rcompareIdentifiers
}, Es = { exports: {} }, vl = { exports: {} };
const gm = (e, t) => {
  for (const n of Reflect.ownKeys(t))
    Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
  return e;
};
vl.exports = gm;
vl.exports.default = gm;
var _P = vl.exports;
const wP = _P, Xa = /* @__PURE__ */ new WeakMap(), bm = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let n, r = 0;
  const a = e.displayName || e.name || "<anonymous>", s = function(...o) {
    if (Xa.set(s, ++r), r === 1)
      n = e.apply(this, o), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${a}\` can only be called once`);
    return n;
  };
  return wP(s, e), Xa.set(s, r), s;
};
Es.exports = bm;
Es.exports.default = bm;
Es.exports.callCount = (e) => {
  if (!Xa.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Xa.get(e);
};
var EP = Es.exports;
(function(e, t) {
  var n = gr && gr.__classPrivateFieldSet || function(C, R, j, w, b) {
    if (w === "m") throw new TypeError("Private method is not writable");
    if (w === "a" && !b) throw new TypeError("Private accessor was defined without a setter");
    if (typeof R == "function" ? C !== R || !b : !R.has(C)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return w === "a" ? b.call(C, j) : b ? b.value = j : R.set(C, j), j;
  }, r = gr && gr.__classPrivateFieldGet || function(C, R, j, w) {
    if (j === "a" && !w) throw new TypeError("Private accessor was defined without a getter");
    if (typeof R == "function" ? C !== R || !w : !R.has(C)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return j === "m" ? w : j === "a" ? w.call(C) : w ? w.value : R.get(C);
  }, a, s, o, c, l, u;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const i = Wt, d = zr, v = pt, $ = fi, y = rd, g = ad, h = Nh, m = Vh, _ = Hh, P = $t, O = ox, T = gE, L = kE, q = xP, ae = EP, F = "aes-256-cbc", K = () => /* @__PURE__ */ Object.create(null), ce = (C) => C != null;
  let J = "";
  try {
    delete require.cache[__filename], J = v.dirname((s = (a = e.parent) === null || a === void 0 ? void 0 : a.filename) !== null && s !== void 0 ? s : ".");
  } catch {
  }
  const de = (C, R) => {
    const j = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), w = typeof R;
    if (j.has(w))
      throw new TypeError(`Setting a value of type \`${w}\` for key \`${C}\` is not allowed as it's not supported by JSON`);
  }, I = "__internal__", D = `${I}.migrations.version`;
  class V {
    constructor(R = {}) {
      var j;
      o.set(this, void 0), c.set(this, void 0), l.set(this, void 0), u.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
      const w = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...R
      }, b = ae(() => {
        const f = m.sync({ cwd: J }), S = f && JSON.parse(d.readFileSync(f, "utf8"));
        return S ?? {};
      });
      if (!w.cwd) {
        if (w.projectName || (w.projectName = b().name), !w.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        w.cwd = _(w.projectName, { suffix: w.projectSuffix }).config;
      }
      if (n(this, l, w, "f"), w.schema) {
        if (typeof w.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const f = new O.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, T.default)(f);
        const S = {
          type: "object",
          properties: w.schema
        };
        n(this, o, f.compile(S), "f");
        for (const [A, N] of Object.entries(w.schema))
          N != null && N.default && (r(this, u, "f")[A] = N.default);
      }
      w.defaults && n(this, u, {
        ...r(this, u, "f"),
        ...w.defaults
      }, "f"), w.serialize && (this._serialize = w.serialize), w.deserialize && (this._deserialize = w.deserialize), this.events = new g.EventEmitter(), n(this, c, w.encryptionKey, "f");
      const E = w.fileExtension ? `.${w.fileExtension}` : "";
      this.path = v.resolve(w.cwd, `${(j = w.configName) !== null && j !== void 0 ? j : "config"}${E}`);
      const x = this.store, p = Object.assign(K(), w.defaults, x);
      this._validate(p);
      try {
        y.deepEqual(x, p);
      } catch {
        this.store = p;
      }
      if (w.watch && this._watch(), w.migrations) {
        if (w.projectVersion || (w.projectVersion = b().version), !w.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(w.migrations, w.projectVersion, w.beforeEachMigration);
      }
    }
    get(R, j) {
      if (r(this, l, "f").accessPropertiesByDotNotation)
        return this._get(R, j);
      const { store: w } = this;
      return R in w ? w[R] : j;
    }
    set(R, j) {
      if (typeof R != "string" && typeof R != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof R}`);
      if (typeof R != "object" && j === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(R))
        throw new TypeError(`Please don't use the ${I} key, as it's used to manage this module internal operations.`);
      const { store: w } = this, b = (E, x) => {
        de(E, x), r(this, l, "f").accessPropertiesByDotNotation ? h.set(w, E, x) : w[E] = x;
      };
      if (typeof R == "object") {
        const E = R;
        for (const [x, p] of Object.entries(E))
          b(x, p);
      } else
        b(R, j);
      this.store = w;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(R) {
      return r(this, l, "f").accessPropertiesByDotNotation ? h.has(this.store, R) : R in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...R) {
      for (const j of R)
        ce(r(this, u, "f")[j]) && this.set(j, r(this, u, "f")[j]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(R) {
      const { store: j } = this;
      r(this, l, "f").accessPropertiesByDotNotation ? h.delete(j, R) : delete j[R], this.store = j;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = K();
      for (const R of Object.keys(r(this, u, "f")))
        this.reset(R);
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(R, j) {
      if (typeof R != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof R}`);
      if (typeof j != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof j}`);
      return this._handleChange(() => this.get(R), j);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(R) {
      if (typeof R != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof R}`);
      return this._handleChange(() => this.store, R);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const R = d.readFileSync(this.path, r(this, c, "f") ? null : "utf8"), j = this._encryptData(R), w = this._deserialize(j);
        return this._validate(w), Object.assign(K(), w);
      } catch (R) {
        if ((R == null ? void 0 : R.code) === "ENOENT")
          return this._ensureDirectory(), K();
        if (r(this, l, "f").clearInvalidConfig && R.name === "SyntaxError")
          return K();
        throw R;
      }
    }
    set store(R) {
      this._ensureDirectory(), this._validate(R), this._write(R), this.events.emit("change");
    }
    *[(o = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [R, j] of Object.entries(this.store))
        yield [R, j];
    }
    _encryptData(R) {
      if (!r(this, c, "f"))
        return R.toString();
      try {
        if (r(this, c, "f"))
          try {
            if (R.slice(16, 17).toString() === ":") {
              const j = R.slice(0, 16), w = $.pbkdf2Sync(r(this, c, "f"), j.toString(), 1e4, 32, "sha512"), b = $.createDecipheriv(F, w, j);
              R = Buffer.concat([b.update(Buffer.from(R.slice(17))), b.final()]).toString("utf8");
            } else {
              const j = $.createDecipher(F, r(this, c, "f"));
              R = Buffer.concat([j.update(Buffer.from(R)), j.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return R.toString();
    }
    _handleChange(R, j) {
      let w = R();
      const b = () => {
        const E = w, x = R();
        (0, i.isDeepStrictEqual)(x, E) || (w = x, j.call(this, x, E));
      };
      return this.events.on("change", b), () => this.events.removeListener("change", b);
    }
    _validate(R) {
      if (!r(this, o, "f") || r(this, o, "f").call(this, R) || !r(this, o, "f").errors)
        return;
      const w = r(this, o, "f").errors.map(({ instancePath: b, message: E = "" }) => `\`${b.slice(1)}\` ${E}`);
      throw new Error("Config schema violation: " + w.join("; "));
    }
    _ensureDirectory() {
      d.mkdirSync(v.dirname(this.path), { recursive: !0 });
    }
    _write(R) {
      let j = this._serialize(R);
      if (r(this, c, "f")) {
        const w = $.randomBytes(16), b = $.pbkdf2Sync(r(this, c, "f"), w.toString(), 1e4, 32, "sha512"), E = $.createCipheriv(F, b, w);
        j = Buffer.concat([w, Buffer.from(":"), E.update(Buffer.from(j)), E.final()]);
      }
      if (process.env.SNAP)
        d.writeFileSync(this.path, j, { mode: r(this, l, "f").configFileMode });
      else
        try {
          P.writeFileSync(this.path, j, { mode: r(this, l, "f").configFileMode });
        } catch (w) {
          if ((w == null ? void 0 : w.code) === "EXDEV") {
            d.writeFileSync(this.path, j, { mode: r(this, l, "f").configFileMode });
            return;
          }
          throw w;
        }
    }
    _watch() {
      this._ensureDirectory(), d.existsSync(this.path) || this._write(K()), process.platform === "win32" ? d.watch(this.path, { persistent: !1 }, L(() => {
        this.events.emit("change");
      }, { wait: 100 })) : d.watchFile(this.path, { persistent: !1 }, L(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(R, j, w) {
      let b = this._get(D, "0.0.0");
      const E = Object.keys(R).filter((p) => this._shouldPerformMigration(p, b, j));
      let x = { ...this.store };
      for (const p of E)
        try {
          w && w(this, {
            fromVersion: b,
            toVersion: p,
            finalVersion: j,
            versions: E
          });
          const f = R[p];
          f(this), this._set(D, p), b = p, x = { ...this.store };
        } catch (f) {
          throw this.store = x, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(b) || !q.eq(b, j)) && this._set(D, j);
    }
    _containsReservedKey(R) {
      return typeof R == "object" && Object.keys(R)[0] === I ? !0 : typeof R != "string" ? !1 : r(this, l, "f").accessPropertiesByDotNotation ? !!R.startsWith(`${I}.`) : !1;
    }
    _isVersionInRangeFormat(R) {
      return q.clean(R) === null;
    }
    _shouldPerformMigration(R, j, w) {
      return this._isVersionInRangeFormat(R) ? j !== "0.0.0" && q.satisfies(j, R) ? !1 : q.satisfies(w, R) : !(q.lte(R, j) || q.gt(R, w));
    }
    _get(R, j) {
      return h.get(this.store, R, j);
    }
    _set(R, j) {
      const { store: w } = this;
      h.set(w, R, j), this.store = w;
    }
  }
  t.default = V, e.exports = V, e.exports.default = V;
})(Ao, Ao.exports);
var SP = Ao.exports;
const ap = pt, { app: Aa, ipcMain: Zo, ipcRenderer: sp, shell: PP } = di, RP = SP;
let op = !1;
const ip = () => {
  if (!Zo || !Aa)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Aa.getPath("userData"),
    appVersion: Aa.getVersion()
  };
  return op || (Zo.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), op = !0), e;
};
class OP extends RP {
  constructor(t) {
    let n, r;
    if (sp) {
      const a = sp.sendSync("electron-store-get-data");
      if (!a)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: n, appVersion: r } = a);
    } else Zo && Aa && ({ defaultCwd: n, appVersion: r } = ip());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = r), t.cwd ? t.cwd = ap.isAbsolute(t.cwd) ? t.cwd : ap.join(n, t.cwd) : t.cwd = n, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    ip();
  }
  async openInEditor() {
    const t = await PP.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var kP = OP, $m = qr.Stream, TP = Wt, jP = mt;
function mt() {
  this.source = null, this.dataSize = 0, this.maxDataSize = 1024 * 1024, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = [];
}
TP.inherits(mt, $m);
mt.create = function(e, t) {
  var n = new this();
  t = t || {};
  for (var r in t)
    n[r] = t[r];
  n.source = e;
  var a = e.emit;
  return e.emit = function() {
    return n._handleEmit(arguments), a.apply(e, arguments);
  }, e.on("error", function() {
  }), n.pauseStream && e.pause(), n;
};
Object.defineProperty(mt.prototype, "readable", {
  configurable: !0,
  enumerable: !0,
  get: function() {
    return this.source.readable;
  }
});
mt.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};
mt.prototype.resume = function() {
  this._released || this.release(), this.source.resume();
};
mt.prototype.pause = function() {
  this.source.pause();
};
mt.prototype.release = function() {
  this._released = !0, this._bufferedEvents.forEach((function(e) {
    this.emit.apply(this, e);
  }).bind(this)), this._bufferedEvents = [];
};
mt.prototype.pipe = function() {
  var e = $m.prototype.pipe.apply(this, arguments);
  return this.resume(), e;
};
mt.prototype._handleEmit = function(e) {
  if (this._released) {
    this.emit.apply(this, e);
    return;
  }
  e[0] === "data" && (this.dataSize += e[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(e);
};
mt.prototype._checkIfMaxDataSizeExceeded = function() {
  if (!this._maxDataSizeExceeded && !(this.dataSize <= this.maxDataSize)) {
    this._maxDataSizeExceeded = !0;
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this.emit("error", new Error(e));
  }
};
var NP = Wt, xm = qr.Stream, cp = jP, AP = _e;
function _e() {
  this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2 * 1024 * 1024, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1;
}
NP.inherits(_e, xm);
_e.create = function(e) {
  var t = new this();
  e = e || {};
  for (var n in e)
    t[n] = e[n];
  return t;
};
_e.isStreamLike = function(e) {
  return typeof e != "function" && typeof e != "string" && typeof e != "boolean" && typeof e != "number" && !Buffer.isBuffer(e);
};
_e.prototype.append = function(e) {
  var t = _e.isStreamLike(e);
  if (t) {
    if (!(e instanceof cp)) {
      var n = cp.create(e, {
        maxDataSize: 1 / 0,
        pauseStream: this.pauseStreams
      });
      e.on("data", this._checkDataSize.bind(this)), e = n;
    }
    this._handleErrors(e), this.pauseStreams && e.pause();
  }
  return this._streams.push(e), this;
};
_e.prototype.pipe = function(e, t) {
  return xm.prototype.pipe.call(this, e, t), this.resume(), e;
};
_e.prototype._getNext = function() {
  if (this._currentStream = null, this._insideLoop) {
    this._pendingNext = !0;
    return;
  }
  this._insideLoop = !0;
  try {
    do
      this._pendingNext = !1, this._realGetNext();
    while (this._pendingNext);
  } finally {
    this._insideLoop = !1;
  }
};
_e.prototype._realGetNext = function() {
  var e = this._streams.shift();
  if (typeof e > "u") {
    this.end();
    return;
  }
  if (typeof e != "function") {
    this._pipeNext(e);
    return;
  }
  var t = e;
  t((function(n) {
    var r = _e.isStreamLike(n);
    r && (n.on("data", this._checkDataSize.bind(this)), this._handleErrors(n)), this._pipeNext(n);
  }).bind(this));
};
_e.prototype._pipeNext = function(e) {
  this._currentStream = e;
  var t = _e.isStreamLike(e);
  if (t) {
    e.on("end", this._getNext.bind(this)), e.pipe(this, { end: !1 });
    return;
  }
  var n = e;
  this.write(n), this._getNext();
};
_e.prototype._handleErrors = function(e) {
  var t = this;
  e.on("error", function(n) {
    t._emitError(n);
  });
};
_e.prototype.write = function(e) {
  this.emit("data", e);
};
_e.prototype.pause = function() {
  this.pauseStreams && (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function" && this._currentStream.pause(), this.emit("pause"));
};
_e.prototype.resume = function() {
  this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function" && this._currentStream.resume(), this.emit("resume");
};
_e.prototype.end = function() {
  this._reset(), this.emit("end");
};
_e.prototype.destroy = function() {
  this._reset(), this.emit("close");
};
_e.prototype._reset = function() {
  this.writable = !1, this._streams = [], this._currentStream = null;
};
_e.prototype._checkDataSize = function() {
  if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this._emitError(new Error(e));
  }
};
_e.prototype._updateDataSize = function() {
  this.dataSize = 0;
  var e = this;
  this._streams.forEach(function(t) {
    t.dataSize && (e.dataSize += t.dataSize);
  }), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
};
_e.prototype._emitError = function(e) {
  this._reset(), this.emit("error", e);
};
var _m = {};
const CP = {
  "application/1d-interleaved-parityfec": {
    source: "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/3gpp-ims+xml": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphal+json": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphalforms+json": {
    source: "iana",
    compressible: !0
  },
  "application/a2l": {
    source: "iana"
  },
  "application/ace+cbor": {
    source: "iana"
  },
  "application/activemessage": {
    source: "iana"
  },
  "application/activity+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-directory+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcost+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcostparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointprop+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointpropparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-error+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamcontrol+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/aml": {
    source: "iana"
  },
  "application/andrew-inset": {
    source: "iana",
    extensions: [
      "ez"
    ]
  },
  "application/applefile": {
    source: "iana"
  },
  "application/applixware": {
    source: "apache",
    extensions: [
      "aw"
    ]
  },
  "application/at+jwt": {
    source: "iana"
  },
  "application/atf": {
    source: "iana"
  },
  "application/atfx": {
    source: "iana"
  },
  "application/atom+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atom"
    ]
  },
  "application/atomcat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomcat"
    ]
  },
  "application/atomdeleted+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomdeleted"
    ]
  },
  "application/atomicmail": {
    source: "iana"
  },
  "application/atomsvc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomsvc"
    ]
  },
  "application/atsc-dwd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dwd"
    ]
  },
  "application/atsc-dynamic-event-message": {
    source: "iana"
  },
  "application/atsc-held+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "held"
    ]
  },
  "application/atsc-rdt+json": {
    source: "iana",
    compressible: !0
  },
  "application/atsc-rsat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsat"
    ]
  },
  "application/atxml": {
    source: "iana"
  },
  "application/auth-policy+xml": {
    source: "iana",
    compressible: !0
  },
  "application/bacnet-xdd+zip": {
    source: "iana",
    compressible: !1
  },
  "application/batch-smtp": {
    source: "iana"
  },
  "application/bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/beep+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/calendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/calendar+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xcs"
    ]
  },
  "application/call-completion": {
    source: "iana"
  },
  "application/cals-1840": {
    source: "iana"
  },
  "application/captive+json": {
    source: "iana",
    compressible: !0
  },
  "application/cbor": {
    source: "iana"
  },
  "application/cbor-seq": {
    source: "iana"
  },
  "application/cccex": {
    source: "iana"
  },
  "application/ccmp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ccxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ccxml"
    ]
  },
  "application/cdfx+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdfx"
    ]
  },
  "application/cdmi-capability": {
    source: "iana",
    extensions: [
      "cdmia"
    ]
  },
  "application/cdmi-container": {
    source: "iana",
    extensions: [
      "cdmic"
    ]
  },
  "application/cdmi-domain": {
    source: "iana",
    extensions: [
      "cdmid"
    ]
  },
  "application/cdmi-object": {
    source: "iana",
    extensions: [
      "cdmio"
    ]
  },
  "application/cdmi-queue": {
    source: "iana",
    extensions: [
      "cdmiq"
    ]
  },
  "application/cdni": {
    source: "iana"
  },
  "application/cea": {
    source: "iana"
  },
  "application/cea-2018+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cellml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cfw": {
    source: "iana"
  },
  "application/city+json": {
    source: "iana",
    compressible: !0
  },
  "application/clr": {
    source: "iana"
  },
  "application/clue+xml": {
    source: "iana",
    compressible: !0
  },
  "application/clue_info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cms": {
    source: "iana"
  },
  "application/cnrp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/coap-group+json": {
    source: "iana",
    compressible: !0
  },
  "application/coap-payload": {
    source: "iana"
  },
  "application/commonground": {
    source: "iana"
  },
  "application/conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cose": {
    source: "iana"
  },
  "application/cose-key": {
    source: "iana"
  },
  "application/cose-key-set": {
    source: "iana"
  },
  "application/cpl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cpl"
    ]
  },
  "application/csrattrs": {
    source: "iana"
  },
  "application/csta+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cstadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/csvm+json": {
    source: "iana",
    compressible: !0
  },
  "application/cu-seeme": {
    source: "apache",
    extensions: [
      "cu"
    ]
  },
  "application/cwt": {
    source: "iana"
  },
  "application/cybercash": {
    source: "iana"
  },
  "application/dart": {
    compressible: !0
  },
  "application/dash+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpd"
    ]
  },
  "application/dash-patch+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpp"
    ]
  },
  "application/dashdelta": {
    source: "iana"
  },
  "application/davmount+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "davmount"
    ]
  },
  "application/dca-rft": {
    source: "iana"
  },
  "application/dcd": {
    source: "iana"
  },
  "application/dec-dx": {
    source: "iana"
  },
  "application/dialog-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dicom": {
    source: "iana"
  },
  "application/dicom+json": {
    source: "iana",
    compressible: !0
  },
  "application/dicom+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dii": {
    source: "iana"
  },
  "application/dit": {
    source: "iana"
  },
  "application/dns": {
    source: "iana"
  },
  "application/dns+json": {
    source: "iana",
    compressible: !0
  },
  "application/dns-message": {
    source: "iana"
  },
  "application/docbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dbk"
    ]
  },
  "application/dots+cbor": {
    source: "iana"
  },
  "application/dskpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dssc+der": {
    source: "iana",
    extensions: [
      "dssc"
    ]
  },
  "application/dssc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdssc"
    ]
  },
  "application/dvcs": {
    source: "iana"
  },
  "application/ecmascript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es",
      "ecma"
    ]
  },
  "application/edi-consent": {
    source: "iana"
  },
  "application/edi-x12": {
    source: "iana",
    compressible: !1
  },
  "application/edifact": {
    source: "iana",
    compressible: !1
  },
  "application/efi": {
    source: "iana"
  },
  "application/elm+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/elm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.cap+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/emergencycalldata.comment+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.deviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.ecall.msd": {
    source: "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.serviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.veds+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emma+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emma"
    ]
  },
  "application/emotionml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emotionml"
    ]
  },
  "application/encaprtp": {
    source: "iana"
  },
  "application/epp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/epub+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "epub"
    ]
  },
  "application/eshop": {
    source: "iana"
  },
  "application/exi": {
    source: "iana",
    extensions: [
      "exi"
    ]
  },
  "application/expect-ct-report+json": {
    source: "iana",
    compressible: !0
  },
  "application/express": {
    source: "iana",
    extensions: [
      "exp"
    ]
  },
  "application/fastinfoset": {
    source: "iana"
  },
  "application/fastsoap": {
    source: "iana"
  },
  "application/fdt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fdt"
    ]
  },
  "application/fhir+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fhir+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fido.trusted-apps+json": {
    compressible: !0
  },
  "application/fits": {
    source: "iana"
  },
  "application/flexfec": {
    source: "iana"
  },
  "application/font-sfnt": {
    source: "iana"
  },
  "application/font-tdpfr": {
    source: "iana",
    extensions: [
      "pfr"
    ]
  },
  "application/font-woff": {
    source: "iana",
    compressible: !1
  },
  "application/framework-attributes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/geo+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "geojson"
    ]
  },
  "application/geo+json-seq": {
    source: "iana"
  },
  "application/geopackage+sqlite3": {
    source: "iana"
  },
  "application/geoxacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/gltf-buffer": {
    source: "iana"
  },
  "application/gml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gml"
    ]
  },
  "application/gpx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "gpx"
    ]
  },
  "application/gxf": {
    source: "apache",
    extensions: [
      "gxf"
    ]
  },
  "application/gzip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gz"
    ]
  },
  "application/h224": {
    source: "iana"
  },
  "application/held+xml": {
    source: "iana",
    compressible: !0
  },
  "application/hjson": {
    extensions: [
      "hjson"
    ]
  },
  "application/http": {
    source: "iana"
  },
  "application/hyperstudio": {
    source: "iana",
    extensions: [
      "stk"
    ]
  },
  "application/ibe-key-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pkg-reply+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pp-data": {
    source: "iana"
  },
  "application/iges": {
    source: "iana"
  },
  "application/im-iscomposing+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/index": {
    source: "iana"
  },
  "application/index.cmd": {
    source: "iana"
  },
  "application/index.obj": {
    source: "iana"
  },
  "application/index.response": {
    source: "iana"
  },
  "application/index.vnd": {
    source: "iana"
  },
  "application/inkml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ink",
      "inkml"
    ]
  },
  "application/iotp": {
    source: "iana"
  },
  "application/ipfix": {
    source: "iana",
    extensions: [
      "ipfix"
    ]
  },
  "application/ipp": {
    source: "iana"
  },
  "application/isup": {
    source: "iana"
  },
  "application/its+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "its"
    ]
  },
  "application/java-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jar",
      "war",
      "ear"
    ]
  },
  "application/java-serialized-object": {
    source: "apache",
    compressible: !1,
    extensions: [
      "ser"
    ]
  },
  "application/java-vm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "class"
    ]
  },
  "application/javascript": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "js",
      "mjs"
    ]
  },
  "application/jf2feed+json": {
    source: "iana",
    compressible: !0
  },
  "application/jose": {
    source: "iana"
  },
  "application/jose+json": {
    source: "iana",
    compressible: !0
  },
  "application/jrd+json": {
    source: "iana",
    compressible: !0
  },
  "application/jscalendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "json",
      "map"
    ]
  },
  "application/json-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/json-seq": {
    source: "iana"
  },
  "application/json5": {
    extensions: [
      "json5"
    ]
  },
  "application/jsonml+json": {
    source: "apache",
    compressible: !0,
    extensions: [
      "jsonml"
    ]
  },
  "application/jwk+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwk-set+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwt": {
    source: "iana"
  },
  "application/kpml-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/kpml-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ld+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "jsonld"
    ]
  },
  "application/lgr+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lgr"
    ]
  },
  "application/link-format": {
    source: "iana"
  },
  "application/load-control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lost+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lostxml"
    ]
  },
  "application/lostsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lpf+zip": {
    source: "iana",
    compressible: !1
  },
  "application/lxf": {
    source: "iana"
  },
  "application/mac-binhex40": {
    source: "iana",
    extensions: [
      "hqx"
    ]
  },
  "application/mac-compactpro": {
    source: "apache",
    extensions: [
      "cpt"
    ]
  },
  "application/macwriteii": {
    source: "iana"
  },
  "application/mads+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mads"
    ]
  },
  "application/manifest+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "webmanifest"
    ]
  },
  "application/marc": {
    source: "iana",
    extensions: [
      "mrc"
    ]
  },
  "application/marcxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mrcx"
    ]
  },
  "application/mathematica": {
    source: "iana",
    extensions: [
      "ma",
      "nb",
      "mb"
    ]
  },
  "application/mathml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mathml"
    ]
  },
  "application/mathml-content+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mathml-presentation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-associated-procedure-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-deregister+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-envelope+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-protection-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-reception-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-schedule+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-user-service-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbox": {
    source: "iana",
    extensions: [
      "mbox"
    ]
  },
  "application/media-policy-dataset+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpf"
    ]
  },
  "application/media_control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mediaservercontrol+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mscml"
    ]
  },
  "application/merge-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/metalink+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "metalink"
    ]
  },
  "application/metalink4+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "meta4"
    ]
  },
  "application/mets+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mets"
    ]
  },
  "application/mf4": {
    source: "iana"
  },
  "application/mikey": {
    source: "iana"
  },
  "application/mipc": {
    source: "iana"
  },
  "application/missing-blocks+cbor-seq": {
    source: "iana"
  },
  "application/mmt-aei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "maei"
    ]
  },
  "application/mmt-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musd"
    ]
  },
  "application/mods+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mods"
    ]
  },
  "application/moss-keys": {
    source: "iana"
  },
  "application/moss-signature": {
    source: "iana"
  },
  "application/mosskey-data": {
    source: "iana"
  },
  "application/mosskey-request": {
    source: "iana"
  },
  "application/mp21": {
    source: "iana",
    extensions: [
      "m21",
      "mp21"
    ]
  },
  "application/mp4": {
    source: "iana",
    extensions: [
      "mp4s",
      "m4p"
    ]
  },
  "application/mpeg4-generic": {
    source: "iana"
  },
  "application/mpeg4-iod": {
    source: "iana"
  },
  "application/mpeg4-iod-xmt": {
    source: "iana"
  },
  "application/mrb-consumer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mrb-publish+xml": {
    source: "iana",
    compressible: !0
  },
  "application/msc-ivr+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msc-mixer+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msword": {
    source: "iana",
    compressible: !1,
    extensions: [
      "doc",
      "dot"
    ]
  },
  "application/mud+json": {
    source: "iana",
    compressible: !0
  },
  "application/multipart-core": {
    source: "iana"
  },
  "application/mxf": {
    source: "iana",
    extensions: [
      "mxf"
    ]
  },
  "application/n-quads": {
    source: "iana",
    extensions: [
      "nq"
    ]
  },
  "application/n-triples": {
    source: "iana",
    extensions: [
      "nt"
    ]
  },
  "application/nasdata": {
    source: "iana"
  },
  "application/news-checkgroups": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-groupinfo": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-transmission": {
    source: "iana"
  },
  "application/nlsml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/node": {
    source: "iana",
    extensions: [
      "cjs"
    ]
  },
  "application/nss": {
    source: "iana"
  },
  "application/oauth-authz-req+jwt": {
    source: "iana"
  },
  "application/oblivious-dns-message": {
    source: "iana"
  },
  "application/ocsp-request": {
    source: "iana"
  },
  "application/ocsp-response": {
    source: "iana"
  },
  "application/octet-stream": {
    source: "iana",
    compressible: !1,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer"
    ]
  },
  "application/oda": {
    source: "iana",
    extensions: [
      "oda"
    ]
  },
  "application/odm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/odx": {
    source: "iana"
  },
  "application/oebps-package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "opf"
    ]
  },
  "application/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogx"
    ]
  },
  "application/omdoc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "omdoc"
    ]
  },
  "application/onenote": {
    source: "apache",
    extensions: [
      "onetoc",
      "onetoc2",
      "onetmp",
      "onepkg"
    ]
  },
  "application/opc-nodeset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/oscore": {
    source: "iana"
  },
  "application/oxps": {
    source: "iana",
    extensions: [
      "oxps"
    ]
  },
  "application/p21": {
    source: "iana"
  },
  "application/p21+zip": {
    source: "iana",
    compressible: !1
  },
  "application/p2p-overlay+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "relo"
    ]
  },
  "application/parityfec": {
    source: "iana"
  },
  "application/passport": {
    source: "iana"
  },
  "application/patch-ops-error+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xer"
    ]
  },
  "application/pdf": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pdf"
    ]
  },
  "application/pdx": {
    source: "iana"
  },
  "application/pem-certificate-chain": {
    source: "iana"
  },
  "application/pgp-encrypted": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pgp"
    ]
  },
  "application/pgp-keys": {
    source: "iana",
    extensions: [
      "asc"
    ]
  },
  "application/pgp-signature": {
    source: "iana",
    extensions: [
      "asc",
      "sig"
    ]
  },
  "application/pics-rules": {
    source: "apache",
    extensions: [
      "prf"
    ]
  },
  "application/pidf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pidf-diff+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pkcs10": {
    source: "iana",
    extensions: [
      "p10"
    ]
  },
  "application/pkcs12": {
    source: "iana"
  },
  "application/pkcs7-mime": {
    source: "iana",
    extensions: [
      "p7m",
      "p7c"
    ]
  },
  "application/pkcs7-signature": {
    source: "iana",
    extensions: [
      "p7s"
    ]
  },
  "application/pkcs8": {
    source: "iana",
    extensions: [
      "p8"
    ]
  },
  "application/pkcs8-encrypted": {
    source: "iana"
  },
  "application/pkix-attr-cert": {
    source: "iana",
    extensions: [
      "ac"
    ]
  },
  "application/pkix-cert": {
    source: "iana",
    extensions: [
      "cer"
    ]
  },
  "application/pkix-crl": {
    source: "iana",
    extensions: [
      "crl"
    ]
  },
  "application/pkix-pkipath": {
    source: "iana",
    extensions: [
      "pkipath"
    ]
  },
  "application/pkixcmp": {
    source: "iana",
    extensions: [
      "pki"
    ]
  },
  "application/pls+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pls"
    ]
  },
  "application/poc-settings+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/postscript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ai",
      "eps",
      "ps"
    ]
  },
  "application/ppsp-tracker+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/provenance+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "provx"
    ]
  },
  "application/prs.alvestrand.titrax-sheet": {
    source: "iana"
  },
  "application/prs.cww": {
    source: "iana",
    extensions: [
      "cww"
    ]
  },
  "application/prs.cyn": {
    source: "iana",
    charset: "7-BIT"
  },
  "application/prs.hpub+zip": {
    source: "iana",
    compressible: !1
  },
  "application/prs.nprend": {
    source: "iana"
  },
  "application/prs.plucker": {
    source: "iana"
  },
  "application/prs.rdf-xml-crypt": {
    source: "iana"
  },
  "application/prs.xsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/pskc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pskcxml"
    ]
  },
  "application/pvd+json": {
    source: "iana",
    compressible: !0
  },
  "application/qsig": {
    source: "iana"
  },
  "application/raml+yaml": {
    compressible: !0,
    extensions: [
      "raml"
    ]
  },
  "application/raptorfec": {
    source: "iana"
  },
  "application/rdap+json": {
    source: "iana",
    compressible: !0
  },
  "application/rdf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rdf",
      "owl"
    ]
  },
  "application/reginfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rif"
    ]
  },
  "application/relax-ng-compact-syntax": {
    source: "iana",
    extensions: [
      "rnc"
    ]
  },
  "application/remote-printing": {
    source: "iana"
  },
  "application/reputon+json": {
    source: "iana",
    compressible: !0
  },
  "application/resource-lists+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rl"
    ]
  },
  "application/resource-lists-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rld"
    ]
  },
  "application/rfc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/riscos": {
    source: "iana"
  },
  "application/rlmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/rls-services+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rs"
    ]
  },
  "application/route-apd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rapd"
    ]
  },
  "application/route-s-tsid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sls"
    ]
  },
  "application/route-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rusd"
    ]
  },
  "application/rpki-ghostbusters": {
    source: "iana",
    extensions: [
      "gbr"
    ]
  },
  "application/rpki-manifest": {
    source: "iana",
    extensions: [
      "mft"
    ]
  },
  "application/rpki-publication": {
    source: "iana"
  },
  "application/rpki-roa": {
    source: "iana",
    extensions: [
      "roa"
    ]
  },
  "application/rpki-updown": {
    source: "iana"
  },
  "application/rsd+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rsd"
    ]
  },
  "application/rss+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rss"
    ]
  },
  "application/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "application/rtploopback": {
    source: "iana"
  },
  "application/rtx": {
    source: "iana"
  },
  "application/samlassertion+xml": {
    source: "iana",
    compressible: !0
  },
  "application/samlmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sarif+json": {
    source: "iana",
    compressible: !0
  },
  "application/sarif-external-properties+json": {
    source: "iana",
    compressible: !0
  },
  "application/sbe": {
    source: "iana"
  },
  "application/sbml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sbml"
    ]
  },
  "application/scaip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/scim+json": {
    source: "iana",
    compressible: !0
  },
  "application/scvp-cv-request": {
    source: "iana",
    extensions: [
      "scq"
    ]
  },
  "application/scvp-cv-response": {
    source: "iana",
    extensions: [
      "scs"
    ]
  },
  "application/scvp-vp-request": {
    source: "iana",
    extensions: [
      "spq"
    ]
  },
  "application/scvp-vp-response": {
    source: "iana",
    extensions: [
      "spp"
    ]
  },
  "application/sdp": {
    source: "iana",
    extensions: [
      "sdp"
    ]
  },
  "application/secevent+jwt": {
    source: "iana"
  },
  "application/senml+cbor": {
    source: "iana"
  },
  "application/senml+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "senmlx"
    ]
  },
  "application/senml-etch+cbor": {
    source: "iana"
  },
  "application/senml-etch+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml-exi": {
    source: "iana"
  },
  "application/sensml+cbor": {
    source: "iana"
  },
  "application/sensml+json": {
    source: "iana",
    compressible: !0
  },
  "application/sensml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sensmlx"
    ]
  },
  "application/sensml-exi": {
    source: "iana"
  },
  "application/sep+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sep-exi": {
    source: "iana"
  },
  "application/session-info": {
    source: "iana"
  },
  "application/set-payment": {
    source: "iana"
  },
  "application/set-payment-initiation": {
    source: "iana",
    extensions: [
      "setpay"
    ]
  },
  "application/set-registration": {
    source: "iana"
  },
  "application/set-registration-initiation": {
    source: "iana",
    extensions: [
      "setreg"
    ]
  },
  "application/sgml": {
    source: "iana"
  },
  "application/sgml-open-catalog": {
    source: "iana"
  },
  "application/shf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "shf"
    ]
  },
  "application/sieve": {
    source: "iana",
    extensions: [
      "siv",
      "sieve"
    ]
  },
  "application/simple-filter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/simple-message-summary": {
    source: "iana"
  },
  "application/simplesymbolcontainer": {
    source: "iana"
  },
  "application/sipc": {
    source: "iana"
  },
  "application/slate": {
    source: "iana"
  },
  "application/smil": {
    source: "iana"
  },
  "application/smil+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "smi",
      "smil"
    ]
  },
  "application/smpte336m": {
    source: "iana"
  },
  "application/soap+fastinfoset": {
    source: "iana"
  },
  "application/soap+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sparql-query": {
    source: "iana",
    extensions: [
      "rq"
    ]
  },
  "application/sparql-results+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "srx"
    ]
  },
  "application/spdx+json": {
    source: "iana",
    compressible: !0
  },
  "application/spirits-event+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sql": {
    source: "iana"
  },
  "application/srgs": {
    source: "iana",
    extensions: [
      "gram"
    ]
  },
  "application/srgs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "grxml"
    ]
  },
  "application/sru+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sru"
    ]
  },
  "application/ssdl+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ssdl"
    ]
  },
  "application/ssml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ssml"
    ]
  },
  "application/stix+json": {
    source: "iana",
    compressible: !0
  },
  "application/swid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "swidtag"
    ]
  },
  "application/tamp-apex-update": {
    source: "iana"
  },
  "application/tamp-apex-update-confirm": {
    source: "iana"
  },
  "application/tamp-community-update": {
    source: "iana"
  },
  "application/tamp-community-update-confirm": {
    source: "iana"
  },
  "application/tamp-error": {
    source: "iana"
  },
  "application/tamp-sequence-adjust": {
    source: "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    source: "iana"
  },
  "application/tamp-status-query": {
    source: "iana"
  },
  "application/tamp-status-response": {
    source: "iana"
  },
  "application/tamp-update": {
    source: "iana"
  },
  "application/tamp-update-confirm": {
    source: "iana"
  },
  "application/tar": {
    compressible: !0
  },
  "application/taxii+json": {
    source: "iana",
    compressible: !0
  },
  "application/td+json": {
    source: "iana",
    compressible: !0
  },
  "application/tei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tei",
      "teicorpus"
    ]
  },
  "application/tetra_isi": {
    source: "iana"
  },
  "application/thraud+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tfi"
    ]
  },
  "application/timestamp-query": {
    source: "iana"
  },
  "application/timestamp-reply": {
    source: "iana"
  },
  "application/timestamped-data": {
    source: "iana",
    extensions: [
      "tsd"
    ]
  },
  "application/tlsrpt+gzip": {
    source: "iana"
  },
  "application/tlsrpt+json": {
    source: "iana",
    compressible: !0
  },
  "application/tnauthlist": {
    source: "iana"
  },
  "application/token-introspection+jwt": {
    source: "iana"
  },
  "application/toml": {
    compressible: !0,
    extensions: [
      "toml"
    ]
  },
  "application/trickle-ice-sdpfrag": {
    source: "iana"
  },
  "application/trig": {
    source: "iana",
    extensions: [
      "trig"
    ]
  },
  "application/ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttml"
    ]
  },
  "application/tve-trigger": {
    source: "iana"
  },
  "application/tzif": {
    source: "iana"
  },
  "application/tzif-leap": {
    source: "iana"
  },
  "application/ubjson": {
    compressible: !1,
    extensions: [
      "ubj"
    ]
  },
  "application/ulpfec": {
    source: "iana"
  },
  "application/urc-grpsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/urc-ressheet+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsheet"
    ]
  },
  "application/urc-targetdesc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "td"
    ]
  },
  "application/urc-uisocketdesc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+json": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vemmi": {
    source: "iana"
  },
  "application/vividence.scriptfile": {
    source: "apache"
  },
  "application/vnd.1000minds.decision-model+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "1km"
    ]
  },
  "application/vnd.3gpp-prose+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-v2x-local-service-information": {
    source: "iana"
  },
  "application/vnd.3gpp.5gnas": {
    source: "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.bsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gmop+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gtpc": {
    source: "iana"
  },
  "application/vnd.3gpp.interworking-data": {
    source: "iana"
  },
  "application/vnd.3gpp.lpp": {
    source: "iana"
  },
  "application/vnd.3gpp.mc-signalling-ear": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-payload": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-signalling": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mid-call+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ngap": {
    source: "iana"
  },
  "application/vnd.3gpp.pfcp": {
    source: "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    source: "iana",
    extensions: [
      "plb"
    ]
  },
  "application/vnd.3gpp.pic-bw-small": {
    source: "iana",
    extensions: [
      "psb"
    ]
  },
  "application/vnd.3gpp.pic-bw-var": {
    source: "iana",
    extensions: [
      "pvb"
    ]
  },
  "application/vnd.3gpp.s1ap": {
    source: "iana"
  },
  "application/vnd.3gpp.sms": {
    source: "iana"
  },
  "application/vnd.3gpp.sms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ussd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.sms": {
    source: "iana"
  },
  "application/vnd.3gpp2.tcap": {
    source: "iana",
    extensions: [
      "tcap"
    ]
  },
  "application/vnd.3lightssoftware.imagescal": {
    source: "iana"
  },
  "application/vnd.3m.post-it-notes": {
    source: "iana",
    extensions: [
      "pwn"
    ]
  },
  "application/vnd.accpac.simply.aso": {
    source: "iana",
    extensions: [
      "aso"
    ]
  },
  "application/vnd.accpac.simply.imp": {
    source: "iana",
    extensions: [
      "imp"
    ]
  },
  "application/vnd.acucobol": {
    source: "iana",
    extensions: [
      "acu"
    ]
  },
  "application/vnd.acucorp": {
    source: "iana",
    extensions: [
      "atc",
      "acutc"
    ]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "air"
    ]
  },
  "application/vnd.adobe.flash.movie": {
    source: "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    source: "iana",
    extensions: [
      "fcdt"
    ]
  },
  "application/vnd.adobe.fxp": {
    source: "iana",
    extensions: [
      "fxp",
      "fxpl"
    ]
  },
  "application/vnd.adobe.partial-upload": {
    source: "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdp"
    ]
  },
  "application/vnd.adobe.xfdf": {
    source: "iana",
    extensions: [
      "xfdf"
    ]
  },
  "application/vnd.aether.imp": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata-pagedef": {
    source: "iana"
  },
  "application/vnd.afpc.cmoca-cmresource": {
    source: "iana"
  },
  "application/vnd.afpc.foca-charset": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codedfont": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codepage": {
    source: "iana"
  },
  "application/vnd.afpc.modca": {
    source: "iana"
  },
  "application/vnd.afpc.modca-cmtable": {
    source: "iana"
  },
  "application/vnd.afpc.modca-formdef": {
    source: "iana"
  },
  "application/vnd.afpc.modca-mediummap": {
    source: "iana"
  },
  "application/vnd.afpc.modca-objectcontainer": {
    source: "iana"
  },
  "application/vnd.afpc.modca-overlay": {
    source: "iana"
  },
  "application/vnd.afpc.modca-pagesegment": {
    source: "iana"
  },
  "application/vnd.age": {
    source: "iana",
    extensions: [
      "age"
    ]
  },
  "application/vnd.ah-barcode": {
    source: "iana"
  },
  "application/vnd.ahead.space": {
    source: "iana",
    extensions: [
      "ahead"
    ]
  },
  "application/vnd.airzip.filesecure.azf": {
    source: "iana",
    extensions: [
      "azf"
    ]
  },
  "application/vnd.airzip.filesecure.azs": {
    source: "iana",
    extensions: [
      "azs"
    ]
  },
  "application/vnd.amadeus+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.amazon.ebook": {
    source: "apache",
    extensions: [
      "azw"
    ]
  },
  "application/vnd.amazon.mobi8-ebook": {
    source: "iana"
  },
  "application/vnd.americandynamics.acc": {
    source: "iana",
    extensions: [
      "acc"
    ]
  },
  "application/vnd.amiga.ami": {
    source: "iana",
    extensions: [
      "ami"
    ]
  },
  "application/vnd.amundsen.maze+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.android.ota": {
    source: "iana"
  },
  "application/vnd.android.package-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "apk"
    ]
  },
  "application/vnd.anki": {
    source: "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    source: "iana",
    extensions: [
      "cii"
    ]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    source: "apache",
    extensions: [
      "fti"
    ]
  },
  "application/vnd.antix.game-component": {
    source: "iana",
    extensions: [
      "atx"
    ]
  },
  "application/vnd.apache.arrow.file": {
    source: "iana"
  },
  "application/vnd.apache.arrow.stream": {
    source: "iana"
  },
  "application/vnd.apache.thrift.binary": {
    source: "iana"
  },
  "application/vnd.apache.thrift.compact": {
    source: "iana"
  },
  "application/vnd.apache.thrift.json": {
    source: "iana"
  },
  "application/vnd.api+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.aplextor.warrp+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apothekende.reservation+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apple.installer+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpkg"
    ]
  },
  "application/vnd.apple.keynote": {
    source: "iana",
    extensions: [
      "key"
    ]
  },
  "application/vnd.apple.mpegurl": {
    source: "iana",
    extensions: [
      "m3u8"
    ]
  },
  "application/vnd.apple.numbers": {
    source: "iana",
    extensions: [
      "numbers"
    ]
  },
  "application/vnd.apple.pages": {
    source: "iana",
    extensions: [
      "pages"
    ]
  },
  "application/vnd.apple.pkpass": {
    compressible: !1,
    extensions: [
      "pkpass"
    ]
  },
  "application/vnd.arastra.swi": {
    source: "iana"
  },
  "application/vnd.aristanetworks.swi": {
    source: "iana",
    extensions: [
      "swi"
    ]
  },
  "application/vnd.artisan+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.artsquare": {
    source: "iana"
  },
  "application/vnd.astraea-software.iota": {
    source: "iana",
    extensions: [
      "iota"
    ]
  },
  "application/vnd.audiograph": {
    source: "iana",
    extensions: [
      "aep"
    ]
  },
  "application/vnd.autopackage": {
    source: "iana"
  },
  "application/vnd.avalon+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.avistar+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.balsamiq.bmml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmml"
    ]
  },
  "application/vnd.balsamiq.bmpr": {
    source: "iana"
  },
  "application/vnd.banana-accounting": {
    source: "iana"
  },
  "application/vnd.bbf.usp.error": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bekitzur-stech+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bint.med-content": {
    source: "iana"
  },
  "application/vnd.biopax.rdf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.blink-idb-value-wrapper": {
    source: "iana"
  },
  "application/vnd.blueice.multipass": {
    source: "iana",
    extensions: [
      "mpm"
    ]
  },
  "application/vnd.bluetooth.ep.oob": {
    source: "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    source: "iana"
  },
  "application/vnd.bmi": {
    source: "iana",
    extensions: [
      "bmi"
    ]
  },
  "application/vnd.bpf": {
    source: "iana"
  },
  "application/vnd.bpf3": {
    source: "iana"
  },
  "application/vnd.businessobjects": {
    source: "iana",
    extensions: [
      "rep"
    ]
  },
  "application/vnd.byu.uapi+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cab-jscript": {
    source: "iana"
  },
  "application/vnd.canon-cpdl": {
    source: "iana"
  },
  "application/vnd.canon-lips": {
    source: "iana"
  },
  "application/vnd.capasystems-pg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    source: "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    source: "iana"
  },
  "application/vnd.chemdraw+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdxml"
    ]
  },
  "application/vnd.chess-pgn": {
    source: "iana"
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    source: "iana",
    extensions: [
      "mmd"
    ]
  },
  "application/vnd.ciedi": {
    source: "iana"
  },
  "application/vnd.cinderella": {
    source: "iana",
    extensions: [
      "cdy"
    ]
  },
  "application/vnd.cirpack.isdn-ext": {
    source: "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csl"
    ]
  },
  "application/vnd.claymore": {
    source: "iana",
    extensions: [
      "cla"
    ]
  },
  "application/vnd.cloanto.rp9": {
    source: "iana",
    extensions: [
      "rp9"
    ]
  },
  "application/vnd.clonk.c4group": {
    source: "iana",
    extensions: [
      "c4g",
      "c4d",
      "c4f",
      "c4p",
      "c4u"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    source: "iana",
    extensions: [
      "c11amc"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    source: "iana",
    extensions: [
      "c11amz"
    ]
  },
  "application/vnd.coffeescript": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    source: "iana"
  },
  "application/vnd.collection+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.doc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.next+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.comicbook+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.comicbook-rar": {
    source: "iana"
  },
  "application/vnd.commerce-battelle": {
    source: "iana"
  },
  "application/vnd.commonspace": {
    source: "iana",
    extensions: [
      "csp"
    ]
  },
  "application/vnd.contact.cmsg": {
    source: "iana",
    extensions: [
      "cdbcmsg"
    ]
  },
  "application/vnd.coreos.ignition+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cosmocaller": {
    source: "iana",
    extensions: [
      "cmc"
    ]
  },
  "application/vnd.crick.clicker": {
    source: "iana",
    extensions: [
      "clkx"
    ]
  },
  "application/vnd.crick.clicker.keyboard": {
    source: "iana",
    extensions: [
      "clkk"
    ]
  },
  "application/vnd.crick.clicker.palette": {
    source: "iana",
    extensions: [
      "clkp"
    ]
  },
  "application/vnd.crick.clicker.template": {
    source: "iana",
    extensions: [
      "clkt"
    ]
  },
  "application/vnd.crick.clicker.wordbank": {
    source: "iana",
    extensions: [
      "clkw"
    ]
  },
  "application/vnd.criticaltools.wbs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wbs"
    ]
  },
  "application/vnd.cryptii.pipe+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.crypto-shade-file": {
    source: "iana"
  },
  "application/vnd.cryptomator.encrypted": {
    source: "iana"
  },
  "application/vnd.cryptomator.vault": {
    source: "iana"
  },
  "application/vnd.ctc-posml": {
    source: "iana",
    extensions: [
      "pml"
    ]
  },
  "application/vnd.ctct.ws+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cups-pdf": {
    source: "iana"
  },
  "application/vnd.cups-postscript": {
    source: "iana"
  },
  "application/vnd.cups-ppd": {
    source: "iana",
    extensions: [
      "ppd"
    ]
  },
  "application/vnd.cups-raster": {
    source: "iana"
  },
  "application/vnd.cups-raw": {
    source: "iana"
  },
  "application/vnd.curl": {
    source: "iana"
  },
  "application/vnd.curl.car": {
    source: "apache",
    extensions: [
      "car"
    ]
  },
  "application/vnd.curl.pcurl": {
    source: "apache",
    extensions: [
      "pcurl"
    ]
  },
  "application/vnd.cyan.dean.root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cybank": {
    source: "iana"
  },
  "application/vnd.cyclonedx+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cyclonedx+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.d2l.coursepackage1p0+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.d3m-dataset": {
    source: "iana"
  },
  "application/vnd.d3m-problem": {
    source: "iana"
  },
  "application/vnd.dart": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dart"
    ]
  },
  "application/vnd.data-vision.rdz": {
    source: "iana",
    extensions: [
      "rdz"
    ]
  },
  "application/vnd.datapackage+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dataresource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dbf": {
    source: "iana",
    extensions: [
      "dbf"
    ]
  },
  "application/vnd.debian.binary-package": {
    source: "iana"
  },
  "application/vnd.dece.data": {
    source: "iana",
    extensions: [
      "uvf",
      "uvvf",
      "uvd",
      "uvvd"
    ]
  },
  "application/vnd.dece.ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uvt",
      "uvvt"
    ]
  },
  "application/vnd.dece.unspecified": {
    source: "iana",
    extensions: [
      "uvx",
      "uvvx"
    ]
  },
  "application/vnd.dece.zip": {
    source: "iana",
    extensions: [
      "uvz",
      "uvvz"
    ]
  },
  "application/vnd.denovo.fcselayout-link": {
    source: "iana",
    extensions: [
      "fe_launch"
    ]
  },
  "application/vnd.desmume.movie": {
    source: "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    source: "iana"
  },
  "application/vnd.dm.delegation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dna": {
    source: "iana",
    extensions: [
      "dna"
    ]
  },
  "application/vnd.document+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dolby.mlp": {
    source: "apache",
    extensions: [
      "mlp"
    ]
  },
  "application/vnd.dolby.mobile.1": {
    source: "iana"
  },
  "application/vnd.dolby.mobile.2": {
    source: "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    source: "iana"
  },
  "application/vnd.dpgraph": {
    source: "iana",
    extensions: [
      "dpg"
    ]
  },
  "application/vnd.dreamfactory": {
    source: "iana",
    extensions: [
      "dfac"
    ]
  },
  "application/vnd.drive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ds-keypoint": {
    source: "apache",
    extensions: [
      "kpxx"
    ]
  },
  "application/vnd.dtg.local": {
    source: "iana"
  },
  "application/vnd.dtg.local.flash": {
    source: "iana"
  },
  "application/vnd.dtg.local.html": {
    source: "iana"
  },
  "application/vnd.dvb.ait": {
    source: "iana",
    extensions: [
      "ait"
    ]
  },
  "application/vnd.dvb.dvbisl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.dvbj": {
    source: "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    source: "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-container+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-generic+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-init+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.pfr": {
    source: "iana"
  },
  "application/vnd.dvb.service": {
    source: "iana",
    extensions: [
      "svc"
    ]
  },
  "application/vnd.dxr": {
    source: "iana"
  },
  "application/vnd.dynageo": {
    source: "iana",
    extensions: [
      "geo"
    ]
  },
  "application/vnd.dzr": {
    source: "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    source: "iana"
  },
  "application/vnd.ecdis-update": {
    source: "iana"
  },
  "application/vnd.ecip.rlp": {
    source: "iana"
  },
  "application/vnd.eclipse.ditto+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ecowin.chart": {
    source: "iana",
    extensions: [
      "mag"
    ]
  },
  "application/vnd.ecowin.filerequest": {
    source: "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    source: "iana"
  },
  "application/vnd.ecowin.series": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    source: "iana"
  },
  "application/vnd.efi.img": {
    source: "iana"
  },
  "application/vnd.efi.iso": {
    source: "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.enliven": {
    source: "iana",
    extensions: [
      "nml"
    ]
  },
  "application/vnd.enphase.envoy": {
    source: "iana"
  },
  "application/vnd.eprints.data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.epson.esf": {
    source: "iana",
    extensions: [
      "esf"
    ]
  },
  "application/vnd.epson.msf": {
    source: "iana",
    extensions: [
      "msf"
    ]
  },
  "application/vnd.epson.quickanime": {
    source: "iana",
    extensions: [
      "qam"
    ]
  },
  "application/vnd.epson.salt": {
    source: "iana",
    extensions: [
      "slt"
    ]
  },
  "application/vnd.epson.ssf": {
    source: "iana",
    extensions: [
      "ssf"
    ]
  },
  "application/vnd.ericsson.quickcall": {
    source: "iana"
  },
  "application/vnd.espass-espass+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.eszigno3+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es3",
      "et3"
    ]
  },
  "application/vnd.etsi.aoc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.asic-e+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.asic-s+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.cug+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvcommand+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvservice+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mcid+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mheg5": {
    source: "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.pstn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.sci+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.simservs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.timestamp-token": {
    source: "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.tsl.der": {
    source: "iana"
  },
  "application/vnd.eu.kasparian.car+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.eudora.data": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.profile": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.settings": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.theme": {
    source: "iana"
  },
  "application/vnd.exstream-empower+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.exstream-package": {
    source: "iana"
  },
  "application/vnd.ezpix-album": {
    source: "iana",
    extensions: [
      "ez2"
    ]
  },
  "application/vnd.ezpix-package": {
    source: "iana",
    extensions: [
      "ez3"
    ]
  },
  "application/vnd.f-secure.mobile": {
    source: "iana"
  },
  "application/vnd.familysearch.gedcom+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.fastcopy-disk-image": {
    source: "iana"
  },
  "application/vnd.fdf": {
    source: "iana",
    extensions: [
      "fdf"
    ]
  },
  "application/vnd.fdsn.mseed": {
    source: "iana",
    extensions: [
      "mseed"
    ]
  },
  "application/vnd.fdsn.seed": {
    source: "iana",
    extensions: [
      "seed",
      "dataless"
    ]
  },
  "application/vnd.ffsns": {
    source: "iana"
  },
  "application/vnd.ficlab.flb+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.filmit.zfc": {
    source: "iana"
  },
  "application/vnd.fints": {
    source: "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    source: "iana"
  },
  "application/vnd.flographit": {
    source: "iana",
    extensions: [
      "gph"
    ]
  },
  "application/vnd.fluxtime.clip": {
    source: "iana",
    extensions: [
      "ftc"
    ]
  },
  "application/vnd.font-fontforge-sfd": {
    source: "iana"
  },
  "application/vnd.framemaker": {
    source: "iana",
    extensions: [
      "fm",
      "frame",
      "maker",
      "book"
    ]
  },
  "application/vnd.frogans.fnc": {
    source: "iana",
    extensions: [
      "fnc"
    ]
  },
  "application/vnd.frogans.ltf": {
    source: "iana",
    extensions: [
      "ltf"
    ]
  },
  "application/vnd.fsc.weblaunch": {
    source: "iana",
    extensions: [
      "fsc"
    ]
  },
  "application/vnd.fujifilm.fb.docuworks": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.binder": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.jfi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fujitsu.oasys": {
    source: "iana",
    extensions: [
      "oas"
    ]
  },
  "application/vnd.fujitsu.oasys2": {
    source: "iana",
    extensions: [
      "oa2"
    ]
  },
  "application/vnd.fujitsu.oasys3": {
    source: "iana",
    extensions: [
      "oa3"
    ]
  },
  "application/vnd.fujitsu.oasysgp": {
    source: "iana",
    extensions: [
      "fg5"
    ]
  },
  "application/vnd.fujitsu.oasysprs": {
    source: "iana",
    extensions: [
      "bh2"
    ]
  },
  "application/vnd.fujixerox.art-ex": {
    source: "iana"
  },
  "application/vnd.fujixerox.art4": {
    source: "iana"
  },
  "application/vnd.fujixerox.ddd": {
    source: "iana",
    extensions: [
      "ddd"
    ]
  },
  "application/vnd.fujixerox.docuworks": {
    source: "iana",
    extensions: [
      "xdw"
    ]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    source: "iana",
    extensions: [
      "xbd"
    ]
  },
  "application/vnd.fujixerox.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    source: "iana"
  },
  "application/vnd.fut-misnet": {
    source: "iana"
  },
  "application/vnd.futoin+cbor": {
    source: "iana"
  },
  "application/vnd.futoin+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fuzzysheet": {
    source: "iana",
    extensions: [
      "fzs"
    ]
  },
  "application/vnd.genomatix.tuxedo": {
    source: "iana",
    extensions: [
      "txd"
    ]
  },
  "application/vnd.gentics.grd+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geo+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geocube+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geogebra.file": {
    source: "iana",
    extensions: [
      "ggb"
    ]
  },
  "application/vnd.geogebra.slides": {
    source: "iana"
  },
  "application/vnd.geogebra.tool": {
    source: "iana",
    extensions: [
      "ggt"
    ]
  },
  "application/vnd.geometry-explorer": {
    source: "iana",
    extensions: [
      "gex",
      "gre"
    ]
  },
  "application/vnd.geonext": {
    source: "iana",
    extensions: [
      "gxt"
    ]
  },
  "application/vnd.geoplan": {
    source: "iana",
    extensions: [
      "g2w"
    ]
  },
  "application/vnd.geospace": {
    source: "iana",
    extensions: [
      "g3w"
    ]
  },
  "application/vnd.gerber": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    source: "iana"
  },
  "application/vnd.gmx": {
    source: "iana",
    extensions: [
      "gmx"
    ]
  },
  "application/vnd.google-apps.document": {
    compressible: !1,
    extensions: [
      "gdoc"
    ]
  },
  "application/vnd.google-apps.presentation": {
    compressible: !1,
    extensions: [
      "gslides"
    ]
  },
  "application/vnd.google-apps.spreadsheet": {
    compressible: !1,
    extensions: [
      "gsheet"
    ]
  },
  "application/vnd.google-earth.kml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "kml"
    ]
  },
  "application/vnd.google-earth.kmz": {
    source: "iana",
    compressible: !1,
    extensions: [
      "kmz"
    ]
  },
  "application/vnd.gov.sk.e-form+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.gov.sk.e-form+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.grafeq": {
    source: "iana",
    extensions: [
      "gqf",
      "gqs"
    ]
  },
  "application/vnd.gridmp": {
    source: "iana"
  },
  "application/vnd.groove-account": {
    source: "iana",
    extensions: [
      "gac"
    ]
  },
  "application/vnd.groove-help": {
    source: "iana",
    extensions: [
      "ghf"
    ]
  },
  "application/vnd.groove-identity-message": {
    source: "iana",
    extensions: [
      "gim"
    ]
  },
  "application/vnd.groove-injector": {
    source: "iana",
    extensions: [
      "grv"
    ]
  },
  "application/vnd.groove-tool-message": {
    source: "iana",
    extensions: [
      "gtm"
    ]
  },
  "application/vnd.groove-tool-template": {
    source: "iana",
    extensions: [
      "tpl"
    ]
  },
  "application/vnd.groove-vcard": {
    source: "iana",
    extensions: [
      "vcg"
    ]
  },
  "application/vnd.hal+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hal+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "hal"
    ]
  },
  "application/vnd.handheld-entertainment+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zmm"
    ]
  },
  "application/vnd.hbci": {
    source: "iana",
    extensions: [
      "hbci"
    ]
  },
  "application/vnd.hc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hcl-bireports": {
    source: "iana"
  },
  "application/vnd.hdt": {
    source: "iana"
  },
  "application/vnd.heroku+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hhe.lesson-player": {
    source: "iana",
    extensions: [
      "les"
    ]
  },
  "application/vnd.hl7cda+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hl7v2+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hp-hpgl": {
    source: "iana",
    extensions: [
      "hpgl"
    ]
  },
  "application/vnd.hp-hpid": {
    source: "iana",
    extensions: [
      "hpid"
    ]
  },
  "application/vnd.hp-hps": {
    source: "iana",
    extensions: [
      "hps"
    ]
  },
  "application/vnd.hp-jlyt": {
    source: "iana",
    extensions: [
      "jlt"
    ]
  },
  "application/vnd.hp-pcl": {
    source: "iana",
    extensions: [
      "pcl"
    ]
  },
  "application/vnd.hp-pclxl": {
    source: "iana",
    extensions: [
      "pclxl"
    ]
  },
  "application/vnd.httphone": {
    source: "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    source: "iana",
    extensions: [
      "sfd-hdstx"
    ]
  },
  "application/vnd.hyper+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyper-item+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyperdrive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hzn-3d-crossword": {
    source: "iana"
  },
  "application/vnd.ibm.afplinedata": {
    source: "iana"
  },
  "application/vnd.ibm.electronic-media": {
    source: "iana"
  },
  "application/vnd.ibm.minipay": {
    source: "iana",
    extensions: [
      "mpy"
    ]
  },
  "application/vnd.ibm.modcap": {
    source: "iana",
    extensions: [
      "afp",
      "listafp",
      "list3820"
    ]
  },
  "application/vnd.ibm.rights-management": {
    source: "iana",
    extensions: [
      "irm"
    ]
  },
  "application/vnd.ibm.secure-container": {
    source: "iana",
    extensions: [
      "sc"
    ]
  },
  "application/vnd.iccprofile": {
    source: "iana",
    extensions: [
      "icc",
      "icm"
    ]
  },
  "application/vnd.ieee.1905": {
    source: "iana"
  },
  "application/vnd.igloader": {
    source: "iana",
    extensions: [
      "igl"
    ]
  },
  "application/vnd.imagemeter.folder+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.imagemeter.image+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.immervision-ivp": {
    source: "iana",
    extensions: [
      "ivp"
    ]
  },
  "application/vnd.immervision-ivu": {
    source: "iana",
    extensions: [
      "ivu"
    ]
  },
  "application/vnd.ims.imsccv1p1": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    source: "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informedcontrol.rms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informix-visionary": {
    source: "iana"
  },
  "application/vnd.infotech.project": {
    source: "iana"
  },
  "application/vnd.infotech.project+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.innopath.wamp.notification": {
    source: "iana"
  },
  "application/vnd.insors.igm": {
    source: "iana",
    extensions: [
      "igm"
    ]
  },
  "application/vnd.intercon.formnet": {
    source: "iana",
    extensions: [
      "xpw",
      "xpx"
    ]
  },
  "application/vnd.intergeo": {
    source: "iana",
    extensions: [
      "i2g"
    ]
  },
  "application/vnd.intertrust.digibox": {
    source: "iana"
  },
  "application/vnd.intertrust.nncp": {
    source: "iana"
  },
  "application/vnd.intu.qbo": {
    source: "iana",
    extensions: [
      "qbo"
    ]
  },
  "application/vnd.intu.qfx": {
    source: "iana",
    extensions: [
      "qfx"
    ]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ipunplugged.rcprofile": {
    source: "iana",
    extensions: [
      "rcprofile"
    ]
  },
  "application/vnd.irepository.package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "irp"
    ]
  },
  "application/vnd.is-xpr": {
    source: "iana",
    extensions: [
      "xpr"
    ]
  },
  "application/vnd.isac.fcs": {
    source: "iana",
    extensions: [
      "fcs"
    ]
  },
  "application/vnd.iso11783-10+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.jam": {
    source: "iana",
    extensions: [
      "jam"
    ]
  },
  "application/vnd.japannet-directory-service": {
    source: "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-registration": {
    source: "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-verification": {
    source: "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    source: "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    source: "iana",
    extensions: [
      "rms"
    ]
  },
  "application/vnd.jisp": {
    source: "iana",
    extensions: [
      "jisp"
    ]
  },
  "application/vnd.joost.joda-archive": {
    source: "iana",
    extensions: [
      "joda"
    ]
  },
  "application/vnd.jsk.isdn-ngn": {
    source: "iana"
  },
  "application/vnd.kahootz": {
    source: "iana",
    extensions: [
      "ktz",
      "ktr"
    ]
  },
  "application/vnd.kde.karbon": {
    source: "iana",
    extensions: [
      "karbon"
    ]
  },
  "application/vnd.kde.kchart": {
    source: "iana",
    extensions: [
      "chrt"
    ]
  },
  "application/vnd.kde.kformula": {
    source: "iana",
    extensions: [
      "kfo"
    ]
  },
  "application/vnd.kde.kivio": {
    source: "iana",
    extensions: [
      "flw"
    ]
  },
  "application/vnd.kde.kontour": {
    source: "iana",
    extensions: [
      "kon"
    ]
  },
  "application/vnd.kde.kpresenter": {
    source: "iana",
    extensions: [
      "kpr",
      "kpt"
    ]
  },
  "application/vnd.kde.kspread": {
    source: "iana",
    extensions: [
      "ksp"
    ]
  },
  "application/vnd.kde.kword": {
    source: "iana",
    extensions: [
      "kwd",
      "kwt"
    ]
  },
  "application/vnd.kenameaapp": {
    source: "iana",
    extensions: [
      "htke"
    ]
  },
  "application/vnd.kidspiration": {
    source: "iana",
    extensions: [
      "kia"
    ]
  },
  "application/vnd.kinar": {
    source: "iana",
    extensions: [
      "kne",
      "knp"
    ]
  },
  "application/vnd.koan": {
    source: "iana",
    extensions: [
      "skp",
      "skd",
      "skt",
      "skm"
    ]
  },
  "application/vnd.kodak-descriptor": {
    source: "iana",
    extensions: [
      "sse"
    ]
  },
  "application/vnd.las": {
    source: "iana"
  },
  "application/vnd.las.las+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.las.las+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lasxml"
    ]
  },
  "application/vnd.laszip": {
    source: "iana"
  },
  "application/vnd.leap+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.liberty-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    source: "iana",
    extensions: [
      "lbd"
    ]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lbe"
    ]
  },
  "application/vnd.logipipe.circuit+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.loom": {
    source: "iana"
  },
  "application/vnd.lotus-1-2-3": {
    source: "iana",
    extensions: [
      "123"
    ]
  },
  "application/vnd.lotus-approach": {
    source: "iana",
    extensions: [
      "apr"
    ]
  },
  "application/vnd.lotus-freelance": {
    source: "iana",
    extensions: [
      "pre"
    ]
  },
  "application/vnd.lotus-notes": {
    source: "iana",
    extensions: [
      "nsf"
    ]
  },
  "application/vnd.lotus-organizer": {
    source: "iana",
    extensions: [
      "org"
    ]
  },
  "application/vnd.lotus-screencam": {
    source: "iana",
    extensions: [
      "scm"
    ]
  },
  "application/vnd.lotus-wordpro": {
    source: "iana",
    extensions: [
      "lwp"
    ]
  },
  "application/vnd.macports.portpkg": {
    source: "iana",
    extensions: [
      "portpkg"
    ]
  },
  "application/vnd.mapbox-vector-tile": {
    source: "iana",
    extensions: [
      "mvt"
    ]
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.license+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.mdcf": {
    source: "iana"
  },
  "application/vnd.mason+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.maxar.archive.3tz+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.maxmind.maxmind-db": {
    source: "iana"
  },
  "application/vnd.mcd": {
    source: "iana",
    extensions: [
      "mcd"
    ]
  },
  "application/vnd.medcalcdata": {
    source: "iana",
    extensions: [
      "mc1"
    ]
  },
  "application/vnd.mediastation.cdkey": {
    source: "iana",
    extensions: [
      "cdkey"
    ]
  },
  "application/vnd.meridian-slingshot": {
    source: "iana"
  },
  "application/vnd.mfer": {
    source: "iana",
    extensions: [
      "mwf"
    ]
  },
  "application/vnd.mfmp": {
    source: "iana",
    extensions: [
      "mfm"
    ]
  },
  "application/vnd.micro+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.micrografx.flo": {
    source: "iana",
    extensions: [
      "flo"
    ]
  },
  "application/vnd.micrografx.igx": {
    source: "iana",
    extensions: [
      "igx"
    ]
  },
  "application/vnd.microsoft.portable-executable": {
    source: "iana"
  },
  "application/vnd.microsoft.windows.thumbnail-cache": {
    source: "iana"
  },
  "application/vnd.miele+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.mif": {
    source: "iana",
    extensions: [
      "mif"
    ]
  },
  "application/vnd.minisoft-hp3000-save": {
    source: "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    source: "iana"
  },
  "application/vnd.mobius.daf": {
    source: "iana",
    extensions: [
      "daf"
    ]
  },
  "application/vnd.mobius.dis": {
    source: "iana",
    extensions: [
      "dis"
    ]
  },
  "application/vnd.mobius.mbk": {
    source: "iana",
    extensions: [
      "mbk"
    ]
  },
  "application/vnd.mobius.mqy": {
    source: "iana",
    extensions: [
      "mqy"
    ]
  },
  "application/vnd.mobius.msl": {
    source: "iana",
    extensions: [
      "msl"
    ]
  },
  "application/vnd.mobius.plc": {
    source: "iana",
    extensions: [
      "plc"
    ]
  },
  "application/vnd.mobius.txf": {
    source: "iana",
    extensions: [
      "txf"
    ]
  },
  "application/vnd.mophun.application": {
    source: "iana",
    extensions: [
      "mpn"
    ]
  },
  "application/vnd.mophun.certificate": {
    source: "iana",
    extensions: [
      "mpc"
    ]
  },
  "application/vnd.motorola.flexsuite": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    source: "iana"
  },
  "application/vnd.motorola.iprm": {
    source: "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xul"
    ]
  },
  "application/vnd.ms-3mfdocument": {
    source: "iana"
  },
  "application/vnd.ms-artgalry": {
    source: "iana",
    extensions: [
      "cil"
    ]
  },
  "application/vnd.ms-asf": {
    source: "iana"
  },
  "application/vnd.ms-cab-compressed": {
    source: "iana",
    extensions: [
      "cab"
    ]
  },
  "application/vnd.ms-color.iccprofile": {
    source: "apache"
  },
  "application/vnd.ms-excel": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xls",
      "xlm",
      "xla",
      "xlc",
      "xlt",
      "xlw"
    ]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlam"
    ]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsb"
    ]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsm"
    ]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "xltm"
    ]
  },
  "application/vnd.ms-fontobject": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eot"
    ]
  },
  "application/vnd.ms-htmlhelp": {
    source: "iana",
    extensions: [
      "chm"
    ]
  },
  "application/vnd.ms-ims": {
    source: "iana",
    extensions: [
      "ims"
    ]
  },
  "application/vnd.ms-lrm": {
    source: "iana",
    extensions: [
      "lrm"
    ]
  },
  "application/vnd.ms-office.activex+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-officetheme": {
    source: "iana",
    extensions: [
      "thmx"
    ]
  },
  "application/vnd.ms-opentype": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-outlook": {
    compressible: !1,
    extensions: [
      "msg"
    ]
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    source: "apache"
  },
  "application/vnd.ms-pki.seccat": {
    source: "apache",
    extensions: [
      "cat"
    ]
  },
  "application/vnd.ms-pki.stl": {
    source: "apache",
    extensions: [
      "stl"
    ]
  },
  "application/vnd.ms-playready.initiator+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-powerpoint": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ppt",
      "pps",
      "pot"
    ]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppam"
    ]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    source: "iana",
    extensions: [
      "pptm"
    ]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    source: "iana",
    extensions: [
      "sldm"
    ]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppsm"
    ]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "potm"
    ]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-printing.printticket+xml": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-printschematicket+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-project": {
    source: "iana",
    extensions: [
      "mpp",
      "mpt"
    ]
  },
  "application/vnd.ms-tnef": {
    source: "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    source: "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    source: "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    source: "iana",
    extensions: [
      "docm"
    ]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "dotm"
    ]
  },
  "application/vnd.ms-works": {
    source: "iana",
    extensions: [
      "wps",
      "wks",
      "wcm",
      "wdb"
    ]
  },
  "application/vnd.ms-wpl": {
    source: "iana",
    extensions: [
      "wpl"
    ]
  },
  "application/vnd.ms-xpsdocument": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xps"
    ]
  },
  "application/vnd.msa-disk-image": {
    source: "iana"
  },
  "application/vnd.mseq": {
    source: "iana",
    extensions: [
      "mseq"
    ]
  },
  "application/vnd.msign": {
    source: "iana"
  },
  "application/vnd.multiad.creator": {
    source: "iana"
  },
  "application/vnd.multiad.creator.cif": {
    source: "iana"
  },
  "application/vnd.music-niff": {
    source: "iana"
  },
  "application/vnd.musician": {
    source: "iana",
    extensions: [
      "mus"
    ]
  },
  "application/vnd.muvee.style": {
    source: "iana",
    extensions: [
      "msty"
    ]
  },
  "application/vnd.mynfc": {
    source: "iana",
    extensions: [
      "taglet"
    ]
  },
  "application/vnd.nacamar.ybrid+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ncd.control": {
    source: "iana"
  },
  "application/vnd.ncd.reference": {
    source: "iana"
  },
  "application/vnd.nearst.inv+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nebumind.line": {
    source: "iana"
  },
  "application/vnd.nervana": {
    source: "iana"
  },
  "application/vnd.netfpx": {
    source: "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    source: "iana",
    extensions: [
      "nlu"
    ]
  },
  "application/vnd.nimn": {
    source: "iana"
  },
  "application/vnd.nintendo.nitro.rom": {
    source: "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    source: "iana"
  },
  "application/vnd.nitf": {
    source: "iana",
    extensions: [
      "ntf",
      "nitf"
    ]
  },
  "application/vnd.noblenet-directory": {
    source: "iana",
    extensions: [
      "nnd"
    ]
  },
  "application/vnd.noblenet-sealer": {
    source: "iana",
    extensions: [
      "nns"
    ]
  },
  "application/vnd.noblenet-web": {
    source: "iana",
    extensions: [
      "nnw"
    ]
  },
  "application/vnd.nokia.catalogs": {
    source: "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.conml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.iptv.config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.isds-radio-presets": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ac"
    ]
  },
  "application/vnd.nokia.n-gage.data": {
    source: "iana",
    extensions: [
      "ngdat"
    ]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    source: "iana",
    extensions: [
      "n-gage"
    ]
  },
  "application/vnd.nokia.ncd": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.radio-preset": {
    source: "iana",
    extensions: [
      "rpst"
    ]
  },
  "application/vnd.nokia.radio-presets": {
    source: "iana",
    extensions: [
      "rpss"
    ]
  },
  "application/vnd.novadigm.edm": {
    source: "iana",
    extensions: [
      "edm"
    ]
  },
  "application/vnd.novadigm.edx": {
    source: "iana",
    extensions: [
      "edx"
    ]
  },
  "application/vnd.novadigm.ext": {
    source: "iana",
    extensions: [
      "ext"
    ]
  },
  "application/vnd.ntt-local.content-share": {
    source: "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    source: "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    source: "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    source: "iana",
    extensions: [
      "odc"
    ]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    source: "iana",
    extensions: [
      "otc"
    ]
  },
  "application/vnd.oasis.opendocument.database": {
    source: "iana",
    extensions: [
      "odb"
    ]
  },
  "application/vnd.oasis.opendocument.formula": {
    source: "iana",
    extensions: [
      "odf"
    ]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    source: "iana",
    extensions: [
      "odft"
    ]
  },
  "application/vnd.oasis.opendocument.graphics": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odg"
    ]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    source: "iana",
    extensions: [
      "otg"
    ]
  },
  "application/vnd.oasis.opendocument.image": {
    source: "iana",
    extensions: [
      "odi"
    ]
  },
  "application/vnd.oasis.opendocument.image-template": {
    source: "iana",
    extensions: [
      "oti"
    ]
  },
  "application/vnd.oasis.opendocument.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odp"
    ]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    source: "iana",
    extensions: [
      "otp"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ods"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    source: "iana",
    extensions: [
      "ots"
    ]
  },
  "application/vnd.oasis.opendocument.text": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odt"
    ]
  },
  "application/vnd.oasis.opendocument.text-master": {
    source: "iana",
    extensions: [
      "odm"
    ]
  },
  "application/vnd.oasis.opendocument.text-template": {
    source: "iana",
    extensions: [
      "ott"
    ]
  },
  "application/vnd.oasis.opendocument.text-web": {
    source: "iana",
    extensions: [
      "oth"
    ]
  },
  "application/vnd.obn": {
    source: "iana"
  },
  "application/vnd.ocf+cbor": {
    source: "iana"
  },
  "application/vnd.oci.image.manifest.v1+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oftn.l10n+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.cspg-hexbinary": {
    source: "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.pae.gem": {
    source: "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.spdlist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.ueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.userprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.olpc-sugar": {
    source: "iana",
    extensions: [
      "xo"
    ]
  },
  "application/vnd.oma-scws-config": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-request": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-response": {
    source: "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.imd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.ltkm": {
    source: "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sgdu": {
    source: "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    source: "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sprov+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.stkm": {
    source: "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-pcc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.dcd": {
    source: "iana"
  },
  "application/vnd.oma.dcdc": {
    source: "iana"
  },
  "application/vnd.oma.dd2+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dd2"
    ]
  },
  "application/vnd.oma.drm.risd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.group-usage-list+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+cbor": {
    source: "iana"
  },
  "application/vnd.oma.lwm2m+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+tlv": {
    source: "iana"
  },
  "application/vnd.oma.pal+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.final-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.groups+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.push": {
    source: "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.xcap-directory+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.omads-email+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-file+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-folder+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omaloc-supl-init": {
    source: "iana"
  },
  "application/vnd.onepager": {
    source: "iana"
  },
  "application/vnd.onepagertamp": {
    source: "iana"
  },
  "application/vnd.onepagertamx": {
    source: "iana"
  },
  "application/vnd.onepagertat": {
    source: "iana"
  },
  "application/vnd.onepagertatp": {
    source: "iana"
  },
  "application/vnd.onepagertatx": {
    source: "iana"
  },
  "application/vnd.openblox.game+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "obgx"
    ]
  },
  "application/vnd.openblox.game-binary": {
    source: "iana"
  },
  "application/vnd.openeye.oeb": {
    source: "iana"
  },
  "application/vnd.openofficeorg.extension": {
    source: "apache",
    extensions: [
      "oxt"
    ]
  },
  "application/vnd.openstreetmap.data+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osm"
    ]
  },
  "application/vnd.opentimestamps.ots": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pptx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    source: "iana",
    extensions: [
      "sldx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    source: "iana",
    extensions: [
      "ppsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    source: "iana",
    extensions: [
      "potx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xlsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    source: "iana",
    extensions: [
      "xltx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    source: "iana",
    compressible: !1,
    extensions: [
      "docx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    source: "iana",
    extensions: [
      "dotx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oracle.resource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.orange.indata": {
    source: "iana"
  },
  "application/vnd.osa.netdeploy": {
    source: "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    source: "iana",
    extensions: [
      "mgp"
    ]
  },
  "application/vnd.osgi.bundle": {
    source: "iana"
  },
  "application/vnd.osgi.dp": {
    source: "iana",
    extensions: [
      "dp"
    ]
  },
  "application/vnd.osgi.subsystem": {
    source: "iana",
    extensions: [
      "esa"
    ]
  },
  "application/vnd.otps.ct-kip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oxli.countgraph": {
    source: "iana"
  },
  "application/vnd.pagerduty+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.palm": {
    source: "iana",
    extensions: [
      "pdb",
      "pqa",
      "oprc"
    ]
  },
  "application/vnd.panoply": {
    source: "iana"
  },
  "application/vnd.paos.xml": {
    source: "iana"
  },
  "application/vnd.patentdive": {
    source: "iana"
  },
  "application/vnd.patientecommsdoc": {
    source: "iana"
  },
  "application/vnd.pawaafile": {
    source: "iana",
    extensions: [
      "paw"
    ]
  },
  "application/vnd.pcos": {
    source: "iana"
  },
  "application/vnd.pg.format": {
    source: "iana",
    extensions: [
      "str"
    ]
  },
  "application/vnd.pg.osasli": {
    source: "iana",
    extensions: [
      "ei6"
    ]
  },
  "application/vnd.piaccess.application-licence": {
    source: "iana"
  },
  "application/vnd.picsel": {
    source: "iana",
    extensions: [
      "efif"
    ]
  },
  "application/vnd.pmi.widget": {
    source: "iana",
    extensions: [
      "wg"
    ]
  },
  "application/vnd.poc.group-advertisement+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.pocketlearn": {
    source: "iana",
    extensions: [
      "plf"
    ]
  },
  "application/vnd.powerbuilder6": {
    source: "iana",
    extensions: [
      "pbd"
    ]
  },
  "application/vnd.powerbuilder6-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder7": {
    source: "iana"
  },
  "application/vnd.powerbuilder7-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder75": {
    source: "iana"
  },
  "application/vnd.powerbuilder75-s": {
    source: "iana"
  },
  "application/vnd.preminet": {
    source: "iana"
  },
  "application/vnd.previewsystems.box": {
    source: "iana",
    extensions: [
      "box"
    ]
  },
  "application/vnd.proteus.magazine": {
    source: "iana",
    extensions: [
      "mgz"
    ]
  },
  "application/vnd.psfs": {
    source: "iana"
  },
  "application/vnd.publishare-delta-tree": {
    source: "iana",
    extensions: [
      "qps"
    ]
  },
  "application/vnd.pvi.ptid1": {
    source: "iana",
    extensions: [
      "ptid"
    ]
  },
  "application/vnd.pwg-multiplexed": {
    source: "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.qualcomm.brew-app-res": {
    source: "iana"
  },
  "application/vnd.quarantainenet": {
    source: "iana"
  },
  "application/vnd.quark.quarkxpress": {
    source: "iana",
    extensions: [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb"
    ]
  },
  "application/vnd.quobject-quoxdocument": {
    source: "iana"
  },
  "application/vnd.radisys.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rainstor.data": {
    source: "iana"
  },
  "application/vnd.rapid": {
    source: "iana"
  },
  "application/vnd.rar": {
    source: "iana",
    extensions: [
      "rar"
    ]
  },
  "application/vnd.realvnc.bed": {
    source: "iana",
    extensions: [
      "bed"
    ]
  },
  "application/vnd.recordare.musicxml": {
    source: "iana",
    extensions: [
      "mxl"
    ]
  },
  "application/vnd.recordare.musicxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musicxml"
    ]
  },
  "application/vnd.renlearn.rlprint": {
    source: "iana"
  },
  "application/vnd.resilient.logic": {
    source: "iana"
  },
  "application/vnd.restful+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rig.cryptonote": {
    source: "iana",
    extensions: [
      "cryptonote"
    ]
  },
  "application/vnd.rim.cod": {
    source: "apache",
    extensions: [
      "cod"
    ]
  },
  "application/vnd.rn-realmedia": {
    source: "apache",
    extensions: [
      "rm"
    ]
  },
  "application/vnd.rn-realmedia-vbr": {
    source: "apache",
    extensions: [
      "rmvb"
    ]
  },
  "application/vnd.route66.link66+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "link66"
    ]
  },
  "application/vnd.rs-274x": {
    source: "iana"
  },
  "application/vnd.ruckus.download": {
    source: "iana"
  },
  "application/vnd.s3sms": {
    source: "iana"
  },
  "application/vnd.sailingtracker.track": {
    source: "iana",
    extensions: [
      "st"
    ]
  },
  "application/vnd.sar": {
    source: "iana"
  },
  "application/vnd.sbm.cid": {
    source: "iana"
  },
  "application/vnd.sbm.mid2": {
    source: "iana"
  },
  "application/vnd.scribus": {
    source: "iana"
  },
  "application/vnd.sealed.3df": {
    source: "iana"
  },
  "application/vnd.sealed.csf": {
    source: "iana"
  },
  "application/vnd.sealed.doc": {
    source: "iana"
  },
  "application/vnd.sealed.eml": {
    source: "iana"
  },
  "application/vnd.sealed.mht": {
    source: "iana"
  },
  "application/vnd.sealed.net": {
    source: "iana"
  },
  "application/vnd.sealed.ppt": {
    source: "iana"
  },
  "application/vnd.sealed.tiff": {
    source: "iana"
  },
  "application/vnd.sealed.xls": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    source: "iana"
  },
  "application/vnd.seemail": {
    source: "iana",
    extensions: [
      "see"
    ]
  },
  "application/vnd.seis+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.sema": {
    source: "iana",
    extensions: [
      "sema"
    ]
  },
  "application/vnd.semd": {
    source: "iana",
    extensions: [
      "semd"
    ]
  },
  "application/vnd.semf": {
    source: "iana",
    extensions: [
      "semf"
    ]
  },
  "application/vnd.shade-save-file": {
    source: "iana"
  },
  "application/vnd.shana.informed.formdata": {
    source: "iana",
    extensions: [
      "ifm"
    ]
  },
  "application/vnd.shana.informed.formtemplate": {
    source: "iana",
    extensions: [
      "itp"
    ]
  },
  "application/vnd.shana.informed.interchange": {
    source: "iana",
    extensions: [
      "iif"
    ]
  },
  "application/vnd.shana.informed.package": {
    source: "iana",
    extensions: [
      "ipk"
    ]
  },
  "application/vnd.shootproof+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shopkick+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shp": {
    source: "iana"
  },
  "application/vnd.shx": {
    source: "iana"
  },
  "application/vnd.sigrok.session": {
    source: "iana"
  },
  "application/vnd.simtech-mindmapper": {
    source: "iana",
    extensions: [
      "twd",
      "twds"
    ]
  },
  "application/vnd.siren+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.smaf": {
    source: "iana",
    extensions: [
      "mmf"
    ]
  },
  "application/vnd.smart.notebook": {
    source: "iana"
  },
  "application/vnd.smart.teacher": {
    source: "iana",
    extensions: [
      "teacher"
    ]
  },
  "application/vnd.snesdev-page-table": {
    source: "iana"
  },
  "application/vnd.software602.filler.form+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fo"
    ]
  },
  "application/vnd.software602.filler.form-xml-zip": {
    source: "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sdkm",
      "sdkd"
    ]
  },
  "application/vnd.spotfire.dxp": {
    source: "iana",
    extensions: [
      "dxp"
    ]
  },
  "application/vnd.spotfire.sfs": {
    source: "iana",
    extensions: [
      "sfs"
    ]
  },
  "application/vnd.sqlite3": {
    source: "iana"
  },
  "application/vnd.sss-cod": {
    source: "iana"
  },
  "application/vnd.sss-dtf": {
    source: "iana"
  },
  "application/vnd.sss-ntf": {
    source: "iana"
  },
  "application/vnd.stardivision.calc": {
    source: "apache",
    extensions: [
      "sdc"
    ]
  },
  "application/vnd.stardivision.draw": {
    source: "apache",
    extensions: [
      "sda"
    ]
  },
  "application/vnd.stardivision.impress": {
    source: "apache",
    extensions: [
      "sdd"
    ]
  },
  "application/vnd.stardivision.math": {
    source: "apache",
    extensions: [
      "smf"
    ]
  },
  "application/vnd.stardivision.writer": {
    source: "apache",
    extensions: [
      "sdw",
      "vor"
    ]
  },
  "application/vnd.stardivision.writer-global": {
    source: "apache",
    extensions: [
      "sgl"
    ]
  },
  "application/vnd.stepmania.package": {
    source: "iana",
    extensions: [
      "smzip"
    ]
  },
  "application/vnd.stepmania.stepchart": {
    source: "iana",
    extensions: [
      "sm"
    ]
  },
  "application/vnd.street-stream": {
    source: "iana"
  },
  "application/vnd.sun.wadl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wadl"
    ]
  },
  "application/vnd.sun.xml.calc": {
    source: "apache",
    extensions: [
      "sxc"
    ]
  },
  "application/vnd.sun.xml.calc.template": {
    source: "apache",
    extensions: [
      "stc"
    ]
  },
  "application/vnd.sun.xml.draw": {
    source: "apache",
    extensions: [
      "sxd"
    ]
  },
  "application/vnd.sun.xml.draw.template": {
    source: "apache",
    extensions: [
      "std"
    ]
  },
  "application/vnd.sun.xml.impress": {
    source: "apache",
    extensions: [
      "sxi"
    ]
  },
  "application/vnd.sun.xml.impress.template": {
    source: "apache",
    extensions: [
      "sti"
    ]
  },
  "application/vnd.sun.xml.math": {
    source: "apache",
    extensions: [
      "sxm"
    ]
  },
  "application/vnd.sun.xml.writer": {
    source: "apache",
    extensions: [
      "sxw"
    ]
  },
  "application/vnd.sun.xml.writer.global": {
    source: "apache",
    extensions: [
      "sxg"
    ]
  },
  "application/vnd.sun.xml.writer.template": {
    source: "apache",
    extensions: [
      "stw"
    ]
  },
  "application/vnd.sus-calendar": {
    source: "iana",
    extensions: [
      "sus",
      "susp"
    ]
  },
  "application/vnd.svd": {
    source: "iana",
    extensions: [
      "svd"
    ]
  },
  "application/vnd.swiftview-ics": {
    source: "iana"
  },
  "application/vnd.sycle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.syft+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.symbian.install": {
    source: "apache",
    extensions: [
      "sis",
      "sisx"
    ]
  },
  "application/vnd.syncml+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xsm"
    ]
  },
  "application/vnd.syncml.dm+wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "bdm"
    ]
  },
  "application/vnd.syncml.dm+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xdm"
    ]
  },
  "application/vnd.syncml.dm.notification": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "ddf"
    ]
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.syncml.ds.notification": {
    source: "iana"
  },
  "application/vnd.tableschema+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tao.intent-module-archive": {
    source: "iana",
    extensions: [
      "tao"
    ]
  },
  "application/vnd.tcpdump.pcap": {
    source: "iana",
    extensions: [
      "pcap",
      "cap",
      "dmp"
    ]
  },
  "application/vnd.think-cell.ppttc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tml": {
    source: "iana"
  },
  "application/vnd.tmobile-livetv": {
    source: "iana",
    extensions: [
      "tmo"
    ]
  },
  "application/vnd.tri.onesource": {
    source: "iana"
  },
  "application/vnd.trid.tpt": {
    source: "iana",
    extensions: [
      "tpt"
    ]
  },
  "application/vnd.triscape.mxs": {
    source: "iana",
    extensions: [
      "mxs"
    ]
  },
  "application/vnd.trueapp": {
    source: "iana",
    extensions: [
      "tra"
    ]
  },
  "application/vnd.truedoc": {
    source: "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    source: "iana"
  },
  "application/vnd.ufdl": {
    source: "iana",
    extensions: [
      "ufd",
      "ufdl"
    ]
  },
  "application/vnd.uiq.theme": {
    source: "iana",
    extensions: [
      "utz"
    ]
  },
  "application/vnd.umajin": {
    source: "iana",
    extensions: [
      "umj"
    ]
  },
  "application/vnd.unity": {
    source: "iana",
    extensions: [
      "unityweb"
    ]
  },
  "application/vnd.uoml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uoml"
    ]
  },
  "application/vnd.uplanet.alert": {
    source: "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.channel": {
    source: "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.list": {
    source: "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.signal": {
    source: "iana"
  },
  "application/vnd.uri-map": {
    source: "iana"
  },
  "application/vnd.valve.source.material": {
    source: "iana"
  },
  "application/vnd.vcx": {
    source: "iana",
    extensions: [
      "vcx"
    ]
  },
  "application/vnd.vd-study": {
    source: "iana"
  },
  "application/vnd.vectorworks": {
    source: "iana"
  },
  "application/vnd.vel+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.verimatrix.vcas": {
    source: "iana"
  },
  "application/vnd.veritone.aion+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.veryant.thin": {
    source: "iana"
  },
  "application/vnd.ves.encrypted": {
    source: "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    source: "iana"
  },
  "application/vnd.visio": {
    source: "iana",
    extensions: [
      "vsd",
      "vst",
      "vss",
      "vsw"
    ]
  },
  "application/vnd.visionary": {
    source: "iana",
    extensions: [
      "vis"
    ]
  },
  "application/vnd.vividence.scriptfile": {
    source: "iana"
  },
  "application/vnd.vsf": {
    source: "iana",
    extensions: [
      "vsf"
    ]
  },
  "application/vnd.wap.sic": {
    source: "iana"
  },
  "application/vnd.wap.slc": {
    source: "iana"
  },
  "application/vnd.wap.wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "wbxml"
    ]
  },
  "application/vnd.wap.wmlc": {
    source: "iana",
    extensions: [
      "wmlc"
    ]
  },
  "application/vnd.wap.wmlscriptc": {
    source: "iana",
    extensions: [
      "wmlsc"
    ]
  },
  "application/vnd.webturbo": {
    source: "iana",
    extensions: [
      "wtb"
    ]
  },
  "application/vnd.wfa.dpp": {
    source: "iana"
  },
  "application/vnd.wfa.p2p": {
    source: "iana"
  },
  "application/vnd.wfa.wsc": {
    source: "iana"
  },
  "application/vnd.windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.wmc": {
    source: "iana"
  },
  "application/vnd.wmf.bootstrap": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    source: "iana"
  },
  "application/vnd.wolfram.player": {
    source: "iana",
    extensions: [
      "nbp"
    ]
  },
  "application/vnd.wordperfect": {
    source: "iana",
    extensions: [
      "wpd"
    ]
  },
  "application/vnd.wqd": {
    source: "iana",
    extensions: [
      "wqd"
    ]
  },
  "application/vnd.wrq-hp3000-labelled": {
    source: "iana"
  },
  "application/vnd.wt.stf": {
    source: "iana",
    extensions: [
      "stf"
    ]
  },
  "application/vnd.wv.csp+wbxml": {
    source: "iana"
  },
  "application/vnd.wv.csp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.wv.ssp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xacml+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xara": {
    source: "iana",
    extensions: [
      "xar"
    ]
  },
  "application/vnd.xfdl": {
    source: "iana",
    extensions: [
      "xfdl"
    ]
  },
  "application/vnd.xfdl.webform": {
    source: "iana"
  },
  "application/vnd.xmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xmpie.cpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.dpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.plan": {
    source: "iana"
  },
  "application/vnd.xmpie.ppkg": {
    source: "iana"
  },
  "application/vnd.xmpie.xlim": {
    source: "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    source: "iana",
    extensions: [
      "hvd"
    ]
  },
  "application/vnd.yamaha.hv-script": {
    source: "iana",
    extensions: [
      "hvs"
    ]
  },
  "application/vnd.yamaha.hv-voice": {
    source: "iana",
    extensions: [
      "hvp"
    ]
  },
  "application/vnd.yamaha.openscoreformat": {
    source: "iana",
    extensions: [
      "osf"
    ]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osfpvg"
    ]
  },
  "application/vnd.yamaha.remote-setup": {
    source: "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    source: "iana",
    extensions: [
      "saf"
    ]
  },
  "application/vnd.yamaha.smaf-phrase": {
    source: "iana",
    extensions: [
      "spf"
    ]
  },
  "application/vnd.yamaha.through-ngn": {
    source: "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    source: "iana"
  },
  "application/vnd.yaoweme": {
    source: "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    source: "iana",
    extensions: [
      "cmp"
    ]
  },
  "application/vnd.youtube.yt": {
    source: "iana"
  },
  "application/vnd.zul": {
    source: "iana",
    extensions: [
      "zir",
      "zirz"
    ]
  },
  "application/vnd.zzazz.deck+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zaz"
    ]
  },
  "application/voicexml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vxml"
    ]
  },
  "application/voucher-cms+json": {
    source: "iana",
    compressible: !0
  },
  "application/vq-rtcpxr": {
    source: "iana"
  },
  "application/wasm": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wasm"
    ]
  },
  "application/watcherinfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wif"
    ]
  },
  "application/webpush-options+json": {
    source: "iana",
    compressible: !0
  },
  "application/whoispp-query": {
    source: "iana"
  },
  "application/whoispp-response": {
    source: "iana"
  },
  "application/widget": {
    source: "iana",
    extensions: [
      "wgt"
    ]
  },
  "application/winhlp": {
    source: "apache",
    extensions: [
      "hlp"
    ]
  },
  "application/wita": {
    source: "iana"
  },
  "application/wordperfect5.1": {
    source: "iana"
  },
  "application/wsdl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wsdl"
    ]
  },
  "application/wspolicy+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wspolicy"
    ]
  },
  "application/x-7z-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "7z"
    ]
  },
  "application/x-abiword": {
    source: "apache",
    extensions: [
      "abw"
    ]
  },
  "application/x-ace-compressed": {
    source: "apache",
    extensions: [
      "ace"
    ]
  },
  "application/x-amf": {
    source: "apache"
  },
  "application/x-apple-diskimage": {
    source: "apache",
    extensions: [
      "dmg"
    ]
  },
  "application/x-arj": {
    compressible: !1,
    extensions: [
      "arj"
    ]
  },
  "application/x-authorware-bin": {
    source: "apache",
    extensions: [
      "aab",
      "x32",
      "u32",
      "vox"
    ]
  },
  "application/x-authorware-map": {
    source: "apache",
    extensions: [
      "aam"
    ]
  },
  "application/x-authorware-seg": {
    source: "apache",
    extensions: [
      "aas"
    ]
  },
  "application/x-bcpio": {
    source: "apache",
    extensions: [
      "bcpio"
    ]
  },
  "application/x-bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/x-bittorrent": {
    source: "apache",
    extensions: [
      "torrent"
    ]
  },
  "application/x-blorb": {
    source: "apache",
    extensions: [
      "blb",
      "blorb"
    ]
  },
  "application/x-bzip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz"
    ]
  },
  "application/x-bzip2": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz2",
      "boz"
    ]
  },
  "application/x-cbr": {
    source: "apache",
    extensions: [
      "cbr",
      "cba",
      "cbt",
      "cbz",
      "cb7"
    ]
  },
  "application/x-cdlink": {
    source: "apache",
    extensions: [
      "vcd"
    ]
  },
  "application/x-cfs-compressed": {
    source: "apache",
    extensions: [
      "cfs"
    ]
  },
  "application/x-chat": {
    source: "apache",
    extensions: [
      "chat"
    ]
  },
  "application/x-chess-pgn": {
    source: "apache",
    extensions: [
      "pgn"
    ]
  },
  "application/x-chrome-extension": {
    extensions: [
      "crx"
    ]
  },
  "application/x-cocoa": {
    source: "nginx",
    extensions: [
      "cco"
    ]
  },
  "application/x-compress": {
    source: "apache"
  },
  "application/x-conference": {
    source: "apache",
    extensions: [
      "nsc"
    ]
  },
  "application/x-cpio": {
    source: "apache",
    extensions: [
      "cpio"
    ]
  },
  "application/x-csh": {
    source: "apache",
    extensions: [
      "csh"
    ]
  },
  "application/x-deb": {
    compressible: !1
  },
  "application/x-debian-package": {
    source: "apache",
    extensions: [
      "deb",
      "udeb"
    ]
  },
  "application/x-dgc-compressed": {
    source: "apache",
    extensions: [
      "dgc"
    ]
  },
  "application/x-director": {
    source: "apache",
    extensions: [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa"
    ]
  },
  "application/x-doom": {
    source: "apache",
    extensions: [
      "wad"
    ]
  },
  "application/x-dtbncx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ncx"
    ]
  },
  "application/x-dtbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dtb"
    ]
  },
  "application/x-dtbresource+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "res"
    ]
  },
  "application/x-dvi": {
    source: "apache",
    compressible: !1,
    extensions: [
      "dvi"
    ]
  },
  "application/x-envoy": {
    source: "apache",
    extensions: [
      "evy"
    ]
  },
  "application/x-eva": {
    source: "apache",
    extensions: [
      "eva"
    ]
  },
  "application/x-font-bdf": {
    source: "apache",
    extensions: [
      "bdf"
    ]
  },
  "application/x-font-dos": {
    source: "apache"
  },
  "application/x-font-framemaker": {
    source: "apache"
  },
  "application/x-font-ghostscript": {
    source: "apache",
    extensions: [
      "gsf"
    ]
  },
  "application/x-font-libgrx": {
    source: "apache"
  },
  "application/x-font-linux-psf": {
    source: "apache",
    extensions: [
      "psf"
    ]
  },
  "application/x-font-pcf": {
    source: "apache",
    extensions: [
      "pcf"
    ]
  },
  "application/x-font-snf": {
    source: "apache",
    extensions: [
      "snf"
    ]
  },
  "application/x-font-speedo": {
    source: "apache"
  },
  "application/x-font-sunos-news": {
    source: "apache"
  },
  "application/x-font-type1": {
    source: "apache",
    extensions: [
      "pfa",
      "pfb",
      "pfm",
      "afm"
    ]
  },
  "application/x-font-vfont": {
    source: "apache"
  },
  "application/x-freearc": {
    source: "apache",
    extensions: [
      "arc"
    ]
  },
  "application/x-futuresplash": {
    source: "apache",
    extensions: [
      "spl"
    ]
  },
  "application/x-gca-compressed": {
    source: "apache",
    extensions: [
      "gca"
    ]
  },
  "application/x-glulx": {
    source: "apache",
    extensions: [
      "ulx"
    ]
  },
  "application/x-gnumeric": {
    source: "apache",
    extensions: [
      "gnumeric"
    ]
  },
  "application/x-gramps-xml": {
    source: "apache",
    extensions: [
      "gramps"
    ]
  },
  "application/x-gtar": {
    source: "apache",
    extensions: [
      "gtar"
    ]
  },
  "application/x-gzip": {
    source: "apache"
  },
  "application/x-hdf": {
    source: "apache",
    extensions: [
      "hdf"
    ]
  },
  "application/x-httpd-php": {
    compressible: !0,
    extensions: [
      "php"
    ]
  },
  "application/x-install-instructions": {
    source: "apache",
    extensions: [
      "install"
    ]
  },
  "application/x-iso9660-image": {
    source: "apache",
    extensions: [
      "iso"
    ]
  },
  "application/x-iwork-keynote-sffkey": {
    extensions: [
      "key"
    ]
  },
  "application/x-iwork-numbers-sffnumbers": {
    extensions: [
      "numbers"
    ]
  },
  "application/x-iwork-pages-sffpages": {
    extensions: [
      "pages"
    ]
  },
  "application/x-java-archive-diff": {
    source: "nginx",
    extensions: [
      "jardiff"
    ]
  },
  "application/x-java-jnlp-file": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jnlp"
    ]
  },
  "application/x-javascript": {
    compressible: !0
  },
  "application/x-keepass2": {
    extensions: [
      "kdbx"
    ]
  },
  "application/x-latex": {
    source: "apache",
    compressible: !1,
    extensions: [
      "latex"
    ]
  },
  "application/x-lua-bytecode": {
    extensions: [
      "luac"
    ]
  },
  "application/x-lzh-compressed": {
    source: "apache",
    extensions: [
      "lzh",
      "lha"
    ]
  },
  "application/x-makeself": {
    source: "nginx",
    extensions: [
      "run"
    ]
  },
  "application/x-mie": {
    source: "apache",
    extensions: [
      "mie"
    ]
  },
  "application/x-mobipocket-ebook": {
    source: "apache",
    extensions: [
      "prc",
      "mobi"
    ]
  },
  "application/x-mpegurl": {
    compressible: !1
  },
  "application/x-ms-application": {
    source: "apache",
    extensions: [
      "application"
    ]
  },
  "application/x-ms-shortcut": {
    source: "apache",
    extensions: [
      "lnk"
    ]
  },
  "application/x-ms-wmd": {
    source: "apache",
    extensions: [
      "wmd"
    ]
  },
  "application/x-ms-wmz": {
    source: "apache",
    extensions: [
      "wmz"
    ]
  },
  "application/x-ms-xbap": {
    source: "apache",
    extensions: [
      "xbap"
    ]
  },
  "application/x-msaccess": {
    source: "apache",
    extensions: [
      "mdb"
    ]
  },
  "application/x-msbinder": {
    source: "apache",
    extensions: [
      "obd"
    ]
  },
  "application/x-mscardfile": {
    source: "apache",
    extensions: [
      "crd"
    ]
  },
  "application/x-msclip": {
    source: "apache",
    extensions: [
      "clp"
    ]
  },
  "application/x-msdos-program": {
    extensions: [
      "exe"
    ]
  },
  "application/x-msdownload": {
    source: "apache",
    extensions: [
      "exe",
      "dll",
      "com",
      "bat",
      "msi"
    ]
  },
  "application/x-msmediaview": {
    source: "apache",
    extensions: [
      "mvb",
      "m13",
      "m14"
    ]
  },
  "application/x-msmetafile": {
    source: "apache",
    extensions: [
      "wmf",
      "wmz",
      "emf",
      "emz"
    ]
  },
  "application/x-msmoney": {
    source: "apache",
    extensions: [
      "mny"
    ]
  },
  "application/x-mspublisher": {
    source: "apache",
    extensions: [
      "pub"
    ]
  },
  "application/x-msschedule": {
    source: "apache",
    extensions: [
      "scd"
    ]
  },
  "application/x-msterminal": {
    source: "apache",
    extensions: [
      "trm"
    ]
  },
  "application/x-mswrite": {
    source: "apache",
    extensions: [
      "wri"
    ]
  },
  "application/x-netcdf": {
    source: "apache",
    extensions: [
      "nc",
      "cdf"
    ]
  },
  "application/x-ns-proxy-autoconfig": {
    compressible: !0,
    extensions: [
      "pac"
    ]
  },
  "application/x-nzb": {
    source: "apache",
    extensions: [
      "nzb"
    ]
  },
  "application/x-perl": {
    source: "nginx",
    extensions: [
      "pl",
      "pm"
    ]
  },
  "application/x-pilot": {
    source: "nginx",
    extensions: [
      "prc",
      "pdb"
    ]
  },
  "application/x-pkcs12": {
    source: "apache",
    compressible: !1,
    extensions: [
      "p12",
      "pfx"
    ]
  },
  "application/x-pkcs7-certificates": {
    source: "apache",
    extensions: [
      "p7b",
      "spc"
    ]
  },
  "application/x-pkcs7-certreqresp": {
    source: "apache",
    extensions: [
      "p7r"
    ]
  },
  "application/x-pki-message": {
    source: "iana"
  },
  "application/x-rar-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "rar"
    ]
  },
  "application/x-redhat-package-manager": {
    source: "nginx",
    extensions: [
      "rpm"
    ]
  },
  "application/x-research-info-systems": {
    source: "apache",
    extensions: [
      "ris"
    ]
  },
  "application/x-sea": {
    source: "nginx",
    extensions: [
      "sea"
    ]
  },
  "application/x-sh": {
    source: "apache",
    compressible: !0,
    extensions: [
      "sh"
    ]
  },
  "application/x-shar": {
    source: "apache",
    extensions: [
      "shar"
    ]
  },
  "application/x-shockwave-flash": {
    source: "apache",
    compressible: !1,
    extensions: [
      "swf"
    ]
  },
  "application/x-silverlight-app": {
    source: "apache",
    extensions: [
      "xap"
    ]
  },
  "application/x-sql": {
    source: "apache",
    extensions: [
      "sql"
    ]
  },
  "application/x-stuffit": {
    source: "apache",
    compressible: !1,
    extensions: [
      "sit"
    ]
  },
  "application/x-stuffitx": {
    source: "apache",
    extensions: [
      "sitx"
    ]
  },
  "application/x-subrip": {
    source: "apache",
    extensions: [
      "srt"
    ]
  },
  "application/x-sv4cpio": {
    source: "apache",
    extensions: [
      "sv4cpio"
    ]
  },
  "application/x-sv4crc": {
    source: "apache",
    extensions: [
      "sv4crc"
    ]
  },
  "application/x-t3vm-image": {
    source: "apache",
    extensions: [
      "t3"
    ]
  },
  "application/x-tads": {
    source: "apache",
    extensions: [
      "gam"
    ]
  },
  "application/x-tar": {
    source: "apache",
    compressible: !0,
    extensions: [
      "tar"
    ]
  },
  "application/x-tcl": {
    source: "apache",
    extensions: [
      "tcl",
      "tk"
    ]
  },
  "application/x-tex": {
    source: "apache",
    extensions: [
      "tex"
    ]
  },
  "application/x-tex-tfm": {
    source: "apache",
    extensions: [
      "tfm"
    ]
  },
  "application/x-texinfo": {
    source: "apache",
    extensions: [
      "texinfo",
      "texi"
    ]
  },
  "application/x-tgif": {
    source: "apache",
    extensions: [
      "obj"
    ]
  },
  "application/x-ustar": {
    source: "apache",
    extensions: [
      "ustar"
    ]
  },
  "application/x-virtualbox-hdd": {
    compressible: !0,
    extensions: [
      "hdd"
    ]
  },
  "application/x-virtualbox-ova": {
    compressible: !0,
    extensions: [
      "ova"
    ]
  },
  "application/x-virtualbox-ovf": {
    compressible: !0,
    extensions: [
      "ovf"
    ]
  },
  "application/x-virtualbox-vbox": {
    compressible: !0,
    extensions: [
      "vbox"
    ]
  },
  "application/x-virtualbox-vbox-extpack": {
    compressible: !1,
    extensions: [
      "vbox-extpack"
    ]
  },
  "application/x-virtualbox-vdi": {
    compressible: !0,
    extensions: [
      "vdi"
    ]
  },
  "application/x-virtualbox-vhd": {
    compressible: !0,
    extensions: [
      "vhd"
    ]
  },
  "application/x-virtualbox-vmdk": {
    compressible: !0,
    extensions: [
      "vmdk"
    ]
  },
  "application/x-wais-source": {
    source: "apache",
    extensions: [
      "src"
    ]
  },
  "application/x-web-app-manifest+json": {
    compressible: !0,
    extensions: [
      "webapp"
    ]
  },
  "application/x-www-form-urlencoded": {
    source: "iana",
    compressible: !0
  },
  "application/x-x509-ca-cert": {
    source: "iana",
    extensions: [
      "der",
      "crt",
      "pem"
    ]
  },
  "application/x-x509-ca-ra-cert": {
    source: "iana"
  },
  "application/x-x509-next-ca-cert": {
    source: "iana"
  },
  "application/x-xfig": {
    source: "apache",
    extensions: [
      "fig"
    ]
  },
  "application/x-xliff+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/x-xpinstall": {
    source: "apache",
    compressible: !1,
    extensions: [
      "xpi"
    ]
  },
  "application/x-xz": {
    source: "apache",
    extensions: [
      "xz"
    ]
  },
  "application/x-zmachine": {
    source: "apache",
    extensions: [
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "z8"
    ]
  },
  "application/x400-bp": {
    source: "iana"
  },
  "application/xacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xaml+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xaml"
    ]
  },
  "application/xcap-att+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xav"
    ]
  },
  "application/xcap-caps+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xca"
    ]
  },
  "application/xcap-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdf"
    ]
  },
  "application/xcap-el+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xel"
    ]
  },
  "application/xcap-error+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcap-ns+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xns"
    ]
  },
  "application/xcon-conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcon-conference-info-diff+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xenc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xenc"
    ]
  },
  "application/xhtml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xhtml",
      "xht"
    ]
  },
  "application/xhtml-voice+xml": {
    source: "apache",
    compressible: !0
  },
  "application/xliff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml",
      "xsl",
      "xsd",
      "rng"
    ]
  },
  "application/xml-dtd": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dtd"
    ]
  },
  "application/xml-external-parsed-entity": {
    source: "iana"
  },
  "application/xml-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xmpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xop+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xop"
    ]
  },
  "application/xproc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xpl"
    ]
  },
  "application/xslt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xsl",
      "xslt"
    ]
  },
  "application/xspf+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xspf"
    ]
  },
  "application/xv+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mxml",
      "xhvml",
      "xvml",
      "xvm"
    ]
  },
  "application/yang": {
    source: "iana",
    extensions: [
      "yang"
    ]
  },
  "application/yang-data+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yin+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "yin"
    ]
  },
  "application/zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "zip"
    ]
  },
  "application/zlib": {
    source: "iana"
  },
  "application/zstd": {
    source: "iana"
  },
  "audio/1d-interleaved-parityfec": {
    source: "iana"
  },
  "audio/32kadpcm": {
    source: "iana"
  },
  "audio/3gpp": {
    source: "iana",
    compressible: !1,
    extensions: [
      "3gpp"
    ]
  },
  "audio/3gpp2": {
    source: "iana"
  },
  "audio/aac": {
    source: "iana"
  },
  "audio/ac3": {
    source: "iana"
  },
  "audio/adpcm": {
    source: "apache",
    extensions: [
      "adp"
    ]
  },
  "audio/amr": {
    source: "iana",
    extensions: [
      "amr"
    ]
  },
  "audio/amr-wb": {
    source: "iana"
  },
  "audio/amr-wb+": {
    source: "iana"
  },
  "audio/aptx": {
    source: "iana"
  },
  "audio/asc": {
    source: "iana"
  },
  "audio/atrac-advanced-lossless": {
    source: "iana"
  },
  "audio/atrac-x": {
    source: "iana"
  },
  "audio/atrac3": {
    source: "iana"
  },
  "audio/basic": {
    source: "iana",
    compressible: !1,
    extensions: [
      "au",
      "snd"
    ]
  },
  "audio/bv16": {
    source: "iana"
  },
  "audio/bv32": {
    source: "iana"
  },
  "audio/clearmode": {
    source: "iana"
  },
  "audio/cn": {
    source: "iana"
  },
  "audio/dat12": {
    source: "iana"
  },
  "audio/dls": {
    source: "iana"
  },
  "audio/dsr-es201108": {
    source: "iana"
  },
  "audio/dsr-es202050": {
    source: "iana"
  },
  "audio/dsr-es202211": {
    source: "iana"
  },
  "audio/dsr-es202212": {
    source: "iana"
  },
  "audio/dv": {
    source: "iana"
  },
  "audio/dvi4": {
    source: "iana"
  },
  "audio/eac3": {
    source: "iana"
  },
  "audio/encaprtp": {
    source: "iana"
  },
  "audio/evrc": {
    source: "iana"
  },
  "audio/evrc-qcp": {
    source: "iana"
  },
  "audio/evrc0": {
    source: "iana"
  },
  "audio/evrc1": {
    source: "iana"
  },
  "audio/evrcb": {
    source: "iana"
  },
  "audio/evrcb0": {
    source: "iana"
  },
  "audio/evrcb1": {
    source: "iana"
  },
  "audio/evrcnw": {
    source: "iana"
  },
  "audio/evrcnw0": {
    source: "iana"
  },
  "audio/evrcnw1": {
    source: "iana"
  },
  "audio/evrcwb": {
    source: "iana"
  },
  "audio/evrcwb0": {
    source: "iana"
  },
  "audio/evrcwb1": {
    source: "iana"
  },
  "audio/evs": {
    source: "iana"
  },
  "audio/flexfec": {
    source: "iana"
  },
  "audio/fwdred": {
    source: "iana"
  },
  "audio/g711-0": {
    source: "iana"
  },
  "audio/g719": {
    source: "iana"
  },
  "audio/g722": {
    source: "iana"
  },
  "audio/g7221": {
    source: "iana"
  },
  "audio/g723": {
    source: "iana"
  },
  "audio/g726-16": {
    source: "iana"
  },
  "audio/g726-24": {
    source: "iana"
  },
  "audio/g726-32": {
    source: "iana"
  },
  "audio/g726-40": {
    source: "iana"
  },
  "audio/g728": {
    source: "iana"
  },
  "audio/g729": {
    source: "iana"
  },
  "audio/g7291": {
    source: "iana"
  },
  "audio/g729d": {
    source: "iana"
  },
  "audio/g729e": {
    source: "iana"
  },
  "audio/gsm": {
    source: "iana"
  },
  "audio/gsm-efr": {
    source: "iana"
  },
  "audio/gsm-hr-08": {
    source: "iana"
  },
  "audio/ilbc": {
    source: "iana"
  },
  "audio/ip-mr_v2.5": {
    source: "iana"
  },
  "audio/isac": {
    source: "apache"
  },
  "audio/l16": {
    source: "iana"
  },
  "audio/l20": {
    source: "iana"
  },
  "audio/l24": {
    source: "iana",
    compressible: !1
  },
  "audio/l8": {
    source: "iana"
  },
  "audio/lpc": {
    source: "iana"
  },
  "audio/melp": {
    source: "iana"
  },
  "audio/melp1200": {
    source: "iana"
  },
  "audio/melp2400": {
    source: "iana"
  },
  "audio/melp600": {
    source: "iana"
  },
  "audio/mhas": {
    source: "iana"
  },
  "audio/midi": {
    source: "apache",
    extensions: [
      "mid",
      "midi",
      "kar",
      "rmi"
    ]
  },
  "audio/mobile-xmf": {
    source: "iana",
    extensions: [
      "mxmf"
    ]
  },
  "audio/mp3": {
    compressible: !1,
    extensions: [
      "mp3"
    ]
  },
  "audio/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "m4a",
      "mp4a"
    ]
  },
  "audio/mp4a-latm": {
    source: "iana"
  },
  "audio/mpa": {
    source: "iana"
  },
  "audio/mpa-robust": {
    source: "iana"
  },
  "audio/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpga",
      "mp2",
      "mp2a",
      "mp3",
      "m2a",
      "m3a"
    ]
  },
  "audio/mpeg4-generic": {
    source: "iana"
  },
  "audio/musepack": {
    source: "apache"
  },
  "audio/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "oga",
      "ogg",
      "spx",
      "opus"
    ]
  },
  "audio/opus": {
    source: "iana"
  },
  "audio/parityfec": {
    source: "iana"
  },
  "audio/pcma": {
    source: "iana"
  },
  "audio/pcma-wb": {
    source: "iana"
  },
  "audio/pcmu": {
    source: "iana"
  },
  "audio/pcmu-wb": {
    source: "iana"
  },
  "audio/prs.sid": {
    source: "iana"
  },
  "audio/qcelp": {
    source: "iana"
  },
  "audio/raptorfec": {
    source: "iana"
  },
  "audio/red": {
    source: "iana"
  },
  "audio/rtp-enc-aescm128": {
    source: "iana"
  },
  "audio/rtp-midi": {
    source: "iana"
  },
  "audio/rtploopback": {
    source: "iana"
  },
  "audio/rtx": {
    source: "iana"
  },
  "audio/s3m": {
    source: "apache",
    extensions: [
      "s3m"
    ]
  },
  "audio/scip": {
    source: "iana"
  },
  "audio/silk": {
    source: "apache",
    extensions: [
      "sil"
    ]
  },
  "audio/smv": {
    source: "iana"
  },
  "audio/smv-qcp": {
    source: "iana"
  },
  "audio/smv0": {
    source: "iana"
  },
  "audio/sofa": {
    source: "iana"
  },
  "audio/sp-midi": {
    source: "iana"
  },
  "audio/speex": {
    source: "iana"
  },
  "audio/t140c": {
    source: "iana"
  },
  "audio/t38": {
    source: "iana"
  },
  "audio/telephone-event": {
    source: "iana"
  },
  "audio/tetra_acelp": {
    source: "iana"
  },
  "audio/tetra_acelp_bb": {
    source: "iana"
  },
  "audio/tone": {
    source: "iana"
  },
  "audio/tsvcis": {
    source: "iana"
  },
  "audio/uemclip": {
    source: "iana"
  },
  "audio/ulpfec": {
    source: "iana"
  },
  "audio/usac": {
    source: "iana"
  },
  "audio/vdvi": {
    source: "iana"
  },
  "audio/vmr-wb": {
    source: "iana"
  },
  "audio/vnd.3gpp.iufp": {
    source: "iana"
  },
  "audio/vnd.4sb": {
    source: "iana"
  },
  "audio/vnd.audiokoz": {
    source: "iana"
  },
  "audio/vnd.celp": {
    source: "iana"
  },
  "audio/vnd.cisco.nse": {
    source: "iana"
  },
  "audio/vnd.cmles.radio-events": {
    source: "iana"
  },
  "audio/vnd.cns.anp1": {
    source: "iana"
  },
  "audio/vnd.cns.inf1": {
    source: "iana"
  },
  "audio/vnd.dece.audio": {
    source: "iana",
    extensions: [
      "uva",
      "uvva"
    ]
  },
  "audio/vnd.digital-winds": {
    source: "iana",
    extensions: [
      "eol"
    ]
  },
  "audio/vnd.dlna.adts": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    source: "iana"
  },
  "audio/vnd.dolby.mlp": {
    source: "iana"
  },
  "audio/vnd.dolby.mps": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2x": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2z": {
    source: "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    source: "iana"
  },
  "audio/vnd.dra": {
    source: "iana",
    extensions: [
      "dra"
    ]
  },
  "audio/vnd.dts": {
    source: "iana",
    extensions: [
      "dts"
    ]
  },
  "audio/vnd.dts.hd": {
    source: "iana",
    extensions: [
      "dtshd"
    ]
  },
  "audio/vnd.dts.uhd": {
    source: "iana"
  },
  "audio/vnd.dvb.file": {
    source: "iana"
  },
  "audio/vnd.everad.plj": {
    source: "iana"
  },
  "audio/vnd.hns.audio": {
    source: "iana"
  },
  "audio/vnd.lucent.voice": {
    source: "iana",
    extensions: [
      "lvp"
    ]
  },
  "audio/vnd.ms-playready.media.pya": {
    source: "iana",
    extensions: [
      "pya"
    ]
  },
  "audio/vnd.nokia.mobile-xmf": {
    source: "iana"
  },
  "audio/vnd.nortel.vbk": {
    source: "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    source: "iana",
    extensions: [
      "ecelp4800"
    ]
  },
  "audio/vnd.nuera.ecelp7470": {
    source: "iana",
    extensions: [
      "ecelp7470"
    ]
  },
  "audio/vnd.nuera.ecelp9600": {
    source: "iana",
    extensions: [
      "ecelp9600"
    ]
  },
  "audio/vnd.octel.sbc": {
    source: "iana"
  },
  "audio/vnd.presonus.multitrack": {
    source: "iana"
  },
  "audio/vnd.qcelp": {
    source: "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    source: "iana"
  },
  "audio/vnd.rip": {
    source: "iana",
    extensions: [
      "rip"
    ]
  },
  "audio/vnd.rn-realaudio": {
    compressible: !1
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    source: "iana"
  },
  "audio/vnd.vmx.cvsd": {
    source: "iana"
  },
  "audio/vnd.wave": {
    compressible: !1
  },
  "audio/vorbis": {
    source: "iana",
    compressible: !1
  },
  "audio/vorbis-config": {
    source: "iana"
  },
  "audio/wav": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/wave": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "weba"
    ]
  },
  "audio/x-aac": {
    source: "apache",
    compressible: !1,
    extensions: [
      "aac"
    ]
  },
  "audio/x-aiff": {
    source: "apache",
    extensions: [
      "aif",
      "aiff",
      "aifc"
    ]
  },
  "audio/x-caf": {
    source: "apache",
    compressible: !1,
    extensions: [
      "caf"
    ]
  },
  "audio/x-flac": {
    source: "apache",
    extensions: [
      "flac"
    ]
  },
  "audio/x-m4a": {
    source: "nginx",
    extensions: [
      "m4a"
    ]
  },
  "audio/x-matroska": {
    source: "apache",
    extensions: [
      "mka"
    ]
  },
  "audio/x-mpegurl": {
    source: "apache",
    extensions: [
      "m3u"
    ]
  },
  "audio/x-ms-wax": {
    source: "apache",
    extensions: [
      "wax"
    ]
  },
  "audio/x-ms-wma": {
    source: "apache",
    extensions: [
      "wma"
    ]
  },
  "audio/x-pn-realaudio": {
    source: "apache",
    extensions: [
      "ram",
      "ra"
    ]
  },
  "audio/x-pn-realaudio-plugin": {
    source: "apache",
    extensions: [
      "rmp"
    ]
  },
  "audio/x-realaudio": {
    source: "nginx",
    extensions: [
      "ra"
    ]
  },
  "audio/x-tta": {
    source: "apache"
  },
  "audio/x-wav": {
    source: "apache",
    extensions: [
      "wav"
    ]
  },
  "audio/xm": {
    source: "apache",
    extensions: [
      "xm"
    ]
  },
  "chemical/x-cdx": {
    source: "apache",
    extensions: [
      "cdx"
    ]
  },
  "chemical/x-cif": {
    source: "apache",
    extensions: [
      "cif"
    ]
  },
  "chemical/x-cmdf": {
    source: "apache",
    extensions: [
      "cmdf"
    ]
  },
  "chemical/x-cml": {
    source: "apache",
    extensions: [
      "cml"
    ]
  },
  "chemical/x-csml": {
    source: "apache",
    extensions: [
      "csml"
    ]
  },
  "chemical/x-pdb": {
    source: "apache"
  },
  "chemical/x-xyz": {
    source: "apache",
    extensions: [
      "xyz"
    ]
  },
  "font/collection": {
    source: "iana",
    extensions: [
      "ttc"
    ]
  },
  "font/otf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "otf"
    ]
  },
  "font/sfnt": {
    source: "iana"
  },
  "font/ttf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttf"
    ]
  },
  "font/woff": {
    source: "iana",
    extensions: [
      "woff"
    ]
  },
  "font/woff2": {
    source: "iana",
    extensions: [
      "woff2"
    ]
  },
  "image/aces": {
    source: "iana",
    extensions: [
      "exr"
    ]
  },
  "image/apng": {
    compressible: !1,
    extensions: [
      "apng"
    ]
  },
  "image/avci": {
    source: "iana",
    extensions: [
      "avci"
    ]
  },
  "image/avcs": {
    source: "iana",
    extensions: [
      "avcs"
    ]
  },
  "image/avif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "avif"
    ]
  },
  "image/bmp": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/cgm": {
    source: "iana",
    extensions: [
      "cgm"
    ]
  },
  "image/dicom-rle": {
    source: "iana",
    extensions: [
      "drle"
    ]
  },
  "image/emf": {
    source: "iana",
    extensions: [
      "emf"
    ]
  },
  "image/fits": {
    source: "iana",
    extensions: [
      "fits"
    ]
  },
  "image/g3fax": {
    source: "iana",
    extensions: [
      "g3"
    ]
  },
  "image/gif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gif"
    ]
  },
  "image/heic": {
    source: "iana",
    extensions: [
      "heic"
    ]
  },
  "image/heic-sequence": {
    source: "iana",
    extensions: [
      "heics"
    ]
  },
  "image/heif": {
    source: "iana",
    extensions: [
      "heif"
    ]
  },
  "image/heif-sequence": {
    source: "iana",
    extensions: [
      "heifs"
    ]
  },
  "image/hej2k": {
    source: "iana",
    extensions: [
      "hej2"
    ]
  },
  "image/hsj2": {
    source: "iana",
    extensions: [
      "hsj2"
    ]
  },
  "image/ief": {
    source: "iana",
    extensions: [
      "ief"
    ]
  },
  "image/jls": {
    source: "iana",
    extensions: [
      "jls"
    ]
  },
  "image/jp2": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jp2",
      "jpg2"
    ]
  },
  "image/jpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpeg",
      "jpg",
      "jpe"
    ]
  },
  "image/jph": {
    source: "iana",
    extensions: [
      "jph"
    ]
  },
  "image/jphc": {
    source: "iana",
    extensions: [
      "jhc"
    ]
  },
  "image/jpm": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpm"
    ]
  },
  "image/jpx": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpx",
      "jpf"
    ]
  },
  "image/jxr": {
    source: "iana",
    extensions: [
      "jxr"
    ]
  },
  "image/jxra": {
    source: "iana",
    extensions: [
      "jxra"
    ]
  },
  "image/jxrs": {
    source: "iana",
    extensions: [
      "jxrs"
    ]
  },
  "image/jxs": {
    source: "iana",
    extensions: [
      "jxs"
    ]
  },
  "image/jxsc": {
    source: "iana",
    extensions: [
      "jxsc"
    ]
  },
  "image/jxsi": {
    source: "iana",
    extensions: [
      "jxsi"
    ]
  },
  "image/jxss": {
    source: "iana",
    extensions: [
      "jxss"
    ]
  },
  "image/ktx": {
    source: "iana",
    extensions: [
      "ktx"
    ]
  },
  "image/ktx2": {
    source: "iana",
    extensions: [
      "ktx2"
    ]
  },
  "image/naplps": {
    source: "iana"
  },
  "image/pjpeg": {
    compressible: !1
  },
  "image/png": {
    source: "iana",
    compressible: !1,
    extensions: [
      "png"
    ]
  },
  "image/prs.btif": {
    source: "iana",
    extensions: [
      "btif"
    ]
  },
  "image/prs.pti": {
    source: "iana",
    extensions: [
      "pti"
    ]
  },
  "image/pwg-raster": {
    source: "iana"
  },
  "image/sgi": {
    source: "apache",
    extensions: [
      "sgi"
    ]
  },
  "image/svg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "svg",
      "svgz"
    ]
  },
  "image/t38": {
    source: "iana",
    extensions: [
      "t38"
    ]
  },
  "image/tiff": {
    source: "iana",
    compressible: !1,
    extensions: [
      "tif",
      "tiff"
    ]
  },
  "image/tiff-fx": {
    source: "iana",
    extensions: [
      "tfx"
    ]
  },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    compressible: !0,
    extensions: [
      "psd"
    ]
  },
  "image/vnd.airzip.accelerator.azv": {
    source: "iana",
    extensions: [
      "azv"
    ]
  },
  "image/vnd.cns.inf2": {
    source: "iana"
  },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: [
      "uvi",
      "uvvi",
      "uvg",
      "uvvg"
    ]
  },
  "image/vnd.djvu": {
    source: "iana",
    extensions: [
      "djvu",
      "djv"
    ]
  },
  "image/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "image/vnd.dwg": {
    source: "iana",
    extensions: [
      "dwg"
    ]
  },
  "image/vnd.dxf": {
    source: "iana",
    extensions: [
      "dxf"
    ]
  },
  "image/vnd.fastbidsheet": {
    source: "iana",
    extensions: [
      "fbs"
    ]
  },
  "image/vnd.fpx": {
    source: "iana",
    extensions: [
      "fpx"
    ]
  },
  "image/vnd.fst": {
    source: "iana",
    extensions: [
      "fst"
    ]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    source: "iana",
    extensions: [
      "mmr"
    ]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    source: "iana",
    extensions: [
      "rlc"
    ]
  },
  "image/vnd.globalgraphics.pgb": {
    source: "iana"
  },
  "image/vnd.microsoft.icon": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/vnd.mix": {
    source: "iana"
  },
  "image/vnd.mozilla.apng": {
    source: "iana"
  },
  "image/vnd.ms-dds": {
    compressible: !0,
    extensions: [
      "dds"
    ]
  },
  "image/vnd.ms-modi": {
    source: "iana",
    extensions: [
      "mdi"
    ]
  },
  "image/vnd.ms-photo": {
    source: "apache",
    extensions: [
      "wdp"
    ]
  },
  "image/vnd.net-fpx": {
    source: "iana",
    extensions: [
      "npx"
    ]
  },
  "image/vnd.pco.b16": {
    source: "iana",
    extensions: [
      "b16"
    ]
  },
  "image/vnd.radiance": {
    source: "iana"
  },
  "image/vnd.sealed.png": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    source: "iana"
  },
  "image/vnd.svf": {
    source: "iana"
  },
  "image/vnd.tencent.tap": {
    source: "iana",
    extensions: [
      "tap"
    ]
  },
  "image/vnd.valve.source.texture": {
    source: "iana",
    extensions: [
      "vtf"
    ]
  },
  "image/vnd.wap.wbmp": {
    source: "iana",
    extensions: [
      "wbmp"
    ]
  },
  "image/vnd.xiff": {
    source: "iana",
    extensions: [
      "xif"
    ]
  },
  "image/vnd.zbrush.pcx": {
    source: "iana",
    extensions: [
      "pcx"
    ]
  },
  "image/webp": {
    source: "apache",
    extensions: [
      "webp"
    ]
  },
  "image/wmf": {
    source: "iana",
    extensions: [
      "wmf"
    ]
  },
  "image/x-3ds": {
    source: "apache",
    extensions: [
      "3ds"
    ]
  },
  "image/x-cmu-raster": {
    source: "apache",
    extensions: [
      "ras"
    ]
  },
  "image/x-cmx": {
    source: "apache",
    extensions: [
      "cmx"
    ]
  },
  "image/x-freehand": {
    source: "apache",
    extensions: [
      "fh",
      "fhc",
      "fh4",
      "fh5",
      "fh7"
    ]
  },
  "image/x-icon": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/x-jng": {
    source: "nginx",
    extensions: [
      "jng"
    ]
  },
  "image/x-mrsid-image": {
    source: "apache",
    extensions: [
      "sid"
    ]
  },
  "image/x-ms-bmp": {
    source: "nginx",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/x-pcx": {
    source: "apache",
    extensions: [
      "pcx"
    ]
  },
  "image/x-pict": {
    source: "apache",
    extensions: [
      "pic",
      "pct"
    ]
  },
  "image/x-portable-anymap": {
    source: "apache",
    extensions: [
      "pnm"
    ]
  },
  "image/x-portable-bitmap": {
    source: "apache",
    extensions: [
      "pbm"
    ]
  },
  "image/x-portable-graymap": {
    source: "apache",
    extensions: [
      "pgm"
    ]
  },
  "image/x-portable-pixmap": {
    source: "apache",
    extensions: [
      "ppm"
    ]
  },
  "image/x-rgb": {
    source: "apache",
    extensions: [
      "rgb"
    ]
  },
  "image/x-tga": {
    source: "apache",
    extensions: [
      "tga"
    ]
  },
  "image/x-xbitmap": {
    source: "apache",
    extensions: [
      "xbm"
    ]
  },
  "image/x-xcf": {
    compressible: !1
  },
  "image/x-xpixmap": {
    source: "apache",
    extensions: [
      "xpm"
    ]
  },
  "image/x-xwindowdump": {
    source: "apache",
    extensions: [
      "xwd"
    ]
  },
  "message/cpim": {
    source: "iana"
  },
  "message/delivery-status": {
    source: "iana"
  },
  "message/disposition-notification": {
    source: "iana",
    extensions: [
      "disposition-notification"
    ]
  },
  "message/external-body": {
    source: "iana"
  },
  "message/feedback-report": {
    source: "iana"
  },
  "message/global": {
    source: "iana",
    extensions: [
      "u8msg"
    ]
  },
  "message/global-delivery-status": {
    source: "iana",
    extensions: [
      "u8dsn"
    ]
  },
  "message/global-disposition-notification": {
    source: "iana",
    extensions: [
      "u8mdn"
    ]
  },
  "message/global-headers": {
    source: "iana",
    extensions: [
      "u8hdr"
    ]
  },
  "message/http": {
    source: "iana",
    compressible: !1
  },
  "message/imdn+xml": {
    source: "iana",
    compressible: !0
  },
  "message/news": {
    source: "iana"
  },
  "message/partial": {
    source: "iana",
    compressible: !1
  },
  "message/rfc822": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eml",
      "mime"
    ]
  },
  "message/s-http": {
    source: "iana"
  },
  "message/sip": {
    source: "iana"
  },
  "message/sipfrag": {
    source: "iana"
  },
  "message/tracking-status": {
    source: "iana"
  },
  "message/vnd.si.simp": {
    source: "iana"
  },
  "message/vnd.wfa.wsc": {
    source: "iana",
    extensions: [
      "wsc"
    ]
  },
  "model/3mf": {
    source: "iana",
    extensions: [
      "3mf"
    ]
  },
  "model/e57": {
    source: "iana"
  },
  "model/gltf+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gltf"
    ]
  },
  "model/gltf-binary": {
    source: "iana",
    compressible: !0,
    extensions: [
      "glb"
    ]
  },
  "model/iges": {
    source: "iana",
    compressible: !1,
    extensions: [
      "igs",
      "iges"
    ]
  },
  "model/mesh": {
    source: "iana",
    compressible: !1,
    extensions: [
      "msh",
      "mesh",
      "silo"
    ]
  },
  "model/mtl": {
    source: "iana",
    extensions: [
      "mtl"
    ]
  },
  "model/obj": {
    source: "iana",
    extensions: [
      "obj"
    ]
  },
  "model/step": {
    source: "iana"
  },
  "model/step+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "stpx"
    ]
  },
  "model/step+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpz"
    ]
  },
  "model/step-xml+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpxz"
    ]
  },
  "model/stl": {
    source: "iana",
    extensions: [
      "stl"
    ]
  },
  "model/vnd.collada+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dae"
    ]
  },
  "model/vnd.dwf": {
    source: "iana",
    extensions: [
      "dwf"
    ]
  },
  "model/vnd.flatland.3dml": {
    source: "iana"
  },
  "model/vnd.gdl": {
    source: "iana",
    extensions: [
      "gdl"
    ]
  },
  "model/vnd.gs-gdl": {
    source: "apache"
  },
  "model/vnd.gs.gdl": {
    source: "iana"
  },
  "model/vnd.gtw": {
    source: "iana",
    extensions: [
      "gtw"
    ]
  },
  "model/vnd.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "model/vnd.mts": {
    source: "iana",
    extensions: [
      "mts"
    ]
  },
  "model/vnd.opengex": {
    source: "iana",
    extensions: [
      "ogex"
    ]
  },
  "model/vnd.parasolid.transmit.binary": {
    source: "iana",
    extensions: [
      "x_b"
    ]
  },
  "model/vnd.parasolid.transmit.text": {
    source: "iana",
    extensions: [
      "x_t"
    ]
  },
  "model/vnd.pytha.pyox": {
    source: "iana"
  },
  "model/vnd.rosette.annotated-data-model": {
    source: "iana"
  },
  "model/vnd.sap.vds": {
    source: "iana",
    extensions: [
      "vds"
    ]
  },
  "model/vnd.usdz+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "usdz"
    ]
  },
  "model/vnd.valve.source.compiled-map": {
    source: "iana",
    extensions: [
      "bsp"
    ]
  },
  "model/vnd.vtu": {
    source: "iana",
    extensions: [
      "vtu"
    ]
  },
  "model/vrml": {
    source: "iana",
    compressible: !1,
    extensions: [
      "wrl",
      "vrml"
    ]
  },
  "model/x3d+binary": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3db",
      "x3dbz"
    ]
  },
  "model/x3d+fastinfoset": {
    source: "iana",
    extensions: [
      "x3db"
    ]
  },
  "model/x3d+vrml": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3dv",
      "x3dvz"
    ]
  },
  "model/x3d+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "x3d",
      "x3dz"
    ]
  },
  "model/x3d-vrml": {
    source: "iana",
    extensions: [
      "x3dv"
    ]
  },
  "multipart/alternative": {
    source: "iana",
    compressible: !1
  },
  "multipart/appledouble": {
    source: "iana"
  },
  "multipart/byteranges": {
    source: "iana"
  },
  "multipart/digest": {
    source: "iana"
  },
  "multipart/encrypted": {
    source: "iana",
    compressible: !1
  },
  "multipart/form-data": {
    source: "iana",
    compressible: !1
  },
  "multipart/header-set": {
    source: "iana"
  },
  "multipart/mixed": {
    source: "iana"
  },
  "multipart/multilingual": {
    source: "iana"
  },
  "multipart/parallel": {
    source: "iana"
  },
  "multipart/related": {
    source: "iana",
    compressible: !1
  },
  "multipart/report": {
    source: "iana"
  },
  "multipart/signed": {
    source: "iana",
    compressible: !1
  },
  "multipart/vnd.bint.med-plus": {
    source: "iana"
  },
  "multipart/voice-message": {
    source: "iana"
  },
  "multipart/x-mixed-replace": {
    source: "iana"
  },
  "text/1d-interleaved-parityfec": {
    source: "iana"
  },
  "text/cache-manifest": {
    source: "iana",
    compressible: !0,
    extensions: [
      "appcache",
      "manifest"
    ]
  },
  "text/calendar": {
    source: "iana",
    extensions: [
      "ics",
      "ifb"
    ]
  },
  "text/calender": {
    compressible: !0
  },
  "text/cmd": {
    compressible: !0
  },
  "text/coffeescript": {
    extensions: [
      "coffee",
      "litcoffee"
    ]
  },
  "text/cql": {
    source: "iana"
  },
  "text/cql-expression": {
    source: "iana"
  },
  "text/cql-identifier": {
    source: "iana"
  },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "css"
    ]
  },
  "text/csv": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csv"
    ]
  },
  "text/csv-schema": {
    source: "iana"
  },
  "text/directory": {
    source: "iana"
  },
  "text/dns": {
    source: "iana"
  },
  "text/ecmascript": {
    source: "iana"
  },
  "text/encaprtp": {
    source: "iana"
  },
  "text/enriched": {
    source: "iana"
  },
  "text/fhirpath": {
    source: "iana"
  },
  "text/flexfec": {
    source: "iana"
  },
  "text/fwdred": {
    source: "iana"
  },
  "text/gff3": {
    source: "iana"
  },
  "text/grammar-ref-list": {
    source: "iana"
  },
  "text/html": {
    source: "iana",
    compressible: !0,
    extensions: [
      "html",
      "htm",
      "shtml"
    ]
  },
  "text/jade": {
    extensions: [
      "jade"
    ]
  },
  "text/javascript": {
    source: "iana",
    compressible: !0
  },
  "text/jcr-cnd": {
    source: "iana"
  },
  "text/jsx": {
    compressible: !0,
    extensions: [
      "jsx"
    ]
  },
  "text/less": {
    compressible: !0,
    extensions: [
      "less"
    ]
  },
  "text/markdown": {
    source: "iana",
    compressible: !0,
    extensions: [
      "markdown",
      "md"
    ]
  },
  "text/mathml": {
    source: "nginx",
    extensions: [
      "mml"
    ]
  },
  "text/mdx": {
    compressible: !0,
    extensions: [
      "mdx"
    ]
  },
  "text/mizar": {
    source: "iana"
  },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "n3"
    ]
  },
  "text/parameters": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/parityfec": {
    source: "iana"
  },
  "text/plain": {
    source: "iana",
    compressible: !0,
    extensions: [
      "txt",
      "text",
      "conf",
      "def",
      "list",
      "log",
      "in",
      "ini"
    ]
  },
  "text/provenance-notation": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/prs.fallenstein.rst": {
    source: "iana"
  },
  "text/prs.lines.tag": {
    source: "iana",
    extensions: [
      "dsc"
    ]
  },
  "text/prs.prop.logic": {
    source: "iana"
  },
  "text/raptorfec": {
    source: "iana"
  },
  "text/red": {
    source: "iana"
  },
  "text/rfc822-headers": {
    source: "iana"
  },
  "text/richtext": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtx"
    ]
  },
  "text/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "text/rtp-enc-aescm128": {
    source: "iana"
  },
  "text/rtploopback": {
    source: "iana"
  },
  "text/rtx": {
    source: "iana"
  },
  "text/sgml": {
    source: "iana",
    extensions: [
      "sgml",
      "sgm"
    ]
  },
  "text/shaclc": {
    source: "iana"
  },
  "text/shex": {
    source: "iana",
    extensions: [
      "shex"
    ]
  },
  "text/slim": {
    extensions: [
      "slim",
      "slm"
    ]
  },
  "text/spdx": {
    source: "iana",
    extensions: [
      "spdx"
    ]
  },
  "text/strings": {
    source: "iana"
  },
  "text/stylus": {
    extensions: [
      "stylus",
      "styl"
    ]
  },
  "text/t140": {
    source: "iana"
  },
  "text/tab-separated-values": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tsv"
    ]
  },
  "text/troff": {
    source: "iana",
    extensions: [
      "t",
      "tr",
      "roff",
      "man",
      "me",
      "ms"
    ]
  },
  "text/turtle": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "ttl"
    ]
  },
  "text/ulpfec": {
    source: "iana"
  },
  "text/uri-list": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uri",
      "uris",
      "urls"
    ]
  },
  "text/vcard": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vcard"
    ]
  },
  "text/vnd.a": {
    source: "iana"
  },
  "text/vnd.abc": {
    source: "iana"
  },
  "text/vnd.ascii-art": {
    source: "iana"
  },
  "text/vnd.curl": {
    source: "iana",
    extensions: [
      "curl"
    ]
  },
  "text/vnd.curl.dcurl": {
    source: "apache",
    extensions: [
      "dcurl"
    ]
  },
  "text/vnd.curl.mcurl": {
    source: "apache",
    extensions: [
      "mcurl"
    ]
  },
  "text/vnd.curl.scurl": {
    source: "apache",
    extensions: [
      "scurl"
    ]
  },
  "text/vnd.debian.copyright": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.dmclientscript": {
    source: "iana"
  },
  "text/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "text/vnd.esmertec.theme-descriptor": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.familysearch.gedcom": {
    source: "iana",
    extensions: [
      "ged"
    ]
  },
  "text/vnd.ficlab.flt": {
    source: "iana"
  },
  "text/vnd.fly": {
    source: "iana",
    extensions: [
      "fly"
    ]
  },
  "text/vnd.fmi.flexstor": {
    source: "iana",
    extensions: [
      "flx"
    ]
  },
  "text/vnd.gml": {
    source: "iana"
  },
  "text/vnd.graphviz": {
    source: "iana",
    extensions: [
      "gv"
    ]
  },
  "text/vnd.hans": {
    source: "iana"
  },
  "text/vnd.hgl": {
    source: "iana"
  },
  "text/vnd.in3d.3dml": {
    source: "iana",
    extensions: [
      "3dml"
    ]
  },
  "text/vnd.in3d.spot": {
    source: "iana",
    extensions: [
      "spot"
    ]
  },
  "text/vnd.iptc.newsml": {
    source: "iana"
  },
  "text/vnd.iptc.nitf": {
    source: "iana"
  },
  "text/vnd.latex-z": {
    source: "iana"
  },
  "text/vnd.motorola.reflex": {
    source: "iana"
  },
  "text/vnd.ms-mediapackage": {
    source: "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    source: "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    source: "iana"
  },
  "text/vnd.senx.warpscript": {
    source: "iana"
  },
  "text/vnd.si.uricatalogue": {
    source: "iana"
  },
  "text/vnd.sosi": {
    source: "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "jad"
    ]
  },
  "text/vnd.trolltech.linguist": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.wap.si": {
    source: "iana"
  },
  "text/vnd.wap.sl": {
    source: "iana"
  },
  "text/vnd.wap.wml": {
    source: "iana",
    extensions: [
      "wml"
    ]
  },
  "text/vnd.wap.wmlscript": {
    source: "iana",
    extensions: [
      "wmls"
    ]
  },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "vtt"
    ]
  },
  "text/x-asm": {
    source: "apache",
    extensions: [
      "s",
      "asm"
    ]
  },
  "text/x-c": {
    source: "apache",
    extensions: [
      "c",
      "cc",
      "cxx",
      "cpp",
      "h",
      "hh",
      "dic"
    ]
  },
  "text/x-component": {
    source: "nginx",
    extensions: [
      "htc"
    ]
  },
  "text/x-fortran": {
    source: "apache",
    extensions: [
      "f",
      "for",
      "f77",
      "f90"
    ]
  },
  "text/x-gwt-rpc": {
    compressible: !0
  },
  "text/x-handlebars-template": {
    extensions: [
      "hbs"
    ]
  },
  "text/x-java-source": {
    source: "apache",
    extensions: [
      "java"
    ]
  },
  "text/x-jquery-tmpl": {
    compressible: !0
  },
  "text/x-lua": {
    extensions: [
      "lua"
    ]
  },
  "text/x-markdown": {
    compressible: !0,
    extensions: [
      "mkd"
    ]
  },
  "text/x-nfo": {
    source: "apache",
    extensions: [
      "nfo"
    ]
  },
  "text/x-opml": {
    source: "apache",
    extensions: [
      "opml"
    ]
  },
  "text/x-org": {
    compressible: !0,
    extensions: [
      "org"
    ]
  },
  "text/x-pascal": {
    source: "apache",
    extensions: [
      "p",
      "pas"
    ]
  },
  "text/x-processing": {
    compressible: !0,
    extensions: [
      "pde"
    ]
  },
  "text/x-sass": {
    extensions: [
      "sass"
    ]
  },
  "text/x-scss": {
    extensions: [
      "scss"
    ]
  },
  "text/x-setext": {
    source: "apache",
    extensions: [
      "etx"
    ]
  },
  "text/x-sfv": {
    source: "apache",
    extensions: [
      "sfv"
    ]
  },
  "text/x-suse-ymp": {
    compressible: !0,
    extensions: [
      "ymp"
    ]
  },
  "text/x-uuencode": {
    source: "apache",
    extensions: [
      "uu"
    ]
  },
  "text/x-vcalendar": {
    source: "apache",
    extensions: [
      "vcs"
    ]
  },
  "text/x-vcard": {
    source: "apache",
    extensions: [
      "vcf"
    ]
  },
  "text/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml"
    ]
  },
  "text/xml-external-parsed-entity": {
    source: "iana"
  },
  "text/yaml": {
    compressible: !0,
    extensions: [
      "yaml",
      "yml"
    ]
  },
  "video/1d-interleaved-parityfec": {
    source: "iana"
  },
  "video/3gpp": {
    source: "iana",
    extensions: [
      "3gp",
      "3gpp"
    ]
  },
  "video/3gpp-tt": {
    source: "iana"
  },
  "video/3gpp2": {
    source: "iana",
    extensions: [
      "3g2"
    ]
  },
  "video/av1": {
    source: "iana"
  },
  "video/bmpeg": {
    source: "iana"
  },
  "video/bt656": {
    source: "iana"
  },
  "video/celb": {
    source: "iana"
  },
  "video/dv": {
    source: "iana"
  },
  "video/encaprtp": {
    source: "iana"
  },
  "video/ffv1": {
    source: "iana"
  },
  "video/flexfec": {
    source: "iana"
  },
  "video/h261": {
    source: "iana",
    extensions: [
      "h261"
    ]
  },
  "video/h263": {
    source: "iana",
    extensions: [
      "h263"
    ]
  },
  "video/h263-1998": {
    source: "iana"
  },
  "video/h263-2000": {
    source: "iana"
  },
  "video/h264": {
    source: "iana",
    extensions: [
      "h264"
    ]
  },
  "video/h264-rcdo": {
    source: "iana"
  },
  "video/h264-svc": {
    source: "iana"
  },
  "video/h265": {
    source: "iana"
  },
  "video/iso.segment": {
    source: "iana",
    extensions: [
      "m4s"
    ]
  },
  "video/jpeg": {
    source: "iana",
    extensions: [
      "jpgv"
    ]
  },
  "video/jpeg2000": {
    source: "iana"
  },
  "video/jpm": {
    source: "apache",
    extensions: [
      "jpm",
      "jpgm"
    ]
  },
  "video/jxsv": {
    source: "iana"
  },
  "video/mj2": {
    source: "iana",
    extensions: [
      "mj2",
      "mjp2"
    ]
  },
  "video/mp1s": {
    source: "iana"
  },
  "video/mp2p": {
    source: "iana"
  },
  "video/mp2t": {
    source: "iana",
    extensions: [
      "ts"
    ]
  },
  "video/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mp4",
      "mp4v",
      "mpg4"
    ]
  },
  "video/mp4v-es": {
    source: "iana"
  },
  "video/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpeg",
      "mpg",
      "mpe",
      "m1v",
      "m2v"
    ]
  },
  "video/mpeg4-generic": {
    source: "iana"
  },
  "video/mpv": {
    source: "iana"
  },
  "video/nv": {
    source: "iana"
  },
  "video/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogv"
    ]
  },
  "video/parityfec": {
    source: "iana"
  },
  "video/pointer": {
    source: "iana"
  },
  "video/quicktime": {
    source: "iana",
    compressible: !1,
    extensions: [
      "qt",
      "mov"
    ]
  },
  "video/raptorfec": {
    source: "iana"
  },
  "video/raw": {
    source: "iana"
  },
  "video/rtp-enc-aescm128": {
    source: "iana"
  },
  "video/rtploopback": {
    source: "iana"
  },
  "video/rtx": {
    source: "iana"
  },
  "video/scip": {
    source: "iana"
  },
  "video/smpte291": {
    source: "iana"
  },
  "video/smpte292m": {
    source: "iana"
  },
  "video/ulpfec": {
    source: "iana"
  },
  "video/vc1": {
    source: "iana"
  },
  "video/vc2": {
    source: "iana"
  },
  "video/vnd.cctv": {
    source: "iana"
  },
  "video/vnd.dece.hd": {
    source: "iana",
    extensions: [
      "uvh",
      "uvvh"
    ]
  },
  "video/vnd.dece.mobile": {
    source: "iana",
    extensions: [
      "uvm",
      "uvvm"
    ]
  },
  "video/vnd.dece.mp4": {
    source: "iana"
  },
  "video/vnd.dece.pd": {
    source: "iana",
    extensions: [
      "uvp",
      "uvvp"
    ]
  },
  "video/vnd.dece.sd": {
    source: "iana",
    extensions: [
      "uvs",
      "uvvs"
    ]
  },
  "video/vnd.dece.video": {
    source: "iana",
    extensions: [
      "uvv",
      "uvvv"
    ]
  },
  "video/vnd.directv.mpeg": {
    source: "iana"
  },
  "video/vnd.directv.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dlna.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dvb.file": {
    source: "iana",
    extensions: [
      "dvb"
    ]
  },
  "video/vnd.fvt": {
    source: "iana",
    extensions: [
      "fvt"
    ]
  },
  "video/vnd.hns.video": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsavc": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    source: "iana"
  },
  "video/vnd.motorola.video": {
    source: "iana"
  },
  "video/vnd.motorola.videop": {
    source: "iana"
  },
  "video/vnd.mpegurl": {
    source: "iana",
    extensions: [
      "mxu",
      "m4u"
    ]
  },
  "video/vnd.ms-playready.media.pyv": {
    source: "iana",
    extensions: [
      "pyv"
    ]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    source: "iana"
  },
  "video/vnd.nokia.mp4vr": {
    source: "iana"
  },
  "video/vnd.nokia.videovoip": {
    source: "iana"
  },
  "video/vnd.objectvideo": {
    source: "iana"
  },
  "video/vnd.radgamettools.bink": {
    source: "iana"
  },
  "video/vnd.radgamettools.smacker": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg1": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg4": {
    source: "iana"
  },
  "video/vnd.sealed.swf": {
    source: "iana"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    source: "iana"
  },
  "video/vnd.uvvu.mp4": {
    source: "iana",
    extensions: [
      "uvu",
      "uvvu"
    ]
  },
  "video/vnd.vivo": {
    source: "iana",
    extensions: [
      "viv"
    ]
  },
  "video/vnd.youtube.yt": {
    source: "iana"
  },
  "video/vp8": {
    source: "iana"
  },
  "video/vp9": {
    source: "iana"
  },
  "video/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "webm"
    ]
  },
  "video/x-f4v": {
    source: "apache",
    extensions: [
      "f4v"
    ]
  },
  "video/x-fli": {
    source: "apache",
    extensions: [
      "fli"
    ]
  },
  "video/x-flv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "flv"
    ]
  },
  "video/x-m4v": {
    source: "apache",
    extensions: [
      "m4v"
    ]
  },
  "video/x-matroska": {
    source: "apache",
    compressible: !1,
    extensions: [
      "mkv",
      "mk3d",
      "mks"
    ]
  },
  "video/x-mng": {
    source: "apache",
    extensions: [
      "mng"
    ]
  },
  "video/x-ms-asf": {
    source: "apache",
    extensions: [
      "asf",
      "asx"
    ]
  },
  "video/x-ms-vob": {
    source: "apache",
    extensions: [
      "vob"
    ]
  },
  "video/x-ms-wm": {
    source: "apache",
    extensions: [
      "wm"
    ]
  },
  "video/x-ms-wmv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "wmv"
    ]
  },
  "video/x-ms-wmx": {
    source: "apache",
    extensions: [
      "wmx"
    ]
  },
  "video/x-ms-wvx": {
    source: "apache",
    extensions: [
      "wvx"
    ]
  },
  "video/x-msvideo": {
    source: "apache",
    extensions: [
      "avi"
    ]
  },
  "video/x-sgi-movie": {
    source: "apache",
    extensions: [
      "movie"
    ]
  },
  "video/x-smv": {
    source: "apache",
    extensions: [
      "smv"
    ]
  },
  "x-conference/x-cooltalk": {
    source: "apache",
    extensions: [
      "ice"
    ]
  },
  "x-shader/x-fragment": {
    compressible: !0
  },
  "x-shader/x-vertex": {
    compressible: !0
  }
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var IP = CP;
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(e) {
  var t = IP, n = pt.extname, r = /^\s*([^;\s]*)(?:;|\s|$)/, a = /^text\//i;
  e.charset = s, e.charsets = { lookup: s }, e.contentType = o, e.extension = c, e.extensions = /* @__PURE__ */ Object.create(null), e.lookup = l, e.types = /* @__PURE__ */ Object.create(null), u(e.extensions, e.types);
  function s(i) {
    if (!i || typeof i != "string")
      return !1;
    var d = r.exec(i), v = d && t[d[1].toLowerCase()];
    return v && v.charset ? v.charset : d && a.test(d[1]) ? "UTF-8" : !1;
  }
  function o(i) {
    if (!i || typeof i != "string")
      return !1;
    var d = i.indexOf("/") === -1 ? e.lookup(i) : i;
    if (!d)
      return !1;
    if (d.indexOf("charset") === -1) {
      var v = e.charset(d);
      v && (d += "; charset=" + v.toLowerCase());
    }
    return d;
  }
  function c(i) {
    if (!i || typeof i != "string")
      return !1;
    var d = r.exec(i), v = d && e.extensions[d[1].toLowerCase()];
    return !v || !v.length ? !1 : v[0];
  }
  function l(i) {
    if (!i || typeof i != "string")
      return !1;
    var d = n("x." + i).toLowerCase().substr(1);
    return d && e.types[d] || !1;
  }
  function u(i, d) {
    var v = ["nginx", "apache", void 0, "iana"];
    Object.keys(t).forEach(function(y) {
      var g = t[y], h = g.extensions;
      if (!(!h || !h.length)) {
        i[y] = h;
        for (var m = 0; m < h.length; m++) {
          var _ = h[m];
          if (d[_]) {
            var P = v.indexOf(t[d[_]].source), O = v.indexOf(g.source);
            if (d[_] !== "application/octet-stream" && (P > O || P === O && d[_].substr(0, 12) === "application/"))
              continue;
          }
          d[_] = y;
        }
      }
    });
  }
})(_m);
var DP = LP;
function LP(e) {
  var t = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
  t ? t(e) : setTimeout(e, 0);
}
var lp = DP, wm = FP;
function FP(e) {
  var t = !1;
  return lp(function() {
    t = !0;
  }), function(r, a) {
    t ? e(r, a) : lp(function() {
      e(r, a);
    });
  };
}
var Em = MP;
function MP(e) {
  Object.keys(e.jobs).forEach(UP.bind(e)), e.jobs = {};
}
function UP(e) {
  typeof this.jobs[e] == "function" && this.jobs[e]();
}
var up = wm, zP = Em, Sm = qP;
function qP(e, t, n, r) {
  var a = n.keyedList ? n.keyedList[n.index] : n.index;
  n.jobs[a] = VP(t, a, e[a], function(s, o) {
    a in n.jobs && (delete n.jobs[a], s ? zP(n) : n.results[a] = o, r(s, n.results));
  });
}
function VP(e, t, n, r) {
  var a;
  return e.length == 2 ? a = e(n, up(r)) : a = e(n, t, up(r)), a;
}
var Pm = BP;
function BP(e, t) {
  var n = !Array.isArray(e), r = {
    index: 0,
    keyedList: n || t ? Object.keys(e) : null,
    jobs: {},
    results: n ? {} : [],
    size: n ? Object.keys(e).length : e.length
  };
  return t && r.keyedList.sort(n ? t : function(a, s) {
    return t(e[a], e[s]);
  }), r;
}
var GP = Em, KP = wm, Rm = HP;
function HP(e) {
  Object.keys(this.jobs).length && (this.index = this.size, GP(this), KP(e)(null, this.results));
}
var WP = Sm, JP = Pm, XP = Rm, YP = QP;
function QP(e, t, n) {
  for (var r = JP(e); r.index < (r.keyedList || e).length; )
    WP(e, t, r, function(a, s) {
      if (a) {
        n(a, s);
        return;
      }
      if (Object.keys(r.jobs).length === 0) {
        n(null, r.results);
        return;
      }
    }), r.index++;
  return XP.bind(r, n);
}
var Ss = { exports: {} }, pp = Sm, ZP = Pm, eR = Rm;
Ss.exports = tR;
Ss.exports.ascending = Om;
Ss.exports.descending = nR;
function tR(e, t, n, r) {
  var a = ZP(e, n);
  return pp(e, t, a, function s(o, c) {
    if (o) {
      r(o, c);
      return;
    }
    if (a.index++, a.index < (a.keyedList || e).length) {
      pp(e, t, a, s);
      return;
    }
    r(null, a.results);
  }), eR.bind(a, r);
}
function Om(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function nR(e, t) {
  return -1 * Om(e, t);
}
var km = Ss.exports, rR = km, aR = sR;
function sR(e, t, n) {
  return rR(e, t, null, n);
}
var oR = {
  parallel: YP,
  serial: aR,
  serialOrdered: km
}, Tm = Object, iR = Error, cR = EvalError, lR = RangeError, uR = ReferenceError, pR = SyntaxError, yl = TypeError, dR = URIError, fR = Math.abs, mR = Math.floor, hR = Math.max, vR = Math.min, yR = Math.pow, gR = Math.round, bR = Number.isNaN || function(t) {
  return t !== t;
}, $R = bR, xR = function(t) {
  return $R(t) || t === 0 ? t : t < 0 ? -1 : 1;
}, _R = Object.getOwnPropertyDescriptor, Ca = _R;
if (Ca)
  try {
    Ca([], "length");
  } catch {
    Ca = null;
  }
var jm = Ca, Ia = Object.defineProperty || !1;
if (Ia)
  try {
    Ia({}, "a", { value: 1 });
  } catch {
    Ia = !1;
  }
var wR = Ia, to, dp;
function Nm() {
  return dp || (dp = 1, to = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var t = {}, n = Symbol("test"), r = Object(n);
    if (typeof n == "string" || Object.prototype.toString.call(n) !== "[object Symbol]" || Object.prototype.toString.call(r) !== "[object Symbol]")
      return !1;
    var a = 42;
    t[n] = a;
    for (var s in t)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(t);
    if (o.length !== 1 || o[0] !== n || !Object.prototype.propertyIsEnumerable.call(t, n))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var c = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(t, n)
      );
      if (c.value !== a || c.enumerable !== !0)
        return !1;
    }
    return !0;
  }), to;
}
var no, fp;
function ER() {
  if (fp) return no;
  fp = 1;
  var e = typeof Symbol < "u" && Symbol, t = Nm();
  return no = function() {
    return typeof e != "function" || typeof Symbol != "function" || typeof e("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : t();
  }, no;
}
var ro, mp;
function Am() {
  return mp || (mp = 1, ro = typeof Reflect < "u" && Reflect.getPrototypeOf || null), ro;
}
var ao, hp;
function Cm() {
  if (hp) return ao;
  hp = 1;
  var e = Tm;
  return ao = e.getPrototypeOf || null, ao;
}
var so, vp;
function SR() {
  if (vp) return so;
  vp = 1;
  var e = "Function.prototype.bind called on incompatible ", t = Object.prototype.toString, n = Math.max, r = "[object Function]", a = function(l, u) {
    for (var i = [], d = 0; d < l.length; d += 1)
      i[d] = l[d];
    for (var v = 0; v < u.length; v += 1)
      i[v + l.length] = u[v];
    return i;
  }, s = function(l, u) {
    for (var i = [], d = u, v = 0; d < l.length; d += 1, v += 1)
      i[v] = l[d];
    return i;
  }, o = function(c, l) {
    for (var u = "", i = 0; i < c.length; i += 1)
      u += c[i], i + 1 < c.length && (u += l);
    return u;
  };
  return so = function(l) {
    var u = this;
    if (typeof u != "function" || t.apply(u) !== r)
      throw new TypeError(e + u);
    for (var i = s(arguments, 1), d, v = function() {
      if (this instanceof d) {
        var m = u.apply(
          this,
          a(i, arguments)
        );
        return Object(m) === m ? m : this;
      }
      return u.apply(
        l,
        a(i, arguments)
      );
    }, $ = n(0, u.length - i.length), y = [], g = 0; g < $; g++)
      y[g] = "$" + g;
    if (d = Function("binder", "return function (" + o(y, ",") + "){ return binder.apply(this,arguments); }")(v), u.prototype) {
      var h = function() {
      };
      h.prototype = u.prototype, d.prototype = new h(), h.prototype = null;
    }
    return d;
  }, so;
}
var oo, yp;
function Ps() {
  if (yp) return oo;
  yp = 1;
  var e = SR();
  return oo = Function.prototype.bind || e, oo;
}
var io, gp;
function gl() {
  return gp || (gp = 1, io = Function.prototype.call), io;
}
var co, bp;
function Im() {
  return bp || (bp = 1, co = Function.prototype.apply), co;
}
var lo, $p;
function PR() {
  return $p || ($p = 1, lo = typeof Reflect < "u" && Reflect && Reflect.apply), lo;
}
var uo, xp;
function RR() {
  if (xp) return uo;
  xp = 1;
  var e = Ps(), t = Im(), n = gl(), r = PR();
  return uo = r || e.call(n, t), uo;
}
var po, _p;
function OR() {
  if (_p) return po;
  _p = 1;
  var e = Ps(), t = yl, n = gl(), r = RR();
  return po = function(s) {
    if (s.length < 1 || typeof s[0] != "function")
      throw new t("a function is required");
    return r(e, n, s);
  }, po;
}
var fo, wp;
function kR() {
  if (wp) return fo;
  wp = 1;
  var e = OR(), t = jm, n;
  try {
    n = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (o) {
    if (!o || typeof o != "object" || !("code" in o) || o.code !== "ERR_PROTO_ACCESS")
      throw o;
  }
  var r = !!n && t && t(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), a = Object, s = a.getPrototypeOf;
  return fo = r && typeof r.get == "function" ? e([r.get]) : typeof s == "function" ? (
    /** @type {import('./get')} */
    function(c) {
      return s(c == null ? c : a(c));
    }
  ) : !1, fo;
}
var mo, Ep;
function TR() {
  if (Ep) return mo;
  Ep = 1;
  var e = Am(), t = Cm(), n = kR();
  return mo = e ? function(a) {
    return e(a);
  } : t ? function(a) {
    if (!a || typeof a != "object" && typeof a != "function")
      throw new TypeError("getProto: not an object");
    return t(a);
  } : n ? function(a) {
    return n(a);
  } : null, mo;
}
var ho, Sp;
function Dm() {
  if (Sp) return ho;
  Sp = 1;
  var e = Function.prototype.call, t = Object.prototype.hasOwnProperty, n = Ps();
  return ho = n.call(e, t), ho;
}
var oe, jR = Tm, NR = iR, AR = cR, CR = lR, IR = uR, Zn = pR, Kn = yl, DR = dR, LR = fR, FR = mR, MR = hR, UR = vR, zR = yR, qR = gR, VR = xR, Lm = Function, vo = function(e) {
  try {
    return Lm('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, Cr = jm, BR = wR, yo = function() {
  throw new Kn();
}, GR = Cr ? function() {
  try {
    return arguments.callee, yo;
  } catch {
    try {
      return Cr(arguments, "callee").get;
    } catch {
      return yo;
    }
  }
}() : yo, In = ER()(), Te = TR(), KR = Cm(), HR = Am(), Fm = Im(), Xr = gl(), Fn = {}, WR = typeof Uint8Array > "u" || !Te ? oe : Te(Uint8Array), xn = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? oe : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? oe : ArrayBuffer,
  "%ArrayIteratorPrototype%": In && Te ? Te([][Symbol.iterator]()) : oe,
  "%AsyncFromSyncIteratorPrototype%": oe,
  "%AsyncFunction%": Fn,
  "%AsyncGenerator%": Fn,
  "%AsyncGeneratorFunction%": Fn,
  "%AsyncIteratorPrototype%": Fn,
  "%Atomics%": typeof Atomics > "u" ? oe : Atomics,
  "%BigInt%": typeof BigInt > "u" ? oe : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? oe : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? oe : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? oe : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": NR,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": AR,
  "%Float16Array%": typeof Float16Array > "u" ? oe : Float16Array,
  "%Float32Array%": typeof Float32Array > "u" ? oe : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? oe : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? oe : FinalizationRegistry,
  "%Function%": Lm,
  "%GeneratorFunction%": Fn,
  "%Int8Array%": typeof Int8Array > "u" ? oe : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? oe : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? oe : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": In && Te ? Te(Te([][Symbol.iterator]())) : oe,
  "%JSON%": typeof JSON == "object" ? JSON : oe,
  "%Map%": typeof Map > "u" ? oe : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !In || !Te ? oe : Te((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": jR,
  "%Object.getOwnPropertyDescriptor%": Cr,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? oe : Promise,
  "%Proxy%": typeof Proxy > "u" ? oe : Proxy,
  "%RangeError%": CR,
  "%ReferenceError%": IR,
  "%Reflect%": typeof Reflect > "u" ? oe : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? oe : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !In || !Te ? oe : Te((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? oe : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": In && Te ? Te(""[Symbol.iterator]()) : oe,
  "%Symbol%": In ? Symbol : oe,
  "%SyntaxError%": Zn,
  "%ThrowTypeError%": GR,
  "%TypedArray%": WR,
  "%TypeError%": Kn,
  "%Uint8Array%": typeof Uint8Array > "u" ? oe : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? oe : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? oe : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? oe : Uint32Array,
  "%URIError%": DR,
  "%WeakMap%": typeof WeakMap > "u" ? oe : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? oe : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? oe : WeakSet,
  "%Function.prototype.call%": Xr,
  "%Function.prototype.apply%": Fm,
  "%Object.defineProperty%": BR,
  "%Object.getPrototypeOf%": KR,
  "%Math.abs%": LR,
  "%Math.floor%": FR,
  "%Math.max%": MR,
  "%Math.min%": UR,
  "%Math.pow%": zR,
  "%Math.round%": qR,
  "%Math.sign%": VR,
  "%Reflect.getPrototypeOf%": HR
};
if (Te)
  try {
    null.error;
  } catch (e) {
    var JR = Te(Te(e));
    xn["%Error.prototype%"] = JR;
  }
var XR = function e(t) {
  var n;
  if (t === "%AsyncFunction%")
    n = vo("async function () {}");
  else if (t === "%GeneratorFunction%")
    n = vo("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    n = vo("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var r = e("%AsyncGeneratorFunction%");
    r && (n = r.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var a = e("%AsyncGenerator%");
    a && Te && (n = Te(a.prototype));
  }
  return xn[t] = n, n;
}, Pp = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, Yr = Ps(), Ya = Dm(), YR = Yr.call(Xr, Array.prototype.concat), QR = Yr.call(Fm, Array.prototype.splice), Rp = Yr.call(Xr, String.prototype.replace), Qa = Yr.call(Xr, String.prototype.slice), ZR = Yr.call(Xr, RegExp.prototype.exec), eO = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, tO = /\\(\\)?/g, nO = function(t) {
  var n = Qa(t, 0, 1), r = Qa(t, -1);
  if (n === "%" && r !== "%")
    throw new Zn("invalid intrinsic syntax, expected closing `%`");
  if (r === "%" && n !== "%")
    throw new Zn("invalid intrinsic syntax, expected opening `%`");
  var a = [];
  return Rp(t, eO, function(s, o, c, l) {
    a[a.length] = c ? Rp(l, tO, "$1") : o || s;
  }), a;
}, rO = function(t, n) {
  var r = t, a;
  if (Ya(Pp, r) && (a = Pp[r], r = "%" + a[0] + "%"), Ya(xn, r)) {
    var s = xn[r];
    if (s === Fn && (s = XR(r)), typeof s > "u" && !n)
      throw new Kn("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: a,
      name: r,
      value: s
    };
  }
  throw new Zn("intrinsic " + t + " does not exist!");
}, aO = function(t, n) {
  if (typeof t != "string" || t.length === 0)
    throw new Kn("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof n != "boolean")
    throw new Kn('"allowMissing" argument must be a boolean');
  if (ZR(/^%?[^%]*%?$/, t) === null)
    throw new Zn("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var r = nO(t), a = r.length > 0 ? r[0] : "", s = rO("%" + a + "%", n), o = s.name, c = s.value, l = !1, u = s.alias;
  u && (a = u[0], QR(r, YR([0, 1], u)));
  for (var i = 1, d = !0; i < r.length; i += 1) {
    var v = r[i], $ = Qa(v, 0, 1), y = Qa(v, -1);
    if (($ === '"' || $ === "'" || $ === "`" || y === '"' || y === "'" || y === "`") && $ !== y)
      throw new Zn("property names with quotes must have matching quotes");
    if ((v === "constructor" || !d) && (l = !0), a += "." + v, o = "%" + a + "%", Ya(xn, o))
      c = xn[o];
    else if (c != null) {
      if (!(v in c)) {
        if (!n)
          throw new Kn("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (Cr && i + 1 >= r.length) {
        var g = Cr(c, v);
        d = !!g, d && "get" in g && !("originalValue" in g.get) ? c = g.get : c = c[v];
      } else
        d = Ya(c, v), c = c[v];
      d && !l && (xn[o] = c);
    }
  }
  return c;
}, go, Op;
function sO() {
  if (Op) return go;
  Op = 1;
  var e = Nm();
  return go = function() {
    return e() && !!Symbol.toStringTag;
  }, go;
}
var oO = aO, kp = oO("%Object.defineProperty%", !0), iO = sO()(), cO = Dm(), lO = yl, $a = iO ? Symbol.toStringTag : null, uO = function(t, n) {
  var r = arguments.length > 2 && !!arguments[2] && arguments[2].force, a = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
  if (typeof r < "u" && typeof r != "boolean" || typeof a < "u" && typeof a != "boolean")
    throw new lO("if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans");
  $a && (r || !cO(t, $a)) && (kp ? kp(t, $a, {
    configurable: !a,
    enumerable: !1,
    value: n,
    writable: !1
  }) : t[$a] = n);
}, pO = function(e, t) {
  return Object.keys(t).forEach(function(n) {
    e[n] = e[n] || t[n];
  }), e;
}, bl = AP, dO = Wt, bo = pt, fO = mi, mO = hi, hO = ss.parse, vO = zr, yO = qr.Stream, $o = _m, gO = oR, bO = uO, ei = pO, $O = ie;
dO.inherits(ie, bl);
function ie(e) {
  if (!(this instanceof ie))
    return new ie(e);
  this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], bl.call(this), e = e || {};
  for (var t in e)
    this[t] = e[t];
}
ie.LINE_BREAK = `\r
`;
ie.DEFAULT_CONTENT_TYPE = "application/octet-stream";
ie.prototype.append = function(e, t, n) {
  n = n || {}, typeof n == "string" && (n = { filename: n });
  var r = bl.prototype.append.bind(this);
  if (typeof t == "number" && (t = "" + t), Array.isArray(t)) {
    this._error(new Error("Arrays are not supported."));
    return;
  }
  var a = this._multiPartHeader(e, t, n), s = this._multiPartFooter();
  r(a), r(t), r(s), this._trackLength(a, t, n);
};
ie.prototype._trackLength = function(e, t, n) {
  var r = 0;
  n.knownLength != null ? r += +n.knownLength : Buffer.isBuffer(t) ? r = t.length : typeof t == "string" && (r = Buffer.byteLength(t)), this._valueLength += r, this._overheadLength += Buffer.byteLength(e) + ie.LINE_BREAK.length, !(!t || !t.path && !(t.readable && Object.prototype.hasOwnProperty.call(t, "httpVersion")) && !(t instanceof yO)) && (n.knownLength || this._valuesToMeasure.push(t));
};
ie.prototype._lengthRetriever = function(e, t) {
  Object.prototype.hasOwnProperty.call(e, "fd") ? e.end != null && e.end != 1 / 0 && e.start != null ? t(null, e.end + 1 - (e.start ? e.start : 0)) : vO.stat(e.path, function(n, r) {
    var a;
    if (n) {
      t(n);
      return;
    }
    a = r.size - (e.start ? e.start : 0), t(null, a);
  }) : Object.prototype.hasOwnProperty.call(e, "httpVersion") ? t(null, +e.headers["content-length"]) : Object.prototype.hasOwnProperty.call(e, "httpModule") ? (e.on("response", function(n) {
    e.pause(), t(null, +n.headers["content-length"]);
  }), e.resume()) : t("Unknown stream");
};
ie.prototype._multiPartHeader = function(e, t, n) {
  if (typeof n.header == "string")
    return n.header;
  var r = this._getContentDisposition(t, n), a = this._getContentType(t, n), s = "", o = {
    // add custom disposition as third element or keep it two elements if not
    "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(r || []),
    // if no content type. allow it to be empty array
    "Content-Type": [].concat(a || [])
  };
  typeof n.header == "object" && ei(o, n.header);
  var c;
  for (var l in o)
    if (Object.prototype.hasOwnProperty.call(o, l)) {
      if (c = o[l], c == null)
        continue;
      Array.isArray(c) || (c = [c]), c.length && (s += l + ": " + c.join("; ") + ie.LINE_BREAK);
    }
  return "--" + this.getBoundary() + ie.LINE_BREAK + s + ie.LINE_BREAK;
};
ie.prototype._getContentDisposition = function(e, t) {
  var n, r;
  return typeof t.filepath == "string" ? n = bo.normalize(t.filepath).replace(/\\/g, "/") : t.filename || e.name || e.path ? n = bo.basename(t.filename || e.name || e.path) : e.readable && Object.prototype.hasOwnProperty.call(e, "httpVersion") && (n = bo.basename(e.client._httpMessage.path || "")), n && (r = 'filename="' + n + '"'), r;
};
ie.prototype._getContentType = function(e, t) {
  var n = t.contentType;
  return !n && e.name && (n = $o.lookup(e.name)), !n && e.path && (n = $o.lookup(e.path)), !n && e.readable && Object.prototype.hasOwnProperty.call(e, "httpVersion") && (n = e.headers["content-type"]), !n && (t.filepath || t.filename) && (n = $o.lookup(t.filepath || t.filename)), !n && typeof e == "object" && (n = ie.DEFAULT_CONTENT_TYPE), n;
};
ie.prototype._multiPartFooter = function() {
  return (function(e) {
    var t = ie.LINE_BREAK, n = this._streams.length === 0;
    n && (t += this._lastBoundary()), e(t);
  }).bind(this);
};
ie.prototype._lastBoundary = function() {
  return "--" + this.getBoundary() + "--" + ie.LINE_BREAK;
};
ie.prototype.getHeaders = function(e) {
  var t, n = {
    "content-type": "multipart/form-data; boundary=" + this.getBoundary()
  };
  for (t in e)
    Object.prototype.hasOwnProperty.call(e, t) && (n[t.toLowerCase()] = e[t]);
  return n;
};
ie.prototype.setBoundary = function(e) {
  this._boundary = e;
};
ie.prototype.getBoundary = function() {
  return this._boundary || this._generateBoundary(), this._boundary;
};
ie.prototype.getBuffer = function() {
  for (var e = new Buffer.alloc(0), t = this.getBoundary(), n = 0, r = this._streams.length; n < r; n++)
    typeof this._streams[n] != "function" && (Buffer.isBuffer(this._streams[n]) ? e = Buffer.concat([e, this._streams[n]]) : e = Buffer.concat([e, Buffer.from(this._streams[n])]), (typeof this._streams[n] != "string" || this._streams[n].substring(2, t.length + 2) !== t) && (e = Buffer.concat([e, Buffer.from(ie.LINE_BREAK)])));
  return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
};
ie.prototype._generateBoundary = function() {
  for (var e = "--------------------------", t = 0; t < 24; t++)
    e += Math.floor(Math.random() * 10).toString(16);
  this._boundary = e;
};
ie.prototype.getLengthSync = function() {
  var e = this._overheadLength + this._valueLength;
  return this._streams.length && (e += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), e;
};
ie.prototype.hasKnownLength = function() {
  var e = !0;
  return this._valuesToMeasure.length && (e = !1), e;
};
ie.prototype.getLength = function(e) {
  var t = this._overheadLength + this._valueLength;
  if (this._streams.length && (t += this._lastBoundary().length), !this._valuesToMeasure.length) {
    process.nextTick(e.bind(this, null, t));
    return;
  }
  gO.parallel(this._valuesToMeasure, this._lengthRetriever, function(n, r) {
    if (n) {
      e(n);
      return;
    }
    r.forEach(function(a) {
      t += a;
    }), e(null, t);
  });
};
ie.prototype.submit = function(e, t) {
  var n, r, a = { method: "post" };
  return typeof e == "string" ? (e = hO(e), r = ei({
    port: e.port,
    path: e.pathname,
    host: e.hostname,
    protocol: e.protocol
  }, a)) : (r = ei(e, a), r.port || (r.port = r.protocol == "https:" ? 443 : 80)), r.headers = this.getHeaders(e.headers), r.protocol == "https:" ? n = mO.request(r) : n = fO.request(r), this.getLength((function(s, o) {
    if (s && s !== "Unknown stream") {
      this._error(s);
      return;
    }
    if (o && n.setHeader("Content-Length", o), this.pipe(n), t) {
      var c, l = function(u, i) {
        return n.removeListener("error", l), n.removeListener("response", c), t.call(this, u, i);
      };
      c = l.bind(this, null), n.on("error", l), n.on("response", c);
    }
  }).bind(this)), n;
};
ie.prototype._error = function(e) {
  this.error || (this.error = e, this.pause(), this.emit("error", e));
};
ie.prototype.toString = function() {
  return "[object FormData]";
};
bO(ie, "FormData");
var Mm = {}, xO = ss.parse, _O = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}, wO = String.prototype.endsWith || function(e) {
  return e.length <= this.length && this.indexOf(e, this.length - e.length) !== -1;
};
function EO(e) {
  var t = typeof e == "string" ? xO(e) : e || {}, n = t.protocol, r = t.host, a = t.port;
  if (typeof r != "string" || !r || typeof n != "string" || (n = n.split(":", 1)[0], r = r.replace(/:\d*$/, ""), a = parseInt(a) || _O[n] || 0, !SO(r, a)))
    return "";
  var s = Un("npm_config_" + n + "_proxy") || Un(n + "_proxy") || Un("npm_config_proxy") || Un("all_proxy");
  return s && s.indexOf("://") === -1 && (s = n + "://" + s), s;
}
function SO(e, t) {
  var n = (Un("npm_config_no_proxy") || Un("no_proxy")).toLowerCase();
  return n ? n === "*" ? !1 : n.split(/[,\s]/).every(function(r) {
    if (!r)
      return !0;
    var a = r.match(/^(.+):(\d+)$/), s = a ? a[1] : r, o = a ? parseInt(a[2]) : 0;
    return o && o !== t ? !0 : /^[.*]/.test(s) ? (s.charAt(0) === "*" && (s = s.slice(1)), !wO.call(e, s)) : e !== s;
  }) : !0;
}
function Un(e) {
  return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || "";
}
Mm.getProxyForUrl = EO;
var $l = { exports: {} }, xa = { exports: {} }, _a = { exports: {} }, xo, Tp;
function PO() {
  if (Tp) return xo;
  Tp = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, a = r * 7, s = r * 365.25;
  xo = function(i, d) {
    d = d || {};
    var v = typeof i;
    if (v === "string" && i.length > 0)
      return o(i);
    if (v === "number" && isFinite(i))
      return d.long ? l(i) : c(i);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(i)
    );
  };
  function o(i) {
    if (i = String(i), !(i.length > 100)) {
      var d = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        i
      );
      if (d) {
        var v = parseFloat(d[1]), $ = (d[2] || "ms").toLowerCase();
        switch ($) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return v * s;
          case "weeks":
          case "week":
          case "w":
            return v * a;
          case "days":
          case "day":
          case "d":
            return v * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return v * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return v * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return v * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return v;
          default:
            return;
        }
      }
    }
  }
  function c(i) {
    var d = Math.abs(i);
    return d >= r ? Math.round(i / r) + "d" : d >= n ? Math.round(i / n) + "h" : d >= t ? Math.round(i / t) + "m" : d >= e ? Math.round(i / e) + "s" : i + "ms";
  }
  function l(i) {
    var d = Math.abs(i);
    return d >= r ? u(i, d, r, "day") : d >= n ? u(i, d, n, "hour") : d >= t ? u(i, d, t, "minute") : d >= e ? u(i, d, e, "second") : i + " ms";
  }
  function u(i, d, v, $) {
    var y = d >= v * 1.5;
    return Math.round(i / v) + " " + $ + (y ? "s" : "");
  }
  return xo;
}
var _o, jp;
function Um() {
  if (jp) return _o;
  jp = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = u, r.disable = c, r.enable = s, r.enabled = l, r.humanize = PO(), r.destroy = i, Object.keys(t).forEach((d) => {
      r[d] = t[d];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(d) {
      let v = 0;
      for (let $ = 0; $ < d.length; $++)
        v = (v << 5) - v + d.charCodeAt($), v |= 0;
      return r.colors[Math.abs(v) % r.colors.length];
    }
    r.selectColor = n;
    function r(d) {
      let v, $ = null, y, g;
      function h(...m) {
        if (!h.enabled)
          return;
        const _ = h, P = Number(/* @__PURE__ */ new Date()), O = P - (v || P);
        _.diff = O, _.prev = v, _.curr = P, v = P, m[0] = r.coerce(m[0]), typeof m[0] != "string" && m.unshift("%O");
        let T = 0;
        m[0] = m[0].replace(/%([a-zA-Z%])/g, (q, ae) => {
          if (q === "%%")
            return "%";
          T++;
          const F = r.formatters[ae];
          if (typeof F == "function") {
            const K = m[T];
            q = F.call(_, K), m.splice(T, 1), T--;
          }
          return q;
        }), r.formatArgs.call(_, m), (_.log || r.log).apply(_, m);
      }
      return h.namespace = d, h.useColors = r.useColors(), h.color = r.selectColor(d), h.extend = a, h.destroy = r.destroy, Object.defineProperty(h, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => $ !== null ? $ : (y !== r.namespaces && (y = r.namespaces, g = r.enabled(d)), g),
        set: (m) => {
          $ = m;
        }
      }), typeof r.init == "function" && r.init(h), h;
    }
    function a(d, v) {
      const $ = r(this.namespace + (typeof v > "u" ? ":" : v) + d);
      return $.log = this.log, $;
    }
    function s(d) {
      r.save(d), r.namespaces = d, r.names = [], r.skips = [];
      const v = (typeof d == "string" ? d : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const $ of v)
        $[0] === "-" ? r.skips.push($.slice(1)) : r.names.push($);
    }
    function o(d, v) {
      let $ = 0, y = 0, g = -1, h = 0;
      for (; $ < d.length; )
        if (y < v.length && (v[y] === d[$] || v[y] === "*"))
          v[y] === "*" ? (g = y, h = $, y++) : ($++, y++);
        else if (g !== -1)
          y = g + 1, h++, $ = h;
        else
          return !1;
      for (; y < v.length && v[y] === "*"; )
        y++;
      return y === v.length;
    }
    function c() {
      const d = [
        ...r.names,
        ...r.skips.map((v) => "-" + v)
      ].join(",");
      return r.enable(""), d;
    }
    function l(d) {
      for (const v of r.skips)
        if (o(d, v))
          return !1;
      for (const v of r.names)
        if (o(d, v))
          return !0;
      return !1;
    }
    function u(d) {
      return d instanceof Error ? d.stack || d.message : d;
    }
    function i() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return _o = e, _o;
}
var Np;
function RO() {
  return Np || (Np = 1, function(e, t) {
    t.formatArgs = r, t.save = a, t.load = s, t.useColors = n, t.storage = o(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function n() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const u = "color: " + this.color;
      l.splice(1, 0, u, "color: inherit");
      let i = 0, d = 0;
      l[0].replace(/%[a-zA-Z%]/g, (v) => {
        v !== "%%" && (i++, v === "%c" && (d = i));
      }), l.splice(d, 0, u);
    }
    t.log = console.debug || console.log || (() => {
    });
    function a(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let l;
      try {
        l = t.storage.getItem("debug");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function o() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Um()(t);
    const { formatters: c } = e.exports;
    c.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (u) {
        return "[UnexpectedJSONParseError]: " + u.message;
      }
    };
  }(_a, _a.exports)), _a.exports;
}
var wa = { exports: {} }, wo, Ap;
function OO() {
  return Ap || (Ap = 1, wo = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), a = t.indexOf("--");
    return r !== -1 && (a === -1 || r < a);
  }), wo;
}
var Eo, Cp;
function kO() {
  if (Cp) return Eo;
  Cp = 1;
  const e = sd, t = od, n = OO(), { env: r } = process;
  let a;
  n("no-color") || n("no-colors") || n("color=false") || n("color=never") ? a = 0 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (a = 1), "FORCE_COLOR" in r && (r.FORCE_COLOR === "true" ? a = 1 : r.FORCE_COLOR === "false" ? a = 0 : a = r.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(r.FORCE_COLOR, 10), 3));
  function s(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function o(l, u) {
    if (a === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (l && !u && a === void 0)
      return 0;
    const i = a || 0;
    if (r.TERM === "dumb")
      return i;
    if (process.platform === "win32") {
      const d = e.release().split(".");
      return Number(d[0]) >= 10 && Number(d[2]) >= 10586 ? Number(d[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((d) => d in r) || r.CI_NAME === "codeship" ? 1 : i;
    if ("TEAMCITY_VERSION" in r)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
    if (r.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in r) {
      const d = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (r.TERM_PROGRAM) {
        case "iTerm.app":
          return d >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : i;
  }
  function c(l) {
    const u = o(l, l && l.isTTY);
    return s(u);
  }
  return Eo = {
    supportsColor: c,
    stdout: s(o(!0, t.isatty(1))),
    stderr: s(o(!0, t.isatty(2)))
  }, Eo;
}
var Ip;
function TO() {
  return Ip || (Ip = 1, function(e, t) {
    const n = od, r = Wt;
    t.init = i, t.log = c, t.formatArgs = s, t.save = l, t.load = u, t.useColors = a, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const v = kO();
      v && (v.stderr || v).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((v) => /^debug_/i.test(v)).reduce((v, $) => {
      const y = $.substring(6).toLowerCase().replace(/_([a-z])/g, (h, m) => m.toUpperCase());
      let g = process.env[$];
      return /^(yes|on|true|enabled)$/i.test(g) ? g = !0 : /^(no|off|false|disabled)$/i.test(g) ? g = !1 : g === "null" ? g = null : g = Number(g), v[y] = g, v;
    }, {});
    function a() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function s(v) {
      const { namespace: $, useColors: y } = this;
      if (y) {
        const g = this.color, h = "\x1B[3" + (g < 8 ? g : "8;5;" + g), m = `  ${h};1m${$} \x1B[0m`;
        v[0] = m + v[0].split(`
`).join(`
` + m), v.push(h + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        v[0] = o() + $ + " " + v[0];
    }
    function o() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function c(...v) {
      return process.stderr.write(r.formatWithOptions(t.inspectOpts, ...v) + `
`);
    }
    function l(v) {
      v ? process.env.DEBUG = v : delete process.env.DEBUG;
    }
    function u() {
      return process.env.DEBUG;
    }
    function i(v) {
      v.inspectOpts = {};
      const $ = Object.keys(t.inspectOpts);
      for (let y = 0; y < $.length; y++)
        v.inspectOpts[$[y]] = t.inspectOpts[$[y]];
    }
    e.exports = Um()(t);
    const { formatters: d } = e.exports;
    d.o = function(v) {
      return this.inspectOpts.colors = this.useColors, r.inspect(v, this.inspectOpts).split(`
`).map(($) => $.trim()).join(" ");
    }, d.O = function(v) {
      return this.inspectOpts.colors = this.useColors, r.inspect(v, this.inspectOpts);
    };
  }(wa, wa.exports)), wa.exports;
}
var Dp;
function jO() {
  return Dp || (Dp = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? xa.exports = RO() : xa.exports = TO()), xa.exports;
}
var vr, NO = function() {
  if (!vr) {
    try {
      vr = jO()("follow-redirects");
    } catch {
    }
    typeof vr != "function" && (vr = function() {
    });
  }
  vr.apply(null, arguments);
}, Qr = ss, Ir = Qr.URL, AO = mi, CO = hi, xl = qr.Writable, _l = rd, zm = NO;
(function() {
  var t = typeof process < "u", n = typeof window < "u" && typeof document < "u", r = Rn(Error.captureStackTrace);
  !t && (n || !r) && console.warn("The follow-redirects package should be excluded from browser builds.");
})();
var wl = !1;
try {
  _l(new Ir(""));
} catch (e) {
  wl = e.code === "ERR_INVALID_URL";
}
var IO = [
  "auth",
  "host",
  "hostname",
  "href",
  "path",
  "pathname",
  "port",
  "protocol",
  "query",
  "search",
  "hash"
], El = ["abort", "aborted", "connect", "error", "socket", "timeout"], Sl = /* @__PURE__ */ Object.create(null);
El.forEach(function(e) {
  Sl[e] = function(t, n, r) {
    this._redirectable.emit(e, t, n, r);
  };
});
var ti = Zr(
  "ERR_INVALID_URL",
  "Invalid URL",
  TypeError
), ni = Zr(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
), DO = Zr(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded",
  ni
), LO = Zr(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
), FO = Zr(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
), MO = xl.prototype.destroy || Vm;
function Je(e, t) {
  xl.call(this), this._sanitizeOptions(e), this._options = e, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], t && this.on("response", t);
  var n = this;
  this._onNativeResponse = function(r) {
    try {
      n._processResponse(r);
    } catch (a) {
      n.emit("error", a instanceof ni ? a : new ni({ cause: a }));
    }
  }, this._performRequest();
}
Je.prototype = Object.create(xl.prototype);
Je.prototype.abort = function() {
  Rl(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
};
Je.prototype.destroy = function(e) {
  return Rl(this._currentRequest, e), MO.call(this, e), this;
};
Je.prototype.write = function(e, t, n) {
  if (this._ending)
    throw new FO();
  if (!_n(e) && !qO(e))
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  if (Rn(t) && (n = t, t = null), e.length === 0) {
    n && n();
    return;
  }
  this._requestBodyLength + e.length <= this._options.maxBodyLength ? (this._requestBodyLength += e.length, this._requestBodyBuffers.push({ data: e, encoding: t }), this._currentRequest.write(e, t, n)) : (this.emit("error", new LO()), this.abort());
};
Je.prototype.end = function(e, t, n) {
  if (Rn(e) ? (n = e, e = t = null) : Rn(t) && (n = t, t = null), !e)
    this._ended = this._ending = !0, this._currentRequest.end(null, null, n);
  else {
    var r = this, a = this._currentRequest;
    this.write(e, t, function() {
      r._ended = !0, a.end(null, null, n);
    }), this._ending = !0;
  }
};
Je.prototype.setHeader = function(e, t) {
  this._options.headers[e] = t, this._currentRequest.setHeader(e, t);
};
Je.prototype.removeHeader = function(e) {
  delete this._options.headers[e], this._currentRequest.removeHeader(e);
};
Je.prototype.setTimeout = function(e, t) {
  var n = this;
  function r(o) {
    o.setTimeout(e), o.removeListener("timeout", o.destroy), o.addListener("timeout", o.destroy);
  }
  function a(o) {
    n._timeout && clearTimeout(n._timeout), n._timeout = setTimeout(function() {
      n.emit("timeout"), s();
    }, e), r(o);
  }
  function s() {
    n._timeout && (clearTimeout(n._timeout), n._timeout = null), n.removeListener("abort", s), n.removeListener("error", s), n.removeListener("response", s), n.removeListener("close", s), t && n.removeListener("timeout", t), n.socket || n._currentRequest.removeListener("socket", a);
  }
  return t && this.on("timeout", t), this.socket ? a(this.socket) : this._currentRequest.once("socket", a), this.on("socket", r), this.on("abort", s), this.on("error", s), this.on("response", s), this.on("close", s), this;
};
[
  "flushHeaders",
  "getHeader",
  "setNoDelay",
  "setSocketKeepAlive"
].forEach(function(e) {
  Je.prototype[e] = function(t, n) {
    return this._currentRequest[e](t, n);
  };
});
["aborted", "connection", "socket"].forEach(function(e) {
  Object.defineProperty(Je.prototype, e, {
    get: function() {
      return this._currentRequest[e];
    }
  });
});
Je.prototype._sanitizeOptions = function(e) {
  if (e.headers || (e.headers = {}), e.host && (e.hostname || (e.hostname = e.host), delete e.host), !e.pathname && e.path) {
    var t = e.path.indexOf("?");
    t < 0 ? e.pathname = e.path : (e.pathname = e.path.substring(0, t), e.search = e.path.substring(t));
  }
};
Je.prototype._performRequest = function() {
  var e = this._options.protocol, t = this._options.nativeProtocols[e];
  if (!t)
    throw new TypeError("Unsupported protocol " + e);
  if (this._options.agents) {
    var n = e.slice(0, -1);
    this._options.agent = this._options.agents[n];
  }
  var r = this._currentRequest = t.request(this._options, this._onNativeResponse);
  r._redirectable = this;
  for (var a of El)
    r.on(a, Sl[a]);
  if (this._currentUrl = /^\//.test(this._options.path) ? Qr.format(this._options) : (
    // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path
  ), this._isRedirect) {
    var s = 0, o = this, c = this._requestBodyBuffers;
    (function l(u) {
      if (r === o._currentRequest)
        if (u)
          o.emit("error", u);
        else if (s < c.length) {
          var i = c[s++];
          r.finished || r.write(i.data, i.encoding, l);
        } else o._ended && r.end();
    })();
  }
};
Je.prototype._processResponse = function(e) {
  var t = e.statusCode;
  this._options.trackRedirects && this._redirects.push({
    url: this._currentUrl,
    headers: e.headers,
    statusCode: t
  });
  var n = e.headers.location;
  if (!n || this._options.followRedirects === !1 || t < 300 || t >= 400) {
    e.responseUrl = this._currentUrl, e.redirects = this._redirects, this.emit("response", e), this._requestBodyBuffers = [];
    return;
  }
  if (Rl(this._currentRequest), e.destroy(), ++this._redirectCount > this._options.maxRedirects)
    throw new DO();
  var r, a = this._options.beforeRedirect;
  a && (r = Object.assign({
    // The Host header was set by nativeProtocol.request
    Host: e.req.getHeader("host")
  }, this._options.headers));
  var s = this._options.method;
  ((t === 301 || t === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
  // the server is redirecting the user agent to a different resource […]
  // A user agent can perform a retrieval request targeting that URI
  // (a GET or HEAD request if using HTTP) […]
  t === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], So(/^content-/i, this._options.headers));
  var o = So(/^host$/i, this._options.headers), c = Pl(this._currentUrl), l = o || c.host, u = /^\w+:/.test(n) ? this._currentUrl : Qr.format(Object.assign(c, { host: l })), i = UO(n, u);
  if (zm("redirecting to", i.href), this._isRedirect = !0, ri(i, this._options), (i.protocol !== c.protocol && i.protocol !== "https:" || i.host !== l && !zO(i.host, l)) && So(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers), Rn(a)) {
    var d = {
      headers: e.headers,
      statusCode: t
    }, v = {
      url: u,
      method: s,
      headers: r
    };
    a(this._options, d, v), this._sanitizeOptions(this._options);
  }
  this._performRequest();
};
function qm(e) {
  var t = {
    maxRedirects: 21,
    maxBodyLength: 10485760
  }, n = {};
  return Object.keys(e).forEach(function(r) {
    var a = r + ":", s = n[a] = e[r], o = t[r] = Object.create(s);
    function c(u, i, d) {
      return VO(u) ? u = ri(u) : _n(u) ? u = ri(Pl(u)) : (d = i, i = Bm(u), u = { protocol: a }), Rn(i) && (d = i, i = null), i = Object.assign({
        maxRedirects: t.maxRedirects,
        maxBodyLength: t.maxBodyLength
      }, u, i), i.nativeProtocols = n, !_n(i.host) && !_n(i.hostname) && (i.hostname = "::1"), _l.equal(i.protocol, a, "protocol mismatch"), zm("options", i), new Je(i, d);
    }
    function l(u, i, d) {
      var v = o.request(u, i, d);
      return v.end(), v;
    }
    Object.defineProperties(o, {
      request: { value: c, configurable: !0, enumerable: !0, writable: !0 },
      get: { value: l, configurable: !0, enumerable: !0, writable: !0 }
    });
  }), t;
}
function Vm() {
}
function Pl(e) {
  var t;
  if (wl)
    t = new Ir(e);
  else if (t = Bm(Qr.parse(e)), !_n(t.protocol))
    throw new ti({ input: e });
  return t;
}
function UO(e, t) {
  return wl ? new Ir(e, t) : Pl(Qr.resolve(t, e));
}
function Bm(e) {
  if (/^\[/.test(e.hostname) && !/^\[[:0-9a-f]+\]$/i.test(e.hostname))
    throw new ti({ input: e.href || e });
  if (/^\[/.test(e.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(e.host))
    throw new ti({ input: e.href || e });
  return e;
}
function ri(e, t) {
  var n = t || {};
  for (var r of IO)
    n[r] = e[r];
  return n.hostname.startsWith("[") && (n.hostname = n.hostname.slice(1, -1)), n.port !== "" && (n.port = Number(n.port)), n.path = n.search ? n.pathname + n.search : n.pathname, n;
}
function So(e, t) {
  var n;
  for (var r in t)
    e.test(r) && (n = t[r], delete t[r]);
  return n === null || typeof n > "u" ? void 0 : String(n).trim();
}
function Zr(e, t, n) {
  function r(a) {
    Rn(Error.captureStackTrace) && Error.captureStackTrace(this, this.constructor), Object.assign(this, a || {}), this.code = e, this.message = this.cause ? t + ": " + this.cause.message : t;
  }
  return r.prototype = new (n || Error)(), Object.defineProperties(r.prototype, {
    constructor: {
      value: r,
      enumerable: !1
    },
    name: {
      value: "Error [" + e + "]",
      enumerable: !1
    }
  }), r;
}
function Rl(e, t) {
  for (var n of El)
    e.removeListener(n, Sl[n]);
  e.on("error", Vm), e.destroy(t);
}
function zO(e, t) {
  _l(_n(e) && _n(t));
  var n = e.length - t.length - 1;
  return n > 0 && e[n] === "." && e.endsWith(t);
}
function _n(e) {
  return typeof e == "string" || e instanceof String;
}
function Rn(e) {
  return typeof e == "function";
}
function qO(e) {
  return typeof e == "object" && "length" in e;
}
function VO(e) {
  return Ir && e instanceof Ir;
}
$l.exports = qm({ http: AO, https: CO });
$l.exports.wrap = qm;
var BO = $l.exports;
/*! Axios v1.8.2 Copyright (c) 2025 Matt Zabriskie and contributors */
const GO = $O, KO = fi, HO = ss, WO = Mm, JO = mi, XO = hi, YO = Wt, QO = BO, ZO = Rh, Gm = qr, ek = ad;
function Pt(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
const Km = /* @__PURE__ */ Pt(GO), tk = /* @__PURE__ */ Pt(KO), nk = /* @__PURE__ */ Pt(HO), rk = /* @__PURE__ */ Pt(WO), ak = /* @__PURE__ */ Pt(JO), sk = /* @__PURE__ */ Pt(XO), Hm = /* @__PURE__ */ Pt(YO), ok = /* @__PURE__ */ Pt(QO), Kt = /* @__PURE__ */ Pt(ZO), Lt = /* @__PURE__ */ Pt(Gm);
function Wm(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: ik } = Object.prototype, { getPrototypeOf: Ol } = Object, Rs = /* @__PURE__ */ ((e) => (t) => {
  const n = ik.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ht = (e) => (e = e.toLowerCase(), (t) => Rs(t) === e), Os = (e) => (t) => typeof t === e, { isArray: cr } = Array, Dr = Os("undefined");
function ck(e) {
  return e !== null && !Dr(e) && e.constructor !== null && !Dr(e.constructor) && Ze(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Jm = ht("ArrayBuffer");
function lk(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Jm(e.buffer), t;
}
const uk = Os("string"), Ze = Os("function"), Xm = Os("number"), ks = (e) => e !== null && typeof e == "object", pk = (e) => e === !0 || e === !1, Da = (e) => {
  if (Rs(e) !== "object")
    return !1;
  const t = Ol(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, dk = ht("Date"), fk = ht("File"), mk = ht("Blob"), hk = ht("FileList"), vk = (e) => ks(e) && Ze(e.pipe), yk = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Ze(e.append) && ((t = Rs(e)) === "formdata" || // detect form-data instance
  t === "object" && Ze(e.toString) && e.toString() === "[object FormData]"));
}, gk = ht("URLSearchParams"), [bk, $k, xk, _k] = ["ReadableStream", "Request", "Response", "Headers"].map(ht), wk = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ea(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, a;
  if (typeof e != "object" && (e = [e]), cr(e))
    for (r = 0, a = e.length; r < a; r++)
      t.call(null, e[r], r, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), o = s.length;
    let c;
    for (r = 0; r < o; r++)
      c = s[r], t.call(null, e[c], c, e);
  }
}
function Ym(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, a;
  for (; r-- > 0; )
    if (a = n[r], t === a.toLowerCase())
      return a;
  return null;
}
const $n = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : gr, Qm = (e) => !Dr(e) && e !== $n;
function ai() {
  const { caseless: e } = Qm(this) && this || {}, t = {}, n = (r, a) => {
    const s = e && Ym(t, a) || a;
    Da(t[s]) && Da(r) ? t[s] = ai(t[s], r) : Da(r) ? t[s] = ai({}, r) : cr(r) ? t[s] = r.slice() : t[s] = r;
  };
  for (let r = 0, a = arguments.length; r < a; r++)
    arguments[r] && ea(arguments[r], n);
  return t;
}
const Ek = (e, t, n, { allOwnKeys: r } = {}) => (ea(t, (a, s) => {
  n && Ze(a) ? e[s] = Wm(a, n) : e[s] = a;
}, { allOwnKeys: r }), e), Sk = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Pk = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Rk = (e, t, n, r) => {
  let a, s, o;
  const c = {};
  if (t = t || {}, e == null) return t;
  do {
    for (a = Object.getOwnPropertyNames(e), s = a.length; s-- > 0; )
      o = a[s], (!r || r(o, e, t)) && !c[o] && (t[o] = e[o], c[o] = !0);
    e = n !== !1 && Ol(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Ok = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, kk = (e) => {
  if (!e) return null;
  if (cr(e)) return e;
  let t = e.length;
  if (!Xm(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Tk = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Ol(Uint8Array)), jk = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let a;
  for (; (a = r.next()) && !a.done; ) {
    const s = a.value;
    t.call(e, s[0], s[1]);
  }
}, Nk = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, Ak = ht("HTMLFormElement"), Ck = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, a) {
    return r.toUpperCase() + a;
  }
), Lp = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Ik = ht("RegExp"), Zm = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  ea(n, (a, s) => {
    let o;
    (o = t(a, s, e)) !== !1 && (r[s] = o || a);
  }), Object.defineProperties(e, r);
}, Dk = (e) => {
  Zm(e, (t, n) => {
    if (Ze(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (Ze(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Lk = (e, t) => {
  const n = {}, r = (a) => {
    a.forEach((s) => {
      n[s] = !0;
    });
  };
  return cr(e) ? r(e) : r(String(e).split(t)), n;
}, Fk = () => {
}, Mk = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Uk(e) {
  return !!(e && Ze(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const zk = (e) => {
  const t = new Array(10), n = (r, a) => {
    if (ks(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[a] = r;
        const s = cr(r) ? [] : {};
        return ea(r, (o, c) => {
          const l = n(o, a + 1);
          !Dr(l) && (s[c] = l);
        }), t[a] = void 0, s;
      }
    }
    return r;
  };
  return n(e, 0);
}, qk = ht("AsyncFunction"), Vk = (e) => e && (ks(e) || Ze(e)) && Ze(e.then) && Ze(e.catch), eh = ((e, t) => e ? setImmediate : t ? ((n, r) => ($n.addEventListener("message", ({ source: a, data: s }) => {
  a === $n && s === n && r.length && r.shift()();
}, !1), (a) => {
  r.push(a), $n.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  Ze($n.postMessage)
), Bk = typeof queueMicrotask < "u" ? queueMicrotask.bind($n) : typeof process < "u" && process.nextTick || eh, k = {
  isArray: cr,
  isArrayBuffer: Jm,
  isBuffer: ck,
  isFormData: yk,
  isArrayBufferView: lk,
  isString: uk,
  isNumber: Xm,
  isBoolean: pk,
  isObject: ks,
  isPlainObject: Da,
  isReadableStream: bk,
  isRequest: $k,
  isResponse: xk,
  isHeaders: _k,
  isUndefined: Dr,
  isDate: dk,
  isFile: fk,
  isBlob: mk,
  isRegExp: Ik,
  isFunction: Ze,
  isStream: vk,
  isURLSearchParams: gk,
  isTypedArray: Tk,
  isFileList: hk,
  forEach: ea,
  merge: ai,
  extend: Ek,
  trim: wk,
  stripBOM: Sk,
  inherits: Pk,
  toFlatObject: Rk,
  kindOf: Rs,
  kindOfTest: ht,
  endsWith: Ok,
  toArray: kk,
  forEachEntry: jk,
  matchAll: Nk,
  isHTMLForm: Ak,
  hasOwnProperty: Lp,
  hasOwnProp: Lp,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Zm,
  freezeMethods: Dk,
  toObjectSet: Lk,
  toCamelCase: Ck,
  noop: Fk,
  toFiniteNumber: Mk,
  findKey: Ym,
  global: $n,
  isContextDefined: Qm,
  isSpecCompliantForm: Uk,
  toJSONObject: zk,
  isAsyncFn: qk,
  isThenable: Vk,
  setImmediate: eh,
  asap: Bk
};
function z(e, t, n, r, a) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), a && (this.response = a, this.status = a.status ? a.status : null);
}
k.inherits(z, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: k.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const th = z.prototype, nh = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  nh[e] = { value: e };
});
Object.defineProperties(z, nh);
Object.defineProperty(th, "isAxiosError", { value: !0 });
z.from = (e, t, n, r, a, s) => {
  const o = Object.create(th);
  return k.toFlatObject(e, o, function(l) {
    return l !== Error.prototype;
  }, (c) => c !== "isAxiosError"), z.call(o, e.message, t, n, r, a), o.cause = e, o.name = e.name, s && Object.assign(o, s), o;
};
function si(e) {
  return k.isPlainObject(e) || k.isArray(e);
}
function rh(e) {
  return k.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Fp(e, t, n) {
  return e ? e.concat(t).map(function(a, s) {
    return a = rh(a), !n && s ? "[" + a + "]" : a;
  }).join(n ? "." : "") : t;
}
function Gk(e) {
  return k.isArray(e) && !e.some(si);
}
const Kk = k.toFlatObject(k, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Ts(e, t, n) {
  if (!k.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (Km.default || FormData)(), n = k.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(g, h) {
    return !k.isUndefined(h[g]);
  });
  const r = n.metaTokens, a = n.visitor || i, s = n.dots, o = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && k.isSpecCompliantForm(t);
  if (!k.isFunction(a))
    throw new TypeError("visitor must be a function");
  function u(y) {
    if (y === null) return "";
    if (k.isDate(y))
      return y.toISOString();
    if (!l && k.isBlob(y))
      throw new z("Blob is not supported. Use a Buffer instead.");
    return k.isArrayBuffer(y) || k.isTypedArray(y) ? l && typeof Blob == "function" ? new Blob([y]) : Buffer.from(y) : y;
  }
  function i(y, g, h) {
    let m = y;
    if (y && !h && typeof y == "object") {
      if (k.endsWith(g, "{}"))
        g = r ? g : g.slice(0, -2), y = JSON.stringify(y);
      else if (k.isArray(y) && Gk(y) || (k.isFileList(y) || k.endsWith(g, "[]")) && (m = k.toArray(y)))
        return g = rh(g), m.forEach(function(P, O) {
          !(k.isUndefined(P) || P === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? Fp([g], O, s) : o === null ? g : g + "[]",
            u(P)
          );
        }), !1;
    }
    return si(y) ? !0 : (t.append(Fp(h, g, s), u(y)), !1);
  }
  const d = [], v = Object.assign(Kk, {
    defaultVisitor: i,
    convertValue: u,
    isVisitable: si
  });
  function $(y, g) {
    if (!k.isUndefined(y)) {
      if (d.indexOf(y) !== -1)
        throw Error("Circular reference detected in " + g.join("."));
      d.push(y), k.forEach(y, function(m, _) {
        (!(k.isUndefined(m) || m === null) && a.call(
          t,
          m,
          k.isString(_) ? _.trim() : _,
          g,
          v
        )) === !0 && $(m, g ? g.concat(_) : [_]);
      }), d.pop();
    }
  }
  if (!k.isObject(e))
    throw new TypeError("data must be an object");
  return $(e), t;
}
function Mp(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function ah(e, t) {
  this._pairs = [], e && Ts(e, this, t);
}
const sh = ah.prototype;
sh.append = function(t, n) {
  this._pairs.push([t, n]);
};
sh.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Mp);
  } : Mp;
  return this._pairs.map(function(a) {
    return n(a[0]) + "=" + n(a[1]);
  }, "").join("&");
};
function Hk(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function kl(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || Hk;
  k.isFunction(n) && (n = {
    serialize: n
  });
  const a = n && n.serialize;
  let s;
  if (a ? s = a(t, n) : s = k.isURLSearchParams(t) ? t.toString() : new ah(t, n).toString(r), s) {
    const o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class Wk {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    k.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const Up = Wk, Tl = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Jk = nk.default.URLSearchParams, Po = "abcdefghijklmnopqrstuvwxyz", zp = "0123456789", oh = {
  DIGIT: zp,
  ALPHA: Po,
  ALPHA_DIGIT: Po + Po.toUpperCase() + zp
}, Xk = (e = 16, t = oh.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t, a = new Uint32Array(e);
  tk.default.randomFillSync(a);
  for (let s = 0; s < e; s++)
    n += t[a[s] % r];
  return n;
}, Yk = {
  isNode: !0,
  classes: {
    URLSearchParams: Jk,
    FormData: Km.default,
    Blob: typeof Blob < "u" && Blob || null
  },
  ALPHABET: oh,
  generateString: Xk,
  protocols: ["http", "https", "file", "data"]
}, jl = typeof window < "u" && typeof document < "u", oi = typeof navigator == "object" && navigator || void 0, Qk = jl && (!oi || ["ReactNative", "NativeScript", "NS"].indexOf(oi.product) < 0), Zk = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", eT = jl && window.location.href || "http://localhost", tT = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  hasBrowserEnv: jl,
  hasStandardBrowserWebWorkerEnv: Zk,
  hasStandardBrowserEnv: Qk,
  navigator: oi,
  origin: eT
}), xe = {
  ...tT,
  ...Yk
};
function nT(e, t) {
  return Ts(e, new xe.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, a, s) {
      return xe.isNode && k.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function rT(e) {
  return k.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function aT(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const a = n.length;
  let s;
  for (r = 0; r < a; r++)
    s = n[r], t[s] = e[s];
  return t;
}
function ih(e) {
  function t(n, r, a, s) {
    let o = n[s++];
    if (o === "__proto__") return !0;
    const c = Number.isFinite(+o), l = s >= n.length;
    return o = !o && k.isArray(a) ? a.length : o, l ? (k.hasOwnProp(a, o) ? a[o] = [a[o], r] : a[o] = r, !c) : ((!a[o] || !k.isObject(a[o])) && (a[o] = []), t(n, r, a[o], s) && k.isArray(a[o]) && (a[o] = aT(a[o])), !c);
  }
  if (k.isFormData(e) && k.isFunction(e.entries)) {
    const n = {};
    return k.forEachEntry(e, (r, a) => {
      t(rT(r), a, n, 0);
    }), n;
  }
  return null;
}
function sT(e, t, n) {
  if (k.isString(e))
    try {
      return (t || JSON.parse)(e), k.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const Nl = {
  transitional: Tl,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", a = r.indexOf("application/json") > -1, s = k.isObject(t);
    if (s && k.isHTMLForm(t) && (t = new FormData(t)), k.isFormData(t))
      return a ? JSON.stringify(ih(t)) : t;
    if (k.isArrayBuffer(t) || k.isBuffer(t) || k.isStream(t) || k.isFile(t) || k.isBlob(t) || k.isReadableStream(t))
      return t;
    if (k.isArrayBufferView(t))
      return t.buffer;
    if (k.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let c;
    if (s) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return nT(t, this.formSerializer).toString();
      if ((c = k.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return Ts(
          c ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return s || a ? (n.setContentType("application/json", !1), sT(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Nl.transitional, r = n && n.forcedJSONParsing, a = this.responseType === "json";
    if (k.isResponse(t) || k.isReadableStream(t))
      return t;
    if (t && k.isString(t) && (r && !this.responseType || a)) {
      const o = !(n && n.silentJSONParsing) && a;
      try {
        return JSON.parse(t);
      } catch (c) {
        if (o)
          throw c.name === "SyntaxError" ? z.from(c, z.ERR_BAD_RESPONSE, this, null, this.response) : c;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: xe.classes.FormData,
    Blob: xe.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
k.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Nl.headers[e] = {};
});
const Al = Nl, oT = k.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), iT = (e) => {
  const t = {};
  let n, r, a;
  return e && e.split(`
`).forEach(function(o) {
    a = o.indexOf(":"), n = o.substring(0, a).trim().toLowerCase(), r = o.substring(a + 1).trim(), !(!n || t[n] && oT[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, qp = Symbol("internals");
function yr(e) {
  return e && String(e).trim().toLowerCase();
}
function La(e) {
  return e === !1 || e == null ? e : k.isArray(e) ? e.map(La) : String(e);
}
function cT(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const lT = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ro(e, t, n, r, a) {
  if (k.isFunction(r))
    return r.call(this, t, n);
  if (a && (t = n), !!k.isString(t)) {
    if (k.isString(r))
      return t.indexOf(r) !== -1;
    if (k.isRegExp(r))
      return r.test(t);
  }
}
function uT(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function pT(e, t) {
  const n = k.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(a, s, o) {
        return this[r].call(this, t, a, s, o);
      },
      configurable: !0
    });
  });
}
class js {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const a = this;
    function s(c, l, u) {
      const i = yr(l);
      if (!i)
        throw new Error("header name must be a non-empty string");
      const d = k.findKey(a, i);
      (!d || a[d] === void 0 || u === !0 || u === void 0 && a[d] !== !1) && (a[d || l] = La(c));
    }
    const o = (c, l) => k.forEach(c, (u, i) => s(u, i, l));
    if (k.isPlainObject(t) || t instanceof this.constructor)
      o(t, n);
    else if (k.isString(t) && (t = t.trim()) && !lT(t))
      o(iT(t), n);
    else if (k.isHeaders(t))
      for (const [c, l] of t.entries())
        s(l, c, r);
    else
      t != null && s(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = yr(t), t) {
      const r = k.findKey(this, t);
      if (r) {
        const a = this[r];
        if (!n)
          return a;
        if (n === !0)
          return cT(a);
        if (k.isFunction(n))
          return n.call(this, a, r);
        if (k.isRegExp(n))
          return n.exec(a);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = yr(t), t) {
      const r = k.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Ro(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let a = !1;
    function s(o) {
      if (o = yr(o), o) {
        const c = k.findKey(r, o);
        c && (!n || Ro(r, r[c], c, n)) && (delete r[c], a = !0);
      }
    }
    return k.isArray(t) ? t.forEach(s) : s(t), a;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, a = !1;
    for (; r--; ) {
      const s = n[r];
      (!t || Ro(this, this[s], s, t, !0)) && (delete this[s], a = !0);
    }
    return a;
  }
  normalize(t) {
    const n = this, r = {};
    return k.forEach(this, (a, s) => {
      const o = k.findKey(r, s);
      if (o) {
        n[o] = La(a), delete n[s];
        return;
      }
      const c = t ? uT(s) : String(s).trim();
      c !== s && delete n[s], n[c] = La(a), r[c] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return k.forEach(this, (r, a) => {
      r != null && r !== !1 && (n[a] = t && k.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((a) => r.set(a)), r;
  }
  static accessor(t) {
    const r = (this[qp] = this[qp] = {
      accessors: {}
    }).accessors, a = this.prototype;
    function s(o) {
      const c = yr(o);
      r[c] || (pT(a, o), r[c] = !0);
    }
    return k.isArray(t) ? t.forEach(s) : s(t), this;
  }
}
js.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
k.reduceDescriptors(js.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
k.freezeMethods(js);
const We = js;
function Oo(e, t) {
  const n = this || Al, r = t || n, a = We.from(r.headers);
  let s = r.data;
  return k.forEach(e, function(c) {
    s = c.call(n, s, a.normalize(), t ? t.status : void 0);
  }), a.normalize(), s;
}
function ch(e) {
  return !!(e && e.__CANCEL__);
}
function Ht(e, t, n) {
  z.call(this, e ?? "canceled", z.ERR_CANCELED, t, n), this.name = "CanceledError";
}
k.inherits(Ht, z, {
  __CANCEL__: !0
});
function zn(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new z(
    "Request failed with status code " + n.status,
    [z.ERR_BAD_REQUEST, z.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function dT(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function fT(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Cl(e, t, n) {
  let r = !dT(t);
  return e && r || n == !1 ? fT(e, t) : t;
}
const Za = "1.8.2";
function lh(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
const mT = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
function hT(e, t, n) {
  const r = n && n.Blob || xe.classes.Blob, a = lh(e);
  if (t === void 0 && r && (t = !0), a === "data") {
    e = a.length ? e.slice(a.length + 1) : e;
    const s = mT.exec(e);
    if (!s)
      throw new z("Invalid URL", z.ERR_INVALID_URL);
    const o = s[1], c = s[2], l = s[3], u = Buffer.from(decodeURIComponent(l), c ? "base64" : "utf8");
    if (t) {
      if (!r)
        throw new z("Blob is not supported", z.ERR_NOT_SUPPORT);
      return new r([u], { type: o });
    }
    return u;
  }
  throw new z("Unsupported protocol " + a, z.ERR_NOT_SUPPORT);
}
const ko = Symbol("internals");
class vT extends Lt.default.Transform {
  constructor(t) {
    t = k.toFlatObject(t, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (r, a) => !k.isUndefined(a[r])), super({
      readableHighWaterMark: t.chunkSize
    });
    const n = this[ko] = {
      timeWindow: t.timeWindow,
      chunkSize: t.chunkSize,
      maxRate: t.maxRate,
      minChunkSize: t.minChunkSize,
      bytesSeen: 0,
      isCaptured: !1,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };
    this.on("newListener", (r) => {
      r === "progress" && (n.isCaptured || (n.isCaptured = !0));
    });
  }
  _read(t) {
    const n = this[ko];
    return n.onReadCallback && n.onReadCallback(), super._read(t);
  }
  _transform(t, n, r) {
    const a = this[ko], s = a.maxRate, o = this.readableHighWaterMark, c = a.timeWindow, l = 1e3 / c, u = s / l, i = a.minChunkSize !== !1 ? Math.max(a.minChunkSize, u * 0.01) : 0, d = ($, y) => {
      const g = Buffer.byteLength($);
      a.bytesSeen += g, a.bytes += g, a.isCaptured && this.emit("progress", a.bytesSeen), this.push($) ? process.nextTick(y) : a.onReadCallback = () => {
        a.onReadCallback = null, process.nextTick(y);
      };
    }, v = ($, y) => {
      const g = Buffer.byteLength($);
      let h = null, m = o, _, P = 0;
      if (s) {
        const O = Date.now();
        (!a.ts || (P = O - a.ts) >= c) && (a.ts = O, _ = u - a.bytes, a.bytes = _ < 0 ? -_ : 0, P = 0), _ = u - a.bytes;
      }
      if (s) {
        if (_ <= 0)
          return setTimeout(() => {
            y(null, $);
          }, c - P);
        _ < m && (m = _);
      }
      m && g > m && g - m > i && (h = $.subarray(m), $ = $.subarray(0, m)), d($, h ? () => {
        process.nextTick(y, null, h);
      } : y);
    };
    v(t, function $(y, g) {
      if (y)
        return r(y);
      g ? v(g, $) : r(null);
    });
  }
}
const Vp = vT, { asyncIterator: Bp } = Symbol, yT = async function* (e) {
  e.stream ? yield* e.stream() : e.arrayBuffer ? yield await e.arrayBuffer() : e[Bp] ? yield* e[Bp]() : yield e;
}, uh = yT, gT = xe.ALPHABET.ALPHA_DIGIT + "-_", Lr = typeof TextEncoder == "function" ? new TextEncoder() : new Hm.default.TextEncoder(), Vt = `\r
`, bT = Lr.encode(Vt), $T = 2;
class xT {
  constructor(t, n) {
    const { escapeName: r } = this.constructor, a = k.isString(n);
    let s = `Content-Disposition: form-data; name="${r(t)}"${!a && n.name ? `; filename="${r(n.name)}"` : ""}${Vt}`;
    a ? n = Lr.encode(String(n).replace(/\r?\n|\r\n?/g, Vt)) : s += `Content-Type: ${n.type || "application/octet-stream"}${Vt}`, this.headers = Lr.encode(s + Vt), this.contentLength = a ? n.byteLength : n.size, this.size = this.headers.byteLength + this.contentLength + $T, this.name = t, this.value = n;
  }
  async *encode() {
    yield this.headers;
    const { value: t } = this;
    k.isTypedArray(t) ? yield t : yield* uh(t), yield bT;
  }
  static escapeName(t) {
    return String(t).replace(/[\r\n"]/g, (n) => ({
      "\r": "%0D",
      "\n": "%0A",
      '"': "%22"
    })[n]);
  }
}
const _T = (e, t, n) => {
  const {
    tag: r = "form-data-boundary",
    size: a = 25,
    boundary: s = r + "-" + xe.generateString(a, gT)
  } = n || {};
  if (!k.isFormData(e))
    throw TypeError("FormData instance required");
  if (s.length < 1 || s.length > 70)
    throw Error("boundary must be 10-70 characters long");
  const o = Lr.encode("--" + s + Vt), c = Lr.encode("--" + s + "--" + Vt + Vt);
  let l = c.byteLength;
  const u = Array.from(e.entries()).map(([d, v]) => {
    const $ = new xT(d, v);
    return l += $.size, $;
  });
  l += o.byteLength * u.length, l = k.toFiniteNumber(l);
  const i = {
    "Content-Type": `multipart/form-data; boundary=${s}`
  };
  return Number.isFinite(l) && (i["Content-Length"] = l), t && t(i), Gm.Readable.from(async function* () {
    for (const d of u)
      yield o, yield* d.encode();
    yield c;
  }());
}, wT = _T;
class ET extends Lt.default.Transform {
  __transform(t, n, r) {
    this.push(t), r();
  }
  _transform(t, n, r) {
    if (t.length !== 0 && (this._transform = this.__transform, t[0] !== 120)) {
      const a = Buffer.alloc(2);
      a[0] = 120, a[1] = 156, this.push(a, n);
    }
    this.__transform(t, n, r);
  }
}
const ST = ET, PT = (e, t) => k.isAsyncFn(e) ? function(...n) {
  const r = n.pop();
  e.apply(this, n).then((a) => {
    try {
      t ? r(null, ...t(a)) : r(null, a);
    } catch (s) {
      r(s);
    }
  }, r);
} : e, RT = PT;
function OT(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let a = 0, s = 0, o;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const u = Date.now(), i = r[s];
    o || (o = u), n[a] = l, r[a] = u;
    let d = s, v = 0;
    for (; d !== a; )
      v += n[d++], d = d % e;
    if (a = (a + 1) % e, a === s && (s = (s + 1) % e), u - o < t)
      return;
    const $ = i && u - i;
    return $ ? Math.round(v * 1e3 / $) : void 0;
  };
}
function kT(e, t) {
  let n = 0, r = 1e3 / t, a, s;
  const o = (u, i = Date.now()) => {
    n = i, a = null, s && (clearTimeout(s), s = null), e.apply(null, u);
  };
  return [(...u) => {
    const i = Date.now(), d = i - n;
    d >= r ? o(u, i) : (a = u, s || (s = setTimeout(() => {
      s = null, o(a);
    }, r - d)));
  }, () => a && o(a)];
}
const er = (e, t, n = 3) => {
  let r = 0;
  const a = OT(50, 250);
  return kT((s) => {
    const o = s.loaded, c = s.lengthComputable ? s.total : void 0, l = o - r, u = a(l), i = o <= c;
    r = o;
    const d = {
      loaded: o,
      total: c,
      progress: c ? o / c : void 0,
      bytes: l,
      rate: u || void 0,
      estimated: u && c && i ? (c - o) / u : void 0,
      event: s,
      lengthComputable: c != null,
      [t ? "download" : "upload"]: !0
    };
    e(d);
  }, n);
}, es = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, ts = (e) => (...t) => k.asap(() => e(...t)), Gp = {
  flush: Kt.default.constants.Z_SYNC_FLUSH,
  finishFlush: Kt.default.constants.Z_SYNC_FLUSH
}, TT = {
  flush: Kt.default.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: Kt.default.constants.BROTLI_OPERATION_FLUSH
}, Kp = k.isFunction(Kt.default.createBrotliDecompress), { http: jT, https: NT } = ok.default, AT = /https:?/, Hp = xe.protocols.map((e) => e + ":"), Wp = (e, [t, n]) => (e.on("end", n).on("error", n), t);
function CT(e, t) {
  e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.config && e.beforeRedirects.config(e, t);
}
function ph(e, t, n) {
  let r = t;
  if (!r && r !== !1) {
    const a = rk.default.getProxyForUrl(n);
    a && (r = new URL(a));
  }
  if (r) {
    if (r.username && (r.auth = (r.username || "") + ":" + (r.password || "")), r.auth) {
      (r.auth.username || r.auth.password) && (r.auth = (r.auth.username || "") + ":" + (r.auth.password || ""));
      const s = Buffer.from(r.auth, "utf8").toString("base64");
      e.headers["Proxy-Authorization"] = "Basic " + s;
    }
    e.headers.host = e.hostname + (e.port ? ":" + e.port : "");
    const a = r.hostname || r.host;
    e.hostname = a, e.host = a, e.port = r.port, e.path = n, r.protocol && (e.protocol = r.protocol.includes(":") ? r.protocol : `${r.protocol}:`);
  }
  e.beforeRedirects.proxy = function(s) {
    ph(s, t, s.href);
  };
}
const IT = typeof process < "u" && k.kindOf(process) === "process", DT = (e) => new Promise((t, n) => {
  let r, a;
  const s = (l, u) => {
    a || (a = !0, r && r(l, u));
  }, o = (l) => {
    s(l), t(l);
  }, c = (l) => {
    s(l, !0), n(l);
  };
  e(o, c, (l) => r = l).catch(c);
}), LT = ({ address: e, family: t }) => {
  if (!k.isString(e))
    throw TypeError("address must be a string");
  return {
    address: e,
    family: t || (e.indexOf(".") < 0 ? 6 : 4)
  };
}, Jp = (e, t) => LT(k.isObject(e) ? e : { address: e, family: t }), FT = IT && function(t) {
  return DT(async function(r, a, s) {
    let { data: o, lookup: c, family: l } = t;
    const { responseType: u, responseEncoding: i } = t, d = t.method.toUpperCase();
    let v, $ = !1, y;
    if (c) {
      const C = RT(c, (R) => k.isArray(R) ? R : [R]);
      c = (R, j, w) => {
        C(R, j, (b, E, x) => {
          if (b)
            return w(b);
          const p = k.isArray(E) ? E.map((f) => Jp(f)) : [Jp(E, x)];
          j.all ? w(b, p) : w(b, p[0].address, p[0].family);
        });
      };
    }
    const g = new ek.EventEmitter(), h = () => {
      t.cancelToken && t.cancelToken.unsubscribe(m), t.signal && t.signal.removeEventListener("abort", m), g.removeAllListeners();
    };
    s((C, R) => {
      v = !0, R && ($ = !0, h());
    });
    function m(C) {
      g.emit("abort", !C || C.type ? new Ht(null, t, y) : C);
    }
    g.once("abort", a), (t.cancelToken || t.signal) && (t.cancelToken && t.cancelToken.subscribe(m), t.signal && (t.signal.aborted ? m() : t.signal.addEventListener("abort", m)));
    const _ = Cl(t.baseURL, t.url, t.allowAbsoluteUrls), P = new URL(_, xe.hasBrowserEnv ? xe.origin : void 0), O = P.protocol || Hp[0];
    if (O === "data:") {
      let C;
      if (d !== "GET")
        return zn(r, a, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config: t
        });
      try {
        C = hT(t.url, u === "blob", {
          Blob: t.env && t.env.Blob
        });
      } catch (R) {
        throw z.from(R, z.ERR_BAD_REQUEST, t);
      }
      return u === "text" ? (C = C.toString(i), (!i || i === "utf8") && (C = k.stripBOM(C))) : u === "stream" && (C = Lt.default.Readable.from(C)), zn(r, a, {
        data: C,
        status: 200,
        statusText: "OK",
        headers: new We(),
        config: t
      });
    }
    if (Hp.indexOf(O) === -1)
      return a(new z(
        "Unsupported protocol " + O,
        z.ERR_BAD_REQUEST,
        t
      ));
    const T = We.from(t.headers).normalize();
    T.set("User-Agent", "axios/" + Za, !1);
    const { onUploadProgress: L, onDownloadProgress: q } = t, ae = t.maxRate;
    let F, K;
    if (k.isSpecCompliantForm(o)) {
      const C = T.getContentType(/boundary=([-_\w\d]{10,70})/i);
      o = wT(o, (R) => {
        T.set(R);
      }, {
        tag: `axios-${Za}-boundary`,
        boundary: C && C[1] || void 0
      });
    } else if (k.isFormData(o) && k.isFunction(o.getHeaders)) {
      if (T.set(o.getHeaders()), !T.hasContentLength())
        try {
          const C = await Hm.default.promisify(o.getLength).call(o);
          Number.isFinite(C) && C >= 0 && T.setContentLength(C);
        } catch {
        }
    } else if (k.isBlob(o) || k.isFile(o))
      o.size && T.setContentType(o.type || "application/octet-stream"), T.setContentLength(o.size || 0), o = Lt.default.Readable.from(uh(o));
    else if (o && !k.isStream(o)) {
      if (!Buffer.isBuffer(o)) if (k.isArrayBuffer(o))
        o = Buffer.from(new Uint8Array(o));
      else if (k.isString(o))
        o = Buffer.from(o, "utf-8");
      else
        return a(new z(
          "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
          z.ERR_BAD_REQUEST,
          t
        ));
      if (T.setContentLength(o.length, !1), t.maxBodyLength > -1 && o.length > t.maxBodyLength)
        return a(new z(
          "Request body larger than maxBodyLength limit",
          z.ERR_BAD_REQUEST,
          t
        ));
    }
    const ce = k.toFiniteNumber(T.getContentLength());
    k.isArray(ae) ? (F = ae[0], K = ae[1]) : F = K = ae, o && (L || F) && (k.isStream(o) || (o = Lt.default.Readable.from(o, { objectMode: !1 })), o = Lt.default.pipeline([o, new Vp({
      maxRate: k.toFiniteNumber(F)
    })], k.noop), L && o.on("progress", Wp(
      o,
      es(
        ce,
        er(ts(L), !1, 3)
      )
    )));
    let J;
    if (t.auth) {
      const C = t.auth.username || "", R = t.auth.password || "";
      J = C + ":" + R;
    }
    if (!J && P.username) {
      const C = P.username, R = P.password;
      J = C + ":" + R;
    }
    J && T.delete("authorization");
    let de;
    try {
      de = kl(
        P.pathname + P.search,
        t.params,
        t.paramsSerializer
      ).replace(/^\?/, "");
    } catch (C) {
      const R = new Error(C.message);
      return R.config = t, R.url = t.url, R.exists = !0, a(R);
    }
    T.set(
      "Accept-Encoding",
      "gzip, compress, deflate" + (Kp ? ", br" : ""),
      !1
    );
    const I = {
      path: de,
      method: d,
      headers: T.toJSON(),
      agents: { http: t.httpAgent, https: t.httpsAgent },
      auth: J,
      protocol: O,
      family: l,
      beforeRedirect: CT,
      beforeRedirects: {}
    };
    !k.isUndefined(c) && (I.lookup = c), t.socketPath ? I.socketPath = t.socketPath : (I.hostname = P.hostname.startsWith("[") ? P.hostname.slice(1, -1) : P.hostname, I.port = P.port, ph(I, t.proxy, O + "//" + P.hostname + (P.port ? ":" + P.port : "") + I.path));
    let D;
    const V = AT.test(I.protocol);
    if (I.agent = V ? t.httpsAgent : t.httpAgent, t.transport ? D = t.transport : t.maxRedirects === 0 ? D = V ? sk.default : ak.default : (t.maxRedirects && (I.maxRedirects = t.maxRedirects), t.beforeRedirect && (I.beforeRedirects.config = t.beforeRedirect), D = V ? NT : jT), t.maxBodyLength > -1 ? I.maxBodyLength = t.maxBodyLength : I.maxBodyLength = 1 / 0, t.insecureHTTPParser && (I.insecureHTTPParser = t.insecureHTTPParser), y = D.request(I, function(R) {
      if (y.destroyed) return;
      const j = [R], w = +R.headers["content-length"];
      if (q || K) {
        const f = new Vp({
          maxRate: k.toFiniteNumber(K)
        });
        q && f.on("progress", Wp(
          f,
          es(
            w,
            er(ts(q), !0, 3)
          )
        )), j.push(f);
      }
      let b = R;
      const E = R.req || y;
      if (t.decompress !== !1 && R.headers["content-encoding"])
        switch ((d === "HEAD" || R.statusCode === 204) && delete R.headers["content-encoding"], (R.headers["content-encoding"] || "").toLowerCase()) {
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            j.push(Kt.default.createUnzip(Gp)), delete R.headers["content-encoding"];
            break;
          case "deflate":
            j.push(new ST()), j.push(Kt.default.createUnzip(Gp)), delete R.headers["content-encoding"];
            break;
          case "br":
            Kp && (j.push(Kt.default.createBrotliDecompress(TT)), delete R.headers["content-encoding"]);
        }
      b = j.length > 1 ? Lt.default.pipeline(j, k.noop) : j[0];
      const x = Lt.default.finished(b, () => {
        x(), h();
      }), p = {
        status: R.statusCode,
        statusText: R.statusMessage,
        headers: new We(R.headers),
        config: t,
        request: E
      };
      if (u === "stream")
        p.data = b, zn(r, a, p);
      else {
        const f = [];
        let S = 0;
        b.on("data", function(N) {
          f.push(N), S += N.length, t.maxContentLength > -1 && S > t.maxContentLength && ($ = !0, b.destroy(), a(new z(
            "maxContentLength size of " + t.maxContentLength + " exceeded",
            z.ERR_BAD_RESPONSE,
            t,
            E
          )));
        }), b.on("aborted", function() {
          if ($)
            return;
          const N = new z(
            "stream has been aborted",
            z.ERR_BAD_RESPONSE,
            t,
            E
          );
          b.destroy(N), a(N);
        }), b.on("error", function(N) {
          y.destroyed || a(z.from(N, null, t, E));
        }), b.on("end", function() {
          try {
            let N = f.length === 1 ? f[0] : Buffer.concat(f);
            u !== "arraybuffer" && (N = N.toString(i), (!i || i === "utf8") && (N = k.stripBOM(N))), p.data = N;
          } catch (N) {
            return a(z.from(N, null, t, p.request, p));
          }
          zn(r, a, p);
        });
      }
      g.once("abort", (f) => {
        b.destroyed || (b.emit("error", f), b.destroy());
      });
    }), g.once("abort", (C) => {
      a(C), y.destroy(C);
    }), y.on("error", function(R) {
      a(z.from(R, null, t, y));
    }), y.on("socket", function(R) {
      R.setKeepAlive(!0, 1e3 * 60);
    }), t.timeout) {
      const C = parseInt(t.timeout, 10);
      if (Number.isNaN(C)) {
        a(new z(
          "error trying to parse `config.timeout` to int",
          z.ERR_BAD_OPTION_VALUE,
          t,
          y
        ));
        return;
      }
      y.setTimeout(C, function() {
        if (v) return;
        let j = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
        const w = t.transitional || Tl;
        t.timeoutErrorMessage && (j = t.timeoutErrorMessage), a(new z(
          j,
          w.clarifyTimeoutError ? z.ETIMEDOUT : z.ECONNABORTED,
          t,
          y
        )), m();
      });
    }
    if (k.isStream(o)) {
      let C = !1, R = !1;
      o.on("end", () => {
        C = !0;
      }), o.once("error", (j) => {
        R = !0, y.destroy(j);
      }), o.on("close", () => {
        !C && !R && m(new Ht("Request stream has been aborted", t, y));
      }), o.pipe(y);
    } else
      y.end(o);
  });
}, MT = xe.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, xe.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(xe.origin),
  xe.navigator && /(msie|trident)/i.test(xe.navigator.userAgent)
) : () => !0, UT = xe.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, a, s) {
      const o = [e + "=" + encodeURIComponent(t)];
      k.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()), k.isString(r) && o.push("path=" + r), k.isString(a) && o.push("domain=" + a), s === !0 && o.push("secure"), document.cookie = o.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
), Xp = (e) => e instanceof We ? { ...e } : e;
function On(e, t) {
  t = t || {};
  const n = {};
  function r(u, i, d, v) {
    return k.isPlainObject(u) && k.isPlainObject(i) ? k.merge.call({ caseless: v }, u, i) : k.isPlainObject(i) ? k.merge({}, i) : k.isArray(i) ? i.slice() : i;
  }
  function a(u, i, d, v) {
    if (k.isUndefined(i)) {
      if (!k.isUndefined(u))
        return r(void 0, u, d, v);
    } else return r(u, i, d, v);
  }
  function s(u, i) {
    if (!k.isUndefined(i))
      return r(void 0, i);
  }
  function o(u, i) {
    if (k.isUndefined(i)) {
      if (!k.isUndefined(u))
        return r(void 0, u);
    } else return r(void 0, i);
  }
  function c(u, i, d) {
    if (d in t)
      return r(u, i);
    if (d in e)
      return r(void 0, u);
  }
  const l = {
    url: s,
    method: s,
    data: s,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: c,
    headers: (u, i, d) => a(Xp(u), Xp(i), d, !0)
  };
  return k.forEach(Object.keys(Object.assign({}, e, t)), function(i) {
    const d = l[i] || a, v = d(e[i], t[i], i);
    k.isUndefined(v) && d !== c || (n[i] = v);
  }), n;
}
const dh = (e) => {
  const t = On({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: a, xsrfCookieName: s, headers: o, auth: c } = t;
  t.headers = o = We.from(o), t.url = kl(Cl(t.baseURL, t.url), e.params, e.paramsSerializer), c && o.set(
    "Authorization",
    "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))
  );
  let l;
  if (k.isFormData(n)) {
    if (xe.hasStandardBrowserEnv || xe.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if ((l = o.getContentType()) !== !1) {
      const [u, ...i] = l ? l.split(";").map((d) => d.trim()).filter(Boolean) : [];
      o.setContentType([u || "multipart/form-data", ...i].join("; "));
    }
  }
  if (xe.hasStandardBrowserEnv && (r && k.isFunction(r) && (r = r(t)), r || r !== !1 && MT(t.url))) {
    const u = a && s && UT.read(s);
    u && o.set(a, u);
  }
  return t;
}, zT = typeof XMLHttpRequest < "u", qT = zT && function(e) {
  return new Promise(function(n, r) {
    const a = dh(e);
    let s = a.data;
    const o = We.from(a.headers).normalize();
    let { responseType: c, onUploadProgress: l, onDownloadProgress: u } = a, i, d, v, $, y;
    function g() {
      $ && $(), y && y(), a.cancelToken && a.cancelToken.unsubscribe(i), a.signal && a.signal.removeEventListener("abort", i);
    }
    let h = new XMLHttpRequest();
    h.open(a.method.toUpperCase(), a.url, !0), h.timeout = a.timeout;
    function m() {
      if (!h)
        return;
      const P = We.from(
        "getAllResponseHeaders" in h && h.getAllResponseHeaders()
      ), T = {
        data: !c || c === "text" || c === "json" ? h.responseText : h.response,
        status: h.status,
        statusText: h.statusText,
        headers: P,
        config: e,
        request: h
      };
      zn(function(q) {
        n(q), g();
      }, function(q) {
        r(q), g();
      }, T), h = null;
    }
    "onloadend" in h ? h.onloadend = m : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(m);
    }, h.onabort = function() {
      h && (r(new z("Request aborted", z.ECONNABORTED, e, h)), h = null);
    }, h.onerror = function() {
      r(new z("Network Error", z.ERR_NETWORK, e, h)), h = null;
    }, h.ontimeout = function() {
      let O = a.timeout ? "timeout of " + a.timeout + "ms exceeded" : "timeout exceeded";
      const T = a.transitional || Tl;
      a.timeoutErrorMessage && (O = a.timeoutErrorMessage), r(new z(
        O,
        T.clarifyTimeoutError ? z.ETIMEDOUT : z.ECONNABORTED,
        e,
        h
      )), h = null;
    }, s === void 0 && o.setContentType(null), "setRequestHeader" in h && k.forEach(o.toJSON(), function(O, T) {
      h.setRequestHeader(T, O);
    }), k.isUndefined(a.withCredentials) || (h.withCredentials = !!a.withCredentials), c && c !== "json" && (h.responseType = a.responseType), u && ([v, y] = er(u, !0), h.addEventListener("progress", v)), l && h.upload && ([d, $] = er(l), h.upload.addEventListener("progress", d), h.upload.addEventListener("loadend", $)), (a.cancelToken || a.signal) && (i = (P) => {
      h && (r(!P || P.type ? new Ht(null, e, h) : P), h.abort(), h = null);
    }, a.cancelToken && a.cancelToken.subscribe(i), a.signal && (a.signal.aborted ? i() : a.signal.addEventListener("abort", i)));
    const _ = lh(a.url);
    if (_ && xe.protocols.indexOf(_) === -1) {
      r(new z("Unsupported protocol " + _ + ":", z.ERR_BAD_REQUEST, e));
      return;
    }
    h.send(s || null);
  });
}, VT = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), a;
    const s = function(u) {
      if (!a) {
        a = !0, c();
        const i = u instanceof Error ? u : this.reason;
        r.abort(i instanceof z ? i : new Ht(i instanceof Error ? i.message : i));
      }
    };
    let o = t && setTimeout(() => {
      o = null, s(new z(`timeout ${t} of ms exceeded`, z.ETIMEDOUT));
    }, t);
    const c = () => {
      e && (o && clearTimeout(o), o = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(s) : u.removeEventListener("abort", s);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", s));
    const { signal: l } = r;
    return l.unsubscribe = () => k.asap(c), l;
  }
}, BT = VT, GT = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, a;
  for (; r < n; )
    a = r + t, yield e.slice(r, a), r = a;
}, KT = async function* (e, t) {
  for await (const n of HT(e))
    yield* GT(n, t);
}, HT = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, Yp = (e, t, n, r) => {
  const a = KT(e, t);
  let s = 0, o, c = (l) => {
    o || (o = !0, r && r(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: u, value: i } = await a.next();
        if (u) {
          c(), l.close();
          return;
        }
        let d = i.byteLength;
        if (n) {
          let v = s += d;
          n(v);
        }
        l.enqueue(new Uint8Array(i));
      } catch (u) {
        throw c(u), u;
      }
    },
    cancel(l) {
      return c(l), a.return();
    }
  }, {
    highWaterMark: 2
  });
}, Ns = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", fh = Ns && typeof ReadableStream == "function", WT = Ns && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), mh = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, JT = fh && mh(() => {
  let e = !1;
  const t = new Request(xe.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), Qp = 64 * 1024, ii = fh && mh(() => k.isReadableStream(new Response("").body)), ns = {
  stream: ii && ((e) => e.body)
};
Ns && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !ns[t] && (ns[t] = k.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new z(`Response type '${t}' is not supported`, z.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const XT = async (e) => {
  if (e == null)
    return 0;
  if (k.isBlob(e))
    return e.size;
  if (k.isSpecCompliantForm(e))
    return (await new Request(xe.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (k.isArrayBufferView(e) || k.isArrayBuffer(e))
    return e.byteLength;
  if (k.isURLSearchParams(e) && (e = e + ""), k.isString(e))
    return (await WT(e)).byteLength;
}, YT = async (e, t) => {
  const n = k.toFiniteNumber(e.getContentLength());
  return n ?? XT(t);
}, QT = Ns && (async (e) => {
  let {
    url: t,
    method: n,
    data: r,
    signal: a,
    cancelToken: s,
    timeout: o,
    onDownloadProgress: c,
    onUploadProgress: l,
    responseType: u,
    headers: i,
    withCredentials: d = "same-origin",
    fetchOptions: v
  } = dh(e);
  u = u ? (u + "").toLowerCase() : "text";
  let $ = BT([a, s && s.toAbortSignal()], o), y;
  const g = $ && $.unsubscribe && (() => {
    $.unsubscribe();
  });
  let h;
  try {
    if (l && JT && n !== "get" && n !== "head" && (h = await YT(i, r)) !== 0) {
      let T = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), L;
      if (k.isFormData(r) && (L = T.headers.get("content-type")) && i.setContentType(L), T.body) {
        const [q, ae] = es(
          h,
          er(ts(l))
        );
        r = Yp(T.body, Qp, q, ae);
      }
    }
    k.isString(d) || (d = d ? "include" : "omit");
    const m = "credentials" in Request.prototype;
    y = new Request(t, {
      ...v,
      signal: $,
      method: n.toUpperCase(),
      headers: i.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: m ? d : void 0
    });
    let _ = await fetch(y);
    const P = ii && (u === "stream" || u === "response");
    if (ii && (c || P && g)) {
      const T = {};
      ["status", "statusText", "headers"].forEach((F) => {
        T[F] = _[F];
      });
      const L = k.toFiniteNumber(_.headers.get("content-length")), [q, ae] = c && es(
        L,
        er(ts(c), !0)
      ) || [];
      _ = new Response(
        Yp(_.body, Qp, q, () => {
          ae && ae(), g && g();
        }),
        T
      );
    }
    u = u || "text";
    let O = await ns[k.findKey(ns, u) || "text"](_, e);
    return !P && g && g(), await new Promise((T, L) => {
      zn(T, L, {
        data: O,
        headers: We.from(_.headers),
        status: _.status,
        statusText: _.statusText,
        config: e,
        request: y
      });
    });
  } catch (m) {
    throw g && g(), m && m.name === "TypeError" && /fetch/i.test(m.message) ? Object.assign(
      new z("Network Error", z.ERR_NETWORK, e, y),
      {
        cause: m.cause || m
      }
    ) : z.from(m, m && m.code, e, y);
  }
}), ci = {
  http: FT,
  xhr: qT,
  fetch: QT
};
k.forEach(ci, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Zp = (e) => `- ${e}`, ZT = (e) => k.isFunction(e) || e === null || e === !1, hh = {
  getAdapter: (e) => {
    e = k.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const a = {};
    for (let s = 0; s < t; s++) {
      n = e[s];
      let o;
      if (r = n, !ZT(n) && (r = ci[(o = String(n)).toLowerCase()], r === void 0))
        throw new z(`Unknown adapter '${o}'`);
      if (r)
        break;
      a[o || "#" + s] = r;
    }
    if (!r) {
      const s = Object.entries(a).map(
        ([c, l]) => `adapter ${c} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let o = t ? s.length > 1 ? `since :
` + s.map(Zp).join(`
`) : " " + Zp(s[0]) : "as no adapter specified";
      throw new z(
        "There is no suitable adapter to dispatch the request " + o,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: ci
};
function To(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Ht(null, e);
}
function ed(e) {
  return To(e), e.headers = We.from(e.headers), e.data = Oo.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), hh.getAdapter(e.adapter || Al.adapter)(e).then(function(r) {
    return To(e), r.data = Oo.call(
      e,
      e.transformResponse,
      r
    ), r.headers = We.from(r.headers), r;
  }, function(r) {
    return ch(r) || (To(e), r && r.response && (r.response.data = Oo.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = We.from(r.response.headers))), Promise.reject(r);
  });
}
const As = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  As[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const td = {};
As.transitional = function(t, n, r) {
  function a(s, o) {
    return "[Axios v" + Za + "] Transitional option '" + s + "'" + o + (r ? ". " + r : "");
  }
  return (s, o, c) => {
    if (t === !1)
      throw new z(
        a(o, " has been removed" + (n ? " in " + n : "")),
        z.ERR_DEPRECATED
      );
    return n && !td[o] && (td[o] = !0, console.warn(
      a(
        o,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, o, c) : !0;
  };
};
As.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function ej(e, t, n) {
  if (typeof e != "object")
    throw new z("options must be an object", z.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let a = r.length;
  for (; a-- > 0; ) {
    const s = r[a], o = t[s];
    if (o) {
      const c = e[s], l = c === void 0 || o(c, s, e);
      if (l !== !0)
        throw new z("option " + s + " must be " + l, z.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new z("Unknown option " + s, z.ERR_BAD_OPTION);
  }
}
const Fa = {
  assertOptions: ej,
  validators: As
}, vt = Fa.validators;
class rs {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Up(),
      response: new Up()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let a = {};
        Error.captureStackTrace ? Error.captureStackTrace(a) : a = new Error();
        const s = a.stack ? a.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? s && !String(r.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + s) : r.stack = s;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = On(this.defaults, n);
    const { transitional: r, paramsSerializer: a, headers: s } = n;
    r !== void 0 && Fa.assertOptions(r, {
      silentJSONParsing: vt.transitional(vt.boolean),
      forcedJSONParsing: vt.transitional(vt.boolean),
      clarifyTimeoutError: vt.transitional(vt.boolean)
    }, !1), a != null && (k.isFunction(a) ? n.paramsSerializer = {
      serialize: a
    } : Fa.assertOptions(a, {
      encode: vt.function,
      serialize: vt.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), Fa.assertOptions(n, {
      baseUrl: vt.spelling("baseURL"),
      withXsrfToken: vt.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let o = s && k.merge(
      s.common,
      s[n.method]
    );
    s && k.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (y) => {
        delete s[y];
      }
    ), n.headers = We.concat(o, s);
    const c = [];
    let l = !0;
    this.interceptors.request.forEach(function(g) {
      typeof g.runWhen == "function" && g.runWhen(n) === !1 || (l = l && g.synchronous, c.unshift(g.fulfilled, g.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(g) {
      u.push(g.fulfilled, g.rejected);
    });
    let i, d = 0, v;
    if (!l) {
      const y = [ed.bind(this), void 0];
      for (y.unshift.apply(y, c), y.push.apply(y, u), v = y.length, i = Promise.resolve(n); d < v; )
        i = i.then(y[d++], y[d++]);
      return i;
    }
    v = c.length;
    let $ = n;
    for (d = 0; d < v; ) {
      const y = c[d++], g = c[d++];
      try {
        $ = y($);
      } catch (h) {
        g.call(this, h);
        break;
      }
    }
    try {
      i = ed.call(this, $);
    } catch (y) {
      return Promise.reject(y);
    }
    for (d = 0, v = u.length; d < v; )
      i = i.then(u[d++], u[d++]);
    return i;
  }
  getUri(t) {
    t = On(this.defaults, t);
    const n = Cl(t.baseURL, t.url, t.allowAbsoluteUrls);
    return kl(n, t.params, t.paramsSerializer);
  }
}
k.forEach(["delete", "get", "head", "options"], function(t) {
  rs.prototype[t] = function(n, r) {
    return this.request(On(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
k.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(s, o, c) {
      return this.request(On(c || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: o
      }));
    };
  }
  rs.prototype[t] = n(), rs.prototype[t + "Form"] = n(!0);
});
const Ma = rs;
class Il {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const r = this;
    this.promise.then((a) => {
      if (!r._listeners) return;
      let s = r._listeners.length;
      for (; s-- > 0; )
        r._listeners[s](a);
      r._listeners = null;
    }), this.promise.then = (a) => {
      let s;
      const o = new Promise((c) => {
        r.subscribe(c), s = c;
      }).then(a);
      return o.cancel = function() {
        r.unsubscribe(s);
      }, o;
    }, t(function(s, o, c) {
      r.reason || (r.reason = new Ht(s, o, c), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Il(function(a) {
        t = a;
      }),
      cancel: t
    };
  }
}
const tj = Il;
function nj(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function rj(e) {
  return k.isObject(e) && e.isAxiosError === !0;
}
const li = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(li).forEach(([e, t]) => {
  li[t] = e;
});
const aj = li;
function vh(e) {
  const t = new Ma(e), n = Wm(Ma.prototype.request, t);
  return k.extend(n, Ma.prototype, t, { allOwnKeys: !0 }), k.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(a) {
    return vh(On(e, a));
  }, n;
}
const Pe = vh(Al);
Pe.Axios = Ma;
Pe.CanceledError = Ht;
Pe.CancelToken = tj;
Pe.isCancel = ch;
Pe.VERSION = Za;
Pe.toFormData = Ts;
Pe.AxiosError = z;
Pe.Cancel = Pe.CanceledError;
Pe.all = function(t) {
  return Promise.all(t);
};
Pe.spread = nj;
Pe.isAxiosError = rj;
Pe.mergeConfig = On;
Pe.AxiosHeaders = We;
Pe.formToJSON = (e) => ih(k.isHTMLForm(e) ? new FormData(e) : e);
Pe.getAdapter = hh.getAdapter;
Pe.HttpStatusCode = aj;
Pe.default = Pe;
var sj = Pe, jo, nd;
function oj() {
  return nd || (nd = 1, jo = {
    appId: "25658982",
    // 应用ID
    appKey: "pVB2TAdcOLZiCldLEcG1dABS3OK2owVi",
    // 应用密钥
    secretKey: "XwXk28lcgoWLVlVLEkTMFxnqwA4onOLd",
    // 密钥
    signKey: "rP4Btn+qap$stv3AstL+!XIpURM3mLn%",
    // 签名密钥
    redirectUri: "oob",
    // 重定向URI
    scope: "basic,netdisk",
    // 权限范围
    deviceId: "",
    // 设备ID，可以是随机生成的UUID，留空将自动生成
    deviceName: "度盘读天下",
    // 设备名称
    apiBaseUrl: "https://pan.baidu.com/rest/2.0",
    // API基础URL
    oauthUrl: "https://openapi.baidu.com/oauth/2.0",
    // OAuth URL
    shareThirdld: "0"
    // 分享第三方ID
  }), jo;
}
const Nt = sj, yh = fi, ij = Oh, { app: cj } = di, { join: Cs } = pt, ta = zr, { promisify: Is } = Wt, gh = Is(ta.writeFile), bh = Is(ta.readFile), lj = Is(ta.mkdir), Ds = Is(ta.exists);
let he;
try {
  he = oj();
} catch {
  console.error("无法加载百度云盘配置文件，请确保已创建 electron/config/baiduPanConfig.cjs 文件"), console.error("可以复制 electron/config/baiduPanConfig.example.cjs 并填入你的实际配置"), he = {
    appId: "",
    appKey: "",
    secretKey: "",
    signKey: "",
    redirectUri: "oob",
    scope: "basic,netdisk",
    deviceId: "",
    deviceName: "度盘读天下",
    apiBaseUrl: "https://pan.baidu.com/rest/2.0",
    oauthUrl: "https://openapi.baidu.com/oauth/2.0"
  };
}
const Fr = Cs(cj.getPath("userData"), "baiduPan"), Mr = Cs(Fr, "token.json"), Dl = async () => {
  await Ds(Fr) || await lj(Fr, { recursive: !0 });
}, $h = async (e) => (await Dl(), Object.assign(he, e), await gh(
  Cs(Fr, "config.json"),
  JSON.stringify(he, null, 2)
), he), Ll = async () => {
  await Dl();
  try {
    const e = Cs(Fr, "config.json");
    if (await Ds(e)) {
      const t = await bh(e, "utf8");
      Object.assign(he, JSON.parse(t));
    }
    return he;
  } catch (e) {
    return console.error("加载配置失败:", e), he;
  }
}, xh = async (e) => (await Dl(), await gh(Mr, JSON.stringify(e, null, 2)), e), Ls = async () => {
  try {
    if (await Ds(Mr)) {
      const e = await bh(Mr, "utf8");
      return JSON.parse(e);
    }
  } catch (e) {
    console.error("加载令牌失败:", e);
  }
  return null;
}, uj = async () => {
  try {
    await Ds(Mr) && await ta.promises.unlink(Mr);
  } catch (e) {
    console.error("清除令牌失败:", e);
  }
}, pj = (e) => {
  const t = Object.keys(e).sort().reduce((r, a) => (r[a] = e[a], r), {});
  let n = "";
  for (const r in t)
    r !== "sign" && t[r] !== "" && (n += r + "=" + t[r]);
  return n += he.signKey, yh.createHash("md5").update(n).digest("hex");
}, Fl = (e) => {
  const t = Nt.create({
    baseURL: he.apiBaseUrl,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "pan.baidu.com"
    }
  });
  return t.interceptors.request.use((n) => {
    const r = {
      ...n.params,
      access_token: e.access_token,
      app_id: n.appId,
      device_id: n.deviceId,
      device_name: n.deviceName,
      timestamp: Math.floor(Date.now() / 1e3),
      version: "1.0.0"
    };
    return r.sign = pj(r), n.params = r, n;
  }), t;
}, _h = async (e) => {
  try {
    const t = await Nt.post(
      `${he.oauthUrl}/token`,
      ij.stringify({
        grant_type: "refresh_token",
        refresh_token: e.refresh_token,
        client_id: he.appKey,
        client_secret: he.secretKey
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    ), n = {
      ...e,
      access_token: t.data.access_token,
      refresh_token: t.data.refresh_token || e.refresh_token,
      expires_in: t.data.expires_in,
      expires_at: Date.now() + t.data.expires_in * 1e3
    };
    return await xh(n), n;
  } catch (t) {
    throw console.error("刷新令牌失败:", t), t;
  }
}, Fs = async () => {
  let e = await Ls();
  if (!e)
    throw new Error("未登录，请先登录");
  return e.expires_at - Date.now() < 3e5 && (e = await _h(e)), e;
}, ui = async () => {
  try {
    await Ll(), he.deviceId || (he.deviceId = yh.randomUUID(), await $h(he)), console.log("正在获取授权码，使用参数:", {
      client_id: he.appKey,
      response_type: "device_code",
      scope: he.scope
    });
    const e = await Nt.get(`${he.oauthUrl}/device/code`, {
      params: {
        response_type: "device_code",
        client_id: he.appKey,
        scope: he.scope
      },
      headers: {
        "User-Agent": "pan.baidu.com"
      }
    });
    if (console.log("授权码API响应:", e.data), e.data.error)
      throw new Error(`获取授权码失败: ${e.data.error_description || e.data.error}`);
    return {
      device_code: e.data.device_code,
      user_code: e.data.user_code,
      verification_url: e.data.verification_url || "https://openapi.baidu.com/device",
      qrcode_url: e.data.qrcode_url,
      imgUrl: e.data.qrcode_url,
      // 为了兼容前端代码
      expires_in: e.data.expires_in,
      interval: e.data.interval || 5
    };
  } catch (e) {
    throw console.error("获取授权码失败:", e), e;
  }
}, as = async (e) => {
  try {
    await Ll();
    const t = typeof e == "string" ? e : e.device_code, n = await Nt.get(`${he.oauthUrl}/token`, {
      params: {
        grant_type: "device_token",
        code: t,
        client_id: he.appKey,
        client_secret: he.secretKey
      },
      headers: {
        "User-Agent": "pan.baidu.com"
      }
    });
    if (n.data.access_token) {
      const r = {
        access_token: n.data.access_token,
        refresh_token: n.data.refresh_token,
        expires_in: n.data.expires_in,
        expires_at: Date.now() + n.data.expires_in * 1e3,
        scope: n.data.scope
      };
      return await xh(r), {
        status: "CONFIRMED",
        // 只返回必要的信息
        tokenInfo: {
          access_token: n.data.access_token.substring(0, 10) + "...",
          expires_in: n.data.expires_in,
          scope: n.data.scope
        }
      };
    }
    return { status: "WAITING" };
  } catch (t) {
    if (t.response && t.response.data) {
      const n = t.response.data;
      return n.error === "expired_token" ? { status: "EXPIRED", message: "授权码已过期，请重新获取" } : n.error === "authorization_declined" ? { status: "CANCELED", message: "用户已取消授权" } : n.error === "authorization_pending" ? { status: "WAITING", message: "等待用户授权" } : n.error === "slow_down" ? {
        status: "SLOW_DOWN",
        message: "请求过于频繁，请降低请求频率",
        // 建议增加轮询间隔
        suggestedInterval: t.response.data.interval || 10
      } : {
        status: "ERROR",
        message: n.error_description || n.error || "未知错误"
      };
    }
    return console.error("检查授权码状态失败:", t), { status: "ERROR", message: t.message || "网络错误" };
  }
}, pi = async (e) => {
  try {
    const t = typeof e == "string" ? e : e.device_code;
    if ((await as(t)).status !== "CONFIRMED")
      throw new Error("授权码未确认");
    const r = await Ls();
    if (!r)
      throw new Error("获取令牌失败");
    const a = await wh(r);
    return {
      token: {
        // 只返回必要的信息，避免序列化问题
        access_token: r.access_token.substring(0, 10) + "...",
        expires_in: r.expires_in,
        scope: r.scope
      },
      user: a
    };
  } catch (t) {
    throw console.error("登录失败:", t), t;
  }
}, dj = async () => {
  try {
    const e = await Ls();
    if (e) {
      try {
        await Nt.get(`${he.oauthUrl}/revoke`, {
          params: {
            access_token: e.access_token
          }
        });
      } catch (t) {
        console.error("注销令牌失败:", t);
      }
      await uj();
    }
    return !0;
  } catch (e) {
    throw console.error("登出失败:", e), e;
  }
}, fj = async () => {
  try {
    const e = await Ls();
    if (!e)
      return !1;
    if (e.expires_at <= Date.now())
      try {
        await _h(e);
      } catch (t) {
        return console.error("刷新令牌失败:", t), !1;
      }
    try {
      return !!(await Nt.get(`${he.oauthUrl}/tokeninfo`, {
        params: {
          access_token: e.access_token
        }
      })).data.scope;
    } catch (t) {
      return console.error("验证令牌失败:", t), !1;
    }
  } catch (e) {
    return console.error("验证令牌失败:", e), !1;
  }
}, wh = async (e) => {
  try {
    const t = e || await Fs(), n = await Nt.get(`${he.apiBaseUrl}/xpan/nas`, {
      params: {
        method: "uinfo",
        access_token: t.access_token
      }
    });
    if (n.data.errno !== 0)
      throw new Error(`获取用户信息失败: ${n.data.errmsg}`);
    return {
      uk: n.data.uk,
      baiduid: n.data.baidu_name,
      username: n.data.netdisk_name,
      avatarUrl: n.data.avatar_url,
      vipType: n.data.vip_type,
      isVip: n.data.is_vip === 1
    };
  } catch (t) {
    throw console.error("获取用户信息失败:", t), t;
  }
}, Ml = async (e = "/", t = {}) => {
  try {
    const n = await Fs(), r = Fl(n), a = {
      method: "list",
      dir: e,
      order: t.order || "name",
      desc: t.desc ? 1 : 0,
      limit: t.limit || 1e3,
      start: t.start || 0,
      web: 1
      // 返回更多信息
    }, s = await r.get("/xpan/file", { params: a });
    if (s.data.errno !== 0)
      throw new Error(`获取文件列表失败: ${s.data.errmsg}`);
    return s.data.list || [];
  } catch (n) {
    throw console.error("获取文件列表失败:", n), n;
  }
}, mj = async (e = "/", t = {}) => {
  try {
    return (await Ml(e, t)).filter((r) => {
      const a = r.server_filename.split(".").pop().toLowerCase();
      return ["mp3", "flac", "wav", "aac", "m4a", "ogg"].includes(a);
    });
  } catch (n) {
    throw console.error("获取音频文件列表失败:", n), n;
  }
}, Eh = async (e) => {
  try {
    const t = await Fs(), n = Fl(t), r = {
      method: "filemetas",
      fsids: `[${e}]`,
      dlink: 1
    }, a = await n.get("/xpan/multimedia", { params: r });
    if (a.data.errno !== 0)
      throw new Error(`获取文件下载链接失败: ${a.data.errmsg}`);
    if (!a.data.list || a.data.list.length === 0)
      throw new Error("未找到文件");
    const s = a.data.list[0], o = await Nt.get(s.dlink, {
      headers: {
        "User-Agent": "pan.baidu.com"
      },
      params: {
        access_token: t.access_token
      },
      maxRedirects: 0,
      validateStatus: (c) => c >= 200 && c < 400
    });
    return o.status === 302 ? o.headers.location : s.dlink;
  } catch (t) {
    throw console.error("获取文件下载链接失败:", t), t;
  }
}, Sh = async (e, t = "/", n = {}) => {
  try {
    const r = await Fs(), a = Fl(r), s = {
      method: "search",
      key: e,
      dir: t,
      recursion: n.recursion ? 1 : 0,
      limit: n.limit || 1e3,
      web: 1
      // 返回更多信息
    }, o = await a.get("/xpan/file", { params: s });
    if (o.data.errno !== 0)
      throw new Error(`搜索文件失败: ${o.data.errmsg}`);
    return o.data.list || [];
  } catch (r) {
    throw console.error("搜索文件失败:", r), r;
  }
}, hj = async (e, t = "/", n = {}) => {
  try {
    return (await Sh(e, t, n)).filter((a) => {
      const s = a.server_filename.split(".").pop().toLowerCase();
      return ["mp3", "flac", "wav", "aac", "m4a", "ogg"].includes(s);
    });
  } catch (r) {
    throw console.error("搜索音频文件失败:", r), r;
  }
}, vj = async (e) => {
  try {
    const t = e.server_filename, n = t.substring(0, t.lastIndexOf(".")) + ".lrc", r = e.path.substring(0, e.path.lastIndexOf("/") + 1);
    return (await Ml(r)).find((o) => o.server_filename === n) || null;
  } catch (t) {
    return console.error("获取歌词文件失败:", t), null;
  }
}, yj = async (e) => {
  try {
    if (!e)
      return null;
    const t = await Eh(e.fs_id);
    return (await Nt.get(t, {
      headers: {
        "User-Agent": "pan.baidu.com"
      }
    })).data;
  } catch (t) {
    return console.error("获取歌词内容失败:", t), null;
  }
}, gj = async () => {
  try {
    return await ui();
  } catch (e) {
    throw console.error("获取登录二维码失败:", e), e;
  }
}, bj = async (e) => {
  try {
    return await as(e);
  } catch (t) {
    throw console.error("检查二维码状态失败:", t), t;
  }
}, $j = async (e) => {
  try {
    return await pi(e);
  } catch (t) {
    throw console.error("登录失败:", t), t;
  }
};
var xj = {
  loadConfig: Ll,
  saveConfig: $h,
  getLoginQRCode: gj,
  checkQRCodeStatus: bj,
  login: $j,
  getAuthCode: ui,
  checkAuthCodeStatus: as,
  loginWithAuthCode: pi,
  getDeviceCode: ui,
  // 为了向后兼容
  checkDeviceCodeStatus: as,
  // 为了向后兼容
  loginWithDeviceCode: pi,
  // 为了向后兼容
  logout: dj,
  verifyToken: fj,
  getUserInfo: wh,
  getFileList: Ml,
  getAudioFileList: mj,
  getFileDownloadLink: Eh,
  searchFiles: Sh,
  searchAudioFiles: hj,
  getLyricFile: vj,
  getLyricContent: yj
};
const { app: Ur, BrowserWindow: _j, ipcMain: ve, dialog: wj } = di, { join: No } = pt, Ej = kP, Se = xj, kn = new Ej(), Sj = async () => {
  try {
    await Se.loadConfig();
  } catch (e) {
    console.error("加载百度云盘配置失败:", e);
  }
};
Sj();
let fn;
async function Ph() {
  fn = new _j({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: !1,
      contextIsolation: !0,
      nodeIntegrationInWorker: !0,
      nodeIntegrationInSubFrames: !0,
      sandbox: !1,
      experimentalFeatures: !0,
      preload: No(__dirname, "preload.cjs")
    },
    // 设置应用图标
    icon: No(__dirname, "../public/icon.png")
  }), Ur.isPackaged ? await fn.loadFile(No(__dirname, "../dist/index.html")) : (await fn.loadURL("http://localhost:5173"), fn.webContents.openDevTools()), fn.on("closed", () => {
    fn = null;
  });
}
Ur.whenReady().then(Ph);
Ur.on("window-all-closed", () => {
  process.platform !== "darwin" && Ur.quit();
});
Ur.on("activate", () => {
  fn === null && Ph();
});
ve.handle("select-files", async () => {
  const { canceled: e, filePaths: t } = await wj.showOpenDialog({
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "音频文件", extensions: ["mp3", "wav", "flac", "ogg", "m4a", "ra"] }
    ]
  });
  return e ? [] : t;
});
ve.handle("get-playlists", () => kn.get("playlists", []));
ve.handle("save-playlists", (e, t) => (kn.set("playlists", t), !0));
ve.handle("get-recent-tracks", () => kn.get("recentTracks", []));
ve.handle("add-recent-track", (e, t) => {
  const r = kn.get("recentTracks", []).filter((s) => s.id !== t.id);
  r.unshift(t);
  const a = r.slice(0, 20);
  return kn.set("recentTracks", a), a;
});
ve.handle("get-settings", () => kn.get("settings", {
  theme: "system",
  // 'light', 'dark', 'system'
  visualizer: "spectrum",
  // 'spectrum', 'waveform', 'none'
  playMode: "sequential"
  // 'sequential', 'repeat', 'random'
}));
ve.handle("save-settings", (e, t) => (kn.set("settings", t), !0));
ve.handle("baidu-pan-save-config", async (e, t) => {
  try {
    return { success: !0, data: await Se.saveConfig(t) };
  } catch (n) {
    return console.error("保存百度云盘配置失败:", n), { success: !1, error: n.message };
  }
});
ve.handle("baidu-pan-get-login-qrcode", async () => {
  try {
    return { success: !0, data: await Se.getLoginQRCode() };
  } catch (e) {
    return console.error("获取百度云盘登录二维码失败:", e), { success: !1, error: e.message };
  }
});
ve.handle("baidu-pan-check-qrcode-status", async (e, t) => {
  try {
    return { success: !0, data: await Se.checkQRCodeStatus(t) };
  } catch (n) {
    return console.error("检查百度云盘二维码状态失败:", n), { success: !1, error: n.message };
  }
});
ve.handle("baidu-pan-login", async (e, t) => {
  try {
    return { success: !0, data: await Se.login(t) };
  } catch (n) {
    return console.error("百度云盘登录失败:", n), { success: !1, error: n.message };
  }
});
ve.handle("baidu-pan-get-auth-code", async () => {
  try {
    return { success: !0, data: await Se.getAuthCode() };
  } catch (e) {
    return console.error("获取百度云盘授权码失败:", e), { success: !1, error: e.message };
  }
});
ve.handle("baidu-pan-check-auth-code-status", async (e, t) => {
  try {
    return { success: !0, data: await Se.checkAuthCodeStatus(t) };
  } catch (n) {
    return console.error("检查百度云盘授权码状态失败:", n), { success: !1, error: n.message };
  }
});
ve.handle("baidu-pan-login-with-auth-code", async (e, t) => {
  try {
    return { success: !0, data: await Se.loginWithAuthCode(t) };
  } catch (n) {
    return console.error("使用授权码登录百度云盘失败:", n), { success: !1, error: n.message };
  }
});
ve.handle("baidu-pan-get-device-code", async () => {
  try {
    return { success: !0, data: await Se.getAuthCode() };
  } catch (e) {
    return console.error("获取百度云盘设备码失败:", e), { success: !1, error: e.message };
  }
});
ve.handle("baidu-pan-check-device-code-status", async (e, t) => {
  try {
    return { success: !0, data: await Se.checkAuthCodeStatus(t) };
  } catch (n) {
    return console.error("检查百度云盘设备码状态失败:", n), { success: !1, error: n.message };
  }
});
ve.handle("baidu-pan-login-with-device-code", async (e, t) => {
  try {
    return { success: !0, data: await Se.loginWithAuthCode(t) };
  } catch (n) {
    return console.error("使用设备码登录百度云盘失败:", n), { success: !1, error: n.message };
  }
});
ve.handle("baidu-pan-logout", async () => {
  try {
    return await Se.logout(), { success: !0 };
  } catch (e) {
    return console.error("百度云盘登出失败:", e), { success: !1, error: e.message };
  }
});
ve.handle("baidu-pan-verify-token", async () => {
  try {
    return { success: !0, data: await Se.verifyToken() };
  } catch (e) {
    return console.error("验证百度云盘令牌失败:", e), { success: !1, error: e.message };
  }
});
ve.handle("baidu-pan-get-user-info", async () => {
  try {
    return { success: !0, data: await Se.getUserInfo() };
  } catch (e) {
    return console.error("获取百度云盘用户信息失败:", e), { success: !1, error: e.message };
  }
});
ve.handle("baidu-pan-get-file-list", async (e, t, n) => {
  try {
    return { success: !0, data: await Se.getFileList(t, n) };
  } catch (r) {
    return console.error("获取百度云盘文件列表失败:", r), { success: !1, error: r.message };
  }
});
ve.handle("baidu-pan-get-audio-file-list", async (e, t, n) => {
  try {
    return { success: !0, data: await Se.getAudioFileList(t, n) };
  } catch (r) {
    return console.error("获取百度云盘音频文件列表失败:", r), { success: !1, error: r.message };
  }
});
ve.handle("baidu-pan-get-file-download-link", async (e, t) => {
  try {
    return { success: !0, data: await Se.getFileDownloadLink(t) };
  } catch (n) {
    return console.error("获取百度云盘文件下载链接失败:", n), { success: !1, error: n.message };
  }
});
ve.handle("baidu-pan-search-files", async (e, t, n) => {
  try {
    return { success: !0, data: await Se.searchFiles(t, n) };
  } catch (r) {
    return console.error("搜索百度云盘文件失败:", r), { success: !1, error: r.message };
  }
});
ve.handle("baidu-pan-search-audio-files", async (e, t, n) => {
  try {
    return { success: !0, data: await Se.searchAudioFiles(t, n) };
  } catch (r) {
    return console.error("搜索百度云盘音频文件失败:", r), { success: !1, error: r.message };
  }
});
ve.handle("baidu-pan-get-lyric-file", async (e, t) => {
  try {
    return { success: !0, data: await Se.getLyricFile(t) };
  } catch (n) {
    return console.error("获取百度云盘歌词文件失败:", n), { success: !1, error: n.message };
  }
});
ve.handle("baidu-pan-get-lyric-content", async (e, t) => {
  try {
    return { success: !0, data: await Se.getLyricContent(t) };
  } catch (n) {
    return console.error("获取百度云盘歌词内容失败:", n), { success: !1, error: n.message };
  }
});
export {
  zj as default
};
