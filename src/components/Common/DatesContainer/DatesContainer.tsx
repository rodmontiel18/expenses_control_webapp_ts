import { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import { TabProps } from '../Tabs/Tabs';
import DatePicker from 'react-datepicker';

import { TabPanel, Tabs } from '../Tabs/Tabs';

interface DatesContainerProps {
  // searchAction: string;
  userToken: string;
}

const DatesContainer: FC<DatesContainerProps> = (/*{ searchAction, userToken }*/): ReactElement => {
  const [mode, setMode] = useState('month');
  const [startMonth, setStartMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));

  const tabs: TabProps[] = [
    {
      disabled: false,
      id: 'month',
      title: 'Month',
    },
    {
      disabled: false,
      id: 'range',
      title: 'Date range',
    },
  ];

  useEffect(() => {
    const datesFormStr = localStorage.getItem('datesFormData');
    if (datesFormStr) {
      const datesFormData = JSON.parse(datesFormStr);
      if (
        datesFormData &&
        datesFormData.mode &&
        datesFormData.values &&
        datesFormData.values.endDate &&
        datesFormData.values.startDate &&
        datesFormData.values.startMonth
      ) {
        setMode(datesFormData.mode);
        setEndDate(new Date(datesFormData.values.endDate));
        setStartMonth(new Date(datesFormData.values.startMonth));
        setStartDate(new Date(datesFormData.values.startDate));
      }
    }
  }, []);

  const handleChangeEndDate = (date: Date) => {
    if (date < startDate) {
      setStartDate(date);
      setEndDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleChangeMonth = (date: Date) => {
    setStartMonth(date);
  };

  const handleChangeStartDate = (date: Date) => {
    if (date > endDate) {
      setStartDate(date);
      setEndDate(date);
    } else {
      setStartDate(date);
    }
  };

  const handleTabChange = (event: ChangeEvent, newValue: string) => {
    event.preventDefault();
    setMode(newValue);
  };

  const _searchAction = (/*e: MouseEvent<HTMLButtonElement>*/) => {
    // if(searchAction == '')
    // searchAction(e.currentTarget.value, endDate, startDate, startMonth, userToken);
  };

  return (
    <div className="tabs-container">
      <label htmlFor="month">Filter movements by:</label>
      <Tabs tabs={tabs} value={mode} onChange={handleTabChange} />
      <div className="all-tab-content">
        <TabPanel className="month-inputs-container" id="month" value={mode}>
          <>
            <DatePicker
              className="form-control"
              name="month"
              dateFormat="MM/yyyy"
              onChange={handleChangeMonth}
              selected={startMonth}
              showMonthYearPicker
            />
            <button
              className="btn btn-sm btn-info"
              onClick={_searchAction}
              style={{ marginLeft: 10 }}
              type="button"
              value="month"
            >
              Search
            </button>
          </>
        </TabPanel>
        <TabPanel className="range-inputs-container" id="range" value={mode}>
          <>
            <label htmlFor="fromDate">De:</label>
            <DatePicker
              className="form-control"
              dateFormat="yyyy/MM/dd"
              endDate={endDate}
              name="fromDate"
              onChange={handleChangeStartDate}
              placeholderText="yyyy/mm/dd"
              selected={startDate}
              selectsStart
              startDate={startDate}
              showYearDropdown
            />
            <label htmlFor="toDate">a:</label>
            <DatePicker
              className="form-control"
              dateFormat="yyyy/MM/dd"
              endDate={endDate}
              name="toDate"
              onChange={handleChangeEndDate}
              placeholderText="yyyy/mm/dd"
              selected={endDate}
              selectsEnd
              startDate={startDate}
              showYearDropdown
            />
            <button
              className="btn btn-sm btn-info"
              onClick={_searchAction}
              style={{ marginLeft: 10 }}
              type="button"
              value="range"
            >
              Buscar
            </button>
          </>
        </TabPanel>
      </div>
    </div>
  );
};

export default DatesContainer;
