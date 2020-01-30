import React from "react";
import Game from "containers/Game";
import Winners from "containers/Winners";
import SettingsBar from "containers/SettingsBar";
import WinnerBar from "components/WinnerBar";
import ErrorBoundry from "components/ErrorBoundry";
import { Container, Grid, Divider } from "@material-ui/core";

const Layout = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <ErrorBoundry>
            <SettingsBar />
          </ErrorBoundry>
        </Grid>
        <Grid item xs={12}>
          <ErrorBoundry>
            <WinnerBar />
          </ErrorBoundry>
          <Divider />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ErrorBoundry>
            <Game />
          </ErrorBoundry>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ErrorBoundry>
            <Winners />
          </ErrorBoundry>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Layout;
