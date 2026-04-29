const cardContainer =document.getElementById('cardContainer');
const loading =document.getElementById('loading');
let isloading =true;
const buttons =document.querySelectorAll('.filter-btn');
const totalcount= document.getElementById('totalcount')
const searchIssues= document.getElementById('searchIssues')
const searchbtn= document.getElementById('searchbtn')



const fetchdata = (status) =>{
    isloading = true;
    loading.style.display = "flex"
    
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res)=>res.json())
    .then((data) =>{
       if(status){
        if(status === 'all'){
            displayloadData(data.data)
            isloading = false;
            loading.style.display = 'none';
            return
        }
        
        const filterdata =data.data.filter((filtaring)=>filtaring.status === status);
        loading.style.display = 'none';
        displayloadData(filterdata);
        return
        
        
       }
        displayloadData(data.data);
        isloading =false;
        loading.style.display = "none"
    });

}
const displayloadData =(datas)=>{
    cardContainer.innerHTML ="";
    totalcount.innerHTML =`${datas.length}`
   datas.forEach(data => {
    
    const div =document.createElement('div');
    div.innerHTML = `
    <div onclick="document.getElementById('modal-${data.id}').showModal()" class="bg-white rounded-md h-full p-3 hover:cursor-pointer space-y-2  shadow-md ${data.status === 'closed' ? 'border-t-4 border-t-[#A855F7]' : 'border-t-4 border-t-[#6dc98b]'}">
                    <div class="flex items-center justify-between">
                        ${data.status === 'open'? `<img class="w-10" src="./img/Open-Status.png" alt=""></img>`:`<img class="w-10" src="./img/Closed- Status .png" alt="">`}
                        <h2 class=" px-5 py-2 rounded-full font-semibold  ${data.priority === "high" ? "bg-[#FEECEC] text-red-500" : data.priority === "medium" ? 'bg-[#FDE68A] text-amber-600' : "bg-[#9CA3AF] text-gray-300"}">${data.priority}</h2>
                    </div>
                    <h1 class="text-xl font-bold">${data.title}</h1>
                    <p class="text-gray-400 line-clamp-2">${data.description}</p>
                    <div class="flex items-center gap-2 pb-2">
                        <button class="p-2 rounded-2xl bg-red-100 text-red-500 font-semibold">${data.labels?.[0] || ""}</button>
                        ${data.labels?.[1] ?`
                            <button class="p-2 rounded-2xl bg-[#FDE68A] text-red-500 font-semibold"> ${data.labels[1]}<button/>`: ""}
                    </div>

                    <hr class="text-gray-300">
                    <p class="text-gray-400">${data.author}</p>
                    <p class="text-gray-400">1/15/2024</p>
                </div>



                
<dialog id="modal-${data.id}" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <div class="space-y-4">
        <h1 class="text-2xl font-bold">${data.title}</h1>
        <div class="sm:flex items-center gap-2">
            <div>
                <button class="btn bg-green-600 font-semibold text-white">${data.status}</button>
            </div>
            <div class="flex items-center gap-1">
                <h1 class="bg-gray-400 rounded-full w-2 h-2"></h1>
                <h1 class="text-gray-400">Opened by <span>${data.author}</span></h1>
            </div>
            <div class="flex items-center gap-2">
                <h1 class="w-2 h-2 bg-gray-400 rounded-full"></h1>
                <h1 class="text-gray-400">22/02/2026</h1>
            </div>
        </div>

        <div class="flex items-center gap-2">
             <button class="p-2 rounded-2xl bg-red-100 text-red-500 font-semibold">${data.labels?.[0] || ""}</button>
                        ${data.labels?.[1] ?`
                            <button class="p-2 rounded-2xl bg-[#FDE68A] text-red-500 font-semibold"> ${data.labels[1]}<button/>`: ""}
        </div>
        <p class="text-gray-400">${data.description}</p>
        <div class="flex bg-[#F8FAFC] p-4 rounded-md justify-evenly">
            <div>
                <h1 class="text-gray-400">Assignee:</h1>
                <h1 class="font-semibold">${data.author}</h1>
            </div>
            <div>
                <h1 class="text-gray-400">Priority:</h1>
                <button class=" bg-red-600  text-white rounded-full px-3 py-1font-semibold">${data.priority}</button>
            </div>
        </div>

    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    `
  cardContainer.append(div)
   });

}

buttons.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        buttons.forEach(b => {
            b.classList.remove('bg-[#4A00FF]', 'text-white');
        });
        e.currentTarget.classList.add('bg-[#4A00FF]', 'text-white')
        const status =e.currentTarget.value;
        fetchdata(status)
        
        
        
    });
});

const handelsearch = (searchvalue) =>{
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchvalue}`)
    .then((res) => res.json())
    .then((data )=> displayloadData(data.data)
    )
} 

searchbtn.addEventListener('click', () =>{
    const searchissues = searchIssues.value;
    handelsearch(searchissues);
    
})

fetchdata()