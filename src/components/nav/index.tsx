import * as React from 'react';
import { Breadcrumb, } from 'antd';
import { withStyles } from "@material-ui/styles";
import { Link, } from 'react-router-dom';
import { common_msg } from '../../messages/common';
import { store } from "../../store";
export interface NavProps {
  intl;
  name;
  title?;
  jump?
  classes;
}

const styles: any = theme => {
  return {
    navbar: {
      height: '98px',
      padding: '16px 0 0 47px',
      backgroundColor: '#fff',
      color: '#5E616F',
      '& .title': {
        fontSize: '20px',
        color: '#33353D',
        lineHeight: '60px'
      },
      '& .ant-breadcrumb .ant-breadcrumb-link a': {
        color: '#5E616F',
      },
      '& .ant-breadcrumb .ant-breadcrumb-link a:hover': {
        color: '#08ABF8'
      }
    }
  };
};

class Nav extends React.Component<NavProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  resetQuery = () => {
    store.dispatch.notice.resetQuery()
  }

  public render() {
    const { classes, name, intl, title, jump } = this.props;
    const {formatMessage } = intl;
    return (
      <div>
        <div className={classes.navbar}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link 
                to={ '/dashboard' }
                onClick={this.resetQuery}
              >
                {formatMessage(common_msg.portal)}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {
                jump ? 
                  <Link to={ `/${jump}` }>
                    {formatMessage(name)}
                  </Link> :
                  formatMessage(name)
              }
            </Breadcrumb.Item>
          </Breadcrumb>
          <h2 className="title">
            {title ? formatMessage(title) : formatMessage(name)}
          </h2>
        </div>
        <div style={{ border: '.1rem solid #f1f3f9' }}></div>
      </div>
    )
  }
}

export default withStyles(styles)(Nav);
