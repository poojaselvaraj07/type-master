
let TIME_LIMIT = 120; 

let quotes_array = [
    "An exciting branch of Artificial Intelligence, Machine Learning is all around us in this modern world.", 
    " Like Facebook suggesting the stories in your feed, Machine Learning brings out the power of data in a new way.",
    "Working on the development of computer programs that can access data and perform tasks automatically through predictions and detections, Machine Learning enables computer systems to learn and improve from experience continuously.", 
    "As you feed the machine with more data, thus enabling the algorithms that cause it to “learn,” you improve on the delivered results.",
    "A good start at a Machine Learning definition is that it is a core sub-area of Artificial Intelligence", 
    "ML applications learn from experience (well data) like humans without direct programming.",
    "When exposed to new data, these applications learn, grow, change, and develop by themselves. In other words, with Machine Learning, computers find insightful information without being told where to look.",
    " Instead, they do this by leveraging algorithms that learn from data in an iterative process.",
    "While the concept of Machine Learning has been around for a long time, the ability to automate the application of complex mathematical calculations to Big Data has been gaining momentum over the last several years.",
    "At a high level, Machine Learning is the ability to adapt to new data independently and through iterations.",
    "At a high level, Machine Learning is the ability to adapt to new data independently and through iterations.",
    "Basically, applications learn from previous computations and transactions and use “pattern recognition” to produce reliable and informed results."
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
    
    
    
    
    