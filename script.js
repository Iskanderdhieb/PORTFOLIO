const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];
const progress = document.querySelector(".scroll-progress");
const backToTop = document.querySelector(".back-to-top");
const themeButton = document.querySelector(".theme-toggle");
const langButton = document.querySelector(".lang-toggle");

// Warn on common inspection gestures without blocking the page with a native alert.
const showPrivateWarning = () => {
  let notice = document.querySelector(".private-warning");
  if (!notice) {
    notice = document.createElement("div");
    notice.className = "private-warning";
    notice.innerHTML = '<section class="private-warning-panel" role="alertdialog" aria-modal="true" aria-labelledby="private-warning-title"><div class="private-warning-top"><span><kbd>ESC</kbd><span class="private-warning-esc-label"></span></span><button class="private-warning-close" type="button" aria-label="Close">&times;</button></div><div class="private-warning-content"><span class="private-warning-icon" aria-hidden="true">!</span><h2 id="private-warning-title"></h2><p></p><button class="private-warning-home" type="button"></button></div></section>';
    document.body.append(notice);
    const closeWarning = () => notice.classList.remove("is-visible");
    notice.querySelector(".private-warning-close").addEventListener("click", closeWarning);
    notice.querySelector(".private-warning-home").addEventListener("click", () => {
      closeWarning();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeWarning();
    });
  }
  const isFrench = document.documentElement.lang === "fr";
  notice.querySelector(".private-warning-esc-label").textContent = isFrench ? "pour fermer" : "to close";
  notice.querySelector(".private-warning-close").setAttribute("aria-label", isFrench ? "Fermer" : "Close");
  notice.querySelector("h2").textContent = isFrench ? "Acc\u00e8s non autoris\u00e9" : "Unauthorized Access";
  notice.querySelector("p").textContent = isFrench
    ? "Vous n'\u00eates pas autoris\u00e9 \u00e0 inspecter cette page."
    : "You don't have permission to inspect this page.";
  notice.querySelector(".private-warning-home").textContent = isFrench ? "Retour \u00e0 l'accueil" : "Return to Home";
  notice.classList.add("is-visible");
};

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  showPrivateWarning();
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const inspectShortcut = key === "f12"
    || (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key))
    || (event.ctrlKey && key === "u");

  if (!inspectShortcut) return;
  event.preventDefault();
  event.stopPropagation();
  showPrivateWarning();
}, true);

