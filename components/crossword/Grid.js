import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIZES, images, FONTS, COLORS } from '../../constants';

let level = 0;

const generateInitialGrid = (crosswordData) => {
	const initialGrid = Array(7).fill(0).map(() => Array(8).fill('X'));
	crosswordData[level].forEach(({ answer, startx, starty, orientation }) => {
		let x = startx - 1;
		let y = starty - 1;

		for (let i = 0; i < answer.length; i++) {
			if (orientation === 'across') {
				initialGrid[y][x + i] = '';
			} else if (orientation === 'down') {
				initialGrid[y + i][x] = '';
			}
		}
	});
	return initialGrid;
};

const generateAnswerGrid = (crosswordData) => {
	const answerGrid = Array(7).fill(0).map(() => Array(8).fill('X'));
	crosswordData[level].forEach(({ answer, startx, starty, orientation }) => {
		let x = startx - 1;
		let y = starty - 1;

		for (let i = 0; i < answer.length; i++) {
			if (orientation === 'across') {
				answerGrid[y][x + i] = answer[i];
			} else if (orientation === 'down') {
				answerGrid[y + i][x] = answer[i];
			}
		}
	});
	return answerGrid;
};


const CrosswordGrid = ({ crosswordData, navigation }) => {
	const [grid, setGrid] = useState(generateInitialGrid(crosswordData));
	const [puzzleVerified, setPuzzleVerified] = useState(false);
	const [score, setScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
	const [highestScoreLoaded, setHighestScoreLoaded] = useState(false);

	useEffect(() => {
		setGrid(generateInitialGrid(crosswordData));
		loadHighestScore();
	}, [crosswordData]);

	useEffect(() => {
        if (highestScoreLoaded) {
            saveHighestScore(); // Save highest score to storage whenever it changes
        }
    }, [highestScore]);

	const loadHighestScore = async () => {
        try {
            const storedScore = await AsyncStorage.getItem('highestScore');
            if (storedScore !== null) {
                setHighestScore(parseInt(storedScore));
            }
			setHighestScoreLoaded(true);
        } catch (error) {
            console.error('Error loading highest score:', error);
        }
    };

    const saveHighestScore = async () => {
        try {
            await AsyncStorage.setItem('highestScore', highestScore.toString());
        } catch (error) {
            console.error('Error saving highest score:', error);
        }
    };

	const handleInputChange = (row, col, text) => {
		const newGrid = [...grid];
		newGrid[row][col] = text.toUpperCase();
		setGrid(newGrid);
	};

	const handleGenerate = () => {

		level = (level + 1) % crosswordData.length; // Calculate next level
		setGrid(generateInitialGrid(crosswordData));
		setPuzzleVerified(false); // Reset puzzle verification status

		if (level === 0) {
			// All levels completed, navigate to theme selection screen
			navigation.navigate('CrosswordTheme');
			alert('Congratulations! You have cleared all levels.');
		}
    };
	

	const handleVerify = () => {
		const answerGrid = generateAnswerGrid(crosswordData);
		const isCorrect = JSON.stringify(grid) === JSON.stringify(answerGrid);
		const newScore = score + 50; // Increase score by 50 for completing a level
		if (isCorrect) {
			alert('Congratulations! Your crossword is correct.');
			setPuzzleVerified(true); // Puzzle is verified
			setScore(newScore);
		} else {
			alert('Incorrect. Please try again.');
		}
		if (newScore > highestScore) {
			setHighestScore(newScore); // Update highest score if the new score is higher
			saveHighestScore();
		}
	};

	const handleReset = () => {
		setGrid(generateInitialGrid(crosswordData));
	};

	const handleSolve = () => {
		const answerGrid = generateAnswerGrid(crosswordData);
		setGrid(answerGrid);
	};

	const renderGrid = () => (
		<View style={styles.gridContainer}>
			{grid.map((row, rowIndex) => (
				<View key={rowIndex} style={styles.row}>
					{row.map((cell, colIndex) => (
						<View key={colIndex} style={styles.cellContainer}>
							{crosswordData[level].map((entry) => {
								const { startx, starty, position } = entry;
								if (rowIndex + 1 === starty && colIndex + 1 === startx) {
									return (
										<Text key={`digit-${position}`} 
											style={styles.smallDigit}>
											{position}
										</Text>
									);
								}
								return null;
							})}
							<TextInput
								style={[styles.cell, 
								grid[rowIndex][colIndex] ==='X' ? styles.staticCell:null]}
								value={cell}
								editable={grid[rowIndex][colIndex] !== 'X'}
								onChangeText={(text) =>
									handleInputChange(rowIndex,colIndex, text)
								}
								maxLength={1}
							/>
						</View>
					))}
				</View>
			))}
		</View>
	);

	const renderQuestions = () => {
		const questions = { across: [], down: [] };

		crosswordData[level].forEach(({ hint, orientation, position }) => {
			const questionText = `${position}. ${hint}`;
			questions[orientation].push(
				<Text key={`question-${position}`} style={styles.questionText}>
					{questionText}
				</Text>
			);
		});

		return (
			<View>
				<View style={styles.headingContainer}>
					<Text style={styles.headingText}>Across</Text>
				</View>
				<View style={styles.questionsContainer}>
					{questions.across.map((question, index) => (
						<View key={`across-question-container-${index}`}>
							{question}
						</View>
					))}
				</View>
				<View style={styles.headingContainer}>
					<Text style={styles.headingText}>Down</Text>
				</View>
				<View style={styles.questionsContainer}>
					{questions.down.map((question, index) => (
						<View key={`down-question-container-${index}`}>
							{question}
						</View>
					))}
				</View>
			</View>
		);
	};

	if (!highestScoreLoaded) {
        return <Text>Loading highest score...</Text>;
    }

	return (
		<View style={styles.container}>
            
			{renderQuestions()}
			{renderGrid()}
			<View style={styles.buttonContainer}>
				<Button color={'#6092C0'} 
						title="Verify"
						onPress={handleVerify} 
						style={styles.button} />
				<View style={styles.gap} />
				<Button color={'#6092C0'} 
						title="Reset"
						onPress={handleReset} 
						style={styles.button} />
				<View style={styles.gap} />
				<Button color={'#6092C0'} 
						title="Solve"
						onPress={handleSolve} 
						style={styles.button} />
				<View style={styles.gap} />
				<Button color={'#6092C0'} 
						title="Next"
						onPress={handleGenerate} 
						style={styles.button} 
						disabled={!puzzleVerified} />
			</View>
            <View style={styles.highscoreContainer}>
                <Text style={styles.scoreText}>Current Score: {score}</Text>
                <Text style={styles.scoreText}>Highest Score: {highestScore}</Text>
            </View>
			
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
    gridContainer: {
        margin: 10,
    },
	row: {
		flexDirection: 'row',
	},
	cellContainer: {
		position: 'relative',
	},
	staticCell: {
		borderColor: 'transparent',
		backgroundColor: 'transparent',
		color: 'transparent',
	},
	cell: {
		borderWidth: 2,
		margin: 1,
		borderColor: COLORS.blue,
		width: SIZES.width * 0.1,
		height: SIZES.width * 0.1,
		textAlign: 'center',
		color: COLORS.white,
	},
	smallDigit: {
        ...FONTS.body4,
        color: COLORS.darkgray,
		position: 'absolute',
		left: 2,      
	},
	questionsContainer: {
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	questionText: {
		...FONTS.body3
	},
	headingContainer: {
		marginTop: 10,
		marginBottom: 5,
	},
	headingText: {
		...FONTS.h3,
		color: COLORS.blue,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		margin: 5,
		marginHorizontal: 10,
	},
	button: {
		flex: 1, 
	},
	gap: {
		width: 10, 
	},
	highscoreContainer: {
        marginBottom: 15,
    },
    scoreText: {
        ...FONTS.h4,
        marginTop: 10,
    },
});

export default CrosswordGrid