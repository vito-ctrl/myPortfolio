import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aymane El Khadraoui | Full Stack Developer',
  description: 'Personal portfolio of Aymane El Khadraoui - Full Stack Developer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
