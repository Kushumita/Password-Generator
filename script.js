let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let genBtn = document.getElementById("genBtn");
let copyIcon = document.getElementById("copyIcon");
let strengthLevel = document.getElementById("strengthLevel");

updateSlider();   
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener("input", updateSlider);

genBtn.addEventListener('click', ()=>{
    let password = generatePassword();
    passBox.value = password;
    updateStrength(password);
});

let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*"; 

// Function to generate Password
function generatePassword(){
    let genPassword = "";
    let allChars = "";

    allChars  += lowercase.checked ? lowerChars : "";
    allChars  += uppercase.checked ? upperChars : "";
    allChars  += numbers.checked ? allNumbers : "";
    allChars  += symbols.checked ? allSymbols : "";


    if(allChars == "" || allChars.length == 0){
        return genPassword;
    }
    

    let i = 1;
    while(i<=inputSlider.value){
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
        i++;
    }

    return genPassword;
}

function updateSlider() {

    let min = inputSlider.min;
    let max = inputSlider.max;
    let val = inputSlider.value;

    let percentage = ((val - min) / (max - min)) * 100;

    inputSlider.style.background =
        `linear-gradient(to right, #ffffff ${percentage}%, rgba(255,255,255,0.3) ${percentage}%)`;

    sliderValue.textContent = val;
}

function updateStrength(password) {

    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Set width & color
    switch(strength) {
        case 0:
        case 1:
            strengthLevel.style.width = "20%";
            strengthLevel.style.background = "red";
            break;
        case 2:
            strengthLevel.style.width = "40%";
            strengthLevel.style.background = "orange";
            break;
        case 3:
            strengthLevel.style.width = "60%";
            strengthLevel.style.background = "yellow";
            break;
        case 4:
            strengthLevel.style.width = "80%";
            strengthLevel.style.background = "limegreen";
            break;
        case 5:
            strengthLevel.style.width = "100%";
            strengthLevel.style.background = "green";
            break;
    }
}

const copyMsg = document.getElementById("copyMsg");

copyIcon.addEventListener("click", () => {
    if (passBox.value !== "") {
        
        // Copy to clipboard
        navigator.clipboard.writeText(passBox.value);

        // Show message
        copyMsg.classList.add("show");

        // Hide after 2 seconds
        setTimeout(() => {
            copyMsg.classList.remove("show");
        }, 2000);
    }
});