import * as React from 'react';
import {PureComponent } from 'react';
import { Button } from "@arco-design/web-react";
const preCls = 'blog-home';

interface HomeProps{
 name?:string
}

export default class Home extends PureComponent<HomeProps>{
   render(){
     return <div className={preCls}>
       <div className={`${preCls}-left`}>
         left
       </div>
       <div className={`${preCls}-right`}>
        right
       </div>
     </div>
   }
}