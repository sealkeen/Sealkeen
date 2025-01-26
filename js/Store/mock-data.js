import Exception from '../Extensions/cs-exception.js';
import { setTitleByArtistAndTitle } from './../Page/event-handlers.js';
import { serviceProvider } from './../Services/di-container.js';

export function CreateDOMFromJSON(jsonSource) {
    let center = document.createElement('center');
    let cardcolumns = document.createElement("div")
    cardcolumns.className = 'card-columns';

    let textcenter = document.createElement('div');
    let display4 = document.createElement('h3');
    textcenter.className = 'text-center';
    display4.className = 'display-4 stroke-shadow';
    display4.innerHTML = ('Count of compositions: ' + jsonSource?.length);
    textcenter.appendChild(display4);
    center.appendChild(textcenter);

    jsonSource.forEach(element => {
        let card = document.createElement("div")
        let comp = document.createElement("div")
        let data = document.createElement("data")
        let h6 = document.createElement("h6")
        let h7 = document.createElement("h7")

        card.className = 'card';
        comp.className = 'card-body card-body-composition';
        data.setAttribute("value", element.id);
        h6.innerHTML = element.artist;
        h7.innerHTML = element.title;
        h6.className = 'card-title';
        h7.className = 'card-text';

        comp.appendChild(data);
        comp.appendChild(h6);
        comp.appendChild(h7);
        card.appendChild(comp);
        cardcolumns.appendChild(card);
    });

    center.appendChild(cardcolumns);
    return center;
}

export function CreateArtistsDOMFromJSON(jsonSource) {
    let center = document.createElement('center');
    let cardcolumns = document.createElement("div");
    cardcolumns.className = 'card-columns';

    let textcenter = document.createElement('div');
    let display4 = document.createElement('h3');
    textcenter.className = 'text-center';
    display4.className = 'display-4 stroke-shadow';
    display4.innerHTML = ('Count of Artists: ' + jsonSource?.length);
    textcenter.appendChild(display4);
    center.appendChild(textcenter);

    jsonSource.forEach(element => {
        let card = document.createElement("div")
        let art = document.createElement("div")
        let data = document.createElement("data")
        let h6 = document.createElement("h6")

        card.className = 'card';
        art.className = 'card-body artist-card-div';
        data.setAttribute("value", element.id);
        h6.innerHTML = element.name;
        h6.className = 'card-title';

        art.appendChild(data);
        art.appendChild(h6);
        card.appendChild(art);
        cardcolumns.appendChild(card);
    });

    center.appendChild(cardcolumns);
    return center;
}

export function createCardFromJSON(element)
{
    let card = document.createElement("div")
    let comp = document.createElement("div")
    let data = document.createElement("data")
    let h6 = document.createElement("h6")
    let h7 = document.createElement("h7")

    card.className = 'card';
    comp.className = 'card-body card-body-composition';
    data.setAttribute("value", element.id);
    h6.innerHTML = element.artist;
    h7.innerHTML = element.title;
    h6.className = 'card-title';
    h7.className = 'card-text';

    comp.appendChild(data);
    comp.appendChild(h6);
    comp.appendChild(h7);
    card.appendChild(comp);
    return card;
}

export function CreateAlbumsDOMFromJSON(jsonSource) {
    let center = document.createElement('center');
    let cardcolumns = document.createElement("div");
    cardcolumns.className = 'card-columns';

    let textcenter = document.createElement('div');
    let display4 = document.createElement('h3');
    textcenter.className = 'text-center';
    display4.className = 'display-4 stroke-shadow';
    display4.innerHTML = ('Count of Albums: ' + jsonSource?.length);
    textcenter.appendChild(display4);
    center.appendChild(textcenter);

    jsonSource.forEach(element => {
        let card = document.createElement("div")
        let alb = document.createElement("div")
        let data = document.createElement("data")
        let h6 = document.createElement("h6")
        let h7 = document.createElement("h7")

        card.className = 'card';
        alb.className = 'card-body album-card-div';
        data.setAttribute("value", element.id);
        h6.innerHTML = element.art;
        h7.innerHTML = element.name;
        h6.className = 'card-title';
        h7.className = 'card-text';

        alb.appendChild(data);
        alb.appendChild(h6);
        alb.appendChild(h7);
        card.appendChild(alb);
        cardcolumns.appendChild(card);
    });

    center.appendChild(cardcolumns);
    return center;
}

