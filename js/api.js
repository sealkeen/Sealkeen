import routes, { GetNonRoutePaths, getNonRootPaths } from './Router/routing-table.js';
import Exception from './Extensions/cs-exception.js';
import Debug from './Extensions/cs-debug.js';
import { isHostNameValidIP } from './Shared/WindowLocation/AddressParser.js';
import { sleep } from './utilities.js';

const urls = {
    getLocation() {
        if (window.hostLocation != null) {
            return window.hostLocation; // custom location set from command line if needed
        } else if (this.isGithub()) {
            return 'https://a2a9-31-134-149-42.ngrok-free.app/';
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
        return this.isGithub() || this.isNodeJSHost() ? 'Content/' : ''; 
    },
    isAspNetCore: async () => {
        let times = 0;
        while(urls == null && (times++ < 10)) {
            console.warn('[WRN] URLs object was null await for 100 ms!');
            await sleep(100);
        }
        (urls.isNgrok() || urls.isVSDebug() || isHostNameValidIP())
    },
    isGithub: () => (window.location.href.indexOf("github.io") > -1),
    isLocalhost: () => (window.location.href.indexOf('localhost:') > -1),
    isVSDebug: () => (window.location.href.indexOf('localhost:500') > -1),
    isRemoteWorkspace: () => window.location.href.indexOf(':65000') > -1,
    isNodeJSHost: ()  => (  ( window.location.href.indexOf('localhost:808') > -1
        || window.location.href.indexOf('127.0.0.1:808') > -1
        || window.location.href.indexOf(':8081') > -1 )
        || window.location.href.indexOf(':65000') > -1  ),
    isNgrok: () => ((window.location.href.indexOf('.ngrok') > -1) 
        || (window.location.href.indexOf('ngrok-free.app') > -1)),
    getHostRootPath: () => `${location.protocol}//${location.host}/`,
    isLocationReachable: async () => await getLocationResponse(),
    isHomePage : () => { return (window.location.origin + "/" + urls.getPostfix()) == window.location.href },
    isOrigin : () => { return isCurrentHostIp() || isNgrok() || isVSDebug(); }
}; export default urls;

const PREFIX_LENGTH = 8, SLASH_LENGTH = 1; 
export function dropPrefix(url)
{
    let indexOfPrefix = url.indexOf('/Sealkeen');
    if ( indexOfPrefix > -1 )
        return url.substring(PREFIX_LENGTH + SLASH_LENGTH);
    if ( url.indexOf('Sealkeen/') === 0 )
        return url.substring(PREFIX_LENGTH);
    return url;
}
export function addPrefixIfNeeded(url)
{
    if(url.indexOf('/Sealkeen'))
        return url.substring(PREFIX_LENGTH + SLASH_LENGTH)
    if(url.indexOf('Sealkeen/') === 0 )
        return url.substring(PREFIX_LENGTH)
}

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


export async function pushHistoryState(url)
{
    try {
        if (window.location.search) {
            console.log('[ING] Skip history push: Search Exists.') 
            return;
        }
        
        let loc = `${location.protocol}//${location.host}`;
        let newLc = ""
        if(url.indexOf('http') <= -1) {
            let urlPath = getStructedPath(loc, url)
            newLc = loc + urlPath;
            // Whether the ignorance of Push History state specified
            if( !Object.keys(routes).some( r => url.indexOf(r) > -1) 
                || GetNonRoutePaths().some( r => url.indexOf(r) > -1)
            ) {  
                console.warn('[WRN] Skip states for: <' + newLc + '>, <' + url + '>')
                return;
            }
            console.log('[INF] api.js/push... NLc: ' + newLc);
            console.log('[INF] api.js/push... url: ' + url);
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
    let isAnyPathSpecified = getNonRootPaths().some( r => url.indexOf(r) > -1) && !(GetNonRoutePaths().some( r => url.indexOf(r) > -1))
    Debug.WriteLine(`api.js/anyPathSpecified(), Url: <${url}>`)
    return isAnyPathSpecified;
}

export function getStructedPath(loc, lc) {
    let result = "";
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

function isCurrentHostIp() { 
    const containsLetter = /[a-zA-z]/.test(location.hostname)
    const isIPv6 = 
        location.hostname.startsWith('[') && 
        location.hostname.endsWith(']')
   return !containsLetter || isIPv6
}