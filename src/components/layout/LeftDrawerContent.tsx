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

  /*const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };*/

  const handleReset = () => {
    setActiveStep(0);
  };

  const changeRoute = useHandleChangeRoute();

  return (
    <>
      <Box p={1}>
        <DialogButton variant='link' linkVariant='subtitle1' onClick={changeRoute('/Sessions')}>
          {`<  Back to Sessions`}
        </DialogButton>
        <Box mt={2}>
          <Header supertitle={'Session 3'} subtitle={'Managing Responsibilities'} />
        </Box>
      </Box>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map(({ label }, index) => (
          <Step key={label}>
            <StepLabel onClick={changeRoute(`/${label}`)}>{label}</StepLabel>
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
    </>
  );
}
