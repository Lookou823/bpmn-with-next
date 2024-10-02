"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { initializeI18n } from "@/components/Locales";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  initializeI18n({
    language: "zh",
    debug: false,
  });
  return (
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
