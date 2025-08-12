import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { config } from "../wagmi";

const client = new QueryClient();
const myCustomTheme = {
  blurs: {
    modalOverlay: "blur(4px)",
  },
  colors: {
    accentColor: "#8A2BE2", // Vibrant purple
    accentColorForeground: "#FFFFFF",
    actionButtonBorder: "rgba(255, 255, 255, 0.04)",
    actionButtonBorderMobile: "rgba(255, 255, 255, 0.1)",
    actionButtonSecondaryBackground: "rgba(255, 255, 255, 0.08)",
    closeButton: "rgba(255, 255, 255, 0.7)",
    closeButtonBackground: "rgba(255, 255, 255, 0.08)",
    connectButtonBackground: "#0A0A0A",
    connectButtonBackgroundError: "#FF494A",
    connectButtonInnerBackground:
      "linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.06))",
    connectButtonText: "#FFFFFF",
    connectButtonTextError: "#FFFFFF",
    connectionIndicator: "#10B981",
    downloadBottomCardBackground: "#0A0A0A",
    downloadTopCardBackground: "#161616",
    error: "#FF494A",
    generalBorder: "rgba(255, 255, 255, 0.08)",
    generalBorderDim: "rgba(255, 255, 255, 0.04)",
    menuItemBackground: "rgba(138, 43, 226, 0.1)",
    modalBackdrop: "rgba(0, 0, 0, 0.7)",
    modalBackground: "#0A0A0A",
    modalBorder: "rgba(255, 255, 255, 0.08)",
    modalText: "#FFFFFF",
    modalTextDim: "rgba(255, 255, 255, 0.6)",
    modalTextSecondary: "rgba(255, 255, 255, 0.7)",
    profileAction: "rgba(138, 43, 226, 0.1)",
    profileActionHover: "rgba(138, 43, 226, 0.2)",
    profileForeground: "rgba(255, 255, 255, 0.05)",
    selectedOptionBorder: "rgba(138, 43, 226, 0.4)",
    standby: "#FFD641",
  },
  fonts: {
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  radii: {
    actionButton: "5px",
    connectButton: "5px",
    menuButton: "5px",
    modal: "5px",
    modalMobile: "5px",
  },
  shadows: {
    connectButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
    profileDetailsAction: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.12)",
    walletLogo: "0px 2px 6px rgba(0, 0, 0, 0.12)",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider theme={myCustomTheme}>
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={5000} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
