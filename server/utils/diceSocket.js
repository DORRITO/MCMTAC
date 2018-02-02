let diceSocket = (name, dice) => {
    return {
      name,
      dice
    };
};

let modifierSocket = (name, modifier) => {
  return {name, modifier}
};

module.exports = {diceSocket, modifierSocket};