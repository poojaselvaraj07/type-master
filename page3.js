
let TIME_LIMIT = 720; 

let quotes_array = [
    "The Internet of Things, or IoT, refers to the billions of physical devices around the world that are now connected to the internet, all collecting and sharing data. Thanks to the arrival of super-cheap computer chips and the ubiquity of wireless networks, it's possible to turn anything, from something as small as a pill to something as big as an aeroplane, into a part of the IoT. Connecting up all these different objects and adding sensors to them adds a level of digital intelligence to devices that would be otherwise dumb, enabling them to communicate real-time data without involving a human being. The Internet of Things is making the fabric of the world around us more smarter and more responsive, merging the digital and physical universes. A lightbulb that can be switched on using a smartphone app is an IoT device, as is a motion sensor or a smart thermostat in your office or a connected streetlight.",
    "An IoT device could be as fluffy as a child's toy or as serious as a driverless truck. Some larger objects may themselves be filled with many smaller IoT components, such as a jet engine that's now filled with thousands of sensors collecting and transmitting data back to make sure it is operating efficiently. At an even bigger scale, smart cities projects are filling entire regions with sensors to help us understand and control the environment.The term IoT is mainly used for devices that wouldn't usually be generally expected to have an internet connection, and that can communicate with the network independently of human action. For this reason, a PC isn't generally considered an IoT device and neither is a smartphone -- even though the latter is crammed with sensors.",
    "The idea of adding sensors and intelligence to basic objects was discussed throughout the 1980s and 1990s. Chips were too big and bulky and there was no way for objects to communicate effectively. Processors that were cheap and power-frugal enough to be all but disposable were needed before it finally became cost-effective to connect up billions of devices. The adoption of IPv6 - which, among other things, should provide enough IP addresses for every device the world is ever likely to need - was also a necessary step for the IoT to scale. Kevin Ashton coined the phrase 'Internet of Things' in 1999, although it took at least another decade for the technology to catch up with the vision."
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
    
    
    
    
    