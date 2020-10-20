import * as React from 'react';
import { makeStyles, Grid, Paper, Typography, Divider, Box } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BrandLogoImage from '../../images/logo.svg';
import { useChangeRoute, useHeight, useLayout, useLogout } from './hooks';
import { onlyUnique } from '../../helpers';
import useGroupName from '../../database/useGroupName';

const useStyles = makeStyles(({ palette }: any) =>
  createStyles({
    root: ({ height }: any) => ({
      background: palette.common.white,
      color: palette.primary.main,
      height,
      overflowY: 'auto'
    }),
    paper: {
      marginTop: 32,
      width: 300
    },
    disclaimer: {
      maxWidth: 650
    },
    summary: {
      marginTop: 8,
      maxWdith: 650
    },
    panelarea: {
      background: '#F5F5F5'
    },
    button: {
      background: palette.primary.main,
      color: palette.common.white,
      '&:hover': {
        background: palette.primary.dark,
        color: palette.common.white
      }
    },
    wrapper: {
      width: 224,
      marginTop: 8
    }
  })
);

const GroupName = ({ groupId }) => {
  const name = useGroupName({ groupId });
  return (
    <Typography style={{ fontSize: 9 }} display='block' variant='overline' noWrap>
      {name}
    </Typography>
  );
};

export default function SelectUserType({ instructors = [], students = [], isAdmin, onBack = undefined }) {
  const height = useHeight();
  const classes = useStyles({ height });
  var buttonRef = React.useRef(null);
  const [, setLayout] = useLayout();
  const onLogout = useLogout();
  const changeRoute = useChangeRoute();
  const handleSelect = React.useCallback(
    props => () => {
      setLayout(props);
      changeRoute('/Classes');
    },
    [setLayout, changeRoute]
  );
  const isError = !isAdmin && instructors.length === 0 && students.length === 0;
  const BannerMsg = isError ? 'No associated user types' : 'You have multiple user types or groups, please select desired user type:';

  var buttons = [];
  if (isAdmin) {
    buttons = buttons.concat({
      label: 'Admin',
      state: { admin: true, student: undefined, instructor: undefined }
    });
  }

  // Instructor buttons
  buttons = buttons.concat(
    instructors.map(instructor => ({
      label: 'Instructor',
      sublabel: instructors.length > 1 && `Invited by: ${instructor.parentId}`,
      state: { admin: false, student: undefined, instructor }
    }))
  );

  // Student buttons
  // Note that students are linked to a student group, so we only need a button for each unique group
  const uniqueStudentGroupIds = students.map(s => s.groupId).filter(onlyUnique);
  buttons = buttons.concat(
    uniqueStudentGroupIds.map(groupId => {
      const student = students.find(s => s.groupId === groupId); // Find the first student entry with a matching group id
      return {
        label: 'Student',
        groupId: uniqueStudentGroupIds.length > 1 && student.groupId,
        state: { admin: false, student, instructor: undefined }
      };
    })
  );

  return (
    <div
      className={classes.root}
      onKeyUp={(e: any) => {
        if (e.keyCode === 13) {
          // Enter key
          buttonRef.current && buttonRef.current.click();
        }
      }}
    >
      <form autoComplete='off'>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography align='center' className={classes.panelarea}>
                <img src={BrandLogoImage} alt='logo' style={{ height: 124 }} />
              </Typography>
              <Divider />
              <Grid container spacing={1} direction='column' justify='center' alignItems='center' style={{ padding: 16 }}>
                <Grid item>
                  <Typography align='center' className={classes.disclaimer}>
                    {BannerMsg}
                  </Typography>
                </Grid>
                {buttons.map(({ label, groupId, state }, i) => (
                  <Grid item key={[label, groupId].filter(l => l).join('-')}>
                    <div className={classes.wrapper}>
                      <Button
                        ref={i === 0 ? buttonRef : undefined}
                        fullWidth={true}
                        variant='contained'
                        className={classes.button}
                        onClick={handleSelect(state)}
                      >
                        <Grid container>
                          {label && (
                            <Grid item xs={12}>
                              {label}
                            </Grid>
                          )}
                          {groupId && (
                            <Grid item xs={12}>
                              <GroupName groupId={groupId} />
                            </Grid>
                          )}
                        </Grid>
                      </Button>
                    </div>
                  </Grid>
                ))}
                <Grid item>
                  <div className={classes.wrapper}>
                    <Button fullWidth={true} variant='contained' onClick={onLogout}>
                      Logout
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  {isError && (
                    <>
                      <Typography align='center' color='error' className={classes.summary}>
                        You have not accepted any invites yet. You need to receive and accept an invite before you can use this application.
                      </Typography>
                      <Box mt={2}>
                        <Typography align='center' color='error' className={classes.summary}>
                          Please contact your instructor or administrator to request an invite. Once you receive an invite, click the link in the email that you
                          receive to accept.
                        </Typography>
                      </Box>
                    </>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
