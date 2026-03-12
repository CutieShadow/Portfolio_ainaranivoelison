import React, { useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";
import { projects, certificates } from "../data/projects";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "https://img.icons8.com/ios-filled/100/ffffff/design.png", language: "Design & Visual Tools" },
  { icon: "https://img.icons8.com/ios-filled/100/ffffff/video.png", language: "Video Editing" },
  { icon: "https://img.icons8.com/ios-filled/100/ffffff/artificial-intelligence.png", language: "AI & Research Tools" },
  { icon: "https://img.icons8.com/ios-filled/100/ffffff/microsoft-excel-2019.png", language: "Productivity & Management" }
];

// Details shown when a tech category is selected
const stackDetails = {
  "Design & Visual Tools": [
    { name: "Canva", icon: "🎨", description: "Create visuals & templates quickly", url: "https://www.canva.com/" },
    { name: "Photoshop", icon: "🖌️", description: "Advanced image editing", url: "https://www.adobe.com/products/photoshop.html" },
    { name: "Pinterest", icon: "📌", description: "Visual inspiration & moodboards", url: "https://www.pinterest.com/" }
  ],
  "Video Editing": [
    { name: "CapCut", icon: "✂️", description: "Mobile video editing & effects", url: "https://www.capcut.com/" },
    { name: "Canva Video", icon: "🎞️", description: "Simple video editing with templates", url: "https://www.canva.com/" }
  ],
  "AI & Research Tools": [
    { name: "ChatGPT", icon: "🤖", description: "Content generation & idea assistance", url: "https://chat.openai.com/" },
    { name: "Gemini", icon: "🔎", description: "Research & AI assistance", url: "https://gemini.google/" },
    { name: "Google Tools", icon: "🌐", description: "Search, Docs, Sheets, Drive", url: "https://www.google.com/" }
  ],
  "Productivity & Management": [
    { name: "Excel", icon: "📊", description: "Spreadsheets & data analysis", url: "https://www.microsoft.com/microsoft-365/excel" },
    { name: "Word", icon: "✍️", description: "Document writing & formatting", url: "https://www.microsoft.com/microsoft-365/word" },
    { name: "PowerPoint", icon: "📽️", description: "Presentations & storyboarding", url: "https://www.microsoft.com/microsoft-365/powerpoint" },
    { name: "Google Docs", icon: "📝", description: "Collaboration & online editing", url: "https://docs.google.com/" }
  ]
};

// Small SVG icons for a more polished look (use optimized assets in public/assets/icons/)
const iconsMap = {
  "Canva": (<img src="/assets/icons/canva.svg" alt="Canva" className="w-12 h-12 object-contain" />),
  "Photoshop": (<img src="/assets/icons/photoshop.svg" alt="Photoshop" className="w-12 h-12 object-contain" />),
  "Pinterest": (<img src="/assets/icons/pinterest.svg" alt="Pinterest" className="w-12 h-12 object-contain" />),
  "CapCut": (<img src="/assets/icons/capcut.svg" alt="CapCut" className="w-12 h-12 object-contain" />),
  "Canva Video": (<img src="/assets/icons/canva-video.svg" alt="Canva Video" className="w-12 h-12 object-contain" />),
  "ChatGPT": (<img src="/assets/icons/chatgpt.svg" alt="ChatGPT" className="w-12 h-12 object-contain" />),
  "Gemini": (<img src="/assets/icons/gemini.svg" alt="Gemini" className="w-12 h-12 object-contain" />),
  "Google Tools": (<img src="/assets/icons/google-tools.svg" alt="Google Tools" className="w-12 h-12 object-contain" />),
  "Excel": (<img src="/assets/icons/excel.svg" alt="Excel" className="w-12 h-12 object-contain" />),
  "Word": (<img src="/assets/icons/word.svg" alt="Word" className="w-12 h-12 object-contain" />),
  "PowerPoint": (<img src="/assets/icons/powerpoint.svg" alt="PowerPoint" className="w-12 h-12 object-contain" />),
  "Google Docs": (<img src="/assets/icons/google-docs.svg" alt="Google Docs" className="w-12 h-12 object-contain" />)
};

