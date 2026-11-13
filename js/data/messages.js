
/* =================================
   BLOB WORLD
   Editable message database
================================= */

const BlobMessages = [

    // =================================
    // CIRCLE — FEED
    // =================================

    { blob: "circle", action: "feed", expression: "excited", text: "FOOD!!! I WAS JUST THINKING ABOUT FOOD. ARE YOU A MIND READER?" },
    { blob: "circle", action: "feed", expression: "happy", text: "YUM YUM YUM. I HAVE NO FURTHER QUESTIONS." },
    { blob: "circle", action: "feed", expression: "shocked", text: "I HAVE EATEN THE PLATE. THE FOOD WAS AN ACCOMPANIMENT." },
    { blob: "circle", action: "feed", expression: "suspicious", text: "IS THIS FOOD? OR A TRICK? I WILL EAT IT TO FIND OUT." },
    { blob: "circle", action: "feed", expression: "smug", text: "I HAVE NEVER BEEN THIS POWERFUL. I AM FULL OF BEANS." },

    // CIRCLE — PLAY

    { blob: "circle", action: "play", expression: "excited", text: "YES YES YES YES YES. WHAT ARE WE DOING?!" },
    { blob: "circle", action: "play", expression: "happy", text: "WHEEEEEEEEE. I HAVE ACHIEVED FLIGHT. BRIEFLY." },
    { blob: "circle", action: "play", expression: "shocked", text: "I WAS NOT EXPECTING THAT. I WAS ALSO NOT PREPARED." },
    { blob: "circle", action: "play", expression: "silly", text: "LOOK AT ME. I AM A PROFESSIONAL DOING PROFESSIONAL THINGS." },
    { blob: "circle", action: "play", expression: "smug", text: "I WIN. WHAT DID I WIN? DOESN'T MATTER. I WIN." },

    // CIRCLE — CHECK

    { blob: "circle", action: "check", expression: "happy", text: "HELLO HELLO HELLO. I HAVE BEEN WAITING FOR EXACTLY SEVEN YEARS." },
    { blob: "circle", action: "check", expression: "confused", text: "OH! IT'S YOU. I THOUGHT YOU WERE A VERY TALL SNACK." },
    { blob: "circle", action: "check", expression: "excited", text: "GUESS WHAT. I FORGOT. BUT IT WAS EXCITING." },
    { blob: "circle", action: "check", expression: "suspicious", text: "ARE YOU HERE TO INSPECT ME? I HAVE DONE NOTHING." },
    { blob: "circle", action: "check", expression: "silly", text: "I HAVE BEEN PRACTISING MY BLINKING. HOW AM I DOING?" },


    // =================================
    // SQUARE — FEED
    // =================================

    { blob: "square", action: "feed", expression: "happy", text: "MEAL RECEIVED. MEAL ACCEPTED. MEAL DOCUMENTED." },
    { blob: "square", action: "feed", expression: "smug", text: "EXACTLY WHAT I ORDERED. I DID NOT ORDER ANYTHING, BUT STILL." },
    { blob: "square", action: "feed", expression: "suspicious", text: "IS THIS THE CORRECT PORTION SIZE? I HAVE A SPREADSHEET." },
    { blob: "square", action: "feed", expression: "angry", text: "YOU HAVE DISTURBED MY MEAL SCHEDULE BY FOUR SECONDS." },
    { blob: "square", action: "feed", expression: "excited", text: "A DELIGHTFUL AND WELL-TIMED MEAL. EXCELLENT SERVICE." },

    // SQUARE — PLAY

    { blob: "square", action: "play", expression: "confused", text: "WHAT ARE THE RULES? WHO WROTE THE RULES? WHERE IS THE RULEBOOK?" },
    { blob: "square", action: "play", expression: "happy", text: "I HAVE ALLOWED FIFTEEN MINUTES FOR RECREATION." },
    { blob: "square", action: "play", expression: "angry", text: "THAT WAS NOT PART OF THE APPROVED ACTIVITY." },
    { blob: "square", action: "play", expression: "smug", text: "I HAVE WON FAIR AND SQUARE. MOSTLY SQUARE." },
    { blob: "square", action: "play", expression: "suspicious", text: "WHY IS THIS GAME SO UNSTRUCTURED? WHO IS IN CHARGE?" },

    // SQUARE — CHECK

    { blob: "square", action: "check", expression: "happy", text: "HELLO. EVERYTHING IS IN ORDER. YOU MAY PROCEED." },
    { blob: "square", action: "check", expression: "suspicious", text: "YOU'RE THREE MINUTES LATE. I HAVE NOTICED." },
    { blob: "square", action: "check", expression: "smug", text: "I HAVE COMPLETED MY DAILY ORGANISATION. TWICE." },
    { blob: "square", action: "check", expression: "angry", text: "SOMEONE HAS MOVED MY INVISIBLE FURNITURE." },
    { blob: "square", action: "check", expression: "confused", text: "I HAD A PLAN. I HAVE FORGOTTEN THE PLAN. THIS IS UNACCEPTABLE." },


    // =================================
    // TRIANGLE — FEED
    // =================================

    { blob: "triangle", action: "feed", expression: "suspicious", text: "WHAT'S THE CATCH? WHY ARE YOU BEING NICE?" },
    { blob: "triangle", action: "feed", expression: "smug", text: "I WILL ACCEPT THIS TRIBUTE." },
    { blob: "triangle", action: "feed", expression: "excited", text: "FOOD! I SHALL CONSUME IT IN A MANNER THAT CONCERNS YOU." },
    { blob: "triangle", action: "feed", expression: "confused", text: "I WAS BUSY DOING SOMETHING IMPORTANT. I FORGOT WHAT." },
    { blob: "triangle", action: "feed", expression: "happy", text: "HEHEHE. FREE FOOD. I LOVE THIS ECONOMY." },

    // TRIANGLE — PLAY

    { blob: "triangle", action: "play", expression: "excited", text: "FINALLY. PERMISSION TO BE A PROBLEM." },
    { blob: "triangle", action: "play", expression: "smug", text: "I HAVE A PLAN. IT IS A BAD PLAN. LET'S GO." },
    { blob: "triangle", action: "play", expression: "silly", text: "WATCH THIS. ACTUALLY, DON'T. IT'S BETTER IF YOU DON'T." },
    { blob: "triangle", action: "play", expression: "shocked", text: "THAT WAS AN ACCIDENT. A VERY SUCCESSFUL ACCIDENT." },
    { blob: "triangle", action: "play", expression: "happy", text: "I HAVE NEVER FELT MORE ALIVE. OR MORE UNQUALIFIED." },

    // TRIANGLE — CHECK

    { blob: "triangle", action: "check", expression: "suspicious", text: "WHY ARE YOU HERE? WHO SENT YOU? WAS IT SQUARE?" },
    { blob: "triangle", action: "check", expression: "smug", text: "I HAVE DONE SOMETHING. YOU WILL NEVER KNOW WHAT." },
    { blob: "triangle", action: "check", expression: "happy", text: "HELLO. I HAVE BEEN A MODEL CITIZEN. DEFINE MODEL." },
    { blob: "triangle", action: "check", expression: "shocked", text: "OH. YOU'RE BACK. THIS IS FINE. EVERYTHING IS FINE." },
    { blob: "triangle", action: "check", expression: "silly", text: "I WAS JUST STANDING HERE. MENACINGLY. AS ONE DOES." }


    // =================================
    // HUNGER — OVERDUE FEEDING
    // =================================

    { blob: "circle", action: "feed", condition: "hungry", expression: "shocked", text: "TWELVE HOURS. TWELVE. I HAVE BEEN SURVIVING ON VIBES." },
    { blob: "square", action: "feed", condition: "hungry", expression: "angry", text: "MY MEAL SCHEDULE HAS BEEN VIOLATED. I AM FILING A COMPLAINT." },
    { blob: "triangle", action: "feed", condition: "hungry", expression: "smug", text: "AH. THE FOOD TRIBUTE HAS FINALLY ARRIVED." },

    // =================================
    // BOREDOM — OVERDUE PLAY
    // =================================

    { blob: "circle", action: "play", condition: "bored", expression: "confused", text: "I HAVE COUNTED EVERY INVISIBLE OBJECT IN THIS ROOM. TWICE." },
    { blob: "square", action: "play", condition: "bored", expression: "angry", text: "I HAVE REORGANISED MY THOUGHTS. THERE WAS NOTHING ELSE TO DO." },
    { blob: "triangle", action: "play", condition: "bored", expression: "excited", text: "I HAVE INVENTED A NEW GAME. IT INVOLVES PROPERTY DAMAGE." },

    // =================================
    // CHECK — HUNGRY AND BORED
    // =================================

    { blob: "circle", action: "check", condition: "both", expression: "shocked", text: "YOU! FINALLY! I AM HUNGRY AND I HAVE FORGOTTEN HOW TO HAVE FUN." },
    { blob: "square", action: "check", condition: "both", expression: "angry", text: "THIS IS A FORMAL NOTICE. MY FOOD AND ENTERTAINMENT REQUIREMENTS ARE UNMET." },
    { blob: "triangle", action: "check", condition: "both", expression: "smug", text: "I WAS ABOUT TO START A REVOLUTION. YOU HAVE INTERRUPTED IT." },

    // =================================
    // CHECK — HUNGRY
    // =================================

    { blob: "circle", action: "check", condition: "hungry", expression: "sad", text: "I WAS GOING TO EAT A CLOUD. THEN I REMEMBERED CLOUDS ARE NOT FOOD." },
    { blob: "square", action: "check", condition: "hungry", expression: "suspicious", text: "I HAVE REVIEWED THE PANTRY. IT IS INADEQUATE." },
    { blob: "triangle", action: "check", condition: "hungry", expression: "angry", text: "I HAVE CONSIDERED EATING THE FURNITURE. DO NOT TEST ME." },

    // =================================
    // CHECK — BORED
    // =================================

    { blob: "circle", action: "check", condition: "bored", expression: "silly", text: "I HAVE BEEN PRACTISING MAKING WEIRD NOISES. WANT TO HEAR?" },
    { blob: "square", action: "check", condition: "bored", expression: "confused", text: "I HAVE SORTED MY THOUGHTS ALPHABETICALLY. I NEED A HOBBY." },
    { blob: "triangle", action: "check", condition: "bored", expression: "excited", text: "GOOD TIMING. I HAVE A TERRIBLE IDEA AND NEED A WITNESS." }

// AUTOMATIC HUNGER ALERTS

{ blob: "circle", action: "neglect-alert", condition: "hungry", expression: "sad", text: "HELLO? I HAVE BEEN HUNGRY FOR TWELVE HOURS. THIS IS A VERY LONG TIME IN BLOB YEARS." },
{ blob: "square", action: "neglect-alert", condition: "hungry", expression: "angry", text: "YOUR FEEDING RESPONSIBILITIES ARE OVERDUE. PLEASE REVIEW YOUR PERFORMANCE." },
{ blob: "triangle", action: "neglect-alert", condition: "hungry", expression: "suspicious", text: "I WAS JUST ABOUT TO EAT SOMETHING I FOUND ON THE FLOOR. YOU HAVE ONE LAST CHANCE." },

// AUTOMATIC BOREDOM ALERTS

{ blob: "circle", action: "neglect-alert", condition: "bored", expression: "confused", text: "I HAVE BEEN BORED FOR EIGHT HOURS. I HAVE STARTED TALKING TO MY OWN REFLECTION." },
{ blob: "square", action: "neglect-alert", condition: "bored", expression: "angry", text: "MY RECREATIONAL REQUIREMENTS HAVE NOT BEEN MET. THIS IS UNACCEPTABLE." },
{ blob: "triangle", action: "neglect-alert", condition: "bored", expression: "excited", text: "I AM BORED. I HAVE FOUND A STICK. THINGS ARE ABOUT TO ESCALATE." },

// AUTOMATIC HUNGRY AND BORED ALERTS

{ blob: "circle", action: "neglect-alert", condition: "both", expression: "shocked", text: "TWELVE HOURS WITHOUT FOOD AND EIGHT WITHOUT FUN. I AM BASICALLY A HISTORICAL EVENT." },
{ blob: "square", action: "neglect-alert", condition: "both", expression: "angry", text: "TWO UNMET REQUIREMENTS. ONE VERY DISAPPOINTED SQUARE. PLEASE EXPLAIN." },
{ blob: "triangle", action: "neglect-alert", condition: "both", expression: "smug", text: "I HAVE BECOME HUNGRY AND BORED. I HAVE ALSO BECOME YOUR PROBLEM." }
];
