"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var src_exports = {};
__export(src_exports, {
  j: () => j,
  opt: () => opt
});
module.exports = __toCommonJS(src_exports);
var opt = {
  TOTAL_FAIL: 0,
  TOTAL_PASS: 0,
  TOTAL_TESTS_PASS: 0,
  TOTAL_TESTS_FAIL: 0,
  TOTAL_TESTS_RUN: 0,
  TOTAL_WRONG_DATA_TYPES_PARAMS: 0,
  //counts wrong parameter types mismatch given to functions
  _R: 0,
  //run all
  _M: 0,
  // trace frames for o() functions
  _FailsOnly: 0,
  //run only failors
  _T: 0,
  // run all tests
  _O: 0,
  //run j log objects tracing
  _Ob: 0,
  //show objects of ComparisonMethods
  _F: 0,
  // run functions only
  _Tc: 1,
  // count tests only
  _tNo: 20,
  // standard number for iterations on gRvalues which is an object of arbitraries generators
  _Min: -100,
  //used by gRvalues for lowest value
  _Max: 100,
  //used by gRvalues for max value
  _FUNCTIONS: []
  //collects all profiled functions
};
var j = {
  log: (o) => {
    if (opt._O === 1 || opt._R === 1) {
      try {
        if (o == null || o == void 0 || o == 0 || o == "") {
          console.info("%cX FAIL ", "background-color:darkred;color:#fff;");
          opt.TOTAL_FAIL++;
          if (opt._M === 1) {
            console.info(o);
          }
        } else {
          if (typeof o == "object" && o != null) {
            const name = Object.keys(o);
            const val = Object.values(o);
            if (val == "" || val == 0 || val == "null" || val == "undefined" || val == [""]) {
              console.info("%cX FAIL ", "background-color:darkred;color:#fff;");
              opt.TOTAL_FAIL++;
              console.info(o);
            } else {
              if (opt._FailsOnly === 0) {
                const nesteddValue_ = Object.values(o);
                if (nesteddValue_) {
                  const nesteddValue = Object.values(nesteddValue_);
                  if (typeof Object.values(nesteddValue) == Number) {
                    return;
                  }
                  const st = JSON.stringify(Object.values(nesteddValue));
                  if (!(st === "[{}]")) {
                    console.info("%c\u2713 PASS ", "background-color:darkgreen;color:#fff;");
                    opt.TOTAL_PASS++;
                    if (opt._M) {
                      console.trace(o);
                    } else {
                      console.info(o);
                    }
                  } else {
                    console.info("%cX FAIL ", "background-color:darkred;color:#fff;");
                    opt.TOTAL_FAIL++;
                    if (opt._M) {
                      console.trace(o);
                    } else {
                      console.info(o);
                    }
                  }
                } else {
                  console.info("%c\u2713 PASS ", "background-color:darkgreen;color:#fff;");
                  opt.TOTAL_PASS++;
                  if (opt._M) {
                    console.trace(o);
                  } else {
                    console.info(o);
                  }
                }
              }
            }
          } else {
            if (typeof o == "number" && o > 0 || typeof o == "boolean" && o == true || typeof o == "string" && o.trim().length > 0) {
              if (opt._FailsOnly === 0) {
                console.info("%c\u2713 PASS ", "background-color:darkgreen;color:#fff;");
                opt.TOTAL_PASS++;
                if (opt._M === 1) {
                  console.info(o);
                }
              }
            } else {
              console.info("%cX FAIL ", "background-color:darkred;color:#fff;");
              opt.TOTAL_FAIL++;
              if (opt._M) {
                console.trace(o);
              }
            }
          }
        }
      } catch (error) {
        console.info("%cX FAIL ", "background-color:darkred;color:#fff;");
        opt.TOTAL_FAIL++;
        console.error(error);
      }
    } else {
    }
  },
  test: (title, fTitle, actual, k2 = 0) => {
    try {
      if (opt._T === 1 || opt._R === 1 || !(k2 === 0)) {
        const trackcalls = opt._Tc++ + " : ";
        if (opt._FailsOnly === 1) {
        } else {
          console.log("%c" + trackcalls + "jTESTING " + title + " :>: " + fTitle, "background-color:#fff;color:purple;");
        }
        return new ComparisonMethods(actual);
      } else {
        return new ComparisonMethods(actual);
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  check: (title, varString, expectedAnswer, k2 = 0) => {
    const trackcalls = opt._Tc++ + " : ";
    const tBallConsole = "%c" + trackcalls + " : jcheck " + title;
    const cssBlue = "background-color:#fff;color:blue;";
    if (!title || !varString || !expectedAnswer) {
      if (opt._T == 1) {
        console.log(tBallConsole, cssBlue);
        opt.TOTAL_TESTS_FAIL++;
        const res = varString ? varString : " nothing.";
        console.log("%c" + title, "background-color:purple;color:white;");
        console.log(varString);
        console.log(expectedAnswer);
        console.log("%cX FAIL : First three parameters are mandatory!", "background-color:#fff;color:red;");
        opt.TOTAL_FAIL++;
        return;
      }
    }
    opt.TOTAL_TESTS_RUN++;
    if (opt._R || k2 !== 0 || opt._T == 1) {
      typeof varString === "string";
      if (opt._FailsOnly === 1) {
      } else {
        console.log(tBallConsole, cssBlue);
      }
      if (varString === void 0 || varString == null) {
        opt.TOTAL_TESTS_FAIL++;
        const res = varString ? varString : " nothing.";
        console.log("%cX FAIL : UNDEFINED!", "background-color:#fff;color:red;");
        opt.TOTAL_FAIL++;
      } else if (typeof varString === "string" && typeof expectedAnswer === "string") {
        if (varString.localeCompare(expectedAnswer) === 0) {
          if (opt._FailsOnly === 0) {
            console.log("%c\u2713 PASS : " + varString, "background-color:#fff;color:green;");
            opt.TOTAL_PASS++;
            opt.TOTAL_TESTS_PASS++;
          }
        } else {
          opt.TOTAL_TESTS_FAIL++;
          const res = varString ? varString : " nothing.";
          console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res, "background-color:#fff;color:red;");
          opt.TOTAL_FAIL++;
        }
      } else if (typeof varString === "number" && typeof expectedAnswer === "number") {
        if (varString === expectedAnswer === true) {
          if (opt._FailsOnly === 0) {
            console.log("%c\u2713 PASS : " + varString, "background-color:#fff;color:green;");
            opt.TOTAL_PASS++;
            opt.TOTAL_TESTS_PASS++;
          }
        } else {
          opt.TOTAL_TESTS_FAIL++;
          const res = varString ? varString : " nothing.";
          console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res, "background-color:#fff;color:red;");
          opt.TOTAL_FAIL++;
          if (opt._Ob === 1) {
            console.trace(res);
          }
        }
      } else if (typeof varString === "boolean" && typeof expectedAnswer === "boolean") {
        if (varString === expectedAnswer === true) {
          if (opt._FailsOnly === 0) {
            console.log("%c\u2713 PASS : " + varString, "background-color:#fff;color:green;");
            opt.TOTAL_PASS++;
            opt.TOTAL_TESTS_PASS++;
          }
        } else {
          opt.TOTAL_TESTS_FAIL++;
          const res = varString ? varString : " nothing.";
          console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res, "background-color:#fff;color:red;");
          opt.TOTAL_FAIL++;
        }
      } else if (Array.isArray(varString) && Array.isArray(expectedAnswer)) {
        if (compareArrays(varString, expectedAnswer) === true) {
          if (opt._FailsOnly === 0) {
            console.log("%c\u2713 PASS : " + varString, "background-color:#fff;color:green;");
            opt.TOTAL_PASS++;
            opt.TOTAL_TESTS_PASS++;
          }
        } else {
          opt.TOTAL_TESTS_FAIL++;
          const res = varString ? varString : " nothing.";
          console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res, "background-color:#fff;color:red;");
          opt.TOTAL_FAIL++;
        }
      } else if (typeof varString === "object" && typeof expectedAnswer === "object") {
        if (opt._T === 1) {
          if (compareObjects(varString, expectedAnswer) === true) {
            if (opt._FailsOnly === 0) {
              console.log("%c\u2713 PASS : " + varString, "background-color:#fff;color:green;");
              opt.TOTAL_PASS++;
              opt.TOTAL_TESTS_PASS++;
            }
          } else {
            opt.TOTAL_TESTS_FAIL++;
            const res = varString ? varString : " nothing.";
            console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res, "background-color:#fff;color:red;");
            opt.TOTAL_FAIL++;
          }
        }
      } else {
        opt.TOTAL_WRONG_DATA_TYPES_PARAMS++;
        console.log(varString);
        console.log(expectedAnswer);
        console.log("%c WRONG DATA TYPES GIVEN! First param is of : " + typeof varString + ", Second param is of : " + typeof expectedAnswer, "background-color:#fff;color:red;");
      }
    } else {
    }
  },
  s: (label, k2 = 0) => {
    if (!(k2 == 0)) {
      opt.tS_ = true;
    }
    if (label && (opt._F || opt._R || !(k2 == 0))) {
      opt._FUNCTIONS.push(label);
      console.log("%cFunc starts : " + opt._FUNCTIONS, "background-color:#fff;color:purple;");
      console.time("TIME : " + label);
    }
  },
  e: (label, k2 = 0) => {
    if (!(k2 == 0)) {
      opt.tS_ = true;
    }
    if (label && (opt._F || opt._R || !(k2 == 0))) {
      opt._FUNCTIONS.push(label);
      console.log("%cFunc ends : " + opt._FUNCTIONS, "background-color:#fff;color:purple;");
      console.timeEnd("TIME : " + label);
    }
  },
  rTP: (fn, n = opt._tNo) => {
    for (let i = 0; i < n; i++) {
      fn();
    }
  },
  trics: (fn, n = opt._tNo, k2 = 0) => {
    if (fn != null && typeof fn === "function") {
      for (let i = 0; i < n; i++) {
        fn();
      }
    }
    passes(k2), fails(k2);
    funcs(k2);
    tests(k2);
  },
  hexR: () => {
    let n = (Math.random() * 1048575 * 1e6).toString(16);
    return n;
  },
  gNo: (min = opt._Min, max = opt._Max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  gDec: () => {
    return Math.random();
  },
  gANo: (min = opt._Min, max = opt._Max) => {
    min = min;
    max = max;
    return Math.random() * (max - min + 1) + min;
  },
  gBool: (n = 1) => {
    n = n > 0 ? n : opt._tNo;
    const arrBool = [];
    for (let i = 0; i < n; i++) {
      arrBool.push(Math.random() < 0.5);
    }
    return arrBool;
  },
  gNull: (n = 1) => {
    n = n > 0 ? n : opt._tNo;
    const negativeNo = gRValue.gNo(-1e3, -1);
    const nulls = [
      { empty: null },
      { empty: void 0 },
      { empty: "null" },
      { empty: "undefined" },
      ,
      null,
      void 0,
      0,
      "",
      "",
      { empty: [0] },
      { empty: "" },
      { empty: "" },
      { empty: "0" },
      { empty: 0 },
      { empty: [] },
      { empty: {} },
      [0],
      [],
      [""],
      [""],
      {},
      negativeNo
    ];
    const nullArray = [];
    for (let i = 0; i < n; i++) {
      nullArray.push(nulls[Math.floor(Math.random() * nulls.length)]);
    }
    return nullArray;
  },
  chrs: (len = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_?|[]{}:",.!@#$%^&*()+~`';
    return charProcess(characters, len);
  },
  upperC: (length = 10) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return charProcess(characters, length);
  },
  lowerC: (length = 10) => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    return charProcess(characters, length);
  },
  digts: (length = 10) => {
    const characters = "0123456789";
    return charProcess(characters, length);
  },
  symbls: (len = 10) => {
    const characters = `'-_?|[]{}:",.!@#$%^&*()+~\\><=`;
    return charProcess(characters, len);
  }
};
function fails(k2 = 0) {
  if (opt._O || opt._T == 1 || opt._R || !(k2 == 0)) {
    if (opt.TOTAL_FAIL > 0) {
      console.log("%cTOTAL_ERRORS : " + opt.TOTAL_FAIL, "background-color:#fff;color:darkred;");
    }
  }
}
function passes(k2 = 0) {
  if (opt._O || opt._T == 1 || opt._R || !(k2 == 0)) {
    if (opt.TOTAL_PASS > 0) {
      console.log("%cTOTAL_PASSES : " + opt.TOTAL_PASS, "background-color:#fff;color:blue;");
    }
  }
}
function funcs(k2 = 0) {
  if ((opt.O || opt._T == 1 || opt._R || opt.tS) && (!(k2 == 0) || opt._FUNCTIONS.length > 0)) {
    const fT = opt._FUNCTIONS.length;
    console.log("%cTOTAL_FUNCTIONS : " + fT, "background-color:#fff;color:purple;");
    const funcs_ = opt._FUNCTIONS.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), /* @__PURE__ */ Object.create(null));
    console.log(funcs_);
  }
}
function tests(k2 = 0) {
  if (opt.T == 1) {
    opt.tS = false;
  }
  if ((opt.T == 1 || opt._R || opt.tS) && (!(k2 == 0) || opt.TOTAL_TESTS_PASS > 0)) {
    console.log("%cTOTAL_TESTS_PASS : " + opt.TOTAL_TESTS_PASS, "background-color:blue;color:#fff;");
  }
  if ((opt.T == 1 || opt._R || opt.tS) && (!(k2 == 0) || opt.TOTAL_TESTS_FAIL > 0)) {
    console.log("%cTOTAL_TESTS_FAIL : " + opt.TOTAL_TESTS_FAIL, "background-color:darkred;color:#fff;");
  }
  if ((opt.T == 1 || opt._R || opt.tS) && (!(k2 == 0) || opt.TOTAL_TESTS_RUN > 0)) {
    console.log("%cTOTAL_TESTS_RUN : " + opt.TOTAL_TESTS_RUN, "background-color:blue;color:#fff;");
  }
  if ((opt.T == 1 || opt._R || opt.tS) && (!(k2 == 0) || opt.TOTAL_WRONG_DATA_TYPES_PARAMS > 0)) {
    console.log("%cTOTAL_WRONG_DATA_TYPES_PARAMS : " + opt.TOTAL_WRONG_DATA_TYPES_PARAMS, "background-color:blue;color:#fff;");
  }
}
var compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};
var compareObjects = (a, b) => {
  if (typeof a == "object" && typeof b == "object") {
    const aObjElementTotal = a.length;
    const bObjElementTotal = a.length;
    const objTotalSame = aObjElementTotal === bObjElementTotal;
    if (!objTotalSame) {
      return false;
    } else {
      const aKeysArray = Object.keys(a);
      const aKeysArraySorted = aKeysArray.sort();
      const aValuesArray = Object.keys(a);
      const aValuesArraySorted = aValuesArray.sort();
      const bKeysArray = Object.keys(b);
      const bKeysArraySorted = bKeysArray.sort();
      const bValuesArray = Object.keys(b);
      const bValuesArraySorted = bValuesArray.sort();
      if (compareArrays(aKeysArraySorted, bKeysArraySorted) && compareArrays(aValuesArraySorted, bValuesArraySorted)) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
};
var ComparisonMethods = class {
  constructor(actual, expectedValue = "", k2 = 0) {
    this.actual = actual;
    this.expectedValue = expectedValue;
    this.k = k2;
  }
  between(start, end) {
    if (this.actual >= start && this.actual <= end) {
      pass(this.actual, this.expectedValue, k);
    } else {
      fail(this.actual, this.expectedValue, k);
    }
  }
  eq(expected, k2 = 0) {
    if (expected === this.actual) {
      pass(this.actual, expected, k2);
    } else {
      fail(this.actual, expected, k2);
    }
  }
  gt(expected, k2 = 0) {
    if (this.actual > expected) {
      pass(this.actual, expected, k2);
    } else {
      fail(this.actual, expected, k2);
    }
  }
  lt(expected, k2 = 0) {
    if (this.actual < expected) {
      pass(this.actual, expected, k2);
    } else {
      fail(this.actual, expected, k2);
    }
  }
  geq(expected, k2 = 0) {
    if (this.actual >= expected) {
      pass(this.actual, expected, k2);
    } else {
      fail(this.actual, expected, k2);
    }
  }
  leq(expected, k2 = 0) {
    if (expected >= this.actual) {
      pass(this.actual, expected, k2);
    } else {
      fail(this.actual, expected, k2);
    }
  }
  contains(expected, k2 = 0) {
    if (this.actual) {
      console.log(this.actual);
      console.log(expected);
      if (this.actual.toString().includes(expected)) {
        pass(this.actual, "contains " + expected, k2);
      } else {
        fail(this.actual, "contains " + expected, k2);
      }
    } else {
      const got = this.actual;
      if (typeof got == "undefined") {
        fail(this.actual, "contains undefined ", k2);
      } else if (typeof got == "null") {
        fail(this.actual, "contains null ", k2);
      }
    }
  }
  null(k2 = 0) {
    const nulls = [{ empty: null }, { empty: void 0 }, { empty: "null" }, { empty: "undefined" }, , null, void 0, 0, "", "", { empty: [0] }, { empty: "" }, { empty: "" }, { empty: "0" }, { empty: 0 }, { empty: [] }, { empty: {} }, [0], [], [""], [""], {}];
    if (nulls.includes(this.actual)) {
      pass(this.actual, "null", k2);
    } else {
      fail(this.actual, "null", k2);
    }
  }
  notNull(k2 = 0) {
    const nulls = [{ empty: null }, { empty: void 0 }, { empty: "null" }, { empty: "undefined" }, , null, void 0, 0, "", "", { empty: [0] }, { empty: "" }, { empty: "" }, { empty: "0" }, { empty: 0 }, { empty: [] }, { empty: {} }, [0], [], [""], [""], {}];
    if (!nulls.includes(this.actual)) {
      pass(this.actual, "notNull", k2);
    } else {
      fail(this.actual, "notNull", k2);
    }
  }
  object(k2 = 0) {
    if ("object" === typeof this.actual) {
      pass(this.actual, "object", k2);
    } else {
      fail(this.actual, "object", k2);
    }
  }
  array(k2 = 0) {
    if (Array.isArray(this.actual)) {
      pass(this.actual, "array", k2);
    } else {
      fail(this.actual, "array", k2);
    }
  }
  neg(k2 = 0) {
    if (this.actual < 0) {
      pass(this.actual, "negative", k2);
    } else {
      fail(this.actual, "negative", k2);
    }
  }
  pos(k2 = 0) {
    if (this.actual >= 0) {
      pass(this.actual, "positive", k2);
    } else {
      fail(this.actual, "positive", k2);
    }
  }
  bool(k2 = 0) {
    if (typeof this.actual === "boolean") {
      pass(this.actual, "bool", k2);
    } else {
      fail(this.actual, "bool", k2);
    }
  }
  notBool(k2 = 0) {
    if (typeof this.actual != "boolean") {
      pass(this.actual, "notBool", k2);
    } else {
      fail(this.actual, "notBool", k2);
    }
  }
  num(k2 = 0) {
    if (typeof this.actual === "number") {
      pass(this.actual, "num", k2);
    } else {
      fail(this.actual, "num", k2);
    }
  }
  length(n, k2 = 0) {
    if (this.actual.length === n) {
      pass(this.actual.length, "length", k2);
    } else {
      fail(this.actual.length, "length", k2);
    }
  }
  range(min = 0, max = 100, k2 = 0) {
    if (this.actual >= min, this.actual <= max) {
      pass(this.actual, "range pass", k2);
    } else {
      fail(this.actual, "range fail", k2);
    }
  }
  string(k2 = 0) {
    if (typeof this.actual === "string") {
      pass(this.actual, "string", k2);
    } else {
      fail(this.actual, "string", k2);
    }
  }
};
function pass(exp, expectedValue, k2) {
  if (opt._R === 1 || k2 !== 0 || opt._T === 1) {
    if (opt._FailsOnly === 0) {
      const trackcalls = opt._Tc++ + " : ";
      console.log("%c\u2713 PASS : " + exp + " :>>: " + expectedValue, "background-color:#fff;color:green;");
      opt.TOTAL_PASS++;
      opt.TOTAL_TESTS_PASS++;
      if (opt._Ob === 1) {
        console.trace(exp);
      }
    }
  }
}
function fail(exp, expectedValue, k2) {
  if (opt._FailsOnly === 1 || opt._R || k2 !== 0 || opt._T == 1) {
    const trackcalls = opt._Tc++ + " : ";
    console.log("%cX FAIL : " + exp + " :>>: " + expectedValue, "background-color:#fff;color:red;");
    opt.TOTAL_FAIL++;
    opt.TOTAL_TESTS_FAIL++;
    if (opt._Ob === 1) {
      console.trace(exp);
    }
  }
}
var charProcess = (characters = "abcdefghijklmnopqrstuvwxyz", length = 10) => {
  if (length > 0) {
    let counter = 0;
    let result = "";
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }
    return result;
  } else {
    return "";
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  j,
  opt
});
