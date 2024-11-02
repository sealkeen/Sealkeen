import { useTapCircle } from "./Components/ScreenStyles/tap-circle.js";
import { useVirtualMouseIfMobile } from './Components/Inputs/virtual-mouse.js'

useVirtualMouseIfMobile();
export function usePageModifyingComponents() {
    useVirtualMouseIfMobile();
    useTapCircle();
}