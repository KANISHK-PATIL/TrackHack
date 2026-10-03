const colors = {
    Upcoming: "bg-blue-100 text-blue-700",
    Registered: "bg-purple-100 text-purple-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700"
};

function StatusBadge({ status }) {
    return (
        <span className={"px-2 py-1 rounded text-xs font-semibold whitespace-nowrap " + colors[status]}>
            {status}
        </span>
    );
}

export default StatusBadge;