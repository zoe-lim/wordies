import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES, images, FONTS, COLORS } from "../constants";
import Button from "../components/Button";

const Welcome = ({  navigation  }) => {
    return (
        <View style={{ flex:1 }}>
            <ImageBackground
                source={images.background}
                style={styles.background}
            >
                <Image
                    source={images.logo}
                    resizeMode="contain"
                    style={styles.logo}
                />

                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subtitle}>Play a Game, Learn some Words</Text>

                <View style={{  marginTop: 72 }}>
                    <Button
                        title="Login with Email"
                        style={styles.btn}
                        onPress={() => navigation.navigate("Login")}
                    />
                    <View style={styles.bottomContainer}>
                        <Text style={{...FONTS.body3, color: COLORS.darkgray, }}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Signup")}
                        >
                            <Text style={{
                                ...FONTS.h3, color: COLORS.darkgray
                            }}>
                                {" "}Signup
                            </Text>
                        </TouchableOpacity>
                    </View>
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
    logo: {
        width: SIZES.width * 0.8,
        height: SIZES.width * 0.8,
    },
    title: {
        ...FONTS.h1,
        color: COLORS.darkgray,
        textTransform: "uppercase",
    },
    subtitle: {
        ...FONTS.body2,
        color: COLORS.darkgray,
    },
    btn: {
        width: SIZES.width - 32,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
    }
})

export default Welcome