import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { RadioButton } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

const PaymentScreen = () => {
    const params = useLocalSearchParams();

    const {
        productDescription = '',
        fromLocation = '',
        toLocation = '',
        receiverName = '',
        receiverPhone = '',
        optionalPhone = '',
        driverId = '',
        driverName = '',
        driverVehicle = '',
        driverRoute = '',
        driverStartTime = '',
        driverImage = '',
        amount = '0',
        email = 'customer@example.com',
    } = params;

    const numericAmount = Number(amount);
    const [paymentMethod, setPaymentMethod] = useState('paystack'); // default to paystack
    const [showWebView, setShowWebView] = useState(false);
    const [loading, setLoading] = useState(true); // start loading right away

    const amountInKobo = numericAmount * 100;

    // Build Paystack HTML string
    const paystackHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://js.paystack.co/v2/inline.js"></script>
      </head>
      <body>
        <script>
          const handler = PaystackPop.setup({
            key: "pk_test_xxxx", // replace with your key
            email: "${email}",
            amount: ${amountInKobo},
            metadata: {
              custom_fields: [
                { display_name: "Product Description", value: "${productDescription}" },
                { display_name: "From Location", value: "${fromLocation}" },
                { display_name: "To Location", value: "${toLocation}" },
                { display_name: "Receiver Name", value: "${receiverName}" },
                { display_name: "Receiver Phone", value: "${receiverPhone}" },
                { display_name: "Optional Phone", value: "${optionalPhone}" },
                { display_name: "Driver ID", value: "${driverId}" },
                { display_name: "Driver Vehicle", value: "${driverVehicle}" },
                { display_name: "Driver Route", value: "${driverRoute}" },
                { display_name: "Driver Start Time", value: "${driverStartTime}" }
              ]
            },
            onClose: function() {
              window.ReactNativeWebView.postMessage('cancelled');
            },
            callback: function(response) {
              window.ReactNativeWebView.postMessage('success:' + response.reference);
            }
          });
          handler.openIframe();
        </script>
      </body>
    </html>
  `;

    // Build Flutterwave HTML string
    const flutterwaveHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://checkout.flutterwave.com/v3.js"></script>
      </head>
      <body>
        <script>
          FlutterwaveCheckout({
            public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxxxxxx-X", // replace with your key
            tx_ref: "rider_pay_" + Date.now(),
            amount: ${numericAmount},
            currency: "NGN",
            payment_options: "card,ussd",
            customer: {
              email: "${email}",
              phonenumber: "${receiverPhone}",
              name: "${receiverName}",
            },
            customizations: {
              title: "Payment for Delivery",
              description: "${productDescription}",
              logo: "https://yourlogo.url/logo.png"
            },
            callback: function(data) {
              window.ReactNativeWebView.postMessage('success:' + data.transaction_id);
            },
            onclose: function() {
              window.ReactNativeWebView.postMessage('cancelled');
            }
          });
        </script>
      </body>
    </html>
  `;

    useEffect(() => {
        setShowWebView(true); // show modal & webview immediately on mount
    }, []);

    const onMessage = (event) => {
        const message = event.nativeEvent.data;
        setLoading(false);
        if (message === 'cancelled') {
            Alert.alert('Payment Cancelled');
            setShowWebView(false);
        } else if (message.startsWith('success:')) {
            const reference = message.split(':')[1];
            Alert.alert('Payment Successful', `Reference: ${reference}`);
            setShowWebView(false);
            // TODO: post-payment logic
        }
    };

    return (
        <View style={styles.container}>


            {loading && (
                <ActivityIndicator size="large" color="#ff6200" style={{ marginTop: 20 }} />

            )}
            <Text style={styles.header}>Loading... please wait</Text>

            <Modal visible={showWebView} animationType="slide" onRequestClose={() => setShowWebView(false)}>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: paymentMethod === 'paystack' ? paystackHtml : flutterwaveHtml }}
                    onMessage={onMessage}
                    javaScriptEnabled
                    startInLoadingState
                    style={{ flex: 1 }}
                />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    driverInfo: { fontSize: 18, marginBottom: 10 },
    amount: { fontSize: 18, marginBottom: 30 },
    paymentMethods: { marginBottom: 20 },
    radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    radioLabel: { fontSize: 16 },
});

export default PaymentScreen;
