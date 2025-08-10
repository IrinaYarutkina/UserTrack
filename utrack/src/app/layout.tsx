import type { Metadata } from "next";
import Header from "@components/Header";
import "./globals.css";
import Providers from "@components/Provaiders"; // импорт клиентского компонента
import Transition from "@components/Transition";

export const metadata: Metadata = {
  title: "User Tracker",
  description: "Приложение для отслеживания пользователей",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <Header />
          <main>
            <Transition>{children}</Transition>
          </main>
        </Providers>
      </body>
    </html>
  );
}