const translations = {
  en: {
    title: "Iskander Dhieb | Electrical Engineering",
    themeButton: "Dark",
    langButton: "FR",
    nav: ["About", "Projects", "Skills", "Experience", "Education", "Contact"],
    headerCta: "Download CV",
    videoPlay: "Play video",
    videoLoadAndPlay: "Load and play video",
    eyebrow: '<span class="status-dot"></span> Electrical Engineering Student | Automation, Embedded Systems & Robotics',
    heroTitle: "Iskander Dhieb",
    heroRole: "Electrical Engineering | Automation | Mechatronics",
    heroIntro: "I design and implement automation, mechatronic, and embedded systems by combining programming, sensors, PLC control, and supervision tools to build reliable industrial solutions.",
    heroPrimary: "Explore my work",
    heroSecondary: "Let's connect",
    aboutIndex: "01 / About",
    aboutTitle: 'Turning ideas into<br><span class="accent">working systems.</span>',
    experienceIndex: "02 / Experience",
    experienceTitle: 'Learning by <span class="accent">building.</span>',
    projectsIndex: "03 / Selected Projects",
    projectsTitle: 'Built to solve<br><span class="accent">real problems.</span>',
    educationIndex: "04 / Education",
    educationTitle: 'Built on a strong<br><span class="accent">technical foundation.</span>',
    contactIndex: "05 / Contact",
    contactTitle: 'Let\'s build something<br><span class="accent">that works.</span>',
    certTitle: "Certifications",
    certText: "Verified certificates and training achievements.",
    projectNote: "Want the technical details?",
    projectMail: "Ask me about a project",
    about: [
      "I enjoy the point where software meets the physical world, where code controls a motor, a sensor informs a decision, and an automated system comes alive.",
      "Through industrial placements at the Tunisian Chemical Group and hands-on engineering projects, I have developed practical experience in PLC programming, SCADA, control systems, electronics and embedded development.",
      "Outside the lab, I lead Robotech Club and teach robotics to young learners. Those roles have sharpened my communication, leadership and ability to make complex ideas approachable."
    ],
    approachTitle: "My approach",
    approachText: "Understand the system. Simplify the problem. Build, test, improve.",
    skills: ["Automation", "Embedded", "Code & Tools"],
    roles: ["Education & Robotics", "Leadership", "Industrial Internship", "End-of-Study Internship", "Industrial Internship", "Industrial Internship", "Industrial Visit"],
    experienceNames: ["Robotics Trainer", "President, Robotech Club", "Engineering Intern", "Auxiliary Steam Boiler Automation", "Auxiliary Boiler System Identification", "Industrial Intern, TCG & TRAPSA", "MAKIA Monastir Industrial Visit"],
    experienceDescriptions: [
      "Design and deliver practical robotics workshops for children aged 8-14 using Arduino and LEGO Mindstorms.",
      "Lead more than 40 members while coordinating technical workshops, engineering projects and competitions.",
      "Analyzed PLC sequences and optimized control logic at the Tunisian Chemical Group, cutting system startup time by 18% and improving operational reliability by 15%; documented findings and maintenance procedures.",
      "Automated an industrial boiler with a Siemens S7-1500 PLC in TIA Portal using Ladder and GRAFCET; implemented 11 PID loops, alarms, and a LabVIEW SCADA interface linked over OPC and tested with PLCSIM.",
      "Identified the boiler system inputs and outputs, studied the operating sequence and practiced industrial automation tools in a real plant environment.",
      "Assisted with electrical panel installation, industrial wiring, preventive maintenance and troubleshooting at Tunisian Chemical Group and TRAPSA; contributed to 98% system availability.",
      "Automotive diagnostics visit exploring gasoline injection, electronic engine management, hybrid powertrains and electric vehicles."
    ],
    projectStatus: "Academic engineering study · Completed",
    projects: [
      ["Auxiliary Boiler Automation", "SCADA simulation of an auxiliary steam boiler using TIA Portal PLC logic, LabVIEW supervision, OPC communication, PID-controlled solenoid valve regulation, steam valve and fan control, real-time temperature/pressure monitoring and safety alarms."],
      ["Automated Storage & Retrieval", "Designed a 25+ I/O architecture and programmed a Festo AS/RS station with five shelves, encoder-feedback motion control, servo X/Z axes and pneumatic Y-axis gripping. Reported results: 35% higher throughput and 28% shorter cycle time."],
      ["Cardiac Monitoring System", "ESP32-based cardiovascular monitoring and support prototype using a MAX30102 sensor, physiological data acquisition and pump-control logic; the CV reports a \u00b12% accuracy margin."],
      ["Concrete Batching Plant", "Automation and supervision of a concrete batching plant using TIA Portal PLC programming, HMI monitoring, dosing and mixing cycles, level indicators, alarms, and manual/automatic operating modes."],
      ["Mastercam CNC Machining", "End-to-end CAD/CAM workflow from SolidWorks part design and STEP export to Mastercam toolpath preparation, contour milling, roughing, pocketing operations, CNC simulation and final G-code generation."],
      ["Class D Audio Amplifier PCB", "Designed and tested a Class D audio amplifier PCB with analog signal conditioning, PWM comparator stage, MOSFET driver, output filtering, noise control and high-efficiency switching."],
      ["Conveyor Automation", "PLC and HMI integration for a conveyor system using Siemens TIA Portal, with real-time monitoring, control interface design, operational sequence testing, troubleshooting, and factory automation logic."],
      ["Intelligent Warehouse Automation", "Intelligent warehouse automation using Siemens S7-1214 PLC, OB/FC blocks, Grafcet logic, Factory I/O 3D simulation, LabVIEW SCADA, NetToPLCSim and OPC UA for real-time supervision."],
      ["Servo Motor Control", "ESP32-based servo control using an HC-SR04 ultrasonic sensor, distance threshold logic, 0-90 degree positioning, local Wi-Fi interface, real-time distance display and reading logs."],
      ["Pumping Station Automation", "Final year realization in SCL language for the automation and supervision of a pumping station with Siemens S7-1200 CPU 1212C, KTP700 HMI, TIA Portal V16, three-pump alternation, reservoir level control, alarms and E-Stop safety."],
      ["Smart Home Control", "Smart home monitoring with temperature and humidity sensors, automated heating, humidification, ventilation control, data processing and intelligent comfort management."],
      ["Autonomous Terrain Robot", "Four-wheel autonomous robot using ESP32, DC motor control, QTR sensor navigation, obstacle handling, embedded programming and real-time movement control."],
      ["3-Floor Elevator Automation", "Automation of a laboratory 3-floor elevator model with cabin and floor calls, position sensors, LED status indicators, startup and reset sequences, emergency stop alerts, initialization logic, automatic request handling with upward priority, 60-second waiting mode and secure manual movement controls."],
      ["Power Inverter Design", "Designed an inverter in Altium Designer, developing the circuit schematic and translating it into a PCB layout as an introduction to power electronics and hardware design."],
      ["AI-Based Predictive Maintenance", "Developed a machine-learning approach using XGBoost to analyze operational data, identify abnormal conditions and support early intervention to reduce downtime and operational losses."]
    ],
    education: [
      ["Engineering Degree<br>in Electrical Engineering", "Polytech Monastir", "Automation · Industrial Computing · Embedded Systems · Control"],
      ["Bachelor's Degree<br>in Electrical Engineering", "ISET Mahdia", "Automation & Industrial Computing"]
    ],
    certificates: [
      ["Dassault Systemes", "SOLIDWORKS CAD Design Associate", "CSWA certification in mechanical design and CAD fundamentals."],
      ["Dassault Systemes", "SOLIDWORKS Electrical Design Associate", "Electrical design certification for schematic and electrical project workflows."],
      ["INJAZ Tunisia · PMI", "Project Management Course", "Participation certificate covering project management foundations and leadership skills."],
      ["Technical Training", "Python Certificate", "Python programming certificate focused on practical coding foundations."],
    ],
    activitiesTitle: "Leadership & Activities",
    activitiesKicker: "ACTIVITIES",
    languagesKicker: "LANGUAGES",
    activities: ["IEEE Student Chapter TSYP member", "Tunisian Red Crescent volunteer"],
    activityMetrics: ["Events", "Participants", "Volunteer hours", "Beneficiaries"],
    languageItems: [["Arabic", "Native"], ["English", "Intermediate"], ["French", "Intermediate"]],
    languagesTitle: "Languages",
        contactText: "I am seeking an end-of-studies project (PFE) in Industry 5.0, focused on dependable, human-centric industrial systems and operational excellence."
  },  fr: {
    title: "Iskander Dhieb | Génie électrique",
    themeButton: "Sombre",
    langButton: "EN",
    nav: ["À propos", "Projets", "Compétences", "Expérience", "Formation", "Contact"],
    headerCta: "Télécharger CV",
    videoPlay: "Lire la vidéo",
    videoLoadAndPlay: "Charger et lire la vidéo",
    eyebrow: '<span class="status-dot"></span> Étudiant en génie électrique | Automatisme, systèmes embarqués & robotique',
    heroTitle: "Iskander Dhieb",
    heroRole: "Génie électrique | Automatisme | Mécatronique",
    heroIntro: "Je conçois et réalise des systèmes automatisés, mécatroniques et embarqués en combinant programmation, capteurs, contrôle PLC et outils de supervision pour créer des solutions industrielles fiables.",
    heroPrimary: "Voir mes projets",
    heroSecondary: "Me contacter",
    aboutIndex: "01 / À propos",
    aboutTitle: 'Transformer les idées en<br><span class="accent">systèmes fonctionnels.</span>',
    experienceIndex: "02 / Expérience",
    experienceTitle: 'Apprendre en <span class="accent">réalisant.</span>',
    projectsIndex: "03 / Projets sélectionnés",
    projectsTitle: 'Conçus pour résoudre<br><span class="accent">des problèmes réels.</span>',
    educationIndex: "04 / Formation",
    educationTitle: 'Une base technique<br><span class="accent">solide.</span>',
    contactIndex: "05 / Contact",
    contactTitle: 'Construisons quelque chose<br><span class="accent">qui fonctionne.</span>',
    certTitle: "Certifications",
    certText: "Certificats validés et formations réalisées.",
    projectNote: "Vous voulez les détails techniques ?",
    projectMail: "Discuter d'un projet",
    about: [
      "J'aime le moment où le logiciel rencontre le monde physique : le code commande un moteur, un capteur aide à prendre une décision, et un système automatisé prend vie.",
      "Grâce à mes stages industriels au Groupe Chimique Tunisien et à mes projets pratiques, j'ai développé une expérience en programmation PLC, SCADA, systèmes de contrôle, électronique et systèmes embarqués.",
      "En dehors du laboratoire, je dirige le club Robotech et j'enseigne la robotique aux jeunes. Ces expériences ont renforcé ma communication, mon leadership et ma capacité à expliquer des idées techniques."
    ],
    approachTitle: "Ma méthode",
    approachText: "Comprendre le système. Simplifier le problème. Construire, tester, améliorer.",
    skills: ["Automatisme", "Embarqué", "Code & Outils"],
    roles: ["Formation & Robotique", "Leadership", "Stage industriel", "Stage de fin d'études", "Stage industriel", "Stage industriel", "Visite industrielle"],
    experienceNames: ["Formateur en robotique", "President, Robotech Club", "Stagiaire ingenierie", "Automatisation chaudiere auxiliaire", "Identification du systeme chaudiere", "Stage industriel, GCT et TRAPSA", "Visite automobile chez MAKIA Monastir"],
    experienceDescriptions: [
      "Conception et animation d'ateliers pratiques de robotique pour des enfants de 8 à 14 ans avec Arduino et LEGO Mindstorms.",
      "Encadrement de plus de 40 membres et coordination d'ateliers techniques, de projets d'ingénierie et de compétitions.",
      "Analyse des sequences PLC et optimisation de la commande au Groupe Chimique Tunisien : demarrage reduit de 18 %, fiabilite amelioree de 15 % et procedures documentees.",
      "Automatisation chaudiere avec un automate Siemens S7-1500 sous TIA Portal (Ladder et GRAFCET), 11 boucles PID, alarmes et supervision LabVIEW via OPC, testee avec PLCSIM.",
      "Identification des entrées/sorties du système chaudière, étude de la séquence de fonctionnement et pratique d'outils d'automatisation en environnement industriel.",
      "Installation de tableaux et cablage industriel, maintenance preventive et depannage chez le Groupe Chimique Tunisien et TRAPSA ; contribution a une disponibilite systeme de 98 %.",
      "Visite de diagnostic automobile consacr\u00e9e \u00e0 l\u2019injection essence, \u00e0 la gestion \u00e9lectronique du moteur, aux motorisations hybrides et aux v\u00e9hicules \u00e9lectriques."
    ],
    projectStatus: "Étude d'ingénierie académique · Terminée",
    projects: [
      ["Automatisation d'une chaudiere auxiliaire", "Simulation SCADA d'une chaudiere auxiliaire avec logique PLC TIA Portal, supervision LabVIEW, communication OPC, regulation PID de l'electrovanne, controle vanne vapeur/ventilateur, suivi temperature/pression et alarmes de securite."],
      ["Stockage automatise (AS/RS)", "Architecture de plus de 25 E/S et commande de mouvement avec retour encodeur pour une station Festo. Resultats rapportes : debit ameliore de 35 % et temps de cycle reduit de 28 %."],
      ["Systeme de monitoring cardiaque", "Systeme ESP32 de suivi cardiovasculaire avec capteur MAX30102, acquisition physiologique et commande de pompe ; le CV indique une precision annoncee de +/- 2 %."],
      ["Centrale a beton", "Automatisation et supervision d'une centrale a beton avec programmation PLC sous TIA Portal, interface HMI, cycles de dosage et malaxage, indicateurs de niveau, alarmes et modes manuel/automatique."],
      ["Usinage CNC avec Mastercam", "Workflow CAD/CAM complet depuis la conception SolidWorks et l'export STEP vers Mastercam, avec contour milling, roughing, pocketing, simulation CNC et generation du G-code final."],
      ["PCB amplificateur audio Class D", "Conception et test d'un PCB amplificateur audio Class D avec conditionnement analogique, comparateur PWM, driver MOSFET, filtrage de sortie, controle du bruit et commutation haute efficacite."],
      ["Automatisation d'un convoyeur", "Integration PLC et HMI pour un systeme convoyeur sous Siemens TIA Portal, avec supervision temps reel, interface de controle, test de sequence operationnelle, diagnostic et logique factory automation."],
      ["Automatisation d'un entrepot intelligent", "Automatisation d'un entrepot intelligent avec PLC Siemens S7-1214, blocs OB/FC, Grafcet, simulation 3D Factory I/O, SCADA LabVIEW, NetToPLCSim et OPC UA pour la supervision temps reel."],
      ["Controle de servomoteur", "Controle de servomoteur avec ESP32 et capteur ultrason HC-SR04, logique de seuil de distance, positionnement 0-90 degres, interface Wi-Fi locale, affichage temps reel et journal des mesures."],
      ["Automatisation d'une station de pompage", "Realisation de fin d'etudes en langage SCL pour l'automatisation et la supervision d'une station de pompage avec Siemens S7-1200 CPU 1212C, HMI KTP700, TIA Portal V16, alternance de trois pompes, controle niveau reservoir, alarmes et arret d'urgence."],
      ["Controle de maison intelligente", "Smart home monitoring avec capteurs temperature/humidite, chauffage automatise, humidification, controle ventilation, traitement des donnees et gestion intelligente du confort."],
      ["Robot autonome tout-terrain", "Robot autonome quatre roues avec ESP32, commande moteurs DC, navigation par capteurs QTR, gestion d'obstacles, programmation embarquee et controle temps reel du mouvement."],
      ["Automatisation d'un ascenseur a 3 etages", "Automatisation d'une maquette d'ascenseur a 3 etages avec appels cabine et paliers, capteurs de position, voyants LED, sequences de demarrage et reset, arret d'urgence avec alertes, cycle d'initialisation, gestion automatique des demandes avec priorite a la montee, attente de 60 secondes et commandes manuelles securisees."],
      ["Conception onduleur", "Conception du schema et du circuit imprime d'un onduleur avec Altium Designer, en introduction a l'electronique de puissance."],
      ["Maintenance predictive par IA", "Approche par apprentissage automatique avec XGBoost pour detecter les anomalies et soutenir les interventions precoces afin de reduire les arrets."]
    ],
    education: [
      ["Cycle ingénieur<br>en génie électrique", "Polytech Monastir", "Automatisme · Informatique industrielle · Systèmes embarqués · Contrôle"],
      ["Licence<br>en génie électrique", "ISET Mahdia", "Automatisme & Informatique industrielle"]
    ],
    certificates: [
      ["Dassault Systemes", "SOLIDWORKS CAD Design Associate", "Certification CSWA en conception mécanique et bases de la CAO."],
      ["Dassault Systemes", "SOLIDWORKS Electrical Design Associate", "Certification en conception électrique pour schémas et projets électriques."],
      ["INJAZ Tunisia · PMI", "Cours de gestion de projet", "Certificat de participation couvrant les bases de la gestion de projet et du leadership."],
      ["Formation technique", "Certificat Python", "Certificat de programmation Python axé sur les bases pratiques du code."],
    ],
    activitiesTitle: "Leadership et activites",
    activitiesKicker: "ACTIVITES",
    languagesKicker: "LANGUES",
    activities: ["Membre de la branche etudiante IEEE TSYP", "Benevole au Croissant-Rouge tunisien"],
    activityMetrics: ["Evenements", "Participants", "Heures de benevolat", "Beneficiaires"],
    languageItems: [["Arabe", "Natif"], ["Anglais", "Intermediaire"], ["Francais", "Intermediaire"]],
    languagesTitle: "Langues",
        contactText: "Recherche d'un projet de fin d'etudes (PFE) en Industrie 5.0, axe sur des systemes industriels fiables, centres sur l'humain et l'excellence operationnelle."
  }
};

