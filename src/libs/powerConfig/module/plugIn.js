import { formatPowerConfig } from '../../tools'
import powerConstant from '../constant'

const config = {
  plugIn: {
    billId: 0,
    name: '插件管理',
    children: {
      list: {
        billId: 9999,
        name: '插件管理',
        children: {
          query: {
            name: '查询',
            billId: 9999,
            mark: powerConstant.QUERY
          }
        }
      }
    }
  }
}

export default formatPowerConfig(config)
