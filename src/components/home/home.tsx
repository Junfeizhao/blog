import * as React from 'react'
import { Component, PureComponent } from 'react'
import { BaseProps } from '../../types/index'
import {
  Layout,
  Menu,
  Input,
  Button,
  Grid,
  Card,
  Link,
  Tabs,
  List,
  Avatar,
} from '@arco-design/web-react'
import { IconGithub } from '@arco-design/web-react/icon'
const { Header, Sider, Content, Footer } = Layout
const { Row, Col } = Grid

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const Search = Input.Search
const TabPane = Tabs.TabPane

export interface HomeProps extends BaseProps {}
export default class Home extends PureComponent<HomeProps> {
  renderLogo = () => {
    return (
      <div
        style={{
          width: 80,
          height: 30,
          borderRadius: 2,
          background: 'var(--color-fill-3)',
          cursor: 'text',
        }}
      />
    )
  }
  renderHeaderSearch = () => {
    const { preCls } = this.props
    return <Search className={`${preCls}-header-search`} />
  }
  renderHeaderExtra = () => {
    const { preCls } = this.props
    return (
      <div className={`${preCls}-header-extra`}>
        <IconGithub fontSize={35} className={`${preCls}-icon-github`} />
        <Button type="primary" long>
          登录
        </Button>
      </div>
    )
  }

  renderSilder = () => {
    const { preCls } = this.props
    const data = [
      { id: '1', name: '最近访客' },
      { id: '2', name: '最新评论' },
      { id: '3', name: '最新点赞' },
    ]
    return (
      <div className={`${preCls}-silder-block`}>
        <Card
          title="站内数据"
          extra={<Link>更多</Link>}
          style={{ width: '100%' }}
        >
          <Tabs style={{ maxWidth: 350, margin: -15 }}>
            {data.map((v, i) => {
              return (
                <TabPane destroyOnHide key={v?.id} title={`${v?.name}`}>
                  <div style={{ margin: '0px 16px 16px 16px' }}>
                    {`Content ${i}`}
                    <br />
                    {`Content ${i}`}
                    <br />
                    {`Content ${i}`}
                  </div>
                </TabPane>
              )
            })}
          </Tabs>
        </Card>
      </div>
    )
  }

  customRenderList = (item: any, index: number): React.ReactNode => {
    const { preCls } = this.props
    return (
      <div className={`${preCls}-list-item`}>
        <h3>我是文章的标题</h3>
        <p>
          <span>
            <Avatar size={30} />
            &nbsp;&nbsp;爱唱歌的程序员
          </span>
        </p>
      </div>
    )
  }

  render() {
    const { preCls } = this.props
    const dataSource = new Array(4).fill({
      title: 'Beijing Bytedance Technology Co., Ltd.',
      description:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
    })
    return (
      <div className={`${preCls}`}>
        <Layout>
          <Header className={`${preCls}-header`}>
            <Menu mode="horizontal" defaultSelectedKeys={['1']}>
              <MenuItem
                key="0"
                style={{ padding: 0, marginRight: 38 }}
                disabled
              >
                {this.renderLogo()}
              </MenuItem>
              <MenuItem key="1">首页</MenuItem>
              <MenuItem key="2">技术博客</MenuItem>
              <MenuItem key="3">个人成长</MenuItem>
              <MenuItem key="4">站内资源</MenuItem>
              <MenuItem key="5">在线工具</MenuItem>
              <MenuItem className={`${preCls}-menu-item-non`} key="5" disabled>
                {this.renderHeaderSearch()}
              </MenuItem>
              <MenuItem
                className={`${preCls}-menu-item-non ${preCls}-item-extra`}
                key="6"
                disabled
              >
                {this.renderHeaderExtra()}
              </MenuItem>
            </Menu>
          </Header>
          <Layout className={`${preCls}-container`}>
            <Row>
              <Col span={15}>
                <Content>
                  <List
                    bordered={false}
                    className={`${preCls}-list`}
                    dataSource={dataSource}
                    render={this.customRenderList}
                  />
                </Content>
              </Col>
              <Col offset={1} span={6}>
                <Sider className={`${preCls}-silder`}>
                  {this.renderSilder()}
                </Sider>
              </Col>
            </Row>
          </Layout>
          {/* <Footer className={`${preCls}-footer`}>Footer</Footer> */}
        </Layout>
      </div>
    )
  }
}
