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
