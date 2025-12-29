## Jimba.js API Table (v1.3.6)

**Library:**    Jimba.js (browser-friendly)
**Version:**    1.3.6
**Author:**     Bernard Sibanda
**Company:**    Coxygen Global
**Date:**       29 December 2025
**License:**    MIT

# 1) Configuration and Runtime Counters (`opt`)

### 1.1 `opt` — Global switches and totals

| Name                            | Type                     | Default | What it controls / means                                                                                               |
| ------------------------------- | ------------------------ | ------: | ---------------------------------------------------------------------------------------------------------------------- |
| `TOTAL_FAIL`                    | `number`                 |     `0` | Total number of failures (tests and checks).                                                                           |
| `TOTAL_PASS`                    | `number`                 |     `0` | Total number of passes (tests and checks).                                                                             |
| `TOTAL_TESTS_PASS`              | `number`                 |     `0` | Total test assertions that passed.                                                                                     |
| `TOTAL_TESTS_FAIL`              | `number`                 |     `0` | Total test assertions that failed.                                                                                     |
| `TOTAL_TESTS_RUN`               | `number`                 |     `0` | Total tests/checks executed.                                                                                           |
| `TOTAL_WRONG_DATA_TYPES_PARAMS` | `number`                 |     `0` | Counter for wrong parameter types passed into some checks (tracked in older versions; currently mostly informational). |
| `_R`                            | `0 \| 1`                 |     `0` | **Run everything** (master enable). When `1`, output runs even when `k=0`.                                             |
| `_M`                            | `0 \| 1`                 |     `0` | **Verbose tracing mode** (reserved/extended mode; useful for future expansion).                                        |
| `_FailsOnly`                    | `0 \| 1`                 |     `0` | When `1`, hides **PASS output**. FAIL output still prints. (INFO printing is currently still controlled by `_O/_R`.)   |
| `_T`                            | `0 \| 1`                 |     `0` | Enables **test output** (`j.test`, `j.check`).                                                                         |
| `_O`                            | `0 \| 1`                 |     `0` | Enables **log output** (`j.log`).                                                                                      |
| `_Ob`                           | `0 \| 1`                 |     `0` | Extra tracing for failures (used in previous versions; still reserved).                                                |
| `_F`                            | `0 \| 1`                 |     `0` | Enables profiling output (`j.s`, `j.e`, and function summaries).                                                       |
| `_Tc`                           | `number`                 |     `1` | Internal counter used for sequencing tests (auto increments).                                                          |
| `_tNo`                          | `number`                 |    `20` | Default number of iterations for repeat runners (`j.rTP`, `j.trics`).                                                  |
| `_Min`                          | `number`                 |  `-100` | Default minimum for random generators.                                                                                 |
| `_Max`                          | `number`                 |   `100` | Default maximum for random generators.                                                                                 |
| `_FUNCTIONS`                    | `Record<string, number>` |    `{}` | Map of function-name → call count (built by `j.s`).                                                                    |

# 2) Public API (`j`)

## 2.1 Logging

### `j.log(o, stop?, siteOverride?)`

| Item                | Details                                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Purpose**         | Prints a **single-line INFO** log (better than raw `console.log`) and shows a callsite (`file:line:col`). Also highlights **bad/null values** by switching to a red badge (`✗ FAIL`) when detected inside objects. |
| **Signature**       | `log(o: any, stop?: boolean, siteOverride?: string \| null): void`                                                                                                                                                 |
| **Defaults**        | `stop = false`, `siteOverride = null`                                                                                                                                                                              |
| **Runs when**       | `opt._O === 1` **or** `opt._R === 1`                                                                                                                                                                               |
| **Output behavior** | Always prints a single line: `INFO {object} at file:line:col` or `✗ FAIL {object} at file:line:col` if nullable values exist.                                                                                      |
| **Typical use**     | `j.log({user})` to quickly inspect objects and detect null/undefined bugs early.                                                                                                                                   |

## 2.2 Unit Testing (Compact Assertions)

### `j.test(title, fTitle, actual, k?)`

