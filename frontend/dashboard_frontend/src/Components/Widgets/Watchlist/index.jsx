import React from 'react';
import "../../../global.scss";
import "./Watchlist.scss";
import MoreImage from "../../../images/widgets/More.svg";
import Plus from "../../../images/widgets/Plus.svg";
import Pen from "../../../images/widgets/Pen.svg";

const Watchlist = ()=>{
    return (
        <div class="cardcontainer">
        <div class="leftcardtitle">
          <h3 class="heading-2">My Watchlist</h3>
          <img src={Plus} loading="lazy" alt=""/>
        </div>
        <div id="w-node-_303deb7f-543b-7e3b-b9af-eb356f928477-5d4911ed" class="listing issmall">
          <div class="listingheader-wrapper">
            <div id="w-node-_303deb7f-543b-7e3b-b9af-eb356f92847d-5d4911ed">
              <div class="ui-text black100">Basket Name</div>
              <h4 class="black15">No. of comp.</h4>
            </div>
          </div>
          <div class="actions issmall">
            <div class="actioncontainer"></div>
            <div class="actioncontainer"><img src={Pen} loading="lazy" alt=""/></div>
          </div>
        </div>
        <div id="w-node-_303deb7f-543b-7e3b-b9af-eb356f928477-5d4911ed" class="listing issmall">
          <div class="listingheader-wrapper">
            <div id="w-node-_303deb7f-543b-7e3b-b9af-eb356f92847d-5d4911ed">
              <div class="ui-text black100">Basket Name</div>
              <h4 class="black15">No. of comp.</h4>
            </div>
          </div>
          <div class="actions issmall">
            <div class="actioncontainer"></div>
            <div class="actioncontainer"><img src={Pen} loading="lazy" alt=""/></div>
          </div>
        </div>
        <div id="w-node-_303deb7f-543b-7e3b-b9af-eb356f928477-5d4911ed" class="listing issmall">
          <div class="listingheader-wrapper">
            <div id="w-node-_303deb7f-543b-7e3b-b9af-eb356f92847d-5d4911ed">
              <div class="ui-text black100">Basket Name</div>
              <h4 class="black15">No. of comp.</h4>
            </div>
          </div>
          <div class="actions issmall">
            <div class="actioncontainer"></div>
            <div class="actioncontainer"><img src={Pen} loading="lazy" alt=""/></div>
          </div>
        </div>
      </div>
    );
}

export default Watchlist;