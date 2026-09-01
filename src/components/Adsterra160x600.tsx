'use client'

import { useEffect } from 'react'

export default function Adsterra160x600() {
  useEffect(() => {
    const optionsScript = document.createElement('script')

    optionsScript.type = 'text/javascript'
    optionsScript.innerHTML =
      "atOptions = { 'key' : '2348c1dc190d575127b4d341b8e9507c', 'format' : 'iframe', 'height' : 600, 'width' : 160, 'params' : {} };"

    const adScript = document.createElement('script')
    adScript.type = 'text/javascript'
    adScript.src = 'https://gigglehiccup.com/2348c1dc190d575127b4d341b8e9507c/invoke.js'

    const container = document.getElementById('adsterra-160x600-container')

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
    <div className="flex justify-center px-4 py-6 overflow-hidden">
      <div
        id="adsterra-160x600-container"
        style={{
          width: '160px',
          minHeight: '600px',
          maxWidth: '100%',
        }}
      />
    </div>
  )
}

