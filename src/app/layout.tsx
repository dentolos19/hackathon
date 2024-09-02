import AppContainer from "@/components/app-container";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hackathon",
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme={"dark"}>
          <AppContainer>{props.children}</AppContainer>
        </MantineProvider>
      </body>
    </html>
  );
}