const setContent = (selector, value, property = "innerHTML") => {
  const element = document.querySelector(selector);
  if (element) element[property] = value;
};

const applyLanguage = (lang) => {
  const copy = translations[lang] || translations.en;
  document.documentElement.lang = lang;
  document.title = copy.title;
  langButton.textContent = copy.langButton;
  // Bouton play des vidéos lite-youtube : libellé accessible traduit
  document.querySelectorAll("lite-youtube").forEach((video) => {
    const button = video.querySelector(".lty-playbtn");
    if (button) button.setAttribute("aria-label", copy.videoLoadAndPlay);
  });
  navLinks.forEach((link, index) => {
    if (copy.nav[index]) link.textContent = copy.nav[index];
  });
  setContent(".header-cta", copy.headerCta);
  setContent(".eyebrow", copy.eyebrow);
  setContent("h1", copy.heroTitle);
  setContent(".hero-role", copy.heroRole, "textContent");
  setContent(".hero-intro", copy.heroIntro, "textContent");
  setContent(".button-primary", copy.heroPrimary);
  setContent(".button-ghost", copy.heroSecondary, "textContent");
  setContent("#about .section-index", copy.aboutIndex, "textContent");
  setContent("#about .section-heading h2", copy.aboutTitle);
  setContent("#experience .section-index", copy.experienceIndex, "textContent");
  setContent("#experience .section-heading h2", copy.experienceTitle);
  setContent("#projects .section-index", copy.projectsIndex, "textContent");
  setContent("#projects .section-heading h2", copy.projectsTitle);
  setContent("#education .section-index", copy.educationIndex, "textContent");
  setContent("#education .section-heading h2", copy.educationTitle);
  setContent("#contact .section-index", copy.contactIndex, "textContent");
  setContent("#contact h2", copy.contactTitle);
  setContent(".cert-heading span", copy.certTitle, "textContent");
  setContent(".cert-heading p", copy.certText, "textContent");
  setContent(".project-note span", copy.projectNote, "textContent");
  setContent(".project-note a", copy.projectMail, "textContent");
  document.querySelectorAll(".about-copy p").forEach((paragraph, index) => {
    if (copy.about[index]) paragraph.textContent = copy.about[index];
  });
  setContent(".engineering-note span", copy.approachTitle, "textContent");
  setContent(".engineering-note p", copy.approachText, "textContent");
  document.querySelectorAll(".skill-group > span").forEach((skill, index) => {
    if (copy.skills[index]) skill.textContent = copy.skills[index];
  });
  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    const role = item.querySelector(".role-type");
    const title = item.querySelector("h3");
    const description = item.querySelector(".timeline-content > p:last-child");
    if (copy.roles[index] && role) role.textContent = copy.roles[index];
    if (copy.experienceNames[index] && title) title.textContent = copy.experienceNames[index];
    if (copy.experienceDescriptions[index] && description) description.textContent = copy.experienceDescriptions[index];
  });
  setContent(".project-status", copy.projectStatus, "textContent");
  document.querySelectorAll(".project-card").forEach((card, index) => {
    const title = card.querySelector("h3");
    const description = card.querySelector(".project-copy > p:last-child, :scope > p:last-child");
    if (copy.projects[index]?.[0] && title) title.textContent = copy.projects[index][0];
    if (copy.projects[index]?.[1] && description) description.textContent = copy.projects[index][1];
  });
  document.querySelectorAll(".education-card").forEach((card, index) => {
    const title = card.querySelector("h3");
    const school = card.querySelector("p");
    const focus = card.querySelector("small");
    if (copy.education[index]?.[0] && title) title.innerHTML = copy.education[index][0];
    if (copy.education[index]?.[1] && school) school.textContent = copy.education[index][1];
    if (copy.education[index]?.[2] && focus) focus.textContent = copy.education[index][2];
  });
  document.querySelectorAll(".certificate-card").forEach((card, index) => {
    const provider = card.querySelector("small");
    const title = card.querySelector("h3");
    const description = card.querySelector("p");
    if (copy.certificates[index]?.[0] && provider) provider.textContent = copy.certificates[index][0];
    if (copy.certificates[index]?.[1] && title) title.textContent = copy.certificates[index][1];
    if (copy.certificates[index]?.[2] && description) description.textContent = copy.certificates[index][2];
  });
  document.querySelector('[data-profile="activities-title"]').textContent = copy.activitiesTitle;
  document.querySelector('[data-profile="activities-kicker"]').textContent = copy.activitiesKicker;
  document.querySelector('[data-profile="languages-kicker"]').textContent = copy.languagesKicker;
  document.querySelector('[data-profile="activities-1"]').textContent = copy.activities[0];
  document.querySelector('[data-profile="activities-2"]').textContent = copy.activities[1];
  copy.activityMetrics.forEach((label, index) => {
    document.querySelector(`[data-profile="activity-metric-${index + 1}"]`).textContent = label;
  });
  document.querySelector('[data-profile="languages-title"]').textContent = copy.languagesTitle;
  copy.languageItems.forEach(([name, level], index) => {
    document.querySelector(`[data-profile="language-name-${index + 1}"]`).textContent = name;
    document.querySelector(`[data-profile="language-level-${index + 1}"]`).textContent = level;
  });
  setContent("#contact .contact-card > p:not(.section-index)", copy.contactText, "textContent");
  localStorage.setItem("portfolio-lang", lang);
};

