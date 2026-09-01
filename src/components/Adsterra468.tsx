'use client'

import { useEffect } from 'react'

export default function Adsterra468() {
  useEffect(() => {
    const optionsScript = document.createElement('script')

    optionsScript.type = 'text/javascript'
    optionsScript.innerHTML =
      "atOptions = { 'key' : 'fea070f966ba197c156703c816833b10', 'format' : 'iframe', 'height' : 60, 'width' : 468, 'params' : {} };"

    const adScript = document.createElement('script')
    adScript.type = 'text/javascript'
    adScript.src = 'https://gigglehiccup.com/fea070f966ba197c156703c816833b10/invoke.js'

    const container = document.getElementById('adsterra-468-container')

    if (container) {
      container.appendChild(optionsScript)
      container.appendChild(adScript)
    }

    return () => {
      optionsScript.remove()
      adScript.remove()
    }
  }, [])

  return (
    <div className="w-full flex justify-center px-4 py-6 overflow-hidden">
      <div
        id="adsterra-468-container"
        style={{
          width: '468px',
          minHeight: '60px',
          maxWidth: '100%',
        }}
      />
    </div>
  )
}
