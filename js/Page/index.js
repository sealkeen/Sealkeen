import { useTapCircle } from "./Components/ScreenStyles/tap-circle.js";
import { useVirtualMouseIfMobile } from './Components/Inputs/virtual-mouse.js'
import { useFaviconDynamic } from "./Components/Images/useFaviconDynamic.js";
import { useAboutHtmlPage } from "./Components/UI/useAboutHtmlPage.js";
import { appendSideNavigationBars } from "./Components/navigations/side-navigation-bars.js"
import { useSideNavigationsBlink } from "./Components/navigations/use-side-navigations-blink.js";
import { useTempoTapper } from "./Components/Popups/tempo-apper.js";

useVirtualMouseIfMobile();
export function usePageModifyingComponents() {
    useVirtualMouseIfMobile();
    useTapCircle();
    useFaviconDynamic();
    useAboutHtmlPage();
    appendSideNavigationBars();
    useSideNavigationsBlink();
    useTempoTapper();
}