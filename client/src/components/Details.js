import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams } from 'react-router-dom';
import  { useEffect, useState, useHistory } from 'react'

const Details = () => {

const {id} = useParams("");
console.log(id);

const history = useHistory();

const [getuserdata, setUserData] = useState([])
console.log(getuserdata)

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
   setUserData(data)
    console.log("get data")
  }
}
useEffect(()=>{
getdata();
},[])


const deleteuser = async(id)=>{
  const res2 = await fetch(`/deleteuser"/${id}`,{
    method:"DELETE",
    headers: {
      "Content-Type":"application/json"
    }
  });

  const deletedata = await res2.json();
  console.log(deletedata);

  if(res2.status === 422 || !deletedata){
    console.log("error");
  }else{
    console.log("user deleted");
    history.push("/")

  }
}

  return (
    <div className='container mt-3'>
<h1 style={{fontWeight: 300}}>Welcome Krishna Maurya</h1>
  <Card sx={{ maxWidth: 600 }}>
      <CardContent>
      <div className='row'>
        <div className='left_view col-lg-6 col-md-6 col-12'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdjbadFBAFM3sZ2WL6ZopV0YtfBMy2E_3bbA&usqp=CAU' style={{width:50}} alt='' />
        <h3 className='mt-3'>Name: <span>{getuserdata.name}</span></h3>
        <h3 className='mt-3'>Age: <span >{getuserdata.age}</span></h3>
        <p><MailOutlineIcon/> Email: <span>{getuserdata.email}</span></p>
        <p><WorkIcon/> Occupation: <span>{getuserdata.work}</span></p>
        </div>
<div className='right_view col-lg-6 col-md-6 col-12'>
<div className='add-btn'>
<NavLink to={`updateuser/${getuserdata._id}`}><button className='btn btn-primary mx-2'><i class="fa-solid fa-pen"></i></button></NavLink>
        <button className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
</div>
<p className='mt-5'><AdUnitsIcon/><span>{getuserdata.mobile}</span></p>
<p className='mt-3'><LocationOnIcon/><span>{getuserdata.add}</span></p>
<p className='mt-3'><span>{getuserdata.desc}</span></p>
</div>
</div>
      </CardContent>
      </Card>
    </div>
  )
}

export default Details