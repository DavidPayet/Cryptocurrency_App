import 'chart.js/auto'
import { Line } from "react-chartjs-2"
import { Col, Row, Typography } from 'antd'

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = []
  const coinTimestamp = []

  // console.log('====================================');
  // console.log(coinHistory);
  // console.log('====================================');

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price)
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString())
  }

  // console.log(coinTimestamp);

  // console.log('====================================');
  // console.log(new Date(1664600414797).toLocaleDateString());
  // console.log('====================================');


// Calcul d'un date passée par rapport à celle d'aujourd'hui
  // let d = new Date();
  // d.setDate(d.getDate() - 7);
  // console.log(d.toLocaleDateString())






  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd'
      }
    ]
  }

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true
        }
      }
    }
  }

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>{coinName} Price Chart</Title>

        <Col className='price-container'>
          <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
          <Title level={5} className='current-price'>Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>

      <Line data={data} options={options} />

    </>
  )
}

export default LineChart