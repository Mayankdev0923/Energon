import { useState } from "react";

function EventModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().substr(0, 10),
  });

  const handleCreateEvent = () => {
    console.log("Creating event:", eventData);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded hover:bg-zinc-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 inline-block mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Create Event
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-zinc-300"
            >
              Event Title
            </label>
            <input
              type="text"
              id="title"
              value={eventData.title}
              onChange={(e) =>
                setEventData({ ...eventData, title: e.target.value })
              }
              className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-zinc-300"
            >
              Description
            </label>
            <textarea
              id="description"
              value={eventData.description}
              onChange={(e) =>
                setEventData({ ...eventData, description: e.target.value })
              }
              className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-zinc-300"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={eventData.date}
              onChange={(e) =>
                setEventData({ ...eventData, date: e.target.value })
              }
              className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateEvent}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