| Item                | Details                                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**         | Creates a test context and returns a chainable assertion helper (`ComparisonMethods`). This is the core “Swiss-knife” testing style: test inline without boilerplate. |
| **Signature**       | `test(title: string, fTitle: string, actual: any, k?: number): ComparisonMethods`                                                                                     |
| **Defaults**        | `k = 0`                                                                                                                                                               |
| **Runs when**       | `opt._T === 1` **or** `opt._R === 1` **or** `k !== 0`                                                                                                                 |
| **Output behavior** | Each assertion prints one PASS/FAIL line: green PASS, red FAIL, with callsite + expression.                                                                           |
| **Example**         | `j.test("Auth","token must exist", token)?.notNull()`                                                                                                                 |

### Assertions Available (returned by `j.test(...)`)

All methods below return `void` (they print output + update counters).

| Assertion  | Signature                                         | Pass condition (simplified)                    | Example                                             |
| ---------- | ------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------- |
| `between`  | `between(start: number, end: number, k?: number)` | `actual >= start && actual <= end`             | `j.test("Math","x between 1..10",x)?.between(1,10)` |
| `eq`       | `eq(expected: any, k?: number)`                   | `actual === expected`                          | `?.eq("joe")`                                       |
| `gt`       | `gt(expected: number, k?: number)`                | `actual > expected`                            | `?.gt(10)`                                          |
| `lt`       | `lt(expected: number, k?: number)`                | `actual < expected`                            | `?.lt(0)`                                           |
| `geq`      | `geq(expected: number, k?: number)`               | `actual >= expected`                           | `?.geq(0)`                                          |
| `leq`      | `leq(expected: number, k?: number)`               | `expected >= actual`                           | `?.leq(100)`                                        |
| `contains` | `contains(expected: string, k?: number)`          | `String(actual).includes(expected)`            | `?.contains("null")`                                |
| `null`     | `null(k?: number)`                                | `actual` is nullish/empty/0/"null"/"undefined" | `?.null()`                                          |
| `notNull`  | `notNull(k?: number)`                             | opposite of `null()` rule                      | `?.notNull()`                                       |
| `object`   | `object(k?: number)`                              | real object (not array, not null)              | `?.object()`                                        |
| `array`    | `array(k?: number)`                               | `Array.isArray(actual)`                        | `?.array()`                                         |
| `neg`      | `neg(k?: number)`                                 | number `< 0`                                   | `?.neg()`                                           |
| `pos`      | `pos(k?: number)`                                 | number `>= 0`                                  | `?.pos()`                                           |
| `bool`     | `bool(k?: number)`                                | `typeof actual === "boolean"`                  | `?.bool()`                                          |
| `notBool`  | `notBool(k?: number)`                             | `typeof actual !== "boolean"`                  | `?.notBool()`                                       |
| `num`      | `num(k?: number)`                                 | `typeof actual === "number"`                   | `?.num()`                                           |
| `dec`      | `dec(k?: number)`                                 | number is decimal (not integer)                | `?.dec()`                                           |
| `range`    | `range(min?: number, max?: number, k?: number)`   | `min <= actual <= max`                         | `?.range(0,100)`                                    |
| `string`   | `string(k?: number)`                              | `typeof actual === "string"`                   | `?.string()`                                        |

## 2.3 Equality Checks

### `j.check(title, varString, expectedAnswer, k?)`

| Item                 | Details                                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Purpose**          | A simpler “single-shot” equality checker for primitives, arrays, and objects. Good for quick checks without chaining. |
| **Signature**        | `check(title: string, varString: any, expectedAnswer: any, k?: number): void`                                         |
| **Defaults**         | `k = 0`                                                                                                               |
| **Runs when**        | `opt._T === 1` **or** `opt._R === 1` **or** `k !== 0`                                                                 |
| **Comparison rules** | Arrays → JSON stringify compare; Objects → key/value compare; otherwise strict `===`.                                 |
| **Output**           | Prints a PASS or FAIL line and updates totals.                                                                        |
| **Example**          | `j.check("sum", sum, 10)`                                                                                             |

## 2.4 Profiling and Function Call Counting

### `j.s(label, k?)`

