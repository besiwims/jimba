/**
 * --------------------------------------------------------------------------
*Library:   Jimba.js
*Version:   1.3.6
*Author:    Bernard Sibanda
*Company:   Coxygen Global
*Date:      29 December 2025
*License:   MIT
-----------------------------------------------------------------------------
 * Jimba.js (browser-friendly)
 * Minimal, tree-shakeable core: logging, unit checks, profiling counters, random generators.
 * Notes:
 * - j.log({}) prints INFO only (no PASS/FAIL badges).But gives you more than console.log.
 * - j.test(...).<assert>() prints PASS/FAIL badges.
 * - opt._FailsOnly = 1 hides all PASS output (and hides INFO by default if you want; currently it hides only PASS).
 */

/** @type {Record<string, any>} */
const opt = {
    TOTAL_FAIL: 0,
    TOTAL_PASS: 0,
    TOTAL_TESTS_PASS: 0,
    TOTAL_TESTS_FAIL: 0,
    TOTAL_TESTS_RUN: 0,
    TOTAL_WRONG_DATA_TYPES_PARAMS: 0,
    _R: 0, // run all
    _M: 0, // verbose tracing
    _FailsOnly: 0, // show only fails
    _T: 0, // enable tests output
    _O: 0, // enable log output
    _Ob: 0, // extra trace for fails
    _F: 0, // enable function timing output
    _Tc: 1, // counter
    _tNo: 20,
    _Min: -100,
    _Max: 100,
    _FUNCTIONS: Object.create(null) // function-call counters
};

/**
 * Safe console wrapper (prevents console monkey-patching from breaking Jimba).
 * @type {{log:Function, info:Function, error:Function}}
 */
const _console = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    error: console.error.bind(console)
};

/**
 * Styling tokens used across output formatting.
 * @type {Record<string, string>}
 */
const CSS = {
    badgePass: "background:#0b6b2a;color:#fff;font-weight:700;padding:2px 6px;border-radius:10px",
    badgeFail: "background:#8b0000;color:#fff;font-weight:700;padding:2px 6px;border-radius:10px",
    badgeInfo: "background:orange;color:#fff;font-weight:700;padding:2px 6px;border-radius:10px",
    badgeTotalPass: "background:blue;color:#fff;font-weight:700;padding:2px 6px;border-radius:10px",
    badgeTotalFail: "background:red;color:#fff;font-weight:700;padding:2px 6px;border-radius:10px",
    brownBackground: "background:#8b5a2b;color:#fff;font-weight:800;padding:2px 8px;border-radius:10px",
    dim: "color:#94a3b8",
    title: "color:#a855f7;font-weight:700",
    msg: "color:#e5e7eb",
    value: "color:#22c55e;font-weight:700"
};

/**
 * Captures the best callsite line not inside jimba.js.
 * @returns {string} e.g. "at comput (https://.../page.html:87:3)"
 */
function getCallSite() {
    const stack = String(new Error().stack || "");
    const lines = stack.split("\n").map((s) => s.trim()).filter(Boolean);
    for (const l of lines) {
        if (!l.startsWith("at ")) continue;
        if (l.includes("jimba.js")) continue;
        if (l.includes("getCallSite")) continue;
        return l;
    }
    const fb = lines.find((l) => l.startsWith("at "));
    return fb || "at (unknown)";
}

/**
 * Converts "at ... (url:line:col)" into a short "file:line:col".
 * @param {string} siteLine
 * @returns {string}
 */
function shortSite(siteLine) {
    const s = String(siteLine || "");
    const m = s.match(/(https?:\/\/.+):(\d+):(\d+)/);
    if (!m) return s.replace(/^at\s+/, "");
    const file = m[1].split("/").pop();
    return `${file}:${m[2]}:${m[3]}`;
}

/**
 * Parses a stack line into function name and location (file:line:col).
 * @param {string} siteLine
 * @returns {{fn:string, loc:string}}
 */
