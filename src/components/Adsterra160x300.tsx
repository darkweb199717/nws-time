'use client'

import Script from 'next/script'

export default function Adsterra160x300() {
  return (
    <div className="flex justify-center items-center w-[160px] min-h-[300px]">
      <Script
        strategy="afterInteractive"
        src="https://gigglehiccup.com/0a52956e4b44dc62256d148f9fcf966b/invoke.js"
      />
    </div>
  )
}
