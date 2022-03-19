import { Button } from '@mui/material'
import React from 'react'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axios from 'axios';
import { connect } from 'react-redux';
import {handleDownloadPost}  from '../../../utils/downloadCsv';
const TableHead = (props) => {
  console.log("Props lelo", props.state);
  // const downloadFile = (body, url) => {
  //   axios.post(url, body)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }
  return (
      <>
    <div style={{display:"flex",justifyContent:"space-between",width:"100%",paddingBottom:"10px"}}>
        <div>
        <Button style={{color:'black'}}>{props.childone}</Button>
        <Button style={{color:'#9B9B9C'}}>{props.childtwo}</Button>
        </div>
        <div>
            <Button style={{color:'#9B9B9C'}} onClick={() => {handleDownloadPost(props.childthree,props.data)}}>Download stats CSV  <FileDownloadIcon /></Button>
        </div>
        
    </div>
    <div id="w-node-_6ba67ff8-ad2b-5c1d-c70d-8afb033cbe29-5d4911ed" className="separator" style={{margin:"0px 14px"}}></div>
    </>
  )
}
const mapStateToProps = (state) => {
  console.log("State:", state);
  return {
    // To get the list of employee details from store
    state: state,
  };
};
export default connect(mapStateToProps, null)(TableHead);