import { Fira_Mono } from "next/font/google"
import { ReactNode } from "react"
import "./globals.css"
import { MINIAPP, PROJECT_DESCRIPTION, PROJECT_TITLE } from "./lib/constants"

const firamono = Fira_Mono({
  variable: "--firamono",
  weight: "500",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://auth.farcaster.xyz" />
        <link rel="icon" type="image/svg+xml" href="/images/global/logo.svg" />
        <meta name="fc:frame" content={JSON.stringify(MINIAPP)} />
        <meta name="description" content={PROJECT_DESCRIPTION} />
        <title>{PROJECT_TITLE}</title>
      </head>
      <body className={`${firamono.variable} antialiased`}>
        {children}
        {/* <ImagesPreload /> */}
      </body>
    </html>
  )
}
