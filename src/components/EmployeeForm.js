import React from 'react';
import { useForm } from 'react-hook-form';
import { useTeam } from '../context/TeamContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';

const EmployeeForm = ({ employee, onClose }) => {
  const { isDarkMode } = useTheme();
  const { employees, setEmployees } = useTeam();
  const isEditing = !!employee;

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: employee || {
      fullName: '',
      designation: '',
      gender: '',
      teamName: ''
    }
  });

  const onSubmit = (data) => {
    if (isEditing) {
      const updatedEmployees = employees.map(emp =>
        emp.id === employee.id ? { ...emp, ...data } : emp
      );
      setEmployees(updatedEmployees);
      toast.success('Employee updated successfully!');
    } else {
      const newEmployee = {
        ...data,
        id: Math.max(...employees.map(e => e.id)) + 1
      };
      setEmployees([...employees, newEmployee]);
      toast.success('Employee added successfully!');
    }
    onClose();
  };

  const formClass = `card ${isDarkMode ? 'bg-dark' : 'bg-light'}`;
  const inputClass = `form-control ${isDarkMode ? 'bg-dark text-light' : ''}`;

  return (
    <div className={formClass}>
      <div className="card-body">
        <h4 className="card-title mb-4">
          {isEditing ? 'Edit Employee' : 'Add New Employee'}
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className={`${inputClass} ${errors.fullName ? 'is-invalid' : ''}`}
              {...register('fullName', { 
                required: 'Full name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
            />
            {errors.fullName && (
              <div className="invalid-feedback">{errors.fullName.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Designation</label>
            <input
              type="text"
              className={`${inputClass} ${errors.designation ? 'is-invalid' : ''}`}
              {...register('designation', { required: 'Designation is required' })}
            />
            {errors.designation && (
              <div className="invalid-feedback">{errors.designation.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className={`${inputClass} ${errors.gender ? 'is-invalid' : ''}`}
              {...register('gender', { required: 'Gender is required' })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <div className="invalid-feedback">{errors.gender.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Team</label>
            <select
              className={inputClass}
              {...register('teamName')}
            >
              <option value="">Unassigned</option>
              <option value="TeamA">Team A</option>
              <option value="TeamB">Team B</option>
              <option value="TeamC">Team C</option>
              <option value="TeamD">Team D</option>
            </select>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {isEditing ? 'Update' : 'Add'} Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm; 