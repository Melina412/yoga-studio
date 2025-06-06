import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
const StaffProtector = () => {
  return <Outlet />;
};

export default StaffProtector;
