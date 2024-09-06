import { React,useEffect, useState } from 'react'
import {getSudoku, validateSudoku} from '../actions/sudoku'
import { useDispatch, connect, useSelector } from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import '../css/index.css'
import { useStopwatch } from 'react-timer-hook';
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Square, Stack, SimpleGrid, Center, Container, useDisclosure, Modal, ModalOverlay, 
    ModalContent, ModalHeader, ModalFooter, Button, Text, HStack, Menu, MenuButton, MenuList, MenuItem, 
    Heading,Spinner} from '@chakra-ui/react'
import { ModalBody } from 'react-bootstrap'

const Game = ({sudoku}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {search} = location
    const myResult = useSelector((state) => state.myResult);

    const { seconds,minutes,hours,days,start,pause,reset } = useStopwatch({ autoStart: true });

    const formatNumber = (num) => String(num).padStart(2, '0');

    let mode = ""

    if(!search) {
        mode = "easy" 
    } else {
        const searchParams = new URLSearchParams(search)
        let modeParam = searchParams.get('mode') 
        if(modeParam === "easy" || modeParam === "medium" || modeParam === "hard" || modeParam ==="extreme") mode = modeParam
        else navigate('/')
    }

    const [loading, setLoading] = useState(true);
    const [resultLoading, setResultLoading] = useState(true);
    const [selectedCellIdx, setSelectedCellIdx] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [resultModal,setResultModal] = useState("");
    const [mistakes,setMistakes] = useState(0);
    const [insertedColor,SetInsertedColor] = useState('blue')


    useEffect(() => {

        const loadSudoku = async () => {
            setLoading(true);
            if(!sessionStorage.currentSudoku) { 
                await dispatch(getSudoku(mode));
            } else { 
                let savedSudoku = JSON.parse(sessionStorage.currentSudoku)
                if(mode === savedSudoku.mode) {
                    dispatch({type:"SET_SUDOKU", data: savedSudoku});
                } else {
                    navigate('/');
                }
            }
            reset();
            setLoading(false);
        };

        loadSudoku();

    }, [dispatch, navigate]);

    const handleSelected = (idx) => {
        setSelectedCellIdx((prev) => idx)
    }

    const findMistake = (number,row,col) => {
        let ismistakeExist = false;
        for(let i=0; i<9; i++){
            if(col!==i && sudoku?.gridToBeFilled[row][i] === number){
                ismistakeExist = true;
            }
        }
        for(let i=0; i<9; i++){
            if(row!==i && sudoku?.gridToBeFilled[i][col] === number){
                ismistakeExist = true;
            }
        }
        let startRow = row - row%3
        let startCol = col - col%3
        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if ((i!==row-startRow || j!==col-startCol) && sudoku?.gridToBeFilled[i+startRow][j+startCol] === number) {
                    ismistakeExist = true;
                }
            }
        }
        if(ismistakeExist){
            setMistakes(mistakes+1);
            SetInsertedColor('red')
        }
        else SetInsertedColor('blue')
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
        if(!localStorage.sudokuUser) return true;
        const valid = await dispatch(validateSudoku({gridToBeFilled: sudoku.gridToBeFilled, history: JSON.parse(sessionStorage.getItem('currentSudoku')).history}));
        return valid
    }

    const updateSudokuGrid = async (number) => {
        let row = Math.floor(selectedCellIdx/9);
        let col = selectedCellIdx%9;
        if(sudoku?.gridWithBlanks[row][col] === 0) {
            dispatch({type: "UPDATE_SUDOKU", data: {number, row, col}});
        };

        findMistake(number,row,col);

        if (sudokuIsCompleted()) {
            pause();
            onOpen();
            if (sudokuIsRight() && await validateinServer()) {
                setResultModal("Sudoku Completed!");
                setResultLoading(false);
                sessionStorage.removeItem('currentSudoku');
            } else {
                setResultModal("Your Sudoku has some errors!");
                setResultLoading(false);
            }
        }
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
        start();
    }

    //for a new game, navigate to home, where you select the mode
    const newGame = (newMode) => {
        const loadSudoku = async () => {
            setLoading(true);
            sessionStorage.removeItem('currentSudoku')
            await dispatch(getSudoku(newMode))
            navigate(`/game?mode=${newMode}`)
            reset();
            onClose();
            setLoading(false);
            setResultLoading(true);
        };
        loadSudoku();
    }

    const goHome = () => {
        sessionStorage.removeItem('currentSudoku')
        navigate('/')
    }

    const handleReset = () => {
        let savedSudoku = JSON.parse(sessionStorage.currentSudoku)
        let newSudoku = {
            ...savedSudoku,
            gridToBeFilled: JSON.parse(JSON.stringify(savedSudoku.gridWithBlanks)),
            history: [], // Deep copy
        };
        sessionStorage.setItem('currentSudoku', JSON.stringify(newSudoku))
        dispatch({type:"SET_SUDOKU", data: newSudoku})
    }
    
    return (
        <>
            <Navbar />
            <Container maxW='container.xl'>
                {loading ? 
                <Center mt="250px"><Spinner thickness='6px' speed='0.80s' emptyColor='gray.200' color='blue.500' size='xl' /></Center>
                :
                <SimpleGrid columns={[1,1,1,2]} mt={[5, 25, 85]} spacing={[20,10,5]}>
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
                                        style={number && sudoku?.gridWithBlanks[row][col] === 0 ? { color: insertedColor, fontWeight: 'bold' } : {}}
                                        onClick={() => handleSelected(row*9+col)}>{number ? number : ''}</div>))
                                    ))}
                                </div>
                            </div>
                            <Modal closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
                                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(2px)'/>
                                {resultLoading ? <ModalContent><Center h="150px"><Spinner thickness='4px' speed='0.75s' size='lg'/></Center></ModalContent>
                                :
                                <ModalContent>
                                <ModalHeader><Center>{resultModal}</Center></ModalHeader>
                                <Center>
                                    {resultModal==="Sudoku Completed!" ?
                                    <ModalBody>
                                        {myResult?.result ?
                                        <><Heading size='md'>Time Taken:</Heading>
                                         <Text>
                                            {Math.floor(myResult?.result?.[2])} Hours{' '}
                                            {Math.floor((myResult?.result?.[2] % 1) * 60)} Min{' '}
                                            {Math.round((((myResult?.result?.[2] % 1) * 60) % 1) * 60)} Sec
                                        </Text>
                                        <Center><Text as='b'>Mistake: {myResult?.result?.[0]} Cheats/Guess: {myResult?.result?.[1]}</Text></Center></>
                                        :
                                        <>
                                        <Heading size='md'>Time Taken:</Heading>
                                        <Text>
                                            {hours} Hours{' '}
                                            {minutes} Min{' '}
                                            {seconds} Sec
                                        </Text>
                                        <Center><Text>For Saving Record! Please Log In.</Text></Center>
                                        </>}
                                    </ModalBody>
                                    :
                                    <ModalBody>
                                        <Text>{myResult?.response?.data}</Text>
                                    </ModalBody>}
                                </Center>
                                <Center>
                                    <ModalFooter>
                                        <Stack direction='row' spacing={4}>
                                            {resultModal==="Sudoku Completed!" ? <></> : <Button onClick={() => keepTrying()}>Keep Trying!</Button>}
                                            <Menu>
                                                {({ isOpen }) => (
                                                    <>
                                                    <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                                                        {isOpen ? 'Select' : 'New Game'}
                                                    </MenuButton>
                                                    <MenuList>
                                                        <MenuItem color='green' onClick={() => newGame('easy')}>Easy</MenuItem>
                                                        <MenuItem color='yellow' onClick={() => newGame('medium')}>Medium</MenuItem>
                                                        <MenuItem color='orange' onClick={() => newGame('hard')}>Hard</MenuItem>
                                                        <MenuItem color='red' onClick={() => newGame('extreme')}>Extreme</MenuItem>
                                                    </MenuList>
                                                    </>
                                                )}
                                            </Menu>
                                            <Button colorScheme='green' onClick={() => goHome()}>Home</Button>
                                        </Stack>
                                    </ModalFooter>
                                </Center>
                                </ModalContent>}
                            </Modal>
                    </Center>
                    <Center>
                        <Box>
                            <HStack spacing='15px'>
                                <Text className="game-mode">
                                    Difficulty: {mode==="easy" ? <span className="easy-color-text" >Easy</span> : mode==="medium" ? <span className="medium-color-text" >Medium</span> : mode==="hard" ? <span className="hard-color-text" >Hard</span> : mode==="extreme" ? <span className="extreme-color-text" >Extreme</span> : <></>}
                                </Text>
                                <div className="timer">
                                    <span>
                                        {days > 0 && <span>{formatNumber(days)}:</span>}
                                        {hours > 0 && <span>{formatNumber(hours)}:</span>}
                                        {<span>{formatNumber(minutes)}:</span>}
                                        {<span>{formatNumber(seconds)}</span>}
                                    </span>
                                </div>
                            </HStack>
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
                                <Square _hover={{background: "red.100",color: "red.500", borderWidth: "3px", borderColor: "red.500",}} borderRadius="7.5px" as="button" size='50px' bg='red.500' color='white' fontSize="25px" onClick={() => updateSudokuGrid(0, sudoku)}><DeleteIcon /></Square>
                            </SimpleGrid>
                            <SimpleGrid columns={[2,1]} spacing='15px' mt="15px" w={[325, 300]}>
                                <Button onClick={()=>handleReset()}>Reset</Button>
                                <Menu>
                                    {({ isOpen }) => (
                                        <>
                                        <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                                            {isOpen ? 'Select' : 'New Game'}
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem color='green' onClick={() => newGame('easy')}>Easy</MenuItem>
                                            <MenuItem color='yellow' onClick={() => newGame('medium')}>Medium</MenuItem>
                                            <MenuItem color='orange' onClick={() => newGame('hard')}>Hard</MenuItem>
                                            <MenuItem color='red' onClick={() => newGame('extreme')}>Extreme</MenuItem>
                                        </MenuList>
                                        </>
                                    )}
                                </Menu>
                            </SimpleGrid>
                        </Box>
                    </Center>
                </SimpleGrid>
                }
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

