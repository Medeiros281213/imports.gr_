import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const USERS_KEY = "importsgr-users";
const SESSION_KEY = "importsgr-current-user";

const getStoredUsers = () => {
  try {
    return JSON.parse(window.localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

const setStoredUsers = (users) => {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getStoredSession = () => {
  try {
    return JSON.parse(window.localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
};

const setStoredSession = (user) => {
  if (user) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const storedUser = getStoredSession();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const login = ({ email, password }) => {
    const users = getStoredUsers();
    const foundUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (!foundUser) {
      throw new Error("Usuario nao encontrado. Por favor verifique o email ou cadastre-se.");
    }
    if (foundUser.password !== password) {
      throw new Error("Senha incorreta. Tente novamente.");
    }

    const safeUser = { name: foundUser.name, email: foundUser.email };
    setCurrentUser(safeUser);
    setStoredSession(safeUser);
    return safeUser;
  };

  const register = ({ name, email, password }) => {
    const users = getStoredUsers();
    const alreadyExists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());
    if (alreadyExists) {
      throw new Error("Ja existe um usuario cadastrado com este email.");
    }

    const newUser = { name: name.trim(), email: email.trim().toLowerCase(), password };
    users.push(newUser);
    setStoredUsers(users);

    const safeUser = { name: newUser.name, email: newUser.email };
    setCurrentUser(safeUser);
    setStoredSession(safeUser);
    return safeUser;
  };

  const updateProfile = ({ name, email }) => {
    if (!currentUser) {
      throw new Error("Usuario nao autenticado.");
    }

    const users = getStoredUsers();
    const oldEmail = currentUser.email.toLowerCase();
    const targetEmail = email.trim().toLowerCase();
    const duplicate = users.some((user) => user.email.toLowerCase() === targetEmail && user.email.toLowerCase() !== oldEmail);

    if (duplicate) {
      throw new Error("Este email ja esta em uso por outro usuario.");
    }

    const userIndex = users.findIndex((user) => user.email.toLowerCase() === oldEmail);
    if (userIndex === -1) {
      throw new Error("Usuario nao encontrado.");
    }

    users[userIndex] = {
      ...users[userIndex],
      name: name.trim(),
      email: targetEmail,
    };
    setStoredUsers(users);

    const safeUser = { name: name.trim(), email: targetEmail };
    setCurrentUser(safeUser);
    setStoredSession(safeUser);
    return safeUser;
  };

  const changePassword = ({ currentPassword, newPassword }) => {
    if (!currentUser) {
      throw new Error("Usuario nao autenticado.");
    }

    const users = getStoredUsers();
    const userIndex = users.findIndex((user) => user.email.toLowerCase() === currentUser.email.toLowerCase());
    if (userIndex === -1) {
      throw new Error("Usuario nao encontrado.");
    }

    if (users[userIndex].password !== currentPassword) {
      throw new Error("Senha atual incorreta.");
    }

    if (newPassword.length < 6) {
      throw new Error("A nova senha deve ter pelo menos 6 caracteres.");
    }

    users[userIndex].password = newPassword;
    setStoredUsers(users);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setStoredSession(null);
    setMessage(null);
  };

  const clearMessage = () => setMessage(null);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, updateProfile, changePassword, logout, message, setMessage, clearMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
