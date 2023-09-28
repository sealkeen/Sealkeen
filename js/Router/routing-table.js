
const routes = {
    404: async () => { },
    "": async () => { },
    "/": async () => { }, // "/pages/index.html"
    "Content/GetHTMLArtistsPage": async () => { }, 
    "Content/GetHTMLAlbumsPage": async () => { },
    "Content/GetHTMLGenresPage": async () => { },
    "Content/GetHTMLCompositionsPage": async () => { },
    "Content/GetHTMLListenedPage": async () => { },
    "Content/GetPartialUploadedCompositionsPage": async () => { },
    "Identity/Account/Login": async () => { }, //window.location.href = urls.getLocation() + "Identity/Account/Login"
    "Identity/Account/Register": async () => { }// window.location.href = urls.getLocation() + "Identity/Account/Register" 
};

const nonRoutePaths = [
    "GetPartialCompositionPageByArtistName"
];

export function GetNonRoutePaths() { return nonRoutePaths }

export default routes;