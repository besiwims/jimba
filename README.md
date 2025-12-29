## Jimba.js User Guide (v1.3.6) 

**Author:**   Bernard Sibanda
**Company:**  Coxygen Global
**Date:**     29 December 2025
**License:**  MIT

## Table of Contents

1. What Jimba.js is and why it exists
2. What you need before you start
3. Installing Jimba.js in a browser project
4. Installing Jimba.js in Node.js
5. Understanding the two main parts: `opt` and `j`
6. Turning features on and off with `opt` (explained slowly)
7. Logging values with `j.log()` (INFO output)
8. Testing values with `j.test()` (PASS/FAIL output)
9. Understanding the assertion methods (what `.num()`, `.neg()`, etc. mean)
10. Using `j.check()` for simple equality checks
11. Profiling function time with `j.s()` and `j.e()`
12. Counting how many times functions run with `_FUNCTIONS`
13. Repeating tests with `j.rTP()` and `j.trics()` (property-style testing)
14. Using Jimba’s random generators (`gNo`, `gANo`, `gBool`, etc.)
15. A complete beginner example (copy/paste)
16. A complete “comput/complex” example (explained line-by-line)
17. Reading the console output like a professional
18. Common mistakes and how to fix them
19. Frameworks and environments that can use Jimba.js
20. API reference (short, beginner-friendly)
21. Glossary of terms

## Tests online

Before going further, view and inspect Jimba tests here : https://coxygen.co/coxygen.co/demo/28122025/tests.html
Also fork it here : https://github.com/besiwims/jimba
NPM link : https://www.npmjs.com/package/jimba?activeTab=readme

Raise issues here : https://github.com/besiwims/jimba/issues

## 1. What Jimba.js is and why it exists

Jimba.js is a small JavaScript/TypeScript library that helps you **test**, **log**, and **profile** your frontend code while you are building it. Many developers use `console.log()` when they are stuck, but they later remove those logs because they look messy and can slow down an application. Console.log() does not do unit testing. Testing libraries like Jest and Mocha are powerful, but beginners often avoid them because they feel like extra work and require setup.

Jimba.js was built to reduce that friction. Instead of writing large test files, you can add **short tests directly next to the code you are working on**. This makes it easier to catch bugs early and also makes it harder for future changes to silently break logic, because your small tests remain in the code and still check your assumptions.

Jimba.js is also useful when you want to understand performance. It can count how many times a function runs and can measure how long a function takes to execute.

## 2. What you need before you start

### j.log() is Console.log() with testing and logging

All you need to get started on static websites is a script tag <script type="./jimba.js"></script>

Jimba(Catch) all your bugs both at development, compile time and at runtime via Effects/Schema or Zod.

```
import {opt,j } from './jimba.js'; //import this js small file and turn on switches below _O and _T for console.logging and testing at the same time 
opt._R = 0; //run all
opt._FailsOnly = 0; //run only failors
opt._T = 1; // run all tests
opt._O = 1; //run j log objects tracing
opt._F = 0; // run functions only
opt._tNo = 20; // standard number for iterations on gRvalues which is an object of arbitraries generators
opt._Min = -10; //used by gRvalues for lowest value
opt._Max = 10; //used by gRvalues for max value
opt._FUNCTIONS = Object.create(null);  //collects all profiled functions

//Do this always in one line. This makes code on the left clean, none poluted with console.logs that always require deletions

const age = 78; j.log({age}); j.test("Group A Tests", "Variable age", age).pos();  
const childAge = -5; j.log({childAge}); j.test("Group A Tests", "Variable childAge", childAge).pos();  
```
#### Results:

INFO {age: 78} at jimba.html:21:28 jimba.js:141. 
✓ PASS positive 78 jimba.html:21:42 • Variable age

INFO {childAge: -5} at jimba.html:23:30 jimba.js:141 
✗ FAIL positive -5 jimba.html:23:49 • Variable childAge

That's it! There is no need for console.log() because you cannot switch it off like j.log({}). You stop all logging and tests by setting opt._O and opt._T to 1.

You do not need to be an expert to use Jimba.js, but you do need to understand a few basics:

* JavaScript variables store values like numbers, strings, and objects.
* Functions are blocks of code that run when you call them.
* A browser console is where logs and errors appear.
* “Testing” means checking that something is true, like “this result must be a number.”

If any of these words feel new, do not worry. This guide explains them as we go, and there is a glossary at the end.

## 3. Installing Jimba.js in a browser project

If you are working with a plain HTML file (no build tools), you normally include JavaScript using a `<script>` tag. Jimba.js is an ES Module, so you will import it inside a `<script type="module">`.

Example (browser):

