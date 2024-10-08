import { Center,Heading,Input,Link,Button,Text,HStack,FormControl,FormLabel,FormErrorMessage, Spinner} from '@chakra-ui/react'
  import { useState } from 'react';
  import { useNavigate  } from "react-router-dom";
  import { useDispatch } from 'react-redux'
  import { signup } from '../../actions/auth'
  import Navbar from '../Navbar/Navbar'
  
  function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    })
    const [recError, setRecError] = useState("")
    const [error, setError] = useState({
        email: false,
        pass: false,
        checkpass: false,
    })
    const [isLogging,setIsLogging] = useState(false);
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
      setIsLogging(true);
      e.preventDefault();
      await dispatch(signup(formData, navigate, setRecError));
      setIsLogging(false);
    }
    return (
      <>
        <Navbar />
        {isLogging ? <Center mt="270px"><Spinner thickness='6px' speed='0.80s' emptyColor='gray.200' color='blue.500' size='xl' /></Center>
        : 
        <Center h='100vh'>
            <HStack spacing='15px' flexDirection='column' bg='white' w='450px' p={4} borderWidth='1px' borderRadius='lg'>
              <Heading>SignUp</Heading>
              <FormControl >
                <FormLabel>Username</FormLabel>
                <Input type='username' name='username' value={formData.username} onChange={handleChange}/>
              </FormControl>
              <FormControl isInvalid={error.email}>
                <FormLabel>Email<Text as='span' color='red'> *</Text></FormLabel>
                <Input type='email' name='email' value={formData.email} onChange={handleChange}/>
                {error.email && <FormErrorMessage>Please enter valid email!</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={error.pass}>
                <FormLabel>Password<Text as='span' color='red'> *</Text></FormLabel>
                <Input type='password'name='password' value={formData.password} onChange={handleChange}/>
                {error.pass && <FormErrorMessage>Please enter a strong password!</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={error.checkpass}>
                <FormLabel>Confirm Password<Text as='span' color='red'> *</Text></FormLabel>
                <Input type='password' name='repeatPassword' value={formData.repeatPassword} onChange={handleChange}/>
                {error.checkpass && <FormErrorMessage>Please confirm your Password!</FormErrorMessage>}
              </FormControl>
              {/* <Flex w='100%' justify='flex-start'>
                <Checkbox isChecked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)}>I Accept all Terms & Conditions.</Checkbox>
              </Flex> */}
              {recError ? <Center><Text color='tomato'>{recError}</Text></Center> : <></>}
              <Button colorScheme='purple' size='lg' w='100%' onClick={handleSubmit}>Signup</Button>
              <Text>Already have an account?{' '}
                <Link color='teal.500' onClick={()=>navigate("/login")}>
                  Login
                </Link>
              </Text>
            </HStack>
        </Center>}
      </>
    );
  }
  
  export default Signup;  