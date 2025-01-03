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
### 0. Version 1.2.8

Please use these latest updated code
```
//------------------start copy---------------------------
//simplified switches
import {opt,j } from './jimba';
//--only turn On, More and _FailsOnly to 1 or 0
const On = 1;
const More = 0;
opt._FailsOnly = 0;
//-----------------do not change below switches
opt._T = On;
opt._Ob = More;
opt._O = On;
opt._M = More;
//--------------------end copy---------------------
```
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

### 6. Typescript, javascript Automated Testing, logging, tracing using one tool jimba.js
What is jimba.js? 
It is a tool/library for testing, checking, logging, tracing variables, objects, functions and profiling code speed. This tool/library is meant to make 
testing part and parcel of writing coding. It simplifies test driven development by allowing to test and write code on the same file. The same way we write code and 
write console.log on the same file.
What problems does it solve?
1. Trap bugs via short unit tests injected at the end of the line. E.g. const answer = add(2,4); j.test("Home", " Adding 2 and 4 must give 6",answer)
2. No need to remove the j tests like we do remove the console log because it guards against changes in tested code snippets or variables
3. Most developers are not testing because it is triple work, time consuming and expensive. Jimba.js solves this by adding tests snippets at every variable and function calls without bloating the code.
4. Jimba js is a Swiss knife: It is not only improved console.log, it is not just tracing code execution to track computation but comprehensive unit testing for javascript
5. Most simple tests or console logs use simple samples to test but Jimba copies quick test method of using arbitraries values and generating these with various ranges.
6. It has zero dependence and it is very small in size and has very few things to use
7. It speeds up javascript testing.
8. Helps also introduces testing using other libraries Mocha, Jest, Vite but is better because it is very much simplified.
9. Begins property based testing in a very simple way...
10. Very easy to install : add a script tag on a website/webapp on simple run `npm i jimba` or `npm i jimba --force`
11. A developer who needs his/her code to run fast needs to switch jimba off using the opt... switches at every page.
12. One can also selectively test code sections using j.s() and j.e() funcitons for starting and end function profiling
13. Jimba allows not only object console logging but one can toggle tracing off and on. Also one can toggle testing sections of code on and off
14. Above all it combines 3 traditonal testing functions describe(), expect() and it() into one j.test()

Below are examples of the jimba version 1.2.1
```
The jtest, jj() and o(), tS(), tE() functions have been improved and bungled as one object j{s(),e(),log(),test(),check()}.
```
This makes using the logs, tests and checks very easy because you have to just call j on the vscode and the methods will show.
This now only requires a developer to call 3 objects : opt,gRValues and j, and 1 functions namely jtrics() for results.
Carefully check the tests samples  below including the simplified switches.
```
import {opt,j} from 'jimba';
 //switches
  opt._R = 0;           //run all

  opt._O = 1;           //run o() function calls
  opt._M = 0;           //show stack frames for objects

  opt._F = 0;           //run functions

  opt._T = 1;           //jtest, jj, jescribe i.e. tests
  opt._FailsOnly = 0;   //run only failing tests
  opt._Ob = 0;          //show stack frames

  Examples :
   
   const add =(x : any,y:any)=>{ j.s("add"); //start
    //...more code
    //...code to measure time
    j.e("add"); //end
    return x + y;
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
    return j.gNull(10)
  } 
  
  const discodancers = (name)=>{
    return name + " is a dancer";
}

const testPack = (async()=>{    
  //01
     const rname = j.lowerC(10); //generate randome lower case strings
     const rnameC = rname.charAt(0).toUpperCase() + rname.slice(1); // capitalize first letter
     j.test("Group A Unit Tests",'discodancers',discodancers(rnameC)).string();  
  //02
     j.test("Group A","cNulls Function tested",cNulls()).null();
  //03
    const fn1 = lowerC(6), fn2 = lowerC(6)
    j.test("Group A","concateNames",concateNames(fn1, fn2)).length(12)

});  
     
 jtrics(testPack)

 Outputs

j.js:115 : jTESTING Home :>: cNulls
j.js:952 ✓ PASS : ,,,0,[object Object],[object Object],0,0,[object Object],[object Object] :>>: array
j.js:1232 117 :  : jtest TESTING concateNames
j.js:1267 ✓ PASS : 15
j.js:1195 118 : jTESTING Home :>: concateNames
j.js:952 ✓ PASS : 15 :>>: 15
j.js:1171 X FAIL 
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




