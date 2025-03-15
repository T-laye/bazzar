import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
// import Toast from "@/components/Toast";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "sonner";
import { AppProvider } from "@/providers/Context";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], // Choose weights as needed
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flextable.co"),
  keywords: [
    "Instruments",
    "Engineering",
    "Measuring",
    "Tools",
    "Equipment",
    "Caliberations",
    "Services",
  ],
  title: {
    template: `%s | Instrument Bazzar`,
    default: "Instrument Bazzar",
  },
  description: "Get what you want with Ease.",
  openGraph: {
    title: "Instrument Bazzar",
    description: "Get what you want with Ease.",
    images: [
      {
        url: "/bazzar.webp",
        alt: "Instrument Bazzar",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProvider>

      <ReactQueryProvider>
        <body className={`${manrope.variable} antialiased`}>
          <div>{children}</div>
          <Toaster position="top-right" />
        </body>
      </ReactQueryProvider>
      </AppProvider>
    </html>
  );
}
