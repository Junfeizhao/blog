import * as React from 'react'
import { Component, PureComponent } from 'react'
import { BaseProps } from '../../../types/index'
import ReactQuill, { Quill } from 'react-quill'
import { Input, Button, Space, Grid } from '@arco-design/web-react'
import { ImageDrop } from 'quill-image-drop-module'
import imageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', imageResize);

export interface QuillProps extends BaseProps { }

const { Row, Col } = Grid;
const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],                                 //字体
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],        //字号
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // 缩进
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],     //列表
    [{ 'align': [] }],
    // [{ 'script': 'sub' }, { 'script': 'super' }],     // 下标和上标
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean'],                                       // remove formatting button
  ],
  imageDrop: true,
  imageResize: { //调整大小组件。
    displayStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: 'white'
    },
    modules: ['Resize', 'DisplaySize']
  }
}

export default class QuillComponent extends PureComponent<QuillProps, { quillValue: any, textCount: number, lineCount: number, titleValue: string }> {

  quillRef: any = React.createRef<HTMLElement>()
  quillEditor: any;
  state = {
    quillValue: '',
    lineCount: 0,
    textCount: 0,
    titleValue: ''
  }

  componentDidMount() {
    this.quillEditor = this.quillRef?.current?.getEditor() || undefined;
  }


  quillChange = (quillValue: any, b: any) => {
    console.log(quillValue, 'change')
    this.setState({
      quillValue
    })
    if (this.quillEditor && this.quillEditor.getLength && this.quillEditor.getLines) {
      const textCount = this.quillEditor.getLength() - 1;
      const lineCount = this.quillEditor.getLines()?.length;
      this.setState({
        textCount,
        lineCount
      })
    }
  }

  onTitleChange = (v: string) => {
    this.setState({
      titleValue: v
    })
  }

  render() {
    const { preCls } = this.props
    const { quillValue, lineCount, textCount, titleValue } = this.state;
    return (
      <div className={`${preCls}`}>
        <div className={`${preCls}-header`}>
          <Input maxLength={100} className={`${preCls}-header-title`} onChange={this.onTitleChange} placeholder='请输入文章标题' />
          <div className={`${preCls}-header-extra`}><span className={`${preCls}-header-word-count`}>{titleValue?.length}/100</span> <Space size={'small'}>< Button type='outline'>存入草稿</ Button> < Button type='primary'>发布</ Button></Space> </div>
        </div>
        <div className={`${preCls}-content`}>
          <Row className={`${preCls}-content-row`}>
            <Col span={12} className={`${preCls}-content-col`}>
              <ReactQuill modules={quillModules} ref={this.quillRef} onChange={this.quillChange} className={`${preCls}-quill ${preCls}-quill-write`} theme="snow" />
            </Col>
            <Col span={12} className={`${preCls}-content-col`}>
              <div className={`${preCls}-quill ${preCls}-quill-read`}>
                <div className={`${preCls}-quill-read-head`}>
                </div>
                <div className={`${preCls}-quill-read-con-wrap ql-snow`}>
                  <div className={`${preCls}-quill-read-con ql-editor`} dangerouslySetInnerHTML={{ __html: quillValue }}>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={`${preCls}-footer`}>
          <Space size={'small'}> <span>字数：{textCount}</span> <span>行数：{lineCount}</span></Space>
        </div>
      </div >
    )
  }
}
