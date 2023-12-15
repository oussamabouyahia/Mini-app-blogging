import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Box,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { PostType } from "../type";
const Post = ({ userName, title, content }: PostType) => {
  return (
    <Card style={{ margin: "10%" }}>
      <CardHeader>
        <Heading size="md">{userName}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              {title}
            </Heading>
            <Text pt="2" fontSize="sm">
              {content}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Post;
