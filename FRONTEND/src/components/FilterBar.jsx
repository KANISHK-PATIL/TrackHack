const statuses = ["Upcoming", "Registered", "In Progress", "Completed", "Cancelled"];
const modes = ["Online", "Offline", "Hybrid"];

function FilterBar({ status, mode, onStatusChange, onModeChange }) {
    return (
        <div className="flex gap-3">
            <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 bg-white"
            >
                <option value="">All statuses</option>
                {statuses.map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>

            <select
                value={mode}
                onChange={(e) => onModeChange(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 bg-white"
            >
                <option value="">All modes</option>
                {modes.map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
        </div>
    );
}

export default FilterBar;