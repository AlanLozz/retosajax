const router = require('express').Router();
const fs = require('fs-extra');
const p = require('path');

let movies = [
    {
        titulo: 'Scary Movie',
        descripcion: 'Una parodia de los filmes de asesinatos donde un homicida vengativo acecha a un grupo de adolescentes.',
        director: 'Keenen Ivory Wayans',
        reparto: [
            "Marlon Wayans",
            "Shawn Wayans",
            "Jason Friedberg",
            "Aaron Seltzer",
            "Buddy Johnson",
            "Phil Beauman"
        ],
        year: 2000,
        image: '/images/ScaryMovie.jpg'
    },
    {
        titulo: 'Volver al futuro',
        descripcion: 'Una máquina del tiempo transporta a un adolescente a los años 50, cuando sus padres todavía estudiaban en la secundaria.',
        director: 'Robert Zemeckis',
        reparto: [
            "Michael J. Fox",
            "Christopher Loyd",
            "Lea Thompson",
            "Thomas F. Wilson"
        ],
        year: 1985,
        image: '/images/BTTF.jpg'
    },
    {
        titulo: 'Batman: <br>El caballero de la noche',
        descripcion: 'Batman tiene que mantener el equilibrio entre el heroísmo y el vigilantismo para pelear contra un vil criminal conocido como el Guasón, que pretende sumir Ciudad Gótica en la anarquía.',
        director: 'Christopher Nolan',
        reparto: [
            "Christian Bale",
            "Heath Ledger",
            "Gary Oldman",
            "Michael Caine"
        ],
        year: 2008,
        image: '/images/Batman.jpg'
    },
    {
        titulo: 'Ready Player One',
        descripcion: 'Año 2045: el adolescente Wade Watts es solo una de las millones de personas que se evaden del sombrío mundo real para sumergirse en un mundo utópico virtual donde todo es posible: OASIS. Wade participa en la búsqueda del tesoro que el creador de este mundo imaginario dejó oculto en su obra. No obstante, hay gente muy peligrosa compitiendo contra él.',
        director: 'Steven Spielberg',
        reparto: [
            "Olivia Cooke",
            "Tye Sheridan",
            "Ben Mendelsohn",
            "Lena Waithe"
        ],
        year: 2018,
        image: '/images/RPO.jpg'
    },
    {
        titulo: 'Infinity War',
        descripcion: 'Los superhéroes se alían para vencer al poderoso Thanos, el peor enemigo al que se han enfrentado. Si Thanos logra reunir las seis gemas del infinito: poder, tiempo, alma, realidad, mente y espacio, nadie podrá detenerlo.',
        director: 'Joe Russo, Anthony Russo',
        reparto: [
            "Tom Holland",
            "Robert Downey Jr.",
            "Chris Hemsworth",
            "Chris Evans"
        ],
        year: 0,
        image: '/images/IW.jpg'
    },
]

router.get('/', (req, res) => {
    res.render('Peliculas');
});

router.get('/getmovies', (req, res) => {
    res.json(movies);
});

router.get('/updaterating/:index/:rating', (req, res) => {
    const {index, rating} = req.params;
    movies[index].rate = rating;
    res.status(200);
});

router.post('/addmovie', async(req,res) => {
    const {titulo, director, reparto, sinopsis, year} = req.body;
    const {filename, originalname, path} = req.file;
    let ext = p.extname(originalname);
    let newName = filename+ext;
    await fs.move(path,p.join(__dirname,`../public/images/${newName}`));
    movies.push({
        titulo,
        descripcion: sinopsis,
        director,
        reparto,
        year,
        image: `/images/${filename}${ext}`
    })
});

module.exports = router;