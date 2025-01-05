import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTeam } from '../context/TeamContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const DraggableTeamBoard = () => {
  const { employees, setTeam } = useTeam();
  const { isDarkMode } = useTheme();

  const teams = ['TeamA', 'TeamB', 'TeamC', 'TeamD', 'Unassigned'];

  const getTeamMembers = (teamName) => {
    return employees.filter(emp => 
      teamName === 'Unassigned' ? !emp.teamName : emp.teamName === teamName
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const employeeId = parseInt(result.draggableId);
    const newTeam = result.destination.droppableId;

    const updatedEmployees = employees.map(emp => 
      emp.id === employeeId
        ? { ...emp, teamName: newTeam === 'Unassigned' ? '' : newTeam }
        : emp
    );

    setTeam(updatedEmployees);
  };

  return (
    <div className="container-fluid mt-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row">
          {teams.map((team) => (
            <div key={team} className="col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`card ${isDarkMode ? 'bg-dark' : 'bg-light'} mb-3`}
              >
                <div className="card-header">
                  <h5 className="mb-0">{team}</h5>
                  <small>{getTeamMembers(team).length} members</small>
                </div>
                <Droppable droppableId={team}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="card-body"
                      style={{ minHeight: '400px' }}
                    >
                      {getTeamMembers(team).map((emp, index) => (
                        <Draggable
                          key={emp.id}
                          draggableId={emp.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`card mb-2 ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                            >
                              <div className="card-body p-2">
                                <h6 className="mb-0">{emp.fullName}</h6>
                                <small className="text-muted">{emp.designation}</small>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </motion.div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DraggableTeamBoard; 