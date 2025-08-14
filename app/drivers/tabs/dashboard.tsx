import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Svg, Polyline } from 'react-native-svg';
import * as NavigationBar from "expo-navigation-bar";

export default function DashboardScreen() {
    // Disable edge-to-edge
    NavigationBar.setPositionAsync("absolute");

    // Set nav bar background color
    NavigationBar.setBackgroundColorAsync("#000"); // black
    // Optional: set button icons to light so they're visible
    NavigationBar.setButtonStyleAsync("light");

    const chartPoints = [10, 40, 25, 60, 45, 70, 30];
    const maxY = Math.max(...chartPoints);
    const width = 200;
    const height = 100;
    const stepX = width / (chartPoints.length - 1);

    const pointsString = chartPoints
        .map((p, i) => `${i * stepX},${height - (p / maxY) * height}`)
        .join(' ');

    const sections = [
        { id: 'balance', render: renderBalanceCard },
        { id: 'wallet', render: renderWalletCard },
        { id: 'ongoing', render: renderOngoingTrip },
        { id: 'upcoming', render: renderUpcomingTrips },
        { id: 'previous', render: () => renderPreviousTrips(pointsString, height, width) },
    ];

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <FlatList
                data={sections}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => item.render()}
                contentContainerStyle={{ paddingBottom: 120 }} // space for tab bar
                showsVerticalScrollIndicator={false}
                bounces={true}
            />
        </SafeAreaView>
    );
}

function renderBalanceCard() {
    return (
        <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total</Text>
            <Text style={styles.balanceAmount}>₦249,210.00</Text>
            <View style={styles.statsRow}>
                <View style={styles.statChip}>
                    <Ionicons name="car-outline" size={16} color="#0066FF" />
                    <Text style={styles.statText}>14 Rides</Text>
                </View>
                <View style={styles.statChip}>
                    <Ionicons name="time-outline" size={16} color="#0066FF" />
                    <Text style={styles.statText}>27h 48m</Text>
                </View>
            </View>
        </View>
    );
}

function renderWalletCard() {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Wallet Balance</Text>
            <View style={styles.rowBetween}>
                <Text style={styles.cardAmount}>₦1,291</Text>
                <Pressable>
                    <Text style={styles.linkText}>Payment History</Text>
                </Pressable>
            </View>
        </View>
    );
}

function renderOngoingTrip() {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Ongoing Trip</Text>
            <View style={styles.tripRow}>
                <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                    style={styles.avatar}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.tripName}>Megan Weaver</Text>
                    <Text style={styles.tripSub}>4.8 ★</Text>
                </View>
                <Pressable style={styles.navigateBtn}>
                    <Ionicons name="navigate-outline" size={18} color="#fff" />
                    <Text style={styles.navigateText}>Navigate</Text>
                </Pressable>
            </View>
        </View>
    );
}

function renderUpcomingTrips() {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Upcoming Trips (3)</Text>
            <Text style={styles.subText}>No upcoming trips</Text>
        </View>
    );
}

function renderPreviousTrips(pointsString: string, height: number, width: number) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Previous Trips</Text>
            <Svg height={height} width={width} style={{ marginTop: 8 }}>
                <Polyline
                    points={pointsString}
                    fill="none"
                    stroke="#0066FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8FAFC' },

    balanceCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    balanceLabel: { color: '#64748B', fontSize: 14 },
    balanceAmount: { fontSize: 32, fontWeight: '700', color: '#0F172A', marginVertical: 4 },
    statsRow: { flexDirection: 'row', marginTop: 10, gap: 10 },
    statChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 4,
    },
    statText: { color: '#0066FF', fontWeight: '500' },

    card: {
        backgroundColor: '#fff',
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    cardTitle: { fontSize: 16, fontWeight: '600', color: '#0F172A' },
    cardAmount: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    linkText: { color: '#0066FF', fontWeight: '500' },

    tripRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 },
    avatar: { width: 48, height: 48, borderRadius: 24 },
    tripName: { fontSize: 16, fontWeight: '600', color: '#0F172A' },
    tripSub: { fontSize: 14, color: '#64748B' },

    navigateBtn: {
        backgroundColor: '#0066FF',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    navigateText: { color: '#fff', fontWeight: '500', fontSize: 14 },

    subText: { fontSize: 14, color: '#94A3B8', marginTop: 6 },
});
