/*
"data": [
    {
        "id": 1,
        "title": "Fix navigation menu on mobile devices",
        "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
        "status": "open",
        "labels": [
            "bug",
            "help wanted"
        ],
        "priority": "high",
        "author": "john_doe",
        "assignee": "jane_smith",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
    },
]
*/
const cardList = document.getElementById('cardList');
const totalCard = document.getElementById('totalCard');
const cardDetail = document.getElementById('card_detail');
const loading = document.getElementById('loading');

const showLoading = () =>{
    loading.classList.remove('hidden');
    cardList.innerHTML = ""
}
const hideLoading = () =>{
    loading.classList.add('hidden');
}

// Get Style
const getLabelClass = (label) => {
    if(label === 'bug') return 'badge-secondary';
    if(label === 'help wanted') return 'badge-warning';
    if(label === 'enhancement') return 'badge-success';
    if(label === 'good first issue') return 'badge-primary';
    return 'badge-error';
}

// Load GitHub All Issue

const loadGitIssue = async () => {
    showLoading()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayGitIssue(data.data);
    hideLoading()
}
loadGitIssue();

// Display Git Issue
const displayGitIssue = (cards) => {
    showLoading();
    document.getElementById('totalCard').textContent = cards.length;
    cards.forEach(card => {
        const div = document.createElement('div');
        div.classList = `card bg-base-100 w-full h-full border-t-3 cursor-pointer ${card.status === 'open' ? 'border-green-500' : 'border-purple-500'} shadow-sm  space-y-2`;
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
    console.log(cardId);
}