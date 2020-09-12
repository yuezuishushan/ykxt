import filter from './filters'

const importFilter = Vue => {
  Vue.filter('image', filter.image)
  Vue.filter('numberDecimal', filter.numberDecimal)
  Vue.filter('date', filter.date)
  Vue.filter('priceDecimal', filter.priceDecimal)
}
export default importFilter
