const projects = [
  {
    name: 'Laundry Management System',
    description:
      'A PHP and MySQL web app for managing laundry staff, service packages, customer orders, payments, and transaction history across wash, dry-cleaning, and per-item services.',
    technologies: 'PHP | MySQL',
    url: 'https://github.com/orgtamfan/Laundry_App',
  },
  {
    name: 'Sentiment Analysis of Gaming Communities',
    description:
      'A research project comparing sentiment in CS2 and VALORANT Reddit communities. It prepares human-reviewed labels and evaluates a TF-IDF and Multinomial Naive Bayes classifier across positive, neutral, and negative comments.',
    technologies: 'Python | scikit-learn | VADER | NLP',
    url: 'https://github.com/orgtamfan/sentiment-analysis',
  },
  {
    name: 'YouTube Audio & Video Downloader',
    description:
      'A Python command-line tool that accepts multiple YouTube links and downloads audio as MP3, video as 480p AVI, or both. FFmpeg handles conversion and merging.',
    technologies: 'Python | pytubefix | FFmpeg',
    url: 'https://github.com/orgtamfan/yt_download_with_pytubefix',
  },
]

function App() {
  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="about">
          <h1>About Me</h1>
          <p>I build practical software tools and applications.</p>
        </section>

        <section id="projects">
          <h1>Projects</h1>
          <ul>
            {projects.map((project) => (
              <li key={project.url}>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <p>{project.technologies}</p>
                <a href={project.url} target="_blank" rel="noreferrer">
                  View project on GitHub
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact">
          <h1>Get in Touch</h1>
          <p>
            Find me on{' '}
            <a href="https://github.com/orgtamfan" target="_blank" rel="noreferrer">
              GitHub
            </a>
            ,
            <a href="https://api.whatsapp.com/send/?phone=%2B6289636344630&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </p>
        </section>
      </main>

      <footer>
        <p>Copyright 2026 Olan Siallagan</p>
      </footer>
    </>
  )
}

export default App
