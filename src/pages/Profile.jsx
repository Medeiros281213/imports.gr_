import { useEffect, useState } from "react";
import { useAuth } from "../components/auth-provider";
import "../styles/auth.css";

function Profile({ navigate }) {
  const { currentUser, logout, updateProfile, changePassword } = useAuth();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    setError("");
    setProfileMessage("");

    try {
      updateProfile({ name, email });
      setProfileMessage("Dados atualizados com sucesso.");
    } catch (err) {
      setError(err.message || "Erro ao atualizar perfil.");
    }
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    setError("");
    setPasswordMessage("");

    try {
      changePassword({ currentPassword, newPassword });
      setPasswordMessage("Senha alterada com sucesso.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message || "Erro ao alterar senha.");
    }
  };

  return (
    <div className="auth-page profile-page">
      <div className="auth-card profile-card">
        <header className="auth-header">
          <h1>Minha Conta</h1>
          <p>Aqui voce pode atualizar seu perfil, mudar a senha ou sair da conta.</p>
        </header>

        <form className="auth-form" onSubmit={handleProfileSubmit}>
          <label>
            Nome completo
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
              required
            />
          </label>

          <button type="submit" className="auth-submit-button">
            Salvar perfil
          </button>
        </form>

        <form className="auth-form" onSubmit={handlePasswordSubmit}>
          <label>
            Senha atual
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Senha atual"
              minLength={6}
              required
            />
          </label>

          <label>
            Nova senha
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nova senha"
              minLength={6}
              required
            />
          </label>

          <button type="submit" className="auth-submit-button">
            Alterar senha
          </button>
        </form>

        {error && <div className="auth-message error">{error}</div>}
        {profileMessage && <div className="auth-message success">{profileMessage}</div>}
        {passwordMessage && <div className="auth-message success">{passwordMessage}</div>}

        <footer className="auth-footer">
          <button type="button" className="auth-link" onClick={() => { logout(); navigate("/"); }}>
            Sair da conta
          </button>
          <button type="button" className="auth-link" onClick={() => navigate("/")}>Voltar para inicio</button>
        </footer>
      </div>
    </div>
  );
}

export default Profile;
