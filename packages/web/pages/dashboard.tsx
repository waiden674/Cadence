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
import Sidebar from '../components/sidebar';
import Timer from '../components/timer';
import { useUser } from '../hooks/auth';

export default function Dashboard() {
  const { data } = useUser();

  if (!data) return null;

  return (
    <Flex
      width="100%"
      flex={1}
      // alignItems="center"
      // justifyContent="center"
      bgColor="#2E2E2E"
    >
      <Sidebar />
      <Flex gridGap="40px" direction="column" px="70px" py="50px" flex={7}>
        <Box w="fit-content">
          <Heading fontSize="3.1rem" color="#B1AEAE" fontWeight="600" mb="10px">
            Welcome {data?.username}!
          </Heading>
          <Divider h="2px" bgColor="#999DEA" borderColor="#999DEA" />
        </Box>
        <Box>
          <Heading mb="1.2rem" as="h2" color="#EFEFEF">
            Team
          </Heading>
          <Flex gridGap="25px">
            <Flex
              as="button"
              height="85px"
              w="85px"
              rounded="50%"
              bgColor="#6066D2"
              alignItems="center"
              justifyContent="center"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12H19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Flex>
            <Avatar height="85px" w="85px" src="/images/user1.png" />
            <Avatar height="85px" w="85px" src="/images/user2.png" />
            <Avatar height="85px" w="85px" src="/images/user3.png" />
          </Flex>
        </Box>
        <Box>
          <Flex justifyContent="space-between">
            <Heading mb="1.2rem" as="h2" color="#EFEFEF">
              Tasks
            </Heading>
            <Box as="button">
              <Text color="#EFEFEF">Add Task</Text>
            </Box>
          </Flex>
          <Flex gridGap="30px">
            <Box width="50%">
              <Box
                bgColor="#D06C7F"
                color="#EFEFEF"
                py="30px"
                px="20px"
                borderRadius="15px"
              >
                <Text fontSize="1.3rem" fontWeight="400">
                  Create schedule
                </Text>
                <Text>Lorem ipsum dolor sit amet conse....</Text>
              </Box>
              <Flex mt="10px" gridGap="10px">
                <Avatar height="35px" w="35px" src="/images/user1.png" />
                <Avatar height="35px" w="35px" src="/images/user2.png" />
                <Avatar height="35px" w="35px" src="/images/user3.png" />
              </Flex>
            </Box>
            <Box width="50%">
              <Box
                bgColor="#F29277"
                color="#EFEFEF"
                py="30px"
                px="20px"
                borderRadius="15px"
              >
                <Text fontSize="1.3rem" fontWeight="400">
                  Conduct user research
                </Text>
                <Text>Lorem ipsum dolor sit amet conse....</Text>
              </Box>
              <Flex mt="10px" gridGap="10px">
                <Avatar height="35px" w="35px" src="/images/user1.png" />
                <Avatar height="35px" w="35px" src="/images/user2.png" />
                <Avatar height="35px" w="35px" src="/images/user3.png" />
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Heading mb="1.2rem" as="h2" color="#EFEFEF">
            Phases
          </Heading>
          <Box>
            <Box bgColor="#973F64" w="100%" px="40px" py="30px" rounded="15px">
              <Heading
                fontSize="1.6rem"
                fontWeight="400"
                as="h2"
                color="#EFEFEF"
              >
                Planning and Research
              </Heading>
            </Box>
          </Box>
        </Box>
      </Flex>
      <Timer />
    </Flex>
  );
}
