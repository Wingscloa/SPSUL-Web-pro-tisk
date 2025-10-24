// Centralizovaný seznam blog článků
const blogArticles = [
    {
        id: 'jak-vybrat-spravne-tricko',
        title: 'Jak vybrat správné tričko pro potisk',
        subtitle: 'Kompletní průvodce výběrem materiálu, střihu a barvy trička pro dokonalý potisk',
        category: 'tipy',
        date: '15. ledna 2024',
        readTime: '5 min čtení',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=600&fit=crop&crop=center&q=85&auto=format&v=3',
        featured: true,
        tags: ['materiál', 'výběr', 'potisk', 'tipy'],
        content: `
            <h2>Výběr materiálu</h2>
            <p>Materiál trička je klíčový pro kvalitu potisku. Doporučujeme:</p>
            <ul>
                <li><strong>100% bavlna</strong> - nejlepší pro většinu technik potisku</li>
                <li><strong>Bavlna/polyester mix</strong> - odolnější, ale náročnější na potisk</li>
                <li><strong>Bio bavlna</strong> - ekologická alternativa</li>
            </ul>

            <h2>Střih a velikost</h2>
            <p>Správný střih zajistí pohodlí a profesionální vzhled:</p>
            <ul>
                <li>Klasický střih pro univerzální použití</li>
                <li>Slim fit pro modernější vzhled</li>
                <li>Oversized pro trendy styl</li>
            </ul>

            <h2>Barva trička</h2>
            <p>Barva trička ovlivňuje výsledný vzhled potisku:</p>
            <ul>
                <li><strong>Bílá</strong> - univerzální, vhodná pro všechny barvy potisku</li>
                <li><strong>Černá</strong> - elegantní, vyžaduje světlé barvy potisku</li>
                <li><strong>Pastelové barvy</strong> - moderní, ale vyžadují pečlivý výběr barev potisku</li>
            </ul>

            <h2>Tipy pro výběr</h2>
            <p>Při výběru trička pro potisk zvažte:</p>
            <ul>
                <li>Účel použití (sport, práce, volný čas)</li>
                <li>Typ potisku (sítotisk, DTG, vinyl)</li>
                <li>Rozpočet</li>
                <li>Kvalitu materiálu</li>
            </ul>
        `
    },
    {
        id: 'trendy-potisky-2024',
        title: 'Největší trendy v potiscích pro rok 2024',
        subtitle: 'Objevte nejnovější trendy v designu a technikách potisku',
        category: 'trendy',
        date: '12. ledna 2024',
        readTime: '4 min čtení',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center&q=85&auto=format&v=3',
        featured: false,
        tags: ['trendy', 'design', '2024'],
        content: `
            <h2>Minimalistické vzory</h2>
            <p>Rok 2024 přináší návrat k jednoduchosti. Minimalistické vzory s čistými liniemi a jednoduchými geometrickými tvary jsou na vrcholu popularity.</p>

            <h2>Barevné gradienty</h2>
            <p>Gradienty jsou stále populární, ale letos se zaměřují na jemnější přechody a pastelové tóny. Oblíbené jsou zejména duhové gradienty a přechody mezi komplementárními barvami.</p>

            <h2>Eko-friendly materiály</h2>
            <p>Rostoucí povědomí o životním prostředí vede k většímu zájmu o ekologické materiály a udržitelné techniky potisku.</p>

            <h2>3D efekty</h2>
            <p>Technologie pokročily natolik, že 3D efekty jsou nyní dostupné i pro běžné potisky. Vytvářejí úžasný vizuální dopad.</p>
        `
    },
    {
        id: 'pece-o-potistene-tricko',
        title: 'Jak správně pečovat o potištěné tričko',
        subtitle: 'Tipy pro prodloužení životnosti vašeho potištěného trička',
        category: 'pece',
        date: '10. ledna 2024',
        readTime: '3 min čtení',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop&crop=center&q=85&auto=format&v=3',
        featured: false,
        tags: ['péče', 'praní', 'údržba'],
        content: `
            <h2>Praní</h2>
            <p>Správné praní je klíčové pro zachování kvality potisku:</p>
            <ul>
                <li>Praní na 30°C nebo nižší teplotě</li>
                <li>Obrácení trička naruby před praním</li>
                <li>Použití jemného pracího prostředku</li>
                <li>Vyhnutí se bělidlu</li>
            </ul>

            <h2>Sušení</h2>
            <p>Sušení má také vliv na kvalitu potisku:</p>
            <ul>
                <li>Přirozené sušení je nejlepší</li>
                <li>Vyhnutí se vysokým teplotám v sušičce</li>
                <li>Sušení na rovině pro zachování tvaru</li>
            </ul>

            <h2>Skladování</h2>
            <p>Jak správně skladovat potištěná trička:</p>
            <ul>
                <li>Skládání místo věšení</li>
                <li>Chránění před přímým sluncem</li>
                <li>Použití ochranných obalů</li>
            </ul>
        `
    },
    {
        id: 'nove-techniky-potisku',
        title: 'Nové techniky potisku, které vás ohromí',
        subtitle: 'Objevte nejnovější technologie v oblasti potisku triček',
        category: 'novinky',
        date: '8. ledna 2024',
        readTime: '6 min čtení',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop&crop=center&q=85&auto=format&v=3',
        featured: false,
        tags: ['technologie', 'inovace', '3D'],
        content: `
            <h2>DTG technologie</h2>
            <p>Direct-to-Garment tisk umožňuje tisknout přímo na textil s vysokou kvalitou a detailností. Ideální pro složité designy a fotografie.</p>

            <h2>3D potisk</h2>
            <p>Nové 3D techniky vytvářejí reliéfní efekty, které jsou hmatatelné a vizuálně ohromující. Perfektní pro logo a text.</p>

            <h2>Eko-friendly barvy</h2>
            <p>Vodou ředitelné barvy bez škodlivých chemikálií jsou stále populárnější. Jsou bezpečné pro životní prostředí i pro pokožku.</p>

            <h2>Hybridní techniky</h2>
            <p>Kombinování různých technik potisku umožňuje vytvářet unikátní efekty, které by nebyly možné s jednou technikou.</p>
        `
    },
    {
        id: 'psychologie-barev',
        title: 'Psychologie barev v potiscích',
        subtitle: 'Jak správně vybrat barvy pro váš potisk',
        category: 'tipy',
        date: '5. ledna 2024',
        readTime: '4 min čtení',
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=600&fit=crop&crop=center&q=85&auto=format&v=3',
        featured: false,
        tags: ['barvy', 'psychologie', 'design'],
        content: `
            <h2>Význam barev</h2>
            <p>Barvy mají silný psychologický dopad na vnímání:</p>
            <ul>
                <li><strong>Červená</strong> - energie, vášeň, důležitost</li>
                <li><strong>Modrá</strong> - důvěra, klid, profesionalita</li>
                <li><strong>Zelená</strong> - příroda, růst, harmonie</li>
                <li><strong>Žlutá</strong> - optimismus, kreativita, pozornost</li>
            </ul>

            <h2>Kontrast a čitelnost</h2>
            <p>Správný kontrast je klíčový pro čitelnost a vizuální dopad potisku. Tmavé barvy na světlém pozadí a naopak.</p>

            <h2>Barevné kombinace</h2>
            <p>Harmonické kombinace barev vytvářejí příjemný vizuální dojem. Používejte barevné kolo pro výběr komplementárních barev.</p>
        `
    },
    {
        id: 'minimalismus-potisky',
        title: 'Minimalismus v potiscích - méně je více',
        subtitle: 'Objevte krásu minimalistických potisků',
        category: 'trendy',
        date: '3. ledna 2024',
        readTime: '3 min čtení',
        image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&h=600&fit=crop&crop=center&q=85&auto=format&v=3',
        featured: false,
        tags: ['minimalismus', 'design', 'jednoduchost'],
        content: `
            <h2>Principy minimalistického designu</h2>
            <p>Minimalismus v potiscích se zaměřuje na:</p>
            <ul>
                <li>Jednoduchost a čistotu</li>
                <li>Funkčnost před ozdobností</li>
                <li>Kvalitní materiály a zpracování</li>
                <li>Časovou nadčasovost</li>
            </ul>

            <h2>Typografie</h2>
            <p>Čisté, jednoduché fonty jsou základem minimalistických potisků. Sans-serif fonty jsou nejpopulárnější.</p>

            <h2>Barevné schéma</h2>
            <p>Omezené barevné palety (1-2 barvy) vytvářejí silný vizuální dopad a snadnou rozpoznatelnost.</p>
        `
    }
];

// Export pro použití v jiných souborech
if (typeof module !== 'undefined' && module.exports) {
    module.exports = blogArticles;
}

// Export pro použití v browseru
if (typeof window !== 'undefined') {
    window.blogArticles = blogArticles;
}