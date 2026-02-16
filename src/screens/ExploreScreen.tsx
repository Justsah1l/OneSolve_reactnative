import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/theme';
import PostCard from '../components/PostCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';

interface Post {
    id: number;
    author_name: string;
    post_type: string;
    title: string;
    description: string;
    image: string | null;
}

const ExploreScreen = ({ navigation }: any) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            // Mock data if API fails or is empty for demo
            // const response = await api.get('posts/');
            // setPosts(response.data);
            const dummyPosts = [
                {
                    id: 1,
                    author_name: 'sahil',
                    post_type: 'Other',
                    title: 'new post',
                    description: 'Online Aptitude and technical Test on 15th April 2026\nWe offer a gross compensation package...',
                    image: null // Add dummy image URL if needed
                },
                {
                    id: 2,
                    author_name: 'sahil',
                    post_type: 'Health & Wellness',
                    title: 'health issues help',
                    description: 'new post',
                    image: null
                },
                {
                    id: 3,
                    author_name: 'sahil',
                    post_type: 'Career Advice',
                    title: 'cs vs it ??',
                    description: 'help',
                    image: null
                }
            ];
            setPosts(dummyPosts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.logo}>ONE SOLVE</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Icon name="person" size={28} color={COLORS.black} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <Text style={styles.screenTitle}>Explore</Text>

            <FlatList
                data={posts}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => <PostCard post={item} />}
                contentContainerStyle={styles.listContent}
                refreshing={loading}
                onRefresh={fetchPosts}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddPost')}
            >
                <Icon name="add" size={30} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
    },
    logo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#E53935',
        textTransform: 'uppercase',
    },
    screenTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.black,
        paddingHorizontal: SIZES.padding,
        marginVertical: 10,
    },
    listContent: {
        padding: SIZES.padding,
        paddingBottom: 80,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        zIndex: 10,
    }
});

export default ExploreScreen;
