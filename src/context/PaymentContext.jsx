import { createContext, useEffect, useState } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({children})=>{
    const [step, setStep] = useState(0);
    const [orders, setOrders] = useState([]);

    const handleStep = (curentStep)=>{
        setStep(curentStep);
    }

    useEffect(()=>{
        getOrders();
    },[])

    //post order to db
    const createOrder = (order) => {
        fetch('http://localhost:3000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
    }

    const getOrders = () => {
        fetch('http://localhost:3000/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => setOrders(data))
        .catch(error => console.error(error));
    }

    return(
        <PaymentContext.Provider value={{step,handleStep,createOrder, getOrders, orders}}> 
            {children}
        </PaymentContext.Provider>
    )

}


export default PaymentContext