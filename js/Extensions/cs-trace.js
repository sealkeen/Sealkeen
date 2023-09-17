const Trace = {
    WriteLine: function(line, param)
    {
        if(!window.isTraceEnabled)
            return;

        if(param != null)
            console.log(`[VRB] ${line}`, param)
        else
            console.log(`[VRB] ${line}`)
    }
};

export default Trace;