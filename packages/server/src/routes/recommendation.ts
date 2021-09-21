import { BertTokenizer } from 'bert-tokenizer';
import { exec } from 'child_process';
import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { RawEncoding } from 'tokenizers/bindings/raw-encoding';
import { Tokenizer } from 'tokenizers/bindings/tokenizer';
import { promisify } from 'util';
import { v4 as uuid } from 'uuid';
import { getRecommendations } from '../lib/recommendation';

const execPromisify = promisify(exec);

const router = Router();

const tokenizer = Tokenizer.fromPretrained('bert-base-uncased');
const bertTokenizer = new BertTokenizer(
  path.join(
    process.cwd(),
    '..',
    '..',
    'node_modules/bert-tokenizer/assets/vocab.json'
  ),
  true
);

let sentence = 'I love strawberries';

function tokenize(sentence: string) {
  return new Promise<RawEncoding>((resolve, reject) => {
    tokenizer.encode(
      sentence,
      null,
      { addSpecialTokens: false },
      (error, encoding) => {
        if (error) {
          return reject(error);
        }

        resolve(encoding);
      }
    );
  });
}

function tensorWith384Elements(arr: number[]) {
  for (let i = 0; i < 384; i++) {
    if (arr[i]) {
      continue;
    }

    arr[i] = 0;
  }

  return arr;
}

const softwareType = [
  'website',
  'mobile app',
  'app',
  'web app',
  'web-app',
  'dashboard',
  'platform',
  'extension',
];

function getSoftwareType(type: string) {
  const websiteIdentifiers = [
    'dashboard',
    'platform',
    'web',
    'web app',
    'web-app',
    'website',
  ];
  const appIdentifiers = ['mobile app', 'app'];
  if (websiteIdentifiers.includes(type)) {
    return 'website';
  } else if (appIdentifiers.includes(type)) {
    return 'app';
  } else {
    return type;
  }
}

router.post('/', async (req, res) => {
  try {
    const text = req.body.text as string;

    if (!text) {
      return res.status(400).send();
    }

    const tokenized = await tokenize(text);
    const randomFileHash = uuid();

    const tokenizedFile = `${randomFileHash}-1.ignore.json`;
    const maskFile = `${randomFileHash}-2.ignore.json`;
    const segmentFile = `${randomFileHash}-3.ignore.json`;

    await Promise.all([
      fs.writeFile(
        tokenizedFile,
        JSON.stringify(tensorWith384Elements(tokenized.getIds())),
        'utf8'
      ),
      fs.writeFile(
        maskFile,
        JSON.stringify(tensorWith384Elements(tokenized.getSpecialTokensMask())),
        'utf8'
      ),
      fs.writeFile(
        segmentFile,
        JSON.stringify(tensorWith384Elements(tokenized.getSequenceIds())),
        'utf8'
      ),
    ]);

    const result = await execPromisify(
      `rune run ../rune/bert3.rune --raw ${segmentFile} ${maskFile} ${tokenizedFile}`
    );
    const json = JSON.parse(
      result.stderr.split('Serial: ')[1].replace('\n', '')
    ) as Array<{
      type_name: string;
      channel: number;
      elements: number[];
      dimensions: [number, number];
    }>;

    console.log({ json });

    // TODO delete files after rune is finished running
    // TODO get keywords from logits that were returned from rune
    const keywords: string[] = text.split(',').map(x => x.trim());
    const entities = [...keywords];
    let projectType: string;

    for (const type of softwareType) {
      if (!projectType) {
        for (const phrase of keywords) {
          if (phrase.toLowerCase().includes(type)) {
            projectType = getSoftwareType(type);

            if (phrase.length === type.length) {
              entities.splice(entities.indexOf(phrase), 1);
            } else {
              entities[entities.indexOf(phrase)] = phrase
                .replace(type, '')
                .trim();
            }

            break;
          }
        }
      }
    }

    const ideaMetadata = {
      type: projectType,
      entities: entities,
    };

    if (
      ideaMetadata.type === undefined ||
      ideaMetadata.entities[0] === undefined
    ) {
      return res.send({
        data: { message: 'Please specify type and functionality.', rune: json },
      });
    }

    const recommendations = await getRecommendations(ideaMetadata);
    if (recommendations.publicAPIs.length > 9) {
      recommendations.publicAPIs = recommendations.publicAPIs.slice(0, 9);
    }
    if (recommendations.relatedRepos?.length > 9) {
      recommendations.relatedRepos = recommendations.relatedRepos
        .slice(0, 9)
        .map(x => x.name);
    }
    if (recommendations.nodeModules.length > 9) {
      recommendations.nodeModules = recommendations.nodeModules
        .slice(0, 9)
        .map(x => x.package.name);
    }

    res.send({ data: { recommendations, ideaMetadata, rune: json } });
  } catch (error) {
    console.error(error);
    res.send({ message: 'Something went wrong' });
  }
});

export default router;
