import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { TextInput, Button, Title, HelperText, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import {router} from "expo-router";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#ff6200',
        text: '#000000',          // input text black
        placeholder: '#999999',   // placeholder grey
        background: '#fff',
    },
};

const DeliveryFormScreen = () => {
    const [productDescription, setProductDescription] = useState('');
    const [fromLocation, setFromLocation] = useState('serena');
    const [customFrom, setCustomFrom] = useState('');
    const [toLocation, setToLocation] = useState('serena');
    const [customTo, setCustomTo] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [optionalPhone, setOptionalPhone] = useState('');

    const locations = ['serena', 'oldboys', 'amazon', 'newboys', 'others'];

    const validatePhone = (phone) => phone.length > 9 && /^\d+$/.test(phone);

    const isFormValid = () => {
        if (!productDescription.trim()) return false;
        if (!receiverName.trim()) return false;
        if (!validatePhone(receiverPhone)) return false;
        if (fromLocation === 'others' && !customFrom.trim()) return false;
        if (toLocation === 'others' && !customTo.trim()) return false;
        return true;
    };

    const handleContinue = () => {
        console.log('Form Data:', {
            productDescription,
            fromLocation: fromLocation === 'others' ? customFrom : fromLocation,
            toLocation: toLocation === 'others' ? customTo : toLocation,
            receiverName,
            receiverPhone,
            optionalPhone,
        });

        router.push({
            pathname: "/vendors/transporter",
            params: {
                productDescription,
                fromLocation: fromLocation === "others" ? customFrom : fromLocation,
                toLocation: toLocation === "others" ? customTo : toLocation,
                receiverName,
                receiverPhone,
                optionalPhone,
            },
        });
    };

    return (
        <PaperProvider theme={theme}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Title style={styles.header}>Delivery Information</Title>

                    {/* Product Description */}
                    <TextInput
                        label="Product Description"
                        mode="outlined"
                        multiline
                        numberOfLines={5}
                        value={productDescription}
                        onChangeText={setProductDescription}
                        style={styles.input}
                        outlineColor="#D3DCE6"
                        activeOutlineColor="#ff6200"
                    />
                    <HelperText type="info" visible={!productDescription} style={styles.helperText}>
                        Please provide a brief description of the product.
                    </HelperText>

                    {/* From Location */}
                    <View style={styles.labelContainer}>
                        <Title style={styles.label}>From Location</Title>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={fromLocation}
                            onValueChange={setFromLocation}
                            style={styles.picker}
                        >
                            {locations.map((loc) => (
                                <Picker.Item
                                    key={loc}
                                    label={loc.charAt(0).toUpperCase() + loc.slice(1)}
                                    value={loc}
                                    color="#333"
                                />
                            ))}
                        </Picker>
                    </View>
                    {fromLocation === 'others' && (
                        <TextInput
                            label="Custom From Address"
                            mode="outlined"
                            value={customFrom}
                            onChangeText={setCustomFrom}
                            style={styles.input}
                            outlineColor="#D3DCE6"
                            activeOutlineColor="#ff6200"
                        />
                    )}

                    {/* To Location */}
                    <View style={styles.labelContainer}>
                        <Title style={styles.label}>To Location</Title>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={toLocation}
                            onValueChange={setToLocation}
                            style={styles.picker}
                        >
                            {locations.map((loc) => (
                                <Picker.Item
                                    key={loc}
                                    label={loc.charAt(0).toUpperCase() + loc.slice(1)}
                                    value={loc}
                                    color="#333"
                                />
                            ))}
                        </Picker>
                    </View>
                    {toLocation === 'others' && (
                        <TextInput
                            label="Custom To Address"
                            mode="outlined"
                            value={customTo}
                            onChangeText={setCustomTo}
                            style={styles.input}
                            outlineColor="#D3DCE6"
                            activeOutlineColor="#ff6200"
                        />
                    )}

                    {/* Receiver Name */}
                    <TextInput
                        label="Receiver Name"
                        mode="outlined"
                        value={receiverName}
                        onChangeText={setReceiverName}
                        style={styles.input}
                        outlineColor="#D3DCE6"
                        activeOutlineColor="#ff6200"
                    />
                    <HelperText type="error" visible={!receiverName} style={styles.helperText}>
                        Receiver name is required.
                    </HelperText>

                    {/* Receiver Phone */}
                    <TextInput
                        label="Receiver Phone Number"
                        mode="outlined"
                        value={receiverPhone}
                        onChangeText={setReceiverPhone}
                        keyboardType="phone-pad"
                        style={styles.input}
                        outlineColor="#D3DCE6"
                        activeOutlineColor="#ff6200"
                    />
                    <HelperText type="error" visible={!validatePhone(receiverPhone) && receiverPhone} style={styles.helperText}>
                        Please enter a valid phone number (10+ digits).
                    </HelperText>

                    {/* Optional Phone */}
                    <TextInput
                        label="Optional Phone Number"
                        mode="outlined"
                        value={optionalPhone}
                        onChangeText={setOptionalPhone}
                        keyboardType="phone-pad"
                        style={styles.input}
                        outlineColor="#D3DCE6"
                        activeOutlineColor="#ff6200"
                    />
                    <HelperText type="info" visible={optionalPhone && !validatePhone(optionalPhone)} style={styles.helperText}>
                        Optional, enter a valid phone number if needed.
                    </HelperText>

                    {/* Submit Button */}
                    <Button
                        mode="contained"
                        onPress={handleContinue}
                        style={styles.button}
                        contentStyle={{ paddingVertical: 14 }}
                        labelStyle={{ fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase' }}
                        disabled={!isFormValid()}
                    >
                        Submit Delivery
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 25,
        textAlign: 'center',
        color: '#1A2E44',
    },
    labelContainer: {
        marginTop: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A2E44',
        marginBottom: 8,
    },
    input: {
        marginBottom: 5,
        backgroundColor: '#fff',
        color: '#000',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#D3DCE6',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
    },
    button: {
        backgroundColor: '#ff6200',
        marginTop: 30,
        borderRadius: 8,
        elevation: 3,
    },
    helperText: {
        fontSize: 12,
        marginBottom: 10,
    },
});

export default DeliveryFormScreen;
