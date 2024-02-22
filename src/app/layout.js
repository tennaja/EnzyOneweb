"use client";

import "./globals.css";
import "./animate.min.css";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });
const notoSansThai = Noto_Sans_Thai({ subsets: ["thai"] });

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Theme from "./theme-provider";
import { persistor, reduxStore } from "@/redux/store";

export default function RootLayout({ children }) {
  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={persistor} loading={null}>
        {() => (
          <ConfigProvider
            theme={{
              token: {
                // Seed Token
                colorPrimary: "#33BFBF",
                // borderRadius: 2,
                fontFamily: notoSansThai,
                // Alias Token
                colorBgContainer: "#f0fafa",
              },
            }}
          >
            <html lang="en">
              <head>
                <ColorSchemeScript />
              </head>
              <body className={notoSansThai.className}>
                <Theme>
                  <MantineProvider>{children}</MantineProvider>
                </Theme>
              </body>
            </html>
          </ConfigProvider>
        )}
      </PersistGate>
    </Provider>
  );
}
