import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
    Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const router = useRouter();
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();


        // Navigate after 3 seconds
        const timer = setTimeout(() => {
            router.replace("/LoginActivity"); // Go to LoginActivity
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            {/* Ripple Animation Circle */}
            <Animated.View
                style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}
            />

            {/* Logo + Text in the Center */}
            <View style={styles.centerContent}>
                <Image
                    source={require("../assets/images/splash-icon.png")} // local image
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.searchText}>Searching...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f25b27", // same orange tone as splash
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        position: "absolute",
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: "rgba(255,255,255,0.1)",
    },
    centerContent: {
        alignItems: "center",
        zIndex: 2,
    },
    logo: {
        width: 150,
        height: 150,
    },
    searchText: {
        fontSize: 16,
        color: "#fff",
        marginTop: 10,
    },
});
