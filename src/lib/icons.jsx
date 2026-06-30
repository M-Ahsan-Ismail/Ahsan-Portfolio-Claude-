import {
  SiPython, SiOdoo, SiPostgresql, SiFastapi, SiFlask, SiDjango, SiJavascript,
  SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiHtml5, SiCss, SiTailwindcss,
  SiGit, SiGithub, SiGitlab, SiLinux, SiDocker, SiMysql, SiMongodb, SiRedis,
  SiPhp, SiLaravel, SiVuedotjs, SiExpress, SiSqlite, SiNginx, SiSupabase,
  SiFirebase, SiBootstrap, SiSass, SiGraphql, SiVite, SiNetlify, SiVercel,
  SiPandas, SiNumpy, SiOpenai,
} from 'react-icons/si';
import {
  TbFileCode, TbApi, TbBrandPython, TbServer, TbDatabase, TbBrandReact,
  TbTerminal2, TbCloud, TbBrain, TbChartDots,
} from 'react-icons/tb';
import { FaCode } from 'react-icons/fa6';

// key -> component. Used by skills throughout the app.
export const iconMap = {
  SiPython, SiOdoo, SiPostgresql, SiFastapi, SiFlask, SiDjango, SiJavascript,
  SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiHtml5, SiCss, SiTailwindcss,
  SiGit, SiGithub, SiGitlab, SiLinux, SiDocker, SiMysql, SiMongodb, SiRedis,
  SiPhp, SiLaravel, SiVuedotjs, SiExpress, SiSqlite, SiNginx, SiSupabase,
  SiFirebase, SiBootstrap, SiSass, SiGraphql, SiVite, SiNetlify, SiVercel,
  SiPandas, SiNumpy, SiOpenai,
  TbFileCode, TbApi, TbBrandPython, TbServer, TbDatabase, TbBrandReact,
  TbTerminal2, TbCloud, TbBrain, TbChartDots, FaCode,
};

// ordered list for the admin picker
export const iconList = Object.keys(iconMap);

export function getIcon(key) {
  return iconMap[key] || FaCode;
}
