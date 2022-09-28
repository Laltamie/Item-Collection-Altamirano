import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";
import { useParams } from "react-router-dom";
// import productos  from '../productos.js';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";


const ItemListContainer = ({greeting}) => {

    const [data, setData] = useState([]);

    const {categoriaId} = useParams();

    useEffect(() => {

        const db = getFirestore();
        const responsiveCollection = collection(db, 'items');
        
        if(categoriaId){
            const respFilter = query(responsiveCollection, where('categoria', '==', categoriaId))
        getDocs(respFilter)
            .then(res => setData(res.docs.map(producto => ({id: producto.id, ...producto.data()} ))) );
        }else {
            getDocs(responsiveCollection)
            .then(res => setData(res.docs.map(producto => ({id: producto.id, ...producto.data()} ))) );
        }      
        
    }, [categoriaId])

    return (
        <div >
            <div className="grid">
                <div className="g-col-6 g-col-md-4">
                    <ItemList data={data}/>
                </div>
            </div>


            <div className="greeting py-10">
                <h5>{greeting}</h5>
            </div>
        </div>
    )
};

export default ItemListContainer;