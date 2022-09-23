import React from 'react';

const TableFilters = () => {
    return (
        <div className="table-filters">
            <div className="table-filters-container">
                <div className="stable-checkbox-container">

                    <input 
                    type="checkbox"
                    id="stableCoin" 
                    defaultChecked={true} 
                    />
                    {/* id ne marche pas sur un label
                    normalement c'est htmlFor */}
                    <label 
                    htmlFor="stableCoin" >
                        Avec stable coin
                    </label>
                </div>  
                <div className="no-list-btn">
                    <p>aucune Liste</p>
                </div>
                <div className="fav-list">
                    <p>Liste des favoris</p>
                    <img src="./assets/star-full.svg" alt="" />
                </div>
            </div>
            
        </div>
    );
};

export default TableFilters;