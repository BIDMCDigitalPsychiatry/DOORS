import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useHandleChangeRoute } from './hooks';
import { useLocation } from 'react-router';
import Header from '../layout/Header';
import DialogButton from '../application/GenericDialog/DialogButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    actionsContainer: {
      marginBottom: theme.spacing(2)
    },
    resetContainer: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    container: {
      marginTop: 8,
      marginBottom: 8
    },
    header: {
      color: theme.palette.primary.dark
    },
    stepper: {
      background: 'inherit',
      color: 'inherit'
    },
    stepLabelActive: {
      color: 'white !important'
    },
    stepLabelCompleted: {
      color: 'white !important'
    },
    stepIconRoot: {
      color: 'transparent',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 25
    },
    stepIconActive: {
      color: 'white !important'
    },
    stepIconCompleted: {
      color: 'white !important'
    },
    stepIconText: {
      fill: `${theme.palette.primary.main} !important`
    }
  })
);

export const steps = [{ label: 'Pre-Survey' }, { label: 'Lesson' }, { label: 'Post-Survey' }, { label: 'Resources' }];

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const { pathname } = useLocation();

  React.useEffect(() => {
    var idx = steps.findIndex(s => pathname.endsWith(`/${s.label}`));
    if (idx !== activeStep && idx >= 0) setActiveStep(idx);
  }, [activeStep, pathname]);

  const handleReset = () => {
    setActiveStep(0);
  };

  const changeRoute = useHandleChangeRoute();

  return (
    <Box p={1}>
      <Box p={1}>
        <DialogButton color='inherit' variant='link' linkVariant='h6' onClick={changeRoute('/Classes')}>
          {`< Back to Classes`}
        </DialogButton>
        <Box mt={2}>
          <Header color='inherit' supertitle={'Class 3'} subtitle={'Managing Responsibilities'} />
        </Box>
      </Box>
      <Stepper className={classes.stepper} activeStep={activeStep} orientation='vertical'>
        {steps.map(({ label }, index) => (
          <Step className={classes.stepper} key={label}>
            <StepLabel
              classes={{ active: classes.stepLabelActive, completed: classes.stepLabelCompleted }}
              StepIconProps={{
                classes: { root: classes.stepIconRoot, completed: classes.stepIconCompleted, active: classes.stepIconActive, text: classes.stepIconText }
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
