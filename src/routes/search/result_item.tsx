import * as React from 'react';
import { Divider } from 'antd';
import store from 'store';
import styles from './style.module.less';
export interface IResultItemProps {
  data;
  history;
}

export default class ResultItem extends React.PureComponent<IResultItemProps> {
  openUrl=(url,eventId)=>{
    let reg = new RegExp(/http[s]{0,1}:\/\/([\w.]+\/?)\S*/)
    let accessToken = store.get('accessToken');
    if(eventId) {
      this.props.history.push({pathname: 'search/eventDetail', state: {id: eventId}})
    }

    if(reg.test(url)) {
      window.open(`${url}?accessToken=${accessToken}`)
    }
    
  }
  public render() {
    let {data} = this.props;
    return (
      <div className={styles.result_item} onClick={this.openUrl.bind(this,data.url,data.ucspCenterId)}>
        <div 
          className={styles.result_item_title} 
          dangerouslySetInnerHTML={{ __html: data.title || ''}}
        />
        
        <div 
          className={styles.result_item_desc} 
          dangerouslySetInnerHTML={{ __html: data.content || '' }}
        />
        <div className={styles.source_data}>
          <span>{data.date}</span>
          <Divider type="vertical" style={{ top: '1px'}}/>
          <span>{ data.source }</span>
        </div>
      </div>
    );
  }
}

