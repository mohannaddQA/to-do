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
import Auth from "../../auth/components/auth";
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
    settings.hideCompleted
      ? setTaskList(
          props.data.filter((item) => !item.complete).slice(start, end)
        )
      : setTaskList(props.data.slice(start, end));
  }, [settings.hideCompleted, props.data, start, end]);

  // determines total amount of pages for <Pagination /> component
  useEffect(() => {
    settings.hideCompleted
      ? setTotalPages(
          Math.ceil(
            props.data.filter((item) => !item.complete).length /
              settings.itemsPerPage
          )
        )
      : setTotalPages(Math.ceil(props.data.length / settings.itemsPerPage));
  }, [props.data, settings.hideCompleted, settings.itemsPerPage]);

  return (
    <>
      <Container withBorder style={{ minWidth: "65%", padding: "0" }}>
        {" "}
        {taskList.map((item) => {
          return (
            <Card
              mb="20px"
              key={item.id}
              shadow="sm"
              radius="md"
              withBorder
              style={{ padding: "0" }}
            >
              {" "}
              <div>
                <Card.Section withBorder>
                  <Group
                    className="listItemHeader"
                    position="apart"
                    style={{ padding: "0" }}
                  >
                    <Group spacing="xl" withBorder>
                      {item.complete ? (
                        <Badge
                          color="red"
                          variant="filled"
                          style={{ marginLeft: "17px" }}
                        >
                          Complete
                        </Badge>
                      ) : (
                        <Badge
                          color="green"
                          variant="filled"
                          style={{ marginLeft: "17px" }}
                        >
                          Pending
                        </Badge>
                      )}
                      <Text fw={500}>assigned to {item.assignee}</Text>
                    </Group>
                    <Auth capability="delete">
                      <Button
                        color="red"
                        size="xs"
                        onClick={() => props.deleteItem(item.id)}
                        style={{ marginRight: "17px" }}
                      >
                        X
                      </Button>
                    </Auth>
                  </Group>
                </Card.Section>

                <Card.Section withBorder>
                  <Container size="97.5%" px={0}>
                    <Text
                      style={{ marginLeft: "6px", display: "inline-block" }}
                    >
                      {item.text}
                    </Text>

                    <CardSection withBorder>
                      {" "}
                      <Group position="apart">
                        <Text style={{ marginLeft: "18px", fontSize: "20px" }}>
                          Difficulty: {item.difficulty}
                        </Text>
                        <Auth capability="update">
                          {" "}
                          <Button
                            style={{ marginRight: "17px" }}
                            radius="xl"
                            size="xs"
                            onClick={() => props.toggleComplete(item.id)}
                          >
                            Complete: {item.complete.toString()}
                          </Button>
                        </Auth>
                      </Group>
                    </CardSection>
                  </Container>
                </Card.Section>
              </div>
            </Card>
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
