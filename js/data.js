/*
=====================================================
  Dr. Botany — Centralized Data Store
  এখানে সমস্ত বই, কোয়েশ্চেন, নোটিশ ইত্যাদির ডেটা আছে
  পরবর্তীতে Firebase Firestore দিয়ে রিপ্লেস করতে পারবে
=====================================================
*/

const DrBotanyData = {

  /* ── বই ── */
  books: [
    {
      id: 'book-001',
      title: 'Cell Biology & Molecular Biology',
      author: 'De Roberties & De Roberties',
      category: 'cell-biology',
      categoryLabel: 'Cell Biology',
      semester: '3rd',
      pages: 680,
      year: 2023,
      trending: true,
      cover: 'https://picsum.photos/seed/cellbio1/300/420.jpg',
      description: 'Comprehensive textbook covering cell structure, organelles, and molecular mechanisms.',
      pdfUrl: 'pdfs/books/cell-biology-de-robertis.pdf'
    },
    {
      id: 'book-002',
      title: 'Genetics: Analysis & Principles',
      author: 'Brooker',
      category: 'genetics',
      categoryLabel: 'Genetics',
      semester: '4th',
      pages: 520,
      year: 2023,
      trending: false,
      cover: 'https://picsum.photos/seed/genetics1/300/420.jpg',
      description: 'Detailed coverage of Mendelian genetics, molecular genetics, and genomics.',
      pdfUrl: 'pdfs/books/genetics-brooker.pdf'
    },
    {
      id: 'book-003',
      title: 'Phycology: Algae & Their Biology',
      author: 'Lee & Lee',
      category: 'phycology',
      categoryLabel: 'Phycology',
      semester: '2nd',
      pages: 440,
      year: 2022,
      trending: true,
      cover: 'https://picsum.photos/seed/phycology1/300/420.jpg',
      description: 'Study of algae including classification, life cycles, and ecological significance.',
      pdfUrl: 'pdfs/books/phycology-lee.pdf'
    },
    {
      id: 'book-004',
      title: 'Plant Physiology',
      author: 'Taiz & Zeiger',
      category: 'physiology',
      categoryLabel: 'Plant Physiology',
      semester: '5th',
      pages: 760,
      year: 2024,
      trending: true,
      cover: 'https://picsum.photos/seed/physio1/300/420.jpg',
      description: 'The gold standard textbook for plant physiology covering all major processes.',
      pdfUrl: 'pdfs/books/plant-physiology-taiz.pdf'
    },
    {
      id: 'book-005',
      title: 'Microbiology: Principles & Explorations',
      author: 'Black',
      category: 'microbiology',
      categoryLabel: 'Microbiology',
      semester: '5th',
      pages: 480,
      year: 2022,
      trending: false,
      cover: 'https://picsum.photos/seed/micro1/300/420.jpg',
      description: 'Exploring the microbial world with emphasis on bacteria, viruses, and immunology.',
      pdfUrl: 'pdfs/books/microbiology-black.pdf'
    },
    {
      id: 'book-006',
      title: 'Plant Taxonomy: Classification & Systematics',
      author: 'Simpson',
      category: 'taxonomy',
      categoryLabel: 'Taxonomy',
      semester: '3rd',
      pages: 590,
      year: 2023,
      trending: false,
      cover: 'https://picsum.photos/seed/taxonomy1/300/420.jpg',
      description: 'Modern approach to plant classification including phylogenetics and cladistics.',
      pdfUrl: 'pdfs/books/taxonomy-simpson.pdf'
    },
    {
      id: 'book-007',
      title: 'Fundamentals of Ecology',
      author: 'Odum & Barrett',
      category: 'ecology',
      categoryLabel: 'Ecology',
      semester: '6th',
      pages: 620,
      year: 2021,
      trending: true,
      cover: 'https://picsum.photos/seed/ecology1/300/420.jpg',
      description: 'Classic ecology text covering ecosystems, populations, and environmental science.',
      pdfUrl: 'pdfs/books/ecology-odum.pdf'
    },
    {
      id: 'book-008',
      title: 'Biochemistry',
      author: 'Voet & Voet',
      category: 'biochemistry',
      categoryLabel: 'Biochemistry',
      semester: '4th',
      pages: 850,
      year: 2023,
      trending: false,
      cover: 'https://picsum.photos/seed/biochem1/300/420.jpg',
      description: 'Comprehensive biochemistry reference covering metabolism, enzymes, and molecular biology.',
      pdfUrl: 'pdfs/books/biochemistry-voet.pdf'
    },
    {
      id: 'book-009',
      title: 'Plant Anatomy',
      author: 'Esau',
      category: 'other',
      categoryLabel: 'Other',
      semester: '3rd',
      pages: 380,
      year: 2022,
      trending: false,
      cover: 'https://picsum.photos/seed/anatomy1/300/420.jpg',
      description: 'Definitive guide to plant tissue structure and development.',
      pdfUrl: 'pdfs/books/plant-anatomy-esau.pdf'
    },
    {
      id: 'book-010',
      title: 'Molecular Biology of the Cell',
      author: 'Alberts et al.',
      category: 'cell-biology',
      categoryLabel: 'Cell Biology',
      semester: '4th',
      pages: 920,
      year: 2024,
      trending: true,
      cover: 'https://picsum.photos/seed/molbio1/300/420.jpg',
      description: 'The most comprehensive cell biology textbook available.',
      pdfUrl: 'pdfs/books/molecular-biology-alberts.pdf'
    },
    {
      id: 'book-011',
      title: 'Bryophyta & Pteridophyta',
      author: 'Rashid',
      category: 'other',
      categoryLabel: 'Other',
      semester: '2nd',
      pages: 340,
      year: 2021,
      trending: false,
      cover: 'https://picsum.photos/seed/bryo1/300/420.jpg',
      description: 'Detailed study of non-vascular and seedless vascular plants.',
      pdfUrl: 'pdfs/books/bryophyta-rashid.pdf'
    },
    {
      id: 'book-012',
      title: 'Principles of Genetics',
      author: 'Gardner et al.',
      category: 'genetics',
      categoryLabel: 'Genetics',
      semester: '4th',
      pages: 460,
      year: 2022,
      trending: false,
      cover: 'https://picsum.photos/seed/genprinc1/300/420.jpg',
      description: 'Classic genetics textbook with problem-solving approach.',
      pdfUrl: 'pdfs/books/genetics-gardner.pdf'
    },
    {
      id: 'book-013',
      title: 'Plant Pathology',
      author: 'Agrios',
      category: 'microbiology',
      categoryLabel: 'Microbiology',
      semester: '6th',
      pages: 540,
      year: 2023,
      trending: false,
      cover: 'https://picsum.photos/seed/pathol1/300/420.jpg',
      description: 'Comprehensive coverage of plant diseases, pathogens, and control measures.',
      pdfUrl: 'pdfs/books/plant-pathology-agrios.pdf'
    },
    {
      id: 'book-014',
      title: 'Environmental Botany',
      author: 'Kumar',
      category: 'ecology',
      categoryLabel: 'Ecology',
      semester: '7th',
      pages: 390,
      year: 2022,
      trending: false,
      cover: 'https://picsum.photos/seed/envbot1/300/420.jpg',
      description: 'Environmental science from a botanical perspective.',
      pdfUrl: 'pdfs/books/environmental-botany-kumar.pdf'
    },
    {
      id: 'book-015',
      title: 'Biochemistry of Plants',
      author: 'Heldt & Piechulla',
      category: 'biochemistry',
      categoryLabel: 'Biochemistry',
      semester: '5th',
      pages: 570,
      year: 2024,
      trending: true,
      cover: 'https://picsum.photos/seed/biochem2/300/420.jpg',
      description: 'Plant-specific biochemistry covering photosynthesis, respiration, and metabolism.',
      pdfUrl: 'pdfs/books/biochemistry-plants-heldt.pdf'
    },
    {
      id: 'book-016',
      title: 'Mycology: Fungi & Their Biology',
      author: 'Webster & Weber',
      category: 'other',
      categoryLabel: 'Other',
      semester: '4th',
      pages: 420,
      year: 2023,
      trending: false,
      cover: 'https://picsum.photos/seed/mycolo1/300/420.jpg',
      description: 'Comprehensive study of fungi including classification, physiology, and ecology.',
      pdfUrl: 'pdfs/books/mycology-webster.pdf'
    }
  ],

  /* বই ক্যাটেগরি তালিকা */
  bookCategories: [
    { id: 'cell-biology', label: 'Cell Biology', icon: 'fa-microscope', color: 'green' },
    { id: 'genetics', label: 'Genetics', icon: 'fa-dna', color: 'purple' },
    { id: 'phycology', label: 'Phycology', icon: 'fa-water', color: 'teal' },
    { id: 'physiology', label: 'Plant Physiology', icon: 'fa-seedling', color: 'green' },
    { id: 'microbiology', label: 'Microbiology', icon: 'fa-bacterium', color: 'red' },
    { id: 'taxonomy', label: 'Taxonomy', icon: 'fa-sitemap', color: 'blue' },
    { id: 'ecology', label: 'Ecology', icon: 'fa-globe', color: 'teal' },
    { id: 'biochemistry', label: 'Biochemistry', icon: 'fa-flask', color: 'amber' },
    { id: 'other', label: 'Other Subjects', icon: 'fa-book-open', color: 'green' }
  ],


  /* ── প্রিভিয়াস কোয়েশ্চেন ── */
  questions: [
    { id: 'q-001', subject: 'Cell Biology', semester: '3rd', year: 2024, category: 'cell-biology', totalQuestions: 10, repeated: 3, pdfUrl: 'pdfs/questions/cell-bio-2024.pdf' },
    { id: 'q-002', subject: 'Genetics', semester: '4th', year: 2024, category: 'genetics', totalQuestions: 12, repeated: 5, pdfUrl: 'pdfs/questions/genetics-2024.pdf' },
    { id: 'q-003', subject: 'Phycology', semester: '2nd', year: 2023, category: 'phycology', totalQuestions: 8, repeated: 2, pdfUrl: 'pdfs/questions/phycology-2023.pdf' },
    { id: 'q-004', subject: 'Plant Physiology', semester: '5th', year: 2023, category: 'physiology', totalQuestions: 10, repeated: 4, pdfUrl: 'pdfs/questions/physiology-2023.pdf' },
    { id: 'q-005', subject: 'Microbiology', semester: '5th', year: 2024, category: 'microbiology', totalQuestions: 11, repeated: 3, pdfUrl: 'pdfs/questions/microbiology-2024.pdf' },
    { id: 'q-006', subject: 'Taxonomy', semester: '3rd', year: 2022, category: 'taxonomy', totalQuestions: 9, repeated: 4, pdfUrl: 'pdfs/questions/taxonomy-2022.pdf' },
    { id: 'q-007', subject: 'Ecology', semester: '6th', year: 2023, category: 'ecology', totalQuestions: 10, repeated: 2, pdfUrl: 'pdfs/questions/ecology-2023.pdf' },
    { id: 'q-008', subject: 'Biochemistry', semester: '4th', year: 2022, category: 'biochemistry', totalQuestions: 12, repeated: 5, pdfUrl: 'pdfs/questions/biochemistry-2022.pdf' },
    { id: 'q-009', subject: 'Cell Biology', semester: '3rd', year: 2022, category: 'cell-biology', totalQuestions: 10, repeated: 3, pdfUrl: 'pdfs/questions/cell-bio-2022.pdf' },
    { id: 'q-010', subject: 'Genetics', semester: '4th', year: 2021, category: 'genetics', totalQuestions: 10, repeated: 4, pdfUrl: 'pdfs/questions/genetics-2021.pdf' },
    { id: 'q-011', subject: 'Plant Pathology', semester: '6th', year: 2021, category: 'microbiology', totalQuestions: 8, repeated: 2, pdfUrl: 'pdfs/questions/pathology-2021.pdf' },
    { id: 'q-012', subject: 'Ecology', semester: '6th', year: 2024, category: 'ecology', totalQuestions: 10, repeated: 3, pdfUrl: 'pdfs/questions/ecology-2024.pdf' },
    { id: 'q-013', subject: 'Phycology', semester: '2nd', year: 2021, category: 'phycology', totalQuestions: 8, repeated: 1, pdfUrl: 'pdfs/questions/phycology-2021.pdf' },
    { id: 'q-014', subject: 'Plant Physiology', semester: '5th', year: 2022, category: 'physiology', totalQuestions: 10, repeated: 3, pdfUrl: 'pdfs/questions/physiology-2022.pdf' },
    { id: 'q-015', subject: 'Taxonomy', semester: '3rd', year: 2024, category: 'taxonomy', totalQuestions: 9, repeated: 3, pdfUrl: 'pdfs/questions/taxonomy-2024.pdf' },
  ],


  /* ── সাজেশন ── */
  suggestions: {
    subjects: [
      {
        subject: 'Cell Biology',
        importance: 'high',
        topics: [
          'Structure & Function of Cell Organelles',
          'Cell Cycle & Cell Division (Mitosis & Meiosis)',
          'Membrane Transport Mechanisms',
          'Signal Transduction Pathways',
          'Apoptosis & Programmed Cell Death',
          'Endoplasmic Reticulum & Golgi Function',
          'Cytoskeleton & Cell Motility'
        ]
      },
      {
        subject: 'Genetics',
        importance: 'high',
        topics: [
          'Mendelian Genetics & Extensions',
          'Gene Interaction & Epistasis',
          'Linkage & Crossing Over',
          'Molecular Genetics: DNA Replication',
          'Gene Expression & Regulation',
          'Mutation & DNA Repair Mechanisms',
          'Population Genetics'
        ]
      },
      {
        subject: 'Plant Physiology',
        importance: 'high',
        topics: [
          'Photosynthesis: Light & Dark Reactions',
          'Respiration & Fermentation',
          'Plant Growth Regulators (Auxin, Gibberellin, Cytokinin, Ethylene, ABA)',
          'Mineral Nutrition & Transport',
          'Photoperiodism & Vernalization',
          'Seed Dormancy & Germination',
          'Stress Physiology'
        ]
      },
      {
        subject: 'Phycology',
        importance: 'medium',
        topics: [
          'Classification of Algae (Fritsch System)',
          'Life Cycles of Chlorophyceae',
          'Economic Importance of Algae',
          'Cell Structure of Cyanobacteria',
          'Ecological Role of Algae',
          'Algal Blooms & Toxins'
        ]
      },
      {
        subject: 'Microbiology',
        importance: 'medium',
        topics: [
          'Bacterial Cell Structure & Function',
          'Viral Replication Cycles',
          'Immune Response Mechanisms',
          'Fermentation Technology',
          'Antibiotic Resistance & Mechanisms',
          'Soil Microbiology'
        ]
      },
      {
        subject: 'Taxonomy',
        importance: 'medium',
        topics: [
          'Bentham & Hooker Classification',
          'Engler & Prantl System',
          'Study of Important Families (Rosaceae, Fabaceae, Poaceae, Solanaceae)',
          'ICBN Rules',
          'Herbarium Techniques',
          'Numerical Taxonomy'
        ]
      }
    ],

    viva: [
      {
        subject: 'Cell Biology',
        questions: [
          'What is the difference between prokaryotic and eukaryotic cells?',
          'Explain the function of the Golgi apparatus.',
          'What are the stages of mitosis? Describe each briefly.',
          'Describe the fluid mosaic model of cell membrane.',
          'What is the role of ribosomes in protein synthesis?',
          'Differentiate between rough and smooth endoplasmic reticulum.',
          'What are lysosomes and their functions?',
          'Explain the structure and function of mitochondria.'
        ]
      },
      {
        subject: 'Genetics',
        questions: [
          'Define allele and gene. How are they different?',
          'What is a test cross? Why is it performed?',
          'Explain incomplete dominance with examples.',
          'What is the Hardy-Weinberg principle?',
          'Describe the process of DNA replication.',
          'What is epistasis? Give an example.',
          'Differentiate between linkage and crossing over.',
          'What are mutagens? Give examples.'
        ]
      },
      {
        subject: 'Plant Physiology',
        questions: [
          'What is the difference between C3 and C4 plants?',
          'Explain the light-dependent reactions of photosynthesis.',
          'What are plant growth regulators? Name five.',
          'Explain the role of auxin in plant growth.',
          'What is photoperiodism?',
          'Differentiate between transpiration and guttation.',
          'What is vernalization?',
          'Explain the Krebs cycle briefly.'
        ]
      },
      {
        subject: 'Phycology',
        questions: [
          'How are algae classified according to Fritsch?',
          'What is the economic importance of algae?',
          'Describe the life cycle of Chlamydomonas.',
          'What are cyanobacteria? Why are they important?',
          'Differentiate between Chlorophyceae and Phaeophyceae.',
          'What is an algal bloom? Why is it harmful?'
        ]
      }
    ],

    shortNotes: [
      { title: 'Mitosis vs Meiosis', content: 'Mitosis: One division, 2 diploid daughter cells, somatic cells, no crossing over. Meiosis: Two divisions, 4 haploid daughter cells, gametes, crossing over occurs in prophase I.' },
      { title: 'DNA vs RNA', content: 'DNA: Double helix, deoxyribose sugar, thymine, nuclear location, self-replicating. RNA: Single strand, ribose sugar, uracil, found in nucleus and cytoplasm, synthesized from DNA template.' },
      { title: 'C3 vs C4 Plants', content: 'C3: Calvin cycle only, 3C first product (PGA), mesophyll cells, photorespiration occurs. C4: Hatch-Slack pathway + Calvin, 4C first product (OAA), bundle sheath cells, Kranz anatomy, no photorespiration.' },
      { title: 'Gram + vs Gram - Bacteria', content: 'Gram+: Thick peptidoglycan layer, teichoic acid present, no outer membrane, stains purple. Gram-: Thin peptidoglycan, outer membrane with LPS present, periplasmic space, stains pink/red.' },
      { title: 'Xylem vs Phloem', content: 'Xylem: Dead cells, transports water & minerals, unidirectional (upward), tracheids & vessels. Phloem: Living cells, transports organic nutrients, bidirectional, sieve tubes & companion cells.' },
      { title: 'Monocot vs Dicot', content: 'Monocot: One cotyledon, parallel venation, scattered vascular bundles, fibrous root. Dicot: Two cotyledons, reticulate venation, arranged vascular bundles, tap root system.' }
    ],

    examPrep: [
      { title: 'Time Management Strategy', content: 'Divide 3 hours: 30 min reading all questions, 2 hours writing (start with high-mark questions), 30 min revision. Attempt all compulsory questions first. Allocate time proportional to marks.' },
      { title: 'Answer Writing Tips', content: 'Use diagrams wherever possible (they carry marks). Start with a clear definition, add detailed explanation, end with significance. Use bullet points for lists. Label all diagrams properly. Underline key terms.' },
      { title: 'Most Repeated Topics (All Subjects)', content: 'Cell organelles structure-function, Mendel\'s laws & deviations, Photosynthesis detailed mechanism, Bacterial cell structure, Plant families characteristics, Ecological succession, DNA replication & transcription, Plant hormone functions' },
      { title: 'Last Minute Revision Strategy', content: 'Focus only on: (1) Labeled diagrams, (2) Key definitions, (3) Comparative tables (C3/C4, Mitosis/Meiosis, etc.), (4) Review short notes, (5) Go through viva questions. Do not start new topics.' },
      { title: 'Practical Exam Tips', content: 'Revise all slide identification points. Practice permanent slide drawing. Know the staining procedures. Remember key taxonomic characters. Prepare for viva from your practical notebook.' }
    ]
  },


  /* ── নোটিশ ── */
  notices: [
    { id: 'n-001', title: 'Final Exam Routine Published - Spring 2024', type: 'exam', date: '2024-12-15', isNew: true, content: 'Final examination routine for 3rd, 5th, and 7th semester has been published. Check the notice board for detailed schedule. Exams begin January 5, 2025.' },
    { id: 'n-002', title: 'Class Schedule Change - Next Week', type: 'class', date: '2024-12-14', isNew: true, content: 'All morning classes will start 30 minutes later due to foggy conditions from December 16-20. Updated schedule available on the department website.' },
    { id: 'n-003', title: 'National Seminar on Plant Biotechnology', type: 'seminar', date: '2024-12-12', isNew: true, content: 'Department of Botany is organizing a national seminar on "Recent Advances in Plant Biotechnology" on January 15, 2025. Registration open until December 30.' },
    { id: 'n-004', title: 'Mid-Term Results Published - 5th Semester', type: 'result', date: '2024-12-10', isNew: false, content: 'Mid-term examination results for 5th semester have been published. Contact the exam controller office for re-scrutiny applications (deadline: December 20).' },
    { id: 'n-005', title: 'Lab Safety Guidelines Update', type: 'general', date: '2024-12-08', isNew: false, content: 'Updated laboratory safety guidelines are now in effect. All students must attend the mandatory safety briefing before the next practical session.' },
    { id: 'n-006', title: 'Botanical Field Trip - Sundarbans', type: 'general', date: '2024-12-05', isNew: false, content: 'Department field trip to Sundarbans mangrove forest scheduled for January 20-22, 2025. Registration fee: 2000 BDT. Deadline: December 20.' },
    { id: 'n-007', title: 'Practical Exam Schedule - 3rd Semester', type: 'exam', date: '2024-12-03', isNew: false, content: 'Practical examination for 3rd semester will be held from December 25-28, 2024. Lab arrangements will be displayed on the notice board.' },
    { id: 'n-008', title: 'Research Paper Presentation - Final Year', type: 'seminar', date: '2024-12-01', isNew: false, content: 'Final year students must submit their research paper abstracts by December 15 for the annual presentation scheduled on January 8-10, 2025.' },
  ],

  noticeTypes: [
    { id: 'all', label: 'All Notices', icon: 'fa-bell' },
    { id: 'exam', label: 'Exam Routine', icon: 'fa-calendar-alt', color: 'red' },
    { id: 'class', label: 'Class Routine', icon: 'fa-chalkboard', color: 'blue' },
    { id: 'seminar', label: 'Seminar', icon: 'fa-microphone', color: 'purple' },
    { id: 'result', label: 'Results', icon: 'fa-chart-bar', color: 'amber' },
    { id: 'general', label: 'General', icon: 'fa-info-circle', color: 'green' }
  ],


  /* ── নোটস ── */
  notes: [
    { id: 'note-001', title: 'Cell Biology - Complete Lecture Notes', subject: 'Cell Biology', type: 'class', semester: '3rd', pages: 45, date: '2024-12-10', author: 'Dr. Rahman', pdfUrl: 'pdfs/notes/cell-bio-lecture.pdf' },
    { id: 'note-002', title: 'Genetics Handwritten Notes', subject: 'Genetics', type: 'handwritten', semester: '4th', pages: 32, date: '2024-12-08', author: 'Student Copy (Arif)', pdfUrl: 'pdfs/notes/genetics-handwritten.pdf' },
    { id: 'note-003', title: 'Plant Physiology Teacher Sheet', subject: 'Plant Physiology', type: 'teacher', semester: '5th', pages: 28, date: '2024-12-05', author: 'Prof. Akhter', pdfUrl: 'pdfs/notes/physiology-teacher.pdf' },
    { id: 'note-004', title: 'Microbiology Lab Manual', subject: 'Microbiology', type: 'lab', semester: '5th', pages: 52, date: '2024-12-01', author: 'Lab Incharge', pdfUrl: 'pdfs/notes/micro-lab-manual.pdf' },
    { id: 'note-005', title: 'Taxonomy Practical Notes', subject: 'Taxonomy', type: 'practical', semester: '3rd', pages: 38, date: '2024-11-28', author: 'Dr. Hossain', pdfUrl: 'pdfs/notes/taxonomy-practical.pdf' },
    { id: 'note-006', title: 'Phycology Class Notes', subject: 'Phycology', type: 'class', semester: '2nd', pages: 25, date: '2024-11-25', author: 'Dr. Nazmul', pdfUrl: 'pdfs/notes/phycology-class.pdf' },
    { id: 'note-007', title: 'Ecology Short Notes', subject: 'Ecology', type: 'handwritten', semester: '6th', pages: 20, date: '2024-11-22', author: 'Student Copy (Nusrat)', pdfUrl: 'pdfs/notes/ecology-short.pdf' },
    { id: 'note-008', title: 'Biochemistry Teacher Sheet', subject: 'Biochemistry', type: 'teacher', semester: '4th', pages: 35, date: '2024-11-20', author: 'Prof. Karim', pdfUrl: 'pdfs/notes/biochemistry-teacher.pdf' },
    { id: 'note-009', title: 'Cell Biology Practical Manual', subject: 'Cell Biology', type: 'practical', semester: '3rd', pages: 40, date: '2024-11-18', author: 'Lab Incharge', pdfUrl: 'pdfs/notes/cell-bio-practical.pdf' },
    { id: 'note-010', title: 'Genetics Problem Set Solutions', subject: 'Genetics', type: 'class', semester: '4th', pages: 22, date: '2024-11-15', author: 'Dr. Farhana', pdfUrl: 'pdfs/notes/genetics-problems.pdf' },
  ],

  noteTypes: [
    { id: 'all', label: 'All Notes' },
    { id: 'handwritten', label: 'Handwritten', icon: 'fa-pen-fancy', color: 'purple' },
    { id: 'teacher', label: 'Teacher Sheets', icon: 'fa-chalkboard-teacher', color: 'amber' },
    { id: 'class', label: 'Class Notes', icon: 'fa-book-open', color: 'blue' },
    { id: 'practical', label: 'Practical Notes', icon: 'fa-flask', color: 'teal' },
    { id: 'lab', label: 'Lab Manuals', icon: 'fa-microscope', color: 'red' }
  ],


  /* ── গ্যালারি ── */
  gallery: [
    { id: 'g-001', name: 'Rosa indica', common: 'Rose', family: 'Rosaceae', order: 'Rosales', image: 'https://picsum.photos/seed/rosa1/400/300.jpg', description: 'A woody perennial flowering plant known for ornamental and medicinal value. Important in perfumery industry.' },
    { id: 'g-002', name: 'Oryza sativa', common: 'Rice', family: 'Poaceae', order: 'Poales', image: 'https://picsum.photos/seed/oryza1/400/300.jpg', description: 'Staple food crop, monocot plant, C3 photosynthetic pathway. Most important cereal grain in Asia.' },
    { id: 'g-003', name: 'Azadirachta indica', common: 'Neem', family: 'Meliaceae', order: 'Sapindales', image: 'https://picsum.photos/seed/neem1/400/300.jpg', description: 'Medicinal tree with antibacterial, antifungal, and antiviral properties. Used extensively in traditional medicine.' },
    { id: 'g-004', name: 'Helianthus annuus', common: 'Sunflower', family: 'Asteraceae', order: 'Asterales', image: 'https://picsum.photos/seed/sunfl1/400/300.jpg', description: 'Annual plant with large capitulum inflorescence. Shows heliotropism. Important oil seed crop.' },
    { id: 'g-005', name: 'Ficus benghalensis', common: 'Banyan', family: 'Moraceae', order: 'Rosales', image: 'https://picsum.photos/seed/banyan1/400/300.jpg', description: 'National tree of India. Produces aerial prop roots. Ecosystem keystone species supporting diverse wildlife.' },
    { id: 'g-006', name: 'Nymphaea nouchali', common: 'Water Lily', family: 'Nymphaeaceae', order: 'Nymphaeales', image: 'https://picsum.photos/seed/lily1/400/300.jpg', description: 'Aquatic perennial herb with hydrophytic adaptations. National flower of Bangladesh. Found in freshwater habitats.' },
    { id: 'g-007', name: 'Solanum tuberosum', common: 'Potato', family: 'Solanaceae', order: 'Solanales', image: 'https://picsum.photos/seed/potato1/400/300.jpg', description: 'Tuber-producing plant. Stem modification for food storage. Fourth largest food crop globally.' },
    { id: 'g-008', name: 'Mangifera indica', common: 'Mango', family: 'Anacardiaceae', order: 'Sapindales', image: 'https://picsum.photos/seed/mango1/400/300.jpg', description: 'Tropical fruit tree producing drupe fruit. National fruit of India, Pakistan, and Philippines.' },
  ],


  /* ── অ্যাডমিন ইউজার ── */
  users: [
    { id: 'u-001', name: 'Dr. Admin', email: 'admin@drbotany.com', semester: '-', role: 'admin', joinDate: '2024-01-15' },
    { id: 'u-002', name: 'Arif Hossain', email: 'arif@univ.edu', semester: '5th', role: 'moderator', joinDate: '2024-02-20' },
    { id: 'u-003', name: 'Fatima Rahman', email: 'fatima@univ.edu', semester: '3rd', role: 'student', joinDate: '2024-03-10' },
    { id: 'u-004', name: 'Karim Uddin', email: 'karim@univ.edu', semester: '7th', role: 'student', joinDate: '2024-01-25' },
    { id: 'u-005', name: 'Nusrat Jahan', email: 'nusrat@univ.edu', semester: '1st', role: 'student', joinDate: '2024-07-15' },
    { id: 'u-006', name: 'Tanjim Ahmed', email: 'tanjim@univ.edu', semester: '5th', role: 'student', joinDate: '2024-04-05' },
    { id: 'u-007', name: 'Sabrina Islam', email: 'sabrina@univ.edu', semester: '3rd', role: 'student', joinDate: '2024-05-12' },
  ],


  /* ── সার্চ ইনডেক্স ── */
  getSearchIndex() {
    const index = [];
    this.books.forEach(b => index.push({ type: 'book', title: b.title, sub: b.author, page: 'books.html', icon: 'fa-book' }));
    this.questions.forEach(q => index.push({ type: 'question', title: `${q.subject} - ${q.year}`, sub: `${q.semester} Semester`, page: 'questions.html', icon: 'fa-file-alt' }));
    this.notes.forEach(n => index.push({ type: 'note', title: n.title, sub: n.author, page: 'notes.html', icon: 'fa-sticky-note' }));
    this.notices.forEach(n => index.push({ type: 'notice', title: n.title, sub: n.date, page: 'notices.html', icon: 'fa-bullhorn' }));
    return index;
  }
};
/*
=====================================================
  Dr. Botany — LocalStorage Persistence
  অ্যাডমিন প্যানেল থেকে করা পরিবর্তনগুলো সেভ রাখার জন্য
=====================================================
*/

