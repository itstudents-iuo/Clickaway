import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TimelineScreen() {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const orders = [
        {
            id: "1",
            product: "Fresh Apples",
            from: "Warehouse A",
            to: "123 Main St, New York",
            receiverName: "Megan Weaver",
            receiverPhone: "+1 234 567 890",
            receiverAltPhone: "+1 987 654 321",
            status: "Ongoing",
            image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
        },
        {
            id: "2",
            product: "Office Chairs",
            from: "Storehouse B",
            to: "45 Park Ave, San Francisco",
            receiverName: "John Smith",
            receiverPhone: "+1 555 123 456",
            receiverAltPhone: "",
            status: "Delivered",
            image: "https://images.unsplash.com/photo-1582582428884-2f36bdbd84c4",
        },
    ];

    return (
        <ScrollView style={styles.container}>
            {orders.map((order) => (
                <View key={order.id} style={styles.orderContainer}>
                    {/* Order Summary */}
                    <TouchableOpacity
                        style={styles.orderCard}
                        onPress={() =>
                            setExpandedOrder(expandedOrder === order.id ? null : order.id)
                        }
                    >
                        <View style={styles.addressRow}>
                            <Ionicons name="location-outline" size={22} color="#FF6200" />
                            <Text style={styles.addressText}>{order.to}</Text>
                            <Ionicons
                                name={expandedOrder === order.id ? "chevron-up" : "chevron-down"}
                                size={20}
                                color="#FF6200"
                            />
                        </View>
                        <Text style={styles.statusText}>Status: {order.status}</Text>
                    </TouchableOpacity>

                    {/* Expanded Order Details */}
                    {expandedOrder === order.id && (
                        <View style={styles.detailsContainer}>
                            {/* Trip Info */}
                            <View style={styles.customerInfo}>
                                <Text style={styles.infoText}>Product: {order.product}</Text>
                                <Text style={styles.infoText}>From: {order.from}</Text>
                                <Text style={styles.infoText}>To: {order.to}</Text>
                                <Text style={styles.infoText}>
                                    Receiver: {order.receiverName}
                                </Text>
                                <Text style={styles.infoText}>
                                    Phone: {order.receiverPhone}
                                </Text>
                                {order.receiverAltPhone ? (
                                    <Text style={styles.infoText}>
                                        Alt Phone: {order.receiverAltPhone}
                                    </Text>
                                ) : null}
                            </View>

                            {/* Product Image */}
                            <View style={styles.productRow}>
                                <Image source={{ uri: order.image }} style={styles.productImage} />
                            </View>
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    orderContainer: {
        marginBottom: 16,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#fff",
        elevation: 2,
    },
    orderCard: {
        padding: 16,
        backgroundColor: "#fff",
        flexDirection: "column",
    },
    addressRow: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    addressText: {
        flex: 1,
        marginHorizontal: 8,
        fontSize: 16,
        fontWeight: "500",
    },
    statusText: {
        marginTop: 6,
        fontSize: 14,
        color: "#666",
    },
    detailsContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    customerInfo: {
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        marginBottom: 4,
        color: "#444",
    },
    productRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    productImage: {
        width: "100%",
        height: 160,
        borderRadius: 6,
    },
});
