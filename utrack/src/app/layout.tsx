
import type { Metadata } from "next";
import Header from "../../components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Tracker",
  description: "Приложение для отслеживания пользователей",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
