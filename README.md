# Clickaway
ClickAway is a mobile-first delivery platform tailored exclusively for the Igbinedion University Okada community. Built to bridge the gap between students and essential campus services, ClickAway enables a seamless way to order food, everyday items, and academic essentials—delivered right to your dorm or study spot. Developed by Igbinedion University Okada Industrial Training Students 2024/2025 Set as a partial requirement for the completion of the Industrial Training Exercise at the department of Information and Communication Technology (ICT) Igbinedion Uiniversity Okada, Edo State.

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

# ClickAway User Selection Screen
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function AddRefrigerator() {
    const router = useRouter();

    const HEADER_HEIGHT = Math.round(height * 0.34);
    const POCKET_WIDTH = Math.round(width * 0.62);
    const POCKET_HEIGHT = Math.round(HEADER_HEIGHT * 0.45);
    const ICON_SIZE = Math.round(POCKET_HEIGHT * 0.6);

    return (
        <View style={styles.container}>
            {/* Orange header */}
            <View style={[styles.header, { height: HEADER_HEIGHT }]}>
                <Text style={styles.headerTitle}>Let's add you to </Text>
                <Text style={styles.headerSubtitle}>Click Away</Text>

                {/* White curve pocket */}
                <View
                    style={[
                        styles.pocket,
                        {
                            width: POCKET_WIDTH,
                            height: POCKET_HEIGHT,
                            borderRadius: POCKET_HEIGHT / 2,
                            bottom: -POCKET_HEIGHT / 2,
                            left: (width - POCKET_WIDTH) / 2,
                        },
                    ]}
                >
                    {/* App logo perfectly centered */}
                    <Image
                        source={require("../assets/images/react-logo.png")} // Change path to your actual logo file
                        style={{
                            width: ICON_SIZE,
                            height: ICON_SIZE,
                            resizeMode: "contain",
                        }}
                    />
                </View>
            </View>

            {/* Small description */}
            <Text style={styles.infoText}>
                Login to your account to start a great day!!!s
            </Text>

            {/* Vendor Login Button */}
            <TouchableOpacity
                style={styles.qrButton}
                onPress={() => router.push("/VendorLoginActivity")}
            >
                <Text style={styles.qrButtonText}>Vendor's Login</Text>
            </TouchableOpacity>

            {/* Driver Login Button */}
            <TouchableOpacity
                style={styles.searchButton}
                onPress={() => router.push("/DriverLoginActivity")}
            >
                <Text style={styles.searchButtonText}>Driver's Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const ORANGE = "#f25b27";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    header: {
        width: "100%",
        backgroundColor: ORANGE,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: Platform.OS === "ios" ? 60 : 40,
        paddingBottom: 24,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: "relative",
        overflow: "visible",
    },
    headerTitle: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "400",
        marginTop: 6,
    },
    headerSubtitle: {
        fontSize: 26,
        color: "#fff",
        fontWeight: "700",
        marginTop: 6,
    },
    pocket: {
        position: "absolute",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 0,
    },
    infoText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginTop: 80,
        width: width * 0.82,
    },
    qrButton: {
        width: width * 0.82,
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: ORANGE,
        alignItems: "center",
        marginTop: 26,
        backgroundColor: "#fff",
    },
    qrButtonText: {
        color: ORANGE,
        fontSize: 16,
        fontWeight: "600",
    },
    searchButton: {
        width: width * 0.82,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: ORANGE,
        alignItems: "center",
        marginTop: 12,
    },
    searchButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
# contact and support
Have questions or feedback?  
📧 Email:  itstudents@iuokada.edu.ng
📍 Location: Igbinedion University Okada
