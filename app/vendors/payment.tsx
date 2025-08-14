import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import {router, useLocalSearchParams} from 'expo-router';

const PaymentScreen = () => {
    // Get params from URL/search
    const params = useLocalSearchParams();

    // Extract variables from params (all come as strings, so convert if needed)
    const fromLocation = params.fromLocation || '';
    const optionalPhone = params.optionalPhone || '';
    const productDescription = params.productDescription || '';
    const receiverName = params.receiverName || '';
    const receiverPhone = params.receiverPhone || '';
    const toLocation = params.toLocation || '';

    const driverId = params.driverId || '';
    const driverName = params.driverName || '';
    const driverVehicle = params.driverVehicle || '';
    const driverRoute = params.driverRoute || '';
    const driverStartTime = params.driverStartTime || '';
    const driverImage = params.driverImage || '';

    const amount = Number(params.amount) || 0;

    const [paymentMethod, setPaymentMethod] = useState('paystack');

    const handlePayPress = () => {
        Alert.alert(
            'Payment',
            `You are paying ₦${amount} to ${driverName} via ${paymentMethod.toUpperCase()}`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        const queryParams = new URLSearchParams({
                            fromLocation: toSingleString(fromLocation),
                            optionalPhone: toSingleString(optionalPhone),
                            productDescription: toSingleString(productDescription),
                            receiverName: toSingleString(receiverName),
                            receiverPhone: toSingleString(receiverPhone),
                            toLocation: toSingleString(toLocation),
                            driverId: toSingleString(driverId),
                            driverName: toSingleString(driverName),
                            driverVehicle: toSingleString(driverVehicle),
                            driverRoute: toSingleString(driverRoute),
                            driverStartTime: toSingleString(driverStartTime),
                            driverImage: toSingleString(driverImage),
                            amount: amount.toString(),
                            paymentMethod: paymentMethod,
                        });

                        router.push(`/vendors/payment_webview?${queryParams.toString()}`);
                    },
                },
            ],
            { cancelable: false }
        );


    };

    function toSingleString(param: string | string[] | undefined): string {
        if (Array.isArray(param)) {
            return param[0] ?? '';
        }
        return param ?? '';
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Details</Text>

            <View style={styles.driverInfo}>
                {driverImage ? (
                    <Image source={{ uri: driverImage }} style={styles.driverImage} />
                ) : null}
                <Text style={styles.driverName}>{driverName}</Text>
                <Text style={styles.driverDetails}>Vehicle: {driverVehicle}</Text>
                <Text style={styles.driverDetails}>Route: {driverRoute}</Text>
                <Text style={styles.driverDetails}>Starts at: {driverStartTime}</Text>
            </View>

            <Text style={styles.amountLabel}>Amount to Pay</Text>
            <Text style={styles.amount}>₦{amount.toLocaleString()}</Text>

            <Text style={styles.paymentMethodLabel}>Select Payment Method</Text>
            <View style={styles.radioGroup}>
                <View style={styles.radioItem}>
                    <RadioButton
                        value="paystack"
                        status={paymentMethod === 'paystack' ? 'checked' : 'unchecked'}
                        onPress={() => setPaymentMethod('paystack')}
                        color="#ff6200"
                    />
                    <Text style={styles.radioText}>Paystack</Text>
                </View>

                <View style={styles.radioItem}>
                    <RadioButton
                        value="flutterwave"
                        status={paymentMethod === 'flutterwave' ? 'checked' : 'unchecked'}
                        onPress={() => setPaymentMethod('flutterwave')}
                        color="#ff6200"
                    />
                    <Text style={styles.radioText}>Flutterwave</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.payButton} onPress={handlePayPress}>
                <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 25 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#ff6200', marginBottom: 30, textAlign: 'center' },
    driverInfo: { alignItems: 'center', marginBottom: 25 },
    driverImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#ff6200', marginBottom: 10 },
    driverName: { fontSize: 20, fontWeight: '600', color: '#1A2E44' },
    driverDetails: { fontSize: 14, color: '#666', marginTop: 3 },
    amountLabel: { fontSize: 16, color: '#666', marginBottom: 5, textAlign: 'center' },
    amount: { fontSize: 36, fontWeight: 'bold', color: '#ff6200', marginBottom: 30, textAlign: 'center' },
    paymentMethodLabel: { fontSize: 18, fontWeight: '600', marginBottom: 15, color: '#1A2E44' },
    radioGroup: { marginBottom: 40 },
    radioItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    radioText: { fontSize: 16, color: '#1A2E44' },
    payButton: { backgroundColor: '#ff6200', paddingVertical: 15, borderRadius: 8 },
    payButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
});

export default PaymentScreen;
