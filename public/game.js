
$(document).ready(() => {
    $("#start").on("click", setUp);

})


hasFlippedCard = false;
firstCard = undefined
secondCard = undefined
function clickCard() {

    $(".card").on("click", function () {
        $(this).toggleClass("flip");

        if(!hasFlippedCard){
            firstCard = $(this).find('.frontface')[0]
            hasFlippedCard = true;
        }else{
            // 2nd card
            secondCard =  $(this).find('.frontface')[0]
            console.log(firstCard, secondCard);
            hasFlippedCard = false;

            if(
                $(`#${firstCard.id}`)
                ===
                $(`#${secondCard.id}`)
                )
            {
                console.log("A Match!");
                // inc a global 
                // disable cards
            }else{
                console.log("Not A Match!");
                setTimeout(() => {
                    $(this).toggleClass("flip");
                    $(firstCard.parentElement).toggleClass("flip");
                }, 1000)
                
            }
        }
    })
}



function setUp() {
    console.log("something");


    var cardList = [];

    var numPoke = $("#pokemon").val();
    var height = $("#height").val();
    var width = $("#width").val();
    $(".center").remove();
    if((Number(height) * Number(width)) != Number(numPoke)) {
        return
    }

    for(var x = 0; x < (Math.floor(Number(numPoke) / 2) + 1); x++) {

        var random = Math.floor(Math.random() * 900);

        cont = document.createElement("div");

        front = document.createElement("img");
        front.srcset = "/card.jpg"
        front.classList.add("backface");

        back = document.createElement("img");
        back.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${random}.png`;
        back.classList.add("frontface");
        back.setAttribute("id", random);

        cont.classList.add("card");
        cont.appendChild(back);
        cont.appendChild(front);        


        cont.style.width = `${Math.floor(100/width)}%`;

        cont.setAttribute("id", random);
        cardList.push(`
        <div class="card" style="width: ${Math.floor(100/width)}%;">
            <img src=${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${random}.png`} class="frontface" id="${random}">
            <img src='/card.jpg' class="backface">
        </div>
        `)
        cardList.push(`
        <div class="card" style="width: ${Math.floor(100/width)}%;">
            <img src=${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${random}.png`} class="frontface" id="${random}">
            <img src='/card.jpg' class="backface">
        </div>
        `)

    }
    
    cardList = shuffle(cardList);
    for(var x = 0; x < cardList.length; x++) {
        $("#game-cont").append(cardList[x]);
    }

    clickCard();

}

function shuffle(arr) {
    for(var x = 0; x < arr.length; x++) {
        var place = Math.floor(Math.random() * (x + 1));
        var temp = arr[x];
        arr[x] = arr[place];
        arr[place] = temp;
    }
    return arr
}