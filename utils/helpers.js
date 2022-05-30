// formats date and pluralises to "comments" if more than 1 comment
module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },
    format_plural: (word, amount) => {
      if (amount !== 1) {
        return `${word}s`;
      }
  
      return word;
    }
  }