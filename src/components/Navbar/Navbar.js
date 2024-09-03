import React from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { Flex,Box,Heading,Spacer,ButtonGroup,Button,Text } from '@chakra-ui/react'

const Navbar = () => {

  const navigate = useNavigate()

  const returnHome = () => {
    navigate('/')
  }

  const seeProfile = () => {
    navigate('/myprofile')
  }

  //If user tries to change its username from localStorage, set it back to the correct one, the one stored in the jwt-token
  const getUsername = () => {
    if(localStorage.getItem('sudokuUser')) {
          let token = JSON.parse(localStorage.getItem('sudokuUser')).token
          return jwtDecode(token).username
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
    <Box as="nav" w="100%" h="60px" bg="gray.500" color="white" alignItems="center" justifyContent="space-between" px="4">
        <Flex height='59' alignItems='center' gap='2' paddingInline={[0, 25, 100]}>
          <Box p='2'>
            <Heading as='button' size='lg' onClick={returnHome}>SolveSudoku</Heading>
          </Box>
          <Spacer />
          <ButtonGroup>
            {
              localStorage.getItem('sudokuUser') ? (
                <>
                  <Flex gap='3' alignItems='center'>
                    <Box ml='3'>
                      <Text fontSize='20px' fontWeight='bold'>{getUsername() ? `${getUsername()}`  : ""}</Text>
                    </Box>
                    <Box 
                      bg='teal.500' as='button'
                      width='38px' height='38px' borderRadius='19px'
                      display='flex' justifyContent='center' alignItems='center' 
                      fontSize='25px' fontWeight='500' onClick={seeProfile}>
                      {initial()}
                    </Box>
                  </Flex>
                </>
              ) : (
                <>
                  <Button colorScheme='purple' onClick={() => navigate('/signup')}>Sign up</Button>
                  <Button colorScheme='purple' onClick={() => navigate('/login')}>Log in</Button>
                </>
              )
            }
          </ButtonGroup>
        </Flex>
    </Box>
  )
}

export default Navbar