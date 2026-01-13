const SiteTemplate = document.querySelector("[utemplate]")
const SiteContainer = document.querySelector("[sitec]")
const searchInput = document.querySelector("#search")

let proj = []

// Busca e renderização inicial
fetch("https://brunohudley.github.io/siteschool/sites.json")
    .then(res => res.json())
    .then(data => {
        proj = data.map(item => {
            // 1. Clona o conteúdo do template
            const card = SiteTemplate.content.cloneNode(true).querySelector(".projs")
            
            // 2. Seleciona os elementos INTERNOS do card clonado
            const siteElement = card.querySelector("[site]")
            const descElement = card.querySelector("[desc]")

            // 3. Preenche os dados (Nome, Link e Descrição)
            siteElement.textContent = item.site; // O texto do link
            siteElement.href = item.link || item.url; // O endereço (ajuste conforme seu JSON)
            descElement.textContent = item.desc;
            
            // 4. Coloca o card na tela
            SiteContainer.append(card)
            
            // Retorna o objeto para a busca funcionar depois
            return { site: item.site, desc: item.desc, element: card }
        });
    })

// Lógica da Barra de Busca
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    proj.forEach(p => {
        const isVisible = p.site.toLowerCase().includes(value) || p.desc.toLowerCase().includes(value)
        p.element.classList.toggle("hide", !isVisible)
    })
})
