import React, { useEffect, useState } from 'react';

import LineChart from '../../reusable/chart/chart.component';
import Spinner from '../../reusable/spinner/spinner.component';

import Client from '../../../tools/client';

import {
  ChartContainer,
  ViewsContainer,
  ViewsTable,
  ViewsTableBody,
  ViewsTableData,
  ViewsTableHead,
  ViewsTableHeadData,
  ViewsTableRow,
  ViewsSubTitle,
  ViewsTitle
} from './views.styles';

const client = new Client();

const Views = () => {
  const [ views, setViews ] = useState(null);
  const [ totalViews, setTotalViews ] = useState(null);

  useEffect(() => {
    const fetchViews = async () => {
      const res = await client.getViews();
      setViews(res.rows);
      let totalCount = 0;
      res.rows.map(row => {
        return totalCount = totalCount + row.count;
      })
      setTotalViews(totalCount)
    }
    fetchViews();
  }, []);

  if(!views) {
    return (
      <Spinner />
    )
  }

    return (
      <ViewsContainer>
        <ViewsTitle>Views</ViewsTitle>
          <ViewsSubTitle>
            Total site views: { totalViews }
          </ViewsSubTitle>
          <ChartContainer>
            <LineChart views={views} />
          </ChartContainer>
      </ViewsContainer>
    );
}

export default Views;