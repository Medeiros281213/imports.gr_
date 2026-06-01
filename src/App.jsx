import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider, useAuth } from "./components/auth-provider";

function RequireLogin({ navigate }) {
  return (
    <div className="app-wrapper" style={{ backgroundColor: "var(--color-background)" }}>
      <div style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h1>Voce precisa fazer login</h1>
        <p>Para acessar o catalogo, entre com sua conta ou cadastre-se.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{ padding: "1rem 1.5rem", borderRadius: "999px", border: "none", background: "#0f766e", color: "#fff", cursor: "pointer" }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            style={{ padding: "1rem 1.5rem", borderRadius: "999px", border: "1px solid #0f766e", background: "transparent", color: "#0f766e", cursor: "pointer" }}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}

function AppRoutes({ path, navigate }) {
  const { currentUser, logout } = useAuth();

  if (path === "/catalogo") {
    return currentUser ? <Catalogo navigate={navigate} currentUser={currentUser} onLogout={logout} /> : <RequireLogin navigate={navigate} />;
  }

  if (path === "/profile") {
    return currentUser ? <Profile navigate={navigate} /> : <RequireLogin navigate={navigate} />;
  }

  if (path === "/login") return <Auth mode="login" navigate={navigate} />;
  if (path === "/register") return <Auth mode="register" navigate={navigate} />;

  return <Home navigate={navigate} currentUser={currentUser} onLogout={logout} />;
}

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextPath, hash) => {
    const targetPath = nextPath || "/";
    const targetUrl = hash ? `${targetPath}#${hash}` : targetPath;

    if (`${window.location.pathname}${window.location.hash}` !== targetUrl) {
      window.history.pushState({}, "", targetUrl);
      setPath(targetPath);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }

    window.setTimeout(() => {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <AppRoutes path={path} navigate={navigate} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
