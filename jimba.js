/*
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

### 10 Improvements. The jtest, jj and o(), tS(), tE() functions have been improved and bungled as one object j{tS(),tE(),log(),test(),check()}. 
This makes using the logs, tests and checks very easy because you have to just call j on the vscode and the 3 methods will show.
This now only requires one to call 2 objects and 2 functions and then do miracle testing, checking and logging

import {opt,jtrics,gRValue,j} from 'jimba';

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

*/

export const opt = {
    TOTAL_FAIL : 0, 
    TOTAL_PASS : 0, 
    TOTAL_TESTS_PASS :0, 
    TOTAL_TESTS_FAIL :0,
    TOTAL_TESTS_RUN :0,
    TOTAL_WRONG_DATA_TYPES_PARAMS :0, //counts wrong parameter types mismatch given to functions
    _R : 0, //run all
    _M : 0, // trace frames for o() functions
    _FailsOnly :0, //run only failors
    _T : 0, // run tests
    _O : 0, //run objects
    _Ob : 0, //show objects of ComparisonMethods
    _F : 0, // run functions only
    _Tc : 1, // count tests only
    _tNo : 20, // standard number for iterations on gRvalues which is an object of arbitraries generators
    _Min : -100, //used by gNo for lowest value
    _Max : 100, //used by gNo for max value
    _FUNCTIONS : [], //collects all profiled functions
}

export function o(o,r=0)
{ 

    if(opt._O === 1 || opt._R === 1)
    {
        try 
        {
            if(o == null || o == undefined || o == 0 || o == '')
            {
                console.info("%cX FAIL " , "background-color:darkred;color:#fff;");opt.TOTAL_FAIL++;
                console.trace(o);
            }
            else
            {
                if(typeof o == 'object' && o != null)
                {
                    const name = Object.keys(o);  
                    const val = Object.values(o);  
                    if(val == '' || val == 0 || val == 'null' || val == 'undefined' || val == ['']) 
                    {
                        console.info("%cX FAIL " , "background-color:darkred;color:#fff;");opt.TOTAL_FAIL++;
                        console.info(o);
                    }
                    else
                    {
                        if(opt._FailsOnly === 0)            
                        {                        
                            const nesteddValue_ = Object.values(o);
                            if(nesteddValue_){
                                const nesteddValue = Object.values(nesteddValue_);
                                if(typeof Object.values(nesteddValue) == Number )
                                {
                                    return
                                }
                                const st = JSON.stringify(Object.values(nesteddValue));
                                if(!(st === "[{}]")){
                                    console.info("%c\u2713 PASS " , "background-color:darkgreen;color:#fff;");opt.TOTAL_PASS++;
                                    if(opt._M)
                                    {
                                        console.trace(o);
                                    }
                                    else
                                    {
                                        console.info(o);
                                    }
                                }
                                else{
                                    console.info("%cX FAIL " , "background-color:darkred;color:#fff;");opt.TOTAL_FAIL++;
                                    if(opt._M)
                                    {
                                        console.trace(o);
                                    }
                                    else
                                    {
                                        console.info(o);
                                    }
                                }
                            }else{
                                console.info("%c\u2713 PASS " , "background-color:darkgreen;color:#fff;");opt.TOTAL_PASS++;
                                if(opt._M)
                                {
                                    console.trace(o);
                                }
                                else
                                {
                                    console.info(o);
                                }
                            }
                                            
                        }
                        
                    }
                }
                else
                {             
                    if(((typeof o == 'number' && o > 0) || (typeof o == 'boolean' && o == true) || 
                    (typeof o == 'string' && o.trim().length > 0)))
                    {
                        if(opt._FailsOnly === 0)               
                        {
                            console.info("%c\u2713 PASS " , "background-color:darkgreen;color:#fff;");opt.TOTAL_PASS++;
                            console.info(o);
                        } 
                    }
                    else
                    {
                        console.info("%cX FAIL " , "background-color:darkred;color:#fff;");opt.TOTAL_FAIL++;
                        if(opt._M)
                        {
                        console.trace(o);
                        }
                    }
                }
                
            }
        } catch (error) {
            console.info("%cX FAIL " , "background-color:darkred;color:#fff;");opt.TOTAL_FAIL++;
            console.error(error)
        }
        
    }
    
}

