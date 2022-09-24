import React from 'react';

const TableLine = ({coin, index}) => {
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
                    <a target="_blank" href={"https://www.coingecko.com/fr/pi%C3%A8ces/" + coin.name.toLowerCase().replace(" ","-").replace(" ","-")}></a>
                </div>
            </div>
        </div>
    );
};

export default TableLine;