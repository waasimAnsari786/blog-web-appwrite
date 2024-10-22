import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "../reuseableComponents/Container";
import LogoutBtn from "../reuseableComponents/LogoutBtn";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "SignUp", slug: "/signup", active: !authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "All Post", slug: "/all-post", active: authStatus },
  ];

  return (
    <header>
      <Container>
        <nav>
          <Link to="/">
            <div>
              <p className="text-3xl font-black"> Logo</p>
            </div>
          </Link>

          <div>
            <ul>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button onClick={() => navigate(item.slug)}>
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li key={item.name}>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}
