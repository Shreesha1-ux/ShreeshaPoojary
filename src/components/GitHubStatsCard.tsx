import React, { useState, useEffect, memo } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  GitFork, 
  Star, 
  BookMarked, 
  Code2, 
  ArrowUpRight, 
  RefreshCw, 
  Search,
  Lock,
  Globe,
  CircleDot
} from 'lucide-react';

export interface RepoItem {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  visibility: string;
  default_branch: string;
  fork: boolean;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  Vue: '#41b883',
};

// Fallback real repositories fetched directly from GitHub profile
const DEFAULT_REPOS: RepoItem[] = [
  {
    id: 1201407335,
    name: 'reps',
    full_name: 'Shreesha1-ux/reps',
    html_url: 'https://github.com/Shreesha1-ux/reps',
    description: 'Flagship habit tracking & reps competition web app with Supabase real-time leaderboard',
    language: 'TypeScript',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-04-10T12:56:37Z',
    visibility: 'public',
    default_branch: 'main',
    fork: false,
  },
  {
    id: 1208023421,
    name: 'ShreeshaPoojary',
    full_name: 'Shreesha1-ux/ShreeshaPoojary',
    html_url: 'https://github.com/Shreesha1-ux/ShreeshaPoojary',
    description: 'Personal developer portfolio website built with modern React, Tailwind CSS, and interactive UI systems',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-28T16:14:39Z',
    visibility: 'public',
    default_branch: 'main',
    fork: false,
  },
  {
    id: 1203021298,
    name: 'RepsPrototype1.0',
    full_name: 'Shreesha1-ux/RepsPrototype1.0',
    html_url: 'https://github.com/Shreesha1-ux/RepsPrototype1.0',
    description: 'Initial prototype and experimental proof of concept for the Reps fitness accountability platform',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-04-06T16:35:39Z',
    visibility: 'public',
    default_branch: 'main',
    fork: false,
  },
];

const DEFAULT_USER = {
  login: 'Shreesha1-ux',
  name: 'Shreesha Poojary',
  avatar_url: 'https://avatars.githubusercontent.com/u/208063949?v=4',
  html_url: 'https://github.com/Shreesha1-ux',
  bio: 'Software Development Engineer | Full-Stack Builder',
  public_repos: 3,
  followers: 1,
  following: 1,
};

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateString;
  }
}

