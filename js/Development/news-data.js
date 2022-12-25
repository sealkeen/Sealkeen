import { openRightNav, openNav, closeRightNav, closeNav } from "../StyleHandlers/side-nav-handlers.js";
import { containsClasses } from "../utilities.js";
import { onClickBodyBackground } from './../StyleHandlers/color-handlers.js'

export function getDevelopmentNewsData()
{
    return [        
        {
            cardTitle: 'Progress freeze: ', date: '26.12.2022', cardText: 
            'The development is being frozen right now (not really much is going on). '+
            "The Next major changes are going to appear in the year of 2023.",
            id: 'december-tw-two--twenty-six--development-frozen'
        },
        {
            cardTitle: 'Current goals: ', date: '20.12.2022', cardText: 
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

export function setDevelopmentMessages()
{
    //$('#september-thirty-fixed-background').addEventListener('click', toggleBodyBackground)
    let data = getDevelopmentNewsData();

    if($("#development-body").length <= 0){
        let devDiv = document.createElement('div'); devDiv.id = 'development-body';
        $("#page-body-container")[0].appendChild(devDiv)
    }
    document.querySelector('#development-body').innerHTML = '';
    data.forEach(element => {
        let card = document.createElement('div');
        let cardBody = document.createElement('div')
        let cardTitle = document.createElement('h3')
        let cardText = document.createElement('div')
        card.className = 'card'
        cardBody.className = 'card-body'
        cardTitle.className = 'card-title'
        cardText.className = 'card-text'
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        cardTitle.innerHTML = element.cardTitle + ' ' + element.date;
        cardText.innerHTML = element.cardText;
        card.id = element.id;

        card.appendChild(cardBody);
        document.querySelector('#development-body').appendChild(card);
    });
    document.querySelectorAll('#september-twenty-eight-sidebars,#september-thirty-sidebars').forEach(card => 
        card.addEventListener('click', (e) => {
            if(document.getElementById("mySidenav").getBoundingClientRect().width === 0)
            { 
                openNav(); openRightNav(); 
            }
            else { 
                closeRightNav(); closeNav(); 
            }
            let menu = document.createElement("div")
            let cmiQueueSelected = document.createElement("p")
            cmiQueueSelected.id = 'ctxmenu-button';
            cmiQueueSelected.innerHTML = "Click left button (mouse) or scroll on tap (phone) to open enqueue menu on composition";
            menu.id = "ctxmenu";

            //menu.onfocusout = () => menu.outerHTML = '';
            //menu.onmouseleave = () => menu.outerHTML = ''
            menu.appendChild(cmiQueueSelected)
            
            console.log(e.target)
            let insertTarget = {};
            if(e.target.classList.contains('card-body'))
                insertTarget = e.target.parentElement;
            if(e.target.classList.contains('card'))
                insertTarget = e.target;
            if(containsClasses(e.target, 'card-text', 'card-title'))
                insertTarget = e.target.parentElement.parentElement;
            insertTarget.appendChild(menu);
        })
    )

    $('#october-first-fixed-navbar')[0].addEventListener('click', (e) => { 
        e.preventDefault();
        document.querySelectorAll(".navbar-collapse")[0].classList.toggle('show') //(".navbar,.navbar-collapse")[0]
    });

    $('#september-thirty-fixed-background')[0].addEventListener('click', (e) => { 
        e.preventDefault();
        onClickBodyBackground()
    });
}