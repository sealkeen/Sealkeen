const urls = {
    getLocation() {
        if(this.isGithub()) {
            return 'https://a30a-92-101-253-82.eu.ngrok.io/'
        } else if (this.isNodeJSHost()) {
            return 'http://localhost:8080/'
        } else
            return `${location.protocol}//${location.host}/`;
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
    },
    isNodeJSHost()
    {
        return (window.location.href.indexOf('localhost:808') > -1);
    },
    isNgrok()
    {
        return (window.location.href.indexOf('ngrok.io') > -1);
    },
    getHostRootPath()
    {
        return `${location.protocol}//${location.host}/`;
    },
    async isLocationReachable()
    {
        return await getLocationResponse();
    }
}; export default urls;

export async function getLocationResponse() {
    return $.ajax({
        url: urls.getLocation(),
        type: 'GET',
        contentType:'text/html',
        success: function (response) {
            if (response.responseText.indexOf('page-body-container') > 0)
                return true;
            return false;
        },
        error: function (err){
            console.log('location was not reachable, returning false.')
            return false;
        }
    });
};

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
        if(urls.isGithub() || urls.isNodeJSHost())
            return;
        console.log('History state URL:' + url);
        console.log('prevstate not null');
        let loc = `${location.protocol}//${location.host}/`;
        window.history.pushState({ prevUrl: window.location.href }, null, loc + urls.getPostfix() + url); 
    } catch(e) {
        console.log(e);
    }
}