import React from 'react'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {useForm} from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'
import "./AccountDetails.scss"
import axios from 'axios'
import { storeUserInfo } from '../redux/vaccUser/vaccUserActions';
import {connect} from 'react-redux'
import logo from '../../images/logo.png'
function AccountDetails(props) {
    console.log(props);
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [loading,setLoading]=React.useState(false)
    const [error,setError]=React.useState("")
    const [data,setData] = React.useState([])
    const [flag,setFlag]=React.useState(false)
    
   React.useEffect(()=>{
    axios.get(`${process.env.REACT_APP_LINK}/account_details/`,{headers:{Authorization:props.user.token}})
    .then(res=>{
        console.log(res);
        if(res.data.length>0){
            setData(res.data)
        }
        
    })
    .catch(err=>{
        setError("Something went wrong")
    })
   },[flag])

   const handleDelete = (item)=>{
       console.log(item)
       axios.get(`${process.env.REACT_APP_LINK}/delete_user/?user_id=${item.id}`,{headers:{Authorization:props.user.token}})
       .then(res=>{
           console.log("delete resposne",res);
           setFlag(!flag)
       })
       .catch(err=>{
           setError("Something went wrong")
       })
   }

    return (
        <div>
           <div className="shadow-lg form-div">
           <img src={logo} alt="ztv" className="zeetvlogo" />
           <h1>ZEETV Vaccination Camp</h1>
           <p className="pheading">Account Details</p>
           <Button variant="text" onClick={()=>props.history.push("/personalinfo")} >Add Person</Button>
        {
            data.length>0?(
                data.map((item,index)=>(
                    <div className="infodiv" key={index}>
            <div className="edit" >
           <IconButton onClick={()=>handleDelete(item)}><DeleteIcon /></IconButton>
           </div>
               <p className="name">{item.first_name}</p>
               <p>{item.dob}</p>
               <p>{item.gender}</p>
               <p>{item.uid}</p>
               <hr />
               <p>Confirm a slot for covid vaccine</p>
               {!item.is_vaccinated?<Button
               onClick={()=>{
                props.storeUserInfo(item)   
                props.history.push("/choosedose")}}
               variant = "contained">Schedule</Button>:null}
           </div>
                ))
            ):null
        }
           
            </div>  
        </div>
    )
}
const mapStateToProps = ({vaccUser})=>{
    return {
      user:vaccUser.user
    }
  }

const mapDispatchToProps = (dispatch)=>{
    return {
        storeUserInfo:(user)=>dispatch(storeUserInfo(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountDetails)
