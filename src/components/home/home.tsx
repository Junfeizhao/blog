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
  Space,
  Tag,
  Affix,
  BackTop,
  Trigger,
} from '@arco-design/web-react'
import {
  IconGithub,
  IconEye,
  IconThumbUp,
  IconCheckCircleFill,
  IconMessage,
  IconClose,
  IconBug,
  IconBulb,
} from '@arco-design/web-react/icon'
const jsFiles = (require as any).context(
  '../../assets/theme/imgs',
  false,
  /.png$/
)
const { Header, Sider, Content, Footer } = Layout
const { Row, Col } = Grid
const TabPane = Tabs.TabPane

const tabs = [
  { title: '最新', key: '0' },
  { title: '最热', key: '1' },
  { title: '前端', key: '2' },
  { title: '后端', key: '3' },
  { title: '算法', key: '4' },
  { title: '想法', key: '5' },
]

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const Search = Input.Search
const jsImgs = jsFiles.keys().map((path: any) => {
  return jsFiles(path)?.default || jsFiles(path)
})

export interface HomeProps extends BaseProps {}
export default class Home extends PureComponent<
  HomeProps,
  { menuVisible: boolean }
> {
  state = { menuVisible: false }

  onVisibleChange = (v: boolean) => {
    this.setState({
      menuVisible: v,
    })
  }

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
        <Space size="small">
          <Button type="primary" long>
            创作中心
          </Button>
          <Button type="primary" long>
            登录
          </Button>
        </Space>
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
    const data1 = [
      { id: '1', name: '最新分享' },
      { id: '2', name: '近日想法' },
      { id: '3', name: '总结和计划' },
    ]
    return (
      <>
        <div className={`${preCls}-silder-block ${preCls}-silder-webinfo`}>
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
        <div className={`${preCls}-silder-block ${preCls}-silder-myinfo`}>
          <Card
            title="我的动态"
            extra={<Link>更多</Link>}
            style={{ width: '100%' }}
          >
            <Tabs style={{ maxWidth: 350, margin: -15 }}>
              {data1.map((v, i) => {
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
      </>
    )
  }

  renderFooterMenu = () => {
    const { menuVisible } = this.state
    const { preCls } = this.props
    const menu = () => (
      <div>
        <Menu
          style={{ marginBottom: -4 }}
          mode="popButton"
          tooltipProps={{ position: 'left' }}
          hasCollapseButton
        >
          <MenuItem key="1">
            <IconBug />
            Bugs
          </MenuItem>
          <MenuItem key="2">
            <IconBulb />
            Ideas
          </MenuItem>
        </Menu>
      </div>
    )
    return (
      <div className={`${preCls}-footer-menu`}>
        <Trigger
          onVisibleChange={this.onVisibleChange}
          popup={menu}
          trigger={['click', 'hover']}
          clickToClose
          position="top"
        >
          <div className={`${preCls}-footer-menu-icon-wrap`}>
            {menuVisible ? <IconClose /> : <IconMessage />}
          </div>
        </Trigger>
      </div>
    )
  }

  customRenderList = (item: any, index: number): React.ReactNode => {
    const { preCls } = this.props
    // const imgSrc = js
    return (
      <div className={`${preCls}-list-item`}>
        <div className={`${preCls}-list-item-left`}>
          <h3 className={`${preCls}-list-item-title`}>
            我是文章的标题
            <span className={`${preCls}-tags`}>
              <Space size="small">
                <Tag>css</Tag>
                <Tag>css</Tag>
              </Space>
            </span>
          </h3>
          <p className={`${preCls}-list-item-desc`}>
            滑坡谬误（Slippery
            slope）是一种非形式谬误，使用连串的因果推论，却夸大了每个环节的因果强度，而得到不合理的结论。有些说法将连续体谬误也归为滑坡谬误，但近来已较少这样使用。图为滑坡谬误原理运用示例。
          </p>
          <p>
            <span>
              <Avatar size={30} />
              &nbsp;&nbsp;爱唱歌的程序员
              <span className={`${preCls}-operation-icon-wrap`}>
                <IconEye
                  className={`${preCls}-operation-icon ${preCls}-operation-eye`}
                />
                258
                <IconThumbUp
                  className={`${preCls}-operation-icon ${preCls}-operation-thumup`}
                />
                55
                <IconMessage
                  className={`${preCls}-operation-icon ${preCls}-operation-message`}
                />
                1
              </span>
              <span className={`${preCls}-public-time`}>2021/03/21</span>
            </span>
          </p>
        </div>
        <div className={`${preCls}-list-item-right`}>
          <img src={`${jsImgs[index]}`} alt="" />
        </div>
      </div>
    )
  }

  render() {
    const { preCls } = this.props
    const dataSource = new Array(50).fill({
      title: 'Beijing Bytedance Technology Co., Ltd.',
      description:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
    })
    return (
      <div className={`${preCls}`}>
        <Layout>
          <Affix target={() => window}>
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
                <MenuItem
                  className={`${preCls}-menu-item-non`}
                  key="5"
                  disabled
                >
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
          </Affix>
          <Layout className={`${preCls}-container`}>
            <Row className={`${preCls}-container-row`}>
              <Col span={15}>
                <Tabs
                  className={`${preCls}-container-tabs`}
                  defaultActiveTab="0"
                >
                  {tabs.map((x, i) => (
                    <TabPane
                      className={`${preCls}-container-tabs-pannel`}
                      destroyOnHide
                      key={x.key}
                      title={x.title}
                    >
                      <Content>
                        <List
                          bordered={false}
                          className={`${preCls}-list`}
                          dataSource={dataSource}
                          render={this.customRenderList}
                        />
                      </Content>
                    </TabPane>
                  ))}
                </Tabs>
              </Col>
              <Col offset={1} span={6}>
                <Affix offsetTop={83} target={() => window}>
                  <Sider className={`${preCls}-silder`}>
                    {this.renderSilder()}
                  </Sider>
                </Affix>
              </Col>
            </Row>
          </Layout>
          <Footer className={`${preCls}-footer`}>
            <BackTop
              visibleHeight={30}
              style={{ position: 'fixed', bottom: '80px' }}
              target={() => window}
            />
            {this.renderFooterMenu()}
          </Footer>
        </Layout>
      </div>
    )
  }
}
