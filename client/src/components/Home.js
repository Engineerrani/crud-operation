import React, { useContext, useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { NavLink } from 'react-router-dom';
import { adddata, updatedata,deldata } from './context/ContextProvider';


const Home = () => {

const [getuserdata, setUserData] = useState([])
console.log(getuserdata);

const{udata, setUdata} = useContext(adddata);

const{updata, setUPdata} = useContext(updatedata)

const{dltdata, setDLTdata} = useContext(deldata)


  const  getdata = async(e)=>{
    const res = await fetch("/getdata",{
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
}, [])

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
    setDLTdata(deletedata)
    getdata();
  }
}


  return (
    <>
    {
      udata ?
      <>
      <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>{udata.name}</strong>user added successfully!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
      </> : ""
    }
    {
      udata ?
      <>
      <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>{updata.name}</strong>user updated successfully!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
      </> : ""
    }
    {
      udata ?
      <>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>{dltdata.name}</strong>user deleted successfully!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
      </> : ""
    }
    <div className='mt-5'>
        <div className="container">
            <div className="add_btn mt-2 mb-2">
                <NavLink to="/register" className='btn btn-primary'>Add data</NavLink>
            </div>

            <table class="table">
  <thead>
    <tr className='table-dark'>
      <th scope="col">id</th>
      <th scope="col">UserName</th>
      <th scope="col">email</th>
      <th scope="col">job</th>
      <th scope="col">Number</th>
      <th scope='col'></th>
    </tr>
  </thead>
  <tbody>

  {
    getuserdata.map((element, id)=>{
      return(
        <>
        <tr>
      <th scope="row">{id + 1}</th>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.work}</td>
      <td>{element.mobile}</td>
      <td className='d-flex justify-content-between'>
        <button className='btn btn-success'><RemoveRedEyeIcon/></button>
      <NavLink to={`view/${element._id}`} ><button className='btn btn-primary'><i class="fa-solid fa-pen"></i></button></NavLink>
        <NavLink to={`edit/${element._id}`}><button className='btn btn-danger' onClick={deleteuser}><i class="fa-solid fa-trash"></i></button> </NavLink>
      </td>
    </tr>
        </>
      )
    })
  }
   


  </tbody>
</table>

        </div>
    </div>
    </>
  )
}

export default Home