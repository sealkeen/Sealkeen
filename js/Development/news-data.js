
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
}