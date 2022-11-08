/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          type="text/javascript"
          src={
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/main.js"
              : "main.js"
          }
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
