document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("student-form");
  const studentsList = document.getElementById("students-list");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const grade = document.getElementById("grade").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const age = document.getElementById("age").value;
    const courses = document.getElementById("courses").value.split(",").map((course) => course.trim());

    console.log('Form submitted with:', { name, grade, email, address, age, courses });

    try {
      const res = await fetch("/students/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, grade, email, address, age, courses }),
      });

      if (res.ok) {
        console.log('Student added successfully');
        fetchStudents(); // Refresh the list of students
        form.reset(); // Reset the form
      } else {
        console.error('Failed to add student');
        alert("Failed to add student");
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  });

  async function fetchStudents() {
    console.log("Fetching students...");
    try {
      const res = await fetch("/students");
      if (!res.ok) {
        throw new Error("Failed to fetch students");
      }
      const students = await res.json();
      console.log("Students fetched:", students);
      studentsList.innerHTML = students
        .map(
          (student) => `
        <li>
          <strong>Name:</strong> ${student.name}<br>
          <strong>Grade:</strong> ${student.grade}<br>
          <strong>Email:</strong> ${student.email}<br>
           <strong>Address:</strong> ${student.address}<br>
          <strong>Age:</strong> ${student.age}<br>
          <strong>Courses:</strong> ${student.courses.join(", ")}
        </li>
      `
        )
        .join("");
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }

  fetchStudents();
});
