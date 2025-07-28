const fs = require('fs');
const path = require('path');

/**
 * Parses resume.md and extracts structured data
 */
function parseResumeData() {
  try {
    const resumePath = path.join(process.cwd(), 'resume.md');
    const content = fs.readFileSync(resumePath, 'utf8');
    
    // Extract professional experience section
    const experienceMatch = content.match(/## Professional Experience\s*([\s\S]*?)(?=\n## |$)/);
    if (!experienceMatch) {
      throw new Error('Professional Experience section not found in resume.md');
    }
    
    const experienceSection = experienceMatch[1];
    
    // Parse individual experiences
    const experiences = [];
    const experienceBlocks = experienceSection.split(/(?=### .+?\n)/);
    
    experienceBlocks.forEach((block, index) => {
      if (!block.trim()) return;
      
      // Extract job title and company - handle different formats
      let titleMatch = block.match(/### (.+?) \| (.+?)\n/);
      if (!titleMatch) {
        // Try alternative format: ### Position | Company
        titleMatch = block.match(/### (.+?)\n/);
        if (!titleMatch) return;
        
        // Split the line to get position and company
        const fullTitle = titleMatch[1].trim();
        const parts = fullTitle.split(' | ');
        if (parts.length >= 2) {
          var position = parts[0].trim();
          var company = parts[1].trim();
        } else {
          // If no pipe separator, try to extract from the line
          const lineMatch = fullTitle.match(/^(.+?)\s+\|\s+(.+)$/);
          if (lineMatch) {
            var position = lineMatch[1].trim();
            var company = lineMatch[2].trim();
          } else {
            var position = fullTitle;
            var company = 'Unknown Company';
          }
        }
      } else {
        var position = titleMatch[1].trim();
        var company = titleMatch[2].trim();
      }
      
      // Extract dates
      const dateMatch = block.match(/\*(.+?)\*/);
      const dateString = dateMatch ? dateMatch[1].trim() : '';
      
      let startDate, endDate;
      if (dateString.includes(' - ')) {
        const [start, end] = dateString.split(' - ');
        startDate = parseDate(start.trim());
        endDate = end.trim().toLowerCase() === 'present' ? null : parseDate(end.trim());
      } else {
        startDate = parseDate(dateString);
        endDate = null;
      }
      
      // Extract description (first paragraph after dates)
      const descriptionMatch = block.match(/\*.*?\*\s*\n\n(.*?)(?=\n\n|\*\*Key Achievements|\*\*Technologies|### |$)/s);
      let description = descriptionMatch ? descriptionMatch[1].trim() : '';
      
      // Clean up description - remove bullet points and format as single line
      description = description
        .split('\n')
        .map(line => line.replace(/^- /, '').trim())
        .filter(line => line.length > 0)
        .join('. ')
        .replace(/\.$/, '') + '.';
      
      // Extract achievements
      const achievements = [];
      const achievementsMatch = block.match(/\*\*Key Achievements:\*\*\s*([\s\S]*?)(?=\*\*Technologies|### |$)/);
      if (achievementsMatch) {
        const achievementsList = achievementsMatch[1];
        const achievementItems = achievementsList.match(/- (.+)/g);
        if (achievementItems) {
          achievements.push(...achievementItems.map(item => item.replace(/^- /, '').trim()));
        }
      }
      
      // Extract technologies (if mentioned in description or achievements)
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
    console.error('Error parsing resume data:', error);
    return { experiences: [] };
  }
}

/**
 * Parse date string to Date object
 */
function parseDate(dateStr) {
  if (!dateStr) return null;
  
  // Handle various date formats
  const formats = [
    /(\w+)\s+(\d{4})/,  // "January 2024", "Nov 2024"
    /(\d{4})-(\d{2})-(\d{2})/, // "2024-01-01"
    /(\d{2})\/(\d{4})/, // "01/2024"
    /(\w{3})\s+(\d{4})/, // "Nov 2024", "Jan 2023"
  ];
  
  for (const format of formats) {
    const match = dateStr.match(format);
    if (match) {
      if (format === formats[0] || format === formats[3]) { // Month Year
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'];
        const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        let month = monthNames.indexOf(match[1]);
        if (month === -1) {
          month = shortMonthNames.indexOf(match[1]);
        }
        
        if (month !== -1) {
          return new Date(parseInt(match[2]), month, 1);
        }
      } else if (format === formats[1]) { // YYYY-MM-DD
        return new Date(match[1], parseInt(match[2]) - 1, parseInt(match[3]));
      } else if (format === formats[2]) { // MM/YYYY
        return new Date(parseInt(match[2]), parseInt(match[1]) - 1, 1);
      }
    }
  }
  
  // Try to parse as a regular date
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
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
    'Ruby on Rails', 'AI', 'Machine Learning', 'Automation'
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
function generateExperienceCode(experiences) {
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
  parseResumeData,
  generateExperienceCode
};

// Run if called directly
if (require.main === module) {
  const data = parseResumeData();
  console.log('Parsed experiences:', JSON.stringify(data.experiences, null, 2));
  console.log('\nGenerated code:');
  console.log(generateExperienceCode(data.experiences));
}