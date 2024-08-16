import React, { useEffect, useState } from 'react'
import {getSudoku, validateSudoku} from '../actions/sudoku'
import { updateStatistics } from '../actions/myStatistics'
import { useDispatch, connect,} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import '../css/index.css'
import { useStopwatch } from 'react-timer-hook';
import { Box, Flex, Square, Spacer, Stack, SimpleGrid, Center, Container, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Button} from '@chakra-ui/react'
import { ModalBody } from 'react-bootstrap'

const Game = ({sudoku}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {search} = location

    const { seconds,minutes,hours,days } = useStopwatch({ autoStart: true });

    const formatNumber = (num) => String(num).padStart(2, '0');

    let mode = ""

    if(!search) {
        mode = "easy" 
    } else {
        const searchParams = new URLSearchParams(search)
        let modeParam = searchParams.get('mode') //example: www.site-name.com?mode=easy --> 'easy'
        if(modeParam === "easy" || modeParam === "medium" || modeParam === "hard" || modeParam ==="extreme") mode = modeParam
        else navigate('/')
    }

    const [selectedCellIdx, setSelectedCellIdx] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [checkSuccess,setCheckSuccess] = useState("");


    useEffect(() => {
        if(!sessionStorage.currentSudoku) { 
            dispatch(getSudoku(mode))
        } else { // if there is a sudoku saved, but the mode is different than the current mode in the URL, navigate back to home, otherwise ripristinate the saved sudoku with "SET_SUDOKU"
            let savedSudoku = JSON.parse(sessionStorage.currentSudoku)
            if(mode === savedSudoku.mode)
                dispatch({type:"SET_SUDOKU", data: savedSudoku})
            else navigate('/')
        }
          
    }, [dispatch])

    const handleSelected = (idx) => {
        setSelectedCellIdx((prev) => idx)
    }

    const updateSudokuGrid = async (number) => {
        let row = Math.floor(selectedCellIdx/9)
        let col = selectedCellIdx%9
        if(sudoku?.gridWithBlanks[row][col] === 0) {
            dispatch({type: "UPDATE_SUDOKU", data: {number, row, col}});
        }

        if (sudokuIsCompleted()) {
            if (await validateinServer()) {
                (() => {
                    setCheckSuccess("Sudoku Completed!");
                    onOpen();
                })();
                sessionStorage.removeItem('currentSudoku');
                if (localStorage.getItem('sudokuUser')) {
                    dispatch(updateStatistics({ mode, user: localStorage.getItem('sudokuUser') }));
                }
            } else {
                (() => {
                    setCheckSuccess("Your Sudoku has some errors!");
                    onOpen();
                })();
            }
        }
    }

    //returns true if the user has filled every empty cell (doesn't check if the solution is right or not)
    const sudokuIsCompleted = () => {
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                if(sudoku?.gridToBeFilled[i][j] === 0) return false
            }
        }
        return true
    }

    //returns true if the final grid of the user is the same as the solution
    const sudokuIsRight = () => {
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                if(sudoku?.gridToBeFilled[i][j] !== sudoku?.grid[i][j]){
                    return false
                }
            }
        }
        return true
    }

    const validateinServer = async () => {
        const valid = await dispatch(validateSudoku({gridToBeFilled: sudoku.gridToBeFilled, history: JSON.parse(sessionStorage.getItem('currentSudoku')).history}));
        return valid
    }

    const handleKeyPress = (e) => {
       if(e.keyCode >= 49 && e.keyCode <= 57) { // IF IT IS A NUMBER (ascii code)
            let number = e.keyCode - 48
            updateSudokuGrid(number, sudoku)
       } else if(e.keyCode === 8) {
           updateSudokuGrid(0, sudoku)
       } else if(e.keyCode === 37) { // LEFT_ARROW
            if(selectedCellIdx%9 !== 0) setSelectedCellIdx((prev) => --prev)
       } else if (e.keyCode === 38) { // UP_ARROW
            if(selectedCellIdx > 8) setSelectedCellIdx((prev) => prev-9)
       } else if (e.keyCode === 39) { // RIGHT_ARROW
            if(selectedCellIdx%9 !== 8) setSelectedCellIdx((prev) => ++prev)
       } else if (e.keyCode === 40) { //DOWN_ARROW
            if(selectedCellIdx < 72) setSelectedCellIdx((prev) => prev+9)
       }
    }

    useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    }
  }, [selectedCellIdx])


    const keepTrying = () => {
        onClose();
    }

    //for a new game, navigate to home, where you select the mode
    const newGame = () => {
        sessionStorage.removeItem('currentSudoku')
        dispatch(getSudoku(mode))
        onClose();
    }

    const goHome = () => {
        sessionStorage.removeItem('currentSudoku')
        navigate('/')
    }

    return (
        <>
            <Navbar />
            <Container maxW='container.xl'>
            <SimpleGrid columns={[1,1,1,2]} mt={[5, 25, 85]} spacing={[20,10, 5]}>
                <Center>
                        <div className="main-game active" id="game-screen">
                            <div className="main-sudoku-grid">
                                {sudoku?.gridToBeFilled?.map((elem, row) => (
                                    elem.map((number, col) => (<div
                                    className={"main-grid-cell "
                                    .concat( (row%3 === 0) ? "border-top ": "")
                                    .concat((row%3 === 2) ? "border-bottom " : "")
                                    .concat((col%3===0) ? "border-left " : "")
                                    .concat((col%3===2) ? "border-right " : "")
                                    .concat((row*9 + col === selectedCellIdx) ? "selected " : "")
                                    .concat((number && sudoku?.gridWithBlanks[row][col] !== 0) ? "given " : "")
                                    .concat((number && sudoku?.gridWithBlanks[row][col] === 0) ? "inserted " : "")
                                    .concat((row === Math.floor(selectedCellIdx/9)) ? "highlighted " : "")
                                    .concat((col === selectedCellIdx%9) ? "highlighted " : "")
                                    .concat(((Math.floor(row/3) === Math.floor(Math.floor(selectedCellIdx/9)/3)) && (Math.floor(col/3) === Math.floor((selectedCellIdx%9)/3))) ? "highlighted " : "")
                                    }
                                    key={row*9+col}
                                    onClick={() => handleSelected(row*9+col)}>{number ? number : ''}</div>))
                                ))}
                            </div>
                        </div>
                        <Modal closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
                            <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(2px)'/>
                            <ModalContent>
                            <ModalHeader><Center>{checkSuccess}</Center></ModalHeader>
                            <ModalBody>
                                
                            </ModalBody>
                            <Center>
                                <ModalFooter>
                                    <Stack direction='row' spacing={4}>
                                        {checkSuccess==="Sudoku Completed!" ? <></> : <Button onClick={() => keepTrying()}>Keep Trying!</Button>}
                                        <Button onClick={() => newGame()}>New Game</Button>
                                        <Button colorScheme='green' onClick={() => goHome()}>Home</Button>
                                    </Stack>
                                </ModalFooter>
                            </Center>
                            </ModalContent>
                        </Modal>
                </Center>
                    <Box>
                        <Flex>
                            <div className="game-mode">
                                Difficulty: {mode==="easy" ? <span className="easy-color-text" >{mode}</span> : mode==="medium" ? <span className="medium-color-text" >{mode}</span> : mode==="hard" ? <span className="hard-color-text" >{mode}</span> : mode==="extreme" ? <span className="extreme-color-text" >{mode}</span> : <></>}
                            </div>
                            {/* <Spacer /> */}
                            <div className="timer">
                                <span>
                                    {days > 0 && <span>{formatNumber(days)}:</span>}
                                    {hours > 0 && <span>{formatNumber(hours)}:</span>}
                                    {<span>{formatNumber(minutes)}:</span>}
                                    {<span>{formatNumber(seconds)}</span>}
                                </span>
                            </div>
                        </Flex>
                        <SimpleGrid columns={[5]} spacing={2} mt="5px" w={[325, 300]}>
                            <Square _hover={{background: "purple.100",color: "purple.700", borderWidth: "3px", borderColor: "purple.700",}} borderRadius="7.5px" as="button" size='50px' bg='purple.700' color='white' fontSize="25px" onClick={() => updateSudokuGrid(1)}>1</Square>
                            <Square _hover={{background: "purple.100",color: "purple.700", borderWidth: "3px", borderColor: "purple.700",}} borderRadius="7.5px" as="button" size='50px' bg='purple.700' color='white' fontSize="25px" onClick={() => updateSudokuGrid(2)}>2</Square>
                            <Square _hover={{background: "purple.100",color: "purple.700", borderWidth: "3px", borderColor: "purple.700",}} borderRadius="7.5px" as="button" size='50px' bg='purple.700' color='white' fontSize="25px" onClick={() => updateSudokuGrid(3)}>3</Square>
                            <Square _hover={{background: "purple.100",color: "purple.700", borderWidth: "3px", borderColor: "purple.700",}} borderRadius="7.5px" as="button" size='50px' bg='purple.700' color='white' fontSize="25px" onClick={() => updateSudokuGrid(4)}>4</Square>
                            <Square _hover={{background: "purple.100",color: "purple.700", borderWidth: "3px", borderColor: "purple.700",}} borderRadius="7.5px" as="button" size='50px' bg='purple.700' color='white' fontSize="25px" onClick={() => updateSudokuGrid(5)}>5</Square>
                            <Square _hover={{background: "purple.100",color: "purple.700", borderWidth: "3px", borderColor: "purple.700",}} borderRadius="7.5px" as="button" size='50px' bg='purple.700' color='white' fontSize="25px" onClick={() => updateSudokuGrid(6)}>6</Square>
                            <Square _hover={{background: "purple.100",color: "purple.700", borderWidth: "3px", borderColor: "purple.700",}} borderRadius="7.5px" as="button" size='50px' bg='purple.700' color='white' fontSize="25px" onClick={() => updateSudokuGrid(7)}>7</Square>
                            <Square _hover={{background: "purple.100",color: "purple.700", borderWidth: "3px", borderColor: "purple.700",}} borderRadius="7.5px" as="button" size='50px' bg='purple.700' color='white' fontSize="25px" onClick={() => updateSudokuGrid(8)}>8</Square>
                            <Square _hover={{background: "purple.100",color: "purple.700", borderWidth: "3px", borderColor: "purple.700",}} borderRadius="7.5px" as="button" size='50px' bg='purple.700' color='white' fontSize="25px" onClick={() => updateSudokuGrid(9)}>9</Square>
                            <Square _hover={{background: "red.100",color: "red.500", borderWidth: "3px", borderColor: "red.500",}} borderRadius="7.5px" as="button" size='50px' bg='red.500' color='white' fontSize="25px" onClick={() => updateSudokuGrid(0, sudoku)}>X</Square>
                        </SimpleGrid>
                        <Button onClick={onOpen}>Trigger modal</Button>
                    </Box>
            </SimpleGrid>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => {
    let sudoku = state.sudoku
    return {
        sudoku
    }
}

export default connect(mapStateToProps)(Game)

