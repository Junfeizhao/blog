import * as React from 'react'
import { PureComponent } from 'react'
import { Grid } from '@arco-design/web-react'
import { HomeProps } from './types'

const { Row, Col } = Grid

export default class Home extends PureComponent<HomeProps> {
  render() {
    const { preCls } = this.props
    return (
        <Row className={preCls}>
          <Col className={`${preCls}-left`} span={8}>
            <div>left</div>
          </Col>
          <Col className={`${preCls}-right`} span={16}>
            <div>right</div>
          </Col>
        </Row>
    )
  }
}
