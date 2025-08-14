import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function WithdrawWalletScreen() {
    const [amount, setAmount] = useState("");
    const router = useRouter();

    const handleWithdraw = () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            Alert.alert("Invalid Amount", "Please enter a valid withdrawal amount.");
            return;
        }
        // API call or navigation here
        Alert.alert("Request Sent", `You have requested ₦${amount} from your wallet.`);
        router.back(); // Go back to wallet screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Withdraw from Wallet</Text>
            <Text style={styles.subtitle}>Enter the amount you want to withdraw</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.currency}>₦</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <TouchableOpacity style={styles.withdrawBtn} onPress={handleWithdraw}>
                <Ionicons name="cash-outline" size={18} color="#fff" />
                <Text style={styles.withdrawText}>Request Withdrawal</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => router.back()}
            >
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 20,
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 20,
    },
    currency: {
        fontSize: 20,
        fontWeight: "600",
        color: "#FF6200",
    },
    input: {
        flex: 1,
        fontSize: 20,
        padding: 12,
        color: "#000",
    },
    withdrawBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF6200",
        padding: 14,
        borderRadius: 8,
        marginTop: 10,
    },
    withdrawText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 6,
    },
    cancelBtn: {
        marginTop: 14,
        alignItems: "center",
    },
    cancelText: {
        color: "#999",
        fontSize: 14,
    },
});
