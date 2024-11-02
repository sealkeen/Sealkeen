import { useTapCircle } from "./Components/ScreenStyles/tap-circle.js";
import { useVirtualMouseIfMobile } from './Components/Inputs/virtual-mouse.js'
import { useFaviconDynamic } from "./Components/Images/useFaviconDynamic.js";

useVirtualMouseIfMobile();
export function usePageModifyingComponents() {
    useVirtualMouseIfMobile();
    useTapCircle();
    useFaviconDynamic();
}