import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Каталог лекарств",
  description: "Каталог товаров с фильтрами, сортировкой и пагинацией",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${inter.variable} h-full bg-[#F4F7FB] antialiased`}>
      <body className="min-h-full w-full bg-[#F4F7FB] font-sans text-slate-800">
        <Providers>
          <main className="mx-auto w-full max-w-[1490px] px-5 py-5">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
