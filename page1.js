
let TIME_LIMIT = 300; 

let quotes_array = [
    "Germany is a higher education paradise. In Germany you will find many worldwide ranked universities, countless courses to choose among, globally valued degrees that promise a high employability to you and affordable living costs.Germany has a long and rich history, a vibrant and dynamic lifestyle mixing the modern and the classics, the urban and the rural which will immerse and make you love every second spent here.Not surprisingly, Germany is ranked among the world’s top destinations for international students.Every year, thousands of scholars coming from all around the world trust their education to German universities and reasons for this are obvious. German universities are above global higher education standards. Germany offers countless degree courses designed to suit everyone’s interests. Germany has invested a lot in Engineering universities and today Engineering programs are particularly valued at German universities."
];

let timer_text = document.querySelector(".curr_time"); 
let accuracy_text = document.querySelector(".curr_accuracy"); 
let error_text = document.querySelector(".curr_errors"); 
let cpm_text = document.querySelector(".curr_cpm"); 
let wpm_text = document.querySelector(".curr_wpm"); 
let quote_text = document.querySelector(".quote"); 
let input_area = document.querySelector(".input_area"); 
let restart_btn = document.querySelector(".restart_btn");
let stop_btn = document.querySelector(".stop_btn")
let cpm_group = document.querySelector(".cpm"); 
let wpm_group = document.querySelector(".wpm"); 
let error_group = document.querySelector(".errors"); 
let accuracy_group = document.querySelector(".accuracy"); 

let timeLeft = TIME_LIMIT; 
let timeElapsed = 0; 
let total_errors = 0; 
let errors = 0; 
let accuracy = 0; 
let characterTyped = 0; 
let current_quote = ""; 
let quoteNo = 0; 
let timer = null; 

function updateQuote() { 
    quote_text.textContent = null; 
    current_quote = quotes_array[quoteNo]; 
    
    current_quote.split('').forEach(char => { 
        const charSpan = document.createElement('span') 
        charSpan.innerText = char 
        quote_text.appendChild(charSpan) 
    }) 
    
    if (quoteNo < quotes_array.length - 1) 
        quoteNo++; 
    else
        quoteNo = 0; 
} 

function processCurrentText() { 
    curr_input = input_area.value; 
    curr_input_array = curr_input.split(''); 
    
    characterTyped++; 
    
    errors = 0; 
    
    quoteSpanArray = quote_text.querySelectorAll('span'); 
    quoteSpanArray.forEach((char, index) => { 
        let typedChar = curr_input_array[index] 
    
        if (typedChar == null) { 
        char.classList.remove('correct_char'); 
        char.classList.remove('incorrect_char'); 
    
        } else if (typedChar === char.innerText) { 
        char.classList.add('correct_char'); 
        char.classList.remove('incorrect_char'); 
    
        } else { 
        char.classList.add('incorrect_char'); 
        char.classList.remove('correct_char'); 
    
        errors++; 
        } 
    }); 
    
    error_text.textContent = total_errors + errors; 
    
    let correctCharacters = (characterTyped - (total_errors + errors)); 
    let accuracyVal = ((correctCharacters / characterTyped) * 100); 
    accuracy_text.textContent = Math.round(accuracyVal); 
    
    
    if (curr_input.length == current_quote.length) { 
        updateQuote(); 
    
        total_errors += errors; 
    
        input_area.value = ""; 
    } 
} 

function startGame() { 

    resetValues(); 
    updateQuote();
    
    clearInterval(timer); 
    timer = setInterval(updateTimer, 1000); 
} 
    
    function resetValues() { 
    timeLeft = TIME_LIMIT; 
    timeElapsed = 0; 
    errors = 0; 
    total_errors = 0; 
    accuracy = 0; 
    characterTyped = 0; 
    quoteNo = 0; 
    input_area.disabled = false; 
    
    input_area.value = ""; 
    quote_text.textContent = 'Click on the area below to start the game.'; 
    accuracy_text.textContent = 100; 
    timer_text.textContent = timeLeft + 's'; 
    error_text.textContent = 0; 
    restart_btn.style.display = "block";
    stop_btn.style.display = "block";
    cpm_group.style.display = "none"; 
    wpm_group.style.display = "none"; 
} 

function stopPractice() {
    timeLeft = clearInterval(timer);
    timer=false;

}



function updateTimer() { 
    if (timeLeft > 0) { 
        
        timeLeft--; 
    
        timeElapsed++; 
     
        timer_text.textContent = timeLeft + "s"; 
    } 
    else { 
        finishGame(); 
    } 
} 

function finishGame() { 
    clearInterval(timer); 
    
    input_area.disabled = true; 
    
    quote_text.textContent = "Click on restart to start a new game."; 
    
    restart_btn.style.display = "block"; 
    
    cpm = Math.round(((characterTyped / timeElapsed) * 60)); 
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60)); 
    
    cpm_text.textContent = cpm; 
    wpm_text.textContent = wpm; 
    
    cpm_group.style.display = "block"; 
    wpm_group.style.display = "block"; 
} 
    
    
    
    
    