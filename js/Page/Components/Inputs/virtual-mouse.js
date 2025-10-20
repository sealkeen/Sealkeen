
import { createInfoMessage } from './../../../Errors/fetch-errors.js';
import { serviceProvider } from './../../../Services/di-container.js';

export function useVirtualMouseIfMobile() {
    setTimeout(addVirtualMouseIfMobile, 350);
}

function addVirtualMouseIfMobile() {
    let img = document.querySelector('img');
    if(img) {
        let isMobOrTab = window.isMobileOrTablet;
        isMobOrTab = (isMobOrTab == null) ? serviceProvider?.resolve('tabletAndMobileCheck') : isMobOrTab;
        if (!isMobOrTab) { 
            createInfoMessage('Desktop device');
            return;
        } else {
            createInfoMessage('Mobile or Tablet device');
        }
        
        let footer = document.querySelector('.footer');
        if (footer) return;

        img.parentElement.insertAdjacentHTML('beforeend', `<style>
.virtual-mouse:active{opacity:1}
.virtual-mouse{
grid-template-columns: 50% 50%;
    display: grid;
    z-index: 100;
    border-radius: 5px;
    opacity: 0.7;
    bottom: 0;
    left: 0;
    width: 500px; }
.virtual-mouse__button{
    border-radius: 5px;
    opacity: 1;
    width: 250px;
    height: 64px;
}
.lt-btn{ grid-column: 0; }
.rt-btn{ grid-column: 1; };
</style>
<div class="virtual-mouse">
  <button id="virtual-mouse-up" class="virtual-mouse__button lt-btn">up</button>
  <button id="virtual-mouse-down" class="virtual-mouse__button lt-btn">down</button>
  <button id="virtual-mouse-right" class="virtual-mouse__button rt-btn">right</button>
</div>
`);
    }
}