```Javascript
<script type="module">
  import { opt, j } from "./jimba.js";

  opt._O = 1; // enable INFO logging
  opt._T = 1; // enable tests

  const readFileName = () => { return null};
  const fileName = readFileName();  j.log({ fileName });  j.test("Group B Tests", "Reading File name", fileName).string();
  
/** results
✗ FAIL {fileName: null} at jimba.html:130:41 jimba.js:215
✗ FAIL string null jimba.html:130:63 • Reading File name
*/

</script>
```

This is the simplest way to start, because you can refresh the page and immediately see output in the developer console.

## 4. Installing Jimba.js in Node.js

If you use Node.js, you install packages with npm:

```bash
npm i jimba
```

Then you import it from your code. If your Node project uses ES Modules (recommended), you do:

```js
import { opt, j } from "jimba";
```

If your project still uses CommonJS (`require`), you will either need a compatible build or a CommonJS wrapper, because the code you provided is written as ES Module exports.

## 5. Understanding the two main parts: `opt` and `j`

Jimba.js exposes two main things:

1. `opt` — a configuration object.
2. `j` — the main toolbox containing functions like `j.log({})`, `j.trics`,`j.log()` and `j.test()`.

A beginner-friendly way to think about it is:

* `opt` is the “settings panel”.
* `j` is the “toolkit”.

You usually import them like this:

```js
import { opt, j } from "./jimba.js";
```

## 6. Turning features on and off with `opt` (explained slowly)

Jimba.js is designed to be *quiet* when you want performance, and *talkative* when you are debugging. That is why it uses switches.

### 6.1 `opt._O` (logging switch)

If `opt._O = 1`, then `j.log()` prints output.
If `opt._O = 0`, then `j.log()` does nothing.

This is important because it means you can leave `j.log()` in your code, but disable it in production.

### 6.2 `opt._T` (testing switch)

If `opt._T = 1`, then tests like:

```js
j.test("Suite", "something", value).num();
```

will print PASS or FAIL results.

If `opt._T = 0`, tests will not print.

### 6.3 `opt._FailsOnly` (silence PASS output)

When `opt._FailsOnly = 1`, Jimba.js still checks tests, but it only prints FAIL results. PASS results are hidden.

This is useful when you run many tests and only want to see problems.


## 7. Logging values with `j.log()` (INFO output)

### 7.1 What `j.log()` is for

`j.log()` is used when you want to *see what a value looks like at runtime*. This is similar to `console.log()`, but Jimba prints it in a consistent one-line format:

```
INFO { varb: 89 } at jimba.html:81:5
```

### 7.2 Example

```js
opt._O = 1;

const varb = 89;
j.log({ varb });
```

This prints one line, showing:

1. The word INFO
2. The object you logged
3. The file and line where it happened

This makes debugging easier because you can jump directly to the location.


## 8. Testing values with `j.test()` (PASS/FAIL output)

### 8.1 Why `j.test()` exists

When you write code, you usually *assume* values are correct. For example, you might assume a calculation returns a number, or assume a result is positive.

Sometimes those assumptions break when someone changes code later. `j.test()` lets you turn your assumptions into small checks.

### 8.2 How `j.test()` works

This is the structure:

```js
j.test(title, fTitle, actual).someAssertion();
```

* `title` is the group name (like “comput” or “Login”).
* `fTitle` is a human sentence describing what you expect.
* `actual` is the value you are testing.

Then you call an assertion method such as `.num()` or `.pos()`.

### 8.3 Example

```js
opt._T = 1;

const sum = 5 + 7;
j.test("Math", "sum must be a number", sum).num();
```

If `sum` is a number, you will see:

* A green PASS badge line.

If not, you will see:

* A red FAIL badge line.


## 9. Understanding assertion methods (no assumptions)

An “assertion” is a check that confirms something is true.

For example:

* `.num()` means “this value must be a number”.
* `.neg()` means “this value must be negative”.

Here is what some common ones mean in plain English:

* `.num()` checks `typeof value === "number"`.
* `.string()` checks `typeof value === "string"`.
* `.pos()` checks the number is `>= 0`.
* `.neg()` checks the number is `< 0`.
* `.geq(0)` checks the number is `>= 0`.
* `.range(10, 20)` checks it is between 10 and 20.

So when you write:

```js
j.test("Account", "balance must never be negative", balance).geq(0);
```

You are turning a business rule into a test.


## 10. Using `j.check()` for simple equality checks

Sometimes you just want a quick “expected vs actual” check. That is what `j.check()` does.

Example:

```js
opt._T = 1;

const answer = 2 + 2;
j.check("Math", answer, 4);
```

If the answer is 4, it prints PASS.
If it is not 4, it prints FAIL.


## 11. Profiling function time with `j.s()` and `j.e()`

Performance profiling means measuring time. Jimba uses:

* `j.s("label")` to start measuring
* `j.e("label")` to stop measuring and print duration

Example:

