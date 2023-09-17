const Debug = {
    WriteLine: function(line, param)
    {
        if(!window.isDebugEnabled)
            return;
        
        if(param != null)
            console.log(`[DBG] ${line}`, param)
        else
            console.log(`[DBG] ${line}`)
    }
};

export default Debug;