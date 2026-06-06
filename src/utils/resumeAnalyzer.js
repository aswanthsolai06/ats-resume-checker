const SECTION_KEYWORDS = [
  'experience',
  'education',
  'skills',
  'projects',
  'summary',
  'objective',
  'certifications',
  'achievements',
  'work history',
  'professional',
]

const ACTION_VERBS = [
  'developed', 'designed', 'implemented', 'managed', 'led', 'created',
  'built', 'improved', 'optimized', 'analyzed', 'collaborated', 'delivered',
  'achieved', 'reduced', 'increased', 'streamlined', 'automated', 'launched',
  'coordinated', 'spearheaded', 'engineered', 'architected', 'deployed',
]

const SKILL_DATABASE = {
  software: [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Git',
    'SQL', 'REST APIs', 'Docker', 'AWS', 'CI/CD', 'Agile', 'Testing',
    'HTML', 'CSS', 'MongoDB', 'PostgreSQL', 'Linux', 'Problem Solving',
  ],
  data: [
    'Python', 'SQL', 'Pandas', 'NumPy', 'Machine Learning', 'Statistics',
    'Data Visualization', 'Tableau', 'Power BI', 'Excel', 'R', 'ETL',
    'Data Cleaning', 'A/B Testing', 'Scikit-learn', 'TensorFlow',
  ],
  design: [
    'Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping',
    'Wireframing', 'Design Systems', 'Typography', 'Color Theory',
    'Accessibility', 'User Testing', 'Illustrator', 'Photoshop',
  ],
  business: [
    'Project Management', 'Communication', 'Leadership', 'Excel',
    'Data Analysis', 'Strategic Planning', 'Stakeholder Management',
    'Budgeting', 'Market Research', 'Presentation Skills', 'Negotiation',
  ],
  general: [
    'Communication', 'Teamwork', 'Problem Solving', 'Time Management',
    'Critical Thinking', 'Adaptability', 'Leadership', 'Microsoft Office',
    'Research', 'Writing', 'Organization', 'Attention to Detail',
  ],
}

const ROLE_KEYWORDS = {
  software: ['developer', 'engineer', 'programming', 'software', 'frontend', 'backend', 'full stack', 'web', 'api', 'code'],
  data: ['data', 'analyst', 'analytics', 'machine learning', 'statistics', 'model', 'dataset', 'visualization'],
  design: ['design', 'ui', 'ux', 'figma', 'wireframe', 'prototype', 'user experience', 'creative'],
  business: ['manager', 'business', 'marketing', 'sales', 'operations', 'consulting', 'strategy', 'finance'],
}

function normalizeText(text) {
  return text.toLowerCase().replace(/\s+/g, ' ')
}

function detectRole(text) {
  const normalized = normalizeText(text)
  let bestRole = 'general'
  let bestScore = 0

  for (const [role, keywords] of Object.entries(ROLE_KEYWORDS)) {
    const score = keywords.filter((kw) => normalized.includes(kw)).length
    if (score > bestScore) {
      bestScore = score
      bestRole = role
    }
  }

  return bestRole
}

function hasEmail(text) {
  return /[\w.-]+@[\w.-]+\.\w{2,}/i.test(text)
}

function hasPhone(text) {
  return /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text)
}

function hasLinkedIn(text) {
  return /linkedin\.com/i.test(text)
}

function countSections(text) {
  const normalized = normalizeText(text)
  return SECTION_KEYWORDS.filter((section) => normalized.includes(section)).length
}

function countActionVerbs(text) {
  const normalized = normalizeText(text)
  return ACTION_VERBS.filter((verb) => normalized.includes(verb)).length
}

function countMetrics(text) {
  const percentMatches = text.match(/\d+\s*%/g) || []
  const numberMatches = text.match(/\b\d{1,3}(?:,\d{3})*(?:\.\d+)?\b/g) || []
  return percentMatches.length + Math.min(numberMatches.length, 10)
}

function getWordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function getBulletPoints(text) {
  return (text.match(/^[\s]*[-•*]\s/gm) || []).length
}

function calculateAtsScore(text) {
  if (!text.trim()) return { score: 0, breakdown: [] }

  const wordCount = getWordCount(text)
  const sections = countSections(text)
  const actionVerbs = countActionVerbs(text)
  const metrics = countMetrics(text)
  const bullets = getBulletPoints(text)

  const breakdown = []

  let score = 0

  // Contact information (20 pts)
  let contactScore = 0
  if (hasEmail(text)) contactScore += 8
  if (hasPhone(text)) contactScore += 7
  if (hasLinkedIn(text)) contactScore += 5
  score += contactScore
  breakdown.push({ label: 'Contact Info', score: contactScore, max: 20 })

  // Section structure (20 pts)
  const sectionScore = Math.min(sections * 5, 20)
  score += sectionScore
  breakdown.push({ label: 'Section Structure', score: sectionScore, max: 20 })

  // Content length (15 pts)
  let lengthScore = 0
  if (wordCount >= 200 && wordCount <= 800) lengthScore = 15
  else if (wordCount >= 100 && wordCount < 200) lengthScore = 10
  else if (wordCount > 800 && wordCount <= 1200) lengthScore = 10
  else if (wordCount > 50) lengthScore = 5
  score += lengthScore
  breakdown.push({ label: 'Content Length', score: lengthScore, max: 15 })

  // Action verbs (20 pts)
  const verbScore = Math.min(actionVerbs * 4, 20)
  score += verbScore
  breakdown.push({ label: 'Action Verbs', score: verbScore, max: 20 })

  // Quantifiable results (15 pts)
  const metricScore = Math.min(metrics * 3, 15)
  score += metricScore
  breakdown.push({ label: 'Metrics & Numbers', score: metricScore, max: 15 })

  // Formatting (10 pts)
  let formatScore = 0
  if (bullets >= 3) formatScore += 5
  if (!/[^\x00-\x7F]{5,}/.test(text)) formatScore += 3
  if (!/[A-Z]{8,}/.test(text)) formatScore += 2
  score += formatScore
  breakdown.push({ label: 'Formatting', score: formatScore, max: 10 })

  return {
    score: Math.min(Math.round(score), 100),
    breakdown,
    wordCount,
    sections,
    actionVerbs,
    metrics,
  }
}

