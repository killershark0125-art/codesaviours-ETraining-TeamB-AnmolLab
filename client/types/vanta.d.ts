
declare module "vanta/dist/vanta.cells.min.js" {
  import type * as THREE from "three";

  type VantaOptions = {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    color1?: number;
    color2?: number;
    size?: number;
    speed?: number;
  };

  type VantaEffect = {
    destroy: () => void;
    resize: () => void;
  };

  const CELLS: (options: VantaOptions) => VantaEffect;

  export default CELLS;
}
