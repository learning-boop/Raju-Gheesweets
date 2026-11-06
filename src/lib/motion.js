export const EASE = [0.2, 0.8, 0.2, 1]
export const EASE_IN_OUT = [0.76, 0, 0.24, 1]

/** Track the pointer inside an element for a CSS spotlight (--mx / --my). */
export function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}
