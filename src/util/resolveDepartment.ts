export const resolveDepartment = (department: string) => {
  switch (department) {
    case 'Phòng kế hoạch tài chính':
      return 'finance';
    case 'Phòng đào tạo':
      return 'course';
    case 'Phòng công tác sinh viên':
      return 'student';
  }
};