function parseSite(siteLine) {
    const s = String(siteLine || "");
    const m =
        s.match(/at\s+(.+?)\s+\((.+):(\d+):(\d+)\)/) ||
        s.match(/at\s+(.+):(\d+):(\d+)/);

    if (!m) return {
        fn: "",
        loc: ""
    };

    if (m.length === 5) {
        const fn = m[1];
        const url = m[2];
        const line = m[3];
        const col = m[4];
        const file = url.split("/").pop();
        return {
            fn,
            loc: `${file}:${line}:${col}`
        };
    }

    const url = m[1];
    const line = m[2];
    const col = m[3];
    const file = url.split("/").pop();
    return {
        fn: "",
        loc: `${file}:${line}:${col}`
    };
}

/**
 * Prints a single-line INFO entry: "INFO {obj} at file:line:col".
 * @param {any} obj
 * @param {string} siteLine
 * @returns {void}
 */
// function infoOneLine(obj, siteLine) {
//   const loc = shortSite(siteLine);
//   _console.log("%cINFO%c", INFO_BADGE, "", obj, `at ${loc}`);
// }

const INFO_BADGE_ = "background:#f59e0b;color:#111827;font-weight:700;padding:2px 8px;border-radius:10px";
const INFO_BADGE_BAD = "background:#8b0000;color:#fff;font-weight:700;padding:2px 8px;border-radius:10px";

/**
 * Returns true if obj contains a "bad" (nullable/empty) value anywhere inside.
 * - null / undefined
 * - "null" / "undefined" (strings)
 * - "" (empty string)
 * - NaN
 * - (optional) 0
 */
function hasBadValue(obj, {
    includeZero = false,
    maxDepth = 6
} = {}) {
    const seen = new WeakSet();

    const isBad = (v) => {
        if (v === null || v === undefined) return true;
        if (typeof v === "string") {
            const s = v.trim().toLowerCase();
            if (s === "" || s === "null" || s === "undefined") return true;
            return false;
        }
        if (typeof v === "number") {
            if (Number.isNaN(v)) return true;
            if (includeZero && v === 0) return true;
            return false;
        }
        return false;
    };

    const walk = (v, depth) => {
        if (isBad(v)) return true;
        if (depth <= 0) return false;

        if (v && typeof v === "object") {
            if (seen.has(v)) return false; // prevent circular loops
            seen.add(v);

            if (Array.isArray(v)) {
                for (const item of v)
                    if (walk(item, depth - 1)) return true;
                return false;
            }

            for (const key of Object.keys(v)) {
                if (walk(v[key], depth - 1)) return true;
            }
        }

        return false;
    };

    return walk(obj, maxDepth);
}

/**
 * INFO logger that turns badge red if obj has nullable/bad values.
 * @param {any} obj
 * @param {string} siteLine
 * @returns {void}
 */
function infoOneLine(obj, siteLine) {
    const loc = shortSite(siteLine);

    const bad = hasBadValue(obj, {
        includeZero: false, // set true if you want 0 to count as bad
        maxDepth: 6
    });

    const badgeCss = bad ? INFO_BADGE_BAD : INFO_BADGE_;
    const label = bad ? "✗ FAIL" : "INFO";

    _console.log(`%c${label}%c`, badgeCss, "", obj, `at ${loc}`);
}


/**
 * Prints a PASS/FAIL assertion line for tests.
 * @param {{ok:boolean, actual:any, rule:string, expr?:string, site?:string}} args
 * @returns {void}
 */
function prettyAssert({
    ok,
    actual,
    rule,
    expr,
    site
}) {
    const {
        fn,
        loc
    } = parseSite(site);
    const badge = ok ? "✓ PASS" : "✗ FAIL";
    const badgeCss = ok ? CSS.badgePass : CSS.badgeFail;
    const exprText = expr ? ` • ${expr}` : "";
    _console.log(
        `%c${badge}%c %c${rule}%c %c${String(actual)}%c %c${fn ? fn + " • " : ""}${loc}%c%c${exprText}`,
        badgeCss,
        "",
        CSS.title,
        "",
        CSS.value,
        "",
        CSS.dim,
        "",
        CSS.msg
    );
}

