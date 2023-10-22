import { createInfoMessage } from './Errors/fetch-errors.js';
import routes, { GetNonRoutePaths, getNonRootPaths } from './Router/routing-table.js';
import Exception from './Extensions/cs-exception.js';
import Debug from './Extensions/cs-debug.js';

const urls = {
    getLocation() {
        if(this.isGithub()) {
            return 'https://23c8-95-24-224-81.ngrok-free.app/';
        } else if ( this.isRemoteWorkspace() ) {
            return 'https://localhost:443/';
        } else if ( !this.isNodeJSHost() || this.isNgrok() ) {
            return `${location.protocol}//${location.host}/`;
        } else
            return 'https://localhost:5001/';
    },
    getPostfix(forwardPath) {
        let result = "";
        if (window.location.href.indexOf("github.io/Sealkeen") > -1)
            if (forwardPath != null && (forwardPath[0] === '/' || forwardPath[0] === '\\')) {
                result += '/Sealkeen'; }
            else
                result += 'Sealkeen/';
        console.log(`[INF] getPostfix <${result}> forward path: <${forwardPath ?? ""}>`)
        return result;
    },
    getContentPath() {
        return this.isGithub || this.isNodeJSHost ? 'Content/' : ''; 
    },
    isGithub: () => (window.location.href.indexOf("github.io") > -1),
    isLocalhost: () => (window.location.href.indexOf('localhost:') > -1),
    isVSDebug: () => (window.location.href.indexOf('localhost:500') > -1),
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
        if(urls.isNgrok() || urls.isVSDebug()) {
            console.log('[INF] Skip state management for Asp.Net Core hosts.'); return;
        }

        let loc = `${location.protocol}//${location.host}`;
        let newLc = ""
        if(url.indexOf('http') <= -1) {
            let urlPath = getStructedPath(loc, url)
            newLc = loc + urlPath;
            // Whether to ignore the PushHistory state specified
            if( !Object.keys(routes).some( r => url.indexOf(r) > -1) 
                || GetNonRoutePaths().some( r => url.indexOf(r) > -1)
            ) {  
                createInfoMessage('[INF] Skip states for: <' + newLc + '>, <' + url + '>')
                return;
            }
            console.log('[INF] api.js/push... NLc: ' + newLc);
            console.log('[INF] api.js/push... url: ' + url);
            //Debug.WriteLine('api.js/pushHistoryState: prevstate not null');
            window.history.pushState({ prevUrl: window.location.href }, null, newLc);
        } else {
            if (url.startsWith(urls.getLocation())) {
                newLc = url.replace(urls.getLocation(), loc + '/') .replace('GetPartial', 'GetHTML');
                if( anyPathSpecified(newLc) ) {
                    window.history.pushState({ prevUrl: window.location.href }, null, newLc);
                    console.log( '[INF] api.js/push... : Pushed + NLc: ' + newLc);
                } else {
                    console.log( '[INF] api.js/push... : No push - state for NLc: ' + newLc);
                }
            }
            console.log('[INF] api.js//push... : No push state for url: ' + url);
        }
    } catch(e) {
        Exception.Throw(e);
    }
}

export function anyPathSpecified(url)
{
    Debug.WriteLine(`api.js/anyPathSpecified(), Url: <${url}>`)
    return getNonRootPaths().some( r => url.indexOf(r) > -1) && !(GetNonRoutePaths().some( r => url.indexOf(r) > -1));
}

export function getStructedPath(loc, lc) {
    let result = ""//urls.getContentPath();
    if( !(urls.isGithub() || urls.isNodeJSHost() || urls.isRemoteWorkspace()) )
        lc = lc.replace('Content/', '')
    if(lc.indexOf( urls.getPostfix() ) > -1) {
        result += lc;
    } else {
        result += ( urls.getPostfix(lc) + lc );
    }
    let lLocSmb = loc[loc.length - 1] || null;
    let fPathSmb = result[0] || null;
    // Add Forward slash if none
    if(fPathSmb !== '/' && fPathSmb !== '\\' && lLocSmb !== '/' && lLocSmb !== '\\') {
        result = '/' + result
        Debug.WriteLine(`[INF] api.js/getStructedPath(): Add slash from ${loc} to ${lc}`);
    } else {
        Debug.WriteLine(`[INF] api.js/getStructedPath(): No slash needed for ${loc} to ${lc}`);
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