// প্রথমবার লোড হলে localStorage-এ ডিফল্ট ডেটা সেভ করা
function initializeData() {
  if (!localStorage.getItem('drbotany_books')) {
    localStorage.setItem('drbotany_books', JSON.stringify(DrBotanyData.books));
  }
  if (!localStorage.getItem('drbotany_notices')) {
    localStorage.setItem('drbotany_notices', JSON.stringify(DrBotanyData.notices));
  }
}

// localStorage থেকে ডেটা লোড করা
function loadData() {
  const savedBooks = localStorage.getItem('drbotany_books');
  if (savedBooks) DrBotanyData.books = JSON.parse(savedBooks);

  const savedNotices = localStorage.getItem('drbotany_notices');
  if (savedNotices) DrBotanyData.notices = JSON.parse(savedNotices);
}

// ডেটা সেভ করার ফাংশন (অ্যাডমিন প্যানেল থেকে কল হবে)
function saveBooksData() {
  localStorage.setItem('drbotany_books', JSON.stringify(DrBotanyData.books));
}
function saveNoticesData() {
  localStorage.setItem('drbotany_notices', JSON.stringify(DrBotanyData.notices));
}

// অ্যাপ লোড হওয়ার সাথে সাথে ডেটা ইনিশিয়ালাইজ ও লোড হবে
initializeData();
loadData();