/**
 * Increments totals and prints PASS (unless FailsOnly).
 * @param {any} actual
 * @param {string} rule
 * @param {number} k
 * @param {{title?:string,fTitle?:string,site?:string}|null} ctx
 * @returns {void}
 */
function pass(actual, rule, k, ctx) {
    if (!((opt._R === 1) || (k !== 0) || (opt._T === 1))) return;
    if (opt._FailsOnly === 1) {
        opt.TOTAL_PASS++;
        opt.TOTAL_TESTS_PASS++;
        return;
    }
    prettyAssert({
        ok: true,
        actual,
        rule,
        expr: ctx?.fTitle,
        site: ctx?.site
    });
    opt.TOTAL_PASS++;
    opt.TOTAL_TESTS_PASS++;
}

/**
 * Increments totals and prints FAIL.
 * @param {any} actual
 * @param {string} rule
 * @param {number} k
 * @param {{title?:string,fTitle?:string,site?:string}|null} ctx
 * @returns {void}
 */
function fail(actual, rule, k, ctx) {
    if (!((opt._FailsOnly === 1) || opt._R || (k !== 0) || (opt._T === 1))) return;
    prettyAssert({
        ok: false,
        actual,
        rule,
        expr: ctx?.fTitle,
        site: ctx?.site
    });
    opt.TOTAL_FAIL++;
    opt.TOTAL_TESTS_FAIL++;
}

/**
 * Comparison/assertion methods returned from j.test(...)
 */
class ComparisonMethods {
    /**
     * @param {any} actual
     * @param {string} expectedValue
     * @param {number} k
     * @param {{title?:string,fTitle?:string,site?:string}|null} ctx
     */
    constructor(actual, expectedValue = "", k = 0, ctx = null) {
        this.actual = actual;
        this.expectedValue = expectedValue;
        this.k = k;
        this.ctx = ctx;
    }

    /** @param {number} start @param {number} end @param {number} [k=0] @returns {void} */
    between(start, end, k = 0) {
        (this.actual >= start && this.actual <= end) ?
        pass(this.actual, this.expectedValue, k, this.ctx): fail(this.actual, this.expectedValue, k, this.ctx);
    }

    /** @param {any} expected @param {number} [k=0] @returns {void} */
    eq(expected, k = 0) {
        (expected === this.actual) ?
        pass(this.actual, String(expected), k, this.ctx): fail(this.actual, String(expected), k, this.ctx);
    }

    /** @param {number} expected @param {number} [k=0] @returns {void} */
    gt(expected, k = 0) {
        (this.actual > expected) ? pass(this.actual, "gt", k, this.ctx): fail(this.actual, "gt", k, this.ctx);
    }

    /** @param {number} expected @param {number} [k=0] @returns {void} */
    lt(expected, k = 0) {
        (this.actual < expected) ? pass(this.actual, "lt", k, this.ctx): fail(this.actual, "lt", k, this.ctx);
    }

    /** @param {number} expected @param {number} [k=0] @returns {void} */
    geq(expected, k = 0) {
        (this.actual >= expected) ? pass(this.actual, "geq", k, this.ctx): fail(this.actual, "geq", k, this.ctx);
    }

    /** @param {number} expected @param {number} [k=0] @returns {void} */
    leq(expected, k = 0) {
        (expected >= this.actual) ? pass(this.actual, "leq", k, this.ctx): fail(this.actual, "leq", k, this.ctx);
    }

    /** @param {string} expected @param {number} [k=0] @returns {void} */
    contains(expected, k = 0) {
        const ok = this.actual != null && String(this.actual).includes(expected);
        ok ? pass(this.actual, `contains ${expected}`, k, this.ctx) : fail(this.actual, `contains ${expected}`, k, this.ctx);
    }

