const urls = {
    loc: 'https://f023-37-144-214-119.eu.ngrok.io/',
    getLocation() {
        if (!(window.location.href.indexOf("github.io") > -1))
        {
            return 'http://localhost:8080/'
        } else if((window.location.href.indexOf("localhost:500") > -1))
            return `${location.protocol}//${location.host}/`;
        else
            return 'https://f023-37-144-214-119.eu.ngrok.io/'
    },
    getPostfix() {
        if (window.location.href.indexOf("github.io") > -1)
            return 'Sealkeen/'
        else
            return ''
    },
    getInDevelopmentMessage()
    {
        //alert('В разработке (развёртывается на удалённый ресурс)');
    },
    isGithub()
    {
        return (window.location.href.indexOf("github.io") > -1);
    },
    isLocalhost()
    {
        return (window.location.href.indexOf('localhost:') > -1);
    }
}; export default urls;

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

export async function pushHistoryState(url)
{
    try {
        if(urls.isGithub() || urls.isLocalhost())
            return;
        console.log('History state URL:' + url);
        console.log('prevstate not null');
        let loc = `${location.protocol}//${location.host}/`;
        window.history.pushState({ prevUrl: window.location.href }, null, loc + urls.getPostfix() + url); 
    } catch(e) {
        console.log(e);
    }
}