// run-tests.mjs
const $status = document.getElementById("status");
const $out = document.getElementById("out");

function escapeHtml(s) {
    return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function lineHtml(text, cls = "") {
    const c = cls ? ` class="${cls}"` : "";
    return `<div${c}>${escapeHtml(text)}</div>`;
}

function createConsoleCapture() {
    const original = {
        log: console.log,
        info: console.info,
        error: console.error
    };
    /** @type {{kind:"log"|"info"|"error", args:any[]}[]} */
    const calls = [];

    function wrap(kind) {
        return (...args) => {
            calls.push({
                kind,
                args
            });
            original[kind](...args);
        };
    }
    console.log = wrap("log");
    console.info = wrap("info");
    console.error = wrap("error");
    return {
        calls,
        restore() {
            console.log = original.log;
            console.info = original.info;
            console.error = original.error;
        }
    };
}

function createTestRunner() {
    /** @type {{name:string, ok:boolean, error?:string}[]} */
    const results = [];

    function assert(cond, msg) {
        if (!cond) throw new Error(msg || "assertion failed");
    }

    function eq(a, b, msg) {
        if (a !== b) throw new Error(msg || `expected ${a} === ${b}`);
    }

    function match(str, re, msg) {
        if (!re.test(str)) throw new Error(msg || `expected "${str}" to match ${re}`);
    }

    function includes(hay, needle, msg) {
        if (!String(hay).includes(String(needle))) throw new Error(msg || `expected "${hay}" to include "${needle}"`);
    }

    function test(name, fn) {
        try {
            fn();
            results.push({
                name,
                ok: true
            });
        } catch (e) {
            results.push({
                name,
                ok: false,
                error: e?.message || String(e)
            });
        }
    }

    function summary() {
        const pass = results.filter(r => r.ok).length;
        const fail = results.length - pass;
        return {
            pass,
            fail,
            total: results.length,
            results
        };
    }

    return {
        test,
        assert,
        eq,
        match,
        includes,
        summary
    };
}

function findAnyCallText(calls) {
    return calls
        .map(c => c.args.map(a => (typeof a === "string" ? a : "")).join(" "))
        .join("\n");
}

function lastCall(calls, kind = null) {
    const arr = kind ? calls.filter(c => c.kind === kind) : calls;
    return arr.length ? arr[arr.length - 1] : null;
}

(async function main() {
    $status.textContent = "Running…";

    const cap = createConsoleCapture();
    const {
        opt,
        j
    } = await import("./jimba.js");
    const T = createTestRunner();

    function resetOpt() {
        opt.TOTAL_FAIL = 0;
        opt.TOTAL_PASS = 0;
        opt.TOTAL_TESTS_PASS = 0;
        opt.TOTAL_TESTS_FAIL = 0;
        opt.TOTAL_TESTS_RUN = 0;
        opt.TOTAL_WRONG_DATA_TYPES_PARAMS = 0;
        opt._R = 0;
        opt._M = 0;
        opt._FailsOnly = 0;
        opt._T = 0;
        opt._O = 0;
        opt._Ob = 0;
        opt._F = 0;
        opt._Tc = 1;
        opt._tNo = 20;
        opt._Min = -100;
        opt._Max = 100;
        opt._FUNCTIONS = Object.create(null);
    }

    function clearCaptured() {
        cap.calls.length = 0;
    }

    // ----------------------------
    // TESTS: j.log
    // ----------------------------

    T.test("j.log respects _O/_R switches (off => no output)", () => {
        resetOpt();
        clearCaptured();
        j.log({
            a: 1
        });
        T.eq(cap.calls.length, 0);
    });

    T.test("j.log prints INFO on one line when _O=1", () => {
        resetOpt();
        opt._O = 1;
        clearCaptured();
        j.log({
            varb: 89
        }, false, "at test (https://x/y/jimba.html:81:5)");
        const c = lastCall(cap.calls, "log");
        T.assert(!!c, "expected a console.log call");
        T.includes(c.args[0], "INFO");
        T.includes(c.args[c.args.length - 1], "at jimba.html:81:5");
    });

    T.test("j.log prefers __jimba_site over stack", () => {
        resetOpt();
        opt._O = 1;
        clearCaptured();
        j.log({
            __jimba_site: "at fn (https://site/a.html:2:3)",
            x: 1
        });
        const c = lastCall(cap.calls, "log");
        T.includes(c.args[c.args.length - 1], "a.html:2:3");
    });

    T.test("j.log uses siteOverride if provided", () => {
        resetOpt();
        opt._O = 1;
        clearCaptured();
        j.log({
            x: 1
        }, false, "at ov (https://ovr/ov.html:9:1)");
        const c = lastCall(cap.calls, "log");
        T.includes(c.args[c.args.length - 1], "ov.html:9:1");
    });

    // ----------------------------
    // TESTS: j.test + assertions
    // ----------------------------
    T.test("PASS prints when _T=1", () => {
        resetOpt();
        opt._T = 1;
        clearCaptured();
        j.test("suite", "x is number", 12).num();
        const text = findAnyCallText(cap.calls);
        T.includes(text, "✓ PASS");
        T.includes(text, "num");
        T.eq(opt.TOTAL_TESTS_PASS, 1);
        T.eq(opt.TOTAL_PASS, 1);
    });

    T.test("FAIL prints rule + fTitle expression", () => {
        resetOpt();
        opt._T = 1;
        clearCaptured();
        j.test("comput", "sqr = sum(10) * sum(10)", 100).neg();
        const text = findAnyCallText(cap.calls);
        T.includes(text, "✗ FAIL");
        T.includes(text, "negative");
        T.includes(text, "sqr = sum(10) * sum(10)");
        T.eq(opt.TOTAL_TESTS_FAIL, 1);
        T.eq(opt.TOTAL_FAIL, 1);
    });

    T.test("_FailsOnly hides PASS output but still counts passes", () => {
        resetOpt();
        opt._T = 1;
        opt._FailsOnly = 1;
        clearCaptured();
        j.test("suite", "x is number", 12).num();
        const text = findAnyCallText(cap.calls);
        T.assert(!text.includes("✓ PASS"), "PASS should be hidden");
        T.eq(opt.TOTAL_TESTS_PASS, 1);
        T.eq(opt.TOTAL_PASS, 1);
    });

    T.test("_FailsOnly still shows FAIL output", () => {
        resetOpt();
        opt._T = 1;
        opt._FailsOnly = 1;
        clearCaptured();
        j.test("suite", "x negative", 5).neg();
        const text = findAnyCallText(cap.calls);
        T.includes(text, "✗ FAIL");
        T.includes(text, "negative");
        T.eq(opt.TOTAL_TESTS_FAIL, 1);
        T.eq(opt.TOTAL_FAIL, 1);
    });

    T.test("assert coverage: object/array/string/bool/num/dec/range", () => {
        resetOpt();
        opt._T = 1;
        clearCaptured();
        j.test("suite", "object", {
            a: 1
        }).object();
        j.test("suite", "array", [1, 2]).array();
        j.test("suite", "string", "x").string();
        j.test("suite", "bool", true).bool();
        j.test("suite", "num", 3).num();
        j.test("suite", "dec", 0.25).dec();
        j.test("suite", "range", 55).range(50, 60);
        T.eq(opt.TOTAL_TESTS_PASS, 7);
    });

    // ----------------------------
    // TESTS: j.check (basic sanity)
    // ----------------------------
    T.test("j.check increments totals", () => {
        resetOpt();
        opt._T = 1;
        clearCaptured();
        j.check("eq-number", 5, 5);
        T.eq(opt.TOTAL_TESTS_RUN, 1);
        T.eq(opt.TOTAL_TESTS_PASS, 1);
    });

    // ----------------------------
    // TESTS: profiling
    // ----------------------------
    T.test("j.s increments opt._FUNCTIONS map", () => {
        resetOpt();
        j.s("comput");
        j.s("comput");
        T.eq(opt._FUNCTIONS.comput, 2);
    });

    T.test("j.s/j.e print timing when _F=1", () => {
        resetOpt();
        opt._F = 1;
        clearCaptured();
        j.s("complex");
        j.e("complex");
        const text = findAnyCallText(cap.calls);
        T.includes(text, "⏱ START");
        T.includes(text, "⏱ TIME");
    });

    // ----------------------------
    // TESTS: generators
    // ----------------------------
    T.test("id() returns 32 uppercase hex chars", () => {
        resetOpt();
        const id = j.id();
        T.eq(id.length, 32);
        T.match(id, /^[0-9A-F]{32}$/);
    });

    // ----------------------------
    // TESTS: trics runs N times (FIXED: no console-text dependency)
    // ----------------------------
    T.test("trics runs function n times + counts passes", () => {
        resetOpt();
        opt._T = 1;
        let count = 0;
        const fn = () => {
            count++;
            j.test("suite", "x is num", 1).num();
        };
        clearCaptured();
        j.trics(fn, 5);
        T.eq(count, 5);
        T.eq(opt.TOTAL_TESTS_PASS, 5);
        T.eq(opt.TOTAL_PASS, 5);
    });

    // ----------------------------
    // Render
    // ----------------------------
    const sum = T.summary();
    window.JIMBA_TEST_RESULTS = {
        ok: sum.fail === 0,
        ...sum,
        consoleCalls: cap.calls
    };

    document.title = sum.fail === 0 ? "Jimba Tests: PASS" : "Jimba Tests: FAIL";
    $status.innerHTML = sum.fail === 0 ?
        `<span class="ok">PASS</span> (${sum.pass}/${sum.total})` :
        `<span class="bad">FAIL</span> (${sum.pass}/${sum.total})`;

    const lines = [];
    lines.push(lineHtml(`Results: ${sum.pass}/${sum.total} passed`, sum.fail === 0 ? "ok" : "bad"));

    for (const r of sum.results) {
        if (r.ok) {
            lines.push(lineHtml(`✓ ${r.name}`, "ok"));
        } else {
            lines.push(lineHtml(`✗ ${r.name}  -> ${r.error}`, "bad"));
        }
    }

    $out.innerHTML = lines.join("");
})();