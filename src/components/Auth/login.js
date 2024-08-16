import { Center,Heading,Input,Link,Button,Text,HStack,Flex,Checkbox,Spacer,
    FormControl,FormLabel,FormErrorMessage} from '@chakra-ui/react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signin } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import Navbar from '../Navbar/Navbar'

function Login(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errorHandler, setErrorHandler] = useState({hasError: false, message:""})
  const [formData, setFormData] = useState({
    password: '',
    usernameoremail: '',
  })
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(signin(formData, navigate, setErrorHandler))
  }
  return (
    <>
      <Navbar />
      <Center h='100vh'>
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
            <Flex w='100%'>
                {/* <Checkbox isChecked={remember} onChange={(e) => setRemember(e.target.checked)}>Remember Me</Checkbox> */}
                <Spacer />
                <Link color='teal.500' onClick={()=>navigate("/forget")}>Forgot Password?</Link>
            </Flex>
            <Button colorScheme='purple' size='lg' w='100%' onClick={handleSubmit}>Login</Button>
            <Text>Don't have an account?{' '}
              <Link color='teal.500' onClick={()=>navigate("/signup")}>
                Signup
              </Link>
            </Text>
          </HStack>
      </Center>
    </>
  );
}

export default Login;
