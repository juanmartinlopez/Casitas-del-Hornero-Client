import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { PedirLocalStorage } from "../Index";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/Actions/Actions";
import style from "./GetBookings.module.css"
const GetBookings = () =>{
    const user = PedirLocalStorage();
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const {BookingsAdmin} = useSelector(state=>state)

    useEffect(()=>{
        if(!loading){
            setLoading(true)
            if(!BookingsAdmin.length){

                dispatch(getAllBookings(user.id,user.rol))
            }
        }
    },[BookingsAdmin])


    const columnas = [
        {
            name: "hotelName",
            label: "Hotel Name",  
            options: {
              customBodyRender: (value) => {
                
                return (
                  <div className={style.divNames}>
                    {value}  
                  </div>
                );
              },
            },
          },
        "userEmail",
            {
            name: "date",
            label: "Date",  
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                
                return (
                  <div className={style.divFecha}>
                    <p>{value.slice(0,10)}</p>     
                  </div>
                );
              },
            },
          },
          {
            name: "checkIn",
            label: "checkIn",  
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                
                return (
                  <div className={style.divFecha}>
                    <p>{value.slice(0,16)}</p>     
                  </div>
                );
              },
            },
          },
          {
            name: "checkOut",
            label: "checkOut",  
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                
                return (
                  <div className={style.divFecha}>
                    <p>{value.slice(0,16)}</p>     
                  </div>
                );
              },
            },
          },
          {
            name: "amount",
            label: "amount",  
            options: {
              customBodyRender: (value) => {
                
                return (
                  <div className={style.divAmount}>
                    <p>{value}</p>     
                  </div>
                );
              },
            },
          },
          {
            name: "individualPrice",
            label: "individual Price",  
            options: {
              customBodyRender: (value) => {
                
                return (
                  <div className={style.divPriceInd}>
                    <p>{value}</p>     
                  </div>
                );
              },
            },
          },
          {
            name: "totalPrice",
            label: "total Price",  
            options: {
              customBodyRender: (value) => {
                
                return (
                  <div className={style.divPriceTotal}>
                    <p>{value}</p>     
                  </div>
                );
              },
            },
          },
    ]

    const options = {
        selectableRows: false, // Desactivar checkboxes en cada fila
      };
    

    return (
        <MUIDataTable
        className={style.gigachadaowo}
            title="Reservas"
            data={BookingsAdmin}
            columns={columnas}
            options={options}
        />
      );

}

export default GetBookings;