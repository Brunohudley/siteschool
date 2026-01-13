const SiteTemplate = document.querySelector("[utemplate]")
const SiteContainer = document.querySelector("[sitec]")
const searchInput = document.querySelector("#search")

let proj = []

// Lógica da Barra de Busca
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    proj.forEach(p => {
        // Verifica se o texto pesquisado está no título ou na descrição
        const isVisible = p.site.toLowerCase().includes(value) || 
                          p.desc.toLowerCase().includes(value)
        
        // toggle adiciona a classe "hide" se isVisible for false
        p.element.classList.toggle("hide", !isVisible)
    })
})

// Busca e renderização inicial
fetch("https://brunohudley.github.io/siteschool/sites.json")
    .then(res => res.json())
    .then(data => {
        proj = data.map(item => {
            // Clona o conteúdo do template
            const cardClone = SiteTemplate.content.cloneNode(true)
            // Pega o elemento real (a div .projs)
            const card = cardClone.firstElementChild 
            
            const siteElement = card.querySelector("[site]")
            const descElement = card.querySelector("[desc]")

            // Preenche os dados
            siteElement.textContent = item.site
            siteElement.href = item.link
            descElement.textContent = item.desc
            
            // Adiciona ao container na tela
            SiteContainer.append(card)
            
            // Retorna o objeto para a lista de busca
            return { 
                site: item.site, 
                desc: item.desc, 
                element: card 
            }
        })
    })
    .catch(err => console.error("Erro ao carregar o JSON. Verifique as vírgulas!", err))
