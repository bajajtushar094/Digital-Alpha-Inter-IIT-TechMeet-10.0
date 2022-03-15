import React from "react";
import "../../../../global.scss";
import "./filingType.scss";

const FilingType = () => {
    return (
        <div
            id="w-node-_7afe8222-f6c9-3ac1-420d-01e4b7f2de0f-5d4911ed"
            className="filter-filing"
        >
            <div className="ui-text black100">Filing Type</div>
            <div className="filingflex">
                <div className="filingcontainer isactive">
                    <div className="ui-text issecondarybutton isfiling black50">8K</div>
                </div>
                <div className="filingcontainer isactive">
                    <div className="ui-text issecondarybutton isfiling black50">10K</div>
                </div>
                <div className="filingcontainer isactive">
                    <div className="ui-text issecondarybutton isfiling black50">10Q</div>
                </div>
            </div>
        </div>
    );
};

export default FilingType;
