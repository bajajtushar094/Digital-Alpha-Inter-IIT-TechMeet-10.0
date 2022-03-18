import React from 'react'
import Navbar from '../../Components/Global/Navbar/Navbar'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CompanyTitle from '../../Components/Widgets/Filters/CompanyTitle/CompanyTitle';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import './filenew.scss'
import { useState } from 'react';
import RecentlyViewedLogIn from '../../Components/Widgets/RecentlyViewedLogIn/RecentlyViewedLogIn';
import { Button, IconButton } from '@mui/material';

// const ref=require('./sample.html')


const Filenew = () => {
    const [selected, setSelected] = useState(1);
    const handleTable = (selectedTemp)=>{
		setSelected(selectedTemp);
	}
  return (
    <>
     <Navbar />
     <div className="filecontainer">
     <div className="companyheading" style={{ display: "flex", color: "#9B9B9C" }}>
                    <FileCopyIcon />
                    <h2 style={{ lineHeight: "20px", fontWeight: "400" }}>Company</h2>
    </div>
    <div className="companycontent" style={{dispaly:"flex",gap:"2rem"}}>
      <div style={{display:"flex",flexDirection:"column",height:"400px",gap:"2rem"}}>
        <div className="topcard ">
        <div id="w-node-a4d716ba-89a8-25f8-efb6-9256467879f7-5d4911ed" class="listing issmall comptitle">
                <div class="listingheader-wrapper">
                    <div class="listingheadergrid">
                        <div class="compcontainer isbig">
                            <div class="logo-wrapper isbig color">
                                8K
                            </div>
                        </div>
                        <div id="w-node-a76e39fc-47ab-e63f-05cc-34673b655eb5-5d4911ed">
                            <h3>hello</h3>
                            <h4 class="black15">Helll</h4>
                        </div>
                    </div>
                </div>
                <div class="actions  force1" >
                   
                    <div class="actioncontainer" style={{display:"flex"}}>
                        <IconButton style={{background:"transparent"}}>
                        <ShareOutlinedIcon className='color'/>
                        </IconButton>
                        <IconButton style={{background:"transparent"}}>
                    <ApartmentOutlinedIcon className='color'/>
                    </IconButton></div>
                </div>
            </div>
        </div>
       
            <RecentlyViewedLogIn />
        
      </div>
      <div className='textsec  widthfull'>
      <div className="table_top">
      <button className={selected === 1 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(1); }}>Summary</button>
	  <button className={selected === 2 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(2); }}>Snippet</button>
      <button className={selected === 3 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(3); }}>Filling Documents</button>
		{/* <Button  className='btncolor'>Summary</Button>
        <Button className='btncolor'>Snippet</Button>
        <Button className='btncolor'>Filling Document</Button> */}
        
	</div>
    {/* {selected==1&&<Table data={allCompanies} hasCheckbox={false} isCompany={true} />}
					{selected==2&&<Table data={recentFilings} hasCheckbox={false} isCompany={false} />} */}
    {selected!=2&&<><div id="w-node-_2c6e5316-4ef7-fb3c-7fc6-16076e37e42b-5d4911ed" className="separator"></div>
    <div className='summary' style={{padding:"14px 4px "}}>
        Sectionwise Summary
    </div>
    </>
}
    <div id="w-node-_2c6e5316-4ef7-fb3c-7fc6-16076e37e42b-5d4911ed" className="separator"></div>
    {selected==1&&(<><div className="flex bor" style={{gap:"2rem",justifyContent:"space-between",padding:"2px 0px"}}>
        <div style={{display:'inline-block'}}>
      <Button className='color btncolor'>Item 1</Button>
      </div>
      <div style={{display:'inline-block'}} >
      <Button className='color btncolor'>Item 1</Button>
      </div>
      <div style={{display:'inline-block'}}>
      <Button className='color btncolor'>Item 1</Button>
      </div>
      <div style={{display:'inline-block'}}>
      <Button className='color btncolor'>Item 1</Button>
      </div>
      <div style={{display:'inline-block'}}>
      <Button className='color btncolor'>Item 1</Button>
      </div>
    </div>
    <div id="w-node-_2c6e5316-4ef7-fb3c-7fc6-16076e37e42b-5d4911ed" className="separator"></div>
    <div className="textdiv">
        <p>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
    </div>
    </>)
}
{
    selected==2&&<>
    <div className='cardcontainer widthfull' style={{overflowY:"scroll",marginTop:"16px",borderRadius:"6px"}}>
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto ex unde earum dolores neque nesciunt incidunt saepe, quasi vitae quaerat dolore ratione at quam nemo sunt corporis rerum iure pariatur.
   Nisi, rem maxime rerum sunt quos veritatis nam sint accusantium dignissimos minima quam, ea itaque aliquid cupiditate voluptatum molestiae sed in sapiente unde, qui corporis iure. Animi dolores veritatis quae!
    </div>
    </>
}
{
selected==3&&(<>
    <div  id="w-node-_5c33d9b8-e716-f790-5a4d-5a6ab8b6a278-5d4911ed" className="listing mt">
        <div class="listingheader-wrapper">
            <div id="w-node-_79d7448d-1164-5de1-1de4-bb294c247a68-5d4911ed" className="ui-text black100">In 2011, Adobe’s Creative Suite was a cash cow by most measurements. It generated more than $3.4B in revenue with a gross margin of 97%.
        </div>
        </div>
        <div class="actions">
            <div class="actioncontainer">
                </div>
                <div class="actioncontainer">
                    </div>
                    <div class="actioncontainer">
            <img src="https://uploads-ssl.webflow.com/6223552248fd5d64304911ec/622790c88046faeb090d684a_More.svg" loading="lazy" alt="" />
            </div></div>
            </div>
          
        </>)
}

      </div>
    </div>
     </div>   
    </>
  )
}

export default Filenew