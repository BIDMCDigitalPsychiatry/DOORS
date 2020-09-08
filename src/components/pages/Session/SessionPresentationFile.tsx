import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { blue } from '@material-ui/core/colors';
import * as Icons from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345
    },
    avatar: {
      backgroundColor: blue[500]
    }
  })
);

export default function SessionPresentationFile({ name = 'Unknown File Name', date = 'Unknown Date' }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            <Icons.FileCopy />
          </Avatar>
        }
        action={
          <IconButton aria-label='settings' onClick={() => alert('To be completed')}>
            <Icons.MoreVert />
          </IconButton>
        }
        title={name}
        subheader={`Uploaded on ${date}`}
      />
    </Card>
  );
}