// Simple analytics pinger for external tool links (re-used inside component)

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [selectedStack, setSelectedStack] = useState(null);

  // Local analytics counters for tool opens
  const [clickCounts, setClickCounts] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('tool_clicks') || '{}');
      const normalized = {};
      Object.entries(raw).forEach(([k, v]) => {
        if (typeof v === 'number') normalized[k] = { count: v, events: [] };
        else if (v && typeof v === 'object' && 'count' in v) {
          let events = v.events || [];
          // Normalize old format (timestamps strings) to {timestamp, visitorName}
          if (Array.isArray(events) && events.length && typeof events[0] === 'string') {
            events = events.map((ts) => ({ timestamp: ts, visitorName: '' }));
          }
          normalized[k] = { count: v.count || 0, events };
        } else normalized[k] = { count: 0, events: [] };
      });
      return normalized;
    } catch { return {}; }
  });

  const incrementLocalClick = (name) => {
    const ts = new Date().toISOString();
    setClickCounts(prev => {
      const item = prev[name] || { count: 0, events: [] };
      const nextItem = {
        count: (item.count || 0) + 1,
        events: [...(item.events || []), { timestamp: ts, visitorName }]
      };
      const next = { ...prev, [name]: nextItem };
      try { localStorage.setItem('tool_clicks', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsUnlocked, setAnalyticsUnlocked] = useState(() => {
    try { return localStorage.getItem('analytics_access') === 'true'; } catch { return false; }
  });
  const [visitorName, setVisitorName] = useState(() => {
    try { return localStorage.getItem('visitor_name') || ''; } catch { return ''; }
  });

  useEffect(() => {
    try { localStorage.setItem('visitor_name', visitorName); } catch {}
  }, [visitorName]);

  const logExternalLink = (name, url) => {
    const payload = {
      event: 'external_link_click',
      name,
      url,
      visitorName: visitorName || undefined,
      timestamp: new Date().toISOString()
    };
    try {
      console.info('Analytics:', payload);
      if (navigator && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon('/collect', blob);
      } else {
        fetch('/collect', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), keepalive: true }).catch(() => {});
      }
    } catch (e) {
      // Fails silently if the environment doesn't support analytics endpoint
    }
  };

  const ANALYTICS_PASSWORD = "R4k.to062006"; // change if needed

  const unlockAnalytics = () => {
    const attempt = window.prompt("Enter analytics password:");
    if (attempt && attempt === ANALYTICS_PASSWORD) {
      try { localStorage.setItem('analytics_access', 'true'); } catch {}
      setAnalyticsUnlocked(true);
      setShowAnalytics(true);
    } else if (attempt) {
      window.alert('Incorrect password');
    }
  };

  const exportCSV = () => {
    const rows = [["name","count","first_event","last_event","events"]];
    Object.entries(clickCounts).forEach(([k,v]) => {
      const events = v.events || [];
      const firstEvent = events[0] || null;
      const lastEvent = events.length ? events[events.length - 1] : null;
      const first = firstEvent ? `${firstEvent.timestamp}${firstEvent.visitorName ? ` (${firstEvent.visitorName})` : ''}` : '';
      const last = lastEvent ? `${lastEvent.timestamp}${lastEvent.visitorName ? ` (${lastEvent.visitorName})` : ''}` : '';
      const eventStrings = events.map(e => `${e.timestamp}${e.visitorName ? ` (${e.visitorName})` : ''}`);
      rows.push([k, v.count || 0, first, last, eventStrings.join('|')]);
    });
    const csv = rows.map(r => r.map(c => '"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tool_clicks.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }; 

  const handleStackClick = (stack) => {
    setSelectedStack(prev => prev === stack ? null : stack);
  };

  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  // Mise à jour du composant ProjectImages avec une meilleure gestion des images
  const ProjectImages = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    if (!images?.length) return null;

    useEffect(() => {
      if (!images || images.length <= 1 || isHovered) return;
      const intervalId = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(intervalId);
    }, [images, isHovered]);

    return (
      <div
        className="relative group h-[300px] overflow-hidden rounded-t-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={images[currentImage]}
          alt={`Project screenshot ${currentImage + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            // fallback chain: try public thumbnail, then generic photo
            const tried = e.currentTarget.getAttribute('data-tried') || '';
            if (!tried.includes('thumb') && images.includes('/projets/portfolio/thumbnail.png')) {
              e.currentTarget.src = '/projets/portfolio/thumbnail.png';
              e.currentTarget.setAttribute('data-tried', tried + ' thumb');
              return;
            }
            if (!tried.includes('photo1')) {
              e.currentTarget.src = '/Photo1.png';
              e.currentTarget.setAttribute('data-tried', tried + ' photo1');
              return;
            }
            if (!tried.includes('photo')) {
              e.currentTarget.src = '/Photo.jpg';
              e.currentTarget.setAttribute('data-tried', tried + ' photo');
            }
          }}
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImage ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Analytics Panel */}
      {/* Analytics toggle button */}
      <div className="fixed right-4 top-24 z-[9999]">
        {analyticsUnlocked ? (
          <button onClick={() => setShowAnalytics(s => !s)} className="px-3 py-1 rounded-md bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-sm text-white border border-[#7c3aed]/30">Analytics</button>
        ) : (
          <button onClick={unlockAnalytics} className="px-3 py-1 rounded-md bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-sm text-white border border-[#7c3aed]/30">Unlock Analytics</button>
        )}
      </div>

      {/* Collapsible Sidebar */}
      <div className={`fixed top-0 right-0 h-full z-[9999] transform transition-transform duration-300 ${showAnalytics ? 'translate-x-0' : 'translate-x-full'}`} style={{ width: 340 }}>
        <div className="h-full bg-gradient-to-br from-[#071026] to-[#071026]/70 text-white p-4 shadow-2xl border-l border-white/10 overflow-auto">
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Analytics — Tool Opens</h3>
              <div className="flex items-center gap-2">
                <button onClick={exportCSV} className="text-xs px-2 py-1 bg-white/5 rounded text-gray-200">Export CSV</button>
                <button onClick={() => { localStorage.removeItem('tool_clicks'); setClickCounts({}); }} className="text-xs px-2 py-1 bg-white/5 rounded text-gray-200">Reset</button>
                <button onClick={() => setShowAnalytics(false)} className="text-xs px-2 py-1 bg-white/5 rounded text-gray-200">Close</button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400 w-24">Visitor name</label>
              <input
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Enter your name"
                className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Simple bar chart */}
          <div className="space-y-3">
            {Object.keys(clickCounts).length === 0 ? (
              <div className="text-sm text-gray-400">No events yet</div>
            ) : (
              (() => {
                const entries = Object.entries(clickCounts).map(([k,v]) => {
                const lastEvent = (v.events || []).slice(-1)[0] || null;
                return { name: k, count: v.count || 0, last: lastEvent ? lastEvent.timestamp : '' };
              }).sort((a,b) => b.count - a.count);
              const max = entries[0]?.count || 1;
              return entries.map(e => (
                <div key={e.name} className="flex items-center gap-3">
                  <div className="text-xs w-20 text-gray-300">{e.name}</div>
                  <div className="flex-1 bg-white/5 rounded overflow-hidden h-6">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 text-right pr-2 flex items-center justify-end" style={{ width: `${(e.count/max)*100}%` }}>
                      <span className="text-xs text-white/90">{e.count}</span>
                    </div>
                  </div>
                  <div className="w-16 text-xs text-gray-400 text-right">{e.last ? new Date(e.last).toLocaleString() : ''}</div>
                </div>
              ));
              })()
            )}
          </div>

          {/* Details list */}
          <div className="mt-4 text-sm text-gray-300">
            <h4 className="text-xs text-gray-200 font-semibold mb-2">Details</h4>
            {Object.keys(clickCounts).length === 0 ? (
              <div className="text-xs text-gray-500">No events recorded</div>
            ) : (
              Object.entries(clickCounts).map(([k,v]) => (
                <div key={k} className="mb-2">
                  <div className="flex justify-between items-center text-sm">
                    <div className="font-medium">{k}</div>
                    <div className="text-xs text-gray-400">{v.count || 0}</div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 max-h-20 overflow-auto">{(v.events || []).slice(-10).reverse().map((event, i) => (
                    <div key={i}>
                      {new Date(event.timestamp).toLocaleString()}
                      {event.visitorName ? ` — ${event.visitorName}` : ''}
                    </div>
                  ))}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
            Explore a selection of my beginner-level projects created during my learning journey.
            Each project reflects practice, curiosity, and progress.
          </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <Box>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    className="bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10"
                  >
                    <ProjectImages images={project.screenshots} />
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                      hideImage={Array.isArray(project.screenshots) && project.screenshots.length > 0}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} onClick={() => handleStackClick(stack.language)} />
                  </div>
                ))} 
              </div>
            {selectedStack && (
              <div className="mt-6 w-full flex justify-center">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 w-full max-w-4xl">
                  <h3 className="text-lg font-semibold text-white mb-4">{selectedStack}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(stackDetails[selectedStack] || []).map((item, i) => (
                      <div key={i} className="relative group transform hover:scale-105 transition-all duration-200">
                        <div className="flex gap-3 items-start p-3 rounded-md bg-black/40 border border-white/5">
                          <div className="w-14 h-14 rounded-md bg-white/5 flex items-center justify-center">
                            {iconsMap[item.name] ? <img src={`/assets/icons/${item.name.toLowerCase().replace(/\s+/g,'-')}.svg`} alt={item.name} className="w-10 h-10 md:w-12 md:h-12 object-contain" /> : <span className="text-2xl">{item.icon}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3">
                              <h4 className="text-sm md:text-base font-semibold text-white break-words">{item.name}</h4>
                              {item.url && (
                                <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={() => { logExternalLink(item.name, item.url); incrementLocalClick(item.name); }} className="text-indigo-400 text-xs hover:underline">Open</a>
                              )}
                            </div>
                            <p className="text-xs text-gray-300 mt-1">{item.description}</p>
                          </div>
                        </div>
                        <div className="absolute -top-12 left-3 opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:-translate-y-0 transition-all duration-200 bg-black/80 text-xs text-gray-200 px-2 py-1 rounded-md shadow-md z-20 max-w-xs">
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            </div>
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}