import type { InputHTMLAttributes } from 'react'
import './Slider.css'

export function Slider(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input type='range' id='slider' {...props} />
}
