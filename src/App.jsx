import { useEffect, useState } from 'react'

const projects = [
  {
    name: 'BS-RoFormer Music Source Separation',
    description:
      'Training, validation, and inference workflows for a Band-Split RoFormer music source-separation model, configured for experiments with the MUSDB18 dataset.',
    technologies: 'Python | BS-RoFormer | Audio ML',
    url: 'https://github.com/orgtamfan/Music_Source_Separation-BS_RoFormer',
  },
  {
    name: 'Waste Image Classifier',
    description:
      "A TensorFlow/Keras image classifier that recognizes 11 waste-item categories using MobileNetV2 transfer learning, with scripts to train the model and predict an image's class.",
    technologies: 'Python | TensorFlow | Keras | MobileNetV2',
    url: 'https://github.com/orgtamfan/bottle_waste_classification',
  },
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
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  useEffect(() => {
    const updateScrollButton = () => {
      setShowScrollToTop(window.scrollY > 400)
    }

    updateScrollButton()
    window.addEventListener('scroll', updateScrollButton, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollButton)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('main > section.reveal')

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

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
        <section id="about" className="reveal">
          <h1>About Me</h1>
          <p>I build practical software tools and applications.</p>
        </section>

        <section id="projects" className="reveal">
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

        <section id="contact" className="reveal">
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

      <button
        className={`scroll-to-top${showScrollToTop ? ' is-visible' : ''}`}
        type="button"
        aria-label="Scroll to top"
        tabIndex={showScrollToTop ? 0 : -1}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        ↑
      </button>
    </>
  )
}

export default App
