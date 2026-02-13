const fs = require('fs');
const path = require('path');

/**
 * Parse Marcel's specific resume format
 */
function parseMarcelResume() {
  try {
    const resumePath = path.join(process.cwd(), 'resume.md');
    const content = fs.readFileSync(resumePath, 'utf8');
    
    // Extract professional experience section
    const experienceMatch = content.match(/## Professional Experience\s*([\s\S]*?)(?=\n## |$)/);
    if (!experienceMatch) {
      throw new Error('Professional Experience section not found in resume.md');
    }
    
    const experienceSection = experienceMatch[1];
    const experiences = [];
    
    // Split by job entries (### Position | Company)
    const jobBlocks = experienceSection.split(/(?=### .+?\n)/);
    
    jobBlocks.forEach((block, index) => {
      if (!block.trim()) return;
      
      // Extract position and company from the header
      const headerMatch = block.match(/### (.+?)\n/);
      if (!headerMatch) return;
      
      const headerLine = headerMatch[1].trim();
      
      // Parse the header line which can be in format:
      // "Position | Company" or "Position | Company | Extra"
      const parts = headerLine.split(' | ');
      let position, company;
      
      if (parts.length >= 2) {
        position = parts[0].trim();
        company = parts[1].trim();
        
        // Handle special case where company has additional info
        if (parts.length > 2) {
          // For cases like "System Architect | Automation & AI Engineer | FoodReady"
          if (parts[2].trim() && !parts[2].includes('Remote')) {
            company = parts[2].trim();
            position = `${parts[0].trim()} | ${parts[1].trim()}`;
          }
        }
      } else {
        position = headerLine;
        company = 'Unknown';
      }
      
      // Extract date range - check both underscores and asterisks
      const dateMatch = block.match(/[_*](.+?)[_*]/);
      const dateString = dateMatch ? dateMatch[1].split(' · ')[0].trim() : '';
      
      let startDate, endDate;
      if (dateString.includes('–') || dateString.includes('-')) {
        const separator = dateString.includes('–') ? '–' : '-';
        const dateParts = dateString.split(separator).map(s => s.trim());
        startDate = parseMarcelDate(dateParts[0]);
        endDate = dateParts[1].toLowerCase().includes('present') ? null : parseMarcelDate(dateParts[1]);
      } else {
        startDate = parseMarcelDate(dateString);
        endDate = null;
      }
      
      // Extract summary (first paragraph after the date)
      const lines = block.split('\n').map(l => l.trim()).filter(l => l);
      let summary = '';
      let foundDate = false;
      let summaryLines = [];
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/^### /)) continue;
        if (lines[i].match(/^[_*].+?[_*]/)) {
          foundDate = true;
          continue;
        }
        if (foundDate && !lines[i].match(/^\*\*|^- /)) {
          summaryLines.push(lines[i]);
        } else if (foundDate && (lines[i].match(/^\*\*/) || lines[i].match(/^- /))) {
          break;
        }
      }
      summary = summaryLines.join(' ').trim();
      
      // Extract achievements - preserve headers by including them in the list or description
      const achievements = [];
      const bodyLines = block.split('\n').filter(line => line.trim());
      let inAchievements = false;
      
      bodyLines.forEach(line => {
        const trimmed = line.trim();
        // Start collecting after the date line
        if (trimmed.match(/^[_*].+?[_*]/)) {
          inAchievements = true;
          return;
        }
        
        if (inAchievements) {
          if (trimmed.startsWith('- ')) {
            achievements.push(trimmed.replace(/^- /, ''));
          } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
            // Keep headers but format them slightly for the list
            achievements.push(trimmed);
          }
        }
      });
      
      // Extract technologies from the entire block
      const technologies = extractTechnologies(block);
      
      experiences.push({
        id: (index + 1).toString(),
        position,
        company,
        startDate,
        endDate,
        summary,
        description: summary, // Use summary as description for now
        achievements,
        technologies,
      });
    });

    // Ensure reverse chronological order (newest first)
    // The markdown is already newest first, but let's be explicit
    return {
      experiences: experiences.sort((a, b) => {
        const dateA = a.startDate ? a.startDate.getTime() : 0;
        const dateB = b.startDate ? b.startDate.getTime() : 0;
        return dateB - dateA;
      })
    };
    
  } catch (error) {
    console.error('Error parsing Marcel resume:', error);
    return { experiences: [] };
  }
}

/**
 * Parse Marcel's date format (e.g., "Nov 2024", "Jan 2023")
 */
function parseMarcelDate(dateStr) {
  if (!dateStr) return null;
  
  // Handle formats like "Nov 2024", "Jan 2023", "Jul 2016"
  const monthMatch = dateStr.match(/(\w{3})\s+(\d{4})/);
  if (monthMatch) {
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = shortMonths.indexOf(monthMatch[1]);
    if (monthIndex !== -1) {
      return new Date(parseInt(monthMatch[2]), monthIndex, 1);
    }
  }
  
  // Handle full month names
  const fullMonthMatch = dateStr.match(/(\w+)\s+(\d{4})/);
  if (fullMonthMatch) {
    const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = fullMonths.indexOf(fullMonthMatch[1]);
    if (monthIndex !== -1) {
      return new Date(parseInt(fullMonthMatch[2]), monthIndex, 1);
    }
  }
  
  return null;
}

/**
 * Extract technologies from text
 */
function extractTechnologies(text) {
  const techKeywords = [
    'React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript',
    'Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust',
    'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'GraphQL', 'REST',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins',
    'Git', 'GitHub', 'GitLab', 'Jira', 'Slack', 'Figma',
    'Tailwind CSS', 'SCSS', 'CSS', 'HTML', 'Webpack', 'Vite',
    'Express.js', 'Fastify', 'Django', 'Flask', 'Spring Boot',
    'Orkes/Conductor', 'Novu', 'EventBridge', 'Lambda', 'Nuxt.js',
    'Ruby on Rails', 'AI', 'Machine Learning', 'Automation',
    'WordPress', 'WooCommerce', 'Shopify', 'Webflow', 'OpenAI API',
    'n8n', 'Trigger.dev', 'Supabase', 'Firebase', 'Vercel', 'Netlify'
  ];
  
  const foundTech = [];
  const textLower = text.toLowerCase();
  
  techKeywords.forEach(tech => {
    if (textLower.includes(tech.toLowerCase())) {
      foundTech.push(tech);
    }
  });
  
  return [...new Set(foundTech)]; // Remove duplicates
}

/**
 * Generate TypeScript code for experience data
 */
function generateMarcelExperienceCode(experiences) {
  const experienceCode = experiences.map(exp => {
    const startDate = exp.startDate && !isNaN(exp.startDate.getTime()) ? 
      `new Date('${exp.startDate.toISOString().split('T')[0]}')` : 
      'new Date()';
    const endDate = exp.endDate && !isNaN(exp.endDate.getTime()) ? 
      `new Date('${exp.endDate.toISOString().split('T')[0]}')` : 
      undefined;
    
    return `  {
    id: '${exp.id}',
    company: '${exp.company}',
    position: '${exp.position}',
    startDate: ${startDate},${endDate ? `\n    endDate: ${endDate},` : '\n    // endDate is omitted for current position'}
    summary: '${(exp.summary || '').replace(/'/g, "\\'").replace(/\n/g, ' ')}',
    description: '${(exp.description || '').replace(/'/g, "\\'").replace(/\n/g, ' ')}',
    technologies: [${exp.technologies.map(tech => `'${tech}'`).join(', ')}],
    achievements: [${exp.achievements.map(ach => `\n      '${ach.replace(/'/g, "\\'").replace(/\n/g, ' ')}'`).join(',')}
    ],
  }`;
  }).join(',\n');
  
  return `const marcelExperiences: Experience[] = [
${experienceCode}
];`;
}

module.exports = {
  parseMarcelResume,
  generateMarcelExperienceCode
};

// Run if called directly
if (require.main === module) {
  const data = parseMarcelResume();
  console.log('Parsed experiences:', JSON.stringify(data.experiences, null, 2));
  console.log('\nGenerated code:');
  console.log(generateMarcelExperienceCode(data.experiences));
}