function getSkillSuggestions(text, role) {
  const normalized = normalizeText(text)
  const roleSkills = SKILL_DATABASE[role] || SKILL_DATABASE.general
  const generalSkills = SKILL_DATABASE.general

  const allSkills = [...new Set([...roleSkills, ...generalSkills])]

  const present = allSkills.filter((skill) =>
    normalized.includes(skill.toLowerCase())
  )

  const missing = allSkills.filter((skill) =>
    !normalized.includes(skill.toLowerCase())
  )

  const suggestions = missing.slice(0, 8).map((skill) => ({
    name: skill,
    relevance: roleSkills.includes(skill) ? 'high' : 'medium',
    reason: roleSkills.includes(skill)
      ? `Commonly expected for ${role === 'general' ? 'your field' : role} roles`
      : 'Strengthens overall professional profile',
  }))

  return {
    present: present.slice(0, 12),
    suggestions,
    detectedRole: role,
  }
}

function getMissingKeywords(text, role) {
  const normalized = normalizeText(text)
  const keywords = [
    ...(SKILL_DATABASE[role] || []),
    ...SECTION_KEYWORDS.map((s) => s.charAt(0).toUpperCase() + s.slice(1)),
    ...ACTION_VERBS.slice(0, 15).map((v) => v.charAt(0).toUpperCase() + v.slice(1)),
  ]

  const unique = [...new Set(keywords)]

  const missing = unique
    .filter((kw) => !normalized.includes(kw.toLowerCase()))
    .slice(0, 12)
    .map((keyword) => {
      let priority = 'low'
      if (SKILL_DATABASE[role]?.includes(keyword)) priority = 'high'
      else if (SECTION_KEYWORDS.some((s) => keyword.toLowerCase().includes(s))) priority = 'medium'
      return { keyword, priority }
    })

  const matched = unique
    .filter((kw) => normalized.includes(kw.toLowerCase()))
    .slice(0, 8)

  return { missing, matched }
}

function getScoreLabel(score) {
  if (score >= 85) return { label: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-50' }
  if (score >= 70) return { label: 'Good', color: 'text-brand-600', bg: 'bg-brand-50' }
  if (score >= 50) return { label: 'Fair', color: 'text-amber-600', bg: 'bg-amber-50' }
  return { label: 'Needs Work', color: 'text-rose-600', bg: 'bg-rose-50' }
}

function getTips(scoreData, skills, keywords) {
  const tips = []

  if (scoreData.breakdown) {
    const contact = scoreData.breakdown.find((b) => b.label === 'Contact Info')
    if (contact && contact.score < 15) {
      tips.push('Add your email, phone number, and LinkedIn profile at the top.')
    }

    const sections = scoreData.breakdown.find((b) => b.label === 'Section Structure')
    if (sections && sections.score < 15) {
      tips.push('Include clear section headers like Experience, Education, and Skills.')
    }

    const verbs = scoreData.breakdown.find((b) => b.label === 'Action Verbs')
    if (verbs && verbs.score < 12) {
      tips.push('Start bullet points with strong action verbs like "Developed" or "Led".')
    }

    const metrics = scoreData.breakdown.find((b) => b.label === 'Metrics & Numbers')
    if (metrics && metrics.score < 10) {
      tips.push('Quantify achievements with numbers, percentages, or dollar amounts.')
    }
  }

  if (skills.suggestions.length > 0) {
    tips.push(`Consider adding ${skills.suggestions[0].name} — it's relevant for ${skills.detectedRole} roles.`)
  }

  if (keywords.missing.length > 0) {
    tips.push(`Missing keyword: "${keywords.missing[0].keyword}" could improve ATS matching.`)
  }

  return tips.slice(0, 5)
}

export function analyzeResume(text) {
  const trimmed = text.trim()

  if (!trimmed) {
    return null
  }

  const role = detectRole(trimmed)
  const scoreData = calculateAtsScore(trimmed)
  const skills = getSkillSuggestions(trimmed, role)
  const keywords = getMissingKeywords(trimmed, role)
  const scoreLabel = getScoreLabel(scoreData.score)
  const tips = getTips(scoreData, skills, keywords)

  return {
    ...scoreData,
    ...skills,
    keywords,
    scoreLabel,
    tips,
    role,
  }
}
