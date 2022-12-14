import millify from 'millify'
import { Collapse, Row, Col, Typography, Avatar } from 'antd'
import HTMLReactParser from 'html-react-parser'
import { useGetCryptoExchangesQuery } from '../services/cryptoExchangesApi'

const { Text } = Typography
const { Panel } = Collapse

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangesQuery()
  const exchangesList = data

  if (isFetching) return 'Loading...'

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume (BTC)</Col>
        <Col span={6}>Trust Score</Col>
        <Col span={6}>Year Established</Col>
      </Row>
      <Row>
        {exchangesList.map(exchange => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
                    <Col span={6}>{exchange.trust_score}</Col>
                    <Col span={6}>{exchange.year_established}</Col>
                  </Row>
                )}
              >
                {HTMLReactParser(exchange.description || 'Data according to coingecko from rapidapi;com')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Exchanges