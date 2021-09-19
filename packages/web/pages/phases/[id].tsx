import { useRouter } from 'next/router';
import { Box, Divider, Flex, Heading, Text, Avatar } from '@chakra-ui/react';
import Sidebar from '../../components/sidebar';
import Timer from '../../components/timer';
import { useUser } from '../../hooks/auth';
import { Task as PrismaTask, User } from '@prisma/client';

export default function SinglePhase() {
  const router = useRouter();
  const { id: phaseId } = router.query;
  const { data } = useUser();

  if (!data) {
    return null;
  }

  const phase = data.teams?.[0].project?.Phases?.find(x => x.id === phaseId);

  if (!phase) {
    return null;
  }

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
            {phase.phaseName}
          </Heading>
          <Divider h="2px" bgColor="#999DEA" borderColor="#999DEA" />
          <Text color="#EFEFEF" fontSize="1.3rem" mt="50px">
            {phase.phaseDescription}
          </Text>
        </Box>
        <Box>
          <Heading mb="1.2rem" as="h2" color="#EFEFEF">
            Tasks
          </Heading>
          <Flex direction="column" gridGap="20px">
            {phase.tasks.map(task => (
              <Task key={task.id} task={task} />
            ))}
          </Flex>
        </Box>
      </Flex>
      <Timer />
    </Flex>
  );
}

function Task({
  task,
}: {
  task: PrismaTask & {
    assignees: User[];
  };
}) {
  return (
    <Box width="100%">
      <Box
        bgColor="#D06C7F"
        color="#EFEFEF"
        py="30px"
        px="20px"
        borderRadius="15px"
      >
        <Text fontSize="1.3rem" fontWeight="400">
          {task.description}
        </Text>
        <Text>{task.description}</Text>
      </Box>
      <Flex mt="10px" gridGap="10px">
        <Avatar height="35px" w="35px" src="/images/user1.png" />
        <Avatar height="35px" w="35px" src="/images/user2.png" />
        <Avatar height="35px" w="35px" src="/images/user3.png" />
      </Flex>
    </Box>
  );
}
