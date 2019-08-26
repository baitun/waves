/** Duration of one block is approximately 1 minute */
export const BLOCK_DURATION = 1 * 60;

/** Converts number of blocks to TimeStamp */
export function blocks2time(blocks: number): number {
  return blocks * BLOCK_DURATION;
}

export function time2string(time: number): string {
  let hh = String(Math.floor(time / 60 / 60));
  let mm = String(Math.floor(time / 60) % 60);
  // let ss = String(time % 60);
  if (mm.length === 1) mm = '0' + mm;
  // if (ss.length === 1) ss = '0' + ss;
  return `${hh}h ${mm}m `;
}

export function blocks2string(blocks: number): string {
  return time2string(blocks2time(blocks));
}
