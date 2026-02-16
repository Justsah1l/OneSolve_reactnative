import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, SafeAreaView } from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS, SIZES, FONTS } from '../utils/theme';
import api, { setAuthToken } from '../services/api';

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter both username and password');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('login/', { username, password });
            const { token, user_id } = response.data;
            setAuthToken(token);
            // Store token internally or context (skipping Redux for speed as user requested "make the same app" without specifying exact architecture, but usually Redux/Context is good. Simple variable or AsyncStorage is ok for demo)
            navigation.replace('MainTabs');
        } catch (error: any) {
            console.log(error);
            Alert.alert('Login Failed', error.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>ALL YOUR</Text>
                <Text style={[styles.title, styles.highlight]}>PROBLEMS <Text style={{ color: COLORS.black }}>ARE</Text></Text>
                <Text style={[styles.title, styles.highlight]}>SOLVED <Text style={{ color: COLORS.black }}>HERE</Text></Text>

                <Text style={styles.subtitle}>
                    Don't carry the burden of your problems alone. Let OneSolve assist you in resolving them.
                </Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <CustomButton
                        title="Login"
                        onPress={handleLogin}
                        isLoading={loading}
                        style={styles.button}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
    },
    content: {
        padding: SIZES.padding * 2,
    },
    title: {
        fontSize: 40,
        fontWeight: '900',
        color: '#333',
        textTransform: 'uppercase',
        marginBottom: 5,
        lineHeight: 45,
    },
    highlight: {
        color: COLORS.primary,
    },
    subtitle: {
        fontSize: SIZES.body,
        color: COLORS.textLight,
        marginTop: 20,
        marginBottom: 40,
        lineHeight: 22,
    },
    form: {
        width: '100%',
    },
    input: {
        backgroundColor: COLORS.inputBackground,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
    },
    button: {
        marginTop: 10,
    },
});

export default LoginScreen;
