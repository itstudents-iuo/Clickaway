import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import {
    FontAwesome,
    MaterialIcons,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
    const router = useRouter();

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentPadding} // ✅ Added padding for body
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.avatarWrapper}>
                        <Ionicons name="person-circle-outline" size={50} color="#fff" />
                    </View>
                    <View>
                        <Text style={styles.helloText}>Hello Cameron 👋</Text>
                        <Text style={styles.locationText}>New York, US</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.notificationButton}>
                    <FontAwesome name="bell" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Quick Actions */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.categoryRow}>
                <ActionButton
                    color="#FF9500"
                    icon={<MaterialIcons name="fastfood" size={34} color="#fff" />}
                    label="Foods"
                    count={2}
                    onPress={() => router.push("/vendors/product")}
                />
                <ActionButton
                    color="#34C759"
                    icon={<FontAwesome name="medkit" size={34} color="#fff" />}
                    label="Medicine"
                    count={2}
                    onPress={() => router.push("/vendors/product")}
                />
                <ActionButton
                    color="#AF52DE"
                    icon={<FontAwesome name="gift" size={34} color="#fff" />}
                    label="Packages"
                    count={5}
                    onPress={() => router.push("/vendors/product")}
                />
            </View>

            {/* Tabs */}
            <Text style={styles.sectionTitle}>Orders</Text>
            <View style={styles.tabRow}>
                <TabButton
                    icon={<MaterialIcons name="local-shipping" size={20} color="#fff" />}
                    label="Delivery"
                    count={10}
                />
                <TabButton
                    icon={<MaterialIcons name="archive" size={20} color="#fff" />}
                    label="Pickup"
                    count={5}
                />
                <TabButton
                    icon={<MaterialIcons name="replay" size={20} color="#fff" />}
                    label="Return"
                    count={2}
                />
            </View>

            {/* Orders List */}
            <OrderCard
                orderNo="LGY-013700"
                date="05-10-2020"
                name="Mr. Dorothy"
                distance="15 KM"
                category="Medicine"
                categoryColor="#34C759"
                icon={<FontAwesome name="medkit" size={20} color="#fff" />}
            />
            <OrderCard
                orderNo="PKG-045867"
                date="05-10-2020"
                name="Mrs. Lauren"
                distance="3 KM"
                category="Package"
                categoryColor="#FF2D55"
                icon={<FontAwesome name="gift" size={20} color="#fff" />}
            />
        </ScrollView>
    );
}

/* Reusable Components */
function ActionButton({ color, icon, label, count, onPress }) {
    return (
        <TouchableOpacity
            style={[styles.categoryButton, { backgroundColor: color }]}
            onPress={onPress}
        >
            {icon}
            <Text style={styles.categoryText}>{label}</Text>
            <Text style={styles.categoryCount}>{count} items</Text>
        </TouchableOpacity>
    );
}

function TabButton({ icon, label, count }) {
    return (
        <TouchableOpacity style={styles.tabButton}>
            {icon}
            <Text style={styles.tabText}>{`${label} (${count})`}</Text>
        </TouchableOpacity>
    );
}

function OrderCard({ orderNo, date, name, distance, category, categoryColor, icon }) {
    return (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>Order - {orderNo}</Text>
                <Text style={styles.orderDate}>{date}</Text>
            </View>
            <Text style={styles.customerName}>{name}</Text>
            <View style={styles.orderDetails}>
                <MaterialCommunityIcons name="map-marker" size={20} color="#0A84FF" />
                <Text style={styles.distanceText}>Pending - {distance}</Text>
            </View>
            <TouchableOpacity style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
                {icon}
                <Text style={styles.badgeText}>{category}</Text>
            </TouchableOpacity>
        </View>
    );
}

/* Styles */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F9FC",
    },
    contentPadding: {
        paddingBottom: 20,
        paddingHorizontal: 20, // ✅ added padding to body
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "#0A84FF",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatarWrapper: {
        marginRight: 10,
    },
    helloText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    locationText: {
        fontSize: 14,
        color: "#fff",
        opacity: 0.8,
    },
    notificationButton: {
        backgroundColor: "#FF3B30",
        padding: 8,
        borderRadius: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 15,
        color: "#333",
    },
    categoryRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    categoryButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 110,
        borderRadius: 15,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    categoryText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 5,
    },
    categoryCount: {
        color: "#fff",
        fontSize: 12,
        opacity: 0.8,
    },
    tabRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 15,
    },
    tabButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0A84FF",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    tabText: {
        color: "#fff",
        marginLeft: 6,
        fontSize: 14,
    },
    orderCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    orderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    orderNumber: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
    },
    orderDate: {
        fontSize: 14,
        color: "#999",
    },
    customerName: {
        fontSize: 15,
        marginVertical: 8,
        color: "#555",
    },
    orderDetails: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    distanceText: {
        fontSize: 14,
        marginLeft: 5,
        color: "#555",
    },
    categoryBadge: {
        flexDirection: "row",
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        alignItems: "center",
    },
    badgeText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 5,
    },
});
