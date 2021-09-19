import axios from 'axios';
import { frameworks } from './frameworks';

async function getRepositoryLanguages(repo: { full_name: string }) {
  const url = `https://api.github.com/repos/${repo.full_name}/languages`;
  const { data } = await axios.get<Record<string, number>>(url, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}` },
  });
  data['total'] = Object.values(data).reduce((a, b) => a + b, 0);

  return data;
}

function getPrimaryLangsAndFrameworks(ideaMetadata, languages) {
  let mostUsedLang = '';
  let mostUsedLangCount = 0;
  for (let lang in languages) {
    if (languages[lang] > mostUsedLangCount) {
      mostUsedLang = lang;
      mostUsedLangCount = languages[lang];
      delete languages[lang];
    }
  }
  let secondMostUsedLang = '';
  let secondMostUsedLangCount = 0;
  for (let lang in languages) {
    if (languages[lang] > secondMostUsedLangCount) {
      secondMostUsedLang = lang;
      secondMostUsedLangCount = languages[lang];
      delete languages[lang];
    }
  }
  const primaryLangs = {};
  primaryLangs[mostUsedLang] = mostUsedLangCount;
  primaryLangs[secondMostUsedLang] = secondMostUsedLangCount;
  let recFrameworks = frameworks[ideaMetadata.type][mostUsedLang.toLowerCase()];
  if (recFrameworks) {
    if (frameworks[ideaMetadata.type][secondMostUsedLang.toLowerCase()]) {
      frameworks[ideaMetadata.type][secondMostUsedLang.toLowerCase()].forEach(
        f => {
          recFrameworks.push(f);
        }
      );
    }
  }
  if (!recFrameworks) {
    if (ideaMetadata.type === 'website') {
      recFrameworks = frameworks[ideaMetadata.type]['javascript'];
    } else {
      recFrameworks = frameworks[ideaMetadata.type]['dart'];
    }
  }
  return { primaryLangs, frameworks: recFrameworks };
}

async function getGithubSearchResults(ideaMetadata) {
  const url = `https://api.github.com/search/repositories?q=${ideaMetadata.entities[0]}`;
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  });

  if (data.items.length === 0) {
    if (ideaMetadata.type === 'website') {
      return {
        languages: ['JavaScript', 64],
        frameworks: frameworks.website['javascript'],
        relatedRepos: [],
      };
    } else if (ideaMetadata.type === 'app') {
      return {
        languages: ['Dart', 64],
        frameworks: frameworks.app['dart'],
        relatedRepos: [],
      };
    }
  }

  let repos = data.items;
  if (data.items.length > 10) {
    repos = data.items.slice(0, 10);
  }

  const languages = {};
  for (let i = 0; i < repos.length; i++) {
    const repoLangs = await getRepositoryLanguages(repos[i]);
    Object.keys(repoLangs).forEach(k => {
      if (k !== 'total') {
        if (languages[k]) {
          languages[k] += (repoLangs[k] / repoLangs['total']) * 10;
        } else {
          languages[k] = (repoLangs[k] / repoLangs['total']) * 10;
        }
      }
    });

    if (i === repos.length - 1) {
      const { primaryLangs, frameworks } = getPrimaryLangsAndFrameworks(
        ideaMetadata,
        languages
      );
      const primaryLanguages = [];
      Object.keys(primaryLangs).forEach(k => {
        primaryLanguages.push([k, Math.round(primaryLangs[k])]);
      });
      const uniqueFrameworks = frameworks.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
      }, []);
      return {
        languages: primaryLanguages,
        frameworks: uniqueFrameworks,
        relatedRepos: repos,
      };
    }
  }
}

async function getPublicAPIs(ideaMetadata) {
  const { data } = await axios.get(
    `https://api.publicapis.org/entries?description=${ideaMetadata.entities[0]}`
  );

  return data.entries as Array<Record<string, any>>;
}

async function getNodeModules(ideaMetadata) {
  const { data } = await axios.get(
    `https://registry.npmjs.org/-/v1/search?text=${ideaMetadata.entities[0]}`
  );

  return data.objects as Array<Record<string, any>>;
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : any;
type Await<T extends (...args: any[]) => any> = UnwrapPromise<ReturnType<T>>;

export async function getRecommendations(ideaMetadata) {
  const githubSearchResults = (await getGithubSearchResults(
    ideaMetadata
  )) as Await<typeof getGithubSearchResults> & {
    publicAPIs: Await<typeof getPublicAPIs>;
    nodeModules: Await<typeof getNodeModules>;
  };

  let publicAPIs = await getPublicAPIs(ideaMetadata);
  if (publicAPIs === null) {
    publicAPIs = [];
  }
  let nodeModules = await getNodeModules(ideaMetadata);
  if (nodeModules === null) {
    nodeModules = [];
  }
  githubSearchResults.publicAPIs = publicAPIs;
  githubSearchResults.nodeModules = nodeModules;
  return githubSearchResults;
}
