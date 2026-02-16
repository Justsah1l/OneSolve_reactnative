import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/theme';

interface PostCardProps {
    post: any;
    onPress?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.author}>{post.author_name || 'Anonymous'}</Text>
                <Text style={styles.type}>{post.post_type}</Text>
            </View>

            <Text style={styles.title}>{post.title}</Text>

            {post.image ? (
                <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />
            ) : null}

            <Text style={styles.description} numberOfLines={3}>
                {post.description}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    author: {
        fontSize: SIZES.body,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    type: {
        fontSize: SIZES.caption,
        color: COLORS.primary,
        fontWeight: 'bold',
        backgroundColor: '#FFEBEE',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    title: {
        fontSize: SIZES.h3,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: SIZES.radius,
        marginBottom: 8,
    },
    description: {
        fontSize: SIZES.body,
        color: COLORS.textLight,
    },
});

export default PostCard;
