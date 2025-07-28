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
      
      // Extract date range
      const dateMatch = block.match(/\*(.+?)\*/);
      const dateString = dateMatch ? dateMatch[1].trim() : '';
      
      let startDate, endDate;
      if (dateString.includes('–') || dateString.includes('-')) {
        const separator = dateString.includes('–') ? '–' : '-';
        const [start, end] = dateString.split(separator).map(s => s.trim());
        startDate = parseMarcelDate(start);
        endDate = end.toLowerCase().includes('present') ? null : parseMarcelDate(end);
      } else {
        startDate = parseMarcelDate(dateString);
        endDate = null;
      }
      
      // Extract description (first paragraph after the date)
      const descMatch = block.match(/\*.*?\*.*?\n\n(.*?)(?=\n\n\*\*Key Achievements|$)/s);
      let description = descMatch ? descMatch[1].trim() : '';
      
      // Clean up description
      description = description.replace(/\n/g, ' ').trim();
      
      // Extract achievements
      const achievements = [];
      const achievementsMatch = block.match(/\*\*Key Achievements:\*\*\s*([\s\S]*?)(?=### |$)/);
      if (achievementsMatch) {
        const achievementsList = achievementsMatch[1];
        const achievementItems = achievementsList.match(/- (.+)/g);
        if (achievementItems) {
          achievements.push(...achievementItems.map(item => item.replace(/^- /, '').trim()));
        }
      }
      
      // Extract technologies from the description and achievements
      const technologies = extractTechnologies(block);
      
      experiences.push({
        id: (experiences.length + 1).toString(),
        company,
        position,
        startDate,
        endDate,
        description,
        technologies,
        achievements
      });
    });
    
    return {
      experiences: experiences.reverse() // Most recent first
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
    description: '${exp.description.replace(/'/g, "\\'").replace(/\n/g, ' ')}',
    technologies: [${exp.technologies.map(tech => `'${tech}'`).join(', ')}],
    achievements: [${exp.achievements.map(ach => `'${ach.replace(/'/g, "\\'").replace(/\n/g, ' ')}'`).join(',\n      ')}],
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