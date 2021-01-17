const query = document.querySelector("form");
let start = 8;
let end = 40;
const number = document.querySelector("input[type=text]");
let err = false;
let curr_err = "";
number.addEventListener("input", (event) => {
    err = false;
    if (number.value === "") {
        number.classList.remove("valid");
        number.classList.add("invalid");
        console.log("this needs to be highlighted");
        curr_err = "The number of character field CANNOT be left empty!";
        err = true;
    }
    if ((parseInt(number.value) < start) || (parseInt(number.value) > end)) {
        number.classList.remove("valid");
        number.classList.add("invalid");
        console.log("this needs to be highlighted");
        curr_err = "The number of character field must contain values ranging between " + start + "-" + end + "!";
        err = true;
    }
    else {
        for (let i = 0; i < number.value.length; i++) {
            if (number.value.charCodeAt(i) > 56 || number.value.charCodeAt(i) < 48) {
                number.classList.remove("valid");
                number.classList.add("invalid");
                console.log("this needs to be highlighted");
                curr_err = "The number of character field must contain only numeric values!";
                err = true;
            }

        }
    }
    if (err === false) {
        number.classList.remove("invalid");
        number.classList.add("valid");
        const err = document.querySelector(".error");
        err.innerHTML = "";
        err.setAttribute("id", "");
    }

})
function error() {

    const err = document.querySelector(".error");
    err.innerHTML = curr_err;
    err.setAttribute("id", "error");

}
query.addEventListener("submit", (event) => {
    let array = [];
    event.preventDefault();
    if (number.value === "" || err === true) {
        number.classList.remove("valid");
        number.classList.add("invalid");
        console.log("this needs to be highlighted");
        if (err !== true) {
            curr_err = "The number of character field CANNOT be left empty!";
        }

        err = true;
        error();

    }




    else {
        number.classList.remove("valid");
        number.classList.remove("invalid");
        for (let i = 0; i < 4; i++) {
            if (query.elements[i].checked === true) {
                array.push(query.elements[i].name);
                query.elements[i].checked = false;
            }
        }

        let str = [];
        for (let i = 0; i < parseInt(query.elements[4].value); i++) {

            let rand = Math.floor(Math.random() * array.length);
            if (array[rand] === "checkbox1") {
                let char = Math.floor(Math.random() * 10) + 48;
                str.push(String.fromCharCode(char));
                // console.log(String.fromCharCode(char));

            }
            else if (array[rand] === "checkbox2") {
                let char = Math.floor(Math.random() * 26) + 97;
                // console.log(String.fromCharCode(char));
                str.push(String.fromCharCode(char));
            }
            else if (array[rand] === "checkbox3") {
                let char = Math.floor(Math.random() * 26) + 65;
                // console.log(String.fromCharCode(char));
                str.push(String.fromCharCode(char));
            }
            else if (array[rand] === "checkbox4") {
                let char = Math.floor(Math.random() * 33) + 32;
                if (char <= 47) {
                    // console.log(String.fromCharCode(char));
                    str.push(String.fromCharCode(char));
                }
                else if (47 + 7 >= char) {
                    char = 57 + (char - 47);
                    // console.log(String.fromCharCode(char));
                    str.push(String.fromCharCode(char));
                }
                else if (47 + 13 >= char) {
                    char = 90 + (char - 54);
                    // console.log(String.fromCharCode(char));
                    str.push(String.fromCharCode(char));
                }
                else {
                    char = 122 + (char - 60);
                    // console.log(String.fromCharCode(char));
                    str.push(String.fromCharCode(char));
                }

            }



        }
        query.elements[4].value = "";
        if (array.length !== 0) {
            let str_prt = "";
            for (let i = 0; i < str.length; i++) {
                str_prt = str[i] + str_prt;
            }

            // console.log(str_prt);
            const copy = document.createElement("button");
            const close = document.createElement("button");
            close.innerText = "close";
            close.classList.add("red");
            copy.innerText = "copy";
            copy.classList.add("green")
            const password = document.querySelector(".passwords");
            const newCard = document.createElement("div");
            const text = document.createElement("div");
            text.innerText = str_prt;
            newCard.append(text);
            newCard.classList.add("cards");
            newCard.append(copy);
            newCard.append(close);
            password.append(newCard);
        }
    }





})
const copy = document.querySelector(".passwords");
copy.addEventListener("click", async (event) => {
    if (event.target.innerText === "close") {
        console.dir(event.target.parentElement);
        console.log(event.target.parentElement.children[0].innerText);
        event.target.parentElement.remove();
    }
    if (event.target.innerText === "copy") {
        if (!navigator.clipboard) {
            console.log("yelo");
            return;
        }

        try {
            const text = event.target.parentElement.children[0].innerText;
            await navigator.clipboard.writeText(text);
            event.target.innerText = "copied";
            console.log("copied");
        } catch (error) {
            console.error("Copy failed", error);
        }


    }
})