
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



Examples 

![image](https://github.com/besiwims/jimba/assets/44117539/afa8a8bf-4849-42e9-bd0e-7c35adf7b181)

Jimba or j is a console.log wrapper library which eliminates the following problems and j.js solutions:

1.  Repeated addition and removal
Console.log usage always requires removing and adding it back as per need.

j.js does not require removal because it can be turned off to  speed up the page functioning.

2. It is clumsy
Web page is often blotted with console.logs which cannot be disable and often times needs removal which is cumbersome when the page is big.

j.js is neat because one only adds it at the end of line with variable being logged.

3. Speed estimate
Console.log does not profile the page execution.

j.js has basic working execution profiling.

4.  Too long to write
Console.log is a tool but is too long to write. Something short is better.

j.js function is one letter function. e.g. j({variablename}), o({variablename})

The above 2 functions j and o will call console.log and also produce the variable null status and also tell the argument name passed on to the function when it was being called.

5. Builtin testing

Console.log lacks built in null/empty/false value testing. These often surfance during runtime and are hard to detect.

j.js runs tests for each variable and displays not only errors but also the total errors.

Why j.js instead of jimba.js?

j.js is an upgrade of jimba.js.  Both work the same. j.js uses two functions j() and o(). o() function is for console logging objects.

Other advantages of jimba

Write js code and have builtin null variable testing on the frontend without other difficult to learn testing libraries.

Improvements:

One improvements needed is to log these jimba results to a server.

# jimba JECT

 * Title : Jimba Extended Consolelog Tool -> JECT
 * Description : 
 *  This is a tool to log and trace contents of variables. It flags undefined, null, empty variables
 *  Problem : Developers face the problem of writing code and blotting it with lots of console logs
 *            Removing and re-entering these console.logs is cumbersome. This tool JECT solves this problem.
 *  How? Developer simply calls j() function along or below the variable/const and JECT will keep check
 *       if it is null/undefined/empty etc. It will flag red once it is, giving file name and estimate line number.
 * Author : Bernard Sibanda
 * Date : 16-07-2023
 * URL : https://github.com/besiwims/jimba.git
 * Company : Tobb Technologies Pty Ltd
 * License : MIT
 * How to use it : 
 *  a) create a file named jimba.js and copy this content here to the file
 *  b) Go to the file you want to log/trace
 *  c) Add this function along or below the variable/const/object you want to watch
 *  d) FLAGS to set are `_R = !0` at Jimba file means RUN tracing and `_R = 0` means switch off console logging
 *     and `_RS = !0` at Jimba file means RUN tracing only on selected variables and `_RS = 0` means switch off console logging
 *  e) If `_RS` is = !0 then the j() function will have 3 parameters e.g. j(nelliVa+f(),"nelliVa 95",1). The `1` third parameter
 *     is telling JECT to log the variable if `_RS` is turned on otherwise it will be off e.g. j(nelliVa+f(),"nelliVa 95");
 *  Examples are given below 
 *  
  const temp = {'age':90,'name':null}
  const art = [1,2,3]
  const stringname = "bernrad"
  const age = 60
  j(temp+f(),"temp 73",1);
  j(art+f(),"art 75",1);
  j(stringname+f(),"stringname 77",1);
  j(age+f(),"age 79",1);
  j(apiKey+f(),"apiKey 87",1);
  const nullVar = ""
  j(nullVar+f(),"nullVar 91",1);
  const nelliVa = undefined
  j(nelliVa+f(),"nelliVa 95",1);

  Output console logs will be:

        1[ [object Object] pages/rc.tsx:43:95)
        ]  ✓ PASS  :temp 73
        jimba.js:68 3[ 1,2,3 pages/rc.tsx:44:94)
        ]  ✓ PASS  :art 75
        jimba.js:68 5[ bernrad pages/rc.tsx:45:101)
        ]  ✓ PASS  :stringname 77
        jimba.js:68 7[ 60 pages/rc.tsx:46:94)
        ]  ✓ PASS  :age 79
        jimba.js:68 9[ preprodH0XGC6fxggohEF0wlqG1KsKjvmjQ2aI4 pages/rc.tsx:52:97)
        ]  ✓ PASS  :apiKey 87
        jimba.js:68 11[  pages/rc.tsx:54:98)
        ]  ✓ PASS  :nullVar 91
        jimba.js:66 14[ undefined pages/rc.tsx:56:98)
        ]  x FAIL :*** VAR EMPTY *** :nelliVa 95

   Measuring time code takes to execute :

   For this us the tm() function. Do not nest the tm() functions as of now, we will improve this
   Go to where you want to start measuring time and paste this tm(!0,j,f,"A 97",dObject) This is for starting to log time
   Place tm(0,j,f,"A 97",dObject) where you want to end measureing time. Please note the first parameter is false(0) not !0 true
   
   Output will be 

    69[ 1689491631777 ]  ✓ PASS  :A 97 : STARTED 
    jimba.js:109 71[ 1689491631781 | 4 ms ]  ✓ PASS  :A 317  : ENDED 

    This shows that time taken from A 97 to A 317 is 4ms. Great!
 
