import React,{useState} from 'react';
import colors from "../styles/_settings.scss";
import TableLine from './TableLine';

const Table = ({coinsData}) => {
    
    const [rangeNumber,setRangeNumber] = useState(100);
    const [orderBy,setOrderBy] = useState("");

    const tableHeader =["Prix","MarketCap","Volume","1h","1j","1s","1m","6m","1yr","ATH"];

    return (
       <div className="table-container">
        <div className="table-header">
            <div className="range-container">
                {/* choisir le top */}
                <span>
                    Top{" "} 
                    <input 
                        type="text" 
                        value ={rangeNumber} 
                        onChange ={(e)=>setRangeNumber(e.target.value)} 
                        style={{background:'rgba(20, 80, 5,0.320)'}}
                    />
                </span>
                {/* input range */}
                <input 
                    type="range" 
                    min="1" 
                    max="250" 
                    value={rangeNumber} 
                    onChange={(e)=>setRangeNumber(e.target.value)}  
                />
            </div>
            {tableHeader.map((el)=>(
                <li key={el}>
                    <input 
                        type="radio" 
                        name="header-el" 
                        id={el} 
                        defaultChecked={
                            el === orderBy || el === orderBy + "reverse" ? true:false 
                        }

                        onClick=
                        {
                            ()=>{

                                if(orderBy === el){
                                    setOrderBy(el + "reverse");
                                }else{

                                    setOrderBy(el);
                                }
                            }
                        }
                    />
                    <label htmlFor={el} >{el}</label>
                </li>
            ))}
        </div>
        <ul>
            {
                coinsData && coinsData
                .slice(0,rangeNumber)
                .map((coin, index)=>(
                    <TableLine key={index} coin={coin} index={index} />
                    
                ))
            }
        </ul>
       </div>
    );
};

export default Table;