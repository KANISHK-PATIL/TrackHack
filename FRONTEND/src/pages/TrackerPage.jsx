import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import ProgressBar, { trackerSteps } from "../components/ProgressBar";

const results = ["Pending", "Participated", "Shortlisted", "Winner"];

function TrackerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tracker, setTracker] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadTracker = async () => {
            try {
                const res = await api.get("/trackers/" + id);
                setTracker(res.data.tracker);
            } catch (err) {
                setError(err.response?.data?.message || "Could not load tracker");
            }
        };

        loadTracker();
    }, [id]);

    const handleCheck = (key) => {
        setMessage("");
        setTracker({ ...tracker, [key]: !tracker[key] });
    };

    const handleSave = async () => {
        setError("");
        setMessage("");

        const body = {
            finalResult: tracker.finalResult,
            notes: tracker.notes
        };
        trackerSteps.forEach((step) => {
            body[step.key] = tracker[step.key];
        });

        try {
            await api.put("/trackers/" + id, body);
            setMessage("Progress saved");
        } catch (err) {
            setError(err.response?.data?.message || "Could not save progress");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this tracker?")) {
            return;
        }

        try {
            await api.delete("/trackers/" + id);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Could not delete tracker");
        }
    };

    if (error && !tracker) {
        return <p className="text-red-600">{error}</p>;
    }

    if (!tracker) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col gap-4">
            <div>
                <p className="text-sm text-gray-500">Tracker for</p>
                {tracker.hackathon ? (
                    <Link to={"/hackathons/" + tracker.hackathon._id} className="text-2xl font-bold text-indigo-600">
                        {tracker.hackathon.title}
                    </Link>
                ) : (
                    <h1 className="text-2xl font-bold">Deleted hackathon</h1>
                )}
            </div>

            <ProgressBar tracker={tracker} />

            {error && <p className="text-red-600">{error}</p>}
            {message && <p className="text-green-600">{message}</p>}

            <div className="flex flex-col gap-2">
                {trackerSteps.map((step) => (
                    <label key={step.key} className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={tracker[step.key]}
                            onChange={() => handleCheck(step.key)}
                            className="h-4 w-4"
                        />
                        {step.label}
                    </label>
                ))}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Final result</label>
                <select
                    value={tracker.finalResult}
                    onChange={(e) => setTracker({ ...tracker, finalResult: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                >
                    {results.map((result) => (
                        <option key={result} value={result}>{result}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                    value={tracker.notes}
                    onChange={(e) => setTracker({ ...tracker, notes: e.target.value })}
                    rows={4}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                ></textarea>
            </div>

            <div className="flex gap-3">
                <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                    Save progress
                </button>
                <button onClick={handleDelete} className="border border-red-500 text-red-600 px-4 py-2 rounded">
                    Delete tracker
                </button>
            </div>
        </div>
    );
}

export default TrackerPage;