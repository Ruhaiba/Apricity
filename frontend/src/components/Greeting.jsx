import { useState } from "react";

const greetings = [
    "Hey! Apricity Here. Your Programming Assistant",
    "I'm Apricity! Compatabile with Ruby, PHP, JavaScript, TypeScript and Python!",
    "Your one and only Apricity, ready to help.",
    "Debugging? Optimization? Refactoring? I'm ready when you are",
    "Definition of Apricity: The warmth in winter",

];

function Greeting() {
  const [greeting] = useState(
    greetings[Math.floor(Math.random() * greetings.length)]
  );

  return (
    <section className="greeting">
      <div className="greeting-icon">✦</div>
      <p>{greeting}</p>
    </section>
  );
}

export default Greeting;