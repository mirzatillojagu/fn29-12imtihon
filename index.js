function addJob() {
    const logoURL = document.getElementById("logoURL").value || './images/img.png'; // Agar URL bo'sh bo'lsa, asosiy rasmni oladi
    const companyName = document.getElementById("companyName").value;
    const position = document.getElementById("position").value;
    const isNew = document.getElementById("new").checked;
    const isFeatured = document.getElementById("featured").checked;
    const time = document.getElementById("time").value;
    const type = document.getElementById("type").value;
    const location = document.getElementById("location").value;
    const skills = [
        { id: "fullstack", label: "Fullstack" },
        { id: "python", label: "Python" },
        { id: "midweight", label: "Midweight" },
        { id: "react", label: "React" },
    ].filter(skill => document.getElementById(skill.id).checked).map(skill => skill.label);

    const job = { id: Date.now(), logoURL, companyName, position, isNew, isFeatured, time, type, location, skills };

    saveJob(job);
    displayJob(job);

    document.getElementById("jobForm").reset(); 
}

function saveJob(job) {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || []; 
    jobs.push(job); 
    localStorage.setItem("jobs", JSON.stringify(jobs)); 
}

function loadJobs() {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || []; 
    jobs.forEach(job => displayJob(job)); 
}

function displayJob(job) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-id", job.id);

    card.innerHTML = `
        <img src="${job.logoURL}" alt="${job.companyName} logotipi" class="logo">
        <div class="card-content">
            <h3 class="company-name">${job.companyName}</h3>
            <p class="position">${job.position}</p>
            <div class="tags">
                ${job.isNew ? '<span class="tag new">YANGI!</span>' : ''}
                ${job.isFeatured ? '<span class="tag featured">FEATURED</span>' : ''}
                ${job.time ? `<span class="start">${job.time}</span>` : ''}
                ${job.type ? `<span class="start">${job.type}</span>` : ''}
                ${job.location ? `<span class="start">${job.location}</span>` : ''}
                ${job.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
            </div>
            <button class="delete-btn" onclick="deleteJob(${job.id})">ochirish</button>
        </div>
    `;

    

    document.getElementById("jobCards").appendChild(card); 
}

function deleteJob(id) {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs = jobs.filter(job => job.id !== id); 
    localStorage.setItem("jobs", JSON.stringify(jobs)); 
    const card = document.querySelector(`.card[data-id='${id}']`);
    if (card) {
        card.remove();
    }
}

window.onload = loadJobs; 
