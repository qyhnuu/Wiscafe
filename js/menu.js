// search menu

function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

// api menu

fetch("http://localhost:3000/milkteas")
  .then((response) => response.json())
  .then((data) => {
    const tea = document.getElementById("milktea");
    tea.innerHTML = data
      .map(
        (item) =>
          `<div
                class="flex flex-col justify-center items-center gap-3 bg-[#FBF7F2]">
                <div class="w-full h-full rounded-tr-2xl rounded-tl-2xl">
                <img
                    src="${item.img}"
                    alt=""
                    class="w-full h-full rounded-tr-2xl rounded-tl-2xl" />
                </div>
                <h2 class="font-semibold text-tile">${item.title}</h2>
                ${
                  item.status == 1
                    ? `
                    <div class="w-full px-[10px] py-[20px]">
                <button
                data-id="${item.id}"
                    class="btnAction bg-primary outline-none rounded-xl py-[8px] font-semibold text-sm w-full text-[#FFF]">
                    Đặt trước
                </button>
                </div>`
                    : `        <span class="text-[#6E7191] text-[11px] font-medium"
                    >(Đã đặt)</span
                  >
                  <div class="w-full px-[10px] py-[20px]">
                    <button
                      class="bg-[#F2F2F2] outline-none rounded-xl py-[8px] font-semibold text-sm w-full text-[#BDBDBD]">
                      Đặt trước
                    </button>
                  </div>`
                }
            </div>`
      )
      .join("");
    const searchMenu = document.getElementById("search_menu");
    searchMenu.addEventListener("keyup", (e) => {
      console.log(1);
      const newArr = data.filter((item) =>
        removeAccents(item.title.toLowerCase()).includes(
          removeAccents(e.target.value.toLowerCase())
        )
      );
      if (newArr.length > 0) {
        const tea = document.getElementById("milktea");
        tea.innerHTML = newArr
          .map(
            (item) => `<div
                class="flex flex-col justify-center items-center gap-3 bg-[#FBF7F2]">
                <div class="w-full h-full rounded-tr-2xl rounded-tl-2xl">
                <img
                    src="${item.img}"
                    alt=""
                    class="w-full h-full rounded-tr-2xl rounded-tl-2xl" />
                </div>
                <h2 class="font-semibold text-tile">${item.title}</h2>
                ${
                  item.status == 1
                    ? `
                    <div class="w-full px-[10px] py-[20px]">
                <button
                data-id="${item.id}"
                    class="btnAction bg-primary outline-none rounded-xl py-[8px] font-semibold text-sm w-full text-[#FFF]">
                    Đặt trước
                </button>
                </div>`
                    : `        <span class="text-[#6E7191] text-[11px] font-medium"
                    >(Đã đặt)</span
                  >
                  <div class="w-full px-[10px] py-[20px]">
                    <button
                      class="bg-[#F2F2F2] outline-none rounded-xl py-[8px] font-semibold text-sm w-full text-[#BDBDBD]">
                      Đặt trước
                    </button>
                  </div>`
                }
            </div>`
          )
          .join("");
      } else {
        const tea = document.getElementById("milktea");
        tea.innerHTML = newArr
          .map(
            (item) => `<div
                class="flex flex-col justify-center items-center gap-3 bg-[#FBF7F2]">
                <div class="w-full h-full rounded-tr-2xl rounded-tl-2xl">
                <img
                    src="${item.img}"
                    alt=""
                    class="w-full h-full rounded-tr-2xl rounded-tl-2xl" />
                </div>
                <h2 class="font-semibold text-tile">${item.title}</h2>
                ${
                  item.status == 1
                    ? `
                    <div class="w-full px-[10px] py-[20px]">
                <button
                data-id="${item.id}"
                    class="btnAction bg-primary outline-none rounded-xl py-[8px] font-semibold text-sm w-full text-[#FFF]">
                    Đặt trước
                </button>
                </div>`
                    : `        <span class="text-[#6E7191] text-[11px] font-medium"
                    >(Đã đặt)</span
                  >
                  <div class="w-full px-[10px] py-[20px]">
                    <button
                      class="bg-[#F2F2F2] outline-none rounded-xl py-[8px] font-semibold text-sm w-full text-[#BDBDBD]">
                      Đặt trước
                    </button>
                  </div>`
                }
            </div>`
          )
          .join("");
      }
    });

    const btns = document.querySelectorAll(".btnAction");
    btns.forEach((element) => {
      const { id } = element.dataset;
      element.addEventListener("click", () => {
        fetch("http://localhost:3000/milkteas/" + id, {
          method: "PATCH", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: 2,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // alert("Đặt thành công !!");
          })
          .catch((error) => {
            // alert("Đặt thất bại !!");
          });
      });
    });
  });
