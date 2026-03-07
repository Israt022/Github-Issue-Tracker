const cardList = document.getElementById('cardList');
const totalCard = document.getElementById('totalCard');
const cardDetail = document.getElementById('card_detail');
const loading = document.getElementById('loading');

const searchInput = document.getElementById('search');


const showLoading = () =>{
    loading.classList.remove('hidden');
    cardList.innerHTML = ""
}
const hideLoading = () =>{
    loading.classList.add('hidden');
}

// Load GitHub All Issue
let allIssue = [];
const loadGitIssue = async () => {
    showLoading()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssue = data.data;
    displayGitIssue(allIssue);
    hideLoading()
}
loadGitIssue();

const selectButton = (id) =>{
    showLoading();
    const buttons = ["allBtn","openBtn","closeBtn"];

    buttons.forEach(btn => {
        const button = document.getElementById(btn);
        button.classList.remove('btn-primary');
        button.classList.add('text-gray-500');
    });

    const activeBtn = document.getElementById(id);
    activeBtn.classList.add('btn-primary');
    activeBtn.classList.remove('text-gray-500');

    if(id === 'allBtn'){
        displayGitIssue(allIssue);
    }
    if (id === 'openBtn'){
        const openIssue = allIssue.filter(issue => issue.status === 'open');
        document.getElementById('totalCard').textContent = openIssue.length;
        displayGitIssue(openIssue);
    }
    if(id === 'closeBtn'){
        const closeIssue = allIssue.filter(issue => issue.status === 'closed');
        document.getElementById('totalCard').textContent = closeIssue.length;
        displayGitIssue(closeIssue);
    }
}

// Display Git Issue
const displayGitIssue = (cards) => {
    showLoading();
    document.getElementById('totalCard').textContent = cards.length;
    cards.forEach(card => {
        const div = document.createElement('div');
        div.classList = `card bg-base-100 hover:bg-base-200 w-full h-full border-t-3 cursor-pointer ${card.status === 'open' ? 'border-green-500' : 'border-purple-500'} shadow-sm  space-y-2 transition transform duration-300 hover:scale-105`;
        div.onclick = () => cardDetails(card.id);
        div.innerHTML = `
            <!--Starting-->
            <div class="flex justify-between px-4 pt-4
             
            ">
                <img
                    class="w-[24px] h-[24px]"
                    src="${card.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png'}"
                    alt=""
                >
                <div class="badge badge-soft ${card.priority === "high" ? 'badge-secondary' : card.priority === "medium" ? 'badge-warning' : 'badge-info'} rounded-xl">
                    ${card.priority.toUpperCase()}
                </div>
            </div>
            <!--Middle-->
            <div class=" text-start space-y-3 p-4">
                <h2 class="text-sm font-semibold" onclick="cardDetails(${card.id})">
                    ${card.title}
                </h2>
                <p class="line-clamp-2 text-xs text-gray-400">
                    ${card.description}
                </p>
                <div class="flex flex-wrap gap-1 justify-start">
                    ${card.labels.map(label =>
                        `<div 
                            class="badge badge-soft ${
                                label === 'bug' 
                                ? 'badge-secondary'
                                : label === 'help wanted' 
                                ? 'badge-warning'
                                : label === 'enhancement'
                                ? 'badge-success'
                                : label === 'good first issue'
                                ? 'badge-primary'
                                : 'badge-error'
                            }
                            rounded-xl"
                        >
                            <i class="${
                                label === 'bug' 
                                ? 'fa-solid fa-bug'
                                : label === 'help wanted' 
                                ? 'fa-regular fa-life-ring'
                                : label === 'enhancement'
                                ? 'fa-regular fa-star'
                                : label === 'good first issue'
                                ? 'fa-solid fa-clover'
                                : 'fa-solid fa-triangle-exclamation'
                            }"></i>
                            
                            ${label.toUpperCase()}
                        </div>
                    `).join("")}
                </div>
            </div>

            <hr class="m-0 text-gray-300">
            <div class="p-4 space-y-1">
                <p class="text-xs text-gray-500">#${card.id} by ${card.author}</p>
                <p class="text-xs text-gray-500">${new Date(card.createdAt).toLocaleDateString()}</p>
            </div>
        `
        cardList.append(div);
    });
    hideLoading();
    // console.log(cards.length);
}

const  cardDetails = async (cardId) => {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`)
    const data = await res.json();
    const card = data.data;
    document.getElementById("detail-title").innerText = card.title;
    document.getElementById("detail_status").innerText = card.status;
    document.querySelectorAll(".assignee").forEach(el => {
        el.textContent = card.assignee.toUpperCase();
    });
    document.getElementById("createdAt").textContent = new Date(card.createdAt).toLocaleDateString();
    document.getElementById("priority").innerHTML = `
        <div class="badge badge-soft ${card.priority === "high" ? 'badge-secondary' : card.priority === "medium" ? 'badge-warning' : 'badge-info'} rounded-xl">
            ${card.priority.toUpperCase()}
        </div>
    `

    const labelContainer = document.getElementById("label");
    labelContainer.innerHTML = `
    ${card.labels.map(label =>
            `<div 
                class="badge badge-soft ${
                    label === 'bug' 
                    ? 'badge-secondary'
                    : label === 'help wanted' 
                    ? 'badge-warning'
                    : label === 'enhancement'
                    ? 'badge-success'
                    : label === 'good first issue'
                    ? 'badge-primary'
                    : 'badge-error'
                }
                rounded-xl"
            >
                <i class="${
                    label === 'bug' 
                    ? 'fa-solid fa-bug'
                    : label === 'help wanted' 
                    ? 'fa-regular fa-life-ring'
                    : label === 'enhancement'
                    ? 'fa-regular fa-star'
                    : label === 'good first issue'
                    ? 'fa-solid fa-clover'
                    : 'fa-solid fa-triangle-exclamation'
                }"></i>
                
                ${label.toUpperCase()}
            </div>
        `).join("")}
    `
    cardDetail.showModal();
}

searchInput.addEventListener('keydown', async(e) => {
    if(e.key === "Enter"){
        const value = searchInput.value.trim().toLowerCase();
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`);
        const data = await res.json();

        const buttons = ["allBtn","openBtn","closeBtn"];

        buttons.forEach(btn => {
            const button = document.getElementById(btn);
            button.classList.remove('btn-primary');
            button.classList.add('text-gray-500');
        });
        if(data.data.length === 0){
            cardList.innerHTML = "";
            document.getElementById('noData').classList.remove('hidden');
        }else{
            document.getElementById('noData').classList.add('hidden');
            displayGitIssue(data.data);
        }
    }
})