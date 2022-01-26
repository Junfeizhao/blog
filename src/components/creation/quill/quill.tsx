import * as React from 'react'
import { Component, PureComponent } from 'react'
import { BaseProps } from '../../../types/index'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Input } from '@arco-design/web-react'

export interface QuillProps extends BaseProps { }

export default class Quill extends PureComponent<QuillProps> {
  render() {
    const { preCls } = this.props
    return (
      <div className={`${preCls}`}>
        <Input className={`${preCls}-title`} />
        666
        <ReactQuill className={`${preCls}-quill`} theme="snow" value={'ss'} />
      </div>
    )
  }
}
