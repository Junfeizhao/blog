import * as React from 'react'
import { Component, PureComponent } from 'react'
import { BaseProps } from '../../../types/index'
import ReactQuill, { Quill } from 'react-quill'
import { Input, Button, Space, Grid, Modal, Form, Select, Radio, Upload } from '@arco-design/web-react'
import {
  IconPlus,
  IconEdit
} from '@arco-design/web-react/icon'
import { ImageDrop } from 'quill-image-drop-module'
import imageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', imageResize);

export interface QuillProps extends BaseProps { }

const { Row, Col } = Grid;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const classification = [{ text: '前端', id: 'front' }, { text: '后端', id: 'after' }];
const labels = [{ classID: 'front', labels: [{ text: 'html', id: 'html' }, { text: 'css', id: 'css' }] }, { classID: 'after', labels: [{ text: 'java', id: 'java' }, { text: 'nodejs', id: 'nodejs' }] }]

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

interface QuillState {
  quillValue: any,
  textCount: number,
  lineCount: number,
  titleValue: string,
  visible: boolean,
  classificationValue: string,
  label: any[],
  labelValue: string,
  cover: string,
  file: any

}

export default class QuillComponent extends PureComponent<QuillProps, QuillState> {

  quillRef: any = React.createRef<HTMLElement>()
  quillEditor: any;
  state = {
    quillValue: '',
    lineCount: 0,
    textCount: 0,
    titleValue: '',
    visible: false,
    classificationValue: 'front',
    labelValue: labels[0].labels[0].id,
    label: labels[0].labels,
    cover: 'no-img',
    file: null
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
  coverChange = (cover: string) => {
    this.setState({
      cover
    })
  }
  openModal = () => {
    this.setState({ visible: true })
  }

  closeModal = () => {
    this.setState({ visible: false })
  }
  setClassification = (v: any) => {
    const newLabel = labels.find((d: any) => d.classID === v)?.labels;
    this.setState({
      label: newLabel || [],
      labelValue: newLabel?.[0]?.text || ''
    })
  }

  onLabelChange = (labelValue: string) => {
    this.setState({
      labelValue
    })
  }

  fileChange = (_: any, currentFile: any) => {
    console.log(currentFile)
    this.setState({
      file: {
        ...currentFile,
        url: URL.createObjectURL(currentFile.originFile),
      }
    })
  }

  renderDialog = () => {

  }

  renderUpload = () => {
    const { preCls } = this.props;
    const file: any = this.state.file;
    const fileUrl = (file as any)?.url;
    return <Upload
      action='/'
      fileList={file ? [file] : []}
      showUploadList={false}
      onChange={this.fileChange}
    >
      <div className={`${preCls}-form-upload`}>
        {fileUrl ? <div className={`${preCls}-form-upload-mask-wrap`}><div className={`${preCls}-form-upload-mask`}><IconEdit className={`${preCls}-form-upload-icon ${preCls}-form-upload-icon-edit`} /> </div><img className={`${preCls}-form-upload-img`} src={fileUrl} alt='' /></div> : <div className={`${preCls}-form-upload-add`}>
          <IconPlus className={`${preCls}-form-upload-icon`} />
        </div>}
      </div>
    </Upload>
  }

  render() {
    const { preCls } = this.props
    const { quillValue, lineCount, textCount, titleValue, visible, classificationValue, label, labelValue, cover } = this.state;
    return (
      <div className={`${preCls}`}>
        <div className={`${preCls}-header`}>
          <Input maxLength={100} className={`${preCls}-header-title`} onChange={this.onTitleChange} placeholder='请输入文章标题' />
          <div className={`${preCls}-header-extra`}><span className={`${preCls}-header-word-count`}>{titleValue?.length}/100</span> <Space size={'small'}>< Button type='outline'>存入草稿</ Button> < Button type='primary' onClick={this.openModal}>发布</ Button></Space> </div>
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
          <Modal
            title='发布文章'
            visible={visible}
            onOk={this.openModal}
            onCancel={this.closeModal}
            autoFocus={false}
            focusLock={true}
            style={{ width: "600px" }}
          >
            <Form className={`${preCls}-form`}>
              <FormItem label='封面' field='username'>
                <RadioGroup defaultValue='no-img' onChange={this.coverChange}>
                  <Radio value='single-img'>
                    单图
                  </Radio >
                  <Radio value='no-img' >
                    无封面
                  </Radio >
                </RadioGroup >
                {cover === 'single-img' && this.renderUpload()}
              </FormItem>
              <FormItem label='摘要'>
                <TextArea
                  placeholder='Please enter ...'
                  style={{ minHeight: 64, width: 350 }}
                />
              </FormItem>
              <FormItem label='分类标签' field='username'>
                <Space size='large'>
                  <Select
                    placeholder='分类'
                    style={{ width: 154 }}
                    onChange={this.setClassification}

                  >
                    {classification.map((option, index) => (
                      <Option key={index} value={option.id} >
                        {option.text}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    placeholder='标签'
                    style={{ width: 154 }}
                    value={labelValue}
                    allowCreate
                    mode='multiple'
                    allowClear
                    onChange={this.onLabelChange}
                  >
                    {label.map((option, index) => (
                      <Option key={index} value={option.id}>
                        {option.text}
                      </Option>
                    ))}
                  </Select>
                </Space>
              </FormItem>
            </Form>
          </Modal>
        </div>
      </div >
    )
  }
}