    /** @param {number} [k=0] @returns {void} */
    null(k = 0) {
        const v = this.actual;
        const ok = v == null || v === 0 || v === "" || v === "null" || v === "undefined";
        ok ? pass(this.actual, "null", k, this.ctx) : fail(this.actual, "null", k, this.ctx);
    }

    /** @param {number} [k=0] @returns {void} */
    notNull(k = 0) {
        const v = this.actual;
        const ok = !(v == null || v === 0 || v === "" || v === "null" || v === "undefined");
        ok ? pass(this.actual, "notNull", k, this.ctx) : fail(this.actual, "notNull", k, this.ctx);
    }

    /** @param {number} [k=0] @returns {void} */
    object(k = 0) {
        const ok = this.actual !== null && typeof this.actual === "object" && !Array.isArray(this.actual);
        ok ? pass(this.actual, "object", k, this.ctx) : fail(this.actual, "object", k, this.ctx);
    }

    /** @param {number} [k=0] @returns {void} */
    array(k = 0) {
        Array.isArray(this.actual) ? pass(this.actual, "array", k, this.ctx) : fail(this.actual, "array", k, this.ctx);
    }

    /** @param {number} [k=0] @returns {void} */
    neg(k = 0) {
        (typeof this.actual === "number" && this.actual < 0) ? pass(this.actual, "negative", k, this.ctx): fail(this.actual, "negative", k, this.ctx);
    }

    /** @param {number} [k=0] @returns {void} */
    pos(k = 0) {
        (typeof this.actual === "number" && this.actual >= 0) ? pass(this.actual, "positive", k, this.ctx): fail(this.actual, "positive", k, this.ctx);
    }

    /** @param {number} [k=0] @returns {void} */
    bool(k = 0) {
        (typeof this.actual === "boolean") ? pass(this.actual, "bool", k, this.ctx): fail(this.actual, "bool", k, this.ctx);
    }

    /** @param {number} [k=0] @returns {void} */
    notBool(k = 0) {
        (typeof this.actual !== "boolean") ? pass(this.actual, "notBool", k, this.ctx): fail(this.actual, "notBool", k, this.ctx);
    }

    /** @param {number} [k=0] @returns {void} */
    num(k = 0) {
        (typeof this.actual === "number") ? pass(this.actual, "num", k, this.ctx): fail(this.actual, "num", k, this.ctx);
    }

    /** @param {number} [k=0] @returns {void} */
    dec(k = 0) {
        const n = this.actual;
        (typeof n === "number" && n - Math.floor(n) !== 0) ? pass(this.actual, "decimal", k, this.ctx): fail(this.actual, "not a decimal", k, this.ctx);
    }

    /** @param {number} [min=0] @param {number} [max=100] @param {number} [k=0] @returns {void} */
    range(min = 0, max = 100, k = 0) {
        (typeof this.actual === "number" && this.actual >= min && this.actual <= max) ?
        pass(this.actual, "range pass", k, this.ctx): fail(this.actual, "range fail", k, this.ctx);
    }

    /** @param {number} [k=0] @returns {void} */
    string(k = 0) {
        (typeof this.actual === "string") ? pass(this.actual, "string", k, this.ctx): fail(this.actual, "string", k, this.ctx);
    }
}

/**
 * Generates random string from a character set.
 * @param {string} chars
 * @param {number} len
 * @returns {string}
 */
function charProcess(chars = "abcdefghijklmnopqrstuvwxyz", len = 10) {
    if (len <= 0) return "";
    let out = "";
    for (let i = 0; i < len; i++) out += chars.charAt((Math.random() * chars.length) | 0);
    return out;
}

/**
 * Compares arrays by JSON stringification.
 * @param {any[]} a
 * @param {any[]} b
 * @returns {boolean}
 */
