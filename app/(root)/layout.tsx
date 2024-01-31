import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/header/Header";
import { ReduxProvider } from "@/redux/provider";
import QueryProvider from "@/lib/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ceramics shop",
  description: "Unique ceramic works shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <QueryProvider>
          <ReduxProvider>
            <Header />
            <main className="overflow-hidden flex flex-col flex-1">
              {children}
            </main>
            <Footer />
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
