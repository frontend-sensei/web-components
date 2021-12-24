export default {
  columns: [
    {
      name: "Not Resolved",
      color: "red",
    },
    {
      name: "In Progress",
      color: "yellow",
    },
    {
      name: "Awaiting Parts",
      color: "orange",
    },
    {
      name: "Resolved",
      color: "green",
    },
  ],
  cards: [
    {
      id: 1,
      job_id: "T02125-SI-01-1",
      status: "Not Resolved",
      title: "New Job № 1",
    },
    {
      id: 2,
      job_id: "T02125-SI-01-2",
      status: "Not Resolved",
      title: "New Job № 2",
    },

    {
      id: 3,
      job_id: "T02125-SI-02-1",
      status: "In Progress",
      title: "New Job № 3",
    },
    {
      id: 4,
      job_id: "T02125-SI-02-2",
      status: "In Progress",
      title: "New Job № 4",
    },

    {
      id: 5,
      job_id: "T02125-SI-03-1",
      status: "Awaiting Parts",
      title: "New Job № 5",
    },
    {
      id: 6,
      job_id: "T02125-SI-03-2",
      status: "Awaiting Parts",
      title: "New Job № 6",
    },

    {
      id: 7,
      job_id: "T02125-SI-04-1",
      status: "Resolved",
      title: "New Job № 7",
    },
    {
      id: 8,
      job_id: "T02125-SI-04-2",
      status: "Resolved",
      title: "New Job № 8",
    },
  ],
};
