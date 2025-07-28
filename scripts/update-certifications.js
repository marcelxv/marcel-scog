const fs = require('fs');
const path = require('path');

/**
 * Parse certifications and education from resume
 */
function parseCertificationsFromResume() {
  try {
    const resumePath = path.join(process.cwd(), 'resume.md');
    const content = fs.readFileSync(resumePath, 'utf8');
    
    // Extract certifications
    const certificationsMatch = content.match(/## Certifications\s*([\s\S]*?)(?=\n## |$)/);
    const certifications = [];
    
    if (certificationsMatch) {
      const certSection = certificationsMatch[1];
      
      // Parse individual certifications
      const certBlocks = certSection.split(/(?=### .+?\n)/);
      
      certBlocks.forEach(block => {
        if (!block.trim()) return;
        
        // Look for certification entries like "- **Name** | Organization | *Date*"
        const certItems = block.match(/- \*\*(.+?)\*\* \| (.+?) \| \*(.+?)\*/g);
        if (certItems) {
          certItems.forEach(item => {
            const match = item.match(/- \*\*(.+?)\*\* \| (.+?) \| \*(.+?)\*/);
            if (match) {
              certifications.push({
                name: match[1].trim(),
                organization: match[2].trim(),
                date: match[3].trim()
              });
            }
          });
        }
      });
    }
    
    // Extract education
    const educationMatch = content.match(/## Education\s*([\s\S]*?)(?=\n## |$)/);
    const education = [];
    
    if (educationMatch) {
      const eduSection = educationMatch[1];
      
      // Parse education entries
      const eduBlocks = eduSection.split(/(?=### .+?\n)/);
      
      eduBlocks.forEach(block => {
        if (!block.trim()) return;
        
        const titleMatch = block.match(/### (.+?)\n/);
        const institutionMatch = block.match(/\*\*(.+?)\*\* \| \*(.+?)\*/);
        
        if (titleMatch && institutionMatch) {
          education.push({
            degree: titleMatch[1].trim(),
            institution: institutionMatch[1].trim(),
            year: institutionMatch[2].trim()
          });
        }
      });
    }
    
    return {
      certifications,
      education,
      totalCertifications: certifications.length,
      latestCertYear: certifications.length > 0 ? 
        Math.max(...certifications.map(cert => {
          const year = cert.date.match(/(\d{4})/);
          return year ? parseInt(year[1]) : 0;
        })) : new Date().getFullYear()
    };
    
  } catch (error) {
    console.error('Error parsing certifications from resume:', error);
    return {
      certifications: [],
      education: [],
      totalCertifications: 0,
      latestCertYear: new Date().getFullYear()
    };
  }
}

/**
 * Update components with certification data
 */
async function updateCertifications() {
  try {
    console.log('🔍 Parsing resume.md for certifications and education...');
    
    const certData = parseCertificationsFromResume();
    
    console.log(`✅ Extracted certification data:
    - Total certifications: ${certData.totalCertifications}
    - Latest certification year: ${certData.latestCertYear}
    - Education entries: ${certData.education.length}`);
    
    // You can extend this to update specific components that display certifications
    // For now, we'll just log the data and potentially update hero stats
    
    if (certData.totalCertifications > 0) {
      console.log('📜 Recent certifications:');
      certData.certifications.slice(0, 3).forEach(cert => {
        console.log(`   - ${cert.name} (${cert.organization}, ${cert.date})`);
      });
    }
    
    if (certData.education.length > 0) {
      console.log('🎓 Education:');
      certData.education.forEach(edu => {
        console.log(`   - ${edu.degree} from ${edu.institution} (${edu.year})`);
      });
    }
    
    console.log('✅ Certification data parsed successfully');
    console.log('📝 Ready to integrate with components as needed');
    
  } catch (error) {
    console.error('❌ Error updating certifications:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updateCertifications();
}

module.exports = { updateCertifications, parseCertificationsFromResume };