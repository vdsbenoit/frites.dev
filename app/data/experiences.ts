import ephecLogo from '~/assets/img/ephec.svg'
import ibaLogo from '~/assets/img/iba.svg'
import izixLogo from '~/assets/img/izix-logo.png'
import fritesLogo from '~/assets/img/logo-transparent.png'

export interface Experience {
  title: string
  company: string
  location: string
  logo: { background: string, size: number, src?: string, icon?: string }
  from: number
  to?: number
  /** Trusted HTML */
  description: string
}

export const experiences: Experience[] = [
  {
    title: 'Front-end & Mobile Developer',
    company: 'Izix',
    location: 'Brussels',
    logo: { background: '#062F40', size: 28, src: izixLogo },
    from: 2025,
    description:
      'In 2025, I started collaborating with Izix as a front-end and mobile developer. I created a new cross-platform mobile application from scratch for their customers using hybrid technologies such as Ionic and Capacitor.<br /><br />The app is now live on the App Store and Google Play, with more than 25,000 users.',
  },
  {
    title: 'Freelance Software Engineer',
    company: 'frites.dev SRL',
    location: 'Brussels',
    logo: { background: '#0a0a0a', size: 28, src: fritesLogo },
    from: 2024,
    description:
      'In 2024, I decided to start working on my own and I created my software development agency: frites.dev SRL. I provide services to businesses in multiple software engineering fields, including mobile app development, cloud and on-premises SaaS implementation.',
  },
  {
    title: 'DevOps Engineer',
    company: 'Sony',
    location: 'Brussels',
    logo: { background: '#0a0a0a', size: 32, icon: 'i-simple-icons-sony' },
    from: 2019,
    to: 2024,
    description:
      "I was in charge of the transition of the company towards DevOps fundamentals. It involved efforts both on the technical and human sides. This achievement elevated me to a Senior position within the company.<br /><br />My goal was to ease developers' lives by automating the most repetitive operations from their work habits. I analyzed every team's requirements, identified what slowed them down, challenged solutions against what our infrastructure could provide, then documented and followed up the deployment across the company.",
  },
  {
    title: 'Software Test Engineer',
    company: 'Sony',
    location: 'Brussels',
    logo: { background: '#0a0a0a', size: 32, icon: 'i-simple-icons-sony' },
    from: 2018,
    to: 2019,
    description:
      'I was in charge of designing, implementing and performing test strategies for Sony internal software.<br /><br />Through this position, I was involved in various projects, which helped me get a good picture of what the company does. While I improved the test coverage and the test reporting, I also automated most of the operations. As a result, it increased the overall software quality and reliability.',
  },
  {
    title: 'Software Test Engineer',
    company: 'IBA',
    location: 'Louvain-la-Neuve',
    logo: { background: '#69BE28', size: 40, src: ibaLogo },
    from: 2016,
    to: 2018,
    description:
      'I worked for 2 years as a Software Test Engineer in the Beam Management System department of R&D.<br /><br />This experience taught me how to comply with medical requirements. In such a field, software must be tested rigorously in order to pass the audits that occur several times a year. I used to be the middleman between the requirements engineers and the software engineers.',
  },
  {
    title: 'Computer Science degree',
    company: 'EPHEC',
    location: 'Louvain-la-Neuve',
    logo: { background: '#f5f5f5', size: 32, src: ephecLogo },
    from: 2012,
    to: 2015,
    description:
      "I earned a bachelor's degree in Computer Science, graduating magna cum laude.<br /><br />I learned the fundamentals of programming, databases, networking, electronics and project management.<br /><br />But most importantly, I learned how to learn.",
  },
]

export function experienceRange({ from, to }: Experience) {
  if (!to) return `${from} — now · Current`
  const years = to - from
  return `${from} — ${to} · ${years} year${years > 1 ? 's' : ''}`
}
