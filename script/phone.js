const phoneData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    const data = await res.json()
    const phone = data.data;
    // console.log(phone);
    phoneDisplay(phone);
}
// const phoneDisplay = (phone) =>{
//     for(const mobile of phone){
//         console.log(mobile);
//     }
// }
const phoneDisplay = phone => {
    const phoneCard = document.getElementById('phone-container');
    phone.map(mobile => {
        console.log(mobile);
        const cardDiv = document.createElement('div');
        cardDiv.classList = `card bg-gray-200 `
        cardDiv.innerHTML = `
        <figure><img class="text-center pt-24" src="${mobile.image}" alt="" /></figure>
            <div class="card-body">
              <h2 class="text-center text-3xl">${mobile.phone_name}</h2>
              <p class="text-center">There are many variations of passages of available, but the majority have suffered</p>
              <p class="text-center">$999</p>
              <div class="card-actions justify-center">
                <button class="btn btn-accent text-black">Buy Now</button>
              </div>
            </div>
        `
        phoneCard.appendChild(cardDiv)
    })
}
phoneData();