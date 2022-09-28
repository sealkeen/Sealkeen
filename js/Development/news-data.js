import { openRightNav, openNav, closeRightNav, closeNav } from "../StyleHandlers/side-nav-handlers.js";
import { containsClasses } from "../utilities.js";

export function getDevelopmentNewsData()
{
    return [
        { 
            cardTitle: 'New version release', date: '28.09.2022', cardText: 
            'Last application version improved performance. ' +
            'Added JSON data to MVC controllers, new ALbums, Composition, Artists and Genres ' +
            'are fetched from JSON objects (earlier it was HTML text data from View controllers). ' +
            '\r\nAdded two side-bars, use mouse wheel to change the volume level within input ranges. ' + 
            'Tap and scroll a composition on your mobile device to get context menu opened (queueying).'
        }
    ];
}

export function setDevelopmentMessages()
{
    let data = getDevelopmentNewsData();

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

        card.appendChild(cardBody);
        document.querySelector('#development-body').appendChild(card);
    });

    document.querySelector('#development-body').addEventListener('click', (e) => {
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
}