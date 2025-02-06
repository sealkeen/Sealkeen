
import Debug from '../Extensions/cs-debug.js';
import { Terminal } from '../System/Terminal.js';
export function addSearchTerminal()
{
    try {
        if (window.location.pathname === '/about' || 
            document.getElementById('terminal-container') != null) {
            Debug.WriteLine("Skipping terminal application.");
            return;
        }
            
        let text = document.getElementsByClassName("text-center");
            if(text[0]) {
                text[0].insertAdjacentHTML("afterend",
                `
                <div id="terminal-container">
                <p>Search by artist: </>
                    <div class="output"></div>
                    <div id="command-form"></div>
                </div>
                `);
                let trm = new Terminal("?artist=", "terminal-container"); 
                trm.setButtonText('Search');
            }
    } catch (e) {
        console.error(e);
    }
}