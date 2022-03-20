import React, { useEffect, useState } from "react";
import "../../../global.scss";
import "./Watchlist.scss";
import MoreImage from "../../../images/widgets/More.svg";
import Plus from "../../../images/widgets/Plus.svg";
import Pen from "../../../images/widgets/Pen.svg";
import { useDispatch } from "react-redux";
import { getBaskets, createBasket } from "../../../actions/action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, IconButton, TextField, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const moduleModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  padding: '10px',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  height: "180px",
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const Watchlist = (props) => {
  const dispatch = useDispatch();
  const [newBasketName, setNewBasketName] = useState("");
  const data = props.state.baskets.data || [];
  const [watchlistModalOpen, setWatchlistModalOpen] = useState(false);

  useEffect(() => {
    async function getBasketFunc() {
      await getBaskets(dispatch);
    }
    getBasketFunc();
  }, [dispatch]);

  const handleChange = (event) => {
    setNewBasketName(event.target.value);
  }

  const handleAddWatchlist = () => {
    console.log("handleAddWatchList Fired");
    const name = newBasketName;
    console.log(name)
    async function createBasketFunc() {
      const data = await createBasket(name,"",dispatch);
      console.log(data);
      await getBaskets(dispatch);
      setWatchlistModalOpen(false);
    }
    createBasketFunc();
  }

  return (
    <div class='cardcontainer'>
      <div class='leftcardtitle'>
        <h3 class='heading-2'>My Watchlist</h3>
        <button onClick={()=>setWatchlistModalOpen(true)}><img src={Plus} loading='lazy' alt='' /></button>
        <Modal
          open={watchlistModalOpen}
          onClose={()=>setWatchlistModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={moduleModalStyle}>
            <div style={{display:"flex",gap:"10px",flexDirection:"column"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
             <h4 className="watchtext"> Create WatchList</h4>
            <IconButton style={{background:"transparent"}} onClick={()=>{setWatchlistModalOpen(false)}}>
             <CloseOutlinedIcon style={{background:"transparent"}}/>
            </IconButton>
            </div>
            <div className="flex">
              <TextField value={newBasketName} onChange={handleChange} size="small"/>
            </div>
            <Button onClick={()=>{handleAddWatchlist()}} style={{background:"black",marginTop:"6px"}} variant="contained" fullWidth>Create</Button>
            </div>
            {/* <br/><br/>
            <input type="text" id="newWatchlist" /><br/><br/> */}
            {/* <button type="button" onClick={handleAddWatchlist}>Create</button> */}
          </Box>
        </Modal>
      </div>
      {data.map((el) => (
        <Component name={el.name} companies_count={el.companies_count} basket_id={el.id} basket={el} />
      ))}
    </div>
  );
};

const Component = ({ name, companies_count, basket_id, basket }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type:'SET_CURRENT_BASKET',
      basket:basket,
    })
  }
  return(
  
    <div
      id='w-node-_303deb7f-543b-7e3b-b9af-eb356f928477-5d4911ed'
      class='listing issmall'
      onClick={handleClick}
    >
      <div class='listingheader-wrapper'>
        <div id='w-node-_303deb7f-543b-7e3b-b9af-eb356f92847d-5d4911ed'>
          <div class='ui-text black100'>{name}</div>
          <h4 class='black15'>{companies_count}</h4>
        </div>
      </div>
      <div class='actions issmall'>
        <div class='actioncontainer'></div>
        <div class='actioncontainer'>
          <Link to={`/individualBasket/${basket_id}`} style={{ textDecoration: "none" }}>
          <ArrowForwardIosIcon loading='lazy' sx={{color:'#9B9B9C'}}/>
          </Link>
        </div>
      </div>
    </div>
  
)};

// export default Watchlist;

const mapStateToProps = (state) => {
  // console.log("State:", state);
  return {
    // To get the list of employee details from store
    state: state,
  };
};

export default connect(mapStateToProps, null)(Watchlist);