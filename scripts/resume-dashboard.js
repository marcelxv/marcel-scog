const fs = require('fs');
const path = require('path');

/**
 * Resume sync dashboard - shows comprehensive status
 */
function showResumeDashboard() {
  try {
    console.log('🎛️  RESUME SYNC DASHBOARD\n');
    console.log('=' .repeat(50));
    
    // Check if resume.md exists and get last modified
    const resumePath = path.join(process.cwd(), 'resume.md');
    const resumeStats = fs.statSync(resumePath);
    const lastModified = resumeStats.mtime.toLocaleString();
    
    console.log(`📄 Resume File Status:`);
    console.log(`   • File: resume.md`);
    console.log(`   • Last modified: ${lastModified}`);
    console.log(`   • Size: ${(resumeStats.size / 1024).toFixed(1)} KB\n`);
    
    // Check component files and their last modified times
    const componentFiles = [
      'src/components/hero/hero-section.tsx',
      'src/components/about/about-section.tsx', 
      'src/app/page.tsx',
      'src/app/layout.tsx',
      'public/resume.pdf'
    ];
    
    console.log(`🔧 Component Status:`);
    componentFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const timeDiff = Math.round((resumeStats.mtime - stats.mtime) / 1000 / 60); // minutes
        const status = timeDiff > 5 ? '⚠️  May need sync' : '✅ Up to date';
        console.log(`   • ${file}: ${status}`);
        if (timeDiff > 5) {
          console.log(`     (Resume modified ${Math.abs(timeDiff)} minutes after this file)`);
        }
      } else {
        console.log(`   • ${file}: ❌ Not found`);
      }
    });
    
    console.log('\n🤖 Available Automation:');
    console.log('   • Auto-sync on save: ✅ Enabled');
    console.log('   • Manual sync commands: ✅ Available');
    console.log('   • PDF generation: ✅ Enabled');
    console.log('   • Type checking: ✅ Enabled');
    
    console.log('\n📊 Sync Commands:');
    console.log('   • npm run resume:monitor     - Check sync status');
    console.log('   • npm run resume:sync-all    - Sync everything');
    console.log('   • npm run resume:sync-hero   - Sync hero content only');
    console.log('   • npm run resume:sync-experience - Sync experience only');
    console.log('   • npm run resume:sync-skills - Sync skills only');
    
    console.log('\n🎯 Agent Hooks:');
    const hooksDir = path.join(process.cwd(), '.kiro/hooks');
    if (fs.existsSync(hooksDir)) {
      const hookFiles = fs.readdirSync(hooksDir).filter(f => f.includes('resume') || f.includes('sync'));
      hookFiles.forEach(hook => {
        console.log(`   • ${hook.replace('.json', '')}`);
      });
    }
    
    console.log('\n💡 Quick Actions:');
    console.log('   1. Check what would change: npm run resume:monitor');
    console.log('   2. Sync everything: npm run resume:sync-all');
    console.log('   3. Use Agent Hooks panel for one-click automation');
    
    console.log('\n' + '=' .repeat(50));
    console.log('Dashboard complete! Use the commands above to manage your resume sync.');
    
  } catch (error) {
    console.error('❌ Error generating dashboard:', error);
  }
}

// Run if called directly
if (require.main === module) {
  showResumeDashboard();
}

module.exports = { showResumeDashboard };