const applyTheme = (theme) => {
  document.body.dataset.theme = theme;
  themeButton.textContent = theme === "dark"
    ? (document.documentElement.lang === "fr" ? "Clair" : "Light")
    : (document.documentElement.lang === "fr" ? "Sombre" : "Dark");
  localStorage.setItem("portfolio-theme", theme);
};

// Page ouverte en local (file://) : le navigateur n'envoie pas de Referer,
// donc YouTube refuse tout lecteur intégré (erreur 153).
// Dans ce cas, le clic sur une vidéo l'ouvre directement sur YouTube.
// En ligne (http/https), lite-youtube fonctionne normalement.
if (window.location.protocol === "file:") {
  document.addEventListener("click", (event) => {
    const video = event.target.closest("lite-youtube");
    if (!video) return;
    // Phase de capture : on passe avant lite-youtube, qui ne crée donc pas l'iframe
    event.preventDefault();
    event.stopPropagation();
    window.open(`https://www.youtube.com/watch?v=${video.getAttribute("videoid")}`, "_blank", "noopener");
  }, true);
}

const savedLang = localStorage.getItem("portfolio-lang") || "en";
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
applyLanguage(savedLang);
applyTheme(savedTheme);

themeButton.addEventListener("click", () => {
  applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
});

langButton.addEventListener("click", () => {
  const nextLang = document.documentElement.lang === "fr" ? "en" : "fr";
  applyLanguage(nextLang);
  applyTheme(document.body.dataset.theme || "light");
});

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  backToTop.classList.toggle("visible", window.scrollY > 600);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.setProperty("--delay", `${entry.target.dataset.delay || 0}ms`);
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  // Content remains visible unless the observer was created successfully.
  document.documentElement.classList.add("reveal-observer-ready");
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll(".pdf-carousel").forEach((carousel) => {
  const frame = carousel.querySelector("iframe");
  const counter = carousel.querySelector("b");
  const pdf = carousel.dataset.pdf;
  const pages = Number(carousel.dataset.pages || 1);
  const interval = Number(carousel.dataset.interval || 3500);
  let page = 1;

  if (!frame || !counter || !pdf || pages < 2) return;

  window.setInterval(() => {
    page = page >= pages ? 1 : page + 1;
    frame.src = `${pdf}#page=${page}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
    counter.textContent = String(page);
  }, interval);
});
