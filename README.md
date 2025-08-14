# Clickaway
ClickAway is a mobile-first delivery platform tailored exclusively for the Igbinedion University Okada community. Built to bridge the gap between students and essential campus services, ClickAway enables a seamless way to order food, everyday items, and academic essentials—delivered right to your dorm or study spot.
<img width="243" height="248" alt="logo2" src="https://github.com/user-attachments/assets/8d67d1ee-7af7-4c80-9ce6-76f999fe4f6c" />

# app features 
- *Food Delivery* – Order meals from campus cafeterias and nearby restaurants with real-time tracking.
- *Groceries* – Shop for snacks, beverages, and everyday essentials without leaving your dorm.
- *Coffee & Beverages* – Get your favorite drinks delivered during study sessions.
- *Academic Supplies* – Request books, stationery, and other school essentials right to your spot.
- *Fast Campus Delivery* – All orders delivered directly to your dorm or study area within minutes.

 # how it works
 1. *Browse* – Open the Clickaway app and explore food, groceries, and essentials.
2. *Order* – Add items to your cart and confirm your order.
3. *Track* – Watch your delivery progress in real time.
4. *Receive* – Get your order delivered directly to your dorm or study spot.

 # installation 
 Clickaway is available for both *iOS* and *Android* devices.  
[Download on the App Store](#) | [Get it on Google Play](#)
# ClickAway Splash Screen
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
# contact and support
Have questions or feedback?  
📧 Email:  itstudents@iuokada.edu.ng
📍 Location: Igbinedion University Okada
