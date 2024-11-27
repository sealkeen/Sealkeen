
const routes = {
    404: async () => { },
    "": async () => { },
    "/": async () => { }, // "/pages/index.html"
    "/about": async () => { console.error('!/about!') }, 
    "/Content/GetHTMLArtistsPage": async () => { console.error('!/Content/GetHTMLArtistsPage!') }, 
    "/Content/GetHTMLAlbumsPage": async () => { console.error("!/Content/GetHTMLAlbumsPage!") },
    "/Content/GetHTMLGenresPage": async () => { console.error("!/Content/GetHTMLGenresPage!") },
    "/Content/GetHTMLCompositionsPage": async () => { console.error("!/Content/GetHTMLCompositionsPage!") },
    "/Content/GetHTMLListenedPage": async () => { console.error("!/Content/GetHTMLListenedPage!") },
    "/Content/GetHTMLUploadedCompositionsPage": async () => { console.error("!/Content/GetHTMLUploadedCompositionsPage!") },
    "Identity/Account/Login": async () => { console.error("!Identity/Account/Login!") }, 
    "Identity/Account/Logout": async () => { console.error("!Identity/Account/Logout!") }, 
    "Identity/Account/Register": async () => { console.error("!Identity/Account/Register!") }
};

const nonRoutePaths = [
    "GetPartialCompositionPageByArtistName"
];

const noActionPaths = [
    '/about'
];

export function isNoActionPath(path) { return noActionPaths.indexOf(path) > -1; }
export function getNonRootPaths() { return Object.keys(routes).filter((p) => p !== '' && p != '/'); }
export function GetNonRoutePaths() { return nonRoutePaths }

export default routes;