export function tS(title="JIMBA",k=0)
{

    if(!(k == 0))
    {
        opt.tS_ = true;
    }   
 
    if(title && (opt._F || opt._R || !(k == 0)))
    {
        opt._FUNCTIONS.push(title);

        console.log("%cFunc starts : "+opt._FUNCTIONS,"background-color:#fff;color:purple;")

        console.time("TIME : "+title);       
    }
}

export function tE(title="JIMBA",k=0)
{
    if(title && (opt._F || opt._R || !(k == 0)))
    {
        console.timeEnd("TIME : "+title);

        if(opt.TOTAL_FAIL > 0)
        {
            console.log("%cTOTAL_ERRORS : " + opt.TOTAL_FAIL,"background-color:#fff;color:darkred;");
        }
        if(opt.TOTAL_PASS > 0)
        {
            console.log("%cTOTAL_PASSES : " + opt.TOTAL_PASS,"background-color:#fff;color:blue;");
        }

        funcs()
        
        opt.tS_ = false;
        
    }
}

function fails(k=0){
    if(opt._O || opt._T ==1|| opt._R || !(k == 0))
    {
        if(opt.TOTAL_FAIL > 0)
        {
            console.log("%cTOTAL_ERRORS : " + opt.TOTAL_FAIL,"background-color:#fff;color:darkred;");
        }
    }
    
}

function passes(k=0){
    if(opt._O || opt._T ==1|| opt._R || !(k == 0))
    {
        if(opt.TOTAL_PASS > 0){
            console.log("%cTOTAL_PASSES : " + opt.TOTAL_PASS,"background-color:#fff;color:blue;");
        }
    }
    
}

function funcs(k=0){
    if((opt. O || opt._T ==1|| opt._R || opt.tS ) && (!(k == 0) || (opt._FUNCTIONS.length > 0)))
    {
        const fT = opt._FUNCTIONS.length;
        console.log("%cTOTAL_FUNCTIONS : " + fT,"background-color:#fff;color:purple;");
        const funcs_ = opt._FUNCTIONS.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
        console.log(funcs_);
    }

}

function tests(k=0){

   
    if(opt.T == 1){opt.tS  = false;}

    if((opt.T ==1|| opt._R || opt.tS ) && (!(k == 0) || (opt.TOTAL_TESTS_PASS > 0)))
    {
        console.log("%cTOTAL_TESTS_PASS : " + opt.TOTAL_TESTS_PASS,"background-color:blue;color:#fff;"); 
    }
    if((opt.T ==1|| opt._R || opt.tS ) && (!(k == 0) || (opt.TOTAL_TESTS_FAIL > 0)))
    {
        console.log("%cTOTAL_TESTS_FAIL : " + opt.TOTAL_TESTS_FAIL,"background-color:darkred;color:#fff;"); 
    }
    if((opt.T ==1|| opt._R || opt.tS ) && (!(k == 0) || (opt.TOTAL_TESTS_RUN > 0)))
    {
        console.log("%cTOTAL_TESTS_RUN : " + opt.TOTAL_TESTS_RUN,"background-color:blue;color:#fff;"); 
    }
    if((opt.T ==1|| opt._R || opt.tS ) && (!(k == 0) || (opt.TOTAL_WRONG_DATA_TYPES_PARAMS > 0)))
    {
        console.log("%cTOTAL_WRONG_DATA_TYPES_PARAMS : " + opt.TOTAL_WRONG_DATA_TYPES_PARAMS,"background-color:blue;color:#fff;"); 
    }

}

export function jtrics(k=0){
    passes(k),fails(k);funcs(k);tests(k);
}

const compareArrays = (a, b) => {    
    return JSON.stringify(a) === JSON.stringify(b);
  };

