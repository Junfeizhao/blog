import loadComponent from '../../utils/loadComponent'
import { homePreCls } from '../../style/constant'
const Home = loadComponent({ loader: () => import('./home') })

Home.defaultProps = {
  preCls: homePreCls,
}
export default Home
