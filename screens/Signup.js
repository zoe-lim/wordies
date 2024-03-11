import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images, FONTS, SIZES } from "../constants";
import Input from "../components/Input";
import Button from "../components/Button";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import { signUp } from "../utils/actions/authActions";
import { useDispatch } from "react-redux";

const isTestMode = true;

const initialState = {
    inputValues: {
        fullName: isTestMode ? "Zoe Lim" : "",
        email: isTestMode ? "name@email.com" : "",
        password: isTestMode ? "**********" : "",
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
    },
    formIsValid: false
}

const Signup = ({  navigation  }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const dispatch = useDispatch();

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({inputId, validationResult: result, inputValue});
    }, [dispatchFormState])
    
    const authHandler = async () => {
        try{
            setIsLoading(true);
            const action = signUp(
                formState.inputValues.fullName,
                formState.inputValues.email,
                formState.inputValues.password
            );

            await dispatch(action);

            Alert.alert("Account created successfully", "Account created")
            setError(null);
            setIsLoading(false);
            navigation.navigate("Login");

        }catch(error){
            console.log(error);
            setIsLoading(false);
            setError(error.message);
        }
    }

    useEffect(() => {
        if(error) {
            Alert.alert("An error occured", error)
        }    
    }, [error])

    return (
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.background }}>
            <ScrollView
                style={{
                    flex:1,
                    backgroundColor: COLORS.background,
                    padding: 16
                }}
            >
                <Image
                    source={images.logo}
                    resizeMode="contain"
                    style={{
                        width:100,
                        height:100,
                        marginBottom:6
                    }}
                />

                <Text style={{...FONTS.h2, color: COLORS.darkgray}}>Sign Up</Text>
                <Text style={{...FONTS.body2, color: COLORS.gray}}>
                    Sign up now for free and Play some Word Games!
                </Text>

                <View style={{marginVertical:22}}>
                    <Input
                        id="fullName"
                        placeholder="Name"
                        placeholderTextColor={COLORS.gray}
                        errorText={formState.inputValidities["fullName"]}
                        onInputChanged={inputChangedHandler}
                    />
                    <Input
                        id="email"
                        placeholder="Email Address"
                        placeholderTextColor={COLORS.gray}
                        errorText={formState.inputValidities["email"]}
                        onInputChanged={inputChangedHandler}
                    />
                    <Input
                        id="password"
                        placeholder="Password"
                        placeholderTextColor={COLORS.gray}
                        errorText={formState.inputValidities["password"]}
                        onInputChanged={inputChangedHandler}
                    />
                    <Button
                        title="SIGNUP"
                        onPress={authHandler}
                        isLoading={isLoading}
                        style={{
                            width:SIZES.width -32,
                            marginVertical:8
                        }}
                    />
                    <View style={styles.bottomContainer}>
                        <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                            Already have an account?  
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{...FONTS.h3, color: COLORS.darkgray}}>
                                {""} Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical:2
    }
})

export default Signup