function filename(config) {
  const { archiveFormat = 'tar', targetName, openGzip } = config;
  let target;
  if (archiveFormat === 'tar') {
    if (openGzip) {
      return target = targetName + '.' + archiveFormat + '.gz';
    } else {
      return target = targetName + '.' + archiveFormat;
    }
  }
  if (archiveFormat === 'zip') {
    return target = targetName + '.' + archiveFormat;
  }
  return target = targetName + '.tar';
}

module.exports = filename;