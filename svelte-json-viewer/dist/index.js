var In = Object.defineProperty;
var Nn = (e, t, n) => t in e ? In(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ct = (e, t, n) => Nn(e, typeof t != "symbol" ? t + "" : t, n);
import { tick as kn } from "svelte";
const Rn = "5";
var Ut;
typeof window < "u" && ((Ut = window.__svelte ?? (window.__svelte = {})).v ?? (Ut.v = /* @__PURE__ */ new Set())).add(Rn);
const At = 1, Et = 2, Jt = 4, Vn = 8, Kn = 16, Mn = 1, Fn = 2, Z = Symbol(), Pn = "http://www.w3.org/1999/xhtml", Vt = !1;
var xt = Array.isArray, qn = Array.prototype.indexOf, Yt = Array.from, zn = Object.defineProperty, dt = Object.getOwnPropertyDescriptor, Wn = Object.getOwnPropertyDescriptors, Hn = Object.prototype, Bn = Array.prototype, Gt = Object.getPrototypeOf;
const Un = () => {
};
function Jn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
const oe = 2, Tt = 4, lt = 8, Ct = 16, we = 32, He = 64, Ot = 128, se = 256, Ye = 512, ue = 1024, pe = 2048, De = 4096, he = 8192, Lt = 16384, Xt = 32768, it = 65536, Kt = 1 << 17, Yn = 1 << 18, Zt = 1 << 19, yt = 1 << 20, Qt = 1 << 21, Ue = Symbol("$state"), Gn = Symbol(""), $t = new class extends Error {
  constructor() {
    super(...arguments);
    ct(this, "name", "StaleReactionError");
    ct(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function en(e) {
  return e === this.v;
}
function Xn(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function tn(e) {
  return !Xn(e, this.v);
}
function Zn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Qn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function $n(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function er() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function tr() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function nr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function rr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let ar = !1, ce = null;
function Mt(e) {
  ce = e;
}
function Ie(e, t = !1, n) {
  var r = ce = {
    p: ce,
    c: null,
    d: !1,
    e: null,
    m: !1,
    s: e,
    x: null,
    l: null
  };
  on(() => {
    r.d = !0;
  });
}
function Ne(e) {
  const t = ce;
  if (t !== null) {
    const i = t.e;
    if (i !== null) {
      var n = V, r = D;
      t.e = null;
      try {
        for (var a = 0; a < i.length; a++) {
          var l = i[a];
          Se(l.effect), ge(l.reaction), un(l.fn);
        }
      } finally {
        Se(n), ge(r);
      }
    }
    ce = t.p, t.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
function nn() {
  return !0;
}
function Me(e) {
  if (typeof e != "object" || e === null || Ue in e)
    return e;
  const t = Gt(e);
  if (t !== Hn && t !== Bn)
    return e;
  var n = /* @__PURE__ */ new Map(), r = xt(e), a = /* @__PURE__ */ re(0), l = D, i = (u) => {
    var f = D;
    ge(l);
    var v = u();
    return ge(f), v;
  };
  return r && n.set("length", /* @__PURE__ */ re(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(u, f, v) {
        (!("value" in v) || v.configurable === !1 || v.enumerable === !1 || v.writable === !1) && tr();
        var d = n.get(f);
        return d === void 0 ? d = i(() => {
          var c = /* @__PURE__ */ re(v.value);
          return n.set(f, c), c;
        }) : X(d, v.value, !0), !0;
      },
      deleteProperty(u, f) {
        var v = n.get(f);
        if (v === void 0) {
          if (f in u) {
            const s = i(() => /* @__PURE__ */ re(Z));
            n.set(f, s), _t(a);
          }
        } else {
          if (r && typeof f == "string") {
            var d = (
              /** @type {Source<number>} */
              n.get("length")
            ), c = Number(f);
            Number.isInteger(c) && c < d.v && X(d, c);
          }
          X(v, Z), _t(a);
        }
        return !0;
      },
      get(u, f, v) {
        var g;
        if (f === Ue)
          return e;
        var d = n.get(f), c = f in u;
        if (d === void 0 && (!c || (g = dt(u, f)) != null && g.writable) && (d = i(() => {
          var _ = Me(c ? u[f] : Z), A = /* @__PURE__ */ re(_);
          return A;
        }), n.set(f, d)), d !== void 0) {
          var s = o(d);
          return s === Z ? void 0 : s;
        }
        return Reflect.get(u, f, v);
      },
      getOwnPropertyDescriptor(u, f) {
        var v = Reflect.getOwnPropertyDescriptor(u, f);
        if (v && "value" in v) {
          var d = n.get(f);
          d && (v.value = o(d));
        } else if (v === void 0) {
          var c = n.get(f), s = c == null ? void 0 : c.v;
          if (c !== void 0 && s !== Z)
            return {
              enumerable: !0,
              configurable: !0,
              value: s,
              writable: !0
            };
        }
        return v;
      },
      has(u, f) {
        var s;
        if (f === Ue)
          return !0;
        var v = n.get(f), d = v !== void 0 && v.v !== Z || Reflect.has(u, f);
        if (v !== void 0 || V !== null && (!d || (s = dt(u, f)) != null && s.writable)) {
          v === void 0 && (v = i(() => {
            var g = d ? Me(u[f]) : Z, _ = /* @__PURE__ */ re(g);
            return _;
          }), n.set(f, v));
          var c = o(v);
          if (c === Z)
            return !1;
        }
        return d;
      },
      set(u, f, v, d) {
        var w;
        var c = n.get(f), s = f in u;
        if (r && f === "length")
          for (var g = v; g < /** @type {Source<number>} */
          c.v; g += 1) {
            var _ = n.get(g + "");
            _ !== void 0 ? X(_, Z) : g in u && (_ = i(() => /* @__PURE__ */ re(Z)), n.set(g + "", _));
          }
        if (c === void 0)
          (!s || (w = dt(u, f)) != null && w.writable) && (c = i(() => /* @__PURE__ */ re(void 0)), X(c, Me(v)), n.set(f, c));
        else {
          s = c.v !== Z;
          var A = i(() => Me(v));
          X(c, A);
        }
        var x = Reflect.getOwnPropertyDescriptor(u, f);
        if (x != null && x.set && x.set.call(d, v), !s) {
          if (r && typeof f == "string") {
            var I = (
              /** @type {Source<number>} */
              n.get("length")
            ), M = Number(f);
            Number.isInteger(M) && M >= I.v && X(I, M + 1);
          }
          _t(a);
        }
        return !0;
      },
      ownKeys(u) {
        o(a);
        var f = Reflect.ownKeys(u).filter((c) => {
          var s = n.get(c);
          return s === void 0 || s.v !== Z;
        });
        for (var [v, d] of n)
          d.v !== Z && !(v in u) && f.push(v);
        return f;
      },
      setPrototypeOf() {
        nr();
      }
    }
  );
}
function _t(e, t = 1) {
  X(e, e.v + t);
}
// @__NO_SIDE_EFFECTS__
function Dt(e) {
  var t = oe | pe, n = D !== null && D.f & oe ? (
    /** @type {Derived} */
    D
  ) : null;
  return V === null || n !== null && n.f & se ? t |= se : V.f |= Zt, {
    ctx: ce,
    deps: null,
    effects: null,
    equals: en,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      Z
    ),
    wv: 0,
    parent: n ?? V,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function C(e) {
  const t = /* @__PURE__ */ Dt(e);
  return yn(t), t;
}
// @__NO_SIDE_EFFECTS__
function lr(e) {
  const t = /* @__PURE__ */ Dt(e);
  return t.equals = tn, t;
}
function rn(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      ke(
        /** @type {Effect} */
        t[n]
      );
  }
}
function ir(e) {
  for (var t = e.parent; t !== null; ) {
    if (!(t.f & oe))
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function It(e) {
  var t, n = V;
  Se(ir(e));
  try {
    rn(e), t = wn(e);
  } finally {
    Se(n);
  }
  return t;
}
function an(e) {
  var t = It(e);
  if (e.equals(t) || (e.v = t, e.wv = hn()), !Oe) {
    var n = (je || e.f & se) && e.deps !== null ? De : ue;
    ye(e, n);
  }
}
const xe = /* @__PURE__ */ new Map();
function Ge(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: en,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function re(e, t) {
  const n = Ge(e);
  return yn(n), n;
}
// @__NO_SIDE_EFFECTS__
function sr(e, t = !1, n = !0) {
  const r = Ge(e);
  return t || (r.equals = tn), r;
}
function X(e, t, n = !1) {
  D !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!_e || D.f & Kt) && nn() && D.f & (oe | Ct | Kt) && !((U == null ? void 0 : U.reaction) === D && U.sources.includes(e)) && rr();
  let r = n ? Me(t) : t;
  return ht(e, r);
}
function ht(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    Oe ? xe.set(e, t) : xe.set(e, n), e.v = t, e.f & oe && (e.f & pe && It(
      /** @type {Derived} */
      e
    ), ye(e, e.f & se ? De : ue)), e.wv = hn(), ln(e, pe), V !== null && V.f & ue && !(V.f & (we | He)) && (fe === null ? br([e]) : fe.push(e));
  }
  return t;
}
function ln(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, a = 0; a < r; a++) {
      var l = n[a], i = l.f;
      i & pe || (ye(l, t), i & (ue | se) && (i & oe ? ln(
        /** @type {Derived} */
        l,
        De
      ) : ft(
        /** @type {Effect} */
        l
      )));
    }
}
let or = !1;
var ur, fr, vr;
function sn(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Xe(e) {
  return fr.call(e);
}
// @__NO_SIDE_EFFECTS__
function st(e) {
  return vr.call(e);
}
function Y(e, t) {
  return /* @__PURE__ */ Xe(e);
}
function q(e, t) {
  {
    var n = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Xe(
        /** @type {Node} */
        e
      )
    );
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ st(n) : n;
  }
}
function P(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ st(r);
  return r;
}
function cr(e) {
  e.textContent = "";
}
function dr(e) {
  V === null && D === null && $n(), D !== null && D.f & se && V === null && Qn(), Oe && Zn();
}
function _r(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Ve(e, t, n, r = !0) {
  var a = V, l = {
    ctx: ce,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | pe,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: a,
    b: a && a.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (n)
    try {
      Rt(l), l.f |= Xt;
    } catch (f) {
      throw ke(l), f;
    }
  else t !== null && ft(l);
  var i = n && l.deps === null && l.first === null && l.nodes_start === null && l.teardown === null && (l.f & (Zt | Ot)) === 0;
  if (!i && r && (a !== null && _r(l, a), D !== null && D.f & oe)) {
    var u = (
      /** @type {Derived} */
      D
    );
    (u.effects ?? (u.effects = [])).push(l);
  }
  return l;
}
function on(e) {
  const t = Ve(lt, null, !1);
  return ye(t, ue), t.teardown = e, t;
}
function pt(e) {
  dr();
  var t = V !== null && (V.f & we) !== 0 && ce !== null && !ce.m;
  if (t) {
    var n = (
      /** @type {ComponentContext} */
      ce
    );
    (n.e ?? (n.e = [])).push({
      fn: e,
      effect: V,
      reaction: D
    });
  } else
    return un(e);
}
function un(e) {
  return Ve(Tt | Qt, e, !1);
}
function gr(e) {
  return Ve(Tt, e, !1);
}
function yr(e) {
  return Ve(lt, e, !0);
}
function ae(e, t = [], n = Dt) {
  const r = t.map(n);
  return ot(() => e(...r.map(o)));
}
function ot(e, t = 0) {
  var n = Ve(lt | Ct | t, e, !0);
  return n;
}
function Pe(e, t = !0) {
  return Ve(lt | we, e, !0, t);
}
function fn(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = Oe, r = D;
    Ft(!0), ge(null);
    try {
      t.call(null);
    } finally {
      Ft(n), ge(r);
    }
  }
}
function vn(e, t = !1) {
  var a;
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    (a = n.ac) == null || a.abort($t);
    var r = n.next;
    n.f & He ? n.parent = null : ke(n, t), n = r;
  }
}
function hr(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    t.f & we || ke(t), t = n;
  }
}
function ke(e, t = !0) {
  var n = !1;
  (t || e.f & Yn) && e.nodes_start !== null && e.nodes_end !== null && (pr(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), n = !0), vn(e, t && !n), nt(e, 0), ye(e, Lt);
  var r = e.transitions;
  if (r !== null)
    for (const l of r)
      l.stop();
  fn(e);
  var a = e.parent;
  a !== null && a.first !== null && cn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function pr(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ st(e)
    );
    e.remove(), e = n;
  }
}
function cn(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function wt(e, t) {
  var n = [];
  Nt(e, n, !0), dn(n, () => {
    ke(e), t && t();
  });
}
function dn(e, t) {
  var n = e.length;
  if (n > 0) {
    var r = () => --n || t();
    for (var a of e)
      a.out(r);
  } else
    t();
}
function Nt(e, t, n) {
  if (!(e.f & he)) {
    if (e.f ^= he, e.transitions !== null)
      for (const i of e.transitions)
        (i.is_global || n) && t.push(i);
    for (var r = e.first; r !== null; ) {
      var a = r.next, l = (r.f & it) !== 0 || (r.f & we) !== 0;
      Nt(r, t, l ? n : !1), r = a;
    }
  }
}
function Ze(e) {
  _n(e, !0);
}
function _n(e, t) {
  if (e.f & he) {
    e.f ^= he;
    for (var n = e.first; n !== null; ) {
      var r = n.next, a = (n.f & it) !== 0 || (n.f & we) !== 0;
      _n(n, a ? t : !1), n = r;
    }
    if (e.transitions !== null)
      for (const l of e.transitions)
        (l.is_global || t) && l.in();
  }
}
let Qe = [];
function wr() {
  var e = Qe;
  Qe = [], Jn(e);
}
function kt(e) {
  Qe.length === 0 && queueMicrotask(wr), Qe.push(e);
}
function mr(e) {
  var t = (
    /** @type {Effect} */
    V
  );
  if (t.f & Xt)
    gn(e, t);
  else {
    if (!(t.f & Ot))
      throw e;
    t.fn(e);
  }
}
function gn(e, t) {
  for (; t !== null; ) {
    if (t.f & Ot)
      try {
        t.b.error(e);
        return;
      } catch {
      }
    t = t.parent;
  }
  throw e;
}
let mt = !1, $e = null, Te = !1, Oe = !1;
function Ft(e) {
  Oe = e;
}
let Je = [];
let D = null, _e = !1;
function ge(e) {
  D = e;
}
let V = null;
function Se(e) {
  V = e;
}
let U = null;
function yn(e) {
  D !== null && D.f & yt && (U === null ? U = { reaction: D, sources: [e] } : U.sources.push(e));
}
let Q = null, ie = 0, fe = null;
function br(e) {
  fe = e;
}
let et = 1, tt = 0, je = !1;
function hn() {
  return ++et;
}
function ut(e) {
  var c;
  var t = e.f;
  if (t & pe)
    return !0;
  if (t & De) {
    var n = e.deps, r = (t & se) !== 0;
    if (n !== null) {
      var a, l, i = (t & Ye) !== 0, u = r && V !== null && !je, f = n.length;
      if (i || u) {
        var v = (
          /** @type {Derived} */
          e
        ), d = v.parent;
        for (a = 0; a < f; a++)
          l = n[a], (i || !((c = l == null ? void 0 : l.reactions) != null && c.includes(v))) && (l.reactions ?? (l.reactions = [])).push(v);
        i && (v.f ^= Ye), u && d !== null && !(d.f & se) && (v.f ^= se);
      }
      for (a = 0; a < f; a++)
        if (l = n[a], ut(
          /** @type {Derived} */
          l
        ) && an(
          /** @type {Derived} */
          l
        ), l.wv > e.wv)
          return !0;
    }
    (!r || V !== null && !je) && ye(e, ue);
  }
  return !1;
}
function pn(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null)
    for (var a = 0; a < r.length; a++) {
      var l = r[a];
      (U == null ? void 0 : U.reaction) === D && U.sources.includes(e) || (l.f & oe ? pn(
        /** @type {Derived} */
        l,
        t,
        !1
      ) : t === l && (n ? ye(l, pe) : l.f & ue && ye(l, De), ft(
        /** @type {Effect} */
        l
      )));
    }
}
function wn(e) {
  var g;
  var t = Q, n = ie, r = fe, a = D, l = je, i = U, u = ce, f = _e, v = e.f;
  Q = /** @type {null | Value[]} */
  null, ie = 0, fe = null, je = (v & se) !== 0 && (_e || !Te || D === null), D = v & (we | He) ? null : e, U = null, Mt(e.ctx), _e = !1, ++tt, e.f |= yt, e.ac !== null && (e.ac.abort($t), e.ac = null);
  try {
    var d = (
      /** @type {Function} */
      (0, e.fn)()
    ), c = e.deps;
    if (Q !== null) {
      var s;
      if (nt(e, ie), c !== null && ie > 0)
        for (c.length = ie + Q.length, s = 0; s < Q.length; s++)
          c[ie + s] = Q[s];
      else
        e.deps = c = Q;
      if (!je || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      v & oe && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (s = ie; s < c.length; s++)
          ((g = c[s]).reactions ?? (g.reactions = [])).push(e);
    } else c !== null && ie < c.length && (nt(e, ie), c.length = ie);
    if (nn() && fe !== null && !_e && c !== null && !(e.f & (oe | De | pe)))
      for (s = 0; s < /** @type {Source[]} */
      fe.length; s++)
        pn(
          fe[s],
          /** @type {Effect} */
          e
        );
    return a !== null && a !== e && (tt++, fe !== null && (r === null ? r = fe : r.push(.../** @type {Source[]} */
    fe))), d;
  } catch (_) {
    mr(_);
  } finally {
    Q = t, ie = n, fe = r, D = a, je = l, U = i, Mt(u), _e = f, e.f ^= yt;
  }
}
function jr(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = qn.call(n, e);
    if (r !== -1) {
      var a = n.length - 1;
      a === 0 ? n = t.reactions = null : (n[r] = n[a], n.pop());
    }
  }
  n === null && t.f & oe && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Q === null || !Q.includes(t)) && (ye(t, De), t.f & (se | Ye) || (t.f ^= Ye), rn(
    /** @type {Derived} **/
    t
  ), nt(
    /** @type {Derived} **/
    t,
    0
  ));
}
function nt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      jr(e, n[r]);
}
function Rt(e) {
  var t = e.f;
  if (!(t & Lt)) {
    ye(e, ue);
    var n = V, r = Te;
    V = e, Te = !0;
    try {
      t & Ct ? hr(e) : vn(e), fn(e);
      var a = wn(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = et;
      var l;
      Vt && ar && e.f & pe && e.deps;
    } finally {
      Te = r, V = n;
    }
  }
}
function Sr() {
  try {
    er();
  } catch (e) {
    if ($e !== null)
      gn(e, $e);
    else
      throw e;
  }
}
function Ar() {
  var e = Te;
  try {
    var t = 0;
    for (Te = !0; Je.length > 0; ) {
      t++ > 1e3 && Sr();
      var n = Je, r = n.length;
      Je = [];
      for (var a = 0; a < r; a++) {
        var l = xr(n[a]);
        Er(l);
      }
      xe.clear();
    }
  } finally {
    mt = !1, Te = e, $e = null;
  }
}
function Er(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; n++) {
      var r = e[n];
      if (!(r.f & (Lt | he)) && ut(r)) {
        var a = et;
        if (Rt(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? cn(r) : r.fn = null), et > a && r.f & Qt)
          break;
      }
    }
    for (; n < t; n += 1)
      ft(e[n]);
  }
}
function ft(e) {
  mt || (mt = !0, queueMicrotask(Ar));
  for (var t = $e = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (n & (He | we)) {
      if (!(n & ue)) return;
      t.f ^= ue;
    }
  }
  Je.push(t);
}
function xr(e) {
  for (var t = [], n = e; n !== null; ) {
    var r = n.f, a = (r & (we | He)) !== 0, l = a && (r & ue) !== 0;
    if (!l && !(r & he)) {
      r & Tt ? t.push(n) : a ? n.f ^= ue : ut(n) && Rt(n);
      var i = n.first;
      if (i !== null) {
        n = i;
        continue;
      }
    }
    var u = n.parent;
    for (n = n.next; n === null && u !== null; )
      n = u.next, u = u.parent;
  }
  return t;
}
function o(e) {
  var t = e.f, n = (t & oe) !== 0;
  if (D !== null && !_e) {
    if ((U == null ? void 0 : U.reaction) !== D || !(U != null && U.sources.includes(e))) {
      var r = D.deps;
      e.rv < tt && (e.rv = tt, Q === null && r !== null && r[ie] === e ? ie++ : Q === null ? Q = [e] : (!je || !Q.includes(e)) && Q.push(e));
    }
  } else if (n && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var a = (
      /** @type {Derived} */
      e
    ), l = a.parent;
    l !== null && !(l.f & se) && (a.f ^= se);
  }
  if (n && !Oe && (a = /** @type {Derived} */
  e, ut(a) && an(a)), Oe) {
    if (xe.has(e))
      return xe.get(e);
    if (n) {
      a = /** @type {Derived} */
      e;
      var i = a.v;
      return (a.f & ue || mn(a)) && (i = It(a)), xe.set(a, i), i;
    }
  }
  return e.v;
}
function mn(e) {
  if (e.v === Z) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (xe.has(t) || t.f & oe && mn(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Tr(e) {
  var t = _e;
  try {
    return _e = !0, e();
  } finally {
    _e = t;
  }
}
const Cr = -7169;
function ye(e, t) {
  e.f = e.f & Cr | t;
}
function Or(e) {
  var t = D, n = V;
  ge(null), Se(null);
  try {
    return e();
  } finally {
    ge(t), Se(n);
  }
}
const Lr = /* @__PURE__ */ new Set(), Dr = /* @__PURE__ */ new Set();
function Ir(e, t, n, r = {}) {
  function a(l) {
    if (r.capture || Nr.call(t, l), !l.cancelBubble)
      return Or(() => n == null ? void 0 : n.call(this, l));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? kt(() => {
    t.addEventListener(e, a, r);
  }) : t.addEventListener(e, a, r), a;
}
function Pt(e, t, n, r, a) {
  var l = { capture: r, passive: a }, i = Ir(e, t, n, l);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && on(() => {
    t.removeEventListener(e, i, l);
  });
}
function bn(e) {
  for (var t = 0; t < e.length; t++)
    Lr.add(e[t]);
  for (var n of Dr)
    n(e);
}
function Nr(e) {
  var M;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, a = ((M = e.composedPath) == null ? void 0 : M.call(e)) || [], l = (
    /** @type {null | Element} */
    a[0] || e.target
  ), i = 0, u = e.__root;
  if (u) {
    var f = a.indexOf(u);
    if (f !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var v = a.indexOf(t);
    if (v === -1)
      return;
    f <= v && (i = f);
  }
  if (l = /** @type {Element} */
  a[i] || e.target, l !== t) {
    zn(e, "currentTarget", {
      configurable: !0,
      get() {
        return l || n;
      }
    });
    var d = D, c = V;
    ge(null), Se(null);
    try {
      for (var s, g = []; l !== null; ) {
        var _ = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var A = l["__" + r];
          if (A != null && (!/** @type {any} */
          l.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === l))
            if (xt(A)) {
              var [x, ...I] = A;
              x.apply(l, [e, ...I]);
            } else
              A.call(l, e);
        } catch (w) {
          s ? g.push(w) : s = w;
        }
        if (e.cancelBubble || _ === t || _ === null)
          break;
        l = _;
      }
      if (s) {
        for (let w of g)
          queueMicrotask(() => {
            throw w;
          });
        throw s;
      }
    } finally {
      e.__root = t, delete e.currentTarget, ge(d), Se(c);
    }
  }
}
function kr(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function bt(e, t) {
  var n = (
    /** @type {Effect} */
    V
  );
  n.nodes_start === null && (n.nodes_start = e, n.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function j(e, t) {
  var n = (t & Mn) !== 0, r = (t & Fn) !== 0, a, l = !e.startsWith("<!>");
  return () => {
    a === void 0 && (a = kr(l ? e : "<!>" + e), n || (a = /** @type {Node} */
    /* @__PURE__ */ Xe(a)));
    var i = (
      /** @type {TemplateNode} */
      r || ur ? document.importNode(a, !0) : a.cloneNode(!0)
    );
    if (n) {
      var u = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Xe(i)
      ), f = (
        /** @type {TemplateNode} */
        i.lastChild
      );
      bt(u, f);
    } else
      bt(i, i);
    return i;
  };
}
function ve() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = sn();
  return e.append(t, n), bt(t, n), e;
}
function h(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function Ce(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = n, e.nodeValue = n + "");
}
function Ke(e, t, ...n) {
  var r = e, a = Un, l;
  ot(() => {
    a !== (a = t()) && (l && (ke(l), l = null), l = Pe(() => (
      /** @type {SnippetFn} */
      a(r, ...n)
    )));
  }, it);
}
function S(e, t, [n, r] = [0, 0]) {
  var a = e, l = null, i = null, u = Z, f = n > 0 ? it : 0, v = !1;
  const d = (s, g = !0) => {
    v = !0, c(g, s);
  }, c = (s, g) => {
    u !== (u = s) && (u ? (l ? Ze(l) : g && (l = Pe(() => g(a))), i && wt(i, () => {
      i = null;
    })) : (i ? Ze(i) : g && (i = Pe(() => g(a, [n + 1, r]))), l && wt(l, () => {
      l = null;
    })));
  };
  ot(() => {
    v = !1, t(d), v || c(null, null);
  }, f);
}
function qt(e, t) {
  return t;
}
function Rr(e, t, n, r) {
  for (var a = [], l = t.length, i = 0; i < l; i++)
    Nt(t[i].e, a, !0);
  var u = l > 0 && a.length === 0 && n !== null;
  if (u) {
    var f = (
      /** @type {Element} */
      /** @type {Element} */
      n.parentNode
    );
    cr(f), f.append(
      /** @type {Element} */
      n
    ), r.clear(), be(e, t[0].prev, t[l - 1].next);
  }
  dn(a, () => {
    for (var v = 0; v < l; v++) {
      var d = t[v];
      u || (r.delete(d.k), be(e, d.prev, d.next)), ke(d.e, !u);
    }
  });
}
function rt(e, t, n, r, a, l = null) {
  var i = e, u = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, f = (t & Jt) !== 0;
  if (f) {
    var v = (
      /** @type {Element} */
      e
    );
    i = v.appendChild(sn());
  }
  var d = null, c = !1, s = /* @__PURE__ */ lr(() => {
    var g = n();
    return xt(g) ? g : g == null ? [] : Yt(g);
  });
  ot(() => {
    var g = o(s), _ = g.length;
    c && _ === 0 || (c = _ === 0, Vr(g, u, i, a, t, r, n), l !== null && (_ === 0 ? d ? Ze(d) : d = Pe(() => l(i)) : d !== null && wt(d, () => {
      d = null;
    })), o(s));
  });
}
function Vr(e, t, n, r, a, l, i) {
  var E, W, le, B;
  var u = (a & Vn) !== 0, f = (a & (At | Et)) !== 0, v = e.length, d = t.items, c = t.first, s = c, g, _ = null, A, x = [], I = [], M, w, y, m;
  if (u)
    for (m = 0; m < v; m += 1)
      M = e[m], w = l(M, m), y = d.get(w), y !== void 0 && ((E = y.a) == null || E.measure(), (A ?? (A = /* @__PURE__ */ new Set())).add(y));
  for (m = 0; m < v; m += 1) {
    if (M = e[m], w = l(M, m), y = d.get(w), y === void 0) {
      var R = s ? (
        /** @type {TemplateNode} */
        s.e.nodes_start
      ) : n;
      _ = Mr(
        R,
        t,
        _,
        _ === null ? t.first : _.next,
        M,
        w,
        m,
        r,
        a,
        i
      ), d.set(w, _), x = [], I = [], s = _.next;
      continue;
    }
    if (f && Kr(y, M, m, a), y.e.f & he && (Ze(y.e), u && ((W = y.a) == null || W.unfix(), (A ?? (A = /* @__PURE__ */ new Set())).delete(y))), y !== s) {
      if (g !== void 0 && g.has(y)) {
        if (x.length < I.length) {
          var F = I[0], O;
          _ = F.prev;
          var J = x[0], H = x[x.length - 1];
          for (O = 0; O < x.length; O += 1)
            zt(x[O], F, n);
          for (O = 0; O < I.length; O += 1)
            g.delete(I[O]);
          be(t, J.prev, H.next), be(t, _, J), be(t, H, F), s = F, _ = H, m -= 1, x = [], I = [];
        } else
          g.delete(y), zt(y, s, n), be(t, y.prev, y.next), be(t, y, _ === null ? t.first : _.next), be(t, _, y), _ = y;
        continue;
      }
      for (x = [], I = []; s !== null && s.k !== w; )
        s.e.f & he || (g ?? (g = /* @__PURE__ */ new Set())).add(s), I.push(s), s = s.next;
      if (s === null)
        continue;
      y = s;
    }
    x.push(y), _ = y, s = y.next;
  }
  if (s !== null || g !== void 0) {
    for (var T = g === void 0 ? [] : Yt(g); s !== null; )
      s.e.f & he || T.push(s), s = s.next;
    var L = T.length;
    if (L > 0) {
      var N = a & Jt && v === 0 ? n : null;
      if (u) {
        for (m = 0; m < L; m += 1)
          (le = T[m].a) == null || le.measure();
        for (m = 0; m < L; m += 1)
          (B = T[m].a) == null || B.fix();
      }
      Rr(t, T, N, d);
    }
  }
  u && kt(() => {
    var z;
    if (A !== void 0)
      for (y of A)
        (z = y.a) == null || z.apply();
  }), V.first = t.first && t.first.e, V.last = _ && _.e;
}
function Kr(e, t, n, r) {
  r & At && ht(e.v, t), r & Et ? ht(
    /** @type {Value<number>} */
    e.i,
    n
  ) : e.i = n;
}
function Mr(e, t, n, r, a, l, i, u, f, v) {
  var d = (f & At) !== 0, c = (f & Kn) === 0, s = d ? c ? /* @__PURE__ */ sr(a, !1, !1) : Ge(a) : a, g = f & Et ? Ge(i) : i, _ = {
    i: g,
    v: s,
    k: l,
    a: null,
    // @ts-expect-error
    e: null,
    prev: n,
    next: r
  };
  try {
    return _.e = Pe(() => u(e, s, g, v), or), _.e.prev = n && n.e, _.e.next = r && r.e, n === null ? t.first = _ : (n.next = _, n.e.next = _.e), r !== null && (r.prev = _, r.e.prev = _.e), _;
  } finally {
  }
}
function zt(e, t, n) {
  for (var r = e.next ? (
    /** @type {TemplateNode} */
    e.next.e.nodes_start
  ) : n, a = t ? (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ) : n, l = (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ); l !== r; ) {
    var i = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ st(l)
    );
    a.before(l), l = i;
  }
}
function be(e, t, n) {
  t === null ? e.first = n : (t.next = n, t.e.next = n && n.e), n !== null && (n.prev = t, n.e.prev = t && t.e);
}
const Wt = [...` 	
\r\f \v\uFEFF`];
function Fr(e, t, n) {
  var r = e == null ? "" : "" + e;
  if (t && (r = r ? r + " " + t : t), n) {
    for (var a in n)
      if (n[a])
        r = r ? r + " " + a : a;
      else if (r.length)
        for (var l = a.length, i = 0; (i = r.indexOf(a, i)) >= 0; ) {
          var u = i + l;
          (i === 0 || Wt.includes(r[i - 1])) && (u === r.length || Wt.includes(r[u])) ? r = (i === 0 ? "" : r.substring(0, i)) + r.substring(u + 1) : i = u;
        }
  }
  return r === "" ? null : r;
}
function Pr(e, t) {
  return e == null ? null : String(e);
}
function Be(e, t, n, r, a, l) {
  var i = e.__className;
  if (i !== n || i === void 0) {
    var u = Fr(n, r, l);
    u == null ? e.removeAttribute("class") : e.className = u, e.__className = n;
  } else if (l && a !== l)
    for (var f in l) {
      var v = !!l[f];
      (a == null || v !== !!a[f]) && e.classList.toggle(f, v);
    }
  return l;
}
function at(e, t, n, r) {
  var a = e.__style;
  if (a !== t) {
    var l = Pr(t);
    l == null ? e.removeAttribute("style") : e.style.cssText = l, e.__style = t;
  }
  return r;
}
const qr = Symbol("is custom element"), zr = Symbol("is html");
function jt(e, t, n, r) {
  var a = Wr(e);
  a[t] !== (a[t] = n) && (t === "loading" && (e[Gn] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Hr(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Wr(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ?? (e.__attributes = {
      [qr]: e.nodeName.includes("-"),
      [zr]: e.namespaceURI === Pn
    })
  );
}
var Ht = /* @__PURE__ */ new Map();
function Hr(e) {
  var t = Ht.get(e.nodeName);
  if (t) return t;
  Ht.set(e.nodeName, t = []);
  for (var n, r = e, a = Element.prototype; a !== r; ) {
    n = Wn(r);
    for (var l in n)
      n[l].set && t.push(l);
    r = Gt(r);
  }
  return t;
}
function Bt(e, t) {
  return e === t || (e == null ? void 0 : e[Ue]) === t;
}
function jn(e = {}, t, n, r) {
  return gr(() => {
    var a, l;
    return yr(() => {
      a = l, l = [], Tr(() => {
        e !== n(...l) && (t(e, ...l), a && Bt(n(...a), e) && t(null, ...a));
      });
    }), () => {
      kt(() => {
        l && Bt(n(...l), e) && t(null, ...l);
      });
    };
  }), e;
}
function p(e, t, n, r) {
  var a = (
    /** @type {V} */
    r
  ), l = !0, i = () => (l && (l = !1, a = /** @type {V} */
  r), a), u;
  u = /** @type {V} */
  e[t], u === void 0 && r !== void 0 && (u = i());
  var f;
  return f = () => {
    var v = (
      /** @type {V} */
      e[t]
    );
    return v === void 0 ? i() : (l = !0, v);
  }, f;
}
function Sn(e) {
  if (e === null) return "null";
  if (e === void 0) return "undefined";
  if (Array.isArray(e)) return "array";
  const t = typeof e;
  return t === "number" ? isNaN(e) ? "nan" : e % 1 !== 0 ? "float" : "integer" : t === "object" && e instanceof Date ? "date" : t;
}
function Le(e) {
  return Array.isArray(e) || typeof e == "object" && e !== null && !(e instanceof Date);
}
function Br(e) {
  return Array.isArray(e) ? e.length : typeof e == "object" && e !== null ? Object.keys(e).length : 0;
}
function Ur(e, t) {
  return typeof t == "boolean" ? t : e >= t;
}
function Jr(e, t) {
  return typeof t != "number" ? !1 : e.length > t;
}
function An(e, t) {
  return e.length <= t ? e : e.substring(0, t);
}
function En(e) {
  return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}
function qa(e, t) {
  return [...e, String(t)];
}
function za(e) {
  return e.join(".");
}
function Yr(e, t, n) {
  if (!t) return !1;
  let r;
  return typeof t == "number" ? r = t : r = 40, St(e, n).length <= r;
}
function St(e, t) {
  return Array.isArray(e) ? `[${e.map((r) => Le(r) ? St(r, t) : gt(r, t)).join(", ")}]` : typeof e == "object" && e !== null && !(e instanceof Date) ? `{${Object.entries(e).map(([r, a]) => {
    const l = Le(a) ? St(a, t) : gt(a, t);
    return `"${r}": ${l}`;
  }).join(", ")}}` : gt(e, t);
}
function gt(e, t) {
  if (e === null) return "null";
  if (e === void 0) return "undefined";
  if (typeof e == "string") {
    let n = e;
    return t && n.length > t && (n = An(n, t) + "..."), `"${En(n)}"`;
  }
  return typeof e == "number" ? isNaN(e) ? "NaN" : e === 1 / 0 ? "Infinity" : e === -1 / 0 ? "-Infinity" : String(e) : typeof e == "boolean" ? String(e) : e instanceof Date ? e.toISOString() : String(e);
}
const xn = {
  light: {
    "--json-viewer-bg": "#ffffff",
    "--json-viewer-string-color": "#d73a49",
    "--json-viewer-number-color": "#005cc5",
    "--json-viewer-boolean-color": "#d73a49",
    "--json-viewer-null-color": "#6f42c1",
    "--json-viewer-date-color": "#6a737d",
    "--json-viewer-special-bg": "rgba(111, 66, 193, 0.1)",
    "--json-viewer-property-color": "#032f62",
    "--json-viewer-brace-color": "#24292e",
    "--json-viewer-bracket-color": "#24292e",
    "--json-viewer-comma-color": "#24292e",
    "--json-viewer-colon-color": "#24292e",
    "--json-viewer-meta-color": "#6a737d",
    "--json-viewer-ellipsis-color": "#6a737d",
    "--json-viewer-hover-bg": "#f6f8fa",
    "--json-viewer-border-color": "#e1e4e8",
    "--json-viewer-indent-guide-color": "#e1e4e8",
    "--json-viewer-expand-icon-color": "#586069",
    "--json-viewer-expand-icon-hover-color": "#0366d6"
  },
  dark: {
    "--json-viewer-bg": "#24292e",
    "--json-viewer-string-color": "#9ecbff",
    "--json-viewer-number-color": "#79b8ff",
    "--json-viewer-boolean-color": "#f97583",
    "--json-viewer-null-color": "#b392f0",
    "--json-viewer-date-color": "#6a737d",
    "--json-viewer-special-bg": "rgba(179, 146, 240, 0.1)",
    "--json-viewer-property-color": "#e1e4e8",
    "--json-viewer-brace-color": "#e1e4e8",
    "--json-viewer-bracket-color": "#e1e4e8",
    "--json-viewer-comma-color": "#e1e4e8",
    "--json-viewer-colon-color": "#e1e4e8",
    "--json-viewer-meta-color": "#6a737d",
    "--json-viewer-ellipsis-color": "#6a737d",
    "--json-viewer-hover-bg": "#2f363d",
    "--json-viewer-border-color": "#444d56",
    "--json-viewer-indent-guide-color": "#444d56",
    "--json-viewer-expand-icon-color": "#959da5",
    "--json-viewer-expand-icon-hover-color": "#79b8ff"
  }
};
function Wa(e) {
  const t = xn[e];
  return Object.entries(t).map(([n, r]) => `${n}: ${r};`).join(`
`);
}
function Gr(e, t) {
  const n = xn[t];
  Object.entries(n).forEach(([r, a]) => {
    e.style.setProperty(r, a);
  });
}
var Xr = /* @__PURE__ */ j('<span class="json-meta svelte-7teum4"> </span>');
function Tn(e, t) {
  Ie(t, !0);
  const n = p(t, "displayObjectSize", 3, !0);
  p(t, "displayArrayKey", 3, !0);
  const r = /* @__PURE__ */ C(() => Br(t.value)), a = /* @__PURE__ */ C(() => Array.isArray(t.value)), l = /* @__PURE__ */ C(() => typeof t.value == "object" && t.value !== null && !Array.isArray(t.value)), i = /* @__PURE__ */ C(() => n() && (o(a) || o(l)) && o(r) > 0), u = /* @__PURE__ */ C(() => o(a) ? o(r) === 1 ? "1 item" : `${o(r)} items` : o(l) ? o(r) === 1 ? "1 key" : `${o(r)} keys` : "");
  var f = ve(), v = q(f);
  {
    var d = (c) => {
      var s = Xr(), g = Y(s);
      ae(() => Ce(g, o(u))), h(c, s);
    };
    S(v, (c) => {
      o(i) && c(d);
    });
  }
  h(e, f), Ne();
}
var Zr = /* @__PURE__ */ j('<span class="json-property svelte-1juhblb"> </span><span class="json-colon svelte-1juhblb">:&nbsp;</span>', 1);
function Fe(e, t) {
  const n = p(t, "displayArrayKey", 3, !0), r = p(t, "isArrayIndex", 3, !1), a = /* @__PURE__ */ C(() => !r() || n()), l = /* @__PURE__ */ C(() => r() ? `[${t.name}]` : `"${t.name}"`);
  var i = ve(), u = q(i);
  {
    var f = (v) => {
      var d = Zr(), c = q(d), s = Y(c);
      ae(() => Ce(s, o(l))), h(v, d);
    };
    S(u, (v) => {
      o(a) && v(f);
    });
  }
  h(e, i);
}
var Qr = /* @__PURE__ */ j('<span class="json-ellipsis svelte-od3rcy">...</span>'), $r = /* @__PURE__ */ j('<span class="json-truncate-indicator svelte-od3rcy"> </span>'), ea = /* @__PURE__ */ j('<span class="json-string svelte-od3rcy"><span class="json-quote svelte-od3rcy">"</span><span> <!></span><span class="json-quote svelte-od3rcy">"</span><!></span>');
function ta(e, t) {
  Ie(t, !0);
  const n = p(t, "collapseStringsAfterLength", 3, 50);
  let r = /* @__PURE__ */ re(!1);
  const a = /* @__PURE__ */ C(() => Jr(t.value, n())), l = /* @__PURE__ */ C(() => En(t.value)), i = /* @__PURE__ */ C(() => o(a) && !o(r) && n() ? An(o(l), n()) : o(l)), u = /* @__PURE__ */ C(() => o(a) && !o(r)), f = /* @__PURE__ */ C(() => o(a) && !o(r) && n() ? n() : null);
  function v() {
    o(a) && X(r, !o(r));
  }
  function d(w) {
    o(a) && (w.key === "Enter" || w.key === " ") && (w.preventDefault(), v());
  }
  var c = ea(), s = P(Y(c));
  let g;
  s.__click = function(...w) {
    var y;
    (y = o(a) ? v : void 0) == null || y.apply(this, w);
  }, s.__keydown = function(...w) {
    var y;
    (y = o(a) ? d : void 0) == null || y.apply(this, w);
  };
  var _ = Y(s), A = P(_);
  {
    var x = (w) => {
      var y = Qr();
      h(w, y);
    };
    S(A, (w) => {
      o(u) && w(x);
    });
  }
  var I = P(s, 2);
  {
    var M = (w) => {
      var y = $r(), m = Y(y);
      ae(() => Ce(m, `${t.value.length ?? ""} chars`)), h(w, y);
    };
    S(I, (w) => {
      o(f) && w(M);
    });
  }
  ae(
    (w) => {
      g = Be(s, 1, "json-string-content svelte-od3rcy", null, g, w), jt(s, "role", o(a) ? "button" : void 0), jt(s, "tabindex", o(a) ? 0 : void 0), Ce(_, o(i));
    },
    [() => ({ clickable: o(a) })]
  ), h(e, c), Ne();
}
bn(["click", "keydown"]);
var na = /* @__PURE__ */ j('<span class="json-data-type svelte-feu0by"> </span>'), ra = /* @__PURE__ */ j('<span class="json-special-value svelte-feu0by"> </span>'), aa = /* @__PURE__ */ j('<span class="json-primitive-value svelte-feu0by"> </span>'), la = /* @__PURE__ */ j("<span><!><!></span>");
function qe(e, t) {
  Ie(t, !0);
  const n = p(t, "displayDataTypes", 3, !1), r = p(t, "collapseStringsAfterLength", 3, 50), a = /* @__PURE__ */ C(() => Sn(t.value)), l = /* @__PURE__ */ C(() => {
    switch (o(a)) {
      case "string":
        return t.value;
      case "integer":
      case "float":
        return String(t.value);
      case "boolean":
        return String(t.value);
      case "null":
        return "null";
      case "undefined":
        return "undefined";
      case "nan":
        return "NaN";
      case "date":
        return t.value.toISOString();
      default:
        return String(t.value);
    }
  });
  var i = la(), u = Y(i);
  {
    var f = (s) => {
      var g = na(), _ = Y(g);
      ae(() => Ce(_, o(a))), h(s, g);
    };
    S(u, (s) => {
      n() && s(f);
    });
  }
  var v = P(u);
  {
    var d = (s) => {
      ta(s, {
        get value() {
          return t.value;
        },
        get collapseStringsAfterLength() {
          return r();
        }
      });
    }, c = (s, g) => {
      {
        var _ = (x) => {
          var I = ra(), M = Y(I);
          ae(() => Ce(M, o(l))), h(x, I);
        }, A = (x) => {
          var I = aa(), M = Y(I);
          ae(() => Ce(M, o(l))), h(x, I);
        };
        S(
          s,
          (x) => {
            o(a) === "null" || o(a) === "undefined" || o(a) === "nan" ? x(_) : x(A, !1);
          },
          g
        );
      }
    };
    S(v, (s) => {
      o(a) === "string" ? s(d) : s(c, !1);
    });
  }
  ae(() => Be(i, 1, `json-value json-${o(a) ?? ""}`, "svelte-feu0by")), h(e, i), Ne();
}
var ia = /* @__PURE__ */ j('<button><svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="svelte-1f2qjvn"><path d="M4 3L8 6L4 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>');
function sa(e, t) {
  var n = ia();
  let r;
  n.__click = function(...a) {
    var l;
    (l = t.onclick) == null || l.apply(this, a);
  }, ae(
    (a) => {
      r = Be(n, 1, "expand-icon svelte-1f2qjvn", null, r, a), jt(n, "aria-label", t.expanded ? "Collapse" : "Expand");
    },
    [() => ({ expanded: t.expanded })]
  ), h(e, n);
}
bn(["click"]);
var oa = /* @__PURE__ */ j('<div class="json-inline-content svelte-qeej9p"><!></div>'), ua = /* @__PURE__ */ j("<!> <!>", 1), fa = /* @__PURE__ */ j('<div role="group"><div class="json-container-header svelte-qeej9p"><!> <!> <!></div></div>');
function Cn(e, t) {
  Ie(t, !0);
  const n = p(t, "depth", 3, 0), r = p(t, "collapsed", 3, !1), a = p(t, "displayArrayKey", 3, !0), l = p(t, "collapseStringsAfterLength", 3, 50), i = p(t, "indentWidth", 3, 12);
  p(t, "isLast", 3, !1);
  const u = p(t, "isRoot", 3, !1), f = p(t, "inlineShortContainers", 3, !1), v = p(t, "inline", 3, !1), d = /* @__PURE__ */ C(() => `margin-left: ${u() ? 0 : i()}px`), c = /* @__PURE__ */ C(() => Yr(t.value, f(), l())), s = /* @__PURE__ */ C(() => Ur(n(), r()) || o(c));
  let g = /* @__PURE__ */ re(!0);
  pt(() => {
    X(g, !o(s));
  });
  let _ = /* @__PURE__ */ re(!1), A = /* @__PURE__ */ re(void 0), x = /* @__PURE__ */ re(0), I = /* @__PURE__ */ re(!1);
  const M = 20;
  pt(() => {
    o(c) && o(A) && !o(g) && t.hasItems ? kn().then(() => {
      o(A) && (X(x, o(A).clientHeight, !0), X(I, !0));
    }) : X(I, !0);
  });
  const w = /* @__PURE__ */ C(() => o(x) <= M * 1.2), y = /* @__PURE__ */ C(() => o(c) && o(I) && o(w)), m = /* @__PURE__ */ C(() => !o(c) || o(I) && !o(w));
  function R() {
    X(g, !o(g));
  }
  var F = ve(), O = q(F);
  {
    var J = (T) => {
      var L = ve(), N = q(L);
      Ke(N, () => t.inlineView), h(T, L);
    }, H = (T) => {
      var L = fa();
      let N;
      var E = Y(L), W = Y(E);
      {
        var le = (b) => {
          sa(b, {
            get expanded() {
              return o(g);
            },
            onclick: R
          });
        };
        S(W, (b) => {
          t.hasItems && b(le);
        });
      }
      var B = P(W, 2);
      {
        var z = (b) => {
          Fe(b, {
            get name() {
              return t.name;
            },
            get displayArrayKey() {
              return a();
            },
            isArrayIndex: !1
          });
        };
        S(B, (b) => {
          t.name !== void 0 && b(z);
        });
      }
      var G = P(B, 2);
      {
        var $ = (b) => {
          var K = ve(), k = q(K);
          Ke(k, () => t.emptyView), h(b, K);
        }, ee = (b, K) => {
          {
            var k = (de) => {
              var ne = ve(), Re = q(ne);
              Ke(Re, () => t.expandedView), h(de, ne);
            }, te = (de) => {
              var ne = ua(), Re = q(ne);
              {
                var me = (Ae) => {
                  var Ee = oa(), vt = Y(Ee);
                  Ke(vt, () => t.inlineView), jn(Ee, (Dn) => X(A, Dn), () => o(A)), ae(() => at(Ee, `position: ${o(y) ? "static" : "absolute"}; 
                 visibility: ${o(y) ? "visible" : "hidden"}; 
                 pointer-events: ${o(y) ? "auto" : "none"}; 
                 ${o(y) ? "" : "opacity: 0.5; background-color: red;"}`)), h(Ae, Ee);
                };
                S(Re, (Ae) => {
                  o(c) && Ae(me);
                });
              }
              var On = P(Re, 2);
              {
                var Ln = (Ae) => {
                  var Ee = ve(), vt = q(Ee);
                  Ke(vt, () => t.collapsedView), h(Ae, Ee);
                };
                S(On, (Ae) => {
                  o(m) && Ae(Ln);
                });
              }
              h(de, ne);
            };
            S(
              b,
              (de) => {
                o(g) ? de(k) : de(te, !1);
              },
              K
            );
          }
        };
        S(G, (b) => {
          t.hasItems ? b(ee, !1) : b($);
        });
      }
      ae(
        (b) => {
          N = Be(L, 1, "json-container svelte-qeej9p", null, N, b), at(L, o(d));
        },
        [() => ({ hovered: o(_), root: u() })]
      ), Pt("mouseenter", L, () => X(_, !0)), Pt("mouseleave", L, () => X(_, !1)), h(T, L);
    };
    S(O, (T) => {
      v() ? T(J) : T(H, !1);
    });
  }
  h(e, F), Ne();
}
var va = /* @__PURE__ */ j('<span class="json-bracket svelte-1fjligs">[</span>'), ca = /* @__PURE__ */ j('<span class="json-comma svelte-1fjligs">,</span>'), da = /* @__PURE__ */ j("<!> <!>", 1), _a = /* @__PURE__ */ j('<span class="json-bracket svelte-1fjligs">]</span>'), ga = /* @__PURE__ */ j("<!> <!> <!> <!>", 1), ya = /* @__PURE__ */ j('<!> <span class="json-ellipsis svelte-1fjligs">...</span>', 1), ha = /* @__PURE__ */ j('<span class="json-comma svelte-1fjligs">,</span>'), pa = /* @__PURE__ */ j('<div class="json-array-primitive svelte-1fjligs"><!><!></div>'), wa = /* @__PURE__ */ j('<div class="json-array-item svelte-1fjligs"><!></div>'), ma = /* @__PURE__ */ j('<span class="json-comma svelte-1fjligs">,</span>'), ba = /* @__PURE__ */ j('<div class="json-array-content svelte-1fjligs"></div> <div class="json-array-footer svelte-1fjligs"><span class="json-bracket svelte-1fjligs">]</span> <!></div>', 1), ja = /* @__PURE__ */ j('<span class="json-comma svelte-1fjligs">,</span>'), Sa = /* @__PURE__ */ j('<span class="json-bracket svelte-1fjligs">[</span> <span class="json-bracket svelte-1fjligs">]</span> <!>', 1);
function ze(e, t) {
  Ie(t, !0);
  const n = p(t, "depth", 3, 0), r = p(t, "collapsed", 3, !1), a = p(t, "displayObjectSize", 3, !0), l = p(t, "displayArrayKey", 3, !0), i = p(t, "collapseStringsAfterLength", 3, 50), u = p(t, "displayDataTypes", 3, !1), f = p(t, "sortKeys", 3, !1), v = p(t, "indentWidth", 3, 12), d = p(t, "isLast", 3, !1), c = p(t, "isRoot", 3, !1), s = p(t, "inlineShortContainers", 3, !1), g = p(t, "inline", 3, !1), _ = p(t, "inlineRoot", 3, !1), A = /* @__PURE__ */ C(() => t.value.length > 0);
  Cn(e, {
    get value() {
      return t.value;
    },
    get name() {
      return t.name;
    },
    get depth() {
      return n();
    },
    get collapsed() {
      return r();
    },
    get displayObjectSize() {
      return a();
    },
    get displayArrayKey() {
      return l();
    },
    get collapseStringsAfterLength() {
      return i();
    },
    get displayDataTypes() {
      return u();
    },
    get sortKeys() {
      return f();
    },
    get indentWidth() {
      return v();
    },
    get isLast() {
      return d();
    },
    get isRoot() {
      return c();
    },
    get inlineShortContainers() {
      return s();
    },
    get inline() {
      return g();
    },
    get hasItems() {
      return o(A);
    },
    inlineView: (y) => {
      var m = ga(), R = q(m);
      {
        var F = (N) => {
          Fe(N, {
            get name() {
              return t.name;
            },
            get displayArrayKey() {
              return l();
            },
            isArrayIndex: !1
          });
        };
        S(R, (N) => {
          t.name !== void 0 && N(F);
        });
      }
      var O = P(R, 2);
      {
        var J = (N) => {
          var E = va();
          h(N, E);
        };
        S(O, (N) => {
          _() || N(J);
        });
      }
      var H = P(O, 2);
      rt(H, 17, () => t.value, qt, (N, E, W) => {
        var le = da(), B = q(le);
        {
          var z = (b) => {
            var K = ve(), k = q(K);
            {
              var te = (ne) => {
                ze(ne, {
                  get value() {
                    return o(E);
                  },
                  get inlineShortContainers() {
                    return s();
                  },
                  inline: !0
                });
              }, de = (ne) => {
                We(ne, {
                  get value() {
                    return o(E);
                  },
                  get inlineShortContainers() {
                    return s();
                  },
                  inline: !0
                });
              };
              S(k, (ne) => {
                Array.isArray(o(E)) ? ne(te) : ne(de, !1);
              });
            }
            h(b, K);
          }, G = (b) => {
            qe(b, {
              get value() {
                return o(E);
              },
              get displayDataTypes() {
                return u();
              },
              get collapseStringsAfterLength() {
                return i();
              }
            });
          };
          S(B, (b) => {
            Le(o(E)) ? b(z) : b(G, !1);
          });
        }
        var $ = P(B, 2);
        {
          var ee = (b) => {
            var K = ca();
            h(b, K);
          };
          S($, (b) => {
            W < t.value.length - 1 && b(ee);
          });
        }
        h(N, le);
      });
      var T = P(H, 2);
      {
        var L = (N) => {
          var E = _a();
          h(N, E);
        };
        S(T, (N) => {
          _() || N(L);
        });
      }
      h(y, m);
    },
    collapsedView: (y) => {
      var m = ya(), R = q(m);
      Tn(R, {
        get value() {
          return t.value;
        },
        get displayObjectSize() {
          return a();
        },
        get displayArrayKey() {
          return l();
        }
      }), h(y, m);
    },
    expandedView: (y) => {
      var m = ba(), R = q(m);
      rt(R, 21, () => t.value, qt, (H, T, L) => {
        var N = wa(), E = Y(N);
        {
          var W = (B) => {
            var z = ve(), G = q(z);
            {
              var $ = (b) => {
                const K = /* @__PURE__ */ C(() => n() + 1), k = /* @__PURE__ */ C(() => L === t.value.length - 1);
                ze(b, {
                  get value() {
                    return o(T);
                  },
                  get depth() {
                    return o(K);
                  },
                  get collapsed() {
                    return r();
                  },
                  get displayObjectSize() {
                    return a();
                  },
                  get displayArrayKey() {
                    return l();
                  },
                  get collapseStringsAfterLength() {
                    return i();
                  },
                  get displayDataTypes() {
                    return u();
                  },
                  get sortKeys() {
                    return f();
                  },
                  get indentWidth() {
                    return v();
                  },
                  get inlineShortContainers() {
                    return s();
                  },
                  get isLast() {
                    return o(k);
                  }
                });
              }, ee = (b) => {
                const K = /* @__PURE__ */ C(() => n() + 1), k = /* @__PURE__ */ C(() => L === t.value.length - 1);
                We(b, {
                  get value() {
                    return o(T);
                  },
                  get depth() {
                    return o(K);
                  },
                  get collapsed() {
                    return r();
                  },
                  get displayObjectSize() {
                    return a();
                  },
                  get displayArrayKey() {
                    return l();
                  },
                  get collapseStringsAfterLength() {
                    return i();
                  },
                  get displayDataTypes() {
                    return u();
                  },
                  get sortKeys() {
                    return f();
                  },
                  get indentWidth() {
                    return v();
                  },
                  get inlineShortContainers() {
                    return s();
                  },
                  get isLast() {
                    return o(k);
                  }
                });
              };
              S(G, (b) => {
                Array.isArray(o(T)) ? b($) : b(ee, !1);
              });
            }
            h(B, z);
          }, le = (B) => {
            var z = pa(), G = Y(z);
            qe(G, {
              get value() {
                return o(T);
              },
              get displayDataTypes() {
                return u();
              },
              get collapseStringsAfterLength() {
                return i();
              }
            });
            var $ = P(G);
            {
              var ee = (b) => {
                var K = ha();
                h(b, K);
              };
              S($, (b) => {
                L < t.value.length - 1 && b(ee);
              });
            }
            ae(() => at(z, `margin-left: ${v() ?? ""}px`)), h(B, z);
          };
          S(E, (B) => {
            Le(o(T)) ? B(W) : B(le, !1);
          });
        }
        h(H, N);
      });
      var F = P(R, 2), O = P(Y(F), 2);
      {
        var J = (H) => {
          var T = ma();
          h(H, T);
        };
        S(O, (H) => {
          !d() && !c() && H(J);
        });
      }
      h(y, m);
    },
    emptyView: (y) => {
      var m = Sa(), R = P(q(m), 4);
      {
        var F = (O) => {
          var J = ja();
          h(O, J);
        };
        S(R, (O) => {
          !d() && !c() && O(F);
        });
      }
      h(y, m);
    },
    $$slots: {
      inlineView: !0,
      collapsedView: !0,
      expandedView: !0,
      emptyView: !0
    }
  }), Ne();
}
var Aa = /* @__PURE__ */ j('<span class="json-brace svelte-1w1alp6">&#123;</span>'), Ea = /* @__PURE__ */ j('<span class="json-comma svelte-1w1alp6">,</span>'), xa = /* @__PURE__ */ j("<!> <!> <!>", 1), Ta = /* @__PURE__ */ j('<span class="json-brace svelte-1w1alp6">&#125;</span>'), Ca = /* @__PURE__ */ j("<!> <!> <!> <!>", 1), Oa = /* @__PURE__ */ j('<!> <span class="json-ellipsis svelte-1w1alp6">...</span>', 1), La = /* @__PURE__ */ j('<span class="json-comma svelte-1w1alp6">,</span>'), Da = /* @__PURE__ */ j('<div class="json-object-primitive svelte-1w1alp6"><!><!><!></div>'), Ia = /* @__PURE__ */ j('<div class="json-object-item svelte-1w1alp6"><!></div>'), Na = /* @__PURE__ */ j('<span class="json-comma svelte-1w1alp6">,</span>'), ka = /* @__PURE__ */ j('<div class="json-object-content svelte-1w1alp6"></div> <div class="json-object-footer svelte-1w1alp6"><span class="json-brace svelte-1w1alp6">&#125;</span> <!></div>', 1), Ra = /* @__PURE__ */ j('<span class="json-comma svelte-1w1alp6">,</span>'), Va = /* @__PURE__ */ j('<span class="json-brace svelte-1w1alp6">&#123;</span> <span class="json-brace svelte-1w1alp6">&#125;</span> <!>', 1);
function We(e, t) {
  Ie(t, !0);
  const n = p(t, "depth", 3, 0), r = p(t, "collapsed", 3, !1), a = p(t, "displayObjectSize", 3, !0), l = p(t, "displayArrayKey", 3, !0), i = p(t, "collapseStringsAfterLength", 3, 50), u = p(t, "displayDataTypes", 3, !1), f = p(t, "sortKeys", 3, !1), v = p(t, "indentWidth", 3, 12), d = p(t, "isLast", 3, !1), c = p(t, "isRoot", 3, !1), s = p(t, "inlineShortContainers", 3, !1), g = p(t, "inline", 3, !1), _ = p(t, "inlineRoot", 3, !1), A = /* @__PURE__ */ C(() => Object.keys(t.value || {})), x = /* @__PURE__ */ C(() => o(A).length > 0 || Object.keys(t.value).length > 0);
  Cn(e, {
    get value() {
      return t.value;
    },
    get name() {
      return t.name;
    },
    get depth() {
      return n();
    },
    get collapsed() {
      return r();
    },
    get displayObjectSize() {
      return a();
    },
    get displayArrayKey() {
      return l();
    },
    get collapseStringsAfterLength() {
      return i();
    },
    get displayDataTypes() {
      return u();
    },
    get sortKeys() {
      return f();
    },
    get indentWidth() {
      return v();
    },
    get isLast() {
      return d();
    },
    get isRoot() {
      return c();
    },
    get inlineShortContainers() {
      return s();
    },
    get inline() {
      return g();
    },
    get hasItems() {
      return o(x);
    },
    inlineView: (m) => {
      var R = Ca(), F = q(R);
      {
        var O = (E) => {
          Fe(E, {
            get name() {
              return t.name;
            },
            get displayArrayKey() {
              return l();
            },
            isArrayIndex: !1
          });
        };
        S(F, (E) => {
          t.name !== void 0 && E(O);
        });
      }
      var J = P(F, 2);
      {
        var H = (E) => {
          var W = Aa();
          h(E, W);
        };
        S(J, (E) => {
          _() || E(H);
        });
      }
      var T = P(J, 2);
      rt(T, 18, () => o(A), (E) => E, (E, W, le) => {
        var B = xa(), z = q(B);
        Fe(z, {
          get name() {
            return W;
          },
          displayArrayKey: !1,
          isArrayIndex: !1
        });
        var G = P(z, 2);
        {
          var $ = (k) => {
            var te = ve(), de = q(te);
            {
              var ne = (me) => {
                ze(me, {
                  get value() {
                    return t.value[W];
                  },
                  get inlineShortContainers() {
                    return s();
                  },
                  inline: !0
                });
              }, Re = (me) => {
                We(me, {
                  get value() {
                    return t.value[W];
                  },
                  get inlineShortContainers() {
                    return s();
                  },
                  inline: !0
                });
              };
              S(de, (me) => {
                Array.isArray(t.value[W]) ? me(ne) : me(Re, !1);
              });
            }
            h(k, te);
          }, ee = (k) => {
            qe(k, {
              get value() {
                return t.value[W];
              },
              get displayDataTypes() {
                return u();
              },
              get collapseStringsAfterLength() {
                return i();
              }
            });
          };
          S(G, (k) => {
            Le(t.value[W]) ? k($) : k(ee, !1);
          });
        }
        var b = P(G, 2);
        {
          var K = (k) => {
            var te = Ea();
            h(k, te);
          };
          S(b, (k) => {
            o(le) < o(A).length - 1 && k(K);
          });
        }
        h(E, B);
      });
      var L = P(T, 2);
      {
        var N = (E) => {
          var W = Ta();
          h(E, W);
        };
        S(L, (E) => {
          _() || E(N);
        });
      }
      h(m, R);
    },
    collapsedView: (m) => {
      var R = Oa(), F = q(R);
      Tn(F, {
        get value() {
          return t.value;
        },
        get displayObjectSize() {
          return a();
        },
        get displayArrayKey() {
          return l();
        }
      }), h(m, R);
    },
    expandedView: (m) => {
      var R = ka(), F = q(R);
      rt(F, 22, () => o(A), (T) => T, (T, L, N) => {
        var E = Ia(), W = Y(E);
        {
          var le = (z) => {
            var G = ve(), $ = q(G);
            {
              var ee = (K) => {
                const k = /* @__PURE__ */ C(() => n() + 1), te = /* @__PURE__ */ C(() => o(N) === o(A).length - 1);
                ze(K, {
                  get value() {
                    return t.value[L];
                  },
                  get name() {
                    return L;
                  },
                  get depth() {
                    return o(k);
                  },
                  get collapsed() {
                    return r();
                  },
                  get displayObjectSize() {
                    return a();
                  },
                  get displayArrayKey() {
                    return l();
                  },
                  get collapseStringsAfterLength() {
                    return i();
                  },
                  get displayDataTypes() {
                    return u();
                  },
                  get sortKeys() {
                    return f();
                  },
                  get indentWidth() {
                    return v();
                  },
                  get inlineShortContainers() {
                    return s();
                  },
                  get isLast() {
                    return o(te);
                  }
                });
              }, b = (K) => {
                const k = /* @__PURE__ */ C(() => n() + 1), te = /* @__PURE__ */ C(() => o(N) === o(A).length - 1);
                We(K, {
                  get value() {
                    return t.value[L];
                  },
                  get name() {
                    return L;
                  },
                  get depth() {
                    return o(k);
                  },
                  get collapsed() {
                    return r();
                  },
                  get displayObjectSize() {
                    return a();
                  },
                  get displayArrayKey() {
                    return l();
                  },
                  get collapseStringsAfterLength() {
                    return i();
                  },
                  get displayDataTypes() {
                    return u();
                  },
                  get sortKeys() {
                    return f();
                  },
                  get indentWidth() {
                    return v();
                  },
                  get inlineShortContainers() {
                    return s();
                  },
                  get isLast() {
                    return o(te);
                  }
                });
              };
              S($, (K) => {
                Array.isArray(t.value[L]) ? K(ee) : K(b, !1);
              });
            }
            h(z, G);
          }, B = (z) => {
            var G = Da(), $ = Y(G);
            Fe($, {
              get name() {
                return L;
              },
              get displayArrayKey() {
                return l();
              },
              isArrayIndex: !1
            });
            var ee = P($);
            qe(ee, {
              get value() {
                return t.value[L];
              },
              get displayDataTypes() {
                return u();
              },
              get collapseStringsAfterLength() {
                return i();
              }
            });
            var b = P(ee);
            {
              var K = (k) => {
                var te = La();
                h(k, te);
              };
              S(b, (k) => {
                o(N) < o(A).length - 1 && k(K);
              });
            }
            ae(() => at(G, `margin-left: ${v() ?? ""}px`)), h(z, G);
          };
          S(W, (z) => {
            Le(t.value[L]) ? z(le) : z(B, !1);
          });
        }
        h(T, E);
      });
      var O = P(F, 2), J = P(Y(O), 2);
      {
        var H = (T) => {
          var L = Na();
          h(T, L);
        };
        S(J, (T) => {
          !d() && !c() && T(H);
        });
      }
      h(m, R);
    },
    emptyView: (m) => {
      var R = Va(), F = P(q(R), 4);
      {
        var O = (J) => {
          var H = Ra();
          h(J, H);
        };
        S(F, (J) => {
          !d() && !c() && J(O);
        });
      }
      h(m, R);
    },
    $$slots: {
      inlineView: !0,
      collapsedView: !0,
      expandedView: !0,
      emptyView: !0
    }
  }), Ne();
}
var Ka = /* @__PURE__ */ j("<div><!></div>");
function Ha(e, t) {
  Ie(t, !0);
  const n = p(t, "theme", 3, "light"), r = p(t, "collapsed", 3, !1), a = p(t, "collapseStringsAfterLength", 3, 50), l = p(t, "indentWidth", 3, 12), i = p(t, "sortKeys", 3, !1), u = p(t, "displayDataTypes", 3, !1), f = p(t, "displayObjectSize", 3, !0), v = p(t, "displayArrayKey", 3, !1), d = p(t, "inlineShortContainers", 3, !1);
  let c;
  const s = /* @__PURE__ */ C(() => Sn(t.value)), g = /* @__PURE__ */ C(() => Le(t.value));
  pt(() => {
    c && Gr(c, n());
  });
  var _ = Ka();
  let A;
  var x = Y(_);
  {
    var I = (w) => {
      var y = ve(), m = q(y);
      {
        var R = (O) => {
          ze(O, {
            get value() {
              return t.value;
            },
            depth: 0,
            get collapsed() {
              return r();
            },
            get displayObjectSize() {
              return f();
            },
            get displayArrayKey() {
              return v();
            },
            get collapseStringsAfterLength() {
              return a();
            },
            get displayDataTypes() {
              return u();
            },
            get sortKeys() {
              return i();
            },
            get indentWidth() {
              return l();
            },
            get inlineShortContainers() {
              return d();
            },
            isRoot: !0
          });
        }, F = (O) => {
          We(O, {
            get value() {
              return t.value;
            },
            depth: 0,
            get collapsed() {
              return r();
            },
            get displayObjectSize() {
              return f();
            },
            get displayArrayKey() {
              return v();
            },
            get collapseStringsAfterLength() {
              return a();
            },
            get displayDataTypes() {
              return u();
            },
            get sortKeys() {
              return i();
            },
            get indentWidth() {
              return l();
            },
            get inlineShortContainers() {
              return d();
            },
            isRoot: !0
          });
        };
        S(m, (O) => {
          o(s) === "array" ? O(R) : O(F, !1);
        });
      }
      h(w, y);
    }, M = (w) => {
      qe(w, {
        get value() {
          return t.value;
        },
        get displayDataTypes() {
          return u();
        },
        get collapseStringsAfterLength() {
          return a();
        }
      });
    };
    S(x, (w) => {
      o(g) ? w(I) : w(M, !1);
    });
  }
  jn(_, (w) => c = w, () => c), ae((w) => A = Be(_, 1, "json-viewer svelte-cnbzbd", null, A, w), [
    () => ({ light: n() === "light", dark: n() === "dark" })
  ]), h(e, _), Ne();
}
export {
  Cn as ContainerWrapper,
  sa as ExpandIcon,
  ze as JsonArray,
  Tn as JsonMeta,
  We as JsonObject,
  Fe as JsonProperty,
  ta as JsonString,
  qe as JsonValue,
  Ha as JsonViewer,
  Gr as applyTheme,
  En as escapeString,
  Sn as getJsonType,
  qa as getNamespace,
  za as getNamespacePath,
  Br as getObjectSize,
  Wa as getThemeStyles,
  Le as isExpandable,
  Ur as shouldCollapseByDepth,
  Jr as shouldCollapseString,
  xn as themes,
  An as truncateString
};
