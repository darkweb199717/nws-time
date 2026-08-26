'use client'

interface AdsterraBannerProps {
  adKey: string
  width: number
  height: number
}

export function AdsterraBanner({ adKey, width, height }: AdsterraBannerProps) {
  const srcDoc = `
    <html><body style="margin:0;padding:0;">
      <script>
        atOptions = {
          'key': '${adKey}',
          'format': 'iframe',
          'height': ${height},
          'width': ${width},
          'params': {}
        };
      </script>
      <script src="https://gigglehiccup.com/${adKey}/invoke.js"></script>
    </body></html>
  `

  return (
    <iframe
      srcDoc={srcDoc}
      width={width}
      height={height}
      style={{ border: 'none', overflow: 'hidden' }}
      scrolling="no"
      title="advertisement"
    />
  )
}
