fetch("http://localhost:3000/milkteas?status=2")
  .then((response) => response.json())
  .then((data) => {
    const hoadon = document.getElementById("hoa_don");
    hoadon.innerHTML = data
      .map(
        (item, index) => `
      <div class="flex justify-between items-start gap-4 py-4 px-2 md:px-8 bg-[#FBF7F2] rounded-xl">
            <span class="font-semibold text-[#333333]">${index + 1}</span>
            <span class="font-semibold text-[#333333] w-[120px]">${
              item.title
            }</span>
            <span class="font-semibold text-[#333333]">1</span>
            <div class="flex flex-col justify-end items-end gap-3">
                <span class="font-semibold text-[#333333]">${item.price}đ</span>
                <button
                data-id="${
                  item.id
                }" class="btnDelete bg-[#E0AF7E] outline-none rounded-xl text-[#FFF] font-semibold w-full py-3 px-10">
                Xóa
                </button>
            </div>
            </div>
        `
      )
      .join("");

    const sum = data.map((item) => +item.price).reduce((a, b) => a + b, 0);
    document.getElementById(
      "sum_hoa_don"
    ).innerHTML = `<span class="text-primary font-semibold">Tổng cộng: ${sum} VNĐ</span>`;

    const btnDelete = document.querySelectorAll(".btnDelete");
    btnDelete.forEach((element) => {
      const { id } = element.dataset;
      element.addEventListener("click", () => {
        fetch("http://localhost:3000/milkteas/" + id, {
          method: "PATCH", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: 1,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // alert("Xóa thành công !!");
          })
          .catch((error) => {
            // alert("Xóa thất bại !!");
          });
      });
    });
  });
