import { BertTokenizer } from 'bert-tokenizer';
import { exec } from 'child_process';
import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { RawEncoding } from 'tokenizers/bindings/raw-encoding';
import { Tokenizer } from 'tokenizers/bindings/tokenizer';
import { promisify } from 'util';
import { v4 as uuid } from 'uuid';

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

router.post('/', async (req, res) => {
  try {
    const text = req.body.text;

    if (!text) {
      return res.status(400).send();
    }

    const tokenized = await tokenize(text);
    const randomFileHash = uuid();

    const tokenizedFile = `${randomFileHash}-1.ignore.json`;
    const maskFile = `${randomFileHash}-2.ignore.json`;
    const segmentFile = `${randomFileHash}-3.ignore.json`;

    await Promise.all([
      fs.writeFile(tokenizedFile, JSON.stringify(tokenized.getIds()), 'utf8'),
      fs.writeFile(
        maskFile,
        JSON.stringify(tokenized.getSpecialTokensMask()),
        'utf8'
      ),
      fs.writeFile(
        segmentFile,
        JSON.stringify(tokenized.getSequenceIds()),
        'utf8'
      ),
    ]);

    const result = await execPromisify(
      `rune run ../rune/bert.rune --raw ${segmentFile} ${maskFile} ${tokenizedFile}`
    );
    const json = result.stdout.split('SERIAL: ')[1];
    const modelResults = JSON.parse(json);

    console.log(modelResults);

    res.send('works');
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
});

export default router;
