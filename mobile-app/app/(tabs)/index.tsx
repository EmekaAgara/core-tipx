import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, Alert } from "react-native";
import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

const App = () => {
  const handleShouldStartLoadWithRequest = (request) => {
    const url = request.url;

    // Handle MetaMask deep links
    if (url.startsWith("metamask://")) {
      handleMetaMaskFallback();
      return false;
    }

    // Open all non-core-tipx links in external browser
    if (!url.includes("https://core-tipx.vercel.app/")) {
      WebBrowser.openBrowserAsync(url);
      return false;
    }

    return true;
  };

  const handleMetaMaskFallback = () => {
    // Since Expo Go can't deep link to metamask://, fallback to web version
    Alert.alert(
      "MetaMask Connection",
      "MetaMask mobile deep link isn't supported in Expo Go. Do you want to connect via the MetaMask Web Wallet instead?",
      [
        {
          text: "Open Web Wallet",
          onPress: () =>
            WebBrowser.openBrowserAsync("https://portfolio.metamask.io/"),
        },
        {
          text: "Install MetaMask",
          onPress: () =>
            WebBrowser.openBrowserAsync("https://metamask.io/download.html"),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <WebView
          source={{ uri: "https://core-tipx.vercel.app/" }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          sharedCookiesEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          mixedContentMode="compatibility"
          onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          allowsBackForwardNavigationGestures={true}
          onMessage={(event) => {
            const data = event.nativeEvent.data;
            console.log("Message from web:", data);
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default App;
