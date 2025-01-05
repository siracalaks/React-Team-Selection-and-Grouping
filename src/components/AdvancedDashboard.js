import React from 'react';
import { useTeam } from '../context/TeamContext';
import { useTheme } from '../context/ThemeContext';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { motion } from 'framer-motion';
import { exportToExcel } from '../services/ExportService';

const AdvancedDashboard = () => {
  const { employees } = useTeam();
  const { isDarkMode } = useTheme();

  const cardClass = `card ${isDarkMode ? 'bg-dark' : 'bg-light'}`;
  const textColor = isDarkMode ? '#ffffff' : '#333333';

  // Prepare data for pie chart
  const genderData = [
    {
      id: 'Male',
      label: 'Male',
      value: employees.filter(e => e.gender === 'male').length,
    },
    {
      id: 'Female',
      label: 'Female',
      value: employees.filter(e => e.gender === 'female').length,
    }
  ];

  // Prepare data for bar chart
  const teamData = [
    {
      team: 'Team A',
      count: employees.filter(e => e.teamName === 'TeamA').length,
    },
    {
      team: 'Team B',
      count: employees.filter(e => e.teamName === 'TeamB').length,
    },
    {
      team: 'Team C',
      count: employees.filter(e => e.teamName === 'TeamC').length,
    },
    {
      team: 'Team D',
      count: employees.filter(e => e.teamName === 'TeamD').length,
    },
    {
      team: 'Unassigned',
      count: employees.filter(e => !e.teamName).length,
    }
  ];

  // Calculate statistics
  const stats = {
    totalEmployees: employees.length,
    assignedEmployees: employees.filter(e => e.teamName).length,
    designations: [...new Set(employees.map(e => e.designation))].length
  };

  return (
    <div className="container-fluid mt-4">
      {/* Stats Cards */}
      <div className="row mb-4">
        <motion.div
          className="col-md-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={cardClass}>
            <div className="card-body text-center">
              <h3 className="display-4">{stats.totalEmployees}</h3>
              <p className="text-muted">Total Employees</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="col-md-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={cardClass}>
            <div className="card-body text-center">
              <h3 className="display-4">{stats.assignedEmployees}</h3>
              <p className="text-muted">Assigned to Teams</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="col-md-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className={cardClass}>
            <div className="card-body text-center">
              <h3 className="display-4">{stats.designations}</h3>
              <p className="text-muted">Different Roles</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-body">
              <h5 className="card-title">Gender Distribution</h5>
              <div style={{ height: '400px' }}>
                <ResponsivePie
                  data={genderData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={{ scheme: 'nivo' }}
                  theme={{
                    text: { fill: textColor },
                    axis: { ticks: { text: { fill: textColor } } }
                  }}
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                  enableArcLinkLabels={true}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor={textColor}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="col-md-6 mb-4">
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card-body">
              <h5 className="card-title">Team Distribution</h5>
              <div style={{ height: '400px' }}>
                <ResponsiveBar
                  data={teamData}
                  keys={['count']}
                  indexBy="team"
                  margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                  padding={0.3}
                  theme={{
                    text: { fill: textColor },
                    axis: { ticks: { text: { fill: textColor } } }
                  }}
                  colors={{ scheme: 'nivo' }}
                  borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Export Button */}
      <motion.div
        className="row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="col-12 text-center">
          <button
            className="btn btn-success"
            onClick={() => exportToExcel(employees)}
          >
            <i className="bi bi-file-earmark-excel me-2"></i>
            Export to Excel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedDashboard; 