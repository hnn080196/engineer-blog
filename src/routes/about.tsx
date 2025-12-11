import Header from '~/components/layout/header'
import Footer from '~/components/layout/footer'

export default function About() {
  const skills = [
    { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Go', 'Python', 'Rust'] },
    { category: 'Frontend', items: ['React', 'SolidJS', 'Next.js', 'Tailwind CSS', 'Vue'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'FastAPI', 'GraphQL'] },
    { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite'] },
    { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'] },
    { category: 'Tools', items: ['Git', 'Linux', 'Vim', 'VS Code'] },
  ]

  const experience = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Building scalable distributed systems and leading frontend architecture decisions.',
    },
    {
      title: 'Software Engineer',
      company: 'Startup Inc',
      period: '2020 - 2022',
      description: 'Full-stack development with React, Node.js, and PostgreSQL.',
    },
    {
      title: 'Junior Developer',
      company: 'Agency',
      period: '2018 - 2020',
      description: 'Web development and client projects using modern JavaScript frameworks.',
    },
  ]

  return (
    <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Header />

      <main class="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 class="font-heading text-4xl md:text-5xl font-bold mb-6">About Me</h1>
            <p class="text-lg text-[var(--color-text-muted)] mb-4">
              Hi! I'm <span class="text-[var(--color-accent)] font-semibold">Hoa Nguyen</span>, a software engineer
              passionate about building great products and sharing knowledge with the developer community.
            </p>
            <p class="text-[var(--color-text-muted)] mb-6">
              I specialize in full-stack web development with a focus on TypeScript, React, and cloud-native
              technologies. When I'm not coding, you can find me writing technical articles, contributing to
              open-source projects, or exploring new technologies.
            </p>
            <div class="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary px-6 py-3"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary px-6 py-3"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div class="flex justify-center">
            <div class="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-border)] flex items-center justify-center text-8xl shadow-lg">
              👨‍💻
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <section class="mb-16">
          <h2 class="font-heading text-2xl md:text-3xl font-semibold mb-8">Skills & Technologies</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div class="card">
                <h3 class="font-heading font-semibold mb-4">{skill.category}</h3>
                <div class="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span class="tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section class="mb-16">
          <h2 class="font-heading text-2xl md:text-3xl font-semibold mb-8">Experience</h2>
          <div class="space-y-6">
            {experience.map((exp) => (
              <div class="card">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 class="font-heading font-semibold">{exp.title}</h3>
                  <span class="text-sm text-[var(--color-text-muted)]">{exp.period}</span>
                </div>
                <p class="text-[var(--color-accent)] text-sm mb-2">{exp.company}</p>
                <p class="text-[var(--color-text-muted)]">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div class="bg-[var(--color-surface)] rounded-2xl p-8 md:p-12 text-center">
            <h2 class="font-heading text-2xl md:text-3xl font-semibold mb-4">Let's Connect</h2>
            <p class="text-[var(--color-text-muted)] mb-6 max-w-lg mx-auto">
              I'm always interested in hearing about new projects, opportunities, or just having a chat
              about technology.
            </p>
            <a
              href="mailto:hello@hoanguyen.dev"
              class="btn btn-primary px-8 py-3"
            >
              Send me an email
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
