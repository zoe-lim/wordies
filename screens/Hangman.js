import { StyleSheet, View, Text, TouchableOpacity, Modal, ImageBackground , Image} from 'react-native'
import React, { useState, useReducer } from 'react'
import Figure from '../components/hangman/Figure';
import { WordsArray } from '../components/hangman/HangmanData';
import Keyboard from '../components/hangman/Keyboard';
import ButtonSmall from '../components/ButtonSmall';
import { SIZES, images, FONTS, COLORS } from '../constants';
import { Picker } from '@react-native-picker/picker';

const Hangman = () => {
    const [correctLetters, setCorrectLetters] = useState('');
    const [wrongLetters, setWrongLetters] = useState('');
    const [status, setStatus] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        // Reset game state when category changes
        setCurrentIndex(0);
        setCorrectLetters('');
        setWrongLetters('');
        setStatus('');
    };

    // const correctWord = WordsArray[currentIndex].answer;
    // Filter WordsArray based on selected category
    const filteredWords = WordsArray.filter(word => selectedCategory === null || word.category === selectedCategory);
    const correctWord = filteredWords[currentIndex].answer;

    const storeCorrectLetters = (keyInput) => {
        const ans = correctWord.toUpperCase();
        if (ans.includes(keyInput)) {
            const cl = correctLetters + keyInput;
            setCorrectLetters(cl);
            // check win
            updateStatus(cl);
        } else {
            const wl = wrongLetters + keyInput;
            setWrongLetters(wl);
            if (wl.length > 5) {
                // lost
                setStatus('lost')
            }
        }
    }

    const updateStatus = (cl) => {
        let status = 'win';
        const correctWordArray = Array.from(correctWord.toUpperCase());
        correctWordArray.forEach(letter => {
            if (!cl.includes(letter)) {
                status = '';
            }
        })
        if (status === 'win' && currentIndex === WordsArray.length - 1) {
            setStatus('completed')
            return
        }
        setStatus(status);
    }

    const handlePopupButton = () => {
        if (status === 'win') {
            // go to next word
            setCurrentIndex(i => i + 1)
        }
        // clear all stored data
        setCorrectLetters('')
        setWrongLetters('')
        setStatus('')
        // replay
        if (status === 'completed') {
            setCurrentIndex(0);
        }
    }

    const WordBox = ({ wordData }) => {
        const [hint, toggleHint] = useReducer(s => !s, false);
        const startingLetter = wordData.answer[0];

        return (
            <View style={styles.wordContainer}>
                <Text style={{...FONTS.body2, color: COLORS.darkgray, }}>
                    Opposite word of
                </Text>
                <Text style={styles.word}>{wordData.word}</Text>
                <ButtonSmall
                    title="Hint"
                    style={styles.hintBtn}
                    onPress={toggleHint}
                />
                {hint && (
                    <View>
                        <Text style={{...FONTS.body3, color: COLORS.darkgray, padding: SIZES.padding2 }}>
                            {`Starting letter is ${startingLetter}`}
                        </Text>
                    </View>
                )}
            </View>
        )
    }

    const InputBox = ({ correctLetters, answer }) => {
        return (
            <View style={styles.inputContainer}>
                {answer.split('').map((letter, index) => {
                    const l = letter.toUpperCase();
                    return (
                        <Text key={index} style={styles.inputText}>
                            {correctLetters.includes(l) ? l : '-'}
                        </Text>
                    )
                })}
            </View>
        )
    }

    const StatusNotif = ({ status, onPress }) => {
        const message = 
            status === 'win' 
                ? 'Congrats you won!' 
            : status === 'completed' 
                ? 'Congratulations you completed the puzzle!' 
                : 'Oops you lost';

        const buttonText 
            = status === 'win' 
                ? 'Next word' 
            : status === 'completed' 
                ? 'Replay' 
                : 'Retry';

        return (
            <Modal visible={status !== ''} animationType="fade" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.notif}>
                        <Text style={{...FONTS.body3, color: COLORS.darkgray, padding: SIZES.padding3}}>
                            {message}
                        </Text>
                        <ButtonSmall
                            title={buttonText} // Fixed buttonText interpolation
                            style={styles.btn}
                            onPress={onPress}
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <ImageBackground
            source={images.background1}
            style={styles.background1}
        >
            <View style={styles.categorySelection}>
                <Text>Select Category:</Text>
                <Picker
                    selectedValue={selectedCategory}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => handleCategoryChange(itemValue)}
                >
                    <Picker.Item label="Emotions" value="Emotions" />
                    <Picker.Item label="Weather" value="Weather" />
                </Picker>
            </View>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Figure wrongWord={wrongLetters.length} />
                    <WordBox wordData={WordsArray[currentIndex]} />
                </View>
                <InputBox correctLetters={correctLetters} answer={correctWord} />
                <Keyboard correctLetters={correctLetters} wrongLetters={wrongLetters} onPress={(input) => storeCorrectLetters(input)} />
                <StatusNotif status={status} onPress={handlePopupButton} />
            </View>
        </ImageBackground>
    )
};

export default Hangman;

const styles = StyleSheet.create({
    background1: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        marginHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    wordContainer: {
        flex: 1,
        padding: 10,
    },
    word: {
        ...FONTS.h2,
        marginVertical: 8,
        textTransform: 'capitalize',
    },
    hintBtn:{
        alignSelf: 'flex-end'
    },
    inputContainer: {
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputText: {
        ...FONTS.h1,
        letterSpacing: 3,
    },
    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
    },
    notif:{
        width: '80%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: COLORS.wheat,
        alignItems: 'center',
    },
})