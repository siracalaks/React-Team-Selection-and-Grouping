import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialEmployees } from '../data/employeesData';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [selectedTeam, setTeam] = useState(
    JSON.parse(localStorage.getItem('selectedTeam')) || "TeamB"
  );
  
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem('employeeList')) || initialEmployees
  );

  useEffect(() => {
    localStorage.setItem('employeeList', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam));
  }, [selectedTeam]);

  const handleTeamSelectionChange = (event) => {
    setTeam(event.target.value);
  };

  const handleEmployeeCardClick = (event) => {
    const transformedEmployees = employees.map((employee) => 
      employee.id === parseInt(event.currentTarget.id)
        ? (employee.teamName === selectedTeam) 
          ? { ...employee, teamName: '' } 
          : { ...employee, teamName: selectedTeam }
        : employee
    );
    setEmployees(transformedEmployees);
  };

  return (
    <TeamContext.Provider 
      value={{
        selectedTeam,
        employees,
        handleTeamSelectionChange,
        handleEmployeeCardClick,
        setTeam
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
}; 