import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SettingContext } from "../../context/settings/index";
import {
  NumberInput,
  Container,
  Grid,
  Card,
  Button,
  NativeSelect,
} from "@mantine/core";
import "./sittings.css";

function SettingsPage() {
  const settings = useContext(SettingContext);
  const [submitted, setSubmitted] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(settings.hideCompleted);

  const [updatedSettings, setUpdatedSettings] = useState({
    itemsPerPage: settings.itemsPerPage,
  });

  const handleHideCompletedChange = () => {
    setHideCompleted(!hideCompleted);
  };

  const handleItemsPerPageChange = (value) => {
    setUpdatedSettings((prevSettings) => ({
      ...prevSettings,
      itemsPerPage: value,
    }));
  };
  /* this use effect was supposed to trigger the saving to local storage but it went wrong because when it runs on the first render it resits the local storage , i will keep it for studying purpose for later */
  // useEffect(() => {
  //   // Update localStorage whenever hideCompleted or itemsPerPage changes
  //   settings.saveSettingsInLocalStorage();
  // }, [hideCompleted, updatedSettings.itemsPerPage, settings]);

  const handleSubmit = (event) => {
    event.preventDefault();
    settings.setHideCompleted(hideCompleted);
    settings.setItemsPerPage(updatedSettings.itemsPerPage);
    settings.saveSettingsInLocalStorage();
    setSubmitted(true);
  };

  return (
    <div className="settings-page">
      <Container>
        <h2>Settings</h2>
        <Grid gutter="xl">
          <Card span={6} shadow="xs">
            <form onSubmit={handleSubmit}>
              <label>
                Hide Completed Tasks
                <input
                  type="checkbox"
                  checked={hideCompleted}
                  onChange={handleHideCompletedChange}
                />
              </label>
              <NumberInput
                defaultValue={updatedSettings.itemsPerPage}
                label="Tasks per Page"
                min={1}
                max={10}
                withAsterisk
                onChange={handleItemsPerPageChange}
              />
              <NativeSelect
                data={["Difficulty"]}
                label="Sort Tasks By"
                withAsterisk
                onChange={(event) => {
                  settings.setSortBy(event.target.value);
                }}
              />
              <Button type="submit" variant="primary">
                Save
              </Button>
            </form>
          </Card>
          <Card span={6} shadow="xs">
            {submitted && (
              <div className="current-settings">
                <h3>Current Settings:</h3>
                <p>
                  Hide Completed Tasks: {settings.hideCompleted ? "Yes" : "No"}
                </p>
                <p>Tasks per Page: {settings.itemsPerPage}</p>
              </div>
            )}
          </Card>
        </Grid>
        <Link to="/">Back to Home</Link>
      </Container>
    </div>
  );
}

export default SettingsPage;
