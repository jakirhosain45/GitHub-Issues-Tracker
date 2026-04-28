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
    <div class="bg-white rounded-md h-full p-3  space-y-2  shadow-md ${data.status === 'closed' ? 'border-t-4 border-t-[#A855F7]' : 'border-t-4 border-t-[#6dc98b]'}">
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