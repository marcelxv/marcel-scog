const fs = require('fs');
const path = require('path');

/**
 * Parse resume and extract dynamic content for hero section
 */
function parseHeroContentFromResume() {
  try {
    const resumePath = path.join(process.cwd(), 'resume.md');
    const content = fs.readFileSync(resumePath, 'utf8');
    
    // Extract years of experience from Professional Summary
    const summaryMatch = content.match(/## Professional Summary\s*([\s\S]*?)(?=\n## |$)/);
    let yearsExperience = '7+'; // default
    
    if (summaryMatch) {
      const summary = summaryMatch[1];
      const yearsMatch = summary.match(/(\d+)\+?\s*years?\s*of\s*experience/i);
      if (yearsMatch) {
        yearsExperience = `${yearsMatch[1]}+`;
      }
    }
    
    // Extract total number of projects from experience achievements
    const experienceMatch = content.match(/## Professional Experience\s*([\s\S]*?)(?=\n## |$)/);
    let totalProjects = 30; // default
    
    if (experienceMatch) {
      const experienceSection = experienceMatch[1];
      // Look for project numbers in achievements
      const projectMatches = experienceSection.match(/(\d+)\+?\s*(?:successful\s+)?projects/gi);
      if (projectMatches) {
        const numbers = projectMatches.map(match => {
          const num = match.match(/(\d+)/);
          return num ? parseInt(num[1]) : 0;
        });
        totalProjects = Math.max(...numbers);
      }
    }
    
    // Count technologies from Technical Skills section
    const skillsMatch = content.match(/## Technical Skills\s*([\s\S]*?)(?=\n## |$)/);
    let totalTechnologies = 20; // default
    
    if (skillsMatch) {
      const skillsSection = skillsMatch[1];
      // Count unique technologies mentioned
      const techKeywords = [
        'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Angular',
        'Node.js', 'Python', 'Java', 'PHP', 'Go', 'Rust', 'GraphQL',
        'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase', 'Firebase',
        'AWS', 'Docker', 'Kubernetes', 'Vercel', 'Netlify', 'GitHub',
        'Figma', 'Tailwind CSS', 'CSS', 'HTML', 'Webpack', 'Vite',
        'Orkes/Conductor', 'Novu', 'n8n', 'Trigger.dev', 'OpenAI API',
        'WordPress', 'WooCommerce', 'Shopify', 'Webflow'
      ];
      
      const foundTech = new Set();
      const skillsLower = skillsSection.toLowerCase();
      
      techKeywords.forEach(tech => {
        if (skillsLower.includes(tech.toLowerCase())) {
          foundTech.add(tech);
        }
      });
      
      totalTechnologies = foundTech.size;
    }
    
    // Extract bio text from Professional Summary
    let bioText = "System Architect and Software Engineer with experience helping companies deliver impactful digital products through automation, AI, and scalable architecture. I build systems to make people's lives easier.";
    
    if (summaryMatch) {
      const summary = summaryMatch[1].trim();
      // Take the first paragraph as bio
      const firstParagraph = summary.split('\n\n')[0];
      if (firstParagraph && firstParagraph.length > 50) {
        bioText = firstParagraph.trim();
      }
    }
    
    return {
      yearsExperience,
      totalProjects,
      totalTechnologies,
      bioText
    };
    
  } catch (error) {
    console.error('Error parsing hero content from resume:', error);
    return {
      yearsExperience: '7+',
      totalProjects: 30,
      totalTechnologies: 20,
      bioText: "System Architect and Software Engineer with experience helping companies deliver impactful digital products through automation, AI, and scalable architecture."
    };
  }
}

/**
 * Update hero section component with new content
 */
async function updateHeroContent() {
  try {
    console.log('🔍 Parsing resume.md for hero content...');
    
    // Parse resume data
    const heroData = parseHeroContentFromResume();
    
    console.log(`✅ Extracted hero data:
    - Years of experience: ${heroData.yearsExperience}
    - Total projects: ${heroData.totalProjects}
    - Total technologies: ${heroData.totalTechnologies}
    - Bio length: ${heroData.bioText.length} characters`);
    
    // Read current hero component
    const heroPath = path.join(process.cwd(), 'src/components/hero/hero-section.tsx');
    let currentContent = fs.readFileSync(heroPath, 'utf8');
    
    // Update bio text in the paragraph
    const bioRegex = /System Architect and Software Engineer with \d+\+?\s*years of[\s\S]*?I build\s*systems to make people&lsquo;s lives easier\./;
    if (bioRegex.test(currentContent)) {
      currentContent = currentContent.replace(
        bioRegex,
        heroData.bioText.replace(/'/g, "&lsquo;").replace(/"/g, "&quot;")
      );
    } else {
      // Fallback: replace the entire paragraph content
      currentContent = currentContent.replace(
        /<p className="text-xl text-text-800 dark:text-text-50 mb-8 max-w-2xl">\s*[\s\S]*?\s*<\/p>/,
        `<p className="text-xl text-text-800 dark:text-text-50 mb-8 max-w-2xl">
                ${heroData.bioText.replace(/'/g, "&lsquo;").replace(/"/g, "&quot;")}
              </p>`
      );
    }
    
    // Update years experience in stats section
    currentContent = currentContent.replace(
      /<div className="text-2xl font-extrabold text-primary-700 dark:text-primary-200">\s*\d+\+?\s*<\/div>/,
      `<div className="text-2xl font-extrabold text-primary-700 dark:text-primary-200">
                  ${heroData.yearsExperience}
                </div>`
    );
    
    // Update projects count
    currentContent = currentContent.replace(
      /<div className="text-2xl font-extrabold text-secondary-700 dark:text-secondary-200">\s*\d+\+?\s*<\/div>/,
      `<div className="text-2xl font-extrabold text-secondary-700 dark:text-secondary-200">
                  ${heroData.totalProjects}+
                </div>`
    );
    
    // Update technologies count
    currentContent = currentContent.replace(
      /<div className="text-2xl font-extrabold text-neutral-700 dark:text-neutral-100">\s*\d+\+?\s*<\/div>/,
      `<div className="text-2xl font-extrabold text-neutral-700 dark:text-neutral-100">
                  ${heroData.totalTechnologies}+
                </div>`
    );
    
    // Update ID card experience stat
    currentContent = currentContent.replace(
      /experience: '\d+\+?'/,
      `experience: '${heroData.yearsExperience}'`
    );
    
    // Update ID card projects stat
    currentContent = currentContent.replace(
      /projects: \d+/,
      `projects: ${heroData.totalProjects}`
    );
    
    // Update ID card technologies stat
    currentContent = currentContent.replace(
      /technologies: \d+/,
      `technologies: ${heroData.totalTechnologies}`
    );
    
    // Write updated content back
    fs.writeFileSync(heroPath, currentContent, 'utf8');
    
    console.log('✅ Successfully updated src/components/hero/hero-section.tsx');
    console.log('📝 Hero content synchronized with resume.md');
    
  } catch (error) {
    console.error('❌ Error updating hero content:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updateHeroContent();
}

module.exports = { updateHeroContent, parseHeroContentFromResume };