import decodeAT from './decodeAT';

const getSession = (): ReturnType<typeof decodeAT> | null => {
  const token = window.electron.store.get('token');
  if (!token) {
    return null;
  }
  return decodeAT(token);
};

export default getSession;
