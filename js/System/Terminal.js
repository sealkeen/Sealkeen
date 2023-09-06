import { replaceArtistParamInUrl } from "../Page/url-decoding.js";

var fetchContentCrossOrigin = async () => { }
var createInfoMessage = async () => { }

import("../Router/shared.js").then( shared=> {
    fetchContentCrossOrigin = shared.fetchContentCrossOrigin;
});
import("../Errors/fetch-errors.js").then(fErrors=>{
    createInfoMessage = fErrors.createInfoMessage;
});

// Terminal.js
export class Terminal {
    constructor(commandUrl, containerId) {
        this.commandUrl = commandUrl;
        this.container = document.getElementById(containerId);
        this.output = document.createElement('div');
        this.output.classList.add('output');
        this.container.appendChild(this.output);
        this.form = document.createElement('form');
        this.form.setAttribute('action', commandUrl);
        this.form.setAttribute('method', 'post');
        this.form.addEventListener('submit', this.onSubmit.bind(this));
        this.container.appendChild(this.form);
        this.input = document.createElement('input');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('name', 'Input');
        this.input.setAttribute('autofocus', '');
        this.form.appendChild(this.input);
        this.button = document.createElement('button');
        this.button.setAttribute('type', 'submit');
        this.button.textContent = 'Send';
        this.form.appendChild(this.button);
    }

    setButtonText(line) { this.button.textContent = line; }
    
    onSearchSubmit(e) { 
        e.preventDefault();
    }

    async onSubmit(e) {
        e.preventDefault();
        console.log(`[DBG] this.button.textContent === "Search" : ${this.button.textContent === 'Search'}`)
        console.log(`[DBG] this.button.textContent === "Send" : ${this.button.textContent === 'Send'}`)
        if(this.button.textContent === 'Search') { /*search */
            let resp = await fetchContentCrossOrigin(`GetPartialCompositionPageByArtistName?artistName=${this.input.value}`
            , false).then(result => {
                if(result.ok) { replaceArtistParamInUrl(this.input.value); }
                return result;
            });
            console.error('response == false ' + resp.ok == false + ' reps.ok : ' + resp.ok )
            if( resp.ok == false )
            {
                await createInfoMessage('Error occured while fetching the artist tracks. Server may be unavailable right now.');
            }
        }
        else if(this.button.textContent === 'Send') { /* command executing */
            const command = this.input.value;
            this.input.value = '';
            this.sendCommand({ Input: command });
        }
    }

    sendCommand(commandObject) {
        fetch(this.commandUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commandObject)
        })
            .then(response => response.json())
            .then(output => this.addOutput(output.statusText))
            .catch(error => console.log(`[ERR] An error occurred: ${error}`));
    }

    addOutput(text) {
        const outputLine = document.createElement('div');
        outputLine.textContent = text;
        this.output.appendChild(outputLine);

        const containerHeight = this.container.clientHeight;
        const formHeight = this.form.clientHeight;
        const maxOutputHeight = containerHeight - formHeight - 20; // subtract some padding and margin
        const lineHeight = parseInt(window.getComputedStyle(outputLine).lineHeight);
        const maxNumLines = Math.floor(maxOutputHeight / lineHeight);

        if (this.output.childNodes.length > maxNumLines) {
            this.output.removeChild(this.output.childNodes[0]);
        }
    }
}