const compareObjects = (a, b) => {    

    if(typeof a == 'object' && typeof b == 'object' ){

        const aObjElementTotal = a.length;
        const bObjElementTotal = a.length;

        const objTotalSame = aObjElementTotal === bObjElementTotal;

        if(!objTotalSame){
            return false;
        }
        else{
                const  aKeysArray = Object.keys(a);
                const aKeysArraySorted = aKeysArray.sort();
                const  aValuesArray = Object.keys(a);
                const aValuesArraySorted = aValuesArray.sort();

                const  bKeysArray = Object.keys(b);
                const bKeysArraySorted = bKeysArray.sort();
                const  bValuesArray = Object.keys(b);
                const bValuesArraySorted = bValuesArray.sort();

                if(compareArrays(aKeysArraySorted,bKeysArraySorted) && compareArrays(aValuesArraySorted,bValuesArraySorted))
                {
                    return true;
                }
                else
                {
                    return false;
                }

        }    

    }
    else{
        return false;
    }

 };

export function jtest(title,varString,expectedAnswer,k=0){
    const trackcalls = (opt._Tc++)+" : "; 
    const tBallConsole = "%c"+trackcalls+" : jtest TESTING " + title;
    const cssBlue = "background-color:#fff;color:blue;";
    if(!title || !varString || !expectedAnswer)
    {
        if(opt._T == 1)
        {
            
            console.log(tBallConsole,cssBlue);
            opt.TOTAL_TESTS_FAIL++;
            const res = varString?varString:" nothing.";    
            console.log("%c"+title,"background-color:purple;color:white;")
            console.log(varString);   
            console.log(expectedAnswer);     
            console.log("%cX FAIL : First three parameters are mandatory!","background-color:#fff;color:red;");opt.TOTAL_FAIL++;        
            return
        }
    }
    
    opt.TOTAL_TESTS_RUN++;

    if (opt._R || (k !== 0)||(opt._T == 1))
    {
        typeof varString === 'string';

        console.log(tBallConsole,cssBlue);

        let results = "";

        if(varString === undefined || varString == null)
        {
                opt.TOTAL_TESTS_FAIL++;
                const res = varString?varString:" nothing.";
                console.log("%cX FAIL : UNDEFINED!","background-color:#fff;color:red;");opt.TOTAL_FAIL++;
        }
        else if(typeof varString === 'string' && typeof expectedAnswer === 'string')
        {
            results = varString.localeCompare(expectedAnswer);

            if(results === 0)
            {
                if(opt._FailsOnly === 0)
                {
                    console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;"); opt.TOTAL_PASS++;opt.TOTAL_TESTS_PASS++;
                }
            }
            else
            {   opt.TOTAL_TESTS_FAIL++;
                const res = varString?varString:" nothing.";
                console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;
            }
        }
        else if(typeof varString === 'number' && typeof expectedAnswer === 'number')
        {
            results = varString === expectedAnswer;

            if(results === true)
            {
                if(opt._FailsOnly === 0)
                {
                    console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;");opt.TOTAL_PASS++;opt.TOTAL_TESTS_PASS++;
                }
            }
            else
            {   
                opt.TOTAL_TESTS_FAIL++;
                const res = varString?varString:" nothing.";
                console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;
                if(opt._Ob === 1)
                {
                    console.trace(res);
                }
            }
        }
        else if(typeof varString === 'boolean' && typeof expectedAnswer === 'boolean')
        {
            results = varString === expectedAnswer;

            if(results === true)
            {
                if(opt._FailsOnly === 0)
                {
                    console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;");opt.TOTAL_PASS++;opt.TOTAL_TESTS_PASS++;
                }
            }
            else
            {   
                opt.TOTAL_TESTS_FAIL++;
                const res = varString?varString:" nothing.";
                console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;
            }
        }
        else if(Array.isArray(varString) && Array.isArray(expectedAnswer))
        {
            results = compareArrays(varString, expectedAnswer);

            if(results === true)
            {
                if(opt._FailsOnly === 0)
                {
                 console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;");opt.TOTAL_PASS++;opt.TOTAL_TESTS_PASS++;          
                }
            }
            else
            {   
                opt.TOTAL_TESTS_FAIL++;
                const res = varString?varString:" nothing.";
                console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;
            }
        }
        else if(typeof varString === 'object' && typeof expectedAnswer === 'object')
        {
            results = compareObjects(varString,expectedAnswer);

            if(results === true)
            {
                if(opt._FailsOnly === 0)
                {
                    console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;");opt.TOTAL_PASS++;opt.TOTAL_TESTS_PASS++;
                }
            }
            else
            {   
                opt.TOTAL_TESTS_FAIL++;
                const res = varString?varString:" nothing.";
                console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;
            }
        }    
        else
        {   opt.TOTAL_WRONG_DATA_TYPES_PARAMS++;
            console.log(varString);
            console.log(expectedAnswer);
            console.log("%c WRONG DATA TYPES GIVEN! First param is of : " + typeof varString + ", Second param is of : " + typeof expectedAnswer,"background-color:#fff;color:red;");
        }
        
    }
    else
    {
        //
    }

}

