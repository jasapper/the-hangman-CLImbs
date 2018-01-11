// Big bad letter constructor

var Letter = function () {
    this.letterCount = function (word) {
        // DONE Count the number of characters in the title
        // regex to match all the letters of a title (case-insensitive)
        var regEx = /[a-z]/gi;
        var match = word.match(regEx);
        if (match) {
            letterCount = match.length;
        }
        return letterCount;
    }
}

module.exports = Letter;