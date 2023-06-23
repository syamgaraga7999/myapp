import React from 'react';
import Home from './pages/Home';
import {convertObjToString} from './utils/abc';

import axios from 'axios';


class App extends React.Component {

  constructor(props){
    console.log('constructor')
    super(props)
    this.state = {
      showAddEditDiv:false,


      data :[],
      selectedRow:{
      enq_id:'',
      sport_enq:'',
      name:'',
      std_name:'',
      phone:'',
      addr:'',
      enq_date:'',
      status:'',
      
      }
    
    }
  }

  componentDidMount(){
    console.log('componentDidMount')
    
    this.getData();


  }

  

  getData = ()=>{

    axios.post('https://sportncelebrate.com/appapi/index.php/enquirylist','orgid=123&langpref=english').then((res)=>{
      console.log(res);
       this.setState({data:res.data.data})


    }).catch((err)=>{

    }).finally(()=>{

    })

  }
  
  // addRow = ()=>{
  //   this.state.customers.push({id:7,name:'raj7'})
  //   this.setState({customers:this.state.customers})
    
  // }

  deleteRow = (it)=>{

    axios.post('https://sportncelebrate.com/appapi/index.php/delenq',`orgid=123&enq_id=${it.enq_id}`).then((res)=>{
      console.log(res);
      // this.setState({data:res.data.data})

      for(let i=0;i<this.state.data.length;i++){
        if(this.state.data[i].enq_id == it.enq_id){
          this.state.data.splice(i,1)
        }
      }
     this.setState({data:this.state.data})

    }).catch((err)=>{

    }).finally(()=>{

    })

  }
  editRow=(it)=>{
    
    this.setState({selectedRow:it,showAddEditDiv:true})

  }
  
  inpChange = (e,fldname)=>{

    this.state.selectedRow[`${fldname}`]=e.target.value
    
    this.setState({selectedRow:this.state.selectedRow})
    //  console.log(this.state.selectedRow)
  }

  addBtn = ()=>{

    this.state.selectedRow = {
      org_id:'123',
      enq_id:'',
      sport_enq:'',
      name:'',
      std_name:'',
      phone:'',
      addr:'',
      enq_date:'',
      status:'',
      
      }
      this.setState({selectedRow:this.state.selectedRow,showAddEditDiv:true})
      

  }
  


  saveEnq = ()=>{

    


    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: convertObjToString(this.state.selectedRow),
      url:'https://sportncelebrate.com/appapi/index.php/addenquiry',
    };

    axios(options)
    .then((res)=>{

      if(!this.state.selectedRow.enq_id){
        this.state.data.splice(0,0,res.data.data)
        this.setState({data:this.state.data,showAddEditDiv:false})
      }else {
        for(let i=0;i<this.state.data.length;i++){
          if(this.state.data[i].enq_id == res.data.enq_id){
            console.log(this.state.data[i].enq_id)
            this.state.data.splice(i,1,res.data.data);
            break;
           
          }
         
      }
      this.setState({data:this.state.data,showAddEditDiv:false})
       
      
    }
    
      //console.log(res)
    })
    .catch((err)=>{})
    .finally(()=>{})
  }
  render(){
    console.log('render')
    return(
    <div>
      
    <div style={{display:'flex',flexDirection:'row',justifyContent:'center',backgroundColor:'burlywood',height:40}}>
      <div>LOGO</div>
    <div style={{flex:'1'}}></div>
    <div style={{marginLeft:12}}>HOME</div>
    <div style={{marginLeft:12}}>ADD STUDENT</div>
    <div style={{marginLeft:12}}>BOOKING</div>
    </div>
  
    
      
      
    {this.state.showAddEditDiv && <div>
            <label for="enq_id">ENQ_ID:</label>
            <input type="text" name="enq_id" id="enq_id" placeholder="enter enq_id" required  value = {this.state.selectedRow.enq_id} onChange={(e)=>{this.inpChange(e,'enq_id')}}/><br/><br/>
            
            <label for="sport_enq">SPORT:</label>
            <input type="text" name="sport_enq" id="sport_enq" placeholder="enter sport_enq" required value={this.state.selectedRow.sport_enq} onChange={(e)=>this.inpChange(e,'sport_enq')}/><br/><br/>
            
            <label for="name">NAME:</label>
            <input type="text" name="name" id="name" placeholder="enter name" required value={this.state.selectedRow.name} onChange={(e)=>this.inpChange(e,'name')}/><br/><br/>
            
            <label for="std_name">STD_NAME:</label>
            <input type="text" name="std_name" id="std_name" placeholder="enter std_name" required value={this.state.selectedRow.std_name} onChange={(e)=>this.inpChange(e,'std_name')}/><br/><br/>
            
            <label for="addr">ADDRESS:</label>
            <input type="text" name="addr" id="addr" placeholder="enter address" required value={this.state.selectedRow.addr} onChange={(e)=>this.inpChange(e,'addr')}/><br/><br/>

            <label for="phone">PHONE:</label>
            <input type="text" name="phone" id="phone" placeholder="enter phone" required value={this.state.selectedRow.phone} onChange={(e)=>this.inpChange(e,'phone')}/><br/><br/>

            <label for="enq_date">ENQ_DATE:</label>
            <input type="date" name="enq_date" id="enq_date" placeholder="enter enqdate" required value={this.state.selectedRow.enq_date} onChange={(e)=>this.inpChange(e,'enq_date')}/><br/><br/>
            
            <label for="status">STATUS:</label>
            <input type="text" name="status" id="status" placeholder="enter status" required value={this.state.selectedRow.status} onChange={(e)=>this.inpChange(e,'status')}/>
            <div>
              <button onClick={()=>this.setState({showAddEditDiv:false})}>Cancel</button>
              <button onClick={this.saveEnq}>Save</button>
            </div>
          </div>}<br/><br/>
      {/* <button onClick={()=>this.add(it)}>ADD</button><br/> */}
      <br/>
      <div style={{display:'flex',backgroundColor:'#f9f9f9',alignItems:'center'}}>
          <div style={{fontSize:24}}>Enquires</div>
          <div style={{flex:1}}></div>
          <button onClick={this.addBtn}>Add</button>
      </div>
      <table>
        <tr>
          <th>ID</th>
          <th>SPORT</th>
          <th>NAME</th>
          <th>STD_NAME</th>
          <th>ADDRESS</th>
          <th>PHONE</th>
          <th>ENQ_DATE</th>
          <th>STATUS</th>
          <th>OP</th>
          <th>DELETE</th> 
        </tr>
        {this.state.data.map((it)=>{
          return(<tr>
            <td>{it.enq_id}</td>
            <td>{it.sport_enq}</td>
            <td>{it.name}</td>
            <td>{it.std_name}</td>
            <td>{it.addr}</td>
            <td>{it.phone}</td>
            <td>{it.enq_date}</td>
            <td>{it.status}</td>
            <td><button onClick={()=>this.editRow(it)}>Edit</button></td>
            <td><button onClick={()=>this.deleteRow(it)}>Delete</button></td>
          </tr>)
        })}
        
      </table>
      
    </div>
    
    
    
    )
  }

}


export default App