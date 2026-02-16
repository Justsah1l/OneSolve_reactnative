import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES } from '../utils/theme';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker'; // Need permission setup

const AddPostScreen = ({ navigation }: any) => {
    const [postType, setPostType] = useState('Health & Wellness'); // Default or dropdown logic
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri || null);
            }
        });
    };

    const handlePost = () => {
        // API call logic here
        console.log({ postType, title, description, imageUri });
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="close" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add a Post</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Post type</Text>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>{postType}</Text>
                    <Icon name="arrow-drop-down" size={24} color={COLORS.textLight} />
                </TouchableOpacity>

                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Add title of your post"
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Add Description about your post"
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                    textAlignVertical="top"
                />

                <TouchableOpacity style={styles.uploadButton} onPress={handleChoosePhoto}>
                    <Icon name="add-a-photo" size={20} color={COLORS.white} />
                    <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>

                {imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.previewImage} />
                )}

                <View style={styles.footer}>
                    <CustomButton title="Post" onPress={handlePost} />
                </View>
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
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: SIZES.h3,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    form: {
        padding: SIZES.padding,
    },
    label: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 10,
        marginTop: 10,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor,
        marginBottom: 10,
    },
    dropdownText: {
        fontSize: SIZES.body,
        color: COLORS.textLight,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: SIZES.radius,
        padding: 10,
        fontSize: SIZES.body,
        marginBottom: 10,
    },
    textArea: {
        height: 150,
    },
    uploadButton: {
        backgroundColor: COLORS.black,
        flexDirection: 'row',
        alignItems: 'center',
        width: 100, // Fixed width as per design
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    uploadText: {
        color: COLORS.white,
        marginLeft: 8,
        fontWeight: 'bold',
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: SIZES.radius,
        marginVertical: 10,
    },
    footer: {
        marginTop: 30,
    }
});

export default AddPostScreen;
