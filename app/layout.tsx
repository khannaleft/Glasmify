import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { UserProvider } from "../context/UserContext";
import { ToastProvider } from "../context/ToastContext";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Glasmify - Modern Ecommerce",
  description: "A sleek, modern ecommerce application featuring a glass morphism design theme. Browse products, view details in an elegant modal, and manage your shopping cart in a fluid, visually appealing interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans bg-slate-900 text-gray-200`}>
        <ToastProvider>
          <UserProvider>
            <CartProvider>
              <div className="fixed inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                 <div className="fixed left-0 top-0 -z-10 h-full w-full bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
              </div>
              {children}
            </CartProvider>
          </UserProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
