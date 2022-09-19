import { setTitleByArtistAndTitle } from './../Page/event-handlers.js'

export function takeStore() {
    return [
        { a: "Counting Crows",	n: "Accidentally in Love",	i: "7018E556-592C-4840-B79D-A6C299781E20",	p: "http://docs.google.com/uc?export=open&id=1ZOkHSS09VBTdC7hjc1zFcsrwY7Xvn6t3"} ,
        { a: "I-Exist",	n: "Unity",	i: "B521061E-CA36-4F22-BFAE-EEE47C2F309F",	p: "http://docs.google.com/uc?export=open&id=1zH8dfcOb8koqgWL-5F_W-g-Em6exY0p5"} ,
        { a: "Dead by April",	n: "Anything at All",	i: "8AC1D325-2B00-42C3-945D-1E4C5E214A9C",	p: "http://docs.google.com/uc?export=open&id=1hrvqGeLzmAIe_rMggZNRgUnWDitF6NBl"} ,
        { a: "The Birthday Massacre",	n: "Always",	i: "C06ECBB5-C206-40EC-96F1-188DE30D061A",	p: "http://docs.google.com/uc?export=open&id=1dv2G3kvC9fZPizC5UeihWVLffyAndkwW"} ,
        { a: "The Birthday Massacre",	n: "Sideways",	i: "FEFC590F-2565-4821-BAC8-58D28371B88D",	p: "http://docs.google.com/uc?export=open&id=1dwj8FJMn_Zxs3C4_hjYvbVQ_2AHVRQhM"} ,
        { a: "Eisbrecher",	n: "Out of the Dark",	i: "F12E990B-94F8-4DE9-ADF8-D6C2C1EA8770",	p: "http://docs.google.com/uc?export=open&id=1KhZT8FxiPHL3u6yxXs_ZQjevYFZntGlA"} ,
        { a: "In Flames",	n: "Drenched In Fear",	i: "4D469BA2-3332-418E-BC29-9ABF87FB6BAD",	p: "http://docs.google.com/uc?export=open&id=18LbL3IwyL3mZMu1r8qhJ0PZ530O2FUPN"} ,
        { a: "In Flames",	n: "The Chosen Pessimist",	i: "03431EB7-DBA9-4617-9FAB-FE737A7C77DD",	p: "http://docs.google.com/uc?export=open&id=1SK-LtQfU9NiEZvGBKPhMSuSrveK9j078"} ,
        { a: "Dreamshade",	n: "Your Voice",	i: "4C8006B8-5C54-4485-A507-1682298EE20F",	p: "http://docs.google.com/uc?export=open&id=1sgD8z_4GOllFOlfS8d2-tnOVgS-OQYRH"} ,
        { a: "Dreamshade",	n: "Photographs",	i: "97778321-2121-4921-B0C1-81B2318D35C2",	p: "http://docs.google.com/uc?export=open&id=1UgA7A7lUf1YQSadQdhMQ1DUWj778DEYi"} ,
        { a: "Dreamshade",	n: "The Gift Of Life",	i: "CC14AA2C-77ED-4C8A-A4C8-8EB55CE32A72",	p: "http://docs.google.com/uc?export=open&id=1SOqZUbn8NRSakWOXcwP4QCo9CZvE_Gec"} ,
        { a: "Dreamshade",	n: "Wants & Needs",	i: "D2416955-CF39-45BE-AC61-91C6D4C8B628",	p: "http://docs.google.com/uc?export=open&id=1Wmvhusytec3kujiK0Yw9nrxXxivGjrXR"} ,
        { a: "Deathstars",	n: "Termination Bliss",	i: "6266609A-C671-4429-80D4-147437B183A1",	p: "http://docs.google.com/uc?export=open&id=1SMoo65CN34OuZ5K3dIonXYEscftWyks4"} ,
        { a: "MISSIO",	n: "I See You",	i: "765C2931-7293-4FD0-A4C1-B7B96121E4E8",	p: "http://docs.google.com/uc?export=open&id=13Q6I59nMapZU7Js6t1F7KtSFbjUHohXG"} ,
        { a: "Halsey",	n: "Devil In Me",	i: "A40C276E-9975-4C7A-9E94-85D5FF0982FE",	p: "http://docs.google.com/uc?export=open&id=1SLlxDd7gsM7vytB06qpO4tiZjW4kgU5M"} ,
        { a: "Insomnium",	n: "While We Sleep",	i: "C0E2A5B8-1857-4EDD-8DDC-9A56A66DA0B1",	p: "http://docs.google.com/uc?export=open&id=1m3wAYc9L8F1vDgDCWowj9j2CCpR7d6iQ"} ,
        { a: "Paul Romero & Rob King",	n: "Combat 04",	i: "605AAF91-83BC-44B6-A507-C92350D2DAD7",	p: "http://docs.google.com/uc?export=open&id=1wAekXF8h_N-dEcYsIGZ5Ty-bKh34rzto"} ,
        { a: "Cradle Of Filth",	n: "Stay",	i: "4C34D699-F323-4365-A837-506EC04BB4AD",	p: "http://docs.google.com/uc?export=open&id=18hWdyPiw1tzN9r0ieLd-Z85ZJepwYqYC"} ,
        { a: "Алиса",	n: "Шейк",	i: "70A53FF5-C2F6-4E65-93C4-47059C10A8D2",	p: "http://docs.google.com/uc?export=open&id=102bkM7bK6xz1IDlCvf7OnGdTV0LcF8_S"} ,
        { a: "Dangerkids",	n: "Light Escapes",	i: "FEDD4C67-0121-4AA3-95A8-BCF1589BA7BB",	p: "http://docs.google.com/uc?export=open&id=1wh5kb0C9yEWWjzfAg1Dqqz9mNHZB1fob"}
    ];
}

