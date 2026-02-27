// Centralizovaný seznam blog článků
const blogArticles = [
    {
        id: 'bavlna-v-nejcistsi-podobe',
        title: 'Bavlna v nejčistčí podobě',
        subtitle: 'Naše trička jsou vyrobená z kvalitní bavlny, která je přirozeně hladká, pevná a zároveň měkká na dotek.',
        category: 'tipy',
        date: '27. února 2026',
        readTime: '3 min čtení',
        image: '/assets/blog_bavlna.jpg',
        featured: true,
        tags: ['bavlna', 'kvalita', 'materiál'],
        content: `
            <p>Naše trička jsou vyrobená z kvalitní bavlny, která je přirozeně hladká, pevná a zároveň měkká na dotek. Bavlna dýchá, drží tvar a s časem získává charakter místo toho, aby se vytahovala nebo působila uměle. Díky tomu jsou trička pohodlná, odolná a příjemná na nošení každý den. Každý kus má jemně odlišný odstín nebo texturu – nejde o chybu, ale o důkaz skutečné přírodnosti. Každé tričko je jedinečné, stejně jako bavlna, ze které vzniklo.</p>
            <p>Trička mají boční švy, set-in rukávy, žebrový lem kolem krku (1x1 rib) a zdvojené prošití rukávů i spodního lemu pro větší odolnost a delší životnost. Použitý materiál je 100% organická česaná bavlna (Organic Ring-Spun Combed, 180 g/m² / 5.3 OZ).</p>
            <p>Každé vlákno si zachovává svůj přirozený charakter, což dává tričku jedinečný vzhled a pevnost. Výroba probíhá v Bangladéši, zemi s dlouhou tradicí kvalitní bavlněné výroby. Surová bavlna není o dokonalosti, ale o poctivosti – nabízí kvalitu, jednoduchost a přirozenost, kterou levná trička nikdy nedosáhnou.</p>
        `
    },
    {
        id: 'jak-pecovat-o-surovou-bavlnu',
        title: 'Jak pečovat o surovou bavlnu',
        subtitle: 'Surová bavlna je výjimečná tím, že je zcela přirozená – nebarvená, chemicky neošetřená...',
        category: 'pece',
        date: '26. února 2026',
        readTime: '2 min čtení',
        image: '/assets/blog_jakPecovat.jpg',
        featured: false,
        tags: ['péče', 'praní', 'údržba', 'bavlna'],
        content: `
            <p>Surová bavlna je výjimečná tím, že je zcela přirozená – nebarvená, chemicky neošetřená a autentická. Díky tomu působí jemně, dýchá a je příjemná na pokožce. Aby si trička z tohoto materiálu zachovala svou kvalitu i vzhled, stačí dodržovat základní pravidla praní a žehlení.</p>
            <p>Tričko perte v pračce na studeno, nepoužívejte bělidla a sušte na nízkou teplotu. Pokud žehlíte, použijte nízkou teplotu. Pamatujte, že jemné žmolkování nebo lehké zesvětlení barvy jsou u surové bavlny normální.</p>
            <p>Surová bavlna vám vydrží roky, pokud ji budete udržovat podle těchto jednoduchých pravidel. Stačí trochu ohledu – a vaše tričko vám to vrátí dlouhou životností, pohodlím a přirozenou krásou.</p>
        `
    },
    {
        id: 'jak-vznika-potisk',
        title: 'Jak vzniká potisk',
        subtitle: 'Naše trička využívají moderní technologii tisku, která zachovává přirozený pocit z látky...',
        category: 'trendy',
        date: '25. února 2026',
        readTime: '3 min čtení',
        image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&h=600&fit=crop&crop=center&q=85&auto=format&v=3',
        featured: false,
        tags: ['potisk', 'technologie', 'dtg', 'výroba'],
        content: `
            <p>Naše trička využívají moderní technologii tisku, která zachovává přirozený pocit z látky a zajišťuje dlouhou životnost barev. Tričko zůstává prodyšné, pružné a pohodlné i po mnoha praních. Tento způsob tisku využívá metodu DTG (Direct To Garment), při které barvy nepronikají na povrch, ale přímo do vláken bavlny.</p>
            <p>Díky tomu se potisk stává přirozenou součástí trička. Používají se ekologické vodní barvy, šetrné k pokožce i životnímu prostředí. Proces začíná digitálním návrhem, který se přenáší z počítače přímo na látku pomocí speciální tiskárny.</p>
            <p>Po tisku se barvy tepelně fixují, aby zůstaly syté, stálé a odolné i při častém nošení. Každý kus následně prochází pečlivou kontrolou, aby výsledný motiv přesně odpovídal originálu.</p>
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