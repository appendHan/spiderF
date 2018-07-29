//md5 + rsa
! function(n) {
    "use strict";

    function t(n, t) {
        var r = (65535 & n) + (65535 & t),
            e = (n >> 16) + (t >> 16) + (r >> 16);
        return e << 16 | 65535 & r
    }

    function r(n, t) {
        return n << t | n >>> 32 - t
    }

    function e(n, e, u, o, c, f) {
        return t(r(t(t(e, n), t(o, f)), c), u)
    }

    function u(n, t, r, u, o, c, f) {
        return e(t & r | ~t & u, n, t, o, c, f)
    }

    function o(n, t, r, u, o, c, f) {
        return e(t & u | r & ~u, n, t, o, c, f)
    }

    function c(n, t, r, u, o, c, f) {
        return e(t ^ r ^ u, n, t, o, c, f)
    }

    function f(n, t, r, u, o, c, f) {
        return e(r ^ (t | ~u), n, t, o, c, f)
    }

    function i(n, r) {
        n[r >> 5] |= 128 << r % 32, n[(r + 64 >>> 9 << 4) + 14] = r;
        var e, i, a, h, d, g = 1732584193,
            l = -271733879,
            v = -1732584194,
            C = 271733878;
        for (e = 0; e < n.length; e += 16) i = g, a = l, h = v, d = C, g = u(g, l, v, C, n[e], 7, -680876936), C = u(C, g, l, v, n[e + 1], 12, -389564586), v = u(v, C, g, l, n[e + 2], 17, 606105819), l = u(l, v, C, g, n[e + 3], 22, -1044525330), g = u(g, l, v, C, n[e + 4], 7, -176418897), C = u(C, g, l, v, n[e + 5], 12, 1200080426), v = u(v, C, g, l, n[e + 6], 17, -1473231341), l = u(l, v, C, g, n[e + 7], 22, -45705983), g = u(g, l, v, C, n[e + 8], 7, 1770035416), C = u(C, g, l, v, n[e + 9], 12, -1958414417), v = u(v, C, g, l, n[e + 10], 17, -42063), l = u(l, v, C, g, n[e + 11], 22, -1990404162), g = u(g, l, v, C, n[e + 12], 7, 1804603682), C = u(C, g, l, v, n[e + 13], 12, -40341101), v = u(v, C, g, l, n[e + 14], 17, -1502002290), l = u(l, v, C, g, n[e + 15], 22, 1236535329), g = o(g, l, v, C, n[e + 1], 5, -165796510), C = o(C, g, l, v, n[e + 6], 9, -1069501632), v = o(v, C, g, l, n[e + 11], 14, 643717713), l = o(l, v, C, g, n[e], 20, -373897302), g = o(g, l, v, C, n[e + 5], 5, -701558691), C = o(C, g, l, v, n[e + 10], 9, 38016083), v = o(v, C, g, l, n[e + 15], 14, -660478335), l = o(l, v, C, g, n[e + 4], 20, -405537848), g = o(g, l, v, C, n[e + 9], 5, 568446438), C = o(C, g, l, v, n[e + 14], 9, -1019803690), v = o(v, C, g, l, n[e + 3], 14, -187363961), l = o(l, v, C, g, n[e + 8], 20, 1163531501), g = o(g, l, v, C, n[e + 13], 5, -1444681467), C = o(C, g, l, v, n[e + 2], 9, -51403784), v = o(v, C, g, l, n[e + 7], 14, 1735328473), l = o(l, v, C, g, n[e + 12], 20, -1926607734), g = c(g, l, v, C, n[e + 5], 4, -378558), C = c(C, g, l, v, n[e + 8], 11, -2022574463), v = c(v, C, g, l, n[e + 11], 16, 1839030562), l = c(l, v, C, g, n[e + 14], 23, -35309556), g = c(g, l, v, C, n[e + 1], 4, -1530992060), C = c(C, g, l, v, n[e + 4], 11, 1272893353), v = c(v, C, g, l, n[e + 7], 16, -155497632), l = c(l, v, C, g, n[e + 10], 23, -1094730640), g = c(g, l, v, C, n[e + 13], 4, 681279174), C = c(C, g, l, v, n[e], 11, -358537222), v = c(v, C, g, l, n[e + 3], 16, -722521979), l = c(l, v, C, g, n[e + 6], 23, 76029189), g = c(g, l, v, C, n[e + 9], 4, -640364487), C = c(C, g, l, v, n[e + 12], 11, -421815835), v = c(v, C, g, l, n[e + 15], 16, 530742520), l = c(l, v, C, g, n[e + 2], 23, -995338651), g = f(g, l, v, C, n[e], 6, -198630844), C = f(C, g, l, v, n[e + 7], 10, 1126891415), v = f(v, C, g, l, n[e + 14], 15, -1416354905), l = f(l, v, C, g, n[e + 5], 21, -57434055), g = f(g, l, v, C, n[e + 12], 6, 1700485571), C = f(C, g, l, v, n[e + 3], 10, -1894986606), v = f(v, C, g, l, n[e + 10], 15, -1051523), l = f(l, v, C, g, n[e + 1], 21, -2054922799), g = f(g, l, v, C, n[e + 8], 6, 1873313359), C = f(C, g, l, v, n[e + 15], 10, -30611744), v = f(v, C, g, l, n[e + 6], 15, -1560198380), l = f(l, v, C, g, n[e + 13], 21, 1309151649), g = f(g, l, v, C, n[e + 4], 6, -145523070), C = f(C, g, l, v, n[e + 11], 10, -1120210379), v = f(v, C, g, l, n[e + 2], 15, 718787259), l = f(l, v, C, g, n[e + 9], 21, -343485551), g = t(g, i), l = t(l, a), v = t(v, h), C = t(C, d);
        return [g, l, v, C]
    }

    function a(n) {
        var t, r = "";
        for (t = 0; t < 32 * n.length; t += 8) r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
        return r
    }

    function h(n) {
        var t, r = [];
        for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0;
        for (t = 0; t < 8 * n.length; t += 8) r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
        return r
    }

    function d(n) {
        return a(i(h(n), 8 * n.length))
    }

    function g(n, t) {
        var r, e, u = h(n),
            o = [],
            c = [];
        for (o[15] = c[15] = void 0, u.length > 16 && (u = i(u, 8 * n.length)), r = 0; r < 16; r += 1) o[r] = 909522486 ^ u[r], c[r] = 1549556828 ^ u[r];
        return e = i(o.concat(h(t)), 512 + 8 * t.length), a(i(c.concat(e), 640))
    }

    function l(n) {
        var t, r, e = "0123456789abcdef",
            u = "";
        for (r = 0; r < n.length; r += 1) t = n.charCodeAt(r), u += e.charAt(t >>> 4 & 15) + e.charAt(15 & t);
        return u
    }

    function v(n) {
        return unescape(encodeURIComponent(n))
    }

    function C(n) {
        return d(v(n))
    }

    function m(n) {
        return l(C(n))
    }

    function s(n, t) {
        return g(v(n), v(t))
    }

    function A(n, t) {
        return l(s(n, t))
    }

    function p(n, t, r) {
        return t ? r ? s(t, n) : A(t, n) : r ? C(n) : m(n)
    }
    "function" == typeof define && define.amd ? define(function() {
        return p
    }) : n.md5 = p
}(this);


