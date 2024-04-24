import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: string;
  role: string;
  department: string;
}

const decodeAT = (token: string) => {
  return jwtDecode<JwtPayload>(token);
};

export default decodeAT;
