import { sellIx } from './sellIx';
import { buyIx } from './buyIx';

const main = async (): Promise<void> => {
  await buyIx();
  await sellIx();
};

main().catch(console.error);

export { buyIx } from './buyIx';
export { sellIx } from './sellIx';