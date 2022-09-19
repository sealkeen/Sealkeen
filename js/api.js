export default {
    loc: 'https://8a2b-37-144-215-79.eu.ngrok.io/',
    getLocation() {
        if (!(window.location.href.indexOf("github.io") > -1))
        {
            return 'http://localhost:5000/'
        } else 
            return 'https://4af8-37-144-215-79.eu.ngrok.io/'
    },
    getPostfix() {
        if (!(window.location.href.indexOf("github.io") > -1))
        {
            return ''
        } else
            return '/Sealkeen'
    },
    getInDevelopmentMessage()
    {
        //alert('В разработке (развёртывается на удалённый ресурс)');
    },
    isGithub()
    {
        return (window.location.href.indexOf("github.io") > -1);
    }
}

const urls = {
    loc: 'https://8a2b-37-144-215-79.eu.ngrok.io/',
    getLocation() {
        if (!(window.location.href.indexOf("github.io") > -1))
        {
            return 'http://localhost:5000/'
        } else 
            return 'https://4af8-37-144-215-79.eu.ngrok.io/'
    }
}