function BarrettMu(i) {
    this.modulus = biCopy(i), this.k = biHighIndex(this.modulus) + 1;
    var t = new BigInt;
    t.digits[2 * this.k] = 1, this.mu = biDivide(t, this.modulus), this.bkplus1 = new BigInt, this.bkplus1.digits[this.k + 1] = 1, this.modulo = BarrettMu_modulo, this.multiplyMod = BarrettMu_multiplyMod, this.powMod = BarrettMu_powMod
}

function BarrettMu_modulo(i) {
    var t = biDivideByRadixPower(i, this.k - 1),
        r = biMultiply(t, this.mu),
        e = biDivideByRadixPower(r, this.k + 1),
        n = biModuloByRadixPower(i, this.k + 1),
        g = biMultiply(e, this.modulus),
        s = biModuloByRadixPower(g, this.k + 1),
        d = biSubtract(n, s);
    d.isNeg && (d = biAdd(d, this.bkplus1));
    for (var o = biCompare(d, this.modulus) >= 0; o;) d = biSubtract(d, this.modulus), o = biCompare(d, this.modulus) >= 0;
    return d
}

function BarrettMu_multiplyMod(i, t) {
    var r = biMultiply(i, t);
    return this.modulo(r)
}

function BarrettMu_powMod(i, t) {
    var r = new BigInt;
    r.digits[0] = 1;
    for (var e = i, n = t;;) {
        if (0 != (1 & n.digits[0]) && (r = this.multiplyMod(r, e)), n = biShiftRight(n, 1), 0 == n.digits[0] && 0 == biHighIndex(n)) break;
        e = this.multiplyMod(e, e)
    }
    return r
}