class ComparisonMethods_ {
    constructor(actual,expectedValue="",k=0) {
      this.actual = actual;
      this.expectedValue = expectedValue;
      this.k = k;
    }  
    between(start,end)
    {
        if(this.actual >= start && this.actual <= end)
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k);   
        }
    }
    eq(expected,k=0) 
    {

        if (expected === this.actual) 
        {
            pass(this.actual,expected,k); 
        } 
        else 
        {
            fail(this.actual,expected,k); 
        }
    }
    gt(expected,k=0) {
        if (this.actual > expected) 
        {
            pass(this.actual,expected,k); 
        } 
        else 
        {
            fail(this.actual,expected,k); 
        }
      }
      lt(expected,k=0) {
        if (this.actual < expected) 
        {
            pass(this.actual,expected,k); 
        } 
        else 
        {
            fail(this.actual,expected,k); 
        }
      }
    geq(expected,k=0) {
        if (this.actual >= expected) 
        {
            pass(this.actual,expected,k); 
        } 
        else 
        {
            fail(this.actual,expected,k); 
        }
      }
    leq(expected,k=0)
    {

        if (expected >= this.actual) 
        {
            pass(this.actual,expected,k); 
        } 
        else 
        {
            fail(this.actual,expected,k); 
        }
    }
    null(k=0)
    {
        const nulls = [{empty:null},{empty:undefined},{empty:"null"},{empty:"undefined"},,null, undefined,0,'',"",{empty:[0]},{empty:""},{empty:''},{empty:"0"},{empty:0},{empty:[]},{empty:{}},[0],[],[''],[""],{}]; 
        
        if (nulls.includes(this.actual)) 
        {
            pass(this.actual,"null",k); 
        } 
        else 
        {
            fail(this.actual,"null",k); 
        }
      }
    object(k=0)
    {
        if ('object' === typeof this.actual) 
        {
            pass(this.actual,"object",k); 
        } 
        else 
        {
            fail(this.actual,"object",k); 
        }
      }
    array(k=0) 
    {
        if (Array.isArray(this.actual)) 
        {
            pass(this.actual,"array",k); 
        } 
        else 
        {
            fail(this.actual,"array",k); 
        }
      }
    neg(k=0) 
    {
        if (this.actual < 0) 
        {
            pass(this.actual,"negative",k); 
        } 
        else 
        {
            fail(this.actual,"negative",k); 
        }
      }
    pos(k=0)
    {
        if (this.actual >= 0) 
        {
            pass(this.actual,"positive",k); 
        } 
        else 
        {
            fail(this.actual,"positive",k); 
        }
      }
    bool(k=0)
    {
        if (typeof this.actual ===  'boolean') 
        {
            pass(this.actual,"bool",k); 
        } 
        else 
        {
            fail(this.actual,"bool",k); 
        }
      }
    num(k=0)
    {
        if (typeof this.actual === 'number') 
        {
            pass(this.actual,"num",k); 
        } 
        else 
        {
            fail(this.actual,"num",k); 
        }
      }
    string(k=0)
    {
        if (typeof this.actual ===  'string') 
        {
            pass(this.actual,"string",k); 
        } 
        else 
        {
            fail(this.actual,"string",k);         
        }
      }
      notNull(k=0)
      {
            const nulls = [{empty:null},{empty:undefined},{empty:"null"},{empty:"undefined"},,null, undefined,0,'',"",{empty:[0]},{empty:""},{empty:''},{empty:"0"},{empty:0},{empty:[]},{empty:{}},[0],[],[''],[""],{}]; 
            if (!nulls.includes(this.actual)) 
            {
                pass(this.actual,"notNull",k); 
            } 
            else 
            {
                fail(this.actual,"notNull",k);           
            }
        }
   
  }

