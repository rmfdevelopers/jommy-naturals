import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700']
});

const body = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['400', '500', '700']
});

export const metadata = {
  title: 'Jommy Naturals | Cosmetic Raw Materials',
  description: 'The Purest Foundations for Your Beauty Formulations. Premium ethically-sourced ingredients in Abuja.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}