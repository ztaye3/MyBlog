import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { setDarkTheme } from "../../redux/actions/actions";
import {useTranslation} from "react-i18next";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 15,
  },
  formControl: {
    minWidth: 120,
  },
}));

export default function SettingsForm() {
  const classes = useStyles();
  const darkTheme = useSelector((state) => state.blogStore.darkTheme);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleChange = (event) => {
    if (event.target.name === "darkTheme")
      dispatch(setDarkTheme(event.target.checked));
    // setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="space-between">
            <Grid item>
              <FormControlLabel
                control={<p></p>}
                label={t("setting.darkMode")}
                labelPlacement="start"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkTheme}
                    onChange={handleChange}
                    name="darkTheme"
                  />
                }
                label=""
                labelPlacement="start"
              />
            </Grid>
          </Grid>{" "}
          {/*end container*/}
        </Grid>
      </Grid>
    </form>
  );
}
