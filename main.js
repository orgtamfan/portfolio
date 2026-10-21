const projects = [
  { title: 'Waste Image Classifier', year: 'Project', category: 'Machine learning', description: 'A TensorFlow and Keras image classifier that predicts one of 11 waste-item classes, including PET, HDPE, glass, tin, cups, and bottles.', tags: ['Python', 'TensorFlow', 'Keras', 'Computer vision'], color: 'c-ink', art: 'art-ring', url: 'https://github.com/orgtamfan/bottle_waste_classification', facts: [['Classes', '11 waste-item categories'], ['Model', 'TensorFlow / Keras image classifier'], ['Try it', 'Run the desktop prediction script and select an image']] },
  { title: 'Laundry Management System', year: 'Project', category: 'Web app', description: 'A laundry operations app for staff, service packages, customer orders, payments, and transaction history.', tags: ['PHP', 'MySQL', 'JavaScript'], color: 'c-accent', art: 'art-blocks', url: 'https://github.com/orgtamfan/Laundry_App', facts: [['Features', 'Orders, payments, packages, staff'], ['Stack', 'PHP, MySQL, Vite frontend']] },
  { title: 'Gaming Community Sentiment Analysis', year: 'Project', category: 'Data', description: 'A research project comparing CS2 and VALORANT Reddit sentiment with human-reviewed labels and a Naive Bayes classification baseline.', tags: ['Python', 'NLP', 'scikit-learn'], color: 'c-sky', art: 'art-bars', url: 'https://github.com/orgtamfan/sentiment-analysis', facts: [['Methods', 'TF-IDF, Multinomial Naive Bayes'], ['Labels', 'Positive, neutral, negative']] },
  { title: 'YouTube Audio & Video Downloader', year: 'Project', category: 'Python', description: 'A command-line tool for processing multiple YouTube URLs and saving audio or video with FFmpeg conversion and merge support.', tags: ['Python', 'pytubefix', 'FFmpeg'], color: 'c-amber', art: 'art-circle', url: 'https://github.com/orgtamfan/yt_download_with_pytubefix', facts: [['Formats', 'MP3 audio, AVI video'], ['Features', 'Batch URLs, CLI options, logging']] },
]

const grid = document.querySelector('#grid')
const filters = document.querySelector('#filters')
const modal = document.querySelector('#modal')
const categories = ['All', ...new Set(projects.map(project => project.category))]
let activeFilter = 'All'
let lastCard = null

function renderFilters() {
  filters.innerHTML = categories.map(category => `<button class="chip" type="button" data-filter="${category}" aria-pressed="${category === activeFilter}">${category}</button>`).join('')
}

function renderProjects() {
  const visibleProjects = activeFilter === 'All' ? projects : projects.filter(project => project.category === activeFilter)
  grid.innerHTML = visibleProjects.map((project, index) => `
    <button class="card" type="button" data-project="${projects.indexOf(project)}" style="animation-delay:${index * 70}ms" aria-label="View details for ${project.title}">
      <span class="thumb ${project.color}"><span class="art ${project.art}"></span><span class="label">${project.category}</span></span>
      <span class="card-top"><span><span class="cat">${project.category}</span><h3>${project.title}</h3></span><span class="year">${project.year}</span></span>
      <span>${project.description}</span><ul class="tags">${project.tags.map(tag => `<li>${tag}</li>`).join('')}</ul>
    </button>`).join('')
}

function openProject(index, card) {
  const project = projects[index]
  if (!project) return
  lastCard = card
  document.querySelector('#m-thumb').className = `thumb ${project.color}`
  document.querySelector('#m-thumb').innerHTML = `<span class="art ${project.art}"></span><span class="label">${project.category}</span>`
  document.querySelector('#m-meta').textContent = `${project.category} Â· ${project.year}`
  document.querySelector('#m-title').textContent = project.title
  document.querySelector('#m-desc').textContent = project.description
  document.querySelector('#m-tags').innerHTML = project.tags.map(tag => `<li>${tag}</li>`).join('')
  document.querySelector('#m-facts').innerHTML = project.facts.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('')
  document.querySelector('#m-link').href = project.url
  modal.showModal()
}

renderFilters()
renderProjects()
filters.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]')
  if (!button) return
  activeFilter = button.dataset.filter
  renderFilters()
  renderProjects()
})
grid.addEventListener('click', event => {
  const card = event.target.closest('[data-project]')
  if (card) openProject(Number(card.dataset.project), card)
})
document.querySelector('#mClose').addEventListener('click', () => modal.close())
modal.addEventListener('click', event => { if (event.target === modal) modal.close() })
modal.addEventListener('close', () => lastCard?.focus())

const root = document.documentElement
const themeButton = document.querySelector('#themeBtn')
themeButton.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark'
  root.dataset.theme = theme
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`)
  try { localStorage.setItem('theme', theme) } catch {}
})

const nav = document.querySelector('#nav')
const menuButton = document.querySelector('#menuBtn')
function closeMenu() {
  nav.classList.remove('open')
  menuButton.setAttribute('aria-expanded', 'false')
  menuButton.setAttribute('aria-label', 'Open menu')
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true'
  nav.classList.toggle('open', open)
  menuButton.setAttribute('aria-expanded', String(open))
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
})
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu() })

const header = document.querySelector('#header')
const progress = document.querySelector('#progress')
const toTop = document.querySelector('#toTop')
const year = document.querySelector('#year')
year.textContent = new Date().getFullYear()
function updateScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  progress.style.width = `${scrollable > 0 ? window.scrollY / scrollable * 100 : 0}%`
  header.classList.toggle('scrolled', window.scrollY > 8)
  toTop.classList.toggle('show', window.scrollY > 500)
}
window.addEventListener('scroll', updateScroll, { passive: true })
updateScroll()
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element))

const sections = [...document.querySelectorAll('main section[id]')]
const navLinks = [...document.querySelectorAll('[data-link]')]
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`))
  })
}, { rootMargin: '-25% 0px -65% 0px' })
sections.forEach(section => sectionObserver.observe(section))

document.querySelector('#form').addEventListener('submit', event => {
  event.preventDefault()
  const form = event.currentTarget
  const name = form.elements.name.value.trim()
  const contact = form.elements.contact.value.trim()
  const topic = form.elements.topic.value
  const message = form.elements.message.value.trim()
  const fields = [['name', name], ['message', message]]
  let valid = true
  for (const [field, value] of fields) {
    const input = form.elements[field]
    const error = document.querySelector(`#err-${field}`)
    const missing = !value
    input.setAttribute('aria-invalid', String(missing))
    error.textContent = missing ? `Please enter your ${field}.` : ''
    valid = valid && !missing
  }
  if (!valid) return
  const body = `Hi Olan,\n\n${message}\n\nFrom: ${name}${contact ? `\nContact: ${contact}` : ''}\nTopic: ${topic}`
  const status = document.querySelector('#status')
  status.textContent = 'Opening WhatsApp with your message.'
  window.open(`https://api.whatsapp.com/send/?phone=%2B6289636344630&text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer')
})

