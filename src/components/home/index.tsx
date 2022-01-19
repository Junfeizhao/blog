import  loadComponent from'../../utils/loadComponent';
import {HomeProps, HomeType} from './types';
 const Home = loadComponent({loader:()=>import('./home')});
 export default Home;