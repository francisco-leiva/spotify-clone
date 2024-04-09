import type { InputHTMLAttributes, RefObject } from 'react'
import './Slider.css'

export function Slider({
  inputRef,
  ...props
}: {
  inputRef: RefObject<HTMLInputElement> | null
} & InputHTMLAttributes<HTMLInputElement>) {
  return <input type='range' id='slider' ref={inputRef} {...props} />
}
