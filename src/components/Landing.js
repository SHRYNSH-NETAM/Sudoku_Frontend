import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import '../css/index.css'
import { Center, Button,Box,Heading,StatGroup,Stat,StatLabel,StatNumber, SimpleGrid, Container, Highlight, HStack, Tooltip } from '@chakra-ui/react'

const Landing = () => {

    const [log, setLog] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('sudokuUser')) {
            setLog(true);
        }
    }, [])

    const [currentGrid, setCurrentGrid] = useState(0);
    const [visibleGrid, setVisibleGrid] = useState(0);
    const [fadeClass, setFadeClass] = useState('fade-in');
  
    const grids = [
        [
          [5, 3, 0, 0, 7, 0, 0, 0, 0],
          [6, 0, 0, 1, 9, 5, 0, 0, 0],
          [0, 9, 8, 0, 0, 0, 0, 6, 0],
          [8, 0, 0, 0, 6, 0, 0, 0, 3],
          [4, 0, 0, 8, 0, 3, 0, 0, 1],
          [7, 0, 0, 0, 2, 0, 0, 0, 6],
          [0, 6, 0, 0, 0, 0, 2, 8, 0],
          [0, 0, 0, 4, 1, 9, 0, 0, 5],
          [0, 0, 0, 0, 8, 0, 0, 7, 9],
        ],
        [
          [1, 0, 0, 4, 8, 9, 0, 0, 6],
          [7, 3, 0, 0, 0, 0, 0, 4, 0],
          [0, 0, 0, 0, 0, 1, 2, 9, 5],
          [0, 0, 7, 1, 2, 0, 6, 0, 0],
          [5, 0, 0, 7, 0, 3, 0, 0, 8],
          [0, 0, 6, 0, 9, 5, 7, 0, 0],
          [9, 1, 4, 6, 0, 0, 0, 0, 0],
          [0, 2, 0, 0, 0, 0, 0, 3, 7],
          [8, 0, 0, 5, 1, 2, 0, 0, 4],
        ],
        [
          [0, 0, 0, 0, 0, 0, 9, 0, 7],
          [0, 0, 0, 4, 2, 3, 0, 0, 0],
          [0, 0, 3, 0, 0, 0, 6, 0, 0],
          [2, 0, 0, 1, 0, 7, 0, 0, 5],
          [4, 0, 0, 0, 8, 0, 0, 0, 1],
          [7, 0, 0, 9, 0, 5, 0, 0, 3],
          [0, 0, 1, 0, 0, 0, 8, 0, 0],
          [0, 0, 0, 7, 3, 8, 0, 0, 0],
          [5, 0, 6, 0, 0, 0, 0, 0, 0],
        ],
        [
          [0, 0, 0, 2, 6, 0, 7, 0, 1],
          [6, 8, 0, 0, 7, 0, 0, 9, 0],
          [1, 9, 0, 0, 0, 4, 5, 0, 0],
          [8, 2, 0, 1, 0, 0, 0, 4, 0],
          [0, 0, 4, 6, 0, 2, 9, 0, 0],
          [0, 5, 0, 0, 0, 3, 0, 2, 8],
          [0, 0, 9, 3, 0, 0, 0, 7, 4],
          [0, 4, 0, 0, 5, 0, 0, 3, 6],
          [7, 0, 3, 0, 1, 8, 0, 0, 0],
        ],
        [
          [0, 1, 0, 0, 0, 7, 0, 9, 0],
          [0, 0, 5, 0, 0, 0, 7, 0, 0],
          [2, 0, 0, 4, 0, 0, 8, 0, 0],
          [0, 0, 0, 0, 8, 0, 0, 0, 5],
          [0, 0, 0, 1, 0, 9, 0, 0, 0],
          [4, 0, 0, 0, 3, 0, 0, 0, 0],
          [0, 0, 9, 0, 0, 2, 0, 0, 6],
          [0, 0, 6, 0, 0, 0, 2, 0, 0],
          [0, 8, 0, 5, 0, 0, 0, 7, 0],
        ],
        [
          [0, 0, 0, 0, 0, 6, 0, 0, 0],
          [0, 6, 9, 1, 3, 0, 4, 0, 0],
          [0, 8, 0, 0, 0, 0, 0, 5, 7],
          [0, 0, 1, 0, 0, 4, 9, 0, 0],
          [0, 0, 0, 0, 2, 0, 0, 0, 0],
          [0, 0, 3, 5, 0, 0, 2, 0, 0],
          [8, 4, 0, 0, 0, 0, 0, 6, 0],
          [0, 0, 2, 0, 8, 7, 3, 9, 0],
          [0, 0, 0, 9, 0, 0, 0, 0, 0],
        ],
        [
          [0, 7, 0, 0, 4, 0, 0, 1, 0],
          [0, 0, 5, 0, 6, 0, 4, 0, 0],
          [4, 0, 0, 8, 0, 1, 0, 0, 6],
          [0, 5, 0, 0, 0, 0, 0, 3, 0],
          [2, 0, 0, 4, 0, 9, 0, 0, 8],
          [0, 6, 0, 0, 0, 0, 0, 7, 0],
          [6, 0, 0, 7, 0, 8, 0, 0, 2],
          [0, 0, 3, 0, 2, 0, 9, 0, 0],
          [0, 8, 0, 0, 9, 0, 0, 6, 0],
        ],
        [
          [0, 0, 0, 0, 9, 0, 0, 0, 0],
          [0, 2, 0, 8, 0, 0, 0, 9, 4],
          [0, 1, 8, 0, 0, 5, 0, 6, 0],
          [1, 0, 0, 0, 0, 7, 2, 0, 0],
          [0, 0, 0, 3, 0, 9, 0, 0, 0],
          [0, 0, 3, 1, 0, 0, 0, 0, 5],
          [0, 5, 0, 9, 0, 0, 6, 1, 0],
          [2, 9, 0, 0, 0, 3, 0, 7, 0],
          [0, 0, 0, 0, 8, 0, 0, 0, 0],
        ],
        [
          [1, 0, 0, 9, 0, 0, 0, 0, 6],
          [0, 2, 3, 0, 0, 5, 0, 0, 0],
          [0, 0, 0, 0, 7, 0, 2, 4, 0],
          [3, 1, 0, 6, 0, 0, 0, 8, 0],
          [0, 6, 0, 0, 4, 0, 0, 7, 0],
          [0, 8, 0, 0, 0, 7, 0, 2, 5],
          [0, 4, 1, 0, 9, 0, 0, 0, 0],
          [0, 0, 0, 5, 0, 0, 3, 9, 0],
          [2, 0, 0, 0, 0, 3, 0, 0, 8],
        ],
        [
          [9, 0, 0, 6, 0, 0, 0, 0, 0],
          [0, 6, 0, 0, 9, 0, 4, 1, 0],
          [0, 0, 8, 0, 3, 7, 0, 6, 0],
          [0, 5, 0, 4, 7, 0, 0, 0, 0],
          [2, 0, 9, 0, 0, 0, 6, 0, 3],
          [0, 0, 0, 0, 6, 9, 0, 7, 0],
          [0, 7, 0, 9, 1, 0, 3, 0, 0],
          [0, 1, 4, 0, 5, 0, 0, 8, 0],
          [0, 0, 0, 0, 0, 4, 0, 0, 7],
        ],
      ];      
  
    useEffect(() => {
        const interval = setInterval(() => {
            setFadeClass('fade-out'); // Start fading out numbers
        
            setTimeout(() => {
            setVisibleGrid((prevGrid) => (prevGrid + 1) % grids.length);
            setFadeClass('fade-in'); // Start fading in new numbers
            }, 500); // Duration of the fade-out effect
        }, 15000); // Change grid every 5 seconds
        
        return () => clearInterval(interval);
    }, [currentGrid, grids.length]);

    const modes = ["easy", "medium", "hard", "extreme"]
    const modeColors = [
        "green", // easy
        "yellow", // medium
        "orange", //hard
        "red" //extreme
    ]

    const [mode, setMode] = useState(0)
    
    let resumeMode = JSON.parse(sessionStorage.getItem('currentSudoku'))?.mode
    // let resumeModeIdx
    // resumeMode == "easy" ? resumeModeIdx = 0 : resumeMode == "medium" ? resumeModeIdx=1 : resumeMode=="hard" ? resumeModeIdx=2 : resumeModeIdx=3

    const changeMode = () => {
        setMode((prev) => ((prev+1) % modes.length))
    }

    const handleResumeButton = () => {
        let mode = JSON.parse(sessionStorage.currentSudoku).mode
        console.log(mode);
        navigate('/game?mode=' + mode)
    }

    const handlePlayButton = () => {
        sessionStorage.removeItem('currentSudoku')
        navigate('/game?mode=' + modes[mode])
    }

  return (
    <>
        <Navbar />
        <Container maxW='container.xl'>
        <SimpleGrid columns={[1,1,1,2]} mt={[5, 25, 85]} spacing={5}>
            <Center>
                <div className="main-sudoku-grid">
                    {grids[visibleGrid].map((elem, row) =>
                    elem.map((number, col) => (
                        <div
                        className={"main-grid-cell-home "
                            .concat(row % 3 === 0 ? "border-top " : "")
                            .concat(row % 3 === 2 ? "border-bottom " : "")
                            .concat(col % 3 === 0 ? "border-left " : "")
                            .concat(col % 3 === 2 ? "border-right " : "")
                        }
                        key={row * 9 + col}
                        >
                        <span className={`number-home ${fadeClass}`}>
                            {number || ''}
                        </span>
                        </div>
                    ))
                    )}
                </div>
            </Center>
            <Center>
                <Box>
                    <HStack>
                    <Heading mb={4} size='lg'>Solve Sudoku Online on the</Heading>
                    <Tooltip label="Thala for a Reason 😑" color='yellow.300' placement='top'><Heading mb={4} size='lg'><Highlight query='7' styles={{color:'yellow.300'}}>#7</Highlight></Heading></Tooltip>
                    <Heading mb={4} size='lg'>Site!</Heading>
                    </HStack>
                    <StatGroup>
                        <Stat>
                            <StatLabel>Total Sudoku Solved Today</StatLabel>
                            <StatNumber>345,670</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Solving Now</StatLabel>
                            <StatNumber>45,243</StatNumber>
                        </Stat>
                    </StatGroup>
                    <Center>
                    <SimpleGrid columns={[1,2,3]} w={[200, 350, 500]} spacing={[1,5]}>
                        {
                            log ? 
                        <Button size='lg' colorScheme='purple' mt='24px' onClick={handlePlayButton}>
                            Play
                        </Button> :
                        <Button size='lg' colorScheme='purple' mt='24px' onClick={handlePlayButton}>
                            Play as a Guest
                        </Button>
                        }
                        <Button size='lg' colorScheme={modeColors[mode]} mt='24px' onClick={changeMode}>
                            Mode: {modes[mode]}
                        </Button>
                        {
                        sessionStorage.getItem('currentSudoku') ? (    
                            <Button size='lg' mt='24px' onClick={handleResumeButton}>{'Resume (' + resumeMode + ')'}</Button>
                        ) : (
                            <></>
                        )
                        }
                    </SimpleGrid>
                    </Center>
                </Box>
            </Center>
        </SimpleGrid>
        </Container>
    </>
  )
}

export default Landing