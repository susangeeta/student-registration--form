//add drawer

document.addEventListener("DOMContentLoaded", function () {
  renderHistoryDrawer();
  const addStudentBtn = document.getElementById("add-student");
  const drawer = document.getElementById("drawer");
  const closeDrawerBtn = document.getElementById("close-drawer");

  addStudentBtn.addEventListener("click", function () {
    drawer.classList.remove("translate-x-full");
  });

  closeDrawerBtn.addEventListener("click", function () {
    drawer.classList.add("translate-x-full");
  });

  document.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const student = {
      name: formData.get("name"),
      roll: formData.get("roll"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      id: formData.get("id"),
      createdAt: new Date().toISOString(),
    };
    console.log(student);
    if (
      !student.name ||
      !/^[A-Za-z\s]+$/.test(student.name) ||
      !/^\d{10,}$/.test(student.mobile) ||
      !/^[\w.-]+@[a-zA-Z_]+\.[a-zA-Z]{2,}$/.test(student.email) ||
      !/^\d+$/.test(student.roll) ||
      !/^\d+$/.test(student.id)
    ) {
      alert("Please enter valid details.");
      return;
    }
    const students = JSON.parse(localStorage.getItem("students") || "[]");
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    console.log("Student added successfully:", student);
    e.target.reset();
    drawer.classList.add("translate-x-full");
    allStudent();
  });
});

//add student
function renderHistoryDrawer() {
  const container = document.getElementById("drawer-history");
  container.innerHTML = `
  <form id="student-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Full Name</label>
        <input type="text" name="name" required
          class="mt-1  w-full rounded-md border-gray-300 border  p-3 text-base" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Roll No</label>
        <input type="text" name="roll" required
          class="mt-1 block w-full rounded-md border-gray-300  border  p-3 text-base" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Mobile</label>
        <input type="tel" name="mobile" required
          class="mt-1 block w-full rounded-md border-gray-300 border  p-3 text-base" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" name="email" required
          class="mt-1 block w-full rounded-md border-gray-300 border  p-3 text-base" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Student ID</label>
        <input type="text" name="id" required
          class="mt-1 block w-full rounded-md border-gray-300 border  p-3 text-base" />
      </div>

      <div class="pt-2">
        <button type="submit"
          class="w-full bg-[#6a73fa] text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition">
          Save Student
        </button>
      </div>
    </form>













  `;
}

//student load
function allStudent() {
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const container = document.getElementById("student-data");
  container.innerHTML = students
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((item, id) => {
      return ` <div class="grid grid-cols-6  border-b border-b-gray-300 cursor-pointer">
                     <div class="col-span-1 p-4  text-sm font-medium flex items-center gap-2">
                    <img src="./assests/avatra.jpg" class="h-5 w-5 rounded-md flex items-center" />
                    <div class="col-span-1 text-sm pt-1  text-[#93909d] font-normal flex items-center justify-center">
                        ${item?.name} 
                    </div>
                </div>
                   <div class="col-span-1 p-4 text-[#727b93] font-bold text-sm flex items-center ">
                ${item?.id}
                </div>

                <div class="col-span-1 p-4 text-[#727b93] font-bold text-sm flex items-center  ">
                    ${item?.roll}
                </div>


                <div class="col-span-1 p-4  text-[#888888] text-sm font-bold flex items-center  ">
                    ${item?.mobile}
                </div>
                <div class="col-span-1 p-4  text-sm font-bold text-[#888888] flex items-center">
                    ${item?.email}
                </div>
             
                <div class="col-span-1 p-4 text-sm flex gap-2 items-center justify-center">
                    <div id="edit-button" class="bg-blue-600 h-8 w-8 rounded-md flex items-center justify-center" data-id=${item.id}>
                        <img src="./assests/edit-icon.png" class="h-4 w-4" />
                    </div>
                    <div class="bg-red-600 h-8 w-8 rounded-md flex items-center justify-center " data-id="${item.id}">
                        <img src="./assests/delete-icon.png" class="h-4 w-4" />
                    </div>
                </div></div>`;
    })
    .join("");
}
allStudent();

//edit drawer content
function renderEditHistoryDrawer() {
  const container = document.getElementById("edit-drawer-history");
  container.innerHTML = `
  <form id="edit-student-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Full Name</label>
        <input type="text" name="name" required
          class="mt-1  w-full rounded-md border-gray-300 border  p-3 text-base" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Roll No</label>
        <input type="text" name="roll" required
          class="mt-1 block w-full rounded-md border-gray-300  border  p-3 text-base" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Mobile</label>
        <input type="tel" name="mobile" required
          class="mt-1 block w-full rounded-md border-gray-300 border  p-3 text-base" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" name="email" required
          class="mt-1 block w-full rounded-md border-gray-300 border  p-3 text-base" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Student ID</label>
        <input type="text" name="id" required
          class="mt-1 block w-full rounded-md border-gray-300 border  p-3 text-base" />
      </div>

      <div class="pt-2">
        <button type="submit"
          class="w-full bg-[#6a73fa] text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition">
          Update Student
        </button>
      </div>
    </form>



  `;
}

//edit drawer
document.addEventListener("DOMContentLoaded", function () {
  renderEditHistoryDrawer();
  const editStudentBtn = document.getElementById("edit-button");
  const drawer = document.getElementById("edit-drawer");
  const closeDrawerBtn = document.getElementById("close-edit-drawer");

  editStudentBtn.addEventListener("click", function () {
    drawer.classList.remove("translate-x-full");
  });

  closeDrawerBtn.addEventListener("click", function () {
    drawer.classList.add("translate-x-full");
  });
});

function updateStudentDate(id) {}
