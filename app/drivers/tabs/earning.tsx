import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function WalletScreen() {
    const router = useRouter();

    const transactions = [
        { id: "1", title: "Apple Store", amount: -73.58, date: "24-02 20:12" },
        { id: "2", title: "Paypal", amount: -500.64, date: "24-02 20:12" },
        { id: "3", title: "Lunch", amount: -13.0, date: "24-02 20:12" },
        { id: "4", title: "Cowrywise", amount: 234.05, date: "24-02 20:12" },
        { id: "5", title: "Bank of Africa", amount: -3733.85, date: "24-02 20:12" },
    ];

    const renderTransaction = ({ item }: any) => (
        <View style={styles.transactionRow}>
            <Ionicons name="card-outline" size={22} color="#444" />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
            <Text
                style={[
                    styles.transactionAmount,
                    { color: item.amount < 0 ? "#ff3b30" : "#4cd964" },
                ]}
            >
                ₦{Math.abs(item.amount).toFixed(2)}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Balance Card */}
            <View style={styles.card}>
                <View>
                    <Text style={styles.cardLabel}>Current balance</Text>
                    <Text style={styles.cardBalance}>₦5,477.85</Text>
                </View>
                <Text style={styles.cardCurrency}>NGN</Text>
            </View>

            {/* Withdraw Button */}
            <TouchableOpacity
                style={styles.withdrawBtn}
                onPress={() => router.push("../withdraw-wallet")}
            >
                <Ionicons name="cash-outline" size={18} color="#fff" />
                <Text style={styles.withdrawText}>Withdraw from Wallet</Text>
            </TouchableOpacity>

            {/* Transaction List */}
            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingTop: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    card: {
        backgroundColor: "#FF9500",
        borderRadius: 12,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardLabel: {
        color: "#fff",
        fontSize: 14,
        opacity: 0.9,
    },
    cardBalance: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 4,
    },
    cardCurrency: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    withdrawBtn: {
        marginTop: 16,
        backgroundColor: "#FF6200",
        padding: 14,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    withdrawText: {
        color: "#fff",
        fontWeight: "600",
        marginLeft: 8,
    },
    transactionRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: "500",
    },
    transactionDate: {
        fontSize: 12,
        color: "#999",
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: "600",
    },
});
