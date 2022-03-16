import React, { useEffect, useState } from "react";
import "../../../global.scss";
import ASAN from "../../../images/widgets/ASAN.svg";
import More from "../../../images/widgets/More.svg";
import { useDispatch } from "react-redux";
import { getRecentlyViwedCompanies } from "../../../actions/action";
import { connect } from "react-redux";
const RecentlyViewedLogIn = (props) => {
  const dispatch = useDispatch();
  const data = props.state.recentlyViwedCompanies || [];
  console.log("Props from RecentlyViewedLogIn;", props);
  useEffect(() => {
    async function getRecentViewFunc() {
      await getRecentlyViwedCompanies(dispatch);
    }
    getRecentViewFunc();
  }, [dispatch]);

  return (
    <div class='cardcontainer'>
      <div class='leftcardtitle'>
        <h3 class='heading-2'>Recently Viewed</h3>
        <a href='/#' class='button issecondary issmall w-button'>
          view all
        </a>
      </div>
      <div
        id='w-node-_633401c4-a210-5c3e-5b31-05fd06f3863e-5d4911ed'
        class='metrics'
      >
        {data.map((el, index) => (
          <Component
            key={index}
            logo={el.logo || ASAN}
            name={el.name}
            ticker={el.ticker}
          />
        ))}
      </div>
    </div>
  );
};

const Component = ({logo, name, ticker}) => (
  <div
    id='w-node-_1e8339b4-def5-75cf-a51f-129473e44da4-5d4911ed'
    class='listing issmall'
  >
    <div class='listingheader-wrapper'>
      <div class='listingheadergrid'>
        <div
          id='w-node-_1e8339b4-def5-75cf-a51f-129473e44da7-5d4911ed'
          class='compcontainer'
        >
          <div class='logo-wrapper'>
            <img src={logo} loading='lazy' alt='' />
          </div>
        </div>
        <div id='w-node-_1e8339b4-def5-75cf-a51f-129473e44daa-5d4911ed'>
          <div class='ui-text black100'>{name}</div>
          <h4 class='black15'>{ticker}</h4>
        </div>
      </div>
    </div>
    <div class='actions issmall'>
      <div class='actioncontainer'></div>
      <div class='actioncontainer'>
        <img src={More} loading='lazy' alt='' />
      </div>
    </div>
  </div>
);

// export default RecentlyViewedLogIn;
// export default Data;
const mapStateToProps = (state) => {
	// console.log("State:", state);
	return {
		// To get the list of employee details from store
		state: state,
	};
};

export default connect(mapStateToProps, null)(RecentlyViewedLogIn);