import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
      <StatusBar barStyle="light-content" />
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
          allowsBackForwardNavigationGestures={true}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onMessage={(event) => {
            const data = event.nativeEvent.data;
            console.log("Message from web:", data);
          }}
        />

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  webview: {
    flex: 1,
    backgroundColor: "#000000",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
