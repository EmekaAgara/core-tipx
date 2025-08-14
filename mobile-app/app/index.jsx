import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import { Video } from "expo-av";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

const slides = [
  {
    id: "1",
    title: "Send Tips in CORE",
    description:
      "Easily send and receive tips in wCORE to your favorite creators",
  },
  {
    id: "2",
    title: "Create Fundraisers",
    description:
      "Set up fundraisers with specific goals and share with your community",
  },
  {
    id: "3",
    title: "Connect Your Wallet",
    description:
      "Securely connect your Core wallet to start tipping and receiving",
  },
];

export default function SplashScreenComponent() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const videoRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/(tabs)");
      SplashScreen.hideAsync();
    }
  };

  const skipToApp = () => {
    router.replace("/(tabs)");
    SplashScreen.hideAsync();
  };

  return (
    <View style={styles.container}>
      {/* Video Background */}
      <Video
        ref={videoRef}
        source={require("../assets/images/splash.mp4")}
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />

      {/* Overlay */}
      <View style={styles.overlay} />

      {/* App Logo at the top */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Slides with text at the bottom */}
      <Animated.FlatList
        data={slides}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      {/* Pagination */}
      {/* <View style={styles.pagination}>
        {slides.map((_, i) => {
          const inputRange = [
            (i - 1) * Dimensions.get("window").width,
            i * Dimensions.get("window").width,
            (i + 1) * Dimensions.get("window").width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[styles.dot, { width: dotWidth, opacity }]}
              key={i.toString()}
            />
          );
        })}
      </View> */}

      {/* Buttons - Next on top, Get Started below */}
      <View style={styles.buttonsContainer}>
        <>
          <TouchableOpacity style={styles.skipButton} onPress={scrollTo}>
            <Text style={styles.skipText}>Next</Text>
          </TouchableOpacity>
        </>
        <>
          <TouchableOpacity style={styles.fullWidthButton} onPress={skipToApp}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  logoContainer: {
    marginTop: 60,
    alignItems: "center",
    zIndex: 1,
  },
  logo: {
    width: 50,
    height: 50,
  },
  slide: {
    width: Dimensions.get("window").width,
    justifyContent: "flex-end",
    paddingBottom: 2,
  },
  textContainer: {
    paddingHorizontal: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "semibold",
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 165,
    alignSelf: "center",
  },
  dot: {
    height: 4,
    borderRadius: 5,
    backgroundColor: "#6200ee",
    marginHorizontal: 5,
  },
  buttonsContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  fullWidthButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 20,
    borderRadius: 5,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  skipButton: {
    padding: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#6200ee",
    paddingVertical: 20,
    borderRadius: 5,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  skipText: {
    color: "white",
    fontSize: 16,
  },
});
