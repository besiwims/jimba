**Table of Contents**
1. [Library Overview](#library-overview)
2. [Author Information](#author-information)
3. [License](#license)
4. [Installation Instructions](#installation-instructions)
5. [Usage](#usage)
6. [Automated Testing](#automated-testing)
7. [Matchers Functions](#matchers-functions)
8. [Function Speed Measurement](#function-speed-measurement)
9. [Feedback and Contact](#feedback-and-contact)
---
### 0. Version 1.1.8

### 1. Library Overview
Jimba is a javascript console log wrapping, variables/objects/arrays testing, functions/page profiling library. Its purpose is to introduce testing from simple console logs all the way to unit testing with bigger frameworks.

### 2. Author Information
- **Author:** Bernard Sibanda
- **Affiliations:** Tobb Technologies Pty Ltd, Women In Move Solutions Pty Ltd

### 3. License
MIT License

### 4. Installation Instructions
- **NPM:** Run `npm i jimba` to install via npm.
- **Website:** Add the script tag to the `j.js` file by copying the contents from GitHub.

### 5. Usage
Installation using nodejs npm. On the vscode terminal run `npm i jimba` or `npm i jimba --force` if there are dependency issues.

### 6. Automated Testing
Jimba facilitates test-driven development by enabling developers to divide their script into source code and test code. Example:

**Source Code A**
```javascript
function add(x,y) {
    return x + y;
}

function sub(x,y) {
    return x - y;
}
```
**Test Code**
```javascript
jj("Testing functions a module A","add",add(4,6),"eq(10)"," 4 and 6 added gives 10")
jj("Testing functions a module A","sub",sub(7,3),"eq(4)"," 7 - 3 = 4")
```
### 7. Matchers Functions
Matchers functions include:
- between
- eq
- geq
- lt
- leq
- gt
- string()
- object()
- bool()
- array()
  
### 8. Function Speed Measurement
Function or block of code speed measurement using `tS()` and `tE()`. Example:

```javascript
tS("hi");
// block of code being measured for speed
tE("hi");
```
When testing a developer needs random value generators. They are sometimes called arbitrary value generators. Jimba comes with functions that does these.
```
1. gNo:(min=opt._Min, max=opt._Max)
2. gBool:(len=1)
3. gNull:(n=1)
4. chrs:(len=10)
5. upperC:(length=10)
6. lowerC:(length=10)
7. digts:(length=10)
8. symbls:(len=10)
```
examples of using the above are :
```
9. const num = gRValue.gNo(gRValue.gNo(),gRValue.gNo()); jj("Home","Number is between -10 and 10",num,"between(-3,4)","positive no")
10. const gBool = gRValue.gBool(gRValue.gNo()); jj("Home","create 10 bools ",gBool.length,"eq(10)","10")   
11. const gNull = gRValue.gNull(gRValue.gNo()); jj("Home","create no less or equal to 1",gNull.length,"leq(1)")
12. const gt = gRValue.gNo(); jj("Home","create number greater than 10",gt,"gt(10)","no > 10")
13. const lt = gRValue.gNull(); jj("Home","create number less than 1",lt.length,"lt(0)","lt length")  
14. const chrs = gRValue.chrs(90); jtest("chrs",chrs,'kmjnh')
15. const upperC_ = gRValue.upperC(60); jtest("chrs",upperC_,'kmjnh')
16. const lowerC = gRValue.lowerC(6); jtest("chrs",lowerC,'kmjnh');jj("Home","lowerC",lowerC,"eq('abcd')")
17. const digts = gRValue.digts(9); jj("Home","Number iwith 9 digits",digts,"string()")
18. const symbls = gRValue.symbls(70); jj("Home","70 chars",symbls,"string()")
```
This will produces the time hi ---ms. All functions marked with tS() and tE() will also show how many times they are being called.

Thorough testing of jimba is still going on and anyone is invited to try it and give feedback. Installing as npm i jimba will install the 
latest version. Should one face errors of dependence issues then one needs to install it like this npm i jimba --force

### 9. Feedback and Contact
For feedback or inquiries about this library, please contact:
- cto@wims.io
- besi@tobb.co.za
