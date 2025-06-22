import TrackedStore from './TrackedStore.jsx'
import './TrackedStores.css'
import { useState, useEffect } from 'react';

export default function TrackedStoreList() {
    let stores = [
      {
      id:"1",
      url:"http://localhost:3000/logo512.png",
      name: "react"
    },
      {
      id:"2",
      url:"http://localhost:3000/logo512.png",
      name: "react"
    },
      {
      id:"3",
      url:"http://localhost:3000/logo512.png",
      name: "react"
    },
      {
      id:"4",
      url:"http://localhost:3000/logo512.png",
      name: "react"
    },
    
    ];
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/companies');
          stores = await response.json();
        } catch (error) {
          console.log(error('Error', error));
        }
      };
      fetchData();
    }, []);
    return (
        <div>
            <h1>Track Stores</h1>
            <p1>Some of the stores we track</p1>
            <div className='tracked-store-container'>
                {stores.map((store) => {
                    return <TrackedStore store={store}/>
                })}
            </div>

        </div>
    );
}