import React from 'react';
import axios from 'axios';
import { useState } from 'react';


function Home (){

    var  [counter,setCounter] = useState(0)

  function addBtn(){

    setCounter(counter+1)

    //counter = counter+1
    console.log('addBtn',counter)
  }

  function minusBtn(){
    setCounter(counter-1)
    //counter = counter-1
    console.log('minusBtn',counter)
  }
  

    return(<div>Home Page working

<div style={{display:'flex'}}>

<button onClick={minusBtn}>Minus</button>
<div style={{marginLeft:12,marginRight:12}}>{counter}</div>
<button onClick={addBtn}>Add</button>


</div>

    </div>)
}

export default Home