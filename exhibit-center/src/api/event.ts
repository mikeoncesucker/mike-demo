import axios from "axios";
const get = async (url: string, params?:object) => {
  return axios.get(url, { params }).then((res: any) => {
    return res.data;
  })
}
const basePrefix = '/api/v1/ucsp/event';
// 查询事件列表
export const queryPage = async (params: object) => {
  return get(`${basePrefix}/query/page`, params)
} 
// 根据事件ID获取事件详情
export const queryDetail = async (params: any) => {
  return get(`${basePrefix}/query/id/${params.id}`, params);
} 
// 按系统来源统计数量
export const statByAppCode = async (params: any) => {
  return get(`${basePrefix}/stat/by_app_code`, params);
}
// 按级别统计数量
export const statByLevel = async (params: any) => {
  return get(`${basePrefix}/stat/by_level`, params);
}

// 按类型统计数量
export const statByType = async (params: any) => {
  return get(`${basePrefix}/stat/by_type`, params);
}
// 按事件状态统计数量
export const statByStatus = async (params: any) => {
  return get(`${basePrefix}/stat/by_status`, params);
}
// 获取应用系统接口
export const appCodeList = async () => {
  return get(`${basePrefix}/enum/app_code_list`);
} 
// 事件等级
export const eventLevelList = async () => {
  return get(`${basePrefix}/enum/event_level_list`);
} 
//按事件级别统计数量，默认一周，卡片
export const totalsLevelList = async (params: any) => {
  return get(`${basePrefix}/totals/by_level`, params);
}
// 事件类型
export const eventTypeList = async () => {
  return get(`${basePrefix}/enum/event_type_list`);
} 
// 事件状态列表
export const eventStatusList = async () => {
  return get(`${basePrefix}/enum/event_status_list`);
} 

// 折线图
export const performance = async (params: any) => {
  return get(`${basePrefix}/trend/resolve/performance`, params);
} 

//图表
export const analyseCustom = async (params: any) => {
  return get(`${basePrefix}/totals/analyse`, params);
} 
//事件饼图接口
export const analyseLoop = async (params: any) => {
  return get(`${basePrefix}/totals/by_level`, params);
} 

// 事件配置相关
// 分页查询事件列表
export const configList = async (params: object) => {
  return get(`${basePrefix}/config/page`, params);
} 
// 推送渠道
export const forwardTypeList = async () => {
  return get(`${basePrefix}/enum/forward_type_list`);
} 
// 修改推送配置
export const editConfig = async (params: any) => {
  return axios.put(`${basePrefix}/config`, params);
} 

// 删除推送配置
export const deleteConfig = async (params: any) => {
  return axios.delete(`${basePrefix}/config`, { 
    headers: {'Content-Type': 'application/json'},
    data:params.id 
  });
} 
// 新建推送配置
export const addConfig = async (params: any) => {
  return axios.post(`${basePrefix}/config`, params);
} 
// 事件规则详情
export const configDetail = async (id: any) => {
  return get(`${basePrefix}/config/id/${id}`);
} 
// 人员搜索
export const getPeopleInfoList = async (params: any) => {
  return axios.get(`/api/v1/ucsp/user/users/info/list`, { params });
}  
//  消息模版
export const eventTitleList = async () => {
  return axios.get(`/api/v1/ucsp/event/enum/event_title_list`);
} 