const studentEvents = require("./events");

studentEvents.on("student-created", (student) => {
  setTimeout(() => {
    console.log(
      `[Notification] Student "${student.name}" created at ${new Date().toISOString()} (assigned: ${student.course || "unassigned"})`
    );
  }, 200);
});

studentEvents.on("student-deleted", (student) => {
  console.log(
    `[Notification] Student "${student.name || student.id}" deleted at ${new Date().toISOString()}`
  );
});

studentEvents.on("error", (err) => {
  console.error("[Event error]", err.message);
});
