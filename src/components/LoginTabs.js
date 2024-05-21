import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import StudentLogin from './StudentLogin';
import RecruiterLogin from './RecruiterLogin';
import CoordinatorLogin from './CoordinatorLogin';
import StaffLogin from './StaffLogin';

const LoginTabs = ({ initialTab }) => {
  const roleMapping = {
    student: 0,
    recruiter: 1,
    coordinator: 2,
    staff: 3,
  };

  const roleMappingReverse = {
    0: 'student',
    1: 'recruiter',
    2: 'coordinator',
    3: 'staff'
  };
  const [selectedTab, setSelectedTab] = useState(roleMapping[initialTab] || 0);

  useEffect(() => {
    setSelectedTab(roleMapping[initialTab] || 0);
  }, [initialTab]);

  const handleChange = (event, newValue) => {
    initialTab = roleMappingReverse[newValue];
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Tabs value={selectedTab} onChange={handleChange}>
        <Tab label="Student" />
        <Tab label="Recruiter" />
        <Tab label="Coordinator" />
        <Tab label="Staff" />
      </Tabs>
      {selectedTab === 0 && <StudentLogin />}
      {selectedTab === 1 && <RecruiterLogin />}
      {selectedTab === 2 && <CoordinatorLogin />}
      {selectedTab === 3 && <StaffLogin />}
    </Box>
  );
};

export default LoginTabs;
