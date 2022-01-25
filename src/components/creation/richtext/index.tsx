import loadComponent from '../../../utils/loadComponent'
import { richTextPreCls } from '../../../style/constant'
const RichText = loadComponent({ loader: () => import('./richtext') })

RichText.defaultProps = {
  preCls: richTextPreCls,
}
export default RichText