function setMaxDigits(i) {
    maxDigits = i, ZERO_ARRAY = new Array(maxDigits);
    for (var t = 0; t < ZERO_ARRAY.length; t++) ZERO_ARRAY[t] = 0;
    bigZero = new BigInt, bigOne = new BigInt, bigOne.digits[0] = 1
}

function BigInt(i) {
    "boolean" == typeof i && 1 == i ? this.digits = null : this.digits = ZERO_ARRAY.slice(0), this.isNeg = !1
}

function biFromDecimal(i) {
    for (var t, r = "-" == i.charAt(0), e = r ? 1 : 0; e < i.length && "0" == i.charAt(e);) ++e;
    if (e == i.length) t = new BigInt;
    else {
        var n = i.length - e,
            g = n % dpl10;
        for (0 == g && (g = dpl10), t = biFromNumber(Number(i.substr(e, g))), e += g; e < i.length;) t = biAdd(biMultiply(t, lr10), biFromNumber(Number(i.substr(e, dpl10)))), e += dpl10;
        t.isNeg = r
    }
    return t
}

function biCopy(i) {
    var t = new BigInt((!0));
    return t.digits = i.digits.slice(0), t.isNeg = i.isNeg, t
}

function biFromNumber(i) {
    var t = new BigInt;
    t.isNeg = i < 0, i = Math.abs(i);
    for (var r = 0; i > 0;) t.digits[r++] = i & maxDigitVal, i >>= biRadixBits;
    return t
}

function reverseStr(i) {
    for (var t = "", r = i.length - 1; r > -1; --r) t += i.charAt(r);
    return t
}

function biToString(i, t) {
    var r = new BigInt;
    r.digits[0] = t;
    for (var e = biDivideModulo(i, r), n = hexatrigesimalToChar[e[1].digits[0]]; 1 == biCompare(e[0], bigZero);) e = biDivideModulo(e[0], r), digit = e[1].digits[0], n += hexatrigesimalToChar[e[1].digits[0]];
    return (i.isNeg ? "-" : "") + reverseStr(n)
}

function biToDecimal(i) {
    var t = new BigInt;
    t.digits[0] = 10;
    for (var r = biDivideModulo(i, t), e = String(r[1].digits[0]); 1 == biCompare(r[0], bigZero);) r = biDivideModulo(r[0], t), e += String(r[1].digits[0]);
    return (i.isNeg ? "-" : "") + reverseStr(e)
}

function digitToHex(t) {
    var r = 15,
        e = "";
    for (i = 0; i < 4; ++i) e += hexToChar[t & r], t >>>= 4;
    return reverseStr(e)
}

function biToHex(i) {
    for (var t = "", r = (biHighIndex(i), biHighIndex(i)); r > -1; --r) t += digitToHex(i.digits[r]);
    return t
}

