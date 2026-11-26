const projects = ["To-Do List", "Product API", "Dynamic Chessboard"];
export default function App() {
  return (
    <main className="wrap">
      <header>
        <p className="tag">PORTFOLIO</p>
        <h1>Your Name</h1>
        <p>MCA Student · Web Developer</p>
        <a href="#projects">View Projects ↓</a>
      </header>
      <section>
        <h2>About Me</h2>
        <p>
          I am learning web development and enjoy building useful applications
          with clean, accessible interfaces.
        </p>
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <div className="grid">
          {projects.map((p, i) => (
            <article key={p}>
              <h3>{p}</h3>
              <p>Academic web development lab project #{i + 1}.</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2>Skills</h2>
        <p>HTML · CSS · JavaScript · React · Node.js · Express · MongoDB</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          <a href="mailto:your.email@example.com">your.email@example.com</a>
        </p>
      </section>
      <footer>© 2026 Your Name</footer>
    </main>
  );
}
