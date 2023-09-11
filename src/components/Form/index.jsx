import React from "react";

import { TextInput, Stack, Button, Slider, Title } from "@mantine/core";

function Form(props) {
  return (
    <form onSubmit={props.handleSubmit} style={{ width: "10%" }}>
      <Stack spacing="xl">
        <Title order={2}>Add To Do Item</Title>

        <TextInput
          name="text"
          placeholder="Task Description"
          label="Task"
          withAsterisk
          onChange={props.handleChange}
        />

        <TextInput
          name="assignee"
          placeholder="Name"
          label="Assign To"
          withAsterisk
          onChange={props.handleChange}
        />

        <Slider
          label="Difficulty"
          radius="md"
          value={4}
          min={1}
          max={5}
          marks={[
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
          ]}
          onChange={props.handleChange}
        />

        <Button type="submit">Add Item</Button>
      </Stack>
    </form>
  );
}

export default Form;
