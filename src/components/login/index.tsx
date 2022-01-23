import loadComponent from '../../utils/loadComponent'
import { loginPreCls } from '../../style/constant'
const login = loadComponent({ loader: () => import('./login') })

login.defaultProps = {
  preCls: loginPreCls,
}
export default login
