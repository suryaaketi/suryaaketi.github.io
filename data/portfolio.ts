export const profile = {
  name: "Surya Aketi",
  fullName: "Suryasri Shanmukha Aketi",
  title: "Computer science student & builder",
  email: "suryaaketi@gmail.com",
  location: "Monmouth Junction, NJ",
  resumeUrl: "./Surya_Aketi_Resume.pdf",
  githubUrl: "",
  linkedinUrl: "",
  intro:
    "Exploring machine learning, computer vision, and thoughtful software — from microscopy research to tools for the Mac.",
  about:
    "I'm a computer science student at Penn State, working toward my B.S. in May 2027. My work connects machine learning research with practical software: understanding what models see, building useful desktop tools, and making complex systems easier to work with.",
  aboutMore:
    "I've worked on grain-boundary segmentation in microscopy images through industry-supported research at Penn State and supported machine learning projects during two summer internships at Wyntek Solutions. Outside those roles, I've built LocalScribe, an on-device dictation app, and designed TaskBridge, a modular architecture for an AI desktop assistant.",
};

export type BuildTimeline = {
  months: number;
  referenceMonths: number;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  context: string;
  contributions: string[];
  kind: "scribe" | "bridge" | "research";
  sourceUrl?: string;
  demoUrl?: string;
  buildTimeline?: BuildTimeline;
};

export const projects: Project[] = [
  {
    id: "localscribe",
    number: "01",
    title: "LocalScribe",
    category: "On-device dictation & transcription",
    description:
      "A macOS menu-bar app that turns speech into text locally, with live transcription and automatic insertion into other apps.",
    tags: ["Swift", "SwiftUI", "WhisperKit", "macOS"],
    context:
      "Built a native dictation and transcription tool with local speech recognition and controls for everyday writing and spoken code.",
    contributions: [
      "Built live transcription and automatic text insertion into other applications using Swift, SwiftUI, and WhisperKit.",
      "Implemented app-specific output modes, spoken-code formatting, microphone calibration, and searchable transcript history with audio playback and export.",
      "Added local noise reduction, audio normalization, silence detection, and a hands-free stop command.",
    ],
    kind: "scribe",
    buildTimeline: { months: 2, referenceMonths: 12 },
  },
  {
    id: "taskbridge",
    number: "02",
    title: "TaskBridge",
    category: "AI desktop assistant architecture",
    description:
      "A modular macOS assistant architecture that separates AI reasoning and task planning from desktop execution.",
    tags: ["macOS", "AI planning", "System design", "Permissions"],
    context:
      "Designed an assistant architecture with a dedicated bridge for desktop interaction and a policy layer for validating action requests.",
    contributions: [
      "Designed a modular architecture separating AI reasoning and task planning from desktop interaction through a dedicated execution bridge.",
      "Defined command and event interfaces for screen capture, application control, and file operations, incorporating permission checks and action verification.",
      "Specified a policy layer to validate action requests before passing them to the desktop execution bridge.",
    ],
    kind: "bridge",
    buildTimeline: { months: 1, referenceMonths: 24 },
  },
  {
    id: "grain-boundaries",
    number: "03",
    title: "Finding the boundaries",
    category: "Machine learning & computer vision research",
    description:
      "Studying grain-boundary segmentation in microscopy images, evaluating U-Net models alongside classical boundary detectors.",
    tags: ["TensorFlow", "OpenCV", "U-Net", "ROAR HPC"],
    context:
      "Industry-supported research at Penn State from May to August 2026, evaluating segmentation models, boundary evidence, and annotation quality.",
    contributions: [
      "Trained and evaluated TensorFlow/Keras U-Net models with precision, recall, F1, IoU, and prediction overlays across train/validation splits.",
      "Benchmarked detectors across six annotated images with threshold sweeps and one-pixel-tolerant evaluation. Phase congruency detected an average 8.32% of annotated boundary pixels missed by Sobel.",
      "Developed Sobel, Canny, phase congruency, and entropy-based pipelines; ran GPU experiments on Penn State's ROAR cluster using Linux, Bash, and SLURM.",
    ],
    kind: "research",
  },
];

