import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './table.scss';
import { getMetricsFromFiling, getKeyMetricOfCompany } from '../../actions/action';

const RecentFilingRow = (props) => {
	const dispatch = useDispatch();
	const [hasCheckbox, setHasCheckbox] = useState(props.hasCheckbox);
	const [isCompany, setIsCompany] = useState(props.isCompany);
	const filing = props.filing;
	// console.log("filing:", filing);

	const [hover, setHover] = useState(false);
	const [hoverbg, setHoverBg] = useState(false);
	const handleClickOpen = () => {
    // setOpen(true);
  };
	const handleMouseIn = () => {
		setHover(true);
	}
	const handleMouseOut = () => {
		setHover(false);
	}
	const handleMouseInBg = () => {
		setHoverBg(true);
	};
	const handleMouseOutBg = () => {
		setHoverBg(false);
	};
	return (
    <div
      className={hoverbg ? "listing ishover" : "listing"}
      onMouseOver={handleMouseInBg}
      onMouseLeave={handleMouseOutBg}
    >
      <div className='listingheader-wrapper'>
        <div
          class={
            hasCheckbox ? "listingheadergrid hascheckbox" : "listingheadergrid"
          }
        >
          {hasCheckbox && (
            <div className='actiondiv'>
              <input className='checkbox' type='checkbox' />
            </div>
          )}
          <div class='filingcontainer'>
            <div class='ui-text issecondarybutton isfiling'>
              {filing["form_type"]}
            </div>
          </div>
          <div id='w-node-b6ad1064-49e9-79f3-df7a-f41125cb80fe-5d4911ed'>
            <div class='ui-text black100'>{filing["company_id"]}</div>
            {/* <h4 class="black15">{filing['company_id']}</h4> */}
          </div>
        </div>
      </div>
      <div className='div-block-4'>
        <h4
          id='w-node-_5f9bbd68-5925-7f41-4e08-47c4097194e8-5d4911ed'
          className='iscolumn green'
        >
          {filing["company_id"]}
        </h4>
        <h4
          id='w-node-_5f9bbd68-5925-7f41-4e08-47c4097194ea-5d4911ed'
          className='iscolumn red'
        >
          {filing["date"]}
        </h4>
        <div
          onMouseOver={handleMouseIn}
          onMouseLeave={handleMouseOut}
          className='actions'
        >
          <div className='actions-1'>
            {/* <Link to={`/company/${filing["company_id"]}`}> */}
            <Link to={`/file/${filing["id"]}`}>
              <div className='actioncontainer '>
                <IconButton
                  style={{ backgroundColor: "transparent" }}
                  aria-label='delete'
                >
                  <OpenInNewIcon />
                </IconButton>
              </div>
            </Link>
            <div className='actioncontainer'>
              <IconButton
                style={{ backgroundColor: "transparent" }}
                onClick={handleClickOpen}
                aria-label='delete'
              >
                <BookmarkBorderIcon />
              </IconButton>
            </div>
          </div>
          <div className='actioncontainer-1 '>
            <MoreVertIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentFilingRow;