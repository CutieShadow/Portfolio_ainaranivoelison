import React from "react";
import { Instagram, ExternalLink, Mail } from "lucide-react";
import site from "../config/site.json";

const DiscordIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60.7 4.5C55.9 2.3 51 1 46 0 45.6 2.5 44.6 4.8 43.1 6.6c-6.3-1-12.6-1-18.9 0 1.7-1.9 3.5-4.5 3.9-7.2C24 2.5 18.2 7 14.2 12.6 4.6 27.4 9.6 43 9.6 43c10.7 3.9 21.8 4.6 32.5 4.6 10.7 0 21.8-0.7 32.5-4.6 0 0 5-15.6-4.6-30.4z" fill="#5865F2" />
    <path d="M24 27.5c1.7 0 3-1.6 3-3.5s-1.3-3.5-3-3.5-3 1.6-3 3.5 1.3 3.5 3 3.5zm23 0c1.7 0 3-1.6 3-3.5s-1.3-3.5-3-3.5-3 1.6-3 3.5 1.3 3.5 3 3.5z" fill="#fff" />
  </svg>
);

const socialLinks = [
  {
    name: "Discord",
    displayName: "Discord",
    subText: "imcutiejess",
    icon: DiscordIcon,
    url: site.discord || "https://discord.gg/DuCg9ADs",
    color: "#5865F2",
    gradient: "from-[#5865F2] to-[#7289DA]",
    isPrimary: true
  },
  {
    name: "Email",
    displayName: "Email",
    subText: site.email || "",
    icon: ({ className }) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path d="M2 6.75A2.75 2.75 0 014.75 4h14.5A2.75 2.75 0 0122 6.75v10.5A2.75 2.75 0 0119.25 20H4.75A2.75 2.75 0 012 17.25V6.75z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.5 7.5l8.25 6.25L20 7.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    url: `mailto:${site.email}`,
    color: "#ffffff",
    gradient: "from-[#333] to-[#24292e]"
  },
  {
    name: "WhatsApp",
    displayName: "WhatsApp",
    subText: site.whatsapp || "",
    icon: ({ className }) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path d="M21.05 2.999A11.957 11.957 0 0012 0C5.373 0 0 5.373 0 12c0 2.11.554 4.082 1.52 5.81L0 24l6.41-1.49A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12 0-1.86-.42-3.622-1.15-5.201z" fill="#25D366" />
        <path d="M17.8 14.4c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.19.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.31.3-.52.1-.2.05-.39-.03-.54-.08-.15-.67-1.62-.92-2.22-.24-.59-.48-.51-.67-.52-.17-.01-.37-.01-.57-.01-.2 0-.53.07-.81.39-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.14.2 2.1 3.39 5.09 4.75 3 1.36 3.41.95 4.03.89.61-.06 1.98-.81 2.26-1.59.28-.78.28-1.44.2-1.59-.08-.15-.28-.24-.58-.39z" fill="#fff" />
      </svg>
    ),
    url: site.whatsapp ? `https://wa.me/${site.whatsapp}` : "#",
    color: "#25D366",
    gradient: "from-[#25D366] to-[#128C7E]"
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "ainafi.joy",
    icon: Instagram,
    url: site.instagram || "https://www.instagram.com/ainafi.joy",
    color: "#E4405F",
    gradient: "from-[#f58529] via-[#dd2a7b] to-[#8134af]"
  },
  {
    name: "TikTok",
    displayName: "Tiktok",
    subText: "@jessacer2.0",
    icon: ({ className, ...props }) => (
     <svg width="24px" height="24px" viewBox="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>Tiktok</title>
    <g id="Icon/Social/tiktok-color" stroke="none" strokeWidth={2} fill="none" fillRule="evenodd">
        <g id="Group-7" transform="translate(8.000000, 6.000000)">
            <path d="M29.5248245,9.44576327 C28.0821306,9.0460898 26.7616408,8.29376327 25.6826204,7.25637551 C25.5109469,7.09719184 25.3493143,6.92821224 25.1928245,6.75433469 C23.9066204,5.27833469 23.209151,3.38037551 23.2336408,1.42290612 L17.3560898,1.42290612 L17.3560898,23.7086204 C17.3560898,27.7935184 15.1520082,29.9535184 12.416498,29.9535184 C11.694049,29.9611102 10.9789469,29.8107429 10.3213959,29.5124571 C9.6636,29.2144163 9.07951837,28.7758041 8.60955918,28.2272327 C8.1398449,27.6789061 7.79551837,27.0340898 7.60180408,26.3385796 C7.4078449,25.6430694 7.36890612,24.9132735 7.48743673,24.2008653 C7.60596735,23.4884571 7.87902857,22.8105796 8.28751837,22.2154776 C8.69625306,21.6198857 9.23037551,21.1212735 9.85241633,20.7546612 C10.474702,20.3878041 11.1694776,20.1617633 11.8882531,20.0924571 C12.6070286,20.023151 13.3324163,20.1122939 14.0129878,20.3535184 L14.0129878,14.3584163 C13.4889061,14.2430694 12.9530694,14.1862531 12.416498,14.1894367 L12.3917633,14.1894367 C10.2542939,14.1943347 8.16604898,14.8325388 6.39127347,16.0234776 C4.61649796,17.2149061 3.23429388,18.9051918 2.41976327,20.8812735 C1.60523265,22.8578449 1.39486531,25.0310694 1.8151102,27.1269061 C2.2351102,29.2227429 3.2671102,31.1469061 4.78033469,32.6564571 C6.29380408,34.1660082 8.22066122,35.1933551 10.3174776,35.6082122 C12.4142939,36.0230694 14.5870286,35.8073143 16.561151,34.9878857 C18.5355184,34.1682122 20.2226204,32.7820898 21.409151,31.0041306 C22.5959265,29.2264163 23.2289878,27.136702 23.228498,24.9992327 L23.228498,12.8155592 C25.5036,14.392702 28.2244163,15.134498 31.1289061,15.1886204 L31.1289061,9.68551837 C30.5869469,9.66568163 30.049151,9.5851102 29.5248245,9.44576327" id="Fill-1" fill="#FE2C55"></path>
            <path d="M25.195102,6.75428571 C24.7946939,6.47510204 24.4148571,6.1675102 24.0587755,5.83346939 C22.8210612,4.66016327 22.0062857,3.11020408 21.7420408,1.42530612 C21.6622041,0.954367347 21.6220408,0.47755102 21.6220408,0 L15.7444898,0 L15.7444898,22.6408163 C15.7444898,27.5069388 13.5404082,28.5183673 10.804898,28.5183673 C10.0829388,28.5262041 9.36783673,28.3758367 8.71028571,28.0773061 C8.0524898,27.7792653 7.46791837,27.3406531 6.99820408,26.7920816 C6.5282449,26.2437551 6.18440816,25.5989388 5.99044898,24.9034286 C5.7964898,24.2079184 5.75755102,23.4781224 5.87583673,22.7657143 C5.99461224,22.053551 6.26767347,21.3756735 6.67640816,20.7800816 C7.08489796,20.1847347 7.61902041,19.6861224 8.24106122,19.3195102 C8.86334694,18.952898 9.55787755,18.7266122 10.276898,18.6573061 C10.9959184,18.588 11.7208163,18.6773878 12.4016327,18.9183673 L12.4016327,12.9328163 C5.40489796,11.8236735 0,17.4783673 0,23.5760816 C0.00465306122,26.4426122 1.14514286,29.1898776 3.17191837,31.216898 C5.19869388,33.2434286 7.94595918,34.3839184 10.8124898,34.3885714 C16.7730612,34.3885714 21.6220408,30.7444898 21.6220408,23.5760816 L21.6220408,11.3924082 C23.8995918,12.9795918 26.6204082,13.7142857 29.524898,13.7632653 L29.524898,8.26040816 C27.9658776,8.18914286 26.4617143,7.66604082 25.195102,6.75428571" id="Fill-3" fill="#25F4EE"></path>
        </g>
    </g>
</svg>
    ),
    url: site.tiktok || "https://www.tiktok.com/@jessacer2.0?_r=1&_t=ZS-93SkAJ7v5HQ",
    color: "black",
    gradient: "from-[#000000] via-[#25F4EE] to-[#FE2C55]"
  }
];

