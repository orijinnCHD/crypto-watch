import React, { useEffect,useState } from 'react';
import colors from "../styles/_settings.scss";

// pour pas ecrire props.percent on destructure
const PercentChange = ({percent}) => {
   
   const [color,setColor] = useState();

   // rajouter percent dans array useffect :
   // sinon on a un probléme d'asynchrone
   //donc quand la data arrive i va rejouer useEffect pour faire la MAJ du useState
    // en méme temps les pourcentage dans la crypto change souvent

   useEffect(()=>{
    if(percent) // verifie qu'il y a une donnée
        if(percent >= 0 ) // si le pourcentage sup 0 
            setColor(colors.green1); // on le met en vert (pump)
        else
            setColor(colors.red1);// on le met en rouge (dump)
    else
        setColor(colors.white1); // si il ya aucune donnée on attribue du blanc
        
    
   },[percent])
   
    return (
        // percent ? : on verifie qu'il y a un pourcentage
        // toFixed(1): un chiffre arpés la virgule
        // "-" : si il n'y a pas de donnée
        <p className="percent-change-container" style ={{color : color}}>
            {percent ? percent.toFixed(1) + "%":"-"}
        </p>
    );
};

export default PercentChange;