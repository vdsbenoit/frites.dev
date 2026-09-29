import badenLogo from '~/assets/img/bb-logo.png'
import izixLogo from '~/assets/img/izix-logo.png'
import baden1 from '~/assets/img/projects/baden-1.png'
import baden2 from '~/assets/img/projects/baden-2.png'
import baden3 from '~/assets/img/projects/baden-3.png'
import baden4 from '~/assets/img/projects/baden-4.png'
import baden5 from '~/assets/img/projects/baden-5.png'
import izixAccess from '~/assets/img/projects/izix-access.png'
import izixNewReservation from '~/assets/img/projects/izix-new-reservation.png'
import izixOpenGate from '~/assets/img/projects/izix-open-gate.png'
import izixPlanning from '~/assets/img/projects/izix-planning.png'
import izixProfile from '~/assets/img/projects/izix-profile.png'

export interface Screenshot {
  src: string
  alt: string
}

export interface Project {
  name: string
  meta: string
  /** size: image side in px inside the 40px tile, 26 by default */
  logo: { background: string, src?: string, text?: string, size?: number }
  usage: { count: string, label: string }
  description: string
  highlights: string[]
  tags: string[]
  link: { label: string, url: string }
  screenshots: Screenshot[]
  startIndex: number
  /** Screenshots without a device frame get one drawn around them */
  isFramed: boolean
}

export const projects: Project[] = [
  {
    name: 'Izix',
    meta: 'Parking app · 2025 → now',
    logo: { background: '#062F40', src: izixLogo, size: 36 },
    usage: { count: '25k+', label: 'users, every day' },
    description:
      'A cross-platform mobile app for Izix parking customers, built from scratch. Employees book a spot, see their planning and open the gate from their phone. Ionic and Capacitor, one codebase, iOS and Android.',
    highlights: [
      'Booking flow with per-day windows and organization switching',
      'Gate control, receipts, wallet and NFC experiments',
      'Shipped to both stores from a single Ionic codebase',
    ],
    tags: ['Ionic', 'Capacitor', 'Vue', 'TypeScript'],
    link: { label: 'izix.eu', url: 'https://izix.eu/' },
    screenshots: [
      { src: izixAccess, alt: 'Izix app — my access' },
      { src: izixPlanning, alt: 'Izix app — planning' },
      { src: izixNewReservation, alt: 'Izix app — new reservation' },
      { src: izixOpenGate, alt: 'Izix app — open gate' },
      { src: izixProfile, alt: 'Izix app — profile' },
    ],
    startIndex: 0,
    isFramed: true,
  },
  {
    name: 'Baden Battle',
    meta: 'Scores app · 2019 → now',
    logo: { background: '#ffffff', src: badenLogo, size: 38 },
    usage: { count: '1,000+', label: 'users, one day a year' },
    description:
      'A live scoring app for a one-day event with over a thousand participants. Volunteers report duel results from their phone; teams, sections and circuits update in real time. Running every edition since 2019.',
    highlights: [
      'Real-time scores across circuits, teams and sections',
      'Role-based moderation with a full audit trail per duel',
      'Serverless, so it costs nothing the other 364 days',
    ],
    tags: ['Ionic', 'Vue', 'Firebase', 'Firestore'],
    link: { label: 'badenbattle.be', url: 'https://badenbattle.be/' },
    screenshots: [
      { src: baden1, alt: 'Baden Battle app — score check' },
      { src: baden2, alt: 'Baden Battle app — schedule' },
      { src: baden3, alt: 'Baden Battle app — duel detail' },
      { src: baden4, alt: 'Baden Battle app — team score' },
      { src: baden5, alt: 'Baden Battle app — group score' },
    ],
    startIndex: 1,
    isFramed: true,
  },
]
