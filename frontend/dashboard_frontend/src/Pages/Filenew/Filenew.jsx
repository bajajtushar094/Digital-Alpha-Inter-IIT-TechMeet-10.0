import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Global/Navbar/Navbar'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CompanyTitle from '../../Components/Widgets/Filters/CompanyTitle/CompanyTitle';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import './filenew.scss'
import axios from 'axios'
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RecentlyViewedLogIn from '../../Components/Widgets/RecentlyViewedLogIn/RecentlyViewedLogIn';
import { Button, IconButton } from '@mui/material';
import { LOCAL_SERVER_URL } from "../../config";
import { useParams } from 'react-router-dom';

const ref = require('./te.htm')

const init_filing_data = {
	filing_id: '1',
	form_type: '8K',
	company: 'AAPL',
	summaries: [
		{
			'section_heading': 'loading',
			'text': '1',
			'polarity_score': '1',
			'sentiment_label': '1',
		},
		{
			'section_heading': 'hehe',
			'text': '2',
			'polarity_score': '1',
			'sentiment_label': '1',
		},
		{
			'section_heading': 'cool',
			'text': '3',
			'polarity_score': '1',
			'sentiment_label': '1',
		},
	],
	snippets: [
		{
			'text': 'loading',
			'link': 'url'
		},
		{
			'text': 'loading',
			'link': 'url'
		},
		{
			'text': 'loading',
			'link': 'url'
		}
	],
	filelink: ''
}

const Filenew = () => {
	const filing_id = useParams().filing_id;
	const [selected, setSelected] = useState(1);
	const handleTable = (selectedTemp) => {
		setSelected(selectedTemp);
	}
	const [companyName, setCompanyName] = useState('');
	const [filingData, setFilingData] = useState({});
	const [summaryText, setSummaryText] = useState("");
	const summaryTextChange = (item)=>{
		setSummaryText(item.text);
	}
	useEffect(() => {
		const func = async () => {
			let res = await axios.get(
				LOCAL_SERVER_URL + "filings/getAllFilingData/" + filing_id
			);
			
			setCompanyName(res.data.company.name);
			let response = res.data;
			setFilingData(filingData=>({
				...response
			}));
			setFilingData(response);
			setSummaryText(filingData.summaries.length!=0?filingData.summaries[0].text:'')
			console.log("Filing Data:", response);
		}
		func()
	}, [filing_id])
	return (
		<>
			<Navbar />
			<div className="filecontainer">
				<div className="companyheading" style={{ display: "flex", color: "#9B9B9C" }}>
					<FileCopyIcon />
					<h2 style={{ lineHeight: "20px", fontWeight: "400" }}>Company</h2>
				</div>
				<div className="companycontent" style={{ dispaly: "flex", gap: "2rem" }}>
					<div style={{ display: "flex", flexDirection: "column", height: "400px", gap: "2rem" }}>
						<div className="topcard ">
							<div id="w-node-a4d716ba-89a8-25f8-efb6-9256467879f7-5d4911ed" class="listing issmall comptitle">
								<div class="listingheader-wrapper">
									<div class="listingheadergrid">
										<div class="compcontainer isbig">
											<div class="logo-wrapper isbig color">
												{filingData.form_type}
											</div>
										</div>
										<div id="w-node-a76e39fc-47ab-e63f-05cc-34673b655eb5-5d4911ed">
											<h3>{companyName}</h3>
											{/* <h4 class="black15">{filingData.company || ''}</h4> */}
										</div>
									</div>
								</div>
								<div class="actions  force1" >

									<div class="actioncontainer" style={{ display: "flex" }}>
										<IconButton style={{ background: "transparent" }}>
											<ShareOutlinedIcon className='color' />
										</IconButton>
										<IconButton style={{ background: "transparent" }}>
											<ApartmentOutlinedIcon className='color' />
										</IconButton></div>
								</div>
							</div>
						</div>

						<RecentlyViewedLogIn />

					</div>
					<div className='textsec  widthfull' style={{height:"170vh"}}>
						<div className="table_top">
							<button className={selected === 1 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(1); }}>Summaries</button>
							<button className={selected === 2 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(2); }}>Snippet</button>
							<button className={selected === 3 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(3); }}>Filling Documents</button>

						</div>
						{/* {selected==1&&<Table data={allCompanies} hasCheckbox={false} isCompany={true} />}
					{selected==2&&<Table data={recentFilings} hasCheckbox={false} isCompany={false} />} */}
						{selected !== 2 && <><div id="w-node-_2c6e5316-4ef7-fb3c-7fc6-16076e37e42b-5d4911ed" className="separator"></div>
							<div className='summary' style={{ padding: "14px 4px " }}>
								Sectionwise Summary
							</div>
						</>
						}
						<div id="w-node-_2c6e5316-4ef7-fb3c-7fc6-16076e37e42b-5d4911ed" className="separator"></div>
						{selected === 1 && (<><div className="flex bor" style={{ gap: "2rem", justifyContent: "space-between", padding: "2px 0px" }}>
							{filingData.summaries!=undefined&&filingData.summaries.map((item, index) => {
								return (
									<div style={{ display: "inline-block" }}>
										<Button className='color btncolor' onClick={() => { summaryTextChange(item); }}>{item.section_heading}</Button>
									</div>
								);
							})}
						</div>
							<div id="w-node-_2c6e5316-4ef7-fb3c-7fc6-16076e37e42b-5d4911ed" className="separator"></div>
							<div className="textdiv">
								<p>
									{summaryText}
								</p>
							</div>
						</>)
						}
						{
							selected === 3 && <>
								<div className='cardcontainer' style={{ marginTop: "16px", borderRadius: "6px", height: "150vh", width:"30vw" }}>
									{/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto ex unde earum dolores neque nesciunt incidunt saepe, quasi vitae quaerat dolore ratione at quam nemo sunt corporis rerum iure pariatur.
   Nisi, rem maxime rerum sunt quos veritatis nam sint accusantium dignissimos minima quam, ea itaque aliquid cupiditate voluptatum molestiae sed in sapiente unde, qui corporis iure. Animi dolores veritatis quae!
    */}
									{/* <div className="content" dangerouslySetInnerHTML={{__html: ref}}></div> */}
									<iframe title='filing' src={`http://localhost:8000${filingData['filelink']}`} frameborder="0" style={{ overflowY: "scroll", height: "50vh", overflowX: "hidden", width: "165%" }}></iframe>
								</div>
							</>
						}
						{
							selected === 2 && (<>
								{filingData.snippets.map((item, index) => {
									console.log("Item:", item);
									return (
										<div
											id='w-node-_5c33d9b8-e716-f790-5a4d-5a6ab8b6a278-5d4911ed'
											className='listing mt'
										>
											<div class='listingheader-wrapper'>
												<div
													id='w-node-_79d7448d-1164-5de1-1de4-bb294c247a68-5d4911ed'
													className='ui-text black100'
												>
													{item.text}
												</div>
											</div>

											<div class='actions'>
												<div class='actioncontainer'></div>
												<div class='actioncontainer'></div>
												<a href={item.link}>
													<div class='actioncontainer'>
														<IconButton
															style={{ backgroundColor: "transparent" }}
															aria-label='delete'
														>
															<OpenInNewIcon />
														</IconButton>
													</div>
												</a>
											</div>
										</div>
									);
								})}</>)
						}

					</div>
				</div>
			</div>
		</>
	)
}

export default Filenew