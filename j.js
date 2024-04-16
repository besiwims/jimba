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
        if(r)
        {
            this._F = false;
        }
    }
}

export function j(o, r,g=false,gOff=false)
{
    let g_ = r;

    if(r)
    {
        opt._F = !0;

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

    if (opt._R || opt._F)
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

export function o(o,r=false)
{ 
    if(r)
    {
        opt._F = !0;
    }
     
    if (opt._R || opt._F)
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

export function tS(title="JIMBA",k=false)
{

    if(k == true)
    {
        opt.tS_ = true;
    }   
 
    if(title && (opt._R || k==true))
    {
        opt._FUNCTIONS.push(title);

        console.log( opt._FUNCTIONS)

        console.time("TIME : "+title);       
    }
}

export function tE(title="JIMBA",k=false)
{
    if(title && (opt._R || k==true))
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

export function fails(){
    if(opt._R || opt.tS_){
        if(opt.TOTAL_FAIL > 0)
        {
            console.log("%cTOTAL_ERRORS : " + opt.TOTAL_FAIL,"background-color:#fff;color:darkred;");
        }
    }
    
}

export function passes(){
    if(opt._R || opt.tS_)
    {
        if(opt.TOTAL_PASS > 0){
            console.log("%cTOTAL_PASSES : " + opt.TOTAL_PASS,"background-color:#fff;color:blue;");
        }
    }
    
}

export function funcs(k=false){
    if((opt._R || opt.tS_ ) && (k || (opt._FUNCTIONS.length > 0)))
    {
        const fT = opt._FUNCTIONS.length;
        console.log("%cTOTAL_FUNCTIONS : " + fT,"background-color:#fff;color:purple;");
        const funcs_ = opt._FUNCTIONS.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
        console.log(funcs_);
    }

}
