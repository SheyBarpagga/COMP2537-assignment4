
$(document).ready(() => {
    $("#start").on("click", setUp);

})


hasFlippedCard = false;
firstCard = undefined
secondCard = undefined
total = 0;
function clickCard() {
    $(".card").on("click", function click() {
        $(this).toggleClass("flip");

        if(!hasFlippedCard){
            firstCard = $(this).find('.frontface')[0]
            hasFlippedCard = true;
        }else{
            secondCard =  $(this).find('.frontface')[0]
            hasFlippedCard = false;
            if(
                $(`#${firstCard.id}`).attr("src")
                ==
                $(`#${secondCard.id}`).attr("src")
                )
            {
                if(firstCard.parentElement == secondCard.parentElement) {
                    return
                }

                var oldF = firstCard.parentElement;
                var newNodeF = oldF.cloneNode(true);
                oldF.parentElement.replaceChild(newNodeF, oldF);

                var oldS = secondCard.parentElement;
                var newNodeS = oldS.cloneNode(true);
                oldS.parentElement.replaceChild(newNodeS, oldS);
                total++;
                var temp = document.getElementById("game-cont");
                if(total == Math.floor((temp.childElementCount)/2)) {
                    setTimeout(() => {
                        win(total);
                    }, 2000)
                }
                console.log("Match!");
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

    var cardList = [];

    timer();

    var numPoke = $("#pokemon").val();
    var height = $("#height").val();
    var width = $("#width").val();
    $(".center").remove();
    if((Number(height) * Number(width)) != Number(numPoke)) {
        return
    }

    for(var x = 0; x < (Math.floor(Number(numPoke) / 2) + 1); x++) {

        var random = Math.floor(Math.random() * 800);

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
    for(var x = 0; x < cardList.length - 1; x++) {
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


function win(total) {
    $("#game-cont").html(``);
    $("#countdown").html(``);
    $("#win").append(`

            <h1>Congratulations!</h1>
            <h3>You managed to remember ${total} Pokemon!</h3>
            <br>
            <a class="abutton" href="game.html" style="height: 25px; color: black;">Go again?</a>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
    `)
}

function timer() {

    var seconds = $("#time").val();

    seconds = Number(seconds);

    var lose = Number(seconds);

    var interval = setInterval(() => {

        $("#countdown").html(`${seconds}`);
        seconds--;
        if(seconds <= 0) {
            clearInterval(interval);
            $("#game-cont").html(``);
            $("#countdown").html(``);
            $("#win").append(`
        
                    <h1>You Lose!</h1>
                    <h3>You had ${lose} seconds to win this round. Maybe go again with more time.</h3>
                    <br>
                    <a class="abutton" href="game.html" style="height: 25px; color: black;">Go again?</a>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
            `)
        }
    }, 1000)
}
