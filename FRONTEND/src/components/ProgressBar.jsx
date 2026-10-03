export const trackerSteps = [
    { key: "ideaSubmitted", label: "Idea submitted" },
    { key: "teamFormed", label: "Team formed" },
    { key: "problemStatementSelected", label: "Problem statement selected" },
    { key: "prototypeStarted", label: "Prototype started" },
    { key: "prototypeCompleted", label: "Prototype completed" },
    { key: "submissionCompleted", label: "Submission completed" },
    { key: "presentationCompleted", label: "Presentation completed" }
];

function ProgressBar({ tracker }) {
    const done = trackerSteps.filter((step) => tracker[step.key]).length;
    const percent = Math.round((done / trackerSteps.length) * 100);

    return (
        <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>{done} of {trackerSteps.length} steps</span>
                <span>{percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: percent + "%" }}></div>
            </div>
        </div>
    );
}

export default ProgressBar;