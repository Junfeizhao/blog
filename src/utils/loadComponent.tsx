import React,{Component,ComponentType,Suspense} from 'react';

export type  loaderType<T>  = ()=>Promise<{
default:ComponentType<T>
}>

export type loadComponentType<T> = {
  name?:string,
  loader:loaderType<T>
}

const noop = ()=> null;

//原生封装
// function loadComponent<T>(load:loadType<T>):ComponentType<T>{
//   class loadcomponent extends Component<T>{
//     state:{ready:boolean,Com:ComponentType<any>}={
//      ready:false,
//      Com:noop
//     }

//     componentDidMount(){
//       load().then((res:any)=>{
//       this.setState({ready:true,Com:res.default})
//       })
//     }
//     render(){
//       const {ready,Com} = this.state;
//       return <>{ready ?<Com {...this.props}/>:'loading...'}</>
//     }
//   }
//   return loadcomponent;
// }


//改进版本
function loadComponent<T>(opts:loadComponentType<T>):ComponentType<T>{
  const {loader} = opts;
  const Com:ComponentType<any> = React.lazy(loader);
 return  function (props:T){
    return  <Suspense fallback={noop}><Com {...props}/></Suspense>
 }
}

export default loadComponent;