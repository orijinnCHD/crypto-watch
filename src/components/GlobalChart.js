import React, { useState,useEffect } from 'react';
import { Tooltip, Treemap } from 'recharts';
import colors from "../styles/_settings.scss";

const GlobalChart = ({coinsData}) => {

    const [dataArray,setDataArray] = useState([]);


    // la couleur des carré de la trimap
    const colorPicker = (number)=>{
        if(number >= 20)
            return colors.color1;
        else if(number >= 5)
            return colors.green2;
        else if (number >= 0)
            return colors.green1;
        else if (number >= -5)
            return colors.red1;
        else if (number >= -20)
            return colors.green1;
        else
            return colors.black2;
    }

    // fonction qui va exclure les stable coin
    // car il trompe le tableau et le donnée sont inutile
    const excludeCoin = (coin) =>{
        if( 
            coin ==="usdt" ||
            coin ==="usdc" ||
            coin ==="busd" ||
            coin ==="dai" ||
            coin ==="ust" ||
            coin ==="mim"
        )
        {
            return false;
        }
        else{
            return true;
        }
       
    }

    const getcoinsData = () =>{

        return new Promise((resolve,reject)=>{
            
            let chartData =[];

            if(coinsData.length > 0){

                for (let i = 0; i < 45; i++) {

                    if(excludeCoin(coinsData[i].symbol)){

                        chartData.push({
                            name:coinsData[i].symbol.toUpperCase() + " " + coinsData[i].market_cap_change_percentage_24h.toFixed(1) + "%"
                            // la taille du carré en fonction du marketcap
                            ,size: coinsData[i].market_cap
                            // fill : la couleur des carré
                            ,fill:colorPicker(coinsData[i].price_change_percentage_24h)
                        })
                    }

                        
                }

                
            }
            
            if(chartData.length > 0)
                resolve(chartData);
            else
            reject(new Error("Sorry, doesn't have to upload data"))
        })
    }
    

    useEffect(()=>{

        const data = async()=> {
            try{
                setDataArray(await getcoinsData());
            }catch(error){
                console.log(error);
            }
        }

        data();

    },[coinsData])

    /*
    useEffect( ()=>{
        let chartData =[];

        if(coinsData.length > 0){
            for (let i = 0; i < 45; i++) {

                if(excludeCoin(coinsData[i].symbol)){

                    chartData.push({
                        name:coinsData[i].symbol.toUpperCase() + " " + coinsData[i].market_cap_change_percentage_24h.toFixed(1) + "%"
                        // la taille du carré en fonction du marketcap
                        ,size : coinsData[i].market_cap
                        // fill : la couleur des carré
                        ,fill:colorPicker(coinsData[i].price_change_percentage_24h)
                    })
                }
                    
            }
       
        }
        setDataArray(chartData);
        
    },[coinsData])*/



    // creer les informations à la survole des carées
    // pour la treemap
    const TreemapToolTip =({active, payload}) =>{
 
        // active : si tu survole avec la souris
        //payload : si tu as des information a fournir
        if(active && payload && payload.length){

            //payload[0].payload.z = 0;
            // si oui, on se créer ce petit carré
            
            //console.dir permet de voir et decomposer des objet dans la console
            
            console.dir(payload);
            return (<div className="custom-tooltip">
                {/* on fourni les information dans le petit carrée */}
                    
                    <p className="label">{payload[0].payload.name}</p>
            </div>)

        }
        return null;
    }

    return (<div className="global-chart">
        {/* il faut toujours gerer si le useState n'est pas vide */}
        {/* {console.log("a" + dataArray)} */}   
        {/* {console.log("render_" + dataArray.name)} */}
        {
            <Treemap
                isAnimationActive = {false}
                width={730}
                height={181}
                
                // on lui donne notre useState
                data={dataArray}
                // clé des données, determine la taille des boites
                //size : c'est le marketcap dans le useState : "dataArray"
                // vue qu'on a passé "dataArray" il sait c'est quoi "size"
                dataKey="size"
                stroke="rgb(51,51,51)"
                fill="black"
                aspectRatio="1"
            >
                <Tooltip  content={ <TreemapToolTip  />}/>
            </Treemap>
            
        }
       </div>
    );
};

export default GlobalChart;