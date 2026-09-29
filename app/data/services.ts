export interface Service {
  title: string
  detail: string
}

export const services: Service[] = [
  { title: 'Cross-platform mobile apps', detail: 'One codebase, iOS and Android, in the stores.' },
  {
    title: 'Cloud & on-premises SaaS',
    detail: 'Implementation and integration that survives audits.',
  },
  { title: 'Micro-services', detail: 'Development, deployment and the pipelines around them.' },
  {
    title: 'Automation & scripting',
    detail: 'The repetitive work your team should stop doing by hand.',
  },
]
