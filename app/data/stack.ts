export interface Skill {
  title: string
  icon: string
  color: string
  /** 1 Elementary, 2 Good, 3 Advanced */
  level: 1 | 2 | 3
  description: string
  opinion: string
}

export interface SkillGroup {
  title: string
  caption: string
  items: Skill[]
}

export const stack: SkillGroup[] = [
  {
    title: 'Front-end & mobile',
    caption: 'What your users actually touch.',
    items: [
      {
        title: 'Vue',
        icon: 'i-vscode-icons-file-type-vue',
        color: '#4FC08D',
        level: 3,
        description: 'A progressive JavaScript framework used to build interactive web interfaces.',
        opinion:
          'My preferred front-end framework. Stable, performant, with a clear separation of concerns in the SFC system.',
      },
      {
        title: 'Nuxt',
        icon: 'i-vscode-icons-file-type-nuxt',
        color: '#00C58E',
        level: 3,
        description:
          'A higher-level framework on top of Vue, with SSR, static generation, routing and SEO out of the box.',
        opinion:
          'Nuxt + Vue is my go-to combo. Opinionated conventions mean projects are built faster and stay maintainable.',
      },
      {
        title: 'Ionic',
        icon: 'i-vscode-icons-file-type-ionic',
        color: '#3880ff',
        level: 3,
        description: 'A complete open-source SDK for hybrid mobile app development.',
        opinion: 'One codebase, two stores. I used it for both the Izix and Baden Battle apps.',
      },
      {
        title: 'Capacitor',
        icon: 'i-vscode-icons-file-type-capacitor',
        color: '#119EFF',
        level: 3,
        description:
          'A cross-platform native runtime that runs web apps natively on iOS and Android, with access to device APIs.',
        opinion:
          'The native layer under my Ionic apps. It powers gate control, NFC and store builds in the Izix app.',
      },
      {
        title: 'Tailwind',
        icon: 'i-vscode-icons-file-type-tailwind',
        color: '#06b6d4',
        level: 3,
        description: 'A utility-first CSS framework of predefined classes for styling components.',
        opinion: 'Makes consistent, responsive designs far quicker to build and to hand over.',
      },
      {
        title: 'TypeScript',
        icon: 'i-logos-typescript-icon',
        color: '#3178c6',
        level: 3,
        description:
          'A strict syntactical superset of JavaScript that adds optional static typing.',
        opinion: 'Cleaner code and errors caught earlier in the development process.',
      },
      {
        title: 'JavaScript',
        icon: 'i-logos-javascript',
        color: '#f7df1e',
        level: 3,
        description: 'The programming language of the web.',
        opinion: 'The base layer under everything I ship on the front end.',
      },
    ],
  },
  {
    title: 'Back-end & data',
    caption: 'The part nobody sees until it breaks.',
    items: [
      {
        title: 'Node.js',
        icon: 'i-logos-nodejs-icon-alt',
        color: '#43853d',
        level: 2,
        description:
          'A cross-platform, back-end JavaScript runtime that executes JavaScript outside the browser.',
        opinion: 'I use Node.js to build server-side applications like services or APIs.',
      },
      {
        title: 'Firebase',
        icon: 'i-vscode-icons-file-type-firebase',
        color: '#f5820b',
        level: 3,
        description:
          'A back-end-as-a-service platform from Google for mobile and web applications.',
        opinion: 'My default for serverless apps that should cost nothing when idle.',
      },
      {
        title: 'Python',
        icon: 'i-vscode-icons-file-type-python',
        color: '#306998',
        level: 3,
        description: 'A high-level interpreted language, convenient for scripting and automation.',
        opinion: 'I used Python heavily across my previous professional experiences.',
      },
      {
        title: 'MongoDB',
        icon: 'i-vscode-icons-file-type-mongo',
        color: '#47a248',
        level: 2,
        description: 'A NoSQL, document-oriented database management system.',
        opinion: 'A good choice for projects that need a flexible schema.',
      },
      {
        title: 'MySQL',
        icon: 'i-logos-mysql-icon',
        color: '#4479a1',
        level: 1,
        description: 'An open-source relational database management system.',
        opinion: 'Learned during my degree, used since to store and manage relational data.',
      },
      {
        title: 'GCP',
        icon: 'i-logos-google-cloud',
        color: '#4285f4',
        level: 1,
        description: "Google's suite of cloud computing services.",
        opinion:
          'Firebase is part of GCP, so I reach into it whenever a project outgrows the basics.',
      },
    ],
  },
  {
    title: 'DevOps & tooling',
    caption: 'Ten years of making releases boring.',
    items: [
      {
        title: 'Docker',
        icon: 'i-logos-docker-icon',
        color: '#2496ed',
        level: 3,
        description: 'OS-level virtualization to deliver software in packages called containers.',
        opinion:
          "I containerized every build environment of a company's software and maintained the images as code.",
      },
      {
        title: 'GitLab',
        icon: 'i-vscode-icons-file-type-gitlab',
        color: '#fca326',
        level: 3,
        description:
          'A DevOps lifecycle tool with a Git repository manager, issue tracking and CI/CD pipelines.',
        opinion:
          'I deployed and maintained a GitLab server for multiple years, so I know most of its features well.',
      },
      {
        title: 'Git',
        icon: 'i-vscode-icons-file-type-git',
        color: '#f34f29',
        level: 3,
        description: 'A distributed version control system.',
        opinion:
          'Used intensively on every project. I am also familiar with Mercurial and Subversion.',
      },
      {
        title: 'Artifactory',
        icon: 'i-logos-jfrog',
        color: '#36953B',
        level: 3,
        description: 'A universal artifact repository manager.',
        opinion: 'I maintained an Artifactory instance in a previous role.',
      },
      {
        title: 'Anaconda',
        icon: 'i-vscode-icons-file-type-conda',
        color: '#44a833',
        level: 3,
        description: 'A package manager for Python with a built-in environment manager.',
        opinion: 'I packaged internal dependencies as conda packages.',
      },
      {
        title: 'Conan',
        icon: 'i-vscode-icons-file-type-conan',
        color: '#0086FD',
        level: 3,
        description: 'A C/C++ package manager.',
        opinion: 'I helped a company wrap their C/C++ internal dependencies into Conan packages.',
      },
      {
        title: 'Prometheus',
        icon: 'i-logos-prometheus',
        color: '#e6522c',
        level: 2,
        description: 'An open-source monitoring and alerting toolkit.',
        opinion: 'Used alongside Grafana to monitor the software I maintained.',
      },
      {
        title: 'Grafana',
        icon: 'i-logos-grafana',
        color: '#f46800',
        level: 2,
        description: 'A multi-platform analytics and interactive visualization application.',
        opinion: 'Used alongside Prometheus to monitor the software I maintained.',
      },
      {
        title: 'Bash',
        icon: 'i-simple-icons-gnubash',
        color: '#4EAA25',
        level: 2,
        description: 'A Unix shell and command language.',
        opinion: 'I use Bash scripts to automate tasks on my machine and on servers.',
      },
      {
        title: 'Linux',
        icon: 'i-logos-linux-tux',
        color: '#DD0031',
        level: 3,
        description:
          'A family of open-source Unix-like operating systems based on the Linux kernel.',
        opinion:
          'Comfortable on the command line and across the Linux ecosystem, on servers and locally.',
      },
    ],
  },
]
