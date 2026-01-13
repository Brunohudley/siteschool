const SiteTemplate = document.querySelector("[utemplate]")
const SiteContainer = document.querySelector("[sitec]")
const searchInput = document.querySelector("#search")

let proj = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    proj.forEach(p => {
        // Verifica se p.site e p.desc existem antes de dar toLowerCase
        const siteName = p.site ? p.site.toLowerCase() : ""
        const siteDesc = p.desc ? p.desc.toLowerCase() : ""
        const isVisible = siteName.includes(value) || siteDesc.includes(value)
        p.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://brunohudley.github.io/siteschool/sites.json")
    .then(res => res.json())
    .then(data => {
        // Limpa o container antes de preencher (evita duplicatas)
        SiteContainer.innerHTML = "" 
        
        proj = data.map(item => {
            const cardClone = SiteTemplate.content.cloneNode(true)
            const card = cardClone.querySelector(".projs")
            
            const siteElement = card.querySelector("[site]")
            const descElement = card.querySelector("[desc]")

            siteElement.textContent = item.site
            siteElement.href = item.link
            descElement.textContent = item.desc
            
            SiteContainer.append(card)
            
            return { site: item.site, desc: item.desc, element: card }
        })
    })
    .catch(err => console.error("Erro ao carregar o site:", err))
