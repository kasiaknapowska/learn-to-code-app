import { useNavigate } from "react-router-dom";
import backIcon from "../../images/back-arrow.svg";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="back_btn" onClick={() => navigate("/main")}>
      <img className="back_icon" alt="back" src={backIcon} />
      Back to menu
    </div>
  );
}
