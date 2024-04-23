import React from "react";
import { IconError404 } from "@tabler/icons-react";
import { Flex, Text, Box } from "@mantine/core";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <Flex justify="center" align="center" direction="column" h="100vh">
      <IconError404 size={100} />
      <Text color="gray" mt={3} fz={24}>
        ไม่มีหน้านะนี้นะครับ ไอ้หำ......
      </Text>
      <Box mt={3}>
        <NavLink to="/complaint/home">
          <Text color="blue" fz={20}>
            Go back to Home
          </Text>
        </NavLink>
      </Box>
    </Flex>
  );
}

export default NotFound;
