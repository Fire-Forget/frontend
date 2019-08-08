import http from '@/utils/fetch'
import reqUrl from './reqUrl'

export default {
  async getBarData(param){
    let res = await http.get(reqUrl.getBarData,param);
    return res;
  }

}