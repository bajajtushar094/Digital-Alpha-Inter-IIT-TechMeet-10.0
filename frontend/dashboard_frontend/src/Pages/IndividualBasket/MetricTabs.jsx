import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chart from '../../Components/Widgets/Chart/Chart';
import { connect, useDispatch } from 'react-redux';
import { Button } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axios from 'axios';
import { config } from '../../config';


 
const metrics=['CAC','Gross Margin','MRR','ARPU','Number of customers','MRR Expansion','ARR','Number of Qualified Leads','Penetration rate','Total Revenue','Total Assets','Total Liabilities','Debt Ratio','Total Equity','Total Debt','Common Stock Equity','Total Capitalization','Shareholder Equity','Private Shareholding','Public Shareholding','LTV','CAC payback period','ASP','LTV:CAC ratio']
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
  const metrics=['Total Revenue', 'Number of customers', 'MRR', 'ARR', 'ARPU', 'MRR Expansion', 'Number of qualified leads', 'Penetration Rate', 'Sales and Marketing', 'CAC', 'CAC payback', 'Gross Margin', 'CAC payback period', 'ASP', 'Total Assets', 'Total Liabilities Net Minority Interest', 'debt ratio', 'Total Equity Gross Minority Interest', 'Total Debt','Common Stock Equity',	'Total Capitalization',	'Shareholder Equity','Private Shareholding','Public Shareholding']
  const handleDownload = () => {
    // console.log("console log",body, props)
    const url = config().getCompareCSVUrl
    const {
      time_start,
      time_end,
      metric_type,
      tickers
    } = props.state.queryFilings
    let requestBody = {
      'time_start': time_start,
      'time_end': time_end,
      'metric_type': metric_type,
      'tickers': tickers
    }
    axios.post(url,requestBody)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'company.csv'); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
  }
  const companies = props.state.basketSelectedCompanies;
  const queryFilings = props.state.queryFilings;
  let company_ticker = [];
  
  function getTickers() {
    for (let i = 0; i < companies.length; i++) {
      console.log(companies[i]);
      company_ticker.push(companies[i].ticker);
    }
    console.log(company_ticker);
  }

  function addTickerToRequest() {
    dispatch({
      type: 'UPDATE_QUERY_FILINGS',
      queryFilings: {
        ...queryFilings,
        tickers: company_ticker,
        metric_type: metrics[value],
      }
    })
  }

  React.useEffect(() => {
    getTickers();
    addTickerToRequest();
  }, [value])
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          TabIndicatorProps={{ sx: { display: "none" } }}
          sx={{
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          // sx={{ flexWrap: "wrap" }}
        >
          {metrics.map((el, i) => {
            return <Tab label={el} {...a11yProps(i)} />;
          })}

          <div style={{ marginLeft: "auto" }}>
            <Button style={{ color: "#9B9B9C" }} onClick={() => handleDownload()}>
              Download stats CSV <FileDownloadIcon />
            </Button>
          </div>
        </Tabs>
      </Box>
      {metrics.map((el, i) => {
        return (
          <TabPanel value={value} index={i}>
            <Chart metric={el} query={queryFilings} />
          </TabPanel>
        );
      })}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(mapStateToProps, null)(MetricTabs);