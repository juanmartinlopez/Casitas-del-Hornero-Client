import { useEffect, useState } from "react";
import { PedirLocalStorage } from "../Index";
import axios from "axios";

const TrolleyCard = ({ id, name, image, price, stock, people, amount, array, setArray, hotelName }) => {
    const [cant, setCantidad] = useState(amount)
    const [total, setTotal] = useState(price)
    const [loadingUp, setLoadingUp] = useState(false)
    const [loadingDown, setLoadingDown] = useState(false)
    const User = PedirLocalStorage()

    useEffect(() => {
        setTotal(cant * price);
        setArray([
            ...array,{
                id,
                price: total,
                amount: cant,
                title: `${name} en ${hotelName}`
            }]
        )
    }, [loadingUp, loadingDown]);

    const sumar = async (value, idUser, id_Rommtype) => {
        setLoadingUp(true)
        const valor = await axios.put(`https://casitasdelhornero.onrender.com/cart/${idUser}/${id_Rommtype}?putAmount=${value}`)
        setCantidad(valor.data)
        setLoadingUp(false)
    }

    const restar = async (value, idUser, id_Rommtype) => {
        setLoadingDown(true)
        const valor = await axios.put(`https://casitasdelhornero.onrender.com/cart/${idUser}/${id_Rommtype}?putAmount=${value}`)
        setCantidad(valor.data)
        setLoadingDown(false)
    }

    return (
        <div>
            <img src={image} alt="habitacion" />
            <p>{name}</p>
            <p>Diponibilidad: {stock}</p>
            <button onClick={()=> sumar("up", User.id, id)} disabled={ cant>=stock || loadingUp }>+</button>
            {!loadingUp ? (
                !loadingDown ? (
                    <p>cantidad: {cant}</p>
                ) : (
                    <p>cargando....</p>
                )) : (
                <p>cargando....</p>)}
            <button onClick={()=> restar("down", User.id, id)} disabled={ cant<=1 || loadingDown }>-</button>
            <p>price: {total}</p>
        </div>
    )
};

export default TrolleyCard;
