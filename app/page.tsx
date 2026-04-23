"use client";

import { useState } from "react";
import { UserButton, SignInButton, Show } from "@clerk/nextjs";
import { 
  LayoutDashboard, UploadCloud, Briefcase, GraduationCap, 
  Search, Globe, TrendingUp, User, ChevronRight, FileText,
  Star, Target, Zap, Activity
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import styles from "./page.module.css";

const DEFAULT_MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['candidate', 'coach', 'admin'] },
  { id: 'upload', label: 'Resume Upload', icon: UploadCloud, roles: ['candidate'] },
  { id: 'candidates', label: 'My Candidates', icon: User, roles: ['coach', 'admin'] },
  { id: 'job_suggestions', label: 'Job Suggestions', icon: Briefcase, roles: ['candidate'] },
  { id: 'internship_suggestions', label: 'Internships', icon: GraduationCap, roles: ['candidate'] },
  { id: 'job_search', label: 'Job Search', icon: Search, roles: ['candidate'] },
  { id: 'internship_search', label: 'Internship Search', icon: Globe, roles: ['candidate'] },
  { id: 'market_trends', label: 'Market Trends', icon: TrendingUp, roles: ['candidate', 'coach', 'admin'] },
  { id: 'profile', label: 'Profile', icon: User, roles: ['candidate', 'coach', 'admin'] },
];

const mockChartData = [
  { name: 'Mon', applications: 2, impressions: 12 },
  { name: 'Tue', applications: 5, impressions: 24 },
  { name: 'Wed', applications: 3, impressions: 18 },
  { name: 'Thu', applications: 8, impressions: 36 },
  { name: 'Fri', applications: 4, impressions: 22 },
  { name: 'Sat', applications: 1, impressions: 45 },
  { name: 'Sun', applications: 7, impressions: 55 },
];

const mockMarketData = [
  { skill: 'React', demand: 95 },
  { skill: 'Python', demand: 88 },
  { skill: 'Node.js', demand: 82 },
  { skill: 'TypeScript', demand: 75 },
  { skill: 'AWS', demand: 70 },
];

