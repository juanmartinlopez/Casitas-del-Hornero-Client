import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelsAdmin } from "../../redux/Actions/Actions";
import { PedirLocalStorage } from "../Index";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import style from "./GetHotels.module.css"
const GetHotels = () => {
    const {HotelsAdmin} = useSelector(data=>data)
    const dispatch = useDispatch()
    const user = PedirLocalStorage();
    const  [loading,setLoading] = useState(false)

useEffect(()=>{
    if(!loading){
        setLoading(true)
        if(!HotelsAdmin.length){
            dispatch(getHotelsAdmin(user.id))
        }
      }
},[dispatch])

const FuncioBloquear = async (id_Hotel) => {
     await axios.put(
        `https://casitasdelhornero.onrender.com/hotels/status/${id_Hotel}`
       );
    await dispatch(getHotelsAdmin(user.id))
}

const columnas = [
  {
    name: "id",
    label: "id",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return(
          <div className={style.divColumns}>
            {value}
          </div>
        )
      }
    }
  },
    "name",
    "email",
    {
      name: "phoneNumber",
      label: "phoneNumber",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return(
            <div className={style.divColumns}>
              {value}
            </div>
          )
        }
      }
    },
    {
      name: "rating",
      label: "rating",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return(
            <div className={style.divColumns}>
              {value}
            </div>
          )
        }
      }
    },
    {
      name: "valoration",
      label: "valoration",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return(
            <div className={style.divValoration}>
              {value}
            </div>
          )
        }
      }
    },
    {
        name: "status",
        label: "Status",  
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const id_Hotel = tableMeta.rowData[0];
            return (
              <div>
                <h1>{value}</h1>
                <button className={style.boton}
                  onClick={() => FuncioBloquear(id_Hotel)}
                >
                  {value ? "Bloquear" : "Desbloquear"}
                </button>
              </div>
            );
          },
        },
      },
      {
        name: "UserId",
        label: "UserId",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return(
              <div className={style.divUserId}>
                {value}
              </div>
            )
          }
        }
      },
   
    "province"
]


const options = {
    selectableRows: false, // Desactivar checkboxes en cada fila
  };

return (
    <MUIDataTable
    className={style.gigachadaowo}
        title="Hoteles"
        data={HotelsAdmin}
        columns={columnas}
        options={options}
    />
  );

}



export default GetHotels;
