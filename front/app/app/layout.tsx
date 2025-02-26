import InnerLayout from "./InnerLayout";
import type { Metadata } from 'next'
import "./globals.css";

export const metadata: Metadata = {
  title: 'Portal do Conselho',
  description: 'Um site para realizar e visualizar conselhos de classe',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {  
  return (
    <html lang="pt">
      <InnerLayout>{children}</InnerLayout>
    </html>
  );
}