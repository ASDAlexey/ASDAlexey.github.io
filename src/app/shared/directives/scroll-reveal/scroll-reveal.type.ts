/**
 * Direction an element travels from as it reveals. Drives the `data-reveal`
 * attribute the directive sets; the offset/scale per direction lives in CSS.
 * `up` is the default (rises from below); `scale` fades up while scaling in.
 */
export type RevealDirection = 'down' | 'left' | 'right' | 'scale' | 'up';
