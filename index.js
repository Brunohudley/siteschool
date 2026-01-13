const SiteTemplate = document.querySelector("[utemplate]")
const SiteContainer = document.querySelector("[sitec]")
const searchInput = document.querySelector("#search")

let proj = []

// Busca e renderização
fetch("https://brunohudley.github.io/siteschool/sites.json")
    .then(res => res.json())
    .then(data => {
        proj = data.map(item => {
            const cardClone = SiteTemplate.content.cloneNode(true)
            const card = cardClone.firstElementChild 
            
            const siteElement = card.querySelector("[site]")
            const descElement = card.querySelector("[desc]")

            // Preenche os dados
            siteElement.textContent = item.site
            siteElement.href = item.link
            descElement.textContent = item.desc
            
            SiteContainer.append(card)
            
            // Salva para a busca funcionar (em minúsculo para comparar melhor)
            return { 
                site: item.site.toLowerCase(), 
                desc: item.desc.toLowerCase(), 
                element: card 
            }
        })
    })

// Lógica de busca insensível a maiúsculas/minúsculas
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    proj.forEach(p => {
        const isVisible = p.site.includes(value) || p.desc.includes(value)
        p.element.classList.toggle("hide", !isVisible)
    })
})
