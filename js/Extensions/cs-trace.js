const Trace = {
    WriteLine: function(line, param)
    {
        if(param != null)
            console.log(line, param)
        else
            console.log(line)
    }
};

export default Trace;