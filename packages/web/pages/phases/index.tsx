import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import Sidebar from '../../components/sidebar';
import Timer from '../../components/timer';
import { useUser } from '../../hooks/auth';
import Link from 'next/link';
import type { Phase as PrismaPhase, Task, User } from '@prisma/client';

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
            Phases
          </Heading>
          <Divider h="2px" bgColor="#999DEA" borderColor="#999DEA" />
        </Box>
        <Box>
          <Box
            as="button"
            bgColor="#6066D2"
            color="#EFEFEF"
            rounded="5px"
            // width="110px"
            height="55px"
            px="20px"
            py="15px"
            fontSize="1.3rem"
          >
            Add Phase
          </Box>
        </Box>
        <Box>
          <Heading mb="1.2rem" as="h2" color="#EFEFEF">
            All Phases
          </Heading>
          <Flex direction="column" gridGap="20px">
            {data.teams[0]?.project?.Phases?.map(phase => (
              <Phase key={phase.id} phase={phase} />
            ))}
          </Flex>
        </Box>
      </Flex>
      <Timer />
    </Flex>
  );
}

function Phase({
  phase,
}: {
  phase: PrismaPhase & {
    tasks: (Task & {
      assignees: User[];
    })[];
  };
}) {
  return (
    <Link href={`/phases/${phase.id}`} passHref>
      <Box
        as="a"
        bgColor="#973F64"
        px="35px"
        py="25px"
        rounded="12px"
        maxW="600px"
        color="#EFEFEF"
      >
        <Flex>
          <Text
            textDecoration="underline"
            fontWeight="600"
            fontSize="1.4rem"
            color="#EFEFEF"
            mb="10px"
          >
            {phase.phaseName}
          </Text>
        </Flex>
        <Box>
          {phase.tasks.map((task, i) => (
            <Flex key={i} alignItems="center">
              <Box
                border="1.5px solid white"
                height="18px"
                width="18px"
                rounded="50%"
              />
              <Text fontSize="1.3rem" ml="10px">
                {task.name}
              </Text>
            </Flex>
          ))}
        </Box>
      </Box>
    </Link>
  );
}
