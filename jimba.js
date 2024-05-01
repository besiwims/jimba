/*
0. Version 1.1.1
1. Library: Jimba is a javascript console log wrapping, variables/objects/arrays testing, functions/page profiling library
2. Author: Bernard Sibanda [Tobb Technologies Pty Ltd, Women In Move Solutions Pty Ltd]
3. License: MIT
4. Date : 01-05-2024
5. How to install: NPM -> for npm one has to run this command npm i jimba, for websites simple add the script tag to the j.js file. This means you copy the j.js file from github and add contents to the j.js
6. Authour : Bernard Sibanda [Tobb Technologies, Women In Move Solutions]

Installation using nodejs npm. On the vscode terminal run npm i jimba or npm i jimba --force if there are dependence issues
Usage : The opt object is a collection of switches using 0 for false and any number say 1 for true

import {opt,jtest,jtrics,o,tS,tE } from 'jimba'; //use this at the top page
opt._O = 0; // console.log the variable, array, or object using function o() as follows: 
            // const varDemo = "jimba demo"; o({varDemo})
            // Please note the the o() parameter takes object so always add the {} around your variable
            // this will help tell you the name of item being logged
opt._FailsOnly = 0; // Change this to 1 to only see errors and failing tests
opt._T = 0; // Change this to 1 to only see tests created using the jtest() function
            // jtest demo: const x = (y,c)=>{ return y * c}; jtest("demo",demo(2,3),6)
            // Firs parameter is description of test
            // Second parameter is the function call with its arguments
            // Third parameter of jtest is the expected answer
opt._M = 0; // _M is a switch to turn on/off console log call stack. Use 0 for false and 1 for true
opt._R = 0; // _R switch is turned on by 1 to run everything: logs, tests and function profilings and 0 to turn it off
opt._F = 0; // _F switch is to turn on (1) or off(0) functions profilling function matrics

 
*/

export const opt = {
    TOTAL_FAIL : 0,
    TOTAL_PASS : 0,
    TOTAL_TESTS_PASS :0,
    TOTAL_TESTS_FAIL :0,
    TOTAL_TESTS_RUN :0,
    TOTAL_WRONG_DATA_TYPES_PARAMS :0,
    _R : 0,
    _FailsOnly :0,
    _T : 0,
    _O : 0,
    _M : 0,
    _F : 0,
    _Tc : 0,
    _tNo : 20,
    _Min : -100,
    _Max : 100,
    _FUNCTIONS : [],
}

export function o(o,r=0)
{ 
    
    if(opt._O == 1 || opt._R == 1)
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
                    console.log(o)
                    console.info("%cX FAIL " , "background-color:darkred;color:#fff;");opt.TOTAL_FAIL++;
                    console.trace(o);
                }
            }
             
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

        console.log( opt._FUNCTIONS)

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
    if(opt. _O || opt._T ==1|| opt._R || !(k == 0))
    {
        if(opt.TOTAL_FAIL > 0)
        {
            console.log("%cTOTAL_ERRORS : " + opt.TOTAL_FAIL,"background-color:#fff;color:darkred;");
        }
    }
    
}

function passes(k=0){
    if(opt. _O || opt._T ==1|| opt._R || !(k == 0))
    {
        if(opt.TOTAL_PASS > 0){
            console.log("%cTOTAL_PASSES : " + opt.TOTAL_PASS,"background-color:#fff;color:blue;");
        }
    }
    
}

function funcs(k=0){
    if((opt. _O || opt._T ==1|| opt._R || opt.tS_ ) && (!(k == 0) || (opt._FUNCTIONS.length > 0)))
    {
        const fT = opt._FUNCTIONS.length;
        console.log("%cTOTAL_FUNCTIONS : " + fT,"background-color:#fff;color:purple;");
        const funcs_ = opt._FUNCTIONS.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
        console.log(funcs_);
    }

}

function tests(k=0){

   
    if(opt._T == 1){opt.tS_  = false;}

    if((opt._T ==1|| opt._R || opt.tS_ ) && (!(k == 0) || (opt.TOTAL_TESTS_PASS > 0)))
    {
        console.log("%cTOTAL_TESTS_PASS : " + opt.TOTAL_TESTS_PASS,"background-color:blue;color:#fff;"); 
    }
    if((opt._T ==1|| opt._R || opt.tS_ ) && (!(k == 0) || (opt.TOTAL_TESTS_FAIL > 0)))
    {
        console.log("%cTOTAL_TESTS_FAIL : " + opt.TOTAL_TESTS_FAIL,"background-color:darkred;color:#fff;"); 
    }
    if((opt._T ==1|| opt._R || opt.tS_ ) && (!(k == 0) || (opt.TOTAL_TESTS_RUN > 0)))
    {
        console.log("%cTOTAL_TESTS_RUN : " + opt.TOTAL_TESTS_RUN,"background-color:blue;color:#fff;"); 
    }
    if((opt._T ==1|| opt._R || opt.tS_ ) && (!(k == 0) || (opt.TOTAL_WRONG_DATA_TYPES_PARAMS > 0)))
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

export function gNo(min=opt._Min, max=opt._Max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function alphaNumericSymbolsString(length){
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_?|[]{}:",.!@#$%^&*()+~`';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
}

function lowerCaseAlphabetString(length){
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;   
}

function upperCaseAlphabetString(length){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;   
}

function onlyDigitsString(length){
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;   
}

function randomBoolean(){
    return Math.random() < 0.5;
}

export function jtest(title,varString,expectedAnswer,k=0){

    if(!title || !varString || !expectedAnswer)
    {
        if(opt._T == 1)
        {
            const trackcalls = (opt._Tc++)+" : "; 
            console.log("%c"+trackcalls+" : TESTING " + title,"background-color:#fff;color:blue;");
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

        const trackcalls = (opt._Tc++)+" : "; 

        console.log("%c"+trackcalls+" : TESTING " + title,"background-color:#fff;color:blue;");

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