```js
opt._F = 1;

function slowTask() {
  j.s("slowTask");
  for (let i = 0; i < 1000000; i++) {}
  j.e("slowTask");
}
slowTask();
```

This prints how many milliseconds the function took.


## 12. Counting how many times functions run with `_FUNCTIONS`

Every time you call `j.s("myFunc")`, Jimba increments a counter in:

```js
opt._FUNCTIONS
```

So if `comput()` runs 40 times, you might see:

```js
{ comput: 40, complex: 40 }
```

This is helpful when you are debugging loops and want to confirm how many times something executed.


## 13. Repeating tests with `j.rTP()` and `j.trics()`

### 13.1 Why repeat tests?

Some bugs only appear for certain random values. If you only test with one example, you may miss the bug.

That is why Jimba supports “repeat tests” using random values.

### 13.2 `j.rTP(fn, n)`

Runs the same function `n` times.

### 13.3 `j.trics(fn, n)`

Runs the function `n` times and then prints summaries like total fails and passes.

This gives you a simple entry into property-style testing: you test your logic under many different inputs.


## 14. Using Jimba’s random generators

Jimba includes helper generators so you can produce test values quickly.

Examples:

```js
const a = j.gNo(-10, 10);   // random integer
const b = j.gANo(0, 1);     // random float
const flags = j.gBool(5);   // 5 random booleans
const s = j.upperC(8);      // random uppercase string length 8
```

These are designed to reduce the time it takes to create many test cases.


## 15. Complete beginner example (copy/paste)

```js
import { opt, j } from "./jimba.js";

opt._O = 1;
opt._T = 1;
opt._FailsOnly = 0;

const name = "joe";
j.log({ name });
j.test("User", "name must be a string", name).string();

const total = 10 + 20;
j.test("Math", "total must be positive", total).pos();
```


## 16. The “comput/complex” example explained line-by-line

Here is a simplified explanation of what your code is doing.

1. The function starts by calling `j.s("comput")`. This increments the call counter and starts timing if profiling is enabled.
2. It calculates `sum`. Immediately after calculating, it tests `sum` to ensure it is a number.
3. It calculates `sqr = sum * sum`. Then it tests whether `sqr` is negative or non-negative, depending on what you expect.
4. It continues step-by-step, testing each computed value as soon as it is created.
5. The function ends by calling `j.e("comput")`, which stops profiling and prints timing.

This style is powerful because it “guards” every step of your computation. If anything changes, you will see exactly which step first became wrong.


## 17. Reading the console output like a professional

When you see:

* **INFO** lines: those are from `j.log()`
* **✓ PASS** lines: those are passing test assertions
* **✗ FAIL** lines: those are failing test assertions

If you turn on `_FailsOnly`, you will mostly see only fails, which makes debugging faster when many tests pass.


## 18. Common mistakes and how to fix them

### 18.1 “Nothing prints”

Usually this means you forgot:

```js
opt._T = 1; // for tests
opt._O = 1; // for logs
```

### 18.2 “Tests show the wrong file/line”

This can happen if your environment changes stack traces or runs inside bundled code. Jimba uses stack parsing, so bundlers can affect it.


## 19. Frameworks and environments that can use Jimba.js

Jimba.js is simple and has no dependencies, so it can be used in many environments.

### Front-end (browser)

* Vanilla JavaScript/HTML projects
* Vite projects (React, Vue, Svelte, Solid, Preact)
* Next.js (client-side parts)
* Nuxt (client-side parts)
* Angular (client-side debugging/testing)
* Remix (client-side parts)

### Back-end (Node.js)

* Node.js scripts and services
* Express / Fastify / Koa APIs
* NestJS (Node runtime)
* Server-side jobs and CLI tools

You can also use Jimba alongside Jest/Mocha/Vitest, but Jimba is best when you want fast, inline checks while coding.


## 20. API reference (short)

* `j.log({x})` prints INFO
* `j.test("suite","description",value).num()` prints PASS/FAIL
* `j.check("title", actual, expected)` prints PASS/FAIL
* `j.s("label")` and `j.e("label")` profile timing
* `j.trics(fn)` repeats a test pack many times and prints totals


## 21. Glossary of terms

**Assertion**: A check that confirms something is true (example: “must be a number”).
**Badge**: The colored label like “✓ PASS” or “✗ FAIL” in the console.
**Callsite**: The file name and line number where a log or test was triggered.
**Context (`ctx`)**: Internal information Jimba stores so it can show suite name, expression, and location.
**Framework**: A library that structures how you build applications (React, Vue, Angular, etc.).
**Inline test**: A test placed right next to the code it checks.
**Profiling**: Measuring how long code takes to run.
**Property-style testing**: Running the same test many times with different random inputs.
**Suite**: A group name for tests (example: `"comput"`).
**Toggle / switch**: A setting like `opt._T` that turns a feature on or off.
