import React, {useEffect} from 'react'
import { fetchData } from './DataUtils/dataUtils';

export default function MainComponent() {
    
    useEffect(() =>{
        fetchData();
    },[])
    
  return (
    <div>MainComponent</div>
  )
}
