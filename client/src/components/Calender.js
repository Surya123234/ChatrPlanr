import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router";
import ChatComponent from "./Chat";
import NewCal from "./newCal";

const Calendar = ({}) => {
  const { id } = useParams();

  return (
    <Grid templateColumns="repeat(5, 1fr)" justifyContent="center">
      <Box w="50vw" h="100vh" padding={3}>
        <NewCal id={id} />
      </Box>
      <Box w="50vw" h="100vh">
        <ChatComponent id={id} padding={3} />
      </Box>
    </Grid>
  );
};

export default Calendar;
