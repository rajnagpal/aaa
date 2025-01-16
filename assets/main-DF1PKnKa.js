var e,
	t,
	r = Object.defineProperty,
	__publicField = (e, t, n) =>
		((e, t, n) =>
			t in e
				? r(e, t, {
						enumerable: !0,
						configurable: !0,
						writable: !0,
						value: n
				  })
				: (e[t] = n))(e, 'symbol' != typeof t ? t + '' : t, n),
	n = (function () {
		function AlpineComponent2() {}
		return (
			(AlpineComponent2.prototype.binding = function (e) {
				return e;
			}),
			AlpineComponent2
		);
	})(),
	__spreadArray = function (e, t, r) {
		if (r || 2 === arguments.length)
			for (var n, s = 0, i = t.length; s < i; s++)
				(!n && s in t) ||
					(n || (n = Array.prototype.slice.call(t, 0, s)),
					(n[s] = t[s]));
		return e.concat(n || Array.prototype.slice.call(t));
	},
	s = [
		'abstract',
		'arguments',
		'await',
		'boolean',
		'break',
		'byte',
		'case',
		'catch',
		'char',
		'class',
		'const',
		'continue',
		'debugger',
		'default',
		'delete',
		'do',
		'double',
		'else',
		'enum',
		'eval',
		'export',
		'extends',
		'false',
		'final',
		'finally',
		'float',
		'for',
		'function',
		'goto',
		'if',
		'implements',
		'import',
		'in',
		'instanceof',
		'int',
		'interface',
		'let',
		'long',
		'native',
		'new',
		'null',
		'package',
		'private',
		'protected',
		'public',
		'return',
		'short',
		'static',
		'super',
		'switch',
		'this',
		'throw',
		'throws',
		'transient',
		'true',
		'try',
		'typeof',
		'var',
		'void',
		'volatile',
		'while',
		'with',
		'yield'
	];
((t = e || (e = {}))[(t.GenericMustHaveFunctionAsSecond = 0)] =
	'GenericMustHaveFunctionAsSecond'),
	(t[(t.NameMustBeProvidedForComponentWithNoDefault = 1)] =
		'NameMustBeProvidedForComponentWithNoDefault'),
	(t[(t.UnknownArgumentTypes = 2)] = 'UnknownArgumentTypes'),
	(t[(t.ReservedName = 3)] = 'ReservedName');
var i = (function () {
	function ComponentStore2(e, t, r) {
		void 0 === t && (t = {}), void 0 === r && (r = !1);
		var n = this;
		(this.logErrors = r),
			(this.initialized = !1),
			(this.components = {}),
			(this.alpine = e),
			(this.alpine.Components = this),
			(this.alpine.component = this.component),
			Object.entries(t).forEach(function (e) {
				var t = e[0],
					r = e[1];
				n.register(t, r);
			}),
			window.addEventListener('alpine:init', function () {
				n.init();
			});
	}
	return (
		(ComponentStore2.prototype.init = function () {
			var e = this;
			this.initialized ||
				(document.dispatchEvent(
					new CustomEvent('alpine-components:init')
				),
				Object.entries(this.components).forEach(function (t) {
					var r = t[0];
					return e.registerConstructorAsAlpineData(r);
				}),
				(this.initialized = !0));
		}),
		(ComponentStore2.prototype.component = function (e) {
			return this.components[e];
		}),
		(ComponentStore2.prototype.registerAll = function (e) {
			var t = this;
			Object.entries(e).forEach(function (e) {
				var r = e[0],
					n = e[1];
				return t.register(r, n);
			});
		}),
		(ComponentStore2.prototype.register = function (t, r) {
			var n;
			if ((void 0 === r && (r = ''), 'string' == typeof t)) {
				if ('string' == typeof r)
					return void this.logRegisterFailure(
						e.GenericMustHaveFunctionAsSecond
					);
				n = ComponentStore2.getObjectData(t, r);
			} else {
				if ('function' != typeof t)
					return void this.logRegisterFailure(e.UnknownArgumentTypes);
				'' === (n = ComponentStore2.getClassData(t, r)).name &&
					this.logRegisterFailure(
						e.NameMustBeProvidedForComponentWithNoDefault
					);
			}
			s.includes(n.name) && this.logRegisterFailure(e.ReservedName),
				(this.components[n.name] = n.constructor),
				this.initialized &&
					this.registerConstructorAsAlpineData(n.name);
		}),
		(ComponentStore2.prototype.registerConstructorAsAlpineData = function (
			e
		) {
			this.alpine.data(e, this.component(e));
		}),
		(ComponentStore2.getObjectData = function (e, t) {
			return {
				name: e,
				constructor:
					t.prototype instanceof n ? makeAlpineConstructor(t) : t
			};
		}),
		(ComponentStore2.getClassData = function (e, t) {
			return {
				name: void 0 !== t ? t : e.prototype.name,
				constructor: makeAlpineConstructor(e)
			};
		}),
		(ComponentStore2.prototype.logRegisterFailure = function (t) {
			if (this.logErrors)
				switch (t) {
					case e.GenericMustHaveFunctionAsSecond:
						console.error(
							'Second argument must be a constructor function for component.'
						);
						break;
					case e.NameMustBeProvidedForComponentWithNoDefault:
						console.error(
							"Component name must be provided when class doesn't specify a default."
						);
						break;
					case e.UnknownArgumentTypes:
						console.error(
							'Cannot register component with provided argument types. Check Typescript definitions for usage.'
						);
						break;
					case e.ReservedName:
						console.error(
							'Cannot register component with name matching a reserved keyword.'
						);
				}
		}),
		ComponentStore2
	);
})();
function makeAlpineConstructor(e) {
	return function () {
		for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
		return (function transformToAlpineData(e) {
			for (
				var t = [], r = Object.getPrototypeOf(e);
				'Object' !== r.constructor.name;
				r = Object.getPrototypeOf(r)
			)
				Object.getOwnPropertyNames(r).forEach(function (e) {
					t.includes(e) || t.push(e);
				});
			return __spreadArray(
				__spreadArray([], t, !0),
				Object.getOwnPropertyNames(e),
				!0
			).reduce(function (t, r) {
				return (t[r] = e[r]), t;
			}, {});
		})(new (e.bind.apply(e, __spreadArray([void 0], t, !1)))());
	};
}
const o = {};
var c,
	a,
	__assign = function () {
		return (
			(__assign =
				Object.assign ||
				function (e) {
					for (var t, r = 1, n = arguments.length; r < n; r++)
						for (var s in (t = arguments[r]))
							Object.prototype.hasOwnProperty.call(t, s) &&
								(e[s] = t[s]);
					return e;
				}),
			__assign.apply(this, arguments)
		);
	};
((a = c || (c = {})).defaultOptions = {
	components: {},
	bootstrapAlpine: !1,
	startAlpine: !0,
	logErrors: !1
}),
	(a.bootstrap = function bootstrap(e, t) {
		void 0 === e && (e = a.defaultOptions),
			void 0 === t && (t = window.Alpine);
		var r = __assign(__assign({}, a.defaultOptions), e);
		r.bootstrapAlpine && void 0 !== t
			? r.logErrors &&
			  console.error(
					'Cannot bootstrap Alpine when window.Alpine is already defined.'
			  )
			: Promise.resolve(
					r.bootstrapAlpine
						? (function preload(e, t) {
								let r = Promise.resolve();
								if (t && t.length > 0) {
									document.getElementsByTagName('link');
									const e = document.querySelector(
											'meta[property=csp-nonce]'
										),
										n =
											(null == e ? void 0 : e.nonce) ||
											(null == e
												? void 0
												: e.getAttribute('nonce'));
									r = Promise.allSettled(
										t.map(e => {
											if (
												(e = (function (e) {
													return '/' + e;
												})(e)) in o
											)
												return;
											o[e] = !0;
											const t = e.endsWith('.css'),
												r = t
													? '[rel="stylesheet"]'
													: '';
											if (
												document.querySelector(
													`link[href="${e}"]${r}`
												)
											)
												return;
											const s =
												document.createElement('link');
											return (
												(s.rel = t
													? 'stylesheet'
													: 'modulepreload'),
												t || (s.as = 'script'),
												(s.crossOrigin = ''),
												(s.href = e),
												n && s.setAttribute('nonce', n),
												document.head.appendChild(s),
												t
													? new Promise((t, r) => {
															s.addEventListener(
																'load',
																t
															),
																s.addEventListener(
																	'error',
																	() =>
																		r(
																			new Error(
																				`Unable to preload CSS for ${e}`
																			)
																		)
																);
													  })
													: void 0
											);
										})
									);
								}
								function handlePreloadError(e) {
									const t = new Event('vite:preloadError', {
										cancelable: !0
									});
									if (
										((t.payload = e),
										window.dispatchEvent(t),
										!t.defaultPrevented)
									)
										throw e;
								}
								return r.then(t => {
									for (const e of t || [])
										'rejected' === e.status &&
											handlePreloadError(e.reason);
									return e().catch(handlePreloadError);
								});
						  })(() => import('./module.esm-CS0AbPbs.js'), []).then(
								function (e) {
									return e.default;
								}
						  )
						: t
			  ).then(function (e) {
					r.bootstrapAlpine && (window.Alpine = e),
						(window.AlpineComponents = new i(
							e,
							r.components,
							r.logErrors
						)),
						r.startAlpine && e.start();
			  });
	});
const u = {};
function decode$1(e, t) {
	'string' != typeof t && (t = decode$1.defaultChars);
	const r = (function getDecodeCache(e) {
		let t = u[e];
		if (t) return t;
		t = u[e] = [];
		for (let r = 0; r < 128; r++) {
			const e = String.fromCharCode(r);
			t.push(e);
		}
		for (let r = 0; r < e.length; r++) {
			const n = e.charCodeAt(r);
			t[n] = '%' + ('0' + n.toString(16).toUpperCase()).slice(-2);
		}
		return t;
	})(t);
	return e.replace(/(%[a-f0-9]{2})+/gi, function (e) {
		let t = '';
		for (let n = 0, s = e.length; n < s; n += 3) {
			const i = parseInt(e.slice(n + 1, n + 3), 16);
			if (i < 128) t += r[i];
			else {
				if (192 == (224 & i) && n + 3 < s) {
					const r = parseInt(e.slice(n + 4, n + 6), 16);
					if (128 == (192 & r)) {
						const e = ((i << 6) & 1984) | (63 & r);
						(t += e < 128 ? '��' : String.fromCharCode(e)),
							(n += 3);
						continue;
					}
				}
				if (224 == (240 & i) && n + 6 < s) {
					const r = parseInt(e.slice(n + 4, n + 6), 16),
						s = parseInt(e.slice(n + 7, n + 9), 16);
					if (128 == (192 & r) && 128 == (192 & s)) {
						const e =
							((i << 12) & 61440) | ((r << 6) & 4032) | (63 & s);
						(t +=
							e < 2048 || (e >= 55296 && e <= 57343)
								? '���'
								: String.fromCharCode(e)),
							(n += 6);
						continue;
					}
				}
				if (240 == (248 & i) && n + 9 < s) {
					const r = parseInt(e.slice(n + 4, n + 6), 16),
						s = parseInt(e.slice(n + 7, n + 9), 16),
						o = parseInt(e.slice(n + 10, n + 12), 16);
					if (
						128 == (192 & r) &&
						128 == (192 & s) &&
						128 == (192 & o)
					) {
						let e =
							((i << 18) & 1835008) |
							((r << 12) & 258048) |
							((s << 6) & 4032) |
							(63 & o);
						e < 65536 || e > 1114111
							? (t += '����')
							: ((e -= 65536),
							  (t += String.fromCharCode(
									55296 + (e >> 10),
									56320 + (1023 & e)
							  ))),
							(n += 9);
						continue;
					}
				}
				t += '�';
			}
		}
		return t;
	});
}
(decode$1.defaultChars = ';/?:@&=+$,#'), (decode$1.componentChars = '');
const l = {};
function encode$1(e, t, r) {
	'string' != typeof t && ((r = t), (t = encode$1.defaultChars)),
		void 0 === r && (r = !0);
	const n = (function getEncodeCache(e) {
		let t = l[e];
		if (t) return t;
		t = l[e] = [];
		for (let r = 0; r < 128; r++) {
			const e = String.fromCharCode(r);
			/^[0-9a-z]$/i.test(e)
				? t.push(e)
				: t.push('%' + ('0' + r.toString(16).toUpperCase()).slice(-2));
		}
		for (let r = 0; r < e.length; r++) t[e.charCodeAt(r)] = e[r];
		return t;
	})(t);
	let s = '';
	for (let i = 0, o = e.length; i < o; i++) {
		const t = e.charCodeAt(i);
		if (
			r &&
			37 === t &&
			i + 2 < o &&
			/^[0-9a-f]{2}$/i.test(e.slice(i + 1, i + 3))
		)
			(s += e.slice(i, i + 3)), (i += 2);
		else if (t < 128) s += n[t];
		else if (t >= 55296 && t <= 57343) {
			if (t >= 55296 && t <= 56319 && i + 1 < o) {
				const t = e.charCodeAt(i + 1);
				if (t >= 56320 && t <= 57343) {
					(s += encodeURIComponent(e[i] + e[i + 1])), i++;
					continue;
				}
			}
			s += '%EF%BF%BD';
		} else s += encodeURIComponent(e[i]);
	}
	return s;
}
function format(e) {
	let t = '';
	return (
		(t += e.protocol || ''),
		(t += e.slashes ? '//' : ''),
		(t += e.auth ? e.auth + '@' : ''),
		e.hostname && -1 !== e.hostname.indexOf(':')
			? (t += '[' + e.hostname + ']')
			: (t += e.hostname || ''),
		(t += e.port ? ':' + e.port : ''),
		(t += e.pathname || ''),
		(t += e.search || ''),
		(t += e.hash || ''),
		t
	);
}
function Url() {
	(this.protocol = null),
		(this.slashes = null),
		(this.auth = null),
		(this.port = null),
		(this.hostname = null),
		(this.hash = null),
		(this.search = null),
		(this.pathname = null);
}
(encode$1.defaultChars = ";/?:@&=+$,-_.!~*'()#"),
	(encode$1.componentChars = "-_.!~*'()");
const h = /^([a-z0-9.+-]+:)/i,
	p = /:[0-9]*$/,
	f = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
	d = ['{', '}', '|', '\\', '^', '`'].concat([
		'<',
		'>',
		'"',
		'`',
		' ',
		'\r',
		'\n',
		'\t'
	]),
	m = ["'"].concat(d),
	_ = ['%', '/', '?', ';', '#'].concat(m),
	g = ['/', '?', '#'],
	k = /^[+a-z0-9A-Z_-]{0,63}$/,
	C = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	D = { javascript: !0, 'javascript:': !0 },
	y = {
		http: !0,
		https: !0,
		ftp: !0,
		gopher: !0,
		file: !0,
		'http:': !0,
		'https:': !0,
		'ftp:': !0,
		'gopher:': !0,
		'file:': !0
	};
function urlParse(e, t) {
	if (e && e instanceof Url) return e;
	const r = new Url();
	return r.parse(e, t), r;
}
(Url.prototype.parse = function (e, t) {
	let r,
		n,
		s,
		i = e;
	if (((i = i.trim()), !t && 1 === e.split('#').length)) {
		const e = f.exec(i);
		if (e)
			return (this.pathname = e[1]), e[2] && (this.search = e[2]), this;
	}
	let o = h.exec(i);
	if (
		(o &&
			((o = o[0]),
			(r = o.toLowerCase()),
			(this.protocol = o),
			(i = i.substr(o.length))),
		(t || o || i.match(/^\/\/[^@\/]+@[^@\/]+/)) &&
			((s = '//' === i.substr(0, 2)),
			!s || (o && D[o]) || ((i = i.substr(2)), (this.slashes = !0))),
		!D[o] && (s || (o && !y[o])))
	) {
		let e,
			t,
			r = -1;
		for (let c = 0; c < g.length; c++)
			(n = i.indexOf(g[c])), -1 !== n && (-1 === r || n < r) && (r = n);
		(t = -1 === r ? i.lastIndexOf('@') : i.lastIndexOf('@', r)),
			-1 !== t &&
				((e = i.slice(0, t)), (i = i.slice(t + 1)), (this.auth = e)),
			(r = -1);
		for (let c = 0; c < _.length; c++)
			(n = i.indexOf(_[c])), -1 !== n && (-1 === r || n < r) && (r = n);
		-1 === r && (r = i.length), ':' === i[r - 1] && r--;
		const s = i.slice(0, r);
		(i = i.slice(r)),
			this.parseHost(s),
			(this.hostname = this.hostname || '');
		const o =
			'[' === this.hostname[0] &&
			']' === this.hostname[this.hostname.length - 1];
		if (!o) {
			const e = this.hostname.split(/\./);
			for (let t = 0, r = e.length; t < r; t++) {
				const r = e[t];
				if (r && !r.match(k)) {
					let n = '';
					for (let e = 0, t = r.length; e < t; e++)
						r.charCodeAt(e) > 127 ? (n += 'x') : (n += r[e]);
					if (!n.match(k)) {
						const n = e.slice(0, t),
							s = e.slice(t + 1),
							o = r.match(C);
						o && (n.push(o[1]), s.unshift(o[2])),
							s.length && (i = s.join('.') + i),
							(this.hostname = n.join('.'));
						break;
					}
				}
			}
		}
		this.hostname.length > 255 && (this.hostname = ''),
			o &&
				(this.hostname = this.hostname.substr(
					1,
					this.hostname.length - 2
				));
	}
	const c = i.indexOf('#');
	-1 !== c && ((this.hash = i.substr(c)), (i = i.slice(0, c)));
	const a = i.indexOf('?');
	return (
		-1 !== a && ((this.search = i.substr(a)), (i = i.slice(0, a))),
		i && (this.pathname = i),
		y[r] && this.hostname && !this.pathname && (this.pathname = ''),
		this
	);
}),
	(Url.prototype.parseHost = function (e) {
		let t = p.exec(e);
		t &&
			((t = t[0]),
			':' !== t && (this.port = t.substr(1)),
			(e = e.substr(0, e.length - t.length))),
			e && (this.hostname = e);
	});
