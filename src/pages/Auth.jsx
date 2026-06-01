import { useEffect, useState } from "react";
import { useAuth } from "../components/auth-provider";
import "../styles/auth.css";

function Auth({ mode = "login", navigate }) {
  const [activeMode, setActiveMode] = useState(mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login, register, currentUser } = useAuth();

  useEffect(() => {
    setActiveMode(mode);
  }, [mode]);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (activeMode === "login") {
        await login({ email, password });
        setSuccess("Login realizado com sucesso!");
      } else {
        if (!name.trim()) {
          throw new Error("Por favor informe seu nome.");
        }
        await register({ name, email, password });
        setSuccess("Cadastro concluido! Bem-vindo.");
      }
    } catch (err) {
      setError(err.message || "Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <h1>{activeMode === "login" ? "Entrar" : "Cadastrar"}</h1>
          <p>
            {activeMode === "login"
              ? "Acesse sua conta para continuar." 
              : "Crie sua conta e comece a navegar."}
          </p>
        </header>

        <div className="auth-tabs">
          <button
            type="button"
            className={activeMode === "login" ? "active" : ""}
            onClick={() => setActiveMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={activeMode === "register" ? "active" : ""}
            onClick={() => setActiveMode("register")}
          >
            Cadastro
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {activeMode === "register" && (
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
          )}

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

          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              minLength={6}
              required
            />
          </label>

          <button type="submit" className="auth-submit-button">
            {activeMode === "login" ? "Entrar" : "Cadastrar"}
          </button>

          {error && <div className="auth-message error">{error}</div>}
          {success && <div className="auth-message success">{success}</div>}
        </form>

        <footer className="auth-footer">
          {activeMode === "login" ? (
            <p>
              Novo por aqui?{' '}
              <button type="button" onClick={() => setActiveMode("register")}>Crie uma conta</button>
            </p>
          ) : (
            <p>
              Ja tem uma conta?{' '}
              <button type="button" onClick={() => setActiveMode("login")}>Faça login</button>
            </p>
          )}
          <button type="button" className="auth-link" onClick={() => navigate("/")}>Voltar para inicio</button>
        </footer>
      </div>
    </div>
  );
}

export default Auth;
