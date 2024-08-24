import { Center, SimpleGrid, Box, Container, Flex, Stack, Divider, Avatar, Text, Badge, Image, Button, HStack } from '@chakra-ui/react'
import {React, useState} from 'react'
import Navbar from './Navbar/Navbar'
import '../css/index.css'

const Profile = () => {

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

  return (
    <Box>
    <Navbar />
    <Container maxW='1150px'>
            <Flex direction={["column","row"]} bg="blue.300" mt="75px">
                <Box>
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
                </Box>
                <Box h="100%" w={['100%','100%']} bg="red.500">
                    <Box h="25px" bg="red.300"></Box>
                    <Center>
                        <SimpleGrid columns={[5,2,5]} spacing={4} bg="red.500">
                            <Box h="50px" w="50px" bg="tomato"></Box>
                            <Box h="50px" w="50px" bg="tomato"></Box>
                            <Box h="50px" w="50px" bg="tomato"></Box>
                            <Box h="50px" w="50px" bg="tomato"></Box>
                            <Box h="50px" w="50px" bg="tomato"></Box>
                            <Box h="50px" w="50px" bg="tomato"></Box>
                            <Box h="50px" w="50px" bg="tomato"></Box>
                            <Box h="50px" w="50px" bg="tomato"></Box>
                            <Box h="50px" w="50px" bg="tomato"></Box>
                            <Box h="50px" w="50px" bg="tomato"></Box>
                        </SimpleGrid>
                    </Center>
                    <Stack bg="red.700">
                        <Center><Button w="50%">Reset</Button></Center>
                        <Center><Button w="50%">New Game</Button></Center>
                    </Stack>
                </Box>
            </Flex>
    </Container>
    </Box>
    // <Box>
    //     <Navbar />
    //     <Container maxW='1150px'>
    //     <Stack direction={['column', 'row']} pt={5} pb={5} spacing={4} >
    //         <Box h="1000px" w={['100%','400px']} bg='teal.500' borderRadius="10px" p={4}>
    //             <Stack>
    //                 <Flex>
    //                     <Image
    //                         borderRadius='10px'
    //                         boxSize='100px'
    //                         objectFit='cover'
    //                         src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    //                         alt='Caffe Latte'
    //                     />
    //                     <Box ml='3'>
    //                         <Text fontWeight='bold'>Shreyansh Netam</Text>
    //                         <Text fontSize='sm'>SHRYNSH</Text>
    //                     </Box>
    //                 </Flex>
    //                 <Text mt="2px" fontSize='sm'>Description........</Text>
    //                 <Button>Edit Profile</Button>
    //                 <Text mt="2px" fontSize='sm'>location</Text>
    //             </Stack>
    //             <Center h="30px"><Divider /></Center>
    //         </Box>
    //         <Stack w={['100%','100%']} spacing={4}>
    //             {/* <Box h="200px" bg='green.300' borderRadius="10px"></Box> */}
    //             <Stack direction={['column', 'column', 'row']} spacing={[4,4,0]}>
    //                 <Box h="200px" w='100%' bg='green.300' borderLeftRadius="10px" borderRightRadius={['10px', '10px', '0px']}></Box>
    //                 <Box h="200px" w='100%' bg='green.300' borderRightRadius="10px" borderLeftRadius={['10px', '10px', '0px']}></Box>
    //             </Stack>
    //             <Stack direction={['column', 'column', 'row']} spacing={4}>
    //                 <Box h="200px" w='100%' bg='green.500' borderRadius="10px"></Box>
    //                 <Center h="200px" w='100%' bg='green.500' borderRadius="10px">
    //                     {/* <SimpleGrid columns={2}>
    //                         <Box h="50px" w='100px' bg='red.500'>Easy</Box>
    //                         <Box h="50px" w='100px' bg='red.500'>Med.</Box>
    //                         <Box h="50px" w='100px' bg='red.500'>Hard</Box>
    //                         <Box h="50px" w='100px' bg='red.500'>Ext.</Box>
    //                     </SimpleGrid> */}
    //                     <SimpleGrid columns={2} spacing={8}>
    //                         <Center bg='tomato' h='60px' w='150px' borderRadius="10px">
    //                             <Flex direction="column">
    //                                 <Center><Text fontSize='md' fontWeight='bold'>Easy</Text></Center>
    //                                 <Center fontSize='sm'>67</Center>
    //                             </Flex>
    //                         </Center>
    //                         <Center bg='tomato' h='60px' w='150px' borderRadius="10px">
    //                             <Flex direction="column">
    //                                 <Center><Text fontSize='md' fontWeight='bold'>Medium</Text></Center>
    //                                 <Center fontSize='sm'>41</Center>
    //                             </Flex>
    //                         </Center>
    //                         <Center bg='tomato' h='60px' w='150px' borderRadius="10px">
    //                             <Flex direction="column">
    //                                 <Center><Text fontSize='md' fontWeight='bold'>Hard</Text></Center>
    //                                 <Center fontSize='sm'>27</Center>
    //                             </Flex>
    //                         </Center>
    //                         <Center bg='tomato' h='60px' w='150px' borderRadius="10px">
    //                             <Flex direction="column">
    //                                 <Center><Text fontSize='md' fontWeight='bold'>Extreme</Text></Center>
    //                                 <Center fontSize='sm'>19</Center>
    //                             </Flex>
    //                         </Center>
    //                     </SimpleGrid>
    //                 </Center>
    //             </Stack>
    //             <Box h="200px" bg='green.700' borderRadius="10px"></Box>
    //             <Box h="300px" bg='green.900' borderRadius="10px"></Box>
    //         </Stack>
    //     </Stack>
    //     </Container>
    // </Box>
  )
}

export default Profile