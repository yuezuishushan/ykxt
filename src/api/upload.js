import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
/*
* 财务初始化
* */
export const uploadFiance = {
  url: `${baseUrl}/fa/initialize/import`
}
/*
* 库存初始化
* */
export const uploadStock = {
  url: `${baseUrl}/ic/initial/import`
}
/*
* 会员积分导入
* */
export const uploadIntegralOrg = {
  url: `${baseUrl}/mt/integralOrg/importIntegralOrg`
}
/*
* 会员资料导入
* */
export const uploadOrganization = {
  url: `${baseUrl}/bae/organization/importOrg`
}
/*
* 会员余额导入
* */
export const uploadBalance = {
  url: `${baseUrl}/bae/orgInitial/importBalanceOrg`
}
/*
* 会员导入套餐项目
* */
export const uploadPackage = {
  url: `${baseUrl}/sl/organizationserve/importOrg`
}
/*
* 服务项目导入
* */
export const uploadServer = {
  url: `${baseUrl}/bae/serve/importServe`
}
/*
* 产品导入
* */
export const uploadProduct = {
  url: `${baseUrl}/bae/product/importProduct`
}