function charToHex(i) {
    var t, r = 48,
        e = r + 9,
        n = 97,
        g = n + 25,
        s = 65,
        d = 90;
    return t = i >= r && i <= e ? i - r : i >= s && i <= d ? 10 + i - s : i >= n && i <= g ? 10 + i - n : 0
}

function hexToDigit(i) {
    for (var t = 0, r = Math.min(i.length, 4), e = 0; e < r; ++e) t <<= 4, t |= charToHex(i.charCodeAt(e));
    return t
}

function biFromHex(i) {
    for (var t = new BigInt, r = i.length, e = r, n = 0; e > 0; e -= 4, ++n) t.digits[n] = hexToDigit(i.substr(Math.max(e - 4, 0), Math.min(e, 4)));
    return t
}

function biFromString(i, t) {
    var r = "-" == i.charAt(0),
        e = r ? 1 : 0,
        n = new BigInt,
        g = new BigInt;
    g.digits[0] = 1;
    for (var s = i.length - 1; s >= e; s--) {
        var d = i.charCodeAt(s),
            o = charToHex(d),
            a = biMultiplyDigit(g, o);
        n = biAdd(n, a), g = biMultiplyDigit(g, t)
    }
    return n.isNeg = r, n
}

function biToBytes(i) {
    for (var t = "", r = biHighIndex(i); r > -1; --r) t += digitToBytes(i.digits[r]);
    return t
}

function digitToBytes(i) {
    var t = String.fromCharCode(255 & i);
    i >>>= 8;
    var r = String.fromCharCode(255 & i);
    return r + t
}

function biDump(i) {
    return (i.isNeg ? "-" : "") + i.digits.join(" ")
}

function biAdd(i, t) {
    var r;
    if (i.isNeg != t.isNeg) t.isNeg = !t.isNeg, r = biSubtract(i, t), t.isNeg = !t.isNeg;
    else {
        r = new BigInt;
        for (var e, n = 0, g = 0; g < i.digits.length; ++g) e = i.digits[g] + t.digits[g] + n, r.digits[g] = 65535 & e, n = Number(e >= biRadix);
        r.isNeg = i.isNeg
    }
    return r
}

function biSubtract(i, t) {
    var r;
    if (i.isNeg != t.isNeg) t.isNeg = !t.isNeg, r = biAdd(i, t), t.isNeg = !t.isNeg;
    else {
        r = new BigInt;
        var e, n;
        n = 0;
        for (var g = 0; g < i.digits.length; ++g) e = i.digits[g] - t.digits[g] + n, r.digits[g] = 65535 & e, r.digits[g] < 0 && (r.digits[g] += biRadix), n = 0 - Number(e < 0);
        if (n == -1) {
            n = 0;
            for (var g = 0; g < i.digits.length; ++g) e = 0 - r.digits[g] + n, r.digits[g] = 65535 & e, r.digits[g] < 0 && (r.digits[g] += biRadix), n = 0 - Number(e < 0);
            r.isNeg = !i.isNeg
        } else r.isNeg = i.isNeg
    }
    return r
}

function biHighIndex(i) {
    for (var t = i.digits.length - 1; t > 0 && 0 == i.digits[t];) --t;
    return t
}

function biNumBits(i) {
    var t, r = biHighIndex(i),
        e = i.digits[r],
        n = (r + 1) * bitsPerDigit;
    for (t = n; t > n - bitsPerDigit && 0 == (32768 & e); --t) e <<= 1;
    return t
}

function biMultiply(i, t) {
    for (var r, e, n, g = new BigInt, s = biHighIndex(i), d = biHighIndex(t), o = 0; o <= d; ++o) {
        for (r = 0, n = o, j = 0; j <= s; ++j, ++n) e = g.digits[n] + i.digits[j] * t.digits[o] + r, g.digits[n] = e & maxDigitVal, r = e >>> biRadixBits;
        g.digits[o + s + 1] = r
    }
    return g.isNeg = i.isNeg != t.isNeg, g
}

