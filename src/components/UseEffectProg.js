import React, { useEffect, useState } from 'react';

const UseEffectProg = () => {
    
    const [user, setUser] =useState([]);

    // function getData(){
        
    //     let error = false;

    //     return new Promise((resolve,reject)=>{
    //         let array =[];
    //         for (let i = 0; i < 100; i++) {
    //             array.push(i);
    //         }

    //         if(!error){
    //             resolve(array);
    //         }else{
    //             reject(new Error("erreur"));
    //         }
    //     })
    // }

    function getData(){
        
        let error = false;

        return new Promise((resolve,reject)=>{
            let array =[];
            let length = 100;
            for (let i = 0; i < length; i++) {
                array.push(i);
            }

            if(array.length === length)
                resolve(array);
            else
                reject(new Error("la boucle n'a pas été complête"))

        })
    }
    
    useEffect(()=>{


        // first method
        //getData().then((array)=> setUser(array)).catch((error)=>console.error(error))
        //second method
        const handle = async()=>{
            try{
                setUser(await getData());
                
            }catch(e){
                console.log(e);
            }
        } 

        handle();

    },[])
    
    return (
        <div>
            {
                //console.log("render_" + user)
            }
        </div>
    );
};

export default UseEffectProg;