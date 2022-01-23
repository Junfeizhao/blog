import loadComponent from '../../utils/loadComponent'
import { homePreCls } from '../../style/constant'
const home = loadComponent({ loader: () => import('./home') })

home.defaultProps = {
  preCls: homePreCls,
}
export default home
