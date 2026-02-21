import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-foreground shadow hover:bg-white transition"
      aria-label="Go back"
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
};

export default BackButton;
