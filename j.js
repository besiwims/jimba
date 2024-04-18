/*
1. Library: Jimba is a javascript console log wrapping, variables/objects/arrays testing, functions/page profiling library
2. Author: Bernard Sibanda [Tobb Technologies Pty Ltd, Women In Move Solutions Pty Ltd]
3. License: MIT
4. Date : 18-04-2024
5. How to install: NPM -> for npm one has to run this command npm i jimba, for websites simple add the script tag to the j.js file. This means you copy the j.js file from github and add contents to the j.js
6. Examples are give below how to import the js or ./j file

First thing to do is add the opt._R = true for this library to trace else it will be off. You can assign false to stop logging
Instead of the problematic console.log() calls, simple call j({}) or o({}). These functions need an object as shown below
Let's say I want to console.log() a variable walletAddress. You simple call j({walletAddress}). Jimba will inspect the variable
run test of null/empty/etc and PASS or FAIL as per results. It will display an orange warning rectangle wrapping stack calls to files
If an object or array is being traced or console.logged us o({}) function e.g. const listCows = ["moo","duu","mmm"]; Then 
trace it as follows o({listCows}). Jimba will console log its properties and do test too.

What if I want to profile a function? All one needs to do is to add tS(<function name>) e.g. here an example of a function

function jimbaJive(youAndmeParams){ 
   const msg = "...allnight gig";
   return "...allnight gig";
} 

In order to profile this function do this : add tS() and tE() functions to beginning and end of functions.

function jimbaJive(youAndmeParams){ 
   tS("jimbaJive");
   ...
   ...
   ...
   const msg = "...allnight gig";
   ...
   ...
   ...
   tE("jimbaJive")
   return "...allnight gig";
}

import { j, o, funcs,fails,passes,opt, tS, tE } from "./j";
opt._R = true;

j({walletAddress});
✓ PASS walletAddress addr83843849494949

o({skey});
j.js:116 skey {skey: undefined}

tS("Home");
tE("Home");

How about execution aggregates e.g. total failures or passes or total function calls?
Use these 3 functions

a) passes(); This function will display total PASSES in testing
b) fails(); This function will display total FAILS e.g. null variables, empty, false, undefined etc
c) funcs(); This function will dump and display functions and their repeated calls

What about testing like libraries such as jest?


Arrays testing:

const arr1 = ["2","4","7"];

const arr2 = ["2","1","7"];

jtest("arrays",arr1,arr2);

Object testing:

const ag = {a:1,c:2,n:4}; 

const bn = {a:1,c:2,n:4}; 

jtest("objects",ag,bn);

jtrics();

TESTING : name
j.js:320 X FAIL : Am expecting jame, but got james
j.js:306 TESTING : number
j.js:329 ✓ PASS : 7
j.js:306 TESTING : bool
j.js:342 ✓ PASS : true
j.js:306 TESTING : arrays
j.js:359 X FAIL : Am expecting 2,1,7, but got 2,4,7
j.js:306 TESTING : objects
j.js:262 {a: 1, c: 2, n: 4} {a: 1, c: 2, n: 4}
j.js:368 ✓ PASS : [object Object]
*/

export const opt = {
    TOTAL_FAIL : 0,
    TOTAL_PASS : 0,
    _R : false,
    _F : false,
    foff : false,
    _FUNCTIONS : [],
    tS_ : true,
    tE  : true,
    off:function(r){
        if(r==0)
        {
            this._F = false;
        }
        else
        {
            this._F = true;
        }
            
    }
}

export function j(o, r=0,g=false,gOff=false)
{
    let g_ = r;

    if(r != 0)
    {
        opt._F = !0;

        const name = Object.keys(o)[0];
        const value = Object.values(o)[0];

        r = value
        o = name
    }
    else
    {
        const name = Object.keys(o)[0];
        const value = Object.values(o)[0];

        r = value
        o = name
    }

    if (opt._R || opt._F)
    {

        if(Array.isArray(o))
        {
            console.log(o);
            opt.off(g_);
            return
        }
        if(g)
        {
            console.groupCollapsed("\%c"+o.toUpperCase() + " GROUP","background-color:darkgreen;color:#fff;");
        }
        let e = "%c\u2713 PASS " + o + " " + r ,
            l = "%cX FAIL " + o + " " + function(r) 
            {
                if(typeof o == 'object')
                {
                    console.log(o) ;
                    opt.off(g_);
                    return
                }
                else
                {
                    opt.off(g_);
                    return console.warn(o,r)
                }               
               
            }(" ");
        if (o && r)
        {
            if(typeof o == 'object')
            {
                console.log(o) ;
                opt.off(g_);
                return
            }
            else
            {
                (new Error).stack.toString().replace("Error", " ");
                if(0 === o || o.toString().trim().length < 1 || o.toString().toLowerCase().includes("empty") || 0 === o || null === o || "0" === o || "null" === o || o.toString().includes("error") || e.toString().includes("undefined"))
                {
                        console.log(l, "background-color:#fff;color:red;");  opt.TOTAL_FAIL++;                
                }
                else
                {        
                (null, console.log(e, "background-color:#fff;color:green;")); opt.TOTAL_PASS++;
                }
            }
        }
        else 
        {
            console.log(l, "background-color:#fff;color:red;");
            opt.TOTAL_FAIL++;  
        }

        if(gOff)
        {
            console.groupEnd();
        }      
          
    }
}

