import { useNavigate } from "react-router-dom";
import api from "../api";
import HackathonForm from "../components/HackathonForm";

function CreateHackathon() {
    const navigate = useNavigate();

    const handleCreate = async (form) => {
        const res = await api.post("/hackathons", form);
        navigate("/hackathons/" + res.data.hackathon._id);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add Hackathon</h1>
            <HackathonForm onSubmit={handleCreate} buttonText="Create Hackathon" />
        </div>
    );
}

export default CreateHackathon;