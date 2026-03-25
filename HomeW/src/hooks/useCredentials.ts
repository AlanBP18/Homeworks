import { useState } from 'react';

export interface UserCredential {
  email: string;
  pass: string;
}

export const useCredentials = () => {
  const [users, setUsers] = useState<UserCredential[]>([
    { email: 'user@mail.com', pass: '123' }
  ]);

  const validateUser = (email: string, pass: string): boolean => {
    return users.some(u => u.email === email && u.pass === pass);
  };

  const addUser = (email: string, pass: string): boolean => {
    if (users.some(u => u.email === email)) {
      return false; 
    }
    setUsers([...users, { email, pass }]);
    return true;
  };

  const updatePassword = (email: string, newPass: string) => {
    setUsers(users.map(u => u.email === email ? { ...u, pass: newPass } : u));
  };

  const removeUser = (email: string) => {
    setUsers(users.filter(u => u.email !== email));
  };

  return { 
    users, 
    validateUser,
    addUser,
    updatePassword,
    removeUser
  };
};
