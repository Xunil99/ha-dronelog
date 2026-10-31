// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = globalThis, u = l.ShadowRoot && (l.ShadyCSS === void 0 || l.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, d = Symbol(), f = /* @__PURE__ */ new WeakMap(), p = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== d) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (u && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = f.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && f.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, m = (e) => new p(typeof e == "string" ? e : e + "", void 0, d), h = (e, ...t) => new p(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, d), g = (e, t) => {
	if (u) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = l.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, _ = u ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return m(t);
})(e) : e, { is: v, defineProperty: y, getOwnPropertyDescriptor: b, getOwnPropertyNames: x, getOwnPropertySymbols: S, getPrototypeOf: C } = Object, w = globalThis, T = w.trustedTypes, E = T ? T.emptyScript : "", D = w.reactiveElementPolyfillSupport, O = (e, t) => e, ee = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? E : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, te = (e, t) => !v(e, t), k = {
	attribute: !0,
	type: String,
	converter: ee,
	reflect: !1,
	useDefault: !1,
	hasChanged: te
};
Symbol.metadata ??= Symbol("metadata"), w.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var A = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = k) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && y(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = b(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? k;
	}
	static _$Ei() {
		if (this.hasOwnProperty(O("elementProperties"))) return;
		let e = C(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(O("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
			let e = this.properties, t = [...x(e), ...S(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(_(e));
		} else e !== void 0 && t.push(_(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return g(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? ee : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? ee : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? te)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[O("elementProperties")] = /* @__PURE__ */ new Map(), A[O("finalized")] = /* @__PURE__ */ new Map(), D?.({ ReactiveElement: A }), (w.reactiveElementVersions ??= []).push("2.1.2");
// node_modules/lit-html/lit-html.js
var ne = globalThis, j = (e) => e, M = ne.trustedTypes, re = M ? M.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ie = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, P = "?" + N, F = `<${P}>`, I = document, R = () => I.createComment(""), ae = (e) => e === null || typeof e != "object" && typeof e != "function", oe = Array.isArray, se = (e) => oe(e) || typeof e?.[Symbol.iterator] == "function", ce = "[ 	\n\f\r]", le = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ue = /-->/g, de = />/g, fe = RegExp(`>|${ce}(?:([^\\s"'>=/]+)(${ce}*=${ce}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), pe = /'/g, me = /"/g, he = /^(?:script|style|textarea|title)$/i, z = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), ge = Symbol.for("lit-noChange"), B = Symbol.for("lit-nothing"), _e = /* @__PURE__ */ new WeakMap(), ve = I.createTreeWalker(I, 129);
function ye(e, t) {
	if (!oe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return re === void 0 ? t : re.createHTML(t);
}
var V = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = le;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === le ? c[1] === "!--" ? o = ue : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = fe) : (he.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = fe) : o = de : o === fe ? c[0] === ">" ? (o = i ?? le, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? fe : c[3] === "\"" ? me : pe) : o === me || o === pe ? o = fe : o === ue || o === de ? o = le : (o = fe, i = void 0);
		let d = o === fe && e[t + 1].startsWith("/>") ? " " : "";
		a += o === le ? n + F : l >= 0 ? (r.push(s), n.slice(0, l) + ie + n.slice(l) + N + d) : n + N + (l === -2 ? t : d);
	}
	return [ye(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, H = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = V(t, n);
		if (this.el = e.createElement(l, r), ve.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = ve.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ie)) {
					let t = u[o++], n = i.getAttribute(e).split(N), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? we : r[1] === "?" ? Te : r[1] === "@" ? Ee : Ce
					}), i.removeAttribute(e);
				} else e.startsWith(N) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (he.test(i.tagName)) {
					let e = i.textContent.split(N), t = e.length - 1;
					if (t > 0) {
						i.textContent = M ? M.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], R()), ve.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], R());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === P) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(N, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += N.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = I.createElement("template");
		return n.innerHTML = e, n;
	}
};
function be(e, t, n = e, r) {
	if (t === ge) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = ae(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = be(e, i._$AS(e, t.values), i, r)), t;
}
var xe = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? I).importNode(t, !0);
		ve.currentNode = r;
		let i = ve.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Se(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new De(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = ve.nextNode(), a++);
		}
		return ve.currentNode = I, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Se = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = B, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = be(this, e, t), ae(e) ? e === B || e == null || e === "" ? (this._$AH !== B && this._$AR(), this._$AH = B) : e !== this._$AH && e !== ge && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? se(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== B && ae(this._$AH) ? this._$AA.nextSibling.data = e : this.T(I.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = H.createElement(ye(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new xe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = _e.get(e.strings);
		return t === void 0 && _e.set(e.strings, t = new H(e)), t;
	}
	k(t) {
		oe(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(R()), this.O(R()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = j(e).nextSibling;
			j(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Ce = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = B, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = B;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = be(this, e, t, 0), a = !ae(e) || e !== this._$AH && e !== ge, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = be(this, r[n + o], t, o), s === ge && (s = this._$AH[o]), a ||= !ae(s) || s !== this._$AH[o], s === B ? e = B : e !== B && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === B ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, we = class extends Ce {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === B ? void 0 : e;
	}
}, Te = class extends Ce {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== B);
	}
}, Ee = class extends Ce {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = be(this, e, t, 0) ?? B) === ge) return;
		let n = this._$AH, r = e === B && n !== B || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== B && (n === B || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, De = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		be(this, e);
	}
}, Oe = ne.litHtmlPolyfillSupport;
Oe?.(H, Se), (ne.litHtmlVersions ??= []).push("3.3.3");
var ke = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Se(t.insertBefore(R(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Ae = globalThis, je = class extends A {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ke(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return ge;
	}
};
je._$litElement$ = !0, je.finalized = !0, Ae.litElementHydrateSupport?.({ LitElement: je });
var Me = Ae.litElementPolyfillSupport;
Me?.({ LitElement: je }), (Ae.litElementVersions ??= []).push("4.2.2");
// src/api.ts
function Ne(e) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e !== void 0));
}
var Pe = class {
	constructor(e) {
		this.hass = e;
	}
	call(e) {
		return this.hass.callWS(Ne(e));
	}
	flights(e = {}) {
		return this.call({
			type: "dronelog/flights",
			...e
		});
	}
	flight(e) {
		return this.call({
			type: "dronelog/flight",
			flight_id: e
		});
	}
	stats(e) {
		return this.call({
			type: "dronelog/stats",
			drone: e
		});
	}
	batteries() {
		return this.call({ type: "dronelog/batteries" });
	}
	heatmap(e) {
		return this.call({
			type: "dronelog/heatmap",
			precision_m: e
		});
	}
	async cellFlights(e, t, n) {
		return (await this.call({
			type: "dronelog/cell_flights",
			lat: e,
			lon: t,
			precision_m: n
		})).flights;
	}
}, Fe = (e) => typeof e == "number" && Number.isFinite(e);
function Ie(e, t, n) {
	return new Intl.NumberFormat(t, {
		minimumFractionDigits: n,
		maximumFractionDigits: n
	}).format(e);
}
function Le(e) {
	if (!Fe(e)) return "–";
	let t = Math.round(e);
	return t < 60 ? `${t} s` : t < 3600 ? `${Math.floor(t / 60)} min ${t % 60} s` : `${Math.floor(t / 3600)} h ${String(Math.floor(t % 3600 / 60)).padStart(2, "0")} min`;
}
function Re(e, t) {
	return Fe(e) ? e < 1e3 ? `${Math.round(e)} m` : `${Ie(e / 1e3, t, 1)} km` : "–";
}
function ze(e, t) {
	return Fe(e) ? `${Ie(e * 3.6, t, 1)} km/h` : "–";
}
function Be(e, t) {
	return Fe(e) ? `${Ie(e, t, 1)} m` : "–";
}
function Ve(e) {
	return Fe(e) ? `${Math.round(e)} %` : "–";
}
function He(e, t, n) {
	let r = new Date(e);
	return Number.isNaN(r.getTime()) ? "–" : new Intl.DateTimeFormat(n, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: t
	}).format(r);
}
var Ue = [
	"N",
	"NO",
	"O",
	"SO",
	"S",
	"SW",
	"W",
	"NW"
], We = [
	"N",
	"NE",
	"E",
	"SE",
	"S",
	"SW",
	"W",
	"NW"
];
function Ge(e, t = "de") {
	let n = Math.round((e % 360 + 360) % 360 / 45) % 8;
	return (t.startsWith("de") ? Ue : We)[n];
}
function Ke(e, t) {
	return Fe(e) ? `${Ie(e, t, 1)} m/s` : "–";
}
var U = {
	de: {
		tab_flights: "Flüge",
		tab_stats: "Auswertung",
		title: "Drohnenflüge",
		no_flights: "Noch keine Flüge. Sie erscheinen hier, sobald die App Logdateien hochgeladen hat.",
		load_more: "Mehr laden",
		back: "Zurück",
		all_drones: "Alle Drohnen",
		all_batteries: "Alle Akkus",
		duration: "Dauer",
		distance: "Strecke",
		max_height: "Max. Höhe",
		max_speed: "Max. Tempo",
		battery: "Akku",
		weather: "Wetter",
		no_weather: "Kein Wetter vorhanden",
		no_position: "Keine Positionsdaten",
		no_history: "Kein Verlauf vorhanden",
		charge: "Ladestand",
		power_avg: "Ø Leistung",
		power_peak: "Spitzenleistung",
		cell_deviation: "Zellabweichung",
		temperature: "Temperatur",
		cycles: "Ladezyklen",
		health: "Gesundheit",
		wind: "Wind",
		gusts: "Böen",
		precipitation: "Niederschlag",
		clouds: "Bewölkung",
		source: "Quelle",
		loading: "Lädt …",
		error: "Fehler beim Laden",
		select_flight: "Flug auswählen",
		metric_flights: "Flüge",
		metric_hours: "Flugzeit",
		drones: "Drohnen",
		battery_history: "Akkuverlauf je Akku",
		heatmap: "Heatmap der Flugorte",
		heatmap_hint: "Klick auf die Karte zeigt die Flüge an dieser Stelle",
		no_battery: "Keine Akkudaten vorhanden"
	},
	en: {
		tab_flights: "Flights",
		tab_stats: "Statistics",
		title: "Drone flights",
		no_flights: "No flights yet. They appear here once the app has uploaded log files.",
		load_more: "Load more",
		back: "Back",
		all_drones: "All drones",
		all_batteries: "All batteries",
		duration: "Duration",
		distance: "Distance",
		max_height: "Max. height",
		max_speed: "Max. speed",
		battery: "Battery",
		weather: "Weather",
		no_weather: "No weather available",
		no_position: "No position data",
		no_history: "No track available",
		charge: "Charge",
		power_avg: "Avg. power",
		power_peak: "Peak power",
		cell_deviation: "Cell deviation",
		temperature: "Temperature",
		cycles: "Charge cycles",
		health: "Health",
		wind: "Wind",
		gusts: "Gusts",
		precipitation: "Precipitation",
		clouds: "Cloud cover",
		source: "Source",
		loading: "Loading …",
		error: "Failed to load",
		select_flight: "Select a flight",
		metric_flights: "Flights",
		metric_hours: "Flight time",
		drones: "Drones",
		battery_history: "Battery history",
		heatmap: "Heatmap of flight locations",
		heatmap_hint: "Click the map to list the flights at that spot",
		no_battery: "No battery data available"
	}
};
function W(e, t) {
	return (t?.toLowerCase().startsWith("de") ? U.de : U.en)[e];
}
// node_modules/uplot/dist/uPlot.esm.js
var qe = !0, Je = "uplot", Ye = "u-hz", Xe = "u-vt", Ze = "u-title", Qe = "u-wrap", $e = "u-under", et = "u-over", tt = "u-axis", nt = "u-off", rt = "u-select", it = "u-cursor-x", at = "u-cursor-y", ot = "u-cursor-pt", st = "u-legend", ct = "u-live", lt = "u-inline", ut = "u-series", dt = "u-marker", ft = "u-label", pt = "u-value", mt = "width", ht = "height", gt = "top", G = "bottom", _t = "left", vt = "right", yt = "#000", bt = "#0000", xt = "mousemove", K = "mousedown", St = "mouseup", Ct = "mouseenter", wt = "mouseleave", Tt = "dblclick", Et = "resize", Dt = "scroll", Ot = "change", kt = "dppxchange", At = "--", jt = typeof window < "u", Mt = jt ? document : null, Nt = jt ? window : null, Pt = jt ? navigator : null, q, Ft;
function It() {
	let e = devicePixelRatio;
	q != e && (q = e, Ft && Xt(Ot, Ft, It), Ft = matchMedia(`(min-resolution: ${q - .001}dppx) and (max-resolution: ${q + .001}dppx)`), Yt(Ot, Ft, It), Nt.dispatchEvent(new CustomEvent(kt)));
}
function Lt(e, t) {
	if (t != null) {
		let n = e.classList;
		!n.contains(t) && n.add(t);
	}
}
function Rt(e, t) {
	let n = e.classList;
	n.contains(t) && n.remove(t);
}
function zt(e, t, n) {
	e.style[t] = n + "px";
}
function Bt(e, t, n, r) {
	let i = Mt.createElement(e);
	return t != null && Lt(i, t), n?.insertBefore(i, r), i;
}
function Vt(e, t) {
	return Bt("div", e, t);
}
var Ht = /* @__PURE__ */ new WeakMap();
function J(e, t, n, r, i) {
	let a = "translate(" + t + "px," + n + "px)";
	a != Ht.get(e) && (e.style.transform = a, Ht.set(e, a), t < 0 || n < 0 || t > r || n > i ? Lt(e, nt) : Rt(e, nt));
}
var Ut = /* @__PURE__ */ new WeakMap();
function Wt(e, t, n) {
	let r = t + n;
	r != Ut.get(e) && (Ut.set(e, r), e.style.background = t, e.style.borderColor = n);
}
var Gt = /* @__PURE__ */ new WeakMap();
function Kt(e, t, n, r) {
	let i = t + "" + n;
	i != Gt.get(e) && (Gt.set(e, i), e.style.height = n + "px", e.style.width = t + "px", e.style.marginLeft = r ? -t / 2 + "px" : 0, e.style.marginTop = r ? -n / 2 + "px" : 0);
}
var qt = { passive: !0 }, Jt = {
	...qt,
	capture: !0
};
function Yt(e, t, n, r) {
	t.addEventListener(e, n, r ? Jt : qt);
}
function Xt(e, t, n, r) {
	t.removeEventListener(e, n, qt);
}
jt && It();
function Zt(e, t, n, r) {
	let i;
	n ||= 0, r ||= t.length - 1;
	let a = r <= 2147483647;
	for (; r - n > 1;) i = a ? n + r >> 1 : vn((n + r) / 2), t[i] < e ? n = i : r = i;
	return e - t[n] <= t[r] - e ? n : r;
}
function Qt(e) {
	return (t, n, r) => {
		let i = -1, a = -1;
		for (let a = n; a <= r; a++) if (e(t[a])) {
			i = a;
			break;
		}
		for (let i = r; i >= n; i--) if (e(t[i])) {
			a = i;
			break;
		}
		return [i, a];
	};
}
var $t = (e) => e != null, en = (e) => e != null && e > 0, tn = Qt($t), nn = Qt(en);
function rn(e, t, n, r = 0, i = !1) {
	let a = i ? nn : tn, o = i ? en : $t;
	[t, n] = a(e, t, n);
	let s = e[t], c = e[t];
	if (t > -1) {
		if (r == 1) s = e[t], c = e[n];
		else if (r == -1) s = e[n], c = e[t];
		else for (let r = t; r <= n; r++) {
			let t = e[r];
			o(t) && (t < s ? s = t : t > c && (c = t));
		}
	}
	return [s ?? kn, c ?? -kn];
}
function an(e, t, n, r) {
	let i = wn(e), a = wn(t);
	e == t && (i == -1 ? (e *= n, t /= n) : (e /= n, t *= n));
	let o = n == 10 ? Tn : En, s = i == 1 ? vn : bn, c = a == 1 ? bn : vn, l = s(o(_n(e))), u = c(o(_n(t))), d = Cn(n, l), f = Cn(n, u);
	return n == 10 && (l < 0 && (d = Wn(d, -l)), u < 0 && (f = Wn(f, -u))), r || n == 2 ? (e = d * i, t = f * a) : (e = Un(e, d), t = Hn(t, f)), [e, t];
}
function on(e, t, n, r) {
	let i = an(e, t, n, r);
	return e == 0 && (i[0] = 0), t == 0 && (i[1] = 0), i;
}
var sn = .1, Y = {
	mode: 3,
	pad: sn
}, cn = {
	pad: 0,
	soft: null,
	mode: 0
}, ln = {
	min: cn,
	max: cn
};
function un(e, t, n, r) {
	return tr(n) ? fn(e, t, n) : (cn.pad = n, cn.soft = r ? 0 : null, cn.mode = r ? 3 : 0, fn(e, t, ln));
}
function X(e, t) {
	return e ?? t;
}
function dn(e, t, n) {
	for (t = X(t, 0), n = X(n, e.length - 1); t <= n;) {
		if (e[t] != null) return !0;
		t++;
	}
	return !1;
}
function fn(e, t, n) {
	let r = n.min, i = n.max, a = X(r.pad, 0), o = X(i.pad, 0), s = X(r.hard, -kn), c = X(i.hard, kn), l = X(r.soft, kn), u = X(i.soft, -kn), d = X(r.mode, 0), f = X(i.mode, 0), p = t - e, m = Tn(p), h = Sn(_n(e), _n(t)), g = _n(Tn(h) - m);
	(p < 1e-24 || g > 10) && (p = 0, (e == 0 || t == 0) && (p = 1e-24, d == 2 && l != kn && (a = 0), f == 2 && u != -kn && (o = 0)));
	let _ = p || h || 1e3, v = Cn(10, vn(Tn(_))), y = Wn(Un(e - _ * (p == 0 ? e == 0 ? .1 : 1 : a), v / 10), 24), b = e >= l && (d == 1 || d == 3 && y <= l || d == 2 && y >= l) ? l : kn, x = Sn(s, y < b && e >= b ? b : xn(b, y)), S = Wn(Hn(t + _ * (p == 0 ? t == 0 ? .1 : 1 : o), v / 10), 24), C = t <= u && (f == 1 || f == 3 && S >= u || f == 2 && S <= u) ? u : -kn, w = xn(c, S > C && t <= C ? C : Sn(C, S));
	return x == w && x == 0 && (w = 100), [x, w];
}
var pn = new Intl.NumberFormat(jt ? Pt.language : "en-US"), mn = (e) => pn.format(e), hn = Math, gn = hn.PI, _n = hn.abs, vn = hn.floor, yn = hn.round, bn = hn.ceil, xn = hn.min, Sn = hn.max, Cn = hn.pow, wn = hn.sign, Tn = hn.log10, En = hn.log2, Dn = (e, t = 1) => hn.sinh(e) * t, On = (e, t = 1) => hn.asinh(e / t), kn = Infinity;
function An(e) {
	return (Tn((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function jn(e, t, n) {
	return xn(Sn(e, t), n);
}
function Mn(e) {
	return typeof e == "function";
}
function Z(e) {
	return Mn(e) ? e : () => e;
}
var Nn = () => {}, Pn = (e) => e, Fn = (e, t) => t, In = (e) => null, Ln = (e) => !0, Rn = (e, t) => e == t, zn = /\.\d*?(?=9{6,}|0{6,})/gm, Bn = (e) => {
	if (Qn(e) || Gn.has(e)) return e;
	let t = `${e}`, n = t.match(zn);
	if (n == null) return e;
	let r = n[0].length - 1;
	if (t.indexOf("e-") != -1) {
		let [e, n] = t.split("e");
		return +`${Bn(e)}e${n}`;
	}
	return Wn(e, r);
};
function Vn(e, t) {
	return Bn(Wn(Bn(e / t)) * t);
}
function Hn(e, t) {
	return Bn(bn(Bn(e / t)) * t);
}
function Un(e, t) {
	return Bn(vn(Bn(e / t)) * t);
}
function Wn(e, t = 0) {
	if (Qn(e)) return e;
	let n = 10 ** t;
	return yn(e * n * (1 + 2 ** -52)) / n;
}
var Gn = /* @__PURE__ */ new Map();
function Kn(e) {
	return (("" + e).split(".")[1] || "").length;
}
function qn(e, t, n, r) {
	let i = [], a = r.map(Kn);
	for (let o = t; o < n; o++) {
		let t = _n(o), n = Wn(Cn(e, o), t);
		for (let s = 0; s < r.length; s++) {
			let c = e == 10 ? +`${r[s]}e${o}` : r[s] * n, l = (o >= 0 ? 0 : t) + (o >= a[s] ? 0 : a[s]), u = e == 10 ? c : Wn(c, l);
			i.push(u), Gn.set(u, l);
		}
	}
	return i;
}
var Jn = {}, Yn = [], Xn = [null, null], Zn = Array.isArray, Qn = Number.isInteger, $n = (e) => e === void 0;
function er(e) {
	return typeof e == "string";
}
function tr(e) {
	let t = !1;
	if (e != null) {
		let n = e.constructor;
		t = n == null || n == Object;
	}
	return t;
}
function nr(e) {
	return typeof e == "object" && !!e;
}
var rr = Object.getPrototypeOf(Uint8Array), ir = "__proto__";
function ar(e, t = tr) {
	let n;
	if (Zn(e)) {
		let r = e.find((e) => e != null);
		if (Zn(r) || t(r)) {
			n = Array(e.length);
			for (let r = 0; r < e.length; r++) n[r] = ar(e[r], t);
		} else n = e.slice();
	} else if (e instanceof rr) n = e.slice();
	else if (t(e)) {
		n = {};
		for (let r in e) r != ir && (n[r] = ar(e[r], t));
	} else n = e;
	return n;
}
function or(e) {
	let t = arguments;
	for (let n = 1; n < t.length; n++) {
		let r = t[n];
		for (let t in r) t != ir && (tr(e[t]) ? or(e[t], ar(r[t])) : e[t] = ar(r[t]));
	}
	return e;
}
var sr = 0, cr = 1, lr = 2;
function ur(e, t, n) {
	for (let r = 0, i, a = -1; r < t.length; r++) {
		let o = t[r];
		if (o > a) {
			for (i = o - 1; i >= 0 && e[i] == null;) e[i--] = null;
			for (i = o + 1; i < n && e[i] == null;) e[a = i++] = null;
		}
	}
}
function dr(e, t) {
	if (mr(e)) {
		let t = e[0].slice();
		for (let n = 1; n < e.length; n++) t.push(...e[n].slice(1));
		return hr(t[0]) || (t = pr(t)), t;
	}
	let n = /* @__PURE__ */ new Set();
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = r.length;
		for (let e = 0; e < i; e++) n.add(r[e]);
	}
	let r = [Array.from(n).sort((e, t) => e - t)], i = r[0].length, a = /* @__PURE__ */ new Map();
	for (let e = 0; e < i; e++) a.set(r[0][e], e);
	for (let n = 0; n < e.length; n++) {
		let o = e[n], s = o[0];
		for (let e = 1; e < o.length; e++) {
			let c = o[e], l = Array(i).fill(void 0), u = t ? t[n][e] : cr, d = [];
			for (let e = 0; e < c.length; e++) {
				let t = c[e], n = a.get(s[e]);
				t === null ? u != sr && (l[n] = t, u == lr && d.push(n)) : l[n] = t;
			}
			ur(l, d, i), r.push(l);
		}
	}
	return r;
}
var fr = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function pr(e) {
	let t = e[0], n = t.length, r = Array(n);
	for (let e = 0; e < r.length; e++) r[e] = e;
	r.sort((e, n) => t[e] - t[n]);
	let i = [];
	for (let t = 0; t < e.length; t++) {
		let a = e[t], o = Array(n);
		for (let e = 0; e < n; e++) o[e] = a[r[e]];
		i.push(o);
	}
	return i;
}
function mr(e) {
	let t = e[0][0], n = t.length;
	for (let r = 1; r < e.length; r++) {
		let i = e[r][0];
		if (i.length != n) return !1;
		if (i != t) {
			for (let e = 0; e < n; e++) if (i[e] != t[e]) return !1;
		}
	}
	return !0;
}
function hr(e, t = 100) {
	let n = e.length;
	if (n <= 1) return !0;
	let r = 0, i = n - 1;
	for (; r <= i && e[r] == null;) r++;
	for (; i >= r && e[i] == null;) i--;
	if (i <= r) return !0;
	let a = Sn(1, vn((i - r + 1) / t));
	for (let t = e[r], n = r + a; n <= i; n += a) {
		let r = e[n];
		if (r != null) {
			if (r <= t) return !1;
			t = r;
		}
	}
	return !0;
}
var gr = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
], _r = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
function vr(e) {
	return e.slice(0, 3);
}
var yr = _r.map(vr), br = {
	MMMM: gr,
	MMM: gr.map(vr),
	WWWW: _r,
	WWW: yr
};
function xr(e) {
	return (e < 10 ? "0" : "") + e;
}
function Sr(e) {
	return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
var Cr = {
	YYYY: (e) => e.getFullYear(),
	YY: (e) => (e.getFullYear() + "").slice(2),
	MMMM: (e, t) => t.MMMM[e.getMonth()],
	MMM: (e, t) => t.MMM[e.getMonth()],
	MM: (e) => xr(e.getMonth() + 1),
	M: (e) => e.getMonth() + 1,
	DD: (e) => xr(e.getDate()),
	D: (e) => e.getDate(),
	WWWW: (e, t) => t.WWWW[e.getDay()],
	WWW: (e, t) => t.WWW[e.getDay()],
	HH: (e) => xr(e.getHours()),
	H: (e) => e.getHours(),
	h: (e) => {
		let t = e.getHours();
		return t == 0 ? 12 : t > 12 ? t - 12 : t;
	},
	AA: (e) => e.getHours() >= 12 ? "PM" : "AM",
	aa: (e) => e.getHours() >= 12 ? "pm" : "am",
	a: (e) => e.getHours() >= 12 ? "p" : "a",
	mm: (e) => xr(e.getMinutes()),
	m: (e) => e.getMinutes(),
	ss: (e) => xr(e.getSeconds()),
	s: (e) => e.getSeconds(),
	fff: (e) => Sr(e.getMilliseconds())
};
function wr(e, t) {
	t ||= br;
	let n = [], r = /\{([a-z]+)\}|[^{]+/gi, i;
	for (; i = r.exec(e);) n.push(i[0][0] == "{" ? Cr[i[1]] : i[0]);
	return (e) => {
		let r = "";
		for (let i = 0; i < n.length; i++) r += typeof n[i] == "string" ? n[i] : n[i](e, t);
		return r;
	};
}
var Tr = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Er(e, t) {
	let n;
	return t == "UTC" || t == "Etc/UTC" ? n = /* @__PURE__ */ new Date(+e + e.getTimezoneOffset() * 6e4) : t == Tr ? n = e : (n = new Date(e.toLocaleString("en-US", { timeZone: t })), n.setMilliseconds(e.getMilliseconds())), n;
}
var Dr = (e) => e % 1 == 0, Or = [
	1,
	2,
	2.5,
	5
], kr = qn(10, -32, 0, Or), Ar = qn(10, 0, 32, Or), jr = Ar.filter(Dr), Mr = kr.concat(Ar), Nr = "\n", Pr = "{YYYY}", Fr = Nr + Pr, Ir = "{M}/{D}", Q = Nr + Ir, Lr = Q + "/{YY}", Rr = "{aa}", zr = "{h}:{mm}" + Rr, Br = Nr + zr, Vr = ":{ss}", $ = null;
function Hr(e) {
	let t = e * 1e3, n = t * 60, r = n * 60, i = r * 24, a = i * 30, o = i * 365, s = (e == 1 ? qn(10, 0, 3, Or).filter(Dr) : qn(10, -3, 0, Or)).concat([
		t,
		t * 5,
		t * 10,
		t * 15,
		t * 30,
		n,
		n * 5,
		n * 10,
		n * 15,
		n * 30,
		r,
		r * 2,
		r * 3,
		r * 4,
		r * 6,
		r * 8,
		r * 12,
		i,
		i * 2,
		i * 3,
		i * 4,
		i * 5,
		i * 6,
		i * 7,
		i * 8,
		i * 9,
		i * 10,
		i * 15,
		a,
		a * 2,
		a * 3,
		a * 4,
		a * 6,
		o,
		o * 2,
		o * 5,
		o * 10,
		o * 25,
		o * 50,
		o * 100
	]), c = [
		[
			o,
			Pr,
			$,
			$,
			$,
			$,
			$,
			$,
			1
		],
		[
			i * 28,
			"{MMM}",
			Fr,
			$,
			$,
			$,
			$,
			$,
			1
		],
		[
			i,
			Ir,
			Fr,
			$,
			$,
			$,
			$,
			$,
			1
		],
		[
			r,
			"{h}" + Rr,
			Lr,
			$,
			Q,
			$,
			$,
			$,
			1
		],
		[
			n,
			zr,
			Lr,
			$,
			Q,
			$,
			$,
			$,
			1
		],
		[
			t,
			Vr,
			Lr + " " + zr,
			$,
			Q + " " + zr,
			$,
			Br,
			$,
			1
		],
		[
			e,
			Vr + ".{fff}",
			Lr + " " + zr,
			$,
			Q + " " + zr,
			$,
			Br,
			$,
			1
		]
	];
	function l(t) {
		return (s, c, l, u, d, f) => {
			let p = [], m = d >= o, h = d >= a && d < o, g = t(l), _ = Wn(g * e, 3), v = Qr(g.getFullYear(), m ? 0 : g.getMonth(), h || m ? 1 : g.getDate()), y = Wn(v * e, 3);
			if (h || m) {
				let n = h ? d / a : 0, r = m ? d / o : 0, i = _ == y ? _ : Wn(Qr(v.getFullYear() + r, v.getMonth() + n, 1) * e, 3), s = new Date(yn(i / e)), c = s.getFullYear(), l = s.getMonth();
				for (let a = 0; i <= u; a++) {
					let o = Qr(c + r * a, l + n * a, 1), s = o - t(Wn(o * e, 3));
					i = Wn((+o + s) * e, 3), i <= u && p.push(i);
				}
			} else {
				let a = d >= i ? i : d, o = y + (vn(l) - vn(_)) + Hn(_ - y, a);
				p.push(o);
				let m = t(o), h = m.getHours() + m.getMinutes() / n + m.getSeconds() / r, g = d / r, v = f / s.axes[c]._space;
				for (; o = Wn(o + d, e == 1 ? 0 : 3), !(o > u);) if (g > 1) {
					let e = vn(Wn(h + g, 6)) % 24, n = t(o).getHours() - e;
					n > 1 && (n = -1), o -= n * r, h = (h + g) % 24;
					let i = p[p.length - 1];
					Wn((o - i) / d, 3) * v >= .7 && p.push(o);
				} else p.push(o);
			}
			return p;
		};
	}
	return [
		s,
		c,
		l
	];
}
var [Ur, Wr, Gr] = Hr(1), [Kr, qr, Jr] = Hr(.001);
qn(2, -53, 53, [1]);
function Yr(e, t) {
	return e.map((e) => e.map((n, r) => r == 0 || r == 8 || n == null ? n : t(r == 1 || e[8] == 0 ? n : e[1] + n)));
}
function Xr(e, t) {
	return (n, r, i, a, o) => {
		let s = t.find((e) => o >= e[0]) || t[t.length - 1], c, l, u, d, f, p;
		return r.map((t) => {
			let n = e(t), r = n.getFullYear(), i = n.getMonth(), a = n.getDate(), o = n.getHours(), m = n.getMinutes(), h = n.getSeconds(), g = r != c && s[2] || i != l && s[3] || a != u && s[4] || o != d && s[5] || m != f && s[6] || h != p && s[7] || s[1];
			return c = r, l = i, u = a, d = o, f = m, p = h, g(n);
		});
	};
}
function Zr(e, t) {
	let n = wr(t);
	return (t, r, i, a, o) => r.map((t) => n(e(t)));
}
function Qr(e, t, n) {
	return new Date(e, t, n);
}
function $r(e, t) {
	return t(e);
}
var ei = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function ti(e, t) {
	return (n, r, i, a) => a == null ? At : t(e(r));
}
function ni(e, t) {
	let n = e.series[t];
	return n.width ? n.stroke(e, t) : n.points.width ? n.points.stroke(e, t) : null;
}
function ri(e, t) {
	return e.series[t].fill(e, t);
}
var ii = {
	show: !0,
	live: !0,
	isolate: !1,
	mount: Nn,
	markers: {
		show: !0,
		width: 2,
		stroke: ni,
		fill: ri,
		dash: "solid"
	},
	idx: null,
	idxs: null,
	values: []
};
function ai(e, t) {
	let n = e.cursor.points, r = Vt(), i = n.size(e, t);
	zt(r, mt, i), zt(r, ht, i);
	let a = i / -2;
	zt(r, "marginLeft", a), zt(r, "marginTop", a);
	let o = n.width(e, t, i);
	return o && zt(r, "borderWidth", o), r;
}
function oi(e, t) {
	let n = e.series[t].points;
	return n._fill || n._stroke;
}
function si(e, t) {
	let n = e.series[t].points;
	return n._stroke || n._fill;
}
function ci(e, t) {
	return e.series[t].points.size;
}
var li = [0, 0];
function ui(e, t, n) {
	return li[0] = t, li[1] = n, li;
}
function di(e, t, n, r = !0) {
	return (e) => {
		e.button != 0 || r && e.target != t || n(e);
	};
}
function fi(e, t, n, r = !0) {
	return (e) => {
		r && e.target != t || n(e);
	};
}
var pi = {
	show: !0,
	x: !0,
	y: !0,
	lock: !1,
	move: ui,
	points: {
		one: !1,
		show: ai,
		size: ci,
		width: 0,
		stroke: si,
		fill: oi
	},
	bind: {
		mousedown: di,
		mouseup: di,
		click: di,
		dblclick: di,
		mousemove: fi,
		mouseleave: fi,
		mouseenter: fi
	},
	drag: {
		setScale: !0,
		x: !0,
		y: !1,
		dist: 0,
		uni: null,
		click: (e, t) => {
			t.stopPropagation(), t.stopImmediatePropagation();
		},
		_x: !1,
		_y: !1
	},
	focus: {
		dist: (e, t, n, r, i) => r - i,
		prox: -1,
		bias: 0
	},
	hover: {
		skip: [void 0],
		prox: null,
		bias: 0
	},
	left: -10,
	top: -10,
	idx: null,
	dataIdx: null,
	idxs: null,
	event: null
}, mi = {
	show: !0,
	stroke: "rgba(0,0,0,0.07)",
	width: 2
}, hi = or({}, mi, { filter: Fn }), gi = or({}, hi, { size: 10 }), _i = or({}, mi, { show: !1 }), vi = "12px system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"", yi = "bold " + vi, bi = 1.5, xi = {
	show: !0,
	scale: "x",
	stroke: yt,
	space: 50,
	gap: 5,
	alignTo: 1,
	size: 50,
	labelGap: 0,
	labelSize: 30,
	labelFont: yi,
	side: 2,
	grid: hi,
	ticks: gi,
	border: _i,
	font: vi,
	lineGap: bi,
	rotate: 0
}, Si = "Value", Ci = "Time", wi = {
	show: !0,
	scale: "x",
	auto: !1,
	sorted: 1,
	min: kn,
	max: -Infinity,
	idxs: []
};
function Ti(e, t, n, r, i) {
	return t.map((e) => e == null ? "" : mn(e));
}
function Ei(e, t, n, r, i, a, o) {
	let s = [], c = Gn.get(i) || 0;
	n = o ? n : Wn(Hn(n, i), c);
	for (let e = n; e <= r; e = Wn(e + i, c)) s.push(Object.is(e, -0) ? 0 : e);
	return s;
}
function Di(e, t, n, r, i, a, o) {
	let s = [], c = e.scales[e.axes[t].scale].log;
	i = Cn(c, vn((c == 10 ? Tn : En)(n))), c == 10 && (i = Mr[Zt(i, Mr)]);
	let l = n, u = i * c;
	c == 10 && (u = Mr[Zt(u, Mr)]);
	do
		s.push(l), l += i, c == 10 && !Gn.has(l) && (l = Wn(l, Gn.get(i))), l >= u && (i = l, u = i * c, c == 10 && (u = Mr[Zt(u, Mr)]));
	while (l <= r);
	return s;
}
function Oi(e, t, n, r, i, a, o) {
	let s = e.scales[e.axes[t].scale].asinh, c = r > s ? Di(e, t, Sn(s, n), r, i) : [s], l = r >= 0 && n <= 0 ? [0] : [];
	return (n < -s ? Di(e, t, Sn(s, -r), -n, i) : [s]).reverse().map((e) => -e).concat(l, c);
}
var ki = /./, Ai = /[12357]/, ji = /[125]/, Mi = /1/, Ni = (e, t, n, r) => e.map((e, i) => t == 4 && e == 0 || i % r == 0 && n.test(e.toExponential()[+(e < 0)]) ? e : null);
function Pi(e, t, n, r, i) {
	let a = e.axes[n], o = a.scale, s = e.scales[o], c = e.valToPos, l = a._space, u = c(10, o), d = c(9, o) - u >= l ? ki : c(7, o) - u >= l ? Ai : c(5, o) - u >= l ? ji : Mi;
	if (d == Mi) {
		let e = _n(c(1, o) - u);
		if (e < l) return Ni(t.slice().reverse(), s.distr, d, bn(l / e)).reverse();
	}
	return Ni(t, s.distr, d, 1);
}
function Fi(e, t, n, r, i) {
	let a = e.axes[n], o = a.scale, s = a._space, c = e.valToPos, l = _n(c(1, o) - c(2, o));
	return l < s ? Ni(t.slice().reverse(), 3, ki, bn(s / l)).reverse() : t;
}
function Ii(e, t, n, r) {
	return r == null ? At : t == null ? "" : mn(t);
}
var Li = {
	show: !0,
	scale: "y",
	stroke: yt,
	space: 30,
	gap: 5,
	alignTo: 1,
	size: 50,
	labelGap: 0,
	labelSize: 30,
	labelFont: yi,
	side: 3,
	grid: hi,
	ticks: gi,
	border: _i,
	font: vi,
	lineGap: bi,
	rotate: 0
};
function Ri(e, t) {
	return Wn((3 + (e || 1) * 2) * t, 3);
}
function zi(e, t) {
	let { scale: n, idxs: r } = e.series[0], i = e._data[0], a = e.valToPos(i[r[0]], n, !0), o = _n(e.valToPos(i[r[1]], n, !0) - a) / (e.series[t].points.space * q);
	return r[1] - r[0] <= o;
}
var Bi = {
	scale: null,
	auto: !0,
	sorted: 0,
	min: kn,
	max: -Infinity
}, Vi = (e, t, n, r, i) => i, Hi = {
	show: !0,
	auto: !0,
	sorted: 0,
	gaps: Vi,
	alpha: 1,
	facets: [or({}, Bi, { scale: "x" }), or({}, Bi, { scale: "y" })]
}, Ui = {
	scale: "y",
	auto: !0,
	sorted: 0,
	show: !0,
	spanGaps: !1,
	gaps: Vi,
	alpha: 1,
	points: {
		show: zi,
		filter: null
	},
	values: null,
	min: kn,
	max: -Infinity,
	idxs: [],
	path: null,
	clip: null
};
function Wi(e, t, n, r, i) {
	return n / 10;
}
var Gi = {
	time: qe,
	auto: !0,
	distr: 1,
	log: 10,
	asinh: 1,
	min: null,
	max: null,
	dir: 1,
	ori: 0
}, Ki = or({}, Gi, {
	time: !1,
	ori: 1
}), qi = {};
function Ji(e, t) {
	let n = qi[e];
	return n || (n = {
		key: e,
		plots: [],
		sub(e) {
			n.plots.push(e);
		},
		unsub(e) {
			n.plots = n.plots.filter((t) => t != e);
		},
		pub(e, t, r, i, a, o, s) {
			for (let c = 0; c < n.plots.length; c++) n.plots[c] != t && n.plots[c].pub(e, t, r, i, a, o, s);
		}
	}, e != null && (qi[e] = n)), n;
}
var Yi = 1, Xi = 2;
function Zi(e, t, n) {
	let r = e.mode, i = e.series[t], a = r == 2 ? e._data[t] : e._data, o = e.scales, s = e.bbox, c = a[0], l = r == 2 ? a[1] : a[t], u = r == 2 ? o[i.facets[0].scale] : o[e.series[0].scale], d = r == 2 ? o[i.facets[1].scale] : o[i.scale], f = s.left, p = s.top, m = s.width, h = s.height, g = e.valToPosH, _ = e.valToPosV;
	return u.ori == 0 ? n(i, c, l, u, d, g, _, f, p, m, h, oa, ca, ua, fa, ma) : n(i, c, l, u, d, _, g, p, f, h, m, sa, la, da, pa, ha);
}
function Qi(e, t) {
	let n = 0, r = 0, i = X(e.bands, Yn);
	for (let e = 0; e < i.length; e++) {
		let a = i[e];
		a.series[0] == t ? n = a.dir : a.series[1] == t && (a.dir == 1 ? r |= 1 : r |= 2);
	}
	return [n, r == 1 ? -1 : r == 2 ? 1 : r == 3 ? 2 : 0];
}
function $i(e, t, n, r, i) {
	let a = e.mode, o = e.series[t], s = a == 2 ? o.facets[1].scale : o.scale, c = e.scales[s];
	return i == -1 ? c.min : i == 1 ? c.max : c.distr == 3 ? c.dir == 1 ? c.min : c.max : 0;
}
function ea(e, t, n, r, i, a) {
	return Zi(e, t, (e, t, o, s, c, l, u, d, f, p, m) => {
		let h = e.pxRound, g = s.dir * (s.ori == 0 ? 1 : -1), _ = s.ori == 0 ? ca : la, v, y;
		g == 1 ? (v = n, y = r) : (v = r, y = n);
		let b = h(l(t[v], s, p, d)), x = h(u(o[v], c, m, f)), S = h(l(t[y], s, p, d)), C = h(u(a == 1 ? c.max : c.min, c, m, f)), w = new Path2D(i);
		return _(w, S, C), _(w, b, C), _(w, b, x), w;
	});
}
function ta(e, t, n, r, i, a) {
	let o = null;
	if (e.length > 0) {
		o = new Path2D();
		let s = t == 0 ? ua : da, c = n;
		for (let t = 0; t < e.length; t++) {
			let n = e[t];
			if (n[1] > n[0]) {
				let e = n[0] - c;
				e > 0 && s(o, c, r, e, r + a), c = n[1];
			}
		}
		let l = n + i - c;
		l > 0 && s(o, c, r - 5, l, r + a + 10);
	}
	return o;
}
function na(e, t, n) {
	let r = e[e.length - 1];
	r && r[0] == t ? r[1] = n : e.push([t, n]);
}
function ra(e, t, n, r, i, a, o) {
	let s = [], c = e.length;
	for (let l = i == 1 ? n : r; l >= n && l <= r; l += i) if (t[l] === null) {
		let u = l, d = l;
		if (i == 1) for (; ++l <= r && t[l] === null;) d = l;
		else for (; --l >= n && t[l] === null;) d = l;
		let f = a(e[u]), p = d == u ? f : a(e[d]), m = u - i;
		f = o <= 0 && m >= 0 && m < c ? a(e[m]) : f;
		let h = d + i;
		p = o >= 0 && h >= 0 && h < c ? a(e[h]) : p, p >= f && s.push([f, p]);
	}
	return s;
}
function ia(e) {
	return e == 0 ? Pn : e == 1 ? yn : (t) => Vn(t, e);
}
function aa(e) {
	let t = e == 0 ? oa : sa, n = e == 0 ? (e, t, n, r, i, a) => {
		e.arcTo(t, n, r, i, a);
	} : (e, t, n, r, i, a) => {
		e.arcTo(n, t, i, r, a);
	}, r = e == 0 ? (e, t, n, r, i) => {
		e.rect(t, n, r, i);
	} : (e, t, n, r, i) => {
		e.rect(n, t, i, r);
	};
	return (e, i, a, o, s, c = 0, l = 0) => {
		c == 0 && l == 0 ? r(e, i, a, o, s) : (c = xn(c, o / 2, s / 2), l = xn(l, o / 2, s / 2), t(e, i + c, a), n(e, i + o, a, i + o, a + s, c), n(e, i + o, a + s, i, a + s, l), n(e, i, a + s, i, a, l), n(e, i, a, i + o, a, c), e.closePath());
	};
}
var oa = (e, t, n) => {
	e.moveTo(t, n);
}, sa = (e, t, n) => {
	e.moveTo(n, t);
}, ca = (e, t, n) => {
	e.lineTo(t, n);
}, la = (e, t, n) => {
	e.lineTo(n, t);
}, ua = aa(0), da = aa(1), fa = (e, t, n, r, i, a) => {
	e.arc(t, n, r, i, a);
}, pa = (e, t, n, r, i, a) => {
	e.arc(n, t, r, i, a);
}, ma = (e, t, n, r, i, a, o) => {
	e.bezierCurveTo(t, n, r, i, a, o);
}, ha = (e, t, n, r, i, a, o) => {
	e.bezierCurveTo(n, t, i, r, o, a);
};
function ga(e) {
	return (e, t, n, r, i) => Zi(e, t, (t, a, o, s, c, l, u, d, f, p, m) => {
		let { pxRound: h, points: g } = t, _, v;
		s.ori == 0 ? (_ = oa, v = fa) : (_ = sa, v = pa);
		let y = Wn(g.width * q, 3), b = (g.size - g.width) / 2 * q, x = Wn(b * 2, 3), S = new Path2D(), C = new Path2D(), { left: w, top: T, width: E, height: D } = e.bbox;
		ua(C, w - x, T - x, E + x * 2, D + x * 2);
		let O = (e) => {
			if (o[e] != null) {
				let t = h(l(a[e], s, p, d)), n = h(u(o[e], c, m, f));
				_(S, t + b, n), v(S, t, n, b, 0, gn * 2);
			}
		};
		if (i) i.forEach(O);
		else for (let e = n; e <= r; e++) O(e);
		return {
			stroke: y > 0 ? S : null,
			fill: S,
			clip: C,
			flags: 3
		};
	});
}
function _a(e) {
	return (t, n, r, i, a, o) => {
		r != i && (a != r && o != r && e(t, n, r), a != i && o != i && e(t, n, i), e(t, n, o));
	};
}
var va = _a(ca), ya = _a(la);
function ba(e) {
	let t = X(e?.alignGaps, 0);
	return (e, n, r, i) => Zi(e, n, (a, o, s, c, l, u, d, f, p, m, h) => {
		[r, i] = tn(s, r, i);
		let g = a.pxRound, _ = (e) => g(u(e, c, m, f)), v = (e) => g(d(e, l, h, p)), y, b;
		c.ori == 0 ? (y = ca, b = va) : (y = la, b = ya);
		let x = c.dir * (c.ori == 0 ? 1 : -1), S = {
			stroke: new Path2D(),
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: Yi
		}, C = S.stroke, w = !1;
		if (i - r >= m * 4) {
			let t = (t) => e.posToVal(t, c.key, !0), n = null, a = null, l, u, d, f = _(o[x == 1 ? r : i]), p = _(o[r]), m = _(o[i]), h = t(x == 1 ? p + 1 : m - 1);
			for (let e = x == 1 ? r : i; e >= r && e <= i; e += x) {
				let r = o[e], i = (x == 1 ? r < h : r > h) ? f : _(r), c = s[e];
				i == f ? c == null ? c === null && (w = !0) : (u = c, n == null ? (y(C, i, v(u)), l = n = a = u) : u < n ? n = u : u > a && (a = u)) : (n != null && b(C, f, v(n), v(a), v(l), v(u)), c == null ? (n = a = null, c === null && (w = !0)) : (u = c, y(C, i, v(u)), n = a = l = u), f = i, h = t(f + x));
			}
			n != null && n != a && d != f && b(C, f, v(n), v(a), v(l), v(u));
		} else for (let e = x == 1 ? r : i; e >= r && e <= i; e += x) {
			let t = s[e];
			t === null ? w = !0 : t != null && y(C, _(o[e]), v(t));
		}
		let [T, E] = Qi(e, n);
		if (a.fill != null || T != 0) {
			let t = S.fill = new Path2D(C), s = v(a.fillTo(e, n, a.min, a.max, T)), c = _(o[r]), l = _(o[i]);
			x == -1 && ([l, c] = [c, l]), y(t, l, s), y(t, c, s);
		}
		if (!a.spanGaps) {
			let l = [];
			w && l.push(...ra(o, s, r, i, x, _, t)), S.gaps = l = a.gaps(e, n, r, i, l), S.clip = ta(l, c.ori, f, p, m, h);
		}
		return E != 0 && (S.band = E == 2 ? [ea(e, n, r, i, C, -1), ea(e, n, r, i, C, 1)] : ea(e, n, r, i, C, E)), S;
	});
}
function xa(e) {
	let t = X(e.align, 1), n = X(e.ascDesc, !1), r = X(e.alignGaps, 0), i = X(e.extend, !1);
	return (e, a, o, s) => Zi(e, a, (c, l, u, d, f, p, m, h, g, _, v) => {
		[o, s] = tn(u, o, s);
		let y = c.pxRound, { left: b, width: x } = e.bbox, S = (e) => y(p(e, d, _, h)), C = (e) => y(m(e, f, v, g)), w = d.ori == 0 ? ca : la, T = {
			stroke: new Path2D(),
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: Yi
		}, E = T.stroke, D = d.dir * (d.ori == 0 ? 1 : -1), O = C(u[D == 1 ? o : s]), ee = S(l[D == 1 ? o : s]), te = ee, k = ee;
		i && t == -1 && (k = b, w(E, k, O)), w(E, ee, O);
		for (let e = D == 1 ? o : s; e >= o && e <= s; e += D) {
			let n = u[e];
			if (n == null) continue;
			let r = S(l[e]), i = C(n);
			t == 1 ? w(E, r, O) : w(E, te, i), w(E, r, i), O = i, te = r;
		}
		let A = te;
		i && t == 1 && (A = b + x, w(E, A, O));
		let [ne, j] = Qi(e, a);
		if (c.fill != null || ne != 0) {
			let t = T.fill = new Path2D(E), n = C(c.fillTo(e, a, c.min, c.max, ne));
			w(t, A, n), w(t, k, n);
		}
		if (!c.spanGaps) {
			let i = [];
			i.push(...ra(l, u, o, s, D, S, r));
			let f = c.width * q / 2, p = n || t == 1 ? f : -f, m = n || t == -1 ? -f : f;
			i.forEach((e) => {
				e[0] += p, e[1] += m;
			}), T.gaps = i = c.gaps(e, a, o, s, i), T.clip = ta(i, d.ori, h, g, _, v);
		}
		return j != 0 && (T.band = j == 2 ? [ea(e, a, o, s, E, -1), ea(e, a, o, s, E, 1)] : ea(e, a, o, s, E, j)), T;
	});
}
function Sa(e, t, n, r, i, a, o = kn) {
	if (e.length > 1) {
		let s = null;
		for (let c = 0, l = Infinity; c < e.length; c++) if (t[c] !== void 0) {
			if (s != null) {
				let t = _n(e[c] - e[s]);
				t < l && (l = t, o = _n(n(e[c], r, i, a) - n(e[s], r, i, a)));
			}
			s = c;
		}
	}
	return o;
}
function Ca(e) {
	e ||= Jn;
	let t = X(e.size, [
		.6,
		kn,
		1
	]), n = e.align || 0, r = e.gap || 0, i = e.radius;
	i = i == null ? [0, 0] : typeof i == "number" ? [i, 0] : i;
	let a = Z(i), o = 1 - t[0], s = X(t[1], kn), c = X(t[2], 1), l = X(e.disp, Jn), u = X(e.each, (e) => {}), { fill: d, stroke: f } = l;
	return (e, t, i, p) => Zi(e, t, (m, h, g, _, v, y, b, x, S, C, w) => {
		let T = m.pxRound, E = n, D = r * q, O = s * q, ee = c * q, te, k;
		_.ori == 0 ? [te, k] = a(e, t) : [k, te] = a(e, t);
		let A = _.dir * (_.ori == 0 ? 1 : -1), ne = _.ori == 0 ? ua : da, j = _.ori == 0 ? u : (e, t, n, r, i, a, o) => {
			u(e, t, n, i, r, o, a);
		}, M = X(e.bands, Yn).find((e) => e.series[0] == t), re = M == null ? 0 : M.dir, ie = m.fillTo(e, t, m.min, m.max, re), N = T(b(ie, v, w, S)), P, F, I, R = C, ae = T(m.width * q), oe = !1, se = null, ce = null, le = null, ue = null;
		d != null && (ae == 0 || f != null) && (oe = !0, se = d.values(e, t, i, p), ce = /* @__PURE__ */ new Map(), new Set(se).forEach((e) => {
			e != null && ce.set(e, new Path2D());
		}), ae > 0 && (le = f.values(e, t, i, p), ue = /* @__PURE__ */ new Map(), new Set(le).forEach((e) => {
			e != null && ue.set(e, new Path2D());
		})));
		let { x0: de, size: fe } = l;
		if (de != null && fe != null) {
			E = 1, h = de.values(e, t, i, p), de.unit == 2 && (h = h.map((t) => e.posToVal(x + t * C, _.key, !0)));
			let n = fe.values(e, t, i, p);
			F = fe.unit == 2 ? n[0] * C : y(n[0], _, C, x) - y(0, _, C, x), R = Sa(h, g, y, _, C, x, R), I = R - F + D;
		} else R = Sa(h, g, y, _, C, x, R), I = R * o + D, F = R - I;
		I < 1 && (I = 0), ae >= F / 2 && (ae = 0), I < 5 && (T = Pn);
		let pe = I > 0, me = R - I - (pe ? ae : 0);
		F = T(jn(me, ee, O)), P = (E == 0 ? F / 2 : E == A ? 0 : F) - E * A * ((E == 0 ? D / 2 : 0) + (pe ? ae / 2 : 0));
		let he = {
			stroke: null,
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: 0
		}, z = oe ? null : new Path2D(), ge = null;
		if (M != null) ge = e.data[M.series[1]];
		else {
			let { y0: n, y1: r } = l;
			n != null && r != null && (g = r.values(e, t, i, p), ge = n.values(e, t, i, p));
		}
		let B = te * F, _e = k * F;
		for (let n = A == 1 ? i : p; n >= i && n <= p; n += A) {
			let r = g[n];
			if (r == null) continue;
			if (ge != null) {
				let e = ge[n] ?? 0;
				if (r - e == 0) continue;
				N = b(e, v, w, S);
			}
			let i = y(_.distr != 2 || l != null ? h[n] : n, _, C, x), a = b(X(r, ie), v, w, S), o = T(i - P), s = T(Sn(a, N)), c = T(xn(a, N)), u = s - c;
			if (r != null) {
				let i = r < 0 ? _e : B, a = r < 0 ? B : _e;
				oe ? (ae > 0 && le[n] != null && ne(ue.get(le[n]), o, c + vn(ae / 2), F, Sn(0, u - ae), i, a), se[n] != null && ne(ce.get(se[n]), o, c + vn(ae / 2), F, Sn(0, u - ae), i, a)) : ne(z, o, c + vn(ae / 2), F, Sn(0, u - ae), i, a), j(e, t, n, o - ae / 2, c, F + ae, u);
			}
		}
		return ae > 0 ? he.stroke = oe ? ue : z : oe || (he._fill = m.width == 0 ? m._fill : m._stroke ?? m._fill, he.width = 0), he.fill = oe ? ce : z, he;
	});
}
function wa(e, t) {
	let n = X(t?.alignGaps, 0);
	return (t, r, i, a) => Zi(t, r, (o, s, c, l, u, d, f, p, m, h, g) => {
		[i, a] = tn(c, i, a);
		let _ = o.pxRound, v = (e) => _(d(e, l, h, p)), y = (e) => _(f(e, u, g, m)), b, x, S;
		l.ori == 0 ? (b = oa, S = ca, x = ma) : (b = sa, S = la, x = ha);
		let C = l.dir * (l.ori == 0 ? 1 : -1), w = v(s[C == 1 ? i : a]), T = w, E = [], D = [];
		for (let e = C == 1 ? i : a; e >= i && e <= a; e += C) if (c[e] != null) {
			let t = s[e], n = v(t);
			E.push(T = n), D.push(y(c[e]));
		}
		let O = {
			stroke: e(E, D, b, S, x, _),
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: Yi
		}, ee = O.stroke, [te, k] = Qi(t, r);
		if (o.fill != null || te != 0) {
			let e = O.fill = new Path2D(ee), n = y(o.fillTo(t, r, o.min, o.max, te));
			S(e, T, n), S(e, w, n);
		}
		if (!o.spanGaps) {
			let e = [];
			e.push(...ra(s, c, i, a, C, v, n)), O.gaps = e = o.gaps(t, r, i, a, e), O.clip = ta(e, l.ori, p, m, h, g);
		}
		return k != 0 && (O.band = k == 2 ? [ea(t, r, i, a, ee, -1), ea(t, r, i, a, ee, 1)] : ea(t, r, i, a, ee, k)), O;
	});
}
function Ta(e) {
	return wa(Ea, e);
}
function Ea(e, t, n, r, i, a) {
	let o = e.length;
	if (o < 2) return null;
	let s = new Path2D();
	if (n(s, e[0], t[0]), o == 2) r(s, e[1], t[1]);
	else {
		let n = Array(o), r = Array(o - 1), a = Array(o - 1), c = Array(o - 1);
		for (let n = 0; n < o - 1; n++) a[n] = t[n + 1] - t[n], c[n] = e[n + 1] - e[n], r[n] = a[n] / c[n];
		n[0] = r[0];
		for (let e = 1; e < o - 1; e++) r[e] === 0 || r[e - 1] === 0 || r[e - 1] > 0 != r[e] > 0 ? n[e] = 0 : (n[e] = 3 * (c[e - 1] + c[e]) / ((2 * c[e] + c[e - 1]) / r[e - 1] + (c[e] + 2 * c[e - 1]) / r[e]), isFinite(n[e]) || (n[e] = 0));
		n[o - 1] = r[o - 2];
		for (let r = 0; r < o - 1; r++) i(s, e[r] + c[r] / 3, t[r] + n[r] * c[r] / 3, e[r + 1] - c[r] / 3, t[r + 1] - n[r + 1] * c[r] / 3, e[r + 1], t[r + 1]);
	}
	return s;
}
var Da = /* @__PURE__ */ new Set();
function Oa() {
	for (let e of Da) e.syncRect(!0);
}
jt && (Yt(Et, Nt, Oa), Yt(Dt, Nt, Oa, !0), Yt(kt, Nt, () => {
	Wa.pxRatio = q;
}));
var ka = ba(), Aa = ga();
function ja(e, t, n, r) {
	return (r ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((e, r) => Na(e, r, t, n));
}
function Ma(e, t) {
	return e.map((e, n) => n == 0 ? {} : or({}, t, e));
}
function Na(e, t, n, r) {
	return or({}, t == 0 ? n : r, e);
}
function Pa(e, t, n) {
	return t == null ? Xn : [t, n];
}
var Fa = Pa;
function Ia(e, t, n) {
	return t == null ? Xn : un(t, n, sn, !0);
}
function La(e, t, n, r) {
	return t == null ? Xn : an(t, n, e.scales[r].log, !1);
}
var Ra = La;
function za(e, t, n, r) {
	return t == null ? Xn : on(t, n, e.scales[r].log, !1);
}
var Ba = za;
function Va(e, t, n, r, i) {
	let a = Sn(An(e), An(t)), o = t - e, s = Zt(i / r * o, n);
	do {
		let e = n[s], t = r * e / o;
		if (t >= i && a + (e < 5 ? Gn.get(e) : 0) <= 17) return [e, t];
	} while (++s < n.length);
	return [0, 0];
}
function Ha(e) {
	let t, n;
	return e = e.replace(/(\d+)px/, (e, r) => (t = yn((n = +r) * q)) + "px"), [
		e,
		t,
		n
	];
}
function Ua(e) {
	e.show && [e.font, e.labelFont].forEach((e) => {
		let t = Wn(e[2] * q, 1);
		e[0] = e[0].replace(/[0-9.]+px/, t + "px"), e[1] = t;
	});
}
function Wa(e, t, n) {
	let r = { mode: X(e.mode, 1) }, i = r.mode;
	function a(e, t, n, r) {
		let i = t.valToPct(e);
		return r + n * (t.dir == -1 ? 1 - i : i);
	}
	function o(e, t, n, r) {
		let i = t.valToPct(e);
		return r + n * (t.dir == -1 ? i : 1 - i);
	}
	function s(e, t, n, r) {
		return t.ori == 0 ? a(e, t, n, r) : o(e, t, n, r);
	}
	r.valToPosH = a, r.valToPosV = o;
	let c = !1;
	r.status = 0;
	let l = r.root = Vt(Je);
	if (e.id != null && (l.id = e.id), Lt(l, e.class), e.title) {
		let t = Vt(Ze, l);
		t.textContent = e.title;
	}
	let u = Bt("canvas"), d = r.ctx = u.getContext("2d"), f = Vt(Qe, l);
	Yt("click", f, (e) => {
		e.target === m && (Q != Nr || Lr != Pr) && zr.click(r, e);
	}, !0);
	let p = r.under = Vt($e, f);
	f.appendChild(u);
	let m = r.over = Vt(et, f);
	e = ar(e);
	let h = +X(e.pxAlign, 1), g = ia(h);
	(e.plugins || []).forEach((t) => {
		t.opts && (e = t.opts(r, e) || e);
	});
	let _ = e.ms || .001, v = r.series = i == 1 ? ja(e.series || [], wi, Ui, !1) : Ma(e.series || [null], Hi), y = r.axes = ja(e.axes || [], xi, Li, !0), b = r.scales = {}, x = r.bands = e.bands || [];
	x.forEach((e) => {
		e.fill = Z(e.fill || null), e.dir = X(e.dir, -1);
	});
	let S = i == 2 ? v[1].facets[0].scale : v[0].scale, C = {
		axes: mr,
		series: Un
	}, w = (e.drawOrder || ["axes", "series"]).map((e) => C[e]);
	function T(e) {
		let t = e.distr == 3 ? (t) => Tn(t > 0 ? t : e.clamp(r, t, e.min, e.max, e.key)) : e.distr == 4 ? (t) => On(t, e.asinh) : e.distr == 100 ? (t) => e.fwd(t) : (e) => e;
		return (n) => {
			let r = t(n), { _min: i, _max: a } = e, o = a - i;
			return (r - i) / o;
		};
	}
	function E(t) {
		let n = b[t];
		if (n == null) {
			let r = (e.scales || Jn)[t] || Jn;
			if (r.from != null) {
				E(r.from);
				let e = or({}, b[r.from], r, { key: t });
				e.valToPct = T(e), b[t] = e;
			} else {
				n = b[t] = or({}, t == S ? Gi : Ki, r), n.key = t;
				let e = n.time, a = n.range, o = Zn(a);
				if ((t != S || i == 2 && !e) && (o && (a[0] == null || a[1] == null) && (a = {
					min: a[0] == null ? Y : {
						mode: 1,
						hard: a[0],
						soft: a[0]
					},
					max: a[1] == null ? Y : {
						mode: 1,
						hard: a[1],
						soft: a[1]
					}
				}, o = !1), !o && tr(a))) {
					let e = a;
					a = (t, n, r) => n == null ? Xn : un(n, r, e);
				}
				n.range = Z(a || (e ? Fa : t == S ? n.distr == 3 ? Ra : n.distr == 4 ? Ba : Pa : n.distr == 3 ? La : n.distr == 4 ? za : Ia)), n.auto = Z(!o && n.auto), n.clamp = Z(n.clamp || Wi), n._min = n._max = null, n.valToPct = T(n);
			}
		}
	}
	E("x"), E("y"), i == 1 && v.forEach((e) => {
		E(e.scale);
	}), y.forEach((e) => {
		E(e.scale);
	});
	for (let t in e.scales) E(t);
	let D = b[S], O = D.distr, ee, te;
	D.ori == 0 ? (Lt(l, Ye), ee = a, te = o) : (Lt(l, Xe), ee = o, te = a);
	let k = {};
	for (let e in b) {
		let t = b[e];
		(t.min != null || t.max != null) && (k[e] = {
			min: t.min,
			max: t.max
		}, t.min = t.max = null);
	}
	let A = e.tzDate || ((e) => new Date(yn(e / _))), ne = e.fmtDate || wr, j = _ == 1 ? Gr(A) : Jr(A), M = Xr(A, Yr(_ == 1 ? Wr : qr, ne)), re = ti(A, $r(ei, ne)), ie = [], N = r.legend = or({}, ii, e.legend), P = r.cursor = or({}, pi, { drag: { y: i == 2 } }, e.cursor), F = N.show, I = P.show, R = N.markers;
	N.idxs = ie, R.width = Z(R.width), R.dash = Z(R.dash), R.stroke = Z(R.stroke), R.fill = Z(R.fill);
	let ae, oe, se, ce = [], le = [], ue, de = !1, fe = {};
	if (N.live) {
		let e = v[1] ? v[1].values : null;
		de = e != null, ue = de ? e(r, 1, 0) : { _: 0 };
		for (let e in ue) fe[e] = At;
	}
	if (F) {
		if (ae = Bt("table", st, l), se = Bt("tbody", null, ae), N.mount(r, ae), de) {
			oe = Bt("thead", null, ae, se);
			let e = Bt("tr", null, oe);
			for (var pe in Bt("th", null, e), ue) Bt("th", ft, e).textContent = pe;
		} else Lt(ae, lt), N.live && Lt(ae, ct);
	}
	let me = { show: !0 }, he = { show: !1 };
	function z(e, t) {
		if (t == 0 && (de || !N.live || i == 2)) return Xn;
		let n = [], a = Bt("tr", ut, se, se.childNodes[t]);
		Lt(a, e.class), e.show || Lt(a, nt);
		let o = Bt("th", null, a);
		if (R.show) {
			let e = Vt(dt, o);
			if (t > 0) {
				let n = R.width(r, t);
				n && (e.style.border = n + "px " + R.dash(r, t) + " " + R.stroke(r, t)), e.style.background = R.fill(r, t);
			}
		}
		let s = Vt(ft, o);
		for (var c in e.label instanceof HTMLElement ? s.appendChild(e.label) : s.textContent = e.label, t > 0 && (R.show || (s.style.color = e.width > 0 ? R.stroke(r, t) : R.fill(r, t)), B("click", o, (t) => {
			if (P._lock) return;
			He(t);
			let n = v.indexOf(e);
			if ((t.ctrlKey || t.metaKey) != N.isolate) {
				let e = v.some((e, t) => t > 0 && t != n && e.show);
				v.forEach((t, r) => {
					r > 0 && ai(r, e ? r == n ? me : he : me, !0, ma.setSeries);
				});
			} else ai(n, { show: !e.show }, !0, ma.setSeries);
		}, !1), Ge && B(Ct, o, (t) => {
			P._lock || (He(t), ai(v.indexOf(e), mi, !0, ma.setSeries));
		}, !1)), ue) {
			let e = Bt("td", pt, a);
			e.textContent = "--", n.push(e);
		}
		return [a, n];
	}
	let ge = /* @__PURE__ */ new Map();
	function B(e, t, n, i = !0) {
		let a = ge.get(t) || {}, o = P.bind[e](r, t, n, i);
		o && (Yt(e, t, a[e] = o), ge.set(t, a));
	}
	function _e(e, t, n) {
		let r = ge.get(t) || {};
		for (let n in r) (e == null || n == e) && (Xt(n, t, r[n]), delete r[n]);
		e ?? ge.delete(t);
	}
	let ve = 0, ye = 0, V = 0, H = 0, be = 0, xe = 0, Se = be, Ce = xe, we = V, Te = H, Ee = 0, De = 0, Oe = 0, ke = 0;
	r.bbox = {};
	let Ae = !1, je = !1, Me = !1, Ne = !1, Pe = !1, Fe = !1;
	function Ie(e, t, n) {
		(n || e != r.width || t != r.height) && Le(e, t), hr(!1), Me = !0, je = !0, br();
	}
	function Le(e, t) {
		r.width = ve = V = e, r.height = ye = H = t, be = xe = 0, Be(), Ve();
		let n = r.bbox;
		Ee = n.left = Vn(be * q, .5), De = n.top = Vn(xe * q, .5), Oe = n.width = Vn(V * q, .5), ke = n.height = Vn(H * q, .5);
	}
	function Re() {
		let e = !1, t = 0;
		for (; !e;) {
			t++;
			let n = dr(t), i = pr(t);
			e = t == 3 || n && i, e || (Le(r.width, r.height), je = !0);
		}
	}
	function ze({ width: e, height: t }) {
		Ie(e, t);
	}
	r.setSize = ze;
	function Be() {
		let e = !1, t = !1, n = !1, r = !1;
		y.forEach((i, a) => {
			if (i.show && i._show) {
				let { side: a, _size: o } = i, s = a % 2, c = o + (i.label == null ? 0 : i.labelSize);
				c > 0 && (s ? (V -= c, a == 3 ? (be += c, r = !0) : n = !0) : (H -= c, a == 0 ? (xe += c, e = !0) : t = !0));
			}
		}), jt[0] = e, jt[1] = n, jt[2] = t, jt[3] = r, V -= Ht[1] + Ht[3], be += Ht[3], H -= Ht[2] + Ht[0], xe += Ht[0];
	}
	function Ve() {
		let e = be + V, t = xe + H, n = be, r = xe;
		function i(i, a) {
			switch (i) {
				case 1: return e += a, e - a;
				case 2: return t += a, t - a;
				case 3: return n -= a, n + a;
				case 0: return r -= a, r + a;
			}
		}
		y.forEach((e, t) => {
			if (e.show && e._show) {
				let t = e.side;
				e._pos = i(t, e._size), e.label != null && (e._lpos = i(t, e.labelSize));
			}
		});
	}
	if (P.dataIdx == null) {
		let e = P.hover, n = e.skip = new Set(e.skip ?? []);
		n.add(void 0);
		let r = e.prox = Z(e.prox), i = e.bias ??= 0;
		P.dataIdx = (e, a, o, s) => {
			if (a == 0) return o;
			let c = o, l = r(e, a, o, s) ?? kn, u = l >= 0 && l < kn, d = D.ori == 0 ? V : H, f = P.left, p = t[0], m = t[a];
			if (n.has(m[o])) {
				c = null;
				let e = null, t = null, r;
				if (i == 0 || i == -1) for (r = o; e == null && r-- > 0;) n.has(m[r]) || (e = r);
				if (i == 0 || i == 1) for (r = o; t == null && r++ < m.length;) n.has(m[r]) || (t = r);
				if (e != null || t != null) {
					if (u) {
						let n = e == null ? -Infinity : ee(p[e], D, d, 0), r = t == null ? Infinity : ee(p[t], D, d, 0), i = f - n, a = r - f;
						i <= a ? i <= l && (c = e) : a <= l && (c = t);
					} else c = t == null ? e : e == null ? t : o - e <= t - o ? e : t;
				}
			} else u && _n(f - ee(p[o], D, d, 0)) > l && (c = null);
			return c;
		};
	}
	let He = (e) => {
		P.event = e;
	};
	P.idxs = ie, P._lock = !1;
	let Ue = P.points;
	Ue.show = Z(Ue.show), Ue.size = Z(Ue.size), Ue.stroke = Z(Ue.stroke), Ue.width = Z(Ue.width), Ue.fill = Z(Ue.fill);
	let We = r.focus = or({}, e.focus || { alpha: .3 }, P.focus), Ge = We.prox >= 0, Ke = Ge && Ue.one, U = [], W = [], qe = [];
	function yt(e, t) {
		let n = Ue.show(r, t);
		if (n instanceof HTMLElement) return Lt(n, ot), Lt(n, e.class), J(n, -10, -10, V, H), m.insertBefore(n, U[t]), n;
	}
	function Et(e, t) {
		if (i == 1 || t > 0) {
			let t = i == 1 && b[e.scale].time, n = e.value;
			e.value = t ? er(n) ? ti(A, $r(n, ne)) : n || re : n || Ii, e.label = e.label || (t ? Ci : Si);
		}
		if (Ke || t > 0) {
			e.width = e.width == null ? 1 : e.width, e.paths = e.paths || ka || In, e.fillTo = Z(e.fillTo || $i), e.pxAlign = +X(e.pxAlign, h), e.pxRound = ia(e.pxAlign), e.stroke = Z(e.stroke || null), e.fill = Z(e.fill || null), e._stroke = e._fill = e._paths = e._focus = null;
			let t = Ri(Sn(1, e.width), 1), n = e.points = or({}, {
				size: t,
				width: Sn(1, t * .2),
				stroke: e.stroke,
				space: t * 2,
				paths: Aa,
				_stroke: null,
				_fill: null
			}, e.points);
			n.show = Z(n.show), n.filter = Z(n.filter), n.fill = Z(n.fill), n.stroke = Z(n.stroke), n.paths = Z(n.paths), n.pxAlign = e.pxAlign;
		}
		if (F) {
			let n = z(e, t);
			ce.splice(t, 0, n[0]), le.splice(t, 0, n[1]), N.values.push(null);
		}
		if (I) {
			ie.splice(t, 0, null);
			let n = null;
			Ke ? t == 0 && (n = yt(e, t)) : t > 0 && (n = yt(e, t)), U.splice(t, 0, n), W.splice(t, 0, 0), qe.splice(t, 0, 0);
		}
		fa("addSeries", t);
	}
	function Dt(e, t) {
		t ??= v.length, e = i == 1 ? Na(e, t, wi, Ui) : Na(e, t, {}, Hi), v.splice(t, 0, e), Et(v[t], t);
	}
	r.addSeries = Dt;
	function Ot(e) {
		if (v.splice(e, 1), F) {
			N.values.splice(e, 1), le.splice(e, 1);
			let t = ce.splice(e, 1)[0];
			_e(null, t.firstChild), t.remove();
		}
		I && (ie.splice(e, 1), U.splice(e, 1)[0].remove(), W.splice(e, 1), qe.splice(e, 1)), fa("delSeries", e);
	}
	r.delSeries = Ot;
	let jt = [
		!1,
		!1,
		!1,
		!1
	];
	function Pt(e, t) {
		if (e._show = e.show, e.show) {
			let n = e.side % 2, i = b[e.scale];
			i ??= (e.scale = n ? v[1].scale : S, b[e.scale]);
			let a = i.time;
			e.size = Z(e.size), e.space = Z(e.space), e.rotate = Z(e.rotate), Zn(e.incrs) && e.incrs.forEach((e) => {
				!Gn.has(e) && Gn.set(e, Kn(e));
			}), e.incrs = Z(e.incrs || (i.distr == 2 ? jr : a ? _ == 1 ? Ur : Kr : Mr)), e.splits = Z(e.splits || (a && i.distr == 1 ? j : i.distr == 3 ? Di : i.distr == 4 ? Oi : Ei)), e.stroke = Z(e.stroke), e.grid.stroke = Z(e.grid.stroke), e.ticks.stroke = Z(e.ticks.stroke), e.border.stroke = Z(e.border.stroke);
			let o = e.values;
			e.values = Zn(o) && !Zn(o[0]) ? Z(o) : a ? Zn(o) ? Xr(A, Yr(o, ne)) : er(o) ? Zr(A, o) : o || M : o || Ti, e.filter = Z(e.filter || (i.distr >= 3 && i.log == 10 ? Pi : i.distr == 3 && i.log == 2 ? Fi : Fn)), e.font = Ha(e.font), e.labelFont = Ha(e.labelFont), e._size = e.size(r, null, t, 0), e._space = e._rotate = e._incrs = e._found = e._splits = e._values = null, e._size > 0 && (jt[t] = !0, e._el = Vt(tt, f));
		}
	}
	function Ft(e, t, n, r) {
		let [i, a, o, s] = n, c = t % 2, l = 0;
		return c == 0 && (s || a) && (l = t == 0 && !i || t == 2 && !o ? yn(xi.size / 3) : 0), c == 1 && (i || o) && (l = t == 1 && !a || t == 3 && !s ? yn(Li.size / 2) : 0), l;
	}
	let It = r.padding = (e.padding || [
		Ft,
		Ft,
		Ft,
		Ft
	]).map((e) => Z(X(e, Ft))), Ht = r._padding = It.map((e, t) => e(r, t, jt, 0)), Ut, Gt = null, qt = null, Jt = i == 1 ? v[0].idxs : null, Qt = null, $t = !1;
	function en(e, n) {
		if (t = e ?? [], r.data = r._data = t, i == 2) {
			Ut = 0;
			for (let e = 1; e < v.length; e++) Ut += t[e][0].length;
		} else {
			t.length == 0 && (r.data = r._data = t = [[]]), Qt = t[0], Ut = Qt.length;
			let e = t;
			if (O == 2) {
				e = t.slice();
				let n = e[0] = Array(Ut);
				for (let e = 0; e < Ut; e++) n[e] = e;
			}
			r._data = t = e;
		}
		if (hr(!0), fa("setData"), O == 2 && (Me = !0), n !== !1) {
			let e = D;
			e.auto(r, $t) ? tn() : ri(S, e.min, e.max), Ne ||= P.left >= 0, Fe = !0, br();
		}
	}
	r.setData = en;
	function tn() {
		$t = !0;
		let e, n;
		i == 1 && (Ut > 0 ? (Gt = Jt[0] = 0, qt = Jt[1] = Ut - 1, e = t[0][Gt], n = t[0][qt], O == 2 ? (e = Gt, n = qt) : e == n && (O == 3 ? [e, n] = an(e, e, D.log, !1) : O == 4 ? [e, n] = on(e, e, D.log, !1) : D.time ? n = e + yn(86400 / _) : [e, n] = un(e, n, sn, !0))) : (Gt = Jt[0] = e = null, qt = Jt[1] = n = null)), ri(S, e, n);
	}
	let nn, cn, ln, fn, pn, mn, hn, vn, wn, En;
	function An(e, t, n, r, i, a) {
		e ??= bt, n ??= Yn, r ??= "butt", i ??= bt, a ??= "round", e != nn && (d.strokeStyle = nn = e), i != cn && (d.fillStyle = cn = i), t != ln && (d.lineWidth = ln = t), a != pn && (d.lineJoin = pn = a), r != mn && (d.lineCap = mn = r), n != fn && d.setLineDash(fn = n);
	}
	function Nn(e, t, n, r) {
		t != cn && (d.fillStyle = cn = t), e != hn && (d.font = hn = e), n != vn && (d.textAlign = vn = n), r != wn && (d.textBaseline = wn = r);
	}
	function Pn(e, t, n, i, a = 0) {
		if (i.length > 0 && e.auto(r, $t) && (t == null || t.min == null)) {
			let t = X(Gt, 0), r = X(qt, i.length - 1), o = n.min == null ? rn(i, t, r, a, e.distr == 3) : [n.min, n.max];
			e.min = xn(e.min, n.min = o[0]), e.max = Sn(e.max, n.max = o[1]);
		}
	}
	let zn = {
		min: null,
		max: null
	};
	function Bn() {
		for (let e in b) {
			let t = b[e];
			k[e] == null && (t.min == null || k[S] != null && t.auto(r, $t)) && (k[e] = zn);
		}
		for (let e in b) {
			let t = b[e];
			k[e] == null && t.from != null && k[t.from] != null && (k[e] = zn);
		}
		k[S] != null && hr(!0);
		let e = {};
		for (let t in k) {
			let n = k[t];
			if (n != null) {
				let a = e[t] = ar(b[t], nr);
				if (n.min != null) or(a, n);
				else if (t != S || i == 2) {
					if (Ut == 0 && a.from == null) {
						let e = a.range(r, null, null, t);
						a.min = e[0], a.max = e[1];
					} else a.min = kn, a.max = -Infinity;
				}
			}
		}
		if (Ut > 0) {
			v.forEach((n, a) => {
				if (i == 1) {
					let i = n.scale, o = k[i];
					if (o == null) return;
					let s = e[i];
					if (a == 0) {
						let e = s.range(r, s.min, s.max, i);
						s.min = e[0], s.max = e[1], Gt = Zt(s.min, t[0]), qt = Zt(s.max, t[0]), qt - Gt > 1 && (t[0][Gt] < s.min && Gt++, t[0][qt] > s.max && qt--), n.min = Qt[Gt], n.max = Qt[qt];
					} else n.show && n.auto && Pn(s, o, n, t[a], n.sorted);
					n.idxs[0] = Gt, n.idxs[1] = qt;
				} else if (a > 0 && n.show && n.auto) {
					let [r, i] = n.facets, o = r.scale, s = i.scale, [c, l] = t[a], u = e[o], d = e[s];
					u != null && Pn(u, k[o], r, c, r.sorted), d != null && Pn(d, k[s], i, l, i.sorted), n.min = i.min, n.max = i.max;
				}
			});
			for (let t in e) {
				let n = e[t], i = k[t];
				if (n.from == null && (i == null || i.min == null)) {
					let e = n.range(r, n.min == kn ? null : n.min, n.max == -Infinity ? null : n.max, t);
					n.min = e[0], n.max = e[1];
				}
			}
		}
		for (let t in e) {
			let n = e[t];
			if (n.from != null) {
				let i = e[n.from];
				if (i.min == null) n.min = n.max = null;
				else {
					let e = n.range(r, i.min, i.max, t);
					n.min = e[0], n.max = e[1];
				}
			}
		}
		let n = {}, a = !1;
		for (let t in e) {
			let r = e[t], i = b[t];
			if (i.min != r.min || i.max != r.max) {
				i.min = r.min, i.max = r.max;
				let e = i.distr;
				i._min = e == 3 ? Tn(i.min) : e == 4 ? On(i.min, i.asinh) : e == 100 ? i.fwd(i.min) : i.min, i._max = e == 3 ? Tn(i.max) : e == 4 ? On(i.max, i.asinh) : e == 100 ? i.fwd(i.max) : i.max, n[t] = a = !0;
			}
		}
		if (a) {
			v.forEach((e, t) => {
				i == 2 ? t > 0 && n.y && (e._paths = null) : n[e.scale] && (e._paths = null);
			});
			for (let e in n) Me = !0, fa("setScale", e);
			I && P.left >= 0 && (Ne = Fe = !0);
		}
		for (let e in k) k[e] = null;
	}
	function Hn(e) {
		let t = jn(Gt - 1, 0, Ut - 1), n = jn(qt + 1, 0, Ut - 1);
		for (; e[t] == null && t > 0;) t--;
		for (; e[n] == null && n < Ut - 1;) n++;
		return [t, n];
	}
	function Un() {
		if (Ut > 0) {
			let e = v.some((e) => e._focus) && En != We.alpha;
			e && (d.globalAlpha = En = We.alpha), v.forEach((e, n) => {
				if (n > 0 && e.show && (qn(n, !1), qn(n, !0), e._paths == null)) {
					let a = En;
					En != e.alpha && (d.globalAlpha = En = e.alpha);
					let o = i == 2 ? [0, t[n][0].length - 1] : Hn(t[n]);
					e._paths = e.paths(r, n, o[0], o[1]), En != a && (d.globalAlpha = En = a);
				}
			}), v.forEach((e, t) => {
				if (t > 0 && e.show) {
					let n = En;
					En != e.alpha && (d.globalAlpha = En = e.alpha), e._paths != null && Qn(t, !1);
					{
						let n = e._paths == null ? null : e._paths.gaps, i = e.points.show(r, t, Gt, qt, n), a = e.points.filter(r, t, i, n);
						(i || a) && (e.points._paths = e.points.paths(r, t, Gt, qt, a), Qn(t, !0));
					}
					En != n && (d.globalAlpha = En = n), fa("drawSeries", t);
				}
			}), e && (d.globalAlpha = En = 1);
		}
	}
	function qn(e, t) {
		let n = t ? v[e].points : v[e];
		n._stroke = n.stroke(r, e), n._fill = n.fill(r, e);
	}
	function Qn(e, t) {
		let n = t ? v[e].points : v[e], { stroke: r, fill: i, clip: a, flags: o, _stroke: s = n._stroke, _fill: c = n._fill, _width: l = n.width } = n._paths;
		l = Wn(l * q, 3);
		let u = null, f = l % 2 / 2;
		t && c == null && (c = l > 0 ? "#fff" : s);
		let p = n.pxAlign == 1 && f > 0;
		if (p && d.translate(f, f), !t) {
			let e = Ee - l / 2, t = De - l / 2, n = Oe + l, r = ke + l;
			u = new Path2D(), u.rect(e, t, n, r);
		}
		t ? ir(s, l, n.dash, n.cap, c, r, i, o, a) : rr(e, s, l, n.dash, n.cap, c, r, i, o, u, a), p && d.translate(-f, -f);
	}
	function rr(e, n, i, a, o, s, c, l, u, d, f) {
		let p = !1;
		u != 0 && x.forEach((m, h) => {
			if (m.series[0] == e) {
				let e = v[m.series[1]], g = t[m.series[1]], _ = (e._paths || Jn).band;
				Zn(_) && (_ = m.dir == 1 ? _[0] : _[1]);
				let y, b = null;
				e.show && _ && dn(g, Gt, qt) ? (b = m.fill(r, h) || s, y = e._paths.clip) : _ = null, ir(n, i, a, o, b, c, l, u, d, f, y, _), p = !0;
			}
		}), p || ir(n, i, a, o, s, c, l, u, d, f);
	}
	function ir(e, t, n, r, i, a, o, s, c, l, u, f) {
		An(e, t, n, r, i), (c || l || f) && (d.save(), c && d.clip(c), l && d.clip(l)), f ? (s & 3) == 3 ? (d.clip(f), u && d.clip(u), cr(i, o), sr(e, a, t)) : s & Xi ? (cr(i, o), d.clip(f), sr(e, a, t)) : s & Yi && (d.save(), d.clip(f), u && d.clip(u), cr(i, o), d.restore(), sr(e, a, t)) : (cr(i, o), sr(e, a, t)), (c || l || f) && d.restore();
	}
	function sr(e, t, n) {
		n > 0 && (t instanceof Map ? t.forEach((e, t) => {
			d.strokeStyle = nn = t, d.stroke(e);
		}) : t != null && e && d.stroke(t));
	}
	function cr(e, t) {
		t instanceof Map ? t.forEach((e, t) => {
			d.fillStyle = cn = t, d.fill(e);
		}) : t != null && e && d.fill(t);
	}
	function lr(e, t, n, i) {
		let a = y[e], o;
		if (i <= 0) o = [0, 0];
		else {
			let s = a._space = a.space(r, e, t, n, i);
			o = Va(t, n, a._incrs = a.incrs(r, e, t, n, i, s), i, s);
		}
		return a._found = o;
	}
	function ur(e, t, n, r, i, a, o, s, c, l) {
		let u = o % 2 / 2;
		h == 1 && d.translate(u, u), An(s, o, c, l, s), d.beginPath();
		let f, p, m, g, _ = i + (r == 0 || r == 3 ? -a : a);
		n == 0 ? (p = i, g = _) : (f = i, m = _);
		for (let r = 0; r < e.length; r++) t[r] != null && (n == 0 ? f = m = e[r] : p = g = e[r], d.moveTo(f, p), d.lineTo(m, g));
		d.stroke(), h == 1 && d.translate(-u, -u);
	}
	function dr(e) {
		let t = !0;
		return y.forEach((n, i) => {
			if (!n.show) return;
			let a = b[n.scale];
			if (a.min == null) {
				n._show && (t = !1, n._show = !1, hr(!1));
				return;
			}
			n._show || (t = !1, n._show = !0, hr(!1));
			let o = n.side, s = o % 2, { min: c, max: l } = a, [u, d] = lr(i, c, l, s == 0 ? V : H);
			if (d == 0) return;
			let f = a.distr == 2, p = n._splits = n.splits(r, i, c, l, u, d, f), m = a.distr == 2 ? p.map((e) => Qt[e]) : p, h = a.distr == 2 ? Qt[p[1]] - Qt[p[0]] : u, g = n._values = n.values(r, n.filter(r, m, i, d, h), i, d, h);
			n._rotate = o == 2 ? n.rotate(r, g, i, d) : 0;
			let _ = n._size;
			n._size = bn(n.size(r, g, i, e)), _ != null && n._size != _ && (t = !1);
		}), t;
	}
	function pr(e) {
		let t = !0;
		return It.forEach((n, i) => {
			let a = n(r, i, jt, e);
			a != Ht[i] && (t = !1), Ht[i] = a;
		}), t;
	}
	function mr() {
		for (let e = 0; e < y.length; e++) {
			let t = y[e];
			if (!t.show || !t._show) continue;
			let n = t.side, i = n % 2, a, o, c = t.stroke(r, e), l = n == 0 || n == 3 ? -1 : 1, [u, f] = t._found;
			if (t.label != null) {
				let s = t.labelGap * l, p = yn((t._lpos + s) * q);
				Nn(t.labelFont[0], c, "center", n == 2 ? gt : G), d.save(), i == 1 ? (a = o = 0, d.translate(p, yn(De + ke / 2)), d.rotate((n == 3 ? -gn : gn) / 2)) : (a = yn(Ee + Oe / 2), o = p);
				let m = Mn(t.label) ? t.label(r, e, u, f) : t.label;
				d.fillText(m, a, o), d.restore();
			}
			if (f == 0) continue;
			let p = b[t.scale], m = i == 0 ? Oe : ke, h = i == 0 ? Ee : De, _ = t._splits, v = p.distr == 2 ? _.map((e) => Qt[e]) : _, x = p.distr == 2 ? Qt[_[1]] - Qt[_[0]] : u, S = t.ticks, C = t.border, w = S.show ? S.size : 0, T = yn(w * q), E = yn((t.alignTo == 2 ? t._size - w - t.gap : t.gap) * q), D = t._rotate * -gn / 180, O = g(t._pos * q), ee = O + (T + E) * l;
			o = i == 0 ? ee : 0, a = i == 1 ? ee : 0;
			let te = t.font[0];
			Nn(te, c, t.align == 1 ? _t : t.align == 2 ? vt : D > 0 ? _t : D < 0 ? vt : i == 0 ? "center" : n == 3 ? vt : _t, D || i == 1 ? "middle" : n == 2 ? gt : G);
			let k = t.font[1] * t.lineGap, A = _.map((e) => g(s(e, p, m, h))), ne = t._values;
			for (let e = 0; e < ne.length; e++) {
				let t = ne[e];
				if (t != null) {
					i == 0 ? a = A[e] : o = A[e], t = "" + t;
					let n = t.indexOf("\n") == -1 ? [t] : t.split(/\n/gm);
					for (let e = 0; e < n.length; e++) {
						let t = n[e];
						D ? (d.save(), d.translate(a, o + e * k), d.rotate(D), d.fillText(t, 0, 0), d.restore()) : d.fillText(t, a, o + e * k);
					}
				}
			}
			S.show && ur(A, S.filter(r, v, e, f, x), i, n, O, T, Wn(S.width * q, 3), S.stroke(r, e), S.dash, S.cap);
			let j = t.grid;
			j.show && ur(A, j.filter(r, v, e, f, x), i, i == 0 ? 2 : 1, i == 0 ? De : Ee, i == 0 ? ke : Oe, Wn(j.width * q, 3), j.stroke(r, e), j.dash, j.cap), C.show && ur([O], [1], +(i == 0), i == 0 ? 1 : 2, i == 1 ? De : Ee, i == 1 ? ke : Oe, Wn(C.width * q, 3), C.stroke(r, e), C.dash, C.cap);
		}
		fa("drawAxes");
	}
	function hr(e) {
		v.forEach((t, n) => {
			n > 0 && (t._paths = null, e && (i == 1 ? (t.min = null, t.max = null) : t.facets.forEach((e) => {
				e.min = null, e.max = null;
			})));
		});
	}
	let gr = !1, _r = !1, vr = [];
	function yr() {
		_r = !1;
		for (let e = 0; e < vr.length; e++) fa(...vr[e]);
		vr.length = 0;
	}
	function br() {
		gr ||= (fr(Sr), !0);
	}
	function xr(e, t = !1) {
		gr = !0, _r = t, e(r), Sr(), t && vr.length > 0 && queueMicrotask(yr);
	}
	r.batch = xr;
	function Sr() {
		if (Ae &&= (Bn(), !1), Me &&= (Re(), !1), je) {
			if (zt(p, _t, be), zt(p, gt, xe), zt(p, mt, V), zt(p, ht, H), zt(m, _t, be), zt(m, gt, xe), zt(m, mt, V), zt(m, ht, H), zt(f, mt, ve), zt(f, ht, ye), u.width = yn(ve * q), u.height = yn(ye * q), y.forEach(({ _el: e, _show: t, _size: n, _pos: r, side: i }) => {
				if (e != null) {
					if (t) {
						let t = i === 3 || i === 0 ? n : 0, a = i % 2 == 1;
						zt(e, a ? "left" : "top", r - t), zt(e, a ? "width" : "height", n), zt(e, a ? "top" : "left", a ? xe : be), zt(e, a ? "height" : "width", a ? H : V), Rt(e, nt);
					} else Lt(e, nt);
				}
			}), nn = cn = ln = pn = mn = hn = vn = wn = fn = null, En = 1, Bi(!0), be != Se || xe != Ce || V != we || H != Te) {
				hr(!1);
				let e = V / we, t = H / Te;
				if (I && !Ne && P.left >= 0) {
					P.left *= e, P.top *= t, Dr && J(Dr, yn(P.left), 0, V, H), Or && J(Or, 0, yn(P.top), V, H);
					for (let n = 0; n < U.length; n++) {
						let r = U[n];
						r != null && (W[n] *= e, qe[n] *= t, J(r, bn(W[n]), bn(qe[n]), V, H));
					}
				}
				if ($.show && !Pe && $.left >= 0 && $.width > 0) {
					$.left *= e, $.width *= e, $.top *= t, $.height *= t;
					for (let e in Zi) zt(Hr, e, $[e]);
				}
				Se = be, Ce = xe, we = V, Te = H;
			}
			fa("setSize"), je = !1;
		}
		ve > 0 && ye > 0 && (d.clearRect(0, 0, u.width, u.height), fa("drawClear"), w.forEach((e) => e()), fa("draw")), $.show && Pe && (Qr($), Pe = !1), I && Ne && (Ni(null, !0, !1), Ne = !1), N.show && N.live && Fe && (ji(), Fe = !1), c || (c = !0, r.status = 1, fa("ready")), $t = !1, gr = !1;
	}
	r.redraw = (e, t) => {
		Me = t || !1, e === !1 ? br() : ri(S, D.min, D.max);
	};
	function Cr(e, n) {
		let i = b[e];
		if (i.from == null) {
			if (Ut == 0) {
				let t = i.range(r, n.min, n.max, e);
				n.min = t[0], n.max = t[1];
			}
			if (n.min > n.max) {
				let e = n.min;
				n.min = n.max, n.max = e;
			}
			if (Ut > 1 && n.min != null && n.max != null && n.max - n.min < 1e-16) return;
			e == S && i.distr == 2 && Ut > 0 && (n.min = Zt(n.min, t[0]), n.max = Zt(n.max, t[0]), n.min == n.max && n.max++), k[e] = n, Ae = !0, br();
		}
	}
	r.setScale = Cr;
	let Tr, Er, Dr, Or, kr, Ar, Nr, Pr, Fr, Ir, Q, Lr, Rr = !1, zr = P.drag, Br = zr.x, Vr = zr.y;
	I && (P.x && (Tr = Vt(it, m)), P.y && (Er = Vt(at, m)), D.ori == 0 ? (Dr = Tr, Or = Er) : (Dr = Er, Or = Tr), Q = P.left, Lr = P.top);
	let $ = r.select = or({
		show: !0,
		over: !0,
		left: 0,
		width: 0,
		top: 0,
		height: 0
	}, e.select), Hr = $.show ? Vt(rt, $.over ? m : p) : null;
	function Qr(e, t) {
		if ($.show) {
			for (let t in e) $[t] = e[t], t in Zi && zt(Hr, t, e[t]);
			t !== !1 && fa("setSelect");
		}
	}
	r.setSelect = Qr;
	function ni(e) {
		if (v[e].show) F && Rt(ce[e], nt);
		else if (F && Lt(ce[e], nt), I) {
			let t = Ke ? U[0] : U[e];
			t != null && J(t, -10, -10, V, H);
		}
	}
	function ri(e, t, n) {
		Cr(e, {
			min: t,
			max: n
		});
	}
	function ai(e, t, n, a) {
		t.focus != null && hi(e), t.show != null && v.forEach((n, r) => {
			r > 0 && (e == r || e == null) && (n.show = t.show, ni(r), i == 2 ? (ri(n.facets[0].scale, null, null), ri(n.facets[1].scale, null, null)) : ri(n.scale, null, null), br());
		}), n !== !1 && fa("setSeries", e, t), a && _a("setSeries", r, e, t);
	}
	r.setSeries = ai;
	function oi(e, t) {
		or(x[e], t);
	}
	function si(e, t) {
		e.fill = Z(e.fill || null), e.dir = X(e.dir, -1), t ??= x.length, x.splice(t, 0, e);
	}
	function ci(e) {
		e == null ? x.length = 0 : x.splice(e, 1);
	}
	r.addBand = si, r.setBand = oi, r.delBand = ci;
	function li(e, t) {
		v[e].alpha = t, I && U[e] != null && (U[e].style.opacity = t), F && ce[e] && (ce[e].style.opacity = t);
	}
	let ui, di, fi, mi = { focus: !0 };
	function hi(e) {
		if (e != fi) {
			let t = e == null, n = We.alpha != 1;
			v.forEach((r, a) => {
				if (i == 1 || a > 0) {
					let i = t || a == 0 || a == e;
					r._focus = t ? null : i, n && li(a, i ? 1 : We.alpha);
				}
			}), fi = e, n && br();
		}
	}
	F && Ge && B(wt, ae, (e) => {
		P._lock || (He(e), fi != null && ai(null, mi, !0, ma.setSeries));
	});
	function gi(e, t, n) {
		let r = b[t];
		n && (e = e / q - (r.ori == 1 ? xe : be));
		let i = V;
		r.ori == 1 && (i = H, e = i - e), r.dir == -1 && (e = i - e);
		let a = r._min, o = r._max, s = e / i, c = a + (o - a) * s, l = r.distr;
		return l == 3 ? Cn(10, c) : l == 4 ? Dn(c, r.asinh) : l == 100 ? r.bwd(c) : c;
	}
	function _i(e, n) {
		return Zt(gi(e, S, n), t[0], Gt, qt);
	}
	r.valToIdx = (e) => Zt(e, t[0]), r.posToIdx = _i, r.posToVal = gi, r.valToPos = (e, t, n) => b[t].ori == 0 ? a(e, b[t], n ? Oe : V, n ? Ee : 0) : o(e, b[t], n ? ke : H, n ? De : 0), r.setCursor = (e, t, n) => {
		Q = e.left, Lr = e.top, Ni(null, t, n);
	};
	function vi(e, t) {
		zt(Hr, _t, $.left = e), zt(Hr, mt, $.width = t);
	}
	function yi(e, t) {
		zt(Hr, gt, $.top = e), zt(Hr, ht, $.height = t);
	}
	let bi = D.ori == 0 ? vi : yi, ki = D.ori == 1 ? vi : yi;
	function Ai() {
		if (F && N.live) for (let e = +(i == 2); e < v.length; e++) {
			if (e == 0 && de) continue;
			let t = N.values[e], n = 0;
			for (let r in t) le[e][n++].firstChild.nodeValue = t[r];
		}
	}
	function ji(e, t) {
		if (e != null && (e.idxs ? e.idxs.forEach((e, t) => {
			ie[t] = e;
		}) : $n(e.idx) || ie.fill(e.idx), N.idx = ie[0]), F && N.live) {
			for (let e = 0; e < v.length; e++) (e > 0 || i == 1 && !de) && Mi(e, ie[e]);
			Ai();
		}
		Fe = !1, t !== !1 && fa("setLegend");
	}
	r.setLegend = ji;
	function Mi(e, n) {
		let i = v[e], a = e == 0 && O == 2 ? Qt : t[e], o;
		de ? o = i.values(r, e, n) ?? fe : (o = i.value(r, n == null ? null : a[n], e, n), o = o == null ? fe : { _: o }), N.values[e] = o;
	}
	function Ni(e, n, a) {
		Fr = Q, Ir = Lr, [Q, Lr] = P.move(r, Q, Lr), P.left = Q, P.top = Lr, I && (Dr && J(Dr, yn(Q), 0, V, H), Or && J(Or, 0, yn(Lr), V, H));
		let o, s = Gt > qt;
		ui = kn, di = null;
		let c = D.ori == 0 ? V : H, l = D.ori == 1 ? V : H;
		if (Q < 0 || Ut == 0 || s) {
			o = P.idx = null;
			for (let e = 0; e < v.length; e++) {
				let t = U[e];
				t != null && J(t, -10, -10, V, H);
			}
			Ge && ai(null, mi, !0, e == null && ma.setSeries), N.live && (ie.fill(o), Fe = !0);
		} else {
			let e, n, a;
			i == 1 && (e = D.ori == 0 ? Q : Lr, n = gi(e, S), o = P.idx = Zt(n, t[0], Gt, qt), a = ee(t[0][o], D, c, 0));
			let s = -10, u = -10, d = 0, f = 0, p = !0, m = "", h = "";
			for (let e = +(i == 2); e < v.length; e++) {
				let g = v[e], _ = ie[e], y = _ == null ? null : i == 1 ? t[e][_] : t[e][1][_], x = P.dataIdx(r, e, o, n), S = x == null ? null : i == 1 ? t[e][x] : t[e][1][x];
				if (Fe = Fe || S != y || x != _, ie[e] = x, e > 0 && g.show) {
					let n = x == null ? -10 : x == o ? a : ee(i == 1 ? t[0][x] : t[e][0][x], D, c, 0), _ = S == null ? -10 : te(S, i == 1 ? b[g.scale] : b[g.facets[1].scale], l, 0);
					if (Ge && S != null) {
						let t = D.ori == 1 ? Q : Lr, n = _n(We.dist(r, e, x, _, t));
						if (n < ui) {
							let r = We.bias;
							if (r != 0) {
								let i = gi(t, g.scale), a = S >= 0 ? 1 : -1, o = i >= 0 ? 1 : -1;
								o == a && (o == 1 ? r == 1 ? S >= i : S <= i : r == 1 ? S <= i : S >= i) && (ui = n, di = e);
							} else ui = n, di = e;
						}
					}
					if (Fe || Ke) {
						let t, i;
						D.ori == 0 ? (t = n, i = _) : (t = _, i = n);
						let a, o, c, l, g, v, y = !0, b = Ue.bbox;
						if (b != null) {
							y = !1;
							let t = b(r, e);
							c = t.left, l = t.top, a = t.width, o = t.height;
						} else c = t, l = i, a = o = Ue.size(r, e);
						if (v = Ue.fill(r, e), g = Ue.stroke(r, e), Ke) e == di && ui <= We.prox && (s = c, u = l, d = a, f = o, p = y, m = v, h = g);
						else {
							let t = U[e];
							t != null && (W[e] = c, qe[e] = l, Kt(t, a, o, y), Wt(t, v, g), J(t, bn(c), bn(l), V, H));
						}
					}
				}
			}
			if (Ke) {
				let e = We.prox;
				if (Fe || (fi == null ? ui <= e : ui > e || di != fi)) {
					let e = U[0];
					e != null && (W[0] = s, qe[0] = u, Kt(e, d, f, p), Wt(e, m, h), J(e, bn(s), bn(u), V, H));
				}
			}
		}
		if ($.show && Rr) {
			if (e != null) {
				let [t, n] = ma.scales, [r, i] = ma.match, [a, o] = e.cursor.sync.scales, s = e.cursor.drag;
				if (Br = s._x, Vr = s._y, Br || Vr) {
					let { left: s, top: u, width: d, height: f } = e.select, p = e.scales[a].ori, m = e.posToVal, h, g, _, v, y, x = t != null && r(t, a), S = n != null && i(n, o);
					x && Br ? (p == 0 ? (h = s, g = d) : (h = u, g = f), _ = b[t], v = ee(m(h, a), _, c, 0), y = ee(m(h + g, a), _, c, 0), bi(xn(v, y), _n(y - v))) : bi(0, c), S && Vr ? (p == 1 ? (h = s, g = d) : (h = u, g = f), _ = b[n], v = te(m(h, o), _, l, 0), y = te(m(h + g, o), _, l, 0), ki(xn(v, y), _n(y - v))) : ki(0, l);
				} else Qi();
			} else {
				let e = _n(Fr - kr), t = _n(Ir - Ar);
				if (D.ori == 1) {
					let n = e;
					e = t, t = n;
				}
				Br = zr.x && e >= zr.dist, Vr = zr.y && t >= zr.dist;
				let n = zr.uni;
				n == null ? zr.x && zr.y && (Br || Vr) && (Br = Vr = !0) : Br && Vr && (Br = e >= n, Vr = t >= n, !Br && !Vr && (t > e ? Vr = !0 : Br = !0));
				let r, i;
				Br && (D.ori == 0 ? (r = Nr, i = Q) : (r = Pr, i = Lr), bi(xn(r, i), _n(i - r)), Vr || ki(0, l)), Vr && (D.ori == 1 ? (r = Nr, i = Q) : (r = Pr, i = Lr), ki(xn(r, i), _n(i - r)), Br || bi(0, c)), !Br && !Vr && (bi(0, 0), ki(0, 0));
			}
		}
		if (zr._x = Br, zr._y = Vr, e == null) {
			if (a) {
				if (ha != null) {
					let [e, t] = ma.scales;
					ma.values[0] = e == null ? null : gi(D.ori == 0 ? Q : Lr, e), ma.values[1] = t == null ? null : gi(D.ori == 1 ? Q : Lr, t);
				}
				_a(xt, r, Q, Lr, V, H, o);
			}
			if (Ge) {
				let e = a && ma.setSeries, t = We.prox;
				fi == null ? ui <= t && ai(di, mi, !0, e) : ui > t ? ai(null, mi, !0, e) : di != fi && ai(di, mi, !0, e);
			}
		}
		Fe && (N.idx = o, ji()), n !== !1 && fa("setCursor");
	}
	let zi = null;
	Object.defineProperty(r, "rect", { get() {
		return zi ?? Bi(!1), zi;
	} });
	function Bi(e = !1) {
		e ? zi = null : (zi = m.getBoundingClientRect(), fa("syncRect", zi));
	}
	function Vi(e, t, n, r, i, a, o) {
		P._lock || Rr && e != null && e.movementX == 0 && e.movementY == 0 || (qi(e, t, n, r, i, a, o, !1, e != null), e == null ? Ni(t, !0, !1) : Ni(null, !0, !0));
	}
	function qi(e, t, n, i, a, o, c, l, u) {
		if (zi ?? Bi(!1), He(e), e != null) n = e.clientX - zi.left, i = e.clientY - zi.top;
		else {
			if (n < 0 || i < 0) {
				Q = -10, Lr = -10;
				return;
			}
			let [e, r] = ma.scales, c = t.cursor.sync, [l, u] = c.values, [d, f] = c.scales, [p, m] = ma.match, h = t.axes[0].side % 2 == 1, g = D.ori == 0 ? V : H, _ = D.ori == 1 ? V : H, v = h ? o : a, y = h ? a : o, x = h ? i : n, S = h ? n : i;
			if (n = d == null ? x / v * g : p(e, d) ? s(l, b[e], g, 0) : -10, i = f == null ? S / y * _ : m(r, f) ? s(u, b[r], _, 0) : -10, D.ori == 1) {
				let e = n;
				n = i, i = e;
			}
		}
		u && (t == null || t.cursor.event.type == xt) && ((n <= 1 || n >= V - 1) && (n = Vn(n, V)), (i <= 1 || i >= H - 1) && (i = Vn(i, H))), l ? (kr = n, Ar = i, [Nr, Pr] = P.move(r, n, i)) : (Q = n, Lr = i);
	}
	let Zi = {
		width: 0,
		height: 0,
		left: 0,
		top: 0
	};
	function Qi() {
		Qr(Zi, !1);
	}
	let ea, ta, na, ra;
	function aa(e, t, n, i, a, o, s) {
		Rr = !0, Br = Vr = zr._x = zr._y = !1, qi(e, t, n, i, a, o, s, !0, !1), e != null && (B(St, Mt, oa, !1), _a(K, r, Nr, Pr, V, H, null));
		let { left: c, top: l, width: u, height: d } = $;
		ea = c, ta = l, na = u, ra = d;
	}
	function oa(e, t, n, i, a, o, s) {
		Rr = zr._x = zr._y = !1, qi(e, t, n, i, a, o, s, !1, !0);
		let { left: c, top: l, width: u, height: d } = $, f = u > 0 || d > 0, p = ea != c || ta != l || na != u || ra != d;
		if (f && p && Qr($), zr.setScale && f && p) {
			let e = c, t = u, n = l, r = d;
			if (D.ori == 1 && (e = l, t = d, n = c, r = u), Br && ri(S, gi(e, S), gi(e + t, S)), Vr) for (let e in b) {
				let t = b[e];
				e != S && t.from == null && t.min != kn && ri(e, gi(n + r, e), gi(n, e));
			}
			Qi();
		} else P.lock && (P._lock = !P._lock, Ni(t, !0, e != null));
		e != null && (_e(St, Mt), _a(St, r, Q, Lr, V, H, null));
	}
	function sa(e, t, n, r, i, a, o) {
		if (P._lock) return;
		He(e);
		let s = Rr;
		if (Rr) {
			let e = !0, t = !0, n, r;
			D.ori == 0 ? (n = Br, r = Vr) : (n = Vr, r = Br), n && r && (e = Q <= 10 || Q >= V - 10, t = Lr <= 10 || Lr >= H - 10), n && e && (Q = Q < Nr ? 0 : V), r && t && (Lr = Lr < Pr ? 0 : H), Ni(null, !0, !0), Rr = !1;
		}
		Q = -10, Lr = -10, ie.fill(null), Ni(null, !0, !0), s && (Rr = s);
	}
	function ca(e, t, n, i, a, o, s) {
		P._lock || (He(e), tn(), Qi(), e != null && _a(Tt, r, Q, Lr, V, H, null));
	}
	function la() {
		y.forEach(Ua), Ie(r.width, r.height, !0);
	}
	Yt(kt, Nt, la);
	let ua = {};
	ua.mousedown = aa, ua.mousemove = Vi, ua.mouseup = oa, ua.dblclick = ca, ua.setSeries = (e, t, n, i) => {
		let a = ma.match[2];
		n = a(r, t, n), n != -1 && ai(n, i, !0, !1);
	}, I && (B(K, m, aa), B(xt, m, Vi), B(Ct, m, (e) => {
		He(e), Bi(!1);
	}), B(wt, m, sa), B(Tt, m, ca), Da.add(r), r.syncRect = Bi);
	let da = r.hooks = e.hooks || {};
	function fa(e, t, n) {
		_r ? vr.push([
			e,
			t,
			n
		]) : e in da && da[e].forEach((e) => {
			e.call(null, r, t, n);
		});
	}
	(e.plugins || []).forEach((e) => {
		for (let t in e.hooks) da[t] = (da[t] || []).concat(e.hooks[t]);
	});
	let pa = (e, t, n) => n, ma = or({
		key: null,
		setSeries: !1,
		filters: {
			pub: Ln,
			sub: Ln
		},
		scales: [S, v[1] ? v[1].scale : null],
		match: [
			Rn,
			Rn,
			pa
		],
		values: [null, null]
	}, P.sync);
	ma.match.length == 2 && ma.match.push(pa), P.sync = ma;
	let ha = ma.key, ga = Ji(ha);
	function _a(e, t, n, r, i, a, o) {
		ma.filters.pub(e, t, n, r, i, a, o) && ga.pub(e, t, n, r, i, a, o);
	}
	ga.sub(r);
	function va(e, t, n, r, i, a, o) {
		ma.filters.sub(e, t, n, r, i, a, o) && ua[e](null, t, n, r, i, a, o);
	}
	r.pub = va;
	function ya() {
		ga.unsub(r), Da.delete(r), ge.clear(), Xt(kt, Nt, la), l.remove(), ae?.remove(), fa("destroy");
	}
	r.destroy = ya;
	function ba() {
		fa("init", e, t), en(t || e.data, !1), k[S] ? Cr(S, k[S]) : tn(), Pe = $.show && ($.width > 0 || $.height > 0), Ne = Fe = !0, Ie(e.width, e.height);
	}
	return v.forEach(Et), y.forEach(Pt), n ? n instanceof HTMLElement ? (n.appendChild(l), ba()) : n(r, ba) : ba(), r;
}
Wa.assign = or, Wa.fmtNum = mn, Wa.rangeNum = un, Wa.rangeLog = an, Wa.rangeAsinh = on, Wa.orient = Zi, Wa.pxRatio = q, Wa.join = dr, Wa.fmtDate = wr, Wa.tzDate = Er, Wa.sync = Ji;
{
	Wa.addGap = na, Wa.clipGaps = ta;
	let e = Wa.paths = { points: ga };
	e.linear = ba, e.stepped = xa, e.bars = Ca, e.spline = Ta;
}
// node_modules/uplot/dist/uPlot.min.css?inline
var Ga = ".uplot,.uplot *,.uplot :before,.uplot :after{box-sizing:border-box}.uplot{width:min-content;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{-webkit-user-select:none;user-select:none;position:relative}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{width:100%;height:100%;display:block;position:relative}.u-axis{position:absolute}.u-legend{text-align:center;margin:auto;font-size:14px}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:\":\";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{pointer-events:none;background:#00000012;position:absolute}.u-cursor-x,.u-cursor-y{pointer-events:none;will-change:transform;position:absolute;top:0;left:0}.u-hz .u-cursor-x,.u-vt .u-cursor-y{border-right:1px dashed #607d8b;height:100%}.u-hz .u-cursor-y,.u-vt .u-cursor-x{border-bottom:1px dashed #607d8b;width:100%}.u-cursor-pt{pointer-events:none;will-change:transform;border:0 solid;border-radius:50%;position:absolute;top:0;left:0;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}";
// src/canvas.ts
function Ka() {
	try {
		return document.createElement("canvas").getContext("2d") !== null;
	} catch {
		return !1;
	}
}
// src/chart-data.ts
function qa(e) {
	return {
		time: e.map((e) => e.t / 60),
		height: e.map((e) => e.height),
		speedKmh: e.map((e) => e.speed * 3.6),
		voltage: e.map((e) => e.voltage > 0 ? e.voltage : null),
		current: e.map((e) => e.voltage > 0 ? e.current : null),
		charge: e.map((e) => e.charge)
	};
}
function Ja(e) {
	return {
		axis: e ? "#c8c8c8" : "#555555",
		grid: e ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
		height: e ? "#64b5f6" : "#1565c0",
		speed: e ? "#ffb74d" : "#ef6c00",
		voltage: e ? "#81c784" : "#2e7d32",
		current: e ? "#e57373" : "#c62828",
		charge: e ? "#ba68c8" : "#6a1b9a"
	};
}
// src/styles.ts
var Ya = h`
  :host { display: block; color: var(--primary-text-color); font-family: var(--paper-font-body1_-_font-family, inherit); }
  .card { background: var(--card-background-color, #fff); border: 1px solid var(--divider-color, #ddd); border-radius: 12px; padding: 12px 16px; }
  .card h3 { margin: 0 0 8px; font-size: 1rem; font-weight: 500; }
  .kv { display: flex; justify-content: space-between; gap: 12px; padding: 2px 0; }
  .kv span { color: var(--secondary-text-color); }
  .muted { color: var(--secondary-text-color); }
  button { font: inherit; cursor: pointer; border: 1px solid var(--divider-color, #ccc); border-radius: 8px; background: var(--card-background-color, #fff); color: var(--primary-text-color); padding: 6px 12px; }
  button.primary { background: var(--primary-color); color: var(--text-primary-color, #fff); border-color: var(--primary-color); }
  select { font: inherit; padding: 6px; border-radius: 8px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); }
`, Xa = class extends je {
	static {
		this.properties = {
			points: { attribute: !1 },
			lang: { type: String },
			dark: { type: Boolean }
		};
	}
	constructor() {
		super(), this.plots = [], this.points = [], this.lang = "de", this.dark = !1;
	}
	static {
		this.styles = [
			m(Ga),
			Ya,
			h`
      .charts { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; margin-top: 12px; }
      .chart { min-height: 220px; }
      .chart h3 { margin: 0 0 4px; font-size: 0.95rem; font-weight: 500; }
    `
		];
	}
	render() {
		return this.points.length < 2 ? z`<p class="muted">${W("no_history", this.lang)}</p>` : z`<div class="charts">
      <div class="card"><h3>${W("max_height", this.lang)} / ${W("max_speed", this.lang)}</h3><div class="chart" id="motion"></div></div>
      <div class="card"><h3>${W("battery", this.lang)}</h3><div class="chart" id="power"></div></div>
    </div>`;
	}
	updated() {
		if (this.destroyPlots(), this.points.length < 2 || !Ka()) return;
		let e = this.renderRoot.querySelector("#motion"), t = this.renderRoot.querySelector("#power");
		if (!e || !t) return;
		let n = qa(this.points), r = Ja(this.dark), i = (e, t, n, i = 3) => ({
			scale: t,
			label: n,
			stroke: e,
			grid: {
				stroke: r.grid,
				width: 1
			},
			ticks: { stroke: r.grid },
			side: i,
			size: 50
		});
		try {
			this.plots = [new Wa({
				width: e.clientWidth || 400,
				height: 200,
				legend: { show: !0 },
				scales: {
					x: { time: !1 },
					m: {},
					kmh: {}
				},
				axes: [
					{
						stroke: r.axis,
						grid: { stroke: r.grid },
						label: "min"
					},
					{
						...i(r.height, "m", "m", 3),
						side: 3
					},
					{
						...i(r.speed, "kmh", "km/h", 1),
						grid: { show: !1 }
					}
				],
				series: [
					{},
					{
						label: "m",
						stroke: r.height,
						scale: "m",
						width: 2
					},
					{
						label: "km/h",
						stroke: r.speed,
						scale: "kmh",
						width: 2
					}
				]
			}, [
				n.time,
				n.height,
				n.speedKmh
			], e), new Wa({
				width: t.clientWidth || 400,
				height: 200,
				legend: { show: !0 },
				scales: {
					x: { time: !1 },
					v: {},
					a: {},
					pct: { range: [0, 100] }
				},
				axes: [
					{
						stroke: r.axis,
						grid: { stroke: r.grid },
						label: "min"
					},
					{ ...i(r.voltage, "v", "V", 3) },
					{
						...i(r.current, "a", "A", 1),
						grid: { show: !1 }
					}
				],
				series: [
					{},
					{
						label: "V",
						stroke: r.voltage,
						scale: "v",
						width: 2,
						spanGaps: !1
					},
					{
						label: "A",
						stroke: r.current,
						scale: "a",
						width: 2,
						spanGaps: !1
					},
					{
						label: "%",
						stroke: r.charge,
						scale: "pct",
						width: 1,
						dash: [4, 4]
					}
				]
			}, [
				n.time,
				n.voltage,
				n.current,
				n.charge
			], t)], this.resizeObserver ??= typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(() => this.resize()), this.resizeObserver?.observe(e);
		} catch {
			this.plots = [];
		}
	}
	resize() {
		let e = [this.renderRoot.querySelector("#motion"), this.renderRoot.querySelector("#power")];
		this.plots.forEach((t, n) => e[n] && t.setSize({
			width: e[n].clientWidth,
			height: 200
		}));
	}
	destroyPlots() {
		this.plots.forEach((e) => e.destroy()), this.plots = [];
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.destroyPlots(), this.resizeObserver?.disconnect();
	}
};
customElements.define("dl-flight-charts", Xa);
// node_modules/leaflet/dist/leaflet.css?inline
var Za = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? r(e) : typeof define == "function" && define.amd ? define(["exports"], r) : (n = typeof globalThis < "u" ? globalThis : n || self, r(n.leaflet = {}));
	})(n, (function(e) {
		var t = "1.9.4";
		function n(e) {
			for (var t, n = 1, r = arguments.length, i; n < r; n++) for (t in i = arguments[n], i) e[t] = i[t];
			return e;
		}
		var r = Object.create || (function() {
			function e() {}
			return function(t) {
				return e.prototype = t, new e();
			};
		})();
		function i(e, t) {
			var n = Array.prototype.slice;
			if (e.bind) return e.bind.apply(e, n.call(arguments, 1));
			var r = n.call(arguments, 2);
			return function() {
				return e.apply(t, r.length ? r.concat(n.call(arguments)) : arguments);
			};
		}
		var a = 0;
		function o(e) {
			return "_leaflet_id" in e || (e._leaflet_id = ++a), e._leaflet_id;
		}
		function s(e, t, n) {
			var r, i, a, o = function() {
				r = !1, i &&= (a.apply(n, i), !1);
			};
			return a = function() {
				r ? i = arguments : (e.apply(n, arguments), setTimeout(o, t), r = !0);
			}, a;
		}
		function c(e, t, n) {
			var r = t[1], i = t[0], a = r - i;
			return e === r && n ? e : ((e - i) % a + a) % a + i;
		}
		function l() {
			return !1;
		}
		function u(e, t) {
			if (t === !1) return e;
			var n = 10 ** (t === void 0 ? 6 : t);
			return Math.round(e * n) / n;
		}
		function d(e) {
			return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
		}
		function f(e) {
			return d(e).split(/\s+/);
		}
		function p(e, t) {
			for (var n in Object.prototype.hasOwnProperty.call(e, "options") || (e.options = e.options ? r(e.options) : {}), t) e.options[n] = t[n];
			return e.options;
		}
		function m(e, t, n) {
			var r = [];
			for (var i in e) r.push(encodeURIComponent(n ? i.toUpperCase() : i) + "=" + encodeURIComponent(e[i]));
			return (!t || t.indexOf("?") === -1 ? "?" : "&") + r.join("&");
		}
		var h = /\{ *([\w_ -]+) *\}/g;
		function g(e, t) {
			return e.replace(h, function(e, n) {
				var r = t[n];
				if (r === void 0) throw Error("No value provided for variable " + e);
				return typeof r == "function" && (r = r(t)), r;
			});
		}
		var _ = Array.isArray || function(e) {
			return Object.prototype.toString.call(e) === "[object Array]";
		};
		function v(e, t) {
			for (var n = 0; n < e.length; n++) if (e[n] === t) return n;
			return -1;
		}
		var y = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
		function b(e) {
			return window["webkit" + e] || window["moz" + e] || window["ms" + e];
		}
		var x = 0;
		function S(e) {
			var t = +/* @__PURE__ */ new Date(), n = Math.max(0, 16 - (t - x));
			return x = t + n, window.setTimeout(e, n);
		}
		var C = window.requestAnimationFrame || b("RequestAnimationFrame") || S, w = window.cancelAnimationFrame || b("CancelAnimationFrame") || b("CancelRequestAnimationFrame") || function(e) {
			window.clearTimeout(e);
		};
		function T(e, t, n) {
			if (n && C === S) e.call(t);
			else return C.call(window, i(e, t));
		}
		function E(e) {
			e && w.call(window, e);
		}
		var D = {
			__proto__: null,
			extend: n,
			create: r,
			bind: i,
			get lastId() {
				return a;
			},
			stamp: o,
			throttle: s,
			wrapNum: c,
			falseFn: l,
			formatNum: u,
			trim: d,
			splitWords: f,
			setOptions: p,
			getParamString: m,
			template: g,
			isArray: _,
			indexOf: v,
			emptyImageUrl: y,
			requestFn: C,
			cancelFn: w,
			requestAnimFrame: T,
			cancelAnimFrame: E
		};
		function O() {}
		O.extend = function(e) {
			var t = function() {
				p(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
			}, i = t.__super__ = this.prototype, a = r(i);
			for (var o in a.constructor = t, t.prototype = a, this) Object.prototype.hasOwnProperty.call(this, o) && o !== "prototype" && o !== "__super__" && (t[o] = this[o]);
			return e.statics && n(t, e.statics), e.includes && (ee(e.includes), n.apply(null, [a].concat(e.includes))), n(a, e), delete a.statics, delete a.includes, a.options && (a.options = i.options ? r(i.options) : {}, n(a.options, e.options)), a._initHooks = [], a.callInitHooks = function() {
				if (!this._initHooksCalled) {
					i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
					for (var e = 0, t = a._initHooks.length; e < t; e++) a._initHooks[e].call(this);
				}
			}, t;
		}, O.include = function(e) {
			var t = this.prototype.options;
			return n(this.prototype, e), e.options && (this.prototype.options = t, this.mergeOptions(e.options)), this;
		}, O.mergeOptions = function(e) {
			return n(this.prototype.options, e), this;
		}, O.addInitHook = function(e) {
			var t = Array.prototype.slice.call(arguments, 1), n = typeof e == "function" ? e : function() {
				this[e].apply(this, t);
			};
			return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(n), this;
		};
		function ee(e) {
			if (typeof L < "u" && L && L.Mixin) {
				e = _(e) ? e : [e];
				for (var t = 0; t < e.length; t++) e[t] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (/* @__PURE__ */ Error()).stack);
			}
		}
		var te = {
			on: function(e, t, n) {
				if (typeof e == "object") for (var r in e) this._on(r, e[r], t);
				else {
					e = f(e);
					for (var i = 0, a = e.length; i < a; i++) this._on(e[i], t, n);
				}
				return this;
			},
			off: function(e, t, n) {
				if (!arguments.length) delete this._events;
				else if (typeof e == "object") for (var r in e) this._off(r, e[r], t);
				else {
					e = f(e);
					for (var i = arguments.length === 1, a = 0, o = e.length; a < o; a++) i ? this._off(e[a]) : this._off(e[a], t, n);
				}
				return this;
			},
			_on: function(e, t, n, r) {
				if (typeof t != "function") console.warn("wrong listener type: " + typeof t);
				else if (this._listens(e, t, n) === !1) {
					n === this && (n = void 0);
					var i = {
						fn: t,
						ctx: n
					};
					r && (i.once = !0), this._events = this._events || {}, this._events[e] = this._events[e] || [], this._events[e].push(i);
				}
			},
			_off: function(e, t, n) {
				var r, i, a;
				if (this._events && (r = this._events[e], r)) {
					if (arguments.length === 1) {
						if (this._firingCount) for (i = 0, a = r.length; i < a; i++) r[i].fn = l;
						delete this._events[e];
					} else if (typeof t != "function") console.warn("wrong listener type: " + typeof t);
					else {
						var o = this._listens(e, t, n);
						if (o !== !1) {
							var s = r[o];
							this._firingCount && (s.fn = l, this._events[e] = r = r.slice()), r.splice(o, 1);
						}
					}
				}
			},
			fire: function(e, t, r) {
				if (!this.listens(e, r)) return this;
				var i = n({}, t, {
					type: e,
					target: this,
					sourceTarget: t && t.sourceTarget || this
				});
				if (this._events) {
					var a = this._events[e];
					if (a) {
						this._firingCount = this._firingCount + 1 || 1;
						for (var o = 0, s = a.length; o < s; o++) {
							var c = a[o], l = c.fn;
							c.once && this.off(e, l, c.ctx), l.call(c.ctx || this, i);
						}
						this._firingCount--;
					}
				}
				return r && this._propagateEvent(i), this;
			},
			listens: function(e, t, n, r) {
				typeof e != "string" && console.warn("\"string\" type argument expected");
				var i = t;
				typeof t != "function" && (r = !!t, i = void 0, n = void 0);
				var a = this._events && this._events[e];
				if (a && a.length && this._listens(e, i, n) !== !1) return !0;
				if (r) {
					for (var o in this._eventParents) if (this._eventParents[o].listens(e, t, n, r)) return !0;
				}
				return !1;
			},
			_listens: function(e, t, n) {
				if (!this._events) return !1;
				var r = this._events[e] || [];
				if (!t) return !!r.length;
				n === this && (n = void 0);
				for (var i = 0, a = r.length; i < a; i++) if (r[i].fn === t && r[i].ctx === n) return i;
				return !1;
			},
			once: function(e, t, n) {
				if (typeof e == "object") for (var r in e) this._on(r, e[r], t, !0);
				else {
					e = f(e);
					for (var i = 0, a = e.length; i < a; i++) this._on(e[i], t, n, !0);
				}
				return this;
			},
			addEventParent: function(e) {
				return this._eventParents = this._eventParents || {}, this._eventParents[o(e)] = e, this;
			},
			removeEventParent: function(e) {
				return this._eventParents && delete this._eventParents[o(e)], this;
			},
			_propagateEvent: function(e) {
				for (var t in this._eventParents) this._eventParents[t].fire(e.type, n({
					layer: e.target,
					propagatedFrom: e.target
				}, e), !0);
			}
		};
		te.addEventListener = te.on, te.removeEventListener = te.clearAllEventListeners = te.off, te.addOneTimeEventListener = te.once, te.fireEvent = te.fire, te.hasEventListeners = te.listens;
		var k = O.extend(te);
		function A(e, t, n) {
			this.x = n ? Math.round(e) : e, this.y = n ? Math.round(t) : t;
		}
		var ne = Math.trunc || function(e) {
			return e > 0 ? Math.floor(e) : Math.ceil(e);
		};
		A.prototype = {
			clone: function() {
				return new A(this.x, this.y);
			},
			add: function(e) {
				return this.clone()._add(j(e));
			},
			_add: function(e) {
				return this.x += e.x, this.y += e.y, this;
			},
			subtract: function(e) {
				return this.clone()._subtract(j(e));
			},
			_subtract: function(e) {
				return this.x -= e.x, this.y -= e.y, this;
			},
			divideBy: function(e) {
				return this.clone()._divideBy(e);
			},
			_divideBy: function(e) {
				return this.x /= e, this.y /= e, this;
			},
			multiplyBy: function(e) {
				return this.clone()._multiplyBy(e);
			},
			_multiplyBy: function(e) {
				return this.x *= e, this.y *= e, this;
			},
			scaleBy: function(e) {
				return new A(this.x * e.x, this.y * e.y);
			},
			unscaleBy: function(e) {
				return new A(this.x / e.x, this.y / e.y);
			},
			round: function() {
				return this.clone()._round();
			},
			_round: function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
			},
			floor: function() {
				return this.clone()._floor();
			},
			_floor: function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
			},
			ceil: function() {
				return this.clone()._ceil();
			},
			_ceil: function() {
				return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
			},
			trunc: function() {
				return this.clone()._trunc();
			},
			_trunc: function() {
				return this.x = ne(this.x), this.y = ne(this.y), this;
			},
			distanceTo: function(e) {
				e = j(e);
				var t = e.x - this.x, n = e.y - this.y;
				return Math.sqrt(t * t + n * n);
			},
			equals: function(e) {
				return e = j(e), e.x === this.x && e.y === this.y;
			},
			contains: function(e) {
				return e = j(e), Math.abs(e.x) <= Math.abs(this.x) && Math.abs(e.y) <= Math.abs(this.y);
			},
			toString: function() {
				return "Point(" + u(this.x) + ", " + u(this.y) + ")";
			}
		};
		function j(e, t, n) {
			return e instanceof A ? e : _(e) ? new A(e[0], e[1]) : e == null ? e : typeof e == "object" && "x" in e && "y" in e ? new A(e.x, e.y) : new A(e, t, n);
		}
		function M(e, t) {
			if (e) for (var n = t ? [e, t] : e, r = 0, i = n.length; r < i; r++) this.extend(n[r]);
		}
		M.prototype = {
			extend: function(e) {
				var t, n;
				if (!e) return this;
				if (e instanceof A || typeof e[0] == "number" || "x" in e) t = n = j(e);
				else if (e = re(e), t = e.min, n = e.max, !t || !n) return this;
				return !this.min && !this.max ? (this.min = t.clone(), this.max = n.clone()) : (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(n.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(n.y, this.max.y)), this;
			},
			getCenter: function(e) {
				return j((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, e);
			},
			getBottomLeft: function() {
				return j(this.min.x, this.max.y);
			},
			getTopRight: function() {
				return j(this.max.x, this.min.y);
			},
			getTopLeft: function() {
				return this.min;
			},
			getBottomRight: function() {
				return this.max;
			},
			getSize: function() {
				return this.max.subtract(this.min);
			},
			contains: function(e) {
				var t, n;
				return e = typeof e[0] == "number" || e instanceof A ? j(e) : re(e), e instanceof M ? (t = e.min, n = e.max) : t = n = e, t.x >= this.min.x && n.x <= this.max.x && t.y >= this.min.y && n.y <= this.max.y;
			},
			intersects: function(e) {
				e = re(e);
				var t = this.min, n = this.max, r = e.min, i = e.max, a = i.x >= t.x && r.x <= n.x, o = i.y >= t.y && r.y <= n.y;
				return a && o;
			},
			overlaps: function(e) {
				e = re(e);
				var t = this.min, n = this.max, r = e.min, i = e.max, a = i.x > t.x && r.x < n.x, o = i.y > t.y && r.y < n.y;
				return a && o;
			},
			isValid: function() {
				return !!(this.min && this.max);
			},
			pad: function(e) {
				var t = this.min, n = this.max, r = Math.abs(t.x - n.x) * e, i = Math.abs(t.y - n.y) * e;
				return re(j(t.x - r, t.y - i), j(n.x + r, n.y + i));
			},
			equals: function(e) {
				return e ? (e = re(e), this.min.equals(e.getTopLeft()) && this.max.equals(e.getBottomRight())) : !1;
			}
		};
		function re(e, t) {
			return !e || e instanceof M ? e : new M(e, t);
		}
		function ie(e, t) {
			if (e) for (var n = t ? [e, t] : e, r = 0, i = n.length; r < i; r++) this.extend(n[r]);
		}
		ie.prototype = {
			extend: function(e) {
				var t = this._southWest, n = this._northEast, r, i;
				if (e instanceof P) r = e, i = e;
				else if (e instanceof ie) {
					if (r = e._southWest, i = e._northEast, !r || !i) return this;
				} else return e ? this.extend(F(e) || N(e)) : this;
				return !t && !n ? (this._southWest = new P(r.lat, r.lng), this._northEast = new P(i.lat, i.lng)) : (t.lat = Math.min(r.lat, t.lat), t.lng = Math.min(r.lng, t.lng), n.lat = Math.max(i.lat, n.lat), n.lng = Math.max(i.lng, n.lng)), this;
			},
			pad: function(e) {
				var t = this._southWest, n = this._northEast, r = Math.abs(t.lat - n.lat) * e, i = Math.abs(t.lng - n.lng) * e;
				return new ie(new P(t.lat - r, t.lng - i), new P(n.lat + r, n.lng + i));
			},
			getCenter: function() {
				return new P((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
			},
			getSouthWest: function() {
				return this._southWest;
			},
			getNorthEast: function() {
				return this._northEast;
			},
			getNorthWest: function() {
				return new P(this.getNorth(), this.getWest());
			},
			getSouthEast: function() {
				return new P(this.getSouth(), this.getEast());
			},
			getWest: function() {
				return this._southWest.lng;
			},
			getSouth: function() {
				return this._southWest.lat;
			},
			getEast: function() {
				return this._northEast.lng;
			},
			getNorth: function() {
				return this._northEast.lat;
			},
			contains: function(e) {
				e = typeof e[0] == "number" || e instanceof P || "lat" in e ? F(e) : N(e);
				var t = this._southWest, n = this._northEast, r, i;
				return e instanceof ie ? (r = e.getSouthWest(), i = e.getNorthEast()) : r = i = e, r.lat >= t.lat && i.lat <= n.lat && r.lng >= t.lng && i.lng <= n.lng;
			},
			intersects: function(e) {
				e = N(e);
				var t = this._southWest, n = this._northEast, r = e.getSouthWest(), i = e.getNorthEast(), a = i.lat >= t.lat && r.lat <= n.lat, o = i.lng >= t.lng && r.lng <= n.lng;
				return a && o;
			},
			overlaps: function(e) {
				e = N(e);
				var t = this._southWest, n = this._northEast, r = e.getSouthWest(), i = e.getNorthEast(), a = i.lat > t.lat && r.lat < n.lat, o = i.lng > t.lng && r.lng < n.lng;
				return a && o;
			},
			toBBoxString: function() {
				return [
					this.getWest(),
					this.getSouth(),
					this.getEast(),
					this.getNorth()
				].join(",");
			},
			equals: function(e, t) {
				return e ? (e = N(e), this._southWest.equals(e.getSouthWest(), t) && this._northEast.equals(e.getNorthEast(), t)) : !1;
			},
			isValid: function() {
				return !!(this._southWest && this._northEast);
			}
		};
		function N(e, t) {
			return e instanceof ie ? e : new ie(e, t);
		}
		function P(e, t, n) {
			if (isNaN(e) || isNaN(t)) throw Error("Invalid LatLng object: (" + e + ", " + t + ")");
			this.lat = +e, this.lng = +t, n !== void 0 && (this.alt = +n);
		}
		P.prototype = {
			equals: function(e, t) {
				return e ? (e = F(e), Math.max(Math.abs(this.lat - e.lat), Math.abs(this.lng - e.lng)) <= (t === void 0 ? 1e-9 : t)) : !1;
			},
			toString: function(e) {
				return "LatLng(" + u(this.lat, e) + ", " + u(this.lng, e) + ")";
			},
			distanceTo: function(e) {
				return R.distance(this, F(e));
			},
			wrap: function() {
				return R.wrapLatLng(this);
			},
			toBounds: function(e) {
				var t = 180 * e / 40075017, n = t / Math.cos(Math.PI / 180 * this.lat);
				return N([this.lat - t, this.lng - n], [this.lat + t, this.lng + n]);
			},
			clone: function() {
				return new P(this.lat, this.lng, this.alt);
			}
		};
		function F(e, t, n) {
			return e instanceof P ? e : _(e) && typeof e[0] != "object" ? e.length === 3 ? new P(e[0], e[1], e[2]) : e.length === 2 ? new P(e[0], e[1]) : null : e == null ? e : typeof e == "object" && "lat" in e ? new P(e.lat, "lng" in e ? e.lng : e.lon, e.alt) : t === void 0 ? null : new P(e, t, n);
		}
		var I = {
			latLngToPoint: function(e, t) {
				var n = this.projection.project(e), r = this.scale(t);
				return this.transformation._transform(n, r);
			},
			pointToLatLng: function(e, t) {
				var n = this.scale(t), r = this.transformation.untransform(e, n);
				return this.projection.unproject(r);
			},
			project: function(e) {
				return this.projection.project(e);
			},
			unproject: function(e) {
				return this.projection.unproject(e);
			},
			scale: function(e) {
				return 256 * 2 ** e;
			},
			zoom: function(e) {
				return Math.log(e / 256) / Math.LN2;
			},
			getProjectedBounds: function(e) {
				if (this.infinite) return null;
				var t = this.projection.bounds, n = this.scale(e);
				return new M(this.transformation.transform(t.min, n), this.transformation.transform(t.max, n));
			},
			infinite: !1,
			wrapLatLng: function(e) {
				var t = this.wrapLng ? c(e.lng, this.wrapLng, !0) : e.lng, n = this.wrapLat ? c(e.lat, this.wrapLat, !0) : e.lat, r = e.alt;
				return new P(n, t, r);
			},
			wrapLatLngBounds: function(e) {
				var t = e.getCenter(), n = this.wrapLatLng(t), r = t.lat - n.lat, i = t.lng - n.lng;
				if (r === 0 && i === 0) return e;
				var a = e.getSouthWest(), o = e.getNorthEast();
				return new ie(new P(a.lat - r, a.lng - i), new P(o.lat - r, o.lng - i));
			}
		}, R = n({}, I, {
			wrapLng: [-180, 180],
			R: 6371e3,
			distance: function(e, t) {
				var n = Math.PI / 180, r = e.lat * n, i = t.lat * n, a = Math.sin((t.lat - e.lat) * n / 2), o = Math.sin((t.lng - e.lng) * n / 2), s = a * a + Math.cos(r) * Math.cos(i) * o * o, c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
				return this.R * c;
			}
		}), ae = 6378137, oe = {
			R: ae,
			MAX_LATITUDE: 85.0511287798,
			project: function(e) {
				var t = Math.PI / 180, n = this.MAX_LATITUDE, r = Math.max(Math.min(n, e.lat), -n), i = Math.sin(r * t);
				return new A(this.R * e.lng * t, this.R * Math.log((1 + i) / (1 - i)) / 2);
			},
			unproject: function(e) {
				var t = 180 / Math.PI;
				return new P((2 * Math.atan(Math.exp(e.y / this.R)) - Math.PI / 2) * t, e.x * t / this.R);
			},
			bounds: (function() {
				var e = ae * Math.PI;
				return new M([-e, -e], [e, e]);
			})()
		};
		function se(e, t, n, r) {
			_(e) ? (this._a = e[0], this._b = e[1], this._c = e[2], this._d = e[3]) : (this._a = e, this._b = t, this._c = n, this._d = r);
		}
		se.prototype = {
			transform: function(e, t) {
				return this._transform(e.clone(), t);
			},
			_transform: function(e, t) {
				return t ||= 1, e.x = t * (this._a * e.x + this._b), e.y = t * (this._c * e.y + this._d), e;
			},
			untransform: function(e, t) {
				return t ||= 1, new A((e.x / t - this._b) / this._a, (e.y / t - this._d) / this._c);
			}
		};
		function ce(e, t, n, r) {
			return new se(e, t, n, r);
		}
		var le = n({}, R, {
			code: "EPSG:3857",
			projection: oe,
			transformation: function() {
				var e = .5 / (Math.PI * oe.R);
				return ce(e, .5, -e, .5);
			}()
		}), ue = n({}, le, { code: "EPSG:900913" });
		function de(e) {
			return document.createElementNS("http://www.w3.org/2000/svg", e);
		}
		function fe(e, t) {
			for (var n = "", r = 0, i, a = e.length, o, s, c; r < a; r++) {
				for (s = e[r], i = 0, o = s.length; i < o; i++) c = s[i], n += (i ? "L" : "M") + c.x + " " + c.y;
				n += t ? U.svg ? "z" : "x" : "";
			}
			return n || "M0 0";
		}
		var pe = document.documentElement.style, me = "ActiveXObject" in window, he = me && !document.addEventListener, z = "msLaunchUri" in navigator && !("documentMode" in document), ge = Ke("webkit"), B = Ke("android"), _e = Ke("android 2") || Ke("android 3"), ve = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), ye = B && Ke("Google") && ve < 537 && !("AudioNode" in window), V = !!window.opera, H = !z && Ke("chrome"), be = Ke("gecko") && !ge && !V && !me, xe = !H && Ke("safari"), Se = Ke("phantom"), Ce = "OTransition" in pe, we = navigator.platform.indexOf("Win") === 0, Te = me && "transition" in pe, Ee = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !_e, De = "MozPerspective" in pe, Oe = !window.L_DISABLE_3D && (Te || Ee || De) && !Ce && !Se, ke = typeof orientation < "u" || Ke("mobile"), Ae = ke && ge, je = ke && Ee, Me = !window.PointerEvent && window.MSPointerEvent, Ne = !!(window.PointerEvent || Me), Pe = "ontouchstart" in window || !!window.TouchEvent, Fe = !window.L_NO_TOUCH && (Pe || Ne), Ie = ke && V, Le = ke && be, Re = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, ze = function() {
			var e = !1;
			try {
				var t = Object.defineProperty({}, "passive", { get: function() {
					e = !0;
				} });
				window.addEventListener("testPassiveEventSupport", l, t), window.removeEventListener("testPassiveEventSupport", l, t);
			} catch {}
			return e;
		}(), Be = function() {
			return !!document.createElement("canvas").getContext;
		}(), Ve = !!(document.createElementNS && de("svg").createSVGRect), He = !!Ve && (function() {
			var e = document.createElement("div");
			return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
		})(), Ue = !Ve && function() {
			try {
				var e = document.createElement("div");
				e.innerHTML = "<v:shape adj=\"1\"/>";
				var t = e.firstChild;
				return t.style.behavior = "url(#default#VML)", t && typeof t.adj == "object";
			} catch {
				return !1;
			}
		}(), We = navigator.platform.indexOf("Mac") === 0, Ge = navigator.platform.indexOf("Linux") === 0;
		function Ke(e) {
			return navigator.userAgent.toLowerCase().indexOf(e) >= 0;
		}
		var U = {
			ie: me,
			ielt9: he,
			edge: z,
			webkit: ge,
			android: B,
			android23: _e,
			androidStock: ye,
			opera: V,
			chrome: H,
			gecko: be,
			safari: xe,
			phantom: Se,
			opera12: Ce,
			win: we,
			ie3d: Te,
			webkit3d: Ee,
			gecko3d: De,
			any3d: Oe,
			mobile: ke,
			mobileWebkit: Ae,
			mobileWebkit3d: je,
			msPointer: Me,
			pointer: Ne,
			touch: Fe,
			touchNative: Pe,
			mobileOpera: Ie,
			mobileGecko: Le,
			retina: Re,
			passiveEvents: ze,
			canvas: Be,
			svg: Ve,
			vml: Ue,
			inlineSvg: He,
			mac: We,
			linux: Ge
		}, W = U.msPointer ? "MSPointerDown" : "pointerdown", qe = U.msPointer ? "MSPointerMove" : "pointermove", Je = U.msPointer ? "MSPointerUp" : "pointerup", Ye = U.msPointer ? "MSPointerCancel" : "pointercancel", Xe = {
			touchstart: W,
			touchmove: qe,
			touchend: Je,
			touchcancel: Ye
		}, Ze = {
			touchstart: st,
			touchmove: ot,
			touchend: ot,
			touchcancel: ot
		}, Qe = {}, $e = !1;
		function et(e, t, n) {
			return t === "touchstart" && at(), Ze[t] ? (n = Ze[t].bind(this, n), e.addEventListener(Xe[t], n, !1), n) : (console.warn("wrong event specified:", t), l);
		}
		function tt(e, t, n) {
			Xe[t] ? e.removeEventListener(Xe[t], n, !1) : console.warn("wrong event specified:", t);
		}
		function nt(e) {
			Qe[e.pointerId] = e;
		}
		function rt(e) {
			Qe[e.pointerId] && (Qe[e.pointerId] = e);
		}
		function it(e) {
			delete Qe[e.pointerId];
		}
		function at() {
			$e ||= (document.addEventListener(W, nt, !0), document.addEventListener(qe, rt, !0), document.addEventListener(Je, it, !0), document.addEventListener(Ye, it, !0), !0);
		}
		function ot(e, t) {
			if (t.pointerType !== (t.MSPOINTER_TYPE_MOUSE || "mouse")) {
				for (var n in t.touches = [], Qe) t.touches.push(Qe[n]);
				t.changedTouches = [t], e(t);
			}
		}
		function st(e, t) {
			t.MSPOINTER_TYPE_TOUCH && t.pointerType === t.MSPOINTER_TYPE_TOUCH && Qt(t), ot(e, t);
		}
		function ct(e) {
			var t = {}, n, r;
			for (r in e) n = e[r], t[r] = n && n.bind ? n.bind(e) : n;
			return e = t, t.type = "dblclick", t.detail = 2, t.isTrusted = !1, t._simulated = !0, t;
		}
		var lt = 200;
		function ut(e, t) {
			e.addEventListener("dblclick", t);
			var n = 0, r;
			function i(e) {
				if (e.detail !== 1) r = e.detail;
				else if (!(e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents)) {
					var i = en(e);
					if (!i.some(function(e) {
						return e instanceof HTMLLabelElement && e.attributes.for;
					}) || i.some(function(e) {
						return e instanceof HTMLInputElement || e instanceof HTMLSelectElement;
					})) {
						var a = Date.now();
						a - n <= lt ? (r++, r === 2 && t(ct(e))) : r = 1, n = a;
					}
				}
			}
			return e.addEventListener("click", i), {
				dblclick: t,
				simDblclick: i
			};
		}
		function dt(e, t) {
			e.removeEventListener("dblclick", t.dblclick), e.removeEventListener("click", t.simDblclick);
		}
		var ft = Dt([
			"transform",
			"webkitTransform",
			"OTransform",
			"MozTransform",
			"msTransform"
		]), pt = Dt([
			"webkitTransition",
			"transition",
			"OTransition",
			"MozTransition",
			"msTransition"
		]), mt = pt === "webkitTransition" || pt === "OTransition" ? pt + "End" : "transitionend";
		function ht(e) {
			return typeof e == "string" ? document.getElementById(e) : e;
		}
		function gt(e, t) {
			var n = e.style[t] || e.currentStyle && e.currentStyle[t];
			if ((!n || n === "auto") && document.defaultView) {
				var r = document.defaultView.getComputedStyle(e, null);
				n = r ? r[t] : null;
			}
			return n === "auto" ? null : n;
		}
		function G(e, t, n) {
			var r = document.createElement(e);
			return r.className = t || "", n && n.appendChild(r), r;
		}
		function _t(e) {
			var t = e.parentNode;
			t && t.removeChild(e);
		}
		function vt(e) {
			for (; e.firstChild;) e.removeChild(e.firstChild);
		}
		function yt(e) {
			var t = e.parentNode;
			t && t.lastChild !== e && t.appendChild(e);
		}
		function bt(e) {
			var t = e.parentNode;
			t && t.firstChild !== e && t.insertBefore(e, t.firstChild);
		}
		function xt(e, t) {
			if (e.classList !== void 0) return e.classList.contains(t);
			var n = wt(e);
			return n.length > 0 && RegExp("(^|\\s)" + t + "(\\s|$)").test(n);
		}
		function K(e, t) {
			if (e.classList !== void 0) for (var n = f(t), r = 0, i = n.length; r < i; r++) e.classList.add(n[r]);
			else if (!xt(e, t)) {
				var a = wt(e);
				Ct(e, (a ? a + " " : "") + t);
			}
		}
		function St(e, t) {
			e.classList === void 0 ? Ct(e, d((" " + wt(e) + " ").replace(" " + t + " ", " "))) : e.classList.remove(t);
		}
		function Ct(e, t) {
			e.className.baseVal === void 0 ? e.className = t : e.className.baseVal = t;
		}
		function wt(e) {
			return e.correspondingElement && (e = e.correspondingElement), e.className.baseVal === void 0 ? e.className : e.className.baseVal;
		}
		function Tt(e, t) {
			"opacity" in e.style ? e.style.opacity = t : "filter" in e.style && Et(e, t);
		}
		function Et(e, t) {
			var n = !1, r = "DXImageTransform.Microsoft.Alpha";
			try {
				n = e.filters.item(r);
			} catch {
				if (t === 1) return;
			}
			t = Math.round(t * 100), n ? (n.Enabled = t !== 100, n.Opacity = t) : e.style.filter += " progid:" + r + "(opacity=" + t + ")";
		}
		function Dt(e) {
			for (var t = document.documentElement.style, n = 0; n < e.length; n++) if (e[n] in t) return e[n];
			return !1;
		}
		function Ot(e, t, n) {
			var r = t || new A(0, 0);
			e.style[ft] = (U.ie3d ? "translate(" + r.x + "px," + r.y + "px)" : "translate3d(" + r.x + "px," + r.y + "px,0)") + (n ? " scale(" + n + ")" : "");
		}
		function kt(e, t) {
			e._leaflet_pos = t, U.any3d ? Ot(e, t) : (e.style.left = t.x + "px", e.style.top = t.y + "px");
		}
		function At(e) {
			return e._leaflet_pos || new A(0, 0);
		}
		var jt, Mt, Nt;
		if ("onselectstart" in document) jt = function() {
			J(window, "selectstart", Qt);
		}, Mt = function() {
			Wt(window, "selectstart", Qt);
		};
		else {
			var Pt = Dt([
				"userSelect",
				"WebkitUserSelect",
				"OUserSelect",
				"MozUserSelect",
				"msUserSelect"
			]);
			jt = function() {
				if (Pt) {
					var e = document.documentElement.style;
					Nt = e[Pt], e[Pt] = "none";
				}
			}, Mt = function() {
				Pt && (document.documentElement.style[Pt] = Nt, Nt = void 0);
			};
		}
		function q() {
			J(window, "dragstart", Qt);
		}
		function Ft() {
			Wt(window, "dragstart", Qt);
		}
		var It, Lt;
		function Rt(e) {
			for (; e.tabIndex === -1;) e = e.parentNode;
			e.style && (zt(), It = e, Lt = e.style.outlineStyle, e.style.outlineStyle = "none", J(window, "keydown", zt));
		}
		function zt() {
			It && (It.style.outlineStyle = Lt, It = void 0, Lt = void 0, Wt(window, "keydown", zt));
		}
		function Bt(e) {
			do
				e = e.parentNode;
			while ((!e.offsetWidth || !e.offsetHeight) && e !== document.body);
			return e;
		}
		function Vt(e) {
			var t = e.getBoundingClientRect();
			return {
				x: t.width / e.offsetWidth || 1,
				y: t.height / e.offsetHeight || 1,
				boundingClientRect: t
			};
		}
		var Ht = {
			__proto__: null,
			TRANSFORM: ft,
			TRANSITION: pt,
			TRANSITION_END: mt,
			get: ht,
			getStyle: gt,
			create: G,
			remove: _t,
			empty: vt,
			toFront: yt,
			toBack: bt,
			hasClass: xt,
			addClass: K,
			removeClass: St,
			setClass: Ct,
			getClass: wt,
			setOpacity: Tt,
			testProp: Dt,
			setTransform: Ot,
			setPosition: kt,
			getPosition: At,
			get disableTextSelection() {
				return jt;
			},
			get enableTextSelection() {
				return Mt;
			},
			disableImageDrag: q,
			enableImageDrag: Ft,
			preventOutline: Rt,
			restoreOutline: zt,
			getSizedParentNode: Bt,
			getScale: Vt
		};
		function J(e, t, n, r) {
			if (t && typeof t == "object") for (var i in t) qt(e, i, t[i], n);
			else {
				t = f(t);
				for (var a = 0, o = t.length; a < o; a++) qt(e, t[a], n, r);
			}
			return this;
		}
		var Ut = "_leaflet_events";
		function Wt(e, t, n, r) {
			if (arguments.length === 1) Gt(e), delete e[Ut];
			else if (t && typeof t == "object") for (var i in t) Jt(e, i, t[i], n);
			else if (t = f(t), arguments.length === 2) Gt(e, function(e) {
				return v(t, e) !== -1;
			});
			else for (var a = 0, o = t.length; a < o; a++) Jt(e, t[a], n, r);
			return this;
		}
		function Gt(e, t) {
			for (var n in e[Ut]) {
				var r = n.split(/\d/)[0];
				(!t || t(r)) && Jt(e, r, null, null, n);
			}
		}
		var Kt = {
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			wheel: !("onwheel" in window) && "mousewheel"
		};
		function qt(e, t, n, r) {
			var i = t + o(n) + (r ? "_" + o(r) : "");
			if (e[Ut] && e[Ut][i]) return this;
			var a = function(t) {
				return n.call(r || e, t || window.event);
			}, s = a;
			!U.touchNative && U.pointer && t.indexOf("touch") === 0 ? a = et(e, t, a) : U.touch && t === "dblclick" ? a = ut(e, a) : "addEventListener" in e ? t === "touchstart" || t === "touchmove" || t === "wheel" || t === "mousewheel" ? e.addEventListener(Kt[t] || t, a, U.passiveEvents ? { passive: !1 } : !1) : t === "mouseenter" || t === "mouseleave" ? (a = function(t) {
				t ||= window.event, an(e, t) && s(t);
			}, e.addEventListener(Kt[t], a, !1)) : e.addEventListener(t, s, !1) : e.attachEvent("on" + t, a), e[Ut] = e[Ut] || {}, e[Ut][i] = a;
		}
		function Jt(e, t, n, r, i) {
			i ||= t + o(n) + (r ? "_" + o(r) : "");
			var a = e[Ut] && e[Ut][i];
			if (!a) return this;
			!U.touchNative && U.pointer && t.indexOf("touch") === 0 ? tt(e, t, a) : U.touch && t === "dblclick" ? dt(e, a) : "removeEventListener" in e ? e.removeEventListener(Kt[t] || t, a, !1) : e.detachEvent("on" + t, a), e[Ut][i] = null;
		}
		function Yt(e) {
			return e.stopPropagation ? e.stopPropagation() : e.originalEvent ? e.originalEvent._stopped = !0 : e.cancelBubble = !0, this;
		}
		function Xt(e) {
			return qt(e, "wheel", Yt), this;
		}
		function Zt(e) {
			return J(e, "mousedown touchstart dblclick contextmenu", Yt), e._leaflet_disable_click = !0, this;
		}
		function Qt(e) {
			return e.preventDefault ? e.preventDefault() : e.returnValue = !1, this;
		}
		function $t(e) {
			return Qt(e), Yt(e), this;
		}
		function en(e) {
			if (e.composedPath) return e.composedPath();
			for (var t = [], n = e.target; n;) t.push(n), n = n.parentNode;
			return t;
		}
		function tn(e, t) {
			if (!t) return new A(e.clientX, e.clientY);
			var n = Vt(t), r = n.boundingClientRect;
			return new A((e.clientX - r.left) / n.x - t.clientLeft, (e.clientY - r.top) / n.y - t.clientTop);
		}
		var nn = U.linux && U.chrome ? window.devicePixelRatio : U.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
		function rn(e) {
			return U.edge ? e.wheelDeltaY / 2 : e.deltaY && e.deltaMode === 0 ? -e.deltaY / nn : e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : e.deltaX || e.deltaZ ? 0 : e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : e.detail ? e.detail / -32765 * 60 : 0;
		}
		function an(e, t) {
			var n = t.relatedTarget;
			if (!n) return !0;
			try {
				for (; n && n !== e;) n = n.parentNode;
			} catch {
				return !1;
			}
			return n !== e;
		}
		var on = {
			__proto__: null,
			on: J,
			off: Wt,
			stopPropagation: Yt,
			disableScrollPropagation: Xt,
			disableClickPropagation: Zt,
			preventDefault: Qt,
			stop: $t,
			getPropagationPath: en,
			getMousePosition: tn,
			getWheelDelta: rn,
			isExternalTarget: an,
			addListener: J,
			removeListener: Wt
		}, sn = k.extend({
			run: function(e, t, n, r) {
				this.stop(), this._el = e, this._inProgress = !0, this._duration = n || .25, this._easeOutPower = 1 / Math.max(r || .5, .2), this._startPos = At(e), this._offset = t.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
			},
			stop: function() {
				this._inProgress && (this._step(!0), this._complete());
			},
			_animate: function() {
				this._animId = T(this._animate, this), this._step();
			},
			_step: function(e) {
				var t = +/* @__PURE__ */ new Date() - this._startTime, n = this._duration * 1e3;
				t < n ? this._runFrame(this._easeOut(t / n), e) : (this._runFrame(1), this._complete());
			},
			_runFrame: function(e, t) {
				var n = this._startPos.add(this._offset.multiplyBy(e));
				t && n._round(), kt(this._el, n), this.fire("step");
			},
			_complete: function() {
				E(this._animId), this._inProgress = !1, this.fire("end");
			},
			_easeOut: function(e) {
				return 1 - (1 - e) ** this._easeOutPower;
			}
		}), Y = k.extend({
			options: {
				crs: le,
				center: void 0,
				zoom: void 0,
				minZoom: void 0,
				maxZoom: void 0,
				layers: [],
				maxBounds: void 0,
				renderer: void 0,
				zoomAnimation: !0,
				zoomAnimationThreshold: 4,
				fadeAnimation: !0,
				markerZoomAnimation: !0,
				transform3DLimit: 8388608,
				zoomSnap: 1,
				zoomDelta: 1,
				trackResize: !0
			},
			initialize: function(e, t) {
				t = p(this, t), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(e), this._initLayout(), this._onResize = i(this._onResize, this), this._initEvents(), t.maxBounds && this.setMaxBounds(t.maxBounds), t.zoom !== void 0 && (this._zoom = this._limitZoom(t.zoom)), t.center && t.zoom !== void 0 && this.setView(F(t.center), t.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = pt && U.any3d && !U.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), J(this._proxy, mt, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
			},
			setView: function(e, t, r) {
				return t = t === void 0 ? this._zoom : this._limitZoom(t), e = this._limitCenter(F(e), t, this.options.maxBounds), r ||= {}, this._stop(), this._loaded && !r.reset && r !== !0 && (r.animate !== void 0 && (r.zoom = n({ animate: r.animate }, r.zoom), r.pan = n({
					animate: r.animate,
					duration: r.duration
				}, r.pan)), this._zoom === t ? this._tryAnimatedPan(e, r.pan) : this._tryAnimatedZoom && this._tryAnimatedZoom(e, t, r.zoom)) ? (clearTimeout(this._sizeTimer), this) : (this._resetView(e, t, r.pan && r.pan.noMoveStart), this);
			},
			setZoom: function(e, t) {
				return this._loaded ? this.setView(this.getCenter(), e, { zoom: t }) : (this._zoom = e, this);
			},
			zoomIn: function(e, t) {
				return e ||= U.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom + e, t);
			},
			zoomOut: function(e, t) {
				return e ||= U.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom - e, t);
			},
			setZoomAround: function(e, t, n) {
				var r = this.getZoomScale(t), i = this.getSize().divideBy(2), a = (e instanceof A ? e : this.latLngToContainerPoint(e)).subtract(i).multiplyBy(1 - 1 / r), o = this.containerPointToLatLng(i.add(a));
				return this.setView(o, t, { zoom: n });
			},
			_getBoundsCenterZoom: function(e, t) {
				t ||= {}, e = e.getBounds ? e.getBounds() : N(e);
				var n = j(t.paddingTopLeft || t.padding || [0, 0]), r = j(t.paddingBottomRight || t.padding || [0, 0]), i = this.getBoundsZoom(e, !1, n.add(r));
				if (i = typeof t.maxZoom == "number" ? Math.min(t.maxZoom, i) : i, i === Infinity) return {
					center: e.getCenter(),
					zoom: i
				};
				var a = r.subtract(n).divideBy(2), o = this.project(e.getSouthWest(), i), s = this.project(e.getNorthEast(), i);
				return {
					center: this.unproject(o.add(s).divideBy(2).add(a), i),
					zoom: i
				};
			},
			fitBounds: function(e, t) {
				if (e = N(e), !e.isValid()) throw Error("Bounds are not valid.");
				var n = this._getBoundsCenterZoom(e, t);
				return this.setView(n.center, n.zoom, t);
			},
			fitWorld: function(e) {
				return this.fitBounds([[-90, -180], [90, 180]], e);
			},
			panTo: function(e, t) {
				return this.setView(e, this._zoom, { pan: t });
			},
			panBy: function(e, t) {
				if (e = j(e).round(), t ||= {}, !e.x && !e.y) return this.fire("moveend");
				if (t.animate !== !0 && !this.getSize().contains(e)) return this._resetView(this.unproject(this.project(this.getCenter()).add(e)), this.getZoom()), this;
				if (this._panAnim || (this._panAnim = new sn(), this._panAnim.on({
					step: this._onPanTransitionStep,
					end: this._onPanTransitionEnd
				}, this)), t.noMoveStart || this.fire("movestart"), t.animate !== !1) {
					K(this._mapPane, "leaflet-pan-anim");
					var n = this._getMapPanePos().subtract(e).round();
					this._panAnim.run(this._mapPane, n, t.duration || .25, t.easeLinearity);
				} else this._rawPanBy(e), this.fire("move").fire("moveend");
				return this;
			},
			flyTo: function(e, t, n) {
				if (n ||= {}, n.animate === !1 || !U.any3d) return this.setView(e, t, n);
				this._stop();
				var r = this.project(this.getCenter()), i = this.project(e), a = this.getSize(), o = this._zoom;
				e = F(e), t = t === void 0 ? o : t;
				var s = Math.max(a.x, a.y), c = s * this.getZoomScale(o, t), l = i.distanceTo(r) || 1, u = 1.42, d = u * u;
				function f(e) {
					var t = e ? -1 : 1, n = e ? c : s, r = (c * c - s * s + t * d * d * l * l) / (2 * n * d * l), i = Math.sqrt(r * r + 1) - r;
					return i < 1e-9 ? -18 : Math.log(i);
				}
				function p(e) {
					return (Math.exp(e) - Math.exp(-e)) / 2;
				}
				function m(e) {
					return (Math.exp(e) + Math.exp(-e)) / 2;
				}
				function h(e) {
					return p(e) / m(e);
				}
				var g = f(0);
				function _(e) {
					return s * (m(g) / m(g + u * e));
				}
				function v(e) {
					return s * (m(g) * h(g + u * e) - p(g)) / d;
				}
				function y(e) {
					return 1 - (1 - e) ** 1.5;
				}
				var b = Date.now(), x = (f(1) - g) / u, S = n.duration ? 1e3 * n.duration : 1e3 * x * .8;
				function C() {
					var n = (Date.now() - b) / S, a = y(n) * x;
					n <= 1 ? (this._flyToFrame = T(C, this), this._move(this.unproject(r.add(i.subtract(r).multiplyBy(v(a) / l)), o), this.getScaleZoom(s / _(a), o), { flyTo: !0 })) : this._move(e, t)._moveEnd(!0);
				}
				return this._moveStart(!0, n.noMoveStart), C.call(this), this;
			},
			flyToBounds: function(e, t) {
				var n = this._getBoundsCenterZoom(e, t);
				return this.flyTo(n.center, n.zoom, t);
			},
			setMaxBounds: function(e) {
				return e = N(e), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), e.isValid() ? (this.options.maxBounds = e, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
			},
			setMinZoom: function(e) {
				var t = this.options.minZoom;
				return this.options.minZoom = e, this._loaded && t !== e && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(e) : this;
			},
			setMaxZoom: function(e) {
				var t = this.options.maxZoom;
				return this.options.maxZoom = e, this._loaded && t !== e && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(e) : this;
			},
			panInsideBounds: function(e, t) {
				this._enforcingBounds = !0;
				var n = this.getCenter(), r = this._limitCenter(n, this._zoom, N(e));
				return n.equals(r) || this.panTo(r, t), this._enforcingBounds = !1, this;
			},
			panInside: function(e, t) {
				t ||= {};
				var n = j(t.paddingTopLeft || t.padding || [0, 0]), r = j(t.paddingBottomRight || t.padding || [0, 0]), i = this.project(this.getCenter()), a = this.project(e), o = this.getPixelBounds(), s = re([o.min.add(n), o.max.subtract(r)]), c = s.getSize();
				if (!s.contains(a)) {
					this._enforcingBounds = !0;
					var l = a.subtract(s.getCenter()), u = s.extend(a).getSize().subtract(c);
					i.x += l.x < 0 ? -u.x : u.x, i.y += l.y < 0 ? -u.y : u.y, this.panTo(this.unproject(i), t), this._enforcingBounds = !1;
				}
				return this;
			},
			invalidateSize: function(e) {
				if (!this._loaded) return this;
				e = n({
					animate: !1,
					pan: !0
				}, e === !0 ? { animate: !0 } : e);
				var t = this.getSize();
				this._sizeChanged = !0, this._lastCenter = null;
				var r = this.getSize(), a = t.divideBy(2).round(), o = r.divideBy(2).round(), s = a.subtract(o);
				return !s.x && !s.y ? this : (e.animate && e.pan ? this.panBy(s) : (e.pan && this._rawPanBy(s), this.fire("move"), e.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(i(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
					oldSize: t,
					newSize: r
				}));
			},
			stop: function() {
				return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
			},
			locate: function(e) {
				if (e = this._locateOptions = n({
					timeout: 1e4,
					watch: !1
				}, e), !("geolocation" in navigator)) return this._handleGeolocationError({
					code: 0,
					message: "Geolocation not supported."
				}), this;
				var t = i(this._handleGeolocationResponse, this), r = i(this._handleGeolocationError, this);
				return e.watch ? this._locationWatchId = navigator.geolocation.watchPosition(t, r, e) : navigator.geolocation.getCurrentPosition(t, r, e), this;
			},
			stopLocate: function() {
				return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
			},
			_handleGeolocationError: function(e) {
				if (this._container._leaflet_id) {
					var t = e.code, n = e.message || (t === 1 ? "permission denied" : t === 2 ? "position unavailable" : "timeout");
					this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
						code: t,
						message: "Geolocation error: " + n + "."
					});
				}
			},
			_handleGeolocationResponse: function(e) {
				if (this._container._leaflet_id) {
					var t = e.coords.latitude, n = e.coords.longitude, r = new P(t, n), i = r.toBounds(e.coords.accuracy * 2), a = this._locateOptions;
					if (a.setView) {
						var o = this.getBoundsZoom(i);
						this.setView(r, a.maxZoom ? Math.min(o, a.maxZoom) : o);
					}
					var s = {
						latlng: r,
						bounds: i,
						timestamp: e.timestamp
					};
					for (var c in e.coords) typeof e.coords[c] == "number" && (s[c] = e.coords[c]);
					this.fire("locationfound", s);
				}
			},
			addHandler: function(e, t) {
				if (!t) return this;
				var n = this[e] = new t(this);
				return this._handlers.push(n), this.options[e] && n.enable(), this;
			},
			remove: function() {
				if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id) throw Error("Map container is being reused by another instance");
				try {
					delete this._container._leaflet_id, delete this._containerId;
				} catch {
					this._container._leaflet_id = void 0, this._containerId = void 0;
				}
				for (var e in this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), _t(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest &&= (E(this._resizeRequest), null), this._clearHandlers(), this._loaded && this.fire("unload"), this._layers) this._layers[e].remove();
				for (e in this._panes) _t(this._panes[e]);
				return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
			},
			createPane: function(e, t) {
				var n = G("div", "leaflet-pane" + (e ? " leaflet-" + e.replace("Pane", "") + "-pane" : ""), t || this._mapPane);
				return e && (this._panes[e] = n), n;
			},
			getCenter: function() {
				return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
			},
			getZoom: function() {
				return this._zoom;
			},
			getBounds: function() {
				var e = this.getPixelBounds();
				return new ie(this.unproject(e.getBottomLeft()), this.unproject(e.getTopRight()));
			},
			getMinZoom: function() {
				return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
			},
			getMaxZoom: function() {
				return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
			},
			getBoundsZoom: function(e, t, n) {
				e = N(e), n = j(n || [0, 0]);
				var r = this.getZoom() || 0, i = this.getMinZoom(), a = this.getMaxZoom(), o = e.getNorthWest(), s = e.getSouthEast(), c = this.getSize().subtract(n), l = re(this.project(s, r), this.project(o, r)).getSize(), u = U.any3d ? this.options.zoomSnap : 1, d = c.x / l.x, f = c.y / l.y, p = t ? Math.max(d, f) : Math.min(d, f);
				return r = this.getScaleZoom(p, r), u && (r = Math.round(r / (u / 100)) * (u / 100), r = t ? Math.ceil(r / u) * u : Math.floor(r / u) * u), Math.max(i, Math.min(a, r));
			},
			getSize: function() {
				return (!this._size || this._sizeChanged) && (this._size = new A(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1), this._size.clone();
			},
			getPixelBounds: function(e, t) {
				var n = this._getTopLeftPoint(e, t);
				return new M(n, n.add(this.getSize()));
			},
			getPixelOrigin: function() {
				return this._checkIfLoaded(), this._pixelOrigin;
			},
			getPixelWorldBounds: function(e) {
				return this.options.crs.getProjectedBounds(e === void 0 ? this.getZoom() : e);
			},
			getPane: function(e) {
				return typeof e == "string" ? this._panes[e] : e;
			},
			getPanes: function() {
				return this._panes;
			},
			getContainer: function() {
				return this._container;
			},
			getZoomScale: function(e, t) {
				var n = this.options.crs;
				return t = t === void 0 ? this._zoom : t, n.scale(e) / n.scale(t);
			},
			getScaleZoom: function(e, t) {
				var n = this.options.crs;
				t = t === void 0 ? this._zoom : t;
				var r = n.zoom(e * n.scale(t));
				return isNaN(r) ? Infinity : r;
			},
			project: function(e, t) {
				return t = t === void 0 ? this._zoom : t, this.options.crs.latLngToPoint(F(e), t);
			},
			unproject: function(e, t) {
				return t = t === void 0 ? this._zoom : t, this.options.crs.pointToLatLng(j(e), t);
			},
			layerPointToLatLng: function(e) {
				var t = j(e).add(this.getPixelOrigin());
				return this.unproject(t);
			},
			latLngToLayerPoint: function(e) {
				return this.project(F(e))._round()._subtract(this.getPixelOrigin());
			},
			wrapLatLng: function(e) {
				return this.options.crs.wrapLatLng(F(e));
			},
			wrapLatLngBounds: function(e) {
				return this.options.crs.wrapLatLngBounds(N(e));
			},
			distance: function(e, t) {
				return this.options.crs.distance(F(e), F(t));
			},
			containerPointToLayerPoint: function(e) {
				return j(e).subtract(this._getMapPanePos());
			},
			layerPointToContainerPoint: function(e) {
				return j(e).add(this._getMapPanePos());
			},
			containerPointToLatLng: function(e) {
				var t = this.containerPointToLayerPoint(j(e));
				return this.layerPointToLatLng(t);
			},
			latLngToContainerPoint: function(e) {
				return this.layerPointToContainerPoint(this.latLngToLayerPoint(F(e)));
			},
			mouseEventToContainerPoint: function(e) {
				return tn(e, this._container);
			},
			mouseEventToLayerPoint: function(e) {
				return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
			},
			mouseEventToLatLng: function(e) {
				return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
			},
			_initContainer: function(e) {
				var t = this._container = ht(e);
				if (!t) throw Error("Map container not found.");
				if (t._leaflet_id) throw Error("Map container is already initialized.");
				J(t, "scroll", this._onScroll, this), this._containerId = o(t);
			},
			_initLayout: function() {
				var e = this._container;
				this._fadeAnimated = this.options.fadeAnimation && U.any3d, K(e, "leaflet-container" + (U.touch ? " leaflet-touch" : "") + (U.retina ? " leaflet-retina" : "") + (U.ielt9 ? " leaflet-oldie" : "") + (U.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
				var t = gt(e, "position");
				t !== "absolute" && t !== "relative" && t !== "fixed" && t !== "sticky" && (e.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
			},
			_initPanes: function() {
				var e = this._panes = {};
				this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), kt(this._mapPane, new A(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (K(e.markerPane, "leaflet-zoom-hide"), K(e.shadowPane, "leaflet-zoom-hide"));
			},
			_resetView: function(e, t, n) {
				kt(this._mapPane, new A(0, 0));
				var r = !this._loaded;
				this._loaded = !0, t = this._limitZoom(t), this.fire("viewprereset");
				var i = this._zoom !== t;
				this._moveStart(i, n)._move(e, t)._moveEnd(i), this.fire("viewreset"), r && this.fire("load");
			},
			_moveStart: function(e, t) {
				return e && this.fire("zoomstart"), t || this.fire("movestart"), this;
			},
			_move: function(e, t, n, r) {
				t === void 0 && (t = this._zoom);
				var i = this._zoom !== t;
				return this._zoom = t, this._lastCenter = e, this._pixelOrigin = this._getNewPixelOrigin(e), r ? n && n.pinch && this.fire("zoom", n) : ((i || n && n.pinch) && this.fire("zoom", n), this.fire("move", n)), this;
			},
			_moveEnd: function(e) {
				return e && this.fire("zoomend"), this.fire("moveend");
			},
			_stop: function() {
				return E(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
			},
			_rawPanBy: function(e) {
				kt(this._mapPane, this._getMapPanePos().subtract(e));
			},
			_getZoomSpan: function() {
				return this.getMaxZoom() - this.getMinZoom();
			},
			_panInsideMaxBounds: function() {
				this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
			},
			_checkIfLoaded: function() {
				if (!this._loaded) throw Error("Set map center and zoom first.");
			},
			_initEvents: function(e) {
				this._targets = {}, this._targets[o(this._container)] = this;
				var t = e ? Wt : J;
				t(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && t(window, "resize", this._onResize, this), U.any3d && this.options.transform3DLimit && (e ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
			},
			_onResize: function() {
				E(this._resizeRequest), this._resizeRequest = T(function() {
					this.invalidateSize({ debounceMoveend: !0 });
				}, this);
			},
			_onScroll: function() {
				this._container.scrollTop = 0, this._container.scrollLeft = 0;
			},
			_onMoveEnd: function() {
				var e = this._getMapPanePos();
				Math.max(Math.abs(e.x), Math.abs(e.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
			},
			_findEventTargets: function(e, t) {
				for (var n = [], r, i = t === "mouseout" || t === "mouseover", a = e.target || e.srcElement, s = !1; a;) {
					if (r = this._targets[o(a)], r && (t === "click" || t === "preclick") && this._draggableMoved(r)) {
						s = !0;
						break;
					}
					if (r && r.listens(t, !0) && (i && !an(a, e) || (n.push(r), i)) || a === this._container) break;
					a = a.parentNode;
				}
				return !n.length && !s && !i && this.listens(t, !0) && (n = [this]), n;
			},
			_isClickDisabled: function(e) {
				for (; e && e !== this._container;) {
					if (e._leaflet_disable_click) return !0;
					e = e.parentNode;
				}
			},
			_handleDOMEvent: function(e) {
				var t = e.target || e.srcElement;
				if (!(!this._loaded || t._leaflet_disable_events || e.type === "click" && this._isClickDisabled(t))) {
					var n = e.type;
					n === "mousedown" && Rt(t), this._fireDOMEvent(e, n);
				}
			},
			_mouseEvents: [
				"click",
				"dblclick",
				"mouseover",
				"mouseout",
				"contextmenu"
			],
			_fireDOMEvent: function(e, t, r) {
				if (e.type === "click") {
					var i = n({}, e);
					i.type = "preclick", this._fireDOMEvent(i, i.type, r);
				}
				var a = this._findEventTargets(e, t);
				if (r) {
					for (var o = [], s = 0; s < r.length; s++) r[s].listens(t, !0) && o.push(r[s]);
					a = o.concat(a);
				}
				if (a.length) {
					t === "contextmenu" && Qt(e);
					var c = a[0], l = { originalEvent: e };
					if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
						var u = c.getLatLng && (!c._radius || c._radius <= 10);
						l.containerPoint = u ? this.latLngToContainerPoint(c.getLatLng()) : this.mouseEventToContainerPoint(e), l.layerPoint = this.containerPointToLayerPoint(l.containerPoint), l.latlng = u ? c.getLatLng() : this.layerPointToLatLng(l.layerPoint);
					}
					for (s = 0; s < a.length; s++) if (a[s].fire(t, l, !0), l.originalEvent._stopped || a[s].options.bubblingMouseEvents === !1 && v(this._mouseEvents, t) !== -1) return;
				}
			},
			_draggableMoved: function(e) {
				return e = e.dragging && e.dragging.enabled() ? e : this, e.dragging && e.dragging.moved() || this.boxZoom && this.boxZoom.moved();
			},
			_clearHandlers: function() {
				for (var e = 0, t = this._handlers.length; e < t; e++) this._handlers[e].disable();
			},
			whenReady: function(e, t) {
				return this._loaded ? e.call(t || this, { target: this }) : this.on("load", e, t), this;
			},
			_getMapPanePos: function() {
				return At(this._mapPane) || new A(0, 0);
			},
			_moved: function() {
				var e = this._getMapPanePos();
				return e && !e.equals([0, 0]);
			},
			_getTopLeftPoint: function(e, t) {
				return (e && t !== void 0 ? this._getNewPixelOrigin(e, t) : this.getPixelOrigin()).subtract(this._getMapPanePos());
			},
			_getNewPixelOrigin: function(e, t) {
				var n = this.getSize()._divideBy(2);
				return this.project(e, t)._subtract(n)._add(this._getMapPanePos())._round();
			},
			_latLngToNewLayerPoint: function(e, t, n) {
				var r = this._getNewPixelOrigin(n, t);
				return this.project(e, t)._subtract(r);
			},
			_latLngBoundsToNewLayerBounds: function(e, t, n) {
				var r = this._getNewPixelOrigin(n, t);
				return re([
					this.project(e.getSouthWest(), t)._subtract(r),
					this.project(e.getNorthWest(), t)._subtract(r),
					this.project(e.getSouthEast(), t)._subtract(r),
					this.project(e.getNorthEast(), t)._subtract(r)
				]);
			},
			_getCenterLayerPoint: function() {
				return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
			},
			_getCenterOffset: function(e) {
				return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint());
			},
			_limitCenter: function(e, t, n) {
				if (!n) return e;
				var r = this.project(e, t), i = this.getSize().divideBy(2), a = new M(r.subtract(i), r.add(i)), o = this._getBoundsOffset(a, n, t);
				return Math.abs(o.x) <= 1 && Math.abs(o.y) <= 1 ? e : this.unproject(r.add(o), t);
			},
			_limitOffset: function(e, t) {
				if (!t) return e;
				var n = this.getPixelBounds(), r = new M(n.min.add(e), n.max.add(e));
				return e.add(this._getBoundsOffset(r, t));
			},
			_getBoundsOffset: function(e, t, n) {
				var r = re(this.project(t.getNorthEast(), n), this.project(t.getSouthWest(), n)), i = r.min.subtract(e.min), a = r.max.subtract(e.max);
				return new A(this._rebound(i.x, -a.x), this._rebound(i.y, -a.y));
			},
			_rebound: function(e, t) {
				return e + t > 0 ? Math.round(e - t) / 2 : Math.max(0, Math.ceil(e)) - Math.max(0, Math.floor(t));
			},
			_limitZoom: function(e) {
				var t = this.getMinZoom(), n = this.getMaxZoom(), r = U.any3d ? this.options.zoomSnap : 1;
				return r && (e = Math.round(e / r) * r), Math.max(t, Math.min(n, e));
			},
			_onPanTransitionStep: function() {
				this.fire("move");
			},
			_onPanTransitionEnd: function() {
				St(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
			},
			_tryAnimatedPan: function(e, t) {
				var n = this._getCenterOffset(e)._trunc();
				return (t && t.animate) !== !0 && !this.getSize().contains(n) ? !1 : (this.panBy(n, t), !0);
			},
			_createAnimProxy: function() {
				var e = this._proxy = G("div", "leaflet-proxy leaflet-zoom-animated");
				this._panes.mapPane.appendChild(e), this.on("zoomanim", function(e) {
					var t = ft, n = this._proxy.style[t];
					Ot(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === this._proxy.style[t] && this._animatingZoom && this._onZoomTransitionEnd();
				}, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
			},
			_destroyAnimProxy: function() {
				_t(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
			},
			_animMoveEnd: function() {
				var e = this.getCenter(), t = this.getZoom();
				Ot(this._proxy, this.project(e, t), this.getZoomScale(t, 1));
			},
			_catchTransitionEnd: function(e) {
				this._animatingZoom && e.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
			},
			_nothingToAnimate: function() {
				return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
			},
			_tryAnimatedZoom: function(e, t, n) {
				if (this._animatingZoom) return !0;
				if (n ||= {}, !this._zoomAnimated || n.animate === !1 || this._nothingToAnimate() || Math.abs(t - this._zoom) > this.options.zoomAnimationThreshold) return !1;
				var r = this.getZoomScale(t), i = this._getCenterOffset(e)._divideBy(1 - 1 / r);
				return n.animate !== !0 && !this.getSize().contains(i) ? !1 : (T(function() {
					this._moveStart(!0, n.noMoveStart || !1)._animateZoom(e, t, !0);
				}, this), !0);
			},
			_animateZoom: function(e, t, n, r) {
				this._mapPane && (n && (this._animatingZoom = !0, this._animateToCenter = e, this._animateToZoom = t, K(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
					center: e,
					zoom: t,
					noUpdate: r
				}), this._tempFireZoomEvent ||= this._zoom !== this._animateToZoom, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(i(this._onZoomTransitionEnd, this), 250));
			},
			_onZoomTransitionEnd: function() {
				this._animatingZoom && (this._mapPane && St(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
			}
		});
		function cn(e, t) {
			return new Y(e, t);
		}
		var ln = O.extend({
			options: { position: "topright" },
			initialize: function(e) {
				p(this, e);
			},
			getPosition: function() {
				return this.options.position;
			},
			setPosition: function(e) {
				var t = this._map;
				return t && t.removeControl(this), this.options.position = e, t && t.addControl(this), this;
			},
			getContainer: function() {
				return this._container;
			},
			addTo: function(e) {
				this.remove(), this._map = e;
				var t = this._container = this.onAdd(e), n = this.getPosition(), r = e._controlCorners[n];
				return K(t, "leaflet-control"), n.indexOf("bottom") === -1 ? r.appendChild(t) : r.insertBefore(t, r.firstChild), this._map.on("unload", this.remove, this), this;
			},
			remove: function() {
				return this._map &&= (_t(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), null), this;
			},
			_refocusOnMap: function(e) {
				this._map && e && e.screenX > 0 && e.screenY > 0 && this._map.getContainer().focus();
			}
		}), un = function(e) {
			return new ln(e);
		};
		Y.include({
			addControl: function(e) {
				return e.addTo(this), this;
			},
			removeControl: function(e) {
				return e.remove(), this;
			},
			_initControlPos: function() {
				var e = this._controlCorners = {}, t = "leaflet-", n = this._controlContainer = G("div", t + "control-container", this._container);
				function r(r, i) {
					var a = t + r + " " + t + i;
					e[r + i] = G("div", a, n);
				}
				r("top", "left"), r("top", "right"), r("bottom", "left"), r("bottom", "right");
			},
			_clearControlPos: function() {
				for (var e in this._controlCorners) _t(this._controlCorners[e]);
				_t(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
			}
		});
		var X = ln.extend({
			options: {
				collapsed: !0,
				position: "topright",
				autoZIndex: !0,
				hideSingleBase: !1,
				sortLayers: !1,
				sortFunction: function(e, t, n, r) {
					return n < r ? -1 : +(r < n);
				}
			},
			initialize: function(e, t, n) {
				for (var r in p(this, n), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1, e) this._addLayer(e[r], r);
				for (r in t) this._addLayer(t[r], r, !0);
			},
			onAdd: function(e) {
				this._initLayout(), this._update(), this._map = e, e.on("zoomend", this._checkDisabledLayers, this);
				for (var t = 0; t < this._layers.length; t++) this._layers[t].layer.on("add remove", this._onLayerChange, this);
				return this._container;
			},
			addTo: function(e) {
				return ln.prototype.addTo.call(this, e), this._expandIfNotCollapsed();
			},
			onRemove: function() {
				this._map.off("zoomend", this._checkDisabledLayers, this);
				for (var e = 0; e < this._layers.length; e++) this._layers[e].layer.off("add remove", this._onLayerChange, this);
			},
			addBaseLayer: function(e, t) {
				return this._addLayer(e, t), this._map ? this._update() : this;
			},
			addOverlay: function(e, t) {
				return this._addLayer(e, t, !0), this._map ? this._update() : this;
			},
			removeLayer: function(e) {
				e.off("add remove", this._onLayerChange, this);
				var t = this._getLayer(o(e));
				return t && this._layers.splice(this._layers.indexOf(t), 1), this._map ? this._update() : this;
			},
			expand: function() {
				K(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
				var e = this._map.getSize().y - (this._container.offsetTop + 50);
				return e < this._section.clientHeight ? (K(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = e + "px") : St(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
			},
			collapse: function() {
				return St(this._container, "leaflet-control-layers-expanded"), this;
			},
			_initLayout: function() {
				var e = "leaflet-control-layers", t = this._container = G("div", e), n = this.options.collapsed;
				t.setAttribute("aria-haspopup", !0), Zt(t), Xt(t);
				var r = this._section = G("section", e + "-list");
				n && (this._map.on("click", this.collapse, this), J(t, {
					mouseenter: this._expandSafely,
					mouseleave: this.collapse
				}, this));
				var i = this._layersLink = G("a", e + "-toggle", t);
				i.href = "#", i.title = "Layers", i.setAttribute("role", "button"), J(i, {
					keydown: function(e) {
						e.keyCode === 13 && this._expandSafely();
					},
					click: function(e) {
						Qt(e), this._expandSafely();
					}
				}, this), n || this.expand(), this._baseLayersList = G("div", e + "-base", r), this._separator = G("div", e + "-separator", r), this._overlaysList = G("div", e + "-overlays", r), t.appendChild(r);
			},
			_getLayer: function(e) {
				for (var t = 0; t < this._layers.length; t++) if (this._layers[t] && o(this._layers[t].layer) === e) return this._layers[t];
			},
			_addLayer: function(e, t, n) {
				this._map && e.on("add remove", this._onLayerChange, this), this._layers.push({
					layer: e,
					name: t,
					overlay: n
				}), this.options.sortLayers && this._layers.sort(i(function(e, t) {
					return this.options.sortFunction(e.layer, t.layer, e.name, t.name);
				}, this)), this.options.autoZIndex && e.setZIndex && (this._lastZIndex++, e.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
			},
			_update: function() {
				if (!this._container) return this;
				vt(this._baseLayersList), vt(this._overlaysList), this._layerControlInputs = [];
				var e, t, n, r, i = 0;
				for (n = 0; n < this._layers.length; n++) r = this._layers[n], this._addItem(r), t ||= r.overlay, e ||= !r.overlay, i += +!r.overlay;
				return this.options.hideSingleBase && (e &&= i > 1, this._baseLayersList.style.display = e ? "" : "none"), this._separator.style.display = t && e ? "" : "none", this;
			},
			_onLayerChange: function(e) {
				this._handlingClick || this._update();
				var t = this._getLayer(o(e.target)), n = t.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
				n && this._map.fire(n, t);
			},
			_createRadioElement: function(e, t) {
				var n = "<input type=\"radio\" class=\"leaflet-control-layers-selector\" name=\"" + e + "\"" + (t ? " checked=\"checked\"" : "") + "/>", r = document.createElement("div");
				return r.innerHTML = n, r.firstChild;
			},
			_addItem: function(e) {
				var t = document.createElement("label"), n = this._map.hasLayer(e.layer), r;
				e.overlay ? (r = document.createElement("input"), r.type = "checkbox", r.className = "leaflet-control-layers-selector", r.defaultChecked = n) : r = this._createRadioElement("leaflet-base-layers_" + o(this), n), this._layerControlInputs.push(r), r.layerId = o(e.layer), J(r, "click", this._onInputClick, this);
				var i = document.createElement("span");
				i.innerHTML = " " + e.name;
				var a = document.createElement("span");
				return t.appendChild(a), a.appendChild(r), a.appendChild(i), (e.overlay ? this._overlaysList : this._baseLayersList).appendChild(t), this._checkDisabledLayers(), t;
			},
			_onInputClick: function() {
				if (!this._preventClick) {
					var e = this._layerControlInputs, t, n, r = [], i = [];
					this._handlingClick = !0;
					for (var a = e.length - 1; a >= 0; a--) t = e[a], n = this._getLayer(t.layerId).layer, t.checked ? r.push(n) : t.checked || i.push(n);
					for (a = 0; a < i.length; a++) this._map.hasLayer(i[a]) && this._map.removeLayer(i[a]);
					for (a = 0; a < r.length; a++) this._map.hasLayer(r[a]) || this._map.addLayer(r[a]);
					this._handlingClick = !1, this._refocusOnMap();
				}
			},
			_checkDisabledLayers: function() {
				for (var e = this._layerControlInputs, t, n, r = this._map.getZoom(), i = e.length - 1; i >= 0; i--) t = e[i], n = this._getLayer(t.layerId).layer, t.disabled = n.options.minZoom !== void 0 && r < n.options.minZoom || n.options.maxZoom !== void 0 && r > n.options.maxZoom;
			},
			_expandIfNotCollapsed: function() {
				return this._map && !this.options.collapsed && this.expand(), this;
			},
			_expandSafely: function() {
				var e = this._section;
				this._preventClick = !0, J(e, "click", Qt), this.expand();
				var t = this;
				setTimeout(function() {
					Wt(e, "click", Qt), t._preventClick = !1;
				});
			}
		}), dn = function(e, t, n) {
			return new X(e, t, n);
		}, fn = ln.extend({
			options: {
				position: "topleft",
				zoomInText: "<span aria-hidden=\"true\">+</span>",
				zoomInTitle: "Zoom in",
				zoomOutText: "<span aria-hidden=\"true\">&#x2212;</span>",
				zoomOutTitle: "Zoom out"
			},
			onAdd: function(e) {
				var t = "leaflet-control-zoom", n = G("div", t + " leaflet-bar"), r = this.options;
				return this._zoomInButton = this._createButton(r.zoomInText, r.zoomInTitle, t + "-in", n, this._zoomIn), this._zoomOutButton = this._createButton(r.zoomOutText, r.zoomOutTitle, t + "-out", n, this._zoomOut), this._updateDisabled(), e.on("zoomend zoomlevelschange", this._updateDisabled, this), n;
			},
			onRemove: function(e) {
				e.off("zoomend zoomlevelschange", this._updateDisabled, this);
			},
			disable: function() {
				return this._disabled = !0, this._updateDisabled(), this;
			},
			enable: function() {
				return this._disabled = !1, this._updateDisabled(), this;
			},
			_zoomIn: function(e) {
				!this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			},
			_zoomOut: function(e) {
				!this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			},
			_createButton: function(e, t, n, r, i) {
				var a = G("a", n, r);
				return a.innerHTML = e, a.href = "#", a.title = t, a.setAttribute("role", "button"), a.setAttribute("aria-label", t), Zt(a), J(a, "click", $t), J(a, "click", i, this), J(a, "click", this._refocusOnMap, this), a;
			},
			_updateDisabled: function() {
				var e = this._map, t = "leaflet-disabled";
				St(this._zoomInButton, t), St(this._zoomOutButton, t), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || e._zoom === e.getMinZoom()) && (K(this._zoomOutButton, t), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || e._zoom === e.getMaxZoom()) && (K(this._zoomInButton, t), this._zoomInButton.setAttribute("aria-disabled", "true"));
			}
		});
		Y.mergeOptions({ zoomControl: !0 }), Y.addInitHook(function() {
			this.options.zoomControl && (this.zoomControl = new fn(), this.addControl(this.zoomControl));
		});
		var pn = function(e) {
			return new fn(e);
		}, mn = ln.extend({
			options: {
				position: "bottomleft",
				maxWidth: 100,
				metric: !0,
				imperial: !0
			},
			onAdd: function(e) {
				var t = "leaflet-control-scale", n = G("div", t), r = this.options;
				return this._addScales(r, t + "-line", n), e.on(r.updateWhenIdle ? "moveend" : "move", this._update, this), e.whenReady(this._update, this), n;
			},
			onRemove: function(e) {
				e.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
			},
			_addScales: function(e, t, n) {
				e.metric && (this._mScale = G("div", t, n)), e.imperial && (this._iScale = G("div", t, n));
			},
			_update: function() {
				var e = this._map, t = e.getSize().y / 2, n = e.distance(e.containerPointToLatLng([0, t]), e.containerPointToLatLng([this.options.maxWidth, t]));
				this._updateScales(n);
			},
			_updateScales: function(e) {
				this.options.metric && e && this._updateMetric(e), this.options.imperial && e && this._updateImperial(e);
			},
			_updateMetric: function(e) {
				var t = this._getRoundNum(e), n = t < 1e3 ? t + " m" : t / 1e3 + " km";
				this._updateScale(this._mScale, n, t / e);
			},
			_updateImperial: function(e) {
				var t = e * 3.2808399, n, r, i;
				t > 5280 ? (n = t / 5280, r = this._getRoundNum(n), this._updateScale(this._iScale, r + " mi", r / n)) : (i = this._getRoundNum(t), this._updateScale(this._iScale, i + " ft", i / t));
			},
			_updateScale: function(e, t, n) {
				e.style.width = Math.round(this.options.maxWidth * n) + "px", e.innerHTML = t;
			},
			_getRoundNum: function(e) {
				var t = 10 ** ((Math.floor(e) + "").length - 1), n = e / t;
				return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, t * n;
			}
		}), hn = function(e) {
			return new mn(e);
		}, gn = ln.extend({
			options: {
				position: "bottomright",
				prefix: "<a href=\"https://leafletjs.com\" title=\"A JavaScript library for interactive maps\">" + (U.inlineSvg ? "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"8\" viewBox=\"0 0 12 8\" class=\"leaflet-attribution-flag\"><path fill=\"#4C7BE1\" d=\"M0 0h12v4H0z\"/><path fill=\"#FFD500\" d=\"M0 4h12v3H0z\"/><path fill=\"#E0BC00\" d=\"M0 7h12v1H0z\"/></svg> " : "") + "Leaflet</a>"
			},
			initialize: function(e) {
				p(this, e), this._attributions = {};
			},
			onAdd: function(e) {
				for (var t in e.attributionControl = this, this._container = G("div", "leaflet-control-attribution"), Zt(this._container), e._layers) e._layers[t].getAttribution && this.addAttribution(e._layers[t].getAttribution());
				return this._update(), e.on("layeradd", this._addAttribution, this), this._container;
			},
			onRemove: function(e) {
				e.off("layeradd", this._addAttribution, this);
			},
			_addAttribution: function(e) {
				e.layer.getAttribution && (this.addAttribution(e.layer.getAttribution()), e.layer.once("remove", function() {
					this.removeAttribution(e.layer.getAttribution());
				}, this));
			},
			setPrefix: function(e) {
				return this.options.prefix = e, this._update(), this;
			},
			addAttribution: function(e) {
				return e && (this._attributions[e] || (this._attributions[e] = 0), this._attributions[e]++, this._update()), this;
			},
			removeAttribution: function(e) {
				return e && this._attributions[e] && (this._attributions[e]--, this._update()), this;
			},
			_update: function() {
				if (this._map) {
					var e = [];
					for (var t in this._attributions) this._attributions[t] && e.push(t);
					var n = [];
					this.options.prefix && n.push(this.options.prefix), e.length && n.push(e.join(", ")), this._container.innerHTML = n.join(" <span aria-hidden=\"true\">|</span> ");
				}
			}
		});
		Y.mergeOptions({ attributionControl: !0 }), Y.addInitHook(function() {
			this.options.attributionControl && new gn().addTo(this);
		}), ln.Layers = X, ln.Zoom = fn, ln.Scale = mn, ln.Attribution = gn, un.layers = dn, un.zoom = pn, un.scale = hn, un.attribution = function(e) {
			return new gn(e);
		};
		var _n = O.extend({
			initialize: function(e) {
				this._map = e;
			},
			enable: function() {
				return this._enabled || (this._enabled = !0, this.addHooks()), this;
			},
			disable: function() {
				return this._enabled && (this._enabled = !1, this.removeHooks()), this;
			},
			enabled: function() {
				return !!this._enabled;
			}
		});
		_n.addTo = function(e, t) {
			return e.addHandler(t, this), this;
		};
		var vn = { Events: te }, yn = U.touch ? "touchstart mousedown" : "mousedown", bn = k.extend({
			options: { clickTolerance: 3 },
			initialize: function(e, t, n, r) {
				p(this, r), this._element = e, this._dragStartTarget = t || e, this._preventOutline = n;
			},
			enable: function() {
				this._enabled ||= (J(this._dragStartTarget, yn, this._onDown, this), !0);
			},
			disable: function() {
				this._enabled && (bn._dragging === this && this.finishDrag(!0), Wt(this._dragStartTarget, yn, this._onDown, this), this._enabled = !1, this._moved = !1);
			},
			_onDown: function(e) {
				if (this._enabled && (this._moved = !1, !xt(this._element, "leaflet-zoom-anim"))) {
					if (e.touches && e.touches.length !== 1) bn._dragging === this && this.finishDrag();
					else if (!(bn._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) && (bn._dragging = this, this._preventOutline && Rt(this._element), q(), jt(), !this._moving)) {
						this.fire("down");
						var t = e.touches ? e.touches[0] : e, n = Bt(this._element);
						this._startPoint = new A(t.clientX, t.clientY), this._startPos = At(this._element), this._parentScale = Vt(n);
						var r = e.type === "mousedown";
						J(document, r ? "mousemove" : "touchmove", this._onMove, this), J(document, r ? "mouseup" : "touchend touchcancel", this._onUp, this);
					}
				}
			},
			_onMove: function(e) {
				if (this._enabled) {
					if (e.touches && e.touches.length > 1) this._moved = !0;
					else {
						var t = e.touches && e.touches.length === 1 ? e.touches[0] : e, n = new A(t.clientX, t.clientY)._subtract(this._startPoint);
						(n.x || n.y) && (Math.abs(n.x) + Math.abs(n.y) < this.options.clickTolerance || (n.x /= this._parentScale.x, n.y /= this._parentScale.y, Qt(e), this._moved || (this.fire("dragstart"), this._moved = !0, K(document.body, "leaflet-dragging"), this._lastTarget = e.target || e.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), K(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(n), this._moving = !0, this._lastEvent = e, this._updatePosition()));
					}
				}
			},
			_updatePosition: function() {
				var e = { originalEvent: this._lastEvent };
				this.fire("predrag", e), kt(this._element, this._newPos), this.fire("drag", e);
			},
			_onUp: function() {
				this._enabled && this.finishDrag();
			},
			finishDrag: function(e) {
				St(document.body, "leaflet-dragging"), this._lastTarget &&= (St(this._lastTarget, "leaflet-drag-target"), null), Wt(document, "mousemove touchmove", this._onMove, this), Wt(document, "mouseup touchend touchcancel", this._onUp, this), Ft(), Mt();
				var t = this._moved && this._moving;
				this._moving = !1, bn._dragging = !1, t && this.fire("dragend", {
					noInertia: e,
					distance: this._newPos.distanceTo(this._startPos)
				});
			}
		});
		function xn(e, t, n) {
			for (var r, i = [
				1,
				4,
				2,
				8
			], a = 0, o, s, c, l, u = e.length, d, f; a < u; a++) e[a]._code = Nn(e[a], t);
			for (s = 0; s < 4; s++) {
				for (d = i[s], r = [], a = 0, u = e.length, o = u - 1; a < u; o = a++) c = e[a], l = e[o], c._code & d ? l._code & d || (f = Z(l, c, d, t, n), f._code = Nn(f, t), r.push(f)) : (l._code & d && (f = Z(l, c, d, t, n), f._code = Nn(f, t), r.push(f)), r.push(c));
				e = r;
			}
			return e;
		}
		function Sn(e, t) {
			var n, r, i, a, o, s, c, l, u;
			if (!e || e.length === 0) throw Error("latlngs not passed");
			In(e) || (console.warn("latlngs are not flat! Only the first ring will be used"), e = e[0]);
			var d = F([0, 0]), f = N(e);
			f.getNorthWest().distanceTo(f.getSouthWest()) * f.getNorthEast().distanceTo(f.getNorthWest()) < 1700 && (d = Cn(e));
			var p = e.length, m = [];
			for (n = 0; n < p; n++) {
				var h = F(e[n]);
				m.push(t.project(F([h.lat - d.lat, h.lng - d.lng])));
			}
			for (s = c = l = 0, n = 0, r = p - 1; n < p; r = n++) i = m[n], a = m[r], o = i.y * a.x - a.y * i.x, c += (i.x + a.x) * o, l += (i.y + a.y) * o, s += o * 3;
			u = s === 0 ? m[0] : [c / s, l / s];
			var g = t.unproject(j(u));
			return F([g.lat + d.lat, g.lng + d.lng]);
		}
		function Cn(e) {
			for (var t = 0, n = 0, r = 0, i = 0; i < e.length; i++) {
				var a = F(e[i]);
				t += a.lat, n += a.lng, r++;
			}
			return F([t / r, n / r]);
		}
		var wn = {
			__proto__: null,
			clipPolygon: xn,
			polygonCenter: Sn,
			centroid: Cn
		};
		function Tn(e, t) {
			if (!t || !e.length) return e.slice();
			var n = t * t;
			return e = An(e, n), e = On(e, n), e;
		}
		function En(e, t, n) {
			return Math.sqrt(Fn(e, t, n, !0));
		}
		function Dn(e, t, n) {
			return Fn(e, t, n);
		}
		function On(e, t) {
			var n = e.length, r = new (typeof Uint8Array < "u" ? Uint8Array : Array)(n);
			r[0] = r[n - 1] = 1, kn(e, r, t, 0, n - 1);
			var i, a = [];
			for (i = 0; i < n; i++) r[i] && a.push(e[i]);
			return a;
		}
		function kn(e, t, n, r, i) {
			for (var a = 0, o, s = r + 1, c; s <= i - 1; s++) c = Fn(e[s], e[r], e[i], !0), c > a && (o = s, a = c);
			a > n && (t[o] = 1, kn(e, t, n, r, o), kn(e, t, n, o, i));
		}
		function An(e, t) {
			for (var n = [e[0]], r = 1, i = 0, a = e.length; r < a; r++) Pn(e[r], e[i]) > t && (n.push(e[r]), i = r);
			return i < a - 1 && n.push(e[a - 1]), n;
		}
		var jn;
		function Mn(e, t, n, r, i) {
			var a = r ? jn : Nn(e, n), o = Nn(t, n), s, c, l;
			for (jn = o;;) {
				if (!(a | o)) return [e, t];
				if (a & o) return !1;
				s = a || o, c = Z(e, t, s, n, i), l = Nn(c, n), s === a ? (e = c, a = l) : (t = c, o = l);
			}
		}
		function Z(e, t, n, r, i) {
			var a = t.x - e.x, o = t.y - e.y, s = r.min, c = r.max, l, u;
			return n & 8 ? (l = e.x + a * (c.y - e.y) / o, u = c.y) : n & 4 ? (l = e.x + a * (s.y - e.y) / o, u = s.y) : n & 2 ? (l = c.x, u = e.y + o * (c.x - e.x) / a) : n & 1 && (l = s.x, u = e.y + o * (s.x - e.x) / a), new A(l, u, i);
		}
		function Nn(e, t) {
			var n = 0;
			return e.x < t.min.x ? n |= 1 : e.x > t.max.x && (n |= 2), e.y < t.min.y ? n |= 4 : e.y > t.max.y && (n |= 8), n;
		}
		function Pn(e, t) {
			var n = t.x - e.x, r = t.y - e.y;
			return n * n + r * r;
		}
		function Fn(e, t, n, r) {
			var i = t.x, a = t.y, o = n.x - i, s = n.y - a, c = o * o + s * s, l;
			return c > 0 && (l = ((e.x - i) * o + (e.y - a) * s) / c, l > 1 ? (i = n.x, a = n.y) : l > 0 && (i += o * l, a += s * l)), o = e.x - i, s = e.y - a, r ? o * o + s * s : new A(i, a);
		}
		function In(e) {
			return !_(e[0]) || typeof e[0][0] != "object" && e[0][0] !== void 0;
		}
		function Ln(e) {
			return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), In(e);
		}
		function Rn(e, t) {
			var n, r, i, a, o, s, c, l;
			if (!e || e.length === 0) throw Error("latlngs not passed");
			In(e) || (console.warn("latlngs are not flat! Only the first ring will be used"), e = e[0]);
			var u = F([0, 0]), d = N(e);
			d.getNorthWest().distanceTo(d.getSouthWest()) * d.getNorthEast().distanceTo(d.getNorthWest()) < 1700 && (u = Cn(e));
			var f = e.length, p = [];
			for (n = 0; n < f; n++) {
				var m = F(e[n]);
				p.push(t.project(F([m.lat - u.lat, m.lng - u.lng])));
			}
			for (n = 0, r = 0; n < f - 1; n++) r += p[n].distanceTo(p[n + 1]) / 2;
			if (r === 0) l = p[0];
			else for (n = 0, a = 0; n < f - 1; n++) if (o = p[n], s = p[n + 1], i = o.distanceTo(s), a += i, a > r) {
				c = (a - r) / i, l = [s.x - c * (s.x - o.x), s.y - c * (s.y - o.y)];
				break;
			}
			var h = t.unproject(j(l));
			return F([h.lat + u.lat, h.lng + u.lng]);
		}
		var zn = {
			__proto__: null,
			simplify: Tn,
			pointToSegmentDistance: En,
			closestPointOnSegment: Dn,
			clipSegment: Mn,
			_getEdgeIntersection: Z,
			_getBitCode: Nn,
			_sqClosestPointOnSegment: Fn,
			isFlat: In,
			_flat: Ln,
			polylineCenter: Rn
		}, Bn = {
			project: function(e) {
				return new A(e.lng, e.lat);
			},
			unproject: function(e) {
				return new P(e.y, e.x);
			},
			bounds: new M([-180, -90], [180, 90])
		}, Vn = {
			R: 6378137,
			R_MINOR: 6356752.314245179,
			bounds: new M([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
			project: function(e) {
				var t = Math.PI / 180, n = this.R, r = e.lat * t, i = this.R_MINOR / n, a = Math.sqrt(1 - i * i), o = a * Math.sin(r), s = Math.tan(Math.PI / 4 - r / 2) / ((1 - o) / (1 + o)) ** (a / 2);
				return r = -n * Math.log(Math.max(s, 1e-10)), new A(e.lng * t * n, r);
			},
			unproject: function(e) {
				for (var t = 180 / Math.PI, n = this.R, r = this.R_MINOR / n, i = Math.sqrt(1 - r * r), a = Math.exp(-e.y / n), o = Math.PI / 2 - 2 * Math.atan(a), s = 0, c = .1, l; s < 15 && Math.abs(c) > 1e-7; s++) l = i * Math.sin(o), l = ((1 - l) / (1 + l)) ** (i / 2), c = Math.PI / 2 - 2 * Math.atan(a * l) - o, o += c;
				return new P(o * t, e.x * t / n);
			}
		}, Hn = {
			__proto__: null,
			LonLat: Bn,
			Mercator: Vn,
			SphericalMercator: oe
		}, Un = n({}, R, {
			code: "EPSG:3395",
			projection: Vn,
			transformation: function() {
				var e = .5 / (Math.PI * Vn.R);
				return ce(e, .5, -e, .5);
			}()
		}), Wn = n({}, R, {
			code: "EPSG:4326",
			projection: Bn,
			transformation: ce(1 / 180, 1, -1 / 180, .5)
		}), Gn = n({}, I, {
			projection: Bn,
			transformation: ce(1, 0, -1, 0),
			scale: function(e) {
				return 2 ** e;
			},
			zoom: function(e) {
				return Math.log(e) / Math.LN2;
			},
			distance: function(e, t) {
				var n = t.lng - e.lng, r = t.lat - e.lat;
				return Math.sqrt(n * n + r * r);
			},
			infinite: !0
		});
		I.Earth = R, I.EPSG3395 = Un, I.EPSG3857 = le, I.EPSG900913 = ue, I.EPSG4326 = Wn, I.Simple = Gn;
		var Kn = k.extend({
			options: {
				pane: "overlayPane",
				attribution: null,
				bubblingMouseEvents: !0
			},
			addTo: function(e) {
				return e.addLayer(this), this;
			},
			remove: function() {
				return this.removeFrom(this._map || this._mapToAdd);
			},
			removeFrom: function(e) {
				return e && e.removeLayer(this), this;
			},
			getPane: function(e) {
				return this._map.getPane(e ? this.options[e] || e : this.options.pane);
			},
			addInteractiveTarget: function(e) {
				return this._map._targets[o(e)] = this, this;
			},
			removeInteractiveTarget: function(e) {
				return delete this._map._targets[o(e)], this;
			},
			getAttribution: function() {
				return this.options.attribution;
			},
			_layerAdd: function(e) {
				var t = e.target;
				if (t.hasLayer(this)) {
					if (this._map = t, this._zoomAnimated = t._zoomAnimated, this.getEvents) {
						var n = this.getEvents();
						t.on(n, this), this.once("remove", function() {
							t.off(n, this);
						}, this);
					}
					this.onAdd(t), this.fire("add"), t.fire("layeradd", { layer: this });
				}
			}
		});
		Y.include({
			addLayer: function(e) {
				if (!e._layerAdd) throw Error("The provided object is not a Layer.");
				var t = o(e);
				return this._layers[t] || (this._layers[t] = e, e._mapToAdd = this, e.beforeAdd && e.beforeAdd(this), this.whenReady(e._layerAdd, e)), this;
			},
			removeLayer: function(e) {
				var t = o(e);
				return this._layers[t] && (this._loaded && e.onRemove(this), delete this._layers[t], this._loaded && (this.fire("layerremove", { layer: e }), e.fire("remove")), e._map = e._mapToAdd = null), this;
			},
			hasLayer: function(e) {
				return o(e) in this._layers;
			},
			eachLayer: function(e, t) {
				for (var n in this._layers) e.call(t, this._layers[n]);
				return this;
			},
			_addLayers: function(e) {
				e = e ? _(e) ? e : [e] : [];
				for (var t = 0, n = e.length; t < n; t++) this.addLayer(e[t]);
			},
			_addZoomLimit: function(e) {
				isNaN(e.options.maxZoom) && isNaN(e.options.minZoom) || (this._zoomBoundLayers[o(e)] = e, this._updateZoomLevels());
			},
			_removeZoomLimit: function(e) {
				var t = o(e);
				this._zoomBoundLayers[t] && (delete this._zoomBoundLayers[t], this._updateZoomLevels());
			},
			_updateZoomLevels: function() {
				var e = Infinity, t = -Infinity, n = this._getZoomSpan();
				for (var r in this._zoomBoundLayers) {
					var i = this._zoomBoundLayers[r].options;
					e = i.minZoom === void 0 ? e : Math.min(e, i.minZoom), t = i.maxZoom === void 0 ? t : Math.max(t, i.maxZoom);
				}
				this._layersMaxZoom = t === -Infinity ? void 0 : t, this._layersMinZoom = e === Infinity ? void 0 : e, n !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
			}
		});
		var qn = Kn.extend({
			initialize: function(e, t) {
				p(this, t), this._layers = {};
				var n, r;
				if (e) for (n = 0, r = e.length; n < r; n++) this.addLayer(e[n]);
			},
			addLayer: function(e) {
				var t = this.getLayerId(e);
				return this._layers[t] = e, this._map && this._map.addLayer(e), this;
			},
			removeLayer: function(e) {
				var t = e in this._layers ? e : this.getLayerId(e);
				return this._map && this._layers[t] && this._map.removeLayer(this._layers[t]), delete this._layers[t], this;
			},
			hasLayer: function(e) {
				return (typeof e == "number" ? e : this.getLayerId(e)) in this._layers;
			},
			clearLayers: function() {
				return this.eachLayer(this.removeLayer, this);
			},
			invoke: function(e) {
				var t = Array.prototype.slice.call(arguments, 1), n, r;
				for (n in this._layers) r = this._layers[n], r[e] && r[e].apply(r, t);
				return this;
			},
			onAdd: function(e) {
				this.eachLayer(e.addLayer, e);
			},
			onRemove: function(e) {
				this.eachLayer(e.removeLayer, e);
			},
			eachLayer: function(e, t) {
				for (var n in this._layers) e.call(t, this._layers[n]);
				return this;
			},
			getLayer: function(e) {
				return this._layers[e];
			},
			getLayers: function() {
				var e = [];
				return this.eachLayer(e.push, e), e;
			},
			setZIndex: function(e) {
				return this.invoke("setZIndex", e);
			},
			getLayerId: function(e) {
				return o(e);
			}
		}), Jn = function(e, t) {
			return new qn(e, t);
		}, Yn = qn.extend({
			addLayer: function(e) {
				return this.hasLayer(e) ? this : (e.addEventParent(this), qn.prototype.addLayer.call(this, e), this.fire("layeradd", { layer: e }));
			},
			removeLayer: function(e) {
				return this.hasLayer(e) ? (e in this._layers && (e = this._layers[e]), e.removeEventParent(this), qn.prototype.removeLayer.call(this, e), this.fire("layerremove", { layer: e })) : this;
			},
			setStyle: function(e) {
				return this.invoke("setStyle", e);
			},
			bringToFront: function() {
				return this.invoke("bringToFront");
			},
			bringToBack: function() {
				return this.invoke("bringToBack");
			},
			getBounds: function() {
				var e = new ie();
				for (var t in this._layers) {
					var n = this._layers[t];
					e.extend(n.getBounds ? n.getBounds() : n.getLatLng());
				}
				return e;
			}
		}), Xn = function(e, t) {
			return new Yn(e, t);
		}, Zn = O.extend({
			options: {
				popupAnchor: [0, 0],
				tooltipAnchor: [0, 0],
				crossOrigin: !1
			},
			initialize: function(e) {
				p(this, e);
			},
			createIcon: function(e) {
				return this._createIcon("icon", e);
			},
			createShadow: function(e) {
				return this._createIcon("shadow", e);
			},
			_createIcon: function(e, t) {
				var n = this._getIconUrl(e);
				if (!n) {
					if (e === "icon") throw Error("iconUrl not set in Icon options (see the docs).");
					return null;
				}
				var r = this._createImg(n, t && t.tagName === "IMG" ? t : null);
				return this._setIconStyles(r, e), (this.options.crossOrigin || this.options.crossOrigin === "") && (r.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), r;
			},
			_setIconStyles: function(e, t) {
				var n = this.options, r = n[t + "Size"];
				typeof r == "number" && (r = [r, r]);
				var i = j(r), a = j(t === "shadow" && n.shadowAnchor || n.iconAnchor || i && i.divideBy(2, !0));
				e.className = "leaflet-marker-" + t + " " + (n.className || ""), a && (e.style.marginLeft = -a.x + "px", e.style.marginTop = -a.y + "px"), i && (e.style.width = i.x + "px", e.style.height = i.y + "px");
			},
			_createImg: function(e, t) {
				return t ||= document.createElement("img"), t.src = e, t;
			},
			_getIconUrl: function(e) {
				return U.retina && this.options[e + "RetinaUrl"] || this.options[e + "Url"];
			}
		});
		function Qn(e) {
			return new Zn(e);
		}
		var $n = Zn.extend({
			options: {
				iconUrl: "marker-icon.png",
				iconRetinaUrl: "marker-icon-2x.png",
				shadowUrl: "marker-shadow.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				tooltipAnchor: [16, -28],
				shadowSize: [41, 41]
			},
			_getIconUrl: function(e) {
				return typeof $n.imagePath != "string" && ($n.imagePath = this._detectIconPath()), (this.options.imagePath || $n.imagePath) + Zn.prototype._getIconUrl.call(this, e);
			},
			_stripUrl: function(e) {
				var t = function(e, t, n) {
					var r = t.exec(e);
					return r && r[n];
				};
				return e = t(e, /^url\((['"])?(.+)\1\)$/, 2), e && t(e, /^(.*)marker-icon\.png$/, 1);
			},
			_detectIconPath: function() {
				var e = G("div", "leaflet-default-icon-path", document.body), t = gt(e, "background-image") || gt(e, "backgroundImage");
				if (document.body.removeChild(e), t = this._stripUrl(t), t) return t;
				var n = document.querySelector("link[href$=\"leaflet.css\"]");
				return n ? n.href.substring(0, n.href.length - 11 - 1) : "";
			}
		}), er = _n.extend({
			initialize: function(e) {
				this._marker = e;
			},
			addHooks: function() {
				var e = this._marker._icon;
				this._draggable ||= new bn(e, e, !0), this._draggable.on({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).enable(), K(e, "leaflet-marker-draggable");
			},
			removeHooks: function() {
				this._draggable.off({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).disable(), this._marker._icon && St(this._marker._icon, "leaflet-marker-draggable");
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			_adjustPan: function(e) {
				var t = this._marker, n = t._map, r = this._marker.options.autoPanSpeed, i = this._marker.options.autoPanPadding, a = At(t._icon), o = n.getPixelBounds(), s = n.getPixelOrigin(), c = re(o.min._subtract(s).add(i), o.max._subtract(s).subtract(i));
				if (!c.contains(a)) {
					var l = j((Math.max(c.max.x, a.x) - c.max.x) / (o.max.x - c.max.x) - (Math.min(c.min.x, a.x) - c.min.x) / (o.min.x - c.min.x), (Math.max(c.max.y, a.y) - c.max.y) / (o.max.y - c.max.y) - (Math.min(c.min.y, a.y) - c.min.y) / (o.min.y - c.min.y)).multiplyBy(r);
					n.panBy(l, { animate: !1 }), this._draggable._newPos._add(l), this._draggable._startPos._add(l), kt(t._icon, this._draggable._newPos), this._onDrag(e), this._panRequest = T(this._adjustPan.bind(this, e));
				}
			},
			_onDragStart: function() {
				this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
			},
			_onPreDrag: function(e) {
				this._marker.options.autoPan && (E(this._panRequest), this._panRequest = T(this._adjustPan.bind(this, e)));
			},
			_onDrag: function(e) {
				var t = this._marker, n = t._shadow, r = At(t._icon), i = t._map.layerPointToLatLng(r);
				n && kt(n, r), t._latlng = i, e.latlng = i, e.oldLatLng = this._oldLatLng, t.fire("move", e).fire("drag", e);
			},
			_onDragEnd: function(e) {
				E(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", e);
			}
		}), tr = Kn.extend({
			options: {
				icon: new $n(),
				interactive: !0,
				keyboard: !0,
				title: "",
				alt: "Marker",
				zIndexOffset: 0,
				opacity: 1,
				riseOnHover: !1,
				riseOffset: 250,
				pane: "markerPane",
				shadowPane: "shadowPane",
				bubblingMouseEvents: !1,
				autoPanOnFocus: !0,
				draggable: !1,
				autoPan: !1,
				autoPanPadding: [50, 50],
				autoPanSpeed: 10
			},
			initialize: function(e, t) {
				p(this, t), this._latlng = F(e);
			},
			onAdd: function(e) {
				this._zoomAnimated = this._zoomAnimated && e.options.markerZoomAnimation, this._zoomAnimated && e.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
			},
			onRemove: function(e) {
				this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && e.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
			},
			getEvents: function() {
				return {
					zoom: this.update,
					viewreset: this.update
				};
			},
			getLatLng: function() {
				return this._latlng;
			},
			setLatLng: function(e) {
				var t = this._latlng;
				return this._latlng = F(e), this.update(), this.fire("move", {
					oldLatLng: t,
					latlng: this._latlng
				});
			},
			setZIndexOffset: function(e) {
				return this.options.zIndexOffset = e, this.update();
			},
			getIcon: function() {
				return this.options.icon;
			},
			setIcon: function(e) {
				return this.options.icon = e, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
			},
			getElement: function() {
				return this._icon;
			},
			update: function() {
				if (this._icon && this._map) {
					var e = this._map.latLngToLayerPoint(this._latlng).round();
					this._setPos(e);
				}
				return this;
			},
			_initIcon: function() {
				var e = this.options, t = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), n = e.icon.createIcon(this._icon), r = !1;
				n !== this._icon && (this._icon && this._removeIcon(), r = !0, e.title && (n.title = e.title), n.tagName === "IMG" && (n.alt = e.alt || "")), K(n, t), e.keyboard && (n.tabIndex = "0", n.setAttribute("role", "button")), this._icon = n, e.riseOnHover && this.on({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				}), this.options.autoPanOnFocus && J(n, "focus", this._panOnFocus, this);
				var i = e.icon.createShadow(this._shadow), a = !1;
				i !== this._shadow && (this._removeShadow(), a = !0), i && (K(i, t), i.alt = ""), this._shadow = i, e.opacity < 1 && this._updateOpacity(), r && this.getPane().appendChild(this._icon), this._initInteraction(), i && a && this.getPane(e.shadowPane).appendChild(this._shadow);
			},
			_removeIcon: function() {
				this.options.riseOnHover && this.off({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				}), this.options.autoPanOnFocus && Wt(this._icon, "focus", this._panOnFocus, this), _t(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
			},
			_removeShadow: function() {
				this._shadow && _t(this._shadow), this._shadow = null;
			},
			_setPos: function(e) {
				this._icon && kt(this._icon, e), this._shadow && kt(this._shadow, e), this._zIndex = e.y + this.options.zIndexOffset, this._resetZIndex();
			},
			_updateZIndex: function(e) {
				this._icon && (this._icon.style.zIndex = this._zIndex + e);
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center).round();
				this._setPos(t);
			},
			_initInteraction: function() {
				if (this.options.interactive && (K(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), er)) {
					var e = this.options.draggable;
					this.dragging && (e = this.dragging.enabled(), this.dragging.disable()), this.dragging = new er(this), e && this.dragging.enable();
				}
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._map && this._updateOpacity(), this;
			},
			_updateOpacity: function() {
				var e = this.options.opacity;
				this._icon && Tt(this._icon, e), this._shadow && Tt(this._shadow, e);
			},
			_bringToFront: function() {
				this._updateZIndex(this.options.riseOffset);
			},
			_resetZIndex: function() {
				this._updateZIndex(0);
			},
			_panOnFocus: function() {
				var e = this._map;
				if (e) {
					var t = this.options.icon.options, n = t.iconSize ? j(t.iconSize) : j(0, 0), r = t.iconAnchor ? j(t.iconAnchor) : j(0, 0);
					e.panInside(this._latlng, {
						paddingTopLeft: r,
						paddingBottomRight: n.subtract(r)
					});
				}
			},
			_getPopupAnchor: function() {
				return this.options.icon.options.popupAnchor;
			},
			_getTooltipAnchor: function() {
				return this.options.icon.options.tooltipAnchor;
			}
		});
		function nr(e, t) {
			return new tr(e, t);
		}
		var rr = Kn.extend({
			options: {
				stroke: !0,
				color: "#3388ff",
				weight: 3,
				opacity: 1,
				lineCap: "round",
				lineJoin: "round",
				dashArray: null,
				dashOffset: null,
				fill: !1,
				fillColor: null,
				fillOpacity: .2,
				fillRule: "evenodd",
				interactive: !0,
				bubblingMouseEvents: !0
			},
			beforeAdd: function(e) {
				this._renderer = e.getRenderer(this);
			},
			onAdd: function() {
				this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
			},
			onRemove: function() {
				this._renderer._removePath(this);
			},
			redraw: function() {
				return this._map && this._renderer._updatePath(this), this;
			},
			setStyle: function(e) {
				return p(this, e), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && e && Object.prototype.hasOwnProperty.call(e, "weight") && this._updateBounds()), this;
			},
			bringToFront: function() {
				return this._renderer && this._renderer._bringToFront(this), this;
			},
			bringToBack: function() {
				return this._renderer && this._renderer._bringToBack(this), this;
			},
			getElement: function() {
				return this._path;
			},
			_reset: function() {
				this._project(), this._update();
			},
			_clickTolerance: function() {
				return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
			}
		}), ir = rr.extend({
			options: {
				fill: !0,
				radius: 10
			},
			initialize: function(e, t) {
				p(this, t), this._latlng = F(e), this._radius = this.options.radius;
			},
			setLatLng: function(e) {
				var t = this._latlng;
				return this._latlng = F(e), this.redraw(), this.fire("move", {
					oldLatLng: t,
					latlng: this._latlng
				});
			},
			getLatLng: function() {
				return this._latlng;
			},
			setRadius: function(e) {
				return this.options.radius = this._radius = e, this.redraw();
			},
			getRadius: function() {
				return this._radius;
			},
			setStyle: function(e) {
				var t = e && e.radius || this._radius;
				return rr.prototype.setStyle.call(this, e), this.setRadius(t), this;
			},
			_project: function() {
				this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
			},
			_updateBounds: function() {
				var e = this._radius, t = this._radiusY || e, n = this._clickTolerance(), r = [e + n, t + n];
				this._pxBounds = new M(this._point.subtract(r), this._point.add(r));
			},
			_update: function() {
				this._map && this._updatePath();
			},
			_updatePath: function() {
				this._renderer._updateCircle(this);
			},
			_empty: function() {
				return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
			},
			_containsPoint: function(e) {
				return e.distanceTo(this._point) <= this._radius + this._clickTolerance();
			}
		});
		function ar(e, t) {
			return new ir(e, t);
		}
		var or = ir.extend({
			initialize: function(e, t, r) {
				if (typeof t == "number" && (t = n({}, r, { radius: t })), p(this, t), this._latlng = F(e), isNaN(this.options.radius)) throw Error("Circle radius cannot be NaN");
				this._mRadius = this.options.radius;
			},
			setRadius: function(e) {
				return this._mRadius = e, this.redraw();
			},
			getRadius: function() {
				return this._mRadius;
			},
			getBounds: function() {
				var e = [this._radius, this._radiusY || this._radius];
				return new ie(this._map.layerPointToLatLng(this._point.subtract(e)), this._map.layerPointToLatLng(this._point.add(e)));
			},
			setStyle: rr.prototype.setStyle,
			_project: function() {
				var e = this._latlng.lng, t = this._latlng.lat, n = this._map, r = n.options.crs;
				if (r.distance === R.distance) {
					var i = Math.PI / 180, a = this._mRadius / R.R / i, o = n.project([t + a, e]), s = n.project([t - a, e]), c = o.add(s).divideBy(2), l = n.unproject(c).lat, u = Math.acos((Math.cos(a * i) - Math.sin(t * i) * Math.sin(l * i)) / (Math.cos(t * i) * Math.cos(l * i))) / i;
					(isNaN(u) || u === 0) && (u = a / Math.cos(Math.PI / 180 * t)), this._point = c.subtract(n.getPixelOrigin()), this._radius = isNaN(u) ? 0 : c.x - n.project([l, e - u]).x, this._radiusY = c.y - o.y;
				} else {
					var d = r.unproject(r.project(this._latlng).subtract([this._mRadius, 0]));
					this._point = n.latLngToLayerPoint(this._latlng), this._radius = this._point.x - n.latLngToLayerPoint(d).x;
				}
				this._updateBounds();
			}
		});
		function sr(e, t, n) {
			return new or(e, t, n);
		}
		var cr = rr.extend({
			options: {
				smoothFactor: 1,
				noClip: !1
			},
			initialize: function(e, t) {
				p(this, t), this._setLatLngs(e);
			},
			getLatLngs: function() {
				return this._latlngs;
			},
			setLatLngs: function(e) {
				return this._setLatLngs(e), this.redraw();
			},
			isEmpty: function() {
				return !this._latlngs.length;
			},
			closestLayerPoint: function(e) {
				for (var t = Infinity, n = null, r = Fn, i, a, o = 0, s = this._parts.length; o < s; o++) for (var c = this._parts[o], l = 1, u = c.length; l < u; l++) {
					i = c[l - 1], a = c[l];
					var d = r(e, i, a, !0);
					d < t && (t = d, n = r(e, i, a));
				}
				return n && (n.distance = Math.sqrt(t)), n;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return Rn(this._defaultShape(), this._map.options.crs);
			},
			getBounds: function() {
				return this._bounds;
			},
			addLatLng: function(e, t) {
				return t ||= this._defaultShape(), e = F(e), t.push(e), this._bounds.extend(e), this.redraw();
			},
			_setLatLngs: function(e) {
				this._bounds = new ie(), this._latlngs = this._convertLatLngs(e);
			},
			_defaultShape: function() {
				return In(this._latlngs) ? this._latlngs : this._latlngs[0];
			},
			_convertLatLngs: function(e) {
				for (var t = [], n = In(e), r = 0, i = e.length; r < i; r++) n ? (t[r] = F(e[r]), this._bounds.extend(t[r])) : t[r] = this._convertLatLngs(e[r]);
				return t;
			},
			_project: function() {
				var e = new M();
				this._rings = [], this._projectLatlngs(this._latlngs, this._rings, e), this._bounds.isValid() && e.isValid() && (this._rawPxBounds = e, this._updateBounds());
			},
			_updateBounds: function() {
				var e = this._clickTolerance(), t = new A(e, e);
				this._rawPxBounds && (this._pxBounds = new M([this._rawPxBounds.min.subtract(t), this._rawPxBounds.max.add(t)]));
			},
			_projectLatlngs: function(e, t, n) {
				var r = e[0] instanceof P, i = e.length, a, o;
				if (r) {
					for (o = [], a = 0; a < i; a++) o[a] = this._map.latLngToLayerPoint(e[a]), n.extend(o[a]);
					t.push(o);
				} else for (a = 0; a < i; a++) this._projectLatlngs(e[a], t, n);
			},
			_clipPoints: function() {
				var e = this._renderer._bounds;
				if (this._parts = [], this._pxBounds && this._pxBounds.intersects(e)) {
					if (this.options.noClip) this._parts = this._rings;
					else for (var t = this._parts, n = 0, r, i = 0, a = this._rings.length, o, s, c; n < a; n++) for (c = this._rings[n], r = 0, o = c.length; r < o - 1; r++) s = Mn(c[r], c[r + 1], e, r, !0), s && (t[i] = t[i] || [], t[i].push(s[0]), (s[1] !== c[r + 1] || r === o - 2) && (t[i].push(s[1]), i++));
				}
			},
			_simplifyPoints: function() {
				for (var e = this._parts, t = this.options.smoothFactor, n = 0, r = e.length; n < r; n++) e[n] = Tn(e[n], t);
			},
			_update: function() {
				this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
			},
			_updatePath: function() {
				this._renderer._updatePoly(this);
			},
			_containsPoint: function(e, t) {
				var n, r, i, a, o, s, c = this._clickTolerance();
				if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
				for (n = 0, a = this._parts.length; n < a; n++) for (s = this._parts[n], r = 0, o = s.length, i = o - 1; r < o; i = r++) if ((t || r !== 0) && En(e, s[i], s[r]) <= c) return !0;
				return !1;
			}
		});
		function lr(e, t) {
			return new cr(e, t);
		}
		cr._flat = Ln;
		var ur = cr.extend({
			options: { fill: !0 },
			isEmpty: function() {
				return !this._latlngs.length || !this._latlngs[0].length;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return Sn(this._defaultShape(), this._map.options.crs);
			},
			_convertLatLngs: function(e) {
				var t = cr.prototype._convertLatLngs.call(this, e), n = t.length;
				return n >= 2 && t[0] instanceof P && t[0].equals(t[n - 1]) && t.pop(), t;
			},
			_setLatLngs: function(e) {
				cr.prototype._setLatLngs.call(this, e), In(this._latlngs) && (this._latlngs = [this._latlngs]);
			},
			_defaultShape: function() {
				return In(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
			},
			_clipPoints: function() {
				var e = this._renderer._bounds, t = this.options.weight, n = new A(t, t);
				if (e = new M(e.min.subtract(n), e.max.add(n)), this._parts = [], this._pxBounds && this._pxBounds.intersects(e)) {
					if (this.options.noClip) this._parts = this._rings;
					else for (var r = 0, i = this._rings.length, a; r < i; r++) a = xn(this._rings[r], e, !0), a.length && this._parts.push(a);
				}
			},
			_updatePath: function() {
				this._renderer._updatePoly(this, !0);
			},
			_containsPoint: function(e) {
				var t = !1, n, r, i, a, o, s, c, l;
				if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
				for (a = 0, c = this._parts.length; a < c; a++) for (n = this._parts[a], o = 0, l = n.length, s = l - 1; o < l; s = o++) r = n[o], i = n[s], r.y > e.y != i.y > e.y && e.x < (i.x - r.x) * (e.y - r.y) / (i.y - r.y) + r.x && (t = !t);
				return t || cr.prototype._containsPoint.call(this, e, !0);
			}
		});
		function dr(e, t) {
			return new ur(e, t);
		}
		var fr = Yn.extend({
			initialize: function(e, t) {
				p(this, t), this._layers = {}, e && this.addData(e);
			},
			addData: function(e) {
				var t = _(e) ? e : e.features, n, r, i;
				if (t) {
					for (n = 0, r = t.length; n < r; n++) i = t[n], (i.geometries || i.geometry || i.features || i.coordinates) && this.addData(i);
					return this;
				}
				var a = this.options;
				if (a.filter && !a.filter(e)) return this;
				var o = pr(e, a);
				return o ? (o.feature = br(e), o.defaultOptions = o.options, this.resetStyle(o), a.onEachFeature && a.onEachFeature(e, o), this.addLayer(o)) : this;
			},
			resetStyle: function(e) {
				return e === void 0 ? this.eachLayer(this.resetStyle, this) : (e.options = n({}, e.defaultOptions), this._setLayerStyle(e, this.options.style), this);
			},
			setStyle: function(e) {
				return this.eachLayer(function(t) {
					this._setLayerStyle(t, e);
				}, this);
			},
			_setLayerStyle: function(e, t) {
				e.setStyle && (typeof t == "function" && (t = t(e.feature)), e.setStyle(t));
			}
		});
		function pr(e, t) {
			var n = e.type === "Feature" ? e.geometry : e, r = n ? n.coordinates : null, i = [], a = t && t.pointToLayer, o = t && t.coordsToLatLng || hr, s, c, l, u;
			if (!r && !n) return null;
			switch (n.type) {
				case "Point": return s = o(r), mr(a, e, s, t);
				case "MultiPoint":
					for (l = 0, u = r.length; l < u; l++) s = o(r[l]), i.push(mr(a, e, s, t));
					return new Yn(i);
				case "LineString":
				case "MultiLineString": return c = gr(r, n.type === "LineString" ? 0 : 1, o), new cr(c, t);
				case "Polygon":
				case "MultiPolygon": return c = gr(r, n.type === "Polygon" ? 1 : 2, o), new ur(c, t);
				case "GeometryCollection":
					for (l = 0, u = n.geometries.length; l < u; l++) {
						var d = pr({
							geometry: n.geometries[l],
							type: "Feature",
							properties: e.properties
						}, t);
						d && i.push(d);
					}
					return new Yn(i);
				case "FeatureCollection":
					for (l = 0, u = n.features.length; l < u; l++) {
						var f = pr(n.features[l], t);
						f && i.push(f);
					}
					return new Yn(i);
				default: throw Error("Invalid GeoJSON object.");
			}
		}
		function mr(e, t, n, r) {
			return e ? e(t, n) : new tr(n, r && r.markersInheritOptions && r);
		}
		function hr(e) {
			return new P(e[1], e[0], e[2]);
		}
		function gr(e, t, n) {
			for (var r = [], i = 0, a = e.length, o; i < a; i++) o = t ? gr(e[i], t - 1, n) : (n || hr)(e[i]), r.push(o);
			return r;
		}
		function _r(e, t) {
			return e = F(e), e.alt === void 0 ? [u(e.lng, t), u(e.lat, t)] : [
				u(e.lng, t),
				u(e.lat, t),
				u(e.alt, t)
			];
		}
		function vr(e, t, n, r) {
			for (var i = [], a = 0, o = e.length; a < o; a++) i.push(t ? vr(e[a], In(e[a]) ? 0 : t - 1, n, r) : _r(e[a], r));
			return !t && n && i.length > 0 && i.push(i[0].slice()), i;
		}
		function yr(e, t) {
			return e.feature ? n({}, e.feature, { geometry: t }) : br(t);
		}
		function br(e) {
			return e.type === "Feature" || e.type === "FeatureCollection" ? e : {
				type: "Feature",
				properties: {},
				geometry: e
			};
		}
		var xr = { toGeoJSON: function(e) {
			return yr(this, {
				type: "Point",
				coordinates: _r(this.getLatLng(), e)
			});
		} };
		tr.include(xr), or.include(xr), ir.include(xr), cr.include({ toGeoJSON: function(e) {
			var t = !In(this._latlngs), n = vr(this._latlngs, +!!t, !1, e);
			return yr(this, {
				type: (t ? "Multi" : "") + "LineString",
				coordinates: n
			});
		} }), ur.include({ toGeoJSON: function(e) {
			var t = !In(this._latlngs), n = t && !In(this._latlngs[0]), r = vr(this._latlngs, n ? 2 : +!!t, !0, e);
			return t || (r = [r]), yr(this, {
				type: (n ? "Multi" : "") + "Polygon",
				coordinates: r
			});
		} }), qn.include({
			toMultiPoint: function(e) {
				var t = [];
				return this.eachLayer(function(n) {
					t.push(n.toGeoJSON(e).geometry.coordinates);
				}), yr(this, {
					type: "MultiPoint",
					coordinates: t
				});
			},
			toGeoJSON: function(e) {
				var t = this.feature && this.feature.geometry && this.feature.geometry.type;
				if (t === "MultiPoint") return this.toMultiPoint(e);
				var n = t === "GeometryCollection", r = [];
				return this.eachLayer(function(t) {
					if (t.toGeoJSON) {
						var i = t.toGeoJSON(e);
						if (n) r.push(i.geometry);
						else {
							var a = br(i);
							a.type === "FeatureCollection" ? r.push.apply(r, a.features) : r.push(a);
						}
					}
				}), n ? yr(this, {
					geometries: r,
					type: "GeometryCollection"
				}) : {
					type: "FeatureCollection",
					features: r
				};
			}
		});
		function Sr(e, t) {
			return new fr(e, t);
		}
		var Cr = Sr, wr = Kn.extend({
			options: {
				opacity: 1,
				alt: "",
				interactive: !1,
				crossOrigin: !1,
				errorOverlayUrl: "",
				zIndex: 1,
				className: ""
			},
			initialize: function(e, t, n) {
				this._url = e, this._bounds = N(t), p(this, n);
			},
			onAdd: function() {
				this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (K(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
			},
			onRemove: function() {
				_t(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._image && this._updateOpacity(), this;
			},
			setStyle: function(e) {
				return e.opacity && this.setOpacity(e.opacity), this;
			},
			bringToFront: function() {
				return this._map && yt(this._image), this;
			},
			bringToBack: function() {
				return this._map && bt(this._image), this;
			},
			setUrl: function(e) {
				return this._url = e, this._image && (this._image.src = e), this;
			},
			setBounds: function(e) {
				return this._bounds = N(e), this._map && this._reset(), this;
			},
			getEvents: function() {
				var e = {
					zoom: this._reset,
					viewreset: this._reset
				};
				return this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			setZIndex: function(e) {
				return this.options.zIndex = e, this._updateZIndex(), this;
			},
			getBounds: function() {
				return this._bounds;
			},
			getElement: function() {
				return this._image;
			},
			_initImage: function() {
				var e = this._url.tagName === "IMG", t = this._image = e ? this._url : G("img");
				K(t, "leaflet-image-layer"), this._zoomAnimated && K(t, "leaflet-zoom-animated"), this.options.className && K(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onload = i(this.fire, this, "load"), t.onerror = i(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (t.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), e ? this._url = t.src : (t.src = this._url, t.alt = this.options.alt);
			},
			_animateZoom: function(e) {
				var t = this._map.getZoomScale(e.zoom), n = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
				Ot(this._image, n, t);
			},
			_reset: function() {
				var e = this._image, t = new M(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())), n = t.getSize();
				kt(e, t.min), e.style.width = n.x + "px", e.style.height = n.y + "px";
			},
			_updateOpacity: function() {
				Tt(this._image, this.options.opacity);
			},
			_updateZIndex: function() {
				this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
			},
			_overlayOnError: function() {
				this.fire("error");
				var e = this.options.errorOverlayUrl;
				e && this._url !== e && (this._url = e, this._image.src = e);
			},
			getCenter: function() {
				return this._bounds.getCenter();
			}
		}), Tr = function(e, t, n) {
			return new wr(e, t, n);
		}, Er = wr.extend({
			options: {
				autoplay: !0,
				loop: !0,
				keepAspectRatio: !0,
				muted: !1,
				playsInline: !0
			},
			_initImage: function() {
				var e = this._url.tagName === "VIDEO", t = this._image = e ? this._url : G("video");
				if (K(t, "leaflet-image-layer"), this._zoomAnimated && K(t, "leaflet-zoom-animated"), this.options.className && K(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onloadeddata = i(this.fire, this, "load"), e) {
					for (var n = t.getElementsByTagName("source"), r = [], a = 0; a < n.length; a++) r.push(n[a].src);
					this._url = n.length > 0 ? r : [t.src];
				} else {
					_(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(t.style, "objectFit") && (t.style.objectFit = "fill"), t.autoplay = !!this.options.autoplay, t.loop = !!this.options.loop, t.muted = !!this.options.muted, t.playsInline = !!this.options.playsInline;
					for (var o = 0; o < this._url.length; o++) {
						var s = G("source");
						s.src = this._url[o], t.appendChild(s);
					}
				}
			}
		});
		function Dr(e, t, n) {
			return new Er(e, t, n);
		}
		var Or = wr.extend({ _initImage: function() {
			var e = this._image = this._url;
			K(e, "leaflet-image-layer"), this._zoomAnimated && K(e, "leaflet-zoom-animated"), this.options.className && K(e, this.options.className), e.onselectstart = l, e.onmousemove = l;
		} });
		function kr(e, t, n) {
			return new Or(e, t, n);
		}
		var Ar = Kn.extend({
			options: {
				interactive: !1,
				offset: [0, 0],
				className: "",
				pane: void 0,
				content: ""
			},
			initialize: function(e, t) {
				e && (e instanceof P || _(e)) ? (this._latlng = F(e), p(this, t)) : (p(this, e), this._source = t), this.options.content && (this._content = this.options.content);
			},
			openOn: function(e) {
				return e = arguments.length ? e : this._source._map, e.hasLayer(this) || e.addLayer(this), this;
			},
			close: function() {
				return this._map && this._map.removeLayer(this), this;
			},
			toggle: function(e) {
				return this._map ? this.close() : (arguments.length ? this._source = e : e = this._source, this._prepareOpen(), this.openOn(e._map)), this;
			},
			onAdd: function(e) {
				this._zoomAnimated = e._zoomAnimated, this._container || this._initLayout(), e._fadeAnimated && Tt(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), e._fadeAnimated && Tt(this._container, 1), this.bringToFront(), this.options.interactive && (K(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
			},
			onRemove: function(e) {
				e._fadeAnimated ? (Tt(this._container, 0), this._removeTimeout = setTimeout(i(_t, void 0, this._container), 200)) : _t(this._container), this.options.interactive && (St(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
			},
			getLatLng: function() {
				return this._latlng;
			},
			setLatLng: function(e) {
				return this._latlng = F(e), this._map && (this._updatePosition(), this._adjustPan()), this;
			},
			getContent: function() {
				return this._content;
			},
			setContent: function(e) {
				return this._content = e, this.update(), this;
			},
			getElement: function() {
				return this._container;
			},
			update: function() {
				this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
			},
			getEvents: function() {
				var e = {
					zoom: this._updatePosition,
					viewreset: this._updatePosition
				};
				return this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			isOpen: function() {
				return !!this._map && this._map.hasLayer(this);
			},
			bringToFront: function() {
				return this._map && yt(this._container), this;
			},
			bringToBack: function() {
				return this._map && bt(this._container), this;
			},
			_prepareOpen: function(e) {
				var t = this._source;
				if (!t._map) return !1;
				if (t instanceof Yn) {
					t = null;
					var n = this._source._layers;
					for (var r in n) if (n[r]._map) {
						t = n[r];
						break;
					}
					if (!t) return !1;
					this._source = t;
				}
				if (!e) {
					if (t.getCenter) e = t.getCenter();
					else if (t.getLatLng) e = t.getLatLng();
					else if (t.getBounds) e = t.getBounds().getCenter();
					else throw Error("Unable to get source layer LatLng.");
				}
				return this.setLatLng(e), this._map && this.update(), !0;
			},
			_updateContent: function() {
				if (this._content) {
					var e = this._contentNode, t = typeof this._content == "function" ? this._content(this._source || this) : this._content;
					if (typeof t == "string") e.innerHTML = t;
					else {
						for (; e.hasChildNodes();) e.removeChild(e.firstChild);
						e.appendChild(t);
					}
					this.fire("contentupdate");
				}
			},
			_updatePosition: function() {
				if (this._map) {
					var e = this._map.latLngToLayerPoint(this._latlng), t = j(this.options.offset), n = this._getAnchor();
					this._zoomAnimated ? kt(this._container, e.add(n)) : t = t.add(e).add(n);
					var r = this._containerBottom = -t.y, i = this._containerLeft = -Math.round(this._containerWidth / 2) + t.x;
					this._container.style.bottom = r + "px", this._container.style.left = i + "px";
				}
			},
			_getAnchor: function() {
				return [0, 0];
			}
		});
		Y.include({ _initOverlay: function(e, t, n, r) {
			var i = t;
			return i instanceof e || (i = new e(r).setContent(t)), n && i.setLatLng(n), i;
		} }), Kn.include({ _initOverlay: function(e, t, n, r) {
			var i = n;
			return i instanceof e ? (p(i, r), i._source = this) : (i = t && !r ? t : new e(r, this), i.setContent(n)), i;
		} });
		var jr = Ar.extend({
			options: {
				pane: "popupPane",
				offset: [0, 7],
				maxWidth: 300,
				minWidth: 50,
				maxHeight: null,
				autoPan: !0,
				autoPanPaddingTopLeft: null,
				autoPanPaddingBottomRight: null,
				autoPanPadding: [5, 5],
				keepInView: !1,
				closeButton: !0,
				autoClose: !0,
				closeOnEscapeKey: !0,
				className: ""
			},
			openOn: function(e) {
				return e = arguments.length ? e : this._source._map, !e.hasLayer(this) && e._popup && e._popup.options.autoClose && e.removeLayer(e._popup), e._popup = this, Ar.prototype.openOn.call(this, e);
			},
			onAdd: function(e) {
				Ar.prototype.onAdd.call(this, e), e.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof rr || this._source.on("preclick", Yt));
			},
			onRemove: function(e) {
				Ar.prototype.onRemove.call(this, e), e.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof rr || this._source.off("preclick", Yt));
			},
			getEvents: function() {
				var e = Ar.prototype.getEvents.call(this);
				return (this.options.closeOnClick === void 0 ? this._map.options.closePopupOnClick : this.options.closeOnClick) && (e.preclick = this.close), this.options.keepInView && (e.moveend = this._adjustPan), e;
			},
			_initLayout: function() {
				var e = "leaflet-popup", t = this._container = G("div", e + " " + (this.options.className || "") + " leaflet-zoom-animated"), n = this._wrapper = G("div", e + "-content-wrapper", t);
				if (this._contentNode = G("div", e + "-content", n), Zt(t), Xt(this._contentNode), J(t, "contextmenu", Yt), this._tipContainer = G("div", e + "-tip-container", t), this._tip = G("div", e + "-tip", this._tipContainer), this.options.closeButton) {
					var r = this._closeButton = G("a", e + "-close-button", t);
					r.setAttribute("role", "button"), r.setAttribute("aria-label", "Close popup"), r.href = "#close", r.innerHTML = "<span aria-hidden=\"true\">&#215;</span>", J(r, "click", function(e) {
						Qt(e), this.close();
					}, this);
				}
			},
			_updateLayout: function() {
				var e = this._contentNode, t = e.style;
				t.width = "", t.whiteSpace = "nowrap";
				var n = e.offsetWidth;
				n = Math.min(n, this.options.maxWidth), n = Math.max(n, this.options.minWidth), t.width = n + 1 + "px", t.whiteSpace = "", t.height = "";
				var r = e.offsetHeight, i = this.options.maxHeight, a = "leaflet-popup-scrolled";
				i && r > i ? (t.height = i + "px", K(e, a)) : St(e, a), this._containerWidth = this._container.offsetWidth;
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), n = this._getAnchor();
				kt(this._container, t.add(n));
			},
			_adjustPan: function() {
				if (this.options.autoPan) {
					if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) this._autopanning = !1;
					else {
						var e = this._map, t = parseInt(gt(this._container, "marginBottom"), 10) || 0, n = this._container.offsetHeight + t, r = this._containerWidth, i = new A(this._containerLeft, -n - this._containerBottom);
						i._add(At(this._container));
						var a = e.layerPointToContainerPoint(i), o = j(this.options.autoPanPadding), s = j(this.options.autoPanPaddingTopLeft || o), c = j(this.options.autoPanPaddingBottomRight || o), l = e.getSize(), u = 0, d = 0;
						a.x + r + c.x > l.x && (u = a.x + r - l.x + c.x), a.x - u - s.x < 0 && (u = a.x - s.x), a.y + n + c.y > l.y && (d = a.y + n - l.y + c.y), a.y - d - s.y < 0 && (d = a.y - s.y), (u || d) && (this.options.keepInView && (this._autopanning = !0), e.fire("autopanstart").panBy([u, d]));
					}
				}
			},
			_getAnchor: function() {
				return j(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
			}
		}), Mr = function(e, t) {
			return new jr(e, t);
		};
		Y.mergeOptions({ closePopupOnClick: !0 }), Y.include({
			openPopup: function(e, t, n) {
				return this._initOverlay(jr, e, t, n).openOn(this), this;
			},
			closePopup: function(e) {
				return e = arguments.length ? e : this._popup, e && e.close(), this;
			}
		}), Kn.include({
			bindPopup: function(e, t) {
				return this._popup = this._initOverlay(jr, this._popup, e, t), this._popupHandlersAdded ||= (this.on({
					click: this._openPopup,
					keypress: this._onKeyPress,
					remove: this.closePopup,
					move: this._movePopup
				}), !0), this;
			},
			unbindPopup: function() {
				return this._popup &&= (this.off({
					click: this._openPopup,
					keypress: this._onKeyPress,
					remove: this.closePopup,
					move: this._movePopup
				}), this._popupHandlersAdded = !1, null), this;
			},
			openPopup: function(e) {
				return this._popup && (this instanceof Yn || (this._popup._source = this), this._popup._prepareOpen(e || this._latlng) && this._popup.openOn(this._map)), this;
			},
			closePopup: function() {
				return this._popup && this._popup.close(), this;
			},
			togglePopup: function() {
				return this._popup && this._popup.toggle(this), this;
			},
			isPopupOpen: function() {
				return this._popup ? this._popup.isOpen() : !1;
			},
			setPopupContent: function(e) {
				return this._popup && this._popup.setContent(e), this;
			},
			getPopup: function() {
				return this._popup;
			},
			_openPopup: function(e) {
				if (this._popup && this._map) {
					$t(e);
					var t = e.layer || e.target;
					this._popup._source === t && !(t instanceof rr) ? this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(e.latlng) : (this._popup._source = t, this.openPopup(e.latlng));
				}
			},
			_movePopup: function(e) {
				this._popup.setLatLng(e.latlng);
			},
			_onKeyPress: function(e) {
				e.originalEvent.keyCode === 13 && this._openPopup(e);
			}
		});
		var Nr = Ar.extend({
			options: {
				pane: "tooltipPane",
				offset: [0, 0],
				direction: "auto",
				permanent: !1,
				sticky: !1,
				opacity: .9
			},
			onAdd: function(e) {
				Ar.prototype.onAdd.call(this, e), this.setOpacity(this.options.opacity), e.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
			},
			onRemove: function(e) {
				Ar.prototype.onRemove.call(this, e), e.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
			},
			getEvents: function() {
				var e = Ar.prototype.getEvents.call(this);
				return this.options.permanent || (e.preclick = this.close), e;
			},
			_initLayout: function() {
				var e = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
				this._contentNode = this._container = G("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + o(this));
			},
			_updateLayout: function() {},
			_adjustPan: function() {},
			_setPosition: function(e) {
				var t, n, r = this._map, i = this._container, a = r.latLngToContainerPoint(r.getCenter()), o = r.layerPointToContainerPoint(e), s = this.options.direction, c = i.offsetWidth, l = i.offsetHeight, u = j(this.options.offset), d = this._getAnchor();
				s === "top" ? (t = c / 2, n = l) : s === "bottom" ? (t = c / 2, n = 0) : s === "center" ? (t = c / 2, n = l / 2) : s === "right" ? (t = 0, n = l / 2) : s === "left" ? (t = c, n = l / 2) : o.x < a.x ? (s = "right", t = 0, n = l / 2) : (s = "left", t = c + (u.x + d.x) * 2, n = l / 2), e = e.subtract(j(t, n, !0)).add(u).add(d), St(i, "leaflet-tooltip-right"), St(i, "leaflet-tooltip-left"), St(i, "leaflet-tooltip-top"), St(i, "leaflet-tooltip-bottom"), K(i, "leaflet-tooltip-" + s), kt(i, e);
			},
			_updatePosition: function() {
				var e = this._map.latLngToLayerPoint(this._latlng);
				this._setPosition(e);
			},
			setOpacity: function(e) {
				this.options.opacity = e, this._container && Tt(this._container, e);
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
				this._setPosition(t);
			},
			_getAnchor: function() {
				return j(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
			}
		}), Pr = function(e, t) {
			return new Nr(e, t);
		};
		Y.include({
			openTooltip: function(e, t, n) {
				return this._initOverlay(Nr, e, t, n).openOn(this), this;
			},
			closeTooltip: function(e) {
				return e.close(), this;
			}
		}), Kn.include({
			bindTooltip: function(e, t) {
				return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Nr, this._tooltip, e, t), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
			},
			unbindTooltip: function() {
				return this._tooltip &&= (this._initTooltipInteractions(!0), this.closeTooltip(), null), this;
			},
			_initTooltipInteractions: function(e) {
				if (e || !this._tooltipHandlersAdded) {
					var t = e ? "off" : "on", n = {
						remove: this.closeTooltip,
						move: this._moveTooltip
					};
					this._tooltip.options.permanent ? n.add = this._openTooltip : (n.mouseover = this._openTooltip, n.mouseout = this.closeTooltip, n.click = this._openTooltip, this._map ? this._addFocusListeners() : n.add = this._addFocusListeners), this._tooltip.options.sticky && (n.mousemove = this._moveTooltip), this[t](n), this._tooltipHandlersAdded = !e;
				}
			},
			openTooltip: function(e) {
				return this._tooltip && (this instanceof Yn || (this._tooltip._source = this), this._tooltip._prepareOpen(e) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
			},
			closeTooltip: function() {
				if (this._tooltip) return this._tooltip.close();
			},
			toggleTooltip: function() {
				return this._tooltip && this._tooltip.toggle(this), this;
			},
			isTooltipOpen: function() {
				return this._tooltip.isOpen();
			},
			setTooltipContent: function(e) {
				return this._tooltip && this._tooltip.setContent(e), this;
			},
			getTooltip: function() {
				return this._tooltip;
			},
			_addFocusListeners: function() {
				this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
			},
			_addFocusListenersOnLayer: function(e) {
				var t = typeof e.getElement == "function" && e.getElement();
				t && (J(t, "focus", function() {
					this._tooltip._source = e, this.openTooltip();
				}, this), J(t, "blur", this.closeTooltip, this));
			},
			_setAriaDescribedByOnLayer: function(e) {
				var t = typeof e.getElement == "function" && e.getElement();
				t && t.setAttribute("aria-describedby", this._tooltip._container.id);
			},
			_openTooltip: function(e) {
				if (this._tooltip && this._map) {
					if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
						this._openOnceFlag = !0;
						var t = this;
						this._map.once("moveend", function() {
							t._openOnceFlag = !1, t._openTooltip(e);
						});
					} else this._tooltip._source = e.layer || e.target, this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0);
				}
			},
			_moveTooltip: function(e) {
				var t = e.latlng, n, r;
				this._tooltip.options.sticky && e.originalEvent && (n = this._map.mouseEventToContainerPoint(e.originalEvent), r = this._map.containerPointToLayerPoint(n), t = this._map.layerPointToLatLng(r)), this._tooltip.setLatLng(t);
			}
		});
		var Fr = Zn.extend({
			options: {
				iconSize: [12, 12],
				html: !1,
				bgPos: null,
				className: "leaflet-div-icon"
			},
			createIcon: function(e) {
				var t = e && e.tagName === "DIV" ? e : document.createElement("div"), n = this.options;
				if (n.html instanceof Element ? (vt(t), t.appendChild(n.html)) : t.innerHTML = n.html === !1 ? "" : n.html, n.bgPos) {
					var r = j(n.bgPos);
					t.style.backgroundPosition = -r.x + "px " + -r.y + "px";
				}
				return this._setIconStyles(t, "icon"), t;
			},
			createShadow: function() {
				return null;
			}
		});
		function Ir(e) {
			return new Fr(e);
		}
		Zn.Default = $n;
		var Q = Kn.extend({
			options: {
				tileSize: 256,
				opacity: 1,
				updateWhenIdle: U.mobile,
				updateWhenZooming: !0,
				updateInterval: 200,
				zIndex: 1,
				bounds: null,
				minZoom: 0,
				maxZoom: void 0,
				maxNativeZoom: void 0,
				minNativeZoom: void 0,
				noWrap: !1,
				pane: "tilePane",
				className: "",
				keepBuffer: 2
			},
			initialize: function(e) {
				p(this, e);
			},
			onAdd: function() {
				this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
			},
			beforeAdd: function(e) {
				e._addZoomLimit(this);
			},
			onRemove: function(e) {
				this._removeAllTiles(), _t(this._container), e._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
			},
			bringToFront: function() {
				return this._map && (yt(this._container), this._setAutoZIndex(Math.max)), this;
			},
			bringToBack: function() {
				return this._map && (bt(this._container), this._setAutoZIndex(Math.min)), this;
			},
			getContainer: function() {
				return this._container;
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._updateOpacity(), this;
			},
			setZIndex: function(e) {
				return this.options.zIndex = e, this._updateZIndex(), this;
			},
			isLoading: function() {
				return this._loading;
			},
			redraw: function() {
				if (this._map) {
					this._removeAllTiles();
					var e = this._clampZoom(this._map.getZoom());
					e !== this._tileZoom && (this._tileZoom = e, this._updateLevels()), this._update();
				}
				return this;
			},
			getEvents: function() {
				var e = {
					viewprereset: this._invalidateAll,
					viewreset: this._resetView,
					zoom: this._resetView,
					moveend: this._onMoveEnd
				};
				return this.options.updateWhenIdle || (this._onMove ||= s(this._onMoveEnd, this.options.updateInterval, this), e.move = this._onMove), this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			createTile: function() {
				return document.createElement("div");
			},
			getTileSize: function() {
				var e = this.options.tileSize;
				return e instanceof A ? e : new A(e, e);
			},
			_updateZIndex: function() {
				this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
			},
			_setAutoZIndex: function(e) {
				for (var t = this.getPane().children, n = -e(-Infinity, Infinity), r = 0, i = t.length, a; r < i; r++) a = t[r].style.zIndex, t[r] !== this._container && a && (n = e(n, +a));
				isFinite(n) && (this.options.zIndex = n + e(-1, 1), this._updateZIndex());
			},
			_updateOpacity: function() {
				if (this._map && !U.ielt9) {
					Tt(this._container, this.options.opacity);
					var e = +/* @__PURE__ */ new Date(), t = !1, n = !1;
					for (var r in this._tiles) {
						var i = this._tiles[r];
						if (i.current && i.loaded) {
							var a = Math.min(1, (e - i.loaded) / 200);
							Tt(i.el, a), a < 1 ? t = !0 : (i.active ? n = !0 : this._onOpaqueTile(i), i.active = !0);
						}
					}
					n && !this._noPrune && this._pruneTiles(), t && (E(this._fadeFrame), this._fadeFrame = T(this._updateOpacity, this));
				}
			},
			_onOpaqueTile: l,
			_initContainer: function() {
				this._container || (this._container = G("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
			},
			_updateLevels: function() {
				var e = this._tileZoom, t = this.options.maxZoom;
				if (e !== void 0) {
					for (var n in this._levels) n = Number(n), this._levels[n].el.children.length || n === e ? (this._levels[n].el.style.zIndex = t - Math.abs(e - n), this._onUpdateLevel(n)) : (_t(this._levels[n].el), this._removeTilesAtZoom(n), this._onRemoveLevel(n), delete this._levels[n]);
					var r = this._levels[e], i = this._map;
					return r || (r = this._levels[e] = {}, r.el = G("div", "leaflet-tile-container leaflet-zoom-animated", this._container), r.el.style.zIndex = t, r.origin = i.project(i.unproject(i.getPixelOrigin()), e).round(), r.zoom = e, this._setZoomTransform(r, i.getCenter(), i.getZoom()), r.el.offsetWidth, this._onCreateLevel(r)), this._level = r, r;
				}
			},
			_onUpdateLevel: l,
			_onRemoveLevel: l,
			_onCreateLevel: l,
			_pruneTiles: function() {
				if (this._map) {
					var e, t, n = this._map.getZoom();
					if (n > this.options.maxZoom || n < this.options.minZoom) this._removeAllTiles();
					else {
						for (e in this._tiles) t = this._tiles[e], t.retain = t.current;
						for (e in this._tiles) if (t = this._tiles[e], t.current && !t.active) {
							var r = t.coords;
							this._retainParent(r.x, r.y, r.z, r.z - 5) || this._retainChildren(r.x, r.y, r.z, r.z + 2);
						}
						for (e in this._tiles) this._tiles[e].retain || this._removeTile(e);
					}
				}
			},
			_removeTilesAtZoom: function(e) {
				for (var t in this._tiles) this._tiles[t].coords.z === e && this._removeTile(t);
			},
			_removeAllTiles: function() {
				for (var e in this._tiles) this._removeTile(e);
			},
			_invalidateAll: function() {
				for (var e in this._levels) _t(this._levels[e].el), this._onRemoveLevel(Number(e)), delete this._levels[e];
				this._removeAllTiles(), this._tileZoom = void 0;
			},
			_retainParent: function(e, t, n, r) {
				var i = Math.floor(e / 2), a = Math.floor(t / 2), o = n - 1, s = new A(+i, +a);
				s.z = +o;
				var c = this._tileCoordsToKey(s), l = this._tiles[c];
				return l && l.active ? (l.retain = !0, !0) : (l && l.loaded && (l.retain = !0), o > r && this._retainParent(i, a, o, r));
			},
			_retainChildren: function(e, t, n, r) {
				for (var i = 2 * e; i < 2 * e + 2; i++) for (var a = 2 * t; a < 2 * t + 2; a++) {
					var o = new A(i, a);
					o.z = n + 1;
					var s = this._tileCoordsToKey(o), c = this._tiles[s];
					c && c.active ? c.retain = !0 : (c && c.loaded && (c.retain = !0), n + 1 < r && this._retainChildren(i, a, n + 1, r));
				}
			},
			_resetView: function(e) {
				var t = e && (e.pinch || e.flyTo);
				this._setView(this._map.getCenter(), this._map.getZoom(), t, t);
			},
			_animateZoom: function(e) {
				this._setView(e.center, e.zoom, !0, e.noUpdate);
			},
			_clampZoom: function(e) {
				var t = this.options;
				return t.minNativeZoom !== void 0 && e < t.minNativeZoom ? t.minNativeZoom : t.maxNativeZoom !== void 0 && t.maxNativeZoom < e ? t.maxNativeZoom : e;
			},
			_setView: function(e, t, n, r) {
				var i = Math.round(t);
				i = this.options.maxZoom !== void 0 && i > this.options.maxZoom || this.options.minZoom !== void 0 && i < this.options.minZoom ? void 0 : this._clampZoom(i);
				var a = this.options.updateWhenZooming && i !== this._tileZoom;
				(!r || a) && (this._tileZoom = i, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), i !== void 0 && this._update(e), n || this._pruneTiles(), this._noPrune = !!n), this._setZoomTransforms(e, t);
			},
			_setZoomTransforms: function(e, t) {
				for (var n in this._levels) this._setZoomTransform(this._levels[n], e, t);
			},
			_setZoomTransform: function(e, t, n) {
				var r = this._map.getZoomScale(n, e.zoom), i = e.origin.multiplyBy(r).subtract(this._map._getNewPixelOrigin(t, n)).round();
				U.any3d ? Ot(e.el, i, r) : kt(e.el, i);
			},
			_resetGrid: function() {
				var e = this._map, t = e.options.crs, n = this._tileSize = this.getTileSize(), r = this._tileZoom, i = this._map.getPixelWorldBounds(this._tileZoom);
				i && (this._globalTileRange = this._pxBoundsToTileRange(i)), this._wrapX = t.wrapLng && !this.options.noWrap && [Math.floor(e.project([0, t.wrapLng[0]], r).x / n.x), Math.ceil(e.project([0, t.wrapLng[1]], r).x / n.y)], this._wrapY = t.wrapLat && !this.options.noWrap && [Math.floor(e.project([t.wrapLat[0], 0], r).y / n.x), Math.ceil(e.project([t.wrapLat[1], 0], r).y / n.y)];
			},
			_onMoveEnd: function() {
				this._map && !this._map._animatingZoom && this._update();
			},
			_getTiledPixelBounds: function(e) {
				var t = this._map, n = t._animatingZoom ? Math.max(t._animateToZoom, t.getZoom()) : t.getZoom(), r = t.getZoomScale(n, this._tileZoom), i = t.project(e, this._tileZoom).floor(), a = t.getSize().divideBy(r * 2);
				return new M(i.subtract(a), i.add(a));
			},
			_update: function(e) {
				var t = this._map;
				if (t) {
					var n = this._clampZoom(t.getZoom());
					if (e === void 0 && (e = t.getCenter()), this._tileZoom !== void 0) {
						var r = this._getTiledPixelBounds(e), i = this._pxBoundsToTileRange(r), a = i.getCenter(), o = [], s = this.options.keepBuffer, c = new M(i.getBottomLeft().subtract([s, -s]), i.getTopRight().add([s, -s]));
						if (!(isFinite(i.min.x) && isFinite(i.min.y) && isFinite(i.max.x) && isFinite(i.max.y))) throw Error("Attempted to load an infinite number of tiles");
						for (var l in this._tiles) {
							var u = this._tiles[l].coords;
							u.z === this._tileZoom && c.contains(new A(u.x, u.y)) || (this._tiles[l].current = !1);
						}
						if (Math.abs(n - this._tileZoom) > 1) this._setView(e, n);
						else {
							for (var d = i.min.y; d <= i.max.y; d++) for (var f = i.min.x; f <= i.max.x; f++) {
								var p = new A(f, d);
								if (p.z = this._tileZoom, this._isValidTile(p)) {
									var m = this._tiles[this._tileCoordsToKey(p)];
									m ? m.current = !0 : o.push(p);
								}
							}
							if (o.sort(function(e, t) {
								return e.distanceTo(a) - t.distanceTo(a);
							}), o.length !== 0) {
								this._loading || (this._loading = !0, this.fire("loading"));
								var h = document.createDocumentFragment();
								for (f = 0; f < o.length; f++) this._addTile(o[f], h);
								this._level.el.appendChild(h);
							}
						}
					}
				}
			},
			_isValidTile: function(e) {
				var t = this._map.options.crs;
				if (!t.infinite) {
					var n = this._globalTileRange;
					if (!t.wrapLng && (e.x < n.min.x || e.x > n.max.x) || !t.wrapLat && (e.y < n.min.y || e.y > n.max.y)) return !1;
				}
				if (!this.options.bounds) return !0;
				var r = this._tileCoordsToBounds(e);
				return N(this.options.bounds).overlaps(r);
			},
			_keyToBounds: function(e) {
				return this._tileCoordsToBounds(this._keyToTileCoords(e));
			},
			_tileCoordsToNwSe: function(e) {
				var t = this._map, n = this.getTileSize(), r = e.scaleBy(n), i = r.add(n);
				return [t.unproject(r, e.z), t.unproject(i, e.z)];
			},
			_tileCoordsToBounds: function(e) {
				var t = this._tileCoordsToNwSe(e), n = new ie(t[0], t[1]);
				return this.options.noWrap || (n = this._map.wrapLatLngBounds(n)), n;
			},
			_tileCoordsToKey: function(e) {
				return e.x + ":" + e.y + ":" + e.z;
			},
			_keyToTileCoords: function(e) {
				var t = e.split(":"), n = new A(+t[0], +t[1]);
				return n.z = +t[2], n;
			},
			_removeTile: function(e) {
				var t = this._tiles[e];
				t && (_t(t.el), delete this._tiles[e], this.fire("tileunload", {
					tile: t.el,
					coords: this._keyToTileCoords(e)
				}));
			},
			_initTile: function(e) {
				K(e, "leaflet-tile");
				var t = this.getTileSize();
				e.style.width = t.x + "px", e.style.height = t.y + "px", e.onselectstart = l, e.onmousemove = l, U.ielt9 && this.options.opacity < 1 && Tt(e, this.options.opacity);
			},
			_addTile: function(e, t) {
				var n = this._getTilePos(e), r = this._tileCoordsToKey(e), a = this.createTile(this._wrapCoords(e), i(this._tileReady, this, e));
				this._initTile(a), this.createTile.length < 2 && T(i(this._tileReady, this, e, null, a)), kt(a, n), this._tiles[r] = {
					el: a,
					coords: e,
					current: !0
				}, t.appendChild(a), this.fire("tileloadstart", {
					tile: a,
					coords: e
				});
			},
			_tileReady: function(e, t, n) {
				t && this.fire("tileerror", {
					error: t,
					tile: n,
					coords: e
				});
				var r = this._tileCoordsToKey(e);
				n = this._tiles[r], n && (n.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (Tt(n.el, 0), E(this._fadeFrame), this._fadeFrame = T(this._updateOpacity, this)) : (n.active = !0, this._pruneTiles()), t || (K(n.el, "leaflet-tile-loaded"), this.fire("tileload", {
					tile: n.el,
					coords: e
				})), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), U.ielt9 || !this._map._fadeAnimated ? T(this._pruneTiles, this) : setTimeout(i(this._pruneTiles, this), 250)));
			},
			_getTilePos: function(e) {
				return e.scaleBy(this.getTileSize()).subtract(this._level.origin);
			},
			_wrapCoords: function(e) {
				var t = new A(this._wrapX ? c(e.x, this._wrapX) : e.x, this._wrapY ? c(e.y, this._wrapY) : e.y);
				return t.z = e.z, t;
			},
			_pxBoundsToTileRange: function(e) {
				var t = this.getTileSize();
				return new M(e.min.unscaleBy(t).floor(), e.max.unscaleBy(t).ceil().subtract([1, 1]));
			},
			_noTilesToLoad: function() {
				for (var e in this._tiles) if (!this._tiles[e].loaded) return !1;
				return !0;
			}
		});
		function Lr(e) {
			return new Q(e);
		}
		var Rr = Q.extend({
			options: {
				minZoom: 0,
				maxZoom: 18,
				subdomains: "abc",
				errorTileUrl: "",
				zoomOffset: 0,
				tms: !1,
				zoomReverse: !1,
				detectRetina: !1,
				crossOrigin: !1,
				referrerPolicy: !1
			},
			initialize: function(e, t) {
				this._url = e, t = p(this, t), t.detectRetina && U.retina && t.maxZoom > 0 ? (t.tileSize = Math.floor(t.tileSize / 2), t.zoomReverse ? (t.zoomOffset--, t.minZoom = Math.min(t.maxZoom, t.minZoom + 1)) : (t.zoomOffset++, t.maxZoom = Math.max(t.minZoom, t.maxZoom - 1)), t.minZoom = Math.max(0, t.minZoom)) : t.zoomReverse ? t.minZoom = Math.min(t.maxZoom, t.minZoom) : t.maxZoom = Math.max(t.minZoom, t.maxZoom), typeof t.subdomains == "string" && (t.subdomains = t.subdomains.split("")), this.on("tileunload", this._onTileRemove);
			},
			setUrl: function(e, t) {
				return this._url === e && t === void 0 && (t = !0), this._url = e, t || this.redraw(), this;
			},
			createTile: function(e, t) {
				var n = document.createElement("img");
				return J(n, "load", i(this._tileOnLoad, this, t, n)), J(n, "error", i(this._tileOnError, this, t, n)), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (n.referrerPolicy = this.options.referrerPolicy), n.alt = "", n.src = this.getTileUrl(e), n;
			},
			getTileUrl: function(e) {
				var t = {
					r: U.retina ? "@2x" : "",
					s: this._getSubdomain(e),
					x: e.x,
					y: e.y,
					z: this._getZoomForUrl()
				};
				if (this._map && !this._map.options.crs.infinite) {
					var r = this._globalTileRange.max.y - e.y;
					this.options.tms && (t.y = r), t["-y"] = r;
				}
				return g(this._url, n(t, this.options));
			},
			_tileOnLoad: function(e, t) {
				U.ielt9 ? setTimeout(i(e, this, null, t), 0) : e(null, t);
			},
			_tileOnError: function(e, t, n) {
				var r = this.options.errorTileUrl;
				r && t.getAttribute("src") !== r && (t.src = r), e(n, t);
			},
			_onTileRemove: function(e) {
				e.tile.onload = null;
			},
			_getZoomForUrl: function() {
				var e = this._tileZoom, t = this.options.maxZoom, n = this.options.zoomReverse, r = this.options.zoomOffset;
				return n && (e = t - e), e + r;
			},
			_getSubdomain: function(e) {
				var t = Math.abs(e.x + e.y) % this.options.subdomains.length;
				return this.options.subdomains[t];
			},
			_abortLoading: function() {
				var e, t;
				for (e in this._tiles) if (this._tiles[e].coords.z !== this._tileZoom && (t = this._tiles[e].el, t.onload = l, t.onerror = l, !t.complete)) {
					t.src = y;
					var n = this._tiles[e].coords;
					_t(t), delete this._tiles[e], this.fire("tileabort", {
						tile: t,
						coords: n
					});
				}
			},
			_removeTile: function(e) {
				var t = this._tiles[e];
				if (t) return t.el.setAttribute("src", y), Q.prototype._removeTile.call(this, e);
			},
			_tileReady: function(e, t, n) {
				if (!(!this._map || n && n.getAttribute("src") === y)) return Q.prototype._tileReady.call(this, e, t, n);
			}
		});
		function zr(e, t) {
			return new Rr(e, t);
		}
		var Br = Rr.extend({
			defaultWmsParams: {
				service: "WMS",
				request: "GetMap",
				layers: "",
				styles: "",
				format: "image/jpeg",
				transparent: !1,
				version: "1.1.1"
			},
			options: {
				crs: null,
				uppercase: !1
			},
			initialize: function(e, t) {
				this._url = e;
				var r = n({}, this.defaultWmsParams);
				for (var i in t) i in this.options || (r[i] = t[i]);
				t = p(this, t);
				var a = t.detectRetina && U.retina ? 2 : 1, o = this.getTileSize();
				r.width = o.x * a, r.height = o.y * a, this.wmsParams = r;
			},
			onAdd: function(e) {
				this._crs = this.options.crs || e.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
				var t = this._wmsVersion >= 1.3 ? "crs" : "srs";
				this.wmsParams[t] = this._crs.code, Rr.prototype.onAdd.call(this, e);
			},
			getTileUrl: function(e) {
				var t = this._tileCoordsToNwSe(e), n = this._crs, r = re(n.project(t[0]), n.project(t[1])), i = r.min, a = r.max, o = (this._wmsVersion >= 1.3 && this._crs === Wn ? [
					i.y,
					i.x,
					a.y,
					a.x
				] : [
					i.x,
					i.y,
					a.x,
					a.y
				]).join(","), s = Rr.prototype.getTileUrl.call(this, e);
				return s + m(this.wmsParams, s, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + o;
			},
			setParams: function(e, t) {
				return n(this.wmsParams, e), t || this.redraw(), this;
			}
		});
		function Vr(e, t) {
			return new Br(e, t);
		}
		Rr.WMS = Br, zr.wms = Vr;
		var $ = Kn.extend({
			options: { padding: .1 },
			initialize: function(e) {
				p(this, e), o(this), this._layers = this._layers || {};
			},
			onAdd: function() {
				this._container || (this._initContainer(), K(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
			},
			onRemove: function() {
				this.off("update", this._updatePaths, this), this._destroyContainer();
			},
			getEvents: function() {
				var e = {
					viewreset: this._reset,
					zoom: this._onZoom,
					moveend: this._update,
					zoomend: this._onZoomEnd
				};
				return this._zoomAnimated && (e.zoomanim = this._onAnimZoom), e;
			},
			_onAnimZoom: function(e) {
				this._updateTransform(e.center, e.zoom);
			},
			_onZoom: function() {
				this._updateTransform(this._map.getCenter(), this._map.getZoom());
			},
			_updateTransform: function(e, t) {
				var n = this._map.getZoomScale(t, this._zoom), r = this._map.getSize().multiplyBy(.5 + this.options.padding), i = this._map.project(this._center, t), a = r.multiplyBy(-n).add(i).subtract(this._map._getNewPixelOrigin(e, t));
				U.any3d ? Ot(this._container, a, n) : kt(this._container, a);
			},
			_reset: function() {
				for (var e in this._update(), this._updateTransform(this._center, this._zoom), this._layers) this._layers[e]._reset();
			},
			_onZoomEnd: function() {
				for (var e in this._layers) this._layers[e]._project();
			},
			_updatePaths: function() {
				for (var e in this._layers) this._layers[e]._update();
			},
			_update: function() {
				var e = this.options.padding, t = this._map.getSize(), n = this._map.containerPointToLayerPoint(t.multiplyBy(-e)).round();
				this._bounds = new M(n, n.add(t.multiplyBy(1 + e * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
			}
		}), Hr = $.extend({
			options: { tolerance: 0 },
			getEvents: function() {
				var e = $.prototype.getEvents.call(this);
				return e.viewprereset = this._onViewPreReset, e;
			},
			_onViewPreReset: function() {
				this._postponeUpdatePaths = !0;
			},
			onAdd: function() {
				$.prototype.onAdd.call(this), this._draw();
			},
			_initContainer: function() {
				var e = this._container = document.createElement("canvas");
				J(e, "mousemove", this._onMouseMove, this), J(e, "click dblclick mousedown mouseup contextmenu", this._onClick, this), J(e, "mouseout", this._handleMouseOut, this), e._leaflet_disable_events = !0, this._ctx = e.getContext("2d");
			},
			_destroyContainer: function() {
				E(this._redrawRequest), delete this._ctx, _t(this._container), Wt(this._container), delete this._container;
			},
			_updatePaths: function() {
				if (!this._postponeUpdatePaths) {
					var e;
					for (var t in this._redrawBounds = null, this._layers) e = this._layers[t], e._update();
					this._redraw();
				}
			},
			_update: function() {
				if (!(this._map._animatingZoom && this._bounds)) {
					$.prototype._update.call(this);
					var e = this._bounds, t = this._container, n = e.getSize(), r = U.retina ? 2 : 1;
					kt(t, e.min), t.width = r * n.x, t.height = r * n.y, t.style.width = n.x + "px", t.style.height = n.y + "px", U.retina && this._ctx.scale(2, 2), this._ctx.translate(-e.min.x, -e.min.y), this.fire("update");
				}
			},
			_reset: function() {
				$.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
			},
			_initPath: function(e) {
				this._updateDashArray(e), this._layers[o(e)] = e;
				var t = e._order = {
					layer: e,
					prev: this._drawLast,
					next: null
				};
				this._drawLast && (this._drawLast.next = t), this._drawLast = t, this._drawFirst = this._drawFirst || this._drawLast;
			},
			_addPath: function(e) {
				this._requestRedraw(e);
			},
			_removePath: function(e) {
				var t = e._order, n = t.next, r = t.prev;
				n ? n.prev = r : this._drawLast = r, r ? r.next = n : this._drawFirst = n, delete e._order, delete this._layers[o(e)], this._requestRedraw(e);
			},
			_updatePath: function(e) {
				this._extendRedrawBounds(e), e._project(), e._update(), this._requestRedraw(e);
			},
			_updateStyle: function(e) {
				this._updateDashArray(e), this._requestRedraw(e);
			},
			_updateDashArray: function(e) {
				if (typeof e.options.dashArray == "string") {
					for (var t = e.options.dashArray.split(/[, ]+/), n = [], r, i = 0; i < t.length; i++) {
						if (r = Number(t[i]), isNaN(r)) return;
						n.push(r);
					}
					e.options._dashArray = n;
				} else e.options._dashArray = e.options.dashArray;
			},
			_requestRedraw: function(e) {
				this._map && (this._extendRedrawBounds(e), this._redrawRequest = this._redrawRequest || T(this._redraw, this));
			},
			_extendRedrawBounds: function(e) {
				if (e._pxBounds) {
					var t = (e.options.weight || 0) + 1;
					this._redrawBounds = this._redrawBounds || new M(), this._redrawBounds.extend(e._pxBounds.min.subtract([t, t])), this._redrawBounds.extend(e._pxBounds.max.add([t, t]));
				}
			},
			_redraw: function() {
				this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
			},
			_clear: function() {
				var e = this._redrawBounds;
				if (e) {
					var t = e.getSize();
					this._ctx.clearRect(e.min.x, e.min.y, t.x, t.y);
				} else this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
			},
			_draw: function() {
				var e, t = this._redrawBounds;
				if (this._ctx.save(), t) {
					var n = t.getSize();
					this._ctx.beginPath(), this._ctx.rect(t.min.x, t.min.y, n.x, n.y), this._ctx.clip();
				}
				this._drawing = !0;
				for (var r = this._drawFirst; r; r = r.next) e = r.layer, (!t || e._pxBounds && e._pxBounds.intersects(t)) && e._updatePath();
				this._drawing = !1, this._ctx.restore();
			},
			_updatePoly: function(e, t) {
				if (this._drawing) {
					var n, r, i, a, o = e._parts, s = o.length, c = this._ctx;
					if (s) {
						for (c.beginPath(), n = 0; n < s; n++) {
							for (r = 0, i = o[n].length; r < i; r++) a = o[n][r], c[r ? "lineTo" : "moveTo"](a.x, a.y);
							t && c.closePath();
						}
						this._fillStroke(c, e);
					}
				}
			},
			_updateCircle: function(e) {
				if (this._drawing && !e._empty()) {
					var t = e._point, n = this._ctx, r = Math.max(Math.round(e._radius), 1), i = (Math.max(Math.round(e._radiusY), 1) || r) / r;
					i !== 1 && (n.save(), n.scale(1, i)), n.beginPath(), n.arc(t.x, t.y / i, r, 0, Math.PI * 2, !1), i !== 1 && n.restore(), this._fillStroke(n, e);
				}
			},
			_fillStroke: function(e, t) {
				var n = t.options;
				n.fill && (e.globalAlpha = n.fillOpacity, e.fillStyle = n.fillColor || n.color, e.fill(n.fillRule || "evenodd")), n.stroke && n.weight !== 0 && (e.setLineDash && e.setLineDash(t.options && t.options._dashArray || []), e.globalAlpha = n.opacity, e.lineWidth = n.weight, e.strokeStyle = n.color, e.lineCap = n.lineCap, e.lineJoin = n.lineJoin, e.stroke());
			},
			_onClick: function(e) {
				for (var t = this._map.mouseEventToLayerPoint(e), n, r, i = this._drawFirst; i; i = i.next) n = i.layer, n.options.interactive && n._containsPoint(t) && (e.type !== "click" && e.type !== "preclick" || !this._map._draggableMoved(n)) && (r = n);
				this._fireEvent(r ? [r] : !1, e);
			},
			_onMouseMove: function(e) {
				if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
					var t = this._map.mouseEventToLayerPoint(e);
					this._handleMouseHover(e, t);
				}
			},
			_handleMouseOut: function(e) {
				var t = this._hoveredLayer;
				t && (St(this._container, "leaflet-interactive"), this._fireEvent([t], e, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
			},
			_handleMouseHover: function(e, t) {
				if (!this._mouseHoverThrottled) {
					for (var n, r, a = this._drawFirst; a; a = a.next) n = a.layer, n.options.interactive && n._containsPoint(t) && (r = n);
					r !== this._hoveredLayer && (this._handleMouseOut(e), r && (K(this._container, "leaflet-interactive"), this._fireEvent([r], e, "mouseover"), this._hoveredLayer = r)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, e), this._mouseHoverThrottled = !0, setTimeout(i(function() {
						this._mouseHoverThrottled = !1;
					}, this), 32);
				}
			},
			_fireEvent: function(e, t, n) {
				this._map._fireDOMEvent(t, n || t.type, e);
			},
			_bringToFront: function(e) {
				var t = e._order;
				if (t) {
					var n = t.next, r = t.prev;
					if (n) n.prev = r;
					else return;
					r ? r.next = n : n && (this._drawFirst = n), t.prev = this._drawLast, this._drawLast.next = t, t.next = null, this._drawLast = t, this._requestRedraw(e);
				}
			},
			_bringToBack: function(e) {
				var t = e._order;
				if (t) {
					var n = t.next, r = t.prev;
					if (r) r.next = n;
					else return;
					n ? n.prev = r : r && (this._drawLast = r), t.prev = null, t.next = this._drawFirst, this._drawFirst.prev = t, this._drawFirst = t, this._requestRedraw(e);
				}
			}
		});
		function Ur(e) {
			return U.canvas ? new Hr(e) : null;
		}
		var Wr = (function() {
			try {
				return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(e) {
					return document.createElement("<lvml:" + e + " class=\"lvml\">");
				};
			} catch {}
			return function(e) {
				return document.createElement("<" + e + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"lvml\">");
			};
		})(), Gr = {
			_initContainer: function() {
				this._container = G("div", "leaflet-vml-container");
			},
			_update: function() {
				this._map._animatingZoom || ($.prototype._update.call(this), this.fire("update"));
			},
			_initPath: function(e) {
				var t = e._container = Wr("shape");
				K(t, "leaflet-vml-shape " + (this.options.className || "")), t.coordsize = "1 1", e._path = Wr("path"), t.appendChild(e._path), this._updateStyle(e), this._layers[o(e)] = e;
			},
			_addPath: function(e) {
				var t = e._container;
				this._container.appendChild(t), e.options.interactive && e.addInteractiveTarget(t);
			},
			_removePath: function(e) {
				var t = e._container;
				_t(t), e.removeInteractiveTarget(t), delete this._layers[o(e)];
			},
			_updateStyle: function(e) {
				var t = e._stroke, n = e._fill, r = e.options, i = e._container;
				i.stroked = !!r.stroke, i.filled = !!r.fill, r.stroke ? (t ||= e._stroke = Wr("stroke"), i.appendChild(t), t.weight = r.weight + "px", t.color = r.color, t.opacity = r.opacity, r.dashArray ? t.dashStyle = _(r.dashArray) ? r.dashArray.join(" ") : r.dashArray.replace(/( *, *)/g, " ") : t.dashStyle = "", t.endcap = r.lineCap.replace("butt", "flat"), t.joinstyle = r.lineJoin) : t && (i.removeChild(t), e._stroke = null), r.fill ? (n ||= e._fill = Wr("fill"), i.appendChild(n), n.color = r.fillColor || r.color, n.opacity = r.fillOpacity) : n && (i.removeChild(n), e._fill = null);
			},
			_updateCircle: function(e) {
				var t = e._point.round(), n = Math.round(e._radius), r = Math.round(e._radiusY || n);
				this._setPath(e, e._empty() ? "M0 0" : "AL " + t.x + "," + t.y + " " + n + "," + r + " 0,23592600");
			},
			_setPath: function(e, t) {
				e._path.v = t;
			},
			_bringToFront: function(e) {
				yt(e._container);
			},
			_bringToBack: function(e) {
				bt(e._container);
			}
		}, Kr = U.vml ? Wr : de, qr = $.extend({
			_initContainer: function() {
				this._container = Kr("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Kr("g"), this._container.appendChild(this._rootGroup);
			},
			_destroyContainer: function() {
				_t(this._container), Wt(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
			},
			_update: function() {
				if (!(this._map._animatingZoom && this._bounds)) {
					$.prototype._update.call(this);
					var e = this._bounds, t = e.getSize(), n = this._container;
					this._svgSize && this._svgSize.equals(t) || (this._svgSize = t, n.setAttribute("width", t.x), n.setAttribute("height", t.y)), kt(n, e.min), n.setAttribute("viewBox", [
						e.min.x,
						e.min.y,
						t.x,
						t.y
					].join(" ")), this.fire("update");
				}
			},
			_initPath: function(e) {
				var t = e._path = Kr("path");
				e.options.className && K(t, e.options.className), e.options.interactive && K(t, "leaflet-interactive"), this._updateStyle(e), this._layers[o(e)] = e;
			},
			_addPath: function(e) {
				this._rootGroup || this._initContainer(), this._rootGroup.appendChild(e._path), e.addInteractiveTarget(e._path);
			},
			_removePath: function(e) {
				_t(e._path), e.removeInteractiveTarget(e._path), delete this._layers[o(e)];
			},
			_updatePath: function(e) {
				e._project(), e._update();
			},
			_updateStyle: function(e) {
				var t = e._path, n = e.options;
				t && (n.stroke ? (t.setAttribute("stroke", n.color), t.setAttribute("stroke-opacity", n.opacity), t.setAttribute("stroke-width", n.weight), t.setAttribute("stroke-linecap", n.lineCap), t.setAttribute("stroke-linejoin", n.lineJoin), n.dashArray ? t.setAttribute("stroke-dasharray", n.dashArray) : t.removeAttribute("stroke-dasharray"), n.dashOffset ? t.setAttribute("stroke-dashoffset", n.dashOffset) : t.removeAttribute("stroke-dashoffset")) : t.setAttribute("stroke", "none"), n.fill ? (t.setAttribute("fill", n.fillColor || n.color), t.setAttribute("fill-opacity", n.fillOpacity), t.setAttribute("fill-rule", n.fillRule || "evenodd")) : t.setAttribute("fill", "none"));
			},
			_updatePoly: function(e, t) {
				this._setPath(e, fe(e._parts, t));
			},
			_updateCircle: function(e) {
				var t = e._point, n = Math.max(Math.round(e._radius), 1), r = Math.max(Math.round(e._radiusY), 1) || n, i = "a" + n + "," + r + " 0 1,0 ", a = e._empty() ? "M0 0" : "M" + (t.x - n) + "," + t.y + i + n * 2 + ",0 " + i + -n * 2 + ",0 ";
				this._setPath(e, a);
			},
			_setPath: function(e, t) {
				e._path.setAttribute("d", t);
			},
			_bringToFront: function(e) {
				yt(e._path);
			},
			_bringToBack: function(e) {
				bt(e._path);
			}
		});
		U.vml && qr.include(Gr);
		function Jr(e) {
			return U.svg || U.vml ? new qr(e) : null;
		}
		Y.include({
			getRenderer: function(e) {
				var t = e.options.renderer || this._getPaneRenderer(e.options.pane) || this.options.renderer || this._renderer;
				return t ||= this._renderer = this._createRenderer(), this.hasLayer(t) || this.addLayer(t), t;
			},
			_getPaneRenderer: function(e) {
				if (e === "overlayPane" || e === void 0) return !1;
				var t = this._paneRenderers[e];
				return t === void 0 && (t = this._createRenderer({ pane: e }), this._paneRenderers[e] = t), t;
			},
			_createRenderer: function(e) {
				return this.options.preferCanvas && Ur(e) || Jr(e);
			}
		});
		var Yr = ur.extend({
			initialize: function(e, t) {
				ur.prototype.initialize.call(this, this._boundsToLatLngs(e), t);
			},
			setBounds: function(e) {
				return this.setLatLngs(this._boundsToLatLngs(e));
			},
			_boundsToLatLngs: function(e) {
				return e = N(e), [
					e.getSouthWest(),
					e.getNorthWest(),
					e.getNorthEast(),
					e.getSouthEast()
				];
			}
		});
		function Xr(e, t) {
			return new Yr(e, t);
		}
		qr.create = Kr, qr.pointsToPath = fe, fr.geometryToLayer = pr, fr.coordsToLatLng = hr, fr.coordsToLatLngs = gr, fr.latLngToCoords = _r, fr.latLngsToCoords = vr, fr.getFeature = yr, fr.asFeature = br, Y.mergeOptions({ boxZoom: !0 });
		var Zr = _n.extend({
			initialize: function(e) {
				this._map = e, this._container = e._container, this._pane = e._panes.overlayPane, this._resetStateTimeout = 0, e.on("unload", this._destroy, this);
			},
			addHooks: function() {
				J(this._container, "mousedown", this._onMouseDown, this);
			},
			removeHooks: function() {
				Wt(this._container, "mousedown", this._onMouseDown, this);
			},
			moved: function() {
				return this._moved;
			},
			_destroy: function() {
				_t(this._pane), delete this._pane;
			},
			_resetState: function() {
				this._resetStateTimeout = 0, this._moved = !1;
			},
			_clearDeferredResetState: function() {
				this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
			},
			_onMouseDown: function(e) {
				if (!e.shiftKey || e.which !== 1 && e.button !== 1) return !1;
				this._clearDeferredResetState(), this._resetState(), jt(), q(), this._startPoint = this._map.mouseEventToContainerPoint(e), J(document, {
					contextmenu: $t,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseMove: function(e) {
				this._moved || (this._moved = !0, this._box = G("div", "leaflet-zoom-box", this._container), K(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(e);
				var t = new M(this._point, this._startPoint), n = t.getSize();
				kt(this._box, t.min), this._box.style.width = n.x + "px", this._box.style.height = n.y + "px";
			},
			_finish: function() {
				this._moved && (_t(this._box), St(this._container, "leaflet-crosshair")), Mt(), Ft(), Wt(document, {
					contextmenu: $t,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseUp: function(e) {
				if ((e.which === 1 || e.button === 1) && (this._finish(), this._moved)) {
					this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(i(this._resetState, this), 0);
					var t = new ie(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
					this._map.fitBounds(t).fire("boxzoomend", { boxZoomBounds: t });
				}
			},
			_onKeyDown: function(e) {
				e.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
			}
		});
		Y.addInitHook("addHandler", "boxZoom", Zr), Y.mergeOptions({ doubleClickZoom: !0 });
		var Qr = _n.extend({
			addHooks: function() {
				this._map.on("dblclick", this._onDoubleClick, this);
			},
			removeHooks: function() {
				this._map.off("dblclick", this._onDoubleClick, this);
			},
			_onDoubleClick: function(e) {
				var t = this._map, n = t.getZoom(), r = t.options.zoomDelta, i = e.originalEvent.shiftKey ? n - r : n + r;
				t.options.doubleClickZoom === "center" ? t.setZoom(i) : t.setZoomAround(e.containerPoint, i);
			}
		});
		Y.addInitHook("addHandler", "doubleClickZoom", Qr), Y.mergeOptions({
			dragging: !0,
			inertia: !0,
			inertiaDeceleration: 3400,
			inertiaMaxSpeed: Infinity,
			easeLinearity: .2,
			worldCopyJump: !1,
			maxBoundsViscosity: 0
		});
		var $r = _n.extend({
			addHooks: function() {
				if (!this._draggable) {
					var e = this._map;
					this._draggable = new bn(e._mapPane, e._container), this._draggable.on({
						dragstart: this._onDragStart,
						drag: this._onDrag,
						dragend: this._onDragEnd
					}, this), this._draggable.on("predrag", this._onPreDragLimit, this), e.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), e.on("zoomend", this._onZoomEnd, this), e.whenReady(this._onZoomEnd, this));
				}
				K(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
			},
			removeHooks: function() {
				St(this._map._container, "leaflet-grab"), St(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			moving: function() {
				return this._draggable && this._draggable._moving;
			},
			_onDragStart: function() {
				var e = this._map;
				if (e._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
					var t = N(this._map.options.maxBounds);
					this._offsetLimit = re(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
				} else this._offsetLimit = null;
				e.fire("movestart").fire("dragstart"), e.options.inertia && (this._positions = [], this._times = []);
			},
			_onDrag: function(e) {
				if (this._map.options.inertia) {
					var t = this._lastTime = +/* @__PURE__ */ new Date(), n = this._lastPos = this._draggable._absPos || this._draggable._newPos;
					this._positions.push(n), this._times.push(t), this._prunePositions(t);
				}
				this._map.fire("move", e).fire("drag", e);
			},
			_prunePositions: function(e) {
				for (; this._positions.length > 1 && e - this._times[0] > 50;) this._positions.shift(), this._times.shift();
			},
			_onZoomEnd: function() {
				var e = this._map.getSize().divideBy(2), t = this._map.latLngToLayerPoint([0, 0]);
				this._initialWorldOffset = t.subtract(e).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
			},
			_viscousLimit: function(e, t) {
				return e - (e - t) * this._viscosity;
			},
			_onPreDragLimit: function() {
				if (this._viscosity && this._offsetLimit) {
					var e = this._draggable._newPos.subtract(this._draggable._startPos), t = this._offsetLimit;
					e.x < t.min.x && (e.x = this._viscousLimit(e.x, t.min.x)), e.y < t.min.y && (e.y = this._viscousLimit(e.y, t.min.y)), e.x > t.max.x && (e.x = this._viscousLimit(e.x, t.max.x)), e.y > t.max.y && (e.y = this._viscousLimit(e.y, t.max.y)), this._draggable._newPos = this._draggable._startPos.add(e);
				}
			},
			_onPreDragWrap: function() {
				var e = this._worldWidth, t = Math.round(e / 2), n = this._initialWorldOffset, r = this._draggable._newPos.x, i = (r - t + n) % e + t - n, a = (r + t + n) % e - t - n, o = Math.abs(i + n) < Math.abs(a + n) ? i : a;
				this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = o;
			},
			_onDragEnd: function(e) {
				var t = this._map, n = t.options, r = !n.inertia || e.noInertia || this._times.length < 2;
				if (t.fire("dragend", e), r) t.fire("moveend");
				else {
					this._prunePositions(+/* @__PURE__ */ new Date());
					var i = this._lastPos.subtract(this._positions[0]), a = (this._lastTime - this._times[0]) / 1e3, o = n.easeLinearity, s = i.multiplyBy(o / a), c = s.distanceTo([0, 0]), l = Math.min(n.inertiaMaxSpeed, c), u = s.multiplyBy(l / c), d = l / (n.inertiaDeceleration * o), f = u.multiplyBy(-d / 2).round();
					!f.x && !f.y ? t.fire("moveend") : (f = t._limitOffset(f, t.options.maxBounds), T(function() {
						t.panBy(f, {
							duration: d,
							easeLinearity: o,
							noMoveStart: !0,
							animate: !0
						});
					}));
				}
			}
		});
		Y.addInitHook("addHandler", "dragging", $r), Y.mergeOptions({
			keyboard: !0,
			keyboardPanDelta: 80
		});
		var ei = _n.extend({
			keyCodes: {
				left: [37],
				right: [39],
				down: [40],
				up: [38],
				zoomIn: [
					187,
					107,
					61,
					171
				],
				zoomOut: [
					189,
					109,
					54,
					173
				]
			},
			initialize: function(e) {
				this._map = e, this._setPanDelta(e.options.keyboardPanDelta), this._setZoomDelta(e.options.zoomDelta);
			},
			addHooks: function() {
				var e = this._map._container;
				e.tabIndex <= 0 && (e.tabIndex = "0"), J(e, {
					focus: this._onFocus,
					blur: this._onBlur,
					mousedown: this._onMouseDown
				}, this), this._map.on({
					focus: this._addHooks,
					blur: this._removeHooks
				}, this);
			},
			removeHooks: function() {
				this._removeHooks(), Wt(this._map._container, {
					focus: this._onFocus,
					blur: this._onBlur,
					mousedown: this._onMouseDown
				}, this), this._map.off({
					focus: this._addHooks,
					blur: this._removeHooks
				}, this);
			},
			_onMouseDown: function() {
				if (!this._focused) {
					var e = document.body, t = document.documentElement, n = e.scrollTop || t.scrollTop, r = e.scrollLeft || t.scrollLeft;
					this._map._container.focus(), window.scrollTo(r, n);
				}
			},
			_onFocus: function() {
				this._focused = !0, this._map.fire("focus");
			},
			_onBlur: function() {
				this._focused = !1, this._map.fire("blur");
			},
			_setPanDelta: function(e) {
				for (var t = this._panKeys = {}, n = this.keyCodes, r = 0, i = n.left.length; r < i; r++) t[n.left[r]] = [-1 * e, 0];
				for (r = 0, i = n.right.length; r < i; r++) t[n.right[r]] = [e, 0];
				for (r = 0, i = n.down.length; r < i; r++) t[n.down[r]] = [0, e];
				for (r = 0, i = n.up.length; r < i; r++) t[n.up[r]] = [0, -1 * e];
			},
			_setZoomDelta: function(e) {
				for (var t = this._zoomKeys = {}, n = this.keyCodes, r = 0, i = n.zoomIn.length; r < i; r++) t[n.zoomIn[r]] = e;
				for (r = 0, i = n.zoomOut.length; r < i; r++) t[n.zoomOut[r]] = -e;
			},
			_addHooks: function() {
				J(document, "keydown", this._onKeyDown, this);
			},
			_removeHooks: function() {
				Wt(document, "keydown", this._onKeyDown, this);
			},
			_onKeyDown: function(e) {
				if (!(e.altKey || e.ctrlKey || e.metaKey)) {
					var t = e.keyCode, n = this._map, r;
					if (t in this._panKeys) {
						if (!n._panAnim || !n._panAnim._inProgress) {
							if (r = this._panKeys[t], e.shiftKey && (r = j(r).multiplyBy(3)), n.options.maxBounds && (r = n._limitOffset(j(r), n.options.maxBounds)), n.options.worldCopyJump) {
								var i = n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(r)));
								n.panTo(i);
							} else n.panBy(r);
						}
					} else if (t in this._zoomKeys) n.setZoom(n.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[t]);
					else if (t === 27 && n._popup && n._popup.options.closeOnEscapeKey) n.closePopup();
					else return;
					$t(e);
				}
			}
		});
		Y.addInitHook("addHandler", "keyboard", ei), Y.mergeOptions({
			scrollWheelZoom: !0,
			wheelDebounceTime: 40,
			wheelPxPerZoomLevel: 60
		});
		var ti = _n.extend({
			addHooks: function() {
				J(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
			},
			removeHooks: function() {
				Wt(this._map._container, "wheel", this._onWheelScroll, this);
			},
			_onWheelScroll: function(e) {
				var t = rn(e), n = this._map.options.wheelDebounceTime;
				this._delta += t, this._lastMousePos = this._map.mouseEventToContainerPoint(e), this._startTime ||= +/* @__PURE__ */ new Date();
				var r = Math.max(n - (+/* @__PURE__ */ new Date() - this._startTime), 0);
				clearTimeout(this._timer), this._timer = setTimeout(i(this._performZoom, this), r), $t(e);
			},
			_performZoom: function() {
				var e = this._map, t = e.getZoom(), n = this._map.options.zoomSnap || 0;
				e._stop();
				var r = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), i = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(r)))) / Math.LN2, a = n ? Math.ceil(i / n) * n : i, o = e._limitZoom(t + (this._delta > 0 ? a : -a)) - t;
				this._delta = 0, this._startTime = null, o && (e.options.scrollWheelZoom === "center" ? e.setZoom(t + o) : e.setZoomAround(this._lastMousePos, t + o));
			}
		});
		Y.addInitHook("addHandler", "scrollWheelZoom", ti);
		var ni = 600;
		Y.mergeOptions({
			tapHold: U.touchNative && U.safari && U.mobile,
			tapTolerance: 15
		});
		var ri = _n.extend({
			addHooks: function() {
				J(this._map._container, "touchstart", this._onDown, this);
			},
			removeHooks: function() {
				Wt(this._map._container, "touchstart", this._onDown, this);
			},
			_onDown: function(e) {
				if (clearTimeout(this._holdTimeout), e.touches.length === 1) {
					var t = e.touches[0];
					this._startPos = this._newPos = new A(t.clientX, t.clientY), this._holdTimeout = setTimeout(i(function() {
						this._cancel(), this._isTapValid() && (J(document, "touchend", Qt), J(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", t));
					}, this), ni), J(document, "touchend touchcancel contextmenu", this._cancel, this), J(document, "touchmove", this._onMove, this);
				}
			},
			_cancelClickPrevent: function e() {
				Wt(document, "touchend", Qt), Wt(document, "touchend touchcancel", e);
			},
			_cancel: function() {
				clearTimeout(this._holdTimeout), Wt(document, "touchend touchcancel contextmenu", this._cancel, this), Wt(document, "touchmove", this._onMove, this);
			},
			_onMove: function(e) {
				var t = e.touches[0];
				this._newPos = new A(t.clientX, t.clientY);
			},
			_isTapValid: function() {
				return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
			},
			_simulateEvent: function(e, t) {
				var n = new MouseEvent(e, {
					bubbles: !0,
					cancelable: !0,
					view: window,
					screenX: t.screenX,
					screenY: t.screenY,
					clientX: t.clientX,
					clientY: t.clientY
				});
				n._simulated = !0, t.target.dispatchEvent(n);
			}
		});
		Y.addInitHook("addHandler", "tapHold", ri), Y.mergeOptions({
			touchZoom: U.touch,
			bounceAtZoomLimits: !0
		});
		var ii = _n.extend({
			addHooks: function() {
				K(this._map._container, "leaflet-touch-zoom"), J(this._map._container, "touchstart", this._onTouchStart, this);
			},
			removeHooks: function() {
				St(this._map._container, "leaflet-touch-zoom"), Wt(this._map._container, "touchstart", this._onTouchStart, this);
			},
			_onTouchStart: function(e) {
				var t = this._map;
				if (!(!e.touches || e.touches.length !== 2 || t._animatingZoom || this._zooming)) {
					var n = t.mouseEventToContainerPoint(e.touches[0]), r = t.mouseEventToContainerPoint(e.touches[1]);
					this._centerPoint = t.getSize()._divideBy(2), this._startLatLng = t.containerPointToLatLng(this._centerPoint), t.options.touchZoom !== "center" && (this._pinchStartLatLng = t.containerPointToLatLng(n.add(r)._divideBy(2))), this._startDist = n.distanceTo(r), this._startZoom = t.getZoom(), this._moved = !1, this._zooming = !0, t._stop(), J(document, "touchmove", this._onTouchMove, this), J(document, "touchend touchcancel", this._onTouchEnd, this), Qt(e);
				}
			},
			_onTouchMove: function(e) {
				if (e.touches && e.touches.length === 2 && this._zooming) {
					var t = this._map, n = t.mouseEventToContainerPoint(e.touches[0]), r = t.mouseEventToContainerPoint(e.touches[1]), a = n.distanceTo(r) / this._startDist;
					if (this._zoom = t.getScaleZoom(a, this._startZoom), !t.options.bounceAtZoomLimits && (this._zoom < t.getMinZoom() && a < 1 || this._zoom > t.getMaxZoom() && a > 1) && (this._zoom = t._limitZoom(this._zoom)), t.options.touchZoom === "center") {
						if (this._center = this._startLatLng, a === 1) return;
					} else {
						var o = n._add(r)._divideBy(2)._subtract(this._centerPoint);
						if (a === 1 && o.x === 0 && o.y === 0) return;
						this._center = t.unproject(t.project(this._pinchStartLatLng, this._zoom).subtract(o), this._zoom);
					}
					this._moved ||= (t._moveStart(!0, !1), !0), E(this._animRequest);
					var s = i(t._move, t, this._center, this._zoom, {
						pinch: !0,
						round: !1
					}, void 0);
					this._animRequest = T(s, this, !0), Qt(e);
				}
			},
			_onTouchEnd: function() {
				!this._moved || !this._zooming ? this._zooming = !1 : (this._zooming = !1, E(this._animRequest), Wt(document, "touchmove", this._onTouchMove, this), Wt(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom)));
			}
		});
		Y.addInitHook("addHandler", "touchZoom", ii), Y.BoxZoom = Zr, Y.DoubleClickZoom = Qr, Y.Drag = $r, Y.Keyboard = ei, Y.ScrollWheelZoom = ti, Y.TapHold = ri, Y.TouchZoom = ii, e.Bounds = M, e.Browser = U, e.CRS = I, e.Canvas = Hr, e.Circle = or, e.CircleMarker = ir, e.Class = O, e.Control = ln, e.DivIcon = Fr, e.DivOverlay = Ar, e.DomEvent = on, e.DomUtil = Ht, e.Draggable = bn, e.Evented = k, e.FeatureGroup = Yn, e.GeoJSON = fr, e.GridLayer = Q, e.Handler = _n, e.Icon = Zn, e.ImageOverlay = wr, e.LatLng = P, e.LatLngBounds = ie, e.Layer = Kn, e.LayerGroup = qn, e.LineUtil = zn, e.Map = Y, e.Marker = tr, e.Mixin = vn, e.Path = rr, e.Point = A, e.PolyUtil = wn, e.Polygon = ur, e.Polyline = cr, e.Popup = jr, e.PosAnimation = sn, e.Projection = Hn, e.Rectangle = Yr, e.Renderer = $, e.SVG = qr, e.SVGOverlay = Or, e.TileLayer = Rr, e.Tooltip = Nr, e.Transformation = se, e.Util = D, e.VideoOverlay = Er, e.bind = i, e.bounds = re, e.canvas = Ur, e.circle = sr, e.circleMarker = ar, e.control = un, e.divIcon = Ir, e.extend = n, e.featureGroup = Xn, e.geoJSON = Sr, e.geoJson = Cr, e.gridLayer = Lr, e.icon = Qn, e.imageOverlay = Tr, e.latLng = F, e.latLngBounds = N, e.layerGroup = Jn, e.map = cn, e.marker = nr, e.point = j, e.polygon = dr, e.polyline = lr, e.popup = Mr, e.rectangle = Xr, e.setOptions = p, e.stamp = o, e.svg = Jr, e.svgOverlay = kr, e.tileLayer = zr, e.tooltip = Pr, e.transformation = ce, e.version = t, e.videoOverlay = Dr;
		var ai = window.L;
		e.noConflict = function() {
			return window.L = ai, this;
		}, window.L = e;
	}));
})))(), 1), Qa = ".leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;top:0;left:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:0 0}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{-webkit-transform-origin:0 0;width:1600px;height:1600px}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{width:auto;padding:0;max-width:none!important;max-height:none!important}.leaflet-container img.leaflet-tile{mix-blend-mode:plus-lighter}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:#33b5e566}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{box-sizing:border-box;z-index:800;width:0;height:0}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{z-index:800;pointer-events:visiblePainted;pointer-events:auto;position:relative}.leaflet-top,.leaflet-bottom{z-index:1000;pointer-events:none;position:absolute}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{outline-offset:1px;background:#ddd}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{background:#ffffff80;border:2px dotted #38f}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:.75rem;line-height:1.5}.leaflet-bar{border-radius:4px;box-shadow:0 1px 5px #000000a6}.leaflet-bar a{text-align:center;color:#000;background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;text-decoration:none;display:block}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom:none;border-bottom-right-radius:4px;border-bottom-left-radius:4px}.leaflet-bar a.leaflet-disabled{cursor:default;color:#bbb;background-color:#f4f4f4}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-right-radius:2px;border-bottom-left-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{text-indent:1px;font:700 18px Lucida Console,Monaco,monospace}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{background:#fff;border-radius:5px;box-shadow:0 1px 5px #0006}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{color:#333;background:#fff;padding:6px 10px 6px 6px}.leaflet-control-layers-scrollbar{padding-right:5px;overflow:hidden scroll}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{font-size:1.08333em;display:block}.leaflet-control-layers-separator{border-top:1px solid #ddd;height:0;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fffc;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{color:#333;padding:0 5px;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{width:1em;height:.6669em;vertical-align:baseline!important;display:inline!important}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{white-space:nowrap;box-sizing:border-box;text-shadow:1px 1px #fff;background:#fffc;border:2px solid #777;border-top:none;padding:2px 5px 1px;line-height:1.1}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{background-clip:padding-box;border:2px solid #0003}.leaflet-popup{text-align:center;margin-bottom:20px;position:absolute}.leaflet-popup-content-wrapper{text-align:left;border-radius:12px;padding:1px}.leaflet-popup-content{min-height:1px;margin:13px 24px 13px 20px;font-size:1.08333em;line-height:1.3}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{pointer-events:none;width:40px;height:20px;margin-top:-1px;margin-left:-20px;position:absolute;left:50%;overflow:hidden}.leaflet-popup-tip{pointer-events:auto;width:17px;height:17px;margin:-10px auto 0;padding:1px;transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{color:#333;background:#fff;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{text-align:center;color:#757575;background:0 0;border:none;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;text-decoration:none;position:absolute;top:0;right:0}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{-ms-filter:\"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";width:24px;filter:progid:DXImageTransform.Microsoft.Matrix(M11=.707107, M12=.707107, M21=-.707107, M22=.707107);margin:0 auto}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{color:#222;white-space:nowrap;-webkit-user-select:none;user-select:none;pointer-events:none;background-color:#fff;border:1px solid #fff;border-radius:3px;padding:6px;position:absolute;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{pointer-events:none;content:\"\";background:0 0;border:6px solid #0000;position:absolute}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{margin-left:-6px;left:50%}.leaflet-tooltip-top:before{border-top-color:#fff;margin-bottom:-12px;bottom:0}.leaflet-tooltip-bottom:before{border-bottom-color:#fff;margin-top:-12px;margin-left:-6px;top:0}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{margin-top:-6px;top:50%}.leaflet-tooltip-left:before{border-left-color:#fff;margin-right:-12px;right:0}.leaflet-tooltip-right:before{border-right-color:#fff;margin-left:-12px;left:0}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}";
// src/colors.ts
function $a(e, t, n) {
	let r = n > t ? Math.min(1, Math.max(0, (e - t) / (n - t))) : .5;
	return `hsl(${Math.round(240 * (1 - r))}, 80%, 50%)`;
}
// src/route-segments.ts
function eo(e) {
	if (e.length === 0) return {
		min: 0,
		max: 0
	};
	let t = e.map((e) => e.height);
	return {
		min: Math.min(...t),
		max: Math.max(...t)
	};
}
function to(e, t, n) {
	let r = [];
	for (let i = 1; i < e.length; i++) {
		let a = e[i - 1], o = e[i];
		a.lat !== null && a.lon !== null && o.lat !== null && o.lon !== null && r.push({
			from: [a.lat, a.lon],
			to: [o.lat, o.lon],
			color: $a(o.height, t, n)
		});
	}
	return r;
}
// src/route-map.ts
var no = class extends je {
	static {
		this.properties = {
			points: { attribute: !1 },
			start: { attribute: !1 },
			end: { attribute: !1 },
			tileUrl: { type: String },
			lang: { type: String }
		};
	}
	constructor() {
		super(), this.points = [], this.start = null, this.end = null, this.tileUrl = "", this.lang = "de";
	}
	static {
		this.styles = [
			m(Qa),
			Ya,
			h`
      .map { height: 340px; border-radius: 12px; border: 1px solid var(--divider-color, #ddd); z-index: 0; }
      .legend { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; margin-top: 6px; color: var(--secondary-text-color); }
      .legend .bar { flex: 1; height: 8px; border-radius: 4px; max-width: 220px; }
    `
		];
	}
	get hasPosition() {
		return this.start !== null || this.end !== null || this.points.some((e) => e.lat !== null && e.lon !== null);
	}
	render() {
		if (!this.hasPosition) return z`<p class="muted">${W("no_position", this.lang)}</p>`;
		let { min: e, max: t } = eo(this.points), n = `linear-gradient(to right, ${$a(e, e, t)}, ${$a((e + t) / 2, e, t)}, ${$a(t, e, t)})`;
		return z`<div class="map"></div>
      <div class="legend"><span>${Math.round(e)} m</span><div class="bar" style="background:${n}"></div><span>${Math.round(t)} m</span></div>`;
	}
	updated() {
		if (!this.hasPosition) {
			this.destroyMap();
			return;
		}
		let e = this.renderRoot.querySelector(".map");
		e && (this.map || this.createMap(e), this.draw());
	}
	createMap(e) {
		this.map = Za.default.map(e, {
			zoomControl: !0,
			attributionControl: !0
		}).setView([0, 0], 2), this.tileUrl && Za.default.tileLayer(this.tileUrl, {
			maxZoom: 19,
			attribution: "© OpenStreetMap"
		}).addTo(this.map), this.layer = Za.default.layerGroup().addTo(this.map), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.map?.invalidateSize()), this.resizeObserver.observe(e));
	}
	draw() {
		if (!this.map || !this.layer) return;
		this.layer.clearLayers();
		let { min: e, max: t } = eo(this.points), n = [];
		for (let r of to(this.points, e, t)) Za.default.polyline([r.from, r.to], {
			color: r.color,
			weight: 4
		}).addTo(this.layer), n.push(r.from, r.to);
		this.start && Za.default.circleMarker([this.start.lat, this.start.lon], {
			radius: 7,
			color: "#fff",
			weight: 2,
			fillColor: "#2e7d32",
			fillOpacity: 1
		}).addTo(this.layer), this.end && Za.default.circleMarker([this.end.lat, this.end.lon], {
			radius: 7,
			color: "#fff",
			weight: 2,
			fillColor: "#c62828",
			fillOpacity: 1
		}).addTo(this.layer), this.start && n.push([this.start.lat, this.start.lon]), this.end && n.push([this.end.lat, this.end.lon]);
		for (let e of this.points) e.lat !== null && e.lon !== null && n.push([e.lat, e.lon]);
		if (n.length === 0) return;
		let r = Za.default.latLngBounds(n);
		r.getNorthEast().equals(r.getSouthWest()) ? this.map.setView(r.getCenter(), 16) : this.map.fitBounds(r, { padding: [20, 20] });
	}
	destroyMap() {
		this.resizeObserver?.disconnect(), this.map?.remove(), this.map = void 0, this.layer = void 0;
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.destroyMap();
	}
};
customElements.define("dl-route-map", no);
// src/flight-detail.ts
var ro = class extends je {
	static {
		this.properties = {
			detail: { attribute: !1 },
			lang: { type: String },
			timeZone: { type: String },
			tileUrl: { type: String },
			dark: { type: Boolean }
		};
	}
	constructor() {
		super(), this.lang = "de", this.timeZone = "UTC", this.tileUrl = "", this.dark = !1;
	}
	static {
		this.styles = [Ya, h`
      :host { display: block; }
      .head h2 { margin: 0 0 2px; font-size: 1.2rem; font-weight: 500; }
      .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; margin: 12px 0; }
      .tile { text-align: center; padding: 8px; }
      .tile b { display: block; font-size: 1.25rem; font-weight: 500; }
      .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 12px; }
    `];
	}
	render() {
		let e = this.detail;
		if (!e) return z`<p class="muted">${W("select_flight", this.lang)}</p>`;
		let { summary: t, battery: n, weather: r } = e, i = this.lang;
		return z`
      <div class="head">
        <h2>${He(t.start, this.timeZone, i)}</h2>
        <div class="muted">${t.drone_model} · …${t.drone_suffix} · ${W("battery", i)} …${t.battery_suffix} · ${e.source_name}</div>
      </div>
      <div class="tiles">
        ${this.tile(W("duration", i), Le(t.duration_s))}
        ${this.tile(W("distance", i), Re(t.distance_m, i))}
        ${this.tile(W("max_height", i), Be(t.max_height_m, i))}
        ${this.tile(W("max_speed", i), ze(t.max_speed_ms, i))}
      </div>
      <div class="cards">
        <div class="card">
          <h3>${W("battery", i)}</h3>
          ${n ? z`
          ${this.row(W("charge", i), `${Ve(n.charge_start)} → ${Ve(n.charge_end)}`)}
          ${this.row(W("power_avg", i), `${Math.round(n.avg_power_w)} W`)}
          ${this.row(W("power_peak", i), `${Math.round(n.peak_power_w)} W`)}
          ${this.row(W("cell_deviation", i), `${Math.round(n.cell_deviation_max_v * 1e3)} mV`)}
          ${this.row(W("temperature", i), `${Math.round(n.temp_min_c)} … ${Math.round(n.temp_max_c)} °C`)}
          ${this.row(W("cycles", i), n.cycles === null ? "–" : String(n.cycles))}
          ${this.row(W("health", i), Ve(n.health_pct))}` : z`<p class="muted">${W("no_battery", i)}</p>`}
        </div>
        <div class="card">
          <h3>${W("weather", i)}</h3>
          ${r ? z`${this.row(W("temperature", i), `${r.temperature_c.toLocaleString(i)} °C`)}
              ${this.row(W("wind", i), `${Ke(r.wind_10m_ms, i)} (${Ge(r.wind_dir_deg, i)} ${Math.round(r.wind_dir_deg)}°)`)}
              ${r.wind_80m_ms === null ? B : this.row(`${W("wind", i)} 80 m`, Ke(r.wind_80m_ms, i))}
              ${this.row(W("gusts", i), Ke(r.gust_ms, i))}
              ${this.row(W("precipitation", i), `${r.precipitation_mm.toLocaleString(i)} mm`)}
              ${this.row(W("clouds", i), Ve(r.cloud_cover_pct))}
              ${this.row(W("source", i), r.source)}` : z`<p class="muted">${W("no_weather", i)}</p>`}
        </div>
      </div>
      <dl-route-map .points=${e.points} .start=${e.start} .end=${e.end} .tileUrl=${this.tileUrl} .lang=${i}></dl-route-map>
      <dl-flight-charts .points=${e.points} .lang=${i} .dark=${this.dark}></dl-flight-charts>
      <slot></slot>
    `;
	}
	tile(e, t) {
		return z`<div class="card tile"><span class="muted">${e}</span><b>${t}</b></div>`;
	}
	row(e, t) {
		return z`<div class="kv"><span>${e}</span><b>${t}</b></div>`;
	}
};
customElements.define("dl-flight-detail", ro);
// src/flight-list.ts
var io = class extends je {
	static {
		this.properties = {
			flights: { attribute: !1 },
			selectedId: { type: Number },
			lang: { type: String },
			timeZone: { type: String }
		};
	}
	constructor() {
		super(), this.flights = [], this.lang = "de", this.timeZone = "UTC";
	}
	static {
		this.styles = [Ya, h`
      ul { list-style: none; margin: 0; padding: 0; }
      li { padding: 8px 12px; border-radius: 8px; cursor: pointer; outline: none; }
      li:hover, li:focus-visible { background: var(--secondary-background-color, #f3f3f3); }
      li.selected { background: var(--primary-color); color: var(--text-primary-color, #fff); }
      li .sub { font-size: 0.85rem; opacity: 0.8; }
    `];
	}
	select(e) {
		this.dispatchEvent(new CustomEvent("select", { detail: e }));
	}
	onKey(e, t) {
		let n = e.key === "ArrowDown" ? t + 1 : e.key === "ArrowUp" ? t - 1 : e.key === "Enter" ? t : -1, r = this.flights[n];
		r && (e.preventDefault(), this.select(r.id), e.key !== "Enter" && this.renderRoot.querySelectorAll("li")[n]?.focus());
	}
	render() {
		return z`<ul role="listbox">
      ${this.flights.map((e, t) => z`<li
          role="option"
          tabindex="0"
          aria-selected=${e.id === this.selectedId}
          class=${e.id === this.selectedId ? "selected" : ""}
          @click=${() => this.select(e.id)}
          @keydown=${(e) => this.onKey(e, t)}
        >
          <div>${He(e.start, this.timeZone, this.lang)}</div>
          <div class="sub">${Le(e.duration_s)} · ${e.drone_model} · …${e.battery_suffix}</div>
        </li>`)}
    </ul>`;
	}
};
customElements.define("dl-flight-list", io);
// src/flights-view.ts
var ao = 50, oo = class extends je {
	static {
		this.properties = {
			hass: { attribute: !1 },
			narrow: { type: Boolean },
			tileUrl: { type: String },
			initialId: { type: Number },
			flights: { state: !0 },
			total: { state: !0 },
			selectedId: { state: !0 },
			detail: { state: !0 },
			drones: { state: !0 },
			batteries: { state: !0 },
			droneFilter: { state: !0 },
			batteryFilter: { state: !0 },
			loading: { state: !0 },
			error: { state: !0 },
			showDetail: { state: !0 },
			detailError: { state: !0 }
		};
	}
	constructor() {
		super(), this.listToken = 0, this.detailToken = 0, this.narrow = !1, this.tileUrl = "", this.flights = [], this.total = 0, this.drones = [], this.batteries = [], this.droneFilter = "", this.batteryFilter = "", this.loading = !1, this.error = !1, this.showDetail = !1, this.detailError = !1;
	}
	static {
		this.styles = [Ya, h`
      .layout { display: grid; grid-template-columns: minmax(240px, 320px) 1fr; gap: 16px; align-items: start; }
      .layout.narrow { grid-template-columns: 1fr; }
      .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }
      .list { max-height: calc(100vh - 160px); overflow: auto; }
      .list.narrow { max-height: none; }
      .more { width: 100%; margin-top: 8px; }
    `];
	}
	connectedCallback() {
		super.connectedCallback(), this.loadOptions(), this.loadFlights(!0);
	}
	get api() {
		return new Pe(this.hass);
	}
	get language() {
		return this.hass?.language ?? "en";
	}
	get timeZone() {
		return this.hass?.config?.time_zone ?? "UTC";
	}
	async loadOptions() {
		try {
			let [e, t] = await Promise.all([this.api.stats(), this.api.batteries()]);
			this.drones = e.drones, this.batteries = t.batteries;
		} catch {}
	}
	async loadFlights(e) {
		if (!e && this.loading) return;
		let t = ++this.listToken, n = e ? 0 : this.flights.length;
		this.loading = !0, this.error = !1;
		try {
			let r = await this.api.flights({
				limit: ao,
				offset: n,
				drone: this.droneFilter || void 0,
				battery: this.batteryFilter || void 0
			});
			if (t !== this.listToken) return;
			if (this.flights = e ? r.flights : [...this.flights, ...r.flights], this.total = r.total, e) {
				let e = this.initialId;
				this.initialId = void 0;
				let t = e ?? r.flights[0]?.id;
				t === void 0 ? this.detail = void 0 : await this.selectFlight(t, e !== void 0);
			}
		} catch {
			t === this.listToken && (this.error = !0);
		} finally {
			t === this.listToken && (this.loading = !1);
		}
	}
	async selectFlight(e, t = !0) {
		let n = ++this.detailToken;
		this.selectedId = e, this.detailError = !1, t && (this.showDetail = !0);
		try {
			let t = await this.api.flight(e);
			n === this.detailToken && (this.detail = t);
		} catch {
			n === this.detailToken && (this.detail = void 0, this.detailError = !0);
		}
	}
	onFilter(e) {
		let t = e.target;
		t.name === "drone" ? this.droneFilter = t.value : this.batteryFilter = t.value, this.loadFlights(!0);
	}
	render() {
		let e = this.language;
		if (this.error) return z`<p class="muted">${W("error", e)}</p>`;
		if (!this.loading && this.flights.length === 0 && !this.droneFilter && !this.batteryFilter) return z`<p class="muted">${W("no_flights", e)}</p>`;
		let t = z`
      <div class="filters">
        <select name="drone" @change=${this.onFilter}>
          <option value="">${W("all_drones", e)}</option>
          ${this.drones.map((e) => z`<option value=${e.serial} ?selected=${e.serial === this.droneFilter}>${e.model} …${e.serial_suffix}</option>`)}
        </select>
        <select name="battery" @change=${this.onFilter}>
          <option value="">${W("all_batteries", e)}</option>
          ${this.batteries.map((e) => z`<option value=${e.serial} ?selected=${e.serial === this.batteryFilter}>…${e.suffix}</option>`)}
        </select>
      </div>
      <div class="list ${this.narrow ? "narrow" : ""}">
        <dl-flight-list
          .flights=${this.flights}
          .selectedId=${this.selectedId}
          .lang=${e}
          .timeZone=${this.timeZone}
          @select=${(e) => void this.selectFlight(e.detail)}
        ></dl-flight-list>
        ${this.flights.length < this.total ? z`<button class="more" ?disabled=${this.loading} @click=${() => void this.loadFlights(!1)}>${W("load_more", e)}</button>` : B}
      </div>
    `, n = this.detailError ? z`<p class="muted">${W("error", e)}</p>` : z`<dl-flight-detail
      .detail=${this.detail}
      .lang=${e}
      .timeZone=${this.timeZone}
      .tileUrl=${this.tileUrl}
      .dark=${!!this.hass?.themes?.darkMode}
    ></dl-flight-detail>`;
		return this.narrow ? this.showDetail ? z`<button @click=${() => this.showDetail = !1}>← ${W("back", e)}</button>${n}` : t : z`<div class="layout"><div>${t}</div><div>${n}</div></div>`;
	}
};
customElements.define("dl-flights-view", oo);
// src/stats-logic.ts
function so(e) {
	if (e.length === 0) return [];
	let t = new Map(e.map((e) => [e.month, e])), [n, r] = e[0].month.split("-").map(Number), [i, a] = e[e.length - 1].month.split("-").map(Number), o = [];
	for (let e = n, s = r; e < i || e === i && s <= a;) {
		let n = `${e}-${String(s).padStart(2, "0")}`;
		o.push(t.get(n) ?? {
			month: n,
			flights: 0,
			duration_s: 0,
			distance_m: 0
		}), ++s > 12 && (s = 1, e++);
	}
	return o;
}
function co(e, t) {
	let [n, r] = e.split("-").map(Number);
	return new Intl.DateTimeFormat(t, {
		month: "short",
		year: "2-digit",
		timeZone: "UTC"
	}).format(new Date(Date.UTC(n, r - 1, 1)));
}
function lo(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let t of e) for (let e of t.history) n.add(Date.parse(e.time) / 1e3);
	let r = [...n].sort((e, t) => e - t);
	return {
		x: r,
		series: e.map((e) => {
			let n = new Map(e.history.map((e) => [Date.parse(e.time) / 1e3, e]));
			return r.map((e) => {
				let r = n.get(e), i = r ? r[t] : null;
				return typeof i == "number" && Number.isFinite(i) ? i : null;
			});
		})
	};
}
function uo(e) {
	let t = e.history[e.history.length - 1];
	return t !== void 0 && t.cell_deviation_mv > 20;
}
// src/battery-history.ts
var fo = [
	{
		key: "health_pct",
		label: "health"
	},
	{
		key: "cycles",
		label: "cycles"
	},
	{
		key: "cell_deviation_mv",
		label: "cell_deviation"
	},
	{
		key: "temp_max_c",
		label: "temperature"
	},
	{
		key: "avg_power_w",
		label: "power_avg"
	}
], po = [
	"#1565c0",
	"#ef6c00",
	"#2e7d32",
	"#6a1b9a",
	"#00838f",
	"#ad1457",
	"#4e342e",
	"#546e7a",
	"#9e9d24"
], mo = class extends je {
	static {
		this.properties = {
			hass: { attribute: !1 },
			batteries: { state: !0 },
			metric: { state: !0 }
		};
	}
	constructor() {
		super(), this.rebuilds = 0, this.batteries = [], this.metric = "health_pct";
	}
	static {
		this.styles = [
			m(Ga),
			Ya,
			h`
      .toolbar { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
      button[aria-pressed="true"] { background: var(--primary-color); color: var(--text-primary-color, #fff); }
      .legend { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; font-size: 0.85rem; }
      .legend .warn { color: var(--error-color, #c62828); font-weight: 500; }
      .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 4px; }
    `
		];
	}
	async connectedCallback() {
		super.connectedCallback();
		try {
			this.batteries = (await new Pe(this.hass).batteries()).batteries;
		} catch {
			this.batteries = [];
		}
	}
	get language() {
		return this.hass?.language ?? "en";
	}
	render() {
		let e = this.language;
		return z`<div class="card">
      <h3>${W("battery_history", e)}</h3>
      <div class="toolbar">
        ${fo.map((t) => z`<button data-metric=${t.key} aria-pressed=${this.metric === t.key} @click=${() => this.metric = t.key}>${W(t.label, e)}</button>`)}
      </div>
      <div id="plot"></div>
      <div class="legend">
        ${this.batteries.map((e, t) => z`<span class=${uo(e) ? "warn" : ""}><span class="dot" style="background:${uo(e) ? "#c62828" : po[t % po.length]}"></span>…${e.suffix} (${e.flights})${uo(e) ? " ⚠" : ""}</span>`)}
      </div>
    </div>`;
	}
	updated(e) {
		if (!e.has("batteries") && !e.has("metric")) return;
		this.rebuilds++, this.plot?.destroy(), this.plot = void 0;
		let t = this.renderRoot.querySelector("#plot");
		if (!t || this.batteries.length === 0 || !Ka()) return;
		let { x: n, series: r } = lo(this.batteries, this.metric);
		try {
			this.plot = new Wa({
				width: t.clientWidth || 600,
				height: 240,
				legend: { show: !1 },
				scales: { x: { time: !0 } },
				axes: [{ grid: { stroke: "rgba(128,128,128,0.2)" } }, { grid: { stroke: "rgba(128,128,128,0.2)" } }],
				series: [{}, ...this.batteries.map((e, t) => ({
					label: `…${e.suffix}`,
					stroke: uo(e) ? "#c62828" : po[t % po.length],
					width: 2,
					spanGaps: !0,
					points: { show: !0 }
				}))]
			}, [n, ...r], t);
		} catch {
			this.plot = void 0;
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.plot?.destroy(), this.plot = void 0;
	}
};
// node_modules/leaflet.heat/dist/leaflet-heat.js
customElements.define("dl-battery-history", mo), (function() {
	function e(t) {
		return this instanceof e ? (this._canvas = t = typeof t == "string" ? document.getElementById(t) : t, this._ctx = t.getContext("2d"), this._width = t.width, this._height = t.height, this._max = 1, void this.clear()) : new e(t);
	}
	e.prototype = {
		defaultRadius: 25,
		defaultGradient: {
			.4: "blue",
			.6: "cyan",
			.7: "lime",
			.8: "yellow",
			1: "red"
		},
		data: function(e, t) {
			return this._data = e, this;
		},
		max: function(e) {
			return this._max = e, this;
		},
		add: function(e) {
			return this._data.push(e), this;
		},
		clear: function() {
			return this._data = [], this;
		},
		radius: function(e, t) {
			t ||= 15;
			var n = this._circle = document.createElement("canvas"), r = n.getContext("2d"), i = this._r = e + t;
			return n.width = n.height = 2 * i, r.shadowOffsetX = r.shadowOffsetY = 200, r.shadowBlur = t, r.shadowColor = "black", r.beginPath(), r.arc(i - 200, i - 200, e, 0, 2 * Math.PI, !0), r.closePath(), r.fill(), this;
		},
		gradient: function(e) {
			var t = document.createElement("canvas"), n = t.getContext("2d"), r = n.createLinearGradient(0, 0, 0, 256);
			for (var i in t.width = 1, t.height = 256, e) r.addColorStop(i, e[i]);
			return n.fillStyle = r, n.fillRect(0, 0, 1, 256), this._grad = n.getImageData(0, 0, 1, 256).data, this;
		},
		draw: function(e) {
			this._circle || this.radius(this.defaultRadius), this._grad || this.gradient(this.defaultGradient);
			var t = this._ctx;
			t.clearRect(0, 0, this._width, this._height);
			for (var n, r = 0, i = this._data.length; i > r; r++) n = this._data[r], t.globalAlpha = Math.max(n[2] / this._max, e || .05), t.drawImage(this._circle, n[0] - this._r, n[1] - this._r);
			var a = t.getImageData(0, 0, this._width, this._height);
			return this._colorize(a.data, this._grad), t.putImageData(a, 0, 0), this;
		},
		_colorize: function(e, t) {
			for (var n, r = 3, i = e.length; i > r; r += 4) n = 4 * e[r], n && (e[r - 3] = t[n], e[r - 2] = t[n + 1], e[r - 1] = t[n + 2]);
		}
	}, window.simpleheat = e;
})(), L.HeatLayer = (L.Layer ? L.Layer : L.Class).extend({
	initialize: function(e, t) {
		this._latlngs = e, L.setOptions(this, t);
	},
	setLatLngs: function(e) {
		return this._latlngs = e, this.redraw();
	},
	addLatLng: function(e) {
		return this._latlngs.push(e), this.redraw();
	},
	setOptions: function(e) {
		return L.setOptions(this, e), this._heat && this._updateOptions(), this.redraw();
	},
	redraw: function() {
		return !this._heat || this._frame || this._map._animating || (this._frame = L.Util.requestAnimFrame(this._redraw, this)), this;
	},
	onAdd: function(e) {
		this._map = e, this._canvas || this._initCanvas(), e._panes.overlayPane.appendChild(this._canvas), e.on("moveend", this._reset, this), e.options.zoomAnimation && L.Browser.any3d && e.on("zoomanim", this._animateZoom, this), this._reset();
	},
	onRemove: function(e) {
		e.getPanes().overlayPane.removeChild(this._canvas), e.off("moveend", this._reset, this), e.options.zoomAnimation && e.off("zoomanim", this._animateZoom, this);
	},
	addTo: function(e) {
		return e.addLayer(this), this;
	},
	_initCanvas: function() {
		var e = this._canvas = L.DomUtil.create("canvas", "leaflet-heatmap-layer leaflet-layer"), t = L.DomUtil.testProp([
			"transformOrigin",
			"WebkitTransformOrigin",
			"msTransformOrigin"
		]);
		e.style[t] = "50% 50%";
		var n = this._map.getSize();
		e.width = n.x, e.height = n.y;
		var r = this._map.options.zoomAnimation && L.Browser.any3d;
		L.DomUtil.addClass(e, "leaflet-zoom-" + (r ? "animated" : "hide")), this._heat = simpleheat(e), this._updateOptions();
	},
	_updateOptions: function() {
		this._heat.radius(this.options.radius || this._heat.defaultRadius, this.options.blur), this.options.gradient && this._heat.gradient(this.options.gradient), this.options.max && this._heat.max(this.options.max);
	},
	_reset: function() {
		var e = this._map.containerPointToLayerPoint([0, 0]);
		L.DomUtil.setPosition(this._canvas, e);
		var t = this._map.getSize();
		this._heat._width !== t.x && (this._canvas.width = this._heat._width = t.x), this._heat._height !== t.y && (this._canvas.height = this._heat._height = t.y), this._redraw();
	},
	_redraw: function() {
		var e, t, n, r, i, a, o, s, c, l = [], u = this._heat._r, d = this._map.getSize(), f = new L.Bounds(L.point([-u, -u]), d.add([u, u])), p = this.options.max === void 0 ? 1 : this.options.max, m = this.options.maxZoom === void 0 ? this._map.getMaxZoom() : this.options.maxZoom, h = 1 / 2 ** Math.max(0, Math.min(m - this._map.getZoom(), 12)), g = u / 2, _ = [], v = this._map._getMapPanePos(), y = v.x % g, b = v.y % g;
		for (e = 0, t = this._latlngs.length; t > e; e++) n = this._map.latLngToContainerPoint(this._latlngs[e]), f.contains(n) && (i = Math.floor((n.x - y) / g) + 2, a = Math.floor((n.y - b) / g) + 2, c = (this._latlngs[e].alt === void 0 ? this._latlngs[e][2] === void 0 ? 1 : +this._latlngs[e][2] : this._latlngs[e].alt) * h, _[a] = _[a] || [], r = _[a][i], r ? (r[0] = (r[0] * r[2] + n.x * c) / (r[2] + c), r[1] = (r[1] * r[2] + n.y * c) / (r[2] + c), r[2] += c) : _[a][i] = [
			n.x,
			n.y,
			c
		]);
		for (e = 0, t = _.length; t > e; e++) if (_[e]) for (o = 0, s = _[e].length; s > o; o++) r = _[e][o], r && l.push([
			Math.round(r[0]),
			Math.round(r[1]),
			Math.min(r[2], p)
		]);
		this._heat.data(l).draw(this.options.minOpacity), this._frame = null;
	},
	_animateZoom: function(e) {
		var t = this._map.getZoomScale(e.zoom), n = this._map._getCenterOffset(e.center)._multiplyBy(-t).subtract(this._map._getMapPanePos());
		L.DomUtil.setTransform ? L.DomUtil.setTransform(this._canvas, n, t) : this._canvas.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(n) + " scale(" + t + ")";
	}
}), L.heatLayer = function(e, t) {
	return new L.HeatLayer(e, t);
};
// src/heatmap-view.ts
var ho = class extends je {
	static {
		this.properties = {
			hass: { attribute: !1 },
			tileUrl: { type: String },
			cells: { state: !0 },
			precision: { state: !0 },
			flights: { state: !0 },
			loaded: { state: !0 }
		};
	}
	constructor() {
		super(), this.clickToken = 0, this.tileUrl = "", this.cells = [], this.precision = 300, this.flights = [], this.loaded = !1;
	}
	static {
		this.styles = [
			m(Qa),
			Ya,
			h`
      .map { height: 360px; border-radius: 12px; border: 1px solid var(--divider-color, #ddd); z-index: 0; }
      .toolbar { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
      ul { list-style: none; margin: 8px 0 0; padding: 0; }
      li { padding: 6px 10px; border-radius: 8px; cursor: pointer; }
      li:hover { background: var(--secondary-background-color, #f3f3f3); }
    `
		];
	}
	connectedCallback() {
		super.connectedCallback(), this.load();
	}
	get language() {
		return this.hass?.language ?? "en";
	}
	async load() {
		try {
			this.cells = (await new Pe(this.hass).heatmap(this.precision)).cells;
		} catch {
			this.cells = [];
		}
		this.loaded = !0;
	}
	onPrecision(e) {
		this.precision = Number(e.target.value), this.flights = [], this.load();
	}
	async handleCellClick(e, t) {
		let n = ++this.clickToken;
		try {
			let r = await new Pe(this.hass).cellFlights(e, t, this.precision);
			n === this.clickToken && (this.flights = r);
		} catch {
			n === this.clickToken && (this.flights = []);
		}
	}
	open(e) {
		this.dispatchEvent(new CustomEvent("open-flight", {
			detail: e,
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		let e = this.language;
		return this.loaded && this.cells.length === 0 ? z`<div class="card"><h3>${W("heatmap", e)}</h3><p class="muted">${W("no_position", e)}</p></div>` : z`<div class="card">
      <h3>${W("heatmap", e)}</h3>
      <div class="toolbar">
        <select name="precision" @change=${this.onPrecision}>
          <option value="300" ?selected=${this.precision === 300}>300 m</option>
          <option value="1000" ?selected=${this.precision === 1e3}>1 km</option>
        </select>
        <span class="muted">${W("heatmap_hint", e)}</span>
      </div>
      <div class="map"></div>
      ${this.flights.length ? z`<ul>${this.flights.map((t) => z`<li @click=${() => this.open(t.id)}>${He(t.start, this.hass?.config?.time_zone ?? "UTC", e)} · ${Le(t.duration_s)} · ${t.drone_model}</li>`)}</ul>` : B}
    </div>`;
	}
	updated(e) {
		let t = this.renderRoot.querySelector(".map");
		if (!t || this.cells.length === 0) return;
		let n = !this.map;
		if (this.map || (this.map = Za.default.map(t).setView([0, 0], 2), this.tileUrl && Za.default.tileLayer(this.tileUrl, {
			maxZoom: 19,
			attribution: "© OpenStreetMap"
		}).addTo(this.map), this.map.on("click", (e) => void this.handleCellClick(e.latlng.lat, e.latlng.lng))), n || e.has("cells")) {
			if (this.heat && this.map.removeLayer(this.heat), Ka()) {
				let e = Math.max(...this.cells.map((e) => e.count));
				this.heat = Za.default.heatLayer(this.cells.map((t) => [
					t.lat,
					t.lon,
					t.count / e
				]), {
					radius: 32,
					blur: 20,
					maxZoom: 14,
					minOpacity: .45
				}).addTo(this.map);
			}
			this.map.fitBounds(Za.default.latLngBounds(this.cells.map((e) => [e.lat, e.lon])), {
				padding: [30, 30],
				maxZoom: 14
			});
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.map?.remove(), this.map = void 0, this.heat = void 0;
	}
};
customElements.define("dl-heatmap-view", ho);
// src/stats-view.ts
var go = class extends je {
	static {
		this.properties = {
			hass: { attribute: !1 },
			tileUrl: { type: String },
			stats: { state: !0 },
			drone: { state: !0 },
			metric: { state: !0 },
			error: { state: !0 }
		};
	}
	constructor() {
		super(), this.tileUrl = "", this.drone = "", this.metric = "flights", this.error = !1;
	}
	static {
		this.styles = [Ya, h`
      .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; margin-bottom: 12px; }
      .tile { text-align: center; }
      .tile b { display: block; font-size: 1.3rem; font-weight: 500; }
      .toolbar { display: flex; gap: 8px; align-items: center; margin: 12px 0 8px; flex-wrap: wrap; }
      .bars { display: flex; align-items: flex-end; gap: 4px; height: 160px; overflow-x: auto; padding-bottom: 4px; }
      .col { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; min-width: 34px; height: 100%; }
      .bar { width: 22px; background: var(--primary-color); border-radius: 4px 4px 0 0; min-height: 2px; }
      .bar.empty { background: var(--divider-color, #ddd); min-height: 2px; }
      .bar-label { font-size: 0.7rem; color: var(--secondary-text-color); }
      .month { font-size: 0.7rem; color: var(--secondary-text-color); white-space: nowrap; }
      section { margin-bottom: 20px; }
      button[aria-pressed="true"] { background: var(--primary-color); color: var(--text-primary-color, #fff); }
    `];
	}
	connectedCallback() {
		super.connectedCallback(), this.load();
	}
	get language() {
		return this.hass?.language ?? "en";
	}
	async load() {
		try {
			this.stats = await new Pe(this.hass).stats(this.drone || void 0), this.error = !1;
		} catch {
			this.error = !0;
		}
	}
	onDrone(e) {
		this.drone = e.target.value, this.load();
	}
	render() {
		let e = this.language;
		if (this.error) return z`<p class="muted">${W("error", e)}</p>`;
		let t = this.stats;
		if (!t) return z`<p class="muted">${W("loading", e)}</p>`;
		if (t.totals.flights === 0 && !this.drone) return z`<p class="muted">${W("no_flights", e)}</p>`;
		let n = so(t.months), r = (e) => this.metric === "flights" ? e.flights : e.duration_s, i = Math.max(1, ...n.map(r)), a = (e) => this.metric === "flights" ? String(e.flights) : Le(e.duration_s);
		return z`
      <section>
        <div class="tiles">
          <div class="card tile"><span class="muted">${W("tab_flights", e)}</span><b>${t.totals.flights}</b></div>
          <div class="card tile"><span class="muted">${W("duration", e)}</span><b>${Le(t.totals.duration_s).replace(/^(\d+) min .*/, "$1 min")}</b></div>
          <div class="card tile"><span class="muted">${W("distance", e)}</span><b>${Re(t.totals.distance_m, e)}</b></div>
        </div>
        <div class="toolbar">
          <select name="drone" @change=${this.onDrone}>
            <option value="">${W("all_drones", e)}</option>
            ${t.drones.map((e) => z`<option value=${e.serial} ?selected=${e.serial === this.drone}>${e.model} …${e.serial_suffix}</option>`)}
          </select>
          <button data-metric="flights" aria-pressed=${this.metric === "flights"} @click=${() => this.metric = "flights"}>${W("metric_flights", e)}</button>
          <button data-metric="duration" aria-pressed=${this.metric === "duration"} @click=${() => this.metric = "duration"}>${W("metric_hours", e)}</button>
        </div>
        <div class="card bars">
          ${n.map((t) => z`<div class="col" title=${`${co(t.month, e)}: ${a(t)}`}>
              <span class="bar-label">${r(t) ? a(t) : B}</span>
              <div class="bar ${r(t) === 0 ? "empty" : ""}" style="height:${r(t) / i * 120}px"></div>
              <span class="month">${co(t.month, e)}</span>
            </div>`)}
        </div>
      </section>
      <section>
        <div class="card" style="margin-bottom:8px"><h3>${W("drones", e)}</h3>
          ${t.drones.map((e) => z`<div class="kv"><span>${e.model} …${e.serial_suffix}</span><b>${e.flights} · ${Le(e.duration_s)}</b></div>`)}
        </div>
      </section>
      <section><dl-battery-history .hass=${this.hass}></dl-battery-history></section>
      <section><dl-heatmap-view .hass=${this.hass} .tileUrl=${this.tileUrl}></dl-heatmap-view></section>
    `;
	}
};
customElements.define("dl-stats-view", go);
// src/dronelog-panel.ts
var _o = class extends je {
	static {
		this.properties = {
			hass: { attribute: !1 },
			narrow: { type: Boolean },
			panel: { attribute: !1 },
			tab: { state: !0 },
			jumpId: { state: !0 }
		};
	}
	constructor() {
		super(), this.narrow = !1, this.tab = "flights";
	}
	static {
		this.styles = [Ya, h`
      :host { display: block; min-height: 100vh; background: var(--primary-background-color); }
      header { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); }
      header h1 { margin: 0; font-size: 1.25rem; font-weight: 400; flex: 1; }
      header button { background: transparent; border: none; color: inherit; font-size: 1.4rem; padding: 4px 8px; }
      nav { display: flex; gap: 4px; padding: 8px 16px 0; border-bottom: 1px solid var(--divider-color, #ddd); }
      nav button { border: none; border-bottom: 3px solid transparent; border-radius: 0; background: none; padding: 8px 14px; }
      nav button[aria-selected="true"] { border-bottom-color: var(--primary-color); font-weight: 500; }
      main { padding: 16px; max-width: 1400px; margin: 0 auto; }
    `];
	}
	show(e) {
		this.jumpId = void 0, this.tab = e;
	}
	onOpenFlight(e) {
		this.jumpId = e.detail, this.tab = "flights";
	}
	toggleMenu() {
		this.dispatchEvent(new CustomEvent("hass-toggle-menu", {
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		let e = this.hass?.language ?? "en";
		return z`
      <header>
        ${this.narrow ? z`<button aria-label="Menu" @click=${this.toggleMenu}>☰</button>` : ""}
        <h1>${W("title", e)}</h1>
      </header>
      <nav role="tablist">
        <button role="tab" aria-selected=${this.tab === "flights"} @click=${() => this.show("flights")}>${W("tab_flights", e)}</button>
        <button role="tab" aria-selected=${this.tab === "stats"} @click=${() => this.show("stats")}>${W("tab_stats", e)}</button>
      </nav>
      <main @open-flight=${this.onOpenFlight}>
        ${this.tab === "flights" ? z`<dl-flights-view .hass=${this.hass} .narrow=${this.narrow} .tileUrl=${this.panel?.config?.tile_url ?? ""} .initialId=${this.jumpId}></dl-flights-view>` : z`<dl-stats-view .hass=${this.hass} .tileUrl=${this.panel?.config?.tile_url ?? ""}></dl-stats-view>`}
      </main>
    `;
	}
};
customElements.define("dronelog-panel", _o);
export { _o as DroneLogPanel };
