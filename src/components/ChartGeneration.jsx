import {Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend} from 'chart.js'
import {Bar} from 'react-chartjs-2'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import xmlJs from 'xml-js';


ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
    )

    
export default function ChartGeneration() {
    const [currency, setCurrency] = useState("some currency");
    const [arrayOfCurrencies, setArrayOfCurrencies] = useState({});

    const currencyOptions = [
        { value: 'AED', label: 'AED' },
        { value: 'AUD', label: 'AUD' },
        { value: 'BGN', label: 'BGN' }
      ];

    const [myDatasets, setMyDatasets] = useState([{
        label: 'USA',
        data: [2, 6, 9],
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1,
    }]);

    const [data, setData] =useState({
        labels: ["labels"],
        datasets: [{        
        label: 'USA',
        data: [2, 6, 9],
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1,
    }]});

    const options = {

    }

    useEffect(()=>{
        const response = JSON.parse(localStorage.getItem('currencyData'));
        console.log(response);
        setArrayOfCurrencies(response);
    },[])

    const selectCurrency = (option) =>{
        setCurrency(option.value);
    }

    useEffect( () => {
        const labels = Object.keys(arrayOfCurrencies);

        for(let k in arrayOfCurrencies){
            const xml = arrayOfCurrencies[k];

            const options = { compact: true, ignoreComment: true, ignoreDeclaration: true };
            const jsonObj = xmlJs.xml2js(xml, options);

            const rates = jsonObj.DataSet.Body.Cube.Rate;
            
            const rate = rates.find(r => r._attributes.currency === currency);
            console.log("RATE + " + rate._text);
            const currencyArray = [];
            currencyArray.push({
                label: currency,
                data: [`${rate._text}`, 4, 9],
                backgroundColor: 'aqua',
                borderColor: 'black',
                borderWidth: 1,
            })
            setMyDatasets(currencyArray);
        }

        setData({
            labels: labels,
            datasets: myDatasets
        });
    },[currency]);

  return (
    <div className='ChartGenerationContainer'>
        Generate the Chart
        <Select 
        options={currencyOptions} 
        name="currency"
        onChange={selectCurrency} />
        <div className='ChartGenerationContainer'>
            <Bar
            style={{height:'350px'}}
            data={data}
            options={options}
            >
            </Bar>
        </div>
    </div>
  );
}
