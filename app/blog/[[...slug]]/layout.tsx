import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../../globals.css'
import StoryblokProvider from '@/src/component/StoryblokProvider'
import Header from '@/app/components/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "StoryBlok Reddit Content Feedback",
  description:
    "AI-powered content feedback on your StoryBlok stories, enriched with insights drawn from Reddit discussions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          {children}
        </body>
      </html>
    </StoryblokProvider>
  )
}
