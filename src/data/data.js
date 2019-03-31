import moment from 'moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const daysChartConfig = {
  plugin: [ChartDataLabels],
  type: `line`,
  data: {
    labels: [`01 FEB`, `02 FEB`, `03 FEB`, `04 FEB`, `05 FEB`, `06 FEB`, `07 FEB`],
    datasets: [{
      data: [4, 6, 3, 1, 5, 2, 0],
      backgroundColor: `transparent`,
      borderColor: `#000000`,
      borderWidth: 1,
      lineTension: 0,
      pointRadius: 8,
      pointHoverRadius: 8,
      pointBackgroundColor: `#000000`,
    }]
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 8,
        },
        color: `#ffffff`,
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          display: false,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        }
      }],
      xAxes: [{
        ticks: {
          fontStyle: `bold`,
          fontColor: `#000000`,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        }
      }]
    },
    legend: {
      display: false,
    },
    layout: {
      padding: {
        top: 10,
      }
    },
    tooltips: {
      enabled: false,
    }
  }
};

export const tagsChartConfig = {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: [`#watchstreams`, `#relaxation`, `#coding`, `#sleep`, `#watermelonpies`],
    datasets: [{
      data: [20, 15, 10, 5, 2],
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          const total = allData.reduce((acc, it) => acc + parseFloat(it));
          const tooltipPercentage = Math.round((tooltipData / total) * 100);
          return `${tooltipData} TASKS — ${tooltipPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      text: `DONE BY: TAGS`,
      fontSize: 16,
      fontColor: `#000000`
    },
    legend: {
      position: `left`,
      labels: {
        boxWidth: 15,
        padding: 25,
        fontStyle: 500,
        fontColor: `#000000`,
        fontSize: 13
      }
    }
  }
};

export const colorsChartConfig = {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: [`#pink`, `#yellow`, `#blue`, `#black`, `#green`],
    datasets: [{
      data: [5, 25, 15, 10, 30],
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          const total = allData.reduce((acc, it) => acc + parseFloat(it));
          const tooltipPercentage = Math.round((tooltipData / total) * 100);
          return `${tooltipData} TASKS — ${tooltipPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      text: `DONE BY: COLORS`,
      fontSize: 16,
      fontColor: `#000000`
    },
    legend: {
      position: `left`,
      labels: {
        boxWidth: 15,
        padding: 25,
        fontStyle: 500,
        fontColor: `#000000`,
        fontSize: 13
      }
    }
  }
};

export const dateConfig = {
  altInput: true,
  altFormat: `j F`,
  dateFormat: `j F`,
};

export const timeConfig = {
  enableTime: true,
  noCalendar: true,
  altInput: true,
  altFormat: `h:i K`,
  dateFormat: `h:i K`,
};

export const statisticPeriodConfig = {
  altInput: true,
  altFormat: `j M`,
  dateFormat: `j M`,
  defaultDate: [moment().startOf(`isoweek`).toDate(), moment().endOf(`isoweek`).toDate()],
  mode: `range`,
  locale: {
    rangeSeparator: ` - `,
  },
};

export const imageTypes = [`jpg`, `gif`, `jpeg`, `png`, `webp`];
