import React, { useEffect, useRef, useState } from 'react'
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
import { useParams , useNavigate } from 'react-router-dom';
import { LOCAL_SERVER_URL_MAIN } from '../../config';

import FileDownloadIcon from '@mui/icons-material/FileDownload';

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
	const shareRef = useRef();
	const navigation = useNavigate();
	const [companyName, setCompanyName] = useState('Loading');
	const [filingData, setFilingData] = useState({});
	const [summaryText, setSummaryText] = useState("");
	const [snippetContext, setSnippetContext] = useState([]);
	const [contextToQA, setContextToQA] = useState({});
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
			// setFilingData(filingData=>({
			// 	...response
			// }));
			const snippets = res.data.snippets;
			let context = snippets.map(snippet => snippet.context);
			context = context.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
			let mapping = {};
			snippets.forEach(snippet => {
				if(mapping[snippet.context] === undefined)
					mapping[snippet.context] = [];
				mapping[snippet.context].push({'question': snippet.question, 'answer': snippet.answer, 'confidence_score': snippet.confidence_score});
			});
			setContextToQA(mapping);
			setSnippetContext(context)
			setFilingData(response);
			setSummaryText(filingData.summaries[0].text);
			console.log("Filing Data:", filingData.summaries[0].text);
		}
		func()
	}, [filing_id])
	return (
		<>
			<Navbar />
			<div className="filecontainer">
				<div className="companyheading" style={{ display: "flex", color: "#9B9B9C" }}>
					<FileCopyIcon />
					<h2 style={{ lineHeight: "20px", fontWeight: "400" }}>Filing</h2>
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
										<IconButton className='tooltip' style={{ background: "transparent" }}>
											<ShareOutlinedIcon className='color'  onClick={() => {
											navigator.clipboard.writeText(window.location.href);
											shareRef.current.innerHTML = "Copied!";
											}}
											onMouseOut={() => shareRef.current.innerHTML = "Copy link to Clipboard"}
											/>
											<span className='tooltiptext' ref={shareRef}>
												Copy link to Clipboard
											</span>
										</IconButton>
										<IconButton style={{ background: "transparent" }}>
											<ApartmentOutlinedIcon className='color' onClick={()=> {
												navigation('/company/' + filingData['company']['ticker']);
											}}/>
										</IconButton></div>
								</div>
							</div>
						</div>

						<RecentlyViewedLogIn />

					</div>
					<div className='textsec  widthfull'>
						<div className="table_top" style={{display:"flex",justifyContent:"space-between",width:"100%",paddingBottom:"10px"}}>
                            <div>
							<button className={selected === 1 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(1); }}>Summaries</button>
							<button className={selected === 2 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(2); }}>Snippet</button>
							<button className={selected === 3 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(3); }}>Filling Documents</button>
                            </div>
                            <div>
                                {
                                    selected==3&& <Button style={{color:'#9B9B9C'}}>Download stats CSV  <FileDownloadIcon /></Button>
                                }
                           
                            </div>
							{/* <Button  className='btncolor'>Summary</Button>
        <Button className='btncolor'>Snippet</Button>
        <Button className='btncolor'>Filling Document</Button> */}

						</div>
						{/* {selected==1&&<Table data={allCompanies} hasCheckbox={false} isCompany={true} />}
					{selected==2&&<Table data={recentFilings} hasCheckbox={false} isCompany={false} />} */}
						{selected == 1 && <><div id="w-node-_2c6e5316-4ef7-fb3c-7fc6-16076e37e42b-5d4911ed" className="separator"></div>
							<div className='summary' style={{ padding: "14px 4px " }}>
								Sectionwise Summary
							</div>
						</>
						}
                        {selected == 2 && <><div id="w-node-_2c6e5316-4ef7-fb3c-7fc6-16076e37e42b-5d4911ed" className="separator"></div>
							<div className='summary' style={{ padding: "14px 4px " }}>
								Description
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
								<div className='full bor' style={{ marginTop: "16px", borderRadius: "6px", width:"100%" }}>
									{/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto ex unde earum dolores neque nesciunt incidunt saepe, quasi vitae quaerat dolore ratione at quam nemo sunt corporis rerum iure pariatur.
   Nisi, rem maxime rerum sunt quos veritatis nam sint accusantium dignissimos minima quam, ea itaque aliquid cupiditate voluptatum molestiae sed in sapiente unde, qui corporis iure. Animi dolores veritatis quae!
    */}
									{/* <div className="content" dangerouslySetInnerHTML={{__html: ref}}></div> */}
									<iframe title='filing' src={`http://127.0.0.1:8000/media/filings/78749_10K_2021_0001564590-21-029319.htm`} frameborder="0" style={{ overflowY: "scroll",overflowX: "hidden", width: "100%",height:"400px" }}></iframe>
								</div>
							</>
						}
						{
							selected === 2 && (<>
								{snippetContext!==undefined&&snippetContext.map((item, index) => {
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
                          <span style={{ fontWeight: "600" }}>Context: </span>
                          {item}
                          <br />
						  {contextToQA[item].map((QandA, idx) => {
							  return (
								<>
									<span style={{ fontWeight: "600" }}>Question: </span>
									{QandA.question}
									<br />
									<div style={{ display: "flex" }}>
									<p style={{ flex: "0.8" }}>
										<span style={{ fontWeight: "600" }}>Answer: </span>
										{QandA.answer}
									</p>
									<p style={{ flex: "0.2" }}>
										<span style={{ fontWeight: "600" }}>Score: </span>
										{QandA.confidence_score}
									</p>
									</div>
								</>
								);
						  })}
                        </div>
                      </div>

                      {/* <div class='actions'>
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
                      </div> */}
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