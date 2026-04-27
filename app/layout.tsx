import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700']
});
const body = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

export const metadata = {
  title: 'Jommy Naturals | Premium Raw Materials',
  description: "Abuja's leading specialist supplier of authentic, organic raw materials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans bg-secondary text-primary`}>
        {children}
      </body>
    </html>
  );
}