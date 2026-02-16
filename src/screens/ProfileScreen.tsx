import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }: any) => {
    // Dummy data for now
    const user = {
        name: 'ganpatibappa',
        email: 'sahilbomble.097@gmail.com',
        image: 'https://via.placeholder.com/150', // Replace with actual image source or asset if available
    };

    const menuItems = [
        { icon: 'person', label: 'Update profile', onPress: () => { } },
        { icon: 'article', label: 'Your posts', onPress: () => { } },
        { icon: 'delete', label: 'Delete profile', onPress: () => { }, color: COLORS.primary },
        { icon: 'privacy-tip', label: 'Privacy Policy', onPress: () => { } },
        { icon: 'logout', label: 'Logout', onPress: () => navigation.replace('AuthStack'), color: COLORS.primary },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>PROFILE</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.profileSection}>
                <Image source={{ uri: user.image }} style={styles.profileImage} />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>

            <View style={styles.menuSection}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={item.onPress}
                    >
                        <Icon name={item.icon} size={24} color={item.color || COLORS.primary} style={styles.menuIcon} />
                        <Text style={styles.menuLabel}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.padding,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'uppercase',
    },
    profileSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    name: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    email: {
        fontSize: SIZES.body,
        color: COLORS.textLight,
    },
    menuSection: {
        padding: SIZES.padding,
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    menuIcon: {
        marginRight: 15,
    },
    menuLabel: {
        fontSize: SIZES.body,
        fontWeight: '500',
        color: COLORS.black,
    },
});

export default ProfileScreen;