const SocialLinks = () => {
  const primaryLink = socialLinks.find(link => link.isPrimary);
  const otherLinks = socialLinks.filter(link => !link.isPrimary);


  return (
    <div className="w-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-8 backdrop-blur-xl">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
        Connect With Me
      </h3>

      <div className="flex flex-col gap-4">
        {/* Discord - Primary Row */}
        <a
  href={primaryLink.url}
  target="_blank"
  rel="noopener noreferrer"
  className="group relative flex items-center justify-between p-4 rounded-lg 
             bg-white/5 border border-white/10 overflow-hidden
             hover:border-white/20 transition-all duration-500"
>
  {/* Hover Gradient Background */}
  <div 
    className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
               bg-gradient-to-r ${primaryLink.gradient}`}
  />
  
  {/* Content Container */}
  <div className="relative flex items-center gap-4">
    {/* Icon Container */}
    <div className="relative flex items-center justify-center">
      <div 
        className="absolute inset-0 opacity-20 rounded-md transition-all duration-500
                   group-hover:scale-110 group-hover:opacity-30"
        style={{ backgroundColor: primaryLink.color }}
      />
      <div className="relative p-2 rounded-md">
        <primaryLink.icon
          className="w-6 h-6 transition-all duration-500 group-hover:scale-105"
          style={{ color: primaryLink.color }}
        />
      </div>
    </div>

    {/* Text Container */}
    <div className="flex flex-col">
      <span className="text-lg font-bold pt-[0.2rem] text-gray-200 tracking-tight leading-none group-hover:text-white transition-colors duration-300">
        {primaryLink.displayName}
      </span>
      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
        {primaryLink.subText}
      </span>
    </div>
  </div>

  {/* External Link */}
  <ExternalLink 
    className="relative w-5 h-5 text-gray-500 group-hover:text-white
               opacity-0 group-hover:opacity-100 transition-all duration-300
               transform group-hover:translate-x-0 -translate-x-1"
  />

  {/* Shine Effect */}
  <div 
    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
  </div>
</a>


        {/* Second Row - Instagram & YouTube */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherLinks.slice(0,2).map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 p-4 rounded-xl 
                       bg-white/5 border border-white/10 overflow-hidden
                       hover:border-white/20 transition-all duration-500"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
                             bg-gradient-to-r ${link.gradient}`} />
              
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 rounded-lg transition-all duration-500
                               group-hover:scale-125 group-hover:opacity-30"
                     style={{ backgroundColor: link.color }} />
                <div className="relative p-2 rounded-lg">
                  <link.icon
                    className="w-5 h-5 transition-all duration-500 group-hover:scale-110"
                    style={{ color: link.color }}
                  />
                </div>
              </div>

              {/* Text Container */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                  {link.displayName}
                </span>
                <span className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
                  {link.subText}
                </span>
              </div>
              
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white ml-auto
                                     opacity-0 group-hover:opacity-100 transition-all duration-300
                                     transform group-hover:translate-x-0 -translate-x-2" />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </a>
          ))}
        </div>

        {/* Third Row - GitHub & TikTok */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherLinks.slice(2,4).map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 p-4 rounded-xl 
                       bg-white/5 border border-white/10 overflow-hidden
                       hover:border-white/20 transition-all duration-500"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
                             bg-gradient-to-r ${link.gradient}`} />
              
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 rounded-lg transition-all duration-500
                               group-hover:scale-125 group-hover:opacity-30"
                     style={{ backgroundColor: link.color }} />
                <div className="relative p-2 rounded-lg">
                  <link.icon
                    className="w-5 h-5 transition-all duration-500 group-hover:scale-110"
                    style={{ color: link.color }}
                  />
                </div>
              </div>

              {/* Text Container */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                  {link.displayName}
                </span>
                <span className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
                  {link.subText}
                </span>
              </div>
              
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white ml-auto
                                     opacity-0 group-hover:opacity-100 transition-all duration-300
                                     transform group-hover:translate-x-0 -translate-x-2" />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;