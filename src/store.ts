import { atom } from 'nanostores';
import Global from './content/global/global.json';
const tagList = Global.tags.tag;

export const tagQuery = atom([...tagList.map((t: { name: string }) => t.name)]);
