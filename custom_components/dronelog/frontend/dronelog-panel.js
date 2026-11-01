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
var ne = globalThis, j = (e) => e, M = ne.trustedTypes, re = M ? M.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ie = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, P = "?" + N, F = `<${P}>`, I = document, R = () => I.createComment(""), z = (e) => e === null || typeof e != "object" && typeof e != "function", ae = Array.isArray, oe = (e) => ae(e) || typeof e?.[Symbol.iterator] == "function", se = "[ 	\n\f\r]", ce = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, le = /-->/g, ue = />/g, de = RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), fe = /'/g, pe = /"/g, me = /^(?:script|style|textarea|title)$/i, B = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), he = Symbol.for("lit-noChange"), V = Symbol.for("lit-nothing"), ge = /* @__PURE__ */ new WeakMap(), _e = I.createTreeWalker(I, 129);
function ve(e, t) {
	if (!ae(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return re === void 0 ? t : re.createHTML(t);
}
var H = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ce;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ce ? c[1] === "!--" ? o = le : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = de) : (me.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = de) : o = ue : o === de ? c[0] === ">" ? (o = i ?? ce, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? de : c[3] === "\"" ? pe : fe) : o === pe || o === fe ? o = de : o === le || o === ue ? o = ce : (o = de, i = void 0);
		let d = o === de && e[t + 1].startsWith("/>") ? " " : "";
		a += o === ce ? n + F : l >= 0 ? (r.push(s), n.slice(0, l) + ie + n.slice(l) + N + d) : n + N + (l === -2 ? t : d);
	}
	return [ve(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, U = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = H(t, n);
		if (this.el = e.createElement(l, r), _e.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = _e.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ie)) {
					let t = u[o++], n = i.getAttribute(e).split(N), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ce : r[1] === "?" ? we : r[1] === "@" ? Te : Se
					}), i.removeAttribute(e);
				} else e.startsWith(N) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (me.test(i.tagName)) {
					let e = i.textContent.split(N), t = e.length - 1;
					if (t > 0) {
						i.textContent = M ? M.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], R()), _e.nextNode(), c.push({
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
function ye(e, t, n = e, r) {
	if (t === he) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = z(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = ye(e, i._$AS(e, t.values), i, r)), t;
}
var be = class {
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
		_e.currentNode = r;
		let i = _e.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new xe(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ee(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = _e.nextNode(), a++);
		}
		return _e.currentNode = I, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, xe = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = V, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = ye(this, e, t), z(e) ? e === V || e == null || e === "" ? (this._$AH !== V && this._$AR(), this._$AH = V) : e !== this._$AH && e !== he && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? oe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== V && z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(I.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = U.createElement(ve(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new be(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ge.get(e.strings);
		return t === void 0 && ge.set(e.strings, t = new U(e)), t;
	}
	k(t) {
		ae(this._$AH) || (this._$AH = [], this._$AR());
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
}, Se = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = V, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = V;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = ye(this, e, t, 0), a = !z(e) || e !== this._$AH && e !== he, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = ye(this, r[n + o], t, o), s === he && (s = this._$AH[o]), a ||= !z(s) || s !== this._$AH[o], s === V ? e = V : e !== V && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === V ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ce = class extends Se {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === V ? void 0 : e;
	}
}, we = class extends Se {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== V);
	}
}, Te = class extends Se {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = ye(this, e, t, 0) ?? V) === he) return;
		let n = this._$AH, r = e === V && n !== V || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== V && (n === V || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ee = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		ye(this, e);
	}
}, De = ne.litHtmlPolyfillSupport;
De?.(U, xe), (ne.litHtmlVersions ??= []).push("3.3.3");
var Oe = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new xe(t.insertBefore(R(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, ke = globalThis, Ae = class extends A {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Oe(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return he;
	}
};
Ae._$litElement$ = !0, Ae.finalized = !0, ke.litElementHydrateSupport?.({ LitElement: Ae });
var je = ke.litElementPolyfillSupport;
je?.({ LitElement: Ae }), (ke.litElementVersions ??= []).push("4.2.2");
// src/api.ts
function Me(e) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e !== void 0));
}
var Ne = class {
	constructor(e) {
		this.hass = e;
	}
	call(e) {
		return this.hass.callWS(Me(e));
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
	stats(e, t) {
		return this.call({
			type: "dronelog/stats",
			drone: e,
			battery: t
		});
	}
	batteries(e) {
		return this.call({
			type: "dronelog/batteries",
			drone: e
		});
	}
	heatmap(e, t, n) {
		return this.call({
			type: "dronelog/heatmap",
			precision_m: e,
			drone: t,
			battery: n
		});
	}
	async cellFlights(e, t, n, r, i) {
		return (await this.call({
			type: "dronelog/cell_flights",
			lat: e,
			lon: t,
			precision_m: n,
			drone: r,
			battery: i
		})).flights;
	}
}, Pe = (e) => typeof e == "number" && Number.isFinite(e);
function Fe(e, t, n) {
	return new Intl.NumberFormat(t, {
		minimumFractionDigits: n,
		maximumFractionDigits: n
	}).format(e);
}
function Ie(e) {
	if (!Pe(e)) return "–";
	let t = Math.round(e);
	return t < 60 ? `${t} s` : t < 3600 ? `${Math.floor(t / 60)} min ${t % 60} s` : `${Math.floor(t / 3600)} h ${String(Math.floor(t % 3600 / 60)).padStart(2, "0")} min`;
}
function Le(e, t) {
	return Pe(e) ? e < 1e3 ? `${Math.round(e)} m` : `${Fe(e / 1e3, t, 1)} km` : "–";
}
function Re(e, t) {
	return Pe(e) ? `${Fe(e * 3.6, t, 1)} km/h` : "–";
}
function ze(e, t) {
	return Pe(e) ? `${Fe(e, t, 1)} m` : "–";
}
function Be(e) {
	return Pe(e) ? `${Math.round(e)} %` : "–";
}
function Ve(e, t, n) {
	let r = new Date(e);
	return Number.isNaN(r.getTime()) ? "–" : new Intl.DateTimeFormat(n, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: t
	}).format(r);
}
var He = [
	"N",
	"NO",
	"O",
	"SO",
	"S",
	"SW",
	"W",
	"NW"
], Ue = [
	"N",
	"NE",
	"E",
	"SE",
	"S",
	"SW",
	"W",
	"NW"
];
function We(e, t = "de") {
	let n = Math.round((e % 360 + 360) % 360 / 45) % 8;
	return (t.startsWith("de") ? He : Ue)[n];
}
function Ge(e, t) {
	return Pe(e) ? `${Fe(e, t, 1)} m/s` : "–";
}
function W(e, t, n = 1) {
	return Pe(e) ? Fe(e, t, n) : "–";
}
function Ke(e) {
	if (!Pe(e) || e < 0) return "–";
	let t = Math.round(e), n = (e) => String(e).padStart(2, "0");
	return t >= 3600 ? `${Math.floor(t / 3600)}:${n(Math.floor(t % 3600 / 60))}:${n(t % 60)}` : `${Math.floor(t / 60)}:${n(t % 60)}`;
}
var qe = {
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
		no_battery: "Keine Akkudaten vorhanden",
		battery_summary: "Zusammenfassung",
		flights_count: "Flüge",
		last_value: "zuletzt",
		only_events: "Nur mit Ereignissen",
		photos: "Fotos",
		video: "Videoaufnahme",
		energy: "Energie",
		energy_card: "Energie",
		wh_per_km: "Verbrauch je Kilometer",
		max_descent: "Max. Sinkrate",
		max_climb: "Max. Steigrate",
		signal_card: "Funk",
		downlink_worst: "Downlink (schlechtester Wert)",
		uplink_worst: "Uplink (schlechtester Wert)",
		weak_signal_time: "Zeit mit schwachem Signal",
		max_distance: "Größte Entfernung vom Start",
		camera_card: "Kamera",
		events: "Ereignisse",
		events_none: "Keine Ereignisse in diesem Flug.",
		events_missing: "Für diesen Flug liegen noch keine Ereignisdaten vor.",
		event_signalLossGoHome: "Rückkehr wegen Verbindungsabbruch",
		event_batteryGoHome: "Rückkehr wegen Akku",
		event_voltageWarning: "Spannungswarnung",
		event_weakSignal: "Funksignal schwach",
		event_lowGPS: "GPS-Signal schwach",
		event_manualGoHome: "Rückkehr per Taste",
		event_propellerCatapult: "Propeller-Anlauf",
		level: "Stufe",
		internal_resistance: "Innenwiderstand",
		estimate: "Schätzung",
		capacity: "Kapazität",
		voltage: "Spannung",
		peak_current: "Spitzenstrom",
		cell_ok: "in Ordnung",
		cell_minor: "auffällig",
		cell_major: "kritisch",
		phases: "Flugphasen",
		phase_climb: "Steigflug",
		phase_cruise: "Reiseflug",
		phase_hover: "Schweben",
		phase_descent: "Sinkflug",
		wind_by_aircraft: "Wind laut Flugzeug",
		wind_from: "aus",
		wind_calm: "ruhig",
		wind_moderate: "mäßig",
		wind_windy: "windig",
		color_by: "Färbung",
		color_height: "Höhe",
		color_signal: "Funksignal",
		unknown: "unbekannt",
		flight_mode: "Flugmodus",
		mode_normal: "Normal",
		mode_sport: "Sport",
		mode_cine: "Cine",
		mode_manual: "Manuell",
		mode_automatic: "Start/Landung",
		mode_goHome: "Rückflug",
		mode_attitude: "Ohne GPS",
		mode_smart: "Intelligent",
		mode_other: "Sonstige",
		chart_motion: "Höhe und Tempo",
		chart_cell_deviation: "Zellabweichung (mV)",
		chart_temperature: "Akku-Temperatur (°C)",
		chart_attitude: "Lage: Nick und Roll (°)",
		chart_discharge: "Entladekurve: Spannung über Ladezustand",
		chart_signal_time: "Funksignal über die Zeit",
		chart_signal_distance: "Funksignal über die Entfernung",
		pitch: "Nick",
		roll: "Roll",
		downlink: "Downlink",
		uplink: "Uplink",
		charge_state: "Ladezustand (%)",
		distance_m: "Entfernung (m)"
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
		no_battery: "No battery data available",
		battery_summary: "Summary",
		flights_count: "Flights",
		last_value: "latest",
		only_events: "Only with events",
		photos: "Photos",
		video: "Video recording",
		energy: "Energy",
		energy_card: "Energy",
		wh_per_km: "Consumption per kilometre",
		max_descent: "Max. descent rate",
		max_climb: "Max. climb rate",
		signal_card: "Radio link",
		downlink_worst: "Downlink (worst value)",
		uplink_worst: "Uplink (worst value)",
		weak_signal_time: "Time with weak signal",
		max_distance: "Greatest distance from start",
		camera_card: "Camera",
		events: "Events",
		events_none: "No events in this flight.",
		events_missing: "No event data is available for this flight yet.",
		event_signalLossGoHome: "Return home due to lost link",
		event_batteryGoHome: "Return home due to battery",
		event_voltageWarning: "Voltage warning",
		event_weakSignal: "Weak radio signal",
		event_lowGPS: "Weak GPS signal",
		event_manualGoHome: "Return home by button",
		event_propellerCatapult: "Propeller start-up",
		level: "Level",
		internal_resistance: "Internal resistance",
		estimate: "estimate",
		capacity: "Capacity",
		voltage: "Voltage",
		peak_current: "Peak current",
		cell_ok: "OK",
		cell_minor: "noticeable",
		cell_major: "critical",
		phases: "Flight phases",
		phase_climb: "Climb",
		phase_cruise: "Cruise",
		phase_hover: "Hover",
		phase_descent: "Descent",
		wind_by_aircraft: "Wind according to aircraft",
		wind_from: "from",
		wind_calm: "calm",
		wind_moderate: "moderate",
		wind_windy: "windy",
		color_by: "Colouring",
		color_height: "Height",
		color_signal: "Radio signal",
		unknown: "unknown",
		flight_mode: "Flight mode",
		mode_normal: "Normal",
		mode_sport: "Sport",
		mode_cine: "Cine",
		mode_manual: "Manual",
		mode_automatic: "Takeoff/landing",
		mode_goHome: "Return home",
		mode_attitude: "No GPS",
		mode_smart: "Intelligent",
		mode_other: "Other",
		chart_motion: "Height and speed",
		chart_cell_deviation: "Cell deviation (mV)",
		chart_temperature: "Battery temperature (°C)",
		chart_attitude: "Attitude: pitch and roll (°)",
		chart_discharge: "Discharge curve: voltage over charge level",
		chart_signal_time: "Radio signal over time",
		chart_signal_distance: "Radio signal over distance",
		pitch: "Pitch",
		roll: "Roll",
		downlink: "Downlink",
		uplink: "Uplink",
		charge_state: "Charge level (%)",
		distance_m: "Distance (m)"
	}
};
function G(e, t) {
	return (t?.toLowerCase().startsWith("de") ? qe.de : qe.en)[e];
}
// src/flight-logic.ts
var Je = {
	info: "#1e88e5",
	warning: "#fb8c00",
	critical: "#e53935"
}, Ye = {
	signalLossGoHome: {
		icon: "mdi:signal-off",
		severity: "critical"
	},
	batteryGoHome: {
		icon: "mdi:battery-30",
		severity: "warning"
	},
	voltageWarning: {
		icon: "mdi:flash-alert",
		severity: "warning"
	},
	weakSignal: {
		icon: "mdi:wifi-alert",
		severity: "warning"
	},
	lowGPS: {
		icon: "mdi:crosshairs-off",
		severity: "warning"
	},
	manualGoHome: {
		icon: "mdi:home",
		severity: "info"
	},
	propellerCatapult: {
		icon: "mdi:fan",
		severity: "info"
	}
};
function Xe(e) {
	let t = Ye[e], n = t?.severity ?? "info";
	return {
		icon: t?.icon ?? "mdi:information-outline",
		severity: n,
		color: Je[n],
		titleKey: t ? `event_${e}` : null
	};
}
function Ze(e, t) {
	let n = Xe(e).titleKey;
	return n ? G(n, t) : e;
}
function Qe(e, t) {
	let n = Ze(e.kind, t);
	switch (e.kind) {
		case "weakSignal":
		case "lowGPS":
		case "propellerCatapult": return e.value > 0 ? `${n} · ${Ie(e.value)}` : n;
		case "voltageWarning": return `${n} · ${G("level", t)} ${Math.round(e.value)}`;
		default: return n;
	}
}
function $e(e, t) {
	return [...e?.events ?? []].sort((e, t) => e.t - t.t).map((e) => {
		let n = Xe(e.kind);
		return {
			timeText: Ke(e.t),
			icon: n.icon,
			color: n.color,
			text: Qe(e, t),
			severity: n.severity
		};
	});
}
function et(e, t) {
	let n = t.filter((e) => e.lat !== null && e.lon !== null), r = [];
	for (let t of e) {
		let e;
		for (let r of n) (!e || Math.abs(r.t - t.t) < Math.abs(e.t - t.t)) && (e = r);
		e && Math.abs(e.t - t.t) <= 3 && r.push({
			event: t,
			lat: e.lat,
			lon: e.lon
		});
	}
	return r;
}
function tt(e) {
	let t = e.event_kinds ?? [], n = e.photo_count ?? 0, r = e.video_s ?? 0;
	return {
		kinds: t,
		photos: n,
		videoS: r,
		empty: t.length === 0 && n === 0 && r === 0
	};
}
var nt = (e) => Math.min(100, Math.max(0, e)), rt = (e, t) => `${W(e, t)} m/s`;
function it(e, t) {
	if (!e) return [];
	let n = [];
	return e.energy_wh > 0 && n.push({
		label: G("energy", t),
		value: `${W(e.energy_wh, t)} Wh`
	}), e.wh_per_km !== null && e.wh_per_km > 0 && n.push({
		label: G("wh_per_km", t),
		value: `${W(e.wh_per_km, t)} Wh/km`
	}), e.max_descent_ms > 0 && n.push({
		label: G("max_descent", t),
		value: rt(e.max_descent_ms, t)
	}), e.max_climb_ms > 0 && n.push({
		label: G("max_climb", t),
		value: rt(e.max_climb_ms, t)
	}), n;
}
function at(e, t) {
	if (!e) return [];
	let n = [];
	return e.downlink_min !== null && n.push({
		label: G("downlink_worst", t),
		value: Be(nt(e.downlink_min))
	}), e.uplink_min !== null && n.push({
		label: G("uplink_worst", t),
		value: Be(nt(e.uplink_min))
	}), e.downlink_min !== null && n.push({
		label: G("weak_signal_time", t),
		value: Ie(e.weak_signal_s)
	}), e.max_distance_from_start_m > 0 && n.push({
		label: G("max_distance", t),
		value: Le(e.max_distance_from_start_m, t)
	}), n;
}
function ot(e, t) {
	if (!e) return [];
	let n = [];
	return e.photo_count > 0 && n.push({
		label: G("photos", t),
		value: String(e.photo_count)
	}), e.video_s > 0 && n.push({
		label: G("video", t),
		value: Ie(e.video_s)
	}), n;
}
function st(e) {
	let t = e * 1e3;
	return t > 50.0001 ? "major" : t > 20.0001 ? "minor" : "ok";
}
function ct(e, t) {
	return G(`cell_${e === "major" ? "major" : e === "minor" ? "minor" : "ok"}`, t);
}
function lt(e, t, n) {
	let r = t ?? st(e.cell_deviation_max_v), i = [
		{
			label: G("charge", n),
			value: `${Be(e.charge_start)} → ${Be(e.charge_end)}`
		},
		{
			label: G("power_avg", n),
			value: `${Math.round(e.avg_power_w)} W`
		},
		{
			label: G("power_peak", n),
			value: `${Math.round(e.peak_power_w)} W`
		},
		{
			label: G("cell_deviation", n),
			value: `${Math.round(e.cell_deviation_max_v * 1e3)} mV (${ct(r, n)})`
		}
	];
	return typeof e.internal_resistance_mohm == "number" && i.push({
		label: G("internal_resistance", n),
		value: `${Math.round(e.internal_resistance_mohm)} mΩ (${G("estimate", n)})`
	}), i.push({
		label: G("temperature", n),
		value: `${Math.round(e.temp_min_c)} … ${Math.round(e.temp_max_c)} °C`
	}, {
		label: G("cycles", n),
		value: e.cycles === null ? "–" : String(e.cycles)
	}, {
		label: G("health", n),
		value: Be(e.health_pct)
	}), e.full_capacity_mah > 0 && i.push({
		label: G("capacity", n),
		value: `${e.full_capacity_mah} mAh`
	}), e.min_voltage > 0 && i.push({
		label: G("voltage", n),
		value: `${W(e.min_voltage, n)} … ${W(e.max_voltage, n)} V`
	}), e.peak_current_a > 0 && i.push({
		label: G("peak_current", n),
		value: `${W(e.peak_current_a, n)} A`
	}), i;
}
var ut = [
	"climb",
	"cruise",
	"hover",
	"descent"
];
function dt(e, t) {
	return e ? ut.filter((t) => (e[t] ?? 0) >= 1).map((n) => ({
		label: G(`phase_${n}`, t),
		value: Ie(e[n])
	})) : [];
}
function ft(e, t) {
	if (!e) return null;
	let n = e.class === "windy" ? "wind_windy" : e.class === "moderate" ? "wind_moderate" : "wind_calm", r = Math.round(e.bearing_deg) % 360;
	return {
		label: G("wind_by_aircraft", t),
		value: `${G(n, t)}, ${G("wind_from", t)} ${We(e.bearing_deg, t)} (${r}°)`
	};
}
var pt = {
	normal: "#1e88e5",
	sport: "#fb8c00",
	cine: "#00acc1",
	manual: "#8d6e63",
	automatic: "#9e9e9e",
	goHome: "#e53935",
	attitude: "#fdd835",
	smart: "#8e24aa",
	other: "#78909c"
}, mt = [
	"normal",
	"sport",
	"cine",
	"manual",
	"automatic",
	"goHome",
	"attitude",
	"smart",
	"other"
];
function ht(e, t) {
	if (!e || e.length === 0) return {
		segments: [],
		legend: [],
		total: 0
	};
	let n = Math.max(e[e.length - 1].end, 1), r = (e) => e in pt ? G(`mode_${e}`, t) : e, i = /* @__PURE__ */ new Map();
	for (let t of e) i.set(t.category, (i.get(t.category) ?? 0) + Math.max(0, t.end - t.start));
	return {
		total: n,
		segments: e.map((e) => ({
			category: e.category,
			label: r(e.category),
			start: e.start,
			end: e.end,
			color: pt[e.category] ?? pt.other,
			share: Math.max(.004, Math.max(0, e.end - e.start) / n)
		})),
		legend: [...i].filter(([, e]) => e > 0).sort((e, t) => mt.indexOf(e[0]) - mt.indexOf(t[0])).map(([e, t]) => ({
			category: e,
			label: r(e),
			seconds: t,
			color: pt[e] ?? pt.other
		}))
	};
}
// node_modules/uplot/dist/uPlot.esm.js
var K = !0, gt = "uplot", _t = "u-hz", vt = "u-vt", yt = "u-title", bt = "u-wrap", q = "u-under", xt = "u-over", St = "u-axis", Ct = "u-off", wt = "u-select", Tt = "u-cursor-x", Et = "u-cursor-y", Dt = "u-cursor-pt", Ot = "u-legend", kt = "u-live", At = "u-inline", jt = "u-series", Mt = "u-marker", Nt = "u-label", Pt = "u-value", Ft = "width", It = "height", Lt = "top", Rt = "bottom", zt = "left", Bt = "right", Vt = "#000", Ht = "#0000", J = "mousemove", Ut = "mousedown", Wt = "mouseup", Gt = "mouseenter", Kt = "mouseleave", qt = "dblclick", Jt = "resize", Yt = "scroll", Xt = "change", Zt = "dppxchange", Qt = "--", $t = typeof window < "u", en = $t ? document : null, tn = $t ? window : null, nn = $t ? navigator : null, Y, rn;
function an() {
	let e = devicePixelRatio;
	Y != e && (Y = e, rn && yn(Xt, rn, an), rn = matchMedia(`(min-resolution: ${Y - .001}dppx) and (max-resolution: ${Y + .001}dppx)`), vn(Xt, rn, an), tn.dispatchEvent(new CustomEvent(Zt)));
}
function on(e, t) {
	if (t != null) {
		let n = e.classList;
		!n.contains(t) && n.add(t);
	}
}
function X(e, t) {
	let n = e.classList;
	n.contains(t) && n.remove(t);
}
function sn(e, t, n) {
	e.style[t] = n + "px";
}
function cn(e, t, n, r) {
	let i = en.createElement(e);
	return t != null && on(i, t), n?.insertBefore(i, r), i;
}
function ln(e, t) {
	return cn("div", e, t);
}
var un = /* @__PURE__ */ new WeakMap();
function dn(e, t, n, r, i) {
	let a = "translate(" + t + "px," + n + "px)";
	a != un.get(e) && (e.style.transform = a, un.set(e, a), t < 0 || n < 0 || t > r || n > i ? on(e, Ct) : X(e, Ct));
}
var fn = /* @__PURE__ */ new WeakMap();
function pn(e, t, n) {
	let r = t + n;
	r != fn.get(e) && (fn.set(e, r), e.style.background = t, e.style.borderColor = n);
}
var mn = /* @__PURE__ */ new WeakMap();
function hn(e, t, n, r) {
	let i = t + "" + n;
	i != mn.get(e) && (mn.set(e, i), e.style.height = n + "px", e.style.width = t + "px", e.style.marginLeft = r ? -t / 2 + "px" : 0, e.style.marginTop = r ? -n / 2 + "px" : 0);
}
var gn = { passive: !0 }, _n = {
	...gn,
	capture: !0
};
function vn(e, t, n, r) {
	t.addEventListener(e, n, r ? _n : gn);
}
function yn(e, t, n, r) {
	t.removeEventListener(e, n, gn);
}
$t && an();
function bn(e, t, n, r) {
	let i;
	n ||= 0, r ||= t.length - 1;
	let a = r <= 2147483647;
	for (; r - n > 1;) i = a ? n + r >> 1 : Vn((n + r) / 2), t[i] < e ? n = i : r = i;
	return e - t[n] <= t[r] - e ? n : r;
}
function xn(e) {
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
var Sn = (e) => e != null, Cn = (e) => e != null && e > 0, wn = xn(Sn), Tn = xn(Cn);
function En(e, t, n, r = 0, i = !1) {
	let a = i ? Tn : wn, o = i ? Cn : Sn;
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
	return [s ?? Qn, c ?? -Qn];
}
function Dn(e, t, n, r) {
	let i = qn(e), a = qn(t);
	e == t && (i == -1 ? (e *= n, t /= n) : (e /= n, t *= n));
	let o = n == 10 ? Jn : Yn, s = i == 1 ? Vn : Un, c = a == 1 ? Un : Vn, l = s(o(Bn(e))), u = c(o(Bn(t))), d = Kn(n, l), f = Kn(n, u);
	return n == 10 && (l < 0 && (d = pr(d, -l)), u < 0 && (f = pr(f, -u))), r || n == 2 ? (e = d * i, t = f * a) : (e = fr(e, d), t = dr(t, f)), [e, t];
}
function On(e, t, n, r) {
	let i = Dn(e, t, n, r);
	return e == 0 && (i[0] = 0), t == 0 && (i[1] = 0), i;
}
var kn = .1, An = {
	mode: 3,
	pad: kn
}, jn = {
	pad: 0,
	soft: null,
	mode: 0
}, Mn = {
	min: jn,
	max: jn
};
function Nn(e, t, n, r) {
	return wr(n) ? Fn(e, t, n) : (jn.pad = n, jn.soft = r ? 0 : null, jn.mode = r ? 3 : 0, Fn(e, t, Mn));
}
function Z(e, t) {
	return e ?? t;
}
function Pn(e, t, n) {
	for (t = Z(t, 0), n = Z(n, e.length - 1); t <= n;) {
		if (e[t] != null) return !0;
		t++;
	}
	return !1;
}
function Fn(e, t, n) {
	let r = n.min, i = n.max, a = Z(r.pad, 0), o = Z(i.pad, 0), s = Z(r.hard, -Qn), c = Z(i.hard, Qn), l = Z(r.soft, Qn), u = Z(i.soft, -Qn), d = Z(r.mode, 0), f = Z(i.mode, 0), p = t - e, m = Jn(p), h = Gn(Bn(e), Bn(t)), g = Bn(Jn(h) - m);
	(p < 1e-24 || g > 10) && (p = 0, (e == 0 || t == 0) && (p = 1e-24, d == 2 && l != Qn && (a = 0), f == 2 && u != -Qn && (o = 0)));
	let _ = p || h || 1e3, v = Kn(10, Vn(Jn(_))), y = pr(fr(e - _ * (p == 0 ? e == 0 ? .1 : 1 : a), v / 10), 24), b = e >= l && (d == 1 || d == 3 && y <= l || d == 2 && y >= l) ? l : Qn, x = Gn(s, y < b && e >= b ? b : Wn(b, y)), S = pr(dr(t + _ * (p == 0 ? t == 0 ? .1 : 1 : o), v / 10), 24), C = t <= u && (f == 1 || f == 3 && S >= u || f == 2 && S <= u) ? u : -Qn, w = Wn(c, S > C && t <= C ? C : Gn(C, S));
	return x == w && x == 0 && (w = 100), [x, w];
}
var In = new Intl.NumberFormat($t ? nn.language : "en-US"), Ln = (e) => In.format(e), Rn = Math, zn = Rn.PI, Bn = Rn.abs, Vn = Rn.floor, Hn = Rn.round, Un = Rn.ceil, Wn = Rn.min, Gn = Rn.max, Kn = Rn.pow, qn = Rn.sign, Jn = Rn.log10, Yn = Rn.log2, Xn = (e, t = 1) => Rn.sinh(e) * t, Zn = (e, t = 1) => Rn.asinh(e / t), Qn = Infinity;
function $n(e) {
	return (Jn((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function er(e, t, n) {
	return Wn(Gn(e, t), n);
}
function tr(e) {
	return typeof e == "function";
}
function Q(e) {
	return tr(e) ? e : () => e;
}
var nr = () => {}, rr = (e) => e, ir = (e, t) => t, ar = (e) => null, or = (e) => !0, sr = (e, t) => e == t, cr = /\.\d*?(?=9{6,}|0{6,})/gm, lr = (e) => {
	if (xr(e) || mr.has(e)) return e;
	let t = `${e}`, n = t.match(cr);
	if (n == null) return e;
	let r = n[0].length - 1;
	if (t.indexOf("e-") != -1) {
		let [e, n] = t.split("e");
		return +`${lr(e)}e${n}`;
	}
	return pr(e, r);
};
function ur(e, t) {
	return lr(pr(lr(e / t)) * t);
}
function dr(e, t) {
	return lr(Un(lr(e / t)) * t);
}
function fr(e, t) {
	return lr(Vn(lr(e / t)) * t);
}
function pr(e, t = 0) {
	if (xr(e)) return e;
	let n = 10 ** t;
	return Hn(e * n * (1 + 2 ** -52)) / n;
}
var mr = /* @__PURE__ */ new Map();
function hr(e) {
	return (("" + e).split(".")[1] || "").length;
}
function gr(e, t, n, r) {
	let i = [], a = r.map(hr);
	for (let o = t; o < n; o++) {
		let t = Bn(o), n = pr(Kn(e, o), t);
		for (let s = 0; s < r.length; s++) {
			let c = e == 10 ? +`${r[s]}e${o}` : r[s] * n, l = (o >= 0 ? 0 : t) + (o >= a[s] ? 0 : a[s]), u = e == 10 ? c : pr(c, l);
			i.push(u), mr.set(u, l);
		}
	}
	return i;
}
var _r = {}, vr = [], yr = [null, null], br = Array.isArray, xr = Number.isInteger, Sr = (e) => e === void 0;
function Cr(e) {
	return typeof e == "string";
}
function wr(e) {
	let t = !1;
	if (e != null) {
		let n = e.constructor;
		t = n == null || n == Object;
	}
	return t;
}
function Tr(e) {
	return typeof e == "object" && !!e;
}
var Er = Object.getPrototypeOf(Uint8Array), Dr = "__proto__";
function Or(e, t = wr) {
	let n;
	if (br(e)) {
		let r = e.find((e) => e != null);
		if (br(r) || t(r)) {
			n = Array(e.length);
			for (let r = 0; r < e.length; r++) n[r] = Or(e[r], t);
		} else n = e.slice();
	} else if (e instanceof Er) n = e.slice();
	else if (t(e)) {
		n = {};
		for (let r in e) r != Dr && (n[r] = Or(e[r], t));
	} else n = e;
	return n;
}
function kr(e) {
	let t = arguments;
	for (let n = 1; n < t.length; n++) {
		let r = t[n];
		for (let t in r) t != Dr && (wr(e[t]) ? kr(e[t], Or(r[t])) : e[t] = Or(r[t]));
	}
	return e;
}
var Ar = 0, jr = 1, Mr = 2;
function Nr(e, t, n) {
	for (let r = 0, i, a = -1; r < t.length; r++) {
		let o = t[r];
		if (o > a) {
			for (i = o - 1; i >= 0 && e[i] == null;) e[i--] = null;
			for (i = o + 1; i < n && e[i] == null;) e[a = i++] = null;
		}
	}
}
function Pr(e, t) {
	if (Lr(e)) {
		let t = e[0].slice();
		for (let n = 1; n < e.length; n++) t.push(...e[n].slice(1));
		return Rr(t[0]) || (t = Ir(t)), t;
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
			let c = o[e], l = Array(i).fill(void 0), u = t ? t[n][e] : jr, d = [];
			for (let e = 0; e < c.length; e++) {
				let t = c[e], n = a.get(s[e]);
				t === null ? u != Ar && (l[n] = t, u == Mr && d.push(n)) : l[n] = t;
			}
			Nr(l, d, i), r.push(l);
		}
	}
	return r;
}
var Fr = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Ir(e) {
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
function Lr(e) {
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
function Rr(e, t = 100) {
	let n = e.length;
	if (n <= 1) return !0;
	let r = 0, i = n - 1;
	for (; r <= i && e[r] == null;) r++;
	for (; i >= r && e[i] == null;) i--;
	if (i <= r) return !0;
	let a = Gn(1, Vn((i - r + 1) / t));
	for (let t = e[r], n = r + a; n <= i; n += a) {
		let r = e[n];
		if (r != null) {
			if (r <= t) return !1;
			t = r;
		}
	}
	return !0;
}
var zr = [
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
], Br = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
function Vr(e) {
	return e.slice(0, 3);
}
var Hr = Br.map(Vr), Ur = {
	MMMM: zr,
	MMM: zr.map(Vr),
	WWWW: Br,
	WWW: Hr
};
function Wr(e) {
	return (e < 10 ? "0" : "") + e;
}
function Gr(e) {
	return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
var Kr = {
	YYYY: (e) => e.getFullYear(),
	YY: (e) => (e.getFullYear() + "").slice(2),
	MMMM: (e, t) => t.MMMM[e.getMonth()],
	MMM: (e, t) => t.MMM[e.getMonth()],
	MM: (e) => Wr(e.getMonth() + 1),
	M: (e) => e.getMonth() + 1,
	DD: (e) => Wr(e.getDate()),
	D: (e) => e.getDate(),
	WWWW: (e, t) => t.WWWW[e.getDay()],
	WWW: (e, t) => t.WWW[e.getDay()],
	HH: (e) => Wr(e.getHours()),
	H: (e) => e.getHours(),
	h: (e) => {
		let t = e.getHours();
		return t == 0 ? 12 : t > 12 ? t - 12 : t;
	},
	AA: (e) => e.getHours() >= 12 ? "PM" : "AM",
	aa: (e) => e.getHours() >= 12 ? "pm" : "am",
	a: (e) => e.getHours() >= 12 ? "p" : "a",
	mm: (e) => Wr(e.getMinutes()),
	m: (e) => e.getMinutes(),
	ss: (e) => Wr(e.getSeconds()),
	s: (e) => e.getSeconds(),
	fff: (e) => Gr(e.getMilliseconds())
};
function qr(e, t) {
	t ||= Ur;
	let n = [], r = /\{([a-z]+)\}|[^{]+/gi, i;
	for (; i = r.exec(e);) n.push(i[0][0] == "{" ? Kr[i[1]] : i[0]);
	return (e) => {
		let r = "";
		for (let i = 0; i < n.length; i++) r += typeof n[i] == "string" ? n[i] : n[i](e, t);
		return r;
	};
}
var Jr = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Yr(e, t) {
	let n;
	return t == "UTC" || t == "Etc/UTC" ? n = /* @__PURE__ */ new Date(+e + e.getTimezoneOffset() * 6e4) : t == Jr ? n = e : (n = new Date(e.toLocaleString("en-US", { timeZone: t })), n.setMilliseconds(e.getMilliseconds())), n;
}
var Xr = (e) => e % 1 == 0, Zr = [
	1,
	2,
	2.5,
	5
], Qr = gr(10, -32, 0, Zr), $r = gr(10, 0, 32, Zr), ei = $r.filter(Xr), ti = Qr.concat($r), ni = "\n", ri = "{YYYY}", ii = ni + ri, ai = "{M}/{D}", oi = ni + ai, si = oi + "/{YY}", ci = "{aa}", li = "{h}:{mm}" + ci, ui = ni + li, di = ":{ss}", $ = null;
function fi(e) {
	let t = e * 1e3, n = t * 60, r = n * 60, i = r * 24, a = i * 30, o = i * 365, s = (e == 1 ? gr(10, 0, 3, Zr).filter(Xr) : gr(10, -3, 0, Zr)).concat([
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
			ri,
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
			ii,
			$,
			$,
			$,
			$,
			$,
			1
		],
		[
			i,
			ai,
			ii,
			$,
			$,
			$,
			$,
			$,
			1
		],
		[
			r,
			"{h}" + ci,
			si,
			$,
			oi,
			$,
			$,
			$,
			1
		],
		[
			n,
			li,
			si,
			$,
			oi,
			$,
			$,
			$,
			1
		],
		[
			t,
			di,
			si + " " + li,
			$,
			oi + " " + li,
			$,
			ui,
			$,
			1
		],
		[
			e,
			di + ".{fff}",
			si + " " + li,
			$,
			oi + " " + li,
			$,
			ui,
			$,
			1
		]
	];
	function l(t) {
		return (s, c, l, u, d, f) => {
			let p = [], m = d >= o, h = d >= a && d < o, g = t(l), _ = pr(g * e, 3), v = Si(g.getFullYear(), m ? 0 : g.getMonth(), h || m ? 1 : g.getDate()), y = pr(v * e, 3);
			if (h || m) {
				let n = h ? d / a : 0, r = m ? d / o : 0, i = _ == y ? _ : pr(Si(v.getFullYear() + r, v.getMonth() + n, 1) * e, 3), s = new Date(Hn(i / e)), c = s.getFullYear(), l = s.getMonth();
				for (let a = 0; i <= u; a++) {
					let o = Si(c + r * a, l + n * a, 1), s = o - t(pr(o * e, 3));
					i = pr((+o + s) * e, 3), i <= u && p.push(i);
				}
			} else {
				let a = d >= i ? i : d, o = y + (Vn(l) - Vn(_)) + dr(_ - y, a);
				p.push(o);
				let m = t(o), h = m.getHours() + m.getMinutes() / n + m.getSeconds() / r, g = d / r, v = f / s.axes[c]._space;
				for (; o = pr(o + d, e == 1 ? 0 : 3), !(o > u);) if (g > 1) {
					let e = Vn(pr(h + g, 6)) % 24, n = t(o).getHours() - e;
					n > 1 && (n = -1), o -= n * r, h = (h + g) % 24;
					let i = p[p.length - 1];
					pr((o - i) / d, 3) * v >= .7 && p.push(o);
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
var [pi, mi, hi] = fi(1), [gi, _i, vi] = fi(.001);
gr(2, -53, 53, [1]);
function yi(e, t) {
	return e.map((e) => e.map((n, r) => r == 0 || r == 8 || n == null ? n : t(r == 1 || e[8] == 0 ? n : e[1] + n)));
}
function bi(e, t) {
	return (n, r, i, a, o) => {
		let s = t.find((e) => o >= e[0]) || t[t.length - 1], c, l, u, d, f, p;
		return r.map((t) => {
			let n = e(t), r = n.getFullYear(), i = n.getMonth(), a = n.getDate(), o = n.getHours(), m = n.getMinutes(), h = n.getSeconds(), g = r != c && s[2] || i != l && s[3] || a != u && s[4] || o != d && s[5] || m != f && s[6] || h != p && s[7] || s[1];
			return c = r, l = i, u = a, d = o, f = m, p = h, g(n);
		});
	};
}
function xi(e, t) {
	let n = qr(t);
	return (t, r, i, a, o) => r.map((t) => n(e(t)));
}
function Si(e, t, n) {
	return new Date(e, t, n);
}
function Ci(e, t) {
	return t(e);
}
var wi = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function Ti(e, t) {
	return (n, r, i, a) => a == null ? Qt : t(e(r));
}
function Ei(e, t) {
	let n = e.series[t];
	return n.width ? n.stroke(e, t) : n.points.width ? n.points.stroke(e, t) : null;
}
function Di(e, t) {
	return e.series[t].fill(e, t);
}
var Oi = {
	show: !0,
	live: !0,
	isolate: !1,
	mount: nr,
	markers: {
		show: !0,
		width: 2,
		stroke: Ei,
		fill: Di,
		dash: "solid"
	},
	idx: null,
	idxs: null,
	values: []
};
function ki(e, t) {
	let n = e.cursor.points, r = ln(), i = n.size(e, t);
	sn(r, Ft, i), sn(r, It, i);
	let a = i / -2;
	sn(r, "marginLeft", a), sn(r, "marginTop", a);
	let o = n.width(e, t, i);
	return o && sn(r, "borderWidth", o), r;
}
function Ai(e, t) {
	let n = e.series[t].points;
	return n._fill || n._stroke;
}
function ji(e, t) {
	let n = e.series[t].points;
	return n._stroke || n._fill;
}
function Mi(e, t) {
	return e.series[t].points.size;
}
var Ni = [0, 0];
function Pi(e, t, n) {
	return Ni[0] = t, Ni[1] = n, Ni;
}
function Fi(e, t, n, r = !0) {
	return (e) => {
		e.button != 0 || r && e.target != t || n(e);
	};
}
function Ii(e, t, n, r = !0) {
	return (e) => {
		r && e.target != t || n(e);
	};
}
var Li = {
	show: !0,
	x: !0,
	y: !0,
	lock: !1,
	move: Pi,
	points: {
		one: !1,
		show: ki,
		size: Mi,
		width: 0,
		stroke: ji,
		fill: Ai
	},
	bind: {
		mousedown: Fi,
		mouseup: Fi,
		click: Fi,
		dblclick: Fi,
		mousemove: Ii,
		mouseleave: Ii,
		mouseenter: Ii
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
}, Ri = {
	show: !0,
	stroke: "rgba(0,0,0,0.07)",
	width: 2
}, zi = kr({}, Ri, { filter: ir }), Bi = kr({}, zi, { size: 10 }), Vi = kr({}, Ri, { show: !1 }), Hi = "12px system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"", Ui = "bold " + Hi, Wi = 1.5, Gi = {
	show: !0,
	scale: "x",
	stroke: Vt,
	space: 50,
	gap: 5,
	alignTo: 1,
	size: 50,
	labelGap: 0,
	labelSize: 30,
	labelFont: Ui,
	side: 2,
	grid: zi,
	ticks: Bi,
	border: Vi,
	font: Hi,
	lineGap: Wi,
	rotate: 0
}, Ki = "Value", qi = "Time", Ji = {
	show: !0,
	scale: "x",
	auto: !1,
	sorted: 1,
	min: Qn,
	max: -Infinity,
	idxs: []
};
function Yi(e, t, n, r, i) {
	return t.map((e) => e == null ? "" : Ln(e));
}
function Xi(e, t, n, r, i, a, o) {
	let s = [], c = mr.get(i) || 0;
	n = o ? n : pr(dr(n, i), c);
	for (let e = n; e <= r; e = pr(e + i, c)) s.push(Object.is(e, -0) ? 0 : e);
	return s;
}
function Zi(e, t, n, r, i, a, o) {
	let s = [], c = e.scales[e.axes[t].scale].log;
	i = Kn(c, Vn((c == 10 ? Jn : Yn)(n))), c == 10 && (i = ti[bn(i, ti)]);
	let l = n, u = i * c;
	c == 10 && (u = ti[bn(u, ti)]);
	do
		s.push(l), l += i, c == 10 && !mr.has(l) && (l = pr(l, mr.get(i))), l >= u && (i = l, u = i * c, c == 10 && (u = ti[bn(u, ti)]));
	while (l <= r);
	return s;
}
function Qi(e, t, n, r, i, a, o) {
	let s = e.scales[e.axes[t].scale].asinh, c = r > s ? Zi(e, t, Gn(s, n), r, i) : [s], l = r >= 0 && n <= 0 ? [0] : [];
	return (n < -s ? Zi(e, t, Gn(s, -r), -n, i) : [s]).reverse().map((e) => -e).concat(l, c);
}
var $i = /./, ea = /[12357]/, ta = /[125]/, na = /1/, ra = (e, t, n, r) => e.map((e, i) => t == 4 && e == 0 || i % r == 0 && n.test(e.toExponential()[+(e < 0)]) ? e : null);
function ia(e, t, n, r, i) {
	let a = e.axes[n], o = a.scale, s = e.scales[o], c = e.valToPos, l = a._space, u = c(10, o), d = c(9, o) - u >= l ? $i : c(7, o) - u >= l ? ea : c(5, o) - u >= l ? ta : na;
	if (d == na) {
		let e = Bn(c(1, o) - u);
		if (e < l) return ra(t.slice().reverse(), s.distr, d, Un(l / e)).reverse();
	}
	return ra(t, s.distr, d, 1);
}
function aa(e, t, n, r, i) {
	let a = e.axes[n], o = a.scale, s = a._space, c = e.valToPos, l = Bn(c(1, o) - c(2, o));
	return l < s ? ra(t.slice().reverse(), 3, $i, Un(s / l)).reverse() : t;
}
function oa(e, t, n, r) {
	return r == null ? Qt : t == null ? "" : Ln(t);
}
var sa = {
	show: !0,
	scale: "y",
	stroke: Vt,
	space: 30,
	gap: 5,
	alignTo: 1,
	size: 50,
	labelGap: 0,
	labelSize: 30,
	labelFont: Ui,
	side: 3,
	grid: zi,
	ticks: Bi,
	border: Vi,
	font: Hi,
	lineGap: Wi,
	rotate: 0
};
function ca(e, t) {
	return pr((3 + (e || 1) * 2) * t, 3);
}
function la(e, t) {
	let { scale: n, idxs: r } = e.series[0], i = e._data[0], a = e.valToPos(i[r[0]], n, !0), o = Bn(e.valToPos(i[r[1]], n, !0) - a) / (e.series[t].points.space * Y);
	return r[1] - r[0] <= o;
}
var ua = {
	scale: null,
	auto: !0,
	sorted: 0,
	min: Qn,
	max: -Infinity
}, da = (e, t, n, r, i) => i, fa = {
	show: !0,
	auto: !0,
	sorted: 0,
	gaps: da,
	alpha: 1,
	facets: [kr({}, ua, { scale: "x" }), kr({}, ua, { scale: "y" })]
}, pa = {
	scale: "y",
	auto: !0,
	sorted: 0,
	show: !0,
	spanGaps: !1,
	gaps: da,
	alpha: 1,
	points: {
		show: la,
		filter: null
	},
	values: null,
	min: Qn,
	max: -Infinity,
	idxs: [],
	path: null,
	clip: null
};
function ma(e, t, n, r, i) {
	return n / 10;
}
var ha = {
	time: K,
	auto: !0,
	distr: 1,
	log: 10,
	asinh: 1,
	min: null,
	max: null,
	dir: 1,
	ori: 0
}, ga = kr({}, ha, {
	time: !1,
	ori: 1
}), _a = {};
function va(e, t) {
	let n = _a[e];
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
	}, e != null && (_a[e] = n)), n;
}
var ya = 1, ba = 2;
function xa(e, t, n) {
	let r = e.mode, i = e.series[t], a = r == 2 ? e._data[t] : e._data, o = e.scales, s = e.bbox, c = a[0], l = r == 2 ? a[1] : a[t], u = r == 2 ? o[i.facets[0].scale] : o[e.series[0].scale], d = r == 2 ? o[i.facets[1].scale] : o[i.scale], f = s.left, p = s.top, m = s.width, h = s.height, g = e.valToPosH, _ = e.valToPosV;
	return u.ori == 0 ? n(i, c, l, u, d, g, _, f, p, m, h, Aa, Ma, Pa, Ia, Ra) : n(i, c, l, u, d, _, g, p, f, h, m, ja, Na, Fa, La, za);
}
function Sa(e, t) {
	let n = 0, r = 0, i = Z(e.bands, vr);
	for (let e = 0; e < i.length; e++) {
		let a = i[e];
		a.series[0] == t ? n = a.dir : a.series[1] == t && (a.dir == 1 ? r |= 1 : r |= 2);
	}
	return [n, r == 1 ? -1 : r == 2 ? 1 : r == 3 ? 2 : 0];
}
function Ca(e, t, n, r, i) {
	let a = e.mode, o = e.series[t], s = a == 2 ? o.facets[1].scale : o.scale, c = e.scales[s];
	return i == -1 ? c.min : i == 1 ? c.max : c.distr == 3 ? c.dir == 1 ? c.min : c.max : 0;
}
function wa(e, t, n, r, i, a) {
	return xa(e, t, (e, t, o, s, c, l, u, d, f, p, m) => {
		let h = e.pxRound, g = s.dir * (s.ori == 0 ? 1 : -1), _ = s.ori == 0 ? Ma : Na, v, y;
		g == 1 ? (v = n, y = r) : (v = r, y = n);
		let b = h(l(t[v], s, p, d)), x = h(u(o[v], c, m, f)), S = h(l(t[y], s, p, d)), C = h(u(a == 1 ? c.max : c.min, c, m, f)), w = new Path2D(i);
		return _(w, S, C), _(w, b, C), _(w, b, x), w;
	});
}
function Ta(e, t, n, r, i, a) {
	let o = null;
	if (e.length > 0) {
		o = new Path2D();
		let s = t == 0 ? Pa : Fa, c = n;
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
function Ea(e, t, n) {
	let r = e[e.length - 1];
	r && r[0] == t ? r[1] = n : e.push([t, n]);
}
function Da(e, t, n, r, i, a, o) {
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
function Oa(e) {
	return e == 0 ? rr : e == 1 ? Hn : (t) => ur(t, e);
}
function ka(e) {
	let t = e == 0 ? Aa : ja, n = e == 0 ? (e, t, n, r, i, a) => {
		e.arcTo(t, n, r, i, a);
	} : (e, t, n, r, i, a) => {
		e.arcTo(n, t, i, r, a);
	}, r = e == 0 ? (e, t, n, r, i) => {
		e.rect(t, n, r, i);
	} : (e, t, n, r, i) => {
		e.rect(n, t, i, r);
	};
	return (e, i, a, o, s, c = 0, l = 0) => {
		c == 0 && l == 0 ? r(e, i, a, o, s) : (c = Wn(c, o / 2, s / 2), l = Wn(l, o / 2, s / 2), t(e, i + c, a), n(e, i + o, a, i + o, a + s, c), n(e, i + o, a + s, i, a + s, l), n(e, i, a + s, i, a, l), n(e, i, a, i + o, a, c), e.closePath());
	};
}
var Aa = (e, t, n) => {
	e.moveTo(t, n);
}, ja = (e, t, n) => {
	e.moveTo(n, t);
}, Ma = (e, t, n) => {
	e.lineTo(t, n);
}, Na = (e, t, n) => {
	e.lineTo(n, t);
}, Pa = ka(0), Fa = ka(1), Ia = (e, t, n, r, i, a) => {
	e.arc(t, n, r, i, a);
}, La = (e, t, n, r, i, a) => {
	e.arc(n, t, r, i, a);
}, Ra = (e, t, n, r, i, a, o) => {
	e.bezierCurveTo(t, n, r, i, a, o);
}, za = (e, t, n, r, i, a, o) => {
	e.bezierCurveTo(n, t, i, r, o, a);
};
function Ba(e) {
	return (e, t, n, r, i) => xa(e, t, (t, a, o, s, c, l, u, d, f, p, m) => {
		let { pxRound: h, points: g } = t, _, v;
		s.ori == 0 ? (_ = Aa, v = Ia) : (_ = ja, v = La);
		let y = pr(g.width * Y, 3), b = (g.size - g.width) / 2 * Y, x = pr(b * 2, 3), S = new Path2D(), C = new Path2D(), { left: w, top: T, width: E, height: D } = e.bbox;
		Pa(C, w - x, T - x, E + x * 2, D + x * 2);
		let O = (e) => {
			if (o[e] != null) {
				let t = h(l(a[e], s, p, d)), n = h(u(o[e], c, m, f));
				_(S, t + b, n), v(S, t, n, b, 0, zn * 2);
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
function Va(e) {
	return (t, n, r, i, a, o) => {
		r != i && (a != r && o != r && e(t, n, r), a != i && o != i && e(t, n, i), e(t, n, o));
	};
}
var Ha = Va(Ma), Ua = Va(Na);
function Wa(e) {
	let t = Z(e?.alignGaps, 0);
	return (e, n, r, i) => xa(e, n, (a, o, s, c, l, u, d, f, p, m, h) => {
		[r, i] = wn(s, r, i);
		let g = a.pxRound, _ = (e) => g(u(e, c, m, f)), v = (e) => g(d(e, l, h, p)), y, b;
		c.ori == 0 ? (y = Ma, b = Ha) : (y = Na, b = Ua);
		let x = c.dir * (c.ori == 0 ? 1 : -1), S = {
			stroke: new Path2D(),
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: ya
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
		let [T, E] = Sa(e, n);
		if (a.fill != null || T != 0) {
			let t = S.fill = new Path2D(C), s = v(a.fillTo(e, n, a.min, a.max, T)), c = _(o[r]), l = _(o[i]);
			x == -1 && ([l, c] = [c, l]), y(t, l, s), y(t, c, s);
		}
		if (!a.spanGaps) {
			let l = [];
			w && l.push(...Da(o, s, r, i, x, _, t)), S.gaps = l = a.gaps(e, n, r, i, l), S.clip = Ta(l, c.ori, f, p, m, h);
		}
		return E != 0 && (S.band = E == 2 ? [wa(e, n, r, i, C, -1), wa(e, n, r, i, C, 1)] : wa(e, n, r, i, C, E)), S;
	});
}
function Ga(e) {
	let t = Z(e.align, 1), n = Z(e.ascDesc, !1), r = Z(e.alignGaps, 0), i = Z(e.extend, !1);
	return (e, a, o, s) => xa(e, a, (c, l, u, d, f, p, m, h, g, _, v) => {
		[o, s] = wn(u, o, s);
		let y = c.pxRound, { left: b, width: x } = e.bbox, S = (e) => y(p(e, d, _, h)), C = (e) => y(m(e, f, v, g)), w = d.ori == 0 ? Ma : Na, T = {
			stroke: new Path2D(),
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: ya
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
		let [ne, j] = Sa(e, a);
		if (c.fill != null || ne != 0) {
			let t = T.fill = new Path2D(E), n = C(c.fillTo(e, a, c.min, c.max, ne));
			w(t, A, n), w(t, k, n);
		}
		if (!c.spanGaps) {
			let i = [];
			i.push(...Da(l, u, o, s, D, S, r));
			let f = c.width * Y / 2, p = n || t == 1 ? f : -f, m = n || t == -1 ? -f : f;
			i.forEach((e) => {
				e[0] += p, e[1] += m;
			}), T.gaps = i = c.gaps(e, a, o, s, i), T.clip = Ta(i, d.ori, h, g, _, v);
		}
		return j != 0 && (T.band = j == 2 ? [wa(e, a, o, s, E, -1), wa(e, a, o, s, E, 1)] : wa(e, a, o, s, E, j)), T;
	});
}
function Ka(e, t, n, r, i, a, o = Qn) {
	if (e.length > 1) {
		let s = null;
		for (let c = 0, l = Infinity; c < e.length; c++) if (t[c] !== void 0) {
			if (s != null) {
				let t = Bn(e[c] - e[s]);
				t < l && (l = t, o = Bn(n(e[c], r, i, a) - n(e[s], r, i, a)));
			}
			s = c;
		}
	}
	return o;
}
function qa(e) {
	e ||= _r;
	let t = Z(e.size, [
		.6,
		Qn,
		1
	]), n = e.align || 0, r = e.gap || 0, i = e.radius;
	i = i == null ? [0, 0] : typeof i == "number" ? [i, 0] : i;
	let a = Q(i), o = 1 - t[0], s = Z(t[1], Qn), c = Z(t[2], 1), l = Z(e.disp, _r), u = Z(e.each, (e) => {}), { fill: d, stroke: f } = l;
	return (e, t, i, p) => xa(e, t, (m, h, g, _, v, y, b, x, S, C, w) => {
		let T = m.pxRound, E = n, D = r * Y, O = s * Y, ee = c * Y, te, k;
		_.ori == 0 ? [te, k] = a(e, t) : [k, te] = a(e, t);
		let A = _.dir * (_.ori == 0 ? 1 : -1), ne = _.ori == 0 ? Pa : Fa, j = _.ori == 0 ? u : (e, t, n, r, i, a, o) => {
			u(e, t, n, i, r, o, a);
		}, M = Z(e.bands, vr).find((e) => e.series[0] == t), re = M == null ? 0 : M.dir, ie = m.fillTo(e, t, m.min, m.max, re), N = T(b(ie, v, w, S)), P, F, I, R = C, z = T(m.width * Y), ae = !1, oe = null, se = null, ce = null, le = null;
		d != null && (z == 0 || f != null) && (ae = !0, oe = d.values(e, t, i, p), se = /* @__PURE__ */ new Map(), new Set(oe).forEach((e) => {
			e != null && se.set(e, new Path2D());
		}), z > 0 && (ce = f.values(e, t, i, p), le = /* @__PURE__ */ new Map(), new Set(ce).forEach((e) => {
			e != null && le.set(e, new Path2D());
		})));
		let { x0: ue, size: de } = l;
		if (ue != null && de != null) {
			E = 1, h = ue.values(e, t, i, p), ue.unit == 2 && (h = h.map((t) => e.posToVal(x + t * C, _.key, !0)));
			let n = de.values(e, t, i, p);
			F = de.unit == 2 ? n[0] * C : y(n[0], _, C, x) - y(0, _, C, x), R = Ka(h, g, y, _, C, x, R), I = R - F + D;
		} else R = Ka(h, g, y, _, C, x, R), I = R * o + D, F = R - I;
		I < 1 && (I = 0), z >= F / 2 && (z = 0), I < 5 && (T = rr);
		let fe = I > 0, pe = R - I - (fe ? z : 0);
		F = T(er(pe, ee, O)), P = (E == 0 ? F / 2 : E == A ? 0 : F) - E * A * ((E == 0 ? D / 2 : 0) + (fe ? z / 2 : 0));
		let me = {
			stroke: null,
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: 0
		}, B = ae ? null : new Path2D(), he = null;
		if (M != null) he = e.data[M.series[1]];
		else {
			let { y0: n, y1: r } = l;
			n != null && r != null && (g = r.values(e, t, i, p), he = n.values(e, t, i, p));
		}
		let V = te * F, ge = k * F;
		for (let n = A == 1 ? i : p; n >= i && n <= p; n += A) {
			let r = g[n];
			if (r == null) continue;
			if (he != null) {
				let e = he[n] ?? 0;
				if (r - e == 0) continue;
				N = b(e, v, w, S);
			}
			let i = y(_.distr != 2 || l != null ? h[n] : n, _, C, x), a = b(Z(r, ie), v, w, S), o = T(i - P), s = T(Gn(a, N)), c = T(Wn(a, N)), u = s - c;
			if (r != null) {
				let i = r < 0 ? ge : V, a = r < 0 ? V : ge;
				ae ? (z > 0 && ce[n] != null && ne(le.get(ce[n]), o, c + Vn(z / 2), F, Gn(0, u - z), i, a), oe[n] != null && ne(se.get(oe[n]), o, c + Vn(z / 2), F, Gn(0, u - z), i, a)) : ne(B, o, c + Vn(z / 2), F, Gn(0, u - z), i, a), j(e, t, n, o - z / 2, c, F + z, u);
			}
		}
		return z > 0 ? me.stroke = ae ? le : B : ae || (me._fill = m.width == 0 ? m._fill : m._stroke ?? m._fill, me.width = 0), me.fill = ae ? se : B, me;
	});
}
function Ja(e, t) {
	let n = Z(t?.alignGaps, 0);
	return (t, r, i, a) => xa(t, r, (o, s, c, l, u, d, f, p, m, h, g) => {
		[i, a] = wn(c, i, a);
		let _ = o.pxRound, v = (e) => _(d(e, l, h, p)), y = (e) => _(f(e, u, g, m)), b, x, S;
		l.ori == 0 ? (b = Aa, S = Ma, x = Ra) : (b = ja, S = Na, x = za);
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
			flags: ya
		}, ee = O.stroke, [te, k] = Sa(t, r);
		if (o.fill != null || te != 0) {
			let e = O.fill = new Path2D(ee), n = y(o.fillTo(t, r, o.min, o.max, te));
			S(e, T, n), S(e, w, n);
		}
		if (!o.spanGaps) {
			let e = [];
			e.push(...Da(s, c, i, a, C, v, n)), O.gaps = e = o.gaps(t, r, i, a, e), O.clip = Ta(e, l.ori, p, m, h, g);
		}
		return k != 0 && (O.band = k == 2 ? [wa(t, r, i, a, ee, -1), wa(t, r, i, a, ee, 1)] : wa(t, r, i, a, ee, k)), O;
	});
}
function Ya(e) {
	return Ja(Xa, e);
}
function Xa(e, t, n, r, i, a) {
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
var Za = /* @__PURE__ */ new Set();
function Qa() {
	for (let e of Za) e.syncRect(!0);
}
$t && (vn(Jt, tn, Qa), vn(Yt, tn, Qa, !0), vn(Zt, tn, () => {
	ho.pxRatio = Y;
}));
var $a = Wa(), eo = Ba();
function to(e, t, n, r) {
	return (r ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((e, r) => ro(e, r, t, n));
}
function no(e, t) {
	return e.map((e, n) => n == 0 ? {} : kr({}, t, e));
}
function ro(e, t, n, r) {
	return kr({}, t == 0 ? n : r, e);
}
function io(e, t, n) {
	return t == null ? yr : [t, n];
}
var ao = io;
function oo(e, t, n) {
	return t == null ? yr : Nn(t, n, kn, !0);
}
function so(e, t, n, r) {
	return t == null ? yr : Dn(t, n, e.scales[r].log, !1);
}
var co = so;
function lo(e, t, n, r) {
	return t == null ? yr : On(t, n, e.scales[r].log, !1);
}
var uo = lo;
function fo(e, t, n, r, i) {
	let a = Gn($n(e), $n(t)), o = t - e, s = bn(i / r * o, n);
	do {
		let e = n[s], t = r * e / o;
		if (t >= i && a + (e < 5 ? mr.get(e) : 0) <= 17) return [e, t];
	} while (++s < n.length);
	return [0, 0];
}
function po(e) {
	let t, n;
	return e = e.replace(/(\d+)px/, (e, r) => (t = Hn((n = +r) * Y)) + "px"), [
		e,
		t,
		n
	];
}
function mo(e) {
	e.show && [e.font, e.labelFont].forEach((e) => {
		let t = pr(e[2] * Y, 1);
		e[0] = e[0].replace(/[0-9.]+px/, t + "px"), e[1] = t;
	});
}
function ho(e, t, n) {
	let r = { mode: Z(e.mode, 1) }, i = r.mode;
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
	let l = r.root = ln(gt);
	if (e.id != null && (l.id = e.id), on(l, e.class), e.title) {
		let t = ln(yt, l);
		t.textContent = e.title;
	}
	let u = cn("canvas"), d = r.ctx = u.getContext("2d"), f = ln(bt, l);
	vn("click", f, (e) => {
		e.target === m && (Mr != Er || Nr != Dr) && Ir.click(r, e);
	}, !0);
	let p = r.under = ln(q, f);
	f.appendChild(u);
	let m = r.over = ln(xt, f);
	e = Or(e);
	let h = +Z(e.pxAlign, 1), g = Oa(h);
	(e.plugins || []).forEach((t) => {
		t.opts && (e = t.opts(r, e) || e);
	});
	let _ = e.ms || .001, v = r.series = i == 1 ? to(e.series || [], Ji, pa, !1) : no(e.series || [null], fa), y = r.axes = to(e.axes || [], Gi, sa, !0), b = r.scales = {}, x = r.bands = e.bands || [];
	x.forEach((e) => {
		e.fill = Q(e.fill || null), e.dir = Z(e.dir, -1);
	});
	let S = i == 2 ? v[1].facets[0].scale : v[0].scale, C = {
		axes: Fn,
		series: fn
	}, w = (e.drawOrder || ["axes", "series"]).map((e) => C[e]);
	function T(e) {
		let t = e.distr == 3 ? (t) => Jn(t > 0 ? t : e.clamp(r, t, e.min, e.max, e.key)) : e.distr == 4 ? (t) => Zn(t, e.asinh) : e.distr == 100 ? (t) => e.fwd(t) : (e) => e;
		return (n) => {
			let r = t(n), { _min: i, _max: a } = e, o = a - i;
			return (r - i) / o;
		};
	}
	function E(t) {
		let n = b[t];
		if (n == null) {
			let r = (e.scales || _r)[t] || _r;
			if (r.from != null) {
				E(r.from);
				let e = kr({}, b[r.from], r, { key: t });
				e.valToPct = T(e), b[t] = e;
			} else {
				n = b[t] = kr({}, t == S ? ha : ga, r), n.key = t;
				let e = n.time, a = n.range, o = br(a);
				if ((t != S || i == 2 && !e) && (o && (a[0] == null || a[1] == null) && (a = {
					min: a[0] == null ? An : {
						mode: 1,
						hard: a[0],
						soft: a[0]
					},
					max: a[1] == null ? An : {
						mode: 1,
						hard: a[1],
						soft: a[1]
					}
				}, o = !1), !o && wr(a))) {
					let e = a;
					a = (t, n, r) => n == null ? yr : Nn(n, r, e);
				}
				n.range = Q(a || (e ? ao : t == S ? n.distr == 3 ? co : n.distr == 4 ? uo : io : n.distr == 3 ? so : n.distr == 4 ? lo : oo)), n.auto = Q(!o && n.auto), n.clamp = Q(n.clamp || ma), n._min = n._max = null, n.valToPct = T(n);
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
	D.ori == 0 ? (on(l, _t), ee = a, te = o) : (on(l, vt), ee = o, te = a);
	let k = {};
	for (let e in b) {
		let t = b[e];
		(t.min != null || t.max != null) && (k[e] = {
			min: t.min,
			max: t.max
		}, t.min = t.max = null);
	}
	let A = e.tzDate || ((e) => new Date(Hn(e / _))), ne = e.fmtDate || qr, j = _ == 1 ? hi(A) : vi(A), M = bi(A, yi(_ == 1 ? mi : _i, ne)), re = Ti(A, Ci(wi, ne)), ie = [], N = r.legend = kr({}, Oi, e.legend), P = r.cursor = kr({}, Li, { drag: { y: i == 2 } }, e.cursor), F = N.show, I = P.show, R = N.markers;
	N.idxs = ie, R.width = Q(R.width), R.dash = Q(R.dash), R.stroke = Q(R.stroke), R.fill = Q(R.fill);
	let z, ae, oe, se = [], ce = [], le, ue = !1, de = {};
	if (N.live) {
		let e = v[1] ? v[1].values : null;
		ue = e != null, le = ue ? e(r, 1, 0) : { _: 0 };
		for (let e in le) de[e] = Qt;
	}
	if (F) {
		if (z = cn("table", Ot, l), oe = cn("tbody", null, z), N.mount(r, z), ue) {
			ae = cn("thead", null, z, oe);
			let e = cn("tr", null, ae);
			for (var fe in cn("th", null, e), le) cn("th", Nt, e).textContent = fe;
		} else on(z, At), N.live && on(z, kt);
	}
	let pe = { show: !0 }, me = { show: !1 };
	function B(e, t) {
		if (t == 0 && (ue || !N.live || i == 2)) return yr;
		let n = [], a = cn("tr", jt, oe, oe.childNodes[t]);
		on(a, e.class), e.show || on(a, Ct);
		let o = cn("th", null, a);
		if (R.show) {
			let e = ln(Mt, o);
			if (t > 0) {
				let n = R.width(r, t);
				n && (e.style.border = n + "px " + R.dash(r, t) + " " + R.stroke(r, t)), e.style.background = R.fill(r, t);
			}
		}
		let s = ln(Nt, o);
		for (var c in e.label instanceof HTMLElement ? s.appendChild(e.label) : s.textContent = e.label, t > 0 && (R.show || (s.style.color = e.width > 0 ? R.stroke(r, t) : R.fill(r, t)), V("click", o, (t) => {
			if (P._lock) return;
			Ve(t);
			let n = v.indexOf(e);
			if ((t.ctrlKey || t.metaKey) != N.isolate) {
				let e = v.some((e, t) => t > 0 && t != n && e.show);
				v.forEach((t, r) => {
					r > 0 && Wr(r, e ? r == n ? pe : me : pe, !0, $i.setSeries);
				});
			} else Wr(n, { show: !e.show }, !0, $i.setSeries);
		}, !1), We && V(Gt, o, (t) => {
			P._lock || (Ve(t), Wr(v.indexOf(e), $r, !0, $i.setSeries));
		}, !1)), le) {
			let e = cn("td", Pt, a);
			e.textContent = "--", n.push(e);
		}
		return [a, n];
	}
	let he = /* @__PURE__ */ new Map();
	function V(e, t, n, i = !0) {
		let a = he.get(t) || {}, o = P.bind[e](r, t, n, i);
		o && (vn(e, t, a[e] = o), he.set(t, a));
	}
	function ge(e, t, n) {
		let r = he.get(t) || {};
		for (let n in r) (e == null || n == e) && (yn(n, t, r[n]), delete r[n]);
		e ?? he.delete(t);
	}
	let _e = 0, ve = 0, H = 0, U = 0, ye = 0, be = 0, xe = ye, Se = be, Ce = H, we = U, Te = 0, Ee = 0, De = 0, Oe = 0;
	r.bbox = {};
	let ke = !1, Ae = !1, je = !1, Me = !1, Ne = !1, Pe = !1;
	function Fe(e, t, n) {
		(n || e != r.width || t != r.height) && Ie(e, t), In(!1), je = !0, Ae = !0, Yn();
	}
	function Ie(e, t) {
		r.width = _e = H = e, r.height = ve = U = t, ye = be = 0, ze(), Be();
		let n = r.bbox;
		Te = n.left = ur(ye * Y, .5), Ee = n.top = ur(be * Y, .5), De = n.width = ur(H * Y, .5), Oe = n.height = ur(U * Y, .5);
	}
	function Le() {
		let e = !1, t = 0;
		for (; !e;) {
			t++;
			let n = jn(t), i = Mn(t);
			e = t == 3 || n && i, e || (Ie(r.width, r.height), Ae = !0);
		}
	}
	function Re({ width: e, height: t }) {
		Fe(e, t);
	}
	r.setSize = Re;
	function ze() {
		let e = !1, t = !1, n = !1, r = !1;
		y.forEach((i, a) => {
			if (i.show && i._show) {
				let { side: a, _size: o } = i, s = a % 2, c = o + (i.label == null ? 0 : i.labelSize);
				c > 0 && (s ? (H -= c, a == 3 ? (ye += c, r = !0) : n = !0) : (U -= c, a == 0 ? (be += c, e = !0) : t = !0));
			}
		}), Ze[0] = e, Ze[1] = n, Ze[2] = t, Ze[3] = r, H -= tt[1] + tt[3], ye += tt[3], U -= tt[2] + tt[0], be += tt[0];
	}
	function Be() {
		let e = ye + H, t = be + U, n = ye, r = be;
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
		let r = e.prox = Q(e.prox), i = e.bias ??= 0;
		P.dataIdx = (e, a, o, s) => {
			if (a == 0) return o;
			let c = o, l = r(e, a, o, s) ?? Qn, u = l >= 0 && l < Qn, d = D.ori == 0 ? H : U, f = P.left, p = t[0], m = t[a];
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
			} else u && Bn(f - ee(p[o], D, d, 0)) > l && (c = null);
			return c;
		};
	}
	let Ve = (e) => {
		P.event = e;
	};
	P.idxs = ie, P._lock = !1;
	let He = P.points;
	He.show = Q(He.show), He.size = Q(He.size), He.stroke = Q(He.stroke), He.width = Q(He.width), He.fill = Q(He.fill);
	let Ue = r.focus = kr({}, e.focus || { alpha: .3 }, P.focus), We = Ue.prox >= 0, Ge = We && He.one, W = [], Ke = [], qe = [];
	function G(e, t) {
		let n = He.show(r, t);
		if (n instanceof HTMLElement) return on(n, Dt), on(n, e.class), dn(n, -10, -10, H, U), m.insertBefore(n, W[t]), n;
	}
	function Je(e, t) {
		if (i == 1 || t > 0) {
			let t = i == 1 && b[e.scale].time, n = e.value;
			e.value = t ? Cr(n) ? Ti(A, Ci(n, ne)) : n || re : n || oa, e.label = e.label || (t ? qi : Ki);
		}
		if (Ge || t > 0) {
			e.width = e.width == null ? 1 : e.width, e.paths = e.paths || $a || ar, e.fillTo = Q(e.fillTo || Ca), e.pxAlign = +Z(e.pxAlign, h), e.pxRound = Oa(e.pxAlign), e.stroke = Q(e.stroke || null), e.fill = Q(e.fill || null), e._stroke = e._fill = e._paths = e._focus = null;
			let t = ca(Gn(1, e.width), 1), n = e.points = kr({}, {
				size: t,
				width: Gn(1, t * .2),
				stroke: e.stroke,
				space: t * 2,
				paths: eo,
				_stroke: null,
				_fill: null
			}, e.points);
			n.show = Q(n.show), n.filter = Q(n.filter), n.fill = Q(n.fill), n.stroke = Q(n.stroke), n.paths = Q(n.paths), n.pxAlign = e.pxAlign;
		}
		if (F) {
			let n = B(e, t);
			se.splice(t, 0, n[0]), ce.splice(t, 0, n[1]), N.values.push(null);
		}
		if (I) {
			ie.splice(t, 0, null);
			let n = null;
			Ge ? t == 0 && (n = G(e, t)) : t > 0 && (n = G(e, t)), W.splice(t, 0, n), Ke.splice(t, 0, 0), qe.splice(t, 0, 0);
		}
		Ui("addSeries", t);
	}
	function Ye(e, t) {
		t ??= v.length, e = i == 1 ? ro(e, t, Ji, pa) : ro(e, t, {}, fa), v.splice(t, 0, e), Je(v[t], t);
	}
	r.addSeries = Ye;
	function Xe(e) {
		if (v.splice(e, 1), F) {
			N.values.splice(e, 1), ce.splice(e, 1);
			let t = se.splice(e, 1)[0];
			ge(null, t.firstChild), t.remove();
		}
		I && (ie.splice(e, 1), W.splice(e, 1)[0].remove(), Ke.splice(e, 1), qe.splice(e, 1)), Ui("delSeries", e);
	}
	r.delSeries = Xe;
	let Ze = [
		!1,
		!1,
		!1,
		!1
	];
	function Qe(e, t) {
		if (e._show = e.show, e.show) {
			let n = e.side % 2, i = b[e.scale];
			i ??= (e.scale = n ? v[1].scale : S, b[e.scale]);
			let a = i.time;
			e.size = Q(e.size), e.space = Q(e.space), e.rotate = Q(e.rotate), br(e.incrs) && e.incrs.forEach((e) => {
				!mr.has(e) && mr.set(e, hr(e));
			}), e.incrs = Q(e.incrs || (i.distr == 2 ? ei : a ? _ == 1 ? pi : gi : ti)), e.splits = Q(e.splits || (a && i.distr == 1 ? j : i.distr == 3 ? Zi : i.distr == 4 ? Qi : Xi)), e.stroke = Q(e.stroke), e.grid.stroke = Q(e.grid.stroke), e.ticks.stroke = Q(e.ticks.stroke), e.border.stroke = Q(e.border.stroke);
			let o = e.values;
			e.values = br(o) && !br(o[0]) ? Q(o) : a ? br(o) ? bi(A, yi(o, ne)) : Cr(o) ? xi(A, o) : o || M : o || Yi, e.filter = Q(e.filter || (i.distr >= 3 && i.log == 10 ? ia : i.distr == 3 && i.log == 2 ? aa : ir)), e.font = po(e.font), e.labelFont = po(e.labelFont), e._size = e.size(r, null, t, 0), e._space = e._rotate = e._incrs = e._found = e._splits = e._values = null, e._size > 0 && (Ze[t] = !0, e._el = ln(St, f));
		}
	}
	function $e(e, t, n, r) {
		let [i, a, o, s] = n, c = t % 2, l = 0;
		return c == 0 && (s || a) && (l = t == 0 && !i || t == 2 && !o ? Hn(Gi.size / 3) : 0), c == 1 && (i || o) && (l = t == 1 && !a || t == 3 && !s ? Hn(sa.size / 2) : 0), l;
	}
	let et = r.padding = (e.padding || [
		$e,
		$e,
		$e,
		$e
	]).map((e) => Q(Z(e, $e))), tt = r._padding = et.map((e, t) => e(r, t, Ze, 0)), nt, rt = null, it = null, at = i == 1 ? v[0].idxs : null, ot = null, st = !1;
	function ct(e, n) {
		if (t = e ?? [], r.data = r._data = t, i == 2) {
			nt = 0;
			for (let e = 1; e < v.length; e++) nt += t[e][0].length;
		} else {
			t.length == 0 && (r.data = r._data = t = [[]]), ot = t[0], nt = ot.length;
			let e = t;
			if (O == 2) {
				e = t.slice();
				let n = e[0] = Array(nt);
				for (let e = 0; e < nt; e++) n[e] = e;
			}
			r._data = t = e;
		}
		if (In(!0), Ui("setData"), O == 2 && (je = !0), n !== !1) {
			let e = D;
			e.auto(r, st) ? lt() : Ur(S, e.min, e.max), Me ||= P.left >= 0, Pe = !0, Yn();
		}
	}
	r.setData = ct;
	function lt() {
		st = !0;
		let e, n;
		i == 1 && (nt > 0 ? (rt = at[0] = 0, it = at[1] = nt - 1, e = t[0][rt], n = t[0][it], O == 2 ? (e = rt, n = it) : e == n && (O == 3 ? [e, n] = Dn(e, e, D.log, !1) : O == 4 ? [e, n] = On(e, e, D.log, !1) : D.time ? n = e + Hn(86400 / _) : [e, n] = Nn(e, n, kn, !0))) : (rt = at[0] = e = null, it = at[1] = n = null)), Ur(S, e, n);
	}
	let ut, dt, ft, pt, mt, ht, K, Vt, Jt, Yt;
	function Xt(e, t, n, r, i, a) {
		e ??= Ht, n ??= vr, r ??= "butt", i ??= Ht, a ??= "round", e != ut && (d.strokeStyle = ut = e), i != dt && (d.fillStyle = dt = i), t != ft && (d.lineWidth = ft = t), a != mt && (d.lineJoin = mt = a), r != ht && (d.lineCap = ht = r), n != pt && d.setLineDash(pt = n);
	}
	function $t(e, t, n, r) {
		t != dt && (d.fillStyle = dt = t), e != K && (d.font = K = e), n != Vt && (d.textAlign = Vt = n), r != Jt && (d.textBaseline = Jt = r);
	}
	function nn(e, t, n, i, a = 0) {
		if (i.length > 0 && e.auto(r, st) && (t == null || t.min == null)) {
			let t = Z(rt, 0), r = Z(it, i.length - 1), o = n.min == null ? En(i, t, r, a, e.distr == 3) : [n.min, n.max];
			e.min = Wn(e.min, n.min = o[0]), e.max = Gn(e.max, n.max = o[1]);
		}
	}
	let rn = {
		min: null,
		max: null
	};
	function an() {
		for (let e in b) {
			let t = b[e];
			k[e] == null && (t.min == null || k[S] != null && t.auto(r, st)) && (k[e] = rn);
		}
		for (let e in b) {
			let t = b[e];
			k[e] == null && t.from != null && k[t.from] != null && (k[e] = rn);
		}
		k[S] != null && In(!0);
		let e = {};
		for (let t in k) {
			let n = k[t];
			if (n != null) {
				let a = e[t] = Or(b[t], Tr);
				if (n.min != null) kr(a, n);
				else if (t != S || i == 2) {
					if (nt == 0 && a.from == null) {
						let e = a.range(r, null, null, t);
						a.min = e[0], a.max = e[1];
					} else a.min = Qn, a.max = -Infinity;
				}
			}
		}
		if (nt > 0) {
			v.forEach((n, a) => {
				if (i == 1) {
					let i = n.scale, o = k[i];
					if (o == null) return;
					let s = e[i];
					if (a == 0) {
						let e = s.range(r, s.min, s.max, i);
						s.min = e[0], s.max = e[1], rt = bn(s.min, t[0]), it = bn(s.max, t[0]), it - rt > 1 && (t[0][rt] < s.min && rt++, t[0][it] > s.max && it--), n.min = ot[rt], n.max = ot[it];
					} else n.show && n.auto && nn(s, o, n, t[a], n.sorted);
					n.idxs[0] = rt, n.idxs[1] = it;
				} else if (a > 0 && n.show && n.auto) {
					let [r, i] = n.facets, o = r.scale, s = i.scale, [c, l] = t[a], u = e[o], d = e[s];
					u != null && nn(u, k[o], r, c, r.sorted), d != null && nn(d, k[s], i, l, i.sorted), n.min = i.min, n.max = i.max;
				}
			});
			for (let t in e) {
				let n = e[t], i = k[t];
				if (n.from == null && (i == null || i.min == null)) {
					let e = n.range(r, n.min == Qn ? null : n.min, n.max == -Infinity ? null : n.max, t);
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
				i._min = e == 3 ? Jn(i.min) : e == 4 ? Zn(i.min, i.asinh) : e == 100 ? i.fwd(i.min) : i.min, i._max = e == 3 ? Jn(i.max) : e == 4 ? Zn(i.max, i.asinh) : e == 100 ? i.fwd(i.max) : i.max, n[t] = a = !0;
			}
		}
		if (a) {
			v.forEach((e, t) => {
				i == 2 ? t > 0 && n.y && (e._paths = null) : n[e.scale] && (e._paths = null);
			});
			for (let e in n) je = !0, Ui("setScale", e);
			I && P.left >= 0 && (Me = Pe = !0);
		}
		for (let e in k) k[e] = null;
	}
	function un(e) {
		let t = er(rt - 1, 0, nt - 1), n = er(it + 1, 0, nt - 1);
		for (; e[t] == null && t > 0;) t--;
		for (; e[n] == null && n < nt - 1;) n++;
		return [t, n];
	}
	function fn() {
		if (nt > 0) {
			let e = v.some((e) => e._focus) && Yt != Ue.alpha;
			e && (d.globalAlpha = Yt = Ue.alpha), v.forEach((e, n) => {
				if (n > 0 && e.show && (mn(n, !1), mn(n, !0), e._paths == null)) {
					let a = Yt;
					Yt != e.alpha && (d.globalAlpha = Yt = e.alpha);
					let o = i == 2 ? [0, t[n][0].length - 1] : un(t[n]);
					e._paths = e.paths(r, n, o[0], o[1]), Yt != a && (d.globalAlpha = Yt = a);
				}
			}), v.forEach((e, t) => {
				if (t > 0 && e.show) {
					let n = Yt;
					Yt != e.alpha && (d.globalAlpha = Yt = e.alpha), e._paths != null && gn(t, !1);
					{
						let n = e._paths == null ? null : e._paths.gaps, i = e.points.show(r, t, rt, it, n), a = e.points.filter(r, t, i, n);
						(i || a) && (e.points._paths = e.points.paths(r, t, rt, it, a), gn(t, !0));
					}
					Yt != n && (d.globalAlpha = Yt = n), Ui("drawSeries", t);
				}
			}), e && (d.globalAlpha = Yt = 1);
		}
	}
	function mn(e, t) {
		let n = t ? v[e].points : v[e];
		n._stroke = n.stroke(r, e), n._fill = n.fill(r, e);
	}
	function gn(e, t) {
		let n = t ? v[e].points : v[e], { stroke: r, fill: i, clip: a, flags: o, _stroke: s = n._stroke, _fill: c = n._fill, _width: l = n.width } = n._paths;
		l = pr(l * Y, 3);
		let u = null, f = l % 2 / 2;
		t && c == null && (c = l > 0 ? "#fff" : s);
		let p = n.pxAlign == 1 && f > 0;
		if (p && d.translate(f, f), !t) {
			let e = Te - l / 2, t = Ee - l / 2, n = De + l, r = Oe + l;
			u = new Path2D(), u.rect(e, t, n, r);
		}
		t ? xn(s, l, n.dash, n.cap, c, r, i, o, a) : _n(e, s, l, n.dash, n.cap, c, r, i, o, u, a), p && d.translate(-f, -f);
	}
	function _n(e, n, i, a, o, s, c, l, u, d, f) {
		let p = !1;
		u != 0 && x.forEach((m, h) => {
			if (m.series[0] == e) {
				let e = v[m.series[1]], g = t[m.series[1]], _ = (e._paths || _r).band;
				br(_) && (_ = m.dir == 1 ? _[0] : _[1]);
				let y, b = null;
				e.show && _ && Pn(g, rt, it) ? (b = m.fill(r, h) || s, y = e._paths.clip) : _ = null, xn(n, i, a, o, b, c, l, u, d, f, y, _), p = !0;
			}
		}), p || xn(n, i, a, o, s, c, l, u, d, f);
	}
	function xn(e, t, n, r, i, a, o, s, c, l, u, f) {
		Xt(e, t, n, r, i), (c || l || f) && (d.save(), c && d.clip(c), l && d.clip(l)), f ? (s & 3) == 3 ? (d.clip(f), u && d.clip(u), Cn(i, o), Sn(e, a, t)) : s & ba ? (Cn(i, o), d.clip(f), Sn(e, a, t)) : s & ya && (d.save(), d.clip(f), u && d.clip(u), Cn(i, o), d.restore(), Sn(e, a, t)) : (Cn(i, o), Sn(e, a, t)), (c || l || f) && d.restore();
	}
	function Sn(e, t, n) {
		n > 0 && (t instanceof Map ? t.forEach((e, t) => {
			d.strokeStyle = ut = t, d.stroke(e);
		}) : t != null && e && d.stroke(t));
	}
	function Cn(e, t) {
		t instanceof Map ? t.forEach((e, t) => {
			d.fillStyle = dt = t, d.fill(e);
		}) : t != null && e && d.fill(t);
	}
	function wn(e, t, n, i) {
		let a = y[e], o;
		if (i <= 0) o = [0, 0];
		else {
			let s = a._space = a.space(r, e, t, n, i);
			o = fo(t, n, a._incrs = a.incrs(r, e, t, n, i, s), i, s);
		}
		return a._found = o;
	}
	function Tn(e, t, n, r, i, a, o, s, c, l) {
		let u = o % 2 / 2;
		h == 1 && d.translate(u, u), Xt(s, o, c, l, s), d.beginPath();
		let f, p, m, g, _ = i + (r == 0 || r == 3 ? -a : a);
		n == 0 ? (p = i, g = _) : (f = i, m = _);
		for (let r = 0; r < e.length; r++) t[r] != null && (n == 0 ? f = m = e[r] : p = g = e[r], d.moveTo(f, p), d.lineTo(m, g));
		d.stroke(), h == 1 && d.translate(-u, -u);
	}
	function jn(e) {
		let t = !0;
		return y.forEach((n, i) => {
			if (!n.show) return;
			let a = b[n.scale];
			if (a.min == null) {
				n._show && (t = !1, n._show = !1, In(!1));
				return;
			}
			n._show || (t = !1, n._show = !0, In(!1));
			let o = n.side, s = o % 2, { min: c, max: l } = a, [u, d] = wn(i, c, l, s == 0 ? H : U);
			if (d == 0) return;
			let f = a.distr == 2, p = n._splits = n.splits(r, i, c, l, u, d, f), m = a.distr == 2 ? p.map((e) => ot[e]) : p, h = a.distr == 2 ? ot[p[1]] - ot[p[0]] : u, g = n._values = n.values(r, n.filter(r, m, i, d, h), i, d, h);
			n._rotate = o == 2 ? n.rotate(r, g, i, d) : 0;
			let _ = n._size;
			n._size = Un(n.size(r, g, i, e)), _ != null && n._size != _ && (t = !1);
		}), t;
	}
	function Mn(e) {
		let t = !0;
		return et.forEach((n, i) => {
			let a = n(r, i, Ze, e);
			a != tt[i] && (t = !1), tt[i] = a;
		}), t;
	}
	function Fn() {
		for (let e = 0; e < y.length; e++) {
			let t = y[e];
			if (!t.show || !t._show) continue;
			let n = t.side, i = n % 2, a, o, c = t.stroke(r, e), l = n == 0 || n == 3 ? -1 : 1, [u, f] = t._found;
			if (t.label != null) {
				let s = t.labelGap * l, p = Hn((t._lpos + s) * Y);
				$t(t.labelFont[0], c, "center", n == 2 ? Lt : Rt), d.save(), i == 1 ? (a = o = 0, d.translate(p, Hn(Ee + Oe / 2)), d.rotate((n == 3 ? -zn : zn) / 2)) : (a = Hn(Te + De / 2), o = p);
				let m = tr(t.label) ? t.label(r, e, u, f) : t.label;
				d.fillText(m, a, o), d.restore();
			}
			if (f == 0) continue;
			let p = b[t.scale], m = i == 0 ? De : Oe, h = i == 0 ? Te : Ee, _ = t._splits, v = p.distr == 2 ? _.map((e) => ot[e]) : _, x = p.distr == 2 ? ot[_[1]] - ot[_[0]] : u, S = t.ticks, C = t.border, w = S.show ? S.size : 0, T = Hn(w * Y), E = Hn((t.alignTo == 2 ? t._size - w - t.gap : t.gap) * Y), D = t._rotate * -zn / 180, O = g(t._pos * Y), ee = O + (T + E) * l;
			o = i == 0 ? ee : 0, a = i == 1 ? ee : 0;
			let te = t.font[0];
			$t(te, c, t.align == 1 ? zt : t.align == 2 ? Bt : D > 0 ? zt : D < 0 ? Bt : i == 0 ? "center" : n == 3 ? Bt : zt, D || i == 1 ? "middle" : n == 2 ? Lt : Rt);
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
			S.show && Tn(A, S.filter(r, v, e, f, x), i, n, O, T, pr(S.width * Y, 3), S.stroke(r, e), S.dash, S.cap);
			let j = t.grid;
			j.show && Tn(A, j.filter(r, v, e, f, x), i, i == 0 ? 2 : 1, i == 0 ? Ee : Te, i == 0 ? Oe : De, pr(j.width * Y, 3), j.stroke(r, e), j.dash, j.cap), C.show && Tn([O], [1], +(i == 0), i == 0 ? 1 : 2, i == 1 ? Ee : Te, i == 1 ? Oe : De, pr(C.width * Y, 3), C.stroke(r, e), C.dash, C.cap);
		}
		Ui("drawAxes");
	}
	function In(e) {
		v.forEach((t, n) => {
			n > 0 && (t._paths = null, e && (i == 1 ? (t.min = null, t.max = null) : t.facets.forEach((e) => {
				e.min = null, e.max = null;
			})));
		});
	}
	let Ln = !1, Rn = !1, Vn = [];
	function qn() {
		Rn = !1;
		for (let e = 0; e < Vn.length; e++) Ui(...Vn[e]);
		Vn.length = 0;
	}
	function Yn() {
		Ln ||= (Fr(nr), !0);
	}
	function $n(e, t = !1) {
		Ln = !0, Rn = t, e(r), nr(), t && Vn.length > 0 && queueMicrotask(qn);
	}
	r.batch = $n;
	function nr() {
		if (ke &&= (an(), !1), je &&= (Le(), !1), Ae) {
			if (sn(p, zt, ye), sn(p, Lt, be), sn(p, Ft, H), sn(p, It, U), sn(m, zt, ye), sn(m, Lt, be), sn(m, Ft, H), sn(m, It, U), sn(f, Ft, _e), sn(f, It, ve), u.width = Hn(_e * Y), u.height = Hn(ve * Y), y.forEach(({ _el: e, _show: t, _size: n, _pos: r, side: i }) => {
				if (e != null) {
					if (t) {
						let t = i === 3 || i === 0 ? n : 0, a = i % 2 == 1;
						sn(e, a ? "left" : "top", r - t), sn(e, a ? "width" : "height", n), sn(e, a ? "top" : "left", a ? be : ye), sn(e, a ? "height" : "width", a ? U : H), X(e, Ct);
					} else on(e, Ct);
				}
			}), ut = dt = ft = mt = ht = K = Vt = Jt = pt = null, Yt = 1, Si(!0), ye != xe || be != Se || H != Ce || U != we) {
				In(!1);
				let e = H / Ce, t = U / we;
				if (I && !Me && P.left >= 0) {
					P.left *= e, P.top *= t, dr && dn(dr, Hn(P.left), 0, H, U), fr && dn(fr, 0, Hn(P.top), H, U);
					for (let n = 0; n < W.length; n++) {
						let r = W[n];
						r != null && (Ke[n] *= e, qe[n] *= t, dn(r, Un(Ke[n]), Un(qe[n]), H, U));
					}
				}
				if (zr.show && !Ne && zr.left >= 0 && zr.width > 0) {
					zr.left *= e, zr.width *= e, zr.top *= t, zr.height *= t;
					for (let e in ki) sn(Br, e, zr[e]);
				}
				xe = ye, Se = be, Ce = H, we = U;
			}
			Ui("setSize"), Ae = !1;
		}
		_e > 0 && ve > 0 && (d.clearRect(0, 0, u.width, u.height), Ui("drawClear"), w.forEach((e) => e()), Ui("draw")), zr.show && Ne && (Vr(zr), Ne = !1), I && Me && ($(null, !0, !1), Me = !1), N.show && N.live && Pe && (ui(), Pe = !1), c || (c = !0, r.status = 1, Ui("ready")), st = !1, Ln = !1;
	}
	r.redraw = (e, t) => {
		je = t || !1, e === !1 ? Yn() : Ur(S, D.min, D.max);
	};
	function rr(e, n) {
		let i = b[e];
		if (i.from == null) {
			if (nt == 0) {
				let t = i.range(r, n.min, n.max, e);
				n.min = t[0], n.max = t[1];
			}
			if (n.min > n.max) {
				let e = n.min;
				n.min = n.max, n.max = e;
			}
			if (nt > 1 && n.min != null && n.max != null && n.max - n.min < 1e-16) return;
			e == S && i.distr == 2 && nt > 0 && (n.min = bn(n.min, t[0]), n.max = bn(n.max, t[0]), n.min == n.max && n.max++), k[e] = n, ke = !0, Yn();
		}
	}
	r.setScale = rr;
	let cr, lr, dr, fr, gr, xr, Er, Dr, Ar, jr, Mr, Nr, Pr = !1, Ir = P.drag, Lr = Ir.x, Rr = Ir.y;
	I && (P.x && (cr = ln(Tt, m)), P.y && (lr = ln(Et, m)), D.ori == 0 ? (dr = cr, fr = lr) : (dr = lr, fr = cr), Mr = P.left, Nr = P.top);
	let zr = r.select = kr({
		show: !0,
		over: !0,
		left: 0,
		width: 0,
		top: 0,
		height: 0
	}, e.select), Br = zr.show ? ln(wt, zr.over ? m : p) : null;
	function Vr(e, t) {
		if (zr.show) {
			for (let t in e) zr[t] = e[t], t in ki && sn(Br, t, e[t]);
			t !== !1 && Ui("setSelect");
		}
	}
	r.setSelect = Vr;
	function Hr(e) {
		if (v[e].show) F && X(se[e], Ct);
		else if (F && on(se[e], Ct), I) {
			let t = Ge ? W[0] : W[e];
			t != null && dn(t, -10, -10, H, U);
		}
	}
	function Ur(e, t, n) {
		rr(e, {
			min: t,
			max: n
		});
	}
	function Wr(e, t, n, a) {
		t.focus != null && ni(e), t.show != null && v.forEach((n, r) => {
			r > 0 && (e == r || e == null) && (n.show = t.show, Hr(r), i == 2 ? (Ur(n.facets[0].scale, null, null), Ur(n.facets[1].scale, null, null)) : Ur(n.scale, null, null), Yn());
		}), n !== !1 && Ui("setSeries", e, t), a && na("setSeries", r, e, t);
	}
	r.setSeries = Wr;
	function Gr(e, t) {
		kr(x[e], t);
	}
	function Kr(e, t) {
		e.fill = Q(e.fill || null), e.dir = Z(e.dir, -1), t ??= x.length, x.splice(t, 0, e);
	}
	function Jr(e) {
		e == null ? x.length = 0 : x.splice(e, 1);
	}
	r.addBand = Kr, r.setBand = Gr, r.delBand = Jr;
	function Yr(e, t) {
		v[e].alpha = t, I && W[e] != null && (W[e].style.opacity = t), F && se[e] && (se[e].style.opacity = t);
	}
	let Xr, Zr, Qr, $r = { focus: !0 };
	function ni(e) {
		if (e != Qr) {
			let t = e == null, n = Ue.alpha != 1;
			v.forEach((r, a) => {
				if (i == 1 || a > 0) {
					let i = t || a == 0 || a == e;
					r._focus = t ? null : i, n && Yr(a, i ? 1 : Ue.alpha);
				}
			}), Qr = e, n && Yn();
		}
	}
	F && We && V(Kt, z, (e) => {
		P._lock || (Ve(e), Qr != null && Wr(null, $r, !0, $i.setSeries));
	});
	function ri(e, t, n) {
		let r = b[t];
		n && (e = e / Y - (r.ori == 1 ? be : ye));
		let i = H;
		r.ori == 1 && (i = U, e = i - e), r.dir == -1 && (e = i - e);
		let a = r._min, o = r._max, s = e / i, c = a + (o - a) * s, l = r.distr;
		return l == 3 ? Kn(10, c) : l == 4 ? Xn(c, r.asinh) : l == 100 ? r.bwd(c) : c;
	}
	function ii(e, n) {
		return bn(ri(e, S, n), t[0], rt, it);
	}
	r.valToIdx = (e) => bn(e, t[0]), r.posToIdx = ii, r.posToVal = ri, r.valToPos = (e, t, n) => b[t].ori == 0 ? a(e, b[t], n ? De : H, n ? Te : 0) : o(e, b[t], n ? Oe : U, n ? Ee : 0), r.setCursor = (e, t, n) => {
		Mr = e.left, Nr = e.top, $(null, t, n);
	};
	function ai(e, t) {
		sn(Br, zt, zr.left = e), sn(Br, Ft, zr.width = t);
	}
	function oi(e, t) {
		sn(Br, Lt, zr.top = e), sn(Br, It, zr.height = t);
	}
	let si = D.ori == 0 ? ai : oi, ci = D.ori == 1 ? ai : oi;
	function li() {
		if (F && N.live) for (let e = +(i == 2); e < v.length; e++) {
			if (e == 0 && ue) continue;
			let t = N.values[e], n = 0;
			for (let r in t) ce[e][n++].firstChild.nodeValue = t[r];
		}
	}
	function ui(e, t) {
		if (e != null && (e.idxs ? e.idxs.forEach((e, t) => {
			ie[t] = e;
		}) : Sr(e.idx) || ie.fill(e.idx), N.idx = ie[0]), F && N.live) {
			for (let e = 0; e < v.length; e++) (e > 0 || i == 1 && !ue) && di(e, ie[e]);
			li();
		}
		Pe = !1, t !== !1 && Ui("setLegend");
	}
	r.setLegend = ui;
	function di(e, n) {
		let i = v[e], a = e == 0 && O == 2 ? ot : t[e], o;
		ue ? o = i.values(r, e, n) ?? de : (o = i.value(r, n == null ? null : a[n], e, n), o = o == null ? de : { _: o }), N.values[e] = o;
	}
	function $(e, n, a) {
		Ar = Mr, jr = Nr, [Mr, Nr] = P.move(r, Mr, Nr), P.left = Mr, P.top = Nr, I && (dr && dn(dr, Hn(Mr), 0, H, U), fr && dn(fr, 0, Hn(Nr), H, U));
		let o, s = rt > it;
		Xr = Qn, Zr = null;
		let c = D.ori == 0 ? H : U, l = D.ori == 1 ? H : U;
		if (Mr < 0 || nt == 0 || s) {
			o = P.idx = null;
			for (let e = 0; e < v.length; e++) {
				let t = W[e];
				t != null && dn(t, -10, -10, H, U);
			}
			We && Wr(null, $r, !0, e == null && $i.setSeries), N.live && (ie.fill(o), Pe = !0);
		} else {
			let e, n, a;
			i == 1 && (e = D.ori == 0 ? Mr : Nr, n = ri(e, S), o = P.idx = bn(n, t[0], rt, it), a = ee(t[0][o], D, c, 0));
			let s = -10, u = -10, d = 0, f = 0, p = !0, m = "", h = "";
			for (let e = +(i == 2); e < v.length; e++) {
				let g = v[e], _ = ie[e], y = _ == null ? null : i == 1 ? t[e][_] : t[e][1][_], x = P.dataIdx(r, e, o, n), S = x == null ? null : i == 1 ? t[e][x] : t[e][1][x];
				if (Pe = Pe || S != y || x != _, ie[e] = x, e > 0 && g.show) {
					let n = x == null ? -10 : x == o ? a : ee(i == 1 ? t[0][x] : t[e][0][x], D, c, 0), _ = S == null ? -10 : te(S, i == 1 ? b[g.scale] : b[g.facets[1].scale], l, 0);
					if (We && S != null) {
						let t = D.ori == 1 ? Mr : Nr, n = Bn(Ue.dist(r, e, x, _, t));
						if (n < Xr) {
							let r = Ue.bias;
							if (r != 0) {
								let i = ri(t, g.scale), a = S >= 0 ? 1 : -1, o = i >= 0 ? 1 : -1;
								o == a && (o == 1 ? r == 1 ? S >= i : S <= i : r == 1 ? S <= i : S >= i) && (Xr = n, Zr = e);
							} else Xr = n, Zr = e;
						}
					}
					if (Pe || Ge) {
						let t, i;
						D.ori == 0 ? (t = n, i = _) : (t = _, i = n);
						let a, o, c, l, g, v, y = !0, b = He.bbox;
						if (b != null) {
							y = !1;
							let t = b(r, e);
							c = t.left, l = t.top, a = t.width, o = t.height;
						} else c = t, l = i, a = o = He.size(r, e);
						if (v = He.fill(r, e), g = He.stroke(r, e), Ge) e == Zr && Xr <= Ue.prox && (s = c, u = l, d = a, f = o, p = y, m = v, h = g);
						else {
							let t = W[e];
							t != null && (Ke[e] = c, qe[e] = l, hn(t, a, o, y), pn(t, v, g), dn(t, Un(c), Un(l), H, U));
						}
					}
				}
			}
			if (Ge) {
				let e = Ue.prox;
				if (Pe || (Qr == null ? Xr <= e : Xr > e || Zr != Qr)) {
					let e = W[0];
					e != null && (Ke[0] = s, qe[0] = u, hn(e, d, f, p), pn(e, m, h), dn(e, Un(s), Un(u), H, U));
				}
			}
		}
		if (zr.show && Pr) {
			if (e != null) {
				let [t, n] = $i.scales, [r, i] = $i.match, [a, o] = e.cursor.sync.scales, s = e.cursor.drag;
				if (Lr = s._x, Rr = s._y, Lr || Rr) {
					let { left: s, top: u, width: d, height: f } = e.select, p = e.scales[a].ori, m = e.posToVal, h, g, _, v, y, x = t != null && r(t, a), S = n != null && i(n, o);
					x && Lr ? (p == 0 ? (h = s, g = d) : (h = u, g = f), _ = b[t], v = ee(m(h, a), _, c, 0), y = ee(m(h + g, a), _, c, 0), si(Wn(v, y), Bn(y - v))) : si(0, c), S && Rr ? (p == 1 ? (h = s, g = d) : (h = u, g = f), _ = b[n], v = te(m(h, o), _, l, 0), y = te(m(h + g, o), _, l, 0), ci(Wn(v, y), Bn(y - v))) : ci(0, l);
				} else Ai();
			} else {
				let e = Bn(Ar - gr), t = Bn(jr - xr);
				if (D.ori == 1) {
					let n = e;
					e = t, t = n;
				}
				Lr = Ir.x && e >= Ir.dist, Rr = Ir.y && t >= Ir.dist;
				let n = Ir.uni;
				n == null ? Ir.x && Ir.y && (Lr || Rr) && (Lr = Rr = !0) : Lr && Rr && (Lr = e >= n, Rr = t >= n, !Lr && !Rr && (t > e ? Rr = !0 : Lr = !0));
				let r, i;
				Lr && (D.ori == 0 ? (r = Er, i = Mr) : (r = Dr, i = Nr), si(Wn(r, i), Bn(i - r)), Rr || ci(0, l)), Rr && (D.ori == 1 ? (r = Er, i = Mr) : (r = Dr, i = Nr), ci(Wn(r, i), Bn(i - r)), Lr || si(0, c)), !Lr && !Rr && (si(0, 0), ci(0, 0));
			}
		}
		if (Ir._x = Lr, Ir._y = Rr, e == null) {
			if (a) {
				if (ea != null) {
					let [e, t] = $i.scales;
					$i.values[0] = e == null ? null : ri(D.ori == 0 ? Mr : Nr, e), $i.values[1] = t == null ? null : ri(D.ori == 1 ? Mr : Nr, t);
				}
				na(J, r, Mr, Nr, H, U, o);
			}
			if (We) {
				let e = a && $i.setSeries, t = Ue.prox;
				Qr == null ? Xr <= t && Wr(Zr, $r, !0, e) : Xr > t ? Wr(null, $r, !0, e) : Zr != Qr && Wr(Zr, $r, !0, e);
			}
		}
		Pe && (N.idx = o, ui()), n !== !1 && Ui("setCursor");
	}
	let fi = null;
	Object.defineProperty(r, "rect", { get() {
		return fi ?? Si(!1), fi;
	} });
	function Si(e = !1) {
		e ? fi = null : (fi = m.getBoundingClientRect(), Ui("syncRect", fi));
	}
	function Ei(e, t, n, r, i, a, o) {
		P._lock || Pr && e != null && e.movementX == 0 && e.movementY == 0 || (Di(e, t, n, r, i, a, o, !1, e != null), e == null ? $(t, !0, !1) : $(null, !0, !0));
	}
	function Di(e, t, n, i, a, o, c, l, u) {
		if (fi ?? Si(!1), Ve(e), e != null) n = e.clientX - fi.left, i = e.clientY - fi.top;
		else {
			if (n < 0 || i < 0) {
				Mr = -10, Nr = -10;
				return;
			}
			let [e, r] = $i.scales, c = t.cursor.sync, [l, u] = c.values, [d, f] = c.scales, [p, m] = $i.match, h = t.axes[0].side % 2 == 1, g = D.ori == 0 ? H : U, _ = D.ori == 1 ? H : U, v = h ? o : a, y = h ? a : o, x = h ? i : n, S = h ? n : i;
			if (n = d == null ? x / v * g : p(e, d) ? s(l, b[e], g, 0) : -10, i = f == null ? S / y * _ : m(r, f) ? s(u, b[r], _, 0) : -10, D.ori == 1) {
				let e = n;
				n = i, i = e;
			}
		}
		u && (t == null || t.cursor.event.type == J) && ((n <= 1 || n >= H - 1) && (n = ur(n, H)), (i <= 1 || i >= U - 1) && (i = ur(i, U))), l ? (gr = n, xr = i, [Er, Dr] = P.move(r, n, i)) : (Mr = n, Nr = i);
	}
	let ki = {
		width: 0,
		height: 0,
		left: 0,
		top: 0
	};
	function Ai() {
		Vr(ki, !1);
	}
	let ji, Mi, Ni, Pi;
	function Fi(e, t, n, i, a, o, s) {
		Pr = !0, Lr = Rr = Ir._x = Ir._y = !1, Di(e, t, n, i, a, o, s, !0, !1), e != null && (V(Wt, en, Ii, !1), na(Ut, r, Er, Dr, H, U, null));
		let { left: c, top: l, width: u, height: d } = zr;
		ji = c, Mi = l, Ni = u, Pi = d;
	}
	function Ii(e, t, n, i, a, o, s) {
		Pr = Ir._x = Ir._y = !1, Di(e, t, n, i, a, o, s, !1, !0);
		let { left: c, top: l, width: u, height: d } = zr, f = u > 0 || d > 0, p = ji != c || Mi != l || Ni != u || Pi != d;
		if (f && p && Vr(zr), Ir.setScale && f && p) {
			let e = c, t = u, n = l, r = d;
			if (D.ori == 1 && (e = l, t = d, n = c, r = u), Lr && Ur(S, ri(e, S), ri(e + t, S)), Rr) for (let e in b) {
				let t = b[e];
				e != S && t.from == null && t.min != Qn && Ur(e, ri(n + r, e), ri(n, e));
			}
			Ai();
		} else P.lock && (P._lock = !P._lock, $(t, !0, e != null));
		e != null && (ge(Wt, en), na(Wt, r, Mr, Nr, H, U, null));
	}
	function Ri(e, t, n, r, i, a, o) {
		if (P._lock) return;
		Ve(e);
		let s = Pr;
		if (Pr) {
			let e = !0, t = !0, n, r;
			D.ori == 0 ? (n = Lr, r = Rr) : (n = Rr, r = Lr), n && r && (e = Mr <= 10 || Mr >= H - 10, t = Nr <= 10 || Nr >= U - 10), n && e && (Mr = Mr < Er ? 0 : H), r && t && (Nr = Nr < Dr ? 0 : U), $(null, !0, !0), Pr = !1;
		}
		Mr = -10, Nr = -10, ie.fill(null), $(null, !0, !0), s && (Pr = s);
	}
	function zi(e, t, n, i, a, o, s) {
		P._lock || (Ve(e), lt(), Ai(), e != null && na(qt, r, Mr, Nr, H, U, null));
	}
	function Bi() {
		y.forEach(mo), Fe(r.width, r.height, !0);
	}
	vn(Zt, tn, Bi);
	let Vi = {};
	Vi.mousedown = Fi, Vi.mousemove = Ei, Vi.mouseup = Ii, Vi.dblclick = zi, Vi.setSeries = (e, t, n, i) => {
		let a = $i.match[2];
		n = a(r, t, n), n != -1 && Wr(n, i, !0, !1);
	}, I && (V(Ut, m, Fi), V(J, m, Ei), V(Gt, m, (e) => {
		Ve(e), Si(!1);
	}), V(Kt, m, Ri), V(qt, m, zi), Za.add(r), r.syncRect = Si);
	let Hi = r.hooks = e.hooks || {};
	function Ui(e, t, n) {
		Rn ? Vn.push([
			e,
			t,
			n
		]) : e in Hi && Hi[e].forEach((e) => {
			e.call(null, r, t, n);
		});
	}
	(e.plugins || []).forEach((e) => {
		for (let t in e.hooks) Hi[t] = (Hi[t] || []).concat(e.hooks[t]);
	});
	let Wi = (e, t, n) => n, $i = kr({
		key: null,
		setSeries: !1,
		filters: {
			pub: or,
			sub: or
		},
		scales: [S, v[1] ? v[1].scale : null],
		match: [
			sr,
			sr,
			Wi
		],
		values: [null, null]
	}, P.sync);
	$i.match.length == 2 && $i.match.push(Wi), P.sync = $i;
	let ea = $i.key, ta = va(ea);
	function na(e, t, n, r, i, a, o) {
		$i.filters.pub(e, t, n, r, i, a, o) && ta.pub(e, t, n, r, i, a, o);
	}
	ta.sub(r);
	function ra(e, t, n, r, i, a, o) {
		$i.filters.sub(e, t, n, r, i, a, o) && Vi[e](null, t, n, r, i, a, o);
	}
	r.pub = ra;
	function la() {
		ta.unsub(r), Za.delete(r), he.clear(), yn(Zt, tn, Bi), l.remove(), z?.remove(), Ui("destroy");
	}
	r.destroy = la;
	function ua() {
		Ui("init", e, t), ct(t || e.data, !1), k[S] ? rr(S, k[S]) : lt(), Ne = zr.show && (zr.width > 0 || zr.height > 0), Me = Pe = !0, Fe(e.width, e.height);
	}
	return v.forEach(Je), y.forEach(Qe), n ? n instanceof HTMLElement ? (n.appendChild(l), ua()) : n(r, ua) : ua(), r;
}
ho.assign = kr, ho.fmtNum = Ln, ho.rangeNum = Nn, ho.rangeLog = Dn, ho.rangeAsinh = On, ho.orient = xa, ho.pxRatio = Y, ho.join = Pr, ho.fmtDate = qr, ho.tzDate = Yr, ho.sync = va;
{
	ho.addGap = Ea, ho.clipGaps = Ta;
	let e = ho.paths = { points: Ba };
	e.linear = Wa, e.stepped = Ga, e.bars = qa, e.spline = Ya;
}
// node_modules/uplot/dist/uPlot.min.css?inline
var go = ".uplot,.uplot *,.uplot :before,.uplot :after{box-sizing:border-box}.uplot{width:min-content;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{-webkit-user-select:none;user-select:none;position:relative}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{width:100%;height:100%;display:block;position:relative}.u-axis{position:absolute}.u-legend{text-align:center;margin:auto;font-size:14px}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:\":\";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{pointer-events:none;background:#00000012;position:absolute}.u-cursor-x,.u-cursor-y{pointer-events:none;will-change:transform;position:absolute;top:0;left:0}.u-hz .u-cursor-x,.u-vt .u-cursor-y{border-right:1px dashed #607d8b;height:100%}.u-hz .u-cursor-y,.u-vt .u-cursor-x{border-bottom:1px dashed #607d8b;width:100%}.u-cursor-pt{pointer-events:none;will-change:transform;border:0 solid;border-radius:50%;position:absolute;top:0;left:0;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}";
// src/canvas.ts
function _o() {
	try {
		return document.createElement("canvas").getContext("2d") !== null;
	} catch {
		return !1;
	}
}
// src/chart-data.ts
function vo(e) {
	return {
		time: e.map((e) => e.t / 60),
		height: e.map((e) => e.height),
		speedKmh: e.map((e) => e.speed * 3.6),
		voltage: e.map((e) => e.voltage > 0 ? e.voltage : null),
		current: e.map((e) => e.voltage > 0 ? e.current : null),
		charge: e.map((e) => e.charge)
	};
}
function yo(e, t) {
	return e.some((e) => typeof e[t] == "number");
}
var bo = (e) => typeof e == "number" ? e : null, xo = (e) => typeof e == "number" ? Math.min(100, Math.max(0, e)) : null;
function So(e) {
	return {
		time: e.map((e) => e.t / 60),
		cellDevMv: e.map((e) => typeof e.cell_dev == "number" ? e.cell_dev * 1e3 : null),
		temp: e.map((e) => bo(e.temp)),
		pitch: e.map((e) => bo(e.pitch)),
		roll: e.map((e) => bo(e.roll))
	};
}
function Co(e) {
	return {
		time: e.map((e) => e.t / 60),
		dl: e.map((e) => xo(e.dl)),
		ul: e.map((e) => xo(e.ul))
	};
}
function wo(e) {
	let t = e.filter((e) => typeof e.dl == "number" && typeof e.dist == "number").map((e) => [e.dist, Math.min(100, Math.max(0, e.dl))]).sort((e, t) => e[0] - t[0]);
	return {
		dist: t.map((e) => e[0]),
		dl: t.map((e) => e[1])
	};
}
function To(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e) r.voltage > 0 && r.charge > 0 && !t.has(r.charge) && (t.add(r.charge), n.push([r.charge, r.voltage]));
	return n.sort((e, t) => e[0] - t[0]), {
		charge: n.map((e) => e[0]),
		voltage: n.map((e) => e[1])
	};
}
function Eo(e) {
	return {
		cell: yo(e, "cell_dev"),
		temp: yo(e, "temp"),
		attitude: yo(e, "pitch"),
		signal: yo(e, "dl"),
		distance: e.some((e) => typeof e.dl == "number" && typeof e.dist == "number"),
		discharge: To(e).charge.length >= 10
	};
}
function Do(e) {
	return {
		cell: e ? "#4db6ac" : "#00796b",
		temp: e ? "#f06292" : "#c2185b",
		pitch: e ? "#4dd0e1" : "#00838f",
		roll: e ? "#f48fb1" : "#ad1457",
		discharge: e ? "#9fa8da" : "#3949ab",
		downlink: e ? "#81c784" : "#2e7d32",
		uplink: e ? "#64b5f6" : "#1565c0",
		weak: e ? "rgba(239,83,80,0.8)" : "rgba(198,40,40,0.7)",
		limit: e ? "#ffb74d" : "#ef6c00",
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
var Oo = h`
  :host { display: block; color: var(--primary-text-color); font-family: var(--paper-font-body1_-_font-family, inherit); }
  .card { background: var(--card-background-color, #fff); border: 1px solid var(--divider-color, #ddd); border-radius: 12px; padding: 12px 16px; }
  .card h3 { margin: 0 0 8px; font-size: 1rem; font-weight: 500; }
  .kv { display: flex; justify-content: space-between; gap: 12px; padding: 2px 0; }
  .kv span { color: var(--secondary-text-color); }
  .muted { color: var(--secondary-text-color); }
  button { font: inherit; cursor: pointer; border: 1px solid var(--divider-color, #ccc); border-radius: 8px; background: var(--card-background-color, #fff); color: var(--primary-text-color); padding: 6px 12px; }
  button.primary { background: var(--primary-color); color: var(--text-primary-color, #fff); border-color: var(--primary-color); }
  select { font: inherit; padding: 6px; border-radius: 8px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); }
`, ko = 200;
function Ao(e) {
	if (e.length < 2) return [];
	let t = Eo(e), n = ["motion", "power"];
	return t.cell && n.push("cell"), t.temp && n.push("temp"), t.attitude && n.push("attitude"), t.discharge && n.push("discharge"), t.signal && n.push("signal"), t.distance && n.push("distance"), n;
}
function jo(e) {
	return { hooks: { draw: [(t) => {
		let { ctx: n, bbox: r } = t;
		n.save(), n.lineWidth = 1.5 * devicePixelRatio, n.setLineDash([4 * devicePixelRatio, 3 * devicePixelRatio]);
		for (let i of e) {
			let e = t.valToPos(i.t / 60, "x", !0);
			!Number.isFinite(e) || e < r.left || e > r.left + r.width || (n.strokeStyle = Xe(i.kind).color, n.beginPath(), n.moveTo(e, r.top), n.lineTo(e, r.top + r.height), n.stroke());
		}
		n.restore();
	}] } };
}
var Mo = class extends Ae {
	static {
		this.properties = {
			points: { attribute: !1 },
			events: { attribute: !1 },
			modeSegments: { attribute: !1 },
			lang: { type: String },
			dark: { type: Boolean }
		};
	}
	constructor() {
		super(), this.plots = /* @__PURE__ */ new Map(), this.points = [], this.events = [], this.modeSegments = [], this.lang = "de", this.dark = !1;
	}
	static {
		this.styles = [
			m(go),
			Oo,
			h`
      .charts { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; margin-top: 12px; }
      .chart { min-height: 220px; }
      .chart h3, .modes h3 { margin: 0 0 4px; font-size: 0.95rem; font-weight: 500; }
      .modes { margin-top: 12px; }
      .band { display: flex; height: 28px; border-radius: 6px; overflow: hidden; margin: 6px 0 8px; }
      .band span { display: block; min-width: 2px; }
      .legend { display: flex; flex-wrap: wrap; gap: 4px 14px; font-size: 0.85rem; }
      .legend i { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 5px; }
    `
		];
	}
	chartTitle(e) {
		let t = this.lang;
		switch (e) {
			case "motion": return `${G("max_height", t)} / ${G("max_speed", t)}`;
			case "power": return G("battery", t);
			case "cell": return G("chart_cell_deviation", t);
			case "temp": return G("chart_temperature", t);
			case "attitude": return G("chart_attitude", t);
			case "discharge": return G("chart_discharge", t);
			case "signal": return G("chart_signal_time", t);
			default: return G("chart_signal_distance", t);
		}
	}
	renderModeBand() {
		let e = ht(this.modeSegments, this.lang);
		return e.segments.length === 0 ? V : B`<div class="card modes" id="modes">
      <h3>${G("flight_mode", this.lang)}</h3>
      <div class="band" role="img" aria-label=${e.legend.map((e) => `${e.label} ${Ie(e.seconds)}`).join(", ")}>
        ${e.segments.map((e) => B`<span style="flex:${e.share};background:${e.color}" title="${e.label}"></span>`)}
      </div>
      <div class="legend">${e.legend.map((e) => B`<span><i style="background:${e.color}"></i>${e.label} <span class="muted">${Ie(e.seconds)}</span></span>`)}</div>
    </div>`;
	}
	render() {
		return this.points.length < 2 ? B`<p class="muted">${G("no_history", this.lang)}</p>` : B`${this.renderModeBand()}<div class="charts">
      ${Ao(this.points).map((e) => B`<div class="card"><h3>${this.chartTitle(e)}</h3><div class="chart" id=${e}></div></div>`)}
    </div>`;
	}
	build(e, t, n) {
		let r = this.lang, i = t.clientWidth || 400, a = {
			stroke: n.grid,
			width: 1
		}, o = (e) => ({
			stroke: n.axis,
			grid: { stroke: n.grid },
			label: e
		}), s = (e, t, r, i = 3, o = !0) => ({
			scale: t,
			label: r,
			stroke: e,
			grid: o ? a : { show: !1 },
			ticks: { stroke: n.grid },
			side: i,
			size: 50
		}), c = this.events.length > 0 ? [jo(this.events)] : [], l = {
			width: i,
			height: ko,
			legend: { show: !0 }
		};
		switch (e) {
			case "motion": {
				let e = vo(this.points);
				return new ho({
					...l,
					plugins: c,
					scales: {
						x: { time: !1 },
						m: {},
						kmh: {}
					},
					axes: [
						o("min"),
						s(n.height, "m", "m"),
						s(n.speed, "kmh", "km/h", 1, !1)
					],
					series: [
						{},
						{
							label: "m",
							stroke: n.height,
							scale: "m",
							width: 2
						},
						{
							label: "km/h",
							stroke: n.speed,
							scale: "kmh",
							width: 2
						}
					]
				}, [
					e.time,
					e.height,
					e.speedKmh
				], t);
			}
			case "power": {
				let e = vo(this.points);
				return new ho({
					...l,
					plugins: c,
					scales: {
						x: { time: !1 },
						v: {},
						a: {},
						pct: { range: [0, 100] }
					},
					axes: [
						o("min"),
						s(n.voltage, "v", "V"),
						s(n.current, "a", "A", 1, !1)
					],
					series: [
						{},
						{
							label: "V",
							stroke: n.voltage,
							scale: "v",
							width: 2,
							spanGaps: !1
						},
						{
							label: "A",
							stroke: n.current,
							scale: "a",
							width: 2,
							spanGaps: !1
						},
						{
							label: "%",
							stroke: n.charge,
							scale: "pct",
							width: 1,
							dash: [4, 4]
						}
					]
				}, [
					e.time,
					e.voltage,
					e.current,
					e.charge
				], t);
			}
			case "cell": {
				let e = So(this.points), r = e.time.map(() => 20);
				return new ho({
					...l,
					plugins: c,
					scales: {
						x: { time: !1 },
						mv: { range: (e, t, n) => [0, Math.max(n, 25) * 1.05] }
					},
					axes: [o("min"), s(n.cell, "mv", "mV")],
					series: [
						{},
						{
							label: "mV",
							stroke: n.cell,
							scale: "mv",
							width: 2,
							spanGaps: !1
						},
						{
							label: "20 mV",
							stroke: n.limit,
							scale: "mv",
							width: 1,
							dash: [4, 4]
						}
					]
				}, [
					e.time,
					e.cellDevMv,
					r
				], t);
			}
			case "temp": {
				let e = So(this.points);
				return new ho({
					...l,
					plugins: c,
					scales: {
						x: { time: !1 },
						c: {}
					},
					axes: [o("min"), s(n.temp, "c", "°C")],
					series: [{}, {
						label: "°C",
						stroke: n.temp,
						scale: "c",
						width: 2,
						spanGaps: !1
					}]
				}, [e.time, e.temp], t);
			}
			case "attitude": {
				let e = So(this.points);
				return new ho({
					...l,
					plugins: c,
					scales: {
						x: { time: !1 },
						deg: {}
					},
					axes: [o("min"), s(n.pitch, "deg", "°")],
					series: [
						{},
						{
							label: G("pitch", r),
							stroke: n.pitch,
							scale: "deg",
							width: 1.5,
							spanGaps: !1
						},
						{
							label: G("roll", r),
							stroke: n.roll,
							scale: "deg",
							width: 1.5,
							spanGaps: !1
						}
					]
				}, [
					e.time,
					e.pitch,
					e.roll
				], t);
			}
			case "discharge": {
				let e = To(this.points);
				return new ho({
					...l,
					scales: {
						x: {
							time: !1,
							dir: -1
						},
						v: {}
					},
					axes: [o(G("charge_state", r)), s(n.discharge, "v", "V")],
					series: [{}, {
						label: "V",
						stroke: n.discharge,
						scale: "v",
						width: 2
					}]
				}, [e.charge, e.voltage], t);
			}
			case "signal": {
				let e = Co(this.points), i = e.time.map(() => 30);
				return new ho({
					...l,
					plugins: c,
					scales: {
						x: { time: !1 },
						pct: { range: [0, 100] }
					},
					axes: [o("min"), s(n.downlink, "pct", "%")],
					series: [
						{},
						{
							label: G("downlink", r),
							stroke: n.downlink,
							scale: "pct",
							width: 2,
							spanGaps: !1
						},
						{
							label: G("uplink", r),
							stroke: n.uplink,
							scale: "pct",
							width: 2,
							spanGaps: !1
						},
						{
							label: "30 %",
							stroke: n.weak,
							scale: "pct",
							width: 1,
							dash: [4, 4]
						}
					]
				}, [
					e.time,
					e.dl,
					e.ul,
					i
				], t);
			}
			case "distance": {
				let e = wo(this.points);
				return new ho({
					...l,
					legend: { show: !1 },
					scales: {
						x: { time: !1 },
						pct: { range: [0, 100] }
					},
					axes: [o(G("distance_m", r)), s(n.downlink, "pct", "%")],
					series: [{}, {
						label: G("downlink", r),
						stroke: n.downlink,
						scale: "pct",
						width: 0,
						points: {
							show: !0,
							size: 4,
							fill: n.downlink,
							stroke: n.downlink
						}
					}]
				}, [e.dist, e.dl], t);
			}
		}
	}
	updated() {
		if (this.destroyPlots(), this.points.length < 2 || !_o()) return;
		let e = Do(this.dark);
		try {
			for (let t of Ao(this.points)) {
				let n = this.renderRoot.querySelector(`#${t}`);
				if (!n) continue;
				let r = this.build(t, n, e);
				r && this.plots.set(t, r);
			}
			this.resizeObserver ??= typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(() => this.resize());
			let t = this.renderRoot.querySelector("#motion");
			t && this.resizeObserver?.observe(t);
		} catch {
			this.destroyPlots();
		}
	}
	resize() {
		for (let [e, t] of this.plots) {
			let n = this.renderRoot.querySelector(`#${e}`);
			n && t.setSize({
				width: n.clientWidth,
				height: ko
			});
		}
	}
	destroyPlots() {
		this.plots.forEach((e) => e.destroy()), this.plots.clear();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.destroyPlots(), this.resizeObserver?.disconnect();
	}
};
customElements.define("dl-flight-charts", Mo);
// node_modules/leaflet/dist/leaflet.css?inline
var No = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t, n) => {
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
		}), z = 6378137, ae = {
			R: z,
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
				var e = z * Math.PI;
				return new M([-e, -e], [e, e]);
			})()
		};
		function oe(e, t, n, r) {
			_(e) ? (this._a = e[0], this._b = e[1], this._c = e[2], this._d = e[3]) : (this._a = e, this._b = t, this._c = n, this._d = r);
		}
		oe.prototype = {
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
		function se(e, t, n, r) {
			return new oe(e, t, n, r);
		}
		var ce = n({}, R, {
			code: "EPSG:3857",
			projection: ae,
			transformation: function() {
				var e = .5 / (Math.PI * ae.R);
				return se(e, .5, -e, .5);
			}()
		}), le = n({}, ce, { code: "EPSG:900913" });
		function ue(e) {
			return document.createElementNS("http://www.w3.org/2000/svg", e);
		}
		function de(e, t) {
			for (var n = "", r = 0, i, a = e.length, o, s, c; r < a; r++) {
				for (s = e[r], i = 0, o = s.length; i < o; i++) c = s[i], n += (i ? "L" : "M") + c.x + " " + c.y;
				n += t ? W.svg ? "z" : "x" : "";
			}
			return n || "M0 0";
		}
		var fe = document.documentElement.style, pe = "ActiveXObject" in window, me = pe && !document.addEventListener, B = "msLaunchUri" in navigator && !("documentMode" in document), he = Ge("webkit"), V = Ge("android"), ge = Ge("android 2") || Ge("android 3"), _e = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), ve = V && Ge("Google") && _e < 537 && !("AudioNode" in window), H = !!window.opera, U = !B && Ge("chrome"), ye = Ge("gecko") && !he && !H && !pe, be = !U && Ge("safari"), xe = Ge("phantom"), Se = "OTransition" in fe, Ce = navigator.platform.indexOf("Win") === 0, we = pe && "transition" in fe, Te = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !ge, Ee = "MozPerspective" in fe, De = !window.L_DISABLE_3D && (we || Te || Ee) && !Se && !xe, Oe = typeof orientation < "u" || Ge("mobile"), ke = Oe && he, Ae = Oe && Te, je = !window.PointerEvent && window.MSPointerEvent, Me = !!(window.PointerEvent || je), Ne = "ontouchstart" in window || !!window.TouchEvent, Pe = !window.L_NO_TOUCH && (Ne || Me), Fe = Oe && H, Ie = Oe && ye, Le = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Re = function() {
			var e = !1;
			try {
				var t = Object.defineProperty({}, "passive", { get: function() {
					e = !0;
				} });
				window.addEventListener("testPassiveEventSupport", l, t), window.removeEventListener("testPassiveEventSupport", l, t);
			} catch {}
			return e;
		}(), ze = function() {
			return !!document.createElement("canvas").getContext;
		}(), Be = !!(document.createElementNS && ue("svg").createSVGRect), Ve = !!Be && (function() {
			var e = document.createElement("div");
			return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
		})(), He = !Be && function() {
			try {
				var e = document.createElement("div");
				e.innerHTML = "<v:shape adj=\"1\"/>";
				var t = e.firstChild;
				return t.style.behavior = "url(#default#VML)", t && typeof t.adj == "object";
			} catch {
				return !1;
			}
		}(), Ue = navigator.platform.indexOf("Mac") === 0, We = navigator.platform.indexOf("Linux") === 0;
		function Ge(e) {
			return navigator.userAgent.toLowerCase().indexOf(e) >= 0;
		}
		var W = {
			ie: pe,
			ielt9: me,
			edge: B,
			webkit: he,
			android: V,
			android23: ge,
			androidStock: ve,
			opera: H,
			chrome: U,
			gecko: ye,
			safari: be,
			phantom: xe,
			opera12: Se,
			win: Ce,
			ie3d: we,
			webkit3d: Te,
			gecko3d: Ee,
			any3d: De,
			mobile: Oe,
			mobileWebkit: ke,
			mobileWebkit3d: Ae,
			msPointer: je,
			pointer: Me,
			touch: Pe,
			touchNative: Ne,
			mobileOpera: Fe,
			mobileGecko: Ie,
			retina: Le,
			passiveEvents: Re,
			canvas: ze,
			svg: Be,
			vml: He,
			inlineSvg: Ve,
			mac: Ue,
			linux: We
		}, Ke = W.msPointer ? "MSPointerDown" : "pointerdown", qe = W.msPointer ? "MSPointerMove" : "pointermove", G = W.msPointer ? "MSPointerUp" : "pointerup", Je = W.msPointer ? "MSPointerCancel" : "pointercancel", Ye = {
			touchstart: Ke,
			touchmove: qe,
			touchend: G,
			touchcancel: Je
		}, Xe = {
			touchstart: ot,
			touchmove: at,
			touchend: at,
			touchcancel: at
		}, Ze = {}, Qe = !1;
		function $e(e, t, n) {
			return t === "touchstart" && it(), Xe[t] ? (n = Xe[t].bind(this, n), e.addEventListener(Ye[t], n, !1), n) : (console.warn("wrong event specified:", t), l);
		}
		function et(e, t, n) {
			Ye[t] ? e.removeEventListener(Ye[t], n, !1) : console.warn("wrong event specified:", t);
		}
		function tt(e) {
			Ze[e.pointerId] = e;
		}
		function nt(e) {
			Ze[e.pointerId] && (Ze[e.pointerId] = e);
		}
		function rt(e) {
			delete Ze[e.pointerId];
		}
		function it() {
			Qe ||= (document.addEventListener(Ke, tt, !0), document.addEventListener(qe, nt, !0), document.addEventListener(G, rt, !0), document.addEventListener(Je, rt, !0), !0);
		}
		function at(e, t) {
			if (t.pointerType !== (t.MSPOINTER_TYPE_MOUSE || "mouse")) {
				for (var n in t.touches = [], Ze) t.touches.push(Ze[n]);
				t.changedTouches = [t], e(t);
			}
		}
		function ot(e, t) {
			t.MSPOINTER_TYPE_TOUCH && t.pointerType === t.MSPOINTER_TYPE_TOUCH && Qt(t), at(e, t);
		}
		function st(e) {
			var t = {}, n, r;
			for (r in e) n = e[r], t[r] = n && n.bind ? n.bind(e) : n;
			return e = t, t.type = "dblclick", t.detail = 2, t.isTrusted = !1, t._simulated = !0, t;
		}
		var ct = 200;
		function lt(e, t) {
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
						a - n <= ct ? (r++, r === 2 && t(st(e))) : r = 1, n = a;
					}
				}
			}
			return e.addEventListener("click", i), {
				dblclick: t,
				simDblclick: i
			};
		}
		function ut(e, t) {
			e.removeEventListener("dblclick", t.dblclick), e.removeEventListener("click", t.simDblclick);
		}
		var dt = Et([
			"transform",
			"webkitTransform",
			"OTransform",
			"MozTransform",
			"msTransform"
		]), ft = Et([
			"webkitTransition",
			"transition",
			"OTransition",
			"MozTransition",
			"msTransition"
		]), pt = ft === "webkitTransition" || ft === "OTransition" ? ft + "End" : "transitionend";
		function mt(e) {
			return typeof e == "string" ? document.getElementById(e) : e;
		}
		function ht(e, t) {
			var n = e.style[t] || e.currentStyle && e.currentStyle[t];
			if ((!n || n === "auto") && document.defaultView) {
				var r = document.defaultView.getComputedStyle(e, null);
				n = r ? r[t] : null;
			}
			return n === "auto" ? null : n;
		}
		function K(e, t, n) {
			var r = document.createElement(e);
			return r.className = t || "", n && n.appendChild(r), r;
		}
		function gt(e) {
			var t = e.parentNode;
			t && t.removeChild(e);
		}
		function _t(e) {
			for (; e.firstChild;) e.removeChild(e.firstChild);
		}
		function vt(e) {
			var t = e.parentNode;
			t && t.lastChild !== e && t.appendChild(e);
		}
		function yt(e) {
			var t = e.parentNode;
			t && t.firstChild !== e && t.insertBefore(e, t.firstChild);
		}
		function bt(e, t) {
			if (e.classList !== void 0) return e.classList.contains(t);
			var n = Ct(e);
			return n.length > 0 && RegExp("(^|\\s)" + t + "(\\s|$)").test(n);
		}
		function q(e, t) {
			if (e.classList !== void 0) for (var n = f(t), r = 0, i = n.length; r < i; r++) e.classList.add(n[r]);
			else if (!bt(e, t)) {
				var a = Ct(e);
				St(e, (a ? a + " " : "") + t);
			}
		}
		function xt(e, t) {
			e.classList === void 0 ? St(e, d((" " + Ct(e) + " ").replace(" " + t + " ", " "))) : e.classList.remove(t);
		}
		function St(e, t) {
			e.className.baseVal === void 0 ? e.className = t : e.className.baseVal = t;
		}
		function Ct(e) {
			return e.correspondingElement && (e = e.correspondingElement), e.className.baseVal === void 0 ? e.className : e.className.baseVal;
		}
		function wt(e, t) {
			"opacity" in e.style ? e.style.opacity = t : "filter" in e.style && Tt(e, t);
		}
		function Tt(e, t) {
			var n = !1, r = "DXImageTransform.Microsoft.Alpha";
			try {
				n = e.filters.item(r);
			} catch {
				if (t === 1) return;
			}
			t = Math.round(t * 100), n ? (n.Enabled = t !== 100, n.Opacity = t) : e.style.filter += " progid:" + r + "(opacity=" + t + ")";
		}
		function Et(e) {
			for (var t = document.documentElement.style, n = 0; n < e.length; n++) if (e[n] in t) return e[n];
			return !1;
		}
		function Dt(e, t, n) {
			var r = t || new A(0, 0);
			e.style[dt] = (W.ie3d ? "translate(" + r.x + "px," + r.y + "px)" : "translate3d(" + r.x + "px," + r.y + "px,0)") + (n ? " scale(" + n + ")" : "");
		}
		function Ot(e, t) {
			e._leaflet_pos = t, W.any3d ? Dt(e, t) : (e.style.left = t.x + "px", e.style.top = t.y + "px");
		}
		function kt(e) {
			return e._leaflet_pos || new A(0, 0);
		}
		var At, jt, Mt;
		if ("onselectstart" in document) At = function() {
			J(window, "selectstart", Qt);
		}, jt = function() {
			Wt(window, "selectstart", Qt);
		};
		else {
			var Nt = Et([
				"userSelect",
				"WebkitUserSelect",
				"OUserSelect",
				"MozUserSelect",
				"msUserSelect"
			]);
			At = function() {
				if (Nt) {
					var e = document.documentElement.style;
					Mt = e[Nt], e[Nt] = "none";
				}
			}, jt = function() {
				Nt && (document.documentElement.style[Nt] = Mt, Mt = void 0);
			};
		}
		function Pt() {
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
			TRANSFORM: dt,
			TRANSITION: ft,
			TRANSITION_END: pt,
			get: mt,
			getStyle: ht,
			create: K,
			remove: gt,
			empty: _t,
			toFront: vt,
			toBack: yt,
			hasClass: bt,
			addClass: q,
			removeClass: xt,
			setClass: St,
			getClass: Ct,
			setOpacity: wt,
			testProp: Et,
			setTransform: Dt,
			setPosition: Ot,
			getPosition: kt,
			get disableTextSelection() {
				return At;
			},
			get enableTextSelection() {
				return jt;
			},
			disableImageDrag: Pt,
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
			!W.touchNative && W.pointer && t.indexOf("touch") === 0 ? a = $e(e, t, a) : W.touch && t === "dblclick" ? a = lt(e, a) : "addEventListener" in e ? t === "touchstart" || t === "touchmove" || t === "wheel" || t === "mousewheel" ? e.addEventListener(Kt[t] || t, a, W.passiveEvents ? { passive: !1 } : !1) : t === "mouseenter" || t === "mouseleave" ? (a = function(t) {
				t ||= window.event, rn(e, t) && s(t);
			}, e.addEventListener(Kt[t], a, !1)) : e.addEventListener(t, s, !1) : e.attachEvent("on" + t, a), e[Ut] = e[Ut] || {}, e[Ut][i] = a;
		}
		function Jt(e, t, n, r, i) {
			i ||= t + o(n) + (r ? "_" + o(r) : "");
			var a = e[Ut] && e[Ut][i];
			if (!a) return this;
			!W.touchNative && W.pointer && t.indexOf("touch") === 0 ? et(e, t, a) : W.touch && t === "dblclick" ? ut(e, a) : "removeEventListener" in e ? e.removeEventListener(Kt[t] || t, a, !1) : e.detachEvent("on" + t, a), e[Ut][i] = null;
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
		var nn = W.linux && W.chrome ? window.devicePixelRatio : W.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
		function Y(e) {
			return W.edge ? e.wheelDeltaY / 2 : e.deltaY && e.deltaMode === 0 ? -e.deltaY / nn : e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : e.deltaX || e.deltaZ ? 0 : e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : e.detail ? e.detail / -32765 * 60 : 0;
		}
		function rn(e, t) {
			var n = t.relatedTarget;
			if (!n) return !0;
			try {
				for (; n && n !== e;) n = n.parentNode;
			} catch {
				return !1;
			}
			return n !== e;
		}
		var an = {
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
			getWheelDelta: Y,
			isExternalTarget: rn,
			addListener: J,
			removeListener: Wt
		}, on = k.extend({
			run: function(e, t, n, r) {
				this.stop(), this._el = e, this._inProgress = !0, this._duration = n || .25, this._easeOutPower = 1 / Math.max(r || .5, .2), this._startPos = kt(e), this._offset = t.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
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
				t && n._round(), Ot(this._el, n), this.fire("step");
			},
			_complete: function() {
				E(this._animId), this._inProgress = !1, this.fire("end");
			},
			_easeOut: function(e) {
				return 1 - (1 - e) ** this._easeOutPower;
			}
		}), X = k.extend({
			options: {
				crs: ce,
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
				t = p(this, t), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(e), this._initLayout(), this._onResize = i(this._onResize, this), this._initEvents(), t.maxBounds && this.setMaxBounds(t.maxBounds), t.zoom !== void 0 && (this._zoom = this._limitZoom(t.zoom)), t.center && t.zoom !== void 0 && this.setView(F(t.center), t.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = ft && W.any3d && !W.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), J(this._proxy, pt, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
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
				return e ||= W.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom + e, t);
			},
			zoomOut: function(e, t) {
				return e ||= W.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom - e, t);
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
				if (this._panAnim || (this._panAnim = new on(), this._panAnim.on({
					step: this._onPanTransitionStep,
					end: this._onPanTransitionEnd
				}, this)), t.noMoveStart || this.fire("movestart"), t.animate !== !1) {
					q(this._mapPane, "leaflet-pan-anim");
					var n = this._getMapPanePos().subtract(e).round();
					this._panAnim.run(this._mapPane, n, t.duration || .25, t.easeLinearity);
				} else this._rawPanBy(e), this.fire("move").fire("moveend");
				return this;
			},
			flyTo: function(e, t, n) {
				if (n ||= {}, n.animate === !1 || !W.any3d) return this.setView(e, t, n);
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
				for (var e in this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), gt(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest &&= (E(this._resizeRequest), null), this._clearHandlers(), this._loaded && this.fire("unload"), this._layers) this._layers[e].remove();
				for (e in this._panes) gt(this._panes[e]);
				return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
			},
			createPane: function(e, t) {
				var n = K("div", "leaflet-pane" + (e ? " leaflet-" + e.replace("Pane", "") + "-pane" : ""), t || this._mapPane);
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
				var r = this.getZoom() || 0, i = this.getMinZoom(), a = this.getMaxZoom(), o = e.getNorthWest(), s = e.getSouthEast(), c = this.getSize().subtract(n), l = re(this.project(s, r), this.project(o, r)).getSize(), u = W.any3d ? this.options.zoomSnap : 1, d = c.x / l.x, f = c.y / l.y, p = t ? Math.max(d, f) : Math.min(d, f);
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
				var t = this._container = mt(e);
				if (!t) throw Error("Map container not found.");
				if (t._leaflet_id) throw Error("Map container is already initialized.");
				J(t, "scroll", this._onScroll, this), this._containerId = o(t);
			},
			_initLayout: function() {
				var e = this._container;
				this._fadeAnimated = this.options.fadeAnimation && W.any3d, q(e, "leaflet-container" + (W.touch ? " leaflet-touch" : "") + (W.retina ? " leaflet-retina" : "") + (W.ielt9 ? " leaflet-oldie" : "") + (W.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
				var t = ht(e, "position");
				t !== "absolute" && t !== "relative" && t !== "fixed" && t !== "sticky" && (e.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
			},
			_initPanes: function() {
				var e = this._panes = {};
				this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Ot(this._mapPane, new A(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (q(e.markerPane, "leaflet-zoom-hide"), q(e.shadowPane, "leaflet-zoom-hide"));
			},
			_resetView: function(e, t, n) {
				Ot(this._mapPane, new A(0, 0));
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
				Ot(this._mapPane, this._getMapPanePos().subtract(e));
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
				t(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && t(window, "resize", this._onResize, this), W.any3d && this.options.transform3DLimit && (e ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
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
					if (r && r.listens(t, !0) && (i && !rn(a, e) || (n.push(r), i)) || a === this._container) break;
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
				return kt(this._mapPane) || new A(0, 0);
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
				var t = this.getMinZoom(), n = this.getMaxZoom(), r = W.any3d ? this.options.zoomSnap : 1;
				return r && (e = Math.round(e / r) * r), Math.max(t, Math.min(n, e));
			},
			_onPanTransitionStep: function() {
				this.fire("move");
			},
			_onPanTransitionEnd: function() {
				xt(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
			},
			_tryAnimatedPan: function(e, t) {
				var n = this._getCenterOffset(e)._trunc();
				return (t && t.animate) !== !0 && !this.getSize().contains(n) ? !1 : (this.panBy(n, t), !0);
			},
			_createAnimProxy: function() {
				var e = this._proxy = K("div", "leaflet-proxy leaflet-zoom-animated");
				this._panes.mapPane.appendChild(e), this.on("zoomanim", function(e) {
					var t = dt, n = this._proxy.style[t];
					Dt(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === this._proxy.style[t] && this._animatingZoom && this._onZoomTransitionEnd();
				}, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
			},
			_destroyAnimProxy: function() {
				gt(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
			},
			_animMoveEnd: function() {
				var e = this.getCenter(), t = this.getZoom();
				Dt(this._proxy, this.project(e, t), this.getZoomScale(t, 1));
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
				this._mapPane && (n && (this._animatingZoom = !0, this._animateToCenter = e, this._animateToZoom = t, q(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
					center: e,
					zoom: t,
					noUpdate: r
				}), this._tempFireZoomEvent ||= this._zoom !== this._animateToZoom, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(i(this._onZoomTransitionEnd, this), 250));
			},
			_onZoomTransitionEnd: function() {
				this._animatingZoom && (this._mapPane && xt(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
			}
		});
		function sn(e, t) {
			return new X(e, t);
		}
		var cn = O.extend({
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
				return q(t, "leaflet-control"), n.indexOf("bottom") === -1 ? r.appendChild(t) : r.insertBefore(t, r.firstChild), this._map.on("unload", this.remove, this), this;
			},
			remove: function() {
				return this._map &&= (gt(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), null), this;
			},
			_refocusOnMap: function(e) {
				this._map && e && e.screenX > 0 && e.screenY > 0 && this._map.getContainer().focus();
			}
		}), ln = function(e) {
			return new cn(e);
		};
		X.include({
			addControl: function(e) {
				return e.addTo(this), this;
			},
			removeControl: function(e) {
				return e.remove(), this;
			},
			_initControlPos: function() {
				var e = this._controlCorners = {}, t = "leaflet-", n = this._controlContainer = K("div", t + "control-container", this._container);
				function r(r, i) {
					var a = t + r + " " + t + i;
					e[r + i] = K("div", a, n);
				}
				r("top", "left"), r("top", "right"), r("bottom", "left"), r("bottom", "right");
			},
			_clearControlPos: function() {
				for (var e in this._controlCorners) gt(this._controlCorners[e]);
				gt(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
			}
		});
		var un = cn.extend({
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
				return cn.prototype.addTo.call(this, e), this._expandIfNotCollapsed();
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
				q(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
				var e = this._map.getSize().y - (this._container.offsetTop + 50);
				return e < this._section.clientHeight ? (q(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = e + "px") : xt(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
			},
			collapse: function() {
				return xt(this._container, "leaflet-control-layers-expanded"), this;
			},
			_initLayout: function() {
				var e = "leaflet-control-layers", t = this._container = K("div", e), n = this.options.collapsed;
				t.setAttribute("aria-haspopup", !0), Zt(t), Xt(t);
				var r = this._section = K("section", e + "-list");
				n && (this._map.on("click", this.collapse, this), J(t, {
					mouseenter: this._expandSafely,
					mouseleave: this.collapse
				}, this));
				var i = this._layersLink = K("a", e + "-toggle", t);
				i.href = "#", i.title = "Layers", i.setAttribute("role", "button"), J(i, {
					keydown: function(e) {
						e.keyCode === 13 && this._expandSafely();
					},
					click: function(e) {
						Qt(e), this._expandSafely();
					}
				}, this), n || this.expand(), this._baseLayersList = K("div", e + "-base", r), this._separator = K("div", e + "-separator", r), this._overlaysList = K("div", e + "-overlays", r), t.appendChild(r);
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
				_t(this._baseLayersList), _t(this._overlaysList), this._layerControlInputs = [];
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
			return new un(e, t, n);
		}, fn = cn.extend({
			options: {
				position: "topleft",
				zoomInText: "<span aria-hidden=\"true\">+</span>",
				zoomInTitle: "Zoom in",
				zoomOutText: "<span aria-hidden=\"true\">&#x2212;</span>",
				zoomOutTitle: "Zoom out"
			},
			onAdd: function(e) {
				var t = "leaflet-control-zoom", n = K("div", t + " leaflet-bar"), r = this.options;
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
				var a = K("a", n, r);
				return a.innerHTML = e, a.href = "#", a.title = t, a.setAttribute("role", "button"), a.setAttribute("aria-label", t), Zt(a), J(a, "click", $t), J(a, "click", i, this), J(a, "click", this._refocusOnMap, this), a;
			},
			_updateDisabled: function() {
				var e = this._map, t = "leaflet-disabled";
				xt(this._zoomInButton, t), xt(this._zoomOutButton, t), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || e._zoom === e.getMinZoom()) && (q(this._zoomOutButton, t), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || e._zoom === e.getMaxZoom()) && (q(this._zoomInButton, t), this._zoomInButton.setAttribute("aria-disabled", "true"));
			}
		});
		X.mergeOptions({ zoomControl: !0 }), X.addInitHook(function() {
			this.options.zoomControl && (this.zoomControl = new fn(), this.addControl(this.zoomControl));
		});
		var pn = function(e) {
			return new fn(e);
		}, mn = cn.extend({
			options: {
				position: "bottomleft",
				maxWidth: 100,
				metric: !0,
				imperial: !0
			},
			onAdd: function(e) {
				var t = "leaflet-control-scale", n = K("div", t), r = this.options;
				return this._addScales(r, t + "-line", n), e.on(r.updateWhenIdle ? "moveend" : "move", this._update, this), e.whenReady(this._update, this), n;
			},
			onRemove: function(e) {
				e.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
			},
			_addScales: function(e, t, n) {
				e.metric && (this._mScale = K("div", t, n)), e.imperial && (this._iScale = K("div", t, n));
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
		}, gn = cn.extend({
			options: {
				position: "bottomright",
				prefix: "<a href=\"https://leafletjs.com\" title=\"A JavaScript library for interactive maps\">" + (W.inlineSvg ? "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"8\" viewBox=\"0 0 12 8\" class=\"leaflet-attribution-flag\"><path fill=\"#4C7BE1\" d=\"M0 0h12v4H0z\"/><path fill=\"#FFD500\" d=\"M0 4h12v3H0z\"/><path fill=\"#E0BC00\" d=\"M0 7h12v1H0z\"/></svg> " : "") + "Leaflet</a>"
			},
			initialize: function(e) {
				p(this, e), this._attributions = {};
			},
			onAdd: function(e) {
				for (var t in e.attributionControl = this, this._container = K("div", "leaflet-control-attribution"), Zt(this._container), e._layers) e._layers[t].getAttribution && this.addAttribution(e._layers[t].getAttribution());
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
		X.mergeOptions({ attributionControl: !0 }), X.addInitHook(function() {
			this.options.attributionControl && new gn().addTo(this);
		}), cn.Layers = un, cn.Zoom = fn, cn.Scale = mn, cn.Attribution = gn, ln.layers = dn, ln.zoom = pn, ln.scale = hn, ln.attribution = function(e) {
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
		var vn = { Events: te }, yn = W.touch ? "touchstart mousedown" : "mousedown", bn = k.extend({
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
				if (this._enabled && (this._moved = !1, !bt(this._element, "leaflet-zoom-anim"))) {
					if (e.touches && e.touches.length !== 1) bn._dragging === this && this.finishDrag();
					else if (!(bn._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) && (bn._dragging = this, this._preventOutline && Rt(this._element), Pt(), At(), !this._moving)) {
						this.fire("down");
						var t = e.touches ? e.touches[0] : e, n = Bt(this._element);
						this._startPoint = new A(t.clientX, t.clientY), this._startPos = kt(this._element), this._parentScale = Vt(n);
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
						(n.x || n.y) && (Math.abs(n.x) + Math.abs(n.y) < this.options.clickTolerance || (n.x /= this._parentScale.x, n.y /= this._parentScale.y, Qt(e), this._moved || (this.fire("dragstart"), this._moved = !0, q(document.body, "leaflet-dragging"), this._lastTarget = e.target || e.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), q(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(n), this._moving = !0, this._lastEvent = e, this._updatePosition()));
					}
				}
			},
			_updatePosition: function() {
				var e = { originalEvent: this._lastEvent };
				this.fire("predrag", e), Ot(this._element, this._newPos), this.fire("drag", e);
			},
			_onUp: function() {
				this._enabled && this.finishDrag();
			},
			finishDrag: function(e) {
				xt(document.body, "leaflet-dragging"), this._lastTarget &&= (xt(this._lastTarget, "leaflet-drag-target"), null), Wt(document, "mousemove touchmove", this._onMove, this), Wt(document, "mouseup touchend touchcancel", this._onUp, this), Ft(), jt();
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
			], a = 0, o, s, c, l, u = e.length, d, f; a < u; a++) e[a]._code = Z(e[a], t);
			for (s = 0; s < 4; s++) {
				for (d = i[s], r = [], a = 0, u = e.length, o = u - 1; a < u; o = a++) c = e[a], l = e[o], c._code & d ? l._code & d || (f = Nn(l, c, d, t, n), f._code = Z(f, t), r.push(f)) : (l._code & d && (f = Nn(l, c, d, t, n), f._code = Z(f, t), r.push(f)), r.push(c));
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
			var a = r ? jn : Z(e, n), o = Z(t, n), s, c, l;
			for (jn = o;;) {
				if (!(a | o)) return [e, t];
				if (a & o) return !1;
				s = a || o, c = Nn(e, t, s, n, i), l = Z(c, n), s === a ? (e = c, a = l) : (t = c, o = l);
			}
		}
		function Nn(e, t, n, r, i) {
			var a = t.x - e.x, o = t.y - e.y, s = r.min, c = r.max, l, u;
			return n & 8 ? (l = e.x + a * (c.y - e.y) / o, u = c.y) : n & 4 ? (l = e.x + a * (s.y - e.y) / o, u = s.y) : n & 2 ? (l = c.x, u = e.y + o * (c.x - e.x) / a) : n & 1 && (l = s.x, u = e.y + o * (s.x - e.x) / a), new A(l, u, i);
		}
		function Z(e, t) {
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
			_getEdgeIntersection: Nn,
			_getBitCode: Z,
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
			SphericalMercator: ae
		}, Un = n({}, R, {
			code: "EPSG:3395",
			projection: Vn,
			transformation: function() {
				var e = .5 / (Math.PI * Vn.R);
				return se(e, .5, -e, .5);
			}()
		}), Wn = n({}, R, {
			code: "EPSG:4326",
			projection: Bn,
			transformation: se(1 / 180, 1, -1 / 180, .5)
		}), Gn = n({}, I, {
			projection: Bn,
			transformation: se(1, 0, -1, 0),
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
		I.Earth = R, I.EPSG3395 = Un, I.EPSG3857 = ce, I.EPSG900913 = le, I.EPSG4326 = Wn, I.Simple = Gn;
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
		X.include({
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
				return W.retina && this.options[e + "RetinaUrl"] || this.options[e + "Url"];
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
				var e = K("div", "leaflet-default-icon-path", document.body), t = ht(e, "background-image") || ht(e, "backgroundImage");
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
				}, this).enable(), q(e, "leaflet-marker-draggable");
			},
			removeHooks: function() {
				this._draggable.off({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).disable(), this._marker._icon && xt(this._marker._icon, "leaflet-marker-draggable");
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			_adjustPan: function(e) {
				var t = this._marker, n = t._map, r = this._marker.options.autoPanSpeed, i = this._marker.options.autoPanPadding, a = kt(t._icon), o = n.getPixelBounds(), s = n.getPixelOrigin(), c = re(o.min._subtract(s).add(i), o.max._subtract(s).subtract(i));
				if (!c.contains(a)) {
					var l = j((Math.max(c.max.x, a.x) - c.max.x) / (o.max.x - c.max.x) - (Math.min(c.min.x, a.x) - c.min.x) / (o.min.x - c.min.x), (Math.max(c.max.y, a.y) - c.max.y) / (o.max.y - c.max.y) - (Math.min(c.min.y, a.y) - c.min.y) / (o.min.y - c.min.y)).multiplyBy(r);
					n.panBy(l, { animate: !1 }), this._draggable._newPos._add(l), this._draggable._startPos._add(l), Ot(t._icon, this._draggable._newPos), this._onDrag(e), this._panRequest = T(this._adjustPan.bind(this, e));
				}
			},
			_onDragStart: function() {
				this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
			},
			_onPreDrag: function(e) {
				this._marker.options.autoPan && (E(this._panRequest), this._panRequest = T(this._adjustPan.bind(this, e)));
			},
			_onDrag: function(e) {
				var t = this._marker, n = t._shadow, r = kt(t._icon), i = t._map.layerPointToLatLng(r);
				n && Ot(n, r), t._latlng = i, e.latlng = i, e.oldLatLng = this._oldLatLng, t.fire("move", e).fire("drag", e);
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
				n !== this._icon && (this._icon && this._removeIcon(), r = !0, e.title && (n.title = e.title), n.tagName === "IMG" && (n.alt = e.alt || "")), q(n, t), e.keyboard && (n.tabIndex = "0", n.setAttribute("role", "button")), this._icon = n, e.riseOnHover && this.on({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				}), this.options.autoPanOnFocus && J(n, "focus", this._panOnFocus, this);
				var i = e.icon.createShadow(this._shadow), a = !1;
				i !== this._shadow && (this._removeShadow(), a = !0), i && (q(i, t), i.alt = ""), this._shadow = i, e.opacity < 1 && this._updateOpacity(), r && this.getPane().appendChild(this._icon), this._initInteraction(), i && a && this.getPane(e.shadowPane).appendChild(this._shadow);
			},
			_removeIcon: function() {
				this.options.riseOnHover && this.off({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				}), this.options.autoPanOnFocus && Wt(this._icon, "focus", this._panOnFocus, this), gt(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
			},
			_removeShadow: function() {
				this._shadow && gt(this._shadow), this._shadow = null;
			},
			_setPos: function(e) {
				this._icon && Ot(this._icon, e), this._shadow && Ot(this._shadow, e), this._zIndex = e.y + this.options.zIndexOffset, this._resetZIndex();
			},
			_updateZIndex: function(e) {
				this._icon && (this._icon.style.zIndex = this._zIndex + e);
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center).round();
				this._setPos(t);
			},
			_initInteraction: function() {
				if (this.options.interactive && (q(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), er)) {
					var e = this.options.draggable;
					this.dragging && (e = this.dragging.enabled(), this.dragging.disable()), this.dragging = new er(this), e && this.dragging.enable();
				}
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._map && this._updateOpacity(), this;
			},
			_updateOpacity: function() {
				var e = this.options.opacity;
				this._icon && wt(this._icon, e), this._shadow && wt(this._shadow, e);
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
		function Q(e, t) {
			return new tr(e, t);
		}
		var nr = Kn.extend({
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
		}), rr = nr.extend({
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
				return nr.prototype.setStyle.call(this, e), this.setRadius(t), this;
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
		function ir(e, t) {
			return new rr(e, t);
		}
		var ar = rr.extend({
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
			setStyle: nr.prototype.setStyle,
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
		function or(e, t, n) {
			return new ar(e, t, n);
		}
		var sr = nr.extend({
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
		function cr(e, t) {
			return new sr(e, t);
		}
		sr._flat = Ln;
		var lr = sr.extend({
			options: { fill: !0 },
			isEmpty: function() {
				return !this._latlngs.length || !this._latlngs[0].length;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return Sn(this._defaultShape(), this._map.options.crs);
			},
			_convertLatLngs: function(e) {
				var t = sr.prototype._convertLatLngs.call(this, e), n = t.length;
				return n >= 2 && t[0] instanceof P && t[0].equals(t[n - 1]) && t.pop(), t;
			},
			_setLatLngs: function(e) {
				sr.prototype._setLatLngs.call(this, e), In(this._latlngs) && (this._latlngs = [this._latlngs]);
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
				return t || sr.prototype._containsPoint.call(this, e, !0);
			}
		});
		function ur(e, t) {
			return new lr(e, t);
		}
		var dr = Yn.extend({
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
				var o = fr(e, a);
				return o ? (o.feature = yr(e), o.defaultOptions = o.options, this.resetStyle(o), a.onEachFeature && a.onEachFeature(e, o), this.addLayer(o)) : this;
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
		function fr(e, t) {
			var n = e.type === "Feature" ? e.geometry : e, r = n ? n.coordinates : null, i = [], a = t && t.pointToLayer, o = t && t.coordsToLatLng || mr, s, c, l, u;
			if (!r && !n) return null;
			switch (n.type) {
				case "Point": return s = o(r), pr(a, e, s, t);
				case "MultiPoint":
					for (l = 0, u = r.length; l < u; l++) s = o(r[l]), i.push(pr(a, e, s, t));
					return new Yn(i);
				case "LineString":
				case "MultiLineString": return c = hr(r, n.type === "LineString" ? 0 : 1, o), new sr(c, t);
				case "Polygon":
				case "MultiPolygon": return c = hr(r, n.type === "Polygon" ? 1 : 2, o), new lr(c, t);
				case "GeometryCollection":
					for (l = 0, u = n.geometries.length; l < u; l++) {
						var d = fr({
							geometry: n.geometries[l],
							type: "Feature",
							properties: e.properties
						}, t);
						d && i.push(d);
					}
					return new Yn(i);
				case "FeatureCollection":
					for (l = 0, u = n.features.length; l < u; l++) {
						var f = fr(n.features[l], t);
						f && i.push(f);
					}
					return new Yn(i);
				default: throw Error("Invalid GeoJSON object.");
			}
		}
		function pr(e, t, n, r) {
			return e ? e(t, n) : new tr(n, r && r.markersInheritOptions && r);
		}
		function mr(e) {
			return new P(e[1], e[0], e[2]);
		}
		function hr(e, t, n) {
			for (var r = [], i = 0, a = e.length, o; i < a; i++) o = t ? hr(e[i], t - 1, n) : (n || mr)(e[i]), r.push(o);
			return r;
		}
		function gr(e, t) {
			return e = F(e), e.alt === void 0 ? [u(e.lng, t), u(e.lat, t)] : [
				u(e.lng, t),
				u(e.lat, t),
				u(e.alt, t)
			];
		}
		function _r(e, t, n, r) {
			for (var i = [], a = 0, o = e.length; a < o; a++) i.push(t ? _r(e[a], In(e[a]) ? 0 : t - 1, n, r) : gr(e[a], r));
			return !t && n && i.length > 0 && i.push(i[0].slice()), i;
		}
		function vr(e, t) {
			return e.feature ? n({}, e.feature, { geometry: t }) : yr(t);
		}
		function yr(e) {
			return e.type === "Feature" || e.type === "FeatureCollection" ? e : {
				type: "Feature",
				properties: {},
				geometry: e
			};
		}
		var br = { toGeoJSON: function(e) {
			return vr(this, {
				type: "Point",
				coordinates: gr(this.getLatLng(), e)
			});
		} };
		tr.include(br), ar.include(br), rr.include(br), sr.include({ toGeoJSON: function(e) {
			var t = !In(this._latlngs), n = _r(this._latlngs, +!!t, !1, e);
			return vr(this, {
				type: (t ? "Multi" : "") + "LineString",
				coordinates: n
			});
		} }), lr.include({ toGeoJSON: function(e) {
			var t = !In(this._latlngs), n = t && !In(this._latlngs[0]), r = _r(this._latlngs, n ? 2 : +!!t, !0, e);
			return t || (r = [r]), vr(this, {
				type: (n ? "Multi" : "") + "Polygon",
				coordinates: r
			});
		} }), qn.include({
			toMultiPoint: function(e) {
				var t = [];
				return this.eachLayer(function(n) {
					t.push(n.toGeoJSON(e).geometry.coordinates);
				}), vr(this, {
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
							var a = yr(i);
							a.type === "FeatureCollection" ? r.push.apply(r, a.features) : r.push(a);
						}
					}
				}), n ? vr(this, {
					geometries: r,
					type: "GeometryCollection"
				}) : {
					type: "FeatureCollection",
					features: r
				};
			}
		});
		function xr(e, t) {
			return new dr(e, t);
		}
		var Sr = xr, Cr = Kn.extend({
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
				this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (q(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
			},
			onRemove: function() {
				gt(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._image && this._updateOpacity(), this;
			},
			setStyle: function(e) {
				return e.opacity && this.setOpacity(e.opacity), this;
			},
			bringToFront: function() {
				return this._map && vt(this._image), this;
			},
			bringToBack: function() {
				return this._map && yt(this._image), this;
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
				var e = this._url.tagName === "IMG", t = this._image = e ? this._url : K("img");
				q(t, "leaflet-image-layer"), this._zoomAnimated && q(t, "leaflet-zoom-animated"), this.options.className && q(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onload = i(this.fire, this, "load"), t.onerror = i(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (t.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), e ? this._url = t.src : (t.src = this._url, t.alt = this.options.alt);
			},
			_animateZoom: function(e) {
				var t = this._map.getZoomScale(e.zoom), n = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
				Dt(this._image, n, t);
			},
			_reset: function() {
				var e = this._image, t = new M(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())), n = t.getSize();
				Ot(e, t.min), e.style.width = n.x + "px", e.style.height = n.y + "px";
			},
			_updateOpacity: function() {
				wt(this._image, this.options.opacity);
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
		}), wr = function(e, t, n) {
			return new Cr(e, t, n);
		}, Tr = Cr.extend({
			options: {
				autoplay: !0,
				loop: !0,
				keepAspectRatio: !0,
				muted: !1,
				playsInline: !0
			},
			_initImage: function() {
				var e = this._url.tagName === "VIDEO", t = this._image = e ? this._url : K("video");
				if (q(t, "leaflet-image-layer"), this._zoomAnimated && q(t, "leaflet-zoom-animated"), this.options.className && q(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onloadeddata = i(this.fire, this, "load"), e) {
					for (var n = t.getElementsByTagName("source"), r = [], a = 0; a < n.length; a++) r.push(n[a].src);
					this._url = n.length > 0 ? r : [t.src];
				} else {
					_(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(t.style, "objectFit") && (t.style.objectFit = "fill"), t.autoplay = !!this.options.autoplay, t.loop = !!this.options.loop, t.muted = !!this.options.muted, t.playsInline = !!this.options.playsInline;
					for (var o = 0; o < this._url.length; o++) {
						var s = K("source");
						s.src = this._url[o], t.appendChild(s);
					}
				}
			}
		});
		function Er(e, t, n) {
			return new Tr(e, t, n);
		}
		var Dr = Cr.extend({ _initImage: function() {
			var e = this._image = this._url;
			q(e, "leaflet-image-layer"), this._zoomAnimated && q(e, "leaflet-zoom-animated"), this.options.className && q(e, this.options.className), e.onselectstart = l, e.onmousemove = l;
		} });
		function Or(e, t, n) {
			return new Dr(e, t, n);
		}
		var kr = Kn.extend({
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
				this._zoomAnimated = e._zoomAnimated, this._container || this._initLayout(), e._fadeAnimated && wt(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), e._fadeAnimated && wt(this._container, 1), this.bringToFront(), this.options.interactive && (q(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
			},
			onRemove: function(e) {
				e._fadeAnimated ? (wt(this._container, 0), this._removeTimeout = setTimeout(i(gt, void 0, this._container), 200)) : gt(this._container), this.options.interactive && (xt(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
				return this._map && vt(this._container), this;
			},
			bringToBack: function() {
				return this._map && yt(this._container), this;
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
					this._zoomAnimated ? Ot(this._container, e.add(n)) : t = t.add(e).add(n);
					var r = this._containerBottom = -t.y, i = this._containerLeft = -Math.round(this._containerWidth / 2) + t.x;
					this._container.style.bottom = r + "px", this._container.style.left = i + "px";
				}
			},
			_getAnchor: function() {
				return [0, 0];
			}
		});
		X.include({ _initOverlay: function(e, t, n, r) {
			var i = t;
			return i instanceof e || (i = new e(r).setContent(t)), n && i.setLatLng(n), i;
		} }), Kn.include({ _initOverlay: function(e, t, n, r) {
			var i = n;
			return i instanceof e ? (p(i, r), i._source = this) : (i = t && !r ? t : new e(r, this), i.setContent(n)), i;
		} });
		var Ar = kr.extend({
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
				return e = arguments.length ? e : this._source._map, !e.hasLayer(this) && e._popup && e._popup.options.autoClose && e.removeLayer(e._popup), e._popup = this, kr.prototype.openOn.call(this, e);
			},
			onAdd: function(e) {
				kr.prototype.onAdd.call(this, e), e.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof nr || this._source.on("preclick", Yt));
			},
			onRemove: function(e) {
				kr.prototype.onRemove.call(this, e), e.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof nr || this._source.off("preclick", Yt));
			},
			getEvents: function() {
				var e = kr.prototype.getEvents.call(this);
				return (this.options.closeOnClick === void 0 ? this._map.options.closePopupOnClick : this.options.closeOnClick) && (e.preclick = this.close), this.options.keepInView && (e.moveend = this._adjustPan), e;
			},
			_initLayout: function() {
				var e = "leaflet-popup", t = this._container = K("div", e + " " + (this.options.className || "") + " leaflet-zoom-animated"), n = this._wrapper = K("div", e + "-content-wrapper", t);
				if (this._contentNode = K("div", e + "-content", n), Zt(t), Xt(this._contentNode), J(t, "contextmenu", Yt), this._tipContainer = K("div", e + "-tip-container", t), this._tip = K("div", e + "-tip", this._tipContainer), this.options.closeButton) {
					var r = this._closeButton = K("a", e + "-close-button", t);
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
				i && r > i ? (t.height = i + "px", q(e, a)) : xt(e, a), this._containerWidth = this._container.offsetWidth;
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), n = this._getAnchor();
				Ot(this._container, t.add(n));
			},
			_adjustPan: function() {
				if (this.options.autoPan) {
					if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) this._autopanning = !1;
					else {
						var e = this._map, t = parseInt(ht(this._container, "marginBottom"), 10) || 0, n = this._container.offsetHeight + t, r = this._containerWidth, i = new A(this._containerLeft, -n - this._containerBottom);
						i._add(kt(this._container));
						var a = e.layerPointToContainerPoint(i), o = j(this.options.autoPanPadding), s = j(this.options.autoPanPaddingTopLeft || o), c = j(this.options.autoPanPaddingBottomRight || o), l = e.getSize(), u = 0, d = 0;
						a.x + r + c.x > l.x && (u = a.x + r - l.x + c.x), a.x - u - s.x < 0 && (u = a.x - s.x), a.y + n + c.y > l.y && (d = a.y + n - l.y + c.y), a.y - d - s.y < 0 && (d = a.y - s.y), (u || d) && (this.options.keepInView && (this._autopanning = !0), e.fire("autopanstart").panBy([u, d]));
					}
				}
			},
			_getAnchor: function() {
				return j(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
			}
		}), jr = function(e, t) {
			return new Ar(e, t);
		};
		X.mergeOptions({ closePopupOnClick: !0 }), X.include({
			openPopup: function(e, t, n) {
				return this._initOverlay(Ar, e, t, n).openOn(this), this;
			},
			closePopup: function(e) {
				return e = arguments.length ? e : this._popup, e && e.close(), this;
			}
		}), Kn.include({
			bindPopup: function(e, t) {
				return this._popup = this._initOverlay(Ar, this._popup, e, t), this._popupHandlersAdded ||= (this.on({
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
					this._popup._source === t && !(t instanceof nr) ? this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(e.latlng) : (this._popup._source = t, this.openPopup(e.latlng));
				}
			},
			_movePopup: function(e) {
				this._popup.setLatLng(e.latlng);
			},
			_onKeyPress: function(e) {
				e.originalEvent.keyCode === 13 && this._openPopup(e);
			}
		});
		var Mr = kr.extend({
			options: {
				pane: "tooltipPane",
				offset: [0, 0],
				direction: "auto",
				permanent: !1,
				sticky: !1,
				opacity: .9
			},
			onAdd: function(e) {
				kr.prototype.onAdd.call(this, e), this.setOpacity(this.options.opacity), e.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
			},
			onRemove: function(e) {
				kr.prototype.onRemove.call(this, e), e.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
			},
			getEvents: function() {
				var e = kr.prototype.getEvents.call(this);
				return this.options.permanent || (e.preclick = this.close), e;
			},
			_initLayout: function() {
				var e = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
				this._contentNode = this._container = K("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + o(this));
			},
			_updateLayout: function() {},
			_adjustPan: function() {},
			_setPosition: function(e) {
				var t, n, r = this._map, i = this._container, a = r.latLngToContainerPoint(r.getCenter()), o = r.layerPointToContainerPoint(e), s = this.options.direction, c = i.offsetWidth, l = i.offsetHeight, u = j(this.options.offset), d = this._getAnchor();
				s === "top" ? (t = c / 2, n = l) : s === "bottom" ? (t = c / 2, n = 0) : s === "center" ? (t = c / 2, n = l / 2) : s === "right" ? (t = 0, n = l / 2) : s === "left" ? (t = c, n = l / 2) : o.x < a.x ? (s = "right", t = 0, n = l / 2) : (s = "left", t = c + (u.x + d.x) * 2, n = l / 2), e = e.subtract(j(t, n, !0)).add(u).add(d), xt(i, "leaflet-tooltip-right"), xt(i, "leaflet-tooltip-left"), xt(i, "leaflet-tooltip-top"), xt(i, "leaflet-tooltip-bottom"), q(i, "leaflet-tooltip-" + s), Ot(i, e);
			},
			_updatePosition: function() {
				var e = this._map.latLngToLayerPoint(this._latlng);
				this._setPosition(e);
			},
			setOpacity: function(e) {
				this.options.opacity = e, this._container && wt(this._container, e);
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
				this._setPosition(t);
			},
			_getAnchor: function() {
				return j(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
			}
		}), Nr = function(e, t) {
			return new Mr(e, t);
		};
		X.include({
			openTooltip: function(e, t, n) {
				return this._initOverlay(Mr, e, t, n).openOn(this), this;
			},
			closeTooltip: function(e) {
				return e.close(), this;
			}
		}), Kn.include({
			bindTooltip: function(e, t) {
				return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Mr, this._tooltip, e, t), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
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
		var Pr = Zn.extend({
			options: {
				iconSize: [12, 12],
				html: !1,
				bgPos: null,
				className: "leaflet-div-icon"
			},
			createIcon: function(e) {
				var t = e && e.tagName === "DIV" ? e : document.createElement("div"), n = this.options;
				if (n.html instanceof Element ? (_t(t), t.appendChild(n.html)) : t.innerHTML = n.html === !1 ? "" : n.html, n.bgPos) {
					var r = j(n.bgPos);
					t.style.backgroundPosition = -r.x + "px " + -r.y + "px";
				}
				return this._setIconStyles(t, "icon"), t;
			},
			createShadow: function() {
				return null;
			}
		});
		function Fr(e) {
			return new Pr(e);
		}
		Zn.Default = $n;
		var Ir = Kn.extend({
			options: {
				tileSize: 256,
				opacity: 1,
				updateWhenIdle: W.mobile,
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
				this._removeAllTiles(), gt(this._container), e._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
			},
			bringToFront: function() {
				return this._map && (vt(this._container), this._setAutoZIndex(Math.max)), this;
			},
			bringToBack: function() {
				return this._map && (yt(this._container), this._setAutoZIndex(Math.min)), this;
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
				if (this._map && !W.ielt9) {
					wt(this._container, this.options.opacity);
					var e = +/* @__PURE__ */ new Date(), t = !1, n = !1;
					for (var r in this._tiles) {
						var i = this._tiles[r];
						if (i.current && i.loaded) {
							var a = Math.min(1, (e - i.loaded) / 200);
							wt(i.el, a), a < 1 ? t = !0 : (i.active ? n = !0 : this._onOpaqueTile(i), i.active = !0);
						}
					}
					n && !this._noPrune && this._pruneTiles(), t && (E(this._fadeFrame), this._fadeFrame = T(this._updateOpacity, this));
				}
			},
			_onOpaqueTile: l,
			_initContainer: function() {
				this._container || (this._container = K("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
			},
			_updateLevels: function() {
				var e = this._tileZoom, t = this.options.maxZoom;
				if (e !== void 0) {
					for (var n in this._levels) n = Number(n), this._levels[n].el.children.length || n === e ? (this._levels[n].el.style.zIndex = t - Math.abs(e - n), this._onUpdateLevel(n)) : (gt(this._levels[n].el), this._removeTilesAtZoom(n), this._onRemoveLevel(n), delete this._levels[n]);
					var r = this._levels[e], i = this._map;
					return r || (r = this._levels[e] = {}, r.el = K("div", "leaflet-tile-container leaflet-zoom-animated", this._container), r.el.style.zIndex = t, r.origin = i.project(i.unproject(i.getPixelOrigin()), e).round(), r.zoom = e, this._setZoomTransform(r, i.getCenter(), i.getZoom()), r.el.offsetWidth, this._onCreateLevel(r)), this._level = r, r;
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
				for (var e in this._levels) gt(this._levels[e].el), this._onRemoveLevel(Number(e)), delete this._levels[e];
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
				W.any3d ? Dt(e.el, i, r) : Ot(e.el, i);
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
				t && (gt(t.el), delete this._tiles[e], this.fire("tileunload", {
					tile: t.el,
					coords: this._keyToTileCoords(e)
				}));
			},
			_initTile: function(e) {
				q(e, "leaflet-tile");
				var t = this.getTileSize();
				e.style.width = t.x + "px", e.style.height = t.y + "px", e.onselectstart = l, e.onmousemove = l, W.ielt9 && this.options.opacity < 1 && wt(e, this.options.opacity);
			},
			_addTile: function(e, t) {
				var n = this._getTilePos(e), r = this._tileCoordsToKey(e), a = this.createTile(this._wrapCoords(e), i(this._tileReady, this, e));
				this._initTile(a), this.createTile.length < 2 && T(i(this._tileReady, this, e, null, a)), Ot(a, n), this._tiles[r] = {
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
				n = this._tiles[r], n && (n.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (wt(n.el, 0), E(this._fadeFrame), this._fadeFrame = T(this._updateOpacity, this)) : (n.active = !0, this._pruneTiles()), t || (q(n.el, "leaflet-tile-loaded"), this.fire("tileload", {
					tile: n.el,
					coords: e
				})), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), W.ielt9 || !this._map._fadeAnimated ? T(this._pruneTiles, this) : setTimeout(i(this._pruneTiles, this), 250)));
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
			return new Ir(e);
		}
		var Rr = Ir.extend({
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
				this._url = e, t = p(this, t), t.detectRetina && W.retina && t.maxZoom > 0 ? (t.tileSize = Math.floor(t.tileSize / 2), t.zoomReverse ? (t.zoomOffset--, t.minZoom = Math.min(t.maxZoom, t.minZoom + 1)) : (t.zoomOffset++, t.maxZoom = Math.max(t.minZoom, t.maxZoom - 1)), t.minZoom = Math.max(0, t.minZoom)) : t.zoomReverse ? t.minZoom = Math.min(t.maxZoom, t.minZoom) : t.maxZoom = Math.max(t.minZoom, t.maxZoom), typeof t.subdomains == "string" && (t.subdomains = t.subdomains.split("")), this.on("tileunload", this._onTileRemove);
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
					r: W.retina ? "@2x" : "",
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
				W.ielt9 ? setTimeout(i(e, this, null, t), 0) : e(null, t);
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
					gt(t), delete this._tiles[e], this.fire("tileabort", {
						tile: t,
						coords: n
					});
				}
			},
			_removeTile: function(e) {
				var t = this._tiles[e];
				if (t) return t.el.setAttribute("src", y), Ir.prototype._removeTile.call(this, e);
			},
			_tileReady: function(e, t, n) {
				if (!(!this._map || n && n.getAttribute("src") === y)) return Ir.prototype._tileReady.call(this, e, t, n);
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
				var a = t.detectRetina && W.retina ? 2 : 1, o = this.getTileSize();
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
		var Hr = Kn.extend({
			options: { padding: .1 },
			initialize: function(e) {
				p(this, e), o(this), this._layers = this._layers || {};
			},
			onAdd: function() {
				this._container || (this._initContainer(), q(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
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
				W.any3d ? Dt(this._container, a, n) : Ot(this._container, a);
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
		}), Ur = Hr.extend({
			options: { tolerance: 0 },
			getEvents: function() {
				var e = Hr.prototype.getEvents.call(this);
				return e.viewprereset = this._onViewPreReset, e;
			},
			_onViewPreReset: function() {
				this._postponeUpdatePaths = !0;
			},
			onAdd: function() {
				Hr.prototype.onAdd.call(this), this._draw();
			},
			_initContainer: function() {
				var e = this._container = document.createElement("canvas");
				J(e, "mousemove", this._onMouseMove, this), J(e, "click dblclick mousedown mouseup contextmenu", this._onClick, this), J(e, "mouseout", this._handleMouseOut, this), e._leaflet_disable_events = !0, this._ctx = e.getContext("2d");
			},
			_destroyContainer: function() {
				E(this._redrawRequest), delete this._ctx, gt(this._container), Wt(this._container), delete this._container;
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
					Hr.prototype._update.call(this);
					var e = this._bounds, t = this._container, n = e.getSize(), r = W.retina ? 2 : 1;
					Ot(t, e.min), t.width = r * n.x, t.height = r * n.y, t.style.width = n.x + "px", t.style.height = n.y + "px", W.retina && this._ctx.scale(2, 2), this._ctx.translate(-e.min.x, -e.min.y), this.fire("update");
				}
			},
			_reset: function() {
				Hr.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
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
				t && (xt(this._container, "leaflet-interactive"), this._fireEvent([t], e, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
			},
			_handleMouseHover: function(e, t) {
				if (!this._mouseHoverThrottled) {
					for (var n, r, a = this._drawFirst; a; a = a.next) n = a.layer, n.options.interactive && n._containsPoint(t) && (r = n);
					r !== this._hoveredLayer && (this._handleMouseOut(e), r && (q(this._container, "leaflet-interactive"), this._fireEvent([r], e, "mouseover"), this._hoveredLayer = r)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, e), this._mouseHoverThrottled = !0, setTimeout(i(function() {
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
		function Wr(e) {
			return W.canvas ? new Ur(e) : null;
		}
		var Gr = (function() {
			try {
				return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(e) {
					return document.createElement("<lvml:" + e + " class=\"lvml\">");
				};
			} catch {}
			return function(e) {
				return document.createElement("<" + e + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"lvml\">");
			};
		})(), Kr = {
			_initContainer: function() {
				this._container = K("div", "leaflet-vml-container");
			},
			_update: function() {
				this._map._animatingZoom || (Hr.prototype._update.call(this), this.fire("update"));
			},
			_initPath: function(e) {
				var t = e._container = Gr("shape");
				q(t, "leaflet-vml-shape " + (this.options.className || "")), t.coordsize = "1 1", e._path = Gr("path"), t.appendChild(e._path), this._updateStyle(e), this._layers[o(e)] = e;
			},
			_addPath: function(e) {
				var t = e._container;
				this._container.appendChild(t), e.options.interactive && e.addInteractiveTarget(t);
			},
			_removePath: function(e) {
				var t = e._container;
				gt(t), e.removeInteractiveTarget(t), delete this._layers[o(e)];
			},
			_updateStyle: function(e) {
				var t = e._stroke, n = e._fill, r = e.options, i = e._container;
				i.stroked = !!r.stroke, i.filled = !!r.fill, r.stroke ? (t ||= e._stroke = Gr("stroke"), i.appendChild(t), t.weight = r.weight + "px", t.color = r.color, t.opacity = r.opacity, r.dashArray ? t.dashStyle = _(r.dashArray) ? r.dashArray.join(" ") : r.dashArray.replace(/( *, *)/g, " ") : t.dashStyle = "", t.endcap = r.lineCap.replace("butt", "flat"), t.joinstyle = r.lineJoin) : t && (i.removeChild(t), e._stroke = null), r.fill ? (n ||= e._fill = Gr("fill"), i.appendChild(n), n.color = r.fillColor || r.color, n.opacity = r.fillOpacity) : n && (i.removeChild(n), e._fill = null);
			},
			_updateCircle: function(e) {
				var t = e._point.round(), n = Math.round(e._radius), r = Math.round(e._radiusY || n);
				this._setPath(e, e._empty() ? "M0 0" : "AL " + t.x + "," + t.y + " " + n + "," + r + " 0,23592600");
			},
			_setPath: function(e, t) {
				e._path.v = t;
			},
			_bringToFront: function(e) {
				vt(e._container);
			},
			_bringToBack: function(e) {
				yt(e._container);
			}
		}, qr = W.vml ? Gr : ue, Jr = Hr.extend({
			_initContainer: function() {
				this._container = qr("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = qr("g"), this._container.appendChild(this._rootGroup);
			},
			_destroyContainer: function() {
				gt(this._container), Wt(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
			},
			_update: function() {
				if (!(this._map._animatingZoom && this._bounds)) {
					Hr.prototype._update.call(this);
					var e = this._bounds, t = e.getSize(), n = this._container;
					this._svgSize && this._svgSize.equals(t) || (this._svgSize = t, n.setAttribute("width", t.x), n.setAttribute("height", t.y)), Ot(n, e.min), n.setAttribute("viewBox", [
						e.min.x,
						e.min.y,
						t.x,
						t.y
					].join(" ")), this.fire("update");
				}
			},
			_initPath: function(e) {
				var t = e._path = qr("path");
				e.options.className && q(t, e.options.className), e.options.interactive && q(t, "leaflet-interactive"), this._updateStyle(e), this._layers[o(e)] = e;
			},
			_addPath: function(e) {
				this._rootGroup || this._initContainer(), this._rootGroup.appendChild(e._path), e.addInteractiveTarget(e._path);
			},
			_removePath: function(e) {
				gt(e._path), e.removeInteractiveTarget(e._path), delete this._layers[o(e)];
			},
			_updatePath: function(e) {
				e._project(), e._update();
			},
			_updateStyle: function(e) {
				var t = e._path, n = e.options;
				t && (n.stroke ? (t.setAttribute("stroke", n.color), t.setAttribute("stroke-opacity", n.opacity), t.setAttribute("stroke-width", n.weight), t.setAttribute("stroke-linecap", n.lineCap), t.setAttribute("stroke-linejoin", n.lineJoin), n.dashArray ? t.setAttribute("stroke-dasharray", n.dashArray) : t.removeAttribute("stroke-dasharray"), n.dashOffset ? t.setAttribute("stroke-dashoffset", n.dashOffset) : t.removeAttribute("stroke-dashoffset")) : t.setAttribute("stroke", "none"), n.fill ? (t.setAttribute("fill", n.fillColor || n.color), t.setAttribute("fill-opacity", n.fillOpacity), t.setAttribute("fill-rule", n.fillRule || "evenodd")) : t.setAttribute("fill", "none"));
			},
			_updatePoly: function(e, t) {
				this._setPath(e, de(e._parts, t));
			},
			_updateCircle: function(e) {
				var t = e._point, n = Math.max(Math.round(e._radius), 1), r = Math.max(Math.round(e._radiusY), 1) || n, i = "a" + n + "," + r + " 0 1,0 ", a = e._empty() ? "M0 0" : "M" + (t.x - n) + "," + t.y + i + n * 2 + ",0 " + i + -n * 2 + ",0 ";
				this._setPath(e, a);
			},
			_setPath: function(e, t) {
				e._path.setAttribute("d", t);
			},
			_bringToFront: function(e) {
				vt(e._path);
			},
			_bringToBack: function(e) {
				yt(e._path);
			}
		});
		W.vml && Jr.include(Kr);
		function Yr(e) {
			return W.svg || W.vml ? new Jr(e) : null;
		}
		X.include({
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
				return this.options.preferCanvas && Wr(e) || Yr(e);
			}
		});
		var Xr = lr.extend({
			initialize: function(e, t) {
				lr.prototype.initialize.call(this, this._boundsToLatLngs(e), t);
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
		function Zr(e, t) {
			return new Xr(e, t);
		}
		Jr.create = qr, Jr.pointsToPath = de, dr.geometryToLayer = fr, dr.coordsToLatLng = mr, dr.coordsToLatLngs = hr, dr.latLngToCoords = gr, dr.latLngsToCoords = _r, dr.getFeature = vr, dr.asFeature = yr, X.mergeOptions({ boxZoom: !0 });
		var Qr = _n.extend({
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
				gt(this._pane), delete this._pane;
			},
			_resetState: function() {
				this._resetStateTimeout = 0, this._moved = !1;
			},
			_clearDeferredResetState: function() {
				this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
			},
			_onMouseDown: function(e) {
				if (!e.shiftKey || e.which !== 1 && e.button !== 1) return !1;
				this._clearDeferredResetState(), this._resetState(), At(), Pt(), this._startPoint = this._map.mouseEventToContainerPoint(e), J(document, {
					contextmenu: $t,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseMove: function(e) {
				this._moved || (this._moved = !0, this._box = K("div", "leaflet-zoom-box", this._container), q(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(e);
				var t = new M(this._point, this._startPoint), n = t.getSize();
				Ot(this._box, t.min), this._box.style.width = n.x + "px", this._box.style.height = n.y + "px";
			},
			_finish: function() {
				this._moved && (gt(this._box), xt(this._container, "leaflet-crosshair")), jt(), Ft(), Wt(document, {
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
		X.addInitHook("addHandler", "boxZoom", Qr), X.mergeOptions({ doubleClickZoom: !0 });
		var $r = _n.extend({
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
		X.addInitHook("addHandler", "doubleClickZoom", $r), X.mergeOptions({
			dragging: !0,
			inertia: !0,
			inertiaDeceleration: 3400,
			inertiaMaxSpeed: Infinity,
			easeLinearity: .2,
			worldCopyJump: !1,
			maxBoundsViscosity: 0
		});
		var ei = _n.extend({
			addHooks: function() {
				if (!this._draggable) {
					var e = this._map;
					this._draggable = new bn(e._mapPane, e._container), this._draggable.on({
						dragstart: this._onDragStart,
						drag: this._onDrag,
						dragend: this._onDragEnd
					}, this), this._draggable.on("predrag", this._onPreDragLimit, this), e.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), e.on("zoomend", this._onZoomEnd, this), e.whenReady(this._onZoomEnd, this));
				}
				q(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
			},
			removeHooks: function() {
				xt(this._map._container, "leaflet-grab"), xt(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
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
		X.addInitHook("addHandler", "dragging", ei), X.mergeOptions({
			keyboard: !0,
			keyboardPanDelta: 80
		});
		var ti = _n.extend({
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
		X.addInitHook("addHandler", "keyboard", ti), X.mergeOptions({
			scrollWheelZoom: !0,
			wheelDebounceTime: 40,
			wheelPxPerZoomLevel: 60
		});
		var ni = _n.extend({
			addHooks: function() {
				J(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
			},
			removeHooks: function() {
				Wt(this._map._container, "wheel", this._onWheelScroll, this);
			},
			_onWheelScroll: function(e) {
				var t = Y(e), n = this._map.options.wheelDebounceTime;
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
		X.addInitHook("addHandler", "scrollWheelZoom", ni);
		var ri = 600;
		X.mergeOptions({
			tapHold: W.touchNative && W.safari && W.mobile,
			tapTolerance: 15
		});
		var ii = _n.extend({
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
					}, this), ri), J(document, "touchend touchcancel contextmenu", this._cancel, this), J(document, "touchmove", this._onMove, this);
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
		X.addInitHook("addHandler", "tapHold", ii), X.mergeOptions({
			touchZoom: W.touch,
			bounceAtZoomLimits: !0
		});
		var ai = _n.extend({
			addHooks: function() {
				q(this._map._container, "leaflet-touch-zoom"), J(this._map._container, "touchstart", this._onTouchStart, this);
			},
			removeHooks: function() {
				xt(this._map._container, "leaflet-touch-zoom"), Wt(this._map._container, "touchstart", this._onTouchStart, this);
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
		X.addInitHook("addHandler", "touchZoom", ai), X.BoxZoom = Qr, X.DoubleClickZoom = $r, X.Drag = ei, X.Keyboard = ti, X.ScrollWheelZoom = ni, X.TapHold = ii, X.TouchZoom = ai, e.Bounds = M, e.Browser = W, e.CRS = I, e.Canvas = Ur, e.Circle = ar, e.CircleMarker = rr, e.Class = O, e.Control = cn, e.DivIcon = Pr, e.DivOverlay = kr, e.DomEvent = an, e.DomUtil = Ht, e.Draggable = bn, e.Evented = k, e.FeatureGroup = Yn, e.GeoJSON = dr, e.GridLayer = Ir, e.Handler = _n, e.Icon = Zn, e.ImageOverlay = Cr, e.LatLng = P, e.LatLngBounds = ie, e.Layer = Kn, e.LayerGroup = qn, e.LineUtil = zn, e.Map = X, e.Marker = tr, e.Mixin = vn, e.Path = nr, e.Point = A, e.PolyUtil = wn, e.Polygon = lr, e.Polyline = sr, e.Popup = Ar, e.PosAnimation = on, e.Projection = Hn, e.Rectangle = Xr, e.Renderer = Hr, e.SVG = Jr, e.SVGOverlay = Dr, e.TileLayer = Rr, e.Tooltip = Mr, e.Transformation = oe, e.Util = D, e.VideoOverlay = Tr, e.bind = i, e.bounds = re, e.canvas = Wr, e.circle = or, e.circleMarker = ir, e.control = ln, e.divIcon = Fr, e.extend = n, e.featureGroup = Xn, e.geoJSON = xr, e.geoJson = Sr, e.gridLayer = Lr, e.icon = Qn, e.imageOverlay = wr, e.latLng = F, e.latLngBounds = N, e.layerGroup = Jn, e.map = sn, e.marker = Q, e.point = j, e.polygon = ur, e.polyline = cr, e.popup = jr, e.rectangle = Zr, e.setOptions = p, e.stamp = o, e.svg = Yr, e.svgOverlay = Or, e.tileLayer = zr, e.tooltip = Nr, e.transformation = se, e.version = t, e.videoOverlay = Er;
		var oi = window.L;
		e.noConflict = function() {
			return window.L = oi, this;
		}, window.L = e;
	}));
})))(), 1), Po = ".leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;top:0;left:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:0 0}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{-webkit-transform-origin:0 0;width:1600px;height:1600px}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{width:auto;padding:0;max-width:none!important;max-height:none!important}.leaflet-container img.leaflet-tile{mix-blend-mode:plus-lighter}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:#33b5e566}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{box-sizing:border-box;z-index:800;width:0;height:0}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{z-index:800;pointer-events:visiblePainted;pointer-events:auto;position:relative}.leaflet-top,.leaflet-bottom{z-index:1000;pointer-events:none;position:absolute}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{outline-offset:1px;background:#ddd}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{background:#ffffff80;border:2px dotted #38f}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:.75rem;line-height:1.5}.leaflet-bar{border-radius:4px;box-shadow:0 1px 5px #000000a6}.leaflet-bar a{text-align:center;color:#000;background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;text-decoration:none;display:block}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom:none;border-bottom-right-radius:4px;border-bottom-left-radius:4px}.leaflet-bar a.leaflet-disabled{cursor:default;color:#bbb;background-color:#f4f4f4}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-right-radius:2px;border-bottom-left-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{text-indent:1px;font:700 18px Lucida Console,Monaco,monospace}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{background:#fff;border-radius:5px;box-shadow:0 1px 5px #0006}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{color:#333;background:#fff;padding:6px 10px 6px 6px}.leaflet-control-layers-scrollbar{padding-right:5px;overflow:hidden scroll}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{font-size:1.08333em;display:block}.leaflet-control-layers-separator{border-top:1px solid #ddd;height:0;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fffc;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{color:#333;padding:0 5px;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{width:1em;height:.6669em;vertical-align:baseline!important;display:inline!important}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{white-space:nowrap;box-sizing:border-box;text-shadow:1px 1px #fff;background:#fffc;border:2px solid #777;border-top:none;padding:2px 5px 1px;line-height:1.1}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{background-clip:padding-box;border:2px solid #0003}.leaflet-popup{text-align:center;margin-bottom:20px;position:absolute}.leaflet-popup-content-wrapper{text-align:left;border-radius:12px;padding:1px}.leaflet-popup-content{min-height:1px;margin:13px 24px 13px 20px;font-size:1.08333em;line-height:1.3}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{pointer-events:none;width:40px;height:20px;margin-top:-1px;margin-left:-20px;position:absolute;left:50%;overflow:hidden}.leaflet-popup-tip{pointer-events:auto;width:17px;height:17px;margin:-10px auto 0;padding:1px;transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{color:#333;background:#fff;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{text-align:center;color:#757575;background:0 0;border:none;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;text-decoration:none;position:absolute;top:0;right:0}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{-ms-filter:\"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";width:24px;filter:progid:DXImageTransform.Microsoft.Matrix(M11=.707107, M12=.707107, M21=-.707107, M22=.707107);margin:0 auto}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{color:#222;white-space:nowrap;-webkit-user-select:none;user-select:none;pointer-events:none;background-color:#fff;border:1px solid #fff;border-radius:3px;padding:6px;position:absolute;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{pointer-events:none;content:\"\";background:0 0;border:6px solid #0000;position:absolute}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{margin-left:-6px;left:50%}.leaflet-tooltip-top:before{border-top-color:#fff;margin-bottom:-12px;bottom:0}.leaflet-tooltip-bottom:before{border-bottom-color:#fff;margin-top:-12px;margin-left:-6px;top:0}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{margin-top:-6px;top:50%}.leaflet-tooltip-left:before{border-left-color:#fff;margin-right:-12px;right:0}.leaflet-tooltip-right:before{border-right-color:#fff;margin-left:-12px;left:0}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}";
// src/colors.ts
function Fo(e, t, n) {
	let r = n > t ? Math.min(1, Math.max(0, (e - t) / (n - t))) : .5;
	return `hsl(${Math.round(240 * (1 - r))}, 80%, 50%)`;
}
// src/route-segments.ts
var Io = "#9e9e9e";
function Lo(e) {
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
function Ro(e) {
	let t = Math.min(100, Math.max(0, e)) / 100;
	return `hsl(${Math.round(120 * t)}, 75%, 42%)`;
}
function zo(e) {
	return e.some((e) => typeof e.dl == "number");
}
function Bo(e, t, n, r = "height") {
	let i = [];
	for (let a = 1; a < e.length; a++) {
		let o = e[a - 1], s = e[a];
		if (o.lat === null || o.lon === null || s.lat === null || s.lon === null) continue;
		let c = r === "height" || typeof s.dl == "number", l = r === "height" ? Fo(s.height, t, n) : c ? Ro(s.dl) : Io;
		i.push({
			from: [o.lat, o.lon],
			to: [s.lat, s.lon],
			color: l,
			known: c
		});
	}
	return i;
}
// src/route-map.ts
var Vo = class extends Ae {
	static {
		this.properties = {
			points: { attribute: !1 },
			start: { attribute: !1 },
			end: { attribute: !1 },
			tileUrl: { type: String },
			lang: { type: String },
			events: { attribute: !1 },
			channel: { state: !0 }
		};
	}
	constructor() {
		super(), this.points = [], this.start = null, this.end = null, this.tileUrl = "", this.lang = "de", this.events = [], this.channel = "height";
	}
	static {
		this.styles = [
			m(Po),
			Oo,
			h`
      .map { height: 340px; border-radius: 12px; border: 1px solid var(--divider-color, #ddd); z-index: 0; }
      .legend { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; margin-top: 6px; color: var(--secondary-text-color); }
      .modes { display: flex; gap: 6px; margin-top: 6px; }
      .modes button { padding: 2px 10px; font-size: 0.8rem; }
      .modes button[aria-pressed="true"] { background: var(--primary-color); color: var(--text-primary-color, #fff); border-color: var(--primary-color); }
      .legend .bar { flex: 1; height: 8px; border-radius: 4px; max-width: 220px; }
    `
		];
	}
	get hasPosition() {
		return this.start !== null || this.end !== null || this.points.some((e) => e.lat !== null && e.lon !== null);
	}
	get signalAvailable() {
		return zo(this.points);
	}
	get activeChannel() {
		return this.channel === "signal" && this.signalAvailable ? "signal" : "height";
	}
	setChannel(e) {
		this.channel = e;
	}
	render() {
		if (!this.hasPosition) return B`<p class="muted">${G("no_position", this.lang)}</p>`;
		let e = this.lang, t = this.activeChannel, { min: n, max: r } = Lo(this.points), i = t === "signal" ? `linear-gradient(to right, ${Ro(0)}, ${Ro(50)}, ${Ro(100)})` : `linear-gradient(to right, ${Fo(n, n, r)}, ${Fo((n + r) / 2, n, r)}, ${Fo(r, n, r)})`;
		return B`<div class="map"></div>
      ${this.signalAvailable ? B`<div class="modes" role="group" aria-label=${G("color_by", e)}>
            <button type="button" data-channel="height" aria-pressed=${t === "height"} @click=${() => this.setChannel("height")}>${G("color_height", e)}</button>
            <button type="button" data-channel="signal" aria-pressed=${t === "signal"} @click=${() => this.setChannel("signal")}>${G("color_signal", e)}</button>
          </div>` : V}
      <div class="legend">
        <span>${t === "signal" ? "0 %" : `${Math.round(n)} m`}</span><div class="bar" style="background:${i}"></div><span>${t === "signal" ? "100 %" : `${Math.round(r)} m`}</span>
        ${t === "signal" ? B`<span style="display:inline-flex;align-items:center;gap:4px"><i style="width:10px;height:10px;border-radius:2px;background:${Io}"></i>${G("unknown", e)}</span>` : V}
      </div>`;
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
		this.map = No.default.map(e, {
			zoomControl: !0,
			attributionControl: !0
		}).setView([0, 0], 2), this.tileUrl && No.default.tileLayer(this.tileUrl, {
			maxZoom: 19,
			attribution: "© OpenStreetMap"
		}).addTo(this.map), this.layer = No.default.layerGroup().addTo(this.map), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.map?.invalidateSize()), this.resizeObserver.observe(e));
	}
	draw() {
		if (!this.map || !this.layer) return;
		this.layer.clearLayers();
		let { min: e, max: t } = Lo(this.points), n = [];
		for (let r of Bo(this.points, e, t, this.activeChannel)) No.default.polyline([r.from, r.to], {
			color: r.color,
			weight: 4
		}).addTo(this.layer), n.push(r.from, r.to);
		this.start && No.default.circleMarker([this.start.lat, this.start.lon], {
			radius: 7,
			color: "#fff",
			weight: 2,
			fillColor: "#2e7d32",
			fillOpacity: 1
		}).addTo(this.layer), this.end && No.default.circleMarker([this.end.lat, this.end.lon], {
			radius: 7,
			color: "#fff",
			weight: 2,
			fillColor: "#c62828",
			fillOpacity: 1
		}).addTo(this.layer), this.start && n.push([this.start.lat, this.start.lon]), this.end && n.push([this.end.lat, this.end.lon]);
		for (let e of this.points) e.lat !== null && e.lon !== null && n.push([e.lat, e.lon]);
		for (let e of et(this.events ?? [], this.points)) {
			let t = Xe(e.event.kind);
			No.default.circleMarker([e.lat, e.lon], {
				radius: 6,
				color: "#fff",
				weight: 2,
				fillColor: t.color,
				fillOpacity: 1,
				pane: "markerPane"
			}).bindTooltip(Ze(e.event.kind, this.lang)).addTo(this.layer);
		}
		if (n.length === 0 || this.fittedFor === this.points) return;
		this.fittedFor = this.points;
		let r = No.default.latLngBounds(n);
		r.getNorthEast().equals(r.getSouthWest()) ? this.map.setView(r.getCenter(), 16) : this.map.fitBounds(r, {
			padding: [20, 20],
			animate: !1
		});
	}
	destroyMap() {
		this.resizeObserver?.disconnect(), this.map?.remove(), this.map = void 0, this.layer = void 0, this.fittedFor = void 0;
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.destroyMap();
	}
};
customElements.define("dl-route-map", Vo);
// src/flight-detail.ts
var Ho = class extends Ae {
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
		this.styles = [Oo, h`
      :host { display: block; }
      .head h2 { margin: 0 0 2px; font-size: 1.2rem; font-weight: 500; }
      .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; margin: 12px 0; }
      .tile { text-align: center; padding: 8px; }
      .tile b { display: block; font-size: 1.25rem; font-weight: 500; }
      .event { display: flex; align-items: center; gap: 10px; padding: 3px 0; --mdc-icon-size: 20px; }
      .event .text { flex: 1; }
      .event .time { font-variant-numeric: tabular-nums; color: var(--secondary-text-color); }
      .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 12px; }
    `];
	}
	render() {
		let e = this.detail;
		if (!e) return B`<p class="muted">${G("select_flight", this.lang)}</p>`;
		let { summary: t, battery: n } = e, r = this.lang, i = ft(e.analysis?.hover_wind, r), a = $e(e.extras, r);
		return B`
      <div class="head">
        <h2>${Ve(t.start, this.timeZone, r)}</h2>
        <div class="muted">${t.drone_model} · …${t.drone_suffix} · ${G("battery", r)} …${t.battery_suffix} · ${e.source_name}</div>
      </div>
      <div class="tiles">
        ${this.tile(G("duration", r), Ie(t.duration_s))}
        ${this.tile(G("distance", r), Le(t.distance_m, r))}
        ${this.tile(G("max_height", r), ze(t.max_height_m, r))}
        ${this.tile(G("max_speed", r), Re(t.max_speed_ms, r))}
      </div>
      <div class="cards">
        <div class="card" id="battery-card">
          <h3>${G("battery", r)}</h3>
          ${n ? lt(n, e.analysis?.cell_level, r).map((e) => this.row(e.label, e.value)) : B`<p class="muted">${G("no_battery", r)}</p>`}
        </div>
        <div class="card" id="weather-card">
          <h3>${G("weather", r)}</h3>
          ${this.weatherRows(e, i)}
        </div>
        ${this.rowsCard("energy-card", G("energy_card", r), it(e.extras, r))}
        ${this.rowsCard("signal-card", G("signal_card", r), at(e.extras, r))}
        ${this.rowsCard("camera-card", G("camera_card", r), ot(e.extras, r))}
        ${this.rowsCard("phases-card", G("phases", r), dt(e.analysis?.phases, r))}
        <div class="card" id="events-card">
          <h3>${G("events", r)}</h3>
          ${a.length === 0 ? B`<p class="muted">${e.extras ? G("events_none", r) : G("events_missing", r)}</p>` : a.map((e) => B`<div class="event" data-severity=${e.severity}>
                <ha-icon icon=${e.icon} style="color:${e.color}"></ha-icon><span class="text">${e.text}</span><span class="time">${e.timeText}</span>
              </div>`)}
        </div>
      </div>
      <dl-route-map .points=${e.points} .start=${e.start} .end=${e.end} .events=${e.extras?.events ?? []} .tileUrl=${this.tileUrl} .lang=${r}></dl-route-map>
      <dl-flight-charts .points=${e.points} .events=${e.extras?.events ?? []} .modeSegments=${e.analysis?.mode_segments ?? []} .lang=${r} .dark=${this.dark}></dl-flight-charts>
      <slot></slot>
    `;
	}
	weatherRows(e, t) {
		let n = this.lang, r = e.weather;
		return r ? B`${this.row(G("temperature", n), `${r.temperature_c.toLocaleString(n)} °C`)}
      ${this.row(G("wind", n), `${Ge(r.wind_10m_ms, n)} (${We(r.wind_dir_deg, n)} ${Math.round(r.wind_dir_deg)}°)`)}
      ${r.wind_80m_ms === null ? V : this.row(`${G("wind", n)} 80 m`, Ge(r.wind_80m_ms, n))}
      ${this.row(G("gusts", n), Ge(r.gust_ms, n))}
      ${this.row(G("precipitation", n), `${r.precipitation_mm.toLocaleString(n)} mm`)}
      ${this.row(G("clouds", n), Be(r.cloud_cover_pct))}
      ${t ? this.row(t.label, t.value) : V}
      ${this.row(G("source", n), r.source)}` : t ? this.row(t.label, t.value) : B`<p class="muted">${G("no_weather", n)}</p>`;
	}
	rowsCard(e, t, n) {
		return n.length === 0 ? V : B`<div class="card" id=${e}><h3>${t}</h3>${n.map((e) => this.row(e.label, e.value))}</div>`;
	}
	tile(e, t) {
		return B`<div class="card tile"><span class="muted">${e}</span><b>${t}</b></div>`;
	}
	row(e, t) {
		return B`<div class="kv"><span>${e}</span><b>${t}</b></div>`;
	}
};
customElements.define("dl-flight-detail", Ho);
// src/flight-list.ts
var Uo = class extends Ae {
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
		this.styles = [Oo, h`
      ul { list-style: none; margin: 0; padding: 0; }
      li { padding: 8px 12px; border-radius: 8px; cursor: pointer; outline: none; }
      li:hover, li:focus-visible { background: var(--secondary-background-color, #f3f3f3); }
      li.selected { background: var(--primary-color); color: var(--text-primary-color, #fff); }
      li .sub { font-size: 0.85rem; opacity: 0.8; }
      .badges { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 2px; font-size: 0.8rem; }
      .badge { display: inline-flex; align-items: center; gap: 2px; --mdc-icon-size: 16px; }
      .badge.event { background: var(--card-background-color, #fff); border-radius: 50%; padding: 2px; }
    `];
	}
	select(e) {
		this.dispatchEvent(new CustomEvent("select", { detail: e }));
	}
	onKey(e, t) {
		let n = e.key === "ArrowDown" ? t + 1 : e.key === "ArrowUp" ? t - 1 : e.key === "Enter" ? t : -1, r = this.flights[n];
		r && (e.preventDefault(), this.select(r.id), e.key !== "Enter" && this.renderRoot.querySelectorAll("li")[n]?.focus());
	}
	badges(e) {
		let t = tt(e);
		return t.empty ? V : B`<div class="badges">
      ${t.kinds.map((e) => {
			let t = Xe(e), n = Ze(e, this.lang);
			return B`<span class="badge event" data-kind=${e} data-severity=${t.severity} title=${n} aria-label=${n}><ha-icon icon=${t.icon} style="color:${t.color}"></ha-icon></span>`;
		})}
      ${t.photos > 0 ? B`<span class="badge" data-badge="photos" title=${G("photos", this.lang)}><ha-icon icon="mdi:camera"></ha-icon>${t.photos}</span>` : V}
      ${t.videoS > 0 ? B`<span class="badge" data-badge="video" title=${G("video", this.lang)}><ha-icon icon="mdi:video"></ha-icon>${Ie(t.videoS)}</span>` : V}
    </div>`;
	}
	render() {
		return B`<ul role="listbox">
      ${this.flights.map((e, t) => B`<li
          role="option"
          tabindex="0"
          aria-selected=${e.id === this.selectedId}
          class=${e.id === this.selectedId ? "selected" : ""}
          @click=${() => this.select(e.id)}
          @keydown=${(e) => this.onKey(e, t)}
        >
          <div>${Ve(e.start, this.timeZone, this.lang)}</div>
          <div class="sub">${Ie(e.duration_s)} · ${e.drone_model} · …${e.battery_suffix}</div>
          ${this.badges(e)}
        </li>`)}
    </ul>`;
	}
};
customElements.define("dl-flight-list", Uo);
// src/flights-view.ts
var Wo = 50, Go = class extends Ae {
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
			detailError: { state: !0 },
			onlyEvents: { state: !0 },
			eventCount: { state: !0 }
		};
	}
	constructor() {
		super(), this.listToken = 0, this.detailToken = 0, this.narrow = !1, this.tileUrl = "", this.flights = [], this.total = 0, this.drones = [], this.batteries = [], this.droneFilter = "", this.batteryFilter = "", this.loading = !1, this.error = !1, this.showDetail = !1, this.detailError = !1, this.onlyEvents = !1, this.eventCount = 0;
	}
	static {
		this.styles = [Oo, h`
      .layout { display: grid; grid-template-columns: minmax(240px, 320px) 1fr; gap: 16px; align-items: start; }
      .layout.narrow { grid-template-columns: 1fr; }
      .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }
      .list { max-height: calc(100vh - 160px); overflow: auto; }
      .list.narrow { max-height: none; }
      .filters label { display: flex; align-items: center; gap: 6px; }
      .more { width: 100%; margin-top: 8px; }
    `];
	}
	connectedCallback() {
		super.connectedCallback(), this.loadOptions(), this.loadFlights(!0);
	}
	get api() {
		return new Ne(this.hass);
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
	async loadEventCount() {
		try {
			let e = await this.api.flights({
				limit: 1,
				drone: this.droneFilter || void 0,
				battery: this.batteryFilter || void 0,
				only_events: !0
			});
			this.eventCount = e.total;
		} catch {}
	}
	async loadFlights(e) {
		if (!e && this.loading) return;
		let t = ++this.listToken, n = e ? 0 : this.flights.length;
		this.loading = !0, this.error = !1, e && this.loadEventCount();
		try {
			let r = await this.api.flights({
				limit: Wo,
				offset: n,
				drone: this.droneFilter || void 0,
				battery: this.batteryFilter || void 0,
				only_events: this.onlyEvents || void 0
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
	get batteryOptions() {
		return this.droneFilter ? this.batteries.filter((e) => e.drones.includes(this.droneFilter)) : [];
	}
	onFilter(e) {
		let t = e.target;
		t.name === "drone" ? (this.droneFilter = t.value, this.batteryFilter = "") : this.batteryFilter = t.value, this.loadFlights(!0);
	}
	onToggleEvents(e) {
		this.onlyEvents = e.target.checked, this.loadFlights(!0);
	}
	render() {
		let e = this.language;
		if (this.error) return B`<p class="muted">${G("error", e)}</p>`;
		if (!this.loading && this.flights.length === 0 && !this.droneFilter && !this.batteryFilter && !this.onlyEvents) return B`<p class="muted">${G("no_flights", e)}</p>`;
		let t = B`
      <div class="filters">
        <select name="drone" @change=${this.onFilter}>
          <option value="">${G("all_drones", e)}</option>
          ${this.drones.map((e) => B`<option value=${e.serial} ?selected=${e.serial === this.droneFilter}>${e.model} …${e.serial_suffix}</option>`)}
        </select>
        <select name="battery" @change=${this.onFilter} ?disabled=${!this.droneFilter}>
          <option value="">${G("all_batteries", e)}</option>
          ${this.batteryOptions.map((e) => B`<option value=${e.serial} ?selected=${e.serial === this.batteryFilter}>…${e.suffix}</option>`)}
        </select>
        ${this.eventCount > 0 || this.onlyEvents ? B`<label class="only-events"><input type="checkbox" name="only_events" .checked=${this.onlyEvents} @change=${this.onToggleEvents} /> ${G("only_events", e)} (${this.eventCount})</label>` : V}
      </div>
      <div class="list ${this.narrow ? "narrow" : ""}">
        <dl-flight-list
          .flights=${this.flights}
          .selectedId=${this.selectedId}
          .lang=${e}
          .timeZone=${this.timeZone}
          @select=${(e) => void this.selectFlight(e.detail)}
        ></dl-flight-list>
        ${this.flights.length < this.total ? B`<button class="more" ?disabled=${this.loading} @click=${() => void this.loadFlights(!1)}>${G("load_more", e)}</button>` : V}
      </div>
    `, n = this.detailError ? B`<p class="muted">${G("error", e)}</p>` : B`<dl-flight-detail
      .detail=${this.detail}
      .lang=${e}
      .timeZone=${this.timeZone}
      .tileUrl=${this.tileUrl}
      .dark=${!!this.hass?.themes?.darkMode}
    ></dl-flight-detail>`;
		return this.narrow ? this.showDetail ? B`<button @click=${() => this.showDetail = !1}>← ${G("back", e)}</button>${n}` : t : B`<div class="layout"><div>${t}</div><div>${n}</div></div>`;
	}
};
customElements.define("dl-flights-view", Go);
// src/stats-logic.ts
function Ko(e) {
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
function qo(e, t) {
	let [n, r] = e.split("-").map(Number);
	return new Intl.DateTimeFormat(t, {
		month: "short",
		year: "2-digit",
		timeZone: "UTC"
	}).format(new Date(Date.UTC(n, r - 1, 1)));
}
function Jo(e, t) {
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
function Yo(e) {
	let t = e.history[e.history.length - 1];
	return t !== void 0 && t.cell_deviation_mv > 20;
}
// src/battery-history.ts
var Xo = [
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
], Zo = [
	"#1565c0",
	"#ef6c00",
	"#2e7d32",
	"#6a1b9a",
	"#00838f",
	"#ad1457",
	"#4e342e",
	"#546e7a",
	"#9e9d24"
], Qo = class extends Ae {
	static {
		this.properties = {
			hass: { attribute: !1 },
			drone: { type: String },
			battery: { type: String },
			batteries: { state: !0 },
			metric: { state: !0 }
		};
	}
	constructor() {
		super(), this.rebuilds = 0, this.loadedOnce = !1, this.batteries = [], this.metric = "health_pct";
	}
	static {
		this.styles = [
			m(go),
			Oo,
			h`
      .toolbar { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
      button[aria-pressed="true"] { background: var(--primary-color); color: var(--text-primary-color, #fff); }
      .legend { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; font-size: 0.85rem; }
      .legend .warn { color: var(--error-color, #c62828); font-weight: 500; }
      .summary { margin-top: 12px; border-top: 1px solid var(--divider-color, #ddd); padding-top: 8px; }
      .summary h3 { font-size: 0.95rem; }
      .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 4px; }
    `
		];
	}
	connectedCallback() {
		super.connectedCallback(), this.load();
	}
	willUpdate(e) {
		e.has("drone") && this.loadedOnce && this.load();
	}
	async load() {
		try {
			this.batteries = (await new Ne(this.hass).batteries(this.drone || void 0)).batteries;
		} catch {
			this.batteries = [];
		}
		this.loadedOnce = !0;
	}
	get visible() {
		return this.battery ? this.batteries.filter((e) => e.serial === this.battery) : this.batteries;
	}
	get language() {
		return this.hass?.language ?? "en";
	}
	render() {
		let e = this.language;
		return B`<div class="card">
      <h3>${G("battery_history", e)}</h3>
      <div class="toolbar">
        ${Xo.map((t) => B`<button data-metric=${t.key} aria-pressed=${this.metric === t.key} @click=${() => this.metric = t.key}>${G(t.label, e)}</button>`)}
      </div>
      <div id="plot"></div>
      <div class="legend">
        ${this.visible.map((e, t) => B`<span class=${Yo(e) ? "warn" : ""}><span class="dot" style="background:${Yo(e) ? "#c62828" : Zo[t % Zo.length]}"></span>…${e.suffix} (${e.flights})${Yo(e) ? " ⚠" : ""}</span>`)}
      </div>
      ${this.visible.length === 1 ? this.summary(this.visible[0]) : ""}
    </div>`;
	}
	summary(e) {
		let t = this.language, n = e.history[e.history.length - 1], r = (e, t = "") => e == null ? "–" : `${e}${t}`;
		return B`<div class="summary">
      <h3>${G("battery_summary", t)} …${e.suffix}</h3>
      <div class="kv"><span>${G("flights_count", t)}</span><b>${e.flights}</b></div>
      <div class="kv"><span>${G("cycles", t)}</span><b>${r(n?.cycles)}</b></div>
      <div class="kv"><span>${G("health", t)}</span><b>${r(n?.health_pct, " %")}</b></div>
      <div class="kv"><span>${G("cell_deviation", t)} (${G("last_value", t)})</span><b>${r(n?.cell_deviation_mv, " mV")}</b></div>
      <div class="kv"><span>${G("temperature", t)} (${G("last_value", t)})</span><b>${r(n?.temp_max_c, " °C")}</b></div>
    </div>`;
	}
	updated(e) {
		if (!e.has("batteries") && !e.has("metric") && !e.has("battery")) return;
		this.rebuilds++, this.plot?.destroy(), this.plot = void 0;
		let t = this.renderRoot.querySelector("#plot"), n = this.visible;
		if (!t || n.length === 0 || !_o()) return;
		let { x: r, series: i } = Jo(n, this.metric);
		try {
			this.plot = new ho({
				width: t.clientWidth || 600,
				height: 240,
				legend: { show: !1 },
				scales: { x: { time: !0 } },
				axes: [{ grid: { stroke: "rgba(128,128,128,0.2)" } }, { grid: { stroke: "rgba(128,128,128,0.2)" } }],
				series: [{}, ...n.map((e, t) => ({
					label: `…${e.suffix}`,
					stroke: Yo(e) ? "#c62828" : Zo[t % Zo.length],
					width: 2,
					spanGaps: !0,
					points: { show: !0 }
				}))]
			}, [r, ...i], t);
		} catch {
			this.plot = void 0;
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.plot?.destroy(), this.plot = void 0;
	}
};
// node_modules/leaflet.heat/dist/leaflet-heat.js
customElements.define("dl-battery-history", Qo), (function() {
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
var $o = class extends Ae {
	static {
		this.properties = {
			hass: { attribute: !1 },
			tileUrl: { type: String },
			drone: { type: String },
			battery: { type: String },
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
			m(Po),
			Oo,
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
			this.cells = (await new Ne(this.hass).heatmap(this.precision, this.drone || void 0, this.battery || void 0)).cells;
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
			let r = await new Ne(this.hass).cellFlights(e, t, this.precision, this.drone || void 0, this.battery || void 0);
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
		return this.loaded && this.cells.length === 0 ? B`<div class="card"><h3>${G("heatmap", e)}</h3><p class="muted">${G("no_position", e)}</p></div>` : B`<div class="card">
      <h3>${G("heatmap", e)}</h3>
      <div class="toolbar">
        <select name="precision" @change=${this.onPrecision}>
          <option value="300" ?selected=${this.precision === 300}>300 m</option>
          <option value="1000" ?selected=${this.precision === 1e3}>1 km</option>
        </select>
        <span class="muted">${G("heatmap_hint", e)}</span>
      </div>
      <div class="map"></div>
      ${this.flights.length ? B`<ul>${this.flights.map((t) => B`<li @click=${() => this.open(t.id)}>${Ve(t.start, this.hass?.config?.time_zone ?? "UTC", e)} · ${Ie(t.duration_s)} · ${t.drone_model}</li>`)}</ul>` : V}
    </div>`;
	}
	willUpdate(e) {
		(e.has("drone") || e.has("battery")) && this.loaded && (this.flights = [], this.load());
	}
	updated(e) {
		let t = this.renderRoot.querySelector(".map");
		if (!t || this.cells.length === 0) return;
		let n = !this.map;
		if (this.map || (this.map = No.default.map(t).setView([0, 0], 2), this.tileUrl && No.default.tileLayer(this.tileUrl, {
			maxZoom: 19,
			attribution: "© OpenStreetMap"
		}).addTo(this.map), this.map.on("click", (e) => void this.handleCellClick(e.latlng.lat, e.latlng.lng))), n || e.has("cells")) {
			if (this.heat && this.map.removeLayer(this.heat), _o()) {
				let e = Math.max(...this.cells.map((e) => e.count));
				this.heat = No.default.heatLayer(this.cells.map((t) => [
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
			this.map.fitBounds(No.default.latLngBounds(this.cells.map((e) => [e.lat, e.lon])), {
				padding: [30, 30],
				maxZoom: 14,
				animate: !1
			});
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.map?.remove(), this.map = void 0, this.heat = void 0;
	}
};
customElements.define("dl-heatmap-view", $o);
// src/stats-view.ts
var es = class extends Ae {
	static {
		this.properties = {
			hass: { attribute: !1 },
			tileUrl: { type: String },
			stats: { state: !0 },
			drone: { state: !0 },
			battery: { state: !0 },
			batteries: { state: !0 },
			metric: { state: !0 },
			error: { state: !0 }
		};
	}
	constructor() {
		super(), this.tileUrl = "", this.drone = "", this.battery = "", this.batteries = [], this.metric = "flights", this.error = !1;
	}
	static {
		this.styles = [Oo, h`
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
		super.connectedCallback(), this.load(), this.loadBatteries();
	}
	async loadBatteries() {
		try {
			this.batteries = (await new Ne(this.hass).batteries()).batteries;
		} catch {
			this.batteries = [];
		}
	}
	get batteryOptions() {
		return this.drone ? this.batteries.filter((e) => e.drones.includes(this.drone)) : [];
	}
	get language() {
		return this.hass?.language ?? "en";
	}
	async load() {
		try {
			this.stats = await new Ne(this.hass).stats(this.drone || void 0, this.battery || void 0), this.error = !1;
		} catch {
			this.error = !0;
		}
	}
	onDrone(e) {
		this.drone = e.target.value, this.battery = "", this.load();
	}
	onBattery(e) {
		this.battery = e.target.value, this.load();
	}
	render() {
		let e = this.language;
		if (this.error) return B`<p class="muted">${G("error", e)}</p>`;
		let t = this.stats;
		if (!t) return B`<p class="muted">${G("loading", e)}</p>`;
		if (t.totals.flights === 0 && !this.drone && !this.battery) return B`<p class="muted">${G("no_flights", e)}</p>`;
		let n = Ko(t.months), r = (e) => this.metric === "flights" ? e.flights : e.duration_s, i = Math.max(1, ...n.map(r)), a = (e) => this.metric === "flights" ? String(e.flights) : Ie(e.duration_s);
		return B`
      <section>
        <div class="tiles">
          <div class="card tile"><span class="muted">${G("tab_flights", e)}</span><b>${t.totals.flights}</b></div>
          <div class="card tile"><span class="muted">${G("duration", e)}</span><b>${Ie(t.totals.duration_s).replace(/^(\d+) min .*/, "$1 min")}</b></div>
          <div class="card tile"><span class="muted">${G("distance", e)}</span><b>${Le(t.totals.distance_m, e)}</b></div>
        </div>
        <div class="toolbar">
          <select name="drone" @change=${this.onDrone}>
            <option value="">${G("all_drones", e)}</option>
            ${t.drones.map((e) => B`<option value=${e.serial} ?selected=${e.serial === this.drone}>${e.model} …${e.serial_suffix}</option>`)}
          </select>
          <select name="battery" @change=${this.onBattery} ?disabled=${!this.drone}>
            <option value="">${G("all_batteries", e)}</option>
            ${this.batteryOptions.map((e) => B`<option value=${e.serial} ?selected=${e.serial === this.battery}>…${e.suffix}</option>`)}
          </select>
          <button data-metric="flights" aria-pressed=${this.metric === "flights"} @click=${() => this.metric = "flights"}>${G("metric_flights", e)}</button>
          <button data-metric="duration" aria-pressed=${this.metric === "duration"} @click=${() => this.metric = "duration"}>${G("metric_hours", e)}</button>
        </div>
        <div class="card bars">
          ${n.map((t) => B`<div class="col" title=${`${qo(t.month, e)}: ${a(t)}`}>
              <span class="bar-label">${r(t) ? a(t) : V}</span>
              <div class="bar ${r(t) === 0 ? "empty" : ""}" style="height:${r(t) / i * 120}px"></div>
              <span class="month">${qo(t.month, e)}</span>
            </div>`)}
        </div>
      </section>
      <section>
        <div class="card" style="margin-bottom:8px"><h3>${G("drones", e)}</h3>
          ${t.drones.map((e) => B`<div class="kv"><span>${e.model} …${e.serial_suffix}</span><b>${e.flights} · ${Ie(e.duration_s)}</b></div>`)}
        </div>
      </section>
      <section><dl-battery-history .hass=${this.hass} .drone=${this.drone || void 0} .battery=${this.battery || void 0}></dl-battery-history></section>
      <section><dl-heatmap-view .hass=${this.hass} .tileUrl=${this.tileUrl} .drone=${this.drone || void 0} .battery=${this.battery || void 0}></dl-heatmap-view></section>
    `;
	}
};
customElements.define("dl-stats-view", es);
// src/dronelog-panel.ts
var ts = class extends Ae {
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
		this.styles = [Oo, h`
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
		return B`
      <header>
        ${this.narrow ? B`<button aria-label="Menu" @click=${this.toggleMenu}>☰</button>` : ""}
        <h1>${G("title", e)}</h1>
      </header>
      <nav role="tablist">
        <button role="tab" aria-selected=${this.tab === "flights"} @click=${() => this.show("flights")}>${G("tab_flights", e)}</button>
        <button role="tab" aria-selected=${this.tab === "stats"} @click=${() => this.show("stats")}>${G("tab_stats", e)}</button>
      </nav>
      <main @open-flight=${this.onOpenFlight}>
        ${this.tab === "flights" ? B`<dl-flights-view .hass=${this.hass} .narrow=${this.narrow} .tileUrl=${this.panel?.config?.tile_url ?? ""} .initialId=${this.jumpId}></dl-flights-view>` : B`<dl-stats-view .hass=${this.hass} .tileUrl=${this.panel?.config?.tile_url ?? ""}></dl-stats-view>`}
      </main>
    `;
	}
};
customElements.define("dronelog-panel", ts);
export { ts as DroneLogPanel };
