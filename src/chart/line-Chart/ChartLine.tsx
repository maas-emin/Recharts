import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { TypeCharacters } from '../../redux/charactersReducer'
import { Line } from 'react-chartjs-2'
import { AppDispatch, RootState } from '../../redux/store/storePoter'
import { getCharacters } from '../../redux/charactersReducer'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const LineChart: FC = () => {
  const { dataStart, dataEnd, sortCharacters } = useSelector(
    (state: RootState) => state.gariPoter
  )

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (dataStart && dataEnd) {
      dispatch(getCharacters({ dataStart, dataEnd }))
    }
  }, [dataStart, dataEnd])

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 20,
          },
        },
      },
    },
  }

  const values = {
    labels: Object.keys(sortCharacters),
    datasets: [
      {
        data: Object.values(sortCharacters).map((item: any) => {
          if (item) return item.length

          return 0
        }),
        label: 'Characters',
        borderColor: '#3333ff',
        fill: true,
        lineTension: 0.4,
      },
    ],
  }
  return <Line options={options} data={values} width="100%" height="20%" />
}

export default LineChart
