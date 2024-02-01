import urls, { pushHistoryState, redirectIfServerIsReachable, dropPrefix } from './../api.js'
import routes from './routing-table.js';

export const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

export const handleLocation = async () => {
    if(urls.isNgrok() || urls.isVSDebug()) // No location handling for razor pages
        return;

    const path = window.location.pathname;
    let rPath = path.replace('/GetPartial', '/GetHTML')//.replace('/Content', 'Content');
    console.log("[INF] router location: " + rPath);
    let dpRPath = dropPrefix(dpRPath)
    console.log("[INF] unprefixed: " + dpRPath);
    let key = Object.keys(routes).filter(k => k.startsWith(dpRPath))[0]
    //let key = Object.keys(routes).filter(k => k.startsWith(rPath))[0]
    console.log("[INF] router starts with: " + key);
    const goToAction = routes[key] || routes[404];
    if(goToAction && goToAction !== "")
    {
        await goToAction();
    }
};

window.onpopstate = handleLocation;
window.route = route;