import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, Alert, FlatList } from "react-native";
import React, {useState, useEffect} from "react";
import { SIZES, images, FONTS, COLORS } from "../constants";
import Button from "../components/Button";
// import { getFirebaseApp } from "../utils/firebaseHelper"; 
// import { firebase } from "@react-native-firebase/database";
// import { firestore } from "firebase-admin";

const Questions = ({  route  }) => {
    // const [questions, setQuestions] = useState([]);
    // const [selectedOptions, setSelectedOptions] = useState({});
    // const [score, setScore] = useState(0);
    // const [showResults, setShowResults] = useState(false);

    // const {category} = route.parems;

    // useEffect(() => {
    //     getQuestions()
    // }, [])

    // const getQuestions = async () => {
    //     setSelectedOptions({});
    //     setShowResults(false);
    //     const db = firestore;
    //     const questionsRef = db.collection('questions')
    //     const snapshot = await questionsRef.where('category', '==', category().get())
    // }
    return (
        <View style={{ flex:1 }}>
                <View style={{  marginTop: 72 }}>
                    <Button
                        title="Login with Email"
                        style={styles.btn}
                        onPress={() => navigation.navigate("Login")}
                    />
                </View>
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
    btn: {
        width: SIZES.width - 32,
    },
})

export default Questions