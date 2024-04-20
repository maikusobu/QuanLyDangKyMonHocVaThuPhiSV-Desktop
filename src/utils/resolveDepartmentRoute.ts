const resolveDepartmentRoute = (department: string) => {
  switch (department) {
    case 'Phòng kế hoạch tài chính':
      return '/finance-department';
    case 'Phòng đào tạo':
      return '/training-department';
    case 'Phòng công tác sinh viên':
      return '/student-department';
  }
};

export default resolveDepartmentRoute;
