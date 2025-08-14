// app/login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* Animated Logo */}
            <Animatable.Image
                animation="bounceIn"
                duration={1500}
                source={require('../assets/images/react-logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Animatable.Text animation="fadeInUp" delay={300} style={styles.title}>
                Welcome to ClickAway
            </Animatable.Text>
            <Text style={styles.subtitle}>
                Log in to manage your ClickAway deliverables
            </Text>

            {/* Social Login Buttons */}
            <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="apple" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="google" size={20} color="#DB4437" />
                </TouchableOpacity>
            </View>

            <Text style={styles.orText}>or continue with email</Text>

            {/* Input Fields */}
            <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => router.push('/drivers')}
            >
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.policyText}>
                By signing up, you agree to our Privacy Policy
            </Text>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
        marginBottom: 20,
    },
    socialButton: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 50,
        elevation: 2,
    },
    orText: {
        textAlign: 'center',
        marginBottom: 15,
        color: '#999',
    },
    input: {
        height: 50,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
    },
    forgotButton: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotText: {
        color: '#007AFF',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#ff6200',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 2,
    },
    loginText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    policyText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 12,
        marginTop: 15,
    },
});
