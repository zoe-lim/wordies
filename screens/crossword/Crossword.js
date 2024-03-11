// Crossword.js
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import CrosswordGrid from '../../components/crossword/Grid';
import crosswordData from '../../components/crossword/crosswordData';
import { images } from '../../constants';

const Crossword = ({ route, navigation }) => {
	console.log(route);
	// Extract the selected theme from the route parameters
	const { theme } = route.params;

	console.log('Selected theme:', theme);
	console.log('Crossword data:', crosswordData);

	// Adjust the crossword data based on the selected theme
	let selectedCrosswordData;
	if (theme === 'animal') {
		selectedCrosswordData = crosswordData.animal;
	} else if (theme === 'cafe') {
		selectedCrosswordData = crosswordData.cafe;
	} else if (theme === 'instrument') {
		selectedCrosswordData = crosswordData.instrument;
	} 

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
                        <CrosswordGrid crosswordData={selectedCrosswordData} navigation={navigation} />
                    </View>
                </ScrollView>
            </ImageBackground>
            
        </SafeAreaView>
	
	);
};

export default Crossword;

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
});
