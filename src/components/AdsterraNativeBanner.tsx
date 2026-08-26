'use client'
import { useEffect, useRef } from 'react'

export function AdsterraNativeBanner() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://gigglehiccup.com/b7494262262e432b34923f2c104e5bc8/invoke.js'
    script.async = true
    script.setAttribute('data-cfasync', 'false')
    ref.current?.appendChild(script)
  }, [])

  return <div id="container-b7494262262e432b34923f2c104e5bc8" ref={ref} />
}
