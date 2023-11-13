function getUserName() {
    let pn = prompt("Введіть своє ім'я:");
    if (pn === null || pn.trim() === "") {
        alert("Введіть ім'я гравця!");
        return getUserName();
    } else {
        return pn;
    }
}
let attempts = 0;
let rounds = 0;
let r = document.getElementById("change");
function gameSpin() {
    attempts++;
    if (attempts <= 3) {
        let gameBox = document.getElementById("gameBox");
        let resultDiv = document.getElementById("result");
        gameBox.innerHTML = "";
        for (let i = 0; i < 3; i++) {
            let symbol = getRandomImg();
            let img = document.createElement("img");
            img.src = symbol;
            let slot = document.createElement("div");
            slot.className = "slot";
            slot.appendChild(img);
            gameBox.appendChild(slot);
        }
        let s = document.querySelectorAll(".slot");
        let symbol = Array.from(s).every((slot, index) => {
            return index === 0 || slot.firstChild.src === s[index - 1].firstChild.src;
        });
        rounds++;
        r.innerHTML = "Спроба " + rounds + " з 3";
        if (symbol) {
            resultDiv.innerHTML = "Ви виграли!";
        } else {
            resultDiv.innerHTML = "Спробуйте ще раз!";
        }
    } else {
        alert("Гра завершена. Спробуйте знову!");
        attempts = 0;
        let resultDiv = document.getElementById("result");
        gameBox.innerHTML = "";
        rounds = 0;
        r.innerHTML = "Спроба " + rounds + " з 3";
        resultDiv.innerHTML = "";
        document.getElementById("generate").removeEventListener("click", gameSpin);
        document.getElementById("generate").addEventListener("click", gameSpin);
    }
}
function getRandomImg() {
    let s = [
        "img/symbol1.png",
        "img/symbol2.png",
        "img/symbol3.png",
        "img/symbol4.png",
        "img/symbol5.png",
        "img/symbol6.png"
    ];
    return s[Math.floor(Math.random() * s.length)];
}
let pn = getUserName();
if (pn !== null) {
    let userName = document.getElementById("userName");
    userName.innerHTML = pn;
    document.getElementById("generate").addEventListener("click", gameSpin);
}