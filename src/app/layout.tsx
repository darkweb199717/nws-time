import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { AppNavbar } from '@/components/AppNavbar'
import { Footer } from '@/components/Footer'
import './globals.css'
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/constant'
import Script from 'next/script'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
		"finance calculator",
		"loan calculator",
		"investment calculator",
		"retirement calculator",
		"tax calculator",
		"emi calculator",
		"sip calculator",
		"online financial calculator",
		"financial planning tool",
    "free financial calculator",
    "debt calculator",
    "gst calculator",
    "loan comparison calculator",
    "rd calculator",
    "fd calculator",
    "retirement calculator",
    "salary calculator",
	],
  authors: [{ name: SITE_AUTHOR }],
	publisher: SITE_AUTHOR,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: SITE_URL,
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: SITE_TITLE,
			},
		],
	},
	robots: "index, follow",
	alternates: {
		canonical: SITE_URL,
	},
}

const analyticsScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-R0GTWK83NS', {
    page_path: window.location.pathname,
  });
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
		  <iframe
  id="aswift_12"
  style="border: 0; height: 280px; width: 336px;"
  src="https://googleads.g.doubleclick.net/pagead/ads?gdpr=0&amp;us_privacy=1---&amp;gpp_sid=-1&amp;client=ca-pub-0889817991475169&amp;output=html&amp;h=280&amp;slotname=6564901056&amp;adk=3029851034&amp;adf=3904748653&amp;pi=t.ma~as.6564901056&amp;w=336&amp;fwrn=4&amp;fwrnh=100&amp;lmt=1772645704&amp;rafmt=1&amp;format=336x280&amp;url=https%3A%2F%2Fwindows10gadgets.pro%2F&amp;fwr=0&amp;fwrattr=true&amp;rpe=1&amp;resp_fmts=3&amp;aieuf=1&amp;aicrs=1&amp;uach=WyJXaW5kb3dzIiwiMTAuMC4wIiwieDg2IiwiIiwiMTQ1LjAuNzYzMi4xMTciLG51bGwsMCxudWxsLCI2NCIsW1siTm90OkEtQnJhbmQiLCI5OS4wLjAuMCJdLFsiR29vZ2xlIENocm9tZSIsIjE0NS4wLjc2MzIuMTE3Il0sWyJDaHJvbWl1bSIsIjE0NS4wLjc2MzIuMTE3Il1dLDBd&amp;abgtt=6&amp;dt=1772645703630&amp;bpp=2&amp;bdt=1473&amp;idt=629&amp;shv=r20260303&amp;mjsv=m202602260101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;cookie=ID%3Ddb5ecca7c6c7ad88%3AT%3D1750603895%3ART%3D1769858032%3AS%3DALNI_MYEYw5of0L5c1fVaFSH8XGwNhYbfQ&amp;gpic=UID%3D00001159c1a35403%3AT%3D1750603895%3ART%3D1769858032%3AS%3DALNI_MaZy4krf2WxXxO5p3ZengrweQwY7g&amp;eo_id_str=ID%3Dfac289a925aa96e8%3AT%3D1769858032%3ART%3D1769858032%3AS%3DAA-Afjbrk_FUPNQ5oy4ET2s4y5KC&amp;prev_fmts=0x0%2C1200x90%2C336x280&amp;nras=1&amp;correlator=8490235016367&amp;frm=20&amp;pv=1&amp;u_tz=420&amp;u_his=6&amp;u_h=768&amp;u_w=1366&amp;u_ah=728&amp;u_aw=1366&amp;u_cd=32&amp;u_sd=1&amp;dmc=4&amp;adx=508&amp;ady=267&amp;biw=1351&amp;bih=607&amp;scr_x=0&amp;scr_y=0&amp;eid=95378429%2C95381339%2C95381490%2C95382852%2C95383702%2C95384611%2C95382196&amp;oid=2&amp;pvsid=8012646442597650&amp;tmod=865309960&amp;uas=0&amp;nvt=1&amp;fc=1920&amp;brdim=0%2C0%2C0%2C0%2C1366%2C0%2C1366%2C728%2C1366%2C607&amp;vis=1&amp;rsz=%7C%7CeE%7C&amp;abl=CS&amp;pfx=0&amp;fu=128&amp;bc=31&amp;bz=1&amp;ifi=4&amp;uci=a!4&amp;fsb=1&amp;dtd=640"
  name="aswift_12"
  width="336"
  height="280"
  frameborder="0"
  marginwidth="0"
  marginheight="0"
  scrolling="no"
  sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
  allowfullscreen="allowfullscreen"
  data-google-container-id="a!12"
  data-google-query-id="CJy_6IKI__UCFd3RcwEdrEoO9Q"
  data-load-complete="true"
