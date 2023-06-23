
export default function makeCall(){
    console.log('makecall')
}

export function fun1(){
    console.log('fun1')
}


export function fun2(){
    console.log('fun2')
}
 
export function fun3(){
    console.log('fun3')
}

export function convertObjToString(obj){

    let keys=Object.keys(obj);
    
    let opStr='orgid=123&langpref=english&';

    for(let i=0; i<keys.length;i++){

      
      let val = obj[keys[i]];
      opStr+= (i==keys.length-1) ? `${keys[i]}=${val}`:`${keys[i]}=${val}&`;
    }
    return opStr
    //console.log(opStr)


    

    

  }


