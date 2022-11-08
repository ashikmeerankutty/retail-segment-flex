import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Theme } from "@twilio-paste/core/theme";
import store from "../redux/store";

declare global {
  interface Window {
    Twilio: {
      initWebchat: (config: any) => void;
    };
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Theme.Provider theme="default">
        <Component {...pageProps} />
      </Theme.Provider>
    </Provider>
  );
}