function compareArrays(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Deep-ish object compare (safe + stable keys, JSON compares values).
 * @param {Record<string, any>} a
 * @param {Record<string, any>} b
 * @returns {boolean}
 */
function compareObjects(a, b) {
    if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;
    const ak = Object.keys(a).sort();
    const bk = Object.keys(b).sort();
    if (!compareArrays(ak, bk)) return false;
    for (const k of ak)
        if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) return false;
    return true;
}

/**
 * Prints summary of passes (tests only).
 * @param {number} [k=0]
 * @returns {void}
 */
function passes(k = 0) {
    if (opt._FailsOnly === 1) return;
    if (!(opt._O || opt._T === 1 || opt._R || k !== 0)) return;
    if (opt._T === 0) return;
    if (opt.TOTAL_PASS > 0) _console.log("%cTOTAL_PASSES : " + opt.TOTAL_PASS, CSS.badgeTotalPass);
}

/**
 * Prints summary of failures.
 * @param {number} [k=0]
 * @returns {void}
 */
function fails(k = 0) {
    if (!(opt._O || opt._T === 1 || opt._R || k !== 0)) return;
    if (opt.TOTAL_FAIL > 0) _console.log("%cTOTAL_ERRORS : " + opt.TOTAL_FAIL, CSS.badgeTotalFail);
}

/**
 * Prints function call totals and map.
 * @param {number} [k=0]
 * @returns {void}
 */
function funcs(k = 0) {
    if (!(opt._F === 1 || opt._R === 1 || k !== 0)) return;
    const m = opt._FUNCTIONS && typeof opt._FUNCTIONS === "object" ? opt._FUNCTIONS : {};
    const total = Object.values(m).reduce((a, b) => a + b, 0);
    _console.log("%cTOTAL_FUNCTION_CALLS : " + total, "background:blue;color:#fff;font-weight:800;padding:2px 8px;border-radius:10px");
    _console.log("%cFUNCTION_CALLS_MAP", CSS.brownBackground, m);
}

/**
 * Prints test totals.
 * @param {number} [k=0]
 * @returns {void}
 */
function tests(k = 0) {
    if (!(opt._T === 1 || opt._R || k !== 0)) return;
    if (opt.TOTAL_TESTS_PASS > 0) _console.log("%cTOTAL_TESTS_PASS : " + opt.TOTAL_TESTS_PASS, "background-color:blue;color:#fff;");
    if (opt.TOTAL_TESTS_FAIL > 0) _console.log("%cTOTAL_TESTS_FAIL : " + opt.TOTAL_TESTS_FAIL, CSS.badgeFail);
    if (opt.TOTAL_TESTS_RUN > 0) _console.log("%cTOTAL_TESTS_RUN : " + opt.TOTAL_TESTS_RUN, "background-color:blue;color:#fff;");
    if (opt.TOTAL_WRONG_DATA_TYPES_PARAMS > 0) _console.log("%cTOTAL_WRONG_DATA_TYPES_PARAMS : " + opt.TOTAL_WRONG_DATA_TYPES_PARAMS, "background-color:blue;color:#fff;");
}

const _timers = Object.create(null);

/**
 * Starts a timer label.
 * @param {string} label
 * @returns {void}
 */
function prettyTimeStart(label) {
    _timers[label] = performance.now();
    _console.log(`%c⏱ START%c ${label}`, CSS.badgeInfo, CSS.msg);
}

/**
 * Ends a timer label and prints duration.
 * @param {string} label
 * @returns {void}
 */
function prettyTimeEnd(label) {
    const t0 = _timers[label];
    const ms = t0 ? performance.now() - t0 : 0;
    delete _timers[label];
    _console.log(`%c⏱ TIME%c ${label}%c ${ms.toFixed(3)} ms`, CSS.badgeInfo, CSS.msg, CSS.dim);
}

