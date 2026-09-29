export interface Testimonial {
  quote: string
  name: string
  role: string
}

// The "What they say about me" section and its nav link only show up once this list has entries
export const testimonials: Testimonial[] = [
  // { quote: "Benoit shipped our app in record time.", name: "Jane Doe", role: "CTO, Company" },
]
