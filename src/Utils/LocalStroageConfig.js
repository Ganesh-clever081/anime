import _ from 'lodash';

export default function LocalStroageConfig(key,value,operation) {
 if(!_.isNil(key) && !_.isNil(value) && operation === 'set'){
   localStorage.setItem(key,value);
 }else if(!_.isNil(key) && operation === 'get'){
   return localStorage.getItem(key);
 }else{
   localStorage.removeItem(key);
 }
}
