import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/header/Header";
import { ReduxProvider } from "@/redux/provider";
import QueryProvider from "@/lib/QueryProvider";
import { Toaster } from "react-hot-toast";
import { languages } from "@/app/i18n/settings";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ceramics shop",
  description: "Unique ceramic works shop",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <QueryProvider>
          <ReduxProvider>
            <Header lng={lng} />
            <main className="overflow-hidden flex flex-col flex-1">
              {children}
            </main>
            <Toaster />
            <Footer lng={lng} />
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
