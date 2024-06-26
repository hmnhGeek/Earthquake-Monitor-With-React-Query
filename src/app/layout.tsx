import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'semantic-ui-css/semantic.min.css';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { ReduxProvider } from "@/redux/ReduxProvider";
import { Container } from "semantic-ui-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Earthquake Dashboard",
  description: "Monitor the latest details related to earthquakes around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Container>
            {children}
          </Container>
        </ReduxProvider>
      </body>
    </html>
  );
}
