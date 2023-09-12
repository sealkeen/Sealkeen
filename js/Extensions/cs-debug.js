const Debug = {
    WriteLine: function(line, param)
    {
        if(param != null)
            console.log(line, param)
        else
            console.log(line)
    }
};

export default Debug;