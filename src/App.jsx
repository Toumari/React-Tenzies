import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSame = dice.every((die) => die.value === firstValue);

    if (allHeld && allSame) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function generateNewDie() {
    return {
      number: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollNewDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function resetGame() {
    setDice(allNewDice());
    setTenzies(false);
  }

  const diceElements = dice.map((die) => (
    <Die
      isHeld={die.isHeld}
      value={die.number}
      key={die.id}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      <h1>Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-btn" onClick={tenzies ? resetGame : rollNewDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
