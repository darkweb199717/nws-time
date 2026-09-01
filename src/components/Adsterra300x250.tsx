'use client'

import { useEffect } from 'react'

export default function Adsterra300x250() {
  useEffect(() => {
    const optionsScript = document.createElement('script')

    optionsScript.type = 'text/javascript'
    optionsScript.innerHTML =
      "atOptions = { 'key' : '9c36795877b25d6e50a06261bfe405ae', 'format' : 'iframe', 'height' : 250, 'width' : 300, 'params' : {} };"

    const adScript = document.createElement('script')
    adScript.type = 'text/javascript'
    adScript.src = 'https://gigglehiccup.com/9c36795877b25d6e50a06261bfe405ae/invoke.js'

    const container = document.getElementById('adsterra-300x250-container')

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
        id="adsterra-300x250-container"
        style={{
          width: '300px',
          minHeight: '250px',
          maxWidth: '100%',
        }}
      />
    </div>
  )
}
