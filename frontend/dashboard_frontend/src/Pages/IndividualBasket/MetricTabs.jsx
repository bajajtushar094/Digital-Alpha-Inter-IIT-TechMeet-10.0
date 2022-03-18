import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chart from '../../Components/Widgets/Chart/Chart';
import { connect, useDispatch } from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function MetricTabs(props) {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const companies = props.state.basketSelectedCompanies;
  const queryFilings = props.state.queryFilings;
  let company_ticker = [];
  const metrics = ["ARR","CCR"]
  function getTickers() {
    for(let i=0;i<companies.length;i++){
      console.log(companies[i]);
      company_ticker.push(companies[i].ticker);
    }
    console.log(company_ticker);
  }

  function addTickerToRequest(){
    dispatch({
      type:'UPDATE_QUERY_FILINGS',
      queryFilings: {
        ...queryFilings,
        tickers: company_ticker,
        metric_type: metrics[value],
      }
    })
  }

  React.useEffect(()=>{
    getTickers();
    addTickerToRequest();
  },[value])
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="ARR" {...a11yProps(0)} />
          <Tab label="CCR" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Chart metric="ARR" query={queryFilings}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      </TabPanel>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    state:state
  }
}

export default connect(mapStateToProps, null)(MetricTabs);