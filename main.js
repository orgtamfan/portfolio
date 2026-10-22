const projects = [
  { title: 'BS-RoFormer Music Source Separation', year: 'Project', category: 'Audio machine learning', description: 'Training, validation, and inference workflows for a Band-Split RoFormer music source-separation model, configured for experiments with the MUSDB18 dataset.', tags: ['Python', 'BS-RoFormer', 'Audio ML'], color: 'c-sky', art: 'art-bars', url: 'https://github.com/orgtamfan/Music_Source_Separation-BS_RoFormer', facts: [['Model', 'Band-Split RoFormer'], ['Dataset', 'MUSDB18'], ['Workflows', 'Training, validation, and audio inference']] },
  { title: 'Waste Image Classifier', year: 'Project', category: 'Machine learning', description: 'A TensorFlow and Keras image classifier that predicts one of 11 waste-item classes, including PET, HDPE, glass, tin, cups, and bottles.', tags: ['Python', 'TensorFlow', 'Keras', 'Computer vision'], color: 'c-ink', art: 'art-ring', url: 'https://github.com/orgtamfan/bottle_waste_classification', facts: [['Classes', '11 waste-item categories'], ['Model', 'TensorFlow / Keras image classifier'], ['Try it', 'Run the desktop prediction script and select an image']] },
  { title: 'Laundry Management System', year: 'Project', category: 'Web app', description: 'A laundry operations app for staff, service packages, customer orders, payments, and transaction history.', tags: ['PHP', 'MySQL', 'JavaScript'], color: 'c-accent', art: 'art-blocks', url: 'https://github.com/orgtamfan/Laundry_App', facts: [['Features', 'Orders, payments, packages, staff'], ['Stack', 'PHP, MySQL, Vite frontend']] },
  { title: 'Gaming Community Sentiment Analysis', year: 'Project', category: 'Data', description: 'A research project comparing CS2 and VALORANT Reddit sentiment with human-reviewed labels and a Naive Bayes classification baseline.', tags: ['Python', 'NLP', 'scikit-learn'], color: 'c-sky', art: 'art-bars', url: 'https://github.com/orgtamfan/sentiment-analysis', facts: [['Methods', 'TF-IDF, Multinomial Naive Bayes'], ['Labels', 'Positive, neutral, negative']] },
  { title: 'YouTube Audio & Video Downloader', year: 'Project', category: 'Python', description: 'A command-line tool for processing multiple YouTube URLs and saving audio or video with FFmpeg conversion and merge support.', tags: ['Python', 'pytubefix', 'FFmpeg'], color: 'c-amber', art: 'art-circle', url: 'https://github.com/orgtamfan/yt_download_with_pytubefix', facts: [['Formats', 'MP3 audio, AVI video'], ['Features', 'Batch URLs, CLI options, logging']] },
]

document.documentElement.classList.add('js')

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
let scrollFrame = null
let savedScrollBehavior = null
function animateWindowScroll(destinationY, duration) {
  if (scrollFrame !== null) cancelAnimationFrame(scrollFrame)
  if (savedScrollBehavior !== null) {
    document.documentElement.style.scrollBehavior = savedScrollBehavior
    savedScrollBehavior = null
  }

  const currentY = window.scrollY
  if (Math.abs(destinationY - currentY) < 2) {
    document.documentElement.scrollTop = destinationY
    return
  }

  const distance = destinationY - currentY
  const startTime = performance.now()
  savedScrollBehavior = document.documentElement.style.scrollBehavior
  document.documentElement.style.scrollBehavior = 'auto'

  const animate = now => {
    const progress = Math.min((now - startTime) / duration, 1)
    const easedProgress = 1 - Math.pow(1 - progress, 4)
    document.documentElement.scrollTop = currentY + distance * easedProgress

    if (progress < 1) {
      scrollFrame = requestAnimationFrame(animate)
    } else {
      scrollFrame = null
      document.documentElement.scrollTop = destinationY
      document.documentElement.style.scrollBehavior = savedScrollBehavior
      savedScrollBehavior = null
    }
  }

  scrollFrame = requestAnimationFrame(animate)
}

nav.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]')
  if (!link) return

  closeMenu()
  const target = document.getElementById(decodeURIComponent(link.hash.slice(1)))
  if (!target) return

  event.preventDefault()
  history.pushState(null, '', link.hash)
  const currentY = window.scrollY
  const scrollMargin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
  const destinationY = Math.max(0, target.getBoundingClientRect().top + currentY - scrollMargin)
  const duration = Math.min(900, Math.max(500, Math.abs(destinationY - currentY) * 0.35))
  animateWindowScroll(destinationY, duration)
})

const header = document.querySelector('#header')
const progress = document.querySelector('#progress')
const toTop = document.querySelector('#toTop')
const year = document.querySelector('#year')
if (year) year.textContent = new Date().getFullYear()
function updateScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  progress.style.width = `${scrollable > 0 ? window.scrollY / scrollable * 100 : 0}%`
  header.classList.toggle('scrolled', window.scrollY > 8)
  toTop.classList.toggle('show', window.scrollY > 500)
}
window.addEventListener('scroll', updateScroll, { passive: true })
updateScroll()
toTop.addEventListener('click', () => {
  animateWindowScroll(0, Math.min(900, Math.max(500, window.scrollY * 0.35)))
})

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element))
setTimeout(() => {
  document.querySelectorAll('.card').forEach(element => revealObserver.observe(element))
}, 100)

const aboutImage = document.querySelector('.about .photo img')
const heroHeading = document.querySelector('.hero h1')
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY

  if (heroHeading) {
    heroHeading.style.transform = `translate3d(0, ${scrollY * -0.15}px, 0)`
  }

  if (aboutImage) {
    aboutImage.style.transform = `translate3d(0, ${scrollY * 0.05}px, 0)`
  }
}, { passive: true })

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
  const subject = encodeURIComponent(`Portfolio message: ${topic}`)
  const body = encodeURIComponent(`Hi Olan,\n\n${message}\n\nFrom: ${name}${contact ? `\nContact: ${contact}` : ''}\nTopic: ${topic}`)
  const status = document.querySelector('#status')
  const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=olansiallagan6%40gmail.com&su=${subject}&body=${body}`
  status.textContent = 'Opening a Gmail draft. If it does not open, '
  const fallbackLink = document.createElement('a')
  fallbackLink.href = composeUrl
  fallbackLink.target = '_blank'
  fallbackLink.rel = 'noopener noreferrer'
  fallbackLink.textContent = 'open Gmail here'
  status.append(fallbackLink, '.')
  window.open(composeUrl, '_blank', 'noopener,noreferrer')
})