></iframe>
		  <meta name="google-adsense-account" content="ca-pub-7574125699858795"/>
				{/* Google Analytics */}
				<Script
					strategy='afterInteractive'
					src={`https://www.googletagmanager.com/gtag/js?id=G-R0GTWK83NS`} // Replace with your Google Analytics ID
				/>
				<Script
					id='google-analytics'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: analyticsScript,
					}}
				/>
				{/* Google Search Console */}
				<meta
					name='google-site-verification'
					content='XXXXXXXXXXXXXX' // Replace with your Google Search Console verification code
				/>
				{/* AdSense */}
				<Script
					strategy='afterInteractive'
					src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7574125699858795' 
					crossOrigin='anonymous'
				/>
			</head>
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppNavbar />
          <main className="pt-20 flex-grow">
            {children}
          </main>
			<iframe
  id="aswift_12"
  style="border: 0; height: 280px; width: 336px;"
  src="https://googleads.g.doubleclick.net/pagead/ads?gdpr=0&amp;us_privacy=1---&amp;gpp_sid=-1&amp;client=ca-pub-0889817991475169&amp;output=html&amp;h=280&amp;slotname=6564901056&amp;adk=3029851034&amp;adf=3904748653&amp;pi=t.ma~as.6564901056&amp;w=336&amp;fwrn=4&amp;fwrnh=100&amp;lmt=1772645704&amp;rafmt=1&amp;format=336x280&amp;url=https%3A%2F%2Fwindows10gadgets.pro%2F&amp;fwr=0&amp;fwrattr=true&amp;rpe=1&amp;resp_fmts=3&amp;aieuf=1&amp;aicrs=1&amp;uach=WyJXaW5kb3dzIiwiMTAuMC4wIiwieDg2IiwiIiwiMTQ1LjAuNzYzMi4xMTciLG51bGwsMCxudWxsLCI2NCIsW1siTm90OkEtQnJhbmQiLCI5OS4wLjAuMCJdLFsiR29vZ2xlIENocm9tZSIsIjE0NS4wLjc2MzIuMTE3Il0sWyJDaHJvbWl1bSIsIjE0NS4wLjc2MzIuMTE3Il1dLDBd&amp;abgtt=6&amp;dt=1772645703630&amp;bpp=2&amp;bdt=1473&amp;idt=629&amp;shv=r20260303&amp;mjsv=m202602260101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;cookie=ID%3Ddb5ecca7c6c7ad88%3AT%3D1750603895%3ART%3D1769858032%3AS%3DALNI_MYEYw5of0L5c1fVaFSH8XGwNhYbfQ&amp;gpic=UID%3D00001159c1a35403%3AT%3D1750603895%3ART%3D1769858032%3AS%3DALNI_MaZy4krf2WxXxO5p3ZengrweQwY7g&amp;eo_id_str=ID%3Dfac289a925aa96e8%3AT%3D1769858032%3ART%3D1769858032%3AS%3DAA-Afjbrk_FUPNQ5oy4ET2s4y5KC&amp;prev_fmts=0x0%2C1200x90%2C336x280&amp;nras=1&amp;correlator=8490235016367&amp;frm=20&amp;pv=1&amp;u_tz=420&amp;u_his=6&amp;u_h=768&amp;u_w=1366&amp;u_ah=728&amp;u_aw=1366&amp;u_cd=32&amp;u_sd=1&amp;dmc=4&amp;adx=508&amp;ady=267&amp;biw=1351&amp;bih=607&amp;scr_x=0&amp;scr_y=0&amp;eid=95378429%2C95381339%2C95381490%2C95382852%2C95383702%2C95384611%2C95382196&amp;oid=2&amp;pvsid=8012646442597650&amp;tmod=865309960&amp;uas=0&amp;nvt=1&amp;fc=1920&amp;brdim=0%2C0%2C0%2C0%2C1366%2C0%2C1366%2C728%2C1366%2C607&amp;vis=1&amp;rsz=%7C%7CeE%7C&amp;abl=CS&amp;pfx=0&amp;fu=128&amp;bc=31&amp;bz=1&amp;ifi=4&amp;uci=a!4&amp;fsb=1&amp;dtd=640"
  name="aswift_12"
  width="336"
  height="280"
  frameborder="0"
  marginwidth="0"
  marginheight="0"
  scrolling="no"
  sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
  allowfullscreen="allowfullscreen"
  data-google-container-id="a!12"
  data-google-query-id="CJy_6IKI__UCFd3RcwEdrEoO9Q"
  data-load-complete="true"
></iframe>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
