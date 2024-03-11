import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES, images, FONTS, COLORS } from "../constants";

const Quiz = ({  navigation  }) => {
    return (
        <View style={styles.bodyContainer}>
            
                <View style={styles.categoryContainer}>
                    <TouchableOpacity
                        style={styles.category}
                        onPress={() => navigation.navigate('Questions', {category: 'grammar'})}
                    >
                        <Text style={styles.categoryTitle}>Grammar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.category}
                        onPress={() => navigation.navigate('Questions', {category: 'synonyms'})}
                    >
                        <Text style={styles.categoryTitle}>Synonyms</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.category}
                        onPress={() => navigation.navigate('Questions', {category: 'vocab'})}
                    >
                        <Text style={styles.categoryTitle}>Vocabulary</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.category}
                        onPress={() => navigation.navigate('Questions', {category: 'spelling'})}
                    >
                        <Text style={styles.categoryTitle}>Spelling</Text>
                    </TouchableOpacity>
                </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex:1
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center',
        marginTop:50,

    },
    category: {
        width: 150,
        height: 150,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryTitle: {
        fontSize:20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
    }
})

export default Quiz