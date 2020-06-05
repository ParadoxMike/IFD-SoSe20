//CONSTS AND GLOBALS
var iva = new Artyom();
var savedName = '';

var commands = [
    {
        indexes: ["Hello I'm *"],
        smart: true,
        action: function(i, wildcard){
            savedName = wildcard;
            handleCommand('name');
        }
    },
];

//INIT STUFF
iva.addCommands(commands);

//EVENTS
$('.test-btn').on('click', function(){
    if(savedName !== '') {
        iva.say("I'm listening")
        console.log(savedName);
        
    }
    else {
        init();
    }
});

//FUNCTIONS
function init() {
    iva.initialize({
        continuous: true,
        lang: "en-US",
        obeyKeyword: "iva", //seems not to work because artyom doesn't recognize the speach as this chars
        listen: true,
        debug: true,
    });
    iva.dontObey();
    iva.say("Hello, I'm the Interactive Voice Administration Tool or IVA for short. Would you like to tell me how I should adress you");
    iva.obey();
}

function handleCommand(functionToEx) {
    iva.dontObey();    
    window[functionToEx]();
    iva.obey();
}

function name() {   
    iva.say("Ok, thank you" + savedName);
    iva.say("Plese head to the Webinterface an Configure your servers, if not done already. From now on you can summon my help by just saying whatver you want me to do for you.");
}