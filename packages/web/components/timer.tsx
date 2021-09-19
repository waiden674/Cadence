import {
  Box,
  Flex,
  Heading,
  Text,
  Textarea,
  Stack,
  Input,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  Divider,
  Avatar,
} from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

export default function Timer() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      flex={4}
    >
      <Box>
        <Heading mb="1.2rem" as="h2" color="#EFEFEF">
          End of Hackathon
        </Heading>
        <Box>
          <CircularProgress
            value={40}
            color="#D06C7F"
            size="250px"
            thickness="5px"
          >
            <CircularProgressLabel color="#EFEFEF" fontSize="1.5rem">
              23h 15m
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Box>
    </Flex>
  );
}
