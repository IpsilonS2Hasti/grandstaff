export const chipData = [
    {
        chipName: 'Region',
        title: 'Regions',
        queryParam: 'region',
        content: [
            'Blagoevgrad',
            'Burgas',
            'Dobrich',
            'Gabrovo',
            'Haskovo',
            'Kardzhali',
            'Kyustendil',
            'Lovech',
            'Montana',
            'Pazardzhik',
            'Pernik',
            'Pleven',
            'Plovdiv',
            'Razgrad',
            'Ruse',
            'Shumen',
            'Silistra',
            'Sliven',
            'Smolyan',
            'Sofia City',
            'Sofia (province)',
            'Stara Zagora',
            'Targovishte',
            'Varna',
            'Veliko Tarnovo',
            'Vidin',
            'Vratsa',
            'Yambol',
        ],
    },
    {
        chipName: 'Instrument',
        title: 'Instruments/vocals',
        queryParam: 'instrument',
        content: [
            "Accordion",
            "Bagpipe",
            "Banjo",
            "Bass guitar",
            "Bell",
            "Cello",
            "Clarinet",
            "Cymbal",
            "Drums",
            "Electric guitar",
            "Flute",
            "Gong",
            "Guitar",
            "Harmonica",
            "Harp",
            "Keyboard",
            "Organ",
            "Pan flute",
            "Piano",
            "Recorder",
            "Saxophone",
            "Sitar",
            "Snare drum",
            "Tambourine",
            "Triangle",
            "Trombone",
            "Trumpet",
            "Tuba",
            "Ukulele",
            "Vibraphone",
            "Violin",
            "Xylophone",
        ],
    },
    {
        chipName: 'Genre',
        title: 'Genres',
        queryParam: 'genre',
        content: [
            'Blues',
            'Classical',
            'Electronic',
            'Folk',
            'Metal',
            'Hip-hop',
            'Jazz',
            'Religious',
            'Rock',
            'Pop-folk'
        ],
    },
]

export const ChipDropdownData = [
    {
        chipName: 'Type',
        queryParam: 'type',
        default: 'musicians',
        btns: [
            {
                param: 'musicians',
                name: 'Musicians'
            },
            {
                param: 'bands',
                name: 'Bands'
            },
            {
                param: 'employers',
                name: 'Employers'
            },
        ]
    },
    {
        chipName: 'Education',
        queryParam: 'uEdu',
        default: 'false',
        btns: [
            {
                param: 'false',
                name: 'All'
            },
            {
                param: 'true',
                name: 'Higher'
            },
        ]
    }
]