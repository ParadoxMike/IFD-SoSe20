//CONSTS AND GLOBALS
var iva = new Artyom();
var savedName = '';
var plexCom = false;
var voyagerCom = false;

var commands = [
    {
        indexes: ["Hello I'm *"],
        smart: true,
        action: function(i, wildcard){
            savedName = wildcard;
            handleCommand('name');
        }
    },
    {
        indexes: ["how is the overall status of the vault"],
        action: function(){
            handleCommand('vault');
        }
    },
    {
        indexes: ["restart the plex service on lilith"],
        action: function(){
            handleCommand('plex');
        }
    },
    {
        indexes: ["yes *"],
        smart: true,
        action: function(i, wildcard){
            handleCommand('yes', wildcard);
        }
    },
    {
        indexes: ["no"],
        action: function(){
            handleCommand('no');
        }
    },
    {
        indexes: ["reboot voyager"],
        action: function(){
            handleCommand('voyager');
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

$('.vault-btn').on('click', function(){
    iva.simulateInstruction("how is the overall status of the vault");
});

$('.plex-btn').on('click', function(){
    iva.simulateInstruction("restart the plex service on lilith");
});

$('.voyager-btn').on('click', function(){
    iva.simulateInstruction("reboot voyager");
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

function handleCommand(functionToEx, wildcard) {
    iva.dontObey();
    if (wildcard) window[functionToEx](wildcard);
    else window[functionToEx]();
    iva.obey();
}

function name() {   
    iva.say("Ok, thank you" + savedName);
    iva.say("Plese head to the Webinterface an Configure your servers, if not done already. From now on you can summon my help by just saying whatver you want me to do for you.");
}

function vault() {
    iva.say("the vault is online and is not reporting any warnings or errors")
}

function plex() {
    iva.say("ok" + savedName + ", pleace note that the service will be temporarily unavailable. Should I restart it now")
    plexCom = true;
}

function yes(passphrase) {
    if(plexCom) {
        iva.say("ok plex service is restarting now")
        plexCom = false;
    }
    if(voyagerCom) {
        console.log(passphrase);
        
        if(passphrase == "captain") {
            iva.say("Voyager will now reboot. I'll inform you when its complete.");
            voyagerCom = false;
        }
        else {
            iva.say("I'm sorry but that passphrase was incorrect.");
            voyagerCom = false;
        }
    }
}

function no() {
    if(plexCom) {
        iva.say("ok I won't restart the service")
        plexCom = false;
    }
    if(voyagerCom) {
        iva.say("ok nothing will reboot");
        voyagerCom = false;
    }
}

function voyager() {
    iva.say("Are you sure you want to reboot Voyager");
    iva.say("If so please response with yes followed by your passphrase");
    voyagerCom = true;
}