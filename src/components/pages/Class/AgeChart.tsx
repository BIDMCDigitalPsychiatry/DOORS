import React from 'react';
import type { FC } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, Typography, useTheme } from '@material-ui/core';
import { ageQuestionLabel } from '../../../constants';
import { defaultAgeRankingModels } from '../../../database/models/Class';

const AgeChart: FC = () => {
  const theme = useTheme();

  const data = {
    options: {
      chart: {
        background: theme.palette.background.paper,
        toolbar: {
          show: false
        }
      },
      colors: ['#13affe', '#fbab49'],
      dataLabels: {
        enabled: false
      },
      grid: {
        borderColor: theme.palette.divider,
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      legend: {
        show: true,
        labels: {
          colors: theme.palette.text.secondary
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '40%'
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      theme: {
        mode: theme.palette.type
      },
      tooltip: {
        theme: theme.palette.type
      },
      xaxis: {
        axisBorder: {
          show: true,
          color: theme.palette.divider
        },
        axisTicks: {
          show: true,
          color: theme.palette.divider
        },
        categories: defaultAgeRankingModels.map(m => m.id),
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      yaxis: {
        axisBorder: {
          show: true,
          color: theme.palette.divider
        },
        axisTicks: {
          show: true,
          color: theme.palette.divider
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      }
    },
    series: [
      {
        name: 'Participants',
        data: [30, 40, 25, 50, 49, 21, 70, 51]
      }
    ]
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='subtitle1' color='textPrimary'>
          {ageQuestionLabel}
        </Typography>
        <Chart options={data.options} series={data.series} type='bar' height='300' />
      </CardContent>
    </Card>
  );
};

export default AgeChart;
