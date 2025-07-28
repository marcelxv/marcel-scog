const fs = require('fs');
const path = require('path');

/**
 * Parses resume.md and extracts skills data
 */
function parseSkillsFromResume() {
  try {
    const resumePath = path.join(process.cwd(), 'resume.md');
    const content = fs.readFileSync(resumePath, 'utf8');
    
    // Extract technical skills section
    const skillsMatch = content.match(/## Technical Skills\s*([\s\S]*?)(?=\n## |$)/);
    if (!skillsMatch) {
      console.log('Technical Skills section not found in resume.md');
      return { skillCategories: [] };
    }
    
    const skillsSection = skillsMatch[1];
    const skillCategories = [];
    
    // Parse skill categories (### Frontend, ### Backend, etc.)
    const categoryBlocks = skillsSection.split(/(?=### .+?\n)/);
    
    categoryBlocks.forEach(block => {
      if (!block.trim()) return;
      
      // Extract category name
      const categoryMatch = block.match(/### (.+?)\n/);
      if (!categoryMatch) return;
      
      const categoryName = categoryMatch[1].trim();
      
      // Extract skills from bullet points
      const skillItems = block.match(/- \*\*(.+?)\*\*: (.+)/g);
      if (!skillItems) return;
      
      const skills = skillItems.map(item => {
        const skillMatch = item.match(/- \*\*(.+?)\*\*: (.+)/);
        if (!skillMatch) return null;
        
        const skillName = skillMatch[1].trim();
        const skillDescription = skillMatch[2].trim();
        
        // Determine proficiency based on keywords in description
        let proficiency = 3; // default
        if (skillDescription.toLowerCase().includes('expert') || 
            skillDescription.toLowerCase().includes('advanced') ||
            skillDescription.toLowerCase().includes('lead')) {
          proficiency = 5;
        } else if (skillDescription.toLowerCase().includes('experienced') ||
                   skillDescription.toLowerCase().includes('proficient')) {
          proficiency = 4;
        } else if (skillDescription.toLowerCase().includes('learning') ||
                   skillDescription.toLowerCase().includes('basic')) {
          proficiency = 2;
        }
        
        return {
          name: skillName,
          proficiency,
          icon: getIconForSkill(skillName),
          description: skillDescription
        };
      }).filter(Boolean);
      
      if (skills.length > 0) {
        skillCategories.push({
          category: mapCategoryName(categoryName),
          skills
        });
      }
    });
    
    return { skillCategories };
    
  } catch (error) {
    console.error('Error parsing skills from resume:', error);
    return { skillCategories: [] };
  }
}

/**
 * Map resume category names to component category names
 */
function mapCategoryName(resumeCategory) {
  const mapping = {
    'Frontend': 'Languages & Frameworks',
    'Backend': 'Languages & Frameworks', 
    'DevOps & Tools': 'Cloud & DevOps',
    'Databases': 'Databases & Storage',
    'Cloud': 'Cloud & DevOps'
  };
  
  return mapping[resumeCategory] || resumeCategory;
}

/**
 * Get appropriate icon name for a skill
 */
function getIconForSkill(skillName) {
  const iconMap = {
    'TypeScript': 'typescript',
    'JavaScript': 'javascript',
    'React': 'react',
    'Next.js': 'nextjs',
    'Vue.js': 'vue',
    'Angular': 'angular',
    'Node.js': 'nodejs',
    'Python': 'python',
    'Java': 'java',
    'PostgreSQL': 'postgresql',
    'MongoDB': 'mongodb',
    'MySQL': 'mysql',
    'Redis': 'redis',
    'GraphQL': 'graphql',
    'REST': 'api',
    'AWS': 'aws',
    'Docker': 'docker',
    'Kubernetes': 'kubernetes',
    'Git': 'git',
    'GitHub': 'github',
    'Tailwind CSS': 'tailwind',
    'CSS': 'css',
    'HTML': 'html',
    'Webpack': 'webpack',
    'Vite': 'vite'
  };
  
  return iconMap[skillName] || skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Generate TypeScript code for skills data
 */
function generateSkillsCode(skillCategories) {
  const categoriesCode = skillCategories.map(category => {
    const skillsCode = category.skills.map(skill => {
      return `      {
        name: '${skill.name}',
        proficiency: ${skill.proficiency},
        icon: '${skill.icon}',
        description: '${skill.description.replace(/'/g, "\\'")}',
      }`;
    }).join(',\n');
    
    return `  {
    category: '${category.category}',
    skills: [
${skillsCode}
    ],
  }`;
  }).join(',\n');
  
  return `const marcelSkillCategories: SkillCategory[] = [
${categoriesCode}
];`;
}

/**
 * Updates the page.tsx component with new skills data from resume.md
 */
async function updateSkillsComponent() {
  try {
    console.log('🔍 Parsing resume.md for skills data...');
    
    // Parse resume data
    const resumeData = parseSkillsFromResume();
    
    if (resumeData.skillCategories.length === 0) {
      console.log('⚠️  No skills found in resume.md');
      return;
    }
    
    console.log(`✅ Found ${resumeData.skillCategories.length} skill categories`);
    
    // Generate new skills code
    const newSkillsCode = generateSkillsCode(resumeData.skillCategories);
    
    // Read current page component
    const pagePath = path.join(process.cwd(), 'src/app/page.tsx');
    const currentContent = fs.readFileSync(pagePath, 'utf8');
    
    // Replace the skills data
    const updatedContent = currentContent.replace(
      /const marcelSkillCategories: SkillCategory\[\] = \[[\s\S]*?\];/,
      newSkillsCode
    );
    
    // Write updated content back
    fs.writeFileSync(pagePath, updatedContent, 'utf8');
    
    console.log('✅ Successfully updated src/app/page.tsx with new skills data');
    console.log('📝 Skills data synchronized with resume.md');
    
    // Show summary of changes
    resumeData.skillCategories.forEach((category, index) => {
      console.log(`   ${index + 1}. ${category.category}: ${category.skills.length} skills`);
    });
    
  } catch (error) {
    console.error('❌ Error updating skills component:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updateSkillsComponent();
}

module.exports = { updateSkillsComponent, parseSkillsFromResume };