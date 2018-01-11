var Word = function () {
    this.wordArray = [
        "triangle", "rectangle", "trapezoid", "pentagon", "decagon", "hexagon", "nonagon"
    ];
    this.pickNewWord = function (count) {
        // Pick a shape from the wordArray and mask it
        this.storedPick = this.wordArray[count];
        this.disguisedWord = this.storedPick.replace(/[a-z]/gi, "_");
        return this.storedPick;
    }; 
    // Store the picked shape and its letter count
    this.storedPick = "";
    this.disguisedWord = "";
};

module.exports = Word;