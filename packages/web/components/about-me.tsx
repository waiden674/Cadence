import {
  Box,
  Flex,
  Heading,
  Text,
  Textarea,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useUser } from '../hooks/auth';

export default function AboutMe() {
  const { data } = useUser();
  const [skills, setSkills] = useState([]);

  return (
    <Flex
      width="100%"
      flex={1}
      alignItems="center"
      justifyContent="center"
      bgColor="#2E2E2E"
    >
      <Stack direction="column" spacing="40px" p={8} width="100%" maxW="800px">
        <Box my={2}>
          <Heading fontSize="3rem" color="#B1AEAE" fontWeight="500" mb="10px">
            Hello {data?.username}!
          </Heading>
          <Text fontSize="1.7rem" color="#EFEFEF">
            Tell us a little more about yourself!
          </Text>
        </Box>
        <Box>
          <Text color="#EFEFEF" fontSize="1.6rem" fontWeight="400" mb="15px">
            Bio
          </Text>
          <Textarea
            color="#B1AEAE"
            fontSize="1.1rem"
            minH="20vh"
            boxShadow="0 0 0 1.5px white"
            lineHeight={1.5}
            marginLeft="2px"
            _focus={{
              borderColor: 'white',
              boxShadow: '0 0 0 2px white',
            }}
          />
        </Box>
        <Box>
          <Text color="#EFEFEF" fontSize="1.6rem" fontWeight="400" mb="10px">
            Skills
          </Text>

          <InputGroup size="lg">
            <InputLeftElement></InputLeftElement>
            <Input
              color="#B1AEAE"
              fontSize="1.1rem"
              boxShadow="0 0 0 1.5px white"
              // lineHeight={1.5}
              // minH="5vh"
              marginLeft="2px"
              _focus={{
                borderColor: 'white',
                boxShadow: '0 0 0 2px white',
              }}
              onKeyDown={e => {}}
            />
          </InputGroup>
        </Box>
        <Flex justifyContent="flex-end">
          <Box
            as="button"
            bgColor="#6066D2"
            color="#EFEFEF"
            rounded="5px"
            width="110px"
            height="55px"
            fontSize="1.3rem"
          >
            Next
          </Box>
        </Flex>
      </Stack>
    </Flex>
  );
}
