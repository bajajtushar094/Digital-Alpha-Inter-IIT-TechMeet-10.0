import React from 'react'
import { useState } from 'react'
import './viewedCard.scss'
import back from '../../images/widgets/back.png'

const ViewedCard = () => {
 const[bool,setbool]=useState(false)
  return (
    <div className="viewcardcontainer">
        {bool?(<div></div>):<>
     <div id="w-node-ff8b808e-3c77-7a0f-bfbb-9217bf473421-5d4911ed" className="smallimgcontainer">
     <img src={back} loading="lazy" id="w-node-c6d2a88d-38ac-dc1b-47b7-e844443c1bd5-5d4911ed" alt="" />
     </div>
    <div id="w-node-_00f04f52-e0ad-066f-b07d-40531d6d4024-5d4911ed" className="metrics">
     <div className="leftcardtitle">
    <h3 className="heading-2">Recently Viewed</h3>
    </div>
    <div id="w-node-b89516ad-6621-1013-15a0-9a8eaeefe779-5d4911ed" className="ui-text">Create an account to track your viewed companies &amp; filings.</div>
    </div>
    </>
}
    </div>
  )
}

export default ViewedCard