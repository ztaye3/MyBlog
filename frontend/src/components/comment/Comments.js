import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  // Avatar,
  Typography
} from "@material-ui/core";
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from '../../utils/avatar';
import { DateFromNow, ShareAPI } from "../../utils/functions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  fonts: {
    fontWeight: "bold"
  },
  inline: {
    display: "inline"
  }
}));

const Comment = ({ comments }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {comments.map(comment => {
        return (
          <React.Fragment key={comment.id}>
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemAvatar>
                      <Avatar
                            style={{ width: '40px', height: '40px' }}
                            avatarStyle='Circle'
                            {...generateRandomAvatarOptions() } />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className={classes.fonts}>
                    {comment.created_by}
                  </Typography>
                }
                secondary={
                  <>
                    {` - ${comment.content}`}
                  </>
                }
              />
              <i style={{ textAlign: "right", color: "gray" }}>{DateFromNow(comment.created_date)}</i>
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Comment;