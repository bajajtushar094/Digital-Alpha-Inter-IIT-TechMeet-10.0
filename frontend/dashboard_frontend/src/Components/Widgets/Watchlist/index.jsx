import React, { useEffect, useState } from "react";
import "../../../global.scss";
import "./Watchlist.scss";
import MoreImage from "../../../images/widgets/More.svg";
import Plus from "../../../images/widgets/Plus.svg";
import Pen from "../../../images/widgets/Pen.svg";
import { useDispatch } from "react-redux";
import { getBaskets } from "../../../actions/action";
import { connect } from "react-redux";

const Watchlist = (props) => {
  const dispatch = useDispatch();
  const data = props.state.baskets.data || [];

  useEffect(() => {
    async function getBasketFunc() {
      await getBaskets(dispatch);
    }
    getBasketFunc();
  }, [dispatch]);

  return (
    <div class='cardcontainer'>
      <div class='leftcardtitle'>
        <h3 class='heading-2'>My Watchlist</h3>
        <img src={Plus} loading='lazy' alt='' />
      </div>
      {data.map((el) => (
        <Component name={el.name} companies_count={el.companies_count} />
      ))}
    </div>
  );
};

const Component = ({ name, companies_count }) => (
  <div
    id='w-node-_303deb7f-543b-7e3b-b9af-eb356f928477-5d4911ed'
    class='listing issmall'
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
        <img src={Pen} loading='lazy' alt='' />
      </div>
    </div>
  </div>
);

// export default Watchlist;

const mapStateToProps = (state) => {
  // console.log("State:", state);
  return {
    // To get the list of employee details from store
    state: state,
  };
};

export default connect(mapStateToProps, null)(Watchlist);