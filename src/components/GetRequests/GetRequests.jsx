import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests,getUsers } from "../../redux/Actions/Actions";
import { PedirLocalStorage } from "../Index";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import swal from "sweetalert";
import style from "./GetRequest.module.css"


const GetRequests = () => {
    const {Requests} = useSelector(state=>state)
    const dispatch = useDispatch()
    const user = PedirLocalStorage();
    const {Users} = useSelector((state) => state);
    const URL_BASE = "https://casitasdelhornero.onrender.com";
    const  [loading,setLoading] = useState(false)
    

    useEffect(() => {
      if(!loading){
        setLoading(true)
        if(!Requests.length){
            dispatch(getRequests(user.id))
        }
      }
    }, [Requests,Users]);

    
 
    const handler = async (event,requestId,userId) => {
     
        try {
            if(event.target.value== "si"){
                await axios.put(`${URL_BASE}/request/${requestId}`)
                await axios.put(`${URL_BASE}/user/`,{id_user: userId, rol: 2})
                await dispatch(getRequests(user.id))
                await dispatch(getUsers(user.id))
            } else{

                await axios.put(`${URL_BASE}/request/${requestId}`)
              
                await dispatch(getRequests(user.id))
            }
           
        } catch (error) {
            swal({
                text: error.response.data.error,
                icon: "warning",
                buttons: "Aceptar",
            });
        }

    }


    const columnas = [
      {
        name: "id",
        label: "id",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return(
              <div className={style.divId}>
                {value}
              </div>
            )
          }
        }
      },
        {
          name: "UserId",
          label: "UserId",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              return(
                <div className={style.divId}>
                  {value}
                </div>
              )
            }
          }
        },
        {
          name: "username",
          label: "Nombre de usuario",  
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              
              return (
                <div  className={style.divUserName}>
                  <p>{value}</p>     
                </div>
              );
            },
          },
        },
        "email",
        "message",
        {
            name: "date",
            label: "Fecha",  
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
            name: "status",
            label: "Estado",  
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  const requestId = tableMeta.rowData[0];
                  const userId = tableMeta.rowData[4];
                  return (
                    <div>
                      {value === false ? (
                        <select className={style.boton} name="" onChange={(event) => handler(event,requestId, userId)}>
                          <option hidden>Pendiente</option>
                          <option value="si">Aceptar</option>
                          <option value="no">Rechazar</option>
                        </select>
                      ) : (
                        <p>Finalizada</p>
                      )}
                    </div>
                  );
                },
              },

        }


    ]

    const options = {
        selectableRows: true, // Desactivar checkboxes en cada fila
      };


    return (
        <MUIDataTable
        className={style.gigachadaowo}
          title="Peticiones"
          data={Requests}
          columns={columnas}
          options={options}
        />
      );
    
}

export default GetRequests;
