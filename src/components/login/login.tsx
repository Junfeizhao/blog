import * as React from 'react'
import { PureComponent } from 'react'
import { Grid, Input, Form, Checkbox, Button, Modal } from '@arco-design/web-react'
import { loginProps } from './types'
import bgUrl from '../../assets/theme/imgs/login-bg.jpg'
import logoUrl from '../../assets/theme/imgs/logo.svg'
import { link } from '../../style/constant'
import axios from 'axios'


const { Row, Col } = Grid
const { Item } = Form

export default class login extends PureComponent<loginProps, { visible: boolean }> {
  state = {
    visible: false
  }

  formRef = React.createRef<any>();

  openModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) { e.preventDefault(); e.stopPropagation() }
    this.setState({
      visible: true
    })
  }

  closeModal = () => {
    this.setState({
      visible: false
    })
  }

  onRegist = () => {
    const form = this.formRef?.current;
    if (!form) return;
    console.log(form.getFields())
    axios.post('http://localhost:8080/regist', {
      data: form.getFields()
    })
  }

  renderRegist = () => {
    const { preCls } = this.props;
    const { visible } = this.state;
    return <Modal onCancel={this.closeModal} onConfirm={this.onRegist} visible={visible} okText='注册' className={`${preCls}-register`}>
      <Form ref={this.formRef} className={`${preCls}-form`} layout="vertical">
        <Item label="账号" field='account'>
          <Input size="large" height={40} placeholder="请输入账号" />
        </Item>
        <Item label={'密码'} field='password'>
          <Input
            size="large"
            height={40}
            type={'password'}
            placeholder="请输入密码"
          />
        </Item>
      </Form>
    </Modal>
  }

  customRenderLabel = () => {
    const { preCls } = this.props
    return (
      <div>
        密码
        <a href="" className={`${preCls}-forget-pwd`}>
          忘记密码
        </a>
      </div>
    )
  }
  render() {
    const { preCls } = this.props
    const style = { background: `url(${bgUrl})` }
    const cycleStyle = { background: `url(${logoUrl})` }
    const label = this.customRenderLabel()

    return (
      <>
        <Row className={preCls}>
          <Col className={`${preCls}-left`} span={8}>
            <div className={`${preCls}-login`}>
              <div className={`${preCls}-section`}>
                <div className={`${preCls}-cycle`} style={cycleStyle}></div>
                <h2 className={`${preCls}-welcome-title`}>欢迎光临优云666</h2>
                <p className={`${preCls}-welcome-description`}>欢迎光临优云666</p>
                <Form className={`${preCls}-form`} layout="vertical">
                  <Item label="账号">
                    <Input size="large" height={40} placeholder="请输入账号" />
                  </Item>
                  <Item label={label}>
                    <Input
                      size="large"
                      height={40}
                      type={'password'}
                      placeholder="请输入密码"
                    />
                  </Item>
                  <Item className={`${preCls}-remember-me`}>
                    <Checkbox />
                    &nbsp;&nbsp;记住我
                    <Button
                      shape="round"
                      size="large"
                      className={`${preCls}-login-button`}
                    >
                      登录
                    </Button>
                  </Item>
                </Form>
              </div>
              <div className={`${preCls}-bottom`}>
                <p>
                  还没有账号？
                  <a className={link} href="#" onClick={this.openModal}>
                    马上注册 👉
                  </a>
                </p>
                <p>
                  <a className={`${preCls}-tourist-into ${link}`} href="/">
                    暂不注册，以游客的方式进入
                  </a>
                </p>
                <p className={`${preCls}-copyright`}>
                  Copyright © 2020 优云666
                  <p>Powered by SSPANEL Theme by editXY</p>
                </p>
              </div>
            </div>
          </Col>
          <Col className={`${preCls}-right`} span={16}>
            <div className={`${preCls}-content`} style={style}>
              <div className={`${preCls}-content-words`}>
                <h1 className={`${preCls}-content-title`}>Good Morning</h1>
                <h5 className={`${preCls}-content-subtitle`}>Bali, Indonesia</h5>
                <p className={`${preCls}-content-description`}>
                  Photo by Justin Kauffman on Unsplash
                </p>
              </div>
            </div>
          </Col>
        </Row>
        {this.renderRegist()}
      </>
    )
  }
}
