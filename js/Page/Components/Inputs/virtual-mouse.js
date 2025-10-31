
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

        img.parentElement.insertAdjacentHTML('beforeend',
`
<div class="virtual-mouse">
  <button id="virtual-mouse-up" class="virtual-mouse__button lt-btn">up</button>
  <button id="virtual-mouse-down" class="virtual-mouse__button lt-btn">down</button>
  <button id="virtual-mouse-right" class="virtual-mouse__button rt-btn">right</button>
</div>
`);
    }
}
