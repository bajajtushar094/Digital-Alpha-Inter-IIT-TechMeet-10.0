import React from 'react'
import Navbar from '../../Components/Global/Navbar/Navbar'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CompanyTitle from '../../Components/Widgets/Filters/CompanyTitle/CompanyTitle';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import './filenew.scss'
import RecentlyViewedLogIn from '../../Components/Widgets/RecentlyViewedLogIn/RecentlyViewedLogIn';
import { Button, IconButton } from '@mui/material';



const Filenew = () => {
    const selected=1;
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
                            <h3>bhad me jao</h3>
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
		<Button  className='btncolor'>Summary</Button>
        <Button className='btncolor'>Snippet</Button>
        <Button className='btncolor'>Filling Document</Button>
        
	</div>
    <div id="w-node-_2c6e5316-4ef7-fb3c-7fc6-16076e37e42b-5d4911ed" className="separator"></div>
    <div style={{padding:"14px 4px "}}>
        Sectionwise Summary
    </div>
    <div id="w-node-_2c6e5316-4ef7-fb3c-7fc6-16076e37e42b-5d4911ed" className="separator"></div>
    <div className="flex bor" style={{gap:"2rem",justifyContent:"space-between",padding:"2px 0px"}}>
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
      </div>
    </div>
     </div>   
    </>
  )
}

export default Filenew