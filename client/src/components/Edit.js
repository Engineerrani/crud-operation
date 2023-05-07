import React, {useState,useEffect, useHistory, useContext} from 'react'
import { NavLink, useParams} from 'react-router-dom';
import { updatedata } from './context/ContextProvider';


const Edit = () => {

//   const [getuserdata, setUserData] = useState([])
// console.log(getuserdata)

const [updata, setUPdata] = useContext(updatedata);

const history = useHistory("");

    const [inpval, setINP] = useState({
        name:"",
        email:"",
        age:"",
        mobile:"",
        work:"",
        add:"",
        desc:""
    })
    
        const setdata = (e)=>{
    console.log(e.target.value)
    const {name, value} = e.target;
    setINP((preval)=>{
        return {
            ...preval,
            [name]:value
        }
    })
        }
        const {id} = useParams("");
console.log(id);


const  getdata = async(e)=>{
  const res = await fetch(`/getUser/${id}`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    },
 
  });
  const {data, error} = await res.json();
  console.log(data);

  if(res.status === 404 || !data){

console.log(error);
  }else{
   setINP(data)
    console.log("get data")
    history.push("/");
  }
}
useEffect(()=>{
  getdata();
})
const updateuser =async(e)=>{
  e.preventDefault();

  const {name,email,mobile,work,add,desc,age} = inpval;

  const res2 = await fetch(`/updateuser/${id}`, {
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,email,work,add,mobile,desc,age
    })

  });
  const data2 = await res2.json();
  console.log(data2);
  
  if(res2.status === 422 || !data2) {
    alert("fill the data")
  }else{
  history.push("/")
  setUPdata(data2)
  }
}
  return (

<div className='container'>
    <NavLink to="/">home2</NavLink>
    <form className='mt-4'>
    <div className='row'>
  <div class="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" onChange={setdata} name='name' value={inpval.name} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div class="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" class="form-label">Email</label>
    <input type="email" onChange={setdata} name='email' value={inpval.email} class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" class="form-label">Age</label>
    <input type="text" onChange={setdata} name='age' value={inpval.age} class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" class="form-label">Mobile</label>
    <input type="number" onChange={setdata} name="mobile" value={inpval.mobile} class="form-control" id="exampleInputPassword1"/>
  </div> 
  <div class="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" class="form-label">Work</label>
    <input type="text"  onChange={setdata} name="work" value={inpval.work} class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3 col-lg-12 col-md-12 col-12">
    <label for="exampleInputPassword1" class="form-label">Description</label>
    <textarea type="text" onChange={setdata} name="desc" value={inpval.desc} className='form-control' id='' cols="30" row="10"></textarea>
  </div>


 
  <button type="submit" onClick={{updateuser}} class="btn btn-primary">Submit</button>
  </div>
</form>
   </div>

  )
}

export default Edit