export function ConvertToDOM()
{
    

    let center = document.createElement('center');
    let cardcolumns = document.createElement("div")
    cardcolumns.className = 'card-columns';

    let textcenter = document.createElement('div');
    let display4 = document.createElement('h3');
    textcenter.className = 'text-center';
    display4.className = 'display-4 stroke-shadow';
    display4.innerHTML = 'Server unavailable. Loaded mock data (playable).';
    textcenter.appendChild(display4);
    center.appendChild(textcenter);

    takeStore().forEach(element => {
        let card = document.createElement("div")
        let comp = document.createElement("div")
        let data = document.createElement("data")
        let h6 = document.createElement("h6")
        let h7 = document.createElement("h7")
        
        card.className = 'card';
        comp.className = 'card-body card-body-composition';
        data.setAttribute("value", element.p);
        h6.innerHTML = element.a;
        h7.innerHTML = element.n;
        h6.className='card-title';
        h7.className='card-text';
        
        comp.appendChild(data);
        comp.appendChild(h6);
        comp.appendChild(h7);
        card.appendChild(comp);
        cardcolumns.appendChild(card);
    });

    center.appendChild(cardcolumns);
    return center;
}

export function onMockDataLoaded()
{
    const container = document.querySelector('#card-columns');

    container.addEventListener('click', function (e) {
        e.preventDefault();
        let target = e.target;
        if (containsClasses(target, 'card-text', 'card-title')) {
            target = e.target.parentNode;
        }
        if (target.classList.contains('card-body-composition')) {
            setMockFooterSourse(e.target)
        }
    });
}


export function setMockFooterSourse(el)
{
    try {
        let source = el;
        let songInfo = el;
        if (!event.target.classList.contains('card-body')) { songInfo = el.parentNode; }
        source = songInfo.querySelector('data').value; //data
        setTitleByArtistAndTitle(el);

        let ctrl = (loc + 'GetHtmlStreamPlayer/?url=' + source);
        if ($("#player-source-element") != undefined) {
            $("#player-source-element").attr('src', source);
            $("#player-source-element").load();
            $("#player-source-element").play();
        }
    } catch (e) {
        alert(e)
    }
}