export function o(o,r=0)
{ 

    if (opt._R || !(r ==0))
    {
        const name = Object.keys(o)[0];
        console.warn(name,o)
        return
    }

}

export function tS(title="JIMBA",k=0)
{

    if(!(k == 0))
    {
        opt.tS_ = t_;
    }   
 
    if(title && (opt._R || !(k == 0)))
    {
        opt._FUNCTIONS.push(title);

        console.log( opt._FUNCTIONS)

        console.time("TIME : "+title);       
    }
}

export function tE(title="JIMBA",k=0)
{
    if(title && (opt._R || !(k == 0)))
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
    if(opt._R || !(k == 0)){
        if(opt.TOTAL_FAIL > 0)
        {
            console.log("%cTOTAL_ERRORS : " + opt.TOTAL_FAIL,"background-color:#fff;color:darkred;");
        }
    }
    
}

function passes(k=0){
    if(opt._R || !(k == 0))
    {
        if(opt.TOTAL_PASS > 0){
            console.log("%cTOTAL_PASSES : " + opt.TOTAL_PASS,"background-color:#fff;color:blue;");
        }
    }
    
}

function funcs(k=0){
    if((opt._R || opt.tS_ ) && (!(k == 0) || (opt._FUNCTIONS.length > 0)))
    {
        const fT = opt._FUNCTIONS.length;
        console.log("%cTOTAL_FUNCTIONS : " + fT,"background-color:#fff;color:purple;");
        const funcs_ = opt._FUNCTIONS.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
        console.log(funcs_);
    }

}

export function jtrics(){
    passes(),fails();funcs();
}

const compareArrays = (a, b) => {    
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const compareObjects = (a, b) => {    

    if(typeof a == 'object' && typeof b == 'object' ){

        console.log(a,b);

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

export function jtest(title,varString,expectedAnser,k=0){
    if (opt._R || !(k !== 0))
    {
        typeof varString === 'string';

        console.log("%cTESTING : " + title,"background-color:#fff;color:blue;");

        let results = "";

        if(typeof varString === 'string' && typeof expectedAnser === 'string')
        {
            results = varString.localeCompare(expectedAnser);

            if(results === 0)
            {
                console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;"); opt.TOTAL_PASS++;
            }
            else
            {
                console.log("%cX FAIL : Am expecting " + expectedAnser + ", but got " + varString,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;
            }
        }
        else if(typeof varString === 'number' && typeof expectedAnser === 'number')
        {
            results = varString === expectedAnser;

            if(results === true)
            {
                console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;");opt.TOTAL_PASS++;
            }
            else
            {
                console.log("%cX FAIL : Am expecting " + expectedAnser + ", but got " + varString,"background-color:#fff;color:red;");opt.TOTAL_FAIL++;
            }
        }
        else if(typeof varString === 'boolean' && typeof expectedAnser === 'boolean')
        {
            results = varString === expectedAnser;

            if(results === true)
            {
                console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;");opt.TOTAL_PASS++;
            }
            else
            {
                console.log("%cX FAIL : Am expecting " + expectedAnser + ", but got " + varString,"background-color:#fff;color:red;"); opt.TOTAL_FAIL++;
            }
        }
        else if(Array.isArray(varString) && Array.isArray(expectedAnser))
        {
            results = compareArrays(varString, expectedAnser);

            if(results === true)
            {
                console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;");opt.TOTAL_PASS++;
            }
            else
            {
                console.log("%cX FAIL : Am expecting " + expectedAnser + ", but got " + varString,"background-color:#fff;color:red;"); opt.TOTAL_FAIL++;
            }
        }
        else if(typeof varString === 'object' && typeof expectedAnser === 'object')
        {
            results = compareObjects(varString,expectedAnser);

            if(results === true)
            {
                console.log("%c✓ PASS : " + varString,"background-color:#fff;color:green;");opt.TOTAL_PASS++;
            }
            else
            {
                console.log("%cX FAIL : Am expecting " + expectedAnser + ", but got " + varString,"background-color:#fff;color:red;"); opt.TOTAL_FAIL++;
            }
        }
        else
        {
            console.log(varString);
            console.log(expectedAnser);
            console.log("%c WRONG DATA TYPES GIVEN!","background-color:#fff;color:red;");
        }
        
    }

}
