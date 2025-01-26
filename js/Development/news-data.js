import { openRightNav, openNav, closeRightNav, closeNav } from "../Page/Components/navigations/side-nav-handlers.js";
import { onClickBodyBackground } from './../StyleHandlers/color-handlers.js'
import Debug from "../Extensions/cs-debug.js";
import urls from "../api.js";
import { serviceProvider } from "../Services/di-container.js";
import { createInfoMessage } from "../Errors/fetch-errors.js";

serviceProvider.register('newsData', function() { return setDevelopmentMessages }, []);

export function getDevelopmentNewsData() {
return [
{
    cardTitle: 'Tempo tapper', date: 'January 2025', cardText: 
    '<img src="../Images/Popups/tempo-tapper.png">'+
    "<br> A tempo tapper have been added use \"Pause / Break\" key to tap the beats (manual BPM recognition).",
    id: 'january-tw-five--tempo-tapper'
},
{
    cardTitle: '<a href="/about" id="november-tw-four--about-modernized__label">About</a> page modernized, ', date: 'November 2024', cardText: 
    'The /about page now contains some persistent information about the website\'s author, it is being filled with content and styles. Some are in progress, watch out for new features.',
    id: 'november-tw-four--about-modernized'
},
{
    cardTitle: 'Connection issues, ', date: 'February 2024', cardText: 
    'Host address could be temporarily freezed (no connection available). Contact me to receive persistent access to the music.',
    id: 'february-first--dns-resolution'
},
{
    cardTitle: 'Artist and TrackId links, ', date: 'September 2023', cardText: 
    'Added artist + trackid links: ' +
    "<br>" + `<a href="${getRealOrigin()}?trackId=46c34498-7f18-42c3-9116-a1a49fde3f2a&artist=The+Birthday+Massacre">${getRealOrigin()}?trackId=46c34498-7f18-42c3-9116-a1a49fde3f2a&artist=The+Birthday+Massacre</a>,` +
    "<br>" + `<a href="${getRealOrigin()}?artist=неж&trackId=f5b0f5ab-2fc4-41ed-b565-d5cdffc2a102">${getRealOrigin()}?artist=неж&trackId=f5b0f5ab-2fc4-41ed-b565-d5cdffc2a102</a>`,
    id: 'september-tw-three--artist-trackid'
},
{
    cardTitle: 'Language switcher, ', date: 'the 7th of May 2023', cardText: 
    'Added language localizations to several menus.',
    id: 'may-seven-tw-three--localization-services'
},
{
    cardTitle: 'New appearances, ', date: '01.05.2023', cardText: 
    'New artists, albums, tracks, genres card colors added. ',
    id: 'may-first-tw-three--card-colors'
},
{
    cardTitle: 'Clickable artist names, ', date: '26.02.2023', cardText: 
    '1) Artist links are now clickable when playing audio (with running server) ' +
    "<br>" + `<a href="${getRealOrigin()}?artist=Demotional">${getRealOrigin()}?artist=Demotional</a>` +
    '<img src="../Images/Development/clickable-artist-links.png">' + 
    "<br>" + `<a href="${getRealOrigin()}?artist=In+Flames">${getRealOrigin()}?artist=In+Flames</a>` +
    '<img src="../Images/Development/clickable-artist-links-in-flames.png">'+
    "<br>" + `<a href="${getRealOrigin()}?artist=Dead by April">Dead by April</a>`,
    id: 'february-tw-three--clickable-artists'
}, 
{
    cardTitle: 'Search query added, ', date: '25.02.2023', cardText: 
    '1) Added search query in browser url' +
    "<br>" + `<a href="${getRealOrigin()}?artist=Cold%20Insight">Cold Insight</a>`+
    "<br>" + `<a href="${getRealOrigin()}?artist=Rammstein">Rammstein</a>`+
    "<br>" + `<a href="${getRealOrigin()}?artist=Parkway%20Drive">Parkway Drive</a>`+
    "<br>" + `<a href="${getRealOrigin()}?artist=Essenger">Essenger</a>` + 
    "<br>" + 
    "2) Added press 'space' => pause action.",
    id: 'february-tw-five--search--query'
},   
{
    cardTitle: '"Reverse" checkbox, ', date: '15.01.2023', cardText: 
    'Added <reverse> (order) checkbox on compositions page (Home) by default If the server status is green ✅ (running) - (not red ⛔).',
    id: 'january-tw-three--fifteen--checkbox'
},     
// {
//     cardTitle: 'Current goals, ', date: '08.01.2023', cardText: 
//     '1) Create customizable "Artist" pages with both albums and compositions. '
//     + "<br>" + 
//     "2) Let users manage Genres and Albums and suggest changes (feedback).",
//     id: 'january-tw-three--eighty--current-goals'
// },     
// {
//     cardTitle: 'Progress freeze, ', date: '26.12.2022', cardText: 
//     'The development is being frozen right now (not really much is going on). '+
//     "The Next major changes are going to appear in the year of 2023. Some API changes are pending.",
//     id: 'december-tw-two--twenty-six--development-frozen'
// },
{
    cardTitle: 'Current goals, ', date: '20.12.2022', cardText: 
    'The Back-End side: 1) Create "a href"able (clickable) Artist name in query and footer for playing audio. '
    + 'Create the build-deploy Service on server to quickly redeploy if needed.' + "<br>" + 
    "The Client-Side: 1) improve css and styles, add more transparancy.",
    id: 'december-tw-two--twenty--current-goals'
},
{
    cardTitle: 'Music styles (pending), ', date: '15.11.2022', cardText: 
    'Getting ready to create new tab Styles to embrace a wide range or genres.',
    id: 'november-tw-two--seventeen--styles-pending'
},
{
    cardTitle: 'Hardware, ', date: '15.11.2022', cardText: 
    'Slightly improved hosting hardware (major performance boost).',
    id: 'november-tw-two-fifteen--hardware-improvement'
},
{
    cardTitle: 'User library tab, ', date: 'nov. 2022', cardText: 
    'User library tab is now available (after register) via proxy for signed in users. Count of plays is npw recorded for logged in accounts.',
    id: 'november-tw-two--user-library-and-count-of-plays'
},
{
    cardTitle: 'Web mp3 uploads, ', date: 'oct. 2022', cardText: 
    'Music uploads are now available for signed in users (after register).',
    id: 'october-tw-two--uploads-are-now-available'
},
{
    cardTitle: 'Performance,  ', date: '02.10.2022', cardText: 
    'Dramatically increased performance by caching the database in RAM (9151–13,234 times) and making data repository class singleton. Fixed absent artist names on Albums page.',
    id: 'october-second-performance-boost'
},
{
    cardTitle: 'Fixed navigation bar, ', date: '01.10.2022', cardText: 
    'Top navigation bar has fixed position now.',
    id: 'october-first-fixed-navbar'
},
{
    cardTitle: 'Fixed background and transitions, ', date: '30.09.2022', cardText: 
    'Added gradient background and image made fixed (no background scroll). Some CSS styling in progress...',
    id: 'september-thirty-fixed-background'
},
{
    cardTitle: 'Side navigation, ', date: '29.09.2022', cardText: 
    'In the new release the navigation bars are expanding into the screen size / 2. some style improvements in progress...',
    id: 'september-thirty-sidebars'
},
{ 
    cardTitle: 'New version release, ', date: '28.09.2022', cardText: 
    'Last application version improved performance. ' +
    'Added JSON data to MVC controllers, new Albums, Composition, Artists and Genres ' +
    'are fetched from JSON objects (earlier it was HTML text data from View controllers). ' +
    '\r\nAdded two side-bars, use mouse wheel to change the volume level within input ranges. ' + 
    'Tap and scroll a composition on your mobile device to get context menu opened (queueying).',
    id: 'september-twenty-eight-sidebars'
},
{
    cardTitle: 'Volume controls, animation effects, ', date: '26.09.2022', cardText: 
    'On september 26 there were added two volume control handlers ' +
    '(use mouse wheel to adjust volume level), both work simultaneously, ' +
    'added transition effects and animations.',
    id: 'september-volume-effects-animations'
}
];
}

