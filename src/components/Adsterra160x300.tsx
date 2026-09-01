'use client'

import { useEffect } from 'react'

export default function Adsterra160x300() {
  useEffect(() => {
    const optionsScript = document.createElement('script')

    optionsScript.type = 'text/javascript'
    optionsScript.innerHTML =
      "atOptions = { 'key' : '0a52956e4b44dc62256d148f9fcf966b', 'format' : 'iframe', 'height' : 300, 'width' : 160, 'params' : {} };"

    const adScript = document.createElement('script')
    adScript.type = 'text/javascript'
    adScript.src = 'https://gigglehiccup.com/0a52956e4b44dc62256d148f9fcf966b/invoke.js'

    const container = document.getElementById('adsterra-160x300-container')

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
        id="adsterra-160x300-container"
        style={{
          width: '160px',
          minHeight: '300px',
          maxWidth: '100%',
        }}
      />
    </div>
  )
}
