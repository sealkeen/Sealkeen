export default {
    loc: 'https://1d80-37-144-214-133.eu.ngrok.io/',
    getLocation() {
        if (!(window.location.href.indexOf("github.io") > -1))
        {
            return 'http://localhost:8080/'
        } else 
            return 'https://1d80-37-144-214-133.eu.ngrok.io/'
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
    loc: 'https://1d80-37-144-214-133.eu.ngrok.io/',
    getLocation() {
        if (!(window.location.href.indexOf("github.io") > -1))
        {
            return 'http://localhost:8080/'
        } else 
            return 'https://1d80-37-144-214-133.eu.ngrok.io/'
    }
}