/**
 * Public Jimba API.
 * @type {{
 *   log:(o:any, stop?:boolean, siteOverride?:string|null)=>void,
 *   test:(title:string, fTitle:string, actual:any, k?:number)=>ComparisonMethods,
 *   check:(title:string, varString:any, expectedAnswer:any, k?:number)=>void,
 *   s:(label:string, k?:number)=>void,
 *   e:(label:string, k?:number)=>void,
 *   rTP:(fn:Function, n?:number)=>void,
 *   trics:(fn:Function, n?:number, k?:number)=>void,
 *   hexR:()=>string,
 *   gNo:(min?:number, max?:number)=>number,
 *   gDec:()=>number,
 *   gANo:(min?:number, max?:number)=>number,
 *   gBool:(n?:number)=>boolean[],
 *   gNull:(n?:number)=>any[],
 *   chrs:(len?:number)=>string,
 *   id:()=>string,
 *   upperC:(len?:number)=>string,
 *   lowerC:(len?:number)=>string,
 *   digts:(len?:number)=>string,
 *   symbls:(len?:number)=>string
 * }}
 */
const j = {
    /**
     * INFO logger (single-line). Honors opt._O and opt._R.
     * @param {any} o
     * @param {boolean} [stop=false]
     * @param {string|null} [siteOverride=null]
     * @returns {void}
     */
    log(o, stop = false, siteOverride = null) {
        if (stop) return;
        if (!(opt._O === 1 || opt._R === 1)) return;

        const site = (() => {
            if (siteOverride != null) return siteOverride;
            if (o && typeof o === "object") {
                if (o.__jimba_site) return o.__jimba_site;
                if (o.site) return o.site;
            }
            return getCallSite();
        })();

        infoOneLine(o, site);
    },

    /**
     * Creates a test context and returns assertion helpers.
     * @param {string} title Test suite/group label
     * @param {string} fTitle Expression/description to show on FAIL
     * @param {any} actual Value to test
     * @param {number} [k=0] Force-run flag
     * @returns {ComparisonMethods}
     */
    test(title, fTitle, actual, k = 0) {
        const site = getCallSite();
        const id = opt._Tc++;
        const ctx = {
            id,
            title,
            fTitle,
            site
        };
        return new ComparisonMethods(actual, "", k, ctx);
    },

    /**
     * Simple equality check helper (string/number/boolean/array/object).
     * @param {string} title
     * @param {any} varString
     * @param {any} expectedAnswer
     * @param {number} [k=0]
     * @returns {void}
     */
    check(title, varString, expectedAnswer, k = 0) {
        if (!title || varString == null || expectedAnswer == null) {
            if (opt._T === 1) {
                opt.TOTAL_TESTS_FAIL++;
                opt.TOTAL_FAIL++;
                _console.log("%cX FAIL : First three parameters are mandatory!", CSS.badgeFail);
            }
            return;
        }

        opt.TOTAL_TESTS_RUN++;
        if (!(opt._R || k !== 0 || opt._T === 1)) return;

        const bothArrays = Array.isArray(varString) && Array.isArray(expectedAnswer);
        const bothObjects = varString && expectedAnswer && typeof varString === "object" && typeof expectedAnswer === "object" && !bothArrays;

        const ok = bothArrays ?
            compareArrays(varString, expectedAnswer) :
            bothObjects ?
            compareObjects(varString, expectedAnswer) :
            varString === expectedAnswer;

        if (ok) {
            if (opt._FailsOnly === 0) {
                opt.TOTAL_PASS++;
                opt.TOTAL_TESTS_PASS++;
                _console.log("%c✓ PASS : " + String(varString), "background-color:#fff;color:green;");
            }
            return;
        }

        opt.TOTAL_FAIL++;
        opt.TOTAL_TESTS_FAIL++;
        _console.log("%cX FAIL : Am expecting " + String(expectedAnswer) + " but got " + String(varString), "background-color:#fff;color:red;");
    },

    /**
     * Function profiling start: increments function call count and optionally starts timer output.
     * @param {string} label
     * @param {number} [k=0]
     * @returns {void}
     */
    s(label, k = 0) {
        if (!label) return;
        if (typeof opt._FUNCTIONS !== "object" || opt._FUNCTIONS === null || Array.isArray(opt._FUNCTIONS)) {
            opt._FUNCTIONS = Object.create(null);
        }
        opt._FUNCTIONS[label] = (opt._FUNCTIONS[label] || 0) + 1;
        if (opt._FailsOnly === 1) return;
        if (!(opt._F === 1 || opt._R === 1 || k !== 0)) return;
        prettyTimeStart(label);
    },

    /**
     * Function profiling end: ends timer output (if enabled).
     * @param {string} label
     * @param {number} [k=0]
     * @returns {void}
     */
    e(label, k = 0) {
        if (!label) return;
        if (opt._FailsOnly === 1) return;
        if (!(opt._F === 1 || opt._R === 1 || k !== 0)) return;
        prettyTimeEnd(label);
    },

    /**
     * Runs a function repeatedly n times.
     * @param {Function} fn
     * @param {number} [n=opt._tNo]
     * @returns {void}
     */
    rTP(fn, n = opt._tNo) {
        for (let i = 0; i < n; i++) fn();
    },

    /**
     * Property-style runner: calls fn n times, then prints summaries.
     * @param {Function} fn
     * @param {number} [n=opt._tNo]
     * @param {number} [k=0]
     * @returns {void}
     */
    trics(fn, n = opt._tNo, k = 0) {
        if (typeof fn === "function")
            for (let i = 0; i < n; i++) fn();
        passes(k);
        fails(k);
        funcs(k);
        tests(k);
    },

    /** @returns {string} */
    hexR() {
        return (Math.random() * 0xfffff * 1e6).toString(16);
    },

    /** @param {number} [min=opt._Min] @param {number} [max=opt._Max] @returns {number} */
    gNo(min = opt._Min, max = opt._Max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /** @returns {number} */
    gDec() {
        return Math.random();
    },

    /** @param {number} [min=opt._Min] @param {number} [max=opt._Max] @returns {number} */
    gANo(min = opt._Min, max = opt._Max) {
        return Math.random() * (max - min + 1) + min;
    },

    /** @param {number} [n=1] @returns {boolean[]} */
    gBool(n = 1) {
        n = n > 0 ? n : opt._tNo;
        const a = [];
        for (let i = 0; i < n; i++) a.push(Math.random() < 0.5);
        return a;
    },

    /** @param {number} [n=1] @returns {any[]} */
    gNull(n = 1) {
        n = n > 0 ? n : opt._tNo;
        const nulls = [{
                empty: null
            }, {
                empty: undefined
            }, {
                empty: "null"
            }, {
                empty: "undefined"
            },
            null, undefined, 0, "", {
                empty: [0]
            }, {
                empty: ""
            }, {
                empty: "0"
            }, {
                empty: 0
            },
            {
                empty: []
            }, {
                empty: {}
            },
            [0],
            [],
            [""], {}, -1
        ];
        const a = [];
        for (let i = 0; i < n; i++) a.push(nulls[(Math.random() * nulls.length) | 0]);
        return a;
    },

    /** @param {number} [len=10] @returns {string} */
    chrs(len = 10) {
        return charProcess('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_?|[]{}:",.!@#$%^&*()+~`', len);
    },

    /** @returns {string} */
    id() {
        return self.crypto.randomUUID().replace(/-/g, "").toUpperCase();
    },

    /** @param {number} [len=10] @returns {string} */
    upperC(len = 10) {
        return charProcess("ABCDEFGHIJKLMNOPQRSTUVWXYZ", len);
    },

    /** @param {number} [len=10] @returns {string} */
    lowerC(len = 10) {
        return charProcess("abcdefghijklmnopqrstuvwxyz", len);
    },

    /** @param {number} [len=10] @returns {string} */
    digts(len = 10) {
        return charProcess("0123456789", len);
    },

    /** @param {number} [len=10] @returns {string} */
    symbls(len = 10) {
        return charProcess("'-_?|[]{}:\",.!@#$%^&*()+~\\><=", len);
    }
};

export { j, opt };
