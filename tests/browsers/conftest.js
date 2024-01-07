export async function readFile(inputPath) {
  const response = await fetch(inputPath);
  if (!response.ok) {
    throw new Error(
      `Error ${response.status}: ${response.statusText} for the path ${inputPath} `
    );
  } else {
    const text = await response.text();
    return text;
  }
}

/**
 *
 * Correct the path so that it is relative to the
 * top level directory.
 * For Unix-like paths.
 */
export function correctPath(path) {
  return `../../${path}`;
}
