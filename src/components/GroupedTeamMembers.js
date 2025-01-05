import React, { useState } from 'react';
import { useTeam } from '../context/TeamContext';

const GroupedTeamMembers = () => {
  const { employees, selectedTeam, setTeam } = useTeam();
  
  const [groupedEmployees, setGroupedData] = useState(groupTeamMembers());

  function groupTeamMembers() {
    const teams = ['TeamA', 'TeamB', 'TeamC', 'TeamD'];
    
    return teams.map((team) => ({
      team,
      members: employees.filter((employee) => employee.teamName === team),
      collapsed: selectedTeam === team ? false : true
    }));
  }

  function handleTeamClick(event) {
    const transformedGroupData = groupedEmployees.map((groupedData) => 
      groupedData.team === event.currentTarget.id
        ? { ...groupedData, collapsed: !groupedData.collapsed }
        : groupedData
    );
    setGroupedData(transformedGroupData);
    setTeam(event.currentTarget.id);
  }

  return (
    <main className="container">
      {
        groupedEmployees.map((item) => (
          <div key={item.team} className='card mt-2' style={{ cursor: "pointer" }}>
            <h4 id={item.team} className="card-header text-secondary bg-white" onClick={handleTeamClick}>
              Team Name: {item.team}
            </h4>
            <div id={"collapse_" + item.team} className={item.collapsed ? "collapse" : ""}>
              <hr />
              {
                item.members.map((member) => (
                  <div key={member.id} className="mt-2">
                    <h5 className="card-title mt-2">
                      <span className="text-dark">Full Name: {member.fullName}</span>
                    </h5>
                    <p>Designation: {member.designation}</p>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </main>
  );
};

export default GroupedTeamMembers; 