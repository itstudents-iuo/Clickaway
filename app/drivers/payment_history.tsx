import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentHistoryScreen() {
    const transactions = [
        {
            id: "1",
            title: "Apple Store",
            date: "24-02-2025 20:12",
            amount: -73.58,
            icon: "cart-outline",
        },
        {
            id: "2",
            title: "Paypal",
            date: "24-02-2025 20:12",
            amount: -500.64,
            icon: "logo-paypal",
        },
        {
            id: "3",
            title: "Lunch",
            date: "24-02-2025 20:12",
            amount: -13.0,
            icon: "fast-food-outline",
        },
        {
            id: "4",
            title: "Cowrywise",
            date: "24-02-2025 20:12",
            amount: 234.05,
            icon: "wallet-outline",
        },
        {
            id: "5",
            title: "Bank of Africa",
            date: "24-02-2025 20:12",
            amount: 3733.85,
            icon: "business-outline",
        },
    ];

    const renderItem = ({ item }: any) => {
        const isCredit = item.amount > 0;
        return (
            <View style={styles.transactionRow}>
                <View style={styles.iconWrapper}>
                    <Ionicons name={item.icon} size={22} color="#FF6200" />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.transactionTitle}>{item.title}</Text>
                    <Text style={styles.transactionDate}>{item.date}</Text>
                </View>
                <Text
                    style={[
                        styles.amount,
                        { color: isCredit ? "#4CAF50" : "#E53935" },
                    ]}
                >
                    {isCredit ? "₦" : "-₦"}
                    {Math.abs(item.amount).toFixed(2)}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment History</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Transaction List */}
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    transactionRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff3e8",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: "500",
    },
    transactionDate: {
        fontSize: 12,
        color: "#999",
    },
    amount: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
