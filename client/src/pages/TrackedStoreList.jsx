import TrackedStore from './TrackedStore.jsx'
import '../styles/TrackedStoreList.css'
import { useState, useEffect } from 'react';

export default function TrackedStoreList() {
    let [stores, setStores] = useState([]);
    
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('companies');
        
          let data = await response.json();
          console.log(data);
          setStores(data);
        } catch (error) {
          console.error('Error', error);
        }
      };
      fetchData();
    }, []);
    return (
        <div className="tracked-store-container">
            <h2>Track Stores</h2>
            <p1>Some of the stores we track</p1>
            <div className='media'>
                {stores.map((store) => {
                    return <TrackedStore key={store.id} store={store}/>
                })}
            </div>

        </div>
    );
}