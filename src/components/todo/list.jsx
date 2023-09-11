import React, { useContext, useEffect, useState } from "react";

import { SettingContext } from "../../context/settings/index";
import {
  Pagination,
  Container,
  Card,
  Text,
  Badge,
  Button,
  Group,
  CardSection,
} from "@mantine/core";

function List(props) {
  const settings = useContext(SettingContext);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const [start, setStart] = useState(settings.itemsPerPage * (activePage - 1));
  const [end, setEnd] = useState(start + settings.itemsPerPage);

  // updates start index for displayed tasks from taskList
  useEffect(() => {
    setStart(settings.itemsPerPage * (activePage - 1));
  }, [activePage, settings.itemsPerPage]);

  // updates end index for displayed tasks from taskList
  useEffect(() => {
    setEnd(start + settings.itemsPerPage);
  }, [start, settings.itemsPerPage]);

  // shows tasks based on if hideCompleted is true or false [not implemented yet]
  useEffect(() => {
    setTaskList(props.data.filter((item) => item).slice(start, end));
  }, [settings.hideCompleted, props.data, start, end]);

  // determines total amount of pages for <Pagination /> component
  useEffect(() => {
    setTotalPages(
      Math.ceil(
        props.data.filter((item) => item).length / settings.itemsPerPage
      )
    );
  }, [props.data, settings.hideCompleted, settings.itemsPerPage]);

  return (
    <>
      <Container style={{ minWidth: "65%" }}>
        {" "}
        {taskList.map((item) => {
          return (
            <div key={item.id}>
              <Card.Section withBorder>
                <Group
                  className="listItemHeader"
                  position="apart"
                  style={{ paddingLeft: "1rem" }}
                >
                  <Group spacing="xl">
                    <Badge color="green" variant="filled">
                      Pending
                    </Badge>

                    <Text fw={500}>{item.assignee}</Text>
                  </Group>

                  <Button
                    color="red"
                    size="xs"
                    onClick={() => props.deleteItem(item.id)}
                  >
                    X
                  </Button>
                </Group>
              </Card.Section>

              <Card.Section withBorder>
                <Container size="97.5%" px={0}>
                  <Text>{item.text}</Text>
                  <Text align="right">Difficulty: {item.difficulty}</Text>
                </Container>
              </Card.Section>
            </div>
          );
        })}
        <Pagination
          value={activePage}
          onChange={setActivePage}
          total={totalPages}
        />
      </Container>
    </>
  );
}

export default List;
