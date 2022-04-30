import { useNavigate } from "react-router-dom";

export default function NavElement({ navIcon, navTitle, navigateTo }) {
  const navigate = useNavigate();
  return (
    <div className="nav_element" onClick={() => navigate(navigateTo)}>
      <img className="el_icon" alt="nav" src={navIcon} />
      <strong className="el_title">{navTitle}</strong>
    </div>
  );
}
