export let TOTAL_FAIL = 0;
export let TOTAL_PASS = 0;
export const  _R  = 0;
let _F = 0;
export const _FUNCTIONS =[];

function off(r)
{
    if(r)
    {
        _F = 0;
    } 
}

export function j(o, r,g=false,gOff=false)
{
    let g_ = r;

    if(r)
    {
        _F = !0;

        const name = Object.keys(o)[0];
        const value = Object.values(o)[0];

        r = value
        o = name
    }
    if(!r)
    {
        const name = Object.keys(o)[0];
        const value = Object.values(o)[0];

        r = value
        o = name
    }

    if (_R || _F)
    {

        if(Array.isArray(o))
        {
            console.log(o);
            off(g_);
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
                    off(g_);
                    return
                }
                else
                {
                    off(g_);
                    return console.warn(o,r)
                }               
               
            }(" ");
        if (o && r)
        {
            if(typeof o == 'object')
            {
                console.log(o) ;
                off(g_);
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

export function o(o,r=false)
{ 
    if(r)
    {
        _F = !0;
    }
     
    if (_R || _F)
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


let tS_ = false;

export function tS(title="JIMBA",k=false)
{

    if(k == true)
    {
        tS_ = true;
    }   
 
    if(title && (_R || tS_))
    {
        console.time("TIME : "+title.toUpperCase());       
    }
}

export function tE(title="JIMBA")
{
    if(title && (_R || tS_))
    {
        _FUNCTIONS.push(title);

        console.timeEnd("TIME : "+title);

        console.log("%cTOTAL_ERRORS : " + TOTAL_FAIL,"background-color:#fff;color:darkred;");

        console.log("%cTOTAL_PASSES : " + TOTAL_PASS,"background-color:#fff;color:blue;");

        tS_ = !0;
        
    }
}

export function fails(){
    if(_R || tS_)
    console.log("%cTOTAL_ERRORS : " + TOTAL_FAIL,"background-color:#fff;color:darkred;");
}

export function passes(){
    if(_R || tS_)
    console.log("%cTOTAL_PASSES : " + TOTAL_PASS,"background-color:#fff;color:blue;");
}

export function funcs(){
    if(_R || tS_)
    {
        const fT = _FUNCTIONS.length;
        console.log("%cTOTAL_FUNCTIONS : " + fT,"background-color:#fff;color:purple;");
        const funcs_ = _FUNCTIONS.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
        console.log(funcs_);
    }

}

