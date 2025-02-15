import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Portal do Conselho",
  description: "Um site para a melhor organização de conselhos do SENAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className=""
      >
        {children}
      </body>
    </html>
  );
}