export const GitHubStatsCard: React.FC = memo(() => {
  const [userData, setUserData] = useState(DEFAULT_USER);
  const [repos, setRepos] = useState<RepoItem[]>(DEFAULT_REPOS);
  const [filteredRepos, setFilteredRepos] = useState<RepoItem[]>(DEFAULT_REPOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<'updated' | 'stars' | 'name'>('updated');
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState('Live GitHub sync');

  const fetchGitHubData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch User Profile
      const userRes = await fetch('https://api.github.com/users/Shreesha1-ux');
      if (userRes.ok) {
        const u = await userRes.json();
        setUserData({
          login: u.login || DEFAULT_USER.login,
          name: u.name || DEFAULT_USER.name,
          avatar_url: u.avatar_url || DEFAULT_USER.avatar_url,
          html_url: u.html_url || DEFAULT_USER.html_url,
          bio: u.bio || DEFAULT_USER.bio,
          public_repos: typeof u.public_repos === 'number' ? u.public_repos : DEFAULT_USER.public_repos,
          followers: typeof u.followers === 'number' ? u.followers : DEFAULT_USER.followers,
          following: typeof u.following === 'number' ? u.following : DEFAULT_USER.following,
        });
      }

      // 2. Fetch All Repositories
      const reposRes = await fetch('https://api.github.com/users/Shreesha1-ux/repos?sort=updated&per_page=100');
      if (reposRes.ok) {
        const fetchedRepos: RepoItem[] = await reposRes.json();
        if (Array.isArray(fetchedRepos) && fetchedRepos.length > 0) {
          setRepos(fetchedRepos);
          setStatusText(`Synced ${fetchedRepos.length} repos`);
        }
      }
    } catch (err) {
      console.warn('GitHub API sync fallback to profile cache', err);
      setStatusText('Cached view');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  // Filter & Sort
  useEffect(() => {
    let result = [...repos];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description && r.description.toLowerCase().includes(q)) ||
          (r.language && r.language.toLowerCase().includes(q))
      );
    }

    if (selectedLanguage !== 'all') {
      result = result.filter((r) => r.language === selectedLanguage);
    }

    if (selectedSort === 'updated') {
      result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    } else if (selectedSort === 'stars') {
      result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (selectedSort === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredRepos(result);
  }, [repos, searchQuery, selectedLanguage, selectedSort]);

  // Distinct languages for dropdown
  const availableLanguages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean) as string[])
  );

  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

  return (
    <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl font-sans text-[#c9d1d9]">
      {/* GitHub Top Tab Bar (Classic GitHub Repository Navigation Header) */}
      <div className="bg-[#161b22] border-b border-[#30363d] px-4 sm:px-6 pt-4">
        {/* Profile Identity Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div className="flex items-center gap-3">
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group block"
            >
              <img
                src={userData.avatar_url}
                alt={userData.login}
                className="w-10 h-10 rounded-full border border-[#30363d] ring-2 ring-transparent group-hover:ring-[#58a6ff] transition-all object-cover"
              />
            </a>
            <div>
              <div className="flex items-center gap-2">
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:text-[#58a6ff] transition-colors text-base flex items-center gap-1.5"
                >
                  <span>{userData.name || userData.login}</span>
                  <span className="text-[#8b949e] font-normal text-sm">({userData.login})</span>
                </a>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#21262d] border border-[#30363d] text-[#8b949e]">
                  Public
                </span>
              </div>
              <p className="text-xs text-[#8b949e] mt-0.5">
                {userData.bio || 'Developer on GitHub'}
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-[#8b949e]">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#e3b341]" />
                <strong className="text-[#f0f6fc]">{totalStars}</strong>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5 text-[#8b949e]" />
                <strong className="text-[#f0f6fc]">{totalForks}</strong>
              </span>
            </div>

            <button
              onClick={fetchGitHubData}
              disabled={isLoading}
              title="Refresh repositories"
              className="px-2.5 py-1 text-xs rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#58a6ff]' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>

            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-xs font-medium rounded-md bg-[#238636] hover:bg-[#2ea043] text-white flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Follow</span>
            </a>
          </div>
        </div>

        {/* GitHub Navigation Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-sm">
          <div className="flex items-center gap-2 pb-3 border-b-2 border-[#f78166] text-[#f0f6fc] font-semibold">
            <BookMarked className="w-4 h-4 text-[#8b949e]" />
            <span>Repositories</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-[#30363d] text-[#f0f6fc] font-medium font-mono">
              {repos.length}
            </span>
          </div>

          <a
            href={`${userData.html_url}?tab=stars`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 pb-3 text-[#8b949e] hover:text-[#c9d1d9] border-b-2 border-transparent transition-colors"
          >
            <Star className="w-4 h-4" />
            <span>Stars</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-[#21262d] text-[#8b949e] font-medium font-mono">
              {totalStars}
            </span>
          </a>
        </div>
      </div>

      {/* GitHub Repository Filter / Search Toolbar */}
      <div className="p-4 sm:p-6 border-b border-[#30363d] bg-[#0d1117] flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find a repository..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#010409] text-sm text-[#c9d1d9] placeholder-[#8b949e] rounded-md border border-[#30363d] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all font-mono"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-xs text-[#c9d1d9] rounded-md border border-[#30363d] focus:outline-none focus:border-[#58a6ff] transition-colors cursor-pointer"
          >
            <option value="all">Language: All</option>
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          {/* Sort Selector */}
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value as any)}
            className="px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-xs text-[#c9d1d9] rounded-md border border-[#30363d] focus:outline-none focus:border-[#58a6ff] transition-colors cursor-pointer"
          >
            <option value="updated">Sort: Last updated</option>
            <option value="stars">Sort: Stars</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>
      </div>

      {/* GitHub Repository List */}
      <div className="divide-y divide-[#21262d] bg-[#0d1117]">
        {filteredRepos.length === 0 ? (
          <div className="py-16 text-center text-[#8b949e]">
            <BookMarked className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-base font-semibold text-[#c9d1d9]">No matching repositories found</p>
            <p className="text-xs mt-1">Try clearing your search query or language filter.</p>
          </div>
        ) : (
          filteredRepos.map((repo) => {
            const langColor = (repo.language && LANGUAGE_COLORS[repo.language]) || '#58a6ff';
            return (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 sm:p-6 hover:bg-[#161b22]/60 transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Repo Info Left */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-lg text-[#58a6ff] hover:underline flex items-center gap-1.5 break-all"
                    >
                      <span>{repo.name}</span>
                    </a>
                    
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-[#30363d] text-[#8b949e] capitalize">
                      {repo.visibility || 'public'}
                    </span>

                    {repo.fork && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-[#30363d] text-[#8b949e]">
                        Fork
                      </span>
                    )}
                  </div>

                  {repo.description ? (
                    <p className="text-sm text-[#8b949e] leading-relaxed line-clamp-2 max-w-3xl">
                      {repo.description}
                    </p>
                  ) : (
                    <p className="text-xs text-[#6e7681] italic">
                      No description, website, or topics provided.
                    </p>
                  )}

                  {/* Metadata: Language, Stars, Forks, Updated At */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8b949e] pt-1">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: langColor }}
                        />
                        <span className="text-[#c9d1d9]">{repo.language}</span>
                      </span>
                    )}

                    {repo.stargazers_count > 0 && (
                      <a
                        href={`${repo.html_url}/stargazers`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors"
                      >
                        <Star className="w-3.5 h-3.5" />
                        <span>{repo.stargazers_count}</span>
                      </a>
                    )}

                    {repo.forks_count > 0 && (
                      <a
                        href={`${repo.html_url}/network/members`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors"
                      >
                        <GitFork className="w-3.5 h-3.5" />
                        <span>{repo.forks_count}</span>
                      </a>
                    )}

                    <span>Updated {formatRelativeTime(repo.updated_at)}</span>
                  </div>
                </div>

                {/* Repo Action Right */}
                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] flex items-center gap-1.5 transition-colors group-hover:border-[#58a6ff]/50"
                  >
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-[#58a6ff]" />
                  </a>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* GitHub Card Bottom Bar */}
      <div className="p-4 bg-[#161b22] border-t border-[#30363d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#8b949e]">
        <div className="flex items-center gap-2">
          <CircleDot className="w-3.5 h-3.5 text-[#3fb950]" />
          <span>{statusText}</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`https://github.com/${userData.login}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#58a6ff] hover:underline flex items-center gap-1 font-medium"
          >
            <span>View all repositories on GitHub.com</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
});

GitHubStatsCard.displayName = 'GitHubStatsCard';
