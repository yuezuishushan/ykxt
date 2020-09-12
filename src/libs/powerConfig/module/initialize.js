import { formatPowerConfig } from '../../tools'
import powerConstant from '../constant'

const config = {
  initialize: {
    billId: 0,
    name: '新手导航',
    children: {
      navigation: {
        billId: 9999,
        name: '新手导航',
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
