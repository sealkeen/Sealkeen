import { useTapCircle } from "./Components/ScreenStyles/tap-circle.js";
import { useVirtualMouseIfMobile } from './Components/Inputs/virtual-mouse.js'
import { useFaviconDynamic } from "./Components/Images/useFaviconDynamic.js";
import { useAboutHtmlPage } from "./Components/UI/useAboutHtmlPage.js";
import { serviceProvider } from "../Services/di-container.js";

useVirtualMouseIfMobile();
export function usePageModifyingComponents() {
    useVirtualMouseIfMobile();
    useTapCircle();
    useFaviconDynamic();
    useAboutHtmlPage();
}