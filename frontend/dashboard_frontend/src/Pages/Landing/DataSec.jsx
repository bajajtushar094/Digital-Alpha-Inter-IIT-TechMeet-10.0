import React from 'react'
import RecentlyViewedLogIn from '../../Components/Widgets/RecentlyViewedLogIn/RecentlyViewedLogIn'
import TableTwo from '../../Components/Widgets/TableTwo/TableTwo'

const DataSec = () => {
  return (
    <div style={{display:"flex",gap:"2rem",marginTop:"2rem"}}>
        <RecentlyViewedLogIn />
        <TableTwo />
    </div>
  )
}

export default DataSec