import routes, { GetNonRoutePaths } from './Router/routing-table.js';

const urls = {
    getLocation() {
        if(this.isGithub()) {
            return 'https://44ad-95-24-224-108.ngrok-free.app/';
        } else if ( this.isRemoteWorkspace() ) {
            return 'https://localhost:443/';
        } else if ( !this.isNodeJSHost() || this.isNgrok() ) {
            return `${location.protocol}//${location.host}/`;
        } else
            return 'https://localhost:5001/';
    },
    getPostfix(forPath) {
        let result = "";
        if (window.location.href.indexOf("github.io/Sealkeen") > -1)
            result += 'Sealkeen/';
        return result;
    },
    getContentPath() {
        return this.isGithub || this.isNodeJSHost ? 'Content/' : ''; 
    },
    isGithub: () => (window.location.href.indexOf("github.io") > -1),
    isLocalhost: () => (window.location.href.indexOf('localhost:') > -1),
    isRemoteWorkspace: () => window.location.href.indexOf(':65000') > -1,
    isNodeJSHost: ()  =>
        ( window.location.href.indexOf('localhost:808') > -1
        || window.location.href.indexOf('127.0.0.1:808') > -1
        || window.location.href.indexOf(':8081') > -1 )
        || window.location.href.indexOf(':65000') > -1,
    isNgrok: () => (window.location.href.indexOf('ngrok.io') > -1) 
        || (window.location.href.indexOf('ngrok-free.app') > -1),
    getHostRootPath: () => `${location.protocol}//${location.host}/`,
    isLocationReachable: async () => await getLocationResponse(),
    isHomePage : () => { return window.location.origin + "/" + urls.getPostfix() == window.location.href }
}; export default urls;

export async function getLocationResponse() {
    return $.ajax({
        url: (urls.getLocation() + 'PerformPublicHandShake'),
        type: 'GET',
        contentType:'text/html',
        success: function (response) {
            return true;
        },
        error: function (err) {
            console.log('[ERR] api.js/getLocationResponse: location was not reachable, returning false.')
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
        //if( urls.isGithub() || urls.isNodeJSHost() || urls.isRemoteWorkspace() )
        //    return; // throw new NotImplementedException();

        let loc = `${location.protocol}//${location.host}`;
        let urlPath = getLocationPath(url)
        let newLc = loc + urlPath//[0] == '/' ? urlPath :'/' + urlPath  ;
        if(url.indexOf('http') <= -1) {
            // Whether to ignore the PushHistory state specified
            if( !Object.keys(routes).some( r => url.indexOf(r) > -1) 
                || GetNonRoutePaths().some( r => url.indexOf(r) > -1)
            ) {  
                console.error('[ERR] pushHistoryState return of: ' + newLc)
                return;
            }

            console.log('[INF] api.js/pushHistoryState NLc: ' + newLc)
            console.log('[INF] api.js/pushHistoryState url: ' + url);
            //Debug.WriteLine('api.js/pushHistoryState: prevstate not null');
            window.history.pushState({ prevUrl: window.location.href }, null, newLc);
        }
    } catch(e) {
        console.log(e);
    }
}

function getLocationPath(lc) {
    let result = ""//urls.getContentPath();
    if( !(urls.isGithub() || urls.isNodeJSHost()) )
        lc = lc.replace('Content/', '')
    if(lc.indexOf(urls.getPostfix()) > -1) {
        result += lc;
    } else {
        result += ( urls.getPostfix() + lc );
    }
    return result;
}

export async function redirectIfServerIsReachable(path) // : String
{
    if (await urls.isLocationReachable() ) 
    {
        window.location = urls.getLocation() + path;
        return true;
    } 
    else 
        return false;
}