import { useTapCircle } from "./Components/ScreenStyles/tap-circle.js";
import { useVirtualMouseIfMobile } from './Components/Inputs/virtual-mouse.js'
import { useFaviconDynamic } from "./Components/Images/useFaviconDynamic.js";
import { useAboutHtmlPage } from "./Components/UI/useAboutHtmlPage.js";
import { appendSideNavigationBars } from "./Components/navigations/side-navigation-bars.js"
import { useSideNavigationsBlink } from "./Components/navigations/use-side-navigations-blink.js";
import { useTempoTapper } from "./Components/Popups/tempo-tapper.js";
import { serviceProvider } from "../Services/di-container.js";
import { useSynthKeyboard } from "./Components/Inputs/synth-keyboard.js";

export function usePageModifyingComponents() {
    useTapCircle();
    useFaviconDynamic();
    useAboutHtmlPage();
    appendSideNavigationBars();
    useSideNavigationsBlink();
    setTimeout( () => useVirtualMouseIfMobile(), 550 );

    const { handleTap } = useTempoTapper();
    serviceProvider.register('tempoTapper', function() { return { handleTap } }, []);
    serviceProvider.register('synthKeyboard', function() { return { activate: useSynthKeyboard } }, []);
}