import React from 'react';
import { makeStyles, Grid, Box, Typography } from '@material-ui/core';
import { getImage, images } from '../../pages/Session/helpers';
import OutlinedDivActive from '../../general/OutlinedDiv/OutlinedDivActive';

const useStyles = makeStyles(({ spacing }) => ({
  root: {},
  imageContainer: {
    marginTop: spacing(4),
    textAlign: 'center',
    marginBottom: spacing(4)
  },
  item: {
    cursor: 'pointer'
  },
  image: {
    height: 72,
    width: 72
  }
}));

export default function ImageSelector({ value = 'calendar', label, className = undefined, onChange, ...rest }) {
  const classes = useStyles();
  const handleChange = React.useCallback(
    value => () => {
      onChange && onChange({ target: { value } });
    },
    [onChange]
  );

  return (
    <Box>
      <Typography variant='h5' color='textPrimary' style={{ fontWeight: 'bold' }}>
        {label}
      </Typography>
      <Box mt={1}>
        <Grid container spacing={2}>
          {Object.keys(images).map(key => (
            <Grid item className={classes.item} onClick={handleChange(key)}>
              <OutlinedDivActive active={key === value}>
                <Box width={72} height={72}>
                  <Typography align='center'>
                    <img draggable='false' className={classes.image} src={getImage(key)} alt={key} />
                  </Typography>
                </Box>
              </OutlinedDivActive>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
