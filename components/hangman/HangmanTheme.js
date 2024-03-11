import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HangmanTheme = ({ categories, onSelect }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Category:</Text>
            {categories.map(category => (
                <TouchableOpacity
                    key={category}
                    style={styles.categoryButton}
                    onPress={() => onSelect(category)}
                >
                    <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoryButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HangmanTheme;
