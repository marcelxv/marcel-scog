const fs = require('fs');
const path = require('path');

/**
 * Parse personal information from resume
 */
function parsePersonalInfoFromResume() {
  try {
    const resumePath = path.join(process.cwd(), 'resume.md');
    const content = fs.readFileSync(resumePath, 'utf8');
    
    // Extract name from title
    const nameMatch = content.match(/^# (.+)$/m);
    const fullName = nameMatch ? nameMatch[1].trim() : 'Marcel Scognamiglio';
    
    // Extract short name (first name + last initial)
    const nameParts = fullName.split(' ');
    const shortName = nameParts.length > 1 ? 
      `${nameParts[0]} ${nameParts[nameParts.length - 1].charAt(0)}.` : 
      nameParts[0];
    
    // Extract title/role
    const titleMatch = content.match(/\*\*(.+?)\*\*/);
    const title = titleMatch ? titleMatch[1].trim() : 'Senior Software Engineer';
    
    // Extract location
    const locationMatch = content.match(/📍\s*(.+?)\s*\|/);
    const location = locationMatch ? locationMatch[1].trim() : 'São José dos Campos, SP, Brazil';
    
    // Extract email
    const emailMatch = content.match(/📧\s*(.+?)(?:\s*\||$)/);
    const email = emailMatch ? emailMatch[1].trim() : 'marcelx@protonmail.com';
    
    // Extract languages
    const languagesMatch = content.match(/\*\*Languages\*\*:\s*(.+)/);
    const languages = languagesMatch ? languagesMatch[1].trim() : 'Portuguese – Native | English – Professional';
    
    return {
      fullName,
      shortName,
      title,
      location,
      email,
      languages
    };
    
  } catch (error) {
    console.error('Error parsing personal info from resume:', error);
    return {
      fullName: 'Marcel Scognamiglio',
      shortName: 'Marcel S.',
      title: 'Senior Software Engineer',
      location: 'São José dos Campos, SP, Brazil',
      email: 'marcelx@protonmail.com',
      languages: 'Portuguese – Native | English – Professional'
    };
  }
}

/**
 * Update components with personal information
 */
async function updatePersonalInfo() {
  try {
    console.log('🔍 Parsing resume.md for personal information...');
    
    const personalData = parsePersonalInfoFromResume();
    
    console.log(`✅ Extracted personal data:
    - Full name: ${personalData.fullName}
    - Short name: ${personalData.shortName}
    - Title: ${personalData.title}
    - Location: ${personalData.location}
    - Email: ${personalData.email}`);
    
    // Update hero section
    const heroPath = path.join(process.cwd(), 'src/components/hero/hero-section.tsx');
    let heroContent = fs.readFileSync(heroPath, 'utf8');
    
    // Update ID card data
    heroContent = heroContent.replace(
      /name: '[^']*'/,
      `name: '${personalData.shortName}'`
    );
    
    heroContent = heroContent.replace(
      /title: '[^']*'/,
      `title: '${personalData.title}'`
    );
    
    heroContent = heroContent.replace(
      /location: '[^']*'/,
      `location: '${personalData.location}'`
    );
    
    heroContent = heroContent.replace(
      /email: '[^']*'/,
      `email: '${personalData.email}'`
    );
    
    fs.writeFileSync(heroPath, heroContent, 'utf8');
    
    // Update layout metadata
    const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
    let layoutContent = fs.readFileSync(layoutPath, 'utf8');
    
    layoutContent = layoutContent.replace(
      /title: '[^']*'/,
      `title: '${personalData.fullName} - ${personalData.title}'`
    );
    
    layoutContent = layoutContent.replace(
      /description:\s*'[^']*'/,
      `description: 'Personal portfolio website showcasing ${personalData.fullName}\\'s expertise as a ${personalData.title}, featuring projects, skills, and professional journey.'`
    );
    
    fs.writeFileSync(layoutPath, layoutContent, 'utf8');
    
    console.log('✅ Successfully updated personal information in components');
    console.log('📝 Personal data synchronized with resume.md');
    
  } catch (error) {
    console.error('❌ Error updating personal info:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updatePersonalInfo();
}

module.exports = { updatePersonalInfo, parsePersonalInfoFromResume };