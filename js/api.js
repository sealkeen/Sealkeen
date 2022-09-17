export default {
    loc: 'https://8a2b-37-144-215-79.eu.ngrok.io/',
    runAtGithub: function() 
    {
        if (window.location.href.indexOf("franky") > -1) 
        {
            return true
        }
        return false
    }
}