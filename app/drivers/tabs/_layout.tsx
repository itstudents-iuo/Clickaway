import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

const TabBarButton = ({ accessibilityState, children, onPress }: any) => {
    const focused = accessibilityState.selected;

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withSpring(focused ? -20 : 0, { damping: 8 }) }],
        };
    });

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={styles.tabButtonContainer}
        >
            <Animated.View
                style={[
                    focused ? styles.activeIconContainer : styles.inactiveIconContainer,
                    animatedStyle,
                ]}
            >
                {children}
            </Animated.View>
        </TouchableOpacity>
    );
};

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    tabBarButton: (props) => <TabBarButton {...props} />,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="trip"
                options={{
                    tabBarButton: (props) => <TabBarButton {...props} />,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="car-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="earning"
                options={{
                    tabBarButton: (props) => <TabBarButton {...props} />,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="leaf-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarButton: (props) => <TabBarButton {...props} />,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TabBarButton
                        key={label}
                        accessibilityState={{ selected: isFocused }}
                        onPress={onPress}
                    >
                        {options.tabBarIcon
                            ? options.tabBarIcon({
                                color: isFocused ? '#FF6200' : '#94A3B8',
                                size: 24,
                                focused: isFocused,
                            })
                            : null}
                    </TabBarButton>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 45, // stick to very bottom
        left: 0,
        right: 0,
        width: '100%',
        elevation: 1,


    },
    tabButtonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    activeIconContainer: {
        borderWidth: 3, // thickness of the ring
        borderColor: '#ff6200', // ring color
        padding: 10, // space between icon and ring
        borderRadius: 50, // make it a perfect circle
        backgroundColor: '#fff', // optional background inside
        alignItems: 'center',
        justifyContent: 'center',
    },
    inactiveIconContainer: {
        backgroundColor: 'transparent',
        padding: 14,
        borderRadius: 35,
        color: '#000',
    },
});
