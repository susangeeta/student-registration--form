//all student data fetch
function allStudent() {
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const container = document.getElementById("student-data");
  if (students.length === 0) {
    container.innerHTML = `
      <div class="col-span-6 text-center py-8 text-gray-500 text-lg">
        No student data found.
      </div>
    `;
    return;
  }
  container.innerHTML = students
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((item, id) => {
      return ` <div class="grid grid-cols-7 lg:grid-cols-6 border-b border-b-gray-300 cursor-pointe w-full hover:bg-gray-300 transition-all ease-in-out duration-300 ">
                     <div class=" col-span-2 lg:col-span-1   text-sm font-medium flex items-center gap-2">
                    <div class= "bg-gray-400 rounded-full h-8 w-8 flex items-center justify-center">
                    <h1 class="text-base text-white  flex items-center justify-center">${item?.name
                      ?.charAt(0)
                      .toUpperCase()}</h1>
                    </div>
                    <div class="col-span-1 text-sm pt-1 whitespace-nowrap  text-[#93909d] font-normal flex items-center justify-center capitalize">
                        ${
                          item?.name?.charAt(0).toUpperCase() +
                          item?.name?.slice(1).toLowerCase()
                        }
                    </div>
                </div>
                   <div class="col-span-1 p-4 text-[#727b93] font-bold text-sm flex items-center  justify-center ">
                ${item?.id}
                </div>

                <div class="col-span-1 p-4 text-[#727b93] font-bold text-sm flex items-center  justify-center">
                    ${item?.roll}
                </div>


                <div class="col-span-1 p-4  text-[#888888] text-sm font-bold flex items-center  justify-center text-right">
                    ${item?.class}
                </div>
                <div class="col-span-1 p-4  text-sm font-bold text-[#888888] flex items-center  justify-center">
                    ${item?.mobile}
                </div>
             
                <div class="col-span-1 p-4 text-sm flex gap-2 items-center justify-center ">
                    <div id="edit-button" class="bg-blue-600 cursor-pointer h-8 w-8 rounded-md flex items-center justify-center" onclick="renderEditDrawer(${
                      item.id
                    })">
                        <img src="./assests/edit-icon.png" class="h-4 w-4" />
                    </div>
                    <div class="bg-red-600 h-8 w-8 rounded-md flex items-center cursor-pointer justify-center " onclick="deleteStudent(${
                      item.id
                    })">
                        <img src="./assests/delete-icon.png" class="h-4 w-4" />
                    </div>
                </div></div>`;
    })
    .join("");
}
allStudent();

