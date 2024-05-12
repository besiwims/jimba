*Table of Contents**
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
### 0. Version 1.2.1

### 1. Library Overview
Jimba is a javascript console log wrapping, variables/objects/arrays testing, functions/page profiling library. Its purpose is to introduce testing from simple console logs all the way to unit testing with bigger frameworks.

### 2. Author Information
- **Author:** Bernard Sibanda
- **Affiliations:** Tobb Technologies Pty Ltd, Women In Move Solutions Pty Ltd

### 3. License
MIT License

### 4. Installation Instructions
- **NPM:** Run `npm i jimba` to install via npm.
- **Website:** Create and add the script tag to the `jimba.js` file by copying the contents from GitHub.

### 5. Usage
Installation using nodejs npm. On the vscode terminal run `npm i jimba` or `npm i jimba --force` if there are dependency issues.

### 6. Automated Testing
Jimba facilitates test-driven development by enabling developers to divide their script into source code and test code. Example:

**Source Code A**
```
function add(x,y) {
    return x + y;
}

function sub(x,y) {
    return x - y;
}
```
**Test Code**
```
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
This will produces the time hi ---ms. All functions marked with tS() and tE() will also show how many times they are being called.

When testing a developer needs random value generators. They are sometimes called arbitrary value generators. 
Jimba comes with functions that does these. Jimba brings these functions as members of an object called gRValue.
Below is a list of arbitrary value generators and their default parameters
```
1. gRValue.gNo:(min=opt._Min, max=opt._Max)
2. gRValue.gBool:(len=1)
3. gRValue.gNull:(n=1)
4. gRValue.chrs:(len=10)
5. gRValue.upperC:(length=10)
6. gRValue.lowerC:(length=10)
7. gRValue.digts:(length=10)
8. gRValue.symbls:(len=10)
```
examples of using the above are : also see how to add 4th parameter to jj() functions e.g. jj("Home","Testing ",gBool.length,"eq(10)","10"), i.e. eq(10)
, "between(-3,4)", "gt(10)", "lt(0)","string()", other methods are listed under ###7 match makers.
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
Thorough testing of jimba is still going on and anyone is invited to try it and give feedback. Installing as npm i jimba will install the latest version. Should one face errors of dependence issues then one needs to install it like this npm i jimba --force

### 9. Feedback and Contact
For feedback or inquiries about this library, please contact:
- cto@wims.io
- besi@tobb.co.za

### 10 Improvements. 
```
The jtest, jj() and o(), tS(), tE() functions have been improved and bungled as one object j{s(),e(),log(),test(),check()}.
```
This makes using the logs, tests and checks very easy because you have to just call j on the vscode and the methods will show.
This now only requires a developer to call 3 objects : opt,gRValues and j, and 1 functions namely jtrics() for results.
Carefully check the tests samples  below including the simplified switches.
```
import {opt,jtrics,gRValue,j} from 'jimba';
 //switches
  opt._R = 0;           //run all

  opt._O = 1;           //run o() function calls
  opt._M = 0;           //show stack frames for objects

  opt._F = 0;           //run functions

  opt._T = 1;           //jtest, jj, jescribe i.e. tests
  opt._FailsOnly = 0;   //run only failing tests
  opt._Ob = 0;          //show stack frames

  Examples :
   j.s("hi");
   const add =(x : any,y:any)=>{
    return x + y
  }
  const ans = add(9,9);
  j.log(ans);
  j.test("Home","add 9 & 9 = 18",ans)?.eq(18)
  const ans1 = add(9,80);
  j.test("Home","add 9 & 80 > 18",ans1)?.geq(18)
  const ans2 = add(2,8);
   j.test("Home","add 2 8  <= 18",ans2)?.leq(18)
  const ans3 = add(9,8);
  j.test("Home","add 9 & 8 > 10",ans3)?.gt(10)
   const ans4 = add(9,2);
  j.test("Home","add 9 & 2 < 18",ans4)?.lt(18)
  const ans5 = null;
  j.test("Home","ans5 is null",ans5)?.null()
  const ans6 = {object:""};  
  j.test("Home","ans6 is object",ans6)?.object()
  const ans7 : [] = [];
  j.test("Home","ans7 is array",ans7)?.array()
  const ans8 = add(-10,8);
  j.test("Home","add -10 plus 8 = negative",ans8)?.neg()
  const ans9 = add(9,8);
  j.test("Home","add 9 & 8 > 18",ans9)?.pos()
  const ans10 = add(9,8);
  j.test("Home","add 9 & 8 > 18",ans10)?.num()
  const ans11 = false;
  j.test("Home","false is bool",ans11)?.bool()
  const ans12 = "james";
  j.test("Home","add 9 & 8 > 18",ans12)?.string()
  const ans13 = add(-12,76);
  j.test("Home","add 9 & 8 > 18",ans13)?.notNull()
  const name = "james"; j.log({name})
  const tmpe = 0; j.log(tmpe)

  function concateNames(name1:string,name2:string) {
    return name1+name2;
  }

  function cNulls (){
    return gRValue.gNull(10)
  } 
  
  for (let i = 0; i < opt._tNo; i++) {  
    const os = gRValue.gNo()+gRValue.gNo();                         j.log(os)    
    const answ = add(gRValue.gNo(),gRValue.gNo());                  j.test("Home","add()",answ)?.gt(40)    
    const arrValues = cNulls() ;                                    j.test("Home","cNulls",cNulls())?.array();    
    const names = concateNames(gRValue.chrs(10),gRValue.digts(5));  j.check("concateNames",names.length,15);j.test("Home","concateNames",names.length)?.eq(15)
  }
   
 jtrics()

 Outputs

j.js:115 : jTESTING Home :>: cNulls
j.js:952 ✓ PASS : ,,,0,[object Object],[object Object],0,0,[object Object],[object Object] :>>: array
j.js:1232 117 :  : jtest TESTING concateNames
j.js:1267 ✓ PASS : 15
j.js:1195 118 : jTESTING Home :>: concateNames
j.js:952 ✓ PASS : 15 :>>: 15
j.js:1171 X FAIL 


