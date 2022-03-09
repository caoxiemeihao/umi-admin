import axios from 'axios';
import { notification } from 'antd';

const axiosInstance = axios.create({
  // 这里写一些请求固定参数
});

axiosInstance.interceptors.response.use(
  response => {
    // 这里加工下返回的数据格式；如果返回数据错误信息也可以在这里抛出提示
    // notification.error(response.data.message);
    return response.data;
  },
  error => {
    // 这里写请求错误处理
  },
);

export { axiosInstance as default }
