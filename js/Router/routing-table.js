
const routes = {
    404: async () => { },
    "": async () => { },
    "/": async () => { }, // "/pages/index.html"
    "/Content/GetHTMLArtistsPage": async () => { console.log('/Content/GetHTMLArtistsPage') }, 
    "/Content/GetHTMLAlbumsPage": async () => { console.log("/Content/GetHTMLAlbumsPage") },
    "/Content/GetHTMLGenresPage": async () => { console.log("/Content/GetHTMLGenresPage") },
    "/Content/GetHTMLCompositionsPage": async () => { console.log("/Content/GetHTMLCompositionsPage") },
    "/Content/GetHTMLListenedPage": async () => { console.log("/Content/GetHTMLListenedPage") },
    "/Content/GetHTMLUploadedCompositionsPage": async () => { console.log("/Content/GetHTMLUploadedCompositionsPage") },
    "Identity/Account/Login": async () => { console.log("Identity/Account/Login") }, 
    "Identity/Account/Register": async () => { console.log("Identity/Account/Register") }
};

const nonRoutePaths = [
    "GetPartialCompositionPageByArtistName"
];

export function GetNonRoutePaths() { return nonRoutePaths }

export default routes;