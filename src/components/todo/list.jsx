import React, { useContext, useEffect, useState } from "react";

import { SettingContext } from "../../context/settings/index";
import { Pagination } from "@mantine/core";

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

  // shows tasks based on if hideCompleted is true or false
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
      {taskList.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.text}</p>
            <p>
              <small>Assigned to: {item.assignee}</small>
            </p>
            <p>
              <small>Difficulty: {item.difficulty}</small>
            </p>
            <div onClick={() => props.toggleComplete(item.id)}>
              Complete: {item.complete.toString()}
            </div>
            <button onClick={() => props.deleteItem(item.id)}>Remove</button>
          </div>
        );
      })}
      <Pagination
        value={activePage}
        onChange={setActivePage}
        total={totalPages}
      />
    </>
  );
}

export default List;
