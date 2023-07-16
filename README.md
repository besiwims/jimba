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
 