export const researchStudy = {
  title: "Inside the research.",
  intro:
    "At Penn State, I built model-training, image-analysis, and evaluation workflows to study grain-boundary segmentation in microscopy images. Each part helped examine the boundaries, the predictions, or the annotations used to assess them.",
  question:
    "How can learned models and classical image-analysis methods help identify grain boundaries and assess the annotations used to evaluate them?",
  finding: {
    value: "8.32%",
    title: "Boundary evidence beyond Sobel",
    detail:
      "Across six annotated microscopy images, phase congruency detected an average 8.32% of annotated boundary pixels missed by Sobel. The result is specific to this six-image detector comparison.",
  },
  workstreams: [
    {
      id: "unet-segmentation",
      title: "U-Net segmentation models",
      tools: ["TensorFlow / Keras", "U-Net"],
      built:
        "Trained and evaluated U-Net models for grain-boundary segmentation, comparing training and validation splits with precision, recall, F1, IoU, and prediction overlays.",
      purpose:
        "Explore a learned approach to finding boundaries and inspect where predictions align with, miss, or extend beyond the annotations.",
    },
    {
      id: "edge-detection",
      title: "Sobel & Canny baselines",
      tools: ["Python", "OpenCV"],
      built:
        "Developed Sobel and Canny image-processing pipelines to identify potential boundaries in microscopy images.",
      purpose:
        "Establish classical edge-detection baselines for comparison with learned segmentation and other boundary-analysis methods.",
    },
    {
      id: "phase-congruency",
      title: "Phase congruency",
      tools: ["Python", "Image analysis"],
      built:
        "Developed a phase-congruency pipeline and compared its boundary detections with Sobel against annotated images.",
      purpose:
        "Explore a complementary detector that is less dependent on image contrast and examine which annotated boundaries it identifies beyond a gradient-based baseline.",
    },
    {
      id: "multiscale-shannon",
      title: "Multiscale Shannon entropy",
      tools: ["Python", "Entropy analysis"],
      built:
        "Developed a multiscale Shannon entropy pipeline as part of the boundary-evidence and annotation-quality analysis.",
      purpose:
        "Examine changes in image complexity at multiple scales as another signal to compare with detector outputs and annotations.",
    },
    {
      id: "two-dimensional-entropy",
      title: "2D entropy",
      tools: ["Python", "Entropy analysis"],
      built:
        "Developed a 2D entropy pipeline for microscopy image analysis alongside the other detector and entropy-based approaches.",
      purpose:
        "Explore another measure of image structure when assessing possible boundary evidence and the quality of existing annotations.",
    },
    {
      id: "tsallis-entropy",
      title: "Tsallis entropy",
      tools: ["Python", "Entropy analysis"],
      built:
        "Developed a Tsallis entropy pipeline as an alternative entropy-based view of the microscopy images.",
      purpose:
        "Compare a generalized entropy measure with Shannon-based approaches while investigating boundary evidence and annotation quality.",
    },
    {
      id: "detector-benchmarking",
      title: "Detector benchmarking",
      tools: ["Threshold sweeps", "Evaluation"],
      built:
        "Benchmarked detectors across six annotated images using threshold sweeps and one-pixel-tolerant evaluation.",
      purpose:
        "Compare methods across detection settings while allowing small spatial differences between detector outputs and annotated boundary lines.",
    },
    {
      id: "annotation-review",
      title: "Annotation masks & visual reporting",
      tools: ["PNG / SVG", "Visual analysis"],
      built:
        "Created and analyzed annotation masks, prediction overlays, and visual comparisons, and documented quantitative results for the research team.",
      purpose:
        "Make detections and annotations easier to compare, support annotation-quality review, and communicate findings alongside summary metrics.",
    },
    {
      id: "gpu-experiments",
      title: "GPU experiments on ROAR",
      tools: ["Linux / Bash", "SLURM", "ROAR HPC"],
      built:
        "Ran GPU training on Penn State's ROAR cluster, managed Python environments, monitored experiments, and troubleshot software dependencies.",
      purpose:
        "Support the training experiments with scheduled GPU computing and working software environments.",
    },
  ],
};

export const experience = [
  {
    company: "Penn State University",
    initials: "PS",
    role: "Machine Learning Research Intern",
    dates: "May – Aug 2026",
    note: "Industry-supported research",
    summary:
      "Investigated grain-boundary segmentation in microscopy images through model training, detector comparisons, and annotation analysis.",
    highlights: [
      "Trained and evaluated TensorFlow/Keras U-Net models, comparing train/validation splits using precision, recall, F1, IoU, and prediction overlays.",
      "Developed Python/OpenCV pipelines for Sobel, Canny, phase congruency, multiscale Shannon entropy, 2D entropy, and Tsallis entropy to assess boundary evidence and annotation quality.",
      "Benchmarked detectors across six annotated images using threshold sweeps and one-pixel-tolerant evaluation. Phase congruency detected an average 8.32% of annotated boundary pixels missed by Sobel.",
      "Ran GPU training on Penn State's ROAR HPC cluster using Linux, Bash, and SLURM; managed Python environments, monitored experiments, and troubleshot dependencies.",
      "Created and analyzed PNG/SVG annotation masks, documenting quantitative results and visual comparisons for Professor Xing Wang and PhD researcher Aiden Ochoa.",
    ],
    tags: ["Python", "TensorFlow/Keras", "OpenCV", "SLURM", "GPU computing"],
  },
  {
    company: "Wyntek Solutions Inc.",
    initials: "W",
    role: "Machine Learning Intern",
    dates: "May – Aug 2024 · Jun – Aug 2025",
    note: "Two summer internships · Monmouth Junction, NJ",
    summary:
      "Supported data engineers with dataset preparation, baseline modeling, evaluation, and model integration.",
    highlights: [
      "Cleaned and preprocessed datasets and wrote supporting code to assist data engineers with predictive modeling.",
      "Built and trained baseline machine learning models, tuned hyperparameters, and ran evaluation scripts under a data engineer's mentorship.",
      "Tested model behavior and helped integrate models into staging and production pipelines, collaborating with data engineers through daily stand-ups.",
    ],
    tags: ["Data preprocessing", "Machine learning", "Model evaluation", "Collaboration"],
  },
];

export const skillGroups = [
  {
    name: "Languages",
    items: ["Python", "JavaScript / TypeScript", "SQL", "C", "Swift"],
  },
  {
    name: "Machine learning & vision",
    items: ["TensorFlow / Keras", "OpenCV", "NumPy", "SciPy", "U-Net", "Semantic segmentation"],
  },
  {
    name: "Tools & development",
    items: ["React", "SwiftUI", "WhisperKit", "Git / GitHub", "Linux", "SLURM", "ROAR", "GPU computing"],
  },
];

export const certifications = [
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI & Stanford Online · Coursera",
    detail:
      "Completed. Supervised Machine Learning: Regression and Classification; Advanced Learning Algorithms; Unsupervised Learning, Recommenders, Reinforcement Learning.",
  },
  {
    title: "CS50 coursework",
    issuer: "CS50",
    detail:
      "CS50P: Programming with Python · CS50AI: Artificial Intelligence with Python · CS50x: Computer Science.",
  },
];
