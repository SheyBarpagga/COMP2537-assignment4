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
            firstCard = $(this).find('.front_face')[0]
            // console.log(firstCard);
            hasFlippedCard = true;
        }else{
            // 2nd card
            secondCard =  $(this).find('.front_face')[0]
            console.log(firstCard, secondCard);
            hasFlippedCard = false;

            if(
                $(`#${firstCard.id}`).attr("src") 
                == 
                $(`#${secondCard.id}`).attr("src")
                )
            {
                console.log("A Match!");
                // inc a global 
                // disable cards
            }else{
                console.log("Not A Match!");
                // unflip cards
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
        front.classList.add("frontface");

        back = document.createElement("img");
        back.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${random}.png`;
        back.classList.add("backface");

        cont.classList.add("card");
        cont.appendChild(front);
        cont.appendChild(back);

        cont.style.width = `${Math.floor(100/width)}%`;

        $("game-cont").append(cont);
        cardList.push(cont);
        cardList.push(cont);
    }
    
    cardList = shuffle(cardList);
    console.log(cardList.length)
    for(var x = 0; x < cardList.length; x++) {
        document.getElementById("game-cont").appendChild(cardList[x]);
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
    return arr;
}