function biMultiplyDigit(i, t) {
    var r, e, n;
    result = new BigInt, r = biHighIndex(i), e = 0;
    for (var g = 0; g <= r; ++g) n = result.digits[g] + i.digits[g] * t + e, result.digits[g] = n & maxDigitVal, e = n >>> biRadixBits;
    return result.digits[1 + r] = e, result
}

function arrayCopy(i, t, r, e, n) {
    for (var g = Math.min(t + n, i.length), s = t, d = e; s < g; ++s, ++d) r[d] = i[s]
}

function biShiftLeft(i, t) {
    var r = Math.floor(t / bitsPerDigit),
        e = new BigInt;
    arrayCopy(i.digits, 0, e.digits, r, e.digits.length - r);
    for (var n = t % bitsPerDigit, g = bitsPerDigit - n, s = e.digits.length - 1, d = s - 1; s > 0; --s, --d) e.digits[s] = e.digits[s] << n & maxDigitVal | (e.digits[d] & highBitMasks[n]) >>> g;
    return e.digits[0] = e.digits[s] << n & maxDigitVal, e.isNeg = i.isNeg, e
}

function biShiftRight(i, t) {
    var r = Math.floor(t / bitsPerDigit),
        e = new BigInt;
    arrayCopy(i.digits, r, e.digits, 0, i.digits.length - r);
    for (var n = t % bitsPerDigit, g = bitsPerDigit - n, s = 0, d = s + 1; s < e.digits.length - 1; ++s, ++d) e.digits[s] = e.digits[s] >>> n | (e.digits[d] & lowBitMasks[n]) << g;
    return e.digits[e.digits.length - 1] >>>= n, e.isNeg = i.isNeg, e
}

function biMultiplyByRadixPower(i, t) {
    var r = new BigInt;
    return arrayCopy(i.digits, 0, r.digits, t, r.digits.length - t), r
}

function biDivideByRadixPower(i, t) {
    var r = new BigInt;
    return arrayCopy(i.digits, t, r.digits, 0, r.digits.length - t), r
}

function biModuloByRadixPower(i, t) {
    var r = new BigInt;
    return arrayCopy(i.digits, 0, r.digits, 0, t), r
}

function biCompare(i, t) {
    if (i.isNeg != t.isNeg) return 1 - 2 * Number(i.isNeg);
    for (var r = i.digits.length - 1; r >= 0; --r)
        if (i.digits[r] != t.digits[r]) return i.isNeg ? 1 - 2 * Number(i.digits[r] > t.digits[r]) : 1 - 2 * Number(i.digits[r] < t.digits[r]);
    return 0
}

