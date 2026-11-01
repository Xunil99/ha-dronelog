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
var ne = globalThis, j = (e) => e, M = ne.trustedTypes, re = M ? M.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ie = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, P = "?" + N, F = `<${P}>`, I = document, R = () => I.createComment(""), z = (e) => e === null || typeof e != "object" && typeof e != "function", ae = Array.isArray, oe = (e) => ae(e) || typeof e?.[Symbol.iterator] == "function", se = "[ 	\n\f\r]", ce = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, le = /-->/g, ue = />/g, de = RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), fe = /'/g, pe = /"/g, me = /^(?:script|style|textarea|title)$/i, he = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), B = he(1), ge = he(2), _e = Symbol.for("lit-noChange"), V = Symbol.for("lit-nothing"), ve = /* @__PURE__ */ new WeakMap(), H = I.createTreeWalker(I, 129);
function U(e, t) {
	if (!ae(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return re === void 0 ? t : re.createHTML(t);
}
var ye = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ce;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ce ? c[1] === "!--" ? o = le : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = de) : (me.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = de) : o = ue : o === de ? c[0] === ">" ? (o = i ?? ce, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? de : c[3] === "\"" ? pe : fe) : o === pe || o === fe ? o = de : o === le || o === ue ? o = ce : (o = de, i = void 0);
		let d = o === de && e[t + 1].startsWith("/>") ? " " : "";
		a += o === ce ? n + F : l >= 0 ? (r.push(s), n.slice(0, l) + ie + n.slice(l) + N + d) : n + N + (l === -2 ? t : d);
	}
	return [U(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, be = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ye(t, n);
		if (this.el = e.createElement(l, r), H.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = H.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ie)) {
					let t = u[o++], n = i.getAttribute(e).split(N), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Te : r[1] === "?" ? Ee : r[1] === "@" ? De : we
					}), i.removeAttribute(e);
				} else e.startsWith(N) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (me.test(i.tagName)) {
					let e = i.textContent.split(N), t = e.length - 1;
					if (t > 0) {
						i.textContent = M ? M.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], R()), H.nextNode(), c.push({
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
function xe(e, t, n = e, r) {
	if (t === _e) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = z(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = xe(e, i._$AS(e, t.values), i, r)), t;
}
var Se = class {
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
		H.currentNode = r;
		let i = H.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Ce(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Oe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = H.nextNode(), a++);
		}
		return H.currentNode = I, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Ce = class e {
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
		e = xe(this, e, t), z(e) ? e === V || e == null || e === "" ? (this._$AH !== V && this._$AR(), this._$AH = V) : e !== this._$AH && e !== _e && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? oe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
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
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = be.createElement(U(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Se(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ve.get(e.strings);
		return t === void 0 && ve.set(e.strings, t = new be(e)), t;
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
}, we = class {
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
		if (i === void 0) e = xe(this, e, t, 0), a = !z(e) || e !== this._$AH && e !== _e, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = xe(this, r[n + o], t, o), s === _e && (s = this._$AH[o]), a ||= !z(s) || s !== this._$AH[o], s === V ? e = V : e !== V && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === V ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Te = class extends we {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === V ? void 0 : e;
	}
}, Ee = class extends we {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== V);
	}
}, De = class extends we {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = xe(this, e, t, 0) ?? V) === _e) return;
		let n = this._$AH, r = e === V && n !== V || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== V && (n === V || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Oe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		xe(this, e);
	}
}, ke = ne.litHtmlPolyfillSupport;
ke?.(be, Ce), (ne.litHtmlVersions ??= []).push("3.3.3");
var Ae = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Ce(t.insertBefore(R(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, je = globalThis, Me = class extends A {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ae(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return _e;
	}
};
Me._$litElement$ = !0, Me.finalized = !0, je.litElementHydrateSupport?.({ LitElement: Me });
var Ne = je.litElementPolyfillSupport;
Ne?.({ LitElement: Me }), (je.litElementVersions ??= []).push("4.2.2");
// src/api.ts
function Pe(e) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e !== void 0));
}
var Fe = class {
	constructor(e) {
		this.hass = e;
	}
	call(e) {
		return this.hass.callWS(Pe(e));
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
	logbook(e, t) {
		return this.call({
			type: "dronelog/logbook",
			drone: e,
			battery: t
		});
	}
	flightbook(e, t, n) {
		return this.call({
			type: "dronelog/flightbook",
			drone: e,
			battery: t,
			year: n
		});
	}
	batteryReport(e) {
		return this.call({
			type: "dronelog/battery_report",
			battery_serial: e
		});
	}
	noteGet(e) {
		return this.call({
			type: "dronelog/note_get",
			flight_id: e
		});
	}
	noteSet(e, t, n) {
		return this.call({
			type: "dronelog/note_set",
			flight_id: e,
			text: t,
			tags: n.join(", ")
		});
	}
	placeNameSet(e, t) {
		return this.call({
			type: "dronelog/place_name_set",
			key: e,
			name: t
		});
	}
	async maintenance() {
		return (await this.call({ type: "dronelog/maintenance_get" })).drones;
	}
	maintenanceSet(e, t, n) {
		return this.call({
			type: "dronelog/maintenance_set",
			drone: e,
			interval_hours: t,
			interval_flights: n
		});
	}
	maintenanceServiced(e) {
		return this.call({
			type: "dronelog/maintenance_serviced",
			drone: e
		});
	}
}, Ie = (e) => typeof e == "number" && Number.isFinite(e);
function Le(e, t, n) {
	return new Intl.NumberFormat(t, {
		minimumFractionDigits: n,
		maximumFractionDigits: n
	}).format(e);
}
function Re(e) {
	if (!Ie(e)) return "–";
	let t = Math.round(e);
	return t < 60 ? `${t} s` : t < 3600 ? `${Math.floor(t / 60)} min ${t % 60} s` : `${Math.floor(t / 3600)} h ${String(Math.floor(t % 3600 / 60)).padStart(2, "0")} min`;
}
function ze(e, t) {
	return Ie(e) ? e < 1e3 ? `${Math.round(e)} m` : `${Le(e / 1e3, t, 1)} km` : "–";
}
function Be(e, t) {
	return Ie(e) ? `${Le(e * 3.6, t, 1)} km/h` : "–";
}
function Ve(e, t) {
	return Ie(e) ? `${Le(e, t, 1)} m` : "–";
}
function He(e) {
	return Ie(e) ? `${Math.round(e)} %` : "–";
}
function Ue(e, t, n) {
	let r = new Date(e);
	return Number.isNaN(r.getTime()) ? "–" : new Intl.DateTimeFormat(n, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: t
	}).format(r);
}
var We = [
	"N",
	"NO",
	"O",
	"SO",
	"S",
	"SW",
	"W",
	"NW"
], Ge = [
	"N",
	"NE",
	"E",
	"SE",
	"S",
	"SW",
	"W",
	"NW"
];
function W(e, t = "de") {
	let n = Math.round((e % 360 + 360) % 360 / 45) % 8;
	return (t.startsWith("de") ? We : Ge)[n];
}
function Ke(e, t) {
	return Ie(e) ? `${Le(e, t, 1)} m/s` : "–";
}
function qe(e, t, n = 1) {
	return Ie(e) ? Le(e, t, n) : "–";
}
function Je(e) {
	if (!Ie(e) || e < 0) return "–";
	let t = Math.round(e), n = (e) => String(e).padStart(2, "0");
	return t >= 3600 ? `${Math.floor(t / 3600)}:${n(Math.floor(t % 3600 / 60))}:${n(t % 60)}` : `${Math.floor(t / 60)}:${n(t % 60)}`;
}
var Ye = {
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
		distance_m: "Entfernung (m)",
		sub_stats: "Statistik",
		sub_logbook: "Logbuch",
		sub_maintenance: "Wartung",
		records: "Rekorde",
		longest_flight: "Längster Flug",
		farthest_flight: "Weitester Flug",
		highest_point: "Höchster Punkt",
		fastest_speed: "Höchstes Tempo",
		years: "Jahre",
		places: "Orte",
		places_hint: "Klicke auf einen Ort, um ihm einen Namen zu geben. Orte sind Startpunkte im Umkreis von etwa 500 m.",
		unnamed_place: "Unbenannter Ort",
		name_place: "Ort benennen",
		place_name: "Name",
		place_name_hint: "Leer lassen, um den Namen zu entfernen.",
		save: "Speichern",
		cancel: "Abbrechen",
		tags: "Tags",
		flightbook: "Flugbuch",
		flightbook_hint: "Wann (von–bis), wo und mit welcher Drohne du geflogen bist. Es gelten die Filter für Drohne und Akku oben; zusätzlich kannst du ein Jahr wählen.",
		year: "Jahr",
		all_years: "Alle Jahre",
		create_flightbook: "Flugbuch erstellen",
		all_flights: "Alle Flüge",
		flightbook_empty: "Keine Flüge für diesen Filter.",
		col_nr: "Nr.",
		col_date: "Datum",
		col_time: "Zeit",
		col_place: "Ort",
		col_drone: "Drohne",
		col_note: "Notiz",
		flightbook_footnote: "Die Zeiten sind Ortszeit der Home-Assistant-Instanz; Orte sind Startpunkte (Name von dir vergeben, sonst Koordinaten). Grundlage sind die DJI-Flugprotokolle.",
		signature: "Datum, Unterschrift Pilot",
		print: "Drucken / als PDF speichern",
		maint_hint: "Stelle je Drohne ein, nach wie vielen Flugstunden oder Flügen du Propeller, Motoren und Gimbal prüfen willst. Home Assistant liefert zusätzlich Sensoren und eine Benachrichtigung, sobald das Intervall erreicht ist.",
		maint_no_drones: "Noch keine Drohnen. Sie erscheinen, sobald Flüge ausgewertet sind.",
		maint_by_hours: "Nach Flugstunden",
		maint_by_flights: "Nach Flügen",
		maint_interval_hours: "Alle … Stunden",
		maint_interval_flights: "Alle … Flüge",
		maint_hours_progress: "Flugstunden seit der Wartung",
		maint_flights_progress: "Flüge seit der Wartung",
		maint_due: "Fällig",
		maint_soon: "Bald fällig",
		maint_ok: "In Ordnung",
		maint_serviced: "Wartung erledigt",
		maint_saved: "Gespeichert",
		maint_save_failed: "Speichern fehlgeschlagen",
		open_report: "Akku-Bericht",
		report_for: "Akku {serial}",
		report_no_data: "Für diesen Akku liegen keine Messwerte vor.",
		ch_health: "Gesundheit (%)",
		ch_cycles: "Ladezyklen",
		ch_cell: "Zellabweichung (mV)",
		ch_resistance: "Innenwiderstand (mΩ, Schätzung)",
		ch_temp: "Max. Temperatur (°C)",
		ch_peak: "Spitzenstrom (A)",
		ch_threshold: "Schwelle 20 mV",
		too_few: "Zu wenige Messwerte",
		key_figures: "Kennzahlen",
		recent_flights: "Letzte Flüge",
		col_charge: "Ladung",
		col_peak: "Spitzenstrom",
		col_temp: "Temp.",
		col_cell: "Zellabw.",
		assessment: "Gesamteinschätzung",
		cycles_in_period: "Zyklen im Zeitraum",
		health_in_period: "Gesundheit im Zeitraum",
		capacity_full: "Kapazität (voll)",
		avg_used: "Ø Ladung pro Flug verbraucht",
		power_avg_peak: "Leistung Ø / Spitze",
		cell_max: "Zellabweichung (max.)",
		flights_over_20: "Flüge über 20 mV Abweichung",
		voltage_warnings: "Spannungswarnungen",
		resistance_median: "Innenwiderstand (Median)",
		report_note_base: "Grundlage sind die DJI-Flugprotokolle: Ladevorgänge außerhalb des Flugs (Ladeströme) sind darin nicht enthalten.",
		report_note_resistance: "Der Innenwiderstand ist eine grobe Schätzung (Einzelwerte streuen um etwa 20 mΩ); aussagekräftig sind nur Veränderungen über mehrere Flüge.",
		level_good: "Gut",
		level_watch: "Beobachten",
		level_critical: "Kritisch",
		head_good: "Akku in gutem Zustand",
		head_watch: "Akku beobachten",
		head_critical: "Austausch erwägen",
		f_soh_missing: "State of Health: nicht verfügbar (der Akku meldet keinen Gesundheitswert).",
		f_soh_trend_cycles: "State of Health (laut Akku-Elektronik): {health} % (zu Beginn des Zeitraums {first} %, {loss} Punkte in {cycles} Zyklen).",
		f_soh_trend: "State of Health (laut Akku-Elektronik): {health} % (zu Beginn des Zeitraums {first} %).",
		f_soh: "State of Health (laut Akku-Elektronik): {health} %.",
		f_health_critical: "Die Gesundheit liegt unter 80 %: Ein Austausch des Akkus ist zu erwägen.",
		f_health_watch: "Die Gesundheit lässt nach (unter 90 %): Beobachte den Akku und plane einen Ersatz ein.",
		f_health_missing: "Der Akku meldet keinen Gesundheitswert; die Einschätzung stützt sich nur auf Zellabweichung und Warnungen.",
		f_cell_critical: "Die Zellen liefen bis zu {mv} mV auseinander (über 50 mV): Das deutet auf eine schwache Zelle hin.",
		f_cell_watch: "In {flights} Flügen lagen die Zellen über 20 mV auseinander.",
		f_voltage_warnings: "Es gab {count} Spannungswarnungen: Lande früher und lade den Akku nicht tief entladen.",
		f_all_clear: "Keine Auffälligkeiten bei Gesundheit, Zellabweichung und Warnungen.",
		note: "Notiz",
		note_placeholder: "Notiz zum Flug",
		tags_placeholder: "Tags, durch Komma getrennt",
		note_saving: "Speichert …",
		note_saved: "Gespeichert",
		note_failed: "Speichern fehlgeschlagen",
		export: "Export",
		export_csv: "Tabelle (CSV)",
		export_gpx: "Flugweg (GPX)",
		export_kml: "Flugweg (KML, Google Earth)",
		export_failed: "Download fehlgeschlagen",
		chart_aria: "Diagramm {title}: {summary}",
		chart_range: "{count} Messwerte von {from} bis {to}, Werte {min} bis {max}",
		progress_aria: "{title}: {value}"
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
		distance_m: "Distance (m)",
		sub_stats: "Statistics",
		sub_logbook: "Logbook",
		sub_maintenance: "Maintenance",
		records: "Records",
		longest_flight: "Longest flight",
		farthest_flight: "Farthest flight",
		highest_point: "Highest point",
		fastest_speed: "Top speed",
		years: "Years",
		places: "Places",
		places_hint: "Click a place to give it a name. Places are take-off points within about 500 m.",
		unnamed_place: "Unnamed place",
		name_place: "Name place",
		place_name: "Name",
		place_name_hint: "Leave empty to remove the name.",
		save: "Save",
		cancel: "Cancel",
		tags: "Tags",
		flightbook: "Flight book",
		flightbook_hint: "When (from–to), where and with which drone you flew. The drone and battery filters above apply; you can also pick a year.",
		year: "Year",
		all_years: "All years",
		create_flightbook: "Create flight book",
		all_flights: "All flights",
		flightbook_empty: "No flights for this filter.",
		col_nr: "No.",
		col_date: "Date",
		col_time: "Time",
		col_place: "Place",
		col_drone: "Drone",
		col_note: "Note",
		flightbook_footnote: "Times are local time of the Home Assistant instance; places are take-off points (name given by you, otherwise coordinates). Based on the DJI flight logs.",
		signature: "Date, pilot's signature",
		print: "Print / save as PDF",
		maint_hint: "Set for each drone after how many flight hours or flights you want to check propellers, motors and gimbal. Home Assistant additionally provides sensors and a notification once the interval is reached.",
		maint_no_drones: "No drones yet. They appear once flights have been analysed.",
		maint_by_hours: "By flight hours",
		maint_by_flights: "By flights",
		maint_interval_hours: "Every … hours",
		maint_interval_flights: "Every … flights",
		maint_hours_progress: "Flight hours since service",
		maint_flights_progress: "Flights since service",
		maint_due: "Due",
		maint_soon: "Due soon",
		maint_ok: "OK",
		maint_serviced: "Service done",
		maint_saved: "Saved",
		maint_save_failed: "Saving failed",
		open_report: "Battery report",
		report_for: "Battery {serial}",
		report_no_data: "There are no measurements for this battery.",
		ch_health: "Health (%)",
		ch_cycles: "Charge cycles",
		ch_cell: "Cell deviation (mV)",
		ch_resistance: "Internal resistance (mΩ, estimate)",
		ch_temp: "Max. temperature (°C)",
		ch_peak: "Peak current (A)",
		ch_threshold: "Threshold 20 mV",
		too_few: "Too few measurements",
		key_figures: "Key figures",
		recent_flights: "Latest flights",
		col_charge: "Charge",
		col_peak: "Peak current",
		col_temp: "Temp.",
		col_cell: "Cell dev.",
		assessment: "Overall assessment",
		cycles_in_period: "Cycles in period",
		health_in_period: "Health in period",
		capacity_full: "Capacity (full)",
		avg_used: "Avg. charge used per flight",
		power_avg_peak: "Power avg. / peak",
		cell_max: "Cell deviation (max.)",
		flights_over_20: "Flights above 20 mV deviation",
		voltage_warnings: "Voltage warnings",
		resistance_median: "Internal resistance (median)",
		report_note_base: "Based on the DJI flight logs: charging outside of flights (charging currents) is not included.",
		report_note_resistance: "The internal resistance is a rough estimate (single values scatter by about 20 mΩ); only changes over several flights are meaningful.",
		level_good: "Good",
		level_watch: "Watch",
		level_critical: "Critical",
		head_good: "Battery in good condition",
		head_watch: "Keep an eye on the battery",
		head_critical: "Consider replacing",
		f_soh_missing: "State of health: not available (the battery reports no health value).",
		f_soh_trend_cycles: "State of health (per battery electronics): {health} % (at the start of the period {first} %, {loss} points in {cycles} cycles).",
		f_soh_trend: "State of health (per battery electronics): {health} % (at the start of the period {first} %).",
		f_soh: "State of health (per battery electronics): {health} %.",
		f_health_critical: "The health is below 80 %: consider replacing the battery.",
		f_health_watch: "The health is declining (below 90 %): keep an eye on the battery and plan a replacement.",
		f_health_missing: "The battery reports no health value; the assessment relies on cell deviation and warnings only.",
		f_cell_critical: "The cells drifted apart by up to {mv} mV (over 50 mV): this points to a weak cell.",
		f_cell_watch: "In {flights} flights the cells were more than 20 mV apart.",
		f_voltage_warnings: "There were {count} voltage warnings: land earlier and do not discharge the battery deeply.",
		f_all_clear: "No issues with health, cell deviation and warnings.",
		note: "Note",
		note_placeholder: "Note on the flight",
		tags_placeholder: "Tags, separated by commas",
		note_saving: "Saving …",
		note_saved: "Saved",
		note_failed: "Saving failed",
		export: "Export",
		export_csv: "Table (CSV)",
		export_gpx: "Flight path (GPX)",
		export_kml: "Flight path (KML, Google Earth)",
		export_failed: "Download failed",
		chart_aria: "Chart {title}: {summary}",
		chart_range: "{count} measurements from {from} to {to}, values {min} to {max}",
		progress_aria: "{title}: {value}"
	}
};
function G(e, t) {
	return (t?.toLowerCase().startsWith("de") ? Ye.de : Ye.en)[e];
}
function Xe(e, t, n = {}) {
	return G(e, t).replace(/\{(\w+)\}/g, (e, t) => t in n ? String(n[t]) : e);
}
// src/flight-logic.ts
var Ze = {
	info: "#1e88e5",
	warning: "#fb8c00",
	critical: "#e53935"
}, Qe = {
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
function $e(e) {
	let t = Qe[e], n = t?.severity ?? "info";
	return {
		icon: t?.icon ?? "mdi:information-outline",
		severity: n,
		color: Ze[n],
		titleKey: t ? `event_${e}` : null
	};
}
function et(e, t) {
	let n = $e(e).titleKey;
	return n ? G(n, t) : e;
}
function tt(e, t) {
	let n = et(e.kind, t);
	switch (e.kind) {
		case "weakSignal":
		case "lowGPS":
		case "propellerCatapult": return e.value > 0 ? `${n} · ${Re(e.value)}` : n;
		case "voltageWarning": return `${n} · ${G("level", t)} ${Math.round(e.value)}`;
		default: return n;
	}
}
function nt(e, t) {
	return [...e?.events ?? []].sort((e, t) => e.t - t.t).map((e) => {
		let n = $e(e.kind);
		return {
			timeText: Je(e.t),
			icon: n.icon,
			color: n.color,
			text: tt(e, t),
			severity: n.severity
		};
	});
}
function rt(e, t) {
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
function it(e) {
	let t = e.event_kinds ?? [], n = e.photo_count ?? 0, r = e.video_s ?? 0;
	return {
		kinds: t,
		photos: n,
		videoS: r,
		empty: t.length === 0 && n === 0 && r === 0
	};
}
var at = (e) => Math.min(100, Math.max(0, e)), ot = (e, t) => `${qe(e, t)} m/s`;
function st(e, t) {
	if (!e) return [];
	let n = [];
	return e.energy_wh > 0 && n.push({
		label: G("energy", t),
		value: `${qe(e.energy_wh, t)} Wh`
	}), e.wh_per_km !== null && e.wh_per_km > 0 && n.push({
		label: G("wh_per_km", t),
		value: `${qe(e.wh_per_km, t)} Wh/km`
	}), e.max_descent_ms > 0 && n.push({
		label: G("max_descent", t),
		value: ot(e.max_descent_ms, t)
	}), e.max_climb_ms > 0 && n.push({
		label: G("max_climb", t),
		value: ot(e.max_climb_ms, t)
	}), n;
}
function ct(e, t) {
	if (!e) return [];
	let n = [];
	return e.downlink_min !== null && n.push({
		label: G("downlink_worst", t),
		value: He(at(e.downlink_min))
	}), e.uplink_min !== null && n.push({
		label: G("uplink_worst", t),
		value: He(at(e.uplink_min))
	}), e.downlink_min !== null && n.push({
		label: G("weak_signal_time", t),
		value: Re(e.weak_signal_s)
	}), e.max_distance_from_start_m > 0 && n.push({
		label: G("max_distance", t),
		value: ze(e.max_distance_from_start_m, t)
	}), n;
}
function lt(e, t) {
	if (!e) return [];
	let n = [];
	return e.photo_count > 0 && n.push({
		label: G("photos", t),
		value: String(e.photo_count)
	}), e.video_s > 0 && n.push({
		label: G("video", t),
		value: Re(e.video_s)
	}), n;
}
function ut(e) {
	let t = e * 1e3;
	return t > 50.0001 ? "major" : t > 20.0001 ? "minor" : "ok";
}
function dt(e, t) {
	return G(`cell_${e === "major" ? "major" : e === "minor" ? "minor" : "ok"}`, t);
}
function ft(e, t, n) {
	let r = t ?? ut(e.cell_deviation_max_v), i = [
		{
			label: G("charge", n),
			value: `${He(e.charge_start)} → ${He(e.charge_end)}`
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
			value: `${Math.round(e.cell_deviation_max_v * 1e3)} mV (${dt(r, n)})`
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
		value: He(e.health_pct)
	}), e.full_capacity_mah > 0 && i.push({
		label: G("capacity", n),
		value: `${e.full_capacity_mah} mAh`
	}), e.min_voltage > 0 && i.push({
		label: G("voltage", n),
		value: `${qe(e.min_voltage, n)} … ${qe(e.max_voltage, n)} V`
	}), e.peak_current_a > 0 && i.push({
		label: G("peak_current", n),
		value: `${qe(e.peak_current_a, n)} A`
	}), i;
}
var pt = [
	"climb",
	"cruise",
	"hover",
	"descent"
];
function mt(e, t) {
	return e ? pt.filter((t) => (e[t] ?? 0) >= 1).map((n) => ({
		label: G(`phase_${n}`, t),
		value: Re(e[n])
	})) : [];
}
function ht(e, t) {
	if (!e) return null;
	let n = e.class === "windy" ? "wind_windy" : e.class === "moderate" ? "wind_moderate" : "wind_calm", r = Math.round(e.bearing_deg) % 360;
	return {
		label: G("wind_by_aircraft", t),
		value: `${G(n, t)}, ${G("wind_from", t)} ${W(e.bearing_deg, t)} (${r}°)`
	};
}
var K = {
	normal: "#1e88e5",
	sport: "#fb8c00",
	cine: "#00acc1",
	manual: "#8d6e63",
	automatic: "#9e9e9e",
	goHome: "#e53935",
	attitude: "#fdd835",
	smart: "#8e24aa",
	other: "#78909c"
}, gt = [
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
function _t(e, t) {
	if (!e || e.length === 0) return {
		segments: [],
		legend: [],
		total: 0
	};
	let n = Math.max(e[e.length - 1].end, 1), r = (e) => e in K ? G(`mode_${e}`, t) : e, i = /* @__PURE__ */ new Map();
	for (let t of e) i.set(t.category, (i.get(t.category) ?? 0) + Math.max(0, t.end - t.start));
	return {
		total: n,
		segments: e.map((e) => ({
			category: e.category,
			label: r(e.category),
			start: e.start,
			end: e.end,
			color: K[e.category] ?? K.other,
			share: Math.max(.004, Math.max(0, e.end - e.start) / n)
		})),
		legend: [...i].filter(([, e]) => e > 0).sort((e, t) => gt.indexOf(e[0]) - gt.indexOf(t[0])).map(([e, t]) => ({
			category: e,
			label: r(e),
			seconds: t,
			color: K[e] ?? K.other
		}))
	};
}
// src/report-logic.ts
var vt = 40;
function yt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e.split(",")) {
		let e = r.trim().replace(/^#+|#+$/g, "").trim();
		e && !t.has(e.toLowerCase()) && (t.add(e.toLowerCase()), n.push(e.slice(0, vt)));
	}
	return n;
}
var bt = (e) => e.join(", ");
function q(e, t) {
	let n, r, i = () => {
		n = void 0;
		let t = r;
		r = void 0, t && e(...t);
	};
	return {
		call(...e) {
			r = e, n !== void 0 && clearTimeout(n), n = setTimeout(i, t);
		},
		flush() {
			n !== void 0 && clearTimeout(n), i();
		},
		cancel() {
			n !== void 0 && clearTimeout(n), n = void 0, r = void 0;
		}
	};
}
function xt(e, t) {
	let [n, r, i] = e.split("-").map(Number);
	return !n || !r || !i ? "–" : new Intl.DateTimeFormat(t, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		timeZone: "UTC"
	}).format(new Date(Date.UTC(n, r - 1, i)));
}
function St(e, t) {
	return {
		rows: e.rows.map((e) => ({
			nr: String(e.nr),
			date: xt(e.date, t),
			time: e.time,
			place: e.place ? e.place.label : "–",
			drone: e.drone_label,
			battery: e.battery_label ?? "–",
			duration: Re(e.duration_s),
			distance: ze(e.distance_m, t),
			note: e.note
		})),
		summary: [
			{
				label: G("metric_flights", t),
				value: String(e.summary.flights)
			},
			{
				label: G("metric_hours", t),
				value: Re(e.summary.duration_s)
			},
			{
				label: G("distance", t),
				value: ze(e.summary.distance_m, t)
			}
		]
	};
}
function Ct(e, t) {
	let n = [];
	return e.drone && n.push(`${G("col_drone", t)}: ${e.drone}`), e.battery && n.push(`${G("battery", t)}: ${e.battery}`), e.year !== void 0 && n.push(`${G("year", t)}: ${e.year}`), n.length ? n.join(" · ") : G("all_flights", t);
}
var wt = [
	{
		key: "nr",
		title: "col_nr",
		right: !0
	},
	{
		key: "date",
		title: "col_date",
		right: !1
	},
	{
		key: "time",
		title: "col_time",
		right: !1
	},
	{
		key: "place",
		title: "col_place",
		right: !1
	},
	{
		key: "drone",
		title: "col_drone",
		right: !1
	},
	{
		key: "duration",
		title: "duration",
		right: !0
	},
	{
		key: "distance",
		title: "distance",
		right: !0
	},
	{
		key: "note",
		title: "col_note",
		right: !1
	}
];
function Tt(e) {
	return e >= .999999999 ? "due" : e >= .899999999 ? "soon" : "ok";
}
var Et = {
	ok: "#1e88e5",
	soon: "#fb8c00",
	due: "#e53935"
};
function Dt(e, t) {
	let { plan: n, status: r } = e;
	if (!n || !r) return [];
	let i = [], a = (e, t, n, r) => {
		let a = Tt(r);
		i.push({
			kind: e,
			title: t,
			value: n,
			percent: Math.round(Math.min(Math.max(r, 0), 1) * 100),
			level: a,
			color: Et[a]
		});
	};
	return r.hours_fraction !== null && n.interval_hours !== null && a("hours", G("maint_hours_progress", t), `${Re(r.used_hours * 3600)} / ${qe(n.interval_hours, t, n.interval_hours % 1 ? 1 : 0)} h`, r.hours_fraction), r.flights_fraction !== null && n.interval_flights !== null && a("flights", G("maint_flights_progress", t), `${r.used_flights} / ${n.interval_flights}`, r.flights_fraction), i;
}
function Ot(e, t) {
	return G(e === "due" ? "maint_due" : e === "soon" ? "maint_soon" : "maint_ok", t);
}
var kt = {
	min: 1,
	max: 500
}, At = {
	min: 1,
	max: 2e3
}, jt = {
	hoursOn: !1,
	hours: 10,
	flightsOn: !1,
	flights: 50
}, Mt = (e, t, n) => Number.isFinite(e) ? Math.min(t.max, Math.max(t.min, e)) : n;
function Nt(e, t = jt) {
	let n = e.plan;
	return {
		hoursOn: n?.interval_hours != null,
		hours: n?.interval_hours ?? t.hours,
		flightsOn: n?.interval_flights != null,
		flights: n?.interval_flights ?? t.flights
	};
}
function Pt(e) {
	return {
		hours: e.hoursOn ? Mt(e.hours, kt, jt.hours) : null,
		flights: e.flightsOn ? Math.round(Mt(e.flights, At, jt.flights)) : null
	};
}
function Ft(e, t) {
	return e.hours !== (t.plan?.interval_hours ?? null) || e.flights !== (t.plan?.interval_flights ?? null);
}
var It = {
	good: "#2e7d32",
	watch: "#ef6c00",
	critical: "#c62828"
}, Lt = {
	good: "●",
	watch: "▲",
	critical: "✖"
}, Rt = {
	soh_missing: "f_soh_missing",
	soh_trend_cycles: "f_soh_trend_cycles",
	soh_trend: "f_soh_trend",
	soh: "f_soh",
	health_critical: "f_health_critical",
	health_watch: "f_health_watch",
	health_missing: "f_health_missing",
	cell_critical: "f_cell_critical",
	cell_watch: "f_cell_watch",
	voltage_warnings: "f_voltage_warnings",
	all_clear: "f_all_clear"
};
function zt(e, t) {
	let n = Rt[e.code];
	return n ? Xe(n, t, e.params) : e.text;
}
function Bt(e, t) {
	let n = e.level in It ? e.level : "watch", r = `head_${n}`;
	return {
		level: n,
		color: It[n],
		symbol: Lt[n],
		levelText: G(`level_${n}`, t),
		headline: e.headline_code === n ? G(r, t) : e.headline,
		stateOfHealth: zt(e.state_of_health, t),
		points: e.points.map((e) => zt(e, t))
	};
}
var Vt = (e) => String(Math.round(e));
function Ht(e, t, n) {
	let r = new Date(e);
	return Number.isNaN(r.getTime()) ? "–" : new Intl.DateTimeFormat(n, {
		dateStyle: "medium",
		timeZone: t
	}).format(r);
}
function J(e, t, n) {
	let r = (e, n = 1) => qe(e, t, n), i = [{
		label: G("flights_count", t),
		value: String(e.flights)
	}, {
		label: G("distance", t),
		value: ze(e.total_distance_m, t)
	}];
	e.cycles_added !== null && e.cycles_first !== null && e.cycles_latest !== null && i.push({
		label: G("cycles_in_period", t),
		value: `${e.cycles_first} → ${e.cycles_latest} (+${e.cycles_added})`
	}), e.health_first !== null && e.health_latest !== null && i.push({
		label: G("health_in_period", t),
		value: `${e.health_first} % → ${e.health_latest} %`
	}), e.full_capacity_mah > 0 && i.push({
		label: G("capacity_full", t),
		value: `${e.full_capacity_mah} mAh`
	}), i.push({
		label: G("avg_used", t),
		value: `${Vt(e.avg_charge_used_pct)} %`
	}), e.min_voltage > 0 && i.push({
		label: G("voltage", t),
		value: `${r(e.min_voltage)} … ${r(e.max_voltage)} V`
	}), e.peak_current_a > 0 && i.push({
		label: G("peak_current", t),
		value: `${r(e.peak_current_a)} A`
	}), i.push({
		label: G("power_avg_peak", t),
		value: `${Vt(e.avg_power_w)} W / ${Vt(e.peak_power_w)} W`
	}), e.temp_max_c !== 0 && i.push({
		label: G("temperature", t),
		value: `${Vt(e.temp_min_c)} … ${Vt(e.temp_max_c)} °C`
	}), i.push({
		label: G("cell_max", t),
		value: `${Vt(e.cell_deviation_max_mv)} mV (${dt(ut(e.cell_deviation_max_mv / 1e3), t)})`
	}), e.flights_above_cell_warning > 0 && i.push({
		label: G("flights_over_20", t),
		value: String(e.flights_above_cell_warning)
	}), e.voltage_warnings > 0 && i.push({
		label: G("voltage_warnings", t),
		value: String(e.voltage_warnings)
	}), e.resistance_median_mohm !== null && i.push({
		label: G("resistance_median", t),
		value: `${Vt(e.resistance_median_mohm)} mΩ`
	});
	let a = [e.drone_models.join(", "), `${Ht(e.first_use, n, t)} – ${Ht(e.last_use, n, t)}`].filter(Boolean).join(" · ");
	return {
		title: Xe("report_for", t, { serial: e.serial }),
		subtitle: a,
		tiles: [
			{
				label: G("flights_count", t),
				value: String(e.flights)
			},
			{
				label: G("metric_hours", t),
				value: Re(e.total_duration_s)
			},
			{
				label: G("cycles", t),
				value: e.cycles_latest === null ? "–" : String(e.cycles_latest)
			},
			{
				label: G("health", t),
				value: He(e.health_latest)
			}
		],
		rows: i,
		recentHeader: [
			G("col_date", t),
			G("duration", t),
			G("col_charge", t),
			G("col_peak", t),
			G("col_temp", t),
			G("col_cell", t)
		],
		recent: e.history.slice(-12).reverse().map((e) => [
			Ht(e.start, n, t),
			Re(e.duration_s),
			`${e.charge_start} → ${e.charge_end} %`,
			`${r(e.peak_current_a)} A`,
			e.temp_max_c === 0 ? "–" : `${Vt(e.temp_max_c)} °C`,
			`${Vt(e.cell_deviation_mv)} mV`
		]),
		notes: [G("report_note_base", t), G("report_note_resistance", t)]
	};
}
function Ut(e) {
	let t = (e) => Date.parse(e.start), n = (n, r = () => !0) => e.filter(r).flatMap((e) => {
		let r = n(e);
		return typeof r == "number" && Number.isFinite(r) && Number.isFinite(t(e)) ? [{
			t: t(e),
			v: r
		}] : [];
	});
	return [
		{
			id: "health",
			title: "ch_health",
			color: "#2e7d32",
			zeroBased: !1,
			points: n((e) => e.health_pct)
		},
		{
			id: "cycles",
			title: "ch_cycles",
			color: "#1565c0",
			zeroBased: !1,
			points: n((e) => e.cycles)
		},
		{
			id: "cell",
			title: "ch_cell",
			color: "#00897b",
			zeroBased: !0,
			rule: 20,
			ruleTitle: "ch_threshold",
			points: n((e) => e.cell_deviation_mv)
		},
		{
			id: "resistance",
			title: "ch_resistance",
			color: "#6a1b9a",
			zeroBased: !1,
			points: n((e) => e.resistance_mohm)
		},
		{
			id: "temp",
			title: "ch_temp",
			color: "#c2185b",
			zeroBased: !1,
			points: n((e) => e.temp_max_c, (e) => e.temp_max_c !== 0)
		},
		{
			id: "peak",
			title: "ch_peak",
			color: "#ef6c00",
			zeroBased: !0,
			points: n((e) => e.peak_current_a)
		}
	];
}
function Wt(e, t = 320, n = 110, r = "de") {
	if (e.points.length < 2) return null;
	let i = {
		left: 36,
		top: 8,
		right: t - 8,
		bottom: n - 18
	}, a = e.points.map((e) => e.v);
	e.rule !== void 0 && a.push(e.rule), e.zeroBased && a.push(0);
	let o = Math.min(...a), s = Math.max(...a);
	if (o === s) --o, s += 1;
	else if (!e.zeroBased) {
		let e = (s - o) * .08;
		o -= e, s += e;
	}
	let c = e.points.map((e) => e.t), l = Math.min(...c), u = Math.max(...c), d = (e) => u === l ? i.left : i.left + (e - l) / (u - l) * (i.right - i.left), f = (e) => i.bottom - (e - o) / (s - o) * (i.bottom - i.top), p = e.points.map((e) => ({
		x: d(e.t),
		y: f(e.v)
	})), m = (e) => Math.round(e * 10) / 10, h = [
		o,
		(o + s) / 2,
		s
	];
	return {
		width: t,
		height: n,
		plot: i,
		min: o,
		max: s,
		path: p.map((e, t) => `${t === 0 ? "M" : "L"}${m(e.x)} ${m(e.y)}`).join(" "),
		dots: p,
		ruleY: e.rule === void 0 ? null : f(e.rule),
		yTicks: h.map((e) => ({
			y: f(e),
			label: qe(e, r, +(s - o < 10))
		}))
	};
}
function Gt(e, t, n = "UTC") {
	if (e.points.length < 2) return G("too_few", t);
	let r = e.points.map((e) => e.v), i = e.points.map((e) => e.t), a = (e) => new Intl.DateTimeFormat(t, {
		dateStyle: "medium",
		timeZone: n
	}).format(new Date(e));
	return Xe("chart_range", t, {
		count: e.points.length,
		from: a(Math.min(...i)),
		to: a(Math.max(...i)),
		min: qe(Math.min(...r), t, 1),
		max: qe(Math.max(...r), t, 1)
	});
}
var Kt = (e, t) => `/api/dronelog/export/${e}/${t}`;
function qt(e) {
	let t = [{
		format: "csv",
		label: "export_csv"
	}];
	return e && t.push({
		format: "gpx",
		label: "export_gpx"
	}, {
		format: "kml",
		label: "export_kml"
	}), t;
}
function Jt(e, t) {
	let n = e?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
	if (!n) return t;
	try {
		return decodeURIComponent(n[1]);
	} catch {
		return n[1];
	}
}
async function Yt(e, t, n, r = Xt) {
	let i = Kt(t, n);
	if (!e.fetchWithAuth) throw Error("fetchWithAuth fehlt");
	let a = await e.fetchWithAuth(i);
	if (!a.ok) throw Error(`HTTP ${a.status}`);
	r(await a.blob(), Jt(a.headers.get("Content-Disposition"), `flight-${t}.${n}`));
}
function Xt(e, t) {
	let n = URL.createObjectURL(e), r = document.createElement("a");
	r.href = n, r.download = t, document.body.appendChild(r), r.click(), r.remove(), setTimeout(() => URL.revokeObjectURL(n), 1e4);
}
// src/styles.ts
var Zt = h`
  :host { display: block; color: var(--primary-text-color); font-family: var(--paper-font-body1_-_font-family, inherit); }
  .card { background: var(--card-background-color, #fff); border: 1px solid var(--divider-color, #ddd); border-radius: 12px; padding: 12px 16px; }
  .card h3 { margin: 0 0 8px; font-size: 1rem; font-weight: 500; }
  .kv { display: flex; justify-content: space-between; gap: 12px; padding: 2px 0; }
  .kv span { color: var(--secondary-text-color); }
  .muted { color: var(--secondary-text-color); }
  button { font: inherit; cursor: pointer; border: 1px solid var(--divider-color, #ccc); border-radius: 8px; background: var(--card-background-color, #fff); color: var(--primary-text-color); padding: 6px 12px; }
  button.primary { background: var(--primary-color); color: var(--text-primary-color, #fff); border-color: var(--primary-color); }
  select { font: inherit; padding: 6px; border-radius: 8px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); }
`, Qt = class extends Me {
	static {
		this.properties = {
			hass: { attribute: !1 },
			flightId: { type: Number },
			text: { state: !0 },
			tags: { state: !0 },
			loaded: { state: !0 },
			status: { state: !0 }
		};
	}
	constructor() {
		super(), this.token = 0, this.saver = q((e, t, n) => void this.save(e, t, n), 600), this.text = "", this.tags = "", this.loaded = !1, this.status = "";
	}
	static {
		this.styles = [Zt, h`
      textarea, input { font: inherit; width: 100%; box-sizing: border-box; padding: 6px 8px; border-radius: 8px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); margin-bottom: 8px; }
      textarea { resize: vertical; min-height: 3.2em; }
      .status { font-size: 0.8rem; min-height: 1.2em; }
      .failed { color: var(--error-color, #c62828); }
    `];
	}
	willUpdate(e) {
		e.has("flightId") && (this.saver.flush(), this.load());
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.saver.flush();
	}
	async load() {
		let e = ++this.token;
		if (this.loaded = !1, this.status = "", this.text = "", this.tags = "", this.flightId !== void 0) try {
			let t = await new Fe(this.hass).noteGet(this.flightId);
			if (e !== this.token) return;
			this.text = t.text ?? "", this.tags = bt(t.tags ?? []), this.loaded = !0;
		} catch {
			e === this.token && (this.status = "failed");
		}
	}
	async save(e, t, n) {
		this.status = "saving", this.savingFor = e;
		try {
			await new Fe(this.hass).noteSet(e, t, yt(n)), this.savingFor === e && (this.status = "saved");
		} catch {
			this.status = "failed";
		}
	}
	edit(e, t) {
		this.loaded && this.flightId !== void 0 && (this[e] = t, this.status = "", this.saver.call(this.flightId, this.text, this.tags));
	}
	render() {
		let e = this.hass?.language ?? "en", t = this.status === "saving" ? G("note_saving", e) : this.status === "saved" ? G("note_saved", e) : this.status === "failed" ? G("note_failed", e) : "";
		return B`
      <textarea rows="3" aria-label=${G("note", e)} placeholder=${G("note_placeholder", e)} maxlength="2000" .value=${this.text} ?disabled=${!this.loaded}
        @input=${(e) => this.edit("text", e.target.value)}></textarea>
      <input type="text" aria-label=${G("tags", e)} placeholder=${G("tags_placeholder", e)} .value=${this.tags} ?disabled=${!this.loaded}
        @input=${(e) => this.edit("tags", e.target.value)} />
      <div class="status muted ${this.status === "failed" ? "failed" : ""}" role="status" aria-live="polite">${t}</div>
    `;
	}
};
customElements.define("dl-flight-note", Qt);
// node_modules/uplot/dist/uPlot.esm.js
var $t = !0, en = "uplot", tn = "u-hz", nn = "u-vt", rn = "u-title", an = "u-wrap", on = "u-under", sn = "u-over", Y = "u-axis", cn = "u-off", ln = "u-select", un = "u-cursor-x", dn = "u-cursor-y", fn = "u-cursor-pt", pn = "u-legend", mn = "u-live", hn = "u-inline", gn = "u-series", _n = "u-marker", vn = "u-label", yn = "u-value", bn = "width", xn = "height", Sn = "top", Cn = "bottom", wn = "left", Tn = "right", En = "#000", Dn = "#0000", On = "mousemove", kn = "mousedown", An = "mouseup", jn = "mouseenter", Mn = "mouseleave", Nn = "dblclick", Pn = "resize", Fn = "scroll", In = "change", Ln = "dppxchange", Rn = "--", zn = typeof window < "u", Bn = zn ? document : null, Vn = zn ? window : null, Hn = zn ? navigator : null, X, Un;
function Wn() {
	let e = devicePixelRatio;
	X != e && (X = e, Un && ir(In, Un, Wn), Un = matchMedia(`(min-resolution: ${X - .001}dppx) and (max-resolution: ${X + .001}dppx)`), rr(In, Un, Wn), Vn.dispatchEvent(new CustomEvent(Ln)));
}
function Gn(e, t) {
	if (t != null) {
		let n = e.classList;
		!n.contains(t) && n.add(t);
	}
}
function Kn(e, t) {
	let n = e.classList;
	n.contains(t) && n.remove(t);
}
function Z(e, t, n) {
	e.style[t] = n + "px";
}
function qn(e, t, n, r) {
	let i = Bn.createElement(e);
	return t != null && Gn(i, t), n?.insertBefore(i, r), i;
}
function Jn(e, t) {
	return qn("div", e, t);
}
var Yn = /* @__PURE__ */ new WeakMap();
function Xn(e, t, n, r, i) {
	let a = "translate(" + t + "px," + n + "px)";
	a != Yn.get(e) && (e.style.transform = a, Yn.set(e, a), t < 0 || n < 0 || t > r || n > i ? Gn(e, cn) : Kn(e, cn));
}
var Zn = /* @__PURE__ */ new WeakMap();
function Qn(e, t, n) {
	let r = t + n;
	r != Zn.get(e) && (Zn.set(e, r), e.style.background = t, e.style.borderColor = n);
}
var $n = /* @__PURE__ */ new WeakMap();
function er(e, t, n, r) {
	let i = t + "" + n;
	i != $n.get(e) && ($n.set(e, i), e.style.height = n + "px", e.style.width = t + "px", e.style.marginLeft = r ? -t / 2 + "px" : 0, e.style.marginTop = r ? -n / 2 + "px" : 0);
}
var tr = { passive: !0 }, nr = {
	...tr,
	capture: !0
};
function rr(e, t, n, r) {
	t.addEventListener(e, n, r ? nr : tr);
}
function ir(e, t, n, r) {
	t.removeEventListener(e, n, tr);
}
zn && Wn();
function ar(e, t, n, r) {
	let i;
	n ||= 0, r ||= t.length - 1;
	let a = r <= 2147483647;
	for (; r - n > 1;) i = a ? n + r >> 1 : Er((n + r) / 2), t[i] < e ? n = i : r = i;
	return e - t[n] <= t[r] - e ? n : r;
}
function or(e) {
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
var sr = (e) => e != null, cr = (e) => e != null && e > 0, lr = or(sr), ur = or(cr);
function dr(e, t, n, r = 0, i = !1) {
	let a = i ? ur : lr, o = i ? cr : sr;
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
	return [s ?? Lr, c ?? -Lr];
}
function fr(e, t, n, r) {
	let i = Mr(e), a = Mr(t);
	e == t && (i == -1 ? (e *= n, t /= n) : (e /= n, t *= n));
	let o = n == 10 ? Nr : Pr, s = i == 1 ? Er : Or, c = a == 1 ? Or : Er, l = s(o(Tr(e))), u = c(o(Tr(t))), d = jr(n, l), f = jr(n, u);
	return n == 10 && (l < 0 && (d = Qr(d, -l)), u < 0 && (f = Qr(f, -u))), r || n == 2 ? (e = d * i, t = f * a) : (e = Zr(e, d), t = Xr(t, f)), [e, t];
}
function pr(e, t, n, r) {
	let i = fr(e, t, n, r);
	return e == 0 && (i[0] = 0), t == 0 && (i[1] = 0), i;
}
var mr = .1, hr = {
	mode: 3,
	pad: mr
}, gr = {
	pad: 0,
	soft: null,
	mode: 0
}, _r = {
	min: gr,
	max: gr
};
function vr(e, t, n, r) {
	return li(n) ? br(e, t, n) : (gr.pad = n, gr.soft = r ? 0 : null, gr.mode = r ? 3 : 0, br(e, t, _r));
}
function Q(e, t) {
	return e ?? t;
}
function yr(e, t, n) {
	for (t = Q(t, 0), n = Q(n, e.length - 1); t <= n;) {
		if (e[t] != null) return !0;
		t++;
	}
	return !1;
}
function br(e, t, n) {
	let r = n.min, i = n.max, a = Q(r.pad, 0), o = Q(i.pad, 0), s = Q(r.hard, -Lr), c = Q(i.hard, Lr), l = Q(r.soft, Lr), u = Q(i.soft, -Lr), d = Q(r.mode, 0), f = Q(i.mode, 0), p = t - e, m = Nr(p), h = Ar(Tr(e), Tr(t)), g = Tr(Nr(h) - m);
	(p < 1e-24 || g > 10) && (p = 0, (e == 0 || t == 0) && (p = 1e-24, d == 2 && l != Lr && (a = 0), f == 2 && u != -Lr && (o = 0)));
	let _ = p || h || 1e3, v = jr(10, Er(Nr(_))), y = Qr(Zr(e - _ * (p == 0 ? e == 0 ? .1 : 1 : a), v / 10), 24), b = e >= l && (d == 1 || d == 3 && y <= l || d == 2 && y >= l) ? l : Lr, x = Ar(s, y < b && e >= b ? b : kr(b, y)), S = Qr(Xr(t + _ * (p == 0 ? t == 0 ? .1 : 1 : o), v / 10), 24), C = t <= u && (f == 1 || f == 3 && S >= u || f == 2 && S <= u) ? u : -Lr, w = kr(c, S > C && t <= C ? C : Ar(C, S));
	return x == w && x == 0 && (w = 100), [x, w];
}
var xr = new Intl.NumberFormat(zn ? Hn.language : "en-US"), Sr = (e) => xr.format(e), Cr = Math, wr = Cr.PI, Tr = Cr.abs, Er = Cr.floor, Dr = Cr.round, Or = Cr.ceil, kr = Cr.min, Ar = Cr.max, jr = Cr.pow, Mr = Cr.sign, Nr = Cr.log10, Pr = Cr.log2, Fr = (e, t = 1) => Cr.sinh(e) * t, Ir = (e, t = 1) => Cr.asinh(e / t), Lr = Infinity;
function Rr(e) {
	return (Nr((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function zr(e, t, n) {
	return kr(Ar(e, t), n);
}
function Br(e) {
	return typeof e == "function";
}
function $(e) {
	return Br(e) ? e : () => e;
}
var Vr = () => {}, Hr = (e) => e, Ur = (e, t) => t, Wr = (e) => null, Gr = (e) => !0, Kr = (e, t) => e == t, qr = /\.\d*?(?=9{6,}|0{6,})/gm, Jr = (e) => {
	if (oi(e) || $r.has(e)) return e;
	let t = `${e}`, n = t.match(qr);
	if (n == null) return e;
	let r = n[0].length - 1;
	if (t.indexOf("e-") != -1) {
		let [e, n] = t.split("e");
		return +`${Jr(e)}e${n}`;
	}
	return Qr(e, r);
};
function Yr(e, t) {
	return Jr(Qr(Jr(e / t)) * t);
}
function Xr(e, t) {
	return Jr(Or(Jr(e / t)) * t);
}
function Zr(e, t) {
	return Jr(Er(Jr(e / t)) * t);
}
function Qr(e, t = 0) {
	if (oi(e)) return e;
	let n = 10 ** t;
	return Dr(e * n * (1 + 2 ** -52)) / n;
}
var $r = /* @__PURE__ */ new Map();
function ei(e) {
	return (("" + e).split(".")[1] || "").length;
}
function ti(e, t, n, r) {
	let i = [], a = r.map(ei);
	for (let o = t; o < n; o++) {
		let t = Tr(o), n = Qr(jr(e, o), t);
		for (let s = 0; s < r.length; s++) {
			let c = e == 10 ? +`${r[s]}e${o}` : r[s] * n, l = (o >= 0 ? 0 : t) + (o >= a[s] ? 0 : a[s]), u = e == 10 ? c : Qr(c, l);
			i.push(u), $r.set(u, l);
		}
	}
	return i;
}
var ni = {}, ri = [], ii = [null, null], ai = Array.isArray, oi = Number.isInteger, si = (e) => e === void 0;
function ci(e) {
	return typeof e == "string";
}
function li(e) {
	let t = !1;
	if (e != null) {
		let n = e.constructor;
		t = n == null || n == Object;
	}
	return t;
}
function ui(e) {
	return typeof e == "object" && !!e;
}
var di = Object.getPrototypeOf(Uint8Array), fi = "__proto__";
function pi(e, t = li) {
	let n;
	if (ai(e)) {
		let r = e.find((e) => e != null);
		if (ai(r) || t(r)) {
			n = Array(e.length);
			for (let r = 0; r < e.length; r++) n[r] = pi(e[r], t);
		} else n = e.slice();
	} else if (e instanceof di) n = e.slice();
	else if (t(e)) {
		n = {};
		for (let r in e) r != fi && (n[r] = pi(e[r], t));
	} else n = e;
	return n;
}
function mi(e) {
	let t = arguments;
	for (let n = 1; n < t.length; n++) {
		let r = t[n];
		for (let t in r) t != fi && (li(e[t]) ? mi(e[t], pi(r[t])) : e[t] = pi(r[t]));
	}
	return e;
}
var hi = 0, gi = 1, _i = 2;
function vi(e, t, n) {
	for (let r = 0, i, a = -1; r < t.length; r++) {
		let o = t[r];
		if (o > a) {
			for (i = o - 1; i >= 0 && e[i] == null;) e[i--] = null;
			for (i = o + 1; i < n && e[i] == null;) e[a = i++] = null;
		}
	}
}
function yi(e, t) {
	if (Si(e)) {
		let t = e[0].slice();
		for (let n = 1; n < e.length; n++) t.push(...e[n].slice(1));
		return Ci(t[0]) || (t = xi(t)), t;
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
			let c = o[e], l = Array(i).fill(void 0), u = t ? t[n][e] : gi, d = [];
			for (let e = 0; e < c.length; e++) {
				let t = c[e], n = a.get(s[e]);
				t === null ? u != hi && (l[n] = t, u == _i && d.push(n)) : l[n] = t;
			}
			vi(l, d, i), r.push(l);
		}
	}
	return r;
}
var bi = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function xi(e) {
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
function Si(e) {
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
function Ci(e, t = 100) {
	let n = e.length;
	if (n <= 1) return !0;
	let r = 0, i = n - 1;
	for (; r <= i && e[r] == null;) r++;
	for (; i >= r && e[i] == null;) i--;
	if (i <= r) return !0;
	let a = Ar(1, Er((i - r + 1) / t));
	for (let t = e[r], n = r + a; n <= i; n += a) {
		let r = e[n];
		if (r != null) {
			if (r <= t) return !1;
			t = r;
		}
	}
	return !0;
}
var wi = [
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
], Ti = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
function Ei(e) {
	return e.slice(0, 3);
}
var Di = Ti.map(Ei), Oi = {
	MMMM: wi,
	MMM: wi.map(Ei),
	WWWW: Ti,
	WWW: Di
};
function ki(e) {
	return (e < 10 ? "0" : "") + e;
}
function Ai(e) {
	return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
var ji = {
	YYYY: (e) => e.getFullYear(),
	YY: (e) => (e.getFullYear() + "").slice(2),
	MMMM: (e, t) => t.MMMM[e.getMonth()],
	MMM: (e, t) => t.MMM[e.getMonth()],
	MM: (e) => ki(e.getMonth() + 1),
	M: (e) => e.getMonth() + 1,
	DD: (e) => ki(e.getDate()),
	D: (e) => e.getDate(),
	WWWW: (e, t) => t.WWWW[e.getDay()],
	WWW: (e, t) => t.WWW[e.getDay()],
	HH: (e) => ki(e.getHours()),
	H: (e) => e.getHours(),
	h: (e) => {
		let t = e.getHours();
		return t == 0 ? 12 : t > 12 ? t - 12 : t;
	},
	AA: (e) => e.getHours() >= 12 ? "PM" : "AM",
	aa: (e) => e.getHours() >= 12 ? "pm" : "am",
	a: (e) => e.getHours() >= 12 ? "p" : "a",
	mm: (e) => ki(e.getMinutes()),
	m: (e) => e.getMinutes(),
	ss: (e) => ki(e.getSeconds()),
	s: (e) => e.getSeconds(),
	fff: (e) => Ai(e.getMilliseconds())
};
function Mi(e, t) {
	t ||= Oi;
	let n = [], r = /\{([a-z]+)\}|[^{]+/gi, i;
	for (; i = r.exec(e);) n.push(i[0][0] == "{" ? ji[i[1]] : i[0]);
	return (e) => {
		let r = "";
		for (let i = 0; i < n.length; i++) r += typeof n[i] == "string" ? n[i] : n[i](e, t);
		return r;
	};
}
var Ni = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Pi(e, t) {
	let n;
	return t == "UTC" || t == "Etc/UTC" ? n = /* @__PURE__ */ new Date(+e + e.getTimezoneOffset() * 6e4) : t == Ni ? n = e : (n = new Date(e.toLocaleString("en-US", { timeZone: t })), n.setMilliseconds(e.getMilliseconds())), n;
}
var Fi = (e) => e % 1 == 0, Ii = [
	1,
	2,
	2.5,
	5
], Li = ti(10, -32, 0, Ii), Ri = ti(10, 0, 32, Ii), zi = Ri.filter(Fi), Bi = Li.concat(Ri), Vi = "\n", Hi = "{YYYY}", Ui = Vi + Hi, Wi = "{M}/{D}", Gi = Vi + Wi, Ki = Gi + "/{YY}", qi = "{aa}", Ji = "{h}:{mm}" + qi, Yi = Vi + Ji, Xi = ":{ss}", Zi = null;
function Qi(e) {
	let t = e * 1e3, n = t * 60, r = n * 60, i = r * 24, a = i * 30, o = i * 365, s = (e == 1 ? ti(10, 0, 3, Ii).filter(Fi) : ti(10, -3, 0, Ii)).concat([
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
			Hi,
			Zi,
			Zi,
			Zi,
			Zi,
			Zi,
			Zi,
			1
		],
		[
			i * 28,
			"{MMM}",
			Ui,
			Zi,
			Zi,
			Zi,
			Zi,
			Zi,
			1
		],
		[
			i,
			Wi,
			Ui,
			Zi,
			Zi,
			Zi,
			Zi,
			Zi,
			1
		],
		[
			r,
			"{h}" + qi,
			Ki,
			Zi,
			Gi,
			Zi,
			Zi,
			Zi,
			1
		],
		[
			n,
			Ji,
			Ki,
			Zi,
			Gi,
			Zi,
			Zi,
			Zi,
			1
		],
		[
			t,
			Xi,
			Ki + " " + Ji,
			Zi,
			Gi + " " + Ji,
			Zi,
			Yi,
			Zi,
			1
		],
		[
			e,
			Xi + ".{fff}",
			Ki + " " + Ji,
			Zi,
			Gi + " " + Ji,
			Zi,
			Yi,
			Zi,
			1
		]
	];
	function l(t) {
		return (s, c, l, u, d, f) => {
			let p = [], m = d >= o, h = d >= a && d < o, g = t(l), _ = Qr(g * e, 3), v = ca(g.getFullYear(), m ? 0 : g.getMonth(), h || m ? 1 : g.getDate()), y = Qr(v * e, 3);
			if (h || m) {
				let n = h ? d / a : 0, r = m ? d / o : 0, i = _ == y ? _ : Qr(ca(v.getFullYear() + r, v.getMonth() + n, 1) * e, 3), s = new Date(Dr(i / e)), c = s.getFullYear(), l = s.getMonth();
				for (let a = 0; i <= u; a++) {
					let o = ca(c + r * a, l + n * a, 1), s = o - t(Qr(o * e, 3));
					i = Qr((+o + s) * e, 3), i <= u && p.push(i);
				}
			} else {
				let a = d >= i ? i : d, o = y + (Er(l) - Er(_)) + Xr(_ - y, a);
				p.push(o);
				let m = t(o), h = m.getHours() + m.getMinutes() / n + m.getSeconds() / r, g = d / r, v = f / s.axes[c]._space;
				for (; o = Qr(o + d, e == 1 ? 0 : 3), !(o > u);) if (g > 1) {
					let e = Er(Qr(h + g, 6)) % 24, n = t(o).getHours() - e;
					n > 1 && (n = -1), o -= n * r, h = (h + g) % 24;
					let i = p[p.length - 1];
					Qr((o - i) / d, 3) * v >= .7 && p.push(o);
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
var [$i, ea, ta] = Qi(1), [na, ra, ia] = Qi(.001);
ti(2, -53, 53, [1]);
function aa(e, t) {
	return e.map((e) => e.map((n, r) => r == 0 || r == 8 || n == null ? n : t(r == 1 || e[8] == 0 ? n : e[1] + n)));
}
function oa(e, t) {
	return (n, r, i, a, o) => {
		let s = t.find((e) => o >= e[0]) || t[t.length - 1], c, l, u, d, f, p;
		return r.map((t) => {
			let n = e(t), r = n.getFullYear(), i = n.getMonth(), a = n.getDate(), o = n.getHours(), m = n.getMinutes(), h = n.getSeconds(), g = r != c && s[2] || i != l && s[3] || a != u && s[4] || o != d && s[5] || m != f && s[6] || h != p && s[7] || s[1];
			return c = r, l = i, u = a, d = o, f = m, p = h, g(n);
		});
	};
}
function sa(e, t) {
	let n = Mi(t);
	return (t, r, i, a, o) => r.map((t) => n(e(t)));
}
function ca(e, t, n) {
	return new Date(e, t, n);
}
function la(e, t) {
	return t(e);
}
var ua = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function da(e, t) {
	return (n, r, i, a) => a == null ? Rn : t(e(r));
}
function fa(e, t) {
	let n = e.series[t];
	return n.width ? n.stroke(e, t) : n.points.width ? n.points.stroke(e, t) : null;
}
function pa(e, t) {
	return e.series[t].fill(e, t);
}
var ma = {
	show: !0,
	live: !0,
	isolate: !1,
	mount: Vr,
	markers: {
		show: !0,
		width: 2,
		stroke: fa,
		fill: pa,
		dash: "solid"
	},
	idx: null,
	idxs: null,
	values: []
};
function ha(e, t) {
	let n = e.cursor.points, r = Jn(), i = n.size(e, t);
	Z(r, bn, i), Z(r, xn, i);
	let a = i / -2;
	Z(r, "marginLeft", a), Z(r, "marginTop", a);
	let o = n.width(e, t, i);
	return o && Z(r, "borderWidth", o), r;
}
function ga(e, t) {
	let n = e.series[t].points;
	return n._fill || n._stroke;
}
function _a(e, t) {
	let n = e.series[t].points;
	return n._stroke || n._fill;
}
function va(e, t) {
	return e.series[t].points.size;
}
var ya = [0, 0];
function ba(e, t, n) {
	return ya[0] = t, ya[1] = n, ya;
}
function xa(e, t, n, r = !0) {
	return (e) => {
		e.button != 0 || r && e.target != t || n(e);
	};
}
function Sa(e, t, n, r = !0) {
	return (e) => {
		r && e.target != t || n(e);
	};
}
var Ca = {
	show: !0,
	x: !0,
	y: !0,
	lock: !1,
	move: ba,
	points: {
		one: !1,
		show: ha,
		size: va,
		width: 0,
		stroke: _a,
		fill: ga
	},
	bind: {
		mousedown: xa,
		mouseup: xa,
		click: xa,
		dblclick: xa,
		mousemove: Sa,
		mouseleave: Sa,
		mouseenter: Sa
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
}, wa = {
	show: !0,
	stroke: "rgba(0,0,0,0.07)",
	width: 2
}, Ta = mi({}, wa, { filter: Ur }), Ea = mi({}, Ta, { size: 10 }), Da = mi({}, wa, { show: !1 }), Oa = "12px system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"", ka = "bold " + Oa, Aa = 1.5, ja = {
	show: !0,
	scale: "x",
	stroke: En,
	space: 50,
	gap: 5,
	alignTo: 1,
	size: 50,
	labelGap: 0,
	labelSize: 30,
	labelFont: ka,
	side: 2,
	grid: Ta,
	ticks: Ea,
	border: Da,
	font: Oa,
	lineGap: Aa,
	rotate: 0
}, Ma = "Value", Na = "Time", Pa = {
	show: !0,
	scale: "x",
	auto: !1,
	sorted: 1,
	min: Lr,
	max: -Infinity,
	idxs: []
};
function Fa(e, t, n, r, i) {
	return t.map((e) => e == null ? "" : Sr(e));
}
function Ia(e, t, n, r, i, a, o) {
	let s = [], c = $r.get(i) || 0;
	n = o ? n : Qr(Xr(n, i), c);
	for (let e = n; e <= r; e = Qr(e + i, c)) s.push(Object.is(e, -0) ? 0 : e);
	return s;
}
function La(e, t, n, r, i, a, o) {
	let s = [], c = e.scales[e.axes[t].scale].log;
	i = jr(c, Er((c == 10 ? Nr : Pr)(n))), c == 10 && (i = Bi[ar(i, Bi)]);
	let l = n, u = i * c;
	c == 10 && (u = Bi[ar(u, Bi)]);
	do
		s.push(l), l += i, c == 10 && !$r.has(l) && (l = Qr(l, $r.get(i))), l >= u && (i = l, u = i * c, c == 10 && (u = Bi[ar(u, Bi)]));
	while (l <= r);
	return s;
}
function Ra(e, t, n, r, i, a, o) {
	let s = e.scales[e.axes[t].scale].asinh, c = r > s ? La(e, t, Ar(s, n), r, i) : [s], l = r >= 0 && n <= 0 ? [0] : [];
	return (n < -s ? La(e, t, Ar(s, -r), -n, i) : [s]).reverse().map((e) => -e).concat(l, c);
}
var za = /./, Ba = /[12357]/, Va = /[125]/, Ha = /1/, Ua = (e, t, n, r) => e.map((e, i) => t == 4 && e == 0 || i % r == 0 && n.test(e.toExponential()[+(e < 0)]) ? e : null);
function Wa(e, t, n, r, i) {
	let a = e.axes[n], o = a.scale, s = e.scales[o], c = e.valToPos, l = a._space, u = c(10, o), d = c(9, o) - u >= l ? za : c(7, o) - u >= l ? Ba : c(5, o) - u >= l ? Va : Ha;
	if (d == Ha) {
		let e = Tr(c(1, o) - u);
		if (e < l) return Ua(t.slice().reverse(), s.distr, d, Or(l / e)).reverse();
	}
	return Ua(t, s.distr, d, 1);
}
function Ga(e, t, n, r, i) {
	let a = e.axes[n], o = a.scale, s = a._space, c = e.valToPos, l = Tr(c(1, o) - c(2, o));
	return l < s ? Ua(t.slice().reverse(), 3, za, Or(s / l)).reverse() : t;
}
function Ka(e, t, n, r) {
	return r == null ? Rn : t == null ? "" : Sr(t);
}
var qa = {
	show: !0,
	scale: "y",
	stroke: En,
	space: 30,
	gap: 5,
	alignTo: 1,
	size: 50,
	labelGap: 0,
	labelSize: 30,
	labelFont: ka,
	side: 3,
	grid: Ta,
	ticks: Ea,
	border: Da,
	font: Oa,
	lineGap: Aa,
	rotate: 0
};
function Ja(e, t) {
	return Qr((3 + (e || 1) * 2) * t, 3);
}
function Ya(e, t) {
	let { scale: n, idxs: r } = e.series[0], i = e._data[0], a = e.valToPos(i[r[0]], n, !0), o = Tr(e.valToPos(i[r[1]], n, !0) - a) / (e.series[t].points.space * X);
	return r[1] - r[0] <= o;
}
var Xa = {
	scale: null,
	auto: !0,
	sorted: 0,
	min: Lr,
	max: -Infinity
}, Za = (e, t, n, r, i) => i, Qa = {
	show: !0,
	auto: !0,
	sorted: 0,
	gaps: Za,
	alpha: 1,
	facets: [mi({}, Xa, { scale: "x" }), mi({}, Xa, { scale: "y" })]
}, $a = {
	scale: "y",
	auto: !0,
	sorted: 0,
	show: !0,
	spanGaps: !1,
	gaps: Za,
	alpha: 1,
	points: {
		show: Ya,
		filter: null
	},
	values: null,
	min: Lr,
	max: -Infinity,
	idxs: [],
	path: null,
	clip: null
};
function eo(e, t, n, r, i) {
	return n / 10;
}
var to = {
	time: $t,
	auto: !0,
	distr: 1,
	log: 10,
	asinh: 1,
	min: null,
	max: null,
	dir: 1,
	ori: 0
}, no = mi({}, to, {
	time: !1,
	ori: 1
}), ro = {};
function io(e, t) {
	let n = ro[e];
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
	}, e != null && (ro[e] = n)), n;
}
var ao = 1, oo = 2;
function so(e, t, n) {
	let r = e.mode, i = e.series[t], a = r == 2 ? e._data[t] : e._data, o = e.scales, s = e.bbox, c = a[0], l = r == 2 ? a[1] : a[t], u = r == 2 ? o[i.facets[0].scale] : o[e.series[0].scale], d = r == 2 ? o[i.facets[1].scale] : o[i.scale], f = s.left, p = s.top, m = s.width, h = s.height, g = e.valToPosH, _ = e.valToPosV;
	return u.ori == 0 ? n(i, c, l, u, d, g, _, f, p, m, h, _o, yo, xo, Co, To) : n(i, c, l, u, d, _, g, p, f, h, m, vo, bo, So, wo, Eo);
}
function co(e, t) {
	let n = 0, r = 0, i = Q(e.bands, ri);
	for (let e = 0; e < i.length; e++) {
		let a = i[e];
		a.series[0] == t ? n = a.dir : a.series[1] == t && (a.dir == 1 ? r |= 1 : r |= 2);
	}
	return [n, r == 1 ? -1 : r == 2 ? 1 : r == 3 ? 2 : 0];
}
function lo(e, t, n, r, i) {
	let a = e.mode, o = e.series[t], s = a == 2 ? o.facets[1].scale : o.scale, c = e.scales[s];
	return i == -1 ? c.min : i == 1 ? c.max : c.distr == 3 ? c.dir == 1 ? c.min : c.max : 0;
}
function uo(e, t, n, r, i, a) {
	return so(e, t, (e, t, o, s, c, l, u, d, f, p, m) => {
		let h = e.pxRound, g = s.dir * (s.ori == 0 ? 1 : -1), _ = s.ori == 0 ? yo : bo, v, y;
		g == 1 ? (v = n, y = r) : (v = r, y = n);
		let b = h(l(t[v], s, p, d)), x = h(u(o[v], c, m, f)), S = h(l(t[y], s, p, d)), C = h(u(a == 1 ? c.max : c.min, c, m, f)), w = new Path2D(i);
		return _(w, S, C), _(w, b, C), _(w, b, x), w;
	});
}
function fo(e, t, n, r, i, a) {
	let o = null;
	if (e.length > 0) {
		o = new Path2D();
		let s = t == 0 ? xo : So, c = n;
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
function po(e, t, n) {
	let r = e[e.length - 1];
	r && r[0] == t ? r[1] = n : e.push([t, n]);
}
function mo(e, t, n, r, i, a, o) {
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
function ho(e) {
	return e == 0 ? Hr : e == 1 ? Dr : (t) => Yr(t, e);
}
function go(e) {
	let t = e == 0 ? _o : vo, n = e == 0 ? (e, t, n, r, i, a) => {
		e.arcTo(t, n, r, i, a);
	} : (e, t, n, r, i, a) => {
		e.arcTo(n, t, i, r, a);
	}, r = e == 0 ? (e, t, n, r, i) => {
		e.rect(t, n, r, i);
	} : (e, t, n, r, i) => {
		e.rect(n, t, i, r);
	};
	return (e, i, a, o, s, c = 0, l = 0) => {
		c == 0 && l == 0 ? r(e, i, a, o, s) : (c = kr(c, o / 2, s / 2), l = kr(l, o / 2, s / 2), t(e, i + c, a), n(e, i + o, a, i + o, a + s, c), n(e, i + o, a + s, i, a + s, l), n(e, i, a + s, i, a, l), n(e, i, a, i + o, a, c), e.closePath());
	};
}
var _o = (e, t, n) => {
	e.moveTo(t, n);
}, vo = (e, t, n) => {
	e.moveTo(n, t);
}, yo = (e, t, n) => {
	e.lineTo(t, n);
}, bo = (e, t, n) => {
	e.lineTo(n, t);
}, xo = go(0), So = go(1), Co = (e, t, n, r, i, a) => {
	e.arc(t, n, r, i, a);
}, wo = (e, t, n, r, i, a) => {
	e.arc(n, t, r, i, a);
}, To = (e, t, n, r, i, a, o) => {
	e.bezierCurveTo(t, n, r, i, a, o);
}, Eo = (e, t, n, r, i, a, o) => {
	e.bezierCurveTo(n, t, i, r, o, a);
};
function Do(e) {
	return (e, t, n, r, i) => so(e, t, (t, a, o, s, c, l, u, d, f, p, m) => {
		let { pxRound: h, points: g } = t, _, v;
		s.ori == 0 ? (_ = _o, v = Co) : (_ = vo, v = wo);
		let y = Qr(g.width * X, 3), b = (g.size - g.width) / 2 * X, x = Qr(b * 2, 3), S = new Path2D(), C = new Path2D(), { left: w, top: T, width: E, height: D } = e.bbox;
		xo(C, w - x, T - x, E + x * 2, D + x * 2);
		let O = (e) => {
			if (o[e] != null) {
				let t = h(l(a[e], s, p, d)), n = h(u(o[e], c, m, f));
				_(S, t + b, n), v(S, t, n, b, 0, wr * 2);
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
function Oo(e) {
	return (t, n, r, i, a, o) => {
		r != i && (a != r && o != r && e(t, n, r), a != i && o != i && e(t, n, i), e(t, n, o));
	};
}
var ko = Oo(yo), Ao = Oo(bo);
function jo(e) {
	let t = Q(e?.alignGaps, 0);
	return (e, n, r, i) => so(e, n, (a, o, s, c, l, u, d, f, p, m, h) => {
		[r, i] = lr(s, r, i);
		let g = a.pxRound, _ = (e) => g(u(e, c, m, f)), v = (e) => g(d(e, l, h, p)), y, b;
		c.ori == 0 ? (y = yo, b = ko) : (y = bo, b = Ao);
		let x = c.dir * (c.ori == 0 ? 1 : -1), S = {
			stroke: new Path2D(),
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: ao
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
		let [T, E] = co(e, n);
		if (a.fill != null || T != 0) {
			let t = S.fill = new Path2D(C), s = v(a.fillTo(e, n, a.min, a.max, T)), c = _(o[r]), l = _(o[i]);
			x == -1 && ([l, c] = [c, l]), y(t, l, s), y(t, c, s);
		}
		if (!a.spanGaps) {
			let l = [];
			w && l.push(...mo(o, s, r, i, x, _, t)), S.gaps = l = a.gaps(e, n, r, i, l), S.clip = fo(l, c.ori, f, p, m, h);
		}
		return E != 0 && (S.band = E == 2 ? [uo(e, n, r, i, C, -1), uo(e, n, r, i, C, 1)] : uo(e, n, r, i, C, E)), S;
	});
}
function Mo(e) {
	let t = Q(e.align, 1), n = Q(e.ascDesc, !1), r = Q(e.alignGaps, 0), i = Q(e.extend, !1);
	return (e, a, o, s) => so(e, a, (c, l, u, d, f, p, m, h, g, _, v) => {
		[o, s] = lr(u, o, s);
		let y = c.pxRound, { left: b, width: x } = e.bbox, S = (e) => y(p(e, d, _, h)), C = (e) => y(m(e, f, v, g)), w = d.ori == 0 ? yo : bo, T = {
			stroke: new Path2D(),
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: ao
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
		let [ne, j] = co(e, a);
		if (c.fill != null || ne != 0) {
			let t = T.fill = new Path2D(E), n = C(c.fillTo(e, a, c.min, c.max, ne));
			w(t, A, n), w(t, k, n);
		}
		if (!c.spanGaps) {
			let i = [];
			i.push(...mo(l, u, o, s, D, S, r));
			let f = c.width * X / 2, p = n || t == 1 ? f : -f, m = n || t == -1 ? -f : f;
			i.forEach((e) => {
				e[0] += p, e[1] += m;
			}), T.gaps = i = c.gaps(e, a, o, s, i), T.clip = fo(i, d.ori, h, g, _, v);
		}
		return j != 0 && (T.band = j == 2 ? [uo(e, a, o, s, E, -1), uo(e, a, o, s, E, 1)] : uo(e, a, o, s, E, j)), T;
	});
}
function No(e, t, n, r, i, a, o = Lr) {
	if (e.length > 1) {
		let s = null;
		for (let c = 0, l = Infinity; c < e.length; c++) if (t[c] !== void 0) {
			if (s != null) {
				let t = Tr(e[c] - e[s]);
				t < l && (l = t, o = Tr(n(e[c], r, i, a) - n(e[s], r, i, a)));
			}
			s = c;
		}
	}
	return o;
}
function Po(e) {
	e ||= ni;
	let t = Q(e.size, [
		.6,
		Lr,
		1
	]), n = e.align || 0, r = e.gap || 0, i = e.radius;
	i = i == null ? [0, 0] : typeof i == "number" ? [i, 0] : i;
	let a = $(i), o = 1 - t[0], s = Q(t[1], Lr), c = Q(t[2], 1), l = Q(e.disp, ni), u = Q(e.each, (e) => {}), { fill: d, stroke: f } = l;
	return (e, t, i, p) => so(e, t, (m, h, g, _, v, y, b, x, S, C, w) => {
		let T = m.pxRound, E = n, D = r * X, O = s * X, ee = c * X, te, k;
		_.ori == 0 ? [te, k] = a(e, t) : [k, te] = a(e, t);
		let A = _.dir * (_.ori == 0 ? 1 : -1), ne = _.ori == 0 ? xo : So, j = _.ori == 0 ? u : (e, t, n, r, i, a, o) => {
			u(e, t, n, i, r, o, a);
		}, M = Q(e.bands, ri).find((e) => e.series[0] == t), re = M == null ? 0 : M.dir, ie = m.fillTo(e, t, m.min, m.max, re), N = T(b(ie, v, w, S)), P, F, I, R = C, z = T(m.width * X), ae = !1, oe = null, se = null, ce = null, le = null;
		d != null && (z == 0 || f != null) && (ae = !0, oe = d.values(e, t, i, p), se = /* @__PURE__ */ new Map(), new Set(oe).forEach((e) => {
			e != null && se.set(e, new Path2D());
		}), z > 0 && (ce = f.values(e, t, i, p), le = /* @__PURE__ */ new Map(), new Set(ce).forEach((e) => {
			e != null && le.set(e, new Path2D());
		})));
		let { x0: ue, size: de } = l;
		if (ue != null && de != null) {
			E = 1, h = ue.values(e, t, i, p), ue.unit == 2 && (h = h.map((t) => e.posToVal(x + t * C, _.key, !0)));
			let n = de.values(e, t, i, p);
			F = de.unit == 2 ? n[0] * C : y(n[0], _, C, x) - y(0, _, C, x), R = No(h, g, y, _, C, x, R), I = R - F + D;
		} else R = No(h, g, y, _, C, x, R), I = R * o + D, F = R - I;
		I < 1 && (I = 0), z >= F / 2 && (z = 0), I < 5 && (T = Hr);
		let fe = I > 0, pe = R - I - (fe ? z : 0);
		F = T(zr(pe, ee, O)), P = (E == 0 ? F / 2 : E == A ? 0 : F) - E * A * ((E == 0 ? D / 2 : 0) + (fe ? z / 2 : 0));
		let me = {
			stroke: null,
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: 0
		}, he = ae ? null : new Path2D(), B = null;
		if (M != null) B = e.data[M.series[1]];
		else {
			let { y0: n, y1: r } = l;
			n != null && r != null && (g = r.values(e, t, i, p), B = n.values(e, t, i, p));
		}
		let ge = te * F, _e = k * F;
		for (let n = A == 1 ? i : p; n >= i && n <= p; n += A) {
			let r = g[n];
			if (r == null) continue;
			if (B != null) {
				let e = B[n] ?? 0;
				if (r - e == 0) continue;
				N = b(e, v, w, S);
			}
			let i = y(_.distr != 2 || l != null ? h[n] : n, _, C, x), a = b(Q(r, ie), v, w, S), o = T(i - P), s = T(Ar(a, N)), c = T(kr(a, N)), u = s - c;
			if (r != null) {
				let i = r < 0 ? _e : ge, a = r < 0 ? ge : _e;
				ae ? (z > 0 && ce[n] != null && ne(le.get(ce[n]), o, c + Er(z / 2), F, Ar(0, u - z), i, a), oe[n] != null && ne(se.get(oe[n]), o, c + Er(z / 2), F, Ar(0, u - z), i, a)) : ne(he, o, c + Er(z / 2), F, Ar(0, u - z), i, a), j(e, t, n, o - z / 2, c, F + z, u);
			}
		}
		return z > 0 ? me.stroke = ae ? le : he : ae || (me._fill = m.width == 0 ? m._fill : m._stroke ?? m._fill, me.width = 0), me.fill = ae ? se : he, me;
	});
}
function Fo(e, t) {
	let n = Q(t?.alignGaps, 0);
	return (t, r, i, a) => so(t, r, (o, s, c, l, u, d, f, p, m, h, g) => {
		[i, a] = lr(c, i, a);
		let _ = o.pxRound, v = (e) => _(d(e, l, h, p)), y = (e) => _(f(e, u, g, m)), b, x, S;
		l.ori == 0 ? (b = _o, S = yo, x = To) : (b = vo, S = bo, x = Eo);
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
			flags: ao
		}, ee = O.stroke, [te, k] = co(t, r);
		if (o.fill != null || te != 0) {
			let e = O.fill = new Path2D(ee), n = y(o.fillTo(t, r, o.min, o.max, te));
			S(e, T, n), S(e, w, n);
		}
		if (!o.spanGaps) {
			let e = [];
			e.push(...mo(s, c, i, a, C, v, n)), O.gaps = e = o.gaps(t, r, i, a, e), O.clip = fo(e, l.ori, p, m, h, g);
		}
		return k != 0 && (O.band = k == 2 ? [uo(t, r, i, a, ee, -1), uo(t, r, i, a, ee, 1)] : uo(t, r, i, a, ee, k)), O;
	});
}
function Io(e) {
	return Fo(Lo, e);
}
function Lo(e, t, n, r, i, a) {
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
var Ro = /* @__PURE__ */ new Set();
function zo() {
	for (let e of Ro) e.syncRect(!0);
}
zn && (rr(Pn, Vn, zo), rr(Fn, Vn, zo, !0), rr(Ln, Vn, () => {
	ts.pxRatio = X;
}));
var Bo = jo(), Vo = Do();
function Ho(e, t, n, r) {
	return (r ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((e, r) => Wo(e, r, t, n));
}
function Uo(e, t) {
	return e.map((e, n) => n == 0 ? {} : mi({}, t, e));
}
function Wo(e, t, n, r) {
	return mi({}, t == 0 ? n : r, e);
}
function Go(e, t, n) {
	return t == null ? ii : [t, n];
}
var Ko = Go;
function qo(e, t, n) {
	return t == null ? ii : vr(t, n, mr, !0);
}
function Jo(e, t, n, r) {
	return t == null ? ii : fr(t, n, e.scales[r].log, !1);
}
var Yo = Jo;
function Xo(e, t, n, r) {
	return t == null ? ii : pr(t, n, e.scales[r].log, !1);
}
var Zo = Xo;
function Qo(e, t, n, r, i) {
	let a = Ar(Rr(e), Rr(t)), o = t - e, s = ar(i / r * o, n);
	do {
		let e = n[s], t = r * e / o;
		if (t >= i && a + (e < 5 ? $r.get(e) : 0) <= 17) return [e, t];
	} while (++s < n.length);
	return [0, 0];
}
function $o(e) {
	let t, n;
	return e = e.replace(/(\d+)px/, (e, r) => (t = Dr((n = +r) * X)) + "px"), [
		e,
		t,
		n
	];
}
function es(e) {
	e.show && [e.font, e.labelFont].forEach((e) => {
		let t = Qr(e[2] * X, 1);
		e[0] = e[0].replace(/[0-9.]+px/, t + "px"), e[1] = t;
	});
}
function ts(e, t, n) {
	let r = { mode: Q(e.mode, 1) }, i = r.mode;
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
	let l = r.root = Jn(en);
	if (e.id != null && (l.id = e.id), Gn(l, e.class), e.title) {
		let t = Jn(rn, l);
		t.textContent = e.title;
	}
	let u = qn("canvas"), d = r.ctx = u.getContext("2d"), f = Jn(an, l);
	rr("click", f, (e) => {
		e.target === m && (En != Xt || Pn != Zt) && In.click(r, e);
	}, !0);
	let p = r.under = Jn(on, f);
	f.appendChild(u);
	let m = r.over = Jn(sn, f);
	e = pi(e);
	let h = +Q(e.pxAlign, 1), g = ho(h);
	(e.plugins || []).forEach((t) => {
		t.opts && (e = t.opts(r, e) || e);
	});
	let _ = e.ms || .001, v = r.series = i == 1 ? Ho(e.series || [], Pa, $a, !1) : Uo(e.series || [null], Qa), y = r.axes = Ho(e.axes || [], ja, qa, !0), b = r.scales = {}, x = r.bands = e.bands || [];
	x.forEach((e) => {
		e.fill = $(e.fill || null), e.dir = Q(e.dir, -1);
	});
	let S = i == 2 ? v[1].facets[0].scale : v[0].scale, C = {
		axes: Ft,
		series: wt
	}, w = (e.drawOrder || ["axes", "series"]).map((e) => C[e]);
	function T(e) {
		let t = e.distr == 3 ? (t) => Nr(t > 0 ? t : e.clamp(r, t, e.min, e.max, e.key)) : e.distr == 4 ? (t) => Ir(t, e.asinh) : e.distr == 100 ? (t) => e.fwd(t) : (e) => e;
		return (n) => {
			let r = t(n), { _min: i, _max: a } = e, o = a - i;
			return (r - i) / o;
		};
	}
	function E(t) {
		let n = b[t];
		if (n == null) {
			let r = (e.scales || ni)[t] || ni;
			if (r.from != null) {
				E(r.from);
				let e = mi({}, b[r.from], r, { key: t });
				e.valToPct = T(e), b[t] = e;
			} else {
				n = b[t] = mi({}, t == S ? to : no, r), n.key = t;
				let e = n.time, a = n.range, o = ai(a);
				if ((t != S || i == 2 && !e) && (o && (a[0] == null || a[1] == null) && (a = {
					min: a[0] == null ? hr : {
						mode: 1,
						hard: a[0],
						soft: a[0]
					},
					max: a[1] == null ? hr : {
						mode: 1,
						hard: a[1],
						soft: a[1]
					}
				}, o = !1), !o && li(a))) {
					let e = a;
					a = (t, n, r) => n == null ? ii : vr(n, r, e);
				}
				n.range = $(a || (e ? Ko : t == S ? n.distr == 3 ? Yo : n.distr == 4 ? Zo : Go : n.distr == 3 ? Jo : n.distr == 4 ? Xo : qo)), n.auto = $(!o && n.auto), n.clamp = $(n.clamp || eo), n._min = n._max = null, n.valToPct = T(n);
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
	D.ori == 0 ? (Gn(l, tn), ee = a, te = o) : (Gn(l, nn), ee = o, te = a);
	let k = {};
	for (let e in b) {
		let t = b[e];
		(t.min != null || t.max != null) && (k[e] = {
			min: t.min,
			max: t.max
		}, t.min = t.max = null);
	}
	let A = e.tzDate || ((e) => new Date(Dr(e / _))), ne = e.fmtDate || Mi, j = _ == 1 ? ta(A) : ia(A), M = oa(A, aa(_ == 1 ? ea : ra, ne)), re = da(A, la(ua, ne)), ie = [], N = r.legend = mi({}, ma, e.legend), P = r.cursor = mi({}, Ca, { drag: { y: i == 2 } }, e.cursor), F = N.show, I = P.show, R = N.markers;
	N.idxs = ie, R.width = $(R.width), R.dash = $(R.dash), R.stroke = $(R.stroke), R.fill = $(R.fill);
	let z, ae, oe, se = [], ce = [], le, ue = !1, de = {};
	if (N.live) {
		let e = v[1] ? v[1].values : null;
		ue = e != null, le = ue ? e(r, 1, 0) : { _: 0 };
		for (let e in le) de[e] = Rn;
	}
	if (F) {
		if (z = qn("table", pn, l), oe = qn("tbody", null, z), N.mount(r, z), ue) {
			ae = qn("thead", null, z, oe);
			let e = qn("tr", null, ae);
			for (var fe in qn("th", null, e), le) qn("th", vn, e).textContent = fe;
		} else Gn(z, hn), N.live && Gn(z, mn);
	}
	let pe = { show: !0 }, me = { show: !1 };
	function he(e, t) {
		if (t == 0 && (ue || !N.live || i == 2)) return ii;
		let n = [], a = qn("tr", gn, oe, oe.childNodes[t]);
		Gn(a, e.class), e.show || Gn(a, cn);
		let o = qn("th", null, a);
		if (R.show) {
			let e = Jn(_n, o);
			if (t > 0) {
				let n = R.width(r, t);
				n && (e.style.border = n + "px " + R.dash(r, t) + " " + R.stroke(r, t)), e.style.background = R.fill(r, t);
			}
		}
		let s = Jn(vn, o);
		for (var c in e.label instanceof HTMLElement ? s.appendChild(e.label) : s.textContent = e.label, t > 0 && (R.show || (s.style.color = e.width > 0 ? R.stroke(r, t) : R.fill(r, t)), ge("click", o, (t) => {
			if (P._lock) return;
			Ve(t);
			let n = v.indexOf(e);
			if ((t.ctrlKey || t.metaKey) != N.isolate) {
				let e = v.some((e, t) => t > 0 && t != n && e.show);
				v.forEach((t, r) => {
					r > 0 && tr(r, e ? r == n ? pe : me : pe, !0, Oi.setSeries);
				});
			} else tr(n, { show: !e.show }, !0, Oi.setSeries);
		}, !1), We && ge(jn, o, (t) => {
			P._lock || (Ve(t), tr(v.indexOf(e), _r, !0, Oi.setSeries));
		}, !1)), le) {
			let e = qn("td", yn, a);
			e.textContent = "--", n.push(e);
		}
		return [a, n];
	}
	let B = /* @__PURE__ */ new Map();
	function ge(e, t, n, i = !0) {
		let a = B.get(t) || {}, o = P.bind[e](r, t, n, i);
		o && (rr(e, t, a[e] = o), B.set(t, a));
	}
	function _e(e, t, n) {
		let r = B.get(t) || {};
		for (let n in r) (e == null || n == e) && (ir(n, t, r[n]), delete r[n]);
		e ?? B.delete(t);
	}
	let V = 0, ve = 0, H = 0, U = 0, ye = 0, be = 0, xe = ye, Se = be, Ce = H, we = U, Te = 0, Ee = 0, De = 0, Oe = 0;
	r.bbox = {};
	let ke = !1, Ae = !1, je = !1, Me = !1, Ne = !1, Pe = !1;
	function Fe(e, t, n) {
		(n || e != r.width || t != r.height) && Ie(e, t), It(!1), je = !0, Ae = !0, Vt();
	}
	function Ie(e, t) {
		r.width = V = H = e, r.height = ve = U = t, ye = be = 0, ze(), Be();
		let n = r.bbox;
		Te = n.left = Yr(ye * X, .5), Ee = n.top = Yr(be * X, .5), De = n.width = Yr(H * X, .5), Oe = n.height = Yr(U * X, .5);
	}
	function Le() {
		let e = !1, t = 0;
		for (; !e;) {
			t++;
			let n = Nt(t), i = Pt(t);
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
		let r = e.prox = $(e.prox), i = e.bias ??= 0;
		P.dataIdx = (e, a, o, s) => {
			if (a == 0) return o;
			let c = o, l = r(e, a, o, s) ?? Lr, u = l >= 0 && l < Lr, d = D.ori == 0 ? H : U, f = P.left, p = t[0], m = t[a];
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
			} else u && Tr(f - ee(p[o], D, d, 0)) > l && (c = null);
			return c;
		};
	}
	let Ve = (e) => {
		P.event = e;
	};
	P.idxs = ie, P._lock = !1;
	let He = P.points;
	He.show = $(He.show), He.size = $(He.size), He.stroke = $(He.stroke), He.width = $(He.width), He.fill = $(He.fill);
	let Ue = r.focus = mi({}, e.focus || { alpha: .3 }, P.focus), We = Ue.prox >= 0, Ge = We && He.one, W = [], Ke = [], qe = [];
	function Je(e, t) {
		let n = He.show(r, t);
		if (n instanceof HTMLElement) return Gn(n, fn), Gn(n, e.class), Xn(n, -10, -10, H, U), m.insertBefore(n, W[t]), n;
	}
	function Ye(e, t) {
		if (i == 1 || t > 0) {
			let t = i == 1 && b[e.scale].time, n = e.value;
			e.value = t ? ci(n) ? da(A, la(n, ne)) : n || re : n || Ka, e.label = e.label || (t ? Na : Ma);
		}
		if (Ge || t > 0) {
			e.width = e.width == null ? 1 : e.width, e.paths = e.paths || Bo || Wr, e.fillTo = $(e.fillTo || lo), e.pxAlign = +Q(e.pxAlign, h), e.pxRound = ho(e.pxAlign), e.stroke = $(e.stroke || null), e.fill = $(e.fill || null), e._stroke = e._fill = e._paths = e._focus = null;
			let t = Ja(Ar(1, e.width), 1), n = e.points = mi({}, {
				size: t,
				width: Ar(1, t * .2),
				stroke: e.stroke,
				space: t * 2,
				paths: Vo,
				_stroke: null,
				_fill: null
			}, e.points);
			n.show = $(n.show), n.filter = $(n.filter), n.fill = $(n.fill), n.stroke = $(n.stroke), n.paths = $(n.paths), n.pxAlign = e.pxAlign;
		}
		if (F) {
			let n = he(e, t);
			se.splice(t, 0, n[0]), ce.splice(t, 0, n[1]), N.values.push(null);
		}
		if (I) {
			ie.splice(t, 0, null);
			let n = null;
			Ge ? t == 0 && (n = Je(e, t)) : t > 0 && (n = Je(e, t)), W.splice(t, 0, n), Ke.splice(t, 0, 0), qe.splice(t, 0, 0);
		}
		Ei("addSeries", t);
	}
	function G(e, t) {
		t ??= v.length, e = i == 1 ? Wo(e, t, Pa, $a) : Wo(e, t, {}, Qa), v.splice(t, 0, e), Ye(v[t], t);
	}
	r.addSeries = G;
	function Xe(e) {
		if (v.splice(e, 1), F) {
			N.values.splice(e, 1), ce.splice(e, 1);
			let t = se.splice(e, 1)[0];
			_e(null, t.firstChild), t.remove();
		}
		I && (ie.splice(e, 1), W.splice(e, 1)[0].remove(), Ke.splice(e, 1), qe.splice(e, 1)), Ei("delSeries", e);
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
			e.size = $(e.size), e.space = $(e.space), e.rotate = $(e.rotate), ai(e.incrs) && e.incrs.forEach((e) => {
				!$r.has(e) && $r.set(e, ei(e));
			}), e.incrs = $(e.incrs || (i.distr == 2 ? zi : a ? _ == 1 ? $i : na : Bi)), e.splits = $(e.splits || (a && i.distr == 1 ? j : i.distr == 3 ? La : i.distr == 4 ? Ra : Ia)), e.stroke = $(e.stroke), e.grid.stroke = $(e.grid.stroke), e.ticks.stroke = $(e.ticks.stroke), e.border.stroke = $(e.border.stroke);
			let o = e.values;
			e.values = ai(o) && !ai(o[0]) ? $(o) : a ? ai(o) ? oa(A, aa(o, ne)) : ci(o) ? sa(A, o) : o || M : o || Fa, e.filter = $(e.filter || (i.distr >= 3 && i.log == 10 ? Wa : i.distr == 3 && i.log == 2 ? Ga : Ur)), e.font = $o(e.font), e.labelFont = $o(e.labelFont), e._size = e.size(r, null, t, 0), e._space = e._rotate = e._incrs = e._found = e._splits = e._values = null, e._size > 0 && (Ze[t] = !0, e._el = Jn(Y, f));
		}
	}
	function $e(e, t, n, r) {
		let [i, a, o, s] = n, c = t % 2, l = 0;
		return c == 0 && (s || a) && (l = t == 0 && !i || t == 2 && !o ? Dr(ja.size / 3) : 0), c == 1 && (i || o) && (l = t == 1 && !a || t == 3 && !s ? Dr(qa.size / 2) : 0), l;
	}
	let et = r.padding = (e.padding || [
		$e,
		$e,
		$e,
		$e
	]).map((e) => $(Q(e, $e))), tt = r._padding = et.map((e, t) => e(r, t, Ze, 0)), nt, rt = null, it = null, at = i == 1 ? v[0].idxs : null, ot = null, st = !1;
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
		if (It(!0), Ei("setData"), O == 2 && (je = !0), n !== !1) {
			let e = D;
			e.auto(r, st) ? lt() : $n(S, e.min, e.max), Me ||= P.left >= 0, Pe = !0, Vt();
		}
	}
	r.setData = ct;
	function lt() {
		st = !0;
		let e, n;
		i == 1 && (nt > 0 ? (rt = at[0] = 0, it = at[1] = nt - 1, e = t[0][rt], n = t[0][it], O == 2 ? (e = rt, n = it) : e == n && (O == 3 ? [e, n] = fr(e, e, D.log, !1) : O == 4 ? [e, n] = pr(e, e, D.log, !1) : D.time ? n = e + Dr(86400 / _) : [e, n] = vr(e, n, mr, !0))) : (rt = at[0] = e = null, it = at[1] = n = null)), $n(S, e, n);
	}
	let ut, dt, ft, pt, mt, ht, K, gt, _t, vt;
	function yt(e, t, n, r, i, a) {
		e ??= Dn, n ??= ri, r ??= "butt", i ??= Dn, a ??= "round", e != ut && (d.strokeStyle = ut = e), i != dt && (d.fillStyle = dt = i), t != ft && (d.lineWidth = ft = t), a != mt && (d.lineJoin = mt = a), r != ht && (d.lineCap = ht = r), n != pt && d.setLineDash(pt = n);
	}
	function bt(e, t, n, r) {
		t != dt && (d.fillStyle = dt = t), e != K && (d.font = K = e), n != gt && (d.textAlign = gt = n), r != _t && (d.textBaseline = _t = r);
	}
	function q(e, t, n, i, a = 0) {
		if (i.length > 0 && e.auto(r, st) && (t == null || t.min == null)) {
			let t = Q(rt, 0), r = Q(it, i.length - 1), o = n.min == null ? dr(i, t, r, a, e.distr == 3) : [n.min, n.max];
			e.min = kr(e.min, n.min = o[0]), e.max = Ar(e.max, n.max = o[1]);
		}
	}
	let xt = {
		min: null,
		max: null
	};
	function St() {
		for (let e in b) {
			let t = b[e];
			k[e] == null && (t.min == null || k[S] != null && t.auto(r, st)) && (k[e] = xt);
		}
		for (let e in b) {
			let t = b[e];
			k[e] == null && t.from != null && k[t.from] != null && (k[e] = xt);
		}
		k[S] != null && It(!0);
		let e = {};
		for (let t in k) {
			let n = k[t];
			if (n != null) {
				let a = e[t] = pi(b[t], ui);
				if (n.min != null) mi(a, n);
				else if (t != S || i == 2) {
					if (nt == 0 && a.from == null) {
						let e = a.range(r, null, null, t);
						a.min = e[0], a.max = e[1];
					} else a.min = Lr, a.max = -Infinity;
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
						s.min = e[0], s.max = e[1], rt = ar(s.min, t[0]), it = ar(s.max, t[0]), it - rt > 1 && (t[0][rt] < s.min && rt++, t[0][it] > s.max && it--), n.min = ot[rt], n.max = ot[it];
					} else n.show && n.auto && q(s, o, n, t[a], n.sorted);
					n.idxs[0] = rt, n.idxs[1] = it;
				} else if (a > 0 && n.show && n.auto) {
					let [r, i] = n.facets, o = r.scale, s = i.scale, [c, l] = t[a], u = e[o], d = e[s];
					u != null && q(u, k[o], r, c, r.sorted), d != null && q(d, k[s], i, l, i.sorted), n.min = i.min, n.max = i.max;
				}
			});
			for (let t in e) {
				let n = e[t], i = k[t];
				if (n.from == null && (i == null || i.min == null)) {
					let e = n.range(r, n.min == Lr ? null : n.min, n.max == -Infinity ? null : n.max, t);
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
				i._min = e == 3 ? Nr(i.min) : e == 4 ? Ir(i.min, i.asinh) : e == 100 ? i.fwd(i.min) : i.min, i._max = e == 3 ? Nr(i.max) : e == 4 ? Ir(i.max, i.asinh) : e == 100 ? i.fwd(i.max) : i.max, n[t] = a = !0;
			}
		}
		if (a) {
			v.forEach((e, t) => {
				i == 2 ? t > 0 && n.y && (e._paths = null) : n[e.scale] && (e._paths = null);
			});
			for (let e in n) je = !0, Ei("setScale", e);
			I && P.left >= 0 && (Me = Pe = !0);
		}
		for (let e in k) k[e] = null;
	}
	function Ct(e) {
		let t = zr(rt - 1, 0, nt - 1), n = zr(it + 1, 0, nt - 1);
		for (; e[t] == null && t > 0;) t--;
		for (; e[n] == null && n < nt - 1;) n++;
		return [t, n];
	}
	function wt() {
		if (nt > 0) {
			let e = v.some((e) => e._focus) && vt != Ue.alpha;
			e && (d.globalAlpha = vt = Ue.alpha), v.forEach((e, n) => {
				if (n > 0 && e.show && (Tt(n, !1), Tt(n, !0), e._paths == null)) {
					let a = vt;
					vt != e.alpha && (d.globalAlpha = vt = e.alpha);
					let o = i == 2 ? [0, t[n][0].length - 1] : Ct(t[n]);
					e._paths = e.paths(r, n, o[0], o[1]), vt != a && (d.globalAlpha = vt = a);
				}
			}), v.forEach((e, t) => {
				if (t > 0 && e.show) {
					let n = vt;
					vt != e.alpha && (d.globalAlpha = vt = e.alpha), e._paths != null && Et(t, !1);
					{
						let n = e._paths == null ? null : e._paths.gaps, i = e.points.show(r, t, rt, it, n), a = e.points.filter(r, t, i, n);
						(i || a) && (e.points._paths = e.points.paths(r, t, rt, it, a), Et(t, !0));
					}
					vt != n && (d.globalAlpha = vt = n), Ei("drawSeries", t);
				}
			}), e && (d.globalAlpha = vt = 1);
		}
	}
	function Tt(e, t) {
		let n = t ? v[e].points : v[e];
		n._stroke = n.stroke(r, e), n._fill = n.fill(r, e);
	}
	function Et(e, t) {
		let n = t ? v[e].points : v[e], { stroke: r, fill: i, clip: a, flags: o, _stroke: s = n._stroke, _fill: c = n._fill, _width: l = n.width } = n._paths;
		l = Qr(l * X, 3);
		let u = null, f = l % 2 / 2;
		t && c == null && (c = l > 0 ? "#fff" : s);
		let p = n.pxAlign == 1 && f > 0;
		if (p && d.translate(f, f), !t) {
			let e = Te - l / 2, t = Ee - l / 2, n = De + l, r = Oe + l;
			u = new Path2D(), u.rect(e, t, n, r);
		}
		t ? Ot(s, l, n.dash, n.cap, c, r, i, o, a) : Dt(e, s, l, n.dash, n.cap, c, r, i, o, u, a), p && d.translate(-f, -f);
	}
	function Dt(e, n, i, a, o, s, c, l, u, d, f) {
		let p = !1;
		u != 0 && x.forEach((m, h) => {
			if (m.series[0] == e) {
				let e = v[m.series[1]], g = t[m.series[1]], _ = (e._paths || ni).band;
				ai(_) && (_ = m.dir == 1 ? _[0] : _[1]);
				let y, b = null;
				e.show && _ && yr(g, rt, it) ? (b = m.fill(r, h) || s, y = e._paths.clip) : _ = null, Ot(n, i, a, o, b, c, l, u, d, f, y, _), p = !0;
			}
		}), p || Ot(n, i, a, o, s, c, l, u, d, f);
	}
	function Ot(e, t, n, r, i, a, o, s, c, l, u, f) {
		yt(e, t, n, r, i), (c || l || f) && (d.save(), c && d.clip(c), l && d.clip(l)), f ? (s & 3) == 3 ? (d.clip(f), u && d.clip(u), At(i, o), kt(e, a, t)) : s & oo ? (At(i, o), d.clip(f), kt(e, a, t)) : s & ao && (d.save(), d.clip(f), u && d.clip(u), At(i, o), d.restore(), kt(e, a, t)) : (At(i, o), kt(e, a, t)), (c || l || f) && d.restore();
	}
	function kt(e, t, n) {
		n > 0 && (t instanceof Map ? t.forEach((e, t) => {
			d.strokeStyle = ut = t, d.stroke(e);
		}) : t != null && e && d.stroke(t));
	}
	function At(e, t) {
		t instanceof Map ? t.forEach((e, t) => {
			d.fillStyle = dt = t, d.fill(e);
		}) : t != null && e && d.fill(t);
	}
	function jt(e, t, n, i) {
		let a = y[e], o;
		if (i <= 0) o = [0, 0];
		else {
			let s = a._space = a.space(r, e, t, n, i);
			o = Qo(t, n, a._incrs = a.incrs(r, e, t, n, i, s), i, s);
		}
		return a._found = o;
	}
	function Mt(e, t, n, r, i, a, o, s, c, l) {
		let u = o % 2 / 2;
		h == 1 && d.translate(u, u), yt(s, o, c, l, s), d.beginPath();
		let f, p, m, g, _ = i + (r == 0 || r == 3 ? -a : a);
		n == 0 ? (p = i, g = _) : (f = i, m = _);
		for (let r = 0; r < e.length; r++) t[r] != null && (n == 0 ? f = m = e[r] : p = g = e[r], d.moveTo(f, p), d.lineTo(m, g));
		d.stroke(), h == 1 && d.translate(-u, -u);
	}
	function Nt(e) {
		let t = !0;
		return y.forEach((n, i) => {
			if (!n.show) return;
			let a = b[n.scale];
			if (a.min == null) {
				n._show && (t = !1, n._show = !1, It(!1));
				return;
			}
			n._show || (t = !1, n._show = !0, It(!1));
			let o = n.side, s = o % 2, { min: c, max: l } = a, [u, d] = jt(i, c, l, s == 0 ? H : U);
			if (d == 0) return;
			let f = a.distr == 2, p = n._splits = n.splits(r, i, c, l, u, d, f), m = a.distr == 2 ? p.map((e) => ot[e]) : p, h = a.distr == 2 ? ot[p[1]] - ot[p[0]] : u, g = n._values = n.values(r, n.filter(r, m, i, d, h), i, d, h);
			n._rotate = o == 2 ? n.rotate(r, g, i, d) : 0;
			let _ = n._size;
			n._size = Or(n.size(r, g, i, e)), _ != null && n._size != _ && (t = !1);
		}), t;
	}
	function Pt(e) {
		let t = !0;
		return et.forEach((n, i) => {
			let a = n(r, i, Ze, e);
			a != tt[i] && (t = !1), tt[i] = a;
		}), t;
	}
	function Ft() {
		for (let e = 0; e < y.length; e++) {
			let t = y[e];
			if (!t.show || !t._show) continue;
			let n = t.side, i = n % 2, a, o, c = t.stroke(r, e), l = n == 0 || n == 3 ? -1 : 1, [u, f] = t._found;
			if (t.label != null) {
				let s = t.labelGap * l, p = Dr((t._lpos + s) * X);
				bt(t.labelFont[0], c, "center", n == 2 ? Sn : Cn), d.save(), i == 1 ? (a = o = 0, d.translate(p, Dr(Ee + Oe / 2)), d.rotate((n == 3 ? -wr : wr) / 2)) : (a = Dr(Te + De / 2), o = p);
				let m = Br(t.label) ? t.label(r, e, u, f) : t.label;
				d.fillText(m, a, o), d.restore();
			}
			if (f == 0) continue;
			let p = b[t.scale], m = i == 0 ? De : Oe, h = i == 0 ? Te : Ee, _ = t._splits, v = p.distr == 2 ? _.map((e) => ot[e]) : _, x = p.distr == 2 ? ot[_[1]] - ot[_[0]] : u, S = t.ticks, C = t.border, w = S.show ? S.size : 0, T = Dr(w * X), E = Dr((t.alignTo == 2 ? t._size - w - t.gap : t.gap) * X), D = t._rotate * -wr / 180, O = g(t._pos * X), ee = O + (T + E) * l;
			o = i == 0 ? ee : 0, a = i == 1 ? ee : 0;
			let te = t.font[0];
			bt(te, c, t.align == 1 ? wn : t.align == 2 ? Tn : D > 0 ? wn : D < 0 ? Tn : i == 0 ? "center" : n == 3 ? Tn : wn, D || i == 1 ? "middle" : n == 2 ? Sn : Cn);
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
			S.show && Mt(A, S.filter(r, v, e, f, x), i, n, O, T, Qr(S.width * X, 3), S.stroke(r, e), S.dash, S.cap);
			let j = t.grid;
			j.show && Mt(A, j.filter(r, v, e, f, x), i, i == 0 ? 2 : 1, i == 0 ? Ee : Te, i == 0 ? Oe : De, Qr(j.width * X, 3), j.stroke(r, e), j.dash, j.cap), C.show && Mt([O], [1], +(i == 0), i == 0 ? 1 : 2, i == 1 ? Ee : Te, i == 1 ? Oe : De, Qr(C.width * X, 3), C.stroke(r, e), C.dash, C.cap);
		}
		Ei("drawAxes");
	}
	function It(e) {
		v.forEach((t, n) => {
			n > 0 && (t._paths = null, e && (i == 1 ? (t.min = null, t.max = null) : t.facets.forEach((e) => {
				e.min = null, e.max = null;
			})));
		});
	}
	let Lt = !1, Rt = !1, zt = [];
	function Bt() {
		Rt = !1;
		for (let e = 0; e < zt.length; e++) Ei(...zt[e]);
		zt.length = 0;
	}
	function Vt() {
		Lt ||= (bi(J), !0);
	}
	function Ht(e, t = !1) {
		Lt = !0, Rt = t, e(r), J(), t && zt.length > 0 && queueMicrotask(Bt);
	}
	r.batch = Ht;
	function J() {
		if (ke &&= (St(), !1), je &&= (Le(), !1), Ae) {
			if (Z(p, wn, ye), Z(p, Sn, be), Z(p, bn, H), Z(p, xn, U), Z(m, wn, ye), Z(m, Sn, be), Z(m, bn, H), Z(m, xn, U), Z(f, bn, V), Z(f, xn, ve), u.width = Dr(V * X), u.height = Dr(ve * X), y.forEach(({ _el: e, _show: t, _size: n, _pos: r, side: i }) => {
				if (e != null) {
					if (t) {
						let t = i === 3 || i === 0 ? n : 0, a = i % 2 == 1;
						Z(e, a ? "left" : "top", r - t), Z(e, a ? "width" : "height", n), Z(e, a ? "top" : "left", a ? be : ye), Z(e, a ? "height" : "width", a ? U : H), Kn(e, cn);
					} else Gn(e, cn);
				}
			}), ut = dt = ft = mt = ht = K = gt = _t = pt = null, vt = 1, Xr(!0), ye != xe || be != Se || H != Ce || U != we) {
				It(!1);
				let e = H / Ce, t = U / we;
				if (I && !Me && P.left >= 0) {
					P.left *= e, P.top *= t, Kt && Xn(Kt, Dr(P.left), 0, H, U), qt && Xn(qt, 0, Dr(P.top), H, U);
					for (let n = 0; n < W.length; n++) {
						let r = W[n];
						r != null && (Ke[n] *= e, qe[n] *= t, Xn(r, Or(Ke[n]), Or(qe[n]), H, U));
					}
				}
				if (Un.show && !Ne && Un.left >= 0 && Un.width > 0) {
					Un.left *= e, Un.width *= e, Un.top *= t, Un.height *= t;
					for (let e in oi) Z(Wn, e, Un[e]);
				}
				xe = ye, Se = be, Ce = H, we = U;
			}
			Ei("setSize"), Ae = !1;
		}
		V > 0 && ve > 0 && (d.clearRect(0, 0, u.width, u.height), Ei("drawClear"), w.forEach((e) => e()), Ei("draw")), Un.show && Ne && (Yn(Un), Ne = !1), I && Me && (qr(null, !0, !1), Me = !1), N.show && N.live && Pe && (Vr(), Pe = !1), c || (c = !0, r.status = 1, Ei("ready")), st = !1, Lt = !1;
	}
	r.redraw = (e, t) => {
		je = t || !1, e === !1 ? Vt() : $n(S, D.min, D.max);
	};
	function Ut(e, n) {
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
			e == S && i.distr == 2 && nt > 0 && (n.min = ar(n.min, t[0]), n.max = ar(n.max, t[0]), n.min == n.max && n.max++), k[e] = n, ke = !0, Vt();
		}
	}
	r.setScale = Ut;
	let Wt, Gt, Kt, qt, Jt, Yt, Xt, Zt, Qt, $t, En, Pn, Fn = !1, In = P.drag, zn = In.x, Hn = In.y;
	I && (P.x && (Wt = Jn(un, m)), P.y && (Gt = Jn(dn, m)), D.ori == 0 ? (Kt = Wt, qt = Gt) : (Kt = Gt, qt = Wt), En = P.left, Pn = P.top);
	let Un = r.select = mi({
		show: !0,
		over: !0,
		left: 0,
		width: 0,
		top: 0,
		height: 0
	}, e.select), Wn = Un.show ? Jn(ln, Un.over ? m : p) : null;
	function Yn(e, t) {
		if (Un.show) {
			for (let t in e) Un[t] = e[t], t in oi && Z(Wn, t, e[t]);
			t !== !1 && Ei("setSelect");
		}
	}
	r.setSelect = Yn;
	function Zn(e) {
		if (v[e].show) F && Kn(se[e], cn);
		else if (F && Gn(se[e], cn), I) {
			let t = Ge ? W[0] : W[e];
			t != null && Xn(t, -10, -10, H, U);
		}
	}
	function $n(e, t, n) {
		Ut(e, {
			min: t,
			max: n
		});
	}
	function tr(e, t, n, a) {
		t.focus != null && br(e), t.show != null && v.forEach((n, r) => {
			r > 0 && (e == r || e == null) && (n.show = t.show, Zn(r), i == 2 ? ($n(n.facets[0].scale, null, null), $n(n.facets[1].scale, null, null)) : $n(n.scale, null, null), Vt());
		}), n !== !1 && Ei("setSeries", e, t), a && ji("setSeries", r, e, t);
	}
	r.setSeries = tr;
	function nr(e, t) {
		mi(x[e], t);
	}
	function or(e, t) {
		e.fill = $(e.fill || null), e.dir = Q(e.dir, -1), t ??= x.length, x.splice(t, 0, e);
	}
	function sr(e) {
		e == null ? x.length = 0 : x.splice(e, 1);
	}
	r.addBand = or, r.setBand = nr, r.delBand = sr;
	function cr(e, t) {
		v[e].alpha = t, I && W[e] != null && (W[e].style.opacity = t), F && se[e] && (se[e].style.opacity = t);
	}
	let lr, ur, gr, _r = { focus: !0 };
	function br(e) {
		if (e != gr) {
			let t = e == null, n = Ue.alpha != 1;
			v.forEach((r, a) => {
				if (i == 1 || a > 0) {
					let i = t || a == 0 || a == e;
					r._focus = t ? null : i, n && cr(a, i ? 1 : Ue.alpha);
				}
			}), gr = e, n && Vt();
		}
	}
	F && We && ge(Mn, z, (e) => {
		P._lock || (Ve(e), gr != null && tr(null, _r, !0, Oi.setSeries));
	});
	function xr(e, t, n) {
		let r = b[t];
		n && (e = e / X - (r.ori == 1 ? be : ye));
		let i = H;
		r.ori == 1 && (i = U, e = i - e), r.dir == -1 && (e = i - e);
		let a = r._min, o = r._max, s = e / i, c = a + (o - a) * s, l = r.distr;
		return l == 3 ? jr(10, c) : l == 4 ? Fr(c, r.asinh) : l == 100 ? r.bwd(c) : c;
	}
	function Sr(e, n) {
		return ar(xr(e, S, n), t[0], rt, it);
	}
	r.valToIdx = (e) => ar(e, t[0]), r.posToIdx = Sr, r.posToVal = xr, r.valToPos = (e, t, n) => b[t].ori == 0 ? a(e, b[t], n ? De : H, n ? Te : 0) : o(e, b[t], n ? Oe : U, n ? Ee : 0), r.setCursor = (e, t, n) => {
		En = e.left, Pn = e.top, qr(null, t, n);
	};
	function Cr(e, t) {
		Z(Wn, wn, Un.left = e), Z(Wn, bn, Un.width = t);
	}
	function Er(e, t) {
		Z(Wn, Sn, Un.top = e), Z(Wn, xn, Un.height = t);
	}
	let Mr = D.ori == 0 ? Cr : Er, Pr = D.ori == 1 ? Cr : Er;
	function Rr() {
		if (F && N.live) for (let e = +(i == 2); e < v.length; e++) {
			if (e == 0 && ue) continue;
			let t = N.values[e], n = 0;
			for (let r in t) ce[e][n++].firstChild.nodeValue = t[r];
		}
	}
	function Vr(e, t) {
		if (e != null && (e.idxs ? e.idxs.forEach((e, t) => {
			ie[t] = e;
		}) : si(e.idx) || ie.fill(e.idx), N.idx = ie[0]), F && N.live) {
			for (let e = 0; e < v.length; e++) (e > 0 || i == 1 && !ue) && Hr(e, ie[e]);
			Rr();
		}
		Pe = !1, t !== !1 && Ei("setLegend");
	}
	r.setLegend = Vr;
	function Hr(e, n) {
		let i = v[e], a = e == 0 && O == 2 ? ot : t[e], o;
		ue ? o = i.values(r, e, n) ?? de : (o = i.value(r, n == null ? null : a[n], e, n), o = o == null ? de : { _: o }), N.values[e] = o;
	}
	function qr(e, n, a) {
		Qt = En, $t = Pn, [En, Pn] = P.move(r, En, Pn), P.left = En, P.top = Pn, I && (Kt && Xn(Kt, Dr(En), 0, H, U), qt && Xn(qt, 0, Dr(Pn), H, U));
		let o, s = rt > it;
		lr = Lr, ur = null;
		let c = D.ori == 0 ? H : U, l = D.ori == 1 ? H : U;
		if (En < 0 || nt == 0 || s) {
			o = P.idx = null;
			for (let e = 0; e < v.length; e++) {
				let t = W[e];
				t != null && Xn(t, -10, -10, H, U);
			}
			We && tr(null, _r, !0, e == null && Oi.setSeries), N.live && (ie.fill(o), Pe = !0);
		} else {
			let e, n, a;
			i == 1 && (e = D.ori == 0 ? En : Pn, n = xr(e, S), o = P.idx = ar(n, t[0], rt, it), a = ee(t[0][o], D, c, 0));
			let s = -10, u = -10, d = 0, f = 0, p = !0, m = "", h = "";
			for (let e = +(i == 2); e < v.length; e++) {
				let g = v[e], _ = ie[e], y = _ == null ? null : i == 1 ? t[e][_] : t[e][1][_], x = P.dataIdx(r, e, o, n), S = x == null ? null : i == 1 ? t[e][x] : t[e][1][x];
				if (Pe = Pe || S != y || x != _, ie[e] = x, e > 0 && g.show) {
					let n = x == null ? -10 : x == o ? a : ee(i == 1 ? t[0][x] : t[e][0][x], D, c, 0), _ = S == null ? -10 : te(S, i == 1 ? b[g.scale] : b[g.facets[1].scale], l, 0);
					if (We && S != null) {
						let t = D.ori == 1 ? En : Pn, n = Tr(Ue.dist(r, e, x, _, t));
						if (n < lr) {
							let r = Ue.bias;
							if (r != 0) {
								let i = xr(t, g.scale), a = S >= 0 ? 1 : -1, o = i >= 0 ? 1 : -1;
								o == a && (o == 1 ? r == 1 ? S >= i : S <= i : r == 1 ? S <= i : S >= i) && (lr = n, ur = e);
							} else lr = n, ur = e;
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
						if (v = He.fill(r, e), g = He.stroke(r, e), Ge) e == ur && lr <= Ue.prox && (s = c, u = l, d = a, f = o, p = y, m = v, h = g);
						else {
							let t = W[e];
							t != null && (Ke[e] = c, qe[e] = l, er(t, a, o, y), Qn(t, v, g), Xn(t, Or(c), Or(l), H, U));
						}
					}
				}
			}
			if (Ge) {
				let e = Ue.prox;
				if (Pe || (gr == null ? lr <= e : lr > e || ur != gr)) {
					let e = W[0];
					e != null && (Ke[0] = s, qe[0] = u, er(e, d, f, p), Qn(e, m, h), Xn(e, Or(s), Or(u), H, U));
				}
			}
		}
		if (Un.show && Fn) {
			if (e != null) {
				let [t, n] = Oi.scales, [r, i] = Oi.match, [a, o] = e.cursor.sync.scales, s = e.cursor.drag;
				if (zn = s._x, Hn = s._y, zn || Hn) {
					let { left: s, top: u, width: d, height: f } = e.select, p = e.scales[a].ori, m = e.posToVal, h, g, _, v, y, x = t != null && r(t, a), S = n != null && i(n, o);
					x && zn ? (p == 0 ? (h = s, g = d) : (h = u, g = f), _ = b[t], v = ee(m(h, a), _, c, 0), y = ee(m(h + g, a), _, c, 0), Mr(kr(v, y), Tr(y - v))) : Mr(0, c), S && Hn ? (p == 1 ? (h = s, g = d) : (h = u, g = f), _ = b[n], v = te(m(h, o), _, l, 0), y = te(m(h + g, o), _, l, 0), Pr(kr(v, y), Tr(y - v))) : Pr(0, l);
				} else di();
			} else {
				let e = Tr(Qt - Jt), t = Tr($t - Yt);
				if (D.ori == 1) {
					let n = e;
					e = t, t = n;
				}
				zn = In.x && e >= In.dist, Hn = In.y && t >= In.dist;
				let n = In.uni;
				n == null ? In.x && In.y && (zn || Hn) && (zn = Hn = !0) : zn && Hn && (zn = e >= n, Hn = t >= n, !zn && !Hn && (t > e ? Hn = !0 : zn = !0));
				let r, i;
				zn && (D.ori == 0 ? (r = Xt, i = En) : (r = Zt, i = Pn), Mr(kr(r, i), Tr(i - r)), Hn || Pr(0, l)), Hn && (D.ori == 1 ? (r = Xt, i = En) : (r = Zt, i = Pn), Pr(kr(r, i), Tr(i - r)), zn || Mr(0, c)), !zn && !Hn && (Mr(0, 0), Pr(0, 0));
			}
		}
		if (In._x = zn, In._y = Hn, e == null) {
			if (a) {
				if (ki != null) {
					let [e, t] = Oi.scales;
					Oi.values[0] = e == null ? null : xr(D.ori == 0 ? En : Pn, e), Oi.values[1] = t == null ? null : xr(D.ori == 1 ? En : Pn, t);
				}
				ji(On, r, En, Pn, H, U, o);
			}
			if (We) {
				let e = a && Oi.setSeries, t = Ue.prox;
				gr == null ? lr <= t && tr(ur, _r, !0, e) : lr > t ? tr(null, _r, !0, e) : ur != gr && tr(ur, _r, !0, e);
			}
		}
		Pe && (N.idx = o, Vr()), n !== !1 && Ei("setCursor");
	}
	let Jr = null;
	Object.defineProperty(r, "rect", { get() {
		return Jr ?? Xr(!1), Jr;
	} });
	function Xr(e = !1) {
		e ? Jr = null : (Jr = m.getBoundingClientRect(), Ei("syncRect", Jr));
	}
	function Zr(e, t, n, r, i, a, o) {
		P._lock || Fn && e != null && e.movementX == 0 && e.movementY == 0 || (ti(e, t, n, r, i, a, o, !1, e != null), e == null ? qr(t, !0, !1) : qr(null, !0, !0));
	}
	function ti(e, t, n, i, a, o, c, l, u) {
		if (Jr ?? Xr(!1), Ve(e), e != null) n = e.clientX - Jr.left, i = e.clientY - Jr.top;
		else {
			if (n < 0 || i < 0) {
				En = -10, Pn = -10;
				return;
			}
			let [e, r] = Oi.scales, c = t.cursor.sync, [l, u] = c.values, [d, f] = c.scales, [p, m] = Oi.match, h = t.axes[0].side % 2 == 1, g = D.ori == 0 ? H : U, _ = D.ori == 1 ? H : U, v = h ? o : a, y = h ? a : o, x = h ? i : n, S = h ? n : i;
			if (n = d == null ? x / v * g : p(e, d) ? s(l, b[e], g, 0) : -10, i = f == null ? S / y * _ : m(r, f) ? s(u, b[r], _, 0) : -10, D.ori == 1) {
				let e = n;
				n = i, i = e;
			}
		}
		u && (t == null || t.cursor.event.type == On) && ((n <= 1 || n >= H - 1) && (n = Yr(n, H)), (i <= 1 || i >= U - 1) && (i = Yr(i, U))), l ? (Jt = n, Yt = i, [Xt, Zt] = P.move(r, n, i)) : (En = n, Pn = i);
	}
	let oi = {
		width: 0,
		height: 0,
		left: 0,
		top: 0
	};
	function di() {
		Yn(oi, !1);
	}
	let fi, hi, gi, _i;
	function vi(e, t, n, i, a, o, s) {
		Fn = !0, zn = Hn = In._x = In._y = !1, ti(e, t, n, i, a, o, s, !0, !1), e != null && (ge(An, Bn, yi, !1), ji(kn, r, Xt, Zt, H, U, null));
		let { left: c, top: l, width: u, height: d } = Un;
		fi = c, hi = l, gi = u, _i = d;
	}
	function yi(e, t, n, i, a, o, s) {
		Fn = In._x = In._y = !1, ti(e, t, n, i, a, o, s, !1, !0);
		let { left: c, top: l, width: u, height: d } = Un, f = u > 0 || d > 0, p = fi != c || hi != l || gi != u || _i != d;
		if (f && p && Yn(Un), In.setScale && f && p) {
			let e = c, t = u, n = l, r = d;
			if (D.ori == 1 && (e = l, t = d, n = c, r = u), zn && $n(S, xr(e, S), xr(e + t, S)), Hn) for (let e in b) {
				let t = b[e];
				e != S && t.from == null && t.min != Lr && $n(e, xr(n + r, e), xr(n, e));
			}
			di();
		} else P.lock && (P._lock = !P._lock, qr(t, !0, e != null));
		e != null && (_e(An, Bn), ji(An, r, En, Pn, H, U, null));
	}
	function xi(e, t, n, r, i, a, o) {
		if (P._lock) return;
		Ve(e);
		let s = Fn;
		if (Fn) {
			let e = !0, t = !0, n, r;
			D.ori == 0 ? (n = zn, r = Hn) : (n = Hn, r = zn), n && r && (e = En <= 10 || En >= H - 10, t = Pn <= 10 || Pn >= U - 10), n && e && (En = En < Xt ? 0 : H), r && t && (Pn = Pn < Zt ? 0 : U), qr(null, !0, !0), Fn = !1;
		}
		En = -10, Pn = -10, ie.fill(null), qr(null, !0, !0), s && (Fn = s);
	}
	function Si(e, t, n, i, a, o, s) {
		P._lock || (Ve(e), lt(), di(), e != null && ji(Nn, r, En, Pn, H, U, null));
	}
	function Ci() {
		y.forEach(es), Fe(r.width, r.height, !0);
	}
	rr(Ln, Vn, Ci);
	let wi = {};
	wi.mousedown = vi, wi.mousemove = Zr, wi.mouseup = yi, wi.dblclick = Si, wi.setSeries = (e, t, n, i) => {
		let a = Oi.match[2];
		n = a(r, t, n), n != -1 && tr(n, i, !0, !1);
	}, I && (ge(kn, m, vi), ge(On, m, Zr), ge(jn, m, (e) => {
		Ve(e), Xr(!1);
	}), ge(Mn, m, xi), ge(Nn, m, Si), Ro.add(r), r.syncRect = Xr);
	let Ti = r.hooks = e.hooks || {};
	function Ei(e, t, n) {
		Rt ? zt.push([
			e,
			t,
			n
		]) : e in Ti && Ti[e].forEach((e) => {
			e.call(null, r, t, n);
		});
	}
	(e.plugins || []).forEach((e) => {
		for (let t in e.hooks) Ti[t] = (Ti[t] || []).concat(e.hooks[t]);
	});
	let Di = (e, t, n) => n, Oi = mi({
		key: null,
		setSeries: !1,
		filters: {
			pub: Gr,
			sub: Gr
		},
		scales: [S, v[1] ? v[1].scale : null],
		match: [
			Kr,
			Kr,
			Di
		],
		values: [null, null]
	}, P.sync);
	Oi.match.length == 2 && Oi.match.push(Di), P.sync = Oi;
	let ki = Oi.key, Ai = io(ki);
	function ji(e, t, n, r, i, a, o) {
		Oi.filters.pub(e, t, n, r, i, a, o) && Ai.pub(e, t, n, r, i, a, o);
	}
	Ai.sub(r);
	function Ni(e, t, n, r, i, a, o) {
		Oi.filters.sub(e, t, n, r, i, a, o) && wi[e](null, t, n, r, i, a, o);
	}
	r.pub = Ni;
	function Pi() {
		Ai.unsub(r), Ro.delete(r), B.clear(), ir(Ln, Vn, Ci), l.remove(), z?.remove(), Ei("destroy");
	}
	r.destroy = Pi;
	function Fi() {
		Ei("init", e, t), ct(t || e.data, !1), k[S] ? Ut(S, k[S]) : lt(), Ne = Un.show && (Un.width > 0 || Un.height > 0), Me = Pe = !0, Fe(e.width, e.height);
	}
	return v.forEach(Ye), y.forEach(Qe), n ? n instanceof HTMLElement ? (n.appendChild(l), Fi()) : n(r, Fi) : Fi(), r;
}
ts.assign = mi, ts.fmtNum = Sr, ts.rangeNum = vr, ts.rangeLog = fr, ts.rangeAsinh = pr, ts.orient = so, ts.pxRatio = X, ts.join = yi, ts.fmtDate = Mi, ts.tzDate = Pi, ts.sync = io;
{
	ts.addGap = po, ts.clipGaps = fo;
	let e = ts.paths = { points: Do };
	e.linear = jo, e.stepped = Mo, e.bars = Po, e.spline = Io;
}
// node_modules/uplot/dist/uPlot.min.css?inline
var ns = ".uplot,.uplot *,.uplot :before,.uplot :after{box-sizing:border-box}.uplot{width:min-content;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{-webkit-user-select:none;user-select:none;position:relative}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{width:100%;height:100%;display:block;position:relative}.u-axis{position:absolute}.u-legend{text-align:center;margin:auto;font-size:14px}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:\":\";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{pointer-events:none;background:#00000012;position:absolute}.u-cursor-x,.u-cursor-y{pointer-events:none;will-change:transform;position:absolute;top:0;left:0}.u-hz .u-cursor-x,.u-vt .u-cursor-y{border-right:1px dashed #607d8b;height:100%}.u-hz .u-cursor-y,.u-vt .u-cursor-x{border-bottom:1px dashed #607d8b;width:100%}.u-cursor-pt{pointer-events:none;will-change:transform;border:0 solid;border-radius:50%;position:absolute;top:0;left:0;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}";
// src/canvas.ts
function rs() {
	try {
		return document.createElement("canvas").getContext("2d") !== null;
	} catch {
		return !1;
	}
}
// src/chart-data.ts
function is(e) {
	return {
		time: e.map((e) => e.t / 60),
		height: e.map((e) => e.height),
		speedKmh: e.map((e) => e.speed * 3.6),
		voltage: e.map((e) => e.voltage > 0 ? e.voltage : null),
		current: e.map((e) => e.voltage > 0 ? e.current : null),
		charge: e.map((e) => e.charge)
	};
}
function as(e, t) {
	return e.some((e) => typeof e[t] == "number");
}
var os = (e) => typeof e == "number" ? e : null, ss = (e) => typeof e == "number" ? Math.min(100, Math.max(0, e)) : null;
function cs(e) {
	return {
		time: e.map((e) => e.t / 60),
		cellDevMv: e.map((e) => typeof e.cell_dev == "number" ? e.cell_dev * 1e3 : null),
		temp: e.map((e) => os(e.temp)),
		pitch: e.map((e) => os(e.pitch)),
		roll: e.map((e) => os(e.roll))
	};
}
function ls(e) {
	return {
		time: e.map((e) => e.t / 60),
		dl: e.map((e) => ss(e.dl)),
		ul: e.map((e) => ss(e.ul))
	};
}
function us(e) {
	let t = e.filter((e) => typeof e.dl == "number" && typeof e.dist == "number").map((e) => [e.dist, Math.min(100, Math.max(0, e.dl))]).sort((e, t) => e[0] - t[0]);
	return {
		dist: t.map((e) => e[0]),
		dl: t.map((e) => e[1])
	};
}
function ds(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e) r.voltage > 0 && r.charge > 0 && !t.has(r.charge) && (t.add(r.charge), n.push([r.charge, r.voltage]));
	return n.sort((e, t) => e[0] - t[0]), {
		charge: n.map((e) => e[0]),
		voltage: n.map((e) => e[1])
	};
}
function fs(e) {
	return {
		cell: as(e, "cell_dev"),
		temp: as(e, "temp"),
		attitude: as(e, "pitch"),
		signal: as(e, "dl"),
		distance: e.some((e) => typeof e.dl == "number" && typeof e.dist == "number"),
		discharge: ds(e).charge.length >= 10
	};
}
function ps(e) {
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
// src/flight-charts.ts
var ms = 200;
function hs(e) {
	if (e.length < 2) return [];
	let t = fs(e), n = ["motion", "power"];
	return t.cell && n.push("cell"), t.temp && n.push("temp"), t.attitude && n.push("attitude"), t.discharge && n.push("discharge"), t.signal && n.push("signal"), t.distance && n.push("distance"), n;
}
function gs(e) {
	return { hooks: { draw: [(t) => {
		let { ctx: n, bbox: r } = t;
		n.save(), n.lineWidth = 1.5 * devicePixelRatio, n.setLineDash([4 * devicePixelRatio, 3 * devicePixelRatio]);
		for (let i of e) {
			let e = t.valToPos(i.t / 60, "x", !0);
			!Number.isFinite(e) || e < r.left || e > r.left + r.width || (n.strokeStyle = $e(i.kind).color, n.beginPath(), n.moveTo(e, r.top), n.lineTo(e, r.top + r.height), n.stroke());
		}
		n.restore();
	}] } };
}
var _s = class extends Me {
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
			m(ns),
			Zt,
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
		let e = _t(this.modeSegments, this.lang);
		return e.segments.length === 0 ? V : B`<div class="card modes" id="modes">
      <h3>${G("flight_mode", this.lang)}</h3>
      <div class="band" role="img" aria-label=${e.legend.map((e) => `${e.label} ${Re(e.seconds)}`).join(", ")}>
        ${e.segments.map((e) => B`<span style="flex:${e.share};background:${e.color}" title="${e.label}"></span>`)}
      </div>
      <div class="legend">${e.legend.map((e) => B`<span><i style="background:${e.color}"></i>${e.label} <span class="muted">${Re(e.seconds)}</span></span>`)}</div>
    </div>`;
	}
	render() {
		return this.points.length < 2 ? B`<p class="muted">${G("no_history", this.lang)}</p>` : B`${this.renderModeBand()}<div class="charts">
      ${hs(this.points).map((e) => B`<div class="card"><h3>${this.chartTitle(e)}</h3><div class="chart" id=${e}></div></div>`)}
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
		}), c = this.events.length > 0 ? [gs(this.events)] : [], l = {
			width: i,
			height: ms,
			legend: { show: !0 }
		};
		switch (e) {
			case "motion": {
				let e = is(this.points);
				return new ts({
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
				let e = is(this.points);
				return new ts({
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
				let e = cs(this.points), r = e.time.map(() => 20);
				return new ts({
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
				let e = cs(this.points);
				return new ts({
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
				let e = cs(this.points);
				return new ts({
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
				let e = ds(this.points);
				return new ts({
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
				let e = ls(this.points), i = e.time.map(() => 30);
				return new ts({
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
				let e = us(this.points);
				return new ts({
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
		if (this.destroyPlots(), this.points.length < 2 || !rs()) return;
		let e = ps(this.dark);
		try {
			for (let t of hs(this.points)) {
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
				height: ms
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
customElements.define("dl-flight-charts", _s);
// node_modules/leaflet/dist/leaflet.css?inline
var vs = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t, n) => {
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
		var fe = document.documentElement.style, pe = "ActiveXObject" in window, me = pe && !document.addEventListener, he = "msLaunchUri" in navigator && !("documentMode" in document), B = Ge("webkit"), ge = Ge("android"), _e = Ge("android 2") || Ge("android 3"), V = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), ve = ge && Ge("Google") && V < 537 && !("AudioNode" in window), H = !!window.opera, U = !he && Ge("chrome"), ye = Ge("gecko") && !B && !H && !pe, be = !U && Ge("safari"), xe = Ge("phantom"), Se = "OTransition" in fe, Ce = navigator.platform.indexOf("Win") === 0, we = pe && "transition" in fe, Te = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !_e, Ee = "MozPerspective" in fe, De = !window.L_DISABLE_3D && (we || Te || Ee) && !Se && !xe, Oe = typeof orientation < "u" || Ge("mobile"), ke = Oe && B, Ae = Oe && Te, je = !window.PointerEvent && window.MSPointerEvent, Me = !!(window.PointerEvent || je), Ne = "ontouchstart" in window || !!window.TouchEvent, Pe = !window.L_NO_TOUCH && (Ne || Me), Fe = Oe && H, Ie = Oe && ye, Le = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Re = function() {
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
			edge: he,
			webkit: B,
			android: ge,
			android23: _e,
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
		}, Ke = W.msPointer ? "MSPointerDown" : "pointerdown", qe = W.msPointer ? "MSPointerMove" : "pointermove", Je = W.msPointer ? "MSPointerUp" : "pointerup", Ye = W.msPointer ? "MSPointerCancel" : "pointercancel", G = {
			touchstart: Ke,
			touchmove: qe,
			touchend: Je,
			touchcancel: Ye
		}, Xe = {
			touchstart: ot,
			touchmove: at,
			touchend: at,
			touchcancel: at
		}, Ze = {}, Qe = !1;
		function $e(e, t, n) {
			return t === "touchstart" && it(), Xe[t] ? (n = Xe[t].bind(this, n), e.addEventListener(G[t], n, !1), n) : (console.warn("wrong event specified:", t), l);
		}
		function et(e, t, n) {
			G[t] ? e.removeEventListener(G[t], n, !1) : console.warn("wrong event specified:", t);
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
			Qe ||= (document.addEventListener(Ke, tt, !0), document.addEventListener(qe, nt, !0), document.addEventListener(Je, rt, !0), document.addEventListener(Ye, rt, !0), !0);
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
				t ||= window.event, an(e, t) && s(t);
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
		function rn(e) {
			return W.edge ? e.wheelDeltaY / 2 : e.deltaY && e.deltaMode === 0 ? -e.deltaY / nn : e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : e.deltaX || e.deltaZ ? 0 : e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : e.detail ? e.detail / -32765 * 60 : 0;
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
		}), Y = k.extend({
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
				if (this._panAnim || (this._panAnim = new sn(), this._panAnim.on({
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
				return q(t, "leaflet-control"), n.indexOf("bottom") === -1 ? r.appendChild(t) : r.insertBefore(t, r.firstChild), this._map.on("unload", this.remove, this), this;
			},
			remove: function() {
				return this._map &&= (gt(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), null), this;
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
		var dn = ln.extend({
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
		}), fn = function(e, t, n) {
			return new dn(e, t, n);
		}, pn = ln.extend({
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
		Y.mergeOptions({ zoomControl: !0 }), Y.addInitHook(function() {
			this.options.zoomControl && (this.zoomControl = new pn(), this.addControl(this.zoomControl));
		});
		var mn = function(e) {
			return new pn(e);
		}, hn = ln.extend({
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
		}), gn = function(e) {
			return new hn(e);
		}, _n = ln.extend({
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
		Y.mergeOptions({ attributionControl: !0 }), Y.addInitHook(function() {
			this.options.attributionControl && new _n().addTo(this);
		}), ln.Layers = dn, ln.Zoom = pn, ln.Scale = hn, ln.Attribution = _n, un.layers = fn, un.zoom = mn, un.scale = gn, un.attribution = function(e) {
			return new _n(e);
		};
		var vn = O.extend({
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
		vn.addTo = function(e, t) {
			return e.addHandler(t, this), this;
		};
		var yn = { Events: te }, bn = W.touch ? "touchstart mousedown" : "mousedown", xn = k.extend({
			options: { clickTolerance: 3 },
			initialize: function(e, t, n, r) {
				p(this, r), this._element = e, this._dragStartTarget = t || e, this._preventOutline = n;
			},
			enable: function() {
				this._enabled ||= (J(this._dragStartTarget, bn, this._onDown, this), !0);
			},
			disable: function() {
				this._enabled && (xn._dragging === this && this.finishDrag(!0), Wt(this._dragStartTarget, bn, this._onDown, this), this._enabled = !1, this._moved = !1);
			},
			_onDown: function(e) {
				if (this._enabled && (this._moved = !1, !bt(this._element, "leaflet-zoom-anim"))) {
					if (e.touches && e.touches.length !== 1) xn._dragging === this && this.finishDrag();
					else if (!(xn._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) && (xn._dragging = this, this._preventOutline && Rt(this._element), Pt(), At(), !this._moving)) {
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
				this._moving = !1, xn._dragging = !1, t && this.fire("dragend", {
					noInertia: e,
					distance: this._newPos.distanceTo(this._startPos)
				});
			}
		});
		function Sn(e, t, n) {
			for (var r, i = [
				1,
				4,
				2,
				8
			], a = 0, o, s, c, l, u = e.length, d, f; a < u; a++) e[a]._code = Fn(e[a], t);
			for (s = 0; s < 4; s++) {
				for (d = i[s], r = [], a = 0, u = e.length, o = u - 1; a < u; o = a++) c = e[a], l = e[o], c._code & d ? l._code & d || (f = Pn(l, c, d, t, n), f._code = Fn(f, t), r.push(f)) : (l._code & d && (f = Pn(l, c, d, t, n), f._code = Fn(f, t), r.push(f)), r.push(c));
				e = r;
			}
			return e;
		}
		function Cn(e, t) {
			var n, r, i, a, o, s, c, l, u;
			if (!e || e.length === 0) throw Error("latlngs not passed");
			Rn(e) || (console.warn("latlngs are not flat! Only the first ring will be used"), e = e[0]);
			var d = F([0, 0]), f = N(e);
			f.getNorthWest().distanceTo(f.getSouthWest()) * f.getNorthEast().distanceTo(f.getNorthWest()) < 1700 && (d = wn(e));
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
		function wn(e) {
			for (var t = 0, n = 0, r = 0, i = 0; i < e.length; i++) {
				var a = F(e[i]);
				t += a.lat, n += a.lng, r++;
			}
			return F([t / r, n / r]);
		}
		var Tn = {
			__proto__: null,
			clipPolygon: Sn,
			polygonCenter: Cn,
			centroid: wn
		};
		function En(e, t) {
			if (!t || !e.length) return e.slice();
			var n = t * t;
			return e = jn(e, n), e = kn(e, n), e;
		}
		function Dn(e, t, n) {
			return Math.sqrt(Ln(e, t, n, !0));
		}
		function On(e, t, n) {
			return Ln(e, t, n);
		}
		function kn(e, t) {
			var n = e.length, r = new (typeof Uint8Array < "u" ? Uint8Array : Array)(n);
			r[0] = r[n - 1] = 1, An(e, r, t, 0, n - 1);
			var i, a = [];
			for (i = 0; i < n; i++) r[i] && a.push(e[i]);
			return a;
		}
		function An(e, t, n, r, i) {
			for (var a = 0, o, s = r + 1, c; s <= i - 1; s++) c = Ln(e[s], e[r], e[i], !0), c > a && (o = s, a = c);
			a > n && (t[o] = 1, An(e, t, n, r, o), An(e, t, n, o, i));
		}
		function jn(e, t) {
			for (var n = [e[0]], r = 1, i = 0, a = e.length; r < a; r++) In(e[r], e[i]) > t && (n.push(e[r]), i = r);
			return i < a - 1 && n.push(e[a - 1]), n;
		}
		var Mn;
		function Nn(e, t, n, r, i) {
			var a = r ? Mn : Fn(e, n), o = Fn(t, n), s, c, l;
			for (Mn = o;;) {
				if (!(a | o)) return [e, t];
				if (a & o) return !1;
				s = a || o, c = Pn(e, t, s, n, i), l = Fn(c, n), s === a ? (e = c, a = l) : (t = c, o = l);
			}
		}
		function Pn(e, t, n, r, i) {
			var a = t.x - e.x, o = t.y - e.y, s = r.min, c = r.max, l, u;
			return n & 8 ? (l = e.x + a * (c.y - e.y) / o, u = c.y) : n & 4 ? (l = e.x + a * (s.y - e.y) / o, u = s.y) : n & 2 ? (l = c.x, u = e.y + o * (c.x - e.x) / a) : n & 1 && (l = s.x, u = e.y + o * (s.x - e.x) / a), new A(l, u, i);
		}
		function Fn(e, t) {
			var n = 0;
			return e.x < t.min.x ? n |= 1 : e.x > t.max.x && (n |= 2), e.y < t.min.y ? n |= 4 : e.y > t.max.y && (n |= 8), n;
		}
		function In(e, t) {
			var n = t.x - e.x, r = t.y - e.y;
			return n * n + r * r;
		}
		function Ln(e, t, n, r) {
			var i = t.x, a = t.y, o = n.x - i, s = n.y - a, c = o * o + s * s, l;
			return c > 0 && (l = ((e.x - i) * o + (e.y - a) * s) / c, l > 1 ? (i = n.x, a = n.y) : l > 0 && (i += o * l, a += s * l)), o = e.x - i, s = e.y - a, r ? o * o + s * s : new A(i, a);
		}
		function Rn(e) {
			return !_(e[0]) || typeof e[0][0] != "object" && e[0][0] !== void 0;
		}
		function zn(e) {
			return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), Rn(e);
		}
		function Bn(e, t) {
			var n, r, i, a, o, s, c, l;
			if (!e || e.length === 0) throw Error("latlngs not passed");
			Rn(e) || (console.warn("latlngs are not flat! Only the first ring will be used"), e = e[0]);
			var u = F([0, 0]), d = N(e);
			d.getNorthWest().distanceTo(d.getSouthWest()) * d.getNorthEast().distanceTo(d.getNorthWest()) < 1700 && (u = wn(e));
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
		var Vn = {
			__proto__: null,
			simplify: En,
			pointToSegmentDistance: Dn,
			closestPointOnSegment: On,
			clipSegment: Nn,
			_getEdgeIntersection: Pn,
			_getBitCode: Fn,
			_sqClosestPointOnSegment: Ln,
			isFlat: Rn,
			_flat: zn,
			polylineCenter: Bn
		}, Hn = {
			project: function(e) {
				return new A(e.lng, e.lat);
			},
			unproject: function(e) {
				return new P(e.y, e.x);
			},
			bounds: new M([-180, -90], [180, 90])
		}, X = {
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
		}, Un = {
			__proto__: null,
			LonLat: Hn,
			Mercator: X,
			SphericalMercator: ae
		}, Wn = n({}, R, {
			code: "EPSG:3395",
			projection: X,
			transformation: function() {
				var e = .5 / (Math.PI * X.R);
				return se(e, .5, -e, .5);
			}()
		}), Gn = n({}, R, {
			code: "EPSG:4326",
			projection: Hn,
			transformation: se(1 / 180, 1, -1 / 180, .5)
		}), Kn = n({}, I, {
			projection: Hn,
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
		I.Earth = R, I.EPSG3395 = Wn, I.EPSG3857 = ce, I.EPSG900913 = le, I.EPSG4326 = Gn, I.Simple = Kn;
		var Z = k.extend({
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
		var qn = Z.extend({
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
		}), er = vn.extend({
			initialize: function(e) {
				this._marker = e;
			},
			addHooks: function() {
				var e = this._marker._icon;
				this._draggable ||= new xn(e, e, !0), this._draggable.on({
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
		}), tr = Z.extend({
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
		function nr(e, t) {
			return new tr(e, t);
		}
		var rr = Z.extend({
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
				for (var t = Infinity, n = null, r = Ln, i, a, o = 0, s = this._parts.length; o < s; o++) for (var c = this._parts[o], l = 1, u = c.length; l < u; l++) {
					i = c[l - 1], a = c[l];
					var d = r(e, i, a, !0);
					d < t && (t = d, n = r(e, i, a));
				}
				return n && (n.distance = Math.sqrt(t)), n;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return Bn(this._defaultShape(), this._map.options.crs);
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
				return Rn(this._latlngs) ? this._latlngs : this._latlngs[0];
			},
			_convertLatLngs: function(e) {
				for (var t = [], n = Rn(e), r = 0, i = e.length; r < i; r++) n ? (t[r] = F(e[r]), this._bounds.extend(t[r])) : t[r] = this._convertLatLngs(e[r]);
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
					else for (var t = this._parts, n = 0, r, i = 0, a = this._rings.length, o, s, c; n < a; n++) for (c = this._rings[n], r = 0, o = c.length; r < o - 1; r++) s = Nn(c[r], c[r + 1], e, r, !0), s && (t[i] = t[i] || [], t[i].push(s[0]), (s[1] !== c[r + 1] || r === o - 2) && (t[i].push(s[1]), i++));
				}
			},
			_simplifyPoints: function() {
				for (var e = this._parts, t = this.options.smoothFactor, n = 0, r = e.length; n < r; n++) e[n] = En(e[n], t);
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
				for (n = 0, a = this._parts.length; n < a; n++) for (s = this._parts[n], r = 0, o = s.length, i = o - 1; r < o; i = r++) if ((t || r !== 0) && Dn(e, s[i], s[r]) <= c) return !0;
				return !1;
			}
		});
		function lr(e, t) {
			return new cr(e, t);
		}
		cr._flat = zn;
		var ur = cr.extend({
			options: { fill: !0 },
			isEmpty: function() {
				return !this._latlngs.length || !this._latlngs[0].length;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return Cn(this._defaultShape(), this._map.options.crs);
			},
			_convertLatLngs: function(e) {
				var t = cr.prototype._convertLatLngs.call(this, e), n = t.length;
				return n >= 2 && t[0] instanceof P && t[0].equals(t[n - 1]) && t.pop(), t;
			},
			_setLatLngs: function(e) {
				cr.prototype._setLatLngs.call(this, e), Rn(this._latlngs) && (this._latlngs = [this._latlngs]);
			},
			_defaultShape: function() {
				return Rn(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
			},
			_clipPoints: function() {
				var e = this._renderer._bounds, t = this.options.weight, n = new A(t, t);
				if (e = new M(e.min.subtract(n), e.max.add(n)), this._parts = [], this._pxBounds && this._pxBounds.intersects(e)) {
					if (this.options.noClip) this._parts = this._rings;
					else for (var r = 0, i = this._rings.length, a; r < i; r++) a = Sn(this._rings[r], e, !0), a.length && this._parts.push(a);
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
			for (var i = [], a = 0, o = e.length; a < o; a++) i.push(t ? vr(e[a], Rn(e[a]) ? 0 : t - 1, n, r) : _r(e[a], r));
			return !t && n && i.length > 0 && i.push(i[0].slice()), i;
		}
		function Q(e, t) {
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
			return Q(this, {
				type: "Point",
				coordinates: _r(this.getLatLng(), e)
			});
		} };
		tr.include(br), or.include(br), ir.include(br), cr.include({ toGeoJSON: function(e) {
			var t = !Rn(this._latlngs), n = vr(this._latlngs, +!!t, !1, e);
			return Q(this, {
				type: (t ? "Multi" : "") + "LineString",
				coordinates: n
			});
		} }), ur.include({ toGeoJSON: function(e) {
			var t = !Rn(this._latlngs), n = t && !Rn(this._latlngs[0]), r = vr(this._latlngs, n ? 2 : +!!t, !0, e);
			return t || (r = [r]), Q(this, {
				type: (n ? "Multi" : "") + "Polygon",
				coordinates: r
			});
		} }), qn.include({
			toMultiPoint: function(e) {
				var t = [];
				return this.eachLayer(function(n) {
					t.push(n.toGeoJSON(e).geometry.coordinates);
				}), Q(this, {
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
				}), n ? Q(this, {
					geometries: r,
					type: "GeometryCollection"
				}) : {
					type: "FeatureCollection",
					features: r
				};
			}
		});
		function xr(e, t) {
			return new fr(e, t);
		}
		var Sr = xr, Cr = Z.extend({
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
		var kr = Z.extend({
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
		Y.include({ _initOverlay: function(e, t, n, r) {
			var i = t;
			return i instanceof e || (i = new e(r).setContent(t)), n && i.setLatLng(n), i;
		} }), Z.include({ _initOverlay: function(e, t, n, r) {
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
				kr.prototype.onAdd.call(this, e), e.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof rr || this._source.on("preclick", Yt));
			},
			onRemove: function(e) {
				kr.prototype.onRemove.call(this, e), e.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof rr || this._source.off("preclick", Yt));
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
		Y.mergeOptions({ closePopupOnClick: !0 }), Y.include({
			openPopup: function(e, t, n) {
				return this._initOverlay(Ar, e, t, n).openOn(this), this;
			},
			closePopup: function(e) {
				return e = arguments.length ? e : this._popup, e && e.close(), this;
			}
		}), Z.include({
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
		Y.include({
			openTooltip: function(e, t, n) {
				return this._initOverlay(Mr, e, t, n).openOn(this), this;
			},
			closeTooltip: function(e) {
				return e.close(), this;
			}
		}), Z.include({
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
		var Ir = Z.extend({
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
				var t = this._tileCoordsToNwSe(e), n = this._crs, r = re(n.project(t[0]), n.project(t[1])), i = r.min, a = r.max, o = (this._wmsVersion >= 1.3 && this._crs === Gn ? [
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
		function $(e, t) {
			return new Br(e, t);
		}
		Rr.WMS = Br, zr.wms = $;
		var Vr = Z.extend({
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
		}), Hr = Vr.extend({
			options: { tolerance: 0 },
			getEvents: function() {
				var e = Vr.prototype.getEvents.call(this);
				return e.viewprereset = this._onViewPreReset, e;
			},
			_onViewPreReset: function() {
				this._postponeUpdatePaths = !0;
			},
			onAdd: function() {
				Vr.prototype.onAdd.call(this), this._draw();
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
					Vr.prototype._update.call(this);
					var e = this._bounds, t = this._container, n = e.getSize(), r = W.retina ? 2 : 1;
					Ot(t, e.min), t.width = r * n.x, t.height = r * n.y, t.style.width = n.x + "px", t.style.height = n.y + "px", W.retina && this._ctx.scale(2, 2), this._ctx.translate(-e.min.x, -e.min.y), this.fire("update");
				}
			},
			_reset: function() {
				Vr.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
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
		function Ur(e) {
			return W.canvas ? new Hr(e) : null;
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
				this._container = K("div", "leaflet-vml-container");
			},
			_update: function() {
				this._map._animatingZoom || (Vr.prototype._update.call(this), this.fire("update"));
			},
			_initPath: function(e) {
				var t = e._container = Wr("shape");
				q(t, "leaflet-vml-shape " + (this.options.className || "")), t.coordsize = "1 1", e._path = Wr("path"), t.appendChild(e._path), this._updateStyle(e), this._layers[o(e)] = e;
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
				vt(e._container);
			},
			_bringToBack: function(e) {
				yt(e._container);
			}
		}, Kr = W.vml ? Wr : ue, qr = Vr.extend({
			_initContainer: function() {
				this._container = Kr("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Kr("g"), this._container.appendChild(this._rootGroup);
			},
			_destroyContainer: function() {
				gt(this._container), Wt(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
			},
			_update: function() {
				if (!(this._map._animatingZoom && this._bounds)) {
					Vr.prototype._update.call(this);
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
				var t = e._path = Kr("path");
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
		W.vml && qr.include(Gr);
		function Jr(e) {
			return W.svg || W.vml ? new qr(e) : null;
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
		qr.create = Kr, qr.pointsToPath = de, fr.geometryToLayer = pr, fr.coordsToLatLng = hr, fr.coordsToLatLngs = gr, fr.latLngToCoords = _r, fr.latLngsToCoords = vr, fr.getFeature = Q, fr.asFeature = yr, Y.mergeOptions({ boxZoom: !0 });
		var Zr = vn.extend({
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
		Y.addInitHook("addHandler", "boxZoom", Zr), Y.mergeOptions({ doubleClickZoom: !0 });
		var Qr = vn.extend({
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
		var $r = vn.extend({
			addHooks: function() {
				if (!this._draggable) {
					var e = this._map;
					this._draggable = new xn(e._mapPane, e._container), this._draggable.on({
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
		Y.addInitHook("addHandler", "dragging", $r), Y.mergeOptions({
			keyboard: !0,
			keyboardPanDelta: 80
		});
		var ei = vn.extend({
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
		var ti = vn.extend({
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
			tapHold: W.touchNative && W.safari && W.mobile,
			tapTolerance: 15
		});
		var ri = vn.extend({
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
			touchZoom: W.touch,
			bounceAtZoomLimits: !0
		});
		var ii = vn.extend({
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
		Y.addInitHook("addHandler", "touchZoom", ii), Y.BoxZoom = Zr, Y.DoubleClickZoom = Qr, Y.Drag = $r, Y.Keyboard = ei, Y.ScrollWheelZoom = ti, Y.TapHold = ri, Y.TouchZoom = ii, e.Bounds = M, e.Browser = W, e.CRS = I, e.Canvas = Hr, e.Circle = or, e.CircleMarker = ir, e.Class = O, e.Control = ln, e.DivIcon = Pr, e.DivOverlay = kr, e.DomEvent = on, e.DomUtil = Ht, e.Draggable = xn, e.Evented = k, e.FeatureGroup = Yn, e.GeoJSON = fr, e.GridLayer = Ir, e.Handler = vn, e.Icon = Zn, e.ImageOverlay = Cr, e.LatLng = P, e.LatLngBounds = ie, e.Layer = Z, e.LayerGroup = qn, e.LineUtil = Vn, e.Map = Y, e.Marker = tr, e.Mixin = yn, e.Path = rr, e.Point = A, e.PolyUtil = Tn, e.Polygon = ur, e.Polyline = cr, e.Popup = Ar, e.PosAnimation = sn, e.Projection = Un, e.Rectangle = Yr, e.Renderer = Vr, e.SVG = qr, e.SVGOverlay = Dr, e.TileLayer = Rr, e.Tooltip = Mr, e.Transformation = oe, e.Util = D, e.VideoOverlay = Tr, e.bind = i, e.bounds = re, e.canvas = Ur, e.circle = sr, e.circleMarker = ar, e.control = un, e.divIcon = Fr, e.extend = n, e.featureGroup = Xn, e.geoJSON = xr, e.geoJson = Sr, e.gridLayer = Lr, e.icon = Qn, e.imageOverlay = wr, e.latLng = F, e.latLngBounds = N, e.layerGroup = Jn, e.map = cn, e.marker = nr, e.point = j, e.polygon = dr, e.polyline = lr, e.popup = jr, e.rectangle = Xr, e.setOptions = p, e.stamp = o, e.svg = Jr, e.svgOverlay = Or, e.tileLayer = zr, e.tooltip = Nr, e.transformation = se, e.version = t, e.videoOverlay = Er;
		var ai = window.L;
		e.noConflict = function() {
			return window.L = ai, this;
		}, window.L = e;
	}));
})))(), 1), ys = ".leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;top:0;left:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:0 0}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{-webkit-transform-origin:0 0;width:1600px;height:1600px}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{width:auto;padding:0;max-width:none!important;max-height:none!important}.leaflet-container img.leaflet-tile{mix-blend-mode:plus-lighter}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:#33b5e566}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{box-sizing:border-box;z-index:800;width:0;height:0}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{z-index:800;pointer-events:visiblePainted;pointer-events:auto;position:relative}.leaflet-top,.leaflet-bottom{z-index:1000;pointer-events:none;position:absolute}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{outline-offset:1px;background:#ddd}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{background:#ffffff80;border:2px dotted #38f}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:.75rem;line-height:1.5}.leaflet-bar{border-radius:4px;box-shadow:0 1px 5px #000000a6}.leaflet-bar a{text-align:center;color:#000;background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;text-decoration:none;display:block}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom:none;border-bottom-right-radius:4px;border-bottom-left-radius:4px}.leaflet-bar a.leaflet-disabled{cursor:default;color:#bbb;background-color:#f4f4f4}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-right-radius:2px;border-bottom-left-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{text-indent:1px;font:700 18px Lucida Console,Monaco,monospace}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{background:#fff;border-radius:5px;box-shadow:0 1px 5px #0006}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{color:#333;background:#fff;padding:6px 10px 6px 6px}.leaflet-control-layers-scrollbar{padding-right:5px;overflow:hidden scroll}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{font-size:1.08333em;display:block}.leaflet-control-layers-separator{border-top:1px solid #ddd;height:0;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fffc;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{color:#333;padding:0 5px;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{width:1em;height:.6669em;vertical-align:baseline!important;display:inline!important}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{white-space:nowrap;box-sizing:border-box;text-shadow:1px 1px #fff;background:#fffc;border:2px solid #777;border-top:none;padding:2px 5px 1px;line-height:1.1}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{background-clip:padding-box;border:2px solid #0003}.leaflet-popup{text-align:center;margin-bottom:20px;position:absolute}.leaflet-popup-content-wrapper{text-align:left;border-radius:12px;padding:1px}.leaflet-popup-content{min-height:1px;margin:13px 24px 13px 20px;font-size:1.08333em;line-height:1.3}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{pointer-events:none;width:40px;height:20px;margin-top:-1px;margin-left:-20px;position:absolute;left:50%;overflow:hidden}.leaflet-popup-tip{pointer-events:auto;width:17px;height:17px;margin:-10px auto 0;padding:1px;transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{color:#333;background:#fff;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{text-align:center;color:#757575;background:0 0;border:none;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;text-decoration:none;position:absolute;top:0;right:0}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{-ms-filter:\"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";width:24px;filter:progid:DXImageTransform.Microsoft.Matrix(M11=.707107, M12=.707107, M21=-.707107, M22=.707107);margin:0 auto}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{color:#222;white-space:nowrap;-webkit-user-select:none;user-select:none;pointer-events:none;background-color:#fff;border:1px solid #fff;border-radius:3px;padding:6px;position:absolute;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{pointer-events:none;content:\"\";background:0 0;border:6px solid #0000;position:absolute}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{margin-left:-6px;left:50%}.leaflet-tooltip-top:before{border-top-color:#fff;margin-bottom:-12px;bottom:0}.leaflet-tooltip-bottom:before{border-bottom-color:#fff;margin-top:-12px;margin-left:-6px;top:0}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{margin-top:-6px;top:50%}.leaflet-tooltip-left:before{border-left-color:#fff;margin-right:-12px;right:0}.leaflet-tooltip-right:before{border-right-color:#fff;margin-left:-12px;left:0}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}";
// src/colors.ts
function bs(e, t, n) {
	let r = n > t ? Math.min(1, Math.max(0, (e - t) / (n - t))) : .5;
	return `hsl(${Math.round(240 * (1 - r))}, 80%, 50%)`;
}
// src/route-segments.ts
var xs = "#9e9e9e";
function Ss(e) {
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
function Cs(e) {
	let t = Math.min(100, Math.max(0, e)) / 100;
	return `hsl(${Math.round(120 * t)}, 75%, 42%)`;
}
function ws(e) {
	return e.some((e) => typeof e.dl == "number");
}
function Ts(e, t, n, r = "height") {
	let i = [];
	for (let a = 1; a < e.length; a++) {
		let o = e[a - 1], s = e[a];
		if (o.lat === null || o.lon === null || s.lat === null || s.lon === null) continue;
		let c = r === "height" || typeof s.dl == "number", l = r === "height" ? bs(s.height, t, n) : c ? Cs(s.dl) : xs;
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
var Es = class extends Me {
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
			m(ys),
			Zt,
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
		return ws(this.points);
	}
	get activeChannel() {
		return this.channel === "signal" && this.signalAvailable ? "signal" : "height";
	}
	setChannel(e) {
		this.channel = e;
	}
	render() {
		if (!this.hasPosition) return B`<p class="muted">${G("no_position", this.lang)}</p>`;
		let e = this.lang, t = this.activeChannel, { min: n, max: r } = Ss(this.points), i = t === "signal" ? `linear-gradient(to right, ${Cs(0)}, ${Cs(50)}, ${Cs(100)})` : `linear-gradient(to right, ${bs(n, n, r)}, ${bs((n + r) / 2, n, r)}, ${bs(r, n, r)})`;
		return B`<div class="map"></div>
      ${this.signalAvailable ? B`<div class="modes" role="group" aria-label=${G("color_by", e)}>
            <button type="button" data-channel="height" aria-pressed=${t === "height"} @click=${() => this.setChannel("height")}>${G("color_height", e)}</button>
            <button type="button" data-channel="signal" aria-pressed=${t === "signal"} @click=${() => this.setChannel("signal")}>${G("color_signal", e)}</button>
          </div>` : V}
      <div class="legend">
        <span>${t === "signal" ? "0 %" : `${Math.round(n)} m`}</span><div class="bar" style="background:${i}"></div><span>${t === "signal" ? "100 %" : `${Math.round(r)} m`}</span>
        ${t === "signal" ? B`<span style="display:inline-flex;align-items:center;gap:4px"><i style="width:10px;height:10px;border-radius:2px;background:${xs}"></i>${G("unknown", e)}</span>` : V}
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
		this.map = vs.default.map(e, {
			zoomControl: !0,
			attributionControl: !0
		}).setView([0, 0], 2), this.tileUrl && vs.default.tileLayer(this.tileUrl, {
			maxZoom: 19,
			attribution: "© OpenStreetMap"
		}).addTo(this.map), this.layer = vs.default.layerGroup().addTo(this.map), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.map?.invalidateSize()), this.resizeObserver.observe(e));
	}
	draw() {
		if (!this.map || !this.layer) return;
		this.layer.clearLayers();
		let { min: e, max: t } = Ss(this.points), n = [];
		for (let r of Ts(this.points, e, t, this.activeChannel)) vs.default.polyline([r.from, r.to], {
			color: r.color,
			weight: 4
		}).addTo(this.layer), n.push(r.from, r.to);
		this.start && vs.default.circleMarker([this.start.lat, this.start.lon], {
			radius: 7,
			color: "#fff",
			weight: 2,
			fillColor: "#2e7d32",
			fillOpacity: 1
		}).addTo(this.layer), this.end && vs.default.circleMarker([this.end.lat, this.end.lon], {
			radius: 7,
			color: "#fff",
			weight: 2,
			fillColor: "#c62828",
			fillOpacity: 1
		}).addTo(this.layer), this.start && n.push([this.start.lat, this.start.lon]), this.end && n.push([this.end.lat, this.end.lon]);
		for (let e of this.points) e.lat !== null && e.lon !== null && n.push([e.lat, e.lon]);
		for (let e of rt(this.events ?? [], this.points)) {
			let t = $e(e.event.kind);
			vs.default.circleMarker([e.lat, e.lon], {
				radius: 6,
				color: "#fff",
				weight: 2,
				fillColor: t.color,
				fillOpacity: 1,
				pane: "markerPane"
			}).bindTooltip(et(e.event.kind, this.lang)).addTo(this.layer);
		}
		if (n.length === 0 || this.fittedFor === this.points) return;
		this.fittedFor = this.points;
		let r = vs.default.latLngBounds(n);
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
customElements.define("dl-route-map", Es);
// src/flight-detail.ts
var Ds = class extends Me {
	static {
		this.properties = {
			hass: { attribute: !1 },
			exportError: { state: !0 },
			detail: { attribute: !1 },
			lang: { type: String },
			timeZone: { type: String },
			tileUrl: { type: String },
			dark: { type: Boolean }
		};
	}
	constructor() {
		super(), this.lang = "de", this.timeZone = "UTC", this.tileUrl = "", this.dark = !1, this.exportError = !1;
	}
	static {
		this.styles = [Zt, h`
      :host { display: block; }
      .head h2 { margin: 0 0 2px; font-size: 1.2rem; font-weight: 500; }
      .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; margin: 12px 0; }
      .tile { text-align: center; padding: 8px; }
      .tile b { display: block; font-size: 1.25rem; font-weight: 500; }
      .event { display: flex; align-items: center; gap: 10px; padding: 3px 0; --mdc-icon-size: 20px; }
      .event .text { flex: 1; }
      .event .time { font-variant-numeric: tabular-nums; color: var(--secondary-text-color); }
      .export { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
      .export a, .report-link { padding: 6px 12px; border: 1px solid var(--divider-color, #ccc); border-radius: 8px; color: var(--primary-color); text-decoration: none; cursor: pointer; background: none; font: inherit; }
      .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 12px; }
    `];
	}
	render() {
		let e = this.detail;
		if (!e) return B`<p class="muted">${G("select_flight", this.lang)}</p>`;
		let { summary: t, battery: n } = e, r = this.lang, i = ht(e.analysis?.hover_wind, r), a = nt(e.extras, r);
		return B`
      <div class="head">
        <h2>${Ue(t.start, this.timeZone, r)}</h2>
        <div class="muted">${t.drone_model} · …${t.drone_suffix} · ${G("battery", r)} …${t.battery_suffix} · ${e.source_name}</div>
      </div>
      <div class="tiles">
        ${this.tile(G("duration", r), Re(t.duration_s))}
        ${this.tile(G("distance", r), ze(t.distance_m, r))}
        ${this.tile(G("max_height", r), Ve(t.max_height_m, r))}
        ${this.tile(G("max_speed", r), Be(t.max_speed_ms, r))}
      </div>
      <div class="cards">
        <div class="card" id="battery-card">
          <h3>${G("battery", r)}</h3>
          ${n ? ft(n, e.analysis?.cell_level, r).map((e) => this.row(e.label, e.value)) : B`<p class="muted">${G("no_battery", r)}</p>`}
        </div>
        <div class="card" id="weather-card">
          <h3>${G("weather", r)}</h3>
          ${this.weatherRows(e, i)}
        </div>
        ${this.rowsCard("energy-card", G("energy_card", r), st(e.extras, r))}
        ${this.rowsCard("signal-card", G("signal_card", r), ct(e.extras, r))}
        ${this.rowsCard("camera-card", G("camera_card", r), lt(e.extras, r))}
        ${this.rowsCard("phases-card", G("phases", r), mt(e.analysis?.phases, r))}
        <div class="card" id="events-card">
          <h3>${G("events", r)}</h3>
          ${a.length === 0 ? B`<p class="muted">${e.extras ? G("events_none", r) : G("events_missing", r)}</p>` : a.map((e) => B`<div class="event" data-severity=${e.severity}>
                <ha-icon icon=${e.icon} style="color:${e.color}"></ha-icon><span class="text">${e.text}</span><span class="time">${e.timeText}</span>
              </div>`)}
        </div>
      </div>
      <div class="cards">
        <div class="card" id="note-card">
          <h3>${G("note", r)}</h3>
          ${this.hass ? B`<dl-flight-note .hass=${this.hass} .flightId=${t.id}></dl-flight-note>` : V}
        </div>
        <div class="card" id="export-card">
          <h3>${G("export", r)}</h3>
          <div class="export">
            ${qt(t.has_position).map((e) => B`<a href=${Kt(t.id, e.format)} data-format=${e.format} download @click=${(n) => this.onExport(n, t.id, e.format)}>${G(e.label, r)}</a>`)}
            ${e.battery && t.battery_serial ? B`<button class="report-link" id="open-report" @click=${() => this.dispatchEvent(new CustomEvent("open-battery-report", {
			detail: t.battery_serial,
			bubbles: !0,
			composed: !0
		}))}>${G("open_report", r)} …${t.battery_suffix}</button>` : V}
          </div>
          ${this.exportError ? B`<p class="muted" role="alert">${G("export_failed", r)}</p>` : V}
        </div>
      </div>
      <dl-route-map .points=${e.points} .start=${e.start} .end=${e.end} .events=${e.extras?.events ?? []} .tileUrl=${this.tileUrl} .lang=${r}></dl-route-map>
      <dl-flight-charts .points=${e.points} .events=${e.extras?.events ?? []} .modeSegments=${e.analysis?.mode_segments ?? []} .lang=${r} .dark=${this.dark}></dl-flight-charts>
      <slot></slot>
    `;
	}
	onExport(e, t, n) {
		this.hass?.fetchWithAuth && (e.preventDefault(), this.exportError = !1, Yt(this.hass, t, n).catch(() => {
			this.exportError = !0;
		}));
	}
	weatherRows(e, t) {
		let n = this.lang, r = e.weather;
		return r ? B`${this.row(G("temperature", n), `${r.temperature_c.toLocaleString(n)} °C`)}
      ${this.row(G("wind", n), `${Ke(r.wind_10m_ms, n)} (${W(r.wind_dir_deg, n)} ${Math.round(r.wind_dir_deg)}°)`)}
      ${r.wind_80m_ms === null ? V : this.row(`${G("wind", n)} 80 m`, Ke(r.wind_80m_ms, n))}
      ${this.row(G("gusts", n), Ke(r.gust_ms, n))}
      ${this.row(G("precipitation", n), `${r.precipitation_mm.toLocaleString(n)} mm`)}
      ${this.row(G("clouds", n), He(r.cloud_cover_pct))}
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
customElements.define("dl-flight-detail", Ds);
// src/flight-list.ts
var Os = class extends Me {
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
		this.styles = [Zt, h`
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
		let t = it(e);
		return t.empty ? V : B`<div class="badges">
      ${t.kinds.map((e) => {
			let t = $e(e), n = et(e, this.lang);
			return B`<span class="badge event" data-kind=${e} data-severity=${t.severity} title=${n} aria-label=${n}><ha-icon icon=${t.icon} style="color:${t.color}"></ha-icon></span>`;
		})}
      ${t.photos > 0 ? B`<span class="badge" data-badge="photos" title=${G("photos", this.lang)}><ha-icon icon="mdi:camera"></ha-icon>${t.photos}</span>` : V}
      ${t.videoS > 0 ? B`<span class="badge" data-badge="video" title=${G("video", this.lang)}><ha-icon icon="mdi:video"></ha-icon>${Re(t.videoS)}</span>` : V}
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
          <div>${Ue(e.start, this.timeZone, this.lang)}</div>
          <div class="sub">${Re(e.duration_s)} · ${e.drone_model} · …${e.battery_suffix}</div>
          ${this.badges(e)}
        </li>`)}
    </ul>`;
	}
};
customElements.define("dl-flight-list", Os);
// src/flights-view.ts
var ks = 50, As = class extends Me {
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
		this.styles = [Zt, h`
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
		return new Fe(this.hass);
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
				limit: ks,
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
      .hass=${this.hass}
      .detail=${this.detail}
      .lang=${e}
      .timeZone=${this.timeZone}
      .tileUrl=${this.tileUrl}
      .dark=${!!this.hass?.themes?.darkMode}
    ></dl-flight-detail>`;
		return this.narrow ? this.showDetail ? B`<button @click=${() => this.showDetail = !1}>← ${G("back", e)}</button>${n}` : t : B`<div class="layout"><div>${t}</div><div>${n}</div></div>`;
	}
};
customElements.define("dl-flights-view", As);
// src/print-doc.ts
var js = "\n  .doc { color: var(--doc-fg, var(--primary-text-color, #212121)); font-size: 13px; line-height: 1.35; }\n  .doc h1 { font-size: 20px; font-weight: 600; margin: 0 0 2px; }\n  .doc h2 { font-size: 14px; font-weight: 600; margin: 14px 0 4px; }\n  .doc .subtitle { color: var(--doc-muted, var(--secondary-text-color, #727272)); margin-bottom: 10px; }\n  .doc .tiles { display: flex; gap: 8px; margin: 8px 0 12px; }\n  .doc .tile { flex: 1; text-align: center; padding: 6px; border-radius: 6px; background: var(--doc-tile, rgba(128,128,128,0.12)); }\n  .doc .tile span { display: block; font-size: 11px; color: var(--doc-muted, var(--secondary-text-color, #727272)); }\n  .doc .tile b { font-size: 15px; font-weight: 600; }\n  .doc table { width: 100%; border-collapse: collapse; }\n  .doc th { text-align: left; font-size: 11px; font-weight: 600; color: var(--doc-muted, var(--secondary-text-color, #727272)); border-bottom: 2px solid var(--doc-line, #bbb); padding: 4px 6px; }\n  .doc td { border-bottom: 1px solid var(--doc-line, #ddd); padding: 4px 6px; vertical-align: top; }\n  .doc .right { text-align: right; }\n  .doc thead { display: table-header-group; }\n  .doc tr { break-inside: avoid; page-break-inside: avoid; }\n  .doc .empty { color: var(--doc-muted, var(--secondary-text-color, #727272)); margin: 12px 0; }\n  .doc .footnote { font-size: 11px; color: var(--doc-muted, var(--secondary-text-color, #727272)); margin-top: 14px; }\n  .doc .signature { margin-top: 36px; width: 240px; border-top: 1px solid var(--doc-fg, #000); padding-top: 3px; font-size: 11px; color: var(--doc-muted, #555); break-inside: avoid; }\n  .doc .charts { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px 16px; margin: 8px 0; }\n  .doc .chart { break-inside: avoid; }\n  .doc .chart h3 { font-size: 12px; font-weight: 600; margin: 0 0 2px; }\n  .doc .chart svg { width: 100%; height: auto; display: block; }\n  .doc .chart .none { color: var(--doc-muted, #727272); font-size: 11px; height: 60px; display: flex; align-items: center; }\n  .doc .axis { font-size: 9px; fill: var(--doc-muted, #727272); }\n  .doc .grid { stroke: var(--doc-line, #ddd); stroke-width: 0.6; }\n  .doc .figures { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0 24px; }\n  .doc .fig { display: flex; justify-content: space-between; gap: 12px; padding: 2px 0; border-bottom: 1px dotted var(--doc-line, #ddd); }\n  .doc .fig span { color: var(--doc-muted, #727272); }\n  .doc .assessment { border-radius: 6px; padding: 8px 10px; margin: 12px 0; break-inside: avoid; border-left: 5px solid var(--level); background: color-mix(in srgb, var(--level) 12%, transparent); }\n  .doc .assessment b.head { display: block; font-size: 14px; }\n  .doc .assessment ul { margin: 4px 0 0; padding-left: 18px; }\n  .doc .symbol { color: var(--level); margin-right: 4px; }\n", Ms = "\n  @page { size: A4; margin: 14mm 12mm; }\n  html, body { margin: 0; background: #fff; }\n  body { font-family: system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif; --doc-fg: #000; --doc-muted: #555; --doc-line: #bbb; --doc-tile: #eee; }\n  .doc { font-size: 10pt; }\n  .doc h1 { font-size: 16pt; }\n  .doc table { font-size: 9pt; }\n  .doc .chart svg { max-height: 38mm; }\n  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }\n", Ns = (e) => B`<div class="tiles">${e.map((e) => B`<div class="tile"><span>${e.label}</span><b>${e.value}</b></div>`)}</div>`;
function Ps(e, t, n) {
	return B`<div class="doc flightbook">
    <h1>${G("flightbook", n)}</h1>
    <div class="subtitle">${t}</div>
    ${Ns(e.summary)}
    ${e.rows.length === 0 ? B`<p class="empty">${G("flightbook_empty", n)}</p>` : B`<table>
          <thead><tr>${wt.map((e) => B`<th scope="col" class=${e.right ? "right" : ""}>${G(e.title, n)}</th>`)}</tr></thead>
          <tbody>${e.rows.map((e) => B`<tr>${wt.map((t) => B`<td class=${t.right ? "right" : ""}>${e[t.key]}</td>`)}</tr>`)}</tbody>
        </table>`}
    <p class="footnote">${G("flightbook_footnote", n)}</p>
    <div class="signature">${G("signature", n)}</div>
  </div>`;
}
function Fs(e, t, n) {
	let r = G(e.title, t), i = Wt(e, 320, 110, t);
	if (!i) return B`<div class="chart"><h3>${r}</h3><div class="none">${G("too_few", t)}</div></div>`;
	let a = Gt(e, t, n), o = e.ruleTitle ? G(e.ruleTitle, t) : "", s = e.points.map((e) => e.t), c = (e) => new Intl.DateTimeFormat(t, {
		month: "short",
		year: "2-digit",
		timeZone: n
	}).format(new Date(e));
	return B`<div class="chart"><h3>${r}</h3>
    <svg viewBox="0 0 ${i.width} ${i.height}" role="img" aria-label=${Xe("chart_aria", t, {
		title: r,
		summary: a
	})}>
      <title>${r}</title>
      ${i.yTicks.map((e) => ge`<line class="grid" x1=${i.plot.left} x2=${i.plot.right} y1=${e.y} y2=${e.y}></line>
        <text class="axis" x=${i.plot.left - 4} y=${e.y + 3} text-anchor="end">${e.label}</text>`)}
      ${i.ruleY === null ? V : ge`<line x1=${i.plot.left} x2=${i.plot.right} y1=${i.ruleY} y2=${i.ruleY} stroke="#ef6c00" stroke-width="1" stroke-dasharray="4 3"></line>
        <text class="axis" x=${i.plot.right} y=${i.ruleY - 2} text-anchor="end" fill="#ef6c00">${o}</text>`}
      <path d=${i.path} fill="none" stroke=${e.color} stroke-width="1.6" stroke-linejoin="round"></path>
      ${i.dots.map((t) => ge`<circle cx=${t.x} cy=${t.y} r="2" fill=${e.color}></circle>`)}
      <text class="axis" x=${i.plot.left} y=${i.height - 4}>${c(Math.min(...s))}</text>
      <text class="axis" x=${i.plot.right} y=${i.height - 4} text-anchor="end">${c(Math.max(...s))}</text>
    </svg></div>`;
}
function Is(e, t, n, r, i) {
	return B`<div class="doc battery-report">
    <h1>${e.title}</h1>
    <div class="subtitle">${e.subtitle}</div>
    ${Ns(e.tiles)}
    <div class="charts">${t.map((e) => Fs(e, r, i))}</div>
    <h2>${G("key_figures", r)}</h2>
    <div class="figures">${e.rows.map((e) => B`<div class="fig"><span>${e.label}</span><b>${e.value}</b></div>`)}</div>
    ${e.recent.length === 0 ? V : B`<h2>${G("recent_flights", r)}</h2>
      <table>
        <thead><tr>${e.recentHeader.map((e, t) => B`<th scope="col" class=${t === 0 ? "" : "right"}>${e}</th>`)}</tr></thead>
        <tbody>${e.recent.map((e) => B`<tr>${e.map((e, t) => B`<td class=${t === 0 ? "" : "right"}>${e}</td>`)}</tr>`)}</tbody>
      </table>`}
    <div class="assessment" style="--level:${n.color}" data-level=${n.level} role="group" aria-label=${G("assessment", r)}>
      <b class="head"><span class="symbol" aria-hidden="true">${n.symbol}</span>${G("assessment", r)}: ${n.headline} (${n.levelText})</b>
      <div><b>${n.stateOfHealth}</b></div>
      <ul>${n.points.map((e) => B`<li>${e}</li>`)}</ul>
    </div>
    ${e.notes.map((e) => B`<p class="footnote">${e}</p>`)}
  </div>`;
}
function Ls(e, t, n = window) {
	let r = n.document, i = r.createElement("iframe");
	i.setAttribute("aria-hidden", "true"), i.tabIndex = -1, i.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden", r.body.appendChild(i);
	let a = i.contentDocument, o = i.contentWindow;
	if (!a || !o) return i.remove(), n.print(), !1;
	a.open(), a.write(`<!doctype html><html lang="${r.documentElement.lang || "de"}"><head><meta charset="utf-8"><title>${t.replace(/[<&]/g, "")}</title><style>${js}${Ms}</style></head><body></body></html>`), a.close(), Ae(e, a.body);
	let s = () => i.remove();
	return o.addEventListener("afterprint", s, { once: !0 }), setTimeout(s, 12e4), setTimeout(() => {
		o.focus(), o.print();
	}, 50), !0;
}
// src/battery-report-view.ts
var Rs = class extends Me {
	static {
		this.properties = {
			hass: { attribute: !1 },
			serial: { type: String },
			report: { state: !0 },
			error: { state: !0 }
		};
	}
	constructor() {
		super(), this.token = 0, this.serial = "", this.error = !1;
	}
	static {
		this.styles = [
			Zt,
			m(js),
			h`
      .bar { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
      .paper { overflow-x: auto; }
    `
		];
	}
	willUpdate(e) {
		e.has("serial") && this.serial && this.load();
	}
	get language() {
		return this.hass?.language ?? "en";
	}
	get timeZone() {
		return this.hass?.config?.time_zone ?? "UTC";
	}
	async load() {
		let e = ++this.token;
		this.report = void 0, this.error = !1;
		try {
			let t = await new Fe(this.hass).batteryReport(this.serial);
			e === this.token && (this.report = t);
		} catch {
			e === this.token && (this.error = !0);
		}
	}
	content(e) {
		let t = this.language;
		return Is(J(e, t, this.timeZone), Ut(e.history), Bt(e.assessment, t), t, this.timeZone);
	}
	render() {
		let e = this.language, t = this.report;
		return B`
      <div class="bar">
        <button id="back" @click=${() => this.dispatchEvent(new CustomEvent("close"))}>← ${G("back", e)}</button>
        ${t ? B`<button class="primary" id="print" @click=${() => Ls(this.content(t), J(t, e, this.timeZone).title)}>${G("print", e)}</button>` : V}
      </div>
      ${this.error ? B`<p class="muted">${G("report_no_data", e)}</p>` : t ? B`<div class="card paper">${this.content(t)}</div>` : B`<p class="muted">${G("loading", e)}</p>`}
    `;
	}
};
customElements.define("dl-battery-report", Rs);
// src/flightbook-view.ts
var zs = class extends Me {
	static {
		this.properties = {
			book: { attribute: !1 },
			filterText: { type: String },
			lang: { type: String }
		};
	}
	constructor() {
		super(), this.filterText = "", this.lang = "de";
	}
	static {
		this.styles = [
			Zt,
			m(js),
			h`
      .bar { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
      .paper { overflow-x: auto; }
    `
		];
	}
	get content() {
		return Ps(St(this.book ?? {
			rows: [],
			summary: {
				flights: 0,
				duration_s: 0,
				distance_m: 0
			}
		}, this.lang), this.filterText, this.lang);
	}
	print() {
		Ls(this.content, `${G("flightbook", this.lang)} ${this.filterText}`.trim());
	}
	render() {
		return B`
      <div class="bar">
        <button @click=${() => this.dispatchEvent(new CustomEvent("close"))}>← ${G("back", this.lang)}</button>
        <button class="primary" id="print" @click=${this.print}>${G("print", this.lang)}</button>
      </div>
      <div class="card paper">${this.content}</div>
    `;
	}
};
customElements.define("dl-flightbook-view", zs);
// src/logbook-view.ts
var Bs = 15, Vs = class extends Me {
	static {
		this.properties = {
			hass: { attribute: !1 },
			drone: { type: String },
			battery: { type: String },
			droneLabel: { type: String },
			batteryLabel: { type: String },
			logbook: { state: !0 },
			error: { state: !0 },
			year: { state: !0 },
			book: { state: !0 },
			bookError: { state: !0 },
			editing: { state: !0 },
			draftName: { state: !0 },
			busy: { state: !0 }
		};
	}
	constructor() {
		super(), this.token = 0, this.drone = "", this.battery = "", this.droneLabel = "", this.batteryLabel = "", this.error = !1, this.year = "", this.bookError = !1, this.draftName = "", this.busy = !1;
	}
	static {
		this.styles = [Zt, h`
      .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; margin-bottom: 12px; }
      .tile { text-align: center; }
      .tile b { display: block; font-size: 1.3rem; font-weight: 500; }
      .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; align-items: start; }
      .full { grid-column: 1 / -1; }
      .toolbar { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 8px; }
      .place { display: flex; justify-content: space-between; gap: 12px; width: 100%; text-align: left; border: none; border-radius: 6px; padding: 6px 4px; background: none; }
      .place:hover, .place:focus-visible { background: var(--secondary-background-color, rgba(128,128,128,0.12)); }
      .place small { display: block; color: var(--secondary-text-color); }
      .edit { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin: 8px 0; padding: 8px; border-radius: 8px; background: var(--secondary-background-color, rgba(128,128,128,0.12)); }
      .edit input { font: inherit; flex: 1; min-width: 10em; padding: 6px 8px; border-radius: 8px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); }
      .hint { font-size: 0.8rem; margin: 6px 0 0; }
      .error { color: var(--error-color, #c62828); }
    `];
	}
	willUpdate(e) {
		(e.has("drone") || e.has("battery")) && (this.book = void 0, this.year = "", this.load());
	}
	get api() {
		return new Fe(this.hass);
	}
	get language() {
		return this.hass?.language ?? "en";
	}
	async load() {
		let e = ++this.token;
		try {
			let t = await this.api.logbook(this.drone || void 0, this.battery || void 0);
			e === this.token && (this.logbook = t, this.error = !1);
		} catch {
			e === this.token && (this.error = !0);
		}
	}
	async createBook() {
		this.busy = !0, this.bookError = !1;
		let e = this.year ? Number(this.year) : void 0;
		try {
			let t = await this.api.flightbook(this.drone || void 0, this.battery || void 0, e);
			this.book = {
				data: t,
				filterText: Ct({
					drone: this.drone ? this.droneLabel : void 0,
					battery: this.battery ? this.batteryLabel : void 0,
					year: e
				}, this.language)
			};
		} catch {
			this.bookError = !0;
		} finally {
			this.busy = !1;
		}
	}
	async savePlace() {
		let e = this.editing;
		if (e) try {
			let t = (await this.api.placeNameSet(e.key, this.draftName.trim())).name || null;
			this.logbook &&= {
				...this.logbook,
				places: this.logbook.places.map((n) => n.key === e.key ? {
					...n,
					name: t
				} : n)
			}, this.editing = void 0;
		} catch {
			this.error = !0;
		}
	}
	edit(e) {
		this.editing = e, this.draftName = e.name ?? "";
	}
	render() {
		let e = this.language;
		if (this.book) return B`<dl-flightbook-view .book=${this.book.data} .filterText=${this.book.filterText} .lang=${e} @close=${() => this.book = void 0}></dl-flightbook-view>`;
		if (this.error && !this.logbook) return B`<p class="muted">${G("error", e)}</p>`;
		let t = this.logbook;
		if (!t) return B`<p class="muted">${G("loading", e)}</p>`;
		let n = Object.entries(t.tags).sort((e, t) => t[1] - e[1] || e[0].localeCompare(t[0]));
		return B`
      <div class="tiles">
        <div class="card tile"><span class="muted">${G("metric_flights", e)}</span><b>${t.flights}</b></div>
        <div class="card tile"><span class="muted">${G("metric_hours", e)}</span><b>${Re(t.duration_s)}</b></div>
        <div class="card tile"><span class="muted">${G("distance", e)}</span><b>${ze(t.distance_m, e)}</b></div>
      </div>
      <div class="cards">
        <div class="card full" id="flightbook-card">
          <h3>${G("flightbook", e)}</h3>
          <p class="muted hint">${G("flightbook_hint", e)}</p>
          <div class="toolbar">
            <label>${G("year", e)}
              <select name="year" @change=${(e) => this.year = e.target.value}>
                <option value="">${G("all_years", e)}</option>
                ${t.years.map((e) => B`<option value=${e.year} ?selected=${String(e.year) === this.year}>${e.year}</option>`)}
              </select>
            </label>
            <button class="primary" id="create-book" ?disabled=${this.busy} @click=${() => void this.createBook()}>${G("create_flightbook", e)}</button>
            ${this.bookError ? B`<span class="error" role="alert">${G("error", e)}</span>` : V}
          </div>
        </div>
        <div class="card" id="records-card">
          <h3>${G("records", e)}</h3>
          <div class="kv"><span>${G("longest_flight", e)}</span><b>${Re(t.longest_flight_s)}</b></div>
          <div class="kv"><span>${G("farthest_flight", e)}</span><b>${ze(t.farthest_flight_m, e)}</b></div>
          <div class="kv"><span>${G("highest_point", e)}</span><b>${Ve(t.highest_m, e)}</b></div>
          <div class="kv"><span>${G("fastest_speed", e)}</span><b>${Be(t.fastest_ms, e)}</b></div>
        </div>
        ${t.years.length === 0 ? V : B`<div class="card" id="years-card">
          <h3>${G("years", e)}</h3>
          ${t.years.map((t) => B`<div class="kv"><span>${t.year}</span><b>${t.flights} · ${Re(t.duration_s)} · ${ze(t.distance_m, e)}</b></div>`)}
        </div>`}
        ${t.places.length === 0 ? V : B`<div class="card" id="places-card">
          <h3>${G("places", e)}</h3>
          ${t.places.slice(0, Bs).map((t) => B`<button class="place" data-key=${t.key} @click=${() => this.edit(t)}>
            <span>${t.name ?? G("unnamed_place", e)}<small>${qe(t.lat, e, 3)}, ${qe(t.lon, e, 3)}</small></span>
            <b>${t.flights} · ${Re(t.duration_s)}</b></button>`)}
          ${this.editing ? B`<form class="edit" @submit=${(e) => {
			e.preventDefault(), this.savePlace();
		}}>
            <label for="place-name">${G("name_place", e)}</label>
            <input id="place-name" name="place_name" type="text" maxlength="100" .value=${this.draftName} placeholder=${G("place_name", e)} aria-describedby="place-hint"
              @input=${(e) => this.draftName = e.target.value} />
            <button class="primary" type="submit">${G("save", e)}</button>
            <button type="button" @click=${() => this.editing = void 0}>${G("cancel", e)}</button>
            <span id="place-hint" class="muted hint">${G("place_name_hint", e)}</span>
          </form>` : V}
          <p class="muted hint">${G("places_hint", e)}</p>
        </div>`}
        ${n.length === 0 ? V : B`<div class="card" id="tags-card">
          <h3>${G("tags", e)}</h3>
          ${n.map(([e, t]) => B`<div class="kv"><span>#${e}</span><b>${t}</b></div>`)}
        </div>`}
      </div>`;
	}
};
customElements.define("dl-logbook-view", Vs);
// src/maintenance-view.ts
var Hs = class extends Me {
	static {
		this.properties = {
			hass: { attribute: !1 },
			row: { attribute: !1 },
			draft: { state: !0 },
			status: { state: !0 }
		};
	}
	constructor() {
		super(), this.initialised = !1, this.saver = q(() => void this.commit(), 500), this.status = "";
	}
	static {
		this.styles = [Zt, h`
      :host { display: block; }
      .head { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 8px; }
      .head h3 { margin: 0; }
      .badge { font-size: 0.8rem; font-weight: 600; }
      .progress { margin: 6px 0 10px; }
      .progress .line { display: flex; justify-content: space-between; font-size: 0.85rem; gap: 8px; }
      .track { height: 8px; border-radius: 4px; background: var(--divider-color, #ddd); overflow: hidden; margin-top: 3px; }
      .fill { height: 100%; border-radius: 4px; }
      .plan { display: flex; align-items: center; gap: 8px; margin: 6px 0; flex-wrap: wrap; }
      .plan label { display: flex; align-items: center; gap: 6px; min-width: 11em; }
      input[type="number"] { font: inherit; width: 5.5em; padding: 4px 6px; border-radius: 8px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); }
      .foot { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
      .status { font-size: 0.8rem; }
      .failed { color: var(--error-color, #c62828); }
    `];
	}
	willUpdate(e) {
		e.has("row") && this.row && !this.initialised && (this.draft = Nt(this.row), this.initialised = !0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.saver.flush();
	}
	get language() {
		return this.hass?.language ?? "en";
	}
	patch(e) {
		this.draft = {
			...this.draft,
			...e
		}, this.status = "", this.saver.call();
	}
	async commit() {
		let e = Pt(this.draft);
		if ((e.hours || e.flights || this.row.plan) && Ft(e, this.row)) try {
			this.row = await new Fe(this.hass).maintenanceSet(this.row.serial, e.hours, e.flights), this.status = "saved";
		} catch {
			this.status = "failed";
		}
	}
	async serviced() {
		this.saver.flush();
		try {
			this.row = await new Fe(this.hass).maintenanceServiced(this.row.serial), this.status = "saved";
		} catch {
			this.status = "failed";
		}
	}
	number(e, t, n, r, i = 1) {
		return B`<input type="number" min=${t.min} max=${t.max} step=${i} .value=${String(e)} aria-label=${r}
      @input=${(e) => {
			let t = e.target.valueAsNumber;
			Number.isFinite(t) && n(t);
		}} />`;
	}
	render() {
		if (!this.row || !this.draft) return V;
		let e = this.language, t = this.row.status?.level ?? "ok", n = Dt(this.row, e);
		return B`<div class="card">
      <div class="head">
        <h3>${this.row.name}</h3>
        ${t === "ok" ? V : B`<span class="badge" style="color:${Et[t]}">${t === "due" ? "✖" : "▲"} ${Ot(t, e)}</span>`}
      </div>
      ${n.map((t) => B`<div class="progress">
        <div class="line"><span>${t.title}</span><span>${t.value}</span></div>
        <div class="track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${t.percent} aria-label=${t.title}
          aria-valuetext=${Xe("progress_aria", e, {
			title: `${t.value} (${Ot(t.level, e)})`,
			value: `${t.percent} %`
		})} data-level=${t.level}>
          <div class="fill" style="width:${t.percent}%;background:${t.color}"></div>
        </div>
      </div>`)}
      <div class="plan">
        <label><input type="checkbox" name="hours_on" .checked=${this.draft.hoursOn} @change=${(e) => this.patch({ hoursOn: e.target.checked })} /> ${G("maint_by_hours", e)}</label>
        ${this.draft.hoursOn ? this.number(this.draft.hours, kt, (e) => this.patch({ hours: e }), G("maint_interval_hours", e)) : V}
      </div>
      <div class="plan">
        <label><input type="checkbox" name="flights_on" .checked=${this.draft.flightsOn} @change=${(e) => this.patch({ flightsOn: e.target.checked })} /> ${G("maint_by_flights", e)}</label>
        ${this.draft.flightsOn ? this.number(this.draft.flights, At, (e) => this.patch({ flights: e }), G("maint_interval_flights", e)) : V}
      </div>
      <div class="foot">
        ${this.row.plan ? B`<button id="serviced" @click=${() => void this.serviced()}>${G("maint_serviced", e)}</button>` : V}
        <span class="status muted ${this.status === "failed" ? "failed" : ""}" role="status" aria-live="polite">${this.status === "saved" ? G("maint_saved", e) : this.status === "failed" ? G("maint_save_failed", e) : ""}</span>
      </div>
    </div>`;
	}
};
customElements.define("dl-maintenance-card", Hs);
var Us = class extends Me {
	static {
		this.properties = {
			hass: { attribute: !1 },
			rows: { state: !0 },
			error: { state: !0 },
			loaded: { state: !0 }
		};
	}
	constructor() {
		super(), this.rows = [], this.error = !1, this.loaded = !1;
	}
	static {
		this.styles = [Zt, h`.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; margin-top: 12px; }`];
	}
	connectedCallback() {
		super.connectedCallback(), this.load();
	}
	async load() {
		try {
			this.rows = await new Fe(this.hass).maintenance(), this.error = !1;
		} catch {
			this.error = !0;
		}
		this.loaded = !0;
	}
	render() {
		let e = this.hass?.language ?? "en";
		return this.error ? B`<p class="muted">${G("error", e)}</p>` : B`<p class="muted">${G("maint_hint", e)}</p>
      ${this.loaded && this.rows.length === 0 ? B`<p class="muted">${G("maint_no_drones", e)}</p>` : V}
      <div class="cards">${this.rows.map((e) => B`<dl-maintenance-card .hass=${this.hass} .row=${e}></dl-maintenance-card>`)}</div>`;
	}
};
customElements.define("dl-maintenance-view", Us);
// src/stats-logic.ts
function Ws(e) {
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
function Gs(e, t) {
	let [n, r] = e.split("-").map(Number);
	return new Intl.DateTimeFormat(t, {
		month: "short",
		year: "2-digit",
		timeZone: "UTC"
	}).format(new Date(Date.UTC(n, r - 1, 1)));
}
function Ks(e, t) {
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
function qs(e) {
	let t = e.history[e.history.length - 1];
	return t !== void 0 && t.cell_deviation_mv > 20;
}
// src/battery-history.ts
var Js = [
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
], Ys = [
	"#1565c0",
	"#ef6c00",
	"#2e7d32",
	"#6a1b9a",
	"#00838f",
	"#ad1457",
	"#4e342e",
	"#546e7a",
	"#9e9d24"
], Xs = class extends Me {
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
			m(ns),
			Zt,
			h`
      .toolbar { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
      button[aria-pressed="true"] { background: var(--primary-color); color: var(--text-primary-color, #fff); }
      .legend { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; font-size: 0.85rem; }
      .legend .warn { color: var(--error-color, #c62828); font-weight: 500; }
      .reports { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
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
			this.batteries = (await new Fe(this.hass).batteries(this.drone || void 0)).batteries;
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
        ${Js.map((t) => B`<button data-metric=${t.key} aria-pressed=${this.metric === t.key} @click=${() => this.metric = t.key}>${G(t.label, e)}</button>`)}
      </div>
      <div id="plot"></div>
      <div class="legend">
        ${this.visible.map((e, t) => B`<span class=${qs(e) ? "warn" : ""}><span class="dot" style="background:${qs(e) ? "#c62828" : Ys[t % Ys.length]}"></span>…${e.suffix} (${e.flights})${qs(e) ? " ⚠" : ""}</span>`)}
      </div>
      <div class="reports">
        ${this.visible.map((t) => B`<button data-report=${t.serial} @click=${() => this.dispatchEvent(new CustomEvent("open-battery-report", {
			detail: t.serial,
			bubbles: !0,
			composed: !0
		}))}>${G("open_report", e)} …${t.suffix}</button>`)}
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
		if (!t || n.length === 0 || !rs()) return;
		let { x: r, series: i } = Ks(n, this.metric);
		try {
			this.plot = new ts({
				width: t.clientWidth || 600,
				height: 240,
				legend: { show: !1 },
				scales: { x: { time: !0 } },
				axes: [{ grid: { stroke: "rgba(128,128,128,0.2)" } }, { grid: { stroke: "rgba(128,128,128,0.2)" } }],
				series: [{}, ...n.map((e, t) => ({
					label: `…${e.suffix}`,
					stroke: qs(e) ? "#c62828" : Ys[t % Ys.length],
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
customElements.define("dl-battery-history", Xs), (function() {
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
var Zs = class extends Me {
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
			m(ys),
			Zt,
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
			this.cells = (await new Fe(this.hass).heatmap(this.precision, this.drone || void 0, this.battery || void 0)).cells;
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
			let r = await new Fe(this.hass).cellFlights(e, t, this.precision, this.drone || void 0, this.battery || void 0);
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
      ${this.flights.length ? B`<ul>${this.flights.map((t) => B`<li @click=${() => this.open(t.id)}>${Ue(t.start, this.hass?.config?.time_zone ?? "UTC", e)} · ${Re(t.duration_s)} · ${t.drone_model}</li>`)}</ul>` : V}
    </div>`;
	}
	willUpdate(e) {
		(e.has("drone") || e.has("battery")) && this.loaded && (this.flights = [], this.load());
	}
	updated(e) {
		let t = this.renderRoot.querySelector(".map");
		if (!t || this.cells.length === 0) return;
		let n = !this.map;
		if (this.map || (this.map = vs.default.map(t).setView([0, 0], 2), this.tileUrl && vs.default.tileLayer(this.tileUrl, {
			maxZoom: 19,
			attribution: "© OpenStreetMap"
		}).addTo(this.map), this.map.on("click", (e) => void this.handleCellClick(e.latlng.lat, e.latlng.lng))), n || e.has("cells")) {
			if (this.heat && this.map.removeLayer(this.heat), rs()) {
				let e = Math.max(...this.cells.map((e) => e.count));
				this.heat = vs.default.heatLayer(this.cells.map((t) => [
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
			this.map.fitBounds(vs.default.latLngBounds(this.cells.map((e) => [e.lat, e.lon])), {
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
customElements.define("dl-heatmap-view", Zs);
// src/stats-view.ts
var Qs = class extends Me {
	static {
		this.properties = {
			hass: { attribute: !1 },
			tileUrl: { type: String },
			drone: { type: String },
			battery: { type: String },
			stats: { state: !0 },
			metric: { state: !0 },
			error: { state: !0 }
		};
	}
	constructor() {
		super(), this.started = !1, this.token = 0, this.tileUrl = "", this.drone = "", this.battery = "", this.metric = "flights", this.error = !1;
	}
	static {
		this.styles = [Zt, h`
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
	willUpdate(e) {
		(!this.started || e.has("drone") || e.has("battery")) && (this.started = !0, this.load());
	}
	get language() {
		return this.hass?.language ?? "en";
	}
	async load() {
		let e = ++this.token;
		try {
			let t = await new Fe(this.hass).stats(this.drone || void 0, this.battery || void 0);
			e === this.token && (this.stats = t, this.error = !1);
		} catch {
			e === this.token && (this.error = !0);
		}
	}
	render() {
		let e = this.language;
		if (this.error) return B`<p class="muted">${G("error", e)}</p>`;
		let t = this.stats;
		if (!t) return B`<p class="muted">${G("loading", e)}</p>`;
		if (t.totals.flights === 0 && !this.drone && !this.battery) return B`<p class="muted">${G("no_flights", e)}</p>`;
		let n = Ws(t.months), r = (e) => this.metric === "flights" ? e.flights : e.duration_s, i = Math.max(1, ...n.map(r)), a = (e) => this.metric === "flights" ? String(e.flights) : Re(e.duration_s);
		return B`
      <section>
        <div class="tiles">
          <div class="card tile"><span class="muted">${G("tab_flights", e)}</span><b>${t.totals.flights}</b></div>
          <div class="card tile"><span class="muted">${G("duration", e)}</span><b>${Re(t.totals.duration_s).replace(/^(\d+) min .*/, "$1 min")}</b></div>
          <div class="card tile"><span class="muted">${G("distance", e)}</span><b>${ze(t.totals.distance_m, e)}</b></div>
        </div>
        <div class="toolbar">
          <button data-metric="flights" aria-pressed=${this.metric === "flights"} @click=${() => this.metric = "flights"}>${G("metric_flights", e)}</button>
          <button data-metric="duration" aria-pressed=${this.metric === "duration"} @click=${() => this.metric = "duration"}>${G("metric_hours", e)}</button>
        </div>
        <div class="card bars">
          ${n.map((t) => B`<div class="col" title=${`${Gs(t.month, e)}: ${a(t)}`}>
              <span class="bar-label">${r(t) ? a(t) : V}</span>
              <div class="bar ${r(t) === 0 ? "empty" : ""}" style="height:${r(t) / i * 120}px"></div>
              <span class="month">${Gs(t.month, e)}</span>
            </div>`)}
        </div>
      </section>
      <section>
        <div class="card" style="margin-bottom:8px"><h3>${G("drones", e)}</h3>
          ${t.drones.map((e) => B`<div class="kv"><span>${e.model} …${e.serial_suffix}</span><b>${e.flights} · ${Re(e.duration_s)}</b></div>`)}
        </div>
      </section>
      <section><dl-battery-history .hass=${this.hass} .drone=${this.drone || void 0} .battery=${this.battery || void 0}></dl-battery-history></section>
      <section><dl-heatmap-view .hass=${this.hass} .tileUrl=${this.tileUrl} .drone=${this.drone || void 0} .battery=${this.battery || void 0}></dl-heatmap-view></section>
    `;
	}
};
customElements.define("dl-stats-view", Qs);
// src/analysis-view.ts
var $s = class extends Me {
	static {
		this.properties = {
			hass: { attribute: !1 },
			tileUrl: { type: String },
			openReport: { type: String },
			section: { state: !0 },
			drone: { state: !0 },
			battery: { state: !0 },
			drones: { state: !0 },
			batteries: { state: !0 },
			report: { state: !0 }
		};
	}
	constructor() {
		super(), this.tileUrl = "", this.section = "stats", this.drone = "", this.battery = "", this.drones = [], this.batteries = [];
	}
	static {
		this.styles = [Zt, h`
      .sub { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
      .sub button[aria-pressed="true"] { background: var(--primary-color); color: var(--text-primary-color, #fff); border-color: var(--primary-color); }
      .toolbar { display: flex; gap: 8px; align-items: center; margin: 0 0 12px; flex-wrap: wrap; }
    `];
	}
	connectedCallback() {
		super.connectedCallback(), this.loadOptions();
	}
	willUpdate(e) {
		e.has("openReport") && this.openReport && (this.report = this.openReport);
	}
	async loadOptions() {
		try {
			let e = new Fe(this.hass), [t, n] = await Promise.all([e.stats(), e.batteries()]);
			this.drones = t.drones, this.batteries = n.batteries;
		} catch {}
	}
	get language() {
		return this.hass?.language ?? "en";
	}
	get batteryOptions() {
		return this.drone ? this.batteries.filter((e) => e.drones.includes(this.drone)) : [];
	}
	get droneLabel() {
		let e = this.drones.find((e) => e.serial === this.drone);
		return e ? `${e.model} …${e.serial_suffix}` : this.drone;
	}
	get batteryLabel() {
		let e = this.batteries.find((e) => e.serial === this.battery);
		return e ? `…${e.suffix}` : this.battery;
	}
	onDrone(e) {
		this.drone = e.target.value, this.battery = "";
	}
	onBattery(e) {
		this.battery = e.target.value;
	}
	closeReport() {
		this.report = void 0, this.openReport = void 0;
	}
	render() {
		let e = this.language;
		if (this.report) return B`<dl-battery-report .hass=${this.hass} .serial=${this.report} @close=${() => this.closeReport()}></dl-battery-report>`;
		let t = [
			{
				id: "stats",
				label: G("sub_stats", e)
			},
			{
				id: "logbook",
				label: G("sub_logbook", e)
			},
			{
				id: "maintenance",
				label: G("sub_maintenance", e)
			}
		];
		return B`
      <div class="sub" role="group" aria-label=${G("tab_stats", e)}>
        ${t.map((e) => B`<button data-section=${e.id} aria-pressed=${this.section === e.id} @click=${() => this.section = e.id}>${e.label}</button>`)}
      </div>
      ${this.section === "maintenance" ? "" : B`<div class="toolbar">
        <select name="drone" aria-label=${G("col_drone", e)} @change=${this.onDrone}>
          <option value="">${G("all_drones", e)}</option>
          ${this.drones.map((e) => B`<option value=${e.serial} ?selected=${e.serial === this.drone}>${e.model} …${e.serial_suffix}</option>`)}
        </select>
        <select name="battery" aria-label=${G("battery", e)} @change=${this.onBattery} ?disabled=${!this.drone}>
          <option value="">${G("all_batteries", e)}</option>
          ${this.batteryOptions.map((e) => B`<option value=${e.serial} ?selected=${e.serial === this.battery}>…${e.suffix}</option>`)}
        </select>
      </div>`}
      ${this.section === "stats" ? B`<dl-stats-view .hass=${this.hass} .tileUrl=${this.tileUrl} .drone=${this.drone} .battery=${this.battery}></dl-stats-view>` : this.section === "logbook" ? B`<dl-logbook-view .hass=${this.hass} .drone=${this.drone} .battery=${this.battery} .droneLabel=${this.droneLabel} .batteryLabel=${this.batteryLabel}></dl-logbook-view>` : B`<dl-maintenance-view .hass=${this.hass}></dl-maintenance-view>`}
    `;
	}
};
customElements.define("dl-analysis-view", $s);
// src/dronelog-panel.ts
var ec = class extends Me {
	static {
		this.properties = {
			hass: { attribute: !1 },
			narrow: { type: Boolean },
			panel: { attribute: !1 },
			tab: { state: !0 },
			jumpId: { state: !0 },
			reportSerial: { state: !0 }
		};
	}
	constructor() {
		super(), this.narrow = !1, this.tab = "flights";
	}
	static {
		this.styles = [Zt, h`
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
		this.jumpId = void 0, this.reportSerial = void 0, this.tab = e;
	}
	onOpenFlight(e) {
		this.jumpId = e.detail, this.tab = "flights";
	}
	onOpenReport(e) {
		this.reportSerial = e.detail, this.tab = "stats";
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
      <main @open-flight=${this.onOpenFlight} @open-battery-report=${this.onOpenReport}>
        ${this.tab === "flights" ? B`<dl-flights-view .hass=${this.hass} .narrow=${this.narrow} .tileUrl=${this.panel?.config?.tile_url ?? ""} .initialId=${this.jumpId}></dl-flights-view>` : B`<dl-analysis-view .hass=${this.hass} .tileUrl=${this.panel?.config?.tile_url ?? ""} .openReport=${this.reportSerial}></dl-analysis-view>`}
      </main>
    `;
	}
};
customElements.define("dronelog-panel", ec);
export { ec as DroneLogPanel };
