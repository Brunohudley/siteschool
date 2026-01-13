const SiteTemplate = document.querySelector("[utemplate]")
const SiteContainer = document.querySelector("[sitec]")
const searchInput = document.querySelector("#search")

let proj = []

// Busca e renderização inicial
fetch("https://brunohudley.github.io/siteschool/sites.json")
    .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar JSON");
        return res.json();
    })
    .then(data => {
        proj = data.map(item => {
            // Importante: .content.firstElementChild garante que pegamos a DIV e não texto vazio
            const card = SiteTemplate.content.cloneNode(true).firstElementChild 
            
            const siteElement = card.querySelector("[site]")
            const descElement = card.querySelector("[desc]")

            siteElement.textContent = item.site;
            siteElement.href = item.link;
            descElement.textContent = item.desc;
            
            SiteContainer.append(card)
            
            return { site: item.site, desc: item.desc, element: card }
        });
    })
    .catch(err => console.error("Falha fatal:", err));

// Lógica da Barra de Busca
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    proj.forEach(p => {
        const isVisible = p.site.toLowerCase().includes(value) || 
                          p.desc.toLowerCase().includes(value)
        p.element.classList.toggle("hide", !isVisible)
    })
})
