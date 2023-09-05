import urls, { pushHistoryState, redirectIfServerIsReachable } from './../api.js'
import routes from './routing-table.js';

export const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

export const handleLocation = async () => {
    const path = window.location.pathname;
    console.log("[INF] router location: " + path);
    let key = Object.keys(routes).filter(k => k.startsWith(path))[0]
    console.log("[INF] router starts with: " + key);
    const goToAction = routes[key] || routes[404];
    if(goToAction && goToAction !== "")
    {
        await goToAction();
    }
};

window.onpopstate = handleLocation;
window.route = route;