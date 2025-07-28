const fs = require('fs');
const path = require('path');
const { parseMarcelResume } = require('./parse-marcel-resume');
const { parseHeroContentFromResume } = require('./update-hero-content');
const { parsePersonalInfoFromResume } = require('./update-personal-info');

/**
 * Monitor and report what would change if resume sync runs
 */
function monitorResumeChanges() {
  try {
    console.log('🔍 Analyzing resume.md for potential changes...\n');
    
    // Parse current resume data
    const resumeData = parseMarcelResume();
    const heroData = parseHeroContentFromResume();
    const personalData = parsePersonalInfoFromResume();
    
    // Read current component states
    const heroPath = path.join(process.cwd(), 'src/components/hero/hero-section.tsx');
    const heroContent = fs.readFileSync(heroPath, 'utf8');
    
    const aboutPath = path.join(process.cwd(), 'src/components/about/about-section.tsx');
    const aboutContent = fs.readFileSync(aboutPath, 'utf8');
    
    console.log('📊 CURRENT RESUME DATA:');
    console.log(`   • Years of experience: ${heroData.yearsExperience}`);
    console.log(`   • Total projects: ${heroData.totalProjects}+`);
    console.log(`   • Total technologies: ${heroData.totalTechnologies}+`);
    console.log(`   • Professional experiences: ${resumeData.experiences.length}`);
    console.log(`   • Full name: ${personalData.fullName}`);
    console.log(`   • Title: ${personalData.title}`);
    console.log(`   • Location: ${personalData.location}\n`);
    
    // Check what's currently in components
    console.log('🎯 CURRENT COMPONENT VALUES:');
    
    // Check hero years
    const currentHeroYears = heroContent.match(/experience: '(\d+\+?)'/);
    const currentStatsYears = heroContent.match(/<div className="text-2xl font-extrabold text-primary-700 dark:text-primary-200">\s*(\d+\+?)\s*<\/div>/);
    const currentProjects = heroContent.match(/<div className="text-2xl font-extrabold text-secondary-700 dark:text-secondary-200">\s*(\d+\+?)\s*<\/div>/);
    const currentTech = heroContent.match(/<div className="text-2xl font-extrabold text-neutral-700 dark:text-neutral-100">\s*(\d+\+?)\s*<\/div>/);
    
    console.log(`   • Hero ID card experience: ${currentHeroYears ? currentHeroYears[1] : 'Not found'}`);
    console.log(`   • Hero stats experience: ${currentStatsYears ? currentStatsYears[1] : 'Not found'}`);
    console.log(`   • Hero stats projects: ${currentProjects ? currentProjects[1] : 'Not found'}`);
    console.log(`   • Hero stats technologies: ${currentTech ? currentTech[1] : 'Not found'}`);
    
    // Check bio text for years
    const bioYearsMatch = heroContent.match(/(\d+\+?)\s*years of\s*experience/);
    console.log(`   • Bio years of experience: ${bioYearsMatch ? bioYearsMatch[1] : 'Not found'}`);
    
    // Check experience count in about section
    const experienceCount = (aboutContent.match(/id: '\d+'/g) || []).length;
    console.log(`   • About section experiences: ${experienceCount}\n`);
    
    // Show what would change
    console.log('🔄 CHANGES THAT WOULD BE MADE:');
    
    const changes = [];
    
    if (currentHeroYears && currentHeroYears[1] !== heroData.yearsExperience) {
      changes.push(`   ✏️  Hero ID card experience: ${currentHeroYears[1]} → ${heroData.yearsExperience}`);
    }
    
    if (currentStatsYears && currentStatsYears[1] !== heroData.yearsExperience) {
      changes.push(`   ✏️  Hero stats experience: ${currentStatsYears[1]} → ${heroData.yearsExperience}`);
    }
    
    if (currentProjects && currentProjects[1] !== `${heroData.totalProjects}+`) {
      changes.push(`   ✏️  Hero stats projects: ${currentProjects[1]} → ${heroData.totalProjects}+`);
    }
    
    if (currentTech && currentTech[1] !== `${heroData.totalTechnologies}+`) {
      changes.push(`   ✏️  Hero stats technologies: ${currentTech[1]} → ${heroData.totalTechnologies}+`);
    }
    
    if (bioYearsMatch && bioYearsMatch[1] !== heroData.yearsExperience) {
      changes.push(`   ✏️  Bio years of experience: ${bioYearsMatch[1]} → ${heroData.yearsExperience}`);
    }
    
    if (experienceCount !== resumeData.experiences.length) {
      changes.push(`   ✏️  Experience entries: ${experienceCount} → ${resumeData.experiences.length}`);
    }
    
    if (changes.length === 0) {
      console.log('   ✅ All components are already in sync with resume.md');
    } else {
      changes.forEach(change => console.log(change));
      console.log(`\n💡 Run 'npm run resume:sync-all' to apply these changes`);
    }
    
    console.log('\n📝 RECENT EXPERIENCE ENTRIES:');
    resumeData.experiences.slice(0, 3).forEach((exp, index) => {
      const dateStr = exp.endDate ? 
        `${exp.startDate?.getFullYear()} - ${exp.endDate?.getFullYear()}` : 
        `${exp.startDate?.getFullYear()} - Present`;
      console.log(`   ${index + 1}. ${exp.position} at ${exp.company} (${dateStr})`);
    });
    
  } catch (error) {
    console.error('❌ Error monitoring resume changes:', error);
  }
}

// Run if called directly
if (require.main === module) {
  monitorResumeChanges();
}

module.exports = { monitorResumeChanges };