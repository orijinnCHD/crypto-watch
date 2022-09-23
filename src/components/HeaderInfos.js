import axios from 'axios';
import React, { useEffect,useRef,useState } from 'react';
import PercentChange from './PercentChange';
import TableFilters from './TableFilters';

const HeaderInfos = () => {

    //useState

    const[headerData,setHeaderData] = useState([]);
    const onlyRun = useRef(false);

    //`https://api.coingecko.com/api/v3/global`
    useEffect(()=>{

        if(!onlyRun.current){
            axios.get('https://api.coingecko.com/api/v3/global')
            .then((res)=>setHeaderData(res.data.data))
            
        }

        return ()=>{
            onlyRun.current = true;

        }

    },[])

    return (
        <div className="header-container">
            <ul className="title">
                {/* le chemin de recherche d'image debute au index.html  */}
                <li><h1><img src="./assets/logo.png" alt="logo" /> Watch Tower</h1></li>
                <li>
                    Crypto-monnaies : {
                        // on verifie en 1er si headerData.active_cryptocurrencies existe avant
                        headerData.active_cryptocurrencies && 
                        headerData.active_cryptocurrencies.toLocaleString()
                    }
                </li>
                <li>
                    Marchés : {
                        headerData.markets && headerData.markets.toLocaleString()
                    }
                </li>
            </ul>
            <ul className="infos-mkt">
                <li className="global-mkt">
                    
                    Global Market Cap : 
                    {/* strong: mettre en gras */}
                    <strong> 
                        <PercentChange
                            percent={headerData.market_cap_change_percentage_24h_usd}
                        />
                    </strong>
                </li>

                {/* c'est bizarre qu'il y a une erreur quand on verifie
                 "headerData.market_cap_change_percentage.btc" 
                 mais ça marche quand c'est "headerData.market_cap_change_percentage"*/}
                <li>
                    BTC dominance :{
                        headerData.market_cap_percentage && 
                        headerData.market_cap_percentage.btc.toFixed(1) + "%"
                    }
                </li>
                <li>
                    ETH dominance : {
                        headerData.market_cap_percentage && 
                        headerData.market_cap_percentage.eth.toFixed(1) + "%"
                    }
                </li>
            </ul>
            <TableFilters/>
        </div>
    );
};

export default HeaderInfos;