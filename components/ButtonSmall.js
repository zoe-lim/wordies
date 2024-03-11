import { Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants";

const ButtonSmall = (props) => {
    
    const isLoading = props.isLoading || false;

    return (
        <TouchableOpacity
            style={{
                ...styles.btn,
                ...props.style,
            }}
            onPress={props.onPress}
        >
            {
                isLoading && isLoading == true ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                    <Text style={{...FONTS.body3, color: COLORS.white }}>
                        {props.title}
                    </Text>
                ) 
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        borderColor: COLORS.lightblue,
        borderWidth: 2,
        borderRadius: SIZES.padding,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightblue,
    }
})

export default ButtonSmall