const A = Object.freeze(
		Object.defineProperty(
			{
				__proto__: null,
				decode: decode$1,
				encode: encode$1,
				format: format,
				parse: urlParse
			},
			Symbol.toStringTag,
			{ value: 'Module' }
		)
	),
	b =
		/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
	E = /[\0-\x1F\x7F-\x9F]/,
	F =
		/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,
	x =
		/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,
	w = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,
	v = Object.freeze(
		Object.defineProperty(
			{
				__proto__: null,
				Any: b,
				Cc: E,
				Cf: /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,
				P: F,
				S: x,
				Z: w
			},
			Symbol.toStringTag,
			{ value: 'Module' }
		)
	),
	S = new Uint16Array(
		'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'
			.split('')
			.map(e => e.charCodeAt(0))
	),
	L = new Uint16Array(
		'Ȁaglq\tɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢'
			.split('')
			.map(e => e.charCodeAt(0))
	);
var z;
const M = new Map([
		[0, 65533],
		[128, 8364],
		[130, 8218],
		[131, 402],
		[132, 8222],
		[133, 8230],
		[134, 8224],
		[135, 8225],
		[136, 710],
		[137, 8240],
		[138, 352],
		[139, 8249],
		[140, 338],
		[142, 381],
		[145, 8216],
		[146, 8217],
		[147, 8220],
		[148, 8221],
		[149, 8226],
		[150, 8211],
		[151, 8212],
		[152, 732],
		[153, 8482],
		[154, 353],
		[155, 8250],
		[156, 339],
		[158, 382],
		[159, 376]
	]),
	B =
		null !== (z = String.fromCodePoint) && void 0 !== z
			? z
			: function (e) {
					let t = '';
					return (
						e > 65535 &&
							((e -= 65536),
							(t += String.fromCharCode(
								((e >>> 10) & 1023) | 55296
							)),
							(e = 56320 | (1023 & e))),
						(t += String.fromCharCode(e)),
						t
					);
			  };
var I, T;
((T = I || (I = {}))[(T.NUM = 35)] = 'NUM'),
	(T[(T.SEMI = 59)] = 'SEMI'),
	(T[(T.EQUALS = 61)] = 'EQUALS'),
	(T[(T.ZERO = 48)] = 'ZERO'),
	(T[(T.NINE = 57)] = 'NINE'),
	(T[(T.LOWER_A = 97)] = 'LOWER_A'),
	(T[(T.LOWER_F = 102)] = 'LOWER_F'),
	(T[(T.LOWER_X = 120)] = 'LOWER_X'),
	(T[(T.LOWER_Z = 122)] = 'LOWER_Z'),
	(T[(T.UPPER_A = 65)] = 'UPPER_A'),
	(T[(T.UPPER_F = 70)] = 'UPPER_F'),
	(T[(T.UPPER_Z = 90)] = 'UPPER_Z');
var q, P, R, N, O, $;
function isNumber(e) {
	return e >= I.ZERO && e <= I.NINE;
}
function isEntityInAttributeInvalidEnd(e) {
	return (
		e === I.EQUALS ||
		(function isAsciiAlphaNumeric(e) {
			return (
				(e >= I.UPPER_A && e <= I.UPPER_Z) ||
				(e >= I.LOWER_A && e <= I.LOWER_Z) ||
				isNumber(e)
			);
		})(e)
	);
}
((P = q || (q = {}))[(P.VALUE_LENGTH = 49152)] = 'VALUE_LENGTH'),
	(P[(P.BRANCH_LENGTH = 16256)] = 'BRANCH_LENGTH'),
	(P[(P.JUMP_TABLE = 127)] = 'JUMP_TABLE'),
	((N = R || (R = {}))[(N.EntityStart = 0)] = 'EntityStart'),
	(N[(N.NumericStart = 1)] = 'NumericStart'),
	(N[(N.NumericDecimal = 2)] = 'NumericDecimal'),
	(N[(N.NumericHex = 3)] = 'NumericHex'),
	(N[(N.NamedEntity = 4)] = 'NamedEntity'),
	(($ = O || (O = {}))[($.Legacy = 0)] = 'Legacy'),
	($[($.Strict = 1)] = 'Strict'),
	($[($.Attribute = 2)] = 'Attribute');