class ComparisonMethods {
    constructor(actual,expectedValue,k=0) {
      this.actual = actual;
      this.expectedValue = expectedValue;
      this.k = k;
    }  
    between(start,end)
    {
        if(this.actual >= start && this.actual <= end)
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k);   
        }
    }
    eq(expected,k=0) 
    {
      if (expected === this.actual) 
      {
        pass(this.actual,this.expectedValue,k); 
    } 
    else 
    {
        fail(this.actual,this.expectedValue,k); 
      }
    }
    gt(expected,k=0) {
        if (this.actual > expected) 
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k); 
        }
      }
      lt(expected,k=0) {
        if (this.actual < expected) 
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k); 
        }
      }
    geq(expected,k=0) {
        if (this.actual >= expected) 
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k); 
        }
      }
    leq(expected,k=0)
    {

        if (expected >= this.actual) 
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k); 
        }
    }
    null(k=0)
    {
        const nulls = [{empty:null},{empty:undefined},{empty:"null"},{empty:"undefined"},,null, undefined,0,'',"",{empty:[0]},{empty:""},{empty:''},{empty:"0"},{empty:0},{empty:[]},{empty:{}},[0],[],[''],[""],{}]; 
        
        if (nulls.includes(this.actual)) 
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k); 
        }
      }
    object(k=0)
    {
        if ('object' === typeof this.actual) 
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k); 
        }
      }
    array(k=0) 
    {
        if (Array.isArray(this.actual)) 
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k); 
        }
      }
    neg(k=0) 
    {
        if (this.actual < 0) 
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k); 
        }
      }
    pos(k=0)
    {
        if (this.actual >= 0) 
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k); 
        }
      }
    bool(k=0)
    {
        if (typeof this.actual ===  'bool') 
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k); 
        }
      }
    num(k=0)
    {
        if (typeof this.actual === 'number') 
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k); 
        }
      }
    string(k=0)
    {
        if (typeof this.actual ===  'string') 
        {
            pass(this.actual,this.expectedValue,k); 
        } 
        else 
        {
            fail(this.actual,this.expectedValue,k);         
        }
      }
      notNull(k=0)
      {
            const nulls = [{empty:null},{empty:undefined},{empty:"null"},{empty:"undefined"},,null, undefined,0,'',"",{empty:[0]},{empty:""},{empty:''},{empty:"0"},{empty:0},{empty:[]},{empty:{}},[0],[],[''],[""],{}]; 
            if (!nulls.includes(this.actual)) 
            {
                pass(this.actual,this.expectedValue,k); 
            } 
            else 
            {
                fail(this.actual,this.expectedValue,k);           
            }
        }
   
  }

  function pass(exp,expectedValue,k)
  {
    if((opt._R === 1)|| (k !== 0)||(opt._T === 1))
    {
        if(opt._FailsOnly === 0) 
        {
            const trackcalls = (opt._Tc++)+" : "; 
            console.log("%c✓ PASS : " + exp + " :>>: "+expectedValue,"background-color:#fff;color:green;");opt.TOTAL_PASS++;opt.TOTAL_TESTS_PASS++;
            if(opt._Ob === 1){
                console.trace(exp)
            }
        }
    }
  }

  function fail(exp,expectedValue,k){
    if((opt._FailsOnly === 1) || opt._R || (k !== 0)||(opt._T == 1))
    {   const trackcalls = (opt._Tc++)+" : "; 
        console.log("%cX FAIL : " + exp + " :>>: "+expectedValue,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;opt.TOTAL_TESTS_FAIL++;
        if(opt._Ob === 1)
        {
            console.trace(exp)
        }
    }
  }
  
export function jexpect(actual,expectedValue="") {
    return new ComparisonMethods(actual,expectedValue);
  }
  
export function jescribe(suiteName, fn,k=0) {
    if(opt._T === 1|| opt._R===1 || !(k === 0))
    {  
        try 
        {
            const trackcalls = (opt._Tc++)+" : "; 
            console.log("%c"+trackcalls+"jj TEST "+suiteName.toUpperCase(),"background-color:#fff;color:purple;");
            fn();
        } catch(err) {
        console.log(err.message);
        }
    }
  }
  
export  function jit(testName, fn) {
    console.log("%c"+testName,"background-color:#fff;color:blue;");
    try {
      fn();
    } catch (err) {
       console.log(err.message);
    }
  }
export function jj(title,fTitle,objTested,optExpected,expectedValue="",k=0){

    if(opt._T === 1|| opt._R===1 || !(k === 0))
    {       
        try 
        {   const trackcalls = (opt._Tc++)+" : ";   
            console.log("%c"+trackcalls+"jj TEST "+title+" :>: "+fTitle,"background-color:#fff;color:purple;");
            eval('jexpect(objTested,expectedValue).'+optExpected);            
        } 
        catch(err) 
        {
            console.log(err.message);
        }
    }
    else
    {
        //
    }
}

export const gRValue = {
    gNo:(min=opt._Min, max=opt._Max)=>{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    gBool:(n=1)=>{
        n = n > 0? n : opt._tNo;
        const arrBool = [];
        for (let i = 0; i < n; i++) {
            arrBool.push(Math.random() < 0.5)        
        }    
        return arrBool;
    },
    gNull:(n=1)=>{
        n = n > 0? n : opt._tNo;
        const negativeNo = gRValue.gNo(-1000,-1);
        const nulls = [{empty:null},{empty:undefined},{empty:"null"},{empty:"undefined"},,null, undefined,0,'',"",{empty:[0]},{empty:""},
        {empty:''},{empty:"0"},{empty:0},{empty:[]},{empty:{}},[0],[],[''],[""],{},negativeNo];
        const nullArray = [];
        for (let i = 0; i < n; i++) {
            nullArray.push(nulls[Math.floor(Math.random()*nulls.length)]);        
        }
        return nullArray;
    },
    chrs:(len=10)=>{
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_?|[]{}:",.!@#$%^&*()+~`';
        return charProcess(characters,len);
    },
    upperC:(length=10)=>{
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return charProcess(characters,length)
    },
    lowerC:(length=10)=>{
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        return charProcess(characters,length)
    },
    digts:(length=10)=>{
        let result = '';
        const characters = '0123456789';
        return charProcess(characters,length)
    },
    symbls:(len=10)=>{
        let result = '';
        const characters = `'-_?|[]{}:",.!@#$%^&*()+~\\><=`;
        return charProcess(characters,len);
    },
}

const charProcess=(characters,length)=>{
    const charactersLength = characters.length;
    let counter = 0;
    let result = "";
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result; 
}

export const j={
    log:(o)=>{
        if(opt._O === 1 || opt._R === 1)
            {
                try 
                {
                    if(o == null || o == undefined || o == 0 || o == '')
                    {
                        console.info("%cX FAIL " , "background-color:darkred;color:#fff;");opt.TOTAL_FAIL++;
                        if(opt._M === 1)
                        {
                            console.info(o);
                        }  
                    }
                    else
                    {
                        if(typeof o == 'object' && o != null)
                        {
                            const name = Object.keys(o);  
                            const val = Object.values(o);  
                            if(val == '' || val == 0 || val == 'null' || val == 'undefined' || val == ['']) 
                            {
                                console.info("%cX FAIL " , "background-color:darkred;color:#fff;");opt.TOTAL_FAIL++;
                                console.info(o);
                            }
                            else
                            {
                                if(opt._FailsOnly === 0)            
                                {                        
                                    const nesteddValue_ = Object.values(o);
                                    if(nesteddValue_){
                                        const nesteddValue = Object.values(nesteddValue_);
                                        if(typeof Object.values(nesteddValue) == Number )
                                        {
                                            return
                                        }
                                        const st = JSON.stringify(Object.values(nesteddValue));
                                        if(!(st === "[{}]")){
                                            console.info("%c\u2713 PASS " , "background-color:darkgreen;color:#fff;");opt.TOTAL_PASS++;
                                            if(opt._M)
                                            {
                                                console.trace(o);
                                            }
                                            else
                                            {
                                                console.info(o);
                                            }
                                        }
                                        else{
                                            console.info("%cX FAIL " , "background-color:darkred;color:#fff;");opt.TOTAL_FAIL++;
                                            if(opt._M)
                                            {
                                                console.trace(o);
                                            }
                                            else
                                            {
                                                console.info(o);
                                            }
                                        }
                                    }else{
                                        console.info("%c\u2713 PASS " , "background-color:darkgreen;color:#fff;");opt.TOTAL_PASS++;
                                        if(opt._M)
                                        {
                                            console.trace(o);
                                        }
                                        else
                                        {
                                            console.info(o);
                                        }
                                    }
                                                    
                                }
                                
                            }
                        }
                        else
                        {             
                            if(((typeof o == 'number' && o > 0) || (typeof o == 'boolean' && o == true) || 
                            (typeof o == 'string' && o.trim().length > 0)))
                            {
                                if(opt._FailsOnly === 0)               
                                {
                                    console.info("%c\u2713 PASS " , "background-color:darkgreen;color:#fff;");opt.TOTAL_PASS++;
                                    if(opt._M === 1)
                                        {
                                            console.info(o);
                                        }                                    
                                } 
                            }
                            else
                            {
                                console.info("%cX FAIL " , "background-color:darkred;color:#fff;");opt.TOTAL_FAIL++;
                                if(opt._M)
                                {
                                console.trace(o);
                                }
                            }
                        }
                        
                    }
                } catch (error) {
                    console.info("%cX FAIL " , "background-color:darkred;color:#fff;");opt.TOTAL_FAIL++;
                    console.error(error)
                }
                
            }
    },
    test:(title,fTitle,actual,k=0)=>
    {
        try 
        { 
            if(opt._T === 1|| opt._R===1 || !(k === 0))
            {       
                const trackcalls = (opt._Tc++)+" : ";   

                console.log("%c"+trackcalls+"jTESTING "+title+" :>: "+fTitle,"background-color:#fff;color:purple;");

                return new ComparisonMethods_(actual);
            }
        }
        catch(error)
        {
            console.log(error.message);
        }

    },
    check:(title,varString,expectedAnswer,k=0)=>{
        const trackcalls = (opt._Tc++)+" : "; 
        const tBallConsole = "%c"+trackcalls+" : jtest TESTING " + title;
        const cssBlue = "background-color:#fff;color:blue;";
        if(!title || !varString || !expectedAnswer)
        {
            if(opt._T == 1)
            {
                
                console.log(tBallConsole,cssBlue);
                opt.TOTAL_TESTS_FAIL++;
                const res = varString?varString:" nothing.";    
                console.log("%c"+title,"background-color:purple;color:white;")
                console.log(varString);   
                console.log(expectedAnswer);     
                console.log("%cX FAIL : First three parameters are mandatory!","background-color:#fff;color:red;");opt.TOTAL_FAIL++;        
                return
            }
        }
        
        opt.TOTAL_TESTS_RUN++;
    
        if (opt._R || (k !== 0)||(opt._T == 1))
        {
            typeof varString === 'string';
    
            console.log(tBallConsole,cssBlue);
    
            let results = "";
    
            if(varString === undefined || varString == null)
            {
                    opt.TOTAL_TESTS_FAIL++;
                    const res = varString?varString:" nothing.";
                    console.log("%cX FAIL : UNDEFINED!","background-color:#fff;color:red;");opt.TOTAL_FAIL++;
            }
            else if(typeof varString === 'string' && typeof expectedAnswer === 'string')
            {
                results = varString.localeCompare(expectedAnswer);
    
                if(results === 0)
                {
                    if(opt._FailsOnly === 0)
                    {
                        console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;"); opt.TOTAL_PASS++;opt.TOTAL_TESTS_PASS++;
                    }
                }
                else
                {   opt.TOTAL_TESTS_FAIL++;
                    const res = varString?varString:" nothing.";
                    console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;
                }
            }
            else if(typeof varString === 'number' && typeof expectedAnswer === 'number')
            {
                results = varString === expectedAnswer;
    
                if(results === true)
                {
                    if(opt._FailsOnly === 0)
                    {
                        console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;");opt.TOTAL_PASS++;opt.TOTAL_TESTS_PASS++;
                    }
                }
                else
                {   
                    opt.TOTAL_TESTS_FAIL++;
                    const res = varString?varString:" nothing.";
                    console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;
                    if(opt._Ob === 1)
                    {
                        console.trace(res);
                    }
                }
            }
            else if(typeof varString === 'boolean' && typeof expectedAnswer === 'boolean')
            {
                results = varString === expectedAnswer;
    
                if(results === true)
                {
                    if(opt._FailsOnly === 0)
                    {
                        console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;");opt.TOTAL_PASS++;opt.TOTAL_TESTS_PASS++;
                    }
                }
                else
                {   
                    opt.TOTAL_TESTS_FAIL++;
                    const res = varString?varString:" nothing.";
                    console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;
                }
            }
            else if(Array.isArray(varString) && Array.isArray(expectedAnswer))
            {
                results = compareArrays(varString, expectedAnswer);
    
                if(results === true)
                {
                    if(opt._FailsOnly === 0)
                    {
                     console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;");opt.TOTAL_PASS++;opt.TOTAL_TESTS_PASS++;          
                    }
                }
                else
                {   
                    opt.TOTAL_TESTS_FAIL++;
                    const res = varString?varString:" nothing.";
                    console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;
                }
            }
            else if(typeof varString === 'object' && typeof expectedAnswer === 'object')
            {
                results = compareObjects(varString,expectedAnswer);
    
                if(results === true)
                {
                    if(opt._FailsOnly === 0)
                    {
                        console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;");opt.TOTAL_PASS++;opt.TOTAL_TESTS_PASS++;
                    }
                }
                else
                {   
                    opt.TOTAL_TESTS_FAIL++;
                    const res = varString?varString:" nothing.";
                    console.log("%cX FAIL : Am expecting " + expectedAnswer + " but got " + res,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;
                }
            }    
            else
            {   opt.TOTAL_WRONG_DATA_TYPES_PARAMS++;
                console.log(varString);
                console.log(expectedAnswer);
                console.log("%c WRONG DATA TYPES GIVEN! First param is of : " + typeof varString + ", Second param is of : " + typeof expectedAnswer,"background-color:#fff;color:red;");
            }
            
        }
        else
        {
            //
        }
    },
    s:(label,k=0)=>{
        if(!(k == 0))
        {
            opt.tS_ = true;
        }   
        
        if(label && (opt._F || opt._R || !(k == 0)))
        {
            opt._FUNCTIONS.push(label);
    
            console.log("%cFunc starts : "+opt._FUNCTIONS,"background-color:#fff;color:purple;")
    
            console.time("TIME : "+label);       
        }
    },
    e:(label,k=0)=>{
        if(!(k == 0))
        {
            opt.tS_ = true;
        }   
        
        if(label && (opt._F || opt._R || !(k == 0)))
        {
            opt._FUNCTIONS.push(label);
    
            console.log("%cFunc starts : "+opt._FUNCTIONS,"background-color:#fff;color:purple;")
    
            console.time("TIME : "+label);       
        }
    }
}
