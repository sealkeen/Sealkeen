import { openRightNav, openNav, closeRightNav, closeNav } from "../StyleHandlers/side-nav-handlers.js";
import { containsClasses } from "../utilities.js";
import { onClickBodyBackground } from './../StyleHandlers/color-handlers.js'

export function getDevelopmentNewsData()
{
    return [
        {
            cardTitle: 'Fixed navigation bar', date: '01.10.2022', cardText: 
            'Top navigation bar has fixed position now.',
            id: 'october-first-fixed-navbar'
        },
        {
            cardTitle: 'Fixed background and transitions', date: '30.09.2022', cardText: 
            'Added gradient background and image made fixed (no background scroll). Some CSS styling in progress...',
            id: 'september-thirty-fixed-background'
        },
        {
            cardTitle: 'Side navigation', date: '29.09.2022', cardText: 
            'In the new release the navigation bars are expanding into the screen size / 2. some style improvements in progress...',
            id: 'september-thirty-sidebars'
        },
        { 
            cardTitle: 'New version release', date: '28.09.2022', cardText: 
            'Last application version improved performance. ' +
            'Added JSON data to MVC controllers, new Albums, Composition, Artists and Genres ' +
            'are fetched from JSON objects (earlier it was HTML text data from View controllers). ' +
            '\r\nAdded two side-bars, use mouse wheel to change the volume level within input ranges. ' + 
            'Tap and scroll a composition on your mobile device to get context menu opened (queueying).',
            id: 'september-twenty-eight-sidebars'
        },
        {
            cardTitle: 'Volume controls, animation effects', date: '26.09.2022', cardText: 
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

    document.querySelector('#development-body').innerHTML = '';
    data.forEach(element => {
        let card = document.createElement('div');
        let cardBody = document.createElement('div')
        let cardTitle = document.createElement('h3')
        let cardText = document.createElement('div')
        card.className = 'card'
        cardBody.className = 'card-body'
        cardTitle.className = 'card-title stroke-shadow-h3'
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