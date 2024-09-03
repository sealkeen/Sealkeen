
import { createInfoMessage } from './../../../Errors/fetch-errors.js';
import { serviceProvider } from './../../../Services/di-container.js';

export function useVirtualMouseIfMobile() {
    let cnt = document.querySelector('body');
    let footer = document.querySelector('.footer');
    if(cnt) {
        let isMobileOrTablet = serviceProvider.resolve('tabletAndMobileCheck');
        if(!isMobileOrTablet) { 
            createInfoMessage('Desktop device');
            return;
        }
        createInfoMessage('Mobile device');
        if (footer) return;

        cnt.insertAdjacentHTML('afterbegin', `<style>
.virtual-mouse:active{opacity:1}
.virtual-mouse{ 
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  display: grid;
  position: absolute;
  right: 20px;
  border-radius: 5px;
  opacity: 0.7;
  bottom: 20px; }
.virtual-mouse__button{
    display: grid;
    right: 20px;
    border-radius: 5px;
    opacity: 1;
    bottom: 20px;
    width: 60px;
    height: 40px;
}
.lt-btn{ grid-column: 0; }
.rt-btn{ grid-column: 1; };
</style>
<div class="virtual-mouse">
  <button class="virtual-mouse__button lt-btn">up</button>
  <button class="virtual-mouse__button lt-btn">down</button>
  <button class="virtual-mouse__button rt-btn">right</button>
</div>
`);
    }
}