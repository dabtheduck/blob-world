
/* =================================
   BLOB WORLD
   Core application
================================= */

const Game = {
    version: "0.5.0",
    saveKey: "BLOB_WORLD_SAVE",

    rules: {
        checkCooldownHours: 2,
        maxFeedsPerDay: 6,

        needs: {
            circle: {
                hungerHours: 6,
                boredomHours: 3
            },
            square: {
                hungerHours: 8,
                boredomHours: 6
            },
            triangle: {
                hungerMinutes: 5,
                boredomMinutes: 5
            }
        }
    },

    sleepSchedules: {
        circle: { start: 0, end: 7 },
        square: { start: 22, end: 8 },
        triangle: { start: 4, end: 11 }
    },

    state: {
        selectedBlob: null,
        blobName: "",
        isStarted: false,
        createdDate: null,
        lastFedAt: null,
        lastPlayedAt: null,
        lastCheckedAt: null,
        hungerAlerted: false,
        boredomAlerted: false,
        feedsToday: 0,
        feedDate: "",
        lastMessages: {},
        isSleeping: null
    },

    expressions: [
        "happy", "excited", "angry", "sad",
        "suspicious", "smug", "confused",
        "shocked", "silly"
    ],

    init() {
        console.log("BLOB WORLD is alive.");

        this.setupBlobSelection();
        this.setupNaming();
        this.setupActions();
        this.loadSavedBlob();

        setInterval(() => {
            if (this.state.isStarted) {
                this.refreshAvailability();
                this.ensureDailyFeedCount();
                this.updateDayCounter();
                this.checkNeedAlerts();
            }
        }, 30000);
    },

    // DATE AND TIME HELPERS

    getNow() {
        return Date.now();
    },

    getLocalDateKey() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    },

    getCalendarDaysBetween(startDate, endDate) {
        if (!startDate || !endDate) return 0;

        const start = startDate.split("-").map(Number);
        const end = endDate.split("-").map(Number);

        const startUTC = Date.UTC(start[0], start[1] - 1, start[2]);
        const endUTC = Date.UTC(end[0], end[1] - 1, end[2]);

        return Math.floor((endUTC - startUTC) / 86400000);
    },

    getBlobAgeDays() {
        if (!this.state.createdDate) return 1;

        return Math.max(
            1,
            this.getCalendarDaysBetween(
                this.state.createdDate,
                this.getLocalDateKey()
            ) + 1
        );
    },

    updateDayCounter() {
        const counter = document.getElementById("blob-day-counter");

        if (counter && this.state.isStarted) {
            counter.textContent = `DAY ${this.getBlobAgeDays()}`;
        }
    },

    hoursSince(timestamp) {
        if (!timestamp) return Infinity;

        return (this.getNow() - timestamp) / 3600000;
    },

    formatTime(date) {
        return date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });
    },

    // CHARACTER SELECTION

    setupBlobSelection() {
        const blobOptions = document.querySelectorAll(".blob-option");

        blobOptions.forEach(option => {
            option.addEventListener("click", () => {
                const selected = option.dataset.blob;

                this.state.selectedBlob = selected;
                this.state.isStarted = false;

                blobOptions.forEach(item => {
                    item.classList.remove("selected");
                });

                option.classList.add("selected");

                document.getElementById("blob-situation").textContent =
                    `${selected.toUpperCase()} BLOB SELECTED. EXCELLENT CHOICE.`;

                this.updateConfirmButton();
            });
        });
    },

    // CHARACTER NAMING

    setupNaming() {
        const nameInput = document.getElementById("blob-name-input");
        const confirmButton = document.getElementById("confirm-blob-button");

        nameInput.addEventListener("input", () => {
            nameInput.value = nameInput.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "")
                .slice(0, 5);

            this.state.blobName = nameInput.value;
            this.state.isStarted = false;

            document.getElementById("name-message").textContent =
                nameInput.value.length === 5
                    ? "EXCELLENT. A PROPER NAME."
                    : "5 LETTERS OR NUMBERS. NO NONSENSE.";

            this.updateConfirmButton();
        });

        confirmButton.addEventListener("click", () => {
            this.confirmBlob();
        });
    },

    updateConfirmButton() {
        const validName = /^[A-Z0-9]{5}$/.test(this.state.blobName);

        const validBlob = ["circle", "square", "triangle"]
            .includes(this.state.selectedBlob);

        document.getElementById("confirm-blob-button").disabled =
            !(validName && validBlob);
    },

    // CREATE CHARACTER

    confirmBlob() {
        if (
            !this.state.selectedBlob ||
            !/^[A-Z0-9]{5}$/.test(this.state.blobName)
        ) {
            return;
        }

        const now = this.getNow();

        this.state.isStarted = true;
        this.state.createdDate = this.getLocalDateKey();
        this.state.lastFedAt = now;
        this.state.lastPlayedAt = now;
        this.state.lastCheckedAt = null;
        this.state.hungerAlerted = false;
        this.state.boredomAlerted = false;
        this.state.feedsToday = 0;
        this.state.feedDate = this.getLocalDateKey();
        this.state.lastMessages = {};

        this.saveGame();
        this.showHomeScreen();
    },

    // RESET CHARACTER

    resetBlob() {
        const confirmed = window.confirm(
            "RESET YOUR BLOB? This will erase its name, age and progress."
        );

        if (!confirmed) return;

        localStorage.removeItem(this.saveKey);

        this.state.selectedBlob = null;
        this.state.blobName = "";
        this.state.isStarted = false;
        this.state.createdDate = null;
        this.state.lastFedAt = null;
        this.state.lastPlayedAt = null;
        this.state.lastCheckedAt = null;
        this.state.hungerAlerted = false;
        this.state.boredomAlerted = false;
        this.state.feedsToday = 0;
        this.state.feedDate = "";
        this.state.lastMessages = {};
        this.state.isSleeping = null;

        document.getElementById("blob-home-screen").hidden = true;
        document.getElementById("blob-setup").hidden = false;

        document.getElementById("blob-name-input").value = "";
        document.getElementById("blob-situation").textContent =
            "PICK YOUR LITTLE WEIRDO.";
        document.getElementById("name-message").textContent =
            "5 LETTERS OR NUMBERS. NO NONSENSE.";

        document.querySelectorAll(".blob-option").forEach(option => {
            option.classList.remove("selected");
        });

        this.updateConfirmButton();

        console.log("Blob reset. A new life begins.");
    },

    // DISPLAY HOME

    showHomeScreen() {
        document.getElementById("blob-setup").hidden = true;
        document.getElementById("blob-home-screen").hidden = false;

        const activeBlob = document.getElementById("active-blob");

        activeBlob.className =
            `${this.state.selectedBlob} expression-happy`;

        document.getElementById("active-blob-name").textContent =
            this.state.blobName;

        document.getElementById("active-blob-situation").textContent =
            "JUST EXISTING. MENACINGLY.";

        document.getElementById("blob-message").textContent =
            "YOUR BLOB IS WAITING FOR SOMETHING TO HAPPEN.";

        this.updateDayCounter();
        this.refreshAvailability();
        this.checkNeedAlerts();

        console.log(`${this.state.blobName} has entered Blob World.`);
    },

    // SAVE GAME

    saveGame() {
        const saveData = {
            selectedBlob: this.state.selectedBlob,
            blobName: this.state.blobName,
            isStarted: this.state.isStarted,
            createdDate: this.state.createdDate,
            lastFedAt: this.state.lastFedAt,
            lastPlayedAt: this.state.lastPlayedAt,
            lastCheckedAt: this.state.lastCheckedAt,
            hungerAlerted: this.state.hungerAlerted,
            boredomAlerted: this.state.boredomAlerted,
            feedsToday: this.state.feedsToday,
            feedDate: this.state.feedDate
        };

        localStorage.setItem(this.saveKey, JSON.stringify(saveData));
    },

    // LOAD SAVED CHARACTER

    loadSavedBlob() {
        const savedData = localStorage.getItem(this.saveKey);

        if (!savedData) return;

        try {
            const data = JSON.parse(savedData);

            if (
                !["circle", "square", "triangle"].includes(data.selectedBlob) ||
                !/^[A-Z0-9]{5}$/.test(data.blobName)
            ) {
                return;
            }

            const now = this.getNow();

            this.state.selectedBlob = data.selectedBlob;
            this.state.blobName = data.blobName;
            this.state.isStarted = true;

            this.state.createdDate =
                typeof data.createdDate === "string" &&
                /^\d{4}-\d{2}-\d{2}$/.test(data.createdDate)
                    ? data.createdDate
                    : this.getLocalDateKey();

            this.state.lastFedAt =
                Number.isFinite(data.lastFedAt) ? data.lastFedAt : now;

            this.state.lastPlayedAt =
                Number.isFinite(data.lastPlayedAt) ? data.lastPlayedAt : now;

            this.state.lastCheckedAt =
                Number.isFinite(data.lastCheckedAt) ? data.lastCheckedAt : null;

            this.state.hungerAlerted = data.hungerAlerted === true;
            this.state.boredomAlerted = data.boredomAlerted === true;

            this.state.feedsToday =
                Number.isFinite(data.feedsToday) ? data.feedsToday : 0;

            this.state.feedDate =
                typeof data.feedDate === "string"
                    ? data.feedDate
                    : this.getLocalDateKey();

            this.ensureDailyFeedCount();
            this.saveGame();
            this.showHomeScreen();

            console.log("Welcome back to Blob World.");

        } catch (error) {
            console.error("Could not load saved blob:", error);
        }
    },

    // DAILY FEED LIMIT

    ensureDailyFeedCount() {
        const today = this.getLocalDateKey();

        if (this.state.feedDate !== today) {
            this.state.feedDate = today;
            this.state.feedsToday = 0;
            this.saveGame();
        }
    },

    // SLEEP SCHEDULE

    getSleepInfo() {
        const schedule = this.sleepSchedules[this.state.selectedBlob];

        if (!schedule) return { asleep: false };

        const now = new Date();
        const hour = now.getHours() + now.getMinutes() / 60;

        let asleep = false;
        let wakeDate = new Date(now);

        if (schedule.start < schedule.end) {
            asleep = hour >= schedule.start && hour < schedule.end;
        } else {
            asleep = hour >= schedule.start || hour < schedule.end;
        }

        if (!asleep) {
            return { asleep: false };
        }

        wakeDate.setHours(schedule.end, 0, 0, 0);

        if (schedule.start > schedule.end && hour >= schedule.start) {
            wakeDate.setDate(wakeDate.getDate() + 1);
        }

        return {
            asleep: true,
            wakeDate
        };
    },

    refreshAvailability() {
        if (!this.state.isStarted) return;

        const sleepInfo = this.getSleepInfo();

        const buttons = [
            document.getElementById("feed-button"),
            document.getElementById("play-button"),
            document.getElementById("check-button")
        ];

        buttons.forEach(button => {
            button.disabled = sleepInfo.asleep;
        });

        if (sleepInfo.asleep) {
            if (this.state.isSleeping !== true) {
                this.state.isSleeping = true;

                const wakeTime = this.formatTime(sleepInfo.wakeDate);

                document.getElementById("active-blob-situation").textContent =
                    `ASLEEP. WAKING UP AT ${wakeTime}.`;

                document.getElementById("blob-message").textContent =
                    this.getSleepMessage();
            }
        } else if (this.state.isSleeping === true) {
            this.state.isSleeping = false;

            document.getElementById("active-blob-situation").textContent =
                "JUST EXISTING. MENACINGLY.";

            document.getElementById("blob-message").textContent =
                "YOUR BLOB HAS AWAKENED. PROCEED WITH CAUTION.";

        } else {
            this.state.isSleeping = false;
        }
    },

    getSleepMessage() {
        const messages = {
            circle: "Zzz. DREAMING OF A VERY LARGE SNACK.",
            square: "SLEEP MODE ACTIVE. PLEASE RESPECT THE SCHEDULE.",
            triangle: "Zzz. PROBABLY DOING SOMETHING ILLEGAL IN A DREAM."
        };

        return messages[this.state.selectedBlob];
    },

    // HIDDEN NEEDS

    getNeeds() {
        const schedule = this.rules.needs[this.state.selectedBlob];

        if (!schedule) {
            return {
                hungry: false,
                bored: false,
                condition: "normal"
            };
        }

        const hungerLimit = schedule.hungerMinutes
            ? schedule.hungerMinutes / 60
            : schedule.hungerHours;

        const boredomLimit = schedule.boredomMinutes
            ? schedule.boredomMinutes / 60
            : schedule.boredomHours;

        const hungry =
            this.hoursSince(this.state.lastFedAt) >= hungerLimit;

        const bored =
            this.hoursSince(this.state.lastPlayedAt) >= boredomLimit;

        let condition = "normal";

        if (hungry && bored) condition = "both";
        else if (hungry) condition = "hungry";
        else if (bored) condition = "bored";

        return { hungry, bored, condition };
    },

    updateBlobStatus() {
        const needs = this.getNeeds();

        let status = "JUST EXISTING. MENACINGLY.";

        if (needs.condition === "both") {
            status = "HUNGRY. BORED. A COMPLETE DISASTER.";
        } else if (needs.hungry) {
            status = "GETTING HUNGRY. THIS IS YOUR WARNING.";
        } else if (needs.bored) {
            status = "BORED. CONSIDERING QUESTIONABLE ACTIVITIES.";
        }

        document.getElementById("active-blob-situation").textContent = status;
    },

    // AUTOMATIC NEED ALERTS

    checkNeedAlerts() {
        if (!this.state.isStarted || this.getSleepInfo().asleep) return;

        const needs = this.getNeeds();

        if (needs.hungry && needs.bored) {
            if (!this.state.hungerAlerted || !this.state.boredomAlerted) {
                this.state.hungerAlerted = true;
                this.state.boredomAlerted = true;

                this.saveGame();

                this.showMessage(
                    this.getRandomMessage("neglect-alert", "both")
                );
            }

            return;
        }

        if (needs.hungry && !this.state.hungerAlerted) {
            this.state.hungerAlerted = true;
            this.saveGame();

            this.showMessage(
                this.getRandomMessage("neglect-alert", "hungry")
            );
        }

        if (needs.bored && !this.state.boredomAlerted) {
            this.state.boredomAlerted = true;
            this.saveGame();

            this.showMessage(
                this.getRandomMessage("neglect-alert", "bored")
            );
        }
    },

    // FALLBACK MESSAGES

    getFallbackMessage(action, condition) {
        const blob = this.state.selectedBlob;

        const messages = {
            circle: {
                feed: "SNACK TIME. I HAVE NEVER BEEN HAPPIER.",
                play: "YES. LET US DO SOMETHING QUESTIONABLE.",
                check: "I AM PERFECTLY FINE. PROBABLY.",
                hungry: "I AM STARVING. THIS IS A HISTORICAL EVENT.",
                bored: "I HAVE DISCOVERED BOREDOM. I DISLIKE IT.",
                both: "HUNGRY AND BORED. WHAT A BEAUTIFUL DISASTER."
            },
            square: {
                feed: "THANK YOU. MEAL TIME HAS BEEN RECORDED.",
                play: "PLAYTIME HAS BEEN ADDED TO THE SCHEDULE.",
                check: "INSPECTION COMPLETE. EVERYTHING IS MOSTLY IN ORDER.",
                hungry: "MY MEAL IS OVERDUE. THIS IS UNACCEPTABLE.",
                bored: "THERE IS NOTHING ON THE SCHEDULE. DISTURBING.",
                both: "TWO PROBLEMS. I HAVE CREATED A SPREADSHEET."
            },
            triangle: {
                feed: "FOOD ACQUIRED. WHAT ELSE CAN I CONSUME?",
                play: "CHAOS! FINALLY, SOME CULTURE.",
                check: "WHY ARE YOU LOOKING AT ME LIKE THAT?",
                hungry: "I REQUIRE FOOD. IMMEDIATELY. THIS IS A THREAT.",
                bored: "I AM BORED. THE SPOONS LOOK NERVOUS.",
                both: "HUNGRY AND BORED. THE SPOONS WILL PAY."
            }
        };

        let text = messages[blob]?.[action];

        if (action === "neglect-alert") {
            text = messages[blob]?.[condition] ||
                messages[blob]?.both;
        }

        return {
            text: text || "SOMETHING HAS HAPPENED. PROBABLY.",
            expression: condition === "hungry"
                ? "sad"
                : condition === "bored"
                    ? "confused"
                    : condition === "both"
                        ? "shocked"
                        : "happy"
        };
    },

    // MESSAGE DATABASE

    getRandomMessage(action, condition = "normal") {
        if (typeof BlobMessages === "undefined") {
            return this.getFallbackMessage(action, condition);
        }

        const matching = BlobMessages.filter(message =>
            message.blob === this.state.selectedBlob &&
            message.action === action &&
            this.expressions.includes(message.expression)
        );

        if (!matching.length) {
            return this.getFallbackMessage(action, condition);
        }

        let candidates = matching.filter(message =>
            (message.condition || "normal") === condition
        );

        if (!candidates.length) {
            candidates = matching.filter(message =>
                message.condition === "any"
            );
        }

        if (!candidates.length && condition !== "normal") {
            candidates = matching.filter(message =>
                (message.condition || "normal") === "normal"
            );
        }

        if (!candidates.length) candidates = matching;

        const key = `${action}:${condition}`;
        const lastText = this.state.lastMessages[key];

        let available = candidates.filter(message =>
            message.text !== lastText
        );

        if (!available.length) available = candidates;

        const chosen = available[
            Math.floor(Math.random() * available.length)
        ];

        this.state.lastMessages[key] = chosen.text;

        return chosen;
    },

    // SHOW A MESSAGE

    showMessage(message) {
        if (!message) return;

        const activeBlob = document.getElementById("active-blob");

        activeBlob.className =
            `${this.state.selectedBlob} expression-${message.expression}`;

        document.getElementById("blob-message").textContent =
            message.text;

        activeBlob.style.animation = "none";
        void activeBlob.offsetWidth;
        activeBlob.style.animation = "blobPop 0.3s ease";
    },

    showSimpleMessage(text, expression = "confused") {
        this.showMessage({
            text,
            expression
        });
    },

    // ACTION BUTTONS

    setupActions() {
        document.getElementById("feed-button")
            .addEventListener("click", () => this.performAction("feed"));

        document.getElementById("play-button")
            .addEventListener("click", () => this.performAction("play"));

        document.getElementById("check-button")
            .addEventListener("click", () => this.performAction("check"));

        document.getElementById("reset-blob-button")
            .addEventListener("click", () => this.resetBlob());
    },

    performAction(action) {
        if (!this.state.isStarted) return;

        this.refreshAvailability();

        if (this.getSleepInfo().asleep) return;

        this.ensureDailyFeedCount();

        const needsBeforeAction = this.getNeeds();
        const now = this.getNow();

        // FEED

        if (action === "feed") {
            if (this.state.feedsToday >= this.rules.maxFeedsPerDay) {
                this.showSimpleMessage(
                    "THAT'S SIX FEEDS. THE KITCHEN IS CLOSED. PLEASE LEAVE.",
                    "angry"
                );
                return;
            }

            const message = this.getRandomMessage(
                "feed",
                needsBeforeAction.hungry ? "hungry" : "normal"
            );

            this.state.lastFedAt = now;
            this.state.hungerAlerted = false;
            this.state.feedsToday++;

            this.saveGame();
            this.updateBlobStatus();
            this.showMessage(message);
            return;
        }

        // PLAY

        if (action === "play") {
            const message = this.getRandomMessage(
                "play",
                needsBeforeAction.bored ? "bored" : "normal"
            );

            this.state.lastPlayedAt = now;
            this.state.boredomAlerted = false;

            this.saveGame();
            this.updateBlobStatus();
            this.showMessage(message);
            return;
        }

        // CHECK

        if (action === "check") {
            const cooldownMs = this.rules.checkCooldownHours * 3600000;

            if (
                this.state.lastCheckedAt &&
                now - this.state.lastCheckedAt < cooldownMs
            ) {
                const remaining = cooldownMs - (now - this.state.lastCheckedAt);
                const minutes = Math.ceil(remaining / 60000);

                this.showSimpleMessage(
                    `YOU JUST CHECKED. COME BACK IN ${minutes} MINUTES. YOUR BLOB IS BUSY BEING MYSTERIOUS.`,
                    "suspicious"
                );
                return;
            }

            const message = this.getRandomMessage(
                "check",
                needsBeforeAction.condition
            );

            this.state.lastCheckedAt = now;

            this.saveGame();
            this.updateBlobStatus();
            this.showMessage(message);
        }
    }
};

// INTERACTION ANIMATION

const animationStyle = document.createElement("style");

animationStyle.textContent = `
    @keyframes blobPop {
        0% { transform: scale(1); }
        50% { transform: scale(1.12) rotate(-3deg); }
        100% { transform: scale(1); }
    }
`;

document.head.appendChild(animationStyle);

// START GAME

document.addEventListener("DOMContentLoaded", () => {
    Game.init();
});
