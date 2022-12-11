fetch("http://localhost:3000/staffs")
  .then((response) => response.json())
  .then((data) => {
    render(data);
  });

function render(data) {
  const divStaff = document.getElementById("staffs");
  divStaff.innerHTML = `
    <div
        class="flex justify-around items-center py-6 border-b-[1px] border-[#E0E0E0] flex-wrap gap-4">
        <span class="font-semibold text-sm text-[#BDBDBD]">Số thứ tự</span>
        <span class="font-semibold text-sm text-[#BDBDBD]">Họ tên</span>
        <span class="font-semibold text-sm text-[#BDBDBD]">Ngày sinh</span>
        <span class="font-semibold text-sm text-[#BDBDBD]">Số điện thoại</span>
    </div>
    <div class="grid grid-cols-1 gap-y-4 px-4 py-4">
        ${data
        .map(
            (item) => `
        <div
        class="flex justify-between items-start gap-4 py-4 px-2 md:px-8 bg-[#FBF7F2] rounded-xl flex-wrap md:flex-nowrap">
        <span class="font-semibold text-[#333333]">${item.id}</span>
        <span class="font-semibold text-[#333333] w-[160px]">${item.name}</span>
        <span class="font-semibold text-[#333333]">${item.birthday}</span>
        <div class="flex flex-col justify-end items-end gap-3">
            <span class="font-semibold text-[#333333]">${item.phonenumber}</span>
            
        </div>
    </div>
        
        `).join("")}
    </div>`;
    // <button
    //   data-id="${item.id}"
    //   class="btnRemoveStaff bg-[#E0AF7E] outline-none rounded-xl text-[#FFF] font-semibold w-full py-3 px-10">
    //   Xóa
    // </button>;
  const btnRemoveStaffs = document.querySelectorAll(".btnRemoveStaff");

  btnRemoveStaffs.forEach((btn) => {
    const { id } = btn.dataset;
    btn.addEventListener("click", (e) => {
      fetch("http://localhost:3000/staffs/" + id, {
        method: "DELETE", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data1) => {
          alert("Xóa nhân viên thành công");
        })
        .catch((error) => {
          alert("Xóa nhân viên thất bại");
        });
    });
  });
}
