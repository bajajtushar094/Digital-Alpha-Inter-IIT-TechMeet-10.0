import React from 'react'
import './performerCard.scss'

const PerformerCard = () => {

  const seeder=[
    {
      company:"NETLINX",
      value1:"1.00",
      value2:"19.12",
      bool:true,
      key:"1"
    },
    {
      company:"NETLINX",
      value1:"1.00",
      value2:"19.12",
      bool:true,
      key:"2"
    },
    {
      company:"NETLINX",
      value1:"1.00",
      value2:"19.12",
      bool:false,
      key:"3"
    },
    {
      company:"NETLINX",
      value1:"1.00",
      value2:"19.12",
      bool:true,
      key:"4"
    },
    {
      company:"NETLINX",
      value1:"1.00",
      value2:"19.12",
      bool:false,
      key:"5"
    },
    {
      company:"NETLINX",
      value1:"1.00",
      value2:"19.12",
      bool:true,
      key:"6"
    },
  ]
  return (
    <div className="percardcontainer">
        <div>
            <h3 className="heading-2">Top 5 performers</h3>
        </div>
        <div id="w-node-aa77c7bf-1e83-eb1c-8f8b-8cf94c1a7cfb-5d4911ed" className="metrics">
            <div className="metric-entry"><h4>Ticker</h4>
            <div className="div-block-4 issmall "><h4 id="w-node-_7ceaf30a-87af-bf96-87d2-a22a7a2bddf1-5d4911ed" className="iscolumn">LTV/CAC</h4>
            <h4 id="w-node-_6b533c7f-b31c-8c51-d079-956bc21ea665-5d4911ed" className="iscolumn">ARR(mil $)</h4>
            </div>
            </div>
            <div className="separator"></div>
            {
              seeder.map((data)=>{
              return(
                <div key={data.key} className="metric-entry"><h4 className="black50">{data.company}</h4>
                <div className="div-block-4 issmall col-gap">
                <h4 id="w-node-_80763e3e-9349-a4a1-f787-d6302e9ddf5e-5d4911ed" className="iscolumn black50">{data.value1}</h4>
                <h4 id="w-node-_80763e3e-9349-a4a1-f787-d6302e9ddf60-5d4911ed" className={data.bool?"positive iscolumn black50":"negative iscolumn black50"}>{data.value2}</h4>
                </div>
                </div>
              )}
              )
            }
        
          
           
           
         


    
            </div>
            </div>
  )
}

export default PerformerCard