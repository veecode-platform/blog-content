import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.css";
import { cookies, draftMode } from 'next/headers';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VeeCode Blog",
  description: "A Blog made by VeeCode Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { isEnabled } = draftMode();
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col font-sans bg-darkcustom-600">
          <Header />
          <main className="max-w-none flex flex-1 flex-col">
            <div className="flex-1">{children}</div>
          </main>
          <Footer />
        </div>
        {isEnabled && (
          <div>
            Draft mode ({cookies().get("ks-branch")?.value}){" "}
            <form method="POST" action="/preview/end">
              <button>End preview</button>
            </form>
          </div>
        )}
      </body>
    </html>
  );
}
