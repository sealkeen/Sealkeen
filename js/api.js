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

// if-url-exist.js v1
export function ifUrlExist(url, callback) {
    let request = new XMLHttpRequest;
    request.open('GET', url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('Accept', '*/*');
    request.onprogress = function(event) {
        let status = event.target.status;
        let statusFirstNumber = (status).toString()[0];
        switch (statusFirstNumber) {
            case '2':
                request.abort();
                return callback(true);
            default:
                request.abort();
                return callback(false);
        };
    };
    request.send('');
};