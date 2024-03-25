import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import { guessWords } from '../components/wordGuess/WordGuessData';
import { SIZES, images, FONTS, COLORS } from "../constants";
import Button from '../components/Button';

const getRandomWord = () => {
	const randomPlace =
		Math.floor(Math.random() * guessWords.length);
	return guessWords[randomPlace];
};

const WordGuess = () => {
	const [wordData, setWordData] =
		useState(getRandomWord());
	const [msg, setMsg] = useState('');
	const [inputText, setInputText] = useState('');
	const [hints, setHints] = useState(3);
	const [displayWord, setDisplayWord] =
		useState(false);

	const checkWordGuessedFunction = () => {
		return inputText.toLowerCase() ===
			wordData.word.toLowerCase();
	};

	const useHint = () => {
		if (hints > 0 && !displayWord) {
			const hiddenLetterIndex = wordData.word
				.split('')
				.findIndex(
					(letter) =>
						letter !== ' ' &&
						inputText[hiddenLetterIndex] !==
						letter);
			const updatedText =
				inputText.slice(0, hiddenLetterIndex) +
				wordData.word[hiddenLetterIndex] +
				inputText.slice(hiddenLetterIndex + 1);
			setHints(hints - 1);
			setInputText(updatedText);
		}
	};

	const showResult = () => {
		if (checkWordGuessedFunction()) {
			setMsg(`Correct!`);
		} else {
			setMsg('Incorrect :(');
			setDisplayWord(true);
		}
	};

	const restartGameFunction = () => {
		setWordData(getRandomWord());
		setMsg('');
		setInputText('');
		setHints(3);
		setDisplayWord(false);
	};

	useEffect(() => {
		if (displayWord) {
			showResult();
		}
	});

	return (
		<SafeAreaView style={{flex:1}}> 
            <ImageBackground
                source={images.background1}
                style={styles.background}
            >
                <ScrollView
                    style={{
                        flex:1,
                        padding: 15,
                        margin: 20
                    }}
                >
                    <View style={styles.container}>
                        <Image
                            source={images.title}
                            resizeMode="contain"
                            style={styles.title}
                        />
                        <Text style={styles.wordDescription}>
                            {wordData.description}
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={inputText}
                            onChangeText={(text) => setInputText(text)}
                            placeholder="Enter your guess"
                            editable={!displayWord}
                        />
                        <View style={styles.buttonSection}>
                            <Button
                                title="Hint"
                                style={styles.btn}
                                onPress={useHint}
                            />
                            <Button
                                title="Check"
                                style={styles.btn}
                                onPress={showResult}
                            />
                            <Button
                                title="Next"
                                style={styles.btn}
                                onPress={restartGameFunction}
                            />
                        </View>
                        {msg && (
                            <View style={styles.message}>
                                <Text style={styles.messageText}>
                                    {msg}
                                </Text>
                                {displayWord &&
                                    <Text style={{...FONTS.body3, color: COLORS.darkgray, }}>
                                        Correct word was: {wordData.word}
                                    </Text>}
                            </View>
                        )}
                    </View>
                </ScrollView>
            </ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	background: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
	title: {
		width: SIZES.width -75,
        height: SIZES.width -75,
	},
	wordDescription: {
		marginBottom: 16,
        ...FONTS.h3,
	},
    btn: {
        margin: 10,
        backgroundColor: COLORS.lightblue,
        borderColor: COLORS.lightblue,
    },
	message: {
		marginTop: 16,
		// alignItems: 'center',
        justifyContent: 'center'
	},
	messageText: {
		...FONTS.h4,
	},
	input: {
		width: SIZES.width/1.5,
		height: SIZES.width/9,
		borderWidth: 1,
		borderColor: 'black',
		marginBottom: 16,
		paddingLeft: 8,
	},
	buttonSection: {
		flexDirection: 'row',
		marginTop: 16,
	},
});

export default WordGuess;
