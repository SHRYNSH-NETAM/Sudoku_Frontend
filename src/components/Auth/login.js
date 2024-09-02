import { Center,Heading,Input,Link,Button,Text,HStack,Flex,Checkbox,Spacer,
    FormControl,FormLabel,Spinner} from '@chakra-ui/react'
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { signin } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import Navbar from '../Navbar/Navbar'

function Login(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [recError, setRecError] = useState({hasError: false, message:""})
  const [formData, setFormData] = useState({
    password: '',
    usernameoremail: '',
  })
  const [isLogging,setIsLogging] = useState(false);

  useEffect(() => {
      if(localStorage.sudokuUser){
        navigate("/")
      }
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
      setIsLogging(true);
      e.preventDefault()
      await dispatch(signin(formData, navigate,setRecError))
      setIsLogging(false);
  }
  return (
    <>
      <Navbar />
      {isLogging ? <Center mt="270px"><Spinner thickness='6px' speed='0.80s' emptyColor='gray.200' color='blue.500' size='xl' /></Center>
      :
      <Center mt="100px">
          <HStack spacing='20px' flexDirection='column' bg='white' w='450px' p={4} borderWidth='1px' borderRadius='lg'>
            <Heading>Login</Heading>
            <FormControl onSubmit={handleSubmit}>
              <FormLabel>Username or Email<Text as='span' color='red'> *</Text></FormLabel>
              <Input type='email' name='usernameoremail' value={formData.usernameoremail} onChange={handleChange}/>
            </FormControl>
            <FormControl>
              <FormLabel>Password<Text as='span' color='red'> *</Text></FormLabel>
              <Input type='password' name='password' value={formData.password} onChange={handleChange}/>
            </FormControl>
            {recError.hasError ? <Center><Text color='tomato'>{recError.message}</Text></Center> : <></>}
            <Button colorScheme='purple' size='lg' w='100%' onClick={handleSubmit}>Login</Button>
            <Text>Don't have an account?{' '}
              <Link color='teal.500' onClick={()=>navigate("/signup")}>
                Signup
              </Link>
            </Text>
          </HStack>
      </Center>}
    </>
  );
}

export default Login;
