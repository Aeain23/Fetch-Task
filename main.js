import "./style.css";

const fetchBtn = document.querySelector("#fetchBtn");
const firstData = document.querySelector("#firstData");
firstData.classList.add("hidden");
const handleFetchBtn = () => {
  console.log("u click");
  firstData.classList.remove("hidden");
  //   fetch("http://localhost:5000/tasks").then((res) =>
  //  res.text().then((data)=>
  //   {
  //     console.log("data",typeof data);
  //     //json string => js object
  //     console.log(JSON.parse(data));
  //   } )
  //   );
  // console.log(res.then((data)=> console.log(data)));
  fetch("http://localhost:5000/tasks")
    .then((res) => res.json())
    .then((data) => {
      const statusClassMap = {
        "Completed": "bg-green-400 text-green-800",
        "In Progress": "bg-yellow-400 text-yellow-800",
        "Not Started": "bg-red-400 text-red-800",
      };
      document.querySelector("#tasksTableBody").innerHTML = '';
      data.forEach(task =>{
        const row = document.createElement('tr');
        row.className = 'bg-white border-b';
        row.innerHTML = `
       <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          ${task.title}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${task.description}
        </td>
               <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full${statusClassMap[task.status]}">
               ${task.status}
                </span>
         
        </td>
        `;
        document.querySelector("#tasksTableBody").appendChild(row);
      });
      document.querySelector('#tasksTable').classList.remove('hidden');
      document.querySelector('#noData').classList.add('hidden');
    }).catch(error => console.error('Error fetching tasks:', error));;
};
fetchBtn.addEventListener("click", handleFetchBtn);
