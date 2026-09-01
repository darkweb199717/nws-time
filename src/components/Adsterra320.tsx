'use client'

import { useEffect } from 'react'

export default function Adsterra320() {
  useEffect(() => {
    const optionsScript = document.createElement('script')

    optionsScript.type = 'text/javascript'
    optionsScript.innerHTML =
      "atOptions = { 'key' : 'ea4836e994596d6acd9ff40cdd5aea0d', 'format' : 'iframe', 'height' : 50, 'width' : 320, 'params' : {} };"

    const adScript = document.createElement('script')
    adScript.type = 'text/javascript'
    adScript.src = 'https://gigglehiccup.com/ea4836e994596d6acd9ff40cdd5aea0d/invoke.js'

    const container = document.getElementById('adsterra-320-container')

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
        id="adsterra-320-container"
        style={{
          width: '320px',
          minHeight: '50px',
          maxWidth: '100%',
        }}
      />
    </div>
  )
}
