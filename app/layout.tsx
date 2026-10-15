import type { Metadata, Viewport } from 'next';
import { fontSans, fontMono } from '@/lib/fonts';
import { MotionProvider } from '@/components/ui/MotionProvider';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import './globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f7f5' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1116' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Aymane El Khadraoui | Full Stack Developer',
  description:
    'Digital Lab portfolio of Aymane El Khadraoui — Full Stack Developer (Java EE, Laravel, Next.js). Seeking a developer internship.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aymane-elkhadraoui.dev'),
  openGraph: {
    title: 'Aymane El Khadraoui | Full Stack Developer',
    description:
      'Digital Lab portfolio of Aymane El Khadraoui — Full Stack Developer (Java EE, Laravel, Next.js). Seeking a developer internship.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Aymane El Khadraoui Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aymane El Khadraoui | Full Stack Developer',
    description:
      'Digital Lab portfolio of Aymane El Khadraoui — Full Stack Developer (Java EE, Laravel, Next.js). Seeking a developer internship.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <MotionProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
