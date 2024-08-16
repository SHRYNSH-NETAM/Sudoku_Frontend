import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyStatistics } from '../actions/myStatistics'
import { deleteAccount } from '../actions/auth'
import jwtDecode from 'jwt-decode'

import Navbar from './Navbar/Navbar'
import { Center, Flex, Stat, StatLabel, StatNumber, Text, StatGroup, 
    Button, ButtonGroup, Heading, Box
 } from '@chakra-ui/react'


const User = ({myStatistics}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [sureToDelete, setSureToDelete] = useState(false)

    const [username, setUsername] = useState("")

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

        if(!localStorage.getItem('sudokuUser'))
            navigate('/login')
        else
            dispatch(getMyStatistics())
            //get username from jwt
            let decodedToken = jwtDecode(JSON.parse(localStorage.getItem('sudokuUser')).token)
            setUsername(decodedToken?.username)
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
        <Center gap={50}>
            <Center height='700px'>
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
            <Center height='700px' width='500px'>
                <Box>
                    <Heading mb={4}>Total Sudoku Solved:</Heading>
                    <StatGroup gap={100}>
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
                    </StatGroup>
                    <ButtonGroup gap='2'>
                        <Button size='lg' colorScheme='red' mt='24px' onClick={logout}>
                            Log out
                        </Button>
                        <Button size='lg' colorScheme='red' mt='24px' onClick={handleSureToDelete}>
                            Delete Account
                        </Button>
                    </ButtonGroup>
                </Box>
            </Center>
            { sureToDelete ?
                (
                    <>
                    <div className='opacity-popup'></div>
                        <div id="sureToDeleteAccount">
                            <h2>We are sorry you want to go...</h2>
                            <p>Are you sure you want to delete your account?</p>
                            <div id="deleteAccountButtonsContainer">
                                <button id="yesDeleteAccountButton" onClick={handleDeleteAccount}>Yes</button>
                                <button id="noDeleteAccountButton" onClick={handleSureToDelete}>No</button>
                            </div>
                        </div>
                    </>
                ) : (<></>)
                }
        </Center>
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