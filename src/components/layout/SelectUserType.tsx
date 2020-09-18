import * as React from 'react';
import { makeStyles, Grid, Paper, Typography, Divider } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BrandLogoImage from '../../images/logo.svg';
import { useHeight, useLayout, useLogout } from './hooks';
import { evalFunc } from '../../helpers';

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

const buttons = [
  {
    label: 'Admin',
    state: { admin: true, student: undefined, instructor: undefined },
    filter: ({ isAdmin }) => isAdmin
  },
  {
    label: 'Instructor',
    state: ({ instructors }) => ({ admin: false, student: undefined, instructor: instructors[0] }),
    filter: ({ instructors }) => instructors.length > 0
  },
  {
    label: 'Student',
    state: ({ students }) => ({ admin: false, student: students[0], instructor: undefined }),
    filter: ({ students }) => students.length > 0
  }
];

export default function SelectUserType({ instructors = [], students = [], isAdmin, onBack = undefined }) {
  const height = useHeight();
  const classes = useStyles({ height });
  var buttonRef = React.useRef(null);
  const [, setLayout] = useLayout();
  const onLogout = useLogout();
  const handleSelect = React.useCallback(props => () => setLayout(props), [setLayout]);
  const isError = !isAdmin && instructors.length === 0 && students.length === 0;
  const BannerMsg = isError ? 'No associated user types' : 'You have multiple user types, please select desired user type:';

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
                {buttons.map(
                  ({ label, state, filter }, i) =>
                    filter({ instructors, students, isAdmin }) && (
                      <Grid item>
                        <div className={classes.wrapper}>
                          <Button
                            ref={i === 0 ? buttonRef : undefined}
                            fullWidth={true}
                            variant='contained'
                            className={classes.button}
                            onClick={handleSelect(evalFunc(state, { instructors, students, isAdmin }))}
                          >
                            {label}
                          </Button>
                        </div>
                      </Grid>
                    )
                )}
                <Grid item>
                  <div className={classes.wrapper}>
                    <Button fullWidth={true} variant='contained' onClick={onLogout}>
                      Logout
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  {isError && (
                    <Typography align='center' color='error' className={classes.summary}>
                      You have not accepted any invites yet. You need to receive and accept an invite before you can use this application.
                    </Typography>
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
