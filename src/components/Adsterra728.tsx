```tsx
'use client'

import { useEffect } from 'react'

export default function Adsterra728() {
  useEffect(() => {
    const optionsScript = document.createElement('script')

    optionsScript.type = 'text/javascript'
    optionsScript.innerHTML = `
      atOptions = {
        'key' : '374162b38ed7db45b875813aa8ac794f',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `

    const adScript = document.createElement('script')

    adScript.type = 'text/javascript'
    adScript.src =
      'https://gigglehiccup.com/374162b38ed7db45b875813aa8ac794f/invoke.js'
    adScript.async = true

    const container = document.getElementById('adsterra-728-container')

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
        id="adsterra-728-container"
        style={{
          width: '728px',
          minHeight: '90px',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </div>
  )
}
```
