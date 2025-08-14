import {toast} from 'react-toastify'

export const handleSuccess =(msg)=>{
    console.log("run");
    toast.success(msg,{
        position: "top-right"
    })
} 

export const handleError=(msg)=>{

    toast.error(msg,{
        position:"top-right"
    })

}
