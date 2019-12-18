import {   
  queryPage, 
  appCodeList,
  analyseCustom,
  analyseLoop,
  eventLevelList,
  eventTitleList,
  eventTypeList,
  queryDetail,
  eventStatusList,
  statByAppCode,
  statByLevel,
  totalsLevelList,
  statByType,
  statByStatus,
  performance,
  configList,
  forwardTypeList,
  editConfig,
  deleteConfig,
  addConfig,
  configDetail,
  getPeopleInfoList
 } from "../api/event";
export const event = {
  state: {
    list: [],
    appCodeList : [],
    eventTitleList: [],
    eventLevelList: [],
    totalsLevelList: {
      total: 0,
      data: []
    },
    eventTypeList: [],
    analyseCustom: [],
    analyseLoop: [],
    eventStatusList: [],
    detail: {},
    dataByAppCode : {
      total: 0,
      data: []
    },
    dataByLevel: {
      total: 0,
      data: []
    },
    dataByType: {
      data: [],
      total: 0
    },
    dataByStatus: [],
    analyzeData: [],
    configListData: {
      total: 0,
      list: []
    },
    forwardTypeList: [],
    configDetail: {},
    peopleInfoList: [],
  },
  reducers: {
    setList(state: any, payload: any) {
      return Object.assign({}, state, { list: payload });
    },
    setTotal(state: any, payload: any) {
      return Object.assign({}, state, { total: payload });
    },
    setAppCodeList(state: any, payload: any) {
      return Object.assign({}, state, { appCodeList: payload });
    },
    setEventLevelList(state: any, payload: any) {
      return Object.assign({}, state, { eventLevelList: payload });
    },
    setTotalsLevelList(state: any, payload: any) {
      return Object.assign({}, state, { totalsLevelList: payload });
    },
    setEventTypeList(state: any, payload: any) {
      return Object.assign({}, state, { eventTypeList: payload });
    },
    setDetail(state: any, payload: any) {
      return Object.assign({}, state, { detail: payload });
    },
    setEventStatusList(state: any, payload: any) {
      return Object.assign({}, state, { eventStatusList: payload });
    },
    setDataByAppCode(state: any, payload: any) {
      return Object.assign({}, state, { dataByAppCode: payload });
    },
    setDataByLevel(state: any, payload: any) {
      return Object.assign({}, state, { dataByLevel: payload });
    },
    setDataByType(state: any, payload: any) {
      return Object.assign({}, state, { dataByType: payload });
    },
    setDataByStatus(state: any, payload: any) {
      return Object.assign({}, state, { dataByStatus: payload });
    },
    setAnalyzeData(state: any, payload: any) {
      return Object.assign({}, state, { analyzeData: payload });
    },
    setConfigList(state: any, payload: any) {
      return Object.assign({}, state, { configListData: payload });
    },
    setForwardTypeList(state: any, payload: any) {
      return Object.assign({}, state, { forwardTypeList: payload });
    },
    setConfigDetail(state: any, payload: any) {
      return Object.assign({}, state, { configDetail: payload });
    },
    setPeopleInfoList(state: any, payload: any) {
      return Object.assign({}, state, { peopleInfoList: payload });
    },
    setEventTitleList(state: any, payload: any) {
      return Object.assign({}, state, { eventTitleList: payload });
    },
    setAnalyseCustom(state: any, payload: any) {
      return Object.assign({}, state, { analyseCustom: payload });
    },
    setAnalyseLoop(state: any, payload: any) {
      return Object.assign({}, state, { analyseLoop: payload });
    }
  },
  effects: (dispatch: any) => ({
    async queryPage({ params, cb }: any, rootState?: any) {
      await queryPage(params).then((res: any) => {
        if (res.data) {
          dispatch.event.setList(res.data.list);
          dispatch.event.setTotal(res.data.total);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getAppCodeList(cb : any, rootState?: any) {
      await appCodeList().then((res: any) => {
        if (res.data) {
          dispatch.event.setAppCodeList(res.data || []);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getEventLevelList( cb : any, rootState?: any) {
      await eventLevelList().then((res: any) => {
        if (res.data) {
          const colorList = ['#02B583', '#08ABF8', '#FBB244', '#F54238'];
          const data = res.data.map((item: any, index: number) => {
            return {
              ...item,
              color: colorList[index]
            }
          })
          dispatch.event.setEventLevelList(data);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },

    //默认为一周数据显示事件等级饼图，卡片
    async getTotalsByLevelList( {params, cb} : any, rootState?: any) {
      await totalsLevelList(params).then((res: any) => {
        if (res.data) {
          const colorList = ['#02B583', '#08ABF8', '#FBB244', '#F54238'];
          const data = res.data.map((item: any, index: number) => {
            return {
              ...item,
              color: colorList[item.code]
            }
          })
          const total = data.reduce((pre: any, item: any) => pre+= item.count, 0);
          dispatch.event.setTotalsLevelList({total, data})
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getAnalyseLoop( {params, cb} : any, rootState?: any) {
      await analyseLoop(params).then((res: any) => {
        if (res.data) {
          const colorList = ['#1DC715', '#1790FF', '#FAAD14', '#F42E2E'];
          const data = res.data.map((item: any, index: number) => {
            return {
              ...item,
              color: colorList[item.code]
            }
          })
          const total = data.reduce((pre: any, item: any) => pre+= item.count, 0);
          dispatch.event.setAnalyseLoop({total, data})
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },


    async getEventTypeList( cb : any, rootState?: any) {
      await eventTypeList().then((res: any) => {
        if (res.data) {
          dispatch.event.setEventTypeList(res.data || []);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async queryDetail( {params, cb } : any, rootState?: any) {
      await queryDetail(params).then((res: any) => {
        if (res.data) {
          dispatch.event.setDetail(res.data);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getEventStatusList( cb : any, rootState?: any) {
      await eventStatusList().then((res: any) => {
        if (res.data) {
          const colorList = ['#00D584','#087BF8','#FFC000','#FC5B5B'];
          const data = res.data.map((item: any, index: number) => {
            return {
              ...item,
              color: colorList[index]
            }
          })
          dispatch.event.setEventStatusList(data);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getStatByAppCode( cb : any, rootState?: any) {
      await statByAppCode({precision: 0}).then((res: any) => {
        if (res.data) {
          const data = res.data;
          const total = data.reduce((pre: any, item: any) => pre+= item.count, 0);
          dispatch.event.setDataByAppCode({total, data});
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getStatByLevel( cb : any, rootState?: any) {
      await statByLevel({precision: 0}).then((res: any) => {
        if (res.data) {
          const data = res.data;
          const list = rootState.event.eventLevelList;
          const total = data.reduce((pre: any, item: any) => pre += item.count, 0);
          data.map((item: any) => {
            const levelItem = list.find((i: any) => item.code === i.code);
            if (levelItem) {
              item.color = levelItem.color; 
            }
            return item;
          });
          dispatch.event.setDataByLevel({total, data});
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getStatByType( cb : any, rootState?: any) {
      await statByType({precision: 2}).then((res: any) => {
        if (res.data) {
          const data = res.data;
          const total = data.reduce((pre:number, item: any) => item.count+pre, 0);
          dispatch.event.setDataByType({data, total});
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getStatByStatus( cb : any, rootState?: any) {
      await statByStatus({precision: 0}).then((res: any) => {
        if (res.data) {
          dispatch.event.setDataByStatus(res.data);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getAnalyzeData( {cb, params }: any, rootState?: any) {
      await performance(params).then((res: any) => {
        if (res.data) {
          const data = res.data;
          const lineChartsData:any[] = [];
          Object.keys(data).map((type) => {
            const list = data[type];
            for ( let item of list ) {
              lineChartsData.push({
                ...item,
                label: item.label.replace(' ', ','),
                type
              });
            }
            return null;
          });
          dispatch.event.setAnalyzeData(lineChartsData);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    //图表接口
    async getAnalyseCustom( { params,cb }: any, rootState?: any) {
      await analyseCustom(params).then((res: any) => {
        if (res.data) {
          const data = res.data
          const totalData = data.byTypeId;
          const total = totalData.reduce((pre: any,item: any) => item.total,0)
          dispatch.event.setAnalyseCustom({data, total});
        } else {
          cb && cb(new Error());
        }
      });
    },

    async getConfigList( {cb, params }: any, rootState?: any) {
      await configList(params).then((res: any) => {
        if (res.data) {
          dispatch.event.setConfigList(res.data);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getForwardTypeList( cb : any, rootState?: any) {
      await forwardTypeList().then((res: any) => {
        if (res.data) {
          dispatch.event.setForwardTypeList(res.data);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async editConfig({ params, cb } : any, rootState?: any) {
      await editConfig(params).then((res: any) => {
        if (res.data) {
          cb && cb( res.data);
        } else {
          cb && cb(new Error());
        }
      }).catch(error =>{
        cb && cb(error)
      })
    },
    async deleteConfig({ params, cb } : any, rootState?: any) {
      await deleteConfig(params).then((res: any) => {
        if (res.data) {
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async addConfig({ params, cb } : any, rootState?: any) {
      await addConfig(params).then((res: any) => {
        if (res.data) {
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      }).catch(error =>{
        cb && cb(error)
      })
    },
    async getConfigDetail({ id, cb } : any, rootState?: any) {
      await configDetail(id).then((res: any) => {
        if (res.data) {
          dispatch.event.setConfigDetail(res.data);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getPeopleInfoList({ params, cb } : any, rootState?: any) {
      await getPeopleInfoList(params).then((res: any) => {
        if (res.data) {
          dispatch.event.setPeopleInfoList(res.data.data);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getEventTitleList( cb  : any, rootState?: any) {
      await eventTitleList().then((res: any) => {
        if (res.data) {
          dispatch.event.setEventTitleList(res.data.data || []);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    }
  })
};
