import urls, { pushHistoryState, redirectIfServerIsReachable } from './../api.js'
import { setCurrentPageAlbums, setCurrentPageArtists, setCurrentPageCompositions, setCurrentPageGenres, setCurrentPageIndex, setCurrentPageLogin, setCurrentPageRegister } from './click-handlers.js';

export const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: async () => { },
    "/": async () => { setCurrentPageIndex() }, // "/pages/index.html"
    "/Content/GetHtmlCompositionPage": setCurrentPageCompositions,
    "/Content/GetHTMLArtistsPage": setCurrentPageArtists, 
    "/Content/GetHTMLGenresPage": setCurrentPageGenres,
    "/Content/GetHTMLAlbumsPage": setCurrentPageAlbums,
    "Identity/Account/Login": setCurrentPageLogin, //window.location.href = urls.getLocation() + "Identity/Account/Login"
    "Identity/Account/Register": setCurrentPageRegister// window.location.href = urls.getLocation() + "Identity/Account/Register" 
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