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

fetch("http://localhost:3000/tables")
  .then((response) => response.json())
  .then((data) => {
    const div = document.getElementById("tables");
    div.innerHTML = data
      .map(
        (item) => `
       <div
       class="flex flex-col justify-center items-center gap-3 bg-[#FBF7F2] divTable" data-index="${
         item.id
       }">
       <div class="w-full h-full rounded-tr-2xl rounded-tl-2xl">
         <img
           src="${item.img}"
           alt=""
           class="w-full h-full rounded-tr-2xl rounded-tl-2xl" />
       </div>
       <h2 class="font-semibold text-tile">${item.title}</h2>
        ${
          item.status
            ? `
        <div class="w-full px-[10px] py-[20px]">
        <button
           data-id="${item.id}"
          class="btnAction bg-primary outline-none rounded-xl py-[8px] font-semibold text-sm w-full text-[#FFF]">
          Đặt trước
        </button>
      </div>
        `
            : `
        <span class="text-[#6E7191] text-[11px] font-medium"
        >(đã có người đặt)</span
      >
      <div class="w-full px-[10px] py-[20px]">
        <button
          class="bg-[#F2F2F2] outline-none rounded-xl py-[8px] font-semibold text-sm w-full text-[#BDBDBD]">
          Đặt trước
        </button>
      </div>    
        `
        }
    
     </div>
       
       `
      )
      .join("");
    const searchTable = document.getElementById("searchTable");

    searchTable.addEventListener("keyup", (e) => {
      const newArr = data.filter((item) =>
        removeAccents(item.title.toLowerCase()).includes(
          removeAccents(e.target.value.toLowerCase())
        )
      );
      if (newArr.length > 0) {
        const div = document.getElementById("tables");
        div.innerHTML = newArr
          .map(
            (item) => `
            <div
            class="flex flex-col justify-center items-center gap-3 bg-[#FBF7F2] divTable" data-index="${
              item.id
            }">
            <div class="w-full h-full rounded-tr-2xl rounded-tl-2xl">
              <img
                src="${item.img}"
                alt=""
                class="w-full h-full rounded-tr-2xl rounded-tl-2xl" />
            </div>
            <h2 class="font-semibold text-tile">${item.title}</h2>
             ${
               item.status
                 ? `
             <div class="w-full px-[10px] py-[20px]">
             <button
                data-id="${item.id}"
               class="btnAction bg-primary outline-none rounded-xl py-[8px] font-semibold text-sm w-full text-[#FFF]">
               Đặt trước
             </button>
           </div>
             `
                 : `
             <span class="text-[#6E7191] text-[11px] font-medium"
             >(đã có người đặt)</span
           >
           <div class="w-full px-[10px] py-[20px]">
             <button
               class="bg-[#F2F2F2] outline-none rounded-xl py-[8px] font-semibold text-sm w-full text-[#BDBDBD]">
               Đặt trước
             </button>
           </div>    
             `
             }
          </div>
            
            `
          )
          .join("");
      } else {
        const div = document.getElementById("tables");
        div.innerHTML = data
          .map(
            (item) => `
            <div
            class="flex flex-col justify-center items-center gap-3 bg-[#FBF7F2] divTable" data-index="${
              item.id
            }">
            <div class="w-full h-full rounded-tr-2xl rounded-tl-2xl">
              <img
                src="${item.img}"
                alt=""
                class="w-full h-full rounded-tr-2xl rounded-tl-2xl" />
            </div>
            <h2 class="font-semibold text-tile">${item.title}</h2>
             ${
               item.status
                 ? `
             <div class="w-full px-[10px] py-[20px]">
             <button
                data-id="${item.id}"
               class="btnAction bg-primary outline-none rounded-xl py-[8px] font-semibold text-sm w-full text-[#FFF]">
               Đặt trước
             </button>
           </div>
             `
                 : `
             <span class="text-[#6E7191] text-[11px] font-medium"
             >(đã có người đặt)</span
           >
           <div class="w-full px-[10px] py-[20px]">
             <button
               class="bg-[#F2F2F2] outline-none rounded-xl py-[8px] font-semibold text-sm w-full text-[#BDBDBD]">
               Đặt trước
             </button>
           </div>    
             `
             }
         
          </div>
            
            `
          )
          .join("");
      }
    });
    const btns = document.querySelectorAll(".btnAction");

    btns.forEach((element) => {
      const { id } = element.dataset;
      element.addEventListener("click", (e) => {
        let cartTable = [];
        e.preventDefault();
        if (localStorage.getItem("cartTable")) {
          cartTable = JSON.parse(localStorage.getItem("cartTable"));
        }
        try {
          cartTable.push(id);
          localStorage.setItem("cartTable", JSON.stringify(cartTable));
          fetch("http://localhost:3000/tables/" + id, {
            method: "PATCH", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: 0,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              alert("Đặt bàn thành công !!");
            })
            .catch((error) => {
              alert("Đặt bàn thất bại !!");
            });
        } catch (error) {
          alert("Đặt bàn thất bại !!");
        }
      });
    });
  });
