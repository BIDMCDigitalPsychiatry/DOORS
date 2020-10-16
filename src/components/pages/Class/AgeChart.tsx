import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, Typography, useTheme } from '@material-ui/core';
import { ageQuestionLabel } from '../../../constants';
import { defaultAgeRankingModels } from '../../../database/models/Class';

export default function AgeChart({ data = [] }) {
  const theme = useTheme();

  const chartData = {
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
        data
      }
    ]
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='subtitle1' color='textPrimary'>
          {ageQuestionLabel}
        </Typography>
        <Chart options={chartData.options} series={chartData.series} type='bar' height='300' />
      </CardContent>
    </Card>
  );
}
