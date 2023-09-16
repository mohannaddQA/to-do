import React, { useEffect, useContext, useState } from "react";
import { SettingContext } from "../../context/settings/index";
import useForm from "../../hooks/form.jsx";
import List from "./list.jsx";
import Form from "../Form/index.jsx";
import { Group, Container, Title } from "@mantine/core";
import { v4 as uuid } from "uuid";
import Auth from "../../auth/components/auth";

const ToDo = () => {
  const settings = useContext(SettingContext);

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  useEffect(() => {
    // Load saved settings from localStorage
    if (localStorage.getItem("toDoSettings")) {
      const savedSettings = JSON.parse(localStorage.getItem("toDoSettings"));
      settings.setItemsPerPage(savedSettings.itemsPerPage);
      settings.setHideCompleted(savedSettings.hideCompleted);
      settings.setSortBy(savedSettings.sortBy);
    }
  }, []);

  // Load tasks from local storage when component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setList(savedTasks);
  }, []);

  // Save tasks to local storage whenever taskList changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
  }, [list]);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [incomplete, list]);

  return (
    <>
      {" "}
      <Auth>
        <Container
          style={{
            backgroundColor: "#343a40",
            color: "white",
            padding: "2rem",
          }}
        >
          <Title order={2} align="center">
            To Do List: {incomplete} items pending
          </Title>
        </Container>{" "}
        <Group position="apart" grow style={{ margin: "2rem 5rem" }}>
          <Auth capability="create">
            <Form
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              incomplete={incomplete}
            />
          </Auth>
        </Group>{" "}
        <Auth capability="read">
          {" "}
          <List
            data={list}
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
          />
        </Auth>
      </Auth>
    </>
  );
};

export default ToDo;
