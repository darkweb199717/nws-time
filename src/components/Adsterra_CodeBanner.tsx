'use client'

import { useEffect } from 'react'

export default function AdsterraCodeBanner() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.atob) {
      const script = document.createElement('script')
      script.src = 'https://gigglehiccup.com/b7494262262e432b34923f2c104e5bc8/invoke.js'
      script.async = true
      script.dataset.cfasync = 'false'
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div id="container-b7494262262e432b34923f2c104e5bc8" />
  )
}