export default function Home() {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const dbUser = useQuery(api.users.getCurrentUser);
  const userRole = dbUser?.role || 'candidate'; // default to candidate

  const [activeTab, setActiveTab] = useState('dashboard');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Filter menu items based on the user's role
  const menuItems = DEFAULT_MENU_ITEMS.filter(item => item.roles.includes(userRole));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsAnalyzing(true);
      setAnalysisComplete(false);
      
      // Simulate AI Parsing
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 3000);
    }
  };

  const renderContent = () => {
    // If not authenticated or no dbUser yet, you can still show something generic or waiting state.
    // If we want string role validation we can do this here.
    
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className={styles.tabContent}>
            {dbUser && (
               <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                 <h2 className="text-xl font-semibold mb-2">Welcome, {dbUser.name}</h2>
                 <p className="text-sm text-gray-400">Logged in as: <span className="text-emerald-400 font-bold uppercase">{dbUser.role}</span></p>
               </div>
            )}
            {userRole === 'coach' ? (
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIconWrapper}><User size={24} color="#06b6d4" /></div>
                  <div className={styles.statInfo}>
                    <p>Total Candidates</p>
                    <h3>12</h3>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIconWrapper}><FileText size={24} color="#8b5cf6" /></div>
                  <div className={styles.statInfo}>
                    <p>Resumes Reviewed</p>
                    <h3>48</h3>
                  </div>
                </div>
              </div>
            ) : (
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIconWrapper}><Activity size={24} color="#06b6d4" /></div>
                <div className={styles.statInfo}>
                  <p>Profile Score</p>
                  <h3>85%</h3>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIconWrapper}><Briefcase size={24} color="#8b5cf6" /></div>
                <div className={styles.statInfo}>
                  <p>Job Matches</p>
                  <h3>24</h3>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIconWrapper}><Target size={24} color="#f59e0b" /></div>
                <div className={styles.statInfo}>
                  <p>Interviews</p>
                  <h3>3</h3>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIconWrapper}><Star size={24} color="#ec4899" /></div>
                <div className={styles.statInfo}>
                  <p>Skill Range</p>
                  <h3>Expert</h3>
                </div>
              </div>
            </div>
            )}
            
            {userRole === 'candidate' && (
              <div className={styles.chartsGrid}>
              <div className={styles.chartWrapper}>
                <h3>Application Activity</h3>
                <div className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }} />
                      <Line type="monotone" dataKey="applications" stroke="#06b6d4" strokeWidth={3} dot={{r: 4}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className={styles.actionCard}>
                <h3>Resume Insight</h3>
                <div className={styles.insightBox}>
                  <div className={styles.insightHeader}>
                    <Zap size={20} color="#f59e0b" /> <span>AI Suggestion</span>
                  </div>
                  <p>Adding "Docker" to your skills could increase your match rate for Backend roles by 15%.</p>
                </div>
                <button className={styles.btnPrimary} onClick={() => setActiveTab('upload')}>Update Resume</button>
              </div>
            </div>
            )}
          </div>
        );
      
      case 'upload':
        return (
          <div className={styles.tabContent}>
            <div className={styles.uploadSection}>
              {!file && (
                <label className={styles.uploadBox}>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} style={{display:'none'}} />
                  <UploadCloud size={64} className={styles.uploadIcon} />
                  <h2>Upload Your Resume</h2>
                  <p>Drag & Drop or Click to Browse</p>
                  <span>Supports PDF, DOCX (Max 5MB)</span>
                </label>
              )}
              
              {file && isAnalyzing && (
                <div className={styles.analyzingBox}>
                  <div className={styles.loader}></div>
                  <h3>AI is analyzing your resume...</h3>
                  <p>Extracting skills, experience, and projects.</p>
                </div>
              )}
              
              {file && analysisComplete && (
                <div className={styles.resultsBox}>
                  <div className={styles.successHeader}>
                    <FileText size={48} color="#10b981" style={{ margin: "0 auto" }} />
                    <h2>Analysis Complete!</h2>
                    <p>{file.name}</p>
                  </div>
                  
                  <div className={styles.parseResults}>
                    <div className={styles.resultCol}>
                      <h4>Top Skills Extracted</h4>
                      <div className={styles.skillTags}>
                        <span>React</span><span>TypeScript</span><span>Node.js</span><span>Next.js</span>
                      </div>
                    </div>
                    <div className={styles.resultCol}>
                      <h4>Experience Level</h4>
                      <p className={styles.expLevel}>Mid-Senior (3-5 Years)</p>
                    </div>
                  </div>
                  
                  <div className={styles.gapAnalysis}>
                    <h4>Identified Skill Gaps for Target Roles</h4>
                    <ul>
                      <li><ChevronRight size={16} /> Missing testing frameworks (Jest/Cypress)</li>
                      <li><ChevronRight size={16} /> Cloud deployment experience limited</li>
                    </ul>
                  </div>
                  
                  <button className={styles.btnSecondary} onClick={() => setFile(null)}>Upload Another</button>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'market_trends':
        return (
          <div className={styles.tabContent}>
            <h2>Current Market Demands</h2>
            <div className={styles.fullChartContainer}>
               <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockMarketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="skill" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: 'none' }} />
                  <Bar dataKey="demand" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      default:
        return (
          <div className={styles.comingSoon}>
            <LayoutDashboard size={48} opacity={0.3} />
            <h2>{menuItems.find(m => m.id === activeTab)?.label} Module</h2>
            <p>This premium feature is currently being populated with AI insights.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.appContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}><Activity size={24} color="#fff" /></div>
          <h2>Analyzer<span className={styles.proBadge}>PRO</span></h2>
        </div>
        
        <nav className={styles.sidebarNav}>
          {menuItems.map((item) => (
            <button 
              key={item.id} 
              className={`${styles.navItem} ${activeTab === item.id ? styles.activeNav : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={20} className={styles.navIcon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className={styles.sidebarFooter}>
          <div className={styles.upgradeBox}>
            <Star size={16} color="#f59e0b" />
            <span>Unlock Premium</span>
          </div>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topNav}>
          <div className={styles.pageTitle}>
            <h1>{menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}</h1>
          </div>
          <div className={styles.navActions}>
            <Show when="signed-in">
              <UserButton />
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal" fallbackRedirectUrl="/" />
            </Show>
          </div>
        </header>

        <div className={styles.contentArea}>
          {renderContent()}
        </div>
      </main>
      
      <div className={styles.bgOrb1}></div>
      <div className={styles.bgOrb2}></div>
    </div>
  );
}
