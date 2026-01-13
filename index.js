const SiteTemplate = document.querySelector("[utemplate]")
const SiteContainer = document.querySelector("[sitec]")
const searchInput = document.querySelector("#search") // Seleciona o input real

let proj = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    proj.forEach(project => {
        // Se incluir o texto, isVisible é true
        const isVisible = project.site.toLowerCase().includes(value) || project.desc.toLowerCase().includes(value)
        // Se isVisible for false, ele adiciona a classe "hide"
        project.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://brunohudley.github.io/siteschool/sites.json")
    .then(res => res.json())
    .then(data => {
        proj = data.map(item => { // 'item' representa cada objeto do JSON
            const card = SiteTemplate.content.cloneNode(true).children[0]
            const siteElement = card.querySelector("[site]")
            const descElement = card.querySelector("[desc]")
            
            siteElement.textContent = item.site
            descElement.textContent = item.desc
            
            SiteContainer.append(card)
            
            return { 
                site: item.site, 
                desc: item.desc, 
                element: card 
            }
        });
    })