function biDivideModulo(i, t) {
    var r, e, n = biNumBits(i),
        g = biNumBits(t),
        s = t.isNeg;
    if (n < g) return i.isNeg ? (r = biCopy(bigOne), r.isNeg = !t.isNeg, i.isNeg = !1, t.isNeg = !1, e = biSubtract(t, i), i.isNeg = !0, t.isNeg = s) : (r = new BigInt, e = biCopy(i)), new Array(r, e);
    r = new BigInt, e = i;
    for (var d = Math.ceil(g / bitsPerDigit) - 1, o = 0; t.digits[d] < biHalfRadix;) t = biShiftLeft(t, 1), ++o, ++g, d = Math.ceil(g / bitsPerDigit) - 1;
    e = biShiftLeft(e, o), n += o;
    for (var a = Math.ceil(n / bitsPerDigit) - 1, u = biMultiplyByRadixPower(t, a - d); biCompare(e, u) != -1;) ++r.digits[a - d], e = biSubtract(e, u);
    for (var b = a; b > d; --b) {
        var l = b >= e.digits.length ? 0 : e.digits[b],
            h = b - 1 >= e.digits.length ? 0 : e.digits[b - 1],
            f = b - 2 >= e.digits.length ? 0 : e.digits[b - 2],
            c = d >= t.digits.length ? 0 : t.digits[d],
            m = d - 1 >= t.digits.length ? 0 : t.digits[d - 1];
        l == c ? r.digits[b - d - 1] = maxDigitVal : r.digits[b - d - 1] = Math.floor((l * biRadix + h) / c);
        for (var x = r.digits[b - d - 1] * (c * biRadix + m), v = l * biRadixSquared + (h * biRadix + f); x > v;) --r.digits[b - d - 1], x = r.digits[b - d - 1] * (c * biRadix | m), v = l * biRadix * biRadix + (h * biRadix + f);
        u = biMultiplyByRadixPower(t, b - d - 1), e = biSubtract(e, biMultiplyDigit(u, r.digits[b - d - 1])), e.isNeg && (e = biAdd(e, u), --r.digits[b - d - 1])
    }
    return e = biShiftRight(e, o), r.isNeg = i.isNeg != s, i.isNeg && (r = s ? biAdd(r, bigOne) : biSubtract(r, bigOne), t = biShiftRight(t, o), e = biSubtract(t, e)), 0 == e.digits[0] && 0 == biHighIndex(e) && (e.isNeg = !1), new Array(r, e)
}

function biDivide(i, t) {
    return biDivideModulo(i, t)[0]
}

function biModulo(i, t) {
    return biDivideModulo(i, t)[1]
}

function biMultiplyMod(i, t, r) {
    return biModulo(biMultiply(i, t), r)
}

function biPow(i, t) {
    for (var r = bigOne, e = i;;) {
        if (0 != (1 & t) && (r = biMultiply(r, e)), t >>= 1, 0 == t) break;
        e = biMultiply(e, e)
    }
    return r
}

function biPowMod(i, t, r) {
    for (var e = bigOne, n = i, g = t;;) {
        if (0 != (1 & g.digits[0]) && (e = biMultiplyMod(e, n, r)), g = biShiftRight(g, 1), 0 == g.digits[0] && 0 == biHighIndex(g)) break;
        n = biMultiplyMod(n, n, r)
    }
    return e
}

function RSAKeyPair(i, t, r, e) {
    this.e = biFromHex(i), this.d = biFromHex(t), this.m = biFromHex(r), "number" != typeof e ? this.chunkSize = 2 * biHighIndex(this.m) : this.chunkSize = e / 8, this.radix = 16, this.barrett = new BarrettMu(this.m)
}

function encryptedString(i, t, r, e) {
    var n, g, s, d, o, a, u, b, l, h, f = new Array,
        c = t.length,
        m = "";
    for (d = "string" == typeof r ? r == RSAAPP.NoPadding ? 1 : r == RSAAPP.PKCS1Padding ? 2 : 0 : 0, o = "string" == typeof e && e == RSAAPP.RawEncoding ? 1 : 0, 1 == d ? c > i.chunkSize && (c = i.chunkSize) : 2 == d && c > i.chunkSize - 11 && (c = i.chunkSize - 11), n = 0, g = 2 == d ? c - 1 : i.chunkSize - 1; n < c;) d ? f[g] = t.charCodeAt(n) : f[n] = t.charCodeAt(n), n++, g--;
    for (1 == d && (n = 0), g = i.chunkSize - c % i.chunkSize; g > 0;) {
        if (2 == d) {
            for (a = Math.floor(256 * Math.random()); !a;) a = Math.floor(256 * Math.random());
            f[n] = a
        } else f[n] = 0;
        n++, g--
    }
    for (2 == d && (f[c] = 0, f[i.chunkSize - 2] = 2, f[i.chunkSize - 1] = 0), u = f.length, n = 0; n < u; n += i.chunkSize) {
        for (b = new BigInt, g = 0, s = n; s < n + i.chunkSize; ++g) b.digits[g] = f[s++], b.digits[g] += f[s++] << 8;
        l = i.barrett.powMod(b, i.e), h = 1 == o ? biToBytes(l) : 16 == i.radix ? biToHex(l) : biToString(l, i.radix), m += h
    }
    return m
}