| Item          | Details                                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Purpose**   | Marks a function “start”: increments a call counter and optionally starts a timer.                                      |
| **Signature** | `s(label: string, k?: number): void`                                                                                    |
| **Runs when** | Timer output requires `opt._F === 1` or `opt._R === 1` or `k !== 0`. Counter increments always happens if label exists. |
| **Updates**   | `opt._FUNCTIONS[label]++`                                                                                               |
| **Example**   | `j.s("computePrice")`                                                                                                   |

### `j.e(label, k?)`

| Item          | Details                                                                         |
| ------------- | ------------------------------------------------------------------------------- |
| **Purpose**   | Marks a function “end”: ends timer and prints duration if profiling is enabled. |
| **Signature** | `e(label: string, k?: number): void`                                            |
| **Runs when** | `opt._F === 1` or `opt._R === 1` or `k !== 0`                                   |
| **Example**   | `j.e("computePrice")`                                                           |

## 2.5 Repetition / Property-style Running

### `j.rTP(fn, n?)`

| Item          | Details                                                  |
| ------------- | -------------------------------------------------------- |
| **Purpose**   | Repeats a function `n` times. Useful for stress testing. |
| **Signature** | `rTP(fn: Function, n?: number): void`                    |
| **Default**   | `n = opt._tNo`                                           |
| **Example**   | `j.rTP(testPack, 500)`                                   |

### `j.trics(fn, n?, k?)`

| Item                  | Details                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**           | Property-style runner: runs `fn` repeatedly and prints summary totals at the end (passes, fails, function counts, tests). |
| **Signature**         | `trics(fn: Function, n?: number, k?: number): void`                                                                       |
| **Defaults**          | `n = opt._tNo`, `k = 0`                                                                                                   |
| **End-of-run output** | Prints totals: passes, errors, function calls, tests totals.                                                              |
| **Example**           | `j.trics(testPack, 2000)`                                                                                                 |

## 2.6 Random/Generator Utilities

### Random Numbers

| Method   | Signature                                  | Returns | Notes                |
| -------- | ------------------------------------------ | ------- | -------------------- |
| `j.gNo`  | `gNo(min?: number, max?: number): number`  | Integer | Inclusive min/max.   |
| `j.gANo` | `gANo(min?: number, max?: number): number` | Decimal | Any number in range. |
| `j.gDec` | `gDec(): number`                           | Decimal | `0..1`               |

### Random Booleans / Null-like Values

| Method    | Signature                      | Returns | Notes                                                |
| --------- | ------------------------------ | ------- | ---------------------------------------------------- |
| `j.gBool` | `gBool(n?: number): boolean[]` | Array   | Random booleans.                                     |
| `j.gNull` | `gNull(n?: number): any[]`     | Array   | Mixture of null/undefined/empty and sentinel values. |

### Random Strings / IDs

| Method     | Signature                      | Returns | Description                                                           |
| ---------- | ------------------------------ | ------- | --------------------------------------------------------------------- |
| `j.chrs`   | `chrs(len?: number): string`   | String  | Mixed characters.                                                     |
| `j.upperC` | `upperC(len?: number): string` | String  | Uppercase letters only.                                               |
| `j.lowerC` | `lowerC(len?: number): string` | String  | Lowercase letters only.                                               |
| `j.digts`  | `digts(len?: number): string`  | String  | Digits only.                                                          |
| `j.symbls` | `symbls(len?: number): string` | String  | Symbol set only.                                                      |
| `j.hexR`   | `hexR(): string`               | String  | Random hex string.                                                    |
| `j.id`     | `id(): string`                 | String  | UUID without hyphens, uppercase. Requires `self.crypto.randomUUID()`. |

# 3) Output and Behavior Summary (ant for Users)

| Feature            | Controlled by        | What users will see                                                   |
| ------------------ | -------------------- | --------------------------------------------------------------------- |
| Logging (`j.log`)  | `opt._O` or `opt._R` | INFO line, or red “✗ FAIL” badge if object contains null-like values. |
| Testing (`j.test`) | `opt._T` or `opt._R` | PASS/FAIL line per assertion, styled.                                 |
| Hide PASS          | `opt._FailsOnly = 1` | PASS output suppressed (FAIL still prints).                           |
| Profiling          | `opt._F` or `opt._R` | Start/time logs, plus function count summary at end of `trics`.       |
| Bulk execution     | `j.rTP`, `j.trics`   | Repeated runs + summary totals.                                       |

