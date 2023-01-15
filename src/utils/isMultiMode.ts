export const isMultiMode = () => {
  const args = process.argv.slice(2);

  const arg = args.find((el) => el.startsWith('--'));

  if (arg) {
    const [, mode] = arg.split('=');
    return mode === 'multi';
  }

  return false;
};