function decryptedString(i, t) {
    var r, e, n, g, s = t.split(" "),
        d = "";
    for (e = 0; e < s.length; ++e)
        for (g = 16 == i.radix ? biFromHex(s[e]) : biFromString(s[e], i.radix), r = i.barrett.powMod(g, i.d), n = 0; n <= biHighIndex(r); ++n) d += String.fromCharCode(255 & r.digits[n], r.digits[n] >> 8);
    return 0 == d.charCodeAt(d.length - 1) && (d = d.substring(0, d.length - 1)), d
}
var biRadixBase = 2,
    biRadixBits = 16,
    bitsPerDigit = biRadixBits,
    biRadix = 65536,
    biHalfRadix = biRadix >>> 1,
    biRadixSquared = biRadix * biRadix,
    maxDigitVal = biRadix - 1,
    maxInteger = 9999999999999998,
    maxDigits, ZERO_ARRAY, bigZero, bigOne;
setMaxDigits(20);
var dpl10 = 15,
    lr10 = biFromNumber(1e15),
    hexatrigesimalToChar = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"),
    hexToChar = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"),
    highBitMasks = new Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535),
    lowBitMasks = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535),
    RSAAPP = {};
RSAAPP.NoPadding = "NoPadding",
    RSAAPP.PKCS1Padding = "PKCS1Padding",
    RSAAPP.RawEncoding = "RawEncoding",
    RSAAPP.NumericEncoding = "NumericEncoding";
// function() {
//     function i(i) {
//         var t = new Image,
//             r = "";
//         for (var e in i) r += "&" + e + "=" + encodeURIComponent(i[e]);
//         r = "https://wlmonitor.m.jd.com/web_login_report?" + r.substring(1), t.src = r
//     }
//
//     function t(i, r) {
//         if ("object" == typeof r && null != r)
//             for (var e in r) "object" == typeof r[e] ? (i[e] = r[e].length ? [] : {}, t(i[e], r[e])) : i[e] = r[e]
//     }
//
//     function r(i) {
//         for (var t = location.search.substring(1), r = t.split("&"), e = {}, n = 0; n < r.length; n++) {
//             var g = r[n].split("=");
//             e[g[0]] = g[1]
//         }
//         return e[i] ? e[i] : ""
//     }
//
//     function e(i) {
//         var t = document.cookie.match(new RegExp("(^| )" + i + "=([^;]*)($|;)"));
//         return t ? decodeURIComponent(t[2]) : ""
//     }
//     var n = function(n) {
//         var g = r("appid"),
//             s = e("guid"),
//             d = e("pin"),
//             o = {
//                 appID: g ? parseInt(g, 10) : 100,
//                 interfaceID: 0,
//                 loginName: "",
//                 uuid: s,
//                 pin: d,
//                 guid: s,
//                 os: "5",
//                 netType: "",
//                 appVersion: "1.3.0",
//                 status: "",
//                 callTime: 0
//             };
//         t(o, n), i(o)
//     };
//     window.pl_report = n
// }(window);

//自定义
function myEncode(str, key) {
    str = encodeURIComponent(str);
    setMaxDigits(131);
    var keyPair = new RSAKeyPair("3", "10001", key, 1024);
    return encodeURIComponent(Base64_encode(encryptedString(keyPair, str, RSAAPP.PKCS1Padding, RSAAPP.RawEncoding)));
}

//public method for encoding
function Base64_encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
    input = Base64_ascii_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
            keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

function Base64_utf8_encode (str) {
    str = str.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < str.length; n++) {
        var c = str.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }
    return utftext;
}

function Base64_ascii_encode (str) {
    str = str.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < str.length; n++) {
        var c = str.charCodeAt(n);
        utftext += String.fromCharCode(c);
    }
    return utftext;
}
