import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "دکاموند",
  description: "پلتفرم معتبر و فعال در زمینه طراحی وب سایت و سئو",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body data-atm-ext-installed="1.29.11">
        <main>{children}</main>
      </body>
    </html>
  );
}
