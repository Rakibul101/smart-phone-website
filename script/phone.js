const phoneData = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phone = data.data;
    phoneDisplay(phone, isShowAll);
}


const phoneDisplay = (phone, isShowAll) => {
    const phoneCard = document.getElementById('phone-container');
    phoneCard.textContent = '';
    // display show all button and hidden condition
    const showAllContainer = document.getElementById('show-all-container');
    if(phone.length>12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll);
    // display only 12 phone data
    if(!isShowAll){
        phone = phone.slice(0,12);
    }
    phone.map(mobile => {
        // console.log(mobile);
        const cardDiv = document.createElement('div');
        cardDiv.classList = `card bg-gray-200 `
        cardDiv.innerHTML = `
        <figure><img class="text-center pt-24" src="${mobile.image}" alt="" /></figure>
            <div class="card-body">
              <h2 class="text-center text-3xl">${mobile.phone_name}</h2>
              <p class="text-center">There are many variations of passages of available, but the majority have suffered</p>
              <p class="text-center">$999</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${mobile.slug}')" class="btn btn-accent text-black">Show Details</button>
              </div>
            </div>
        `
        phoneCard.appendChild(cardDiv)
    })
    toggleLoadingSpinner(false);
}

const handleShowDetails = async(id) =>{
    console.log('click show details', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data);
    const mobile = data.data;
    handlePhoneDetails(mobile)
}

const handlePhoneDetails = (mobile) =>{
    console.log(mobile);

    // const phoneName = document.getElementById('phone-details');
    // phoneName.innerText = mobile.name;
    const phoneDetailsContainer = document.getElementById('show-details-container');
    phoneDetailsContainer.innerHTML = `
    <img src="${mobile.image}" alt=""/>
    <h2 class="text-2xl font-bold"><span>Phone Name:</span>${mobile.name}</h2>
    <p><span>Storage:</span>${mobile?.
        mainFeatures?.storage}</p>
        <p><span>Display Size:</span>${mobile?.mainFeatures?.displaySize
        }</p>
        <p><span>Chip Set:</span>${mobile?.mainFeatures?.chipSet

        }</p>
        <p><span>Memory:</span>${mobile?.mainFeatures?.
            memory

        }</p>
        <p><span>Slug:</span>${mobile?.slug}</p>
        <p><span>Release Date:</span>${mobile?.releaseDate}</p>
        <p><span>GPS:</span>${mobile?.others?.GPS}</p>
    `
    // display details mobile data
    show_details_modal.showModal();
}

// handleSearchButton
const handleSearch = (isShowAll) =>{
    // console.log("OK Show ALL");
    toggleLoadingSpinner(true);
    searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    phoneData(searchText, isShowAll);
}

const toggleLoadingSpinner= (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spiner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}
const handleShowAll = () =>{
    handleSearch (true);
}
phoneData();