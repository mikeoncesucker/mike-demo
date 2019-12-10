import * as React from 'react';
import { Route, Switch, } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from '@components/loading';

export interface IAppProps {
  match: any;
}
const Dashboard = loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */ './dashboard'),
  loading: LoadingComponent
});
const Password = loadable({
  loader: () => import(/* webpackChunkName: "password" */ './password'),
  loading: LoadingComponent
});
const Search = loadable({
  loader: () => import(/* webpackChunkName: "search" */ './search'),
  loading: LoadingComponent
});
const EventDetail = loadable({
  loader: () => import(/* webpackChunkName: "detail" */ './search/eventDetail'),
  loading: LoadingComponent
});
const Notice = loadable({
  loader: () => import(/* webpackChunkName: "notice" */ './notice'),
  loading: LoadingComponent
});
const Detail = loadable({
  loader: () => import(/* webpackChunkName: "detail" */ './notice/detail'),
  loading: LoadingComponent
});
export default class App extends React.Component<IAppProps> {
  public render() {
    let { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.url}dashboard`} component={Dashboard} />
        <Route path={`${match.url}password`} component={Password} />
        <Route exact path={`${match.url}search`} component={Search} />
        <Route exact path={`${match.url}search/eventDetail`} component={EventDetail} />
        <Route exact path={`${match.url}notice`} component={Notice} />
        <Route exact path={`${match.url}notice/detail`} component={Detail} />
      </Switch>
    );
  }
}
