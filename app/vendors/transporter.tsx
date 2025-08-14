import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const driversData = [
    {
        id: '1',
        name: 'John Doe',
        vehicle: 'Toyota Corolla - White',
        route: 'Serena Driver',
        startTime: '8:00 AM',
        imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: '2',
        name: 'Jane Smith',
        vehicle: 'Honda Civic - Black',
        route: 'Oldboys Route',
        startTime: '9:00 AM',
        imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        id: '3',
        name: 'Mike Johnson',
        vehicle: 'Ford Ranger - Blue',
        route: 'Amazon Route',
        startTime: '7:30 AM',
        imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
];

const DriverSelectionScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();

    // `params` contains all the delivery form info passed from previous screen
    // Destructure to variables for easier reference
    const {
        fromLocation,
        optionalPhone,
        productDescription,
        receiverName,
        receiverPhone,
        toLocation,
    } = params;

    const handleDriverSelect = (driver) => {
        console.log(driver.id)
        // Combine delivery info + driver info
        // Then when driver selected:
        const dataToSend = {
            fromLocation,
            optionalPhone,
            productDescription,
            receiverName,
            receiverPhone,
            toLocation,
            driverId: driver.id,
            driverName: driver.name,
            driverVehicle: driver.vehicle,
            driverRoute: driver.route,
            driverStartTime: driver.startTime,
            driverImage: driver.imageUrl,
            amount: "800",
        };

        router.push({
            pathname: '/vendors/payment', // Adjust your payment screen route
            params: dataToSend,
        });
        console.log(receiverName);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.driverItem}
            onPress={() => handleDriverSelect(item)}
        >
            <View style={styles.imageRing}>
                <Image source={{ uri: item.imageUrl }} style={styles.driverImage} />
            </View>
            <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{item.name}</Text>
                <Text style={styles.driverDetails}>Vehicle: {item.vehicle}</Text>
                <Text style={styles.driverDetails}>Route: {item.route}</Text>
                <Text style={styles.driverDetails}>Start Time: {item.startTime}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select Your Driver</Text>
            <FlatList
                data={driversData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ff6200',
        marginBottom: 15,
        textAlign: 'center',
    },
    driverItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingBottom: 15,
    },
    imageRing: {
        borderWidth: 3,
        borderColor: '#ff6200',
        borderRadius: 40,
        padding: 2,
        marginRight: 15,
    },
    driverImage: {
        width: 50,
        height: 50,
        borderRadius: 35,
    },
    driverInfo: {
        flex: 1,
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A2E44',
    },
    driverDetails: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
});

export default DriverSelectionScreen;
