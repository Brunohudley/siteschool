const SiteTemplate = document.querySelector("[utemplate]")
const SiteContainer = document.querySelector("[sitec]")
const searchInput = document.querySelector("#search") // Selecione o input diretamente

let proj = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    proj.forEach(project => {
        // Se o nome ou desc incluir o valor, isVisible é true
        const isVisible = project.site.toLowerCase().includes(value) || 
                          project.desc.toLowerCase().includes(value)
        
        // toggle "hide" se NÃO for visível
        project.element.classList.toggle("hide", !isVisible)
    })
})

fetch("brunohudley.github.io")
    .then(res => res.json())
    .then(data => {
        proj = data.map(item => {
            // Clona o conteúdo do template
            const card = SiteTemplate.content.cloneNode(true).children[0]
            
            const siteAnchor = card.querySelector("[site]")
            const descElement = card.querySelector("[desc]")

            // Preenche o texto e o endereço do link
            siteAnchor.textContent = item.site
            siteAnchor.href = item.link // Define o destino do link
            
            descElement.textContent = item.desc
            
            SiteContainer.append(card)
            
            return { 
                site: item.site, 
                desc: item.desc, 
                element: card 
            }
        });
    })