class EntityDecoder {
	constructor(e, t, r) {
		(this.decodeTree = e),
			(this.emitCodePoint = t),
			(this.errors = r),
			(this.state = R.EntityStart),
			(this.consumed = 1),
			(this.result = 0),
			(this.treeIndex = 0),
			(this.excess = 1),
			(this.decodeMode = O.Strict);
	}
	startEntity(e) {
		(this.decodeMode = e),
			(this.state = R.EntityStart),
			(this.result = 0),
			(this.treeIndex = 0),
			(this.excess = 1),
			(this.consumed = 1);
	}
	write(e, t) {
		switch (this.state) {
			case R.EntityStart:
				return e.charCodeAt(t) === I.NUM
					? ((this.state = R.NumericStart),
					  (this.consumed += 1),
					  this.stateNumericStart(e, t + 1))
					: ((this.state = R.NamedEntity),
					  this.stateNamedEntity(e, t));
			case R.NumericStart:
				return this.stateNumericStart(e, t);
			case R.NumericDecimal:
				return this.stateNumericDecimal(e, t);
			case R.NumericHex:
				return this.stateNumericHex(e, t);
			case R.NamedEntity:
				return this.stateNamedEntity(e, t);
		}
	}
	stateNumericStart(e, t) {
		return t >= e.length
			? -1
			: (32 | e.charCodeAt(t)) === I.LOWER_X
			? ((this.state = R.NumericHex),
			  (this.consumed += 1),
			  this.stateNumericHex(e, t + 1))
			: ((this.state = R.NumericDecimal), this.stateNumericDecimal(e, t));
	}
	addToNumericResult(e, t, r, n) {
		if (t !== r) {
			const s = r - t;
			(this.result =
				this.result * Math.pow(n, s) + parseInt(e.substr(t, s), n)),
				(this.consumed += s);
		}
	}
	stateNumericHex(e, t) {
		const r = t;
		for (; t < e.length; ) {
			const s = e.charCodeAt(t);
			if (
				!(
					isNumber(s) ||
					((n = s),
					(n >= I.UPPER_A && n <= I.UPPER_F) ||
						(n >= I.LOWER_A && n <= I.LOWER_F))
				)
			)
				return (
					this.addToNumericResult(e, r, t, 16),
					this.emitNumericEntity(s, 3)
				);
			t += 1;
		}
		var n;
		return this.addToNumericResult(e, r, t, 16), -1;
	}
	stateNumericDecimal(e, t) {
		const r = t;
		for (; t < e.length; ) {
			const n = e.charCodeAt(t);
			if (!isNumber(n))
				return (
					this.addToNumericResult(e, r, t, 10),
					this.emitNumericEntity(n, 2)
				);
			t += 1;
		}
		return this.addToNumericResult(e, r, t, 10), -1;
	}
	emitNumericEntity(e, t) {
		var r;
		if (this.consumed <= t)
			return (
				null === (r = this.errors) ||
					void 0 === r ||
					r.absenceOfDigitsInNumericCharacterReference(this.consumed),
				0
			);
		if (e === I.SEMI) this.consumed += 1;
		else if (this.decodeMode === O.Strict) return 0;
		return (
			this.emitCodePoint(
				(function replaceCodePoint(e) {
					var t;
					return (e >= 55296 && e <= 57343) || e > 1114111
						? 65533
						: null !== (t = M.get(e)) && void 0 !== t
						? t
						: e;
				})(this.result),
				this.consumed
			),
			this.errors &&
				(e !== I.SEMI &&
					this.errors.missingSemicolonAfterCharacterReference(),
				this.errors.validateNumericCharacterReference(this.result)),
			this.consumed
		);
	}
	stateNamedEntity(e, t) {
		const { decodeTree: r } = this;
		let n = r[this.treeIndex],
			s = (n & q.VALUE_LENGTH) >> 14;
		for (; t < e.length; t++, this.excess++) {
			const i = e.charCodeAt(t);
			if (
				((this.treeIndex = determineBranch(
					r,
					n,
					this.treeIndex + Math.max(1, s),
					i
				)),
				this.treeIndex < 0)
			)
				return 0 === this.result ||
					(this.decodeMode === O.Attribute &&
						(0 === s || isEntityInAttributeInvalidEnd(i)))
					? 0
					: this.emitNotTerminatedNamedEntity();
			if (
				((n = r[this.treeIndex]),
				(s = (n & q.VALUE_LENGTH) >> 14),
				0 !== s)
			) {
				if (i === I.SEMI)
					return this.emitNamedEntityData(
						this.treeIndex,
						s,
						this.consumed + this.excess
					);
				this.decodeMode !== O.Strict &&
					((this.result = this.treeIndex),
					(this.consumed += this.excess),
					(this.excess = 0));
			}
		}
		return -1;
	}
	emitNotTerminatedNamedEntity() {
		var e;
		const { result: t, decodeTree: r } = this,
			n = (r[t] & q.VALUE_LENGTH) >> 14;
		return (
			this.emitNamedEntityData(t, n, this.consumed),
			null === (e = this.errors) ||
				void 0 === e ||
				e.missingSemicolonAfterCharacterReference(),
			this.consumed
		);
	}
	emitNamedEntityData(e, t, r) {
		const { decodeTree: n } = this;
		return (
			this.emitCodePoint(1 === t ? n[e] & ~q.VALUE_LENGTH : n[e + 1], r),
			3 === t && this.emitCodePoint(n[e + 2], r),
			r
		);
	}
	end() {
		var e;
		switch (this.state) {
			case R.NamedEntity:
				return 0 === this.result ||
					(this.decodeMode === O.Attribute &&
						this.result !== this.treeIndex)
					? 0
					: this.emitNotTerminatedNamedEntity();
			case R.NumericDecimal:
				return this.emitNumericEntity(0, 2);
			case R.NumericHex:
				return this.emitNumericEntity(0, 3);
			case R.NumericStart:
				return (
					null === (e = this.errors) ||
						void 0 === e ||
						e.absenceOfDigitsInNumericCharacterReference(
							this.consumed
						),
					0
				);
			case R.EntityStart:
				return 0;
		}
	}
}
function getDecoder(e) {
	let t = '';
	const r = new EntityDecoder(e, e => (t += B(e)));
	return function decodeWithTrie(e, n) {
		let s = 0,
			i = 0;
		for (; (i = e.indexOf('&', i)) >= 0; ) {
			(t += e.slice(s, i)), r.startEntity(n);
			const o = r.write(e, i + 1);
			if (o < 0) {
				s = i + r.end();
				break;
			}
			(s = i + o), (i = 0 === o ? s + 1 : s);
		}
		const o = t + e.slice(s);
		return (t = ''), o;
	};
}
function determineBranch(e, t, r, n) {
	const s = (t & q.BRANCH_LENGTH) >> 7,
		i = t & q.JUMP_TABLE;
	if (0 === s) return 0 !== i && n === i ? r : -1;
	if (i) {
		const t = n - i;
		return t < 0 || t >= s ? -1 : e[r + t] - 1;
	}
	let o = r,
		c = o + s - 1;
	for (; o <= c; ) {
		const t = (o + c) >>> 1,
			r = e[t];
		if (r < n) o = t + 1;
		else {
			if (!(r > n)) return e[t + s];
			c = t - 1;
		}
	}
	return -1;
}
const j = getDecoder(S);
function decodeHTML(e, t = O.Legacy) {
	return j(e, t);
}
function isString$1(e) {
	return (
		'[object String]' ===
		(function _class$1(e) {
			return Object.prototype.toString.call(e);
		})(e)
	);
}
getDecoder(L);
const U = Object.prototype.hasOwnProperty;
function assign$1(e) {
	return (
		Array.prototype.slice.call(arguments, 1).forEach(function (t) {
			if (t) {
				if ('object' != typeof t)
					throw new TypeError(t + 'must be object');
				Object.keys(t).forEach(function (r) {
					e[r] = t[r];
				});
			}
		}),
		e
	);
}
function arrayReplaceAt(e, t, r) {
	return [].concat(e.slice(0, t), r, e.slice(t + 1));
}
function isValidEntityCode(e) {
	return (
		!(e >= 55296 && e <= 57343) &&
		!(e >= 64976 && e <= 65007) &&
		!!(65535 & ~e && 65534 != (65535 & e)) &&
		!(e >= 0 && e <= 8) &&
		11 !== e &&
		!(e >= 14 && e <= 31) &&
		!(e >= 127 && e <= 159) &&
		!(e > 1114111)
	);
}
function fromCodePoint(e) {
	if (e > 65535) {
		const t = 55296 + ((e -= 65536) >> 10),
			r = 56320 + (1023 & e);
		return String.fromCharCode(t, r);
	}
	return String.fromCharCode(e);
}
const H = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,
	Z = new RegExp(H.source + '|' + /&([a-z#][a-z0-9]{1,31});/gi.source, 'gi'),
	V = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function unescapeAll(e) {
	return e.indexOf('\\') < 0 && e.indexOf('&') < 0
		? e
		: e.replace(Z, function (e, t, r) {
				return (
					t ||
					(function replaceEntityPattern(e, t) {
						if (35 === t.charCodeAt(0) && V.test(t)) {
							const r =
								'x' === t[1].toLowerCase()
									? parseInt(t.slice(2), 16)
									: parseInt(t.slice(1), 10);
							return isValidEntityCode(r) ? fromCodePoint(r) : e;
						}
						const r = decodeHTML(e);
						return r !== e ? r : e;
					})(e, r)
				);
		  });
}
const G = /[&<>"]/,
	W = /[&<>"]/g,
	J = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
function replaceUnsafeChar(e) {
	return J[e];
}
function escapeHtml(e) {
	return G.test(e) ? e.replace(W, replaceUnsafeChar) : e;
}
const K = /[.?*+^$[\]\\(){}|-]/g;
function isSpace(e) {
	switch (e) {
		case 9:
		case 32:
			return !0;
	}
	return !1;
}
function isWhiteSpace(e) {
	if (e >= 8192 && e <= 8202) return !0;
	switch (e) {
		case 9:
		case 10:
		case 11:
		case 12:
		case 13:
		case 32:
		case 160:
		case 5760:
		case 8239:
		case 8287:
		case 12288:
			return !0;
	}
	return !1;
}
function isPunctChar(e) {
	return F.test(e) || x.test(e);
}
function isMdAsciiPunct(e) {
	switch (e) {
		case 33:
		case 34:
		case 35:
		case 36:
		case 37:
		case 38:
		case 39:
		case 40:
		case 41:
		case 42:
		case 43:
		case 44:
		case 45:
		case 46:
		case 47:
		case 58:
		case 59:
		case 60:
		case 61:
		case 62:
		case 63:
		case 64:
		case 91:
		case 92:
		case 93:
		case 94:
		case 95:
		case 96:
		case 123:
		case 124:
		case 125:
		case 126:
			return !0;
		default:
			return !1;
	}
}
function normalizeReference(e) {
	return (
		(e = e.trim().replace(/\s+/g, ' ')),
		'Ṿ' === 'ẞ'.toLowerCase() && (e = e.replace(/ẞ/g, 'ß')),
		e.toLowerCase().toUpperCase()
	);
}
const Q = { mdurl: A, ucmicro: v },
	X = Object.freeze(
		Object.defineProperty(
			{
				__proto__: null,
				arrayReplaceAt: arrayReplaceAt,
				assign: assign$1,
				escapeHtml: escapeHtml,
				escapeRE: function escapeRE$1(e) {
					return e.replace(K, '\\$&');
				},
				fromCodePoint: fromCodePoint,
				has: function has(e, t) {
					return U.call(e, t);
				},
				isMdAsciiPunct: isMdAsciiPunct,
				isPunctChar: isPunctChar,
				isSpace: isSpace,
				isString: isString$1,
				isValidEntityCode: isValidEntityCode,
				isWhiteSpace: isWhiteSpace,
				lib: Q,
				normalizeReference: normalizeReference,
				unescapeAll: unescapeAll,
				unescapeMd: function unescapeMd(e) {
					return e.indexOf('\\') < 0 ? e : e.replace(H, '$1');
				}
			},
			Symbol.toStringTag,
			{ value: 'Module' }
		)
	);
const Y = Object.freeze(
		Object.defineProperty(
			{
				__proto__: null,
				parseLinkDestination: function parseLinkDestination(e, t, r) {
					let n,
						s = t;
					const i = { ok: !1, pos: 0, str: '' };
					if (60 === e.charCodeAt(s)) {
						for (s++; s < r; ) {
							if (((n = e.charCodeAt(s)), 10 === n)) return i;
							if (60 === n) return i;
							if (62 === n)
								return (
									(i.pos = s + 1),
									(i.str = unescapeAll(e.slice(t + 1, s))),
									(i.ok = !0),
									i
								);
							92 === n && s + 1 < r ? (s += 2) : s++;
						}
						return i;
					}
					let o = 0;
					for (
						;
						s < r &&
						((n = e.charCodeAt(s)), 32 !== n) &&
						!(n < 32 || 127 === n);

					)
						if (92 === n && s + 1 < r) {
							if (32 === e.charCodeAt(s + 1)) break;
							s += 2;
						} else {
							if (40 === n && (o++, o > 32)) return i;
							if (41 === n) {
								if (0 === o) break;
								o--;
							}
							s++;
						}
					return (
						t === s ||
							0 !== o ||
							((i.str = unescapeAll(e.slice(t, s))),
							(i.pos = s),
							(i.ok = !0)),
						i
					);
				},
				parseLinkLabel: function parseLinkLabel(e, t, r) {
					let n, s, i, o;
					const c = e.posMax,
						a = e.pos;
					for (e.pos = t + 1, n = 1; e.pos < c; ) {
						if (
							((i = e.src.charCodeAt(e.pos)),
							93 === i && (n--, 0 === n))
						) {
							s = !0;
							break;
						}
						if (((o = e.pos), e.md.inline.skipToken(e), 91 === i))
							if (o === e.pos - 1) n++;
							else if (r) return (e.pos = a), -1;
					}
					let u = -1;
					return s && (u = e.pos), (e.pos = a), u;
				},
				parseLinkTitle: function parseLinkTitle(e, t, r, n) {
					let s,
						i = t;
					const o = {
						ok: !1,
						can_continue: !1,
						pos: 0,
						str: '',
						marker: 0
					};
					if (n) (o.str = n.str), (o.marker = n.marker);
					else {
						if (i >= r) return o;
						let n = e.charCodeAt(i);
						if (34 !== n && 39 !== n && 40 !== n) return o;
						t++, i++, 40 === n && (n = 41), (o.marker = n);
					}
					for (; i < r; ) {
						if (((s = e.charCodeAt(i)), s === o.marker))
							return (
								(o.pos = i + 1),
								(o.str += unescapeAll(e.slice(t, i))),
								(o.ok = !0),
								o
							);
						if (40 === s && 41 === o.marker) return o;
						92 === s && i + 1 < r && i++, i++;
					}
					return (
						(o.can_continue = !0),
						(o.str += unescapeAll(e.slice(t, i))),
						o
					);
				}
			},
			Symbol.toStringTag,
			{ value: 'Module' }
		)
	),
	ee = {};
function Renderer() {
	this.rules = assign$1({}, ee);
}
function Ruler() {
	(this.__rules__ = []), (this.__cache__ = null);
}
function Token(e, t, r) {
	(this.type = e),
		(this.tag = t),
		(this.attrs = null),
		(this.map = null),
		(this.nesting = r),
		(this.level = 0),
		(this.children = null),
		(this.content = ''),
		(this.markup = ''),
		(this.info = ''),
		(this.meta = null),
		(this.block = !1),
		(this.hidden = !1);
}
function StateCore(e, t, r) {
	(this.src = e),
		(this.env = r),
		(this.tokens = []),
		(this.inlineMode = !1),
		(this.md = t);
}
(ee.code_inline = function (e, t, r, n, s) {
	const i = e[t];
	return '<code' + s.renderAttrs(i) + '>' + escapeHtml(i.content) + '</code>';
}),
	(ee.code_block = function (e, t, r, n, s) {
		const i = e[t];
		return (
			'<pre' +
			s.renderAttrs(i) +
			'><code>' +
			escapeHtml(e[t].content) +
			'</code></pre>\n'
		);
	}),
	(ee.fence = function (e, t, r, n, s) {
		const i = e[t],
			o = i.info ? unescapeAll(i.info).trim() : '';
		let c,
			a = '',
			u = '';
		if (o) {
			const e = o.split(/(\s+)/g);
			(a = e[0]), (u = e.slice(2).join(''));
		}
		if (
			((c =
				(r.highlight && r.highlight(i.content, a, u)) ||
				escapeHtml(i.content)),
			0 === c.indexOf('<pre'))
		)
			return c + '\n';
		if (o) {
			const e = i.attrIndex('class'),
				t = i.attrs ? i.attrs.slice() : [];
			e < 0
				? t.push(['class', r.langPrefix + a])
				: ((t[e] = t[e].slice()), (t[e][1] += ' ' + r.langPrefix + a));
			const n = { attrs: t };
			return `<pre><code${s.renderAttrs(n)}>${c}</code></pre>\n`;
		}
		return `<pre><code${s.renderAttrs(i)}>${c}</code></pre>\n`;
	}),
	(ee.image = function (e, t, r, n, s) {
		const i = e[t];
		return (
			(i.attrs[i.attrIndex('alt')][1] = s.renderInlineAsText(
				i.children,
				r,
				n
			)),
			s.renderToken(e, t, r)
		);
	}),
	(ee.hardbreak = function (e, t, r) {
		return r.xhtmlOut ? '<br />\n' : '<br>\n';
	}),
	(ee.softbreak = function (e, t, r) {
		return r.breaks ? (r.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
	}),
	(ee.text = function (e, t) {
		return escapeHtml(e[t].content);
	}),
	(ee.html_block = function (e, t) {
		return e[t].content;
	}),
	(ee.html_inline = function (e, t) {
		return e[t].content;
	}),
	(Renderer.prototype.renderAttrs = function renderAttrs(e) {
		let t, r, n;
		if (!e.attrs) return '';
		for (n = '', t = 0, r = e.attrs.length; t < r; t++)
			n +=
				' ' +
				escapeHtml(e.attrs[t][0]) +
				'="' +
				escapeHtml(e.attrs[t][1]) +
				'"';
		return n;
	}),
	(Renderer.prototype.renderToken = function renderToken(e, t, r) {
		const n = e[t];
		let s = '';
		if (n.hidden) return '';
		n.block && -1 !== n.nesting && t && e[t - 1].hidden && (s += '\n'),
			(s += (-1 === n.nesting ? '</' : '<') + n.tag),
			(s += this.renderAttrs(n)),
			0 === n.nesting && r.xhtmlOut && (s += ' /');
		let i = !1;
		if (n.block && ((i = !0), 1 === n.nesting && t + 1 < e.length)) {
			const r = e[t + 1];
			('inline' === r.type ||
				r.hidden ||
				(-1 === r.nesting && r.tag === n.tag)) &&
				(i = !1);
		}
		return (s += i ? '>\n' : '>'), s;
	}),
	(Renderer.prototype.renderInline = function (e, t, r) {
		let n = '';
		const s = this.rules;
		for (let i = 0, o = e.length; i < o; i++) {
			const o = e[i].type;
			void 0 !== s[o]
				? (n += s[o](e, i, t, r, this))
				: (n += this.renderToken(e, i, t));
		}
		return n;
	}),
	(Renderer.prototype.renderInlineAsText = function (e, t, r) {
		let n = '';
		for (let s = 0, i = e.length; s < i; s++)
			switch (e[s].type) {
				case 'text':
				case 'html_inline':
				case 'html_block':
					n += e[s].content;
					break;
				case 'image':
					n += this.renderInlineAsText(e[s].children, t, r);
					break;
				case 'softbreak':
				case 'hardbreak':
					n += '\n';
			}
		return n;
	}),
	(Renderer.prototype.render = function (e, t, r) {
		let n = '';
		const s = this.rules;
		for (let i = 0, o = e.length; i < o; i++) {
			const o = e[i].type;
			'inline' === o
				? (n += this.renderInline(e[i].children, t, r))
				: void 0 !== s[o]
				? (n += s[o](e, i, t, r, this))
				: (n += this.renderToken(e, i, t, r));
		}
		return n;
	}),
	(Ruler.prototype.__find__ = function (e) {
		for (let t = 0; t < this.__rules__.length; t++)
			if (this.__rules__[t].name === e) return t;
		return -1;
	}),
	(Ruler.prototype.__compile__ = function () {
		const e = this,
			t = [''];
		e.__rules__.forEach(function (e) {
			e.enabled &&
				e.alt.forEach(function (e) {
					t.indexOf(e) < 0 && t.push(e);
				});
		}),
			(e.__cache__ = {}),
			t.forEach(function (t) {
				(e.__cache__[t] = []),
					e.__rules__.forEach(function (r) {
						r.enabled &&
							((t && r.alt.indexOf(t) < 0) ||
								e.__cache__[t].push(r.fn));
					});
			});
	}),
	(Ruler.prototype.at = function (e, t, r) {
		const n = this.__find__(e),
			s = r || {};
		if (-1 === n) throw new Error('Parser rule not found: ' + e);
		(this.__rules__[n].fn = t),
			(this.__rules__[n].alt = s.alt || []),
			(this.__cache__ = null);
	}),
	(Ruler.prototype.before = function (e, t, r, n) {
		const s = this.__find__(e),
			i = n || {};
		if (-1 === s) throw new Error('Parser rule not found: ' + e);
		this.__rules__.splice(s, 0, {
			name: t,
			enabled: !0,
			fn: r,
			alt: i.alt || []
		}),
			(this.__cache__ = null);
	}),
	(Ruler.prototype.after = function (e, t, r, n) {
		const s = this.__find__(e),
			i = n || {};
		if (-1 === s) throw new Error('Parser rule not found: ' + e);
		this.__rules__.splice(s + 1, 0, {
			name: t,
			enabled: !0,
			fn: r,
			alt: i.alt || []
		}),
			(this.__cache__ = null);
	}),
	(Ruler.prototype.push = function (e, t, r) {
		const n = r || {};
		this.__rules__.push({ name: e, enabled: !0, fn: t, alt: n.alt || [] }),
			(this.__cache__ = null);
	}),
	(Ruler.prototype.enable = function (e, t) {
		Array.isArray(e) || (e = [e]);
		const r = [];
		return (
			e.forEach(function (e) {
				const n = this.__find__(e);
				if (n < 0) {
					if (t) return;
					throw new Error('Rules manager: invalid rule name ' + e);
				}
				(this.__rules__[n].enabled = !0), r.push(e);
			}, this),
			(this.__cache__ = null),
			r
		);
	}),
	(Ruler.prototype.enableOnly = function (e, t) {
		Array.isArray(e) || (e = [e]),
			this.__rules__.forEach(function (e) {
				e.enabled = !1;
			}),
			this.enable(e, t);
	}),
	(Ruler.prototype.disable = function (e, t) {
		Array.isArray(e) || (e = [e]);
		const r = [];
		return (
			e.forEach(function (e) {
				const n = this.__find__(e);
				if (n < 0) {
					if (t) return;
					throw new Error('Rules manager: invalid rule name ' + e);
				}
				(this.__rules__[n].enabled = !1), r.push(e);
			}, this),
			(this.__cache__ = null),
			r
		);
	}),
	(Ruler.prototype.getRules = function (e) {
		return (
			null === this.__cache__ && this.__compile__(),
			this.__cache__[e] || []
		);
	}),
	(Token.prototype.attrIndex = function attrIndex(e) {
		if (!this.attrs) return -1;
		const t = this.attrs;
		for (let r = 0, n = t.length; r < n; r++) if (t[r][0] === e) return r;
		return -1;
	}),
	(Token.prototype.attrPush = function attrPush(e) {
		this.attrs ? this.attrs.push(e) : (this.attrs = [e]);
	}),
	(Token.prototype.attrSet = function attrSet(e, t) {
		const r = this.attrIndex(e),
			n = [e, t];
		r < 0 ? this.attrPush(n) : (this.attrs[r] = n);
	}),
	(Token.prototype.attrGet = function attrGet(e) {
		const t = this.attrIndex(e);
		let r = null;
		return t >= 0 && (r = this.attrs[t][1]), r;
	}),
	(Token.prototype.attrJoin = function attrJoin(e, t) {
		const r = this.attrIndex(e);
		r < 0
			? this.attrPush([e, t])
			: (this.attrs[r][1] = this.attrs[r][1] + ' ' + t);
	}),
	(StateCore.prototype.Token = Token);
const te = /\r\n?|\n/g,
	re = /\0/g;
function isLinkClose$1(e) {
	return /^<\/a\s*>/i.test(e);
}
const ne = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
	se = /\((c|tm|r)\)/i,
	ie = /\((c|tm|r)\)/gi,
	oe = { c: '©', r: '®', tm: '™' };
function replaceFn(e, t) {
	return oe[t.toLowerCase()];
}
function replace_scoped(e) {
	let t = 0;
	for (let r = e.length - 1; r >= 0; r--) {
		const n = e[r];
		'text' !== n.type ||
			t ||
			(n.content = n.content.replace(ie, replaceFn)),
			'link_open' === n.type && 'auto' === n.info && t--,
			'link_close' === n.type && 'auto' === n.info && t++;
	}
}
function replace_rare(e) {
	let t = 0;
	for (let r = e.length - 1; r >= 0; r--) {
		const n = e[r];
		'text' !== n.type ||
			t ||
			(ne.test(n.content) &&
				(n.content = n.content
					.replace(/\+-/g, '±')
					.replace(/\.{2,}/g, '…')
					.replace(/([?!])…/g, '$1..')
					.replace(/([?!]){4,}/g, '$1$1$1')
					.replace(/,{2,}/g, ',')
					.replace(/(^|[^-])---(?=[^-]|$)/gm, '$1—')
					.replace(/(^|\s)--(?=\s|$)/gm, '$1–')
					.replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, '$1–'))),
			'link_open' === n.type && 'auto' === n.info && t--,
			'link_close' === n.type && 'auto' === n.info && t++;
	}
}
const ce = /['"]/,
	ae = /['"]/g;
function replaceAt(e, t, r) {
	return e.slice(0, t) + r + e.slice(t + 1);
}
function process_inlines(e, t) {
	let r;
	const n = [];
	for (let s = 0; s < e.length; s++) {
		const i = e[s],
			o = e[s].level;
		for (r = n.length - 1; r >= 0 && !(n[r].level <= o); r--);
		if (((n.length = r + 1), 'text' !== i.type)) continue;
		let c = i.content,
			a = 0,
			u = c.length;
		e: for (; a < u; ) {
			ae.lastIndex = a;
			const l = ae.exec(c);
			if (!l) break;
			let h = !0,
				p = !0;
			a = l.index + 1;
			const f = "'" === l[0];
			let d = 32;
			if (l.index - 1 >= 0) d = c.charCodeAt(l.index - 1);
			else
				for (
					r = s - 1;
					r >= 0 &&
					'softbreak' !== e[r].type &&
					'hardbreak' !== e[r].type;
					r--
				)
					if (e[r].content) {
						d = e[r].content.charCodeAt(e[r].content.length - 1);
						break;
					}
			let m = 32;
			if (a < u) m = c.charCodeAt(a);
			else
				for (
					r = s + 1;
					r < e.length &&
					'softbreak' !== e[r].type &&
					'hardbreak' !== e[r].type;
					r++
				)
					if (e[r].content) {
						m = e[r].content.charCodeAt(0);
						break;
					}
			const _ = isMdAsciiPunct(d) || isPunctChar(String.fromCharCode(d)),
				g = isMdAsciiPunct(m) || isPunctChar(String.fromCharCode(m)),
				k = isWhiteSpace(d),
				C = isWhiteSpace(m);
			if (
				(C ? (h = !1) : g && (k || _ || (h = !1)),
				k ? (p = !1) : _ && (C || g || (p = !1)),
				34 === m && '"' === l[0] && d >= 48 && d <= 57 && (p = h = !1),
				h && p && ((h = _), (p = g)),
				h || p)
			) {
				if (p)
					for (r = n.length - 1; r >= 0; r--) {
						let h = n[r];
						if (n[r].level < o) break;
						if (h.single === f && n[r].level === o) {
							let o, p;
							(h = n[r]),
								f
									? ((o = t.md.options.quotes[2]),
									  (p = t.md.options.quotes[3]))
									: ((o = t.md.options.quotes[0]),
									  (p = t.md.options.quotes[1])),
								(i.content = replaceAt(i.content, l.index, p)),
								(e[h.token].content = replaceAt(
									e[h.token].content,
									h.pos,
									o
								)),
								(a += p.length - 1),
								h.token === s && (a += o.length - 1),
								(c = i.content),
								(u = c.length),
								(n.length = r);
							continue e;
						}
					}
				h
					? n.push({ token: s, pos: l.index, single: f, level: o })
					: p &&
					  f &&
					  (i.content = replaceAt(i.content, l.index, '’'));
			} else f && (i.content = replaceAt(i.content, l.index, '’'));
		}
	}
}
const ue = [
	[
		'normalize',
		function normalize(e) {
			let t;
			(t = e.src.replace(te, '\n')),
				(t = t.replace(re, '�')),
				(e.src = t);
		}
	],
	[
		'block',
		function block(e) {
			let t;
			e.inlineMode
				? ((t = new e.Token('inline', '', 0)),
				  (t.content = e.src),
				  (t.map = [0, 1]),
				  (t.children = []),
				  e.tokens.push(t))
				: e.md.block.parse(e.src, e.md, e.env, e.tokens);
		}
	],
	[
		'inline',
		function inline(e) {
			const t = e.tokens;
			for (let r = 0, n = t.length; r < n; r++) {
				const n = t[r];
				'inline' === n.type &&
					e.md.inline.parse(n.content, e.md, e.env, n.children);
			}
		}
	],
	[
		'linkify',
		function linkify$1(e) {
			const t = e.tokens;
			var r;
			if (e.md.options.linkify)
				for (let n = 0, s = t.length; n < s; n++) {
					if (
						'inline' !== t[n].type ||
						!e.md.linkify.pretest(t[n].content)
					)
						continue;
					let s = t[n].children,
						i = 0;
					for (let o = s.length - 1; o >= 0; o--) {
						const c = s[o];
						if ('link_close' !== c.type) {
							if (
								('html_inline' === c.type &&
									((r = c.content),
									/^<a[>\s]/i.test(r) && i > 0 && i--,
									isLinkClose$1(c.content) && i++),
								!(i > 0) &&
									'text' === c.type &&
									e.md.linkify.test(c.content))
							) {
								const r = c.content;
								let i = e.md.linkify.match(r);
								const a = [];
								let u = c.level,
									l = 0;
								i.length > 0 &&
									0 === i[0].index &&
									o > 0 &&
									'text_special' === s[o - 1].type &&
									(i = i.slice(1));
								for (let t = 0; t < i.length; t++) {
									const n = i[t].url,
										s = e.md.normalizeLink(n);
									if (!e.md.validateLink(s)) continue;
									let o = i[t].text;
									o = i[t].schema
										? 'mailto:' !== i[t].schema ||
										  /^mailto:/i.test(o)
											? e.md.normalizeLinkText(o)
											: e.md
													.normalizeLinkText(
														'mailto:' + o
													)
													.replace(/^mailto:/, '')
										: e.md
												.normalizeLinkText(
													'http://' + o
												)
												.replace(/^http:\/\//, '');
									const c = i[t].index;
									if (c > l) {
										const t = new e.Token('text', '', 0);
										(t.content = r.slice(l, c)),
											(t.level = u),
											a.push(t);
									}
									const h = new e.Token('link_open', 'a', 1);
									(h.attrs = [['href', s]]),
										(h.level = u++),
										(h.markup = 'linkify'),
										(h.info = 'auto'),
										a.push(h);
									const p = new e.Token('text', '', 0);
									(p.content = o), (p.level = u), a.push(p);
									const f = new e.Token(
										'link_close',
										'a',
										-1
									);
									(f.level = --u),
										(f.markup = 'linkify'),
										(f.info = 'auto'),
										a.push(f),
										(l = i[t].lastIndex);
								}
								if (l < r.length) {
									const t = new e.Token('text', '', 0);
									(t.content = r.slice(l)),
										(t.level = u),
										a.push(t);
								}
								t[n].children = s = arrayReplaceAt(s, o, a);
							}
						} else
							for (
								o--;
								s[o].level !== c.level &&
								'link_open' !== s[o].type;

							)
								o--;
					}
				}
		}
	],
	[
		'replacements',
		function replace(e) {
			let t;
			if (e.md.options.typographer)
				for (t = e.tokens.length - 1; t >= 0; t--)
					'inline' === e.tokens[t].type &&
						(se.test(e.tokens[t].content) &&
							replace_scoped(e.tokens[t].children),
						ne.test(e.tokens[t].content) &&
							replace_rare(e.tokens[t].children));
		}
	],
	[
		'smartquotes',
		function smartquotes(e) {
			if (e.md.options.typographer)
				for (let t = e.tokens.length - 1; t >= 0; t--)
					'inline' === e.tokens[t].type &&
						ce.test(e.tokens[t].content) &&
						process_inlines(e.tokens[t].children, e);
		}
	],
	[
		'text_join',
		function text_join(e) {
			let t, r;
			const n = e.tokens,
				s = n.length;
			for (let i = 0; i < s; i++) {
				if ('inline' !== n[i].type) continue;
				const e = n[i].children,
					s = e.length;
				for (t = 0; t < s; t++)
					'text_special' === e[t].type && (e[t].type = 'text');
				for (t = r = 0; t < s; t++)
					'text' === e[t].type &&
					t + 1 < s &&
					'text' === e[t + 1].type
						? (e[t + 1].content = e[t].content + e[t + 1].content)
						: (t !== r && (e[r] = e[t]), r++);
				t !== r && (e.length = r);
			}
		}
	]
];
function Core() {
	this.ruler = new Ruler();
	for (let e = 0; e < ue.length; e++) this.ruler.push(ue[e][0], ue[e][1]);
}
function StateBlock(e, t, r, n) {
	(this.src = e),
		(this.md = t),
		(this.env = r),
		(this.tokens = n),
		(this.bMarks = []),
		(this.eMarks = []),
		(this.tShift = []),
		(this.sCount = []),
		(this.bsCount = []),
		(this.blkIndent = 0),
		(this.line = 0),
		(this.lineMax = 0),
		(this.tight = !1),
		(this.ddIndent = -1),
		(this.listIndent = -1),
		(this.parentType = 'root'),
		(this.level = 0);
	const s = this.src;
	for (let i = 0, o = 0, c = 0, a = 0, u = s.length, l = !1; o < u; o++) {
		const e = s.charCodeAt(o);
		if (!l) {
			if (isSpace(e)) {
				c++, 9 === e ? (a += 4 - (a % 4)) : a++;
				continue;
			}
			l = !0;
		}
		(10 !== e && o !== u - 1) ||
			(10 !== e && o++,
			this.bMarks.push(i),
			this.eMarks.push(o),
			this.tShift.push(c),
			this.sCount.push(a),
			this.bsCount.push(0),
			(l = !1),
			(c = 0),
			(a = 0),
			(i = o + 1));
	}
	this.bMarks.push(s.length),
		this.eMarks.push(s.length),
		this.tShift.push(0),
		this.sCount.push(0),
		this.bsCount.push(0),
		(this.lineMax = this.bMarks.length - 1);
}
(Core.prototype.process = function (e) {
	const t = this.ruler.getRules('');
	for (let r = 0, n = t.length; r < n; r++) t[r](e);
}),
	(Core.prototype.State = StateCore),
	(StateBlock.prototype.push = function (e, t, r) {
		const n = new Token(e, t, r);
		return (
			(n.block = !0),
			r < 0 && this.level--,
			(n.level = this.level),
			r > 0 && this.level++,
			this.tokens.push(n),
			n
		);
	}),
	(StateBlock.prototype.isEmpty = function isEmpty(e) {
		return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
	}),
	(StateBlock.prototype.skipEmptyLines = function skipEmptyLines(e) {
		for (
			let t = this.lineMax;
			e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]);
			e++
		);
		return e;
	}),
	(StateBlock.prototype.skipSpaces = function skipSpaces(e) {
		for (let t = this.src.length; e < t; e++) {
			if (!isSpace(this.src.charCodeAt(e))) break;
		}
		return e;
	}),
	(StateBlock.prototype.skipSpacesBack = function skipSpacesBack(e, t) {
		if (e <= t) return e;
		for (; e > t; ) if (!isSpace(this.src.charCodeAt(--e))) return e + 1;
		return e;
	}),
	(StateBlock.prototype.skipChars = function skipChars(e, t) {
		for (
			let r = this.src.length;
			e < r && this.src.charCodeAt(e) === t;
			e++
		);
		return e;
	}),
	(StateBlock.prototype.skipCharsBack = function skipCharsBack(e, t, r) {
		if (e <= r) return e;
		for (; e > r; ) if (t !== this.src.charCodeAt(--e)) return e + 1;
		return e;
	}),
	(StateBlock.prototype.getLines = function getLines(e, t, r, n) {
		if (e >= t) return '';
		const s = new Array(t - e);
		for (let i = 0, o = e; o < t; o++, i++) {
			let e = 0;
			const c = this.bMarks[o];
			let a,
				u = c;
			for (
				a = o + 1 < t || n ? this.eMarks[o] + 1 : this.eMarks[o];
				u < a && e < r;

			) {
				const t = this.src.charCodeAt(u);
				if (isSpace(t))
					9 === t ? (e += 4 - ((e + this.bsCount[o]) % 4)) : e++;
				else {
					if (!(u - c < this.tShift[o])) break;
					e++;
				}
				u++;
			}
			s[i] =
				e > r
					? new Array(e - r + 1).join(' ') + this.src.slice(u, a)
					: this.src.slice(u, a);
		}
		return s.join('');
	}),
	(StateBlock.prototype.Token = Token);
function getLine(e, t) {
	const r = e.bMarks[t] + e.tShift[t],
		n = e.eMarks[t];
	return e.src.slice(r, n);
}
function escapedSplit(e) {
	const t = [],
		r = e.length;
	let n = 0,
		s = e.charCodeAt(n),
		i = !1,
		o = 0,
		c = '';
	for (; n < r; )
		124 === s &&
			(i
				? ((c += e.substring(o, n - 1)), (o = n))
				: (t.push(c + e.substring(o, n)), (c = ''), (o = n + 1))),
			(i = 92 === s),
			n++,
			(s = e.charCodeAt(n));
	return t.push(c + e.substring(o)), t;
}
function skipBulletListMarker(e, t) {
	const r = e.eMarks[t];
	let n = e.bMarks[t] + e.tShift[t];
	const s = e.src.charCodeAt(n++);
	if (42 !== s && 45 !== s && 43 !== s) return -1;
	if (n < r) {
		if (!isSpace(e.src.charCodeAt(n))) return -1;
	}
	return n;
}
function skipOrderedListMarker(e, t) {
	const r = e.bMarks[t] + e.tShift[t],
		n = e.eMarks[t];
	let s = r;
	if (s + 1 >= n) return -1;
	let i = e.src.charCodeAt(s++);
	if (i < 48 || i > 57) return -1;
	for (;;) {
		if (s >= n) return -1;
		if (((i = e.src.charCodeAt(s++)), !(i >= 48 && i <= 57))) {
			if (41 === i || 46 === i) break;
			return -1;
		}
		if (s - r >= 10) return -1;
	}
	return s < n && ((i = e.src.charCodeAt(s)), !isSpace(i)) ? -1 : s;
}
const le =
		'<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"\'=<>`\\x00-\\x20]+|\'[^\']*\'|"[^"]*"))?)*\\s*\\/?>',
	he = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>',
	pe = new RegExp(
		'^(?:' +
			le +
			'|' +
			he +
			'|\x3c!---?>|\x3c!--(?:[^-]|-[^-]|--[^>])*--\x3e|<[?][\\s\\S]*?[?]>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)'
	),
	fe = new RegExp('^(?:' + le + '|' + he + ')'),
	de = [
		[
			/^<(script|pre|style|textarea)(?=(\s|>|$))/i,
			/<\/(script|pre|style|textarea)>/i,
			!0
		],
		[/^<!--/, /-->/, !0],
		[/^<\?/, /\?>/, !0],
		[/^<![A-Z]/, />/, !0],
		[/^<!\[CDATA\[/, /\]\]>/, !0],
		[
			new RegExp(
				'^</?(' +
					[
						'address',
						'article',
						'aside',
						'base',
						'basefont',
						'blockquote',
						'body',
						'caption',
						'center',
						'col',
						'colgroup',
						'dd',
						'details',
						'dialog',
						'dir',
						'div',
						'dl',
						'dt',
						'fieldset',
						'figcaption',
						'figure',
						'footer',
						'form',
						'frame',
						'frameset',
						'h1',
						'h2',
						'h3',
						'h4',
						'h5',
						'h6',
						'head',
						'header',
						'hr',
						'html',
						'iframe',
						'legend',
						'li',
						'link',
						'main',
						'menu',
						'menuitem',
						'nav',
						'noframes',
						'ol',
						'optgroup',
						'option',
						'p',
						'param',
						'search',
						'section',
						'summary',
						'table',
						'tbody',
						'td',
						'tfoot',
						'th',
						'thead',
						'title',
						'tr',
						'track',
						'ul'
					].join('|') +
					')(?=(\\s|/?>|$))',
				'i'
			),
			/^$/,
			!0
		],
		[new RegExp(fe.source + '\\s*$'), /^$/, !1]
	];
const me = [
	[
		'table',
		function table(e, t, r, n) {
			if (t + 2 > r) return !1;
			let s = t + 1;
			if (e.sCount[s] < e.blkIndent) return !1;
			if (e.sCount[s] - e.blkIndent >= 4) return !1;
			let i = e.bMarks[s] + e.tShift[s];
			if (i >= e.eMarks[s]) return !1;
			const o = e.src.charCodeAt(i++);
			if (124 !== o && 45 !== o && 58 !== o) return !1;
			if (i >= e.eMarks[s]) return !1;
			const c = e.src.charCodeAt(i++);
			if (124 !== c && 45 !== c && 58 !== c && !isSpace(c)) return !1;
			if (45 === o && isSpace(c)) return !1;
			for (; i < e.eMarks[s]; ) {
				const t = e.src.charCodeAt(i);
				if (124 !== t && 45 !== t && 58 !== t && !isSpace(t)) return !1;
				i++;
			}
			let a = getLine(e, t + 1),
				u = a.split('|');
			const l = [];
			for (let g = 0; g < u.length; g++) {
				const e = u[g].trim();
				if (!e) {
					if (0 === g || g === u.length - 1) continue;
					return !1;
				}
				if (!/^:?-+:?$/.test(e)) return !1;
				58 === e.charCodeAt(e.length - 1)
					? l.push(58 === e.charCodeAt(0) ? 'center' : 'right')
					: 58 === e.charCodeAt(0)
					? l.push('left')
					: l.push('');
			}
			if (((a = getLine(e, t).trim()), -1 === a.indexOf('|'))) return !1;
			if (e.sCount[t] - e.blkIndent >= 4) return !1;
			(u = escapedSplit(a)),
				u.length && '' === u[0] && u.shift(),
				u.length && '' === u[u.length - 1] && u.pop();
			const h = u.length;
			if (0 === h || h !== l.length) return !1;
			if (n) return !0;
			const p = e.parentType;
			e.parentType = 'table';
			const f = e.md.block.ruler.getRules('blockquote'),
				d = [t, 0];
			(e.push('table_open', 'table', 1).map = d),
				(e.push('thead_open', 'thead', 1).map = [t, t + 1]),
				(e.push('tr_open', 'tr', 1).map = [t, t + 1]);
			for (let g = 0; g < u.length; g++) {
				const t = e.push('th_open', 'th', 1);
				l[g] && (t.attrs = [['style', 'text-align:' + l[g]]]);
				const r = e.push('inline', '', 0);
				(r.content = u[g].trim()),
					(r.children = []),
					e.push('th_close', 'th', -1);
			}
			let m;
			e.push('tr_close', 'tr', -1), e.push('thead_close', 'thead', -1);
			let _ = 0;
			for (s = t + 2; s < r && !(e.sCount[s] < e.blkIndent); s++) {
				let n = !1;
				for (let t = 0, i = f.length; t < i; t++)
					if (f[t](e, s, r, !0)) {
						n = !0;
						break;
					}
				if (n) break;
				if (((a = getLine(e, s).trim()), !a)) break;
				if (e.sCount[s] - e.blkIndent >= 4) break;
				if (
					((u = escapedSplit(a)),
					u.length && '' === u[0] && u.shift(),
					u.length && '' === u[u.length - 1] && u.pop(),
					(_ += h - u.length),
					_ > 65536)
				)
					break;
				if (s === t + 2) {
					e.push('tbody_open', 'tbody', 1).map = m = [t + 2, 0];
				}
				e.push('tr_open', 'tr', 1).map = [s, s + 1];
				for (let t = 0; t < h; t++) {
					const r = e.push('td_open', 'td', 1);
					l[t] && (r.attrs = [['style', 'text-align:' + l[t]]]);
					const n = e.push('inline', '', 0);
					(n.content = u[t] ? u[t].trim() : ''),
						(n.children = []),
						e.push('td_close', 'td', -1);
				}
				e.push('tr_close', 'tr', -1);
			}
			return (
				m && (e.push('tbody_close', 'tbody', -1), (m[1] = s)),
				e.push('table_close', 'table', -1),
				(d[1] = s),
				(e.parentType = p),
				(e.line = s),
				!0
			);
		},
		['paragraph', 'reference']
	],
	[
		'code',
		function code(e, t, r) {
			if (e.sCount[t] - e.blkIndent < 4) return !1;
			let n = t + 1,
				s = n;
			for (; n < r; )
				if (e.isEmpty(n)) n++;
				else {
					if (!(e.sCount[n] - e.blkIndent >= 4)) break;
					n++, (s = n);
				}
			e.line = s;
			const i = e.push('code_block', 'code', 0);
			return (
				(i.content = e.getLines(t, s, 4 + e.blkIndent, !1) + '\n'),
				(i.map = [t, e.line]),
				!0
			);
		}
	],
	[
		'fence',
		function fence(e, t, r, n) {
			let s = e.bMarks[t] + e.tShift[t],
				i = e.eMarks[t];
			if (e.sCount[t] - e.blkIndent >= 4) return !1;
			if (s + 3 > i) return !1;
			const o = e.src.charCodeAt(s);
			if (126 !== o && 96 !== o) return !1;
			let c = s;
			s = e.skipChars(s, o);
			let a = s - c;
			if (a < 3) return !1;
			const u = e.src.slice(c, s),
				l = e.src.slice(s, i);
			if (96 === o && l.indexOf(String.fromCharCode(o)) >= 0) return !1;
			if (n) return !0;
			let h = t,
				p = !1;
			for (
				;
				(h++, !(h >= r)) &&
				((s = c = e.bMarks[h] + e.tShift[h]),
				(i = e.eMarks[h]),
				!(s < i && e.sCount[h] < e.blkIndent));

			)
				if (
					e.src.charCodeAt(s) === o &&
					!(
						e.sCount[h] - e.blkIndent >= 4 ||
						((s = e.skipChars(s, o)),
						s - c < a || ((s = e.skipSpaces(s)), s < i))
					)
				) {
					p = !0;
					break;
				}
			(a = e.sCount[t]), (e.line = h + (p ? 1 : 0));
			const f = e.push('fence', 'code', 0);
			return (
				(f.info = l),
				(f.content = e.getLines(t + 1, h, a, !0)),
				(f.markup = u),
				(f.map = [t, e.line]),
				!0
			);
		},
		['paragraph', 'reference', 'blockquote', 'list']
	],
	[
		'blockquote',
		function blockquote(e, t, r, n) {
			let s = e.bMarks[t] + e.tShift[t],
				i = e.eMarks[t];
			const o = e.lineMax;
			if (e.sCount[t] - e.blkIndent >= 4) return !1;
			if (62 !== e.src.charCodeAt(s)) return !1;
			if (n) return !0;
			const c = [],
				a = [],
				u = [],
				l = [],
				h = e.md.block.ruler.getRules('blockquote'),
				p = e.parentType;
			e.parentType = 'blockquote';
			let f,
				d = !1;
			for (f = t; f < r; f++) {
				const t = e.sCount[f] < e.blkIndent;
				if (
					((s = e.bMarks[f] + e.tShift[f]), (i = e.eMarks[f]), s >= i)
				)
					break;
				if (62 === e.src.charCodeAt(s++) && !t) {
					let t,
						r,
						n = e.sCount[f] + 1;
					32 === e.src.charCodeAt(s)
						? (s++, n++, (r = !1), (t = !0))
						: 9 === e.src.charCodeAt(s)
						? ((t = !0),
						  (e.bsCount[f] + n) % 4 == 3
								? (s++, n++, (r = !1))
								: (r = !0))
						: (t = !1);
					let o = n;
					for (c.push(e.bMarks[f]), e.bMarks[f] = s; s < i; ) {
						const t = e.src.charCodeAt(s);
						if (!isSpace(t)) break;
						9 === t
							? (o += 4 - ((o + e.bsCount[f] + (r ? 1 : 0)) % 4))
							: o++,
							s++;
					}
					(d = s >= i),
						a.push(e.bsCount[f]),
						(e.bsCount[f] = e.sCount[f] + 1 + (t ? 1 : 0)),
						u.push(e.sCount[f]),
						(e.sCount[f] = o - n),
						l.push(e.tShift[f]),
						(e.tShift[f] = s - e.bMarks[f]);
					continue;
				}
				if (d) break;
				let n = !1;
				for (let s = 0, i = h.length; s < i; s++)
					if (h[s](e, f, r, !0)) {
						n = !0;
						break;
					}
				if (n) {
					(e.lineMax = f),
						0 !== e.blkIndent &&
							(c.push(e.bMarks[f]),
							a.push(e.bsCount[f]),
							l.push(e.tShift[f]),
							u.push(e.sCount[f]),
							(e.sCount[f] -= e.blkIndent));
					break;
				}
				c.push(e.bMarks[f]),
					a.push(e.bsCount[f]),
					l.push(e.tShift[f]),
					u.push(e.sCount[f]),
					(e.sCount[f] = -1);
			}
			const m = e.blkIndent;
			e.blkIndent = 0;
			const _ = e.push('blockquote_open', 'blockquote', 1);
			_.markup = '>';
			const g = [t, 0];
			(_.map = g),
				e.md.block.tokenize(e, t, f),
				(e.push('blockquote_close', 'blockquote', -1).markup = '>'),
				(e.lineMax = o),
				(e.parentType = p),
				(g[1] = e.line);
			for (let k = 0; k < l.length; k++)
				(e.bMarks[k + t] = c[k]),
					(e.tShift[k + t] = l[k]),
					(e.sCount[k + t] = u[k]),
					(e.bsCount[k + t] = a[k]);
			return (e.blkIndent = m), !0;
		},
		['paragraph', 'reference', 'blockquote', 'list']
	],
	[
		'hr',
		function hr(e, t, r, n) {
			const s = e.eMarks[t];
			if (e.sCount[t] - e.blkIndent >= 4) return !1;
			let i = e.bMarks[t] + e.tShift[t];
			const o = e.src.charCodeAt(i++);
			if (42 !== o && 45 !== o && 95 !== o) return !1;
			let c = 1;
			for (; i < s; ) {
				const t = e.src.charCodeAt(i++);
				if (t !== o && !isSpace(t)) return !1;
				t === o && c++;
			}
			if (c < 3) return !1;
			if (n) return !0;
			e.line = t + 1;
			const a = e.push('hr', 'hr', 0);
			return (
				(a.map = [t, e.line]),
				(a.markup = Array(c + 1).join(String.fromCharCode(o))),
				!0
			);
		},
		['paragraph', 'reference', 'blockquote', 'list']
	],
	[
		'list',
		function list(e, t, r, n) {
			let s,
				i,
				o,
				c,
				a = t,
				u = !0;
			if (e.sCount[a] - e.blkIndent >= 4) return !1;
			if (
				e.listIndent >= 0 &&
				e.sCount[a] - e.listIndent >= 4 &&
				e.sCount[a] < e.blkIndent
			)
				return !1;
			let l,
				h,
				p,
				f = !1;
			if (
				(n &&
					'paragraph' === e.parentType &&
					e.sCount[a] >= e.blkIndent &&
					(f = !0),
				(p = skipOrderedListMarker(e, a)) >= 0)
			) {
				if (
					((l = !0),
					(o = e.bMarks[a] + e.tShift[a]),
					(h = Number(e.src.slice(o, p - 1))),
					f && 1 !== h)
				)
					return !1;
			} else {
				if (!((p = skipBulletListMarker(e, a)) >= 0)) return !1;
				l = !1;
			}
			if (f && e.skipSpaces(p) >= e.eMarks[a]) return !1;
			if (n) return !0;
			const d = e.src.charCodeAt(p - 1),
				m = e.tokens.length;
			l
				? ((c = e.push('ordered_list_open', 'ol', 1)),
				  1 !== h && (c.attrs = [['start', h]]))
				: (c = e.push('bullet_list_open', 'ul', 1));
			const _ = [a, 0];
			(c.map = _), (c.markup = String.fromCharCode(d));
			let g = !1;
			const k = e.md.block.ruler.getRules('list'),
				C = e.parentType;
			for (e.parentType = 'list'; a < r; ) {
				(i = p), (s = e.eMarks[a]);
				const t = e.sCount[a] + p - (e.bMarks[a] + e.tShift[a]);
				let n = t;
				for (; i < s; ) {
					const t = e.src.charCodeAt(i);
					if (9 === t) n += 4 - ((n + e.bsCount[a]) % 4);
					else {
						if (32 !== t) break;
						n++;
					}
					i++;
				}
				const h = i;
				let f;
				(f = h >= s ? 1 : n - t), f > 4 && (f = 1);
				const m = t + f;
				(c = e.push('list_item_open', 'li', 1)),
					(c.markup = String.fromCharCode(d));
				const _ = [a, 0];
				(c.map = _), l && (c.info = e.src.slice(o, p - 1));
				const C = e.tight,
					D = e.tShift[a],
					y = e.sCount[a],
					A = e.listIndent;
				if (
					((e.listIndent = e.blkIndent),
					(e.blkIndent = m),
					(e.tight = !0),
					(e.tShift[a] = h - e.bMarks[a]),
					(e.sCount[a] = n),
					h >= s && e.isEmpty(a + 1)
						? (e.line = Math.min(e.line + 2, r))
						: e.md.block.tokenize(e, a, r, !0),
					(e.tight && !g) || (u = !1),
					(g = e.line - a > 1 && e.isEmpty(e.line - 1)),
					(e.blkIndent = e.listIndent),
					(e.listIndent = A),
					(e.tShift[a] = D),
					(e.sCount[a] = y),
					(e.tight = C),
					(c = e.push('list_item_close', 'li', -1)),
					(c.markup = String.fromCharCode(d)),
					(a = e.line),
					(_[1] = a),
					a >= r)
				)
					break;
				if (e.sCount[a] < e.blkIndent) break;
				if (e.sCount[a] - e.blkIndent >= 4) break;
				let b = !1;
				for (let s = 0, i = k.length; s < i; s++)
					if (k[s](e, a, r, !0)) {
						b = !0;
						break;
					}
				if (b) break;
				if (l) {
					if (((p = skipOrderedListMarker(e, a)), p < 0)) break;
					o = e.bMarks[a] + e.tShift[a];
				} else if (((p = skipBulletListMarker(e, a)), p < 0)) break;
				if (d !== e.src.charCodeAt(p - 1)) break;
			}
			return (
				(c = l
					? e.push('ordered_list_close', 'ol', -1)
					: e.push('bullet_list_close', 'ul', -1)),
				(c.markup = String.fromCharCode(d)),
				(_[1] = a),
				(e.line = a),
				(e.parentType = C),
				u &&
					(function markTightParagraphs(e, t) {
						const r = e.level + 2;
						for (let n = t + 2, s = e.tokens.length - 2; n < s; n++)
							e.tokens[n].level === r &&
								'paragraph_open' === e.tokens[n].type &&
								((e.tokens[n + 2].hidden = !0),
								(e.tokens[n].hidden = !0),
								(n += 2));
					})(e, m),
				!0
			);
		},
		['paragraph', 'reference', 'blockquote']
	],
	[
		'reference',
		function reference(e, t, r, n) {
			let s = e.bMarks[t] + e.tShift[t],
				i = e.eMarks[t],
				o = t + 1;
			if (e.sCount[t] - e.blkIndent >= 4) return !1;
			if (91 !== e.src.charCodeAt(s)) return !1;
			function getNextLine(t) {
				const r = e.lineMax;
				if (t >= r || e.isEmpty(t)) return null;
				let n = !1;
				if (
					(e.sCount[t] - e.blkIndent > 3 && (n = !0),
					e.sCount[t] < 0 && (n = !0),
					!n)
				) {
					const n = e.md.block.ruler.getRules('reference'),
						s = e.parentType;
					e.parentType = 'reference';
					let i = !1;
					for (let o = 0, c = n.length; o < c; o++)
						if (n[o](e, t, r, !0)) {
							i = !0;
							break;
						}
					if (((e.parentType = s), i)) return null;
				}
				const s = e.bMarks[t] + e.tShift[t],
					i = e.eMarks[t];
				return e.src.slice(s, i + 1);
			}
			let c = e.src.slice(s, i + 1);
			i = c.length;
			let a = -1;
			for (s = 1; s < i; s++) {
				const e = c.charCodeAt(s);
				if (91 === e) return !1;
				if (93 === e) {
					a = s;
					break;
				}
				if (10 === e) {
					const e = getNextLine(o);
					null !== e && ((c += e), (i = c.length), o++);
				} else if (92 === e && (s++, s < i && 10 === c.charCodeAt(s))) {
					const e = getNextLine(o);
					null !== e && ((c += e), (i = c.length), o++);
				}
			}
			if (a < 0 || 58 !== c.charCodeAt(a + 1)) return !1;
			for (s = a + 2; s < i; s++) {
				const e = c.charCodeAt(s);
				if (10 === e) {
					const e = getNextLine(o);
					null !== e && ((c += e), (i = c.length), o++);
				} else if (!isSpace(e)) break;
			}
			const u = e.md.helpers.parseLinkDestination(c, s, i);
			if (!u.ok) return !1;
			const l = e.md.normalizeLink(u.str);
			if (!e.md.validateLink(l)) return !1;
			s = u.pos;
			const h = s,
				p = o,
				f = s;
			for (; s < i; s++) {
				const e = c.charCodeAt(s);
				if (10 === e) {
					const e = getNextLine(o);
					null !== e && ((c += e), (i = c.length), o++);
				} else if (!isSpace(e)) break;
			}
			let d,
				m = e.md.helpers.parseLinkTitle(c, s, i);
			for (; m.can_continue; ) {
				const t = getNextLine(o);
				if (null === t) break;
				(c += t),
					(s = i),
					(i = c.length),
					o++,
					(m = e.md.helpers.parseLinkTitle(c, s, i, m));
			}
			for (
				s < i && f !== s && m.ok
					? ((d = m.str), (s = m.pos))
					: ((d = ''), (s = h), (o = p));
				s < i;

			) {
				if (!isSpace(c.charCodeAt(s))) break;
				s++;
			}
			if (s < i && 10 !== c.charCodeAt(s) && d)
				for (d = '', s = h, o = p; s < i; ) {
					if (!isSpace(c.charCodeAt(s))) break;
					s++;
				}
			if (s < i && 10 !== c.charCodeAt(s)) return !1;
			const _ = normalizeReference(c.slice(1, a));
			return (
				!!_ &&
				(n ||
					(void 0 === e.env.references && (e.env.references = {}),
					void 0 === e.env.references[_] &&
						(e.env.references[_] = { title: d, href: l }),
					(e.line = o)),
				!0)
			);
		}
	],
	[
		'html_block',
		function html_block(e, t, r, n) {
			let s = e.bMarks[t] + e.tShift[t],
				i = e.eMarks[t];
			if (e.sCount[t] - e.blkIndent >= 4) return !1;
			if (!e.md.options.html) return !1;
			if (60 !== e.src.charCodeAt(s)) return !1;
			let o = e.src.slice(s, i),
				c = 0;
			for (; c < de.length && !de[c][0].test(o); c++);
			if (c === de.length) return !1;
			if (n) return de[c][2];
			let a = t + 1;
			if (!de[c][1].test(o))
				for (; a < r && !(e.sCount[a] < e.blkIndent); a++)
					if (
						((s = e.bMarks[a] + e.tShift[a]),
						(i = e.eMarks[a]),
						(o = e.src.slice(s, i)),
						de[c][1].test(o))
					) {
						0 !== o.length && a++;
						break;
					}
			e.line = a;
			const u = e.push('html_block', '', 0);
			return (
				(u.map = [t, a]),
				(u.content = e.getLines(t, a, e.blkIndent, !0)),
				!0
			);
		},
		['paragraph', 'reference', 'blockquote']
	],
	[
		'heading',
		function heading(e, t, r, n) {
			let s = e.bMarks[t] + e.tShift[t],
				i = e.eMarks[t];
			if (e.sCount[t] - e.blkIndent >= 4) return !1;
			let o = e.src.charCodeAt(s);
			if (35 !== o || s >= i) return !1;
			let c = 1;
			for (o = e.src.charCodeAt(++s); 35 === o && s < i && c <= 6; )
				c++, (o = e.src.charCodeAt(++s));
			if (c > 6 || (s < i && !isSpace(o))) return !1;
			if (n) return !0;
			i = e.skipSpacesBack(i, s);
			const a = e.skipCharsBack(i, 35, s);
			a > s && isSpace(e.src.charCodeAt(a - 1)) && (i = a),
				(e.line = t + 1);
			const u = e.push('heading_open', 'h' + String(c), 1);
			(u.markup = '########'.slice(0, c)), (u.map = [t, e.line]);
			const l = e.push('inline', '', 0);
			return (
				(l.content = e.src.slice(s, i).trim()),
				(l.map = [t, e.line]),
				(l.children = []),
				(e.push('heading_close', 'h' + String(c), -1).markup =
					'########'.slice(0, c)),
				!0
			);
		},
		['paragraph', 'reference', 'blockquote']
	],
	[
		'lheading',
		function lheading(e, t, r) {
			const n = e.md.block.ruler.getRules('paragraph');
			if (e.sCount[t] - e.blkIndent >= 4) return !1;
			const s = e.parentType;
			e.parentType = 'paragraph';
			let i,
				o = 0,
				c = t + 1;
			for (; c < r && !e.isEmpty(c); c++) {
				if (e.sCount[c] - e.blkIndent > 3) continue;
				if (e.sCount[c] >= e.blkIndent) {
					let t = e.bMarks[c] + e.tShift[c];
					const r = e.eMarks[c];
					if (
						t < r &&
						((i = e.src.charCodeAt(t)),
						(45 === i || 61 === i) &&
							((t = e.skipChars(t, i)),
							(t = e.skipSpaces(t)),
							t >= r))
					) {
						o = 61 === i ? 1 : 2;
						break;
					}
				}
				if (e.sCount[c] < 0) continue;
				let t = !1;
				for (let s = 0, i = n.length; s < i; s++)
					if (n[s](e, c, r, !0)) {
						t = !0;
						break;
					}
				if (t) break;
			}
			if (!o) return !1;
			const a = e.getLines(t, c, e.blkIndent, !1).trim();
			e.line = c + 1;
			const u = e.push('heading_open', 'h' + String(o), 1);
			(u.markup = String.fromCharCode(i)), (u.map = [t, e.line]);
			const l = e.push('inline', '', 0);
			return (
				(l.content = a),
				(l.map = [t, e.line - 1]),
				(l.children = []),
				(e.push('heading_close', 'h' + String(o), -1).markup =
					String.fromCharCode(i)),
				(e.parentType = s),
				!0
			);
		}
	],
	[
		'paragraph',
		function paragraph(e, t, r) {
			const n = e.md.block.ruler.getRules('paragraph'),
				s = e.parentType;
			let i = t + 1;
			for (e.parentType = 'paragraph'; i < r && !e.isEmpty(i); i++) {
				if (e.sCount[i] - e.blkIndent > 3) continue;
				if (e.sCount[i] < 0) continue;
				let t = !1;
				for (let s = 0, o = n.length; s < o; s++)
					if (n[s](e, i, r, !0)) {
						t = !0;
						break;
					}
				if (t) break;
			}
			const o = e.getLines(t, i, e.blkIndent, !1).trim();
			(e.line = i), (e.push('paragraph_open', 'p', 1).map = [t, e.line]);
			const c = e.push('inline', '', 0);
			return (
				(c.content = o),
				(c.map = [t, e.line]),
				(c.children = []),
				e.push('paragraph_close', 'p', -1),
				(e.parentType = s),
				!0
			);
		}
	]
];
function ParserBlock() {
	this.ruler = new Ruler();
	for (let e = 0; e < me.length; e++)
		this.ruler.push(me[e][0], me[e][1], { alt: (me[e][2] || []).slice() });
}
function StateInline(e, t, r, n) {
	(this.src = e),
		(this.env = r),
		(this.md = t),
		(this.tokens = n),
		(this.tokens_meta = Array(n.length)),
		(this.pos = 0),
		(this.posMax = this.src.length),
		(this.level = 0),
		(this.pending = ''),
		(this.pendingLevel = 0),
		(this.cache = {}),
		(this.delimiters = []),
		(this._prev_delimiters = []),
		(this.backticks = {}),
		(this.backticksScanned = !1),
		(this.linkLevel = 0);
}
function isTerminatorChar(e) {
	switch (e) {
		case 10:
		case 33:
		case 35:
		case 36:
		case 37:
		case 38:
		case 42:
		case 43:
		case 45:
		case 58:
		case 60:
		case 61:
		case 62:
		case 64:
		case 91:
		case 92:
		case 93:
		case 94:
		case 95:
		case 96:
		case 123:
		case 125:
		case 126:
			return !0;
		default:
			return !1;
	}
}
(ParserBlock.prototype.tokenize = function (e, t, r) {
	const n = this.ruler.getRules(''),
		s = n.length,
		i = e.md.options.maxNesting;
	let o = t,
		c = !1;
	for (
		;
		o < r &&
		((e.line = o = e.skipEmptyLines(o)), !(o >= r)) &&
		!(e.sCount[o] < e.blkIndent);

	) {
		if (e.level >= i) {
			e.line = r;
			break;
		}
		const t = e.line;
		let a = !1;
		for (let i = 0; i < s; i++)
			if (((a = n[i](e, o, r, !1)), a)) {
				if (t >= e.line)
					throw new Error("block rule didn't increment state.line");
				break;
			}
		if (!a) throw new Error('none of the block rules matched');
		(e.tight = !c),
			e.isEmpty(e.line - 1) && (c = !0),
			(o = e.line),
			o < r && e.isEmpty(o) && ((c = !0), o++, (e.line = o));
	}
}),
	(ParserBlock.prototype.parse = function (e, t, r, n) {
		if (!e) return;
		const s = new this.State(e, t, r, n);
		this.tokenize(s, s.line, s.lineMax);
	}),
	(ParserBlock.prototype.State = StateBlock),
	(StateInline.prototype.pushPending = function () {
		const e = new Token('text', '', 0);
		return (
			(e.content = this.pending),
			(e.level = this.pendingLevel),
			this.tokens.push(e),
			(this.pending = ''),
			e
		);
	}),
	(StateInline.prototype.push = function (e, t, r) {
		this.pending && this.pushPending();
		const n = new Token(e, t, r);
		let s = null;
		return (
			r < 0 &&
				(this.level--, (this.delimiters = this._prev_delimiters.pop())),
			(n.level = this.level),
			r > 0 &&
				(this.level++,
				this._prev_delimiters.push(this.delimiters),
				(this.delimiters = []),
				(s = { delimiters: this.delimiters })),
			(this.pendingLevel = this.level),
			this.tokens.push(n),
			this.tokens_meta.push(s),
			n
		);
	}),
	(StateInline.prototype.scanDelims = function (e, t) {
		const r = this.posMax,
			n = this.src.charCodeAt(e),
			s = e > 0 ? this.src.charCodeAt(e - 1) : 32;
		let i = e;
		for (; i < r && this.src.charCodeAt(i) === n; ) i++;
		const o = i - e,
			c = i < r ? this.src.charCodeAt(i) : 32,
			a = isMdAsciiPunct(s) || isPunctChar(String.fromCharCode(s)),
			u = isMdAsciiPunct(c) || isPunctChar(String.fromCharCode(c)),
			l = isWhiteSpace(s),
			h = isWhiteSpace(c),
			p = !h && (!u || l || a),
			f = !l && (!a || h || u);
		return {
			can_open: p && (t || !f || a),
			can_close: f && (t || !p || u),
			length: o
		};
	}),
	(StateInline.prototype.Token = Token);
const _e = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
const ge = [];
for (let je = 0; je < 256; je++) ge.push(0);
function postProcess$1(e, t) {
	let r;
	const n = [],
		s = t.length;
	for (let i = 0; i < s; i++) {
		const s = t[i];
		if (126 !== s.marker) continue;
		if (-1 === s.end) continue;
		const o = t[s.end];
		(r = e.tokens[s.token]),
			(r.type = 's_open'),
			(r.tag = 's'),
			(r.nesting = 1),
			(r.markup = '~~'),
			(r.content = ''),
			(r = e.tokens[o.token]),
			(r.type = 's_close'),
			(r.tag = 's'),
			(r.nesting = -1),
			(r.markup = '~~'),
			(r.content = ''),
			'text' === e.tokens[o.token - 1].type &&
				'~' === e.tokens[o.token - 1].content &&
				n.push(o.token - 1);
	}
	for (; n.length; ) {
		const t = n.pop();
		let s = t + 1;
		for (; s < e.tokens.length && 's_close' === e.tokens[s].type; ) s++;
		s--,
			t !== s &&
				((r = e.tokens[s]),
				(e.tokens[s] = e.tokens[t]),
				(e.tokens[t] = r));
	}
}
'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'.split('').forEach(function (e) {
	ge[e.charCodeAt(0)] = 1;
});
const ke = {
	tokenize: function strikethrough_tokenize(e, t) {
		const r = e.pos,
			n = e.src.charCodeAt(r);
		if (t) return !1;
		if (126 !== n) return !1;
		const s = e.scanDelims(e.pos, !0);
		let i = s.length;
		const o = String.fromCharCode(n);
		if (i < 2) return !1;
		let c;
		i % 2 && ((c = e.push('text', '', 0)), (c.content = o), i--);
		for (let a = 0; a < i; a += 2)
			(c = e.push('text', '', 0)),
				(c.content = o + o),
				e.delimiters.push({
					marker: n,
					length: 0,
					token: e.tokens.length - 1,
					end: -1,
					open: s.can_open,
					close: s.can_close
				});
		return (e.pos += s.length), !0;
	},
	postProcess: function strikethrough_postProcess(e) {
		const t = e.tokens_meta,
			r = e.tokens_meta.length;
		postProcess$1(e, e.delimiters);
		for (let n = 0; n < r; n++)
			t[n] && t[n].delimiters && postProcess$1(e, t[n].delimiters);
	}
};
function postProcess(e, t) {
	for (let r = t.length - 1; r >= 0; r--) {
		const n = t[r];
		if (95 !== n.marker && 42 !== n.marker) continue;
		if (-1 === n.end) continue;
		const s = t[n.end],
			i =
				r > 0 &&
				t[r - 1].end === n.end + 1 &&
				t[r - 1].marker === n.marker &&
				t[r - 1].token === n.token - 1 &&
				t[n.end + 1].token === s.token + 1,
			o = String.fromCharCode(n.marker),
			c = e.tokens[n.token];
		(c.type = i ? 'strong_open' : 'em_open'),
			(c.tag = i ? 'strong' : 'em'),
			(c.nesting = 1),
			(c.markup = i ? o + o : o),
			(c.content = '');
		const a = e.tokens[s.token];
		(a.type = i ? 'strong_close' : 'em_close'),
			(a.tag = i ? 'strong' : 'em'),
			(a.nesting = -1),
			(a.markup = i ? o + o : o),
			(a.content = ''),
			i &&
				((e.tokens[t[r - 1].token].content = ''),
				(e.tokens[t[n.end + 1].token].content = ''),
				r--);
	}
}
const Ce = {
	tokenize: function emphasis_tokenize(e, t) {
		const r = e.pos,
			n = e.src.charCodeAt(r);
		if (t) return !1;
		if (95 !== n && 42 !== n) return !1;
		const s = e.scanDelims(e.pos, 42 === n);
		for (let i = 0; i < s.length; i++) {
			(e.push('text', '', 0).content = String.fromCharCode(n)),
				e.delimiters.push({
					marker: n,
					length: s.length,
					token: e.tokens.length - 1,
					end: -1,
					open: s.can_open,
					close: s.can_close
				});
		}
		return (e.pos += s.length), !0;
	},
	postProcess: function emphasis_post_process(e) {
		const t = e.tokens_meta,
			r = e.tokens_meta.length;
		postProcess(e, e.delimiters);
		for (let n = 0; n < r; n++)
			t[n] && t[n].delimiters && postProcess(e, t[n].delimiters);
	}
};
const De =
		/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,
	ye = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
const Ae = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,
	be = /^&([a-z][a-z0-9]{1,31});/i;
function processDelimiters(e) {
	const t = {},
		r = e.length;
	if (!r) return;
	let n = 0,
		s = -2;
	const i = [];
	for (let o = 0; o < r; o++) {
		const r = e[o];
		if (
			(i.push(0),
			(e[n].marker === r.marker && s === r.token - 1) || (n = o),
			(s = r.token),
			(r.length = r.length || 0),
			!r.close)
		)
			continue;
		t.hasOwnProperty(r.marker) || (t[r.marker] = [-1, -1, -1, -1, -1, -1]);
		const c = t[r.marker][(r.open ? 3 : 0) + (r.length % 3)];
		let a = n - i[n] - 1,
			u = a;
		for (; a > c; a -= i[a] + 1) {
			const t = e[a];
			if (t.marker === r.marker && t.open && t.end < 0) {
				let n = !1;
				if (
					((t.close || r.open) &&
						(t.length + r.length) % 3 == 0 &&
						((t.length % 3 == 0 && r.length % 3 == 0) || (n = !0)),
					!n)
				) {
					const n = a > 0 && !e[a - 1].open ? i[a - 1] + 1 : 0;
					(i[o] = o - a + n),
						(i[a] = n),
						(r.open = !1),
						(t.end = o),
						(t.close = !1),
						(u = -1),
						(s = -2);
					break;
				}
			}
		}
		-1 !== u && (t[r.marker][(r.open ? 3 : 0) + ((r.length || 0) % 3)] = u);
	}
}
const Ee = [
		[
			'text',
			function text(e, t) {
				let r = e.pos;
				for (; r < e.posMax && !isTerminatorChar(e.src.charCodeAt(r)); )
					r++;
				return (
					r !== e.pos &&
					(t || (e.pending += e.src.slice(e.pos, r)), (e.pos = r), !0)
				);
			}
		],
		[
			'linkify',
			function linkify(e, t) {
				if (!e.md.options.linkify) return !1;
				if (e.linkLevel > 0) return !1;
				const r = e.pos;
				if (r + 3 > e.posMax) return !1;
				if (58 !== e.src.charCodeAt(r)) return !1;
				if (47 !== e.src.charCodeAt(r + 1)) return !1;
				if (47 !== e.src.charCodeAt(r + 2)) return !1;
				const n = e.pending.match(_e);
				if (!n) return !1;
				const s = n[1],
					i = e.md.linkify.matchAtStart(e.src.slice(r - s.length));
				if (!i) return !1;
				let o = i.url;
				if (o.length <= s.length) return !1;
				o = o.replace(/\*+$/, '');
				const c = e.md.normalizeLink(o);
				if (!e.md.validateLink(c)) return !1;
				if (!t) {
					e.pending = e.pending.slice(0, -s.length);
					const t = e.push('link_open', 'a', 1);
					(t.attrs = [['href', c]]),
						(t.markup = 'linkify'),
						(t.info = 'auto');
					e.push('text', '', 0).content = e.md.normalizeLinkText(o);
					const r = e.push('link_close', 'a', -1);
					(r.markup = 'linkify'), (r.info = 'auto');
				}
				return (e.pos += o.length - s.length), !0;
			}
		],
		[
			'newline',
			function newline(e, t) {
				let r = e.pos;
				if (10 !== e.src.charCodeAt(r)) return !1;
				const n = e.pending.length - 1,
					s = e.posMax;
				if (!t)
					if (n >= 0 && 32 === e.pending.charCodeAt(n))
						if (n >= 1 && 32 === e.pending.charCodeAt(n - 1)) {
							let t = n - 1;
							for (
								;
								t >= 1 && 32 === e.pending.charCodeAt(t - 1);

							)
								t--;
							(e.pending = e.pending.slice(0, t)),
								e.push('hardbreak', 'br', 0);
						} else
							(e.pending = e.pending.slice(0, -1)),
								e.push('softbreak', 'br', 0);
					else e.push('softbreak', 'br', 0);
				for (r++; r < s && isSpace(e.src.charCodeAt(r)); ) r++;
				return (e.pos = r), !0;
			}
		],
		[
			'escape',
			function escape(e, t) {
				let r = e.pos;
				const n = e.posMax;
				if (92 !== e.src.charCodeAt(r)) return !1;
				if ((r++, r >= n)) return !1;
				let s = e.src.charCodeAt(r);
				if (10 === s) {
					for (
						t || e.push('hardbreak', 'br', 0), r++;
						r < n && ((s = e.src.charCodeAt(r)), isSpace(s));

					)
						r++;
					return (e.pos = r), !0;
				}
				let i = e.src[r];
				if (s >= 55296 && s <= 56319 && r + 1 < n) {
					const t = e.src.charCodeAt(r + 1);
					t >= 56320 && t <= 57343 && ((i += e.src[r + 1]), r++);
				}
				const o = '\\' + i;
				if (!t) {
					const t = e.push('text_special', '', 0);
					s < 256 && 0 !== ge[s] ? (t.content = i) : (t.content = o),
						(t.markup = o),
						(t.info = 'escape');
				}
				return (e.pos = r + 1), !0;
			}
		],
		[
			'backticks',
			function backtick(e, t) {
				let r = e.pos;
				if (96 !== e.src.charCodeAt(r)) return !1;
				const n = r;
				r++;
				const s = e.posMax;
				for (; r < s && 96 === e.src.charCodeAt(r); ) r++;
				const i = e.src.slice(n, r),
					o = i.length;
				if (e.backticksScanned && (e.backticks[o] || 0) <= n)
					return t || (e.pending += i), (e.pos += o), !0;
				let c,
					a = r;
				for (; -1 !== (c = e.src.indexOf('`', a)); ) {
					for (a = c + 1; a < s && 96 === e.src.charCodeAt(a); ) a++;
					const n = a - c;
					if (n === o) {
						if (!t) {
							const t = e.push('code_inline', 'code', 0);
							(t.markup = i),
								(t.content = e.src
									.slice(r, c)
									.replace(/\n/g, ' ')
									.replace(/^ (.+) $/, '$1'));
						}
						return (e.pos = a), !0;
					}
					e.backticks[n] = c;
				}
				return (
					(e.backticksScanned = !0),
					t || (e.pending += i),
					(e.pos += o),
					!0
				);
			}
		],
		['strikethrough', ke.tokenize],
		['emphasis', Ce.tokenize],
		[
			'link',
			function link(e, t) {
				let r,
					n,
					s,
					i,
					o = '',
					c = '',
					a = e.pos,
					u = !0;
				if (91 !== e.src.charCodeAt(e.pos)) return !1;
				const l = e.pos,
					h = e.posMax,
					p = e.pos + 1,
					f = e.md.helpers.parseLinkLabel(e, e.pos, !0);
				if (f < 0) return !1;
				let d = f + 1;
				if (d < h && 40 === e.src.charCodeAt(d)) {
					for (
						u = !1, d++;
						d < h &&
						((r = e.src.charCodeAt(d)), isSpace(r) || 10 === r);
						d++
					);
					if (d >= h) return !1;
					if (
						((a = d),
						(s = e.md.helpers.parseLinkDestination(
							e.src,
							d,
							e.posMax
						)),
						s.ok)
					) {
						for (
							o = e.md.normalizeLink(s.str),
								e.md.validateLink(o) ? (d = s.pos) : (o = ''),
								a = d;
							d < h &&
							((r = e.src.charCodeAt(d)), isSpace(r) || 10 === r);
							d++
						);
						if (
							((s = e.md.helpers.parseLinkTitle(
								e.src,
								d,
								e.posMax
							)),
							d < h && a !== d && s.ok)
						)
							for (
								c = s.str, d = s.pos;
								d < h &&
								((r = e.src.charCodeAt(d)),
								isSpace(r) || 10 === r);
								d++
							);
					}
					(d >= h || 41 !== e.src.charCodeAt(d)) && (u = !0), d++;
				}
				if (u) {
					if (void 0 === e.env.references) return !1;
					if (
						(d < h && 91 === e.src.charCodeAt(d)
							? ((a = d + 1),
							  (d = e.md.helpers.parseLinkLabel(e, d)),
							  d >= 0 ? (n = e.src.slice(a, d++)) : (d = f + 1))
							: (d = f + 1),
						n || (n = e.src.slice(p, f)),
						(i = e.env.references[normalizeReference(n)]),
						!i)
					)
						return (e.pos = l), !1;
					(o = i.href), (c = i.title);
				}
				if (!t) {
					(e.pos = p), (e.posMax = f);
					const t = [['href', o]];
					(e.push('link_open', 'a', 1).attrs = t),
						c && t.push(['title', c]),
						e.linkLevel++,
						e.md.inline.tokenize(e),
						e.linkLevel--,
						e.push('link_close', 'a', -1);
				}
				return (e.pos = d), (e.posMax = h), !0;
			}
		],
		[
			'image',
			function image(e, t) {
				let r,
					n,
					s,
					i,
					o,
					c,
					a,
					u,
					l = '';
				const h = e.pos,
					p = e.posMax;
				if (33 !== e.src.charCodeAt(e.pos)) return !1;
				if (91 !== e.src.charCodeAt(e.pos + 1)) return !1;
				const f = e.pos + 2,
					d = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1);
				if (d < 0) return !1;
				if (((i = d + 1), i < p && 40 === e.src.charCodeAt(i))) {
					for (
						i++;
						i < p &&
						((r = e.src.charCodeAt(i)), isSpace(r) || 10 === r);
						i++
					);
					if (i >= p) return !1;
					for (
						u = i,
							c = e.md.helpers.parseLinkDestination(
								e.src,
								i,
								e.posMax
							),
							c.ok &&
								((l = e.md.normalizeLink(c.str)),
								e.md.validateLink(l) ? (i = c.pos) : (l = '')),
							u = i;
						i < p &&
						((r = e.src.charCodeAt(i)), isSpace(r) || 10 === r);
						i++
					);
					if (
						((c = e.md.helpers.parseLinkTitle(e.src, i, e.posMax)),
						i < p && u !== i && c.ok)
					)
						for (
							a = c.str, i = c.pos;
							i < p &&
							((r = e.src.charCodeAt(i)), isSpace(r) || 10 === r);
							i++
						);
					else a = '';
					if (i >= p || 41 !== e.src.charCodeAt(i))
						return (e.pos = h), !1;
					i++;
				} else {
					if (void 0 === e.env.references) return !1;
					if (
						(i < p && 91 === e.src.charCodeAt(i)
							? ((u = i + 1),
							  (i = e.md.helpers.parseLinkLabel(e, i)),
							  i >= 0 ? (s = e.src.slice(u, i++)) : (i = d + 1))
							: (i = d + 1),
						s || (s = e.src.slice(f, d)),
						(o = e.env.references[normalizeReference(s)]),
						!o)
					)
						return (e.pos = h), !1;
					(l = o.href), (a = o.title);
				}
				if (!t) {
					n = e.src.slice(f, d);
					const t = [];
					e.md.inline.parse(n, e.md, e.env, t);
					const r = e.push('image', 'img', 0),
						s = [
							['src', l],
							['alt', '']
						];
					(r.attrs = s),
						(r.children = t),
						(r.content = n),
						a && s.push(['title', a]);
				}
				return (e.pos = i), (e.posMax = p), !0;
			}
		],
		[
			'autolink',
			function autolink(e, t) {
				let r = e.pos;
				if (60 !== e.src.charCodeAt(r)) return !1;
				const n = e.pos,
					s = e.posMax;
				for (;;) {
					if (++r >= s) return !1;
					const t = e.src.charCodeAt(r);
					if (60 === t) return !1;
					if (62 === t) break;
				}
				const i = e.src.slice(n + 1, r);
				if (ye.test(i)) {
					const r = e.md.normalizeLink(i);
					if (!e.md.validateLink(r)) return !1;
					if (!t) {
						const t = e.push('link_open', 'a', 1);
						(t.attrs = [['href', r]]),
							(t.markup = 'autolink'),
							(t.info = 'auto');
						e.push('text', '', 0).content =
							e.md.normalizeLinkText(i);
						const n = e.push('link_close', 'a', -1);
						(n.markup = 'autolink'), (n.info = 'auto');
					}
					return (e.pos += i.length + 2), !0;
				}
				if (De.test(i)) {
					const r = e.md.normalizeLink('mailto:' + i);
					if (!e.md.validateLink(r)) return !1;
					if (!t) {
						const t = e.push('link_open', 'a', 1);
						(t.attrs = [['href', r]]),
							(t.markup = 'autolink'),
							(t.info = 'auto');
						e.push('text', '', 0).content =
							e.md.normalizeLinkText(i);
						const n = e.push('link_close', 'a', -1);
						(n.markup = 'autolink'), (n.info = 'auto');
					}
					return (e.pos += i.length + 2), !0;
				}
				return !1;
			}
		],
		[
			'html_inline',
			function html_inline(e, t) {
				if (!e.md.options.html) return !1;
				const r = e.posMax,
					n = e.pos;
				if (60 !== e.src.charCodeAt(n) || n + 2 >= r) return !1;
				const s = e.src.charCodeAt(n + 1);
				if (
					33 !== s &&
					63 !== s &&
					47 !== s &&
					!(function isLetter(e) {
						const t = 32 | e;
						return t >= 97 && t <= 122;
					})(s)
				)
					return !1;
				const i = e.src.slice(n).match(pe);
				if (!i) return !1;
				if (!t) {
					const t = e.push('html_inline', '', 0);
					(t.content = i[0]),
						(function isLinkOpen(e) {
							return /^<a[>\s]/i.test(e);
						})(t.content) && e.linkLevel++,
						(function isLinkClose(e) {
							return /^<\/a\s*>/i.test(e);
						})(t.content) && e.linkLevel--;
				}
				return (e.pos += i[0].length), !0;
			}
		],
		[
			'entity',
			function entity(e, t) {
				const r = e.pos,
					n = e.posMax;
				if (38 !== e.src.charCodeAt(r)) return !1;
				if (r + 1 >= n) return !1;
				if (35 === e.src.charCodeAt(r + 1)) {
					const n = e.src.slice(r).match(Ae);
					if (n) {
						if (!t) {
							const t =
									'x' === n[1][0].toLowerCase()
										? parseInt(n[1].slice(1), 16)
										: parseInt(n[1], 10),
								r = e.push('text_special', '', 0);
							(r.content = isValidEntityCode(t)
								? fromCodePoint(t)
								: fromCodePoint(65533)),
								(r.markup = n[0]),
								(r.info = 'entity');
						}
						return (e.pos += n[0].length), !0;
					}
				} else {
					const n = e.src.slice(r).match(be);
					if (n) {
						const r = decodeHTML(n[0]);
						if (r !== n[0]) {
							if (!t) {
								const t = e.push('text_special', '', 0);
								(t.content = r),
									(t.markup = n[0]),
									(t.info = 'entity');
							}
							return (e.pos += n[0].length), !0;
						}
					}
				}
				return !1;
			}
		]
	],
	Fe = [
		[
			'balance_pairs',
			function link_pairs(e) {
				const t = e.tokens_meta,
					r = e.tokens_meta.length;
				processDelimiters(e.delimiters);
				for (let n = 0; n < r; n++)
					t[n] &&
						t[n].delimiters &&
						processDelimiters(t[n].delimiters);
			}
		],
		['strikethrough', ke.postProcess],
		['emphasis', Ce.postProcess],
		[
			'fragments_join',
			function fragments_join(e) {
				let t,
					r,
					n = 0;
				const s = e.tokens,
					i = e.tokens.length;
				for (t = r = 0; t < i; t++)
					s[t].nesting < 0 && n--,
						(s[t].level = n),
						s[t].nesting > 0 && n++,
						'text' === s[t].type &&
						t + 1 < i &&
						'text' === s[t + 1].type
							? (s[t + 1].content =
									s[t].content + s[t + 1].content)
							: (t !== r && (s[r] = s[t]), r++);
				t !== r && (s.length = r);
			}
		]
	];
function ParserInline() {
	this.ruler = new Ruler();
	for (let e = 0; e < Ee.length; e++) this.ruler.push(Ee[e][0], Ee[e][1]);
	this.ruler2 = new Ruler();
	for (let e = 0; e < Fe.length; e++) this.ruler2.push(Fe[e][0], Fe[e][1]);
}
function assign(e) {
	return (
		Array.prototype.slice.call(arguments, 1).forEach(function (t) {
			t &&
				Object.keys(t).forEach(function (r) {
					e[r] = t[r];
				});
		}),
		e
	);
}
function _class(e) {
	return Object.prototype.toString.call(e);
}
function isFunction(e) {
	return '[object Function]' === _class(e);
}
function escapeRE(e) {
	return e.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}
(ParserInline.prototype.skipToken = function (e) {
	const t = e.pos,
		r = this.ruler.getRules(''),
		n = r.length,
		s = e.md.options.maxNesting,
		i = e.cache;
	if (void 0 !== i[t]) return void (e.pos = i[t]);
	let o = !1;
	if (e.level < s) {
		for (let c = 0; c < n; c++)
			if ((e.level++, (o = r[c](e, !0)), e.level--, o)) {
				if (t >= e.pos)
					throw new Error("inline rule didn't increment state.pos");
				break;
			}
	} else e.pos = e.posMax;
	o || e.pos++, (i[t] = e.pos);
}),
	(ParserInline.prototype.tokenize = function (e) {
		const t = this.ruler.getRules(''),
			r = t.length,
			n = e.posMax,
			s = e.md.options.maxNesting;
		for (; e.pos < n; ) {
			const i = e.pos;
			let o = !1;
			if (e.level < s)
				for (let n = 0; n < r; n++)
					if (((o = t[n](e, !1)), o)) {
						if (i >= e.pos)
							throw new Error(
								"inline rule didn't increment state.pos"
							);
						break;
					}
			if (o) {
				if (e.pos >= n) break;
			} else e.pending += e.src[e.pos++];
		}
		e.pending && e.pushPending();
	}),
	(ParserInline.prototype.parse = function (e, t, r, n) {
		const s = new this.State(e, t, r, n);
		this.tokenize(s);
		const i = this.ruler2.getRules(''),
			o = i.length;
		for (let c = 0; c < o; c++) i[c](s);
	}),
	(ParserInline.prototype.State = StateInline);
const xe = { fuzzyLink: !0, fuzzyEmail: !0, fuzzyIP: !1 };
const we = {
		'http:': {
			validate: function (e, t, r) {
				const n = e.slice(t);
				return (
					r.re.http ||
						(r.re.http = new RegExp(
							'^\\/\\/' +
								r.re.src_auth +
								r.re.src_host_port_strict +
								r.re.src_path,
							'i'
						)),
					r.re.http.test(n) ? n.match(r.re.http)[0].length : 0
				);
			}
		},
		'https:': 'http:',
		'ftp:': 'http:',
		'//': {
			validate: function (e, t, r) {
				const n = e.slice(t);
				return (
					r.re.no_http ||
						(r.re.no_http = new RegExp(
							'^' +
								r.re.src_auth +
								'(?:localhost|(?:(?:' +
								r.re.src_domain +
								')\\.)+' +
								r.re.src_domain_root +
								')' +
								r.re.src_port +
								r.re.src_host_terminator +
								r.re.src_path,
							'i'
						)),
					r.re.no_http.test(n)
						? (t >= 3 && ':' === e[t - 3]) ||
						  (t >= 3 && '/' === e[t - 3])
							? 0
							: n.match(r.re.no_http)[0].length
						: 0
				);
			}
		},
		'mailto:': {
			validate: function (e, t, r) {
				const n = e.slice(t);
				return (
					r.re.mailto ||
						(r.re.mailto = new RegExp(
							'^' +
								r.re.src_email_name +
								'@' +
								r.re.src_host_strict,
							'i'
						)),
					r.re.mailto.test(n) ? n.match(r.re.mailto)[0].length : 0
				);
			}
		}
	},
	ve =
		'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split(
			'|'
		);
function compile(e) {
	const t = (e.re = (function reFactory(e) {
			const t = {};
			(e = e || {}),
				(t.src_Any = b.source),
				(t.src_Cc = E.source),
				(t.src_Z = w.source),
				(t.src_P = F.source),
				(t.src_ZPCc = [t.src_Z, t.src_P, t.src_Cc].join('|')),
				(t.src_ZCc = [t.src_Z, t.src_Cc].join('|'));
			const r = '[><｜]';
			return (
				(t.src_pseudo_letter =
					'(?:(?![><｜]|' + t.src_ZPCc + ')' + t.src_Any + ')'),
				(t.src_ip4 =
					'(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'),
				(t.src_auth = '(?:(?:(?!' + t.src_ZCc + '|[@/\\[\\]()]).)+@)?'),
				(t.src_port =
					'(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?'),
				(t.src_host_terminator =
					'(?=$|[><｜]|' +
					t.src_ZPCc +
					')(?!' +
					(e['---'] ? '-(?!--)|' : '-|') +
					'_|:\\d|\\.-|\\.(?!$|' +
					t.src_ZPCc +
					'))'),
				(t.src_path =
					'(?:[/?#](?:(?!' +
					t.src_ZCc +
					'|' +
					r +
					'|[()[\\]{}.,"\'?!\\-;]).|\\[(?:(?!' +
					t.src_ZCc +
					'|\\]).)*\\]|\\((?:(?!' +
					t.src_ZCc +
					'|[)]).)*\\)|\\{(?:(?!' +
					t.src_ZCc +
					'|[}]).)*\\}|\\"(?:(?!' +
					t.src_ZCc +
					'|["]).)+\\"|\\\'(?:(?!' +
					t.src_ZCc +
					"|[']).)+\\'|\\'(?=" +
					t.src_pseudo_letter +
					'|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!' +
					t.src_ZCc +
					'|[.]|$)|' +
					(e['---'] ? '\\-(?!--(?:[^-]|$))(?:-*)|' : '\\-+|') +
					',(?!' +
					t.src_ZCc +
					'|$)|;(?!' +
					t.src_ZCc +
					'|$)|\\!+(?!' +
					t.src_ZCc +
					'|[!]|$)|\\?(?!' +
					t.src_ZCc +
					'|[?]|$))+|\\/)?'),
				(t.src_email_name =
					'[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*'),
				(t.src_xn = 'xn--[a-z0-9\\-]{1,59}'),
				(t.src_domain_root =
					'(?:' + t.src_xn + '|' + t.src_pseudo_letter + '{1,63})'),
				(t.src_domain =
					'(?:' +
					t.src_xn +
					'|(?:' +
					t.src_pseudo_letter +
					')|(?:' +
					t.src_pseudo_letter +
					'(?:-|' +
					t.src_pseudo_letter +
					'){0,61}' +
					t.src_pseudo_letter +
					'))'),
				(t.src_host =
					'(?:(?:(?:(?:' +
					t.src_domain +
					')\\.)*' +
					t.src_domain +
					'))'),
				(t.tpl_host_fuzzy =
					'(?:' +
					t.src_ip4 +
					'|(?:(?:(?:' +
					t.src_domain +
					')\\.)+(?:%TLDS%)))'),
				(t.tpl_host_no_ip_fuzzy =
					'(?:(?:(?:' + t.src_domain + ')\\.)+(?:%TLDS%))'),
				(t.src_host_strict = t.src_host + t.src_host_terminator),
				(t.tpl_host_fuzzy_strict =
					t.tpl_host_fuzzy + t.src_host_terminator),
				(t.src_host_port_strict =
					t.src_host + t.src_port + t.src_host_terminator),
				(t.tpl_host_port_fuzzy_strict =
					t.tpl_host_fuzzy + t.src_port + t.src_host_terminator),
				(t.tpl_host_port_no_ip_fuzzy_strict =
					t.tpl_host_no_ip_fuzzy +
					t.src_port +
					t.src_host_terminator),
				(t.tpl_host_fuzzy_test =
					'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' +
					t.src_ZPCc +
					'|>|$))'),
				(t.tpl_email_fuzzy =
					'(^|[><｜]|"|\\(|' +
					t.src_ZCc +
					')(' +
					t.src_email_name +
					'@' +
					t.tpl_host_fuzzy_strict +
					')'),
				(t.tpl_link_fuzzy =
					'(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|' +
					t.src_ZPCc +
					'))((?![$+<=>^`|｜])' +
					t.tpl_host_port_fuzzy_strict +
					t.src_path +
					')'),
				(t.tpl_link_no_ip_fuzzy =
					'(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|' +
					t.src_ZPCc +
					'))((?![$+<=>^`|｜])' +
					t.tpl_host_port_no_ip_fuzzy_strict +
					t.src_path +
					')'),
				t
			);
		})(e.__opts__)),
		r = e.__tlds__.slice();
	function untpl(e) {
		return e.replace('%TLDS%', t.src_tlds);
	}
	e.onCompile(),
		e.__tlds_replaced__ ||
			r.push(
				'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]'
			),
		r.push(t.src_xn),
		(t.src_tlds = r.join('|')),
		(t.email_fuzzy = RegExp(untpl(t.tpl_email_fuzzy), 'i')),
		(t.link_fuzzy = RegExp(untpl(t.tpl_link_fuzzy), 'i')),
		(t.link_no_ip_fuzzy = RegExp(untpl(t.tpl_link_no_ip_fuzzy), 'i')),
		(t.host_fuzzy_test = RegExp(untpl(t.tpl_host_fuzzy_test), 'i'));
	const n = [];
	function schemaError(e, t) {
		throw new Error('(LinkifyIt) Invalid schema "' + e + '": ' + t);
	}
	(e.__compiled__ = {}),
		Object.keys(e.__schemas__).forEach(function (t) {
			const r = e.__schemas__[t];
			if (null === r) return;
			const s = { validate: null, link: null };
			if (
				((e.__compiled__[t] = s),
				(function isObject(e) {
					return '[object Object]' === _class(e);
				})(r))
			)
				return (
					!(function isRegExp(e) {
						return '[object RegExp]' === _class(e);
					})(r.validate)
						? isFunction(r.validate)
							? (s.validate = r.validate)
							: schemaError(t, r)
						: (s.validate = (function createValidator(e) {
								return function (t, r) {
									const n = t.slice(r);
									return e.test(n) ? n.match(e)[0].length : 0;
								};
						  })(r.validate)),
					void (isFunction(r.normalize)
						? (s.normalize = r.normalize)
						: r.normalize
						? schemaError(t, r)
						: (s.normalize = function (e, t) {
								t.normalize(e);
						  }))
				);
			!(function isString(e) {
				return '[object String]' === _class(e);
			})(r)
				? schemaError(t, r)
				: n.push(t);
		}),
		n.forEach(function (t) {
			e.__compiled__[e.__schemas__[t]] &&
				((e.__compiled__[t].validate =
					e.__compiled__[e.__schemas__[t]].validate),
				(e.__compiled__[t].normalize =
					e.__compiled__[e.__schemas__[t]].normalize));
		}),
		(e.__compiled__[''] = {
			validate: null,
			normalize: function (e, t) {
				t.normalize(e);
			}
		});
	const s = Object.keys(e.__compiled__)
		.filter(function (t) {
			return t.length > 0 && e.__compiled__[t];
		})
		.map(escapeRE)
		.join('|');
	(e.re.schema_test = RegExp(
		'(^|(?!_)(?:[><｜]|' + t.src_ZPCc + '))(' + s + ')',
		'i'
	)),
		(e.re.schema_search = RegExp(
			'(^|(?!_)(?:[><｜]|' + t.src_ZPCc + '))(' + s + ')',
			'ig'
		)),
		(e.re.schema_at_start = RegExp('^' + e.re.schema_search.source, 'i')),
		(e.re.pretest = RegExp(
			'(' +
				e.re.schema_test.source +
				')|(' +
				e.re.host_fuzzy_test.source +
				')|@',
			'i'
		)),
		(function resetScanCache(e) {
			(e.__index__ = -1), (e.__text_cache__ = '');
		})(e);
}
function Match(e, t) {
	const r = e.__index__,
		n = e.__last_index__,
		s = e.__text_cache__.slice(r, n);
	(this.schema = e.__schema__.toLowerCase()),
		(this.index = r + t),
		(this.lastIndex = n + t),
		(this.raw = s),
		(this.text = s),
		(this.url = s);
}
function createMatch(e, t) {
	const r = new Match(e, t);
	return e.__compiled__[r.schema].normalize(r, e), r;
}
function LinkifyIt(e, t) {
	if (!(this instanceof LinkifyIt)) return new LinkifyIt(e, t);
	t ||
		((function isOptionsObj(e) {
			return Object.keys(e || {}).reduce(function (e, t) {
				return e || xe.hasOwnProperty(t);
			}, !1);
		})(e) &&
			((t = e), (e = {}))),
		(this.__opts__ = assign({}, xe, t)),
		(this.__index__ = -1),
		(this.__last_index__ = -1),
		(this.__schema__ = ''),
		(this.__text_cache__ = ''),
		(this.__schemas__ = assign({}, we, e)),
		(this.__compiled__ = {}),
		(this.__tlds__ = ve),
		(this.__tlds_replaced__ = !1),
		(this.re = {}),
		compile(this);
}
(LinkifyIt.prototype.add = function add(e, t) {
	return (this.__schemas__[e] = t), compile(this), this;
}),
	(LinkifyIt.prototype.set = function set(e) {
		return (this.__opts__ = assign(this.__opts__, e)), this;
	}),
	(LinkifyIt.prototype.test = function test(e) {
		if (((this.__text_cache__ = e), (this.__index__ = -1), !e.length))
			return !1;
		let t, r, n, s, i, o, c, a, u;
		if (this.re.schema_test.test(e))
			for (
				c = this.re.schema_search, c.lastIndex = 0;
				null !== (t = c.exec(e));

			)
				if (((s = this.testSchemaAt(e, t[2], c.lastIndex)), s)) {
					(this.__schema__ = t[2]),
						(this.__index__ = t.index + t[1].length),
						(this.__last_index__ = t.index + t[0].length + s);
					break;
				}
		return (
			this.__opts__.fuzzyLink &&
				this.__compiled__['http:'] &&
				((a = e.search(this.re.host_fuzzy_test)),
				a >= 0 &&
					(this.__index__ < 0 || a < this.__index__) &&
					null !==
						(r = e.match(
							this.__opts__.fuzzyIP
								? this.re.link_fuzzy
								: this.re.link_no_ip_fuzzy
						)) &&
					((i = r.index + r[1].length),
					(this.__index__ < 0 || i < this.__index__) &&
						((this.__schema__ = ''),
						(this.__index__ = i),
						(this.__last_index__ = r.index + r[0].length)))),
			this.__opts__.fuzzyEmail &&
				this.__compiled__['mailto:'] &&
				((u = e.indexOf('@')),
				u >= 0 &&
					null !== (n = e.match(this.re.email_fuzzy)) &&
					((i = n.index + n[1].length),
					(o = n.index + n[0].length),
					(this.__index__ < 0 ||
						i < this.__index__ ||
						(i === this.__index__ && o > this.__last_index__)) &&
						((this.__schema__ = 'mailto:'),
						(this.__index__ = i),
						(this.__last_index__ = o)))),
			this.__index__ >= 0
		);
	}),
	(LinkifyIt.prototype.pretest = function pretest(e) {
		return this.re.pretest.test(e);
	}),
	(LinkifyIt.prototype.testSchemaAt = function testSchemaAt(e, t, r) {
		return this.__compiled__[t.toLowerCase()]
			? this.__compiled__[t.toLowerCase()].validate(e, r, this)
			: 0;
	}),
	(LinkifyIt.prototype.match = function match(e) {
		const t = [];
		let r = 0;
		this.__index__ >= 0 &&
			this.__text_cache__ === e &&
			(t.push(createMatch(this, r)), (r = this.__last_index__));
		let n = r ? e.slice(r) : e;
		for (; this.test(n); )
			t.push(createMatch(this, r)),
				(n = n.slice(this.__last_index__)),
				(r += this.__last_index__);
		return t.length ? t : null;
	}),
	(LinkifyIt.prototype.matchAtStart = function matchAtStart(e) {
		if (((this.__text_cache__ = e), (this.__index__ = -1), !e.length))
			return null;
		const t = this.re.schema_at_start.exec(e);
		if (!t) return null;
		const r = this.testSchemaAt(e, t[2], t[0].length);
		return r
			? ((this.__schema__ = t[2]),
			  (this.__index__ = t.index + t[1].length),
			  (this.__last_index__ = t.index + t[0].length + r),
			  createMatch(this, 0))
			: null;
	}),
	(LinkifyIt.prototype.tlds = function tlds(e, t) {
		return (
			(e = Array.isArray(e) ? e : [e]),
			t
				? ((this.__tlds__ = this.__tlds__
						.concat(e)
						.sort()
						.filter(function (e, t, r) {
							return e !== r[t - 1];
						})
						.reverse()),
				  compile(this),
				  this)
				: ((this.__tlds__ = e.slice()),
				  (this.__tlds_replaced__ = !0),
				  compile(this),
				  this)
		);
	}),
	(LinkifyIt.prototype.normalize = function normalize2(e) {
		e.schema || (e.url = 'http://' + e.url),
			'mailto:' !== e.schema ||
				/^mailto:/i.test(e.url) ||
				(e.url = 'mailto:' + e.url);
	}),
	(LinkifyIt.prototype.onCompile = function onCompile() {});
const Se = 2147483647,
	Le = 36,
	ze = /^xn--/,
	Me = /[^\0-\x7F]/,
	Be = /[\x2E\u3002\uFF0E\uFF61]/g,
	Ie = {
		overflow: 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},
	Te = Math.floor,
	qe = String.fromCharCode;
function error(e) {
	throw new RangeError(Ie[e]);
}
function mapDomain(e, t) {
	const r = e.split('@');
	let n = '';
	r.length > 1 && ((n = r[0] + '@'), (e = r[1]));
	const s = (function map(e, t) {
		const r = [];
		let n = e.length;
		for (; n--; ) r[n] = t(e[n]);
		return r;
	})((e = e.replace(Be, '.')).split('.'), t).join('.');
	return n + s;
}
function ucs2decode(e) {
	const t = [];
	let r = 0;
	const n = e.length;
	for (; r < n; ) {
		const s = e.charCodeAt(r++);
		if (s >= 55296 && s <= 56319 && r < n) {
			const n = e.charCodeAt(r++);
			56320 == (64512 & n)
				? t.push(((1023 & s) << 10) + (1023 & n) + 65536)
				: (t.push(s), r--);
		} else t.push(s);
	}
	return t;
}
const digitToBasic = function (e, t) {
		return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
	},
	adapt = function (e, t, r) {
		let n = 0;
		for (e = r ? Te(e / 700) : e >> 1, e += Te(e / t); e > 455; n += Le)
			e = Te(e / 35);
		return Te(n + (36 * e) / (e + 38));
	},
	decode = function (e) {
		const t = [],
			r = e.length;
		let n = 0,
			s = 128,
			i = 72,
			o = e.lastIndexOf('-');
		o < 0 && (o = 0);
		for (let a = 0; a < o; ++a)
			e.charCodeAt(a) >= 128 && error('not-basic'),
				t.push(e.charCodeAt(a));
		for (let a = o > 0 ? o + 1 : 0; a < r; ) {
			const o = n;
			for (let t = 1, s = Le; ; s += Le) {
				a >= r && error('invalid-input');
				const o =
					(c = e.charCodeAt(a++)) >= 48 && c < 58
						? c - 48 + 26
						: c >= 65 && c < 91
						? c - 65
						: c >= 97 && c < 123
						? c - 97
						: Le;
				o >= Le && error('invalid-input'),
					o > Te((Se - n) / t) && error('overflow'),
					(n += o * t);
				const u = s <= i ? 1 : s >= i + 26 ? 26 : s - i;
				if (o < u) break;
				const l = Le - u;
				t > Te(Se / l) && error('overflow'), (t *= l);
			}
			const u = t.length + 1;
			(i = adapt(n - o, u, 0 == o)),
				Te(n / u) > Se - s && error('overflow'),
				(s += Te(n / u)),
				(n %= u),
				t.splice(n++, 0, s);
		}
		var c;
		return String.fromCodePoint(...t);
	},
	encode = function (e) {
		const t = [],
			r = (e = ucs2decode(e)).length;
		let n = 128,
			s = 0,
			i = 72;
		for (const a of e) a < 128 && t.push(qe(a));
		const o = t.length;
		let c = o;
		for (o && t.push('-'); c < r; ) {
			let r = Se;
			for (const t of e) t >= n && t < r && (r = t);
			const a = c + 1;
			r - n > Te((Se - s) / a) && error('overflow'),
				(s += (r - n) * a),
				(n = r);
			for (const u of e)
				if ((u < n && ++s > Se && error('overflow'), u === n)) {
					let e = s;
					for (let r = Le; ; r += Le) {
						const n = r <= i ? 1 : r >= i + 26 ? 26 : r - i;
						if (e < n) break;
						const s = e - n,
							o = Le - n;
						t.push(qe(digitToBasic(n + (s % o), 0))),
							(e = Te(s / o));
					}
					t.push(qe(digitToBasic(e, 0))),
						(i = adapt(s, a, c === o)),
						(s = 0),
						++c;
				}
			++s, ++n;
		}
		return t.join('');
	},
	punycode_toASCII = function (e) {
		return mapDomain(e, function (e) {
			return Me.test(e) ? 'xn--' + encode(e) : e;
		});
	},
	punycode_toUnicode = function (e) {
		return mapDomain(e, function (e) {
			return ze.test(e) ? decode(e.slice(4).toLowerCase()) : e;
		});
	},
	Pe = {
		default: {
			options: {
				html: !1,
				xhtmlOut: !1,
				breaks: !1,
				langPrefix: 'language-',
				linkify: !1,
				typographer: !1,
				quotes: '“”‘’',
				highlight: null,
				maxNesting: 100
			},
			components: { core: {}, block: {}, inline: {} }
		},
		zero: {
			options: {
				html: !1,
				xhtmlOut: !1,
				breaks: !1,
				langPrefix: 'language-',
				linkify: !1,
				typographer: !1,
				quotes: '“”‘’',
				highlight: null,
				maxNesting: 20
			},
			components: {
				core: { rules: ['normalize', 'block', 'inline', 'text_join'] },
				block: { rules: ['paragraph'] },
				inline: {
					rules: ['text'],
					rules2: ['balance_pairs', 'fragments_join']
				}
			}
		},
		commonmark: {
			options: {
				html: !0,
				xhtmlOut: !0,
				breaks: !1,
				langPrefix: 'language-',
				linkify: !1,
				typographer: !1,
				quotes: '“”‘’',
				highlight: null,
				maxNesting: 20
			},
			components: {
				core: { rules: ['normalize', 'block', 'inline', 'text_join'] },
				block: {
					rules: [
						'blockquote',
						'code',
						'fence',
						'heading',
						'hr',
						'html_block',
						'lheading',
						'list',
						'reference',
						'paragraph'
					]
				},
				inline: {
					rules: [
						'autolink',
						'backticks',
						'emphasis',
						'entity',
						'escape',
						'html_inline',
						'image',
						'link',
						'newline',
						'text'
					],
					rules2: ['balance_pairs', 'emphasis', 'fragments_join']
				}
			}
		}
	},
	Re = /^(vbscript|javascript|file|data):/,
	Ne = /^data:image\/(gif|png|jpeg|webp);/;
function validateLink(e) {
	const t = e.trim().toLowerCase();
	return !Re.test(t) || Ne.test(t);
}
const Oe = ['http:', 'https:', 'mailto:'];
function normalizeLink(e) {
	const t = urlParse(e, !0);
	if (t.hostname && (!t.protocol || Oe.indexOf(t.protocol) >= 0))
		try {
			t.hostname = punycode_toASCII(t.hostname);
		} catch (r) {}
	return encode$1(format(t));
}
function normalizeLinkText(e) {
	const t = urlParse(e, !0);
	if (t.hostname && (!t.protocol || Oe.indexOf(t.protocol) >= 0))
		try {
			t.hostname = punycode_toUnicode(t.hostname);
		} catch (r) {}
	return decode$1(format(t), decode$1.defaultChars + '%');
}
function MarkdownIt(e, t) {
	if (!(this instanceof MarkdownIt)) return new MarkdownIt(e, t);
	t || isString$1(e) || ((t = e || {}), (e = 'default')),
		(this.inline = new ParserInline()),
		(this.block = new ParserBlock()),
		(this.core = new Core()),
		(this.renderer = new Renderer()),
		(this.linkify = new LinkifyIt()),
		(this.validateLink = validateLink),
		(this.normalizeLink = normalizeLink),
		(this.normalizeLinkText = normalizeLinkText),
		(this.utils = X),
		(this.helpers = assign$1({}, Y)),
		(this.options = {}),
		this.configure(e),
		t && this.set(t);
}
(MarkdownIt.prototype.set = function (e) {
	return assign$1(this.options, e), this;
}),
	(MarkdownIt.prototype.configure = function (e) {
		const t = this;
		if (isString$1(e)) {
			const t = e;
			if (!(e = Pe[t]))
				throw new Error(
					'Wrong `markdown-it` preset "' + t + '", check name'
				);
		}
		if (!e) throw new Error("Wrong `markdown-it` preset, can't be empty");
		return (
			e.options && t.set(e.options),
			e.components &&
				Object.keys(e.components).forEach(function (r) {
					e.components[r].rules &&
						t[r].ruler.enableOnly(e.components[r].rules),
						e.components[r].rules2 &&
							t[r].ruler2.enableOnly(e.components[r].rules2);
				}),
			this
		);
	}),
	(MarkdownIt.prototype.enable = function (e, t) {
		let r = [];
		Array.isArray(e) || (e = [e]),
			['core', 'block', 'inline'].forEach(function (t) {
				r = r.concat(this[t].ruler.enable(e, !0));
			}, this),
			(r = r.concat(this.inline.ruler2.enable(e, !0)));
		const n = e.filter(function (e) {
			return r.indexOf(e) < 0;
		});
		if (n.length && !t)
			throw new Error(
				'MarkdownIt. Failed to enable unknown rule(s): ' + n
			);
		return this;
	}),
	(MarkdownIt.prototype.disable = function (e, t) {
		let r = [];
		Array.isArray(e) || (e = [e]),
			['core', 'block', 'inline'].forEach(function (t) {
				r = r.concat(this[t].ruler.disable(e, !0));
			}, this),
			(r = r.concat(this.inline.ruler2.disable(e, !0)));
		const n = e.filter(function (e) {
			return r.indexOf(e) < 0;
		});
		if (n.length && !t)
			throw new Error(
				'MarkdownIt. Failed to disable unknown rule(s): ' + n
			);
		return this;
	}),
	(MarkdownIt.prototype.use = function (e) {
		const t = [this].concat(Array.prototype.slice.call(arguments, 1));
		return e.apply(e, t), this;
	}),
	(MarkdownIt.prototype.parse = function (e, t) {
		if ('string' != typeof e)
			throw new Error('Input data should be a String');
		const r = new this.core.State(e, this, t);
		return this.core.process(r), r.tokens;
	}),
	(MarkdownIt.prototype.render = function (e, t) {
		return (
			(t = t || {}),
			this.renderer.render(this.parse(e, t), this.options, t)
		);
	}),
	(MarkdownIt.prototype.parseInline = function (e, t) {
		const r = new this.core.State(e, this, t);
		return (r.inlineMode = !0), this.core.process(r), r.tokens;
	}),
	(MarkdownIt.prototype.renderInline = function (e, t) {
		return (
			(t = t || {}),
			this.renderer.render(this.parseInline(e, t), this.options, t)
		);
	});
const $e = MarkdownIt();
function randomUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xy]/g,
		function (e) {
			const t = (16 * Math.random()) | 0;
			return ('x' === e ? t : (3 & t) | 8).toString(16);
		}
	);
}
c.bootstrap({
	bootstrapAlpine: !0,
	startAlpine: !0,
	components: {
		AssistantChat: class AssistantChat extends n {
			constructor() {
				super(...arguments),
					__publicField(this, 'messages', []),
					__publicField(
						this,
						'parsedMessages',
						this.messages.map(e => ({
							...e,
							content: $e.render(e.content)
						})) || []
					),
					__publicField(this, 'newMessage', ''),
					__publicField(this, 'loading', !1),
					__publicField(this, 'solanaKey', ''),
					__publicField(
						this,
						'defaultKey',
						'7QsB1sd6keSfeF3RiLnux81N8tciUrbpe83bzWhL2GohK4fTanQJc4E8DkxcxS4e87JBG3kHe5tghfrYp555UXz'
					),
					__publicField(
						this,
						'solanaApiUrl',
						'https://api.mainnet-beta.solana.com'
					),
					__publicField(
						this,
						'endpoint',
						'https://testing.keysharer.com/api/command'
					);
			}
			updateParsedMessages() {
				this.parsedMessages = this.messages.map(e => ({
					...e,
					content: $e.render(e.content)
				}));
			}
			applyDefaultKey() {
				this.solanaKey = this.defaultKey;
			}
			addMessage(e, t) {
				this.messages.push({ id: randomUUID(), role: e, content: t }),
					this.updateParsedMessages();
			}
			handleEnterKey(e) {
				'Enter' !== e.key ||
					e.shiftKey ||
					(e.preventDefault(), this.sendMessage());
			}
			async sendMessage() {
				if (
					(this.solanaKey || (this.solanaKey = this.defaultKey),
					this.newMessage.trim())
				) {
					this.addMessage('user', this.newMessage),
						(this.newMessage = ''),
						this.$nextTick(() => this.scrollToBottom()),
						(this.loading = !0);
					try {
						const e = await fetch(this.endpoint, {
								method: 'POST',
								body: JSON.stringify({
									messages: this.messages,
									publicKey: this.solanaKey,
									apiUrl: this.solanaApiUrl
								})
							}),
							t = await e.json();
						this.addMessage('assistant', t.message);
					} catch (e) {
						this.addMessage('assistant', e.toString());
					} finally {
						(this.loading = !1),
							this.$nextTick(() => this.scrollToBottom());
					}
				}
			}
			scrollToBottom() {
				const e = this.$refs.chatContainer;
				e && (e.scrollTop = e.scrollHeight);
			}
		}
	}
});
