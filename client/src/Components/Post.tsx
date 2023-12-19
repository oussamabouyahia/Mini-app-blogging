import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Box,
  StackDivider,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import { PostType } from "../type";
import AlertDialogComponent from "./AlertDialogComponent";
const Post = ({
  userName,
  title,
  content,
  userId,
  deletePost,
  editPost,
  setUpdateTitle,
  setUpdateContent,
}: PostType) => {
  const [edit, setEdit] = useState<boolean>(false);
  useEffect(() => {
    setUpdateTitle ? setUpdateTitle(title) : null;
    setUpdateContent ? setUpdateContent(content) : null;
  }, []);
  return (
    <Card style={{ margin: "10%" }}>
      <CardHeader>
        <Heading size="md">{userName}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              {edit ? (
                <Input
                  type="text"
                  defaultValue={title}
                  onChange={(e) => {
                    setUpdateTitle ? setUpdateTitle(e.target.value) : null;
                  }}
                />
              ) : (
                title
              )}
            </Heading>
            <Text pt="2" fontSize="sm">
              {edit ? (
                <Input
                  type="text"
                  defaultValue={content}
                  onChange={(e) => {
                    setUpdateContent ? setUpdateContent(e.target.value) : null;
                  }}
                />
              ) : (
                content
              )}
            </Text>
          </Box>
          {userId === localStorage.getItem("userId") && (
            <Box>
              {/* <Button onClick={deletePost}>
                <DeleteIcon color="red" />
              </Button> */}
              <AlertDialogComponent onDelete={deletePost} />
              <Button style={{ margin: "3%" }} onClick={() => setEdit(true)}>
                <EditIcon color="blue" />
              </Button>
              <Button color="green" onClick={editPost}>
                Save update
              </Button>
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Post;
