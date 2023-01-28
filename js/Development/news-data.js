import { openRightNav, openNav, closeRightNav, closeNav } from "../StyleHandlers/side-nav-handlers.js";
import { containsClasses } from "../utilities.js";
import { onClickBodyBackground } from './../StyleHandlers/color-handlers.js'

export function getDevelopmentNewsData()
{
    return [   
        {
            cardTitle: '"Reverse" checkbox, ', date: '15.01.2023', cardText: 
            'Added <reverse> (order) checkbox on compositions page (Home) by default If the server status is green ✅ (running) - (not red ⛔).',
            id: 'january-tw-three--fifteen--checkbox'
        },     
        {
            cardTitle: 'Current goals, ', date: '08.01.2023', cardText: 
            '1) Create customizable "Artist" pages with both albums and compositions. '
            + "<br>" + 
            "2) Let users manage Genres and Albums and suggest changes (feedback).",
            id: 'january-tw-three--eighty--current-goals'
        },     
        {
            cardTitle: 'Progress freeze, ', date: '26.12.2022', cardText: 
            'The development is being frozen right now (not really much is going on). '+
            "The Next major changes are going to appear in the year of 2023. Some API changes are pending.",
            id: 'december-tw-two--twenty-six--development-frozen'
        },
        {
            cardTitle: 'Current goals, ', date: '20.12.2022', cardText: 
            'The Back-End side: 1) Create "a href"able (clickable) Artist name in query and footer for playing audio.'
            + ' Update the JS bundle files (newest version). Create the build-deploy Service on server to quickly rebuild and redeploy if needed.' + "<br>" + 
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
export function setDevelopmentMessages() {
    console.log('set dev messages');

    let data = getDevelopmentNewsData();

    if (!document.getElementById("development-body")) {
        let devDiv = document.createElement('div');
        devDiv.id = 'development-body';
        document.getElementById("page-body-container").appendChild(devDiv);
    }

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

        document.getElementById('development-body').appendChild(card);
    });

    document.querySelectorAll('#september-twenty-eight-sidebars,#september-thirty-sidebars').forEach(card => {
        card.addEventListener('click', (e) => {
            if (document.getElementById("mySidenav").getBoundingClientRect().width === 0) {
                openNav();
                openRightNav();
            } else {
                closeRightNav();
                closeNav();
            }

            let menu = document.createElement("div");
            menu.id = "ctxmenu";

            let cmiQueueSelected = document.createElement("p");
            cmiQueueSelected.id = 'ctxmenu-button';
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
}