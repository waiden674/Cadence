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
import axios from 'axios';
import api from '../lib/api';

export default function Recommendations() {
  const [val, setVal] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { data } = useUser();
  const [value, setValue] = useState('');

  return (
    <Flex
      width="100%"
      flex={1}
      alignItems="center"
      justifyContent="center"
      bgColor="#2E2E2E"
    >
      <Stack direction="column" spacing="40px" p={8} width="100%" maxW="900px">
        <Box my={2}>
          <Heading fontSize="3rem" color="#B1AEAE" fontWeight="500" mb="10px">
            Hello {data?.username || 'Mokshit06'}!
          </Heading>
          <Text fontSize="1.7rem" color="#EFEFEF">
            Describe your project idea here
          </Text>
        </Box>
        <Box>
          <Text color="#EFEFEF" fontSize="1.6rem" fontWeight="400" mb="15px">
            Description
          </Text>
          <Textarea
            color="#B1AEAE"
            fontSize="1.1rem"
            minH="20vh"
            value={value}
            onChange={e => setValue(e.target.value)}
            boxShadow="0 0 0 1.5px white"
            lineHeight={1.5}
            marginLeft="2px"
            _focus={{
              borderColor: 'white',
              boxShadow: '0 0 0 2px white',
            }}
          />
        </Box>
        <Flex justifyContent="flex-end">
          <Box
            as="button"
            bgColor="#6066D2"
            color="#EFEFEF"
            rounded="5px"
            height="55px"
            px="30px"
            fontSize="1.3rem"
            onClick={async () => {
              const { data } = await axios.post('https://5000.code.mokshitjain.co/recommendations', {
                text: value,
              });
              const { recommendations, ideaMetadata, rune } = data;
              setVal(data);
              setSubmitted(true);
            }}
          >
            Get Recommendations
          </Box>
        </Flex>
        {submitted && (
          <Box px="20px" py="20px" rounded="10px" border="2px solid #EFEFEF">
            <pre style={{ color: '#B1AEAE' }}>
              {JSON.stringify(val, null, 2)}
            </pre>
          </Box>
        )}
      </Stack>
    </Flex>
  );
}
