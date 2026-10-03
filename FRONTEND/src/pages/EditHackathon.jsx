import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import HackathonForm from "../components/HackathonForm";

function EditHackathon() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hackathon, setHackathon] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadHackathon = async () => {
            try {
                const res = await api.get("/hackathons/" + id);
                setHackathon(res.data.hackathon);
            } catch (err) {
                setError(err.response?.data?.message || "Could not load hackathon");
            }
        };

        loadHackathon();
    }, [id]);

    const handleUpdate = async (form) => {
        await api.put("/hackathons/" + id, form);
        navigate("/hackathons/" + id);
    };

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    if (!hackathon) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Hackathon</h1>
            <HackathonForm initialData={hackathon} onSubmit={handleUpdate} buttonText="Save Changes" />
        </div>
    );
}

export default EditHackathon;