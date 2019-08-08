import 'whatwg-fetch'
import axios from 'axios';
import { Notification } from 'element-ui';
import router from '@/router'
const http = {
  get(url, params) {
    let options = {
      method: 'GET'
    }
    let req_url = params ? this.buildUrl(url, params) : url;
    return this.request(req_url, options)
  },

  post(url, data) {
    let options = {
      method: 'POST',
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    }
    if (data) options.body = JSON.stringify(data)
    return this.request(url, options)
  },

  delete(url, params) {
    let options = {
      method: 'DELETE'
    }
    let req_url = params ? this.buildUrl(url, params) : url;
    return this.request(req_url, options)
  },

  put(url, data) {
    let options = {
      method: 'PUT'
    }
    if (data) options.body = JSON.stringify(data)
    return this.request(url, options)
  },

  postForm(url, data, flag) {
    let options = {
      method: 'POST'
    }
    // if (data) options.body = flag ? this.buildFormData(data) : new FormData(data);
    if (data) options.body = this.buildFormData(data);
    console.log(options.body);
    return this.request(url, options)
    // return this.requsetFormData(url,data,'post');
  },

  getForm(url, data, flag) {
    let options = {
      method: 'GET'
    }
    if (data) options.body = flag ? this.buildFormData(data) : new FormData(data);
    return this.request(url, options)
  },


  head(url) {
    let options = {
      method: 'Head'
    }
    return this.request(url, options)
  },
  buildUrl(url, params) {
    const ps = []
    if (params) {
      for (let p in params) {
        if (p) {
          ps.push(p + '=' + encodeURIComponent(params[p]));
        }
      }
    }
    return url + '?' + ps.join('&')
  },
  buildFormData(params) {
    if (params) {
      const data = new FormData()
      for (let p in params) {
        if (p) {
          data.append(p, params[p])
        }
      }
      return data;
    }
  },
  request(url, options) {
    options.headers = options.headers;
    options.credentials = 'same-origin'
    return fetch(url, options)
      .then(function (response) {
        switch (response.status) {
          case 200:
            return response.json();break;
          case 401:
            let path = router.currentRoute.path;
            router.push({path:'/',query:{returnUrl:path}});break;
          case 500:
            return response.json();break;
          default:
            return response
        }
      })
      .catch(err => {
          Notification.error({
            title:'请求错误',
            message:`${url}请求错误，请检查请求参数或联系管理员`
          });
          return err;
      });
  },
  exportFile(url,params){
    return axios({
        method: "get",
        url: this.buildUrl(url,params), // 请求地址
        responseType: "blob", // 表明返回服务器返回的数据类型
        headers: {
            "Content-Type": "application/json"
        }
    })
  },
  exportFilePost(url,params){
    return axios({
      method: "post",
      url: url, // 请求地址
      data:params,
      responseType: "blob", // 表明返回服务器返回的数据类型
      headers: {
        "Content-Type": "application/json"
      }
    })
  },
  requsetFormData(url,params,method){
    return axios({
      method,
      url,
      data:params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
}
export default http;