//open and close drawer edit and add student
document.addEventListener("DOMContentLoaded", function () {
  renderHistoryDrawer();
  const addStudentBtn = document.getElementById("add-student");
  const drawer = document.getElementById("drawer");
  const editDrawer = document.getElementById("edit-drawer");
  const closeDrawerBtn = document.getElementById("close-drawer");
  const closeEditDrawerBtn = document.getElementById("close-edit-drawer");

  addStudentBtn.addEventListener("click", function () {
    drawer.classList.remove("translate-x-full");
  });

  closeDrawerBtn.addEventListener("click", function () {
    drawer.classList.add("translate-x-full");
  });

  closeEditDrawerBtn.addEventListener("click", function () {
    editDrawer.classList.add("translate-x-full");
  });

  //add student and update student logic here
  document.addEventListener("submit", (e) => {
    e.preventDefault();

    const formType = e.target.getAttribute("id");

    if (formType === "edit-student-form") {
      const students = JSON.parse(localStorage.getItem("students") || "[]");
      const formData = new FormData(e.target);

      const selectedStudent = students.find(
        (elm) => Number.parseInt(elm.id) === Number.parseInt(formData.get("id"))
      );

      const student = {
        name: formData.get("name"),
        roll: formData.get("roll"),
        mobile: formData.get("mobile"),
        class: formData.get("class"),
        id: selectedStudent.id,
        createdAt: selectedStudent.createdAt,
      };

      if (!student.name) {
        Swal.fire("Invalid Name", "Name is required.", "error");
        return;
      }
      if (!/^[A-Za-z\s]+$/.test(student.name)) {
        Swal.fire(
          "Invalid Name",
          "Name should contain only letters and spaces.",
          "error"
        );
        return;
      }
      if (!student.mobile) {
        Swal.fire("Invalid Mobile", "Mobile number is required.", "error");
        return;
      }
      if (!/^\d{10}$/.test(student.mobile)) {
        Swal.fire(
          "Invalid Mobile",
          "Mobile number must be exactly 10 digits.",
          "error"
        );
        return;
      }
      if (!student.class) {
        Swal.fire("Invalid Class", "Class is required.", "error");
        return;
      }
      if (!/^\d+$/.test(student.class)) {
        Swal.fire("Invalid ID", "Student Class must be numeric.", "error");
        return;
      }
      if (!student.roll) {
        Swal.fire("Invalid Roll No", "Roll number is required.", "error");
        return;
      }
      if (!/^\d+$/.test(student.roll)) {
        Swal.fire("Invalid Roll No", "Roll number must be numeric.", "error");
        return;
      }
      if (!student.id) {
        Swal.fire("Invalid ID", "Student ID is required.", "error");
        return;
      }
      if (!/^\d+$/.test(student.id)) {
        Swal.fire("Invalid ID", "Student ID must be numeric.", "error");
        return;
      }

      const updatedStudents = [
        ...students.filter(
          (elm) => Number.parseInt(elm.id) !== Number.parseInt(student.id)
        ),
        student,
      ];

      localStorage.setItem("students", JSON.stringify(updatedStudents));
      Swal.fire("Success", "Student updated successfully!", "success").then(
        () => {
          e.target.reset();
          editDrawer.classList.add("translate-x-full");
          allStudent();
        }
      );
    } else if (formType === "student-form") {
      const formData = new FormData(e.target);
      const student = {
        name: formData.get("name"),
        roll: formData.get("roll"),
        mobile: formData.get("mobile"),
        class: formData.get("class"),
        id: formData.get("id"),
        createdAt: new Date().toISOString(),
      };
      if (!student.name) {
        Swal.fire("Invalid Name", "Name is required.", "error");
        return;
      }
      if (!/^[A-Za-z\s]+$/.test(student.name)) {
        Swal.fire(
          "Invalid Name",
          "Name should contain only letters and spaces.",
          "error"
        );
        return;
      }
      if (!student.mobile) {
        Swal.fire("Invalid Mobile", "Mobile number is required.", "error");
        return;
      }
      if (!/^\d{10}$/.test(student.mobile)) {
        Swal.fire(
          "Invalid Mobile",
          "Mobile number must be exactly 10 digits.",
          "error"
        );
        return;
      }
      if (!student.class) {
        Swal.fire("Invalid Class", "Class is required.", "error");
        return;
      }
      if (!/^\d+$/.test(student.class)) {
        Swal.fire("Invalid ID", "Student Class must be numeric.", "error");
        return;
      }
      if (!student.roll) {
        Swal.fire("Invalid Roll No", "Roll number is required.", "error");
        return;
      }
      if (!/^\d+$/.test(student.roll)) {
        Swal.fire("Invalid Roll No", "Roll number must be numeric.", "error");
        return;
      }
      if (!student.id) {
        Swal.fire("Invalid ID", "Student ID is required.", "error");
        return;
      }
      if (!/^\d+$/.test(student.id)) {
        Swal.fire("Invalid ID", "Student ID must be numeric.", "error");
        return;
      }
      const students = JSON.parse(localStorage.getItem("students") || "[]");
      const isDuplicate = students.some((s) => s.id === student.id);
      if (isDuplicate) {
        Swal.fire("A student with this ID already exists.", "error");
        return;
      }

      students.push(student);
      localStorage.setItem("students", JSON.stringify(students));
      Swal.fire("Success", "Student added successfully!", "success").then(
        () => {
          e.target.reset();
          drawer.classList.add("translate-x-full");
          allStudent();
        }
      );
    }
  });
});

