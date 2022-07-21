import { fetchMovieAvailability, fetchMovieList } from "./api.js"


window.slectedSeats = []
window.moiveseat = async function (name) {

    let seats = await fetchMovieAvailability(name)
    document.getElementById('booker-grid-holder').style.visibility = 'visible'
    if (Array.isArray(seats)) {
        let ele = document.querySelector("div#booker h3").classList.toggle("v-none")
    }
    let curr_node
    for (let i = 0; i < 24; i++) {
        curr_node = document.getElementById("booking-grid-" + (i + 1))
        curr_node.className = "";
        if (seats.includes(i + 1)) {
            curr_node.classList.add('available-seat')
        }
        else {
            curr_node.classList.add('unavailable-seat')
        }

    }

}
    
window.selectseat = function (e) {
    if (e.target.classList.contains("unavailable-seat")) {
        return

    }
    else if (e.target.classList.contains("available-seat")) {
        let seat_no = e.target.innerHTML
        if (window.slectedSeats.includes(seat_no)) {
            window.slectedSeats.splice(window.slectedSeats.indexOf(seat_no), 1)
        }
        else {
            window.slectedSeats.push(seat_no)
        }
  
        e.target.classList.toggle("selected-seat")
        if( window.slectedSeats.length){
            document.getElementById("book-ticket-btn").classList.remove("v-none")

        }
        else{
            document.getElementById("book-ticket-btn").classList.add("v-none")

        }
    }

}
window.confirmseat=function(){
    document.getElementById("booker").innerHTML=`<div id="confirm-purchase">Confirm your booking for seat numbers:${slectedSeats.join(", ")}
    <form id="customer-detail-form" onsubmit="moviedate(event)">
        <label for="email">Email</label>
        <input type="email" name="email" required> <br></br>
        <label for="number">Phone number</label>
        <input type="tel" name="number" required><br></br>
        <button type="submit" >Purchase</button>

    </form>
</div>`
}

window.moviedate=function(event){
    const formData = new FormData(event.target)
    let email='', phone=''
    for (var pair of formData.entries()) {
        if(pair[0]=='email'){
            email=pair[1]
        }
        if(pair[0]=='number'){
            phone=pair[1]
        }
    }    
    document.getElementById("booker").innerHTML=`<div id="Success">
    <h3>Booking details</h3>
    <p>Seats:${slectedSeats.join(",")}</p>
    <p>Phone number:${phone}</p>
    <p>Email:${email}</p>
</div>
`
}

window.onload = async function () {
    let innerHTml = ''
    let movieList = await fetchMovieList()
    for (let i = 0; i < movieList.length; i++) {
        //imgUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLCqM8Ispa4waG8tNLPdy6rtiJFOEZUZxdzP-y_BQzfgo953Gb"
        //name: "21 Jump Street"

        innerHTml += `<a onclick="moiveseat('${movieList[i].name}')" class="movie-link" href="javascript:;">
        <div class="movie" data-d="${movieList[i].name}">
            <div class="movie-img-wrapper" style="background-image: url(${movieList[i].imgUrl}); background-size: cover">
            </div>
            <h4>${movieList[i].name}</h4>
            </div>
         </a>`
    }
    document.getElementById("loader").remove()
    document.getElementById('movie-holder').innerHTML = innerHTml
};








