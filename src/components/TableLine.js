import React from 'react';
import PercentChange from './PercentChange';

const TableLine = ({coin, index}) => {




    // fonction qui permet des arrondie specifique pour les coins
    const priceFormater = (num) =>{

        //verifie si la longueur du chiffre a l'arrondie est petit
        // genre à l'arrondie il est 0 comme le shiba inu
        if(Math.round(num).toString().length < 4){
            // intl.numberFormat : methode interger
            //
            return new Intl.NumberFormat("us-US",{
                // tu me fait un minimum arrondi à deux chiffre
                // et un max arrondie à la septiéme chiffre
                minimumFractionDigits :2,
                maximumFractionDigits :7

                // le chiffre qu'on doit formatter dans cette fonction
            }).format(num);
        }else{
            return num;
        }
    }


    // formater le marketcap des coins pour avoir un chiffre en milliard

    const mktCapFormater = (num )=>{

        // on convertie en string en 1er puis on eclate
        // avec split et on retire les 6 dernier chiffre (-6)

        let newNum = String(num).split("").slice(0,-6); 
        return Number(newNum.join(""));

    }

    return (
        <div className="table-line">
            <div className="infos-container">
                <span>⭐</span>
                {/* + 1 : parce uqe index commence à zero */}
                <p>{index +1 }</p>
                <div className="img">
                    {/* logo coin */}
                    <img src={coin.image} height="20" alt="logo" />
                </div>
                <div className="infos">
                    <div className="chart-img">
                        {/* icone chart */}
                        <img src="./assets/chart-icon.svg" alt="chart-icon" />
                    </div>
                    <h4>{coin.name}</h4>
                    <span>- {coin.symbol.toUpperCase()}</span>

                    {/* a : le lien du coin vers la page coingecko */}
                    <a  target="_blank" 
                        // le lien  si on click sur la ligne du coin
                        // replace : c'est pour remplacer dans le nom les espaces par un trait pour le lien
                        //ex : nom du coin : wrapped bitcoin , en lien coingecko.com/fr/pieces/wrapped-bitcoin
                        //pk trois replace : on peut avoir des noms des coins en trois partie : internet computer coin etc..
                        href={
                            "https://www.coingecko.com/fr/pi%C3%A8ces/" + coin.name.toLowerCase()
                            .replace(" ","-")
                            .replace(" ","-")
                            .replace(" ","-")
                        }
                    >
                        {/* image "i" */}
                        <img src="./assets/info-icon.svg" alt="info-icon" />
                    </a>
                </div>
            </div>
            {/* le prix 
                // seulement il y a un soucis 
                //si on a un token trop bas, genre 1 *10-10 dollar
                // le prix sera juste de 0 dollar
            */}
            <p>{priceFormater(coin.current_price).toLocaleString()} $</p>
            <p className="mktcap" >{mktCapFormater(coin.market_cap).toLocaleString()} M$</p>
            
            
            {/* <p className="volume">{coin.total_volume.toLocaleString()} $</p> */}
            <p className="volume">{coin.total_volume.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} $</p>
            <PercentChange percent={coin.price_change_percentage_1h_in_currency}/>
            <PercentChange percent={coin.price_change_percentage_24h}/>
            <PercentChange percent={coin.price_change_percentage_7d_in_currency}/>
            <PercentChange percent={coin.price_change_percentage_30d_in_currency}/>
            <PercentChange percent={coin.price_change_percentage_200d_in_currency}/>
            <PercentChange percent={coin.price_change_percentage_1y_in_currency}/>
            
            {/* ath */}
            {
                // si on est à -3% depuis ATH
                coin.ath_change_percentage > -3 ? 
                <p> ATH !</p>
                :
                <PercentChange percent={coin.ath_change_percentage}/>
            }
        </div>
    );
};

export default TableLine;