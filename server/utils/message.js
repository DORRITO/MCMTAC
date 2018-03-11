var generateMessage = (from, text, to) => {
    return {
      from,
      text,
      to
    };
};

module.exports = {generateMessage};