import React, {useEffect, useState} from 'react'
import { useDispatch, connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyStatistics } from '../actions/myStatistics'
import { deleteAccount } from '../actions/auth'
import jwtDecode from 'jwt-decode'

import Navbar from './Navbar/Navbar'
import { Center, Flex, Stat, StatLabel, StatNumber, Text, Button, ButtonGroup, 
    Heading, Box, Skeleton, Container, SimpleGrid, useDisclosure,
    Modal, ModalContent, ModalFooter, ModalBody, Stack, ModalOverlay, Spacer} from '@chakra-ui/react';

const User = ({myStatistics}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [sureToDelete, setSureToDelete] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [username, setUsername] = useState("")
    const [loading,setLoading] = useState(false)

    const handleSureToDelete = () => {
        setSureToDelete((prev) => !prev)
    }

    const logout = () => {
        dispatch({type: 'LOGOUT'})

        if(!localStorage.getItem('sudokuUser'))
            navigate('/')
    }  

    const handleDeleteAccount = () => {
        dispatch(deleteAccount(navigate))
    }

    useEffect(() => {
        const loadStats = async () => {
            setLoading(false);
            if(!localStorage.getItem('sudokuUser')){
                navigate('/login')
            }
            else{
                await dispatch(getMyStatistics())
                let decodedToken = jwtDecode(JSON.parse(localStorage.getItem('sudokuUser')).token)
                setUsername(decodedToken?.username)
            }
            setLoading(true);
        };
        loadStats();
    }, [dispatch])

    const getUsername = () => {
        if(localStorage.getItem('sudokuUser')) {
              let token = JSON.parse(localStorage.getItem('sudokuUser')).token
              return jwtDecode(token).username.toUpperCase()
            }
        return undefined
      }
    
      const initial = () => {
        if(localStorage.getItem('sudokuUser')) {
          let token = JSON.parse(localStorage.getItem('sudokuUser')).token
          return jwtDecode(token).username[0].toUpperCase()
        }
      return undefined
      }

  return (
    <>
        <Navbar />
        <Container maxW='container.xl'>
            <Center mt={["50px","150px"]}>
                <Flex direction={["column","row"]} gap={["10px","50px"]}>
                <Center>
                    <Flex direction='column' alignItems='center' gap={4}>
                        <Box 
                            bg='teal.500' as='button' paddingBottom={5}
                            width='250px' height='250px' borderRadius='125px'
                            display='flex' justifyContent='center' alignItems='center' 
                            fontSize='200px' fontWeight='500'>
                            {initial()}
                        </Box>
                        <Text fontWeight='500' fontSize='25px'>{getUsername()}</Text>
                    </Flex>
                </Center>
                <Center>
                    <Box>
                    <Heading mb={4}>Total Sudoku Solved:</Heading>
                    <Skeleton isLoaded={loading}>
                        <SimpleGrid columns={[2,2,4]} spacing={10}>
                            <Stat>
                                <StatLabel color='green'>Easy:</StatLabel>
                                <StatNumber>{myStatistics[0]}</StatNumber>
                            </Stat>
                            <Stat>
                                <StatLabel color='yellow'>Medium:</StatLabel>
                                <StatNumber>{myStatistics[1]}</StatNumber>
                            </Stat>
                            <Stat>
                                <StatLabel color='orange'>Hard:</StatLabel>
                                <StatNumber>{myStatistics[2]}</StatNumber>
                            </Stat>
                            <Stat>
                                <StatLabel color='red'>Extreme:</StatLabel>
                                <StatNumber>{myStatistics[3]}</StatNumber>
                            </Stat>
                        </SimpleGrid>
                    </Skeleton>
                        <ButtonGroup gap='2'>
                            <Button size='lg' colorScheme='red' mt='24px' onClick={logout}>
                                Log out
                            </Button>
                            <Button size='lg' colorScheme='red' mt='24px' onClick={()=>{onOpen()}}>
                                Delete Account
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Center>
                </Flex>
                <Modal isCentered isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(2px)'/>
                    <ModalContent>
                    <Center>
                    <ModalBody>
                        <Center><Heading size='md'>Delete Account</Heading></Center>
                        <Center mt="10px"><Text>Are you sure you want to delete your account?</Text></Center>
                    </ModalBody>
                    </Center>
                    <Center>
                    <ModalFooter>
                        <Stack direction='row' spacing={4}>
                            <Button w="100px" colorScheme='green' onClick={onClose}>No</Button>
                            <Button w="100px" colorScheme='red' onClick={handleDeleteAccount}>Yes</Button>
                        </Stack>
                    </ModalFooter>
                    </Center>
                    </ModalContent>
                </Modal>
            </Center>
        </Container>
    </>
  )
}

const mapStateToProps = (state) => {
    let myStatistics = state.myStatistics
    return {
        myStatistics
    }
}

export default connect(mapStateToProps)(User)