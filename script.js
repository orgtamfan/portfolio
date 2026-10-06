const sections = [...document.querySelectorAll('main section[id]')]
const navigationLinks = [...document.querySelectorAll('header nav a[href^="#"]')]
const animatedItems = document.querySelectorAll('main section, #projects > ul > li')

// Keep the copyright date current without editing the page every year.
const footerText = document.querySelector('footer p')
if (footerText) {
  footerText.innerHTML = footerText.innerHTML.replace(/\b2023\b/, new Date().getFullYear())
}

// Reveal content as it enters the viewport, unless the visitor prefers less motion.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return
      target.classList.add('is-visible')
      observer.unobserve(target)
    })
  }, { threshold: 0.12 })

  animatedItems.forEach((item, index) => {
    item.classList.add('reveal')
    if (item.matches('#projects > ul > li')) item.style.transitionDelay = `${index * 90}ms`
    revealObserver.observe(item)
  })
}

// Highlight the navigation item for the section currently in view.
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return
      navigationLinks.forEach((link) => {
        if (link.hash === `#${target.id}`) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      })
    })
  }, { rootMargin: '-25% 0px -60% 0px' })

  sections.forEach((section) => sectionObserver.observe(section))
}
