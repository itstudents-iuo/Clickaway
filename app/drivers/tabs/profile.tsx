import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function DriverProfileEditScreen() {
    const [firstName, setFirstName] = useState("Dominic");
    const [lastName, setLastName] = useState("Charles");
    const [phone, setPhone] = useState("+1 123 456 7890");
    const [image, setImage] = useState(
        "https://randomuser.me/api/portraits/men/32.jpg"
    );

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const saveProfile = () => {
        Alert.alert("Profile Updated", "Your profile information has been saved.");
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backBtn}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            {/* Profile Picture */}
            <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
                <Image source={{ uri: image }} style={styles.profileImage} />
                <View style={styles.cameraIcon}>
                    <Ionicons name="camera-outline" size={16} color="#fff" />
                </View>
            </TouchableOpacity>

            {/* Name Fields */}
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />

            {/* Phone Number */}
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
                <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    backBtn: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 1,
    },
    imageWrapper: {
        alignSelf: "center",
        position: "relative",
        marginBottom: 20,
    },
    profileImage: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 2,
        borderColor: "#eee",
    },
    cameraIcon: {
        position: "absolute",
        bottom: 4,
        right: 4,
        backgroundColor: "#FF6200",
        padding: 5,
        borderRadius: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 14,
    },
    saveBtn: {
        backgroundColor: "#FF6200",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    saveText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
