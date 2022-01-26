import loadComponent from '../../../utils/loadComponent'
import { quillPreCls } from '../../../style/constant'
const Quill = loadComponent({ loader: () => import('./quill') })

Quill.defaultProps = {
  preCls: quillPreCls,
}
export default Quill
