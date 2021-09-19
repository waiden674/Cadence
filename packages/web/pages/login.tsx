import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useLogin } from '../hooks/auth';

export default function Login() {
  const login = useLogin();

  return (
    <Flex
      width="100%"
      flex={1}
      alignItems="center"
      justifyContent="center"
      bgColor="#2E2E2E"
      mt="-50px"
    >
      <Box p={8} width="100%" maxW="1200px">
        <Box my={2}>
          <Heading fontSize="3rem" color="#B1AEAE" fontWeight="500" mb="20px">
            Login
          </Heading>
          <Text fontSize="1.2rem" color="#EFEFEF">
            See how your team is doing by signing in with your Github account
          </Text>
        </Box>
        <Box marginTop="8vh">
          <Flex
            bgColor="#6066D2"
            color="#EFEFEF"
            as="button"
            h="90px"
            maxWidth="550px"
            width="100vw"
            alignItems="center"
            p="20px"
            onClick={login}
          >
            <GithubIcon />
            <Flex width="100%" alignItems="center" justifyContent="center">
              <Text fontWeight="400" fontSize="1.3rem">
                Sign In with Github Account
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <DesignVector />
    </Flex>
  );
}

function GithubIcon() {
  return (
    <svg
      width="59"
      height="57"
      viewBox="0 0 59 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.6759 0.218995C15.5284 0.217183 3.46829 10.4487 1.20317 24.3746C-1.06195 38.3006 7.13677 51.8089 20.5595 56.2664C22.0052 56.5259 22.5228 55.6408 22.5228 54.8796C22.5228 54.1963 22.4996 52.3856 22.491 49.9781C14.4675 51.708 12.7732 46.1203 12.7732 46.1203C12.245 44.3815 11.1094 42.8891 9.57245 41.9136C6.97024 40.1289 9.77195 40.1693 9.77195 40.1693C11.6244 40.4225 13.2547 41.517 14.187 43.1332C14.9762 44.5641 16.3057 45.6213 17.8801 46.0702C19.4546 46.519 21.1436 46.3222 22.5719 45.5234C22.7061 44.0645 23.357 42.701 24.4079 41.6772C18.0065 40.9535 11.2754 38.4854 11.2754 27.4628C11.2399 24.6118 12.3016 21.8557 14.242 19.7616C13.364 17.2801 13.4674 14.5581 14.5311 12.1499C14.5311 12.1499 16.9511 11.3743 22.4592 15.0937C27.1832 13.802 32.1687 13.802 36.8927 15.0937C42.4036 11.3714 44.8208 12.1499 44.8208 12.1499C45.8894 14.557 45.9929 17.2808 45.1099 19.7616C47.0574 21.8555 48.1182 24.6189 48.0706 27.4743C48.0706 38.5258 41.3338 40.9535 34.9093 41.6657C36.2951 43.0786 37.0059 45.017 36.8609 46.9881C36.8609 50.8344 36.8262 53.9368 36.8262 54.8796C36.8262 55.6494 37.3409 56.5432 38.8126 56.2607C52.2297 51.7955 60.4197 38.2864 58.1499 24.3642C55.8801 10.442 43.8205 0.215767 29.6759 0.218995Z"
        fill="#EFEFEF"
      />
    </svg>
  );
}

function DesignVector() {
  return (
    <svg
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      viewBox="0 0 1152 242"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 170.119L48 182.099C96 194.079 192 218.04 288 212.049C384 206.059 480 170.119 576 122.198C672 74.2766 768 14.3754 864 2.39517C960 -9.58507 1056 26.3556 1104 44.326L1152 62.2964V242H1104C1056 242 960 242 864 242C768 242 672 242 576 242C480 242 384 242 288 242C192 242 96 242 48 242H0V170.119Z"
        fill="#D06C7F"
      />
    </svg>
  );
}
