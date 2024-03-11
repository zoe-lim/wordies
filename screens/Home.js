import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES, images, FONTS, COLORS } from "../constants";
import Button from "../components/Button";

const Home = ({  navigation  }) => {
    return (
        <View style={{ flex:1 }}>
            <ImageBackground
                source={images.background}
                style={styles.background}
            >
                <Image
                    source={images.gameMode}
                    resizeMode="contain"
                    style={styles.mode}
                />

                <View style={{marginTop:-80}}>
                    <Button
                        title="Crossword Puzzle"
                        style={styles.btn}
                        onPress={() => navigation.navigate("CrosswordTheme")}
                    />
                    <Button
                        title="Hangman"
                        style={styles.btn}
                        onPress={() => navigation.navigate("Hangman")}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mode: {
        width: SIZES.width,
        height: SIZES.width,
        marginTop: -50,
    },
    btn: {
        width: SIZES.width - 50,
        marginBottom: 20,
    },
})

export default Home