var postFixCache = "";
window.onload = function() {
    postFixCache = urls.getPostfix("/")
};

export function getRealOrigin() {
    return window.location.origin + postFixCache;
}

export function setDevelopmentMessages() {
    if (window.location.href.indexOf("MJpeg") > -1)
        return;

    Debug.WriteLine('verification.js/setDevelopmentMessages:... set dev messages');
    let data = getDevelopmentNewsData();
    let devBody = document.getElementById("development-body");
    if (!devBody) {
        let devDiv = document.createElement('div');
        devDiv.id = 'development-body';
        devDiv.className = "news-columns";
        document.getElementById("page-body-container").appendChild(devDiv);
    } else { devBody.className = "news-columns"; }

    document.getElementById('development-body').innerHTML = '';
    data.forEach(element => {
        let card = document.createElement('div');
        card.className = 'card';
        card.id = element.id;

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        card.appendChild(cardBody);

        let cardTitle = document.createElement('h4');
        cardTitle.className = 'card-title';
        cardTitle.innerHTML = element.cardTitle + ' ' + element.date;
        cardBody.appendChild(cardTitle);

        let cardText = document.createElement('div');
        cardText.className = 'card-text';
        cardText.innerHTML = element.cardText;
        cardBody.appendChild(cardText);
        if (document.getElementById('development-body') == null)
            return
        document.getElementById('development-body').appendChild(card);
    });

    document.querySelectorAll('#september-twenty-eight-sidebars,#september-thirty-sidebars').forEach(card => {
        card.addEventListener('click', (e) => {
            if (document.getElementById("left-side-nav") == null)
                return;
            if (document.getElementById("left-side-nav").getBoundingClientRect().width === 0) {
                openNav();
                openRightNav();
            } else {
                closeRightNav();
                closeNav();
            }

            let menu = document.createElement("div");
            menu.id = "ctxmenu";

            let cmiQueueSelected = document.createElement("p");
            cmiQueueSelected.className = 'ctxmenu__button';
            cmiQueueSelected.innerHTML = "Click left button (mouse) or scroll on tap (phone) to open enqueue menu on composition";
            menu.appendChild(cmiQueueSelected);

            let insertTarget = e.target.closest('.card');
            insertTarget.appendChild(menu);
        });
    });

    document.getElementById('october-first-fixed-navbar').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(".navbar-collapse").classList.toggle('show');
    });

    document.getElementById('september-thirty-fixed-background').addEventListener('click', (e) => {
        e.preventDefault();
        onClickBodyBackground();
    });

    document.getElementById('november-tw-four--about-modernized__label').addEventListener('click', (e) => {
        let router = serviceProvider.resolve('nativeRouter');
        let routeActions = router.routes;
        if (routeActions) {
            e.preventDefault();
            routeActions['/about']();
        }
    });

    document.getElementById('january-tw-five--tempo-tapper').addEventListener('click', (e) => {
        let tapper = serviceProvider.resolve('tempoTapper');
        tapper.handleTap();
    });
}