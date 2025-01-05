import React from 'react';
import { useTeam } from '../context/TeamContext';
import femaleProfile from '../images/femaleProfile.jpg';
import maleProfile from '../images/maleProfile.jpg';

const Employees = () => {
  const { 
    employees, 
    selectedTeam,
    handleEmployeeCardClick,
    handleTeamSelectionChange 
  } = useTeam();

  return (
    <main className="container">
      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-6">
          <select 
            className="form-select form-select-lg"
            value={selectedTeam}
            onChange={handleTeamSelectionChange}
          >
            <option value="TeamA">Team A</option>
            <option value="TeamB">Team B</option>
            <option value="TeamC">Team C</option>
            <option value="TeamD">Team D</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-8">
          <div className="card-collection">
            {
              employees.map((employee) => (
                <div
                  key={employee.id}
                  id={employee.id}
                  className={employee.teamName === selectedTeam ? 'card m-2 standout' : 'card m-2'}
                  style={{ cursor: "pointer" }}
                  onClick={handleEmployeeCardClick}
                >
                  <img 
                    src={employee.gender === 'male' ? maleProfile : femaleProfile} 
                    className="card-img-top" 
                    alt={employee.fullName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Full Name: {employee.fullName}</h5>
                    <p className="card-text">Designation: {employee.designation}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </main>
  );
};

export default Employees; 