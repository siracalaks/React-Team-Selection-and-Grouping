import * as XLSX from 'xlsx';

export const exportToExcel = (employees) => {
  const worksheet = XLSX.utils.json_to_sheet(
    employees.map(emp => ({
      'Full Name': emp.fullName,
      'Designation': emp.designation,
      'Team': emp.teamName || 'Unassigned',
      'Gender': emp.gender
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

  // Generate buffer
  XLSX.writeFile(workbook, 'team-members.xlsx');
}; 