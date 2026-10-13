import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Silas Studio | Autonomous AI Operations',
  description: 'Self-hosted, secure, and open-source AI content operations powered by local LLMs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
