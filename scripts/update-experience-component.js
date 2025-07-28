const fs = require('fs');
const path = require('path');
const { parseMarcelResume, generateMarcelExperienceCode } = require('./parse-marcel-resume');

/**
 * Updates the about-section.tsx component with new experience data from resume.md
 */
async function updateExperienceComponent() {
  try {
    console.log('🔍 Parsing resume.md for experience data...');
    
    // Parse resume data
    const resumeData = parseMarcelResume();
    
    if (resumeData.experiences.length === 0) {
      console.log('⚠️  No experiences found in resume.md');
      return;
    }
    
    console.log(`✅ Found ${resumeData.experiences.length} experiences`);
    
    // Generate new experience code
    const newExperienceCode = generateMarcelExperienceCode(resumeData.experiences);
    
    // Read current component file
    const componentPath = path.join(process.cwd(), 'src/components/about/about-section.tsx');
    const currentContent = fs.readFileSync(componentPath, 'utf8');
    
    // Replace the experience data
    const updatedContent = currentContent.replace(
      /const marcelExperiences: Experience\[\] = \[[\s\S]*?\];/,
      newExperienceCode
    );
    
    // Write updated content back
    fs.writeFileSync(componentPath, updatedContent, 'utf8');
    
    console.log('✅ Successfully updated src/components/about/about-section.tsx');
    console.log('📝 Experience data synchronized with resume.md');
    
    // Show summary of changes
    resumeData.experiences.forEach((exp, index) => {
      console.log(`   ${index + 1}. ${exp.position} at ${exp.company}`);
    });
    
  } catch (error) {
    console.error('❌ Error updating experience component:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updateExperienceComponent();
}

module.exports = { updateExperienceComponent };