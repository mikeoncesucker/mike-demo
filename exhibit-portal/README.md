## 一、会展项目主要路径，后台需根据以下路径配置
1. /login
2. /dashboard
3. /search
4. /notice


## 二、有部分功能需要后面补齐
####1、忘记密码（/login） 
a、发送验证码
b、忘记密码登录接口对接
（代码路径：src/containers/login/forget_pass_form）
```python
    handleSubmit=()=>{
        // 待做获取数据 请求接口
    }
    sendCode=()=>{
        // 待做获取验证码
        console.log('yanzhengma')
    }
```
#### 2、会展中心首页（/dashboard）
a、卡片中的icon （应该是接口中返回，目前是取的本地的）
b、点击卡片跳转路径 （代码路径：src/components/gridstack/index）
```python
    let openUrl = (e) => {
      if (!window.dragCheck) {
        if (e.currentTarget.dataset.type == 'type_0') {
          console.log('go =====> ', e.currentTarget.dataset.url);
          let language = store.get('local_language');  // 当前语言
          let accessToken = store.get('accessToken'); 
          // #待做跳转
          // window.location.href=`跳转地址?accessToken=${accessToken}&laguage=${language}`
        }
      }
    };
```
    
####3、搜索订单页（/search）
a、点击跳转路径 （代码路径：src/routes/search/index）
```python
openUrl=()=>{
  let language = store.get('local_language');  // 当前语言
  let accessToken = store.get('accessToken'); 
  // #待做跳转
  // window.location.href=`跳转地址?accessToken=${accessToken}&laguage=${language}`
       
}
```


<!-- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). -->
