import React from 'react';
import { useTeam } from '../context/TeamContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { employees } = useTeam();
  const { isDarkMode } = useTheme();

  const stats = {
    total: employees.length,
    assigned: employees.filter(e => e.teamName).length,
    unassigned: employees.filter(e => !e.teamName).length,
    teamStats: {
      TeamA: employees.filter(e => e.teamName === 'TeamA').length,
      TeamB: employees.filter(e => e.teamName === 'TeamB').length,
      TeamC: employees.filter(e => e.teamName === 'TeamC').length,
      TeamD: employees.filter(e => e.teamName === 'TeamD').length,
    },
    genderStats: {
      male: employees.filter(e => e.gender === 'male').length,
      female: employees.filter(e => e.gender === 'female').length,
    }
  };

  const cardClass = `card ${isDarkMode ? 'bg-dark' : 'bg-light'}`;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className={cardClass}>
            <div className="card-body text-center">
              <h5 className="card-title">Total Employees</h5>
              <h2 className="display-4">{stats.total}</h2>
              <p className="text-muted">
                {stats.assigned} Assigned | {stats.unassigned} Unassigned
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className={cardClass}>
            <div className="card-body">
              <h5 className="card-title text-center">Team Distribution</h5>
              {Object.entries(stats.teamStats).map(([team, count]) => (
                <div key={team} className="d-flex justify-content-between align-items-center mt-2">
                  <span>{team}</span>
                  <div className="progress flex-grow-1 mx-2" style={{ height: '20px' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                      aria-valuenow={(count / stats.total) * 100}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className={cardClass}>
            <div className="card-body">
              <h5 className="card-title text-center">Gender Distribution</h5>
              <div className="pie-chart-container mt-3">
                <div className="d-flex justify-content-around">
                  <div className="text-center">
                    <div className="h4">{stats.genderStats.male}</div>
                    <div>Male</div>
                  </div>
                  <div className="text-center">
                    <div className="h4">{stats.genderStats.female}</div>
                    <div>Female</div>
                  </div>
                </div>
                <div className="progress mt-3" style={{ height: '20px' }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${(stats.genderStats.male / stats.total) * 100}%` }}
                  >
                    {Math.round((stats.genderStats.male / stats.total) * 100)}%
                  </div>
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: `${(stats.genderStats.female / stats.total) * 100}%` }}
                  >
                    {Math.round((stats.genderStats.female / stats.total) * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 