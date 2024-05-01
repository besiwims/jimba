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

 
