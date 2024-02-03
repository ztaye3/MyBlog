import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Content from "../Dashboard/Content";
import Buttons from "./Buttons/Buttons";
import ButtonGroup from "./ButtonGroup/ButtonGroup";
import CheckboxLabels from "./Checkbox/Checkbox";
import FloatingButton from "./FloatingButton/FloatingButton";
import RadioButton from "./RadioButtons/RadioButton";
import Selects from "./Select/Select";
import Sliders from "./Slider/Slider";
import Switches from "./Switches/Switches";
import TextFields from "./TextField/TextField";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import TextareaAutosize from "./TextareaAutosize/TextareaAutosize";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function AutoGrid() {
  const classes = useStyles();

  return (
    <div>
      <Content>
        <Breadcrumbs />
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Buttons />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <ButtonGroup />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <CheckboxLabels />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <RadioButton />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Selects />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Sliders />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Switches />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <TextFields />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
          </Grid>
        </div>
      </Content>
    </div>
  );
}
