import React from 'react';
import "../../../global.scss";
import ASAN from "../../../images/widgets/ASAN.svg";
import More from "../../../images/widgets/More.svg";

const RecentlyViewedLogIn = () => {
    return (
        <div class="cardcontainer">
            <div class="leftcardtitle">
                <h3 class="heading-2">Recently Viewed</h3>
                <a href="#" class="button issecondary issmall w-button">view all</a>
            </div>
            <div id="w-node-_633401c4-a210-5c3e-5b31-05fd06f3863e-5d4911ed" class="metrics">
                <div id="w-node-_1e8339b4-def5-75cf-a51f-129473e44da4-5d4911ed" class="listing issmall">
                    <div class="listingheader-wrapper">
                        <div class="listingheadergrid">
                            <div id="w-node-_1e8339b4-def5-75cf-a51f-129473e44da7-5d4911ed" class="compcontainer">
                                <div class="logo-wrapper"><img src={ASAN} loading="lazy" alt=""/></div>
                            </div>
                            <div id="w-node-_1e8339b4-def5-75cf-a51f-129473e44daa-5d4911ed">
                                <div class="ui-text black100">Asana Ltd.</div>
                                <h4 class="black15">ASAN</h4>
                            </div>
                        </div>
                    </div>
                    <div class="actions issmall">
                        <div class="actioncontainer"></div>
                        <div class="actioncontainer"><img src={More} loading="lazy" alt=""/></div>
                    </div>
                </div>
                <div id="w-node-_94339718-d38c-804d-a0dd-a845e9df8ee2-5d4911ed" class="listing issmall">
                    <div class="listingheader-wrapper">
                        <div class="listingheadergrid">
                            <div id="w-node-_94339718-d38c-804d-a0dd-a845e9df8ee5-5d4911ed" class="compcontainer">
                                <div class="logo-wrapper"><img src={ASAN} loading="lazy" alt=""/></div>
                            </div>
                            <div id="w-node-_94339718-d38c-804d-a0dd-a845e9df8ee8-5d4911ed">
                                <div class="ui-text black100">Asana Ltd.</div>
                                <h4 class="black15">ASAN</h4>
                            </div>
                        </div>
                    </div>
                    <div class="actions issmall">
                        <div class="actioncontainer"></div>
                        <div class="actioncontainer"><img src={More} loading="lazy" alt=""/></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentlyViewedLogIn;