// ThemeSelection.js
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES, images, FONTS, COLORS } from "../../constants";
import Button from "../../components/Button";

const CrosswordTheme = ({ navigation }) => {
    const handleCWThemeSelection = (theme) => {
        console.log('Selected theme:', theme);
        // Navigate to the crossword screen with the selected theme
        navigation.navigate('Crossword', { theme });
    };

    return (
        <View style={{ flex:1 }}>
            <ImageBackground
                source={images.background}
                style={styles.background}
            >
                <Text style={styles.title}>Select a Theme:</Text>
                <View style={{  marginTop: 40 }}>                
                    <Button
                        title="Animals"
                        style={styles.btn}
                        onPress={() => handleCWThemeSelection('animal')}
                    />
                    <Button
                        title="Cafe"
                        style={styles.btn}
                        onPress={() => handleCWThemeSelection('cafe')}
                    />
                    <Button
                        title="Instruments"
                        style={styles.btn}
                        onPress={() => handleCWThemeSelection('instrument')}
                    />
                </View>
            {/* Add more theme options as needed */}
            </ImageBackground>
        </View>
        
            
    
    );
};

const styles = StyleSheet.create({
    background: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginTop:60,
        ...FONTS.h1,
        color: COLORS.darkgray,
        textTransform: "uppercase",
    },
    btn: {
        width: SIZES.width - 50,
        marginBottom: 20,
    },
})

export default CrosswordTheme;