export function CreateGenresDOMFromJSON(jsonSource) {
    let center = document.createElement('center');
    let cardcolumns = document.createElement("div")
    cardcolumns.className = 'card-columns';

    let textcenter = document.createElement('div');
    let display4 = document.createElement('h3');
    textcenter.className = 'text-center';
    display4.className = 'display-4 stroke-shadow';
    display4.innerHTML = ('Count of Genres: ' + jsonSource?.length);
    textcenter.appendChild(display4);
    center.appendChild(textcenter);

    jsonSource.forEach(element => {
        let card = document.createElement("div")
        let alb = document.createElement("div")
        let data = document.createElement("data")
        let h6 = document.createElement("h6")

        card.className = 'card';
        alb.className = 'card-body genre-card-div';
        data.setAttribute("value", element.id);
        h6.innerHTML = element.name;
        h6.className = 'card-title';

        alb.appendChild(data);
        alb.appendChild(h6);
        card.appendChild(alb);
        cardcolumns.appendChild(card);
    });

    center.appendChild(cardcolumns);
    return center;
}

export function ConvertToDOM(message) {
    let center = document.createElement('center');
    center.id = "content-center";
    let cardcolumns = document.createElement("div")
    cardcolumns.className = 'card-columns';

    let textcenter = document.createElement('div');
    let display4 = document.createElement('h3');
    textcenter.className = 'text-center shadow-box m-increased-padding';
    if(message) {
        display4.className = 'display-4 stroke-shadow';
        display4.innerHTML = message ;
    }
    else {
        display4.className = 'display-4-server-fault stroke-shadow-h3-dark-red';
        display4.innerHTML = 'Server\'s temporarily unreachable.';
    }

    textcenter.appendChild(display4);
    center.appendChild(textcenter);
    insertAboutRedirect(display4);

    let data = [];/*JSON.parse(fromBinary(takeStore()));*/

    data.forEach(element => {
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
        h6.className = 'card-title';
        h7.className = 'card-text';

        comp.appendChild(data);
        comp.appendChild(h6);
        comp.appendChild(h7);
        card.appendChild(comp);
        cardcolumns.appendChild(card);
    });

    center.appendChild(cardcolumns);
    return center;
}

function insertAboutRedirect(display4) {
    let aboutLinkDiv = document.createElement('div');
    let headLineH2 = createH2();
    let aAbout = createAboutAhref();
    aboutLinkDiv.className = 'shadow-box__white m-lowered-padding';
    headLineH2.innerHTML = `<span class="roles"><span>Contacts: </span>`
    headLineH2.insertAdjacentElement('beforeend', aAbout);
    aboutLinkDiv.insertAdjacentElement('afterbegin', headLineH2)

    display4.insertAdjacentElement('afterend', aboutLinkDiv);
}

function createAboutAhref() {
    let routeActions = serviceProvider.resolve('nativeRouter').routes;
    Exception.Throw('Routes: ' + routeActions);
    let aAbout = document.createElement('a');
    aAbout.href = "/about"; 
    aAbout.innerHTML = "/About"
    aAbout.addEventListener('click', (e) => { 
        e.preventDefault();
        if (routeActions) routeActions['/about']();
    });
    return aAbout;
}

function createH2() {
    let h2 = document.createElement('h2');
    h2.className = "headline";
    return h2;
}

export function onMockDataLoaded() {
    const container = document.querySelector('#card-columns');

    container.addEventListener('click', function(e) {
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

export function setMockFooterSourse(el) {
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

export function getNext(url)
{
    console.log('[INF] mock-data.js/.. parsing...');
    let data = [];/*JSON.parse(fromBinary(takeStore()));*/
    let res = "";
    data.forEach(element => {
        if(res === "next")
        {
            console.log('[INF] mock-data.js/: returning id: ' + element.p + '...')
            res = element.p;
        }
        if(url === element.p)
        {
            res = "next";
            console.log('[INF] mock-data.js/: + element.p : ' + element.p)
        }
    });
    return res;
}

function fromBinary(binary) {
    const bytes = Uint8Array.from({ length: binary.length }, (element, i) =>
        binary.charCodeAt(i)
    );
    const charCodes = new Uint16Array(bytes.buffer);

    let result = "";
    charCodes.forEach((char) => {
        result += String.fromCharCode(char);
    });
    return result;
}

function toBinary(str) {
    const codeUnits = Uint16Array.from({ length: str.length },
        (element, i) => str.charCodeAt(i)
    );
    const charCodes = new Uint8Array(codeUnits.buffer);

    let result = "";
    charCodes.forEach((char) => {
        result += String.fromCharCode(char);
    });
    return result;
}

export function takeStore() {
    return '[]';
}
