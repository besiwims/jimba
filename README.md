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
 
