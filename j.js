export let TOTAL_FAIL = 0;
export let TOTAL_PASS = 0;
export const _R  = !0;

export function o(o)
{  
    if (_R)
    {
        const name = Object.keys(o)[0];
        console.warn(name,o)
        return
    }
    else
    {
        //
    }
}

export function j(o, r,g=false,gOff=false)
{
    if(!r)
    {
        const name = Object.keys(o)[0];
        const value = Object.values(o)[0];

        r = value
        o = name
    }
    
    if (_R)
    {

        if(Array.isArray(o))
        {
            console.log(o) 
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
                    console.log(o) 
                    return
                }
                else
                {
                    return console.warn(o,r)
                }               
               
            }(" ");
        if (o && r)
        {
            if(typeof o == 'object')
            {
                console.log(o) 
                return
            }
            else
            {
                (new Error).stack.toString().replace("Error", " ");
                if(0 === o || o.toString().trim().length < 1 || o.toString().toLowerCase().includes("empty") || 0 === o || null === o || "0" === o || "null" === o || o.toString().includes("error") || e.toString().includes("undefined"))
                {
                        console.log(l, "background-color:#fff;color:red;");  TOTAL_FAIL++;                
                }
                else
                {        
                (null, console.log(e, "background-color:#fff;color:green;")); TOTAL_PASS++;
                }
            }
        }
        else 
        {
            console.log(l, "background-color:#fff;color:red;");TOTAL_FAIL++;  
        }

        if(gOff)
        {
            console.groupEnd();
        }      
          
    }
}

export function tS(title="JIMBA")
{
    if(title)
    {
        console.time("TIME : "+title.toUpperCase());       
    }
}

export function tE(title="JIMBA")
{
    if(title)
    {
        console.timeEnd("TIME : "+title.toUpperCase());

        console.log("%cTOTAL_ERRORS : " + TOTAL_FAIL,"background-color:#fff;color:darkred;");

         console.log("%cTOTAL_PASSES : " + TOTAL_PASS,"background-color:#fff;color:blue;");
    }
}

export function fails(){
    console.log("%cTOTAL_ERRORS : " + TOTAL_FAIL,"background-color:#fff;color:darkred;");
}

export function passes(){
    console.log("%cTOTAL_PASSES : " + TOTAL_PASS,"background-color:#fff;color:blue;");
}
