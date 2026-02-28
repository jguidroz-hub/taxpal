import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaxPal — Smart Tax Planning for Freelancers & 1099 Contractors',
  description: 'Calculate estimated quarterly taxes, track deductions, and never miss a payment deadline. Built for freelancers transitioning from W-2 to 1099.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TaxPal',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Smart tax planning for freelancers and 1099 contractors. Calculate estimated quarterly taxes, track deductions, and never miss a deadline.',
  url: 'https://taxpal.projectgreenbelt.com',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free plan available. Pro plan for advanced features.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