//delete  student
function deleteStudent(studentId) {
  Swal.fire({
    title: "Are you sure?",
    text: "This student record will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6a73fa",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const students = JSON.parse(localStorage.getItem("students") || "[]");
      const filteredStudents = students.filter(
        (elm) => Number.parseInt(elm.id) !== Number.parseInt(studentId)
      );

      localStorage.setItem("students", JSON.stringify(filteredStudents));
      allStudent();

      Swal.fire("Deleted!", "The student record has been deleted.", "success");
    }
  });
}

//add form student ui render
function renderHistoryDrawer() {
  const container = document.getElementById("drawer-history");

  container.innerHTML = `
  <form id="student-form" class="space-y-4">
      <div class="flex flex-col gap-2">
        <label class="block text-sm font-medium text-gray-700">Student Name</label>
        <input type="text" name="name" required
          class="w-full rounded-md border-gray-300 border  p-3 text-base" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="block text-sm font-medium text-gray-700">Student ID</label>
        <input type="text" name="id" required
          class="w-full rounded-md border-gray-300 border  p-3 text-base" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="block text-sm font-medium text-gray-700">Roll No</label>
        <input type="text" name="roll" required
          class="w-full rounded-md border-gray-300  border  p-3 text-base" />
      </div>
   <div class="flex flex-col gap-2">
        <label class="block text-sm font-medium text-gray-700">Class</label>
        <input type="text" name="class" required
          class="w-full rounded-md border-gray-300 border  p-3 text-base" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Contact No</label>
        <input type="tel" name="mobile" required
          class="w-full rounded-md border-gray-300 border  p-3 text-base" />
      </div>

   

      <div class="pt-2">
        <button type="submit"
          class="w-full bg-[#6a73fa] text-white py-2 px-4 cursor-pointer rounded-md hover:bg-indigo-600 transition">
          Save Student
        </button>
      </div>
    </form>
  `;
}

//edit form student ui render
function renderEditDrawer(id) {
  const drawer = document.getElementById("edit-drawer");
  drawer.classList.remove("translate-x-full");

  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const selectedStudent = students.find(
    (elm) => Number.parseInt(elm.id) === Number.parseInt(id)
  );

  if (!selectedStudent?.id) {
    drawer.classList.add("translate-x-full");
    return;
  }

  const escapeHTML = (str) =>
    str
      ?.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const container = document.getElementById("edit-drawer-history");
  container.innerHTML = `
  <form id="edit-student-form" class="space-y-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium text-gray-700">Student Name</label>
      <input value="${escapeHTML(
        selectedStudent?.name
      )}" type="text" name="name" required
        class=" w-full rounded-md border-gray-300 border p-3 text-base" />
    </div>
     <div class="flex flex-col gap-2">
      <label class="text-sm font-medium text-gray-700">Student ID</label>
      <input value="${escapeHTML(
        selectedStudent?.id
      )}" type="text" name="id" required readonly 
        class="w-full rounded-md border-gray-300 border p-3 text-base" />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium text-gray-700">Roll No</label>
      <input value="${escapeHTML(
        selectedStudent?.roll
      )}" type="text" name="roll" required
        class=" w-full rounded-md border-gray-300 border p-3 text-base" />
    </div>
    
    <div class="flex flex-col gap-2">
      <label class=" text-sm font-medium text-gray-700">Class</label>
      <input value="${escapeHTML(
        selectedStudent?.class
      )}" type="text" name="class" required
        class="w-full rounded-md border-gray-300 border p-3 text-base" />
    </div>


    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium text-gray-700">Contact No</label>
      <input value="${escapeHTML(
        selectedStudent?.mobile
      )}" type="tel" name="mobile" required
        class="w-full rounded-md border-gray-300 border p-3 text-base" />
    </div>

   

    <div class="pt-2">
      <button type="submit readOnly"
        class="w-full bg-[#6a73fa] text-white py-2 px-4 cursor-pointer rounded-md hover:bg-indigo-600 transition">
        Update Student
      </button>
    </div>
  </form>
`;
}
