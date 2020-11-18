import { ReactNode } from "react";

export type placeDirec = 'top' | 'bottom' | 'left' | 'right';

export function getOffset(dom: any) {
  let parent = dom;
  let left = 0;
  let top = 0;
  while (parent) {
    left += parent.offsetLeft;
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return {
    left, top, 
    width: dom.offsetWidth,
    height: dom.offsetHeight
  }
}

export const position = (placement:placeDirec, popUp: HTMLElement, trigger: ReactNode) => {
  const {left, top, width, height} = getOffset(trigger)
  const overlayBcr = popUp.getBoundingClientRect()
  console.log(left, top, width, height)
  const style = {top: 0, left: 0}

  switch (placement) {
    case 'top': {
      style.top = top - overlayBcr.height
      style.left = left + (width - overlayBcr.width) / 2
      break
    }
    case 'bottom': {
      style.top = top + height
      style.left = left + (width - overlayBcr.width) / 2
      break
    }
    case 'left': {
      style.top = top + (height - overlayBcr.height) / 2
      style.left = left - overlayBcr.width
      break
    }
    case 'right': {
      style.top = top + (height - overlayBcr.height) / 2
      style.left = left + width
      break
    }
  }
